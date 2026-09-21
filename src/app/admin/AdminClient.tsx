/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useActionState, useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  upsertProjectAction,
  deleteProjectAction,
  deleteMessageAction,
  markMessageReadAction,
  ActionState,
} from "./actions";
import { adminPath } from "./admin-path";

type Project = {
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
  createdAt: Date;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  services: string[];
  timeline: string | null;
  isRead: boolean;
  createdAt: Date;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

type AdminClientProps = {
  projects: Project[];
  projectToEdit: Project | null;
  adminKey: string;
  stats: { visits: number; messages: number; projects: number };
  contactMessages?: ContactMessage[];
  categories?: Category[];
};

type View = "home" | "projects" | "editor" | "messages" | "missing";

export default function AdminClient({
  projects,
  projectToEdit,
  adminKey,
  stats,
  contactMessages = [],
  categories = [],
}: AdminClientProps) {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const editId = searchParams.get("editId");

  const [upsertState, upsertFormAction, isUpsertPending] = useActionState(
    upsertProjectAction,
    null as ActionState
  );
  const [deleteState, deleteFormAction, isDeletePending] = useActionState(
    deleteProjectAction,
    null as ActionState
  );
  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const res = upsertState || deleteState;
    if (!res?.message) return;
    setToast({ text: res.message, type: res.success ? "success" : "error" });
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [upsertState, deleteState]);

  let currentView: View = "home";
  if (editId && editId !== "new" && !projectToEdit) currentView = "missing";
  else if (editId || projectToEdit) currentView = "editor";
  else if (viewParam === "projects") currentView = "projects";
  else if (viewParam === "messages") currentView = "messages";

  const unreadCount = contactMessages.filter((m) => !m.isRead).length;
  const titles: Record<View, string> = {
    home: "Aujourd’hui",
    projects: "Projets",
    editor: projectToEdit ? "Modifier le projet" : "Nouveau projet",
    messages: "Briefs",
    missing: "Projet introuvable",
  };

  return (
    <div className="min-h-svh lg:pl-60">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/10 bg-zinc-950 lg:flex">
        <div className="flex h-14 items-center px-5">
          <p className="text-sm font-semibold tracking-tight text-white">Studio Edo</p>
        </div>
        <nav className="flex-1 space-y-1 px-3" aria-label="Administration">
          <NavItem href={adminPath(adminKey)} active={currentView === "home"} label="Aujourd’hui" />
          <NavItem
            href={adminPath(adminKey, { view: "projects" })}
            active={currentView === "projects" || currentView === "editor" || currentView === "missing"}
            label="Projets"
            hint={`${projects.length}`}
          />
          <NavItem
            href={adminPath(adminKey, { view: "messages" })}
            active={currentView === "messages"}
            label="Briefs"
            hint={unreadCount > 0 ? `${unreadCount}` : undefined}
            alert={unreadCount > 0}
          />
        </nav>
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex min-h-11 items-center rounded-xl px-3 text-sm text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            Voir le site
          </Link>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-zinc-950/90 px-4 backdrop-blur lg:px-8">
        <h1 className="text-sm font-semibold text-white">{titles[currentView]}</h1>
        <p className="text-xs text-zinc-500">
          {stats.visits} visites · {projects.length} projets
        </p>
      </header>

      <main className="px-4 py-6 pb-24 lg:px-8 lg:pb-10">
        {currentView === "home" && (
          <HomeView
            adminKey={adminKey}
            projects={projects}
            contactMessages={contactMessages}
            unreadCount={unreadCount}
          />
        )}
        {currentView === "projects" && (
          <ProjectsView
            projects={projects}
            adminKey={adminKey}
            deleteFormAction={deleteFormAction}
            isDeletePending={isDeletePending}
          />
        )}
        {currentView === "editor" && (
          <EditorView
            projectToEdit={projectToEdit}
            adminKey={adminKey}
            upsertFormAction={upsertFormAction}
            isUpsertPending={isUpsertPending}
            upsertState={upsertState}
            categories={categories}
          />
        )}
        {currentView === "messages" && (
          <MessagesView contactMessages={contactMessages} adminKey={adminKey} />
        )}
        {currentView === "missing" && (
          <EmptyState
            title="Ce projet n’existe plus"
            body="Le lien est périmé, ou le projet a déjà été retiré du catalogue."
            actionLabel="Retour aux projets"
            actionHref={adminPath(adminKey, { view: "projects" })}
          />
        )}
      </main>

      <nav
        className="admin-bottom-nav fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-zinc-950 lg:hidden"
        aria-label="Navigation principale"
      >
        <MobileNav href={adminPath(adminKey)} active={currentView === "home"} label="Aujourd’hui" />
        <MobileNav
          href={adminPath(adminKey, { view: "projects" })}
          active={currentView === "projects" || currentView === "editor"}
          label="Projets"
        />
        <MobileNav
          href={adminPath(adminKey, { view: "messages" })}
          active={currentView === "messages"}
          label="Briefs"
          badge={unreadCount}
        />
      </nav>

      {toast && (
        <div
          role="status"
          className={`fixed bottom-24 right-4 z-50 max-w-sm rounded-xl border px-4 py-3 text-sm lg:bottom-6 ${
            toast.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-200"
              : "border-rose-500/30 bg-rose-500/15 text-rose-200"
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}

function NavItem({
  href,
  label,
  active,
  hint,
  alert,
}: {
  href: string;
  label: string;
  active: boolean;
  hint?: string;
  alert?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-11 items-center justify-between rounded-xl px-3 text-sm ${
        active ? "bg-white text-black" : "text-zinc-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span>{label}</span>
      {hint ? (
        <span className={alert && !active ? "text-[#d7fb61]" : active ? "text-zinc-600" : "text-zinc-500"}>
          {hint}
        </span>
      ) : null}
    </Link>
  );
}

function MobileNav({
  href,
  label,
  active,
  badge,
}: {
  href: string;
  label: string;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative flex min-h-14 items-center justify-center text-xs font-medium ${
        active ? "text-white" : "text-zinc-500"
      }`}
    >
      {label}
      {badge ? (
        <span className="absolute right-6 top-2 rounded-full bg-[#d7fb61] px-1.5 text-[10px] font-bold text-black">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

function HomeView({
  adminKey,
  projects,
  contactMessages,
  unreadCount,
}: {
  adminKey: string;
  projects: Project[];
  contactMessages: ContactMessage[];
  unreadCount: number;
}) {
  const waiting = contactMessages.filter((m) => !m.isRead).slice(0, 4);

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <p className="text-sm text-zinc-400">Ce qui demande une action maintenant.</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">
            {unreadCount > 0 ? `${unreadCount} brief${unreadCount > 1 ? "s" : ""} en attente` : "Aucun brief en attente"}
          </h2>
          <Link
            href={adminPath(adminKey, { view: "messages" })}
            className="text-sm text-zinc-400 hover:text-white"
          >
            Tous les briefs
          </Link>
        </div>

        {waiting.length === 0 ? (
          <p className="rounded-xl border border-white/10 px-4 py-5 text-sm text-zinc-500">
            Rien à répondre pour le moment. Les nouveaux briefs du site arriveront ici.
          </p>
        ) : (
          <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
            {waiting.map((m) => (
              <li key={m.id}>
                <Link
                  href={adminPath(adminKey, { view: "messages" })}
                  className="flex min-h-14 items-center justify-between gap-4 px-4 py-3 hover:bg-white/5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{m.name}</p>
                    <p className="truncate text-xs text-zinc-500">{m.email}</p>
                  </div>
                  <span className="text-sm text-[#d7fb61]">Ouvrir</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Projets</h2>
          <Link
            href={adminPath(adminKey, { view: "projects", editId: "new" })}
            className="text-sm font-medium text-[#d7fb61] hover:text-white"
          >
            Nouveau
          </Link>
        </div>
        {projects.length === 0 ? (
          <EmptyState
            title="Le catalogue est vide"
            body="Publie une première étude de cas pour qu’elle apparaisse sur le site."
            actionLabel="Créer un projet"
            actionHref={adminPath(adminKey, { view: "projects", editId: "new" })}
          />
        ) : (
          <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
            {projects.slice(0, 6).map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-3 py-2.5">
                <img src={p.coverImage || "/moi.png"} alt="" className="h-10 w-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">{p.title}</p>
                  <p className="text-xs text-zinc-500">{p.category?.name ?? "Sans catégorie"}</p>
                </div>
                <Link
                  href={adminPath(adminKey, { view: "projects", editId: p.id })}
                  className="shrink-0 min-h-11 px-2 text-sm text-zinc-300 hover:text-white"
                >
                  Modifier
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ProjectsView({
  projects,
  adminKey,
  deleteFormAction,
  isDeletePending,
}: {
  projects: Project[];
  adminKey: string;
  deleteFormAction: (payload: FormData) => void;
  isDeletePending: boolean;
}) {
  const [query, setQuery] = useState("");
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.category?.name || "").toLowerCase().includes(q)
    );
  }, [projects, query]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="block w-full flex-1">
          <span className="sr-only">Rechercher un projet</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un titre, une catégorie…"
            className="admin-input"
          />
        </label>
        <Link
          href={adminPath(adminKey, { view: "projects", editId: "new" })}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d7fb61] px-4 text-sm font-semibold text-black"
        >
          Nouveau projet
        </Link>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="Aucun projet publié"
          body="Le site affiche encore le contenu de secours. Crée une étude de cas pour prendre la main."
          actionLabel="Créer un projet"
          actionHref={adminPath(adminKey, { view: "projects", editId: "new" })}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={`Rien pour « ${query} »`}
          body="Aucun titre ni catégorie ne correspond. Efface la recherche pour revoir tout le catalogue."
          actionLabel="Effacer la recherche"
          onAction={() => setQuery("")}
        />
      ) : (
        <>
          <ul className="space-y-3 md:hidden">
            {filtered.map((project) => (
              <li key={project.id} className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
                <div className="flex gap-3">
                  <img src={project.coverImage || "/moi.png"} alt="" className="h-14 w-20 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="font-medium text-white">{project.title}</p>
                    <p className="text-xs text-zinc-500">{project.category?.name ?? "Sans catégorie"}</p>
                    <p className="mt-1 text-xs text-zinc-400">
                      {project.isFeatured ? "Mis en avant" : "Standard"} · ordre {project.sortOrder}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={adminPath(adminKey, { view: "projects", editId: project.id })}
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white text-sm font-semibold text-black"
                  >
                    Modifier
                  </Link>
                  <Link
                    href={`/works/${project.slug}`}
                    target="_blank"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-3 text-sm text-zinc-300"
                  >
                    Voir
                  </Link>
                  <button
                    type="button"
                    onClick={() => setProjectToDelete(project)}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl px-3 text-sm text-rose-300"
                  >
                    Retirer
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-hidden rounded-xl border border-white/10 md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-zinc-500">
                  <th className="px-4 py-3 font-medium">Projet</th>
                  <th className="px-4 py-3 font-medium">Catégorie</th>
                  <th className="px-4 py-3 font-medium">Statut</th>
                  <th className="px-4 py-3 font-medium">Ordre</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.03]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.coverImage || "/moi.png"}
                          alt=""
                          className="h-10 w-14 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-white">{project.title}</p>
                          <p className="text-xs text-zinc-500">/works/{project.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-300">{project.category?.name ?? "Sans catégorie"}</td>
                    <td className="px-4 py-3 text-zinc-300">{project.isFeatured ? "Mis en avant" : "Standard"}</td>
                    <td className="px-4 py-3 text-zinc-400">{String(project.sortOrder).padStart(2, "0")}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        <Link href={`/works/${project.slug}`} target="_blank" className="text-zinc-400 hover:text-white">
                          Voir
                        </Link>
                        <Link
                          href={adminPath(adminKey, { view: "projects", editId: project.id })}
                          className="font-medium text-white hover:text-[#d7fb61]"
                        >
                          Modifier
                        </Link>
                        <button
                          type="button"
                          onClick={() => setProjectToDelete(project)}
                          className="text-rose-300 hover:text-rose-200"
                        >
                          Retirer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {projectToDelete && (
        <ConfirmDialog
          title={`Retirer « ${projectToDelete.title} » ?`}
          body="Le projet disparaîtra du site. Cette action ne se défait pas."
          confirmLabel={isDeletePending ? "Retrait…" : "Retirer définitivement"}
          pending={isDeletePending}
          onCancel={() => setProjectToDelete(null)}
        >
          <form action={deleteFormAction}>
            <input type="hidden" name="key" value={adminKey} />
            <input type="hidden" name="id" value={projectToDelete.id} />
            <button
              type="submit"
              disabled={isDeletePending}
              onClick={() => setProjectToDelete(null)}
              className="min-h-11 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white disabled:opacity-50"
            >
              {isDeletePending ? "Retrait…" : "Retirer définitivement"}
            </button>
          </form>
        </ConfirmDialog>
      )}
    </div>
  );
}

function EditorView({
  projectToEdit,
  adminKey,
  upsertFormAction,
  isUpsertPending,
  upsertState,
  categories,
}: {
  projectToEdit: Project | null;
  adminKey: string;
  upsertFormAction: (payload: FormData) => void;
  isUpsertPending: boolean;
  upsertState: ActionState | null;
  categories: Category[];
}) {
  const [title, setTitle] = useState(projectToEdit?.title ?? "");
  const [slug, setSlug] = useState(projectToEdit?.slug ?? "");
  const [coverUrl, setCoverUrl] = useState(projectToEdit?.coverImage ?? "");
  const backHref = adminPath(adminKey, { view: "projects" });

  const generateSlugFromTitle = () => {
    setSlug(
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-24 lg:pb-8">
      <Link href={backHref} className="inline-flex min-h-11 items-center text-sm text-zinc-400 hover:text-white">
        Retour aux projets
      </Link>
      <p className="text-sm text-zinc-400">
        {projectToEdit
          ? "Les changements remplacent la fiche publique dès l’enregistrement."
          : "La fiche sera visible sur le site dès l’enregistrement."}
      </p>

      <form action={upsertFormAction} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <input type="hidden" name="key" value={adminKey} />
          <input type="hidden" name="id" value={projectToEdit?.id ?? ""} />

          <fieldset className="space-y-4 rounded-xl border border-white/10 p-5">
            <legend className="px-1 text-sm font-semibold text-white">Fiche</legend>
            <Field label="Titre" error={upsertState?.errors?.title?.[0]}>
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="admin-input"
                placeholder="Garden — marketplace B2B"
              />
            </Field>
            <Field
              label="Adresse de la page"
              hint={`Apparaîtra comme /works/${slug || "…"}`}
              error={upsertState?.errors?.slug?.[0]}
            >
              <div className="flex gap-2">
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="admin-input font-mono"
                />
                <button
                  type="button"
                  onClick={generateSlugFromTitle}
                  className="min-h-12 shrink-0 rounded-xl border border-white/10 px-3 text-xs text-zinc-300"
                >
                  Depuis le titre
                </button>
              </div>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Catégorie">
                <input
                  name="category"
                  list="categories-list"
                  defaultValue={projectToEdit?.category?.name ?? "Web & SaaS"}
                  required
                  className="admin-input"
                />
                <datalist id="categories-list">
                  {categories.map((c) => (
                    <option key={c.id} value={c.name} />
                  ))}
                </datalist>
              </Field>
              <Field label="Ordre dans la liste">
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={projectToEdit?.sortOrder ?? 0}
                  className="admin-input"
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="space-y-4 rounded-xl border border-white/10 p-5">
            <legend className="px-1 text-sm font-semibold text-white">Textes</legend>
            <Field label="Accroche" error={upsertState?.errors?.excerpt?.[0]}>
              <textarea
                name="excerpt"
                rows={3}
                defaultValue={projectToEdit?.excerpt}
                required
                className="admin-input"
                placeholder="Une phrase pour la carte du projet."
              />
            </Field>
            <Field label="Étude de cas" error={upsertState?.errors?.description?.[0]}>
              <textarea
                name="description"
                rows={8}
                defaultValue={projectToEdit?.description}
                required
                className="admin-input"
                placeholder="Contexte, choix, résultat."
              />
            </Field>
          </fieldset>
        </div>

        <div className="space-y-6">
          <fieldset className="space-y-4 rounded-xl border border-white/10 p-5">
            <legend className="px-1 text-sm font-semibold text-white">Visuel et liens</legend>
            <Field label="Image de couverture">
              <input
                name="coverImage"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                required
                className="admin-input"
                placeholder="/Garden.png"
              />
              {coverUrl ? (
                <img src={coverUrl} alt="Aperçu de la couverture" className="mt-2 h-28 w-full rounded-lg object-cover" />
              ) : null}
            </Field>
            <Field label="Outils (séparés par des virgules)">
              <input
                name="technologies"
                defaultValue={projectToEdit?.technologies?.join(", ")}
                required
                className="admin-input"
                placeholder="Next.js, Figma"
              />
            </Field>
            <Field label="Lien du site, s’il existe">
              <input name="projectUrl" type="url" defaultValue={projectToEdit?.projectUrl ?? ""} className="admin-input" />
            </Field>
            <Field label="Dépôt du code, s’il est public">
              <input name="repository" type="url" defaultValue={projectToEdit?.repository ?? ""} className="admin-input" />
            </Field>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-white">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={projectToEdit?.isFeatured}
                className="h-4 w-4 accent-[#d7fb61]"
              />
              Mettre en avant sur le site
            </label>
          </fieldset>
        </div>

        <div className="fixed inset-x-0 bottom-16 z-20 border-t border-white/10 bg-zinc-950/95 px-4 py-3 lg:static lg:col-span-3 lg:border-0 lg:bg-transparent lg:p-0">
          <div className="mx-auto flex max-w-4xl gap-3">
            <Link
              href={backHref}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-white/10 text-sm text-zinc-300 lg:flex-none lg:px-5"
            >
              Abandonner
            </Link>
            <button
              type="submit"
              disabled={isUpsertPending}
              className="inline-flex min-h-12 flex-[2] items-center justify-center rounded-xl bg-[#d7fb61] px-5 text-sm font-semibold text-black disabled:opacity-50 lg:flex-none"
            >
              {isUpsertPending ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function MessagesView({
  contactMessages,
  adminKey,
}: {
  contactMessages: ContactMessage[];
  adminKey: string;
}) {
  const [, startTransition] = useTransition();
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">(
    contactMessages.some((m) => !m.isRead) ? "UNREAD" : "ALL"
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDetail, setMobileDetail] = useState(false);
  const [toDelete, setToDelete] = useState<ContactMessage | null>(null);

  const filtered = contactMessages.filter((m) => {
    if (filter === "UNREAD") return !m.isRead;
    if (filter === "READ") return m.isRead;
    return true;
  });

  const selected = filtered.find((m) => m.id === selectedId) ?? filtered[0] ?? null;

  const unreadCount = contactMessages.filter((m) => !m.isRead).length;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["UNREAD", "ALL", "READ"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setFilter(id);
              setSelectedId(null);
              setMobileDetail(false);
            }}
            className={`min-h-11 rounded-full px-4 text-sm ${
              filter === id ? "bg-white text-black" : "border border-white/10 text-zinc-400"
            }`}
          >
            {id === "UNREAD" ? `À répondre (${unreadCount})` : id === "ALL" ? `Tous (${contactMessages.length})` : "Déjà lus"}
          </button>
        ))}
      </div>

      {contactMessages.length === 0 ? (
        <EmptyState
          title="Aucun brief reçu"
          body="Quand quelqu’un envoie le formulaire du site, le message arrive ici."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={filter === "UNREAD" ? "Rien à répondre" : "Aucun brief lu"}
          body={filter === "UNREAD" ? "Tous les briefs ont déjà été traités." : "Passe sur « Tous » pour revoir l’historique."}
          actionLabel="Voir tous les briefs"
          onAction={() => setFilter("ALL")}
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <ul className={`${mobileDetail ? "hidden lg:block" : "block"} divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10`}>
            {filtered.map((msg) => (
              <li key={msg.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(msg.id);
                    setMobileDetail(true);
                  }}
                  className={`flex min-h-14 w-full flex-col items-start px-4 py-3 text-left ${
                    selected?.id === msg.id ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-white">
                    {!msg.isRead && <span className="h-2 w-2 rounded-full bg-[#d7fb61]" aria-hidden />}
                    {msg.name}
                  </span>
                  <span className="truncate text-xs text-zinc-500">{msg.email}</span>
                </button>
              </li>
            ))}
          </ul>

          {selected && (
            <article className={`${mobileDetail ? "block" : "hidden"} rounded-xl border border-white/10 p-5 lg:block`}>
              <button
                type="button"
                onClick={() => setMobileDetail(false)}
                className="mb-3 min-h-11 text-sm text-zinc-400 lg:hidden"
              >
                Tous les briefs
              </button>
              <header className="mb-4">
                <h2 className="text-lg font-semibold text-white">{selected.name}</h2>
                <p className="text-sm text-zinc-400">{selected.email}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {new Date(selected.createdAt).toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </header>

              {(selected.services?.length > 0 || selected.timeline) && (
                <p className="mb-3 flex flex-wrap gap-2 text-xs">
                  {selected.services?.map((service) => (
                    <span key={service} className="rounded-full bg-[#d7fb61]/15 px-2 py-1 text-[#d7fb61]">
                      {service}
                    </span>
                  ))}
                  {selected.timeline ? (
                    <span className="rounded-full bg-white/10 px-2 py-1 text-zinc-300">{selected.timeline}</span>
                  ) : null}
                </p>
              )}

              <div className="whitespace-pre-wrap rounded-xl bg-black/30 p-4 text-sm leading-relaxed text-zinc-200">
                {selected.message}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent("Suite à votre brief")}`}
                  className="inline-flex min-h-11 items-center rounded-xl bg-white px-4 text-sm font-semibold text-black"
                >
                  Répondre
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const formData = new FormData();
                    formData.append("key", adminKey);
                    formData.append("id", selected.id);
                    formData.append("isRead", (!selected.isRead).toString());
                    startTransition(() => {
                      markMessageReadAction(null, formData);
                    });
                  }}
                  className="inline-flex min-h-11 items-center rounded-xl border border-white/10 px-4 text-sm text-zinc-300"
                >
                  {selected.isRead ? "Remettre en attente" : "Marquer comme traité"}
                </button>
                <button
                  type="button"
                  onClick={() => setToDelete(selected)}
                  className="inline-flex min-h-11 items-center px-4 text-sm text-rose-300"
                >
                  Supprimer
                </button>
              </div>
            </article>
          )}
        </div>
      )}

      {toDelete && (
        <ConfirmDialog
          title={`Supprimer le brief de ${toDelete.name} ?`}
          body="Le message disparaîtra de la liste. Tu pourras toujours lui écrire si tu as son email."
          confirmLabel="Supprimer"
          onCancel={() => setToDelete(null)}
        >
          <form
            action={(formData: FormData) => {
              startTransition(() => {
                deleteMessageAction(null, formData);
              });
              setToDelete(null);
            }}
          >
            <input type="hidden" name="key" value={adminKey} />
            <input type="hidden" name="id" value={toDelete.id} />
            <button type="submit" className="min-h-11 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">
              Supprimer
            </button>
          </form>
        </ConfirmDialog>
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-zinc-200">{label}</p>
      {children}
      {hint ? <p className="text-xs text-zinc-500">{hint}</p> : null}
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}

function EmptyState({
  title,
  body,
  actionLabel,
  actionHref,
  onAction,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/15 px-6 py-12 text-center">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">{body}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#d7fb61] px-4 text-sm font-semibold text-black"
        >
          {actionLabel}
        </Link>
      ) : null}
      {onAction && actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#d7fb61] px-4 text-sm font-semibold text-black"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

function ConfirmDialog({
  title,
  body,
  confirmLabel,
  pending,
  onCancel,
  children,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  pending?: boolean;
  onCancel: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={onCancel}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-5" onClick={(e) => e.stopPropagation()}>
        <h2 id="confirm-title" className="text-lg font-semibold text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-400">{body}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="min-h-11 rounded-xl px-4 text-sm text-zinc-300 hover:text-white"
          >
            Annuler
          </button>
          {children}
        </div>
        <span className="sr-only">{confirmLabel}</span>
      </div>
    </div>
  );
}
