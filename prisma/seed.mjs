import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
  {
    slug: "garden",
    title: "Garden",
    excerpt: "Marketplace B2B pour louer coworkings et salles au Togo.",
    description:
      "Garden met en relation propriétaires et entreprises à Lomé : coworking, salles de réunion, espaces événementiels. Le landlord valide la demande, le locataire paie via Stripe, les photos passent par un upload drag-and-drop. Tableau de bord, sinistres et rôles Auth.js — un cycle locatif complet, pas une vitrine.",
    coverImage: "/Garden.png",
    projectUrl: "https://garden-one-silk.vercel.app",
    repository: "https://github.com/yongvic/Garden",
    technologies: ["Next.js 16", "TypeScript", "Tailwind 4", "Prisma", "PostgreSQL", "Auth.js v5", "Stripe", "Vercel Blob"],
    categorySlug: "web",
    sortOrder: 1,
    isFeatured: true,
  },
  {
    slug: "moeris-facture",
    title: "Résidence Moeris",
    excerpt: "CRM hôtelier : chambres, restaurant, factures PDF, rôles staff.",
    description:
      "Résidence Moeris centralise l'exploitation d'une résidence multiservice : hébergement, consommations, caisse restaurant et activités. Chaque profil (Admin, Manager, Staff) ne voit que ce qu'il a le droit de faire. Les factures sortent en PDF avec logo, les exports CSV suivent la compta — un seul outil à la place de cahiers et de fils WhatsApp.",
    coverImage: "/moeris.png",
    projectUrl: "https://moeris.vercel.app",
    repository: "https://github.com/yongvic/moeris-facture",
    technologies: ["Next.js App Router", "TypeScript", "Prisma v7", "PostgreSQL", "@react-pdf/renderer", "Auth.js", "Tailwind v4"],
    categorySlug: "web",
    sortOrder: 2,
    isFeatured: true,
  },
  {
    slug: "veloura",
    title: "Veloura",
    excerpt: "Wishlist à deux : elle note ses envies, lui réserve, sans spoiler.",
    description:
      "Veloura est une wishlist cadeaux pensée mobile-first. Deux comptes se lient par un lien d'invitation — pas d'e-mail obligatoire. La personne qui offre voit les envies et réserve ; celle qui reçoit ne voit jamais qui a réservé quoi. Photos compressées côté client, stockées sur Vercel Blob, base Neon Postgres.",
    coverImage: "/veloura.png",
    projectUrl: "https://veloura-sigma-ten.vercel.app",
    repository: "https://github.com/yongvic/veloura",
    technologies: ["Next.js", "TypeScript", "Prisma", "Neon", "Vercel Blob", "Vitest"],
    categorySlug: "web",
    sortOrder: 3,
    isFeatured: true,
  },
  {
    slug: "kya-marketplace",
    title: "KYA Energy Group",
    excerpt: "Site officiel et boutique solaire de KYA Energy, au Togo.",
    description:
      "Site corporate et marketplace pour KYA Energy Group, entreprise solaire basée au Togo. Le visiteur comprend l'offre (panneaux, kits, installation), parcourt le catalogue et demande un devis ou un achat. Design orienté confiance : typo claire, cards produit, parcours mobile d'abord — pour un marché où le solaire se vend encore beaucoup en rendez-vous.",
    coverImage: "/kya_marketplace.png",
    projectUrl: "https://kya-energy-website.vercel.app",
    repository: "https://github.com/yongvic/kya-energy-website",
    technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    categorySlug: "web",
    sortOrder: 4,
    isFeatured: true,
  },
  {
    slug: "zero-palabre",
    title: "Zéro-Palabre",
    excerpt: "Un accord verbal devient une preuve PDF, en moins de deux minutes.",
    description:
      "Zéro-Palabre formalise les accords du quotidien au Togo et en Afrique de l'Ouest : prêts, locations, prestations. On décrit l'engagement, on invite l'autre partie par magic link, on valide, on télécharge un PDF et on vérifie le document via un lien public. Pensé pour remplacer la palabre et le « on s'est dit que » par une trace claire, y compris sur mobile.",
    coverImage: "/zero-palabre.png",
    projectUrl: "https://zero-palabre.vercel.app",
    repository: "https://github.com/yongvic/Zero-Palabre",
    technologies: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "React-pdf"],
    categorySlug: "web",
    sortOrder: 5,
    isFeatured: false,
  },
  {
    slug: "enquete",
    title: "Sondage",
    excerpt: "Créez un sondage, partagez un code, lisez les résultats en direct.",
    description:
      "Outil d'enquêtes (CNAO et terrain) : le créateur compose ses questions dans un assistant, publie, puis récupère un lien, un code court ou un QR. Les répondants n'ont pas de compte. Le tableau de bord affiche les graphiques, exporte CSV / Excel / PDF, et peut rédiger une synthèse via Gemini. Interface FR / EN.",
    coverImage: "/enquete.png",
    projectUrl: "https://enquete-pi.vercel.app",
    repository: "https://github.com/yongvic/enquete",
    technologies: ["Next.js 15", "TypeScript", "Prisma", "Neon", "Auth.js", "Recharts", "Gemini"],
    categorySlug: "web",
    sortOrder: 6,
    isFeatured: false,
  },
  {
    slug: "moeris-ma-table",
    title: "Moeris — Ma table",
    excerpt: "Le client commande au QR ; la salle suit reçue, en préparation, servie.",
    description:
      "Ma table relie la table et la cuisine de la Résidence Moeris. Le client scanne le QR, voit le menu, choisit les goûts, commande, appelle le service et laisse un avis en partant. Le staff avance les tickets : reçue → préparation → servie. Temps réel (Pusher ou polling), photos des plats, comptes salle protégés par Auth.js.",
    coverImage: "/moeris-ma-table.png",
    projectUrl: "https://moeris-ma-table.vercel.app",
    repository: "https://github.com/yongvic/Moeris-Ma-table",
    technologies: ["Next.js 16", "TypeScript", "Prisma", "Neon", "Auth.js", "Pusher"],
    categorySlug: "web",
    sortOrder: 7,
    isFeatured: false,
  },
  {
    slug: "execly",
    title: "Execly",
    excerpt: "Marketplace multi-vendeurs : panier, checkout, admin RBAC.",
    description:
      "Execly est une boutique en ligne production-ready : catalogue, panier, codes promo, checkout multi-étapes. Côté admin, datatables, KPI et logs de sécurité. L'auth passe par JWT HttpOnly (jose), les rôles USER / ADMIN / MODERATOR / SUPER_ADMIN sont des enums PostgreSQL — pas un simple flag dans le front.",
    coverImage: "/execly.png",
    projectUrl: "https://execly-ashy.vercel.app/",
    repository: "https://github.com/yongvic/Execly",
    technologies: ["Next.js", "TypeScript", "Tailwind v4", "Prisma", "PostgreSQL", "Jose JWT", "bcryptjs"],
    categorySlug: "web",
    sortOrder: 8,
    isFeatured: false,
  },
  {
    slug: "wa-campaigns",
    title: "WA Campaigns",
    excerpt: "Campagnes WhatsApp en file d'attente, GOWA jamais exposé sur Internet.",
    description:
      "WA Campaigns pilote des envois WhatsApp (texte, image, vidéo, document) depuis un dashboard. Les destinataires viennent d'un CSV, d'un collage ou du carnet. Une file SQLite envoie avec un délai aléatoire et reprend après redémarrage. GOWA reste dans Docker, sans port public : le navigateur ne parle qu'au dashboard.",
    coverImage: "/wa-campaigns.png",
    projectUrl: null,
    repository: "https://github.com/yongvic/wa-campaigns",
    technologies: ["React", "Vite", "Express", "SQLite", "Docker", "GOWA"],
    categorySlug: "automatisation",
    sortOrder: 9,
    isFeatured: false,
  },
  {
    slug: "pharmagestion",
    title: "PharmaGestion Pro",
    excerpt: "Pharmacie hors-ligne : stock, caisse, assurances INAM / NSIA, Windows.",
    description:
      "PharmaGestion Pro tourne 100 % en local, sans internet. Le pharmacien gère le catalogue (code-barres, alertes, import Excel), le stock, le POS et la caisse. Les assurances togolaises (INAM, NSIA, etc.) appliquent un taux de couverture. Trois rôles : Admin, Pharmacien, Caissier. Un seul Setup.exe pour le client, sans Python ni Node.",
    coverImage: "/pharmagestion.png",
    projectUrl: null,
    repository: "https://github.com/yongvic/pharmagestion",
    technologies: ["Electron", "React 19", "Django REST", "SQLite", "JWT", "Tailwind 4"],
    categorySlug: "web",
    sortOrder: 10,
    isFeatured: false,
  },
  {
    slug: "chatbot-moeris",
    title: "Chatbot Moeris",
    excerpt: "Assistant web Moeris : questions fréquentes, réponses automatisées n8n.",
    description:
      "Chatbot d'accueil pour la résidence Moeris. L'interface guide la conversation (chambre, resto, horaires) sans noyer le visiteur. Les réponses métier passent par des workflows n8n : on change un scénario sans redéployer le front. Version TypeScript, hébergée sur Vercel, lisible sur téléphone.",
    coverImage: "/chatbot.png",
    projectUrl: "https://chatbot-moeris.vercel.app",
    repository: "https://github.com/yongvic/ChatbotMoeris",
    technologies: ["TypeScript", "Next.js", "n8n"],
    categorySlug: "automatisation",
    sortOrder: 11,
    isFeatured: false,
  },
  {
    slug: "ravi-s",
    title: "Ravi's — Plateforme Éducative",
    excerpt: "Anglais cabine CEFR : modules, oraux notés, plan d'apprentissage en PDF.",
    description:
      "Ravi's entraîne l'anglais de cabine (interprétation) par niveaux CEFR A1→C1. L'app génère des modules, fait passer des oraux notés, attribue des badges et exporte le plan personnalisé en PDF via Puppeteer. Cinq compétences : reading, listening, writing, speaking, vocab. Un outil pédagogique, pas un site vitrine.",
    coverImage: "/ravis.png",
    projectUrl: "https://ravi-s.vercel.app",
    repository: "https://github.com/yongvic/Ravi-s",
    technologies: ["Next.js 16", "TypeScript", "Prisma", "Auth.js", "Tailwind v4", "Puppeteer", "Vercel Blob"],
    categorySlug: "web",
    sortOrder: 12,
    isFeatured: false,
  },
  {
    slug: "zyra",
    title: "Zyra — Couples App",
    excerpt: "App couples à distance : chat temps réel, jeux, souvenirs partagés.",
    description:
      "Zyra est un MVP pour les couples séparés géographiquement. Chat WebSocket (Socket.io), sept mini-jeux synchronisés, playlists et souvenirs. Front Next.js 16, API NestJS, auth JWT + Google. L'enjeu : une latence basse et une auth propre, pas une landing romantique vide.",
    coverImage: "/zyra.png",
    projectUrl: null,
    repository: "https://github.com/yongvic/Zyra",
    technologies: ["Next.js 16", "React 19", "NestJS", "Socket.io", "TypeScript", "PostgreSQL"],
    categorySlug: "web",
    sortOrder: 13,
    isFeatured: false,
  },
  {
    slug: "rudore-portfolio",
    title: "Rudore",
    excerpt: "Vitrine d'un venture studio : branding sombre, cas produit et craft.",
    description:
      "Site vitrine pour Rudore, venture studio qui « forge » des produits numériques. Direction artistique sombre, typo tranchante, grille de créations (branding, fintech, marketplace, edtech). Le site doit faire sentir le positionnement « du brut au rare » en quelques scrolls, pas lister des services comme une agence générique.",
    coverImage: "/rudore.png",
    projectUrl: "https://rudore-portfolio.vercel.app",
    repository: "https://github.com/yongvic/rudore_portfolio",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    categorySlug: "graphic",
    sortOrder: 14,
    isFeatured: false,
  },
  {
    slug: "affiche-wfa",
    title: "Affiche Word Fashion Agency",
    excerpt: "Affiche mode éditoriale : contraste, typo, mémorisation.",
    description:
      "Affiche pour Word Fashion Agency. Composition éditoriale, hiérarchie typographique forte et contraste volontairement dur, pour tenir à la fois en print et en digital. L'objectif : une image de marque mode immédiatement reconnaissable, pas un flyer « événement + date + logo ».",
    coverImage: "/WFA.png",
    projectUrl: null,
    repository: null,
    technologies: ["Figma", "Brand Design"],
    categorySlug: "graphic",
    sortOrder: 15,
    isFeatured: false,
  },
  {
    slug: "api-java",
    title: "API Sécurisée Spring Boot",
    excerpt: "API Spring Boot 3 : inscription, JWT, BCrypt, routes protégées.",
    description:
      "Backend REST prêt à brancher un front React ou une app mobile. Spring Boot 3, inscription et login, mots de passe BCrypt, filtre JWT, routes protégées, MySQL en prod et H2 en test. Projet propre, hot reload, collections REST Client — une base d'auth réutilisable, pas un tutoriel Hello World.",
    coverImage: "/api-java.png",
    projectUrl: null,
    repository: "https://github.com/yongvic/api-java",
    technologies: ["Java", "Spring Boot", "JWT", "MySQL"],
    categorySlug: "web",
    sortOrder: 16,
    isFeatured: false,
  },
  {
    slug: "never-bored-lovers",
    title: "Never Bored Lovers",
    excerpt: "Mini-jeux pour couples, sessions courtes, d'abord sur mobile.",
    description:
      "Never Bored Lovers propose des mini-jeux à deux, pensés pour des sessions de quelques minutes sur téléphone. Parcours mobile-first, interactions immédiates, ton chaleureux. Destiné à relancer un moment à deux sans installation lourde ni compte obligatoire dès l'ouverture.",
    coverImage: "/For our.png",
    projectUrl: "https://for-mira.vercel.app/",
    repository: "https://github.com/yongvic/For-Our",
    technologies: ["Next.js", "React", "TypeScript"],
    categorySlug: "web",
    sortOrder: 17,
    isFeatured: false,
  },
];

async function main() {
  const categories = ["Web", "Graphic", "Automatisation"];

  for (const name of categories) {
    const slug = name.toLowerCase();
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
  }

  const categoryBySlug = Object.fromEntries(
    (await prisma.category.findMany()).map((category) => [category.slug, category.id])
  );

  await prisma.project.deleteMany({
    where: { slug: "affiche-word-fashion-agency" },
  });

  for (const project of projects) {
    const { categorySlug, ...data } = project;
    const payload = {
      ...data,
      categoryId: categoryBySlug[categorySlug] ?? null,
    };

    await prisma.project.upsert({
      where: { slug: project.slug },
      update: payload,
      create: payload,
    });
  }

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Responsable Projet",
        role: "KYA-Energy Group",
        quote:
          "Edo Yawo combine sens du détail graphique et exécution technique. Les livrables sont propres, rapides et cohérents.",
      },
      {
        name: "Lead Marketing",
        role: "Les Pros de la Tech",
        quote:
          "Sa capacité à traduire des besoins business en visuels percutants et en interfaces utiles est remarquable.",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
