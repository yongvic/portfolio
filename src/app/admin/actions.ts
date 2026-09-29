"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { brandIdentities } from "@/lib/identities";

const LANE_LIMIT = 4;
const LANE_LABEL = { dev: "Développement", design: "Design" } as const;

const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Titre trop court (minimum 3 caractères)"),
  slug: z.string().min(3, "Identifiant URL trop court (minimum 3 caractères)"),
  excerpt: z.string().min(10, "Résumé trop court (minimum 10 caractères)"),
  description: z.string().min(20, "Description trop courte (minimum 20 caractères)"),
  coverImage: z.string().min(3, "URL de l'image de couverture requise"),
  category: z.string().min(2, "Catégorie requise"),
  technologies: z.string().min(2, "Technologies requises (séparées par virgules)"),
  projectUrl: z.string().optional(),
  repository: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isHidden: z.boolean().default(false),
  homeLane: z.enum(["dev", "design"]).nullable().optional(),
});

const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nom requis"),
  role: z.string().min(2, "Rôle requis"),
  company: z.string().optional(),
  quote: z.string().min(10, "Témoignage trop court"),
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

function publishChanges() {
  revalidatePath("/");
  revalidatePath("/projets");
  revalidatePath("/identites");
  revalidatePath("/admin");
}

async function laneIsFull(lane: "dev" | "design", except?: { projectId?: string; identitySlug?: string }) {
  const [projects, identities] = await Promise.all([
    prisma.project.count({
      where: {
        homeLane: lane,
        isHidden: false,
        ...(except?.projectId ? { id: { not: except.projectId } } : {}),
      },
    }),
    prisma.identitySetting.count({
      where: {
        homeLane: lane,
        isHidden: false,
        ...(except?.identitySlug ? { slug: { not: except.identitySlug } } : {}),
      },
    }),
  ]);
  return projects + identities >= LANE_LIMIT;
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
    return { success: false, message: "Accès non autorisé : clé admin invalide." };
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
    isHidden: formData.get("isHidden") === "on",
    homeLane:
      formData.get("isHidden") === "on"
        ? null
        : formData.get("homeLane") === "dev" || formData.get("homeLane") === "design"
          ? formData.get("homeLane")
          : null,
  };

  const parsed = projectSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Erreur de validation du formulaire",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const homeLane = parsed.data.isHidden ? null : parsed.data.homeLane ?? null;
    if (homeLane && (await laneIsFull(homeLane, { projectId: parsed.data.id || undefined }))) {
      return {
        success: false,
        message: `L’onglet ${LANE_LABEL[homeLane]} a déjà ${LANE_LIMIT} projets. Retire-en un avant d’en ajouter un autre.`,
      };
    }

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
      isHidden: parsed.data.isHidden,
      homeLane,
      technologies,
      categoryId: category.id,
    };

    if (parsed.data.id) {
      await prisma.project.update({
        where: { id: parsed.data.id as string },
        data: payload,
      });
      publishChanges();
      revalidatePath(`/works/${parsed.data.slug}`);
      return { success: true, message: "Projet mis à jour avec succès" };
    } else {
      await prisma.project.create({ data: { ...payload, isFeatured: false } });
      publishChanges();
      return { success: true, message: "Nouveau projet publié avec succès" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de l'enregistrement en base de données" };
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
  if (!id) return { success: false, message: "Identifiant du projet manquant" };

  try {
    await prisma.project.delete({ where: { id } });
    publishChanges();
    return { success: true, message: "Projet supprimé définitivement" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la suppression du projet" };
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
    return { success: true, message: isRead ? "Message marqué comme lu" : "Message marqué comme non lu" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la mise à jour" };
  }
}

export async function updateIdentitySettingAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await checkAuth(formData);
  } catch {
    return { success: false, message: "Accès non autorisé" };
  }

  const slug = String(formData.get("slug") ?? "");
  const identity = brandIdentities.find((item) => item.slug === slug);
  if (!identity) return { success: false, message: "Cette identité n’existe pas." };

  const isHidden = formData.get("isHidden") === "on";
  const requested = formData.get("homeLane");
  const homeLane = isHidden ? null : requested === "design" ? "design" : null;

  try {
    if (homeLane && (await laneIsFull("design", { identitySlug: slug }))) {
      return {
        success: false,
        message: `L’onglet Design a déjà ${LANE_LIMIT} projets. Retire-en un avant d’en ajouter un autre.`,
      };
    }

    await prisma.identitySetting.upsert({
      where: { slug },
      create: { slug, isHidden, homeLane },
      update: { isHidden, homeLane },
    });
    publishChanges();
    revalidatePath(`/identites/${slug}`);
    return { success: true, message: isHidden ? `${identity.name} est masquée.` : `${identity.name} est à jour.` };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Le réglage n’a pas pu être enregistré." };
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
      revalidatePath("/");
      revalidatePath("/admin");
      return { success: true, message: "Témoignage mis à jour" };
    } else {
      await prisma.testimonial.create({ data: payload });
      revalidatePath("/");
      revalidatePath("/admin");
      return { success: true, message: "Témoignage créé" };
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
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Témoignage supprimé" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erreur lors de la suppression" };
  }
}
