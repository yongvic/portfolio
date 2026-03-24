import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getStats } from "@/lib/db";
import AdminClient from "./AdminClient";

type AdminPageProps = {
  searchParams: Promise<{ key?: string; editId?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const configuredSecret = process.env.ADMIN_SECRET;
  const adminKey = params.key ?? "";

  // Protection
  if (!configuredSecret) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-2xl bg-amber-500/10 p-6 text-amber-500 border border-amber-500/20">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold">Configuration Requise</h2>
          <p className="mt-2 text-sm opacity-80">
            Ajoutez `ADMIN_SECRET` dans votre fichier `.env` pour activer la console.
          </p>
        </div>
      </div>
    );
  }

  if (adminKey !== configuredSecret) {
    redirect("/");
  }

  // Data fetching
  const [projects, stats] = await Promise.all([
    prisma.project.findMany({
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    getStats()
  ]).catch(() => [[], { visits: 0, messages: 0, projects: 0 }]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projectToEdit = params.editId
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (projects as any[]).find(p => p.id === params.editId)
    : null;

  return (
    <AdminClient
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      projects={projects as any}
      projectToEdit={projectToEdit}
      adminKey={adminKey}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stats={stats as any}
    />
  );
}
