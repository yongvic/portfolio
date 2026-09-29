/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateIdentitySettingAction } from "./actions";
import { useToast } from "./ui";
import type { IdentityAdmin } from "./model";

export default function IdentitiesAdmin({
  identities,
  adminKey,
}: {
  identities: IdentityAdmin[];
  adminKey: string;
}) {
  return (
    <section className="mt-12" aria-labelledby="identities-title">
      <h2 id="identities-title" className="a-section-title">
        Identités visuelles
      </h2>
      <p className="a-meta mt-2 max-w-2xl">
        Ces cinq fiches (textes, palette, variantes, charte) sont dans le code du site, pas dans le catalogue des
        projets. C’est pour ça qu’elles n’ont pas de page « Modifier ». Ici tu décides seulement si chacune est visible,
        et si elle occupe une des quatre places de l’onglet Design sur l’accueil.
      </p>
      <ul className="a-panel a-divide mt-4 overflow-hidden">
        {identities.map((identity) => (
          <IdentityRow key={identity.slug} identity={identity} adminKey={adminKey} identities={identities} />
        ))}
      </ul>
    </section>
  );
}

function IdentityRow({
  identity,
  identities,
  adminKey,
}: {
  identity: IdentityAdmin;
  identities: IdentityAdmin[];
  adminKey: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const [hidden, setHidden] = useState(identity.isHidden);
  const [lane, setLane] = useState(identity.homeLane === "design" ? "design" : "");

  const designTaken = identities.filter((item) => !item.isHidden && item.homeLane === "design" && item.slug !== identity.slug).length;
  const designFull = designTaken >= 4 && lane !== "design";

  const save = (nextHidden: boolean, nextLane: "" | "design") => {
    setHidden(nextHidden);
    setLane(nextHidden ? "" : nextLane);
    const body = new FormData();
    body.set("key", adminKey);
    body.set("slug", identity.slug);
    if (nextHidden) body.set("isHidden", "on");
    if (!nextHidden && nextLane) body.set("homeLane", nextLane);
    startTransition(async () => {
      const res = await updateIdentitySettingAction(null, body).catch(() => undefined);
      if (!res?.success) {
        setHidden(identity.isHidden);
        setLane(identity.homeLane === "design" ? "design" : "");
        toast({ tone: "error", text: res?.message ?? "Le réglage n’a pas pu être enregistré." });
        return;
      }
      toast({ tone: "success", text: res.message ?? "Identité mise à jour." });
      router.refresh();
    });
  };

  return (
    <li className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
      <img src={identity.coverImage} alt="" className="a-thumb" />
      <div className="min-w-0 flex-1">
        <p className="a-strong truncate font-semibold">{identity.name}</p>
        <p className="a-meta truncate">{identity.excerpt}</p>
      </div>
      <label className="a-check !min-h-0 shrink-0 py-0">
        <input
          type="checkbox"
          checked={hidden}
          disabled={pending}
          onChange={(e) => save(e.target.checked, e.target.checked ? "" : lane === "design" ? "design" : "")}
        />
        <span className="a-label">Masquer</span>
      </label>
      <label className="a-field shrink-0 sm:w-52">
        <span className="sr-only">Selected Works pour {identity.name}</span>
        <select
          className="a-input"
          value={hidden ? "" : lane}
          disabled={pending || hidden}
          onChange={(e) => save(false, e.target.value === "design" ? "design" : "")}
        >
          <option value="">Pas sur l’accueil</option>
          <option value="design" disabled={designFull}>
            Onglet Design{designFull ? " (complet)" : ""}
          </option>
        </select>
      </label>
      {!hidden && (
        <a href={`/identites/${identity.slug}`} target="_blank" rel="noopener" className="a-btn a-btn--quiet shrink-0">
          Voir en ligne
        </a>
      )}
    </li>
  );
}
