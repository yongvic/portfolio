/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useState } from "react";
import { NEW_PROJECT } from "./admin-path";
import { AdminLink } from "./nav";
import { EmptyState, ScreenHeader } from "./ui";
import { HOME_SLOTS, homePlacement, plural, siteFilterLabel, siteOrder, type Project } from "./model";

const SEARCH_THRESHOLD = 8;

export default function ProjectsView({ projects, dataUnavailable }: { projects: Project[]; dataUnavailable: boolean }) {
  const [query, setQuery] = useState("");
  const ordered = useMemo(() => siteOrder(projects), [projects]);
  const placement = useMemo(() => homePlacement(projects), [projects]);
  const featuredCount = projects.filter((p) => p.isFeatured).length;

  const q = query.trim().toLowerCase();
  const visible = q
    ? ordered.filter((p) => p.title.toLowerCase().includes(q) || (p.category?.name ?? "").toLowerCase().includes(q))
    : ordered;

  const newButton = (
    <AdminLink to={{ view: "editor", project: NEW_PROJECT }} className="a-btn a-btn--primary a-btn--main">
      Nouveau projet
    </AdminLink>
  );

  if (dataUnavailable) {
    return (
      <div className="mx-auto max-w-4xl">
        <ScreenHeader title="Projets" subtitle="Impossible de charger le catalogue pour le moment." />
        <EmptyState
          title="Catalogue indisponible"
          body="La base de données ne répond pas. Le site public continue d’afficher ses projets de secours. Réessaie dans un instant avant de créer quoi que ce soit."
        />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="mx-auto max-w-4xl">
        <ScreenHeader title="Projets" subtitle="Aucun projet publié depuis l’administration." actions={newButton} />
        <EmptyState
          title="Le site affiche encore ses projets de démonstration"
          body={
            <p>
              Tant que ce catalogue est vide, le site montre les projets intégrés au code. <span className="a-strong">Dès que tu publies un premier projet ici, le site n’affiche plus que ce catalogue</span> : prévois d’y ajouter tous ceux que tu veux garder en ligne.
            </p>
          }
          action={newButton}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <ScreenHeader
        title="Projets"
        subtitle={`${plural(projects.length, "projet en ligne", "projets en ligne")}, dans l’ordre du site. ${
          featuredCount
            ? `${featuredCount} mis en avant pour ${HOME_SLOTS} places sur l’accueil.`
            : `Aucun n’est mis en avant : l’accueil montre les ${HOME_SLOTS} premiers.`
        }`}
        actions={newButton}
      />

      {projects.length > SEARCH_THRESHOLD && (
        <div className="mb-4">
          <label htmlFor="project-search" className="sr-only">
            Rechercher un projet
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par titre ou catégorie"
            className="a-input"
          />
        </div>
      )}

      {visible.length === 0 ? (
        <EmptyState
          title={`Aucun projet ne correspond à « ${query.trim()} »`}
          body="La recherche porte sur le titre et la catégorie."
          action={
            <button type="button" className="a-btn a-btn--secondary" onClick={() => setQuery("")}>
              Effacer la recherche
            </button>
          }
        />
      ) : (
        <ol className="a-panel a-divide overflow-hidden" aria-label="Projets dans l’ordre du site">
          {visible.map((p) => {
            const position = ordered.indexOf(p) + 1;
            const home = placement.get(p.id);
            const category = p.category?.name ?? "Sans catégorie";
            return (
              <li key={p.id} className="flex items-center">
                <AdminLink to={{ view: "editor", project: p.id }} className="a-row min-w-0 flex-1">
                  <span className="a-meta w-6 shrink-0 text-right tabular-nums">
                    <span className="sr-only">Position </span>
                    {position}
                  </span>
                  <img src={p.coverImage || "/moi.png"} alt="" className="a-thumb" loading="lazy" />
                  <span className="min-w-0 flex-1">
                    <span className="a-strong block truncate font-semibold">{p.title}</span>
                    <span className="a-meta block truncate">
                      {category}
                      <span className="hidden sm:inline"> · filtre « {siteFilterLabel(category)} »</span>
                    </span>
                  </span>
                  {home ? <span className="a-badge a-badge--outline shrink-0">Accueil n°{home}</span> : null}
                </AdminLink>
                <a
                  href={`/works/${p.slug}`}
                  target="_blank"
                  rel="noopener"
                  className="a-btn a-btn--quiet mr-2 hidden shrink-0 sm:inline-flex"
                >
                  Voir en ligne<span className="sr-only"> : {p.title} (nouvel onglet)</span>
                </a>
              </li>
            );
          })}
        </ol>
      )}
      <p className="a-meta mt-3">Touche un projet pour le modifier, changer sa position ou le retirer du site.</p>
    </div>
  );
}
