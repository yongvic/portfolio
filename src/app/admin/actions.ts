"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Titre trop court"),
  slug: z.string().min(3, "Slug trop court"),
  excerpt: z.string().min(10, "Résumé trop court"),
  description: z.string().min(20, "Description trop courte"),
  coverImage: z.string().min(3, "Image requise"),
  category: z.string().min(2, "Catégorie requise"),
  technologies: z.string().min(2, "Technos requises"),
  projectUrl: z.string().optional(),
  repository: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isFeatured: z.coerce.boolean().default(false),
});

const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nom requis"),
  role: z.string().min(2, "Rôle requis"),
  company: z.string().optional(),
  quote: z.string().min(10, "Citation trop courte"),
});

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
} | null;

async function checkAuth(formData: FormData) {
  const adminSecret = process.env.ADMIN_SECRET;
  const adminKey = formData.get("key");
  if (!adminSecret || adminKey !== adminSecret) {
    throw new Error("Accès non autorisé");
  }
}

async function ensureCategory(categoryName: string) {
  const slug = categoryName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return prisma.category.upsert({
    where: { slug },
    create: { name: categoryName, slug },
    update: { name: categoryName },
  });
}

export async function upsertProjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await checkAuth(formData);
  } catch {
    return { success: false, message: "Accès non autorisé" };
  }

  const raw = {
    id: formData.get("id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage"),
    category: formData.get("category"),
    technologies: formData.get("technologies"),
    projectUrl: formData.get("projectUrl"),
    repository: formData.get("repository"),
    sortOrder: formData.get("sortOrder"),
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = projectSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Erreur de validation",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const category = await ensureCategory(parsed.data.category);
    const technologies = parsed.data.technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      description: parsed.data.description,
      coverImage: parsed.data.coverImage,
      projectUrl: (parsed.data.projectUrl as string) || null,
      repository: (parsed.data.repository as string) || null,
      sortOrder: parsed.data.sortOrder,
      isFeatured: parsed.data.isFeatured,
      technologies,
      categoryId: category.id,
    };

    if (parsed.data.id) {
      await prisma.project.update({
        where: { id: parsed.data.id as string },
        data: payload,
      });
      revalidatePath("/");
      revalidatePath("/admin");
      return { success: true, message: "Projet mis à jour avec succès" };
    } else {
      await prisma.project.create({ data: payload });
      revalidatePath("/");
      revalidatePath("/admin");
      return { success: true, message: "Projet créé avec succès" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de l'enregistrement" };
  }
}

export async function deleteProjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await checkAuth(formData);
  } catch {
    return { success: false, message: "Accès non autorisé" };
  }

  const id = formData.get("id") as string;
  if (!id) return { success: false, message: "ID manquant" };

  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Projet supprimé" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la suppression" };
  }
}

export async function deleteMessageAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await checkAuth(formData);
  } catch {
    return { success: false, message: "Accès non autorisé" };
  }

  const id = formData.get("id") as string;
  try {
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin");
    return { success: true, message: "Message supprimé" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la suppression" };
  }
}

export async function markMessageReadAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await checkAuth(formData);
  } catch {
    return { success: false, message: "Accès non autorisé" };
  }

  const id = formData.get("id") as string;
  const isRead = formData.get("isRead") === "true";

  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });
    revalidatePath("/admin");
    return { success: true, message: isRead ? "Marqué comme lu" : "Marqué comme non lu" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la mise à jour" };
  }
}

export async function upsertTestimonialAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await checkAuth(formData);
  } catch {
    return { success: false, message: "Accès non autorisé" };
  }

  const raw = {
    id: formData.get("id"),
    name: formData.get("name"),
    role: formData.get("role"),
    company: formData.get("company"),
    quote: formData.get("quote"),
  };

  const parsed = testimonialSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Erreur de validation",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const payload = {
      name: parsed.data.name,
      role: parsed.data.role,
      company: parsed.data.company || null,
      quote: parsed.data.quote,
    };

    if (parsed.data.id) {
      await prisma.testimonial.update({
        where: { id: parsed.data.id as string },
        data: payload,
      });
      revalidatePath("/admin");
      return { success: true, message: "Témoignage mis à jour" };
    } else {
      await prisma.testimonial.create({ data: payload });
      revalidatePath("/admin");
      return { success: true, message: "Témoignage ajouté" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de l'enregistrement" };
  }
}

export async function deleteTestimonialAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await checkAuth(formData);
  } catch {
    return { success: false, message: "Accès non autorisé" };
  }

  const id = formData.get("id") as string;
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin");
    return { success: true, message: "Témoignage supprimé" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la suppression" };
  }
}
