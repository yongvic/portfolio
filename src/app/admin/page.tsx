import React from "react";
import { prisma } from "@/lib/prisma";
import { getStats } from "@/lib/db";
import AdminClient from "./AdminClient";
import Link from "next/link";
import { TechLogos } from "@/components/techlogo/TechLogos";

type AdminPageProps = {
  searchParams: Promise<{ key?: string; editId?: string; view?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const configuredSecret = process.env.ADMIN_SECRET;
  const adminKey = params.key ?? "";

  // 1. Vérification de la configuration d'environnement
  if (!configuredSecret) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center p-6">
        <div className="max-w-md w-full rounded-2xl bg-amber-500/10 p-8 text-amber-400 border border-amber-500/20 shadow-xl">
          <svg className="mx-auto h-12 w-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-white">Configuration Requise</h2>
          <p className="mt-2 text-sm text-zinc-300">
            La variable d&apos;environnement <code className="bg-zinc-900 px-2 py-0.5 rounded text-amber-300 font-mono">ADMIN_SECRET</code> n&apos;est pas définie dans votre fichier <code className="bg-zinc-900 px-2 py-0.5 rounded text-amber-300 font-mono">.env</code>.
          </p>
          <div className="mt-6">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl transition-all">
              ← Retour au portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Portail de Connexion Sécurisé si la clé est manquante ou invalide
  if (adminKey !== configuredSecret) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center p-6">
        <div className="max-w-md w-full rounded-3xl bg-zinc-900/90 border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TechLogos.brand />
            <h1 className="text-xl font-bold text-white tracking-tight">Console Studio Edo</h1>
          </div>
          
          <p className="text-xs text-zinc-400 text-center mb-6">
            Accès restreint à l&apos;administration du portfolio. Veuillez saisir votre clé d&apos;accès sécurisée.
          </p>

          <form action="/admin" method="GET" className="space-y-4">
            <div>
              <label htmlFor="admin-key" className="block text-xs font-medium text-zinc-300 mb-1.5 font-mono">
                Clé d&apos;accès administrateur
              </label>
              <input
                id="admin-key"
                name="key"
                type="password"
                placeholder="••••••••••••••••"
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400 font-mono"
              />
            </div>

            {adminKey && adminKey !== configuredSecret && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                Clé d&apos;accès non reconnue. Veuillez réessayer.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition-all active:scale-[0.98]"
            >
              Déverrouiller la console →
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              ← Retour au site public
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Récupération des données pour l'administrateur authentifié
  const [projects, stats, contactMessages, categories] = await Promise.all([
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
  ]).catch(() => [[], { visits: 0, messages: 0, projects: 0 }, [], []]);

  const projectToEdit = params.editId
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (projects as any[]).find((p) => p.id === params.editId)
    : null;

  return (
    <AdminClient
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      projects={projects as any}
      projectToEdit={projectToEdit}
      adminKey={adminKey}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stats={stats as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contactMessages={contactMessages as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      categories={categories as any}
    />
  );
}
