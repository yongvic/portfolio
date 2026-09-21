# SOKPA Edo Yawo Portfolio

Portfolio premium conçu avec Next.js App Router, orienté direction artistique, UX/UI et architecture fullstack moderne.

## Aperçu

Ce projet transforme un portfolio personnel en expérience studio créative:

- UI immersive (identité sombre + accents fuchsia/cyan)
- sections éditoriales premium (hero, services, projets, process, témoignages, timeline)
- backend intégré (Prisma + PostgreSQL Neon)
- données projets dynamiques avec fallback statique si la DB est indisponible
- dashboard admin minimal pour gérer les projets
- tracking client côté UI (visites + vues projets)

## Stack

- `Next.js 15` (App Router)
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Prisma ORM`
- `PostgreSQL (Neon)`
- `Zod`

## Fonctionnalités

### Frontend

- Hero visuel haut impact
- narration orientée studio design
- projets dynamiques (DB) avec fallback statique
- responsive desktop/tablette/mobile
- SEO (metadata complète + JSON-LD)
- accessibilité de base (navigation claire, contrastes, labels)

### Backend

- CRUD projets via Server Actions (admin)
- tracking `/api/track` branché dans l'UI (visites + vues projets)
- modèle Prisma complet (prêt pour stats/analytics)
- fallback statique si la DB n'est pas disponible

### Admin

Route: `/admin?key=ADMIN_SECRET`

- créer / mettre à jour un projet
- supprimer un projet
- catégories gérées automatiquement
- les actions vérifient la clé côté serveur

## Schéma de données (Prisma)

Modèles principaux:

- `Project`
- `Category`
- `ProjectView`
- `ContactMessage`
- `SiteVisit`
- `Testimonial`

Fichier: [`prisma/schema.prisma`](./prisma/schema.prisma)

## Installation

```bash
npm install
```

## Configuration

1. Copier l'environnement:

```bash
cp .env.example .env
```

2. Renseigner:

- `DATABASE_URL` (chaîne PostgreSQL Neon)
- `ADMIN_SECRET` (clé d'accès dashboard)

## Base de données (Neon + Prisma)

Générer le client Prisma:

```bash
npm run prisma:generate
```

Créer/mettre à jour les tables:

```bash
npm run db:push
```

Seeder des données initiales:

```bash
npm run db:seed
```

## Lancement local

```bash
npm run dev
```

Build production:

```bash
npm run build
npm run start
```

## Scripts utiles

- `npm run dev` : développement
- `npm run lint` : lint ESLint
- `npm run build` : build prod
- `npm run prisma:generate` : génération client Prisma
- `npm run db:push` : sync schéma DB
- `npm run db:seed` : injection données initiales

## Structure du projet

```txt
src/
  app/
    admin/
      actions.ts
      page.tsx
    api/
      track/route.ts
    works/[slug]/page.tsx
    HomeClient.tsx
    layout.tsx
    page.tsx
  components/
  hooks/
  lib/
    content.ts
    db.ts
    prisma.ts
prisma/
  schema.prisma
  seed.mjs
```

## Déploiement

### Vercel (recommandé)

1. Importer le repo dans Vercel
2. Définir les variables d'environnement `DATABASE_URL` et `ADMIN_SECRET`
3. Build command: `npm run build`
4. Après déploiement, exécuter `npm run db:push` (et `npm run db:seed` si besoin)

## Captures d'écran

Ajoute ici des captures après déploiement:

- `hero.png`
- `projects.png`
- `admin-dashboard.png`

## Notes

- Le projet continue de fonctionner même sans DB (fallback de contenu statique).
- Le tracking `/api/track` est disponible mais non branché par défaut.
- Pour activer toutes les features backend, la DB Neon doit être configurée et migrée.
