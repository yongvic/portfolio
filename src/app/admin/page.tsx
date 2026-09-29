import React from "react";
import { readdir } from "fs/promises";
import path from "path";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminClient from "./AdminClient";
import { brandIdentities, type IdentityPlacement } from "@/lib/identities";
import type { Brief, Category, IdentityAdmin, Project } from "./model";

type AdminPageProps = {
  searchParams: Promise<{ key?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const configuredSecret = process.env.ADMIN_SECRET;
  const adminKey = params.key ?? "";

  if (!configuredSecret) {
    return (
      <GateFrame>
        <h1 className="a-screen-title mt-3">L’administration n’est pas encore activée</h1>
        <p className="mt-3">
          Aucune clé d’accès n’est configurée sur ce serveur. Ajoute la variable <code className="a-strong">ADMIN_SECRET</code>{" "}
          dans le fichier <code className="a-strong">.env</code> (ou dans les réglages de l’hébergeur), relance le serveur,
          puis recharge cette page.
        </p>
        <Link href="/" className="a-link mt-6">
          Retour au site
        </Link>
      </GateFrame>
    );
  }

  if (adminKey !== configuredSecret) {
    return (
      <GateFrame>
        <h1 className="a-screen-title mt-3">Entrer dans l’administration</h1>
        <p className="mt-3">Ici tu réponds aux briefs reçus et tu publies tes projets. Cet espace n’est pas public.</p>

        <form action="/admin" method="GET" className="mt-8 grid gap-4">
          <div className="a-field">
            <label htmlFor="admin-key" className="a-label">
              Clé d’accès
            </label>
            <input
              id="admin-key"
              name="key"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              aria-invalid={adminKey ? true : undefined}
              aria-describedby={adminKey ? "admin-key-error" : undefined}
              className="a-input"
            />
            {adminKey ? (
              <p id="admin-key-error" className="a-error" role="alert">
                Cette clé ne correspond pas. Vérifie les majuscules et les espaces, puis réessaie.
              </p>
            ) : null}
          </div>
          <button type="submit" className="a-btn a-btn--primary a-btn--main w-full">
            Entrer
          </button>
        </form>

        <Link href="/" className="a-link mt-6">
          Retour au site
        </Link>
      </GateFrame>
    );
  }

  let projects: Project[] = [];
  let briefs: Brief[] = [];
  let categories: Category[] = [];
  let placements: IdentityPlacement[] = [];
  let dataUnavailable = false;

  try {
    const [projectRows, briefRows, categoryRows, placementRows] = await Promise.all([
      prisma.project.findMany({
        include: { category: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.category.findMany({ orderBy: { name: "asc" } }),
      prisma.identitySetting.findMany(),
    ]);
    projects = projectRows.map((project) => ({
      ...project,
      homeLane: project.homeLane === "dev" || project.homeLane === "design" ? project.homeLane : null,
    }));
    briefs = briefRows;
    categories = categoryRows;
    placements = placementRows.map((row) => ({
      slug: row.slug,
      isHidden: row.isHidden,
      homeLane: row.homeLane === "dev" || row.homeLane === "design" ? row.homeLane : null,
    }));
  } catch {
    dataUnavailable = true;
  }

  const identities: IdentityAdmin[] = brandIdentities.map((identity) => {
    const cover = identity.variants[identity.coverVariant] ?? identity.variants[0];
    const setting = placements.find((item) => item.slug === identity.slug);
    return {
      slug: identity.slug,
      name: identity.name,
      excerpt: identity.excerpt,
      coverImage: cover.src,
      isHidden: setting?.isHidden ?? false,
      homeLane: setting?.homeLane ?? null,
    };
  });

  return (
    <AdminClient
      adminKey={adminKey}
      projects={projects}
      briefs={briefs}
      categories={categories}
      images={await listPublicImages()}
      identities={identities}
      dataUnavailable={dataUnavailable}
    />
  );
}

async function listPublicImages() {
  try {
    const files = await readdir(path.join(process.cwd(), "public"));
    return files.filter((f) => /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(f)).map((f) => `/${f}`);
  } catch {
    return [];
  }
}

function GateFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-svh items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <p className="a-brand text-lg">Studio Edo</p>
        {children}
      </div>
    </main>
  );
}
