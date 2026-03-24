"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  description: z.string().min(20),
  coverImage: z.string().min(3),
  category: z.string().min(2),
  technologies: z.string().min(2),
  projectUrl: z.string().optional(),
  repository: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isFeatured: z.coerce.boolean().default(false),
});

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

export async function upsertProjectAction(formData: FormData) {
  const adminSecret = process.env.ADMIN_SECRET;
  const adminKey = formData.get("key");
  if (!adminSecret || adminKey !== adminSecret) {
    return;
  }

  const raw = {
    id: (formData.get("id") ?? "") as string,
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage"),
    category: formData.get("category"),
    technologies: formData.get("technologies"),
    projectUrl: (formData.get("projectUrl") ?? "") as string,
    repository: (formData.get("repository") ?? "") as string,
    sortOrder: formData.get("sortOrder") ?? 0,
    isFeatured: formData.get("isFeatured") === "on",
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return;
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
    projectUrl: parsed.data.projectUrl || null,
    repository: parsed.data.repository || null,
    sortOrder: parsed.data.sortOrder,
    isFeatured: parsed.data.isFeatured,
    technologies,
    categoryId: category.id,
  };

  if (parsed.data.id) {
    await prisma.project.update({ where: { id: parsed.data.id }, data: payload }).catch(() => null);
  } else {
    await prisma.project.create({ data: payload }).catch(() => null);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProjectAction(formData: FormData) {
  const adminSecret = process.env.ADMIN_SECRET;
  const adminKey = formData.get("key");
  if (!adminSecret || adminKey !== adminSecret) {
    return;
  }

  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.project.delete({ where: { id } }).catch(() => null);
  revalidatePath("/");
  revalidatePath("/admin");
}
