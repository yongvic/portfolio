/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useId, useMemo, useRef, useState, useTransition } from "react";
import { deleteProjectAction, upsertProjectAction } from "./actions";
import { BackLink, useAdminNav } from "./nav";
import { ConfirmDialog, Field, ScreenHeader, useActionFailure, useNow, useToast } from "./ui";
import {
  HOME_SLOTS,
  formatDate,
  siteFilterLabel,
  siteOrder,
  slugify,
  type Category,
  type IdentityAdmin,
  type Project,
} from "./model";

type Values = {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  coverImage: string;
  category: string;
  technologies: string;
  projectUrl: string;
  repository: string;
  sortOrder: string;
  isHidden: boolean;
  homeLane: "" | "dev" | "design";
};

type FieldName = keyof Values;

// Same minimums as projectSchema in actions.ts, checked here so the server never has to refuse.
const MIN = { title: 3, slug: 3, excerpt: 10, description: 20, coverImage: 3, category: 2 } as const;

const FIELD_ORDER: FieldName[] = [
  "title",
  "excerpt",
  "category",
  "coverImage",
  "slug",
  "description",
  "technologies",
  "projectUrl",
  "repository",
  "sortOrder",
  "homeLane",
];

function toValues(p: Project | null): Values {
  return {
    title: p?.title ?? "",
    slug: p?.slug ?? "",
    excerpt: p?.excerpt ?? "",
    description: p?.description ?? "",
    coverImage: p?.coverImage ?? "",
    category: p?.category?.name ?? "Web & SaaS",
    technologies: p?.technologies.join(", ") ?? "",
    projectUrl: p?.projectUrl ?? "",
    repository: p?.repository ?? "",
    sortOrder: String(p?.sortOrder ?? 0),
    isHidden: p?.isHidden ?? false,
    homeLane: p?.homeLane === "dev" || p?.homeLane === "design" ? p.homeLane : "",
  };
}

const same = (a: Values, b: Values) => (Object.keys(a) as FieldName[]).every((k) => a[k] === b[k]);

const parseTools = (s: string) =>
  s
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

function validate(v: Values, others: Project[], identities: IdentityAdmin[]) {
  const e: Partial<Record<FieldName, string>> = {};
  const len = (k: keyof typeof MIN) => v[k].trim().length;
  if (len("title") < MIN.title) e.title = `Donne un titre d’au moins ${MIN.title} caractères.`;
  if (len("excerpt") < MIN.excerpt)
    e.excerpt = `L’accroche doit faire au moins ${MIN.excerpt} caractères (actuellement ${len("excerpt")}).`;
  if (len("category") < MIN.category) e.category = "Choisis ou écris une catégorie.";
  if (len("coverImage") < MIN.coverImage) e.coverImage = "Indique l’image de couverture.";
  const slug = slugify(v.slug);
  const taken = others.find((p) => p.slug === slug);
  if (slug.length < MIN.slug) e.slug = `L’adresse doit faire au moins ${MIN.slug} caractères.`;
  else if (taken) e.slug = `Cette adresse est déjà utilisée par « ${taken.title} ». Choisis-en une autre.`;
  if (len("description") < MIN.description)
    e.description = `L’étude de cas doit faire au moins ${MIN.description} caractères (actuellement ${len("description")}).`;
  if (parseTools(v.technologies).join("").length < 2) e.technologies = "Indique au moins un outil utilisé.";
  for (const k of ["projectUrl", "repository"] as const) {
    if (v[k].trim() && !/^https?:\/\/\S+\.\S+/.test(v[k].trim()))
      e[k] = "Colle l’adresse complète, qui commence par https://";
  }
  if (!/^\d+$/.test(v.sortOrder.trim())) e.sortOrder = "Indique un nombre entier : 0, 1, 2…";
  if (v.homeLane && !v.isHidden) {
    const taken =
      others.filter((p) => !p.isHidden && p.homeLane === v.homeLane).length +
      identities.filter((item) => !item.isHidden && item.homeLane === v.homeLane).length;
    if (taken >= HOME_SLOTS) {
      const label = v.homeLane === "dev" ? "Développement" : "Design";
      e.homeLane = `L’onglet ${label} a déjà ${HOME_SLOTS} projets. Retire-en un avant d’ajouter celui-ci.`;
    }
  }
  return e;
}

type ProjectEditorProps = {
  project: Project | null;
  projects: Project[];
  categories: Category[];
  images: string[];
  identities: IdentityAdmin[];
  canSave: boolean;
};

export default function ProjectEditor({ project, projects, categories, images, identities, canSave }: ProjectEditorProps) {
  const { adminKey, go, setLeaveGuard } = useAdminNav();
  const toast = useToast();
  const fail = useActionFailure();
  const now = useNow();
  const uid = useId();
  const isNew = !project;
  const draftKey = `admin-draft:${project?.id ?? "nouveau"}`;

  const [baseline, setBaseline] = useState(() => toValues(project));
  const [values, setValues] = useState(baseline);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [restored, setRestored] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [serverErrors, setServerErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [coverBroken, setCoverBroken] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, startSaving] = useTransition();
  const [deleting, startDeleting] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const others = useMemo(() => projects.filter((p) => p.id !== project?.id), [projects, project?.id]);
  const dirty = !same(values, baseline);
  const errors = { ...(attempted ? validate(values, others, identities) : {}), ...serverErrors };
  const errorCount = Object.keys(errors).length;
  const busy = saving || deleting || uploadingCover;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(draftKey);
      if (!raw) return;
      const draft = { ...baseline, ...(JSON.parse(raw) as Partial<Values>) };
      if (same(draft, baseline)) return;
      setValues(draft);
      setSlugTouched(!isNew || draft.slug !== slugify(draft.title));
      setRestored(true);
    } catch {
      sessionStorage.removeItem(draftKey);
    }
    // Restore once, on open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      if (dirty) sessionStorage.setItem(draftKey, JSON.stringify(values));
      else sessionStorage.removeItem(draftKey);
    } catch {
      // Private mode or full storage: the leave guard still protects the work.
    }
    setLeaveGuard(dirty ? "Tes modifications sur ce projet ne sont pas enregistrées." : null);
  }, [dirty, values, draftKey, setLeaveGuard]);

  useEffect(() => () => setLeaveGuard(null), [setLeaveGuard]);

  const set = <K extends FieldName>(key: K, value: Values[K]) => {
    setValues((v) => {
      const next = { ...v, [key]: value };
      if (key === "title" && !slugTouched) next.slug = slugify(String(value));
      return next;
    });
    if (serverErrors[key]) {
      setServerErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (key === "coverImage") setCoverBroken(false);
  };

  const onCoverFile = async (file: File | undefined) => {
    if (!file || busy) return;
    setUploadError(null);
    setUploadingCover(true);
    const body = new FormData();
    body.set("key", adminKey);
    body.set("file", file);
    try {
      const response = await fetch("/api/admin/cover", { method: "POST", body });
      const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!response.ok || !data?.url) {
        setUploadError(data?.error ?? "La photo n’a pas pu être envoyée.");
        return;
      }
      set("coverImage", data.url);
      setCoverBroken(false);
    } catch {
      setUploadError("La photo n’a pas pu être envoyée. Vérifie ta connexion, puis réessaie.");
    } finally {
      setUploadingCover(false);
    }
  };

  const discardDraft = () => {
    sessionStorage.removeItem(draftKey);
    setValues(baseline);
    setSlugTouched(!isNew);
    setRestored(false);
  };

  const focusFirstError = (errs: Partial<Record<FieldName, string>>) => {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !canSave) return;
    setAttempted(true);
    const clean = { ...values, slug: slugify(values.slug) };
    const errs = validate(clean, others, identities);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }
    setValues(clean);

    const fd = new FormData();
    fd.set("key", adminKey);
    fd.set("id", project?.id ?? "");
    (Object.keys(clean) as FieldName[]).forEach((k) => {
      if (k === "isHidden" || k === "homeLane") return;
      fd.set(k, String(clean[k]).trim());
    });
    if (clean.isHidden) fd.set("isHidden", "on");
    if (!clean.isHidden && clean.homeLane) fd.set("homeLane", clean.homeLane);

    startSaving(async () => {
      const res = await upsertProjectAction(null, fd).catch(() => undefined);
      if (!res?.success) {
        if (res?.errors) {
          const mapped = Object.fromEntries(Object.entries(res.errors).map(([k, v]) => [k, v?.[0] ?? ""]));
          setServerErrors(mapped);
          focusFirstError(mapped);
        }
        fail(
          res,
          res?.errors
            ? "Certains champs sont refusés : corrige-les puis enregistre à nouveau."
            : "Le projet n’a pas pu être enregistré. Si le problème persiste, vérifie que son adresse n’est pas déjà utilisée."
        );
        return;
      }
      sessionStorage.removeItem(draftKey);
      setBaseline(clean);
      setRestored(false);
      setAttempted(false);
      setLeaveGuard(null);
      const viewOnline = { label: "Voir en ligne", onAction: () => window.open(`/works/${clean.slug}`, "_blank", "noopener") };
      if (isNew) {
        toast({ tone: "success", text: `« ${clean.title.trim()} » est en ligne.`, action: viewOnline });
        go({ view: "projects" }, { force: true });
      } else {
        toast({ tone: "success", text: "Modifications en ligne.", action: viewOnline });
      }
    });
  };

  const remove = () => {
    if (!project) return;
    const fd = new FormData();
    fd.set("key", adminKey);
    fd.set("id", project.id);
    startDeleting(async () => {
      const res = await deleteProjectAction(null, fd).catch(() => undefined);
      setConfirmDelete(false);
      if (!res?.success) {
        fail(res, `« ${project.title} » n’a pas pu être retiré. Il est toujours en ligne.`);
        return;
      }
      sessionStorage.removeItem(draftKey);
      setLeaveGuard(null);
      toast({ tone: "success", text: `« ${project.title} » est retiré du site.` });
      go({ view: "projects" }, { force: true });
    });
  };

  // What the public site will do with the current values.
  const simulated = useMemo(() => {
    const self = {
      id: project?.id ?? "__nouveau",
      sortOrder: Number.parseInt(values.sortOrder, 10) || 0,
      createdAt: project?.createdAt ?? "9999-12-31",
    };
    const visible = [...others.filter((item) => !item.isHidden), ...(values.isHidden ? [] : [self])];
    const ordered = siteOrder(visible);
    return {
      position: values.isHidden ? null : ordered.findIndex((item) => item.id === self.id) + 1,
      total: ordered.length,
    };
  }, [values.isHidden, values.sortOrder, others, project?.id, project?.createdAt]);

  const tools = parseTools(values.technologies);
  const categoryKnown = categories.some((c) => c.name.toLowerCase() === values.category.trim().toLowerCase());
  const coverSuggestions = useMemo(
    () => Array.from(new Set([...images, ...projects.map((p) => p.coverImage)])).sort(),
    [images, projects]
  );

  const id = (k: FieldName) => `${uid}-${k}`;
  const described = (k: FieldName, hasHint = true) =>
    [errors[k] ? `${id(k)}-error` : "", hasHint ? `${id(k)}-hint` : ""].filter(Boolean).join(" ") || undefined;
  const inputProps = (k: FieldName) => ({
    id: id(k),
    name: k,
    className: "a-input",
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": described(k),
  });

  const status = saving
    ? "Enregistrement…"
    : !canSave
      ? "Enregistrement impossible pour le moment (voir le bandeau en haut)."
      : attempted && errorCount
        ? `${errorCount} champ${errorCount > 1 ? "s" : ""} à corriger`
        : dirty
          ? "Modifications non enregistrées"
          : isNew
            ? "Rien n’est encore publié"
            : "Tout est enregistré";

  return (
    <div className="mx-auto max-w-6xl">
      <ScreenHeader
        eyebrow={<BackLink to={{ view: "projects" }} label="Projets" />}
        title={isNew ? "Nouveau projet" : baseline.title}
        subtitle={
          isNew ? (
            "Rien n’est visible sur le site avant que tu cliques sur « Publier le projet »."
          ) : (
            <>
              En ligne à l’adresse{" "}
              <a href={`/works/${baseline.slug}`} target="_blank" rel="noopener" className="a-link a-strong">
                /works/{baseline.slug}
              </a>
              {now && project ? <span className="a-meta"> · modifié le {formatDate(project.updatedAt)}</span> : null}
            </>
          )
        }
      />

      {restored && (
        <div className="a-banner a-banner--info mb-6" role="status">
          <p className="flex-1">Tes modifications non enregistrées de la dernière fois ont été restaurées.</p>
          <button type="button" className="a-btn a-btn--secondary" onClick={discardDraft}>
            {isNew ? "Repartir de zéro" : "Revenir à la version en ligne"}
          </button>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form ref={formRef} onSubmit={submit} noValidate className="min-w-0 space-y-10" aria-describedby={`${uid}-status`}>
          <Section title="Carte du projet" intro="Ce que les visiteurs voient dans les listes, sur l’accueil et sur la page Projets.">
            <Field label="Titre" htmlFor={id("title")} error={errors.title}>
              <input
                {...inputProps("title")}
                aria-describedby={described("title", false)}
                value={values.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Garden — marketplace B2B"
                autoFocus={isNew}
              />
            </Field>
            <Field
              label="Accroche"
              note="une phrase"
              htmlFor={id("excerpt")}
              error={errors.excerpt}
              hint={`${values.excerpt.trim().length} caractères · minimum ${MIN.excerpt}`}
            >
              <textarea {...inputProps("excerpt")} rows={2} value={values.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
            </Field>
            <Field
              label="Catégorie"
              htmlFor={id("category")}
              error={errors.category}
              hint={
                <>
                  Sur la page Projets, il sera rangé dans le filtre <span className="a-strong">« {siteFilterLabel(values.category)} »</span>.
                  {values.category.trim() && !categoryKnown ? " Cette catégorie n’existe pas encore : elle sera créée." : ""}
                </>
              }
            >
              <input {...inputProps("category")} list={`${uid}-categories`} value={values.category} onChange={(e) => set("category", e.target.value)} />
              <datalist id={`${uid}-categories`}>
                {categories.map((c) => (
                  <option key={c.id} value={c.name} />
                ))}
              </datalist>
            </Field>
            <Field
              label="Image de couverture"
              htmlFor={id("coverImage")}
              error={errors.coverImage}
              hint="Un fichier du dossier public du site (ex. /Garden.png) ou une adresse web complète."
            >
              <input
                {...inputProps("coverImage")}
                list={`${uid}-images`}
                value={values.coverImage}
                onChange={(e) => set("coverImage", e.target.value)}
                placeholder="/Garden.png"
                autoComplete="off"
              />
              <datalist id={`${uid}-images`}>
                {coverSuggestions.map((src) => (
                  <option key={src} value={src} />
                ))}
              </datalist>
              <div className="flex flex-wrap items-center gap-2">
                <label className={`a-btn a-btn--secondary ${uploadingCover || !canSave ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
                  {uploadingCover ? "Envoi de la photo…" : "Choisir une photo sur cet appareil"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                    className="sr-only"
                    disabled={uploadingCover || !canSave}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      void onCoverFile(file);
                    }}
                  />
                </label>
              </div>
              {uploadError ? <p className="a-error">{uploadError}</p> : null}
              {values.coverImage.trim().length >= MIN.coverImage && (
                <div className={coverBroken ? "mt-2" : "mt-2 lg:hidden"}>
                  {coverBroken ? (
                    <p className="a-banner a-banner--warn">
                      Aucune image trouvée à cette adresse. Vérifie le nom du fichier (majuscules comprises).
                    </p>
                  ) : (
                    <img
                      src={values.coverImage.trim()}
                      alt="Aperçu de la couverture"
                      className="aspect-square w-full max-w-sm rounded-lg bg-[var(--a-raised)] object-contain lg:hidden"
                      onError={() => setCoverBroken(true)}
                    />
                  )}
                </div>
              )}
            </Field>
          </Section>

          <Section title="Page du projet" intro="La page détaillée, ouverte quand on clique sur la carte.">
            <Field
              label="Adresse de la page"
              htmlFor={id("slug")}
              error={errors.slug}
              hint={
                <>
                  La page sera <span className="a-strong">/works/{slugify(values.slug) || "…"}</span>.{" "}
                  {!isNew && project && slugify(values.slug) !== project.slug
                    ? `Attention : l’ancienne adresse /works/${project.slug} ne marchera plus, et les liens déjà partagés mèneront à une page introuvable.`
                    : isNew && !slugTouched
                      ? "Remplie automatiquement depuis le titre."
                      : ""}
                </>
              }
            >
              <div className="flex gap-2">
                <input
                  {...inputProps("slug")}
                  value={values.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set(
                      "slug",
                      e.target.value
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[^a-z0-9-]+/g, "-")
                        .replace(/-{2,}/g, "-")
                    );
                  }}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className="a-input font-mono"
                />
                <button
                  type="button"
                  className="a-btn a-btn--secondary a-btn--main shrink-0"
                  onClick={() => {
                    setSlugTouched(isNew ? false : true);
                    set("slug", slugify(values.title));
                  }}
                >
                  Reprendre le titre
                </button>
              </div>
            </Field>
            <Field
              label="Étude de cas"
              htmlFor={id("description")}
              error={errors.description}
              hint={`${values.description.trim().length} caractères · minimum ${MIN.description}. Contexte, choix, résultat.`}
            >
              <textarea
                {...inputProps("description")}
                rows={10}
                value={values.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
            <Field
              label="Outils utilisés"
              note="séparés par des virgules"
              htmlFor={id("technologies")}
              error={errors.technologies}
              hint={
                tools.length ? (
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    {tools.map((t) => (
                      <span key={t} className="a-badge a-badge--neutral">
                        {t}
                      </span>
                    ))}
                  </span>
                ) : (
                  "Exemple : Next.js, Figma, Illustrator"
                )
              }
            >
              <input {...inputProps("technologies")} value={values.technologies} onChange={(e) => set("technologies", e.target.value)} />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Site en ligne" note="facultatif" htmlFor={id("projectUrl")} error={errors.projectUrl}>
                <input
                  {...inputProps("projectUrl")}
                  aria-describedby={described("projectUrl", false)}
                  type="url"
                  inputMode="url"
                  value={values.projectUrl}
                  onChange={(e) => set("projectUrl", e.target.value)}
                  placeholder="https://"
                />
              </Field>
              <Field label="Code source public" note="facultatif" htmlFor={id("repository")} error={errors.repository}>
                <input
                  {...inputProps("repository")}
                  aria-describedby={described("repository", false)}
                  type="url"
                  inputMode="url"
                  value={values.repository}
                  onChange={(e) => set("repository", e.target.value)}
                  placeholder="https://github.com/…"
                />
              </Field>
            </div>
          </Section>

          <Section title="Place sur le site" intro="Masquer retire le projet du site sans le supprimer. Selected Works montre quatre projets par onglet.">
            <label className="a-check">
              <input
                type="checkbox"
                name="isHidden"
                checked={values.isHidden}
                onChange={(e) => {
                  set("isHidden", e.target.checked);
                  if (e.target.checked) set("homeLane", "");
                }}
              />
              <span>
                <span className="a-label block">Masquer sur le site</span>
                <span className="a-hint block">
                  Il disparaît de l’accueil, du catalogue et de sa page. Tu le retrouves ici pour le réafficher.
                </span>
              </span>
            </label>
            <Field
              label="Selected Works"
              htmlFor={id("homeLane")}
              error={errors.homeLane}
              hint={values.isHidden ? "Un projet masqué ne peut pas être sur l’accueil." : "Quatre places dans Développement, quatre dans Design."}
            >
              <select
                {...inputProps("homeLane")}
                value={values.isHidden ? "" : values.homeLane}
                disabled={values.isHidden}
                onChange={(e) => set("homeLane", e.target.value as Values["homeLane"])}
              >
                <option value="">Pas sur l’accueil</option>
                <option value="dev">Onglet Développement</option>
                <option value="design">Onglet Design</option>
              </select>
            </Field>
            <Field
              label="Ordre"
              note="le plus petit nombre passe en premier"
              htmlFor={id("sortOrder")}
              error={errors.sortOrder}
              hint={`Avec cette valeur, il apparaît en position ${simulated.position} sur ${simulated.total} dans le catalogue. À valeur égale, le plus récent passe devant.`}
            >
              <input
                {...inputProps("sortOrder")}
                inputMode="numeric"
                value={values.sortOrder}
                onChange={(e) => set("sortOrder", e.target.value.replace(/[^\d]/g, ""))}
                className="a-input max-w-[8rem] tabular-nums"
              />
            </Field>
          </Section>

          {!isNew && (
            <Section title="Retirer du site">
              <p>La page, la carte et les statistiques de vues de ce projet seront supprimées. Rien ne peut être récupéré ensuite.</p>
              <div>
                <button
                  type="button"
                  className="a-btn a-btn--danger-quiet -ml-3"
                  onClick={() => setConfirmDelete(true)}
                  disabled={busy || !canSave}
                >
                  Retirer ce projet du site…
                </button>
              </div>
            </Section>
          )}

          <div className="a-actionbar fixed inset-x-0 bottom-0 z-30 flex flex-wrap items-center gap-3 lg:static lg:mt-2 lg:rounded-[var(--a-r-md)] lg:border lg:px-5">
            <p id={`${uid}-status`} className={`w-full text-sm sm:w-auto sm:flex-1 ${attempted && errorCount ? "a-error" : "a-meta"}`} aria-live="polite">
              {status}
            </p>
            <button
              type="button"
              className="a-btn a-btn--secondary a-btn--main flex-1 sm:flex-none"
              onClick={() => go({ view: "projects" })}
              disabled={busy}
            >
              Fermer
            </button>
            <button
              type="submit"
              className="a-btn a-btn--primary a-btn--main flex-[2] sm:flex-none"
              disabled={busy || !canSave || (!isNew && !dirty)}
              aria-busy={saving}
            >
              {saving ? "Enregistrement…" : isNew ? "Publier le projet" : "Enregistrer"}
            </button>
          </div>
        </form>

        <aside className="hidden lg:block" aria-label="Aperçu">
          <div className="sticky top-6">
            <p className="a-meta mb-2">Aperçu indicatif de la carte</p>
            <div className="a-panel overflow-hidden">
              {values.coverImage.trim() && !coverBroken ? (
                <img
                  src={values.coverImage.trim()}
                  alt="Aperçu de la couverture"
                  className="aspect-square w-full bg-[var(--a-raised)] object-contain"
                  onError={() => setCoverBroken(true)}
                />
              ) : (
                <div className="a-meta flex aspect-[16/10] items-center justify-center bg-[var(--a-raised)] px-6 text-center">
                  {coverBroken ? "Image introuvable" : "Pas encore d’image"}
                </div>
              )}
              <div className="space-y-1.5 p-4">
                <p className="a-meta">{values.category.trim() || "Catégorie"}</p>
                <p className="a-strong font-semibold">{values.title.trim() || "Titre du projet"}</p>
                <p className="line-clamp-3 text-sm">{values.excerpt.trim() || "L’accroche apparaîtra ici."}</p>
              </div>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="a-meta">Accueil</dt>
                <dd className="a-strong">
                  {values.isHidden || !values.homeLane
                    ? "Non affiché"
                    : values.homeLane === "dev"
                      ? "Développement"
                      : "Design"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="a-meta">Catalogue</dt>
                <dd className="a-strong">
                  {simulated.position ? `${simulated.position} sur ${simulated.total}` : "Masqué"}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {confirmDelete && project && (
        <ConfirmDialog
          tone="danger"
          title={`Retirer « ${project.title} » du site ?`}
          body={
            <p>
              La page <span className="a-strong">/works/{project.slug}</span> disparaît : les liens déjà partagés mèneront à une
              page introuvable. Ses statistiques de vues sont supprimées aussi. C’est définitif.
            </p>
          }
          cancelLabel="Garder le projet"
          confirmLabel={deleting ? "Retrait…" : "Retirer définitivement"}
          pending={deleting}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={remove}
        />
      )}
    </div>
  );
}

function Section({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="space-y-6">
      <div>
        <h2 id={headingId} className="a-section-title">
          {title}
        </h2>
        {intro ? <p className="a-meta mt-1">{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}
