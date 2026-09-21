export type UiProject = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  coverImage: string;
  category: string;
  technologies: string[];
  projectUrl?: string | null;
  repository?: string | null;
  views?: number;
  isFeatured?: boolean;
};

export const profile = {
  name: "SOKPA Edo Yawo",
  role: "Designer graphique & développeur fullstack",
  city: "Lomé, Togo",
  email: "edo.sokpa@lomebs.com",
  phone: "+228 91 48 02 88",
  site: "young-vic.vercel.app",
  heroTagline:
    "Je conçois des identités visuelles et des expériences web premium avec une exigence studio internationale.",
  heroTaglineLines: [
    "Je conçois des identités visuelles et des expériences web premium",
    "avec une exigence studio internationale.",
  ],
  intro:
    "Étudiant en Bachelor 2 Systèmes d'Information, je combine direction artistique, UX/UI et développement Next.js pour transformer des idées en produits digitaux élégants, performants et sécurisés.",
  languages: ["Français", "Anglais"],
  hobbies: ["Graphisme", "Jeux vidéos", "Manga"],
};

export const socialLinks = {
  github: "https://github.com/yongvic",
  linkedin: "https://www.linkedin.com/in/edo-yawo-sokpa-06617b333",
  whatsapp: "https://wa.me/22891480288",
  cv: "/Cv-SOKPA-Edo-Yawo.pdf",
  site: "https://young-vic.vercel.app",
};

export const services = [
  {
    title: "Direction Artistique",
    description: "Définition d'un système visuel fort: composition, hiérarchie, tonalité, cohérence multi-supports.",
  },
  {
    title: "UI/UX Design",
    description: "Conception de parcours clairs et d'interfaces soignées, de la structure wireframe au prototype haute fidélité.",
  },
  {
    title: "Développement Next.js",
    description: "Implémentation fullstack moderne (App Router, Server Actions, APIs, Prisma) avec focus performance.",
  },
  {
    title: "Automatisation & N8N",
    description: "Mise en place de workflows pour accélérer la production et réduire les tâches manuelles répétitives.",
  },
];

export const skills = [
  { label: "Figma / systèmes UI", value: 91 },
  { label: "Design graphique", value: 89 },
  { label: "Next.js / React", value: 84 },
  { label: "TypeScript", value: 78 },
  { label: "Cybersécurité (fondamentaux)", value: 70 },
  { label: "Automatisation n8n", value: 74 },
];

export const timeline = [
  {
    period: "Oct 2025 - Jan 2026",
    title: "Designer Graphique",
    subtitle: "Les Pros de la Tech",
    details:
      "Création de visuels pour Koodi, SpeedMakers, Miame et Doasi; collaboration marketing et social media.",
  },
  {
    period: "Juil 2025 - Sept 2025",
    title: "Stagiaire en Informatique",
    subtitle: "KYA-Energy Group",
    details:
      "Développement de pages web Next.js/React/Tailwind et premiers workflows d'automatisation avec n8n.",
  },
  {
    period: "2024 - A nos jours",
    title: "Stagiaire en Design Graphique",
    subtitle: "Centre ELEVATOR ONE",
    details: "Affiches, flyers et contenus digitaux avec Figma, Canva et Photoshop.",
  },
  {
    period: "2024 - 2026",
    title: "Bachelor 2 - Systèmes d'Information",
    subtitle: "Lomé Business School",
    details: "Parcours axé développement web, cybersécurité et architecture logicielle.",
  },
];

export const certifications = [
  "Introduction à la Cybersécurité - Cisco Networking Academy",
  "Développement web - OpenClassrooms",
  "Badge Microsoft: menaces liées aux appareils et contrôles de sécurité",
  "Adobe Photoshop - Cursa",
];

export const processSteps = [
  {
    title: "Discovery",
    description: "Audit du besoin, benchmark visuel, objectifs métier et contraintes techniques.",
  },
  {
    title: "Direction",
    description: "Définition d'une DA précise: palette, type, rythme, grille, langage visuel.",
  },
  {
    title: "Design",
    description: "Maquettes hautes fidélités et interactions orientées clarté, émotion et conversion.",
  },
  {
    title: "Delivery",
    description: "Intégration fullstack, optimisation SEO/perf/accessibilité, instrumentation analytics.",
  },
];

export const staticProjects: UiProject[] = [
  // ── 1. SaaS B2B — Projet phare ──
  {
    id: "garden",
    slug: "garden",
    title: "Garden",
    excerpt: "Marketplace B2B pour louer coworkings et salles au Togo.",
    description:
      "Garden met en relation propriétaires et entreprises à Lomé : coworking, salles de réunion, espaces événementiels. Le landlord valide la demande, le locataire paie via Stripe, les photos passent par un upload drag-and-drop. Tableau de bord, sinistres et rôles Auth.js — un cycle locatif complet, pas une vitrine.",
    coverImage: "/Garden.png",
    category: "Web",
    technologies: ["Next.js 16", "TypeScript", "Tailwind 4", "PostgreSQL", "Auth.js v5", "Stripe", "Vercel Blob"],
    projectUrl: "https://garden-one-silk.vercel.app",
    repository: "https://github.com/yongvic/Garden",
    isFeatured: true,
  },
  // ── 2. SaaS Gestion immobilière ──
  {
    id: "moeris-facture",
    slug: "moeris-facture",
    title: "Résidence Moeris",
    excerpt: "CRM hôtelier : chambres, restaurant, factures PDF, rôles staff.",
    description:
      "Résidence Moeris centralise l'exploitation d'une résidence multiservice : hébergement, consommations, caisse restaurant et activités. Chaque profil (Admin, Manager, Staff) ne voit que ce qu'il a le droit de faire. Les factures sortent en PDF avec logo, les exports CSV suivent la compta — un seul outil à la place de cahiers et de fils WhatsApp.",
    coverImage: "/moeris.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Prisma v7", "PostgreSQL", "React-pdf", "Auth.js"],
    projectUrl: "https://moeris.vercel.app",
    repository: "https://github.com/yongvic/moeris-facture",
    isFeatured: true,
  },
  // ── 3. Wishlist premium ──
  {
    id: "veloura",
    slug: "veloura",
    title: "Veloura",
    excerpt: "Wishlist à deux : elle note ses envies, lui réserve, sans spoiler.",
    description:
      "Veloura est une wishlist cadeaux pensée mobile-first. Deux comptes se lient par un lien d'invitation — pas d'e-mail obligatoire. La personne qui offre voit les envies et réserve ; celle qui reçoit ne voit jamais qui a réservé quoi. Photos compressées côté client, stockées sur Vercel Blob, base Neon Postgres.",
    coverImage: "/veloura.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Prisma", "Neon", "Vercel Blob", "Vitest"],
    projectUrl: "https://veloura-sigma-ten.vercel.app",
    repository: "https://github.com/yongvic/veloura",
    isFeatured: true,
  },
  // ── 4. E-commerce solaire — KYA Energy Group ──
  {
    id: "kya-marketplace",
    slug: "kya-marketplace",
    title: "KYA Energy Group",
    excerpt: "Site officiel et boutique solaire de KYA Energy, au Togo.",
    description:
      "Site corporate et marketplace pour KYA Energy Group, entreprise solaire basée au Togo. Le visiteur comprend l'offre (panneaux, kits, installation), parcourt le catalogue et demande un devis ou un achat. Design orienté confiance : typo claire, cards produit, parcours mobile d'abord — pour un marché où le solaire se vend encore beaucoup en rendez-vous.",
    coverImage: "/kya_marketplace.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    projectUrl: "https://kya-energy-website.vercel.app",
    repository: "https://github.com/yongvic/kya-energy-website",
    isFeatured: true,
  },
  // ── 5. Preuve d'accords ──
  {
    id: "zero-palabre",
    slug: "zero-palabre",
    title: "Zéro-Palabre",
    excerpt: "Un accord verbal devient une preuve PDF, en moins de deux minutes.",
    description:
      "Zéro-Palabre formalise les accords du quotidien au Togo et en Afrique de l'Ouest : prêts, locations, prestations. On décrit l'engagement, on invite l'autre partie par magic link, on valide, on télécharge un PDF et on vérifie le document via un lien public. Pensé pour remplacer la palabre et le « on s'est dit que » par une trace claire, y compris sur mobile.",
    coverImage: "/zero-palabre.png",
    category: "Web",
    technologies: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "React-pdf"],
    projectUrl: "https://zero-palabre.vercel.app",
    repository: "https://github.com/yongvic/Zero-Palabre",
  },
  // ── 6. Enquêtes CNAO ──
  {
    id: "enquete",
    slug: "enquete",
    title: "Sondage",
    excerpt: "Créez un sondage, partagez un code, lisez les résultats en direct.",
    description:
      "Outil d'enquêtes (CNAO et terrain) : le créateur compose ses questions dans un assistant, publie, puis récupère un lien, un code court ou un QR. Les répondants n'ont pas de compte. Le tableau de bord affiche les graphiques, exporte CSV / Excel / PDF, et peut rédiger une synthèse via Gemini. Interface FR / EN.",
    coverImage: "/enquete.png",
    category: "Web",
    technologies: ["Next.js 15", "TypeScript", "Prisma", "Neon", "Auth.js", "Recharts", "Gemini"],
    projectUrl: "https://enquete-pi.vercel.app",
    repository: "https://github.com/yongvic/enquete",
  },
  // ── 7. Restaurant QR ──
  {
    id: "moeris-ma-table",
    slug: "moeris-ma-table",
    title: "Moeris — Ma table",
    excerpt: "Le client commande au QR ; la salle suit reçue, en préparation, servie.",
    description:
      "Ma table relie la table et la cuisine de la Résidence Moeris. Le client scanne le QR, voit le menu, choisit les goûts, commande, appelle le service et laisse un avis en partant. Le staff avance les tickets : reçue → préparation → servie. Temps réel (Pusher ou polling), photos des plats, comptes salle protégés par Auth.js.",
    coverImage: "/moeris-ma-table.png",
    category: "Web",
    technologies: ["Next.js 16", "TypeScript", "Prisma", "Neon", "Auth.js", "Pusher"],
    projectUrl: "https://moeris-ma-table.vercel.app",
    repository: "https://github.com/yongvic/Moeris-Ma-table",
  },
  // ── 8. Marketplace e-Commerce ──
  {
    id: "execly",
    slug: "execly",
    title: "Execly",
    excerpt: "Marketplace multi-vendeurs : panier, checkout, admin RBAC.",
    description:
      "Execly est une boutique en ligne production-ready : catalogue, panier, codes promo, checkout multi-étapes. Côté admin, datatables, KPI et logs de sécurité. L'auth passe par JWT HttpOnly (jose), les rôles USER / ADMIN / MODERATOR / SUPER_ADMIN sont des enums PostgreSQL — pas un simple flag dans le front.",
    coverImage: "/execly.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind v4", "Prisma", "PostgreSQL", "Jose JWT"],
    projectUrl: "https://execly-ashy.vercel.app",
    repository: "https://github.com/yongvic/Execly",
  },
  // ── 9. Campagnes WhatsApp ──
  {
    id: "wa-campaigns",
    slug: "wa-campaigns",
    title: "WA Campaigns",
    excerpt: "Campagnes WhatsApp en file d'attente, GOWA jamais exposé sur Internet.",
    description:
      "WA Campaigns pilote des envois WhatsApp (texte, image, vidéo, document) depuis un dashboard. Les destinataires viennent d'un CSV, d'un collage ou du carnet. Une file SQLite envoie avec un délai aléatoire et reprend après redémarrage. GOWA reste dans Docker, sans port public : le navigateur ne parle qu'au dashboard.",
    coverImage: "/wa-campaigns.png",
    category: "Automatisation",
    technologies: ["React", "Vite", "Express", "SQLite", "Docker", "GOWA"],
    repository: "https://github.com/yongvic/wa-campaigns",
  },
  // ── 10. Desktop pharmacie ──
  {
    id: "pharmagestion",
    slug: "pharmagestion",
    title: "PharmaGestion Pro",
    excerpt: "Pharmacie hors-ligne : stock, caisse, assurances INAM / NSIA, Windows.",
    description:
      "PharmaGestion Pro tourne 100 % en local, sans internet. Le pharmacien gère le catalogue (code-barres, alertes, import Excel), le stock, le POS et la caisse. Les assurances togolaises (INAM, NSIA, etc.) appliquent un taux de couverture. Trois rôles : Admin, Pharmacien, Caissier. Un seul Setup.exe pour le client, sans Python ni Node.",
    coverImage: "/pharmagestion.png",
    category: "Web",
    technologies: ["Electron", "React 19", "Django REST", "SQLite", "JWT", "Tailwind 4"],
    repository: "https://github.com/yongvic/pharmagestion",
  },
  // ── 11. Automatisation — Chatbot ──
  {
    id: "chatbot-moeris",
    slug: "chatbot-moeris",
    title: "Chatbot Moeris",
    excerpt: "Assistant web Moeris : questions fréquentes, réponses automatisées n8n.",
    description:
      "Chatbot d'accueil pour la résidence Moeris. L'interface guide la conversation (chambre, resto, horaires) sans noyer le visiteur. Les réponses métier passent par des workflows n8n : on change un scénario sans redéployer le front. Version TypeScript, hébergée sur Vercel, lisible sur téléphone.",
    coverImage: "/chatbot.png",
    category: "Automatisation",
    technologies: ["TypeScript", "Next.js", "n8n"],
    projectUrl: "https://chatbot-moeris.vercel.app",
    repository: "https://github.com/yongvic/ChatbotMoeris",
  },
  // ── 12. Portfolio client ──
  {
    id: "ravi-s",
    slug: "ravi-s",
    title: "Ravi's — Plateforme Éducative",
    excerpt: "Anglais cabine CEFR : modules, oraux notés, plan d'apprentissage en PDF.",
    description:
      "Ravi's entraîne l'anglais de cabine (interprétation) par niveaux CEFR A1→C1. L'app génère des modules, fait passer des oraux notés, attribue des badges et exporte le plan personnalisé en PDF via Puppeteer. Cinq compétences : reading, listening, writing, speaking, vocab. Un outil pédagogique, pas un site vitrine.",
    coverImage: "/ravis.png",
    category: "Web",
    technologies: ["Next.js 16", "TypeScript", "Prisma", "Auth.js", "Tailwind v4", "Puppeteer"],
    projectUrl: "https://ravi-s.vercel.app",
    repository: "https://github.com/yongvic/Ravi-s",
  },
  // ── 13. App fullstack modulaire ──
  {
    id: "zyra",
    slug: "zyra",
    title: "Zyra — Couples App",
    excerpt: "App couples à distance : chat temps réel, jeux, souvenirs partagés.",
    description:
      "Zyra est un MVP pour les couples séparés géographiquement. Chat WebSocket (Socket.io), sept mini-jeux synchronisés, playlists et souvenirs. Front Next.js 16, API NestJS, auth JWT + Google. L'enjeu : une latence basse et une auth propre, pas une landing romantique vide.",
    coverImage: "/zyra.png",
    category: "Web",
    technologies: ["Next.js 16", "NestJS", "Socket.io", "TypeScript", "PostgreSQL"],
    repository: "https://github.com/yongvic/Zyra",
  },
  // ── 14. Site studio client ──
  {
    id: "rudore-portfolio",
    slug: "rudore-portfolio",
    title: "Rudore",
    excerpt: "Vitrine d'un venture studio : branding sombre, cas produit et craft.",
    description:
      "Site vitrine pour Rudore, venture studio qui « forge » des produits numériques. Direction artistique sombre, typo tranchante, grille de créations (branding, fintech, marketplace, edtech). Le site doit faire sentir le positionnement « du brut au rare » en quelques scrolls, pas lister des services comme une agence générique.",
    coverImage: "/rudore.png",
    category: "Graphic",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    projectUrl: "https://rudore-portfolio.vercel.app",
    repository: "https://github.com/yongvic/rudore_portfolio",
  },
  // ── 15. Design graphique ──
  {
    id: "affiche-wfa",
    slug: "affiche-wfa",
    title: "Affiche Word Fashion Agency",
    excerpt: "Affiche mode éditoriale : contraste, typo, mémorisation.",
    description:
      "Affiche pour Word Fashion Agency. Composition éditoriale, hiérarchie typographique forte et contraste volontairement dur, pour tenir à la fois en print et en digital. L'objectif : une image de marque mode immédiatement reconnaissable, pas un flyer « événement + date + logo ».",
    coverImage: "/WFA.png",
    category: "Graphic",
    technologies: ["Figma", "Brand Design"],
  },
  // ── 16. Backend sécurisé — Java ──
  {
    id: "api-java",
    slug: "api-java",
    title: "API Sécurisée Spring Boot",
    excerpt: "API Spring Boot 3 : inscription, JWT, BCrypt, routes protégées.",
    description:
      "Backend REST prêt à brancher un front React ou une app mobile. Spring Boot 3, inscription et login, mots de passe BCrypt, filtre JWT, routes protégées, MySQL en prod et H2 en test. Projet propre, hot reload, collections REST Client — une base d'auth réutilisable, pas un tutoriel Hello World.",
    coverImage: "/api-java.png",
    category: "Web",
    technologies: ["Java", "Spring Boot", "JWT", "MySQL"],
    repository: "https://github.com/yongvic/api-java",
  },
  // ── 17. Produit web ludique ──
  {
    id: "never-bored-lovers",
    slug: "never-bored-lovers",
    title: "Never Bored Lovers",
    excerpt: "Mini-jeux pour couples, sessions courtes, d'abord sur mobile.",
    description:
      "Never Bored Lovers propose des mini-jeux à deux, pensés pour des sessions de quelques minutes sur téléphone. Parcours mobile-first, interactions immédiates, ton chaleureux. Destiné à relancer un moment à deux sans installation lourde ni compte obligatoire dès l'ouverture.",
    coverImage: "/For our.png",
    category: "Web",
    technologies: ["Next.js", "React", "TypeScript"],
    projectUrl: "https://for-mira.vercel.app/",
    repository: "https://github.com/yongvic/For-Our",
  },
];

export type ProjectCaseStudy = {
  year: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  accent: string;
  fontFamily: string;
  images: {
    hero: string;
    desktop: string;
    mobile: string;
    details: string[];
  };
};

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  "garden": {
    year: "2026",
    role: "Développement fullstack & architecture",
    challenge:
      "Transformer la gestion locative professionnelle au Togo. Il s'agissait d’offrir une interface premium B2B SaaS permettant aux Landlords locaux de louer des Espaces de coworking ou des Salles avec un cycle complet (de la demande jusqu'à la gestion des sinistres et paiements).",
    solution:
      "Création d'un SaaS Next.js 16 (App Router). Implémentation d'Auth.js v5 Beta pour la gestion multi-rôles, système d'upload média interactif (Drag & Drop) via Vercel Blob, Stripe, avec une vraie approche UI Dark mode premium (Radix UI, Tailwind 4).",
    results: [
      "Processus de réservation 100% fluide (Demande → Validation Landlord → Paiement).",
      "Tableau de bord pour propriétaires avec gestion des dommages (Damage Claims).",
      "Architecture UI premium fluide inspirée des meilleurs standards SaaS B2B.",
    ],
    accent: "#10B981",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/Garden.png",
      desktop: "/Garden.png",
      mobile: "/Garden.png",
      details: ["/Garden.png"],
    },
  },
  "moeris-facture": {
    year: "2026",
    role: "Développement fullstack & conception SaaS",
    challenge:
      "Centraliser la gestion complexe d'une résidence multiservice de prestige. Il fallait réunir dans un CRM sécurisé l'hébergement, le restaurant (système POS), les activités, tout en générant automatiquement des factures PDF professionnelles adaptées aux niveaux de rôles des employés.",
    solution:
      "Développement from-scratch sous Next.js et Prisma v7. Intégration poussée de @react-pdf/renderer pour éditer des PDF dynamiques avec logo, création d'exports CSV complexes et mise en place d'un système RBAC complet (Admin, Manager, Staff).",
    results: [
      "Génération automatique et standardisée des factures en format PDF.",
      "Interface POS Restaurant fluidifiant les commandes et consommations.",
      "Contrôle strict des accès pour éviter les erreurs d'annulation (RBAC).",
    ],
    accent: "#3B82F6",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/moeris.png",
      desktop: "/moeris.png",
      mobile: "/moeris.png",
      details: ["/moeris.png"],
    },
  },
  "kya-marketplace": {
    year: "2025",
    role: "Design produit & développement Next.js",
    challenge:
      "Créer un écosystème web complet pour une entreprise solaire : site vitrine qui inspire confiance et marketplace orientée conversion.",
    solution:
      "Grille claire, cards produit hiérarchisées, parcours d'achat progressif et design corporate premium. Performance optimisée pour les visiteurs mobiles.",
    results: [
      "Meilleure compréhension de l'offre dès la première visite.",
      "Parcours d'achat structuré et rassurant.",
      "Image de marque professionnelle renforcée.",
    ],
    accent: "#FFB703",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/kya_marketplace.png",
      desktop: "/KYA.png",
      mobile: "/KYA.png",
      details: ["/KYA.png", "/kya_marketplace.png"],
    },
  },
  "chatbot-moeris": {
    year: "2025",
    role: "Direction artistique & développement front",
    challenge:
      "Concevoir un assistant conversationnel clair, rapide et rassurant, tout en évitant la fatigue cognitive sur mobile.",
    solution:
      "J'ai structuré les flux de discussion autour de micro-interactions visibles, d'une hiérarchie typographique forte et d'une UI instantanée pour guider chaque étape.",
    results: [
      "Interface perçue comme plus fluide et accessible.",
      "Temps d'adoption réduit grâce à une navigation évidente.",
      "Expérience mobile stabilisée sur écrans étroits.",
    ],
    accent: "#D7FB61",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/chatbot.png",
      desktop: "/chatbot.png",
      mobile: "/chatbot.png",
      details: ["/chatbot.png"],
    },
  },
  "affiche-wfa": {
    year: "2024",
    role: "Direction artistique & graphisme",
    challenge:
      "Traduire l'identité mode de la marque en une affiche éditoriale à fort contraste et forte mémorisation.",
    solution:
      "J'ai articulé une composition éditoriale, une typographie premium et une palette ultra contrastée pour renforcer la présence.",
    results: [
      "Signature visuelle immédiatement reconnaissable.",
      "Hiérarchie lisible sur print et digital.",
      "Identité renforcée pour les campagnes.",
    ],
    accent: "#F43F5E",
    fontFamily: "var(--font-gambarino)",
    images: {
      hero: "/WFA.png",
      desktop: "/WFA.png",
      mobile: "/ensemble.jpg",
      details: ["/WFA.png", "/ensemble.jpg"],
    },
  },
  "api-java": {
    year: "2025",
    role: "Développement backend & sécurité",
    challenge:
      "Construire une API REST sécurisée et scalable avec authentification JWT, prête à être consommée par un frontend React ou une application mobile.",
    solution:
      "Architecture Spring Boot 3 propre avec filtres JWT, hashage BCrypt, routes protégées par rôle et configuration multi-environnement.",
    results: [
      "API 100% fonctionnelle avec authentification sécurisée.",
      "Architecture réutilisable pour d'autres projets backend.",
      "Documentation et tests REST Client intégrés.",
    ],
    accent: "#EF4444",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/api-java.png",
      desktop: "/api-java.png",
      mobile: "/api-java.png",
      details: ["/api-java.png"],
    },
  },
  "never-bored-lovers": {
    year: "2026",
    role: "UX/UI & développement front",
    challenge:
      "Concevoir une expérience ludique et rapide à utiliser pour des sessions courtes, en priorisant la clarté mobile.",
    solution:
      "J'ai mis en place un flow mobile-first, des interactions directes et un design émotionnel pour renforcer l'engagement.",
    results: [
      "Navigation simple dès la première utilisation.",
      "Interactions rapides pour des sessions courtes.",
      "Design perçu comme chaleureux et engageant.",
    ],
    accent: "#8B5CF6",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/For our.png",
      desktop: "/For our.png",
      mobile: "/For our.png",
      details: ["/For our.png"],
    },
  },
  "ravi-s": {
    year: "2026",
    role: "Fullstack Developer & product",
    challenge:
      "Concevoir une plateforme d'apprentissage de l'anglais CAE (cabine) orientée progression CEFR, simulation métier et évaluation progressive, avec gamification et exports de plans pédagogiques personnalisés.",
    solution:
      "Application Next.js 16 avec moteur CEFR centralisé (A1→C1), génération de modules hebdomadaires, badges de niveau, notation des oraux, et export PDF via Puppeteer. Upload d'avatar et profil personnalisé. Auth.js Credentials.",
    results: [
      "Plateforme éducative complète avec 5 compétences (Reading, Listening, Writing, Speaking, Vocab).",
      "Export PDF du plan d'apprentissage personnalisé généré en temps réel.",
      "Système de badges CEFR (A1→C1) motivant la progression.",
    ],
    accent: "#06B6D4",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/ravis.png",
      desktop: "/ravis.png",
      mobile: "/ravis.png",
      details: ["/ravis.png"],
    },
  },
  "zyra": {
    year: "2026",
    role: "Fullstack Developer (Next.js + NestJS)",
    challenge:
      "Créer une app SaaS complète pour les couples en situation de distance. Gestion du chat temps réel, mini-jeux interactifs, souvenirs photo/playlists partagés, tout en garantissant sécurité et faible latence.",
    solution:
      "Architecture full-stack Next.js 16 (frontend) + NestJS 6 modules (backend). Messaging WebSockets via Socket.io Gateway, auth JWT + Google OAuth, 9 tables PostgreSQL (Neon serverless).",
    results: [
      "MVP Phase 1 complète : chat, 7 jeux, souvenirs, playlist, profils.",
      "Latence sub-second sur le WebSocket (Socket.io).",
      "Architecture prête pour la Phase 2 (logique jeux, push notifications).",
    ],
    accent: "#EC4899",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/zyra.png",
      desktop: "/zyra.png",
      mobile: "/zyra.png",
      details: ["/zyra.png"],
    },
  },
  "execly": {
    year: "2026",
    role: "Fullstack Developer",
    challenge:
      "Construire une vraie marketplace e-commerce production-ready avec gestion sécurisée des utilisateurs, panier, checkout et un espace administrateur complet permettant la modération et le suivi des KPIs.",
    solution:
      "Application Next.js App Router avec API Routes serverless, authentification JWT HttpOnly ultra-sécurisée via jose (HmacSHA256), RBAC PostgreSQL Enums (USER/ADMIN/MODERATOR/SUPER_ADMIN), dashboard admin avec Recharts.",
    results: [
      "Marketplace complète fonctionnelle : browse, cart, checkout multi-étapes avec codes promo.",
      "Espace Admin V2 avec KPIs interactifs, datatables utilisateurs et logs de sécurité.",
      "Authentification JWT HttpOnly + cookies sécurisés et RBAC strict.",
    ],
    accent: "#2563EB",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/execly.png",
      desktop: "/execly.png",
      mobile: "/execly.png",
      details: ["/execly.png"],
    },
  },
  veloura: {
    year: "2026",
    role: "Produit & développement fullstack",
    challenge:
      "Permettre à deux personnes de partager une wishlist cadeaux sans gâcher la surprise : les réservations doivent rester invisibles pour celle qui reçoit.",
    solution:
      "App Next.js mobile-first, paires de comptes par invitation (lien à transmettre soi-même), photos compressées vers Vercel Blob, Neon Postgres et tests Vitest sur la machine à états.",
    results: [
      "Parcours invitation → envies → réservation sans spoiler.",
      "Stockage photos production via Vercel Blob, fallback local en dev.",
      "Couverture de tests sur auth, validation et rate-limit.",
    ],
    accent: "#C9A227",
    fontFamily: "var(--font-gambarino)",
    images: {
      hero: "/veloura.png",
      desktop: "/veloura.png",
      mobile: "/veloura.png",
      details: ["/veloura.png"],
    },
  },
  "zero-palabre": {
    year: "2026",
    role: "Produit & développement fullstack",
    challenge:
      "Transformer un accord verbal du quotidien (prêt, location, prestation) en preuve claire, en moins de deux minutes, pour le Togo et l'Afrique de l'Ouest.",
    solution:
      "Parcours multi-étapes, magic link Auth.js, PDF de preuve, pages publiques de validation et de vérification, score de fiabilité et plans d'abonnement simulés.",
    results: [
      "Accord certifié en quelques minutes, y compris sur mobile.",
      "PDF téléchargeable et lien de vérification publique.",
      "Identité visuelle teal / dark pensée pour la confiance.",
    ],
    accent: "#0F766E",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/zero-palabre.png",
      desktop: "/zero-palabre.png",
      mobile: "/zero-palabre.png",
      details: ["/zero-palabre.png"],
    },
  },
  enquete: {
    year: "2026",
    role: "Fullstack & produit data",
    challenge:
      "Donner aux enquêteurs académiques et de terrain un outil pour créer, diffuser et analyser des sondages, sans friction pour les répondants.",
    solution:
      "Wizard de création, partage lien / code / QR, dashboard Recharts, exports CSV Excel PDF, synthèse Gemini et interface bilingue FR / EN.",
    results: [
      "Réponse possible sans compte, via code court.",
      "Rapports exportables et synthèse IA optionnelle.",
      "Superadmin pour la statistique plateforme.",
    ],
    accent: "#C9971C",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/enquete.png",
      desktop: "/enquete.png",
      mobile: "/enquete.png",
      details: ["/enquete.png"],
    },
  },
  "moeris-ma-table": {
    year: "2026",
    role: "Fullstack restaurant",
    challenge:
      "Relier la table et la cuisine : le client commande au QR, la salle suit les statuts sans paperasse.",
    solution:
      "Monolithe Next.js : parcours /t/[table] (menu, commande, service, avis) et back-office staff JWT. Temps réel Pusher ou polling, photos plats Blob.",
    results: [
      "Cycle complet reçue → préparation → servie.",
      "QR imprimables par table, prêts pour la salle.",
      "Avis et contact en fin de soirée, sans casser le flux service.",
    ],
    accent: "#B45309",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/moeris-ma-table.png",
      desktop: "/moeris-ma-table.png",
      mobile: "/moeris-ma-table.png",
      details: ["/moeris-ma-table.png"],
    },
  },
  "wa-campaigns": {
    year: "2026",
    role: "Architecture & automatisation",
    challenge:
      "Piloter des campagnes WhatsApp sans exposer GOWA sur Internet ni forker le moteur d'envoi.",
    solution:
      "Dashboard Vite / Express qui proxy GOWA en interne, file SQLite, import CSV, envoi multimédia et stack Docker + Caddy pour le VPS.",
    results: [
      "GOWA jamais publié : Basic Auth interne uniquement.",
      "Reprise des campagnes après redémarrage serveur.",
      "Déploiement VPS documenté, HTTPS Let's Encrypt optionnel.",
    ],
    accent: "#25D366",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/wa-campaigns.png",
      desktop: "/wa-campaigns.png",
      mobile: "/wa-campaigns.png",
      details: ["/wa-campaigns.png"],
    },
  },
  pharmagestion: {
    year: "2026",
    role: "Produit desktop & backend",
    challenge:
      "Équiper une pharmacie togolaise d'un outil de stock, caisse et assurances qui fonctionne sans internet.",
    solution:
      "Electron + React + Django REST, SQLite local, JWT, import Excel/CSV, POS et rôles métier. Installateur Windows autonome (~110 Mo).",
    results: [
      "Fonctionnement 100 % hors-ligne, données dans AppData.",
      "Couverture INAM / NSIA et tickets TVA.",
      "Distribution client : un seul Setup.exe, sans Python ni Node.",
    ],
    accent: "#0EA5E9",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/pharmagestion.png",
      desktop: "/pharmagestion.png",
      mobile: "/pharmagestion.png",
      details: ["/pharmagestion.png"],
    },
  },
  "rudore-portfolio": {
    year: "2026",
    role: "Direction artistique & front-end",
    challenge:
      "Donner à un venture studio une vitrine à la hauteur de son positionnement : du brut au rare.",
    solution:
      "Site Next.js sombre, typographie tranchante, grille de créations branding et produit, signal de marque industrial craft.",
    results: [
      "Lecture claire de l'offre studio en quelques scrolls.",
      "Vitrine de cas (branding, fintech, marketplace, edtech).",
      "Ton visuel aligné sur l'excellence artisanale du studio.",
    ],
    accent: "#E8D5A3",
    fontFamily: "var(--font-gambarino)",
    images: {
      hero: "/rudore.png",
      desktop: "/rudore.png",
      mobile: "/rudore.png",
      details: ["/rudore.png"],
    },
  },
};

export const staticTestimonials = [
  {
    id: "kya",
    name: "Responsable Projet",
    role: "KYA-Energy Group",
    quote:
      "Edo Yawo combine sens du détail graphique et exécution technique. Les livrables sont propres, rapides et cohérents.",
  },
  {
    id: "lpt",
    name: "Lead Marketing",
    role: "Les Pros de la Tech",
    quote:
      "Sa capacité à traduire des besoins business en visuels percutants et en interfaces utiles est remarquable.",
  },
];

type ProjectAdapter = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  coverImage: string;
  technologies: string[];
  projectUrl?: string | null;
  repository?: string | null;
  isFeatured?: boolean;
  category?: { name: string } | null;
};

export function projectToUi(project: ProjectAdapter): UiProject {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    excerpt: project.excerpt,
    description: project.description,
    coverImage: project.coverImage,
    category: project.category?.name ?? "Web",
    technologies: project.technologies,
    projectUrl: project.projectUrl,
    repository: project.repository,
    isFeatured: project.isFeatured ?? false,
  };
}
