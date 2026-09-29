"use client";

import React, { useEffect, useOptimistic, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMessageAction, markMessageReadAction } from "./actions";
import type { AdminRoute } from "./admin-path";
import { NEW_PROJECT } from "./admin-path";
import { AdminLink, AdminNavProvider, BackLink, useAdminNav } from "./nav";
import { EmptyState, ScreenHeader, ToastProvider, useActionFailure, useOnline, useToast } from "./ui";
import type { Brief, Category, IdentityAdmin, Project } from "./model";
import BriefsView from "./BriefsView";
import ProjectsView from "./ProjectsView";
import ProjectEditor from "./ProjectEditor";

type AdminClientProps = {
  adminKey: string;
  projects: Project[];
  briefs: Brief[];
  categories: Category[];
  images: string[];
  identities: IdentityAdmin[];
  dataUnavailable: boolean;
};

export default function AdminClient(props: AdminClientProps) {
  return (
    <ToastProvider>
      <AdminNavProvider adminKey={props.adminKey}>
        <Shell {...props} />
      </AdminNavProvider>
    </ToastProvider>
  );
}

type BriefPatch = { id: string; isRead?: boolean; deleted?: boolean };

export type BriefActions = {
  setTreated: (brief: Brief, isRead: boolean) => void;
  remove: (brief: Brief) => void;
  pendingIds: ReadonlySet<string>;
};

function Shell({ adminKey, projects, briefs, categories, images, identities, dataUnavailable }: AdminClientProps) {
  const { route, go } = useAdminNav();
  const router = useRouter();
  const toast = useToast();
  const fail = useActionFailure();
  const online = useOnline();
  const [, startTransition] = useTransition();
  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());

  const [liveBriefs, applyBrief] = useOptimistic(briefs, (state: Brief[], patch: BriefPatch) =>
    patch.deleted
      ? state.filter((b) => b.id !== patch.id)
      : state.map((b) => (b.id === patch.id ? { ...b, isRead: patch.isRead ?? b.isRead } : b))
  );

  const setPending = (id: string, on: boolean) =>
    setPendingIds((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  const briefForm = (brief: Brief) => {
    const fd = new FormData();
    fd.set("key", adminKey);
    fd.set("id", brief.id);
    return fd;
  };

  const setTreated = (brief: Brief, isRead: boolean) => {
    if (pendingIds.has(brief.id)) return;
    setPending(brief.id, true);
    startTransition(async () => {
      applyBrief({ id: brief.id, isRead });
      const fd = briefForm(brief);
      fd.set("isRead", String(isRead));
      const res = await markMessageReadAction(null, fd).catch(() => undefined);
      setPending(brief.id, false);
      if (!res?.success) {
        fail(res, "Le brief n’a pas changé de statut. Réessaie dans un instant.");
        return;
      }
      toast({
        tone: "success",
        text: isRead ? `Brief de ${brief.name} rangé dans « Traités ».` : `Brief de ${brief.name} remis dans « À traiter ».`,
        action: { label: "Annuler", onAction: () => setTreated({ ...brief, isRead }, !isRead) },
      });
    });
  };

  const remove = (brief: Brief) => {
    if (pendingIds.has(brief.id)) return;
    setPending(brief.id, true);
    go({ view: "briefs", tab: brief.isRead ? "done" : "todo" }, { replace: true });
    startTransition(async () => {
      applyBrief({ id: brief.id, deleted: true });
      const res = await deleteMessageAction(null, briefForm(brief)).catch(() => undefined);
      setPending(brief.id, false);
      if (!res?.success) {
        fail(res, `Le brief de ${brief.name} n’a pas pu être supprimé. Il est toujours dans la liste.`);
        return;
      }
      toast({ tone: "success", text: `Brief de ${brief.name} supprimé.` });
    });
  };

  const todoCount = liveBriefs.filter((b) => !b.isRead).length;
  const editing =
    route.view === "editor"
      ? route.project === NEW_PROJECT
        ? { project: null, found: true }
        : { project: projects.find((p) => p.id === route.project) ?? null, found: projects.some((p) => p.id === route.project) }
      : null;

  // On phones, a detail or edit screen replaces the tab bar with its own actions.
  const focusedTask = route.view === "editor" || (route.view === "briefs" && !!route.brief);

  const screenKey = route.view === "editor" ? `editor:${route.project}` : route.view;
  const firstRender = useRef(true);
  useEffect(() => {
    document.title = `${route.view === "briefs" ? "Briefs" : "Projets"} — Administration`;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    document.querySelector<HTMLElement>("[data-screen-title]")?.focus({ preventScroll: true });
  }, [screenKey, route.view]);

  const section: "briefs" | "projects" = route.view === "briefs" ? "briefs" : "projects";

  return (
    <div className="min-h-svh lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[var(--a-line)] bg-[var(--a-bg)] lg:flex">
        <div className="px-5 pb-6 pt-6">
          <p className="a-brand text-lg">Studio Edo</p>
          <p className="a-meta">Administration</p>
        </div>
        <nav className="flex-1 space-y-1 px-3" aria-label="Sections">
          <SideItem to={{ view: "briefs" }} active={section === "briefs"} label="Briefs" count={todoCount ? `${todoCount} à traiter` : undefined} />
          <SideItem to={{ view: "projects" }} active={section === "projects"} label="Projets" count={`${projects.length}`} />
        </nav>
        <div className="grid gap-1 border-t border-[var(--a-line)] p-3">
          <a href="/" target="_blank" rel="noopener" className="a-nav-item">
            Voir le site <span className="a-meta font-normal">nouvel onglet</span>
          </a>
          <a href="/admin" className="a-nav-item">
            Verrouiller
          </a>
        </div>
      </aside>

      <header className="flex h-12 items-center justify-between border-b border-[var(--a-line)] px-4 lg:hidden">
        <p className="a-brand">
          Studio Edo <span className="a-meta font-sans">· Administration</span>
        </p>
        <a href="/admin" className="a-link text-sm">
          Verrouiller
        </a>
      </header>

      <div className="space-y-2 px-4 pt-4 lg:px-10 lg:pt-6 empty:hidden">
        {dataUnavailable && (
          <div className="a-banner a-banner--danger" role="alert">
            <p className="flex-1">
              Les données du site sont injoignables pour le moment. Les listes ci-dessous sont vides à tort, et rien ne
              pourra être enregistré tant que la connexion à la base ne revient pas.
            </p>
            <button type="button" className="a-btn a-btn--secondary" onClick={() => router.refresh()}>
              Réessayer
            </button>
          </div>
        )}
        {!online && (
          <div className="a-banner a-banner--warn" role="status">
            Pas de connexion internet. Tu peux lire, mais aucune modification ne partira avant le retour du réseau.
          </div>
        )}
      </div>

      <main className="px-4 pb-28 pt-6 lg:px-10 lg:pb-12">
        {route.view === "briefs" && (
          <BriefsView
            briefs={liveBriefs}
            selectedId={route.brief}
            tab={route.tab ?? "todo"}
            dataUnavailable={dataUnavailable}
            actions={{ setTreated, remove, pendingIds }}
            online={online}
          />
        )}
        {route.view === "projects" && (
          <ProjectsView projects={projects} identities={identities} adminKey={adminKey} dataUnavailable={dataUnavailable} />
        )}
        {editing && editing.found && (
          <ProjectEditor
            key={route.view === "editor" ? route.project : ""}
            project={editing.project}
            projects={projects}
            categories={categories}
            images={images}
            identities={identities}
            canSave={online && !dataUnavailable}
          />
        )}
        {editing && !editing.found && (
          <div className="mx-auto max-w-2xl">
            <ScreenHeader eyebrow={<BackLink to={{ view: "projects" }} label="Projets" />} title="Projet introuvable" />
            <EmptyState
              title={dataUnavailable ? "Impossible de charger ce projet" : "Ce projet n’existe plus"}
              body={
                dataUnavailable
                  ? "Les données sont injoignables. Réessaie quand la connexion à la base est revenue."
                  : "Il a peut-être été retiré du site, ou le lien est incomplet."
              }
              action={
                <AdminLink to={{ view: "projects" }} className="a-btn a-btn--primary">
                  Revenir aux projets
                </AdminLink>
              }
            />
          </div>
        )}
      </main>

      {!focusedTask && (
        <nav className="a-tabbar fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 lg:hidden" aria-label="Sections">
          <TabItem to={{ view: "briefs" }} active={section === "briefs"} label="Briefs" count={todoCount ? `${todoCount} à traiter` : "à jour"} />
          <TabItem to={{ view: "projects" }} active={section === "projects"} label="Projets" count={`${projects.length} en ligne`} />
        </nav>
      )}
    </div>
  );
}

function SideItem({ to, active, label, count }: { to: AdminRoute; active: boolean; label: string; count?: string }) {
  return (
    <AdminLink to={to} className="a-nav-item" aria-current={active ? "page" : undefined}>
      <span>{label}</span>
      {count ? <span className="a-meta font-normal">{count}</span> : null}
    </AdminLink>
  );
}

function TabItem({ to, active, label, count }: { to: AdminRoute; active: boolean; label: string; count: string }) {
  return (
    <AdminLink to={to} className="a-tabbar-item" aria-current={active ? "page" : undefined}>
      <span>{label}</span>
      <span className="a-meta font-normal">{count}</span>
    </AdminLink>
  );
}