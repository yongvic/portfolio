/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useActionState, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  upsertProjectAction,
  deleteProjectAction,
  deleteMessageAction,
  markMessageReadAction,
  ActionState,
} from "./actions";

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
  stats: {
    visits: number;
    messages: number;
    projects: number;
  };
  contactMessages?: ContactMessage[];
  categories?: Category[];
};

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

  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(
    null
  );

  useEffect(() => {
    const res = upsertState || deleteState;
    if (res?.message) {
      setToastMessage({ text: res.message, type: res.success ? "success" : "error" });
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [upsertState, deleteState]);

  // Détermination de la vue active
  let currentView = viewParam || "dashboard";
  if (editId || projectToEdit) currentView = "editor";

  return (
    <div className="animate-in fade-in duration-300 w-full space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl transition-all animate-in slide-in-from-bottom-5 ${
            toastMessage.type === "success"
              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              : "bg-rose-500/15 text-rose-300 border-rose-500/30"
          }`}
        >
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              toastMessage.type === "success" ? "bg-emerald-400" : "bg-rose-400"
            }`}
          />
          <p className="text-sm font-medium">{toastMessage.text}</p>
        </div>
      )}

      {/* Navigation d'onglets pour tablettes/mobiles */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-2 border-b border-white/5">
        <Link
          href={`/admin?key=${adminKey}`}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            currentView === "dashboard" ? "bg-white text-black" : "bg-white/5 text-zinc-400"
          }`}
        >
          Vue d&apos;ensemble
        </Link>
        <Link
          href={`/admin?view=projects&key=${adminKey}`}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            currentView === "projects" || currentView === "editor"
              ? "bg-white text-black"
              : "bg-white/5 text-zinc-400"
          }`}
        >
          Projets ({projects.length})
        </Link>
        <Link
          href={`/admin?view=messages&key=${adminKey}`}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            currentView === "messages" ? "bg-white text-black" : "bg-white/5 text-zinc-400"
          }`}
        >
          Messages ({contactMessages.length})
        </Link>
      </div>

      {currentView === "dashboard" && (
        <DashboardView
          stats={stats}
          projects={projects}
          contactMessages={contactMessages}
          adminKey={adminKey}
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
    </div>
  );
}

// ----------------------------------------------------------------------
// 1. DASHBOARD VIEW (VUE D'ENSEMBLE)
// ----------------------------------------------------------------------
function DashboardView({
  stats,
  projects,
  contactMessages,
  adminKey,
}: {
  stats: AdminClientProps["stats"];
  projects: Project[];
  contactMessages: ContactMessage[];
  adminKey: string;
}) {
  const unreadCount = contactMessages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">
            Tableau de bord
          </h2>
          <p className="text-sm text-zinc-400">
            Aperçu télémétrique et gestion centralisée de votre portfolio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/admin?view=projects&editId=new&key=${adminKey}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs transition-all shadow-lg shadow-lime-400/10"
          >
            <span>+</span>
            <span>Nouveau projet</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-all"
          >
            <span>Voir le site live ↗</span>
          </Link>
        </div>
      </div>

      {/* Métriques clés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          label="Visites Enregistrées"
          value={stats.visits}
          icon="eye"
          description="Trafic cumulé sur le portfolio"
        />
        <StatsCard
          label="Projets au Catalogue"
          value={stats.projects}
          icon="box"
          description={`${projects.filter((p) => p.isFeatured).length} projets mis en avant`}
        />
        <StatsCard
          label="Briefs & Messages Reçus"
          value={contactMessages.length}
          icon="mail"
          trend={unreadCount > 0 ? `${unreadCount} non lu(s)` : "À jour"}
          trendPositive={unreadCount === 0}
          description="Demandes de collaboration"
        />
      </div>

      {/* Derniers projets & Derniers messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projets Récents */}
        <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Derniers projets</h3>
            <Link
              href={`/admin?view=projects&key=${adminKey}`}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Voir tout ({projects.length}) →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-12 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                    <img src={p.coverImage} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.title}</p>
                    <p className="text-xs text-zinc-500">{p.category?.name ?? "Général"}</p>
                  </div>
                </div>

                <Link
                  href={`/admin?view=projects&editId=${p.id}&key=${adminKey}`}
                  className="text-xs text-lime-400 hover:underline flex-shrink-0"
                >
                  Éditer
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Derniers messages */}
        <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Derniers briefs reçus</h3>
            <Link
              href={`/admin?view=messages&key=${adminKey}`}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Messagerie complète ({contactMessages.length}) →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {contactMessages.slice(0, 4).map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!m.isRead && <span className="h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />}
                    <p className="text-sm font-medium text-white truncate">{m.name}</p>
                  </div>
                  <p className="text-xs text-zinc-500 truncate">{m.email}</p>
                </div>

                <Link
                  href={`/admin?view=messages&key=${adminKey}`}
                  className="text-xs text-zinc-400 hover:text-white flex-shrink-0"
                >
                  Consulter
                </Link>
              </div>
            ))}

            {contactMessages.length === 0 && (
              <p className="py-8 text-center text-xs text-zinc-500">
                Aucun message reçu pour le moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. PROJECTS VIEW (GESTION DES PROJETS)
// ----------------------------------------------------------------------
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
  const [filterQuery, setFilterQuery] = useState("");
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const q = filterQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      (p.category?.name || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            Catalogue de Projets
          </h2>
          <p className="text-sm text-zinc-400">
            Gérez, ordonnez et publiez vos études de cas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Filtrer un projet..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-lime-400"
          />

        <Link
          href={`/admin?view=projects&editId=new&key=${adminKey}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs transition-all shadow-md active:scale-95 whitespace-nowrap"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
            Nouveau Projet
        </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-zinc-900/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                <th className="px-6 py-4 font-medium">Projet</th>
                <th className="px-6 py-4 font-medium">Catégorie</th>
                <th className="px-6 py-4 font-medium">Mise en avant</th>
                <th className="px-6 py-4 font-medium">Ordre</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((project) => (
                <tr key={project.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-14 rounded-lg bg-zinc-900 overflow-hidden flex-shrink-0 relative border border-white/5">
                        <img
                          src={project.coverImage || "/moi.png"}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-100">{project.title}</p>
                        <p className="text-xs text-zinc-500 mt-0.5 font-mono">/works/{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 border border-white/10">
                      {project.category?.name ?? "Général"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {project.isFeatured ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-lime-400 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                        En vedette
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-500">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-zinc-400">
                      {project.sortOrder.toString().padStart(2, "0")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/works/${project.slug}`}
                        target="_blank"
                        className="text-zinc-500 hover:text-white transition-all text-xs"
                        title="Voir la page publique"
                      >
                        Aperçu ↗
                      </Link>
                      <span className="text-zinc-700">|</span>
                      <Link
                        href={`/admin?view=projects&editId=${project.id}&key=${adminKey}`}
                        className="text-zinc-300 hover:text-lime-400 transition-all text-xs font-medium"
                      >
                        Modifier
                      </Link>
                      <span className="text-zinc-700">|</span>
                        <button
                        onClick={() => setProjectToDelete(project)}
                        className="text-rose-400 hover:text-rose-300 transition-all text-xs font-medium"
                      >
                        Supprimer
                        </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-zinc-500 text-sm">
                    Aucun projet correspondant à vos critères.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Confirmation de Suppression Non-Bloquante */}
      {projectToDelete && (
        <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Confirmer la suppression</h3>
            <p className="text-sm text-zinc-400">
              Êtes-vous sûr de vouloir supprimer définitivement le projet «{" "}
              <strong className="text-white">{projectToDelete.title}</strong> » ? Cette action est irréversible.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Annuler
              </button>

              <form action={deleteFormAction}>
                <input type="hidden" name="key" value={adminKey} />
                <input type="hidden" name="id" value={projectToDelete.id} />
                <button
                  type="submit"
                  disabled={isDeletePending}
                  onClick={() => setProjectToDelete(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all disabled:opacity-50"
                >
                  {isDeletePending ? "Suppression..." : "Confirmer la suppression"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. EDITOR VIEW (ÉDITION DE PROJET)
// ----------------------------------------------------------------------
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

  const generateSlugFromTitle = () => {
    const gen = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(gen);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/admin?view=projects&key=${adminKey}`}
            className="group inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors mb-3"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour au catalogue de projets
          </Link>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {projectToEdit ? `Modifier : ${projectToEdit.title}` : "Créer une nouvelle étude de cas"}
          </h2>
        </div>
      </div>

      <form action={upsertFormAction} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Informations générales */}
          <Section title="Informations Principales">
              <input type="hidden" name="key" value={adminKey} />
              <input type="hidden" name="id" value={projectToEdit?.id ?? ""} />

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Titre du Projet *</label>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Garden — SaaS B2B Coworking"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none"
                  required
                />
                {upsertState?.errors?.title && (
                  <p className="text-xs text-rose-400 mt-1">{upsertState.errors.title[0]}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-zinc-300">Identifiant URL (Slug) *</label>
                  <button
                    type="button"
                    onClick={generateSlugFromTitle}
                    className="text-[11px] text-lime-400 hover:underline"
                  >
                    Générer depuis le titre
                  </button>
                </div>
                <input
                  name="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="ex: garden-saas"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm font-mono focus:border-lime-400 focus:outline-none"
                  required
                />
                {upsertState?.errors?.slug && (
                  <p className="text-xs text-rose-400 mt-1">{upsertState.errors.slug[0]}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Catégorie *</label>
                  <input
                    name="category"
                    list="categories-list"
                    defaultValue={projectToEdit?.category?.name ?? "Web & SaaS"}
                    placeholder="Ex: Web, Graphic, Automatisation"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none"
                    required
                  />
                  <datalist id="categories-list">
                    {categories.map((c) => (
                      <option key={c.id} value={c.name} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Ordre d&apos;affichage</label>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={projectToEdit?.sortOrder ?? 0}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* Textes et contenus */}
          <Section title="Contenu & Étude de Cas">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Résumé court (Excerpt) *</label>
                <textarea
                  name="excerpt"
                  rows={3}
                  defaultValue={projectToEdit?.excerpt}
                  placeholder="Une phrase d'accroche pour la carte de présentation..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none"
                  required
                />
                {upsertState?.errors?.excerpt && (
                  <p className="text-xs text-rose-400 mt-1">{upsertState.errors.excerpt[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Description complète du projet *</label>
                <textarea
                  name="description"
                  rows={8}
                  defaultValue={projectToEdit?.description}
                  placeholder="Détaillez les défis, les choix technologiques et les résultats mesurables..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none"
                  required
                />
                {upsertState?.errors?.description && (
                  <p className="text-xs text-rose-400 mt-1">{upsertState.errors.description[0]}</p>
                )}
              </div>
            </div>
          </Section>
        </div>

        {/* Colonne latérale : Média & Publication */}
        <div className="space-y-8">
          <Section title="Publication">
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isUpsertPending}
                className="w-full py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-sm font-bold transition-all shadow-lg shadow-lime-400/10 disabled:opacity-50"
              >
                {isUpsertPending ? "Enregistrement en cours..." : "Enregistrer le projet"}
              </button>

              <Link
                href={`/admin?view=projects&key=${adminKey}`}
                className="block w-full py-3 rounded-xl border border-white/10 text-center text-xs font-medium text-zinc-400 hover:bg-white/5 transition-all"
              >
                Annuler
              </Link>
            </div>
          </Section>

          <Section title="Visuels & Liens">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Image de couverture (URL) *</label>
                <input
                  name="coverImage"
                  type="text"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="/moi.png ou https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none"
                  required
                />
                {coverUrl && (
                  <div className="mt-2 h-24 rounded-lg overflow-hidden border border-white/10 bg-zinc-950">
                    <img src={coverUrl} alt="Aperçu" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Technologies (séparées par des virgules) *</label>
                <input
                  name="technologies"
                  type="text"
                  defaultValue={projectToEdit?.technologies?.join(", ")}
                  placeholder="Next.js, TypeScript, Tailwind, Figma"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Lien de production (Live URL)</label>
                <input
                  name="projectUrl"
                  type="url"
                  defaultValue={projectToEdit?.projectUrl ?? ""}
                  placeholder="https://monprojet.vercel.app"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none"
                />
            </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Dépôt GitHub (Repository)</label>
                <input
                  name="repository"
                  type="url"
                  defaultValue={projectToEdit?.repository ?? ""}
                  placeholder="https://github.com/yongvic/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={projectToEdit?.isFeatured}
                    className="h-4 w-4 rounded bg-zinc-900 border-white/20 text-lime-400 focus:ring-lime-400"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">Mettre en avant ce projet</span>
                    <span className="text-[11px] text-zinc-500 block">Afficher en priorité dans la grille</span>
                  </div>
              </label>
              </div>
            </div>
          </Section>
        </div>
      </form>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. MESSAGES VIEW (MESSAGERIE DE BRIEFS & CONTACTS)
// ----------------------------------------------------------------------
function MessagesView({
  contactMessages,
  adminKey,
}: {
  contactMessages: ContactMessage[];
  adminKey: string;
}) {
  const [, startTransition] = useTransition();
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");

  const filteredMessages = contactMessages.filter((m) => {
    if (filter === "UNREAD") return !m.isRead;
    if (filter === "READ") return m.isRead;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            Messagerie & Demandes de Briefs
          </h2>
          <p className="text-sm text-zinc-400">
            Consultez et répondez aux demandes de collaboration envoyées depuis le portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === "ALL" ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            Tous ({contactMessages.length})
          </button>
          <button
            onClick={() => setFilter("UNREAD")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === "UNREAD" ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            Non lus ({contactMessages.filter((m) => !m.isRead).length})
          </button>
          <button
            onClick={() => setFilter("READ")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === "READ" ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            Lus
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-2xl border p-6 transition-all ${
              !msg.isRead
                ? "bg-zinc-900/80 border-lime-400/30 shadow-lg shadow-lime-400/5"
                : "bg-zinc-900/30 border-white/5 opacity-80"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                {!msg.isRead && (
                  <span className="h-2.5 w-2.5 rounded-full bg-lime-400" title="Message non lu" />
                )}
      <div>
                  <h4 className="text-base font-bold text-white">{msg.name}</h4>
                  <p className="text-xs text-zinc-400 font-mono">{msg.email}</p>
                </div>
              </div>

              <span className="text-xs text-zinc-500 font-mono">
                {new Date(msg.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="bg-black/30 rounded-xl p-4 text-sm text-zinc-200 whitespace-pre-wrap font-sans mb-4 border border-white/5">
              {msg.message}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${msg.email}?subject=Réponse%20à%20votre%20demande%20de%20collaboration`}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all"
                >
                  Répondre par Email ↗
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const formData = new FormData();
                    formData.append("key", adminKey);
                    formData.append("id", msg.id);
                    formData.append("isRead", (!msg.isRead).toString());
                    startTransition(() => {
                      markMessageReadAction(null, formData);
                    });
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium border border-white/10 transition-all"
                >
                  {msg.isRead ? "Marquer comme non lu" : "Marquer comme lu"}
                </button>
              </div>

              <form
                action={(formData: FormData) => {
                  startTransition(() => {
                    deleteMessageAction(null, formData);
                  });
                }}
              >
                <input type="hidden" name="key" value={adminKey} />
                <input type="hidden" name="id" value={msg.id} />
                <button
                  type="submit"
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}

        {filteredMessages.length === 0 && (
          <div className="rounded-2xl border border-white/5 bg-zinc-900/20 p-16 text-center text-zinc-500 text-sm">
            Aucun message dans cette section.
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// HELPERS & COMPOSANTS INTERNES
// ----------------------------------------------------------------------
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6 space-y-4">
      <h3 className="text-sm font-semibold text-white tracking-tight border-b border-white/5 pb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function StatsCard({
  label,
  value,
  icon,
  trend,
  trendPositive,
  description,
}: {
  label: string;
  value: number;
  icon: string;
  trend?: string;
  trendPositive?: boolean;
  description?: string;
}) {
  const icons: Record<string, React.ReactNode> = {
    eye: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    ),
    box: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    ),
    mail: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-6 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">{label}</span>
        <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[icon]}
          </svg>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              trendPositive
                ? "text-emerald-400 bg-emerald-500/10"
                : "text-amber-400 bg-amber-500/10"
            }`}
          >
            {trend}
          </span>
        )}
    </div>

      {description && <p className="text-xs text-zinc-500">{description}</p>}
    </div>
  );
}
