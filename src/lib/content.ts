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
    excerpt: "Marketplace B2B SaaS de location d'espaces professionnels.",
    description:
      "Plateforme B2B Premium de mise en relation au Togo (Coworking, réunions). Gestion complète de la location, système d'approbation Landlord, uploader média interactif et paiements transparents.",
    coverImage: "/Garden.png",
    category: "Web",
    technologies: ["Next.js 16", "TypeScript", "Tailwind 4", "PostgreSQL", "Auth.js v5", "Stripe", "Vercel Blob"],
    projectUrl: "https://garden-one-silk.vercel.app",
    repository: "https://github.com/yongvic/Garden",
  },
  // ── 2. SaaS Gestion immobilière ──
  {
    id: "moeris-facture",
    slug: "moeris-facture",
    title: "Résidence Moeris",
    excerpt: "SaaS de gestion hôtelière et CRM multiservice.",
    description:
      "SaaS de gestion hôtelière complet (CRM, consommations, restaurant POS, activités). Système RBAC poussé (Admin/Manager/Staff) et édition de factures dynamiques PDF.",
    coverImage: "/moeris.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Prisma v7", "PostgreSQL", "React-pdf", "Auth.js"],
    projectUrl: "https://moeris.vercel.app",
    repository: "https://github.com/yongvic/moeris-facture",
  },
  // ── 3. E-commerce solaire — KYA Energy Group ──
  {
    id: "kya-marketplace",
    slug: "kya-marketplace",
    title: "KYA Energy Group",
    excerpt: "Site vitrine & marketplace solaire pour le marché togolais.",
    description:
      "Conception et développement du site corporate et de la marketplace e-commerce de KYA Energy Group. Design orienté confiance et conversion, catalogue produits solaires, parcours d'achat progressif et formulaire de contact.",
    coverImage: "/kya_marketplace.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    projectUrl: "https://kya-energy-website.vercel.app",
    repository: "https://github.com/yongvic/kya-marketplace",
  },
  // ── 4. Automatisation — Chatbot ──
  {
    id: "chatbot-moeris",
    slug: "chatbot-moeris",
    title: "Chatbot Moeris",
    excerpt: "Assistant conversationnel web avec interface instantanée.",
    description:
      "Application de chatbot avec interface moderne, gestion des états de conversation et parcours utilisateur fluide. Intégration avec n8n pour l'automatisation des réponses.",
    coverImage: "/chatbot.png",
    category: "Automatisation",
    technologies: ["JavaScript", "CSS3", "n8n"],
    projectUrl: "https://yongvic.github.io/ChatbotMoeris/",
    repository: "https://github.com/yongvic/ChatbotMoeris",
  },
  // ── 5. Design graphique — Contraste visuel ──
  {
    id: "affiche-wfa",
    slug: "affiche-wfa",
    title: "Affiche Word Fashion Agency",
    excerpt: "Campagne visuelle mode à tonalité éditoriale.",
    description:
      "Création d'une affiche premium avec composition éditoriale, contraste fort et hiérarchie typographique.",
    coverImage: "/WFA.png",
    category: "Graphic",
    technologies: ["Figma", "Brand Design"],
  },
  // ── 6. Backend sécurisé — Java ──
  {
    id: "api-java",
    slug: "api-java",
    title: "API Sécurisée Spring Boot",
    excerpt: "Backend REST sécurisé avec JWT et architecture professionnelle.",
    description:
      "API Spring Boot 3 complète avec authentification JWT, inscription, login, hashage BCrypt, routes protégées et filtre de sécurité. Architecture backend prête pour intégration React ou mobile.",
    coverImage: "/IMAGE_API_JAVA_A_AJOUTER.png",
    category: "Web",
    technologies: ["Java", "Spring Boot", "JWT", "MySQL"],
    repository: "https://github.com/yongvic/api-java",
  },
  // ── 7. Produit web ludique ──
  {
    id: "never-bored-lovers",
    slug: "never-bored-lovers",
    title: "Never Bored Lovers",
    excerpt: "Produit web ludique avec design émotionnel.",
    description:
      "Application web de mini-jeux pour couples avec UX mobile-first et parcours d'interaction rapide.",
    coverImage: "/For our.png",
    category: "Web",
    technologies: ["Next.js", "React", "TypeScript"],
    projectUrl: "https://for-mira.vercel.app/",
    repository: "https://github.com/yongvic/For-Our",
  },
  // ── 8. Portfolio client ──
  {
    id: "ravi-s",
    slug: "ravi-s",
    title: "Ravi's — Plateforme Éducative",
    excerpt: "Plateforme éducative d'anglais cabine avec simulation métier et gamification.",
    description:
      "Application ludo-éducative structurée par niveaux CEFR. Contient une logique métier de génération de modules, passages d'examens oraux, système de badges de progression, et export automatique en PDF du plan d'apprentissage via Puppeteer.",
    coverImage: "/ravis.png",
    category: "Web",
    technologies: ["Next.js 16", "TypeScript", "Prisma", "Auth.js", "Tailwind v4", "Puppeteer"],
    projectUrl: "https://ravi-s.vercel.app",
    repository: "https://github.com/yongvic/Ravi-s",
  },
  // ── 9. App fullstack modulaire ──
  {
    id: "zyra",
    slug: "zyra",
    title: "Zyra — Couples App",
    excerpt: "SaaS temps réel pour les relations à distance avec chat WebSockets.",
    description:
      "MVP SaaS complet avec messagerie WebSockets (Socket.io), 7 mini-jeux interactifs en temps réel, gestion de playlists partagées et une authentification renforcée via NestJS et Google OAuth.",
    coverImage: "/zyra.png",
    category: "Web",
    technologies: ["Next.js 16", "NestJS", "Socket.io", "TypeScript", "PostgreSQL"],
    repository: "https://github.com/yongvic/Zyra",
  },
  // ── 10. Marketplace e-Commerce ──
  {
    id: "execly",
    slug: "execly",
    title: "Execly",
    excerpt: "Marketplace Full-Stack avec RBAC et espace Administrateur complet.",
    description:
      "Véritable application e-commerce multi-vendeurs avec gestion de panier, paiement, espace administrateur sécurisé (Datatables, KPI), authentification JWT jose ultra-sécurisée et RBAC via enums SQL.",
    coverImage: "/execly.png",
    projectUrl: "https://execly-ashy.vercel.app",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind v4", "Prisma", "PostgreSQL", "Jose JWT"],
    repository: "https://github.com/yongvic/execly",
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
      hero: "/IMAGE_API_JAVA_A_AJOUTER.png",
      desktop: "/IMAGE_API_JAVA_A_AJOUTER.png",
      mobile: "/IMAGE_API_JAVA_MOBILE_A_AJOUTER.png",
      details: ["/IMAGE_API_JAVA_A_AJOUTER.png", "/IMAGE_API_JAVA_MOBILE_A_AJOUTER.png"],
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
      "Authéentification JWT HttpOnly + cookies sécurisés et RBAC strict.",
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
  };
}
