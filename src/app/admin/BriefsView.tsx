"use client";

import React, { useEffect, useRef, useState } from "react";
import type { BriefTab } from "./admin-path";
import type { BriefActions } from "./AdminClient";
import { AdminLink, BackLink, useAdminNav } from "./nav";
import { ConfirmDialog, EmptyState, ScreenHeader, useNow, useToast } from "./ui";
import { formatAge, formatDate, plural, toTime, type Brief } from "./model";

type BriefsViewProps = {
  briefs: Brief[];
  selectedId?: string;
  tab: BriefTab;
  dataUnavailable: boolean;
  actions: BriefActions;
  online: boolean;
};

export default function BriefsView({ briefs, selectedId, tab, dataUnavailable, actions, online }: BriefsViewProps) {
  const now = useNow();
  const { go } = useAdminNav();
  const todo = briefs.filter((b) => !b.isRead);
  const done = briefs.filter((b) => b.isRead);
  const list = tab === "todo" ? todo : done;
  const oldestTodo = todo.length ? todo.reduce((a, b) => (toTime(a.createdAt) < toTime(b.createdAt) ? a : b)) : null;

  // Explicit selection comes from the URL; on wide screens the first brief is shown by default.
  const explicit = selectedId ? briefs.find((b) => b.id === selectedId) ?? null : null;
  const selected = explicit ?? (selectedId ? null : list[0] ?? null);

  const subtitle = dataUnavailable
    ? "Impossible de charger les briefs pour le moment."
    : todo.length === 0
      ? "Tout est traité."
      : `${plural(todo.length, "brief attend", "briefs attendent")} une réponse${
          oldestTodo && now ? ` — le plus ancien est arrivé ${formatAge(oldestTodo.createdAt, now)}` : ""
        }.`;

  return (
    <div className="mx-auto max-w-6xl">
      <div className={selectedId ? "hidden lg:block" : undefined}>
        <ScreenHeader title="Briefs" subtitle={subtitle} />
      </div>

      {briefs.length === 0 ? (
        dataUnavailable ? (
          <EmptyState
            title="Briefs indisponibles"
            body="La base de données ne répond pas. Tes briefs ne sont pas perdus : ils réapparaîtront dès qu’elle sera de nouveau joignable."
          />
        ) : (
          <EmptyState
            title="Aucun brief reçu pour l’instant"
            body="Dès qu’un visiteur envoie le formulaire de contact en bas du site, son brief arrive ici, avec ses services et son délai."
            action={
              <a href="/#contact" target="_blank" rel="noopener" className="a-btn a-btn--secondary">
                Voir le formulaire sur le site
              </a>
            }
          />
        )
      ) : (
        <div
          className={`grid gap-6 lg:items-start ${
            list.length || selectedId ? "lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]" : "max-w-xl"
          }`}
        >
          <div className={selectedId ? "hidden lg:block" : undefined}>
            <nav className="a-tabs mb-3" aria-label="Statut des briefs">
              <AdminLink to={{ view: "briefs", tab: "todo" }} replace className="a-tab" aria-current={tab === "todo" ? "true" : undefined}>
                À traiter ({todo.length})
              </AdminLink>
              <AdminLink to={{ view: "briefs", tab: "done" }} replace className="a-tab" aria-current={tab === "done" ? "true" : undefined}>
                Traités ({done.length})
              </AdminLink>
            </nav>

            {list.length === 0 ? (
              <EmptyState
                title={tab === "todo" ? "Rien à traiter" : "Aucun brief traité"}
                body={
                  tab === "todo"
                    ? "Tu as répondu à tout. Les nouveaux briefs apparaîtront ici."
                    : "Quand tu marques un brief comme traité, il est rangé ici."
                }
                action={
                  <AdminLink to={{ view: "briefs", tab: tab === "todo" ? "done" : "todo" }} replace className="a-btn a-btn--secondary">
                    {tab === "todo" ? `Voir les briefs traités (${done.length})` : `Voir les briefs à traiter (${todo.length})`}
                  </AdminLink>
                }
              />
            ) : (
              <ul className="a-panel a-divide overflow-hidden" aria-label={tab === "todo" ? "Briefs à traiter" : "Briefs traités"}>
                {list.map((b) => (
                  <li key={b.id}>
                    <AdminLink
                      to={{ view: "briefs", tab, brief: b.id }}
                      replace={!!selectedId}
                      className="a-row flex-col !items-stretch !gap-1"
                      aria-current={selected?.id === b.id ? "true" : undefined}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className={`truncate ${b.isRead ? "" : "a-strong font-semibold"}`}>{b.name}</span>
                        <span className="a-meta shrink-0">{now ? formatAge(b.createdAt, now) : "\u00a0"}</span>
                      </span>
                      <span className="a-meta line-clamp-2">
                        {b.services.length ? `${b.services.join(", ")} — ` : ""}
                        {b.message}
                      </span>
                    </AdminLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={selectedId ? undefined : "hidden lg:block"}>
            {selected ? (
              <BriefDetail
                key={selected.id}
                brief={selected}
                tab={tab}
                actions={{
                  ...actions,
                  // Pin the brief in the URL first, so it stays on screen when it leaves the current tab.
                  setTreated: (b, isRead) => {
                    if (!explicit) go({ view: "briefs", tab, brief: b.id }, { replace: true });
                    actions.setTreated(b, isRead);
                  },
                }}
                online={online}
                now={now}
              />
            ) : selectedId ? (
              <div>
                <div className="mb-4 lg:hidden">
                  <BackLink to={{ view: "briefs", tab }} label="Tous les briefs" />
                </div>
                <EmptyState
                  title="Ce brief n’existe plus"
                  body="Il a été supprimé, ou le lien est incomplet."
                  action={
                    <AdminLink to={{ view: "briefs", tab }} replace className="a-btn a-btn--primary">
                      Revenir aux briefs
                    </AdminLink>
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

function receivedLabel(date: Brief["createdAt"], now: number) {
  const age = formatAge(date, now);
  const full = `Reçu le ${formatDate(date)}`;
  return age.startsWith("le ") ? full : `${full} (${age})`;
}

function BriefDetail({
  brief,
  tab,
  actions,
  online,
  now,
}: {
  brief: Brief;
  tab: BriefTab;
  actions: BriefActions;
  online: boolean;
  now: number | null;
}) {
  const toast = useToast();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pending = actions.pendingIds.has(brief.id);
  const locked = pending || !online;

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      window.scrollTo(0, 0);
      headingRef.current?.focus({ preventScroll: true });
    }
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(brief.email);
      toast({ tone: "success", text: `Adresse ${brief.email} copiée.` });
    } catch {
      toast({ tone: "error", text: "Copie impossible sur ce navigateur. Sélectionne l’adresse à la main." });
    }
  };

  return (
    <article aria-labelledby="brief-title">
      <div className="mb-4 lg:hidden">
        <BackLink to={{ view: "briefs", tab }} label="Tous les briefs" />
      </div>

      <div className="a-panel p-5 sm:p-6">
        <p className={`a-badge ${brief.isRead ? "a-badge--neutral" : "a-badge--new"}`}>
          {brief.isRead ? "Traité" : "À traiter"}
        </p>
        <h2 id="brief-title" ref={headingRef} tabIndex={-1} className="a-screen-title mt-3 break-words focus:outline-none">
          {brief.name}
        </h2>
        <p className="mt-2 flex flex-wrap items-center gap-x-3">
          <a href={`mailto:${brief.email}`} className="a-link a-strong break-all">
            {brief.email}
          </a>
          <button type="button" className="a-btn a-btn--quiet" onClick={copyEmail}>
            Copier l’adresse
          </button>
        </p>
        <p className="a-meta">
          {now ? receivedLabel(brief.createdAt, now) : "\u00a0"}
        </p>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="a-meta">Services demandés</dt>
            <dd className="a-strong mt-0.5">{brief.services.length ? brief.services.join(", ") : "Non précisé"}</dd>
          </div>
          <div>
            <dt className="a-meta">Délai souhaité</dt>
            <dd className="a-strong mt-0.5">{brief.timeline || "Non précisé"}</dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-[var(--a-line)] pt-5">
          <h3 className="a-meta mb-2">Message</h3>
          <p className="a-strong max-w-prose whitespace-pre-wrap break-words leading-relaxed">{brief.message}</p>
        </div>

        <div className="mt-6 border-t border-[var(--a-line)] pt-3">
          <button
            type="button"
            className="a-btn a-btn--danger-quiet -ml-3"
            onClick={() => setConfirmDelete(true)}
            disabled={locked}
          >
            Supprimer ce brief…
          </button>
        </div>
      </div>

      <div className="a-actionbar fixed inset-x-0 bottom-0 z-30 lg:static lg:mt-4 lg:border-0 lg:bg-transparent lg:p-0">
        <div className="flex gap-2">
          <a
            href={`mailto:${brief.email}?subject=${encodeURIComponent("Suite à votre brief")}`}
            className="a-btn a-btn--primary a-btn--main flex-1 sm:flex-none"
          >
            Répondre par email
          </a>
          <button
            type="button"
            className="a-btn a-btn--secondary a-btn--main flex-1 sm:flex-none"
            onClick={() => actions.setTreated(brief, !brief.isRead)}
            disabled={locked}
            aria-busy={pending}
          >
            {pending ? "Un instant…" : brief.isRead ? "Remettre à traiter" : "Marquer comme traité"}
          </button>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          tone="danger"
          title={`Supprimer le brief de ${brief.name} ?`}
          body={
            <p>
              Le message et l’adresse <span className="a-strong break-all">{brief.email}</span> disparaîtront
              définitivement. Si tu dois encore lui répondre, fais-le avant.
            </p>
          }
          cancelLabel="Garder le brief"
          confirmLabel="Supprimer définitivement"
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            setConfirmDelete(false);
            actions.remove(brief);
          }}
        />
      )}
    </article>
  );
}
