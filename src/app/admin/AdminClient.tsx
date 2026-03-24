/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { upsertProjectAction, deleteProjectAction, ActionState } from "./actions";

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

type AdminClientProps = {
  projects: Project[];
  projectToEdit: Project | null;
  adminKey: string;
  stats: {
    visits: number;
    messages: number;
    projects: number;
  };
};

export default function AdminClient({ projects, projectToEdit, adminKey, stats }: AdminClientProps) {
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

  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const res = upsertState || deleteState;
    if (res?.message) {
      setMessage({ text: res.message, type: res.success ? 'success' : 'error' });
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [upsertState, deleteState]);

  // Determine current view
  let currentView = viewParam || "dashboard";
  if (editId || projectToEdit) currentView = "editor";

  return (
    <div className="animate-in fade-in duration-500 w-full">
      {/* Toast Notification */}
      {message && (
        <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl transition-all animate-in slide-in-from-bottom-5 ${message.type === 'success'
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}>
          <div className={`h-2 w-2 rounded-full ${message.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {currentView === "dashboard" && (
        <DashboardView stats={stats} />
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
        />
      )}

      {currentView === "messages" && (
        <div className="flex items-center justify-center min-h-[40vh] text-zinc-500">
          <p>Messagerie bientôt disponible.</p>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// DASHBOARD VIEW
// ----------------------------------------------------------------------
function DashboardView({ stats }: { stats: AdminClientProps['stats'] }) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Overview</h2>
        <p className="text-sm text-zinc-400">Your site&apos;s performance at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard label="Total Visits" value={stats.visits} icon="eye" trend="+4.7%" />
        <StatsCard label="Active Projects" value={stats.projects} icon="box" />
        <StatsCard label="Unread Messages" value={stats.messages} icon="mail" trend={stats.messages > 0 ? "Action required" : undefined} />
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-center items-center text-center mt-8 min-h-[300px]">
        <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 mb-6">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Everything is running smoothly</h3>
        <p className="text-sm text-zinc-500 max-w-sm">
          Your portfolio is currently optimized. Use the navigation to manage your projects or view your messages.
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// PROJECTS VIEW
// ----------------------------------------------------------------------
function ProjectsView({
  projects,
  adminKey,
  deleteFormAction,
  isDeletePending
}: {
  projects: Project[],
  adminKey: string,
  deleteFormAction: (payload: FormData) => void,
  isDeletePending: boolean
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Projects</h2>
          <p className="text-sm text-zinc-400">Manage and organize your public portfolio.</p>
        </div>
        <Link
          href={`/admin?view=projects&editId=new&key=${adminKey}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Link>
      </div>

      <div className="rounded-2xl border border-white/5 bg-zinc-950/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                <th className="px-6 py-5 font-medium">Project</th>
                <th className="px-6 py-5 font-medium">Category</th>
                <th className="px-6 py-5 font-medium">Status</th>
                <th className="px-6 py-5 font-medium">Order</th>
                <th className="px-6 py-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-14 rounded-lg bg-zinc-900 overflow-hidden flex-shrink-0 relative">
                        <img src={project.coverImage || '/placeholder.jpg'} alt="" className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-100">{project.title}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-400 border border-white/10">
                      {project.category?.name ?? "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {project.isFeatured ? (
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                        <span className="text-xs font-medium">Featured</span>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-zinc-500">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-mono text-xs text-zinc-500">{project.sortOrder.toString().padStart(2, '0')}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin?view=projects&editId=${project.id}&key=${adminKey}`}
                        className="text-zinc-400 hover:text-white transition-all text-xs font-medium"
                      >
                        Edit
                      </Link>
                      <span className="text-zinc-800">|</span>
                      <form action={deleteFormAction} className="inline-block">
                        <input type="hidden" name="key" value={adminKey} />
                        <input type="hidden" name="id" value={project.id} />
                        <button
                          disabled={isDeletePending}
                          className="text-rose-400 hover:text-rose-300 transition-all text-xs font-medium disabled:opacity-50"
                          onClick={(e) => {
                            if (!confirm("Are you sure you want to delete this project?")) e.preventDefault();
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-zinc-500">
                    No projects found. Create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// EDITOR VIEW
// ----------------------------------------------------------------------
function EditorView({
  projectToEdit,
  adminKey,
  upsertFormAction,
  isUpsertPending,
  upsertState
}: {
  projectToEdit: Project | null,
  adminKey: string,
  upsertFormAction: (payload: FormData) => void,
  isUpsertPending: boolean,
  upsertState: ActionState | null
}) {
  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/admin?view=projects&key=${adminKey}`} className="group inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors mb-4">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to projects
          </Link>
          <h2 className="text-3xl font-semibold text-white tracking-tight">
            {projectToEdit ? projectToEdit.title : "New Project"}
          </h2>
        </div>
      </div>

      <form id="upsert-form" action={upsertFormAction} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <Section title="Basic Information">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input type="hidden" name="key" value={adminKey} />
              <input type="hidden" name="id" value={projectToEdit?.id ?? ""} />

              <Field label="Title" name="title" defaultValue={projectToEdit?.title} placeholder="e.g. Acme Corp Restyle" error={upsertState?.errors?.title?.[0]} required />
              <Field label="Slug" name="slug" defaultValue={projectToEdit?.slug} placeholder="e.g. acme-corp" error={upsertState?.errors?.slug?.[0]} required />
              <Field label="Category" name="category" defaultValue={projectToEdit?.category?.name} placeholder="e.g. Web Design" error={upsertState?.errors?.category?.[0]} required />
              <Field label="Display Order" name="sortOrder" type="number" defaultValue={projectToEdit?.sortOrder ?? 0} error={upsertState?.errors?.sortOrder?.[0]} />
            </div>
          </Section>

          {/* Content */}
          <Section title="Content">
            <div className="space-y-6">
              <TextArea label="Short Summary" name="excerpt" defaultValue={projectToEdit?.excerpt} placeholder="A brief description of this project..." error={upsertState?.errors?.excerpt?.[0]} rows={3} required />
              <TextArea label="Full Details" name="description" defaultValue={projectToEdit?.description} placeholder="Write the full case study here..." error={upsertState?.errors?.description?.[0]} rows={12} required />
            </div>
          </Section>
        </div>

        <div className="space-y-8">
          {/* Publish Actions */}
          <Section title="Publish">
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isUpsertPending}
                className="w-full py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isUpsertPending ? "Saving..." : "Save Project"}
              </button>
              <Link href={`/admin?view=projects&key=${adminKey}`} className="w-full py-3 rounded-xl border border-white/10 text-center text-sm font-medium text-zinc-300 hover:bg-white/5 transition-all">
                Cancel
              </Link>
            </div>
          </Section>

          {/* Media & Links */}
          <Section title="Media & Links">
            <div className="space-y-6">
              <Field label="Cover Image URL" name="coverImage" defaultValue={projectToEdit?.coverImage} placeholder="/files/hero.jpg" error={upsertState?.errors?.coverImage?.[0]} required />
              <Field label="Tech Stack (comma separated)" name="technologies" defaultValue={projectToEdit?.technologies?.join(", ")} placeholder="React, Node.js..." error={upsertState?.errors?.technologies?.[0]} required />
              <Field label="Live URL" name="projectUrl" defaultValue={projectToEdit?.projectUrl ?? ""} placeholder="https://..." />
              <Field label="Repository URL" name="repository" defaultValue={projectToEdit?.repository ?? ""} placeholder="https://github.com/..." />
            </div>
          </Section>

          {/* Settings */}
          <Section title="Settings">
            <div className="flex items-center justify-between cursor-pointer group">
              <div>
                <p className="text-sm font-medium text-zinc-200">Featured Project</p>
                <p className="text-xs text-zinc-500 mt-0.5">Show in the prominent featured section</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isFeatured" defaultChecked={projectToEdit?.isFeatured} className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-300 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
              </label>
            </div>
          </Section>
        </div>
      </form>
    </div>
  );
}

// ----------------------------------------------------------------------
// SHARED UI COMPONENTS
// ----------------------------------------------------------------------

function StatsCard({ label, value, icon, trend }: { label: string, value: number, icon: string, trend?: string }) {
  const icons: Record<string, React.ReactNode> = {
    eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />,
    box: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-6 flex flex-col justify-between h-40">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">{icons[icon]}</svg>
        </div>
        {trend && <span className="text-xs font-medium text-white bg-white/10 px-2.5 py-1 rounded-full">{trend}</span>}
      </div>
      <div>
        <p className="text-xs font-medium text-zinc-500 mb-1">{label}</p>
        <p className="text-3xl font-semibold text-white">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-6 sm:p-8">
      <h3 className="text-sm font-semibold text-white mb-6">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, error?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-zinc-400">
        {label} {props.required && <span className="text-zinc-600">*</span>}
      </label>
      <input
        {...props}
        className={`flex h-11 w-full rounded-xl border border-white/10 bg-zinc-900/50 px-4 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600 focus:border-white/20 focus:bg-zinc-900 focus:ring-1 focus:ring-white/10 ${error ? "border-rose-500/50 bg-rose-500/5 focus:border-rose-500/50 focus:ring-rose-500/20 text-rose-200" : ""
          }`}
      />
      {error && <span className="text-xs font-medium text-rose-500 mt-1">{error}</span>}
    </div>
  );
}

function TextArea({ label, error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string, error?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-zinc-400">
        {label} {props.required && <span className="text-zinc-600">*</span>}
      </label>
      <textarea
        {...props}
        className={`flex w-full rounded-xl border border-white/10 bg-zinc-900/50 p-4 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600 focus:border-white/20 focus:bg-zinc-900 focus:ring-1 focus:ring-white/10 resize-y ${error ? "border-rose-500/50 bg-rose-500/5 text-rose-200" : ""
          }`}
      />
      {error && <span className="text-xs font-medium text-rose-500 mt-1">{error}</span>}
    </div>
  );
}
