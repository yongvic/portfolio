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
  {
    id: "chatbot-moeris",
    slug: "chatbot-moeris",
    title: "Chatbot Moeris",
    excerpt: "Assistant conversationnel web avec interface instantanée.",
    description:
      "Application de chatbot avec interface moderne, gestion des états de conversation et parcours utilisateur fluide.",
    coverImage: "/chatbot.png",
    category: "Automatisation",
    technologies: ["JavaScript", "CSS3", "n8n"],
    projectUrl: "https://yongvic.github.io/ChatbotMoeris/",
  },
  {
    id: "kya-marketplace",
    slug: "kya-marketplace",
    title: "Marketplace KYA-Energy Group",
    excerpt: "Marketplace solaire orientée conversion et lisibilité.",
    description:
      "Conception et développement d'une plateforme e-commerce pour la vente de solutions solaires.",
    coverImage: "/kya_marketplace.jpg",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
  },
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
  "kya-marketplace": {
    year: "2025",
    role: "Design produit & intégration Next.js",
    challenge:
      "Créer une marketplace solaire lisible, orientée conversion, qui met en valeur les bénéfices techniques sans surcharger l'utilisateur.",
    solution:
      "J'ai travaillé une grille claire, des cards produit hiérarchisées et un parcours d'achat progressif, le tout optimisé pour la performance.",
    results: [
      "Meilleure compréhension de l'offre dès la première visite.",
      "Temps de chargement optimisé pour les visiteurs mobiles.",
      "Parcours d'achat structuré et rassurant.",
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
