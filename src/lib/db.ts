import "server-only";

import { prisma } from "@/lib/prisma";
import {
  staticProjects,
  staticTestimonials,
  type UiProject,
  projectToUi,
} from "@/lib/content";
import { identityToUiProject, visibleIdentities, type IdentityPlacement } from "@/lib/identities";

const HOME_LIMIT = 4;

function asLane(value: string | null | undefined): "dev" | "design" | null {
  return value === "dev" || value === "design" ? value : null;
}

export async function getIdentityPlacements(): Promise<IdentityPlacement[]> {
  try {
    const rows = await prisma.identitySetting.findMany();
    return rows.map((row) => ({
      slug: row.slug,
      isHidden: row.isHidden,
      homeLane: asLane(row.homeLane),
    }));
  } catch {
    return [];
  }
}

export async function getHomeLanes(): Promise<{ dev: UiProject[]; design: UiProject[] }> {
  const [projects, placements] = await Promise.all([getProjects(), getIdentityPlacements()]);
  const identities = visibleIdentities(placements).map((identity) => ({
    ...identityToUiProject(identity),
    homeLane: placements.find((item) => item.slug === identity.slug)?.homeLane ?? null,
  }));

  const devChosen = projects.filter((project) => project.homeLane === "dev");
  const designChosen = [...projects, ...identities].filter((project) => project.homeLane === "design");
  const flagged = projects.filter((project) => project.isFeatured);

  return {
    dev: (devChosen.length ? devChosen : flagged.length ? flagged : projects).slice(0, HOME_LIMIT),
    design: (designChosen.length ? designChosen : identities).slice(0, HOME_LIMIT),
  };
}

export async function getProjects(): Promise<UiProject[]> {
  try {
    const projects = await prisma.project.findMany({
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    if (!projects.length) {
      return staticProjects;
    }

    return projects.filter((project) => !project.isHidden).map(projectToUi);
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
      return project.isHidden ? null : projectToUi(project);
    }
  } catch {
    // fallback below
  }

  return staticProjects.find((item) => item.slug === slug) ?? null;
}

export async function getTopViewedProjects(): Promise<Array<UiProject & { views: number }>> {
  try {
    const projects: Array<{
      id: string;
      title: string;
      slug: string;
      excerpt: string;
      description: string;
      coverImage: string;
      projectUrl: string | null;
      repository: string | null;
      technologies: string[];
      category: { name: string } | null;
      _count: { views: number };
    }> = await prisma.project.findMany({
      where: { isHidden: false },
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
