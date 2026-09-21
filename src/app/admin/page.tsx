import React from "react";
import { prisma } from "@/lib/prisma";
import { getStats } from "@/lib/db";
import AdminClient from "./AdminClient";
import Link from "next/link";

type AdminPageProps = {
  searchParams: Promise<{ key?: string; editId?: string; view?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const configuredSecret = process.env.ADMIN_SECRET;
  const adminKey = params.key ?? "";

  if (!configuredSecret) {
    return (
      <GateFrame>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Studio Edo</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">Clé d’accès manquante</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          L’administration ne peut pas s’ouvrir tant que la clé n’est pas définie dans l’environnement local.
          Ajoute-la, relance le serveur, puis reviens ici.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center text-sm font-medium text-zinc-300 hover:text-white"
        >
          Retour au site
        </Link>
      </GateFrame>
    );
  }

  if (adminKey !== configuredSecret) {
    return (
      <GateFrame>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">Studio Edo</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">Entrer dans le studio</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Cet espace sert à publier les projets et à répondre aux briefs. Il n’est pas public.
        </p>

        <form action="/admin" method="GET" className="mt-8 space-y-4">
          <div>
            <label htmlFor="admin-key" className="block text-sm font-medium text-zinc-200">
              Clé d’accès
            </label>
            <input
              id="admin-key"
              name="key"
              type="password"
              placeholder="Colle ta clé"
              required
              autoFocus
              autoComplete="current-password"
              className="mt-2 w-full min-h-12 rounded-xl border border-white/10 bg-zinc-950 px-4 text-sm text-white placeholder:text-zinc-600"
            />
          </div>

          {adminKey ? (
            <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300" role="alert">
              Cette clé n’ouvre pas le studio. Vérifie-la et réessaie.
            </p>
          ) : null}

          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#d7fb61] text-sm font-semibold text-black hover:bg-[#e8ff8a]"
          >
            Entrer
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center text-sm text-zinc-500 hover:text-zinc-300"
        >
          Retour au site
        </Link>
      </GateFrame>
    );
  }

  let projects: { id: string }[] = [];
  let stats = { visits: 0, messages: 0, projects: 0 };
  let contactMessages: unknown[] = [];
  let categories: unknown[] = [];

  try {
    [projects, stats, contactMessages, categories] = await Promise.all([
      prisma.project.findMany({
        include: { category: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
      getStats(),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany({
        orderBy: { name: "asc" },
      }),
    ]);
  } catch {
    // Keep empty fallbacks so the admin shell still opens without the database.
  }

  const projectToEdit = params.editId
    ? (projects as { id: string }[]).find((p) => p.id === params.editId) ?? null
    : null;

  return (
    <AdminClient
      projects={projects as never}
      projectToEdit={projectToEdit as never}
      adminKey={adminKey}
      stats={stats}
      contactMessages={contactMessages as never}
      categories={categories as never}
    />
  );
}

function GateFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
