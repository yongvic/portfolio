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
    excerpt: "Marketplace B2B de location d'espaces professionnels au Togo.",
    description:
      "Plateforme SaaS complète de location d'espaces de coworking, salles d'événements et équipements professionnels. Système de réservation, dashboard propriétaire, gestion des paiements et avis utilisateurs.",
    coverImage: "/IMAGE_GARDEN_A_AJOUTER.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL", "Auth.js"],
    projectUrl: "https://garden-one-silk.vercel.app",
    repository: "https://github.com/yongvic/Garden",
  },
  // ── 2. SaaS Gestion immobilière ──
  {
    id: "moeris-facture",
    slug: "moeris-facture",
    title: "Résidence Moeris",
    excerpt: "SaaS de gestion immobilière et facturation résidentielle.",
    description:
      "Application de gestion de résidences avec facturation automatisée, suivi des locataires, tableau de bord administrateur et génération de documents. Architecture sécurisée avec authentification et rôles.",
    coverImage: "/IMAGE_MOERIS_A_AJOUTER.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js"],
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
    coverImage: "/kya_marketplace.jpg",
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
    coverImage: "/for_our.jpg",
    category: "Web",
    technologies: ["Next.js", "React", "TypeScript"],
    projectUrl: "https://for-mira.vercel.app/",
    repository: "https://github.com/yongvic/For-Our",
  },
  // ── 8. Portfolio client ──
  {
    id: "ravi-s",
    slug: "ravi-s",
    title: "Ravi's — Portfolio Client",
    excerpt: "Portfolio web premium conçu pour un client.",
    description:
      "Portfolio professionnel développé pour un client avec design sur-mesure, animations GSAP, navigation fluide et mise en valeur des réalisations. Déployé sur Vercel.",
    coverImage: "/IMAGE_RAVIS_A_AJOUTER.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
    projectUrl: "https://ravi-s.vercel.app",
    repository: "https://github.com/yongvic/Ravi-s",
  },
  // ── 9. App fullstack modulaire ──
  {
    id: "zyra",
    slug: "zyra",
    title: "Zyra",
    excerpt: "Application web fullstack avec architecture modulaire.",
    description:
      "Projet web fullstack TypeScript avec architecture modulaire propre, gestion d'état avancée et interface utilisateur soignée.",
    coverImage: "/IMAGE_ZYRA_A_AJOUTER.png",
    category: "Web",
    technologies: ["Next.js", "TypeScript"],
    repository: "https://github.com/yongvic/Zyra",
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
    role: "Développement fullstack & design produit",
    challenge:
      "Construire une marketplace B2B complète adaptée au marché togolais, avec gestion des réservations, paiements et avis multi-rôles.",
    solution:
      "Architecture Next.js avec App Router, Prisma ORM, Auth.js pour la gestion des rôles (locataire, propriétaire, admin), et un système de réservation avec workflow de validation.",
    results: [
      "Plateforme SaaS fonctionnelle avec dashboard propriétaire.",
      "Système de réservation avec cycle complet (demande → confirmation → paiement).",
      "Interface responsive adaptée aux utilisateurs mobiles africains.",
    ],
    accent: "#10B981",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/IMAGE_GARDEN_A_AJOUTER.png",
      desktop: "/IMAGE_GARDEN_A_AJOUTER.png",
      mobile: "/IMAGE_GARDEN_MOBILE_A_AJOUTER.png",
      details: ["/IMAGE_GARDEN_A_AJOUTER.png", "/IMAGE_GARDEN_MOBILE_A_AJOUTER.png"],
    },
  },
  "moeris-facture": {
    year: "2026",
    role: "Développement fullstack & architecture",
    challenge:
      "Digitaliser la gestion d'une résidence avec facturation automatisée, tout en garantissant la sécurité des données locataires.",
    solution:
      "SaaS Next.js avec Prisma, système de rôles sécurisé, génération automatique de factures et dashboard admin complet pour le suivi en temps réel.",
    results: [
      "Facturation automatisée réduisant les tâches manuelles.",
      "Tableau de bord administrateur clair et fonctionnel.",
      "Architecture sécurisée avec Auth.js et gestion de rôles.",
    ],
    accent: "#3B82F6",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/IMAGE_MOERIS_A_AJOUTER.png",
      desktop: "/IMAGE_MOERIS_A_AJOUTER.png",
      mobile: "/IMAGE_MOERIS_MOBILE_A_AJOUTER.png",
      details: ["/IMAGE_MOERIS_A_AJOUTER.png", "/IMAGE_MOERIS_MOBILE_A_AJOUTER.png"],
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
      hero: "/kya_marketplace.jpg",
      desktop: "/kya_marketplace.jpg",
      mobile: "/KYA.png",
      details: ["/kya_marketplace.jpg", "/KYA.png"],
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
      mobile: "/chatbot.jpg",
      details: ["/chatbot.png", "/chatbot.jpg"],
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
      hero: "/for_our.jpg",
      desktop: "/for_our.jpg",
      mobile: "/ensemble.jpg",
      details: ["/for_our.jpg", "/ensemble.jpg"],
    },
  },
  "ravi-s": {
    year: "2026",
    role: "Design & développement front",
    challenge:
      "Créer un portfolio professionnel sur-mesure qui reflète l'identité créative du client tout en restant performant.",
    solution:
      "Design personnalisé avec animations GSAP, navigation fluide et déploiement optimisé sur Vercel pour un chargement rapide.",
    results: [
      "Portfolio unique avec identité visuelle cohérente.",
      "Animations fluides et performantes.",
      "Déploiement rapide et SEO optimisé.",
    ],
    accent: "#06B6D4",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/IMAGE_RAVIS_A_AJOUTER.png",
      desktop: "/IMAGE_RAVIS_A_AJOUTER.png",
      mobile: "/IMAGE_RAVIS_MOBILE_A_AJOUTER.png",
      details: ["/IMAGE_RAVIS_A_AJOUTER.png", "/IMAGE_RAVIS_MOBILE_A_AJOUTER.png"],
    },
  },
  "zyra": {
    year: "2026",
    role: "Développement fullstack",
    challenge:
      "Développer une application web modulaire avec une architecture propre et une interface soignée.",
    solution:
      "Architecture TypeScript modulaire avec séparation des responsabilités, composants réutilisables et gestion d'état avancée.",
    results: [
      "Code maintenable et évolutif.",
      "Interface utilisateur claire et responsive.",
      "Architecture modulaire réutilisable.",
    ],
    accent: "#EC4899",
    fontFamily: "var(--font-clash-display)",
    images: {
      hero: "/IMAGE_ZYRA_A_AJOUTER.png",
      desktop: "/IMAGE_ZYRA_A_AJOUTER.png",
      mobile: "/IMAGE_ZYRA_MOBILE_A_AJOUTER.png",
      details: ["/IMAGE_ZYRA_A_AJOUTER.png", "/IMAGE_ZYRA_MOBILE_A_AJOUTER.png"],
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
