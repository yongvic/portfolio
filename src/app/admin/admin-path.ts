export type BriefTab = "todo" | "done";

export type AdminRoute =
  | { view: "briefs"; brief?: string; tab?: BriefTab }
  | { view: "projects" }
  | { view: "editor"; project: string };

export const NEW_PROJECT = "nouveau";

export function adminPath(key: string, route: AdminRoute = { view: "briefs" }) {
  const params = new URLSearchParams();
  params.set("key", key);
  if (route.view === "briefs") {
    if (route.tab === "done") params.set("onglet", "traites");
    if (route.brief) params.set("brief", route.brief);
  } else if (route.view === "projects") {
    params.set("view", "projets");
  } else {
    params.set("view", "projets");
    params.set("projet", route.project);
  }
  return `/admin?${params.toString()}`;
}

type ParamReader = { get(name: string): string | null };

export function parseAdminRoute(params: ParamReader): AdminRoute {
  const view = params.get("view");
  // Old links used view=projects|messages and editId=… — keep them working.
  const project = params.get("projet") ?? params.get("editId");
  if (project) return { view: "editor", project: project === "new" ? NEW_PROJECT : project };
  if (view === "projets" || view === "projects") return { view: "projects" };
  return {
    view: "briefs",
    brief: params.get("brief") ?? undefined,
    tab: params.get("onglet") === "traites" ? "done" : "todo",
  };
}
