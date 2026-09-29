export type Project = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  coverImage: string;
  technologies: string[];
  projectUrl: string | null;
  repository: string | null;
  sortOrder: number;
  isFeatured: boolean;
  category: { name: string } | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Brief = {
  id: string;
  name: string;
  email: string;
  message: string;
  services: string[];
  timeline: string | null;
  isRead: boolean;
  createdAt: Date | string;
};

export type Category = { id: string; name: string; slug: string };

export const HOME_SLOTS = 4;

// Mirrors getProjectFilterCategory + tab labels in src/components/Works/Works.tsx.
export function siteFilterLabel(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("identit")) return "Identités visuelles";
  if (cat.includes("graph") || cat.includes("brand") || cat.includes("design")) return "Direction Artistique";
  if (cat.includes("auto") || cat.includes("n8n") || cat.includes("bot")) return "Automatisation & IA";
  return "Web & SaaS";
}

type Orderable = Pick<Project, "id" | "isFeatured" | "sortOrder" | "createdAt">;

// Same ordering as the public site: sortOrder asc, then newest first.
export function siteOrder<T extends Orderable>(projects: T[]) {
  return [...projects].sort(
    (a, b) => a.sortOrder - b.sortOrder || toTime(b.createdAt) - toTime(a.createdAt)
  );
}

// Mirrors featuredProjects in Works.tsx: flagged projects first 4, else first 4 overall.
export function homePlacement(projects: Orderable[]) {
  const ordered = siteOrder(projects);
  const flagged = ordered.filter((p) => p.isFeatured);
  const shown = (flagged.length ? flagged : ordered).slice(0, HOME_SLOTS);
  return new Map(shown.map((p, i) => [p.id, i + 1]));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function toTime(value: Date | string) {
  return new Date(value).getTime();
}

export function formatDate(value: Date | string, withTime = true) {
  return new Date(value).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export function formatAge(value: Date | string, now: number) {
  const minutes = Math.round((now - toTime(value)) / 60000);
  if (minutes < 1) return "à l’instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  if (days === 1) return "hier";
  if (days < 30) return `il y a ${days} jours`;
  return `le ${formatDate(value, false)}`;
}

export function plural(n: number, one: string, many: string) {
  return `${n} ${n > 1 ? many : one}`;
}
