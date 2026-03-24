"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { upsertProjectAction, deleteProjectAction } from "../actions";

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
  _count?: { views: number };
};

type Props = {
  projects: Project[];
  projectToEdit: Project | null;
  adminKey: string;
};

export default function ProjectManager({ projects, projectToEdit, adminKey }: Props) {
  const [upsertState, upsertFormAction, isUpsertPending] = useActionState(upsertProjectAction, null);
  const [deleteState, deleteFormAction, isDeletePending] = useActionState(deleteProjectAction, null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const res = upsertState || deleteState;
    if (res?.message) {
      setMessage(res.message);
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [upsertState, deleteState]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-clash uppercase">Projets</h2>
          <p className="text-sm text-zinc-500">Gérez vos réalisations et leur visibilité.</p>
        </div>
        {!projectToEdit && (
          <button
            onClick={() => {
              const el = document.getElementById("project-form");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 rounded-full bg-[#e1ff01] px-6 py-2.5 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nouveau Projet
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  <th className="px-6 py-4">Projet</th>
                  <th className="px-6 py-4">Catégorie</th>
                  <th className="px-6 py-4 text-center">Vues</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className={`group transition-colors hover:bg-white/[0.02] ${
                      projectToEdit?.id === project.id ? "bg-[#e1ff01]/5" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400/000/fff?text=No+Image" }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-white">{project.title}</div>
                          <div className="text-xs text-zinc-500">{project.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400 group-hover:text-zinc-200">
                        {project.category?.name || "Sans catégorie"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-zinc-300">
                        {project._count?.views || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin?key=${adminKey}&tab=projects&editId=${project.id}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-zinc-400 transition-all hover:bg-[#e1ff01]/20 hover:text-[#e1ff01]"
                          title="Éditer"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </Link>
                        <form action={deleteFormAction}>
                          <input type="hidden" name="key" value={adminKey} />
                          <input type="hidden" name="id" value={project.id} />
                          <button
                            disabled={isDeletePending}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-rose-500/60 transition-all hover:bg-rose-500/20 hover:text-rose-500 active:scale-90"
                            title="Supprimer"
                            onClick={(e) => {
                              if (!confirm("Supprimer ce projet ?")) e.preventDefault();
                            }}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form */}
        <div id="project-form" className="xl:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-clash uppercase">
                {projectToEdit ? "Édition" : "Nouveau Projet"}
              </h3>
              {projectToEdit && (
                <Link
                  href={`/admin?key=${adminKey}&tab=projects`}
                  className="text-xs font-semibold text-[#e1ff01] hover:underline"
                >
                  Annuler
                </Link>
              )}
            </div>

            <form action={upsertFormAction} className="space-y-4">
              <input type="hidden" name="key" value={adminKey} />
              <input type="hidden" name="id" value={projectToEdit?.id ?? ""} />

              <FormInput
                label="Titre"
                name="title"
                defaultValue={projectToEdit?.title}
                placeholder="Mon super projet"
                error={upsertState?.errors?.title?.[0]}
                required
              />

              <FormInput
                label="Slug"
                name="slug"
                defaultValue={projectToEdit?.slug}
                placeholder="mon-super-projet"
                error={upsertState?.errors?.slug?.[0]}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Catégorie"
                  name="category"
                  defaultValue={projectToEdit?.category?.name}
                  placeholder="Web Design"
                  error={upsertState?.errors?.category?.[0]}
                  required
                />
                <FormInput
                  label="Ordre"
                  name="sortOrder"
                  type="number"
                  defaultValue={projectToEdit?.sortOrder ?? 0}
                  error={upsertState?.errors?.sortOrder?.[0]}
                />
              </div>

              <FormInput
                label="Image (URL)"
                name="coverImage"
                defaultValue={projectToEdit?.coverImage}
                placeholder="/projects/hero.jpg"
                error={upsertState?.errors?.coverImage?.[0]}
                required
              />

              <FormTextArea
                label="Résumé"
                name="excerpt"
                defaultValue={projectToEdit?.excerpt}
                rows={2}
                error={upsertState?.errors?.excerpt?.[0]}
                required
              />

              <FormTextArea
                label="Description"
                name="description"
                defaultValue={projectToEdit?.description}
                rows={4}
                error={upsertState?.errors?.description?.[0]}
                required
              />

              <FormInput
                label="Technologies"
                name="technologies"
                defaultValue={projectToEdit?.technologies?.join(", ")}
                placeholder="React, Next.js, CSS"
                error={upsertState?.errors?.technologies?.[0]}
                required
              />

              <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  defaultChecked={projectToEdit?.isFeatured}
                  className="h-5 w-5 rounded border-white/20 bg-black accent-[#e1ff01]"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-zinc-300">
                  Mettre en avant ce projet
                </label>
              </div>

              <div className="pt-2">
                <button
                  disabled={isUpsertPending}
                  className="relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-[#e1ff01] text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {isUpsertPending ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  ) : (
                    <span>{projectToEdit ? "Mettre à jour" : "Créer le projet"}</span>
                  )}
                </button>
              </div>

              {message && (
                <div className={`mt-4 rounded-2xl p-4 text-center text-sm font-bold border ${
                  (upsertState?.success || deleteState?.success) 
                    ? "bg-[#e1ff01]/10 text-[#e1ff01] border-[#e1ff01]/20" 
                    : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                }`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500 ml-1">
        {label} {props.required && <span className="text-[#e1ff01]">*</span>}
      </label>
      <input
        {...props}
        className={`flex h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-[#e1ff01]/50 focus:bg-white/[0.08] ${
          error ? "border-rose-500/50 bg-rose-500/5" : ""
        }`}
      />
      {error && <span className="text-[10px] font-bold text-rose-500 ml-1 uppercase">{error}</span>}
    </div>
  );
}

function FormTextArea({ label, error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string, error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500 ml-1">
        {label} {props.required && <span className="text-[#e1ff01]">*</span>}
      </label>
      <textarea
        {...props}
        className={`flex w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-[#e1ff01]/50 focus:bg-white/[0.08] ${
          error ? "border-rose-500/50 bg-rose-500/5" : ""
        }`}
      />
      {error && <span className="text-[10px] font-bold text-rose-500 ml-1 uppercase">{error}</span>}
    </div>
  );
}
