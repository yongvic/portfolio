import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteProjectAction, upsertProjectAction } from "./actions";

type AdminPageProps = {
  searchParams: Promise<{ key?: string }>;
};

type ProjectWithCategory = {
  id: string;
  title: string;
  slug: string;
  category: { name: string } | null;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const configuredSecret = process.env.ADMIN_SECRET;

  if (!configuredSecret) {
    return (
      <main className="section-shell py-20">
        <h1 className="text-3xl font-semibold text-white">Admin</h1>
        <p className="mt-4 text-zinc-300">Ajoute `ADMIN_SECRET` dans `.env` puis ouvre `/admin?key=TON_SECRET`.</p>
      </main>
    );
  }

  if (params.key !== configuredSecret) {
    redirect("/");
  }

  const projects: ProjectWithCategory[] = await prisma.project
    .findMany({ include: { category: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] })
    .catch(() => []);

  return (
    <main className="section-shell space-y-8 py-12">
      <h1 className="text-3xl font-semibold text-white">Dashboard Admin</h1>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl text-white">Ajouter / Modifier un projet</h2>
        <form action={upsertProjectAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <input name="id" placeholder="id (laisser vide pour création)" className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white" />
          <input name="title" required placeholder="Titre" className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white" />
          <input name="slug" required placeholder="slug" className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white" />
          <input name="category" required placeholder="Catégorie" className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white" />
          <input name="coverImage" required placeholder="Image (ex: /my-image.jpg)" className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white" />
          <input name="technologies" required placeholder="Technos séparées par virgules" className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white" />
          <input name="projectUrl" placeholder="URL projet" className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white" />
          <input name="repository" placeholder="URL repo" className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white" />
          <input type="number" min="0" name="sortOrder" defaultValue="0" placeholder="Ordre" className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white" />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isFeatured" />Mis en avant</label>
          <textarea name="excerpt" required placeholder="Résumé" rows={2} className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white md:col-span-2" />
          <textarea name="description" required placeholder="Description" rows={5} className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white md:col-span-2" />
          <button className="rounded-full bg-fuchsia-300 px-5 py-2 text-sm font-semibold text-black md:col-span-2">Enregistrer</button>
        </form>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl text-white">Projets existants</h2>
        <div className="mt-4 space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 p-3">
              <div>
                <p className="font-medium text-white">{project.title}</p>
                <p className="text-xs text-zinc-400">{project.slug} • {project.category?.name ?? "Sans catégorie"}</p>
              </div>
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={project.id} />
                <button className="rounded-full border border-rose-300/50 px-4 py-2 text-xs text-rose-200 hover:border-rose-300">Supprimer</button>
              </form>
            </div>
          ))}
          {!projects.length ? <p className="text-sm text-zinc-400">Aucun projet en base.</p> : null}
        </div>
      </section>
    </main>
  );
}
