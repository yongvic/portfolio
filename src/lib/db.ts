import "server-only";

import { prisma } from "@/lib/prisma";
import {
  staticProjects,
  staticTestimonials,
  type UiProject,
  projectToUi,
} from "@/lib/content";

export async function getProjects(): Promise<UiProject[]> {
  try {
    const projects = await prisma.project.findMany({
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    if (!projects.length) {
      return staticProjects;
    }

    return projects.map(projectToUi);
  } catch {
    return staticProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<UiProject | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (project) {
      return projectToUi(project);
    }
  } catch {
    // fallback below
  }

  return staticProjects.find((item) => item.slug === slug) ?? null;
}

export async function getTopViewedProjects(): Promise<Array<UiProject & { views: number }>> {
  try {
    const projects = await prisma.project.findMany({
      include: {
        category: true,
        _count: { select: { views: true } },
      },
      orderBy: { views: { _count: "desc" } },
      take: 3,
    });

    if (!projects.length) {
      return staticProjects.slice(0, 3).map((project) => ({ ...project, views: 0 }));
    }

    return projects.map((project) => ({
      ...projectToUi(project),
      views: project._count.views,
    }));
  } catch {
    return staticProjects.slice(0, 3).map((project) => ({ ...project, views: 0 }));
  }
}

export async function getStats() {
  try {
    const [visits, messages, projects] = await Promise.all([
      prisma.siteVisit.count(),
      prisma.contactMessage.count(),
      prisma.project.count(),
    ]);

    return {
      visits,
      messages,
      projects,
    };
  } catch {
    return {
      visits: 0,
      messages: 0,
      projects: staticProjects.length,
    };
  }
}

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" }, take: 6 });
    return testimonials.length ? testimonials : staticTestimonials;
  } catch {
    return staticTestimonials;
  }
}
