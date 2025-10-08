// src/app/data/projectsData.ts

export type ProjectCategory = 'Tous' | 'Graphic' | 'UX/Ui' | 'Automatisation' | 'Web';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  tags: string[]; // <-- NOUVEAU: Tableau pour les étiquettes
  link?: string; // Lien optionnel
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Site E-commerce "Nova"',
    description: 'Plateforme complète avec gestion de produits et paiement sécurisé.',
    image: '/projects/nova-ecommerce.jpg', // Remplacez par vos images
    category: 'Web',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'],
    link: '#',
  },
  {
    id: 2,
    title: 'Maquette "HealthApp"',
    description: 'Interface pour une application de suivi de santé et de fitness.',
    image: '/projects/health-app.jpg',
    category: 'UX/Ui',
    tags: ['Figma', 'Adobe XD'],
    link: '#',
  },
  {
    id: 3,
    title: 'Automatisation de Factures',
    description: 'Workflow N8n pour générer et envoyer des factures automatiquement.',
    image: '/projects/automation.jpg',
    category: 'Automatisation',
    tags: ['N8n', 'Google Sheets', 'API'],
  },
  {
    id: 4,
    title: 'Identité Visuelle "Quantum"',
    description: 'Création de logo et charte graphique pour une startup technologique.',
    image: '/projects/quantum-branding.jpg',
    category: 'Graphic',
    tags: ['Illustrator', 'Photoshop'],
    link: '#',
  },
  {
    id: 5,
    title: 'Portfolio Personnel V2',
    description: 'La seconde version de mon portfolio, conçue avec Next.js 14.',
    image: '/projects/portfolio-v2.jpg',
    category: 'Web',
    tags: ['Next.js', 'Framer Motion', 'TypeScript'],
  },
  {
    id: 6,
    title: 'Dashboard Admin',
    description: "Conception et intégration d'un tableau de bord d'analyse de données.",
    image: '/projects/dashboard.jpg',
    category: 'UX/Ui',
    tags: ['Figma', 'React', 'Tailwind'],
    link: '#',
  },
];

export const filters: ProjectCategory[] = ['Tous', 'Web', 'UX/Ui', 'Automatisation', 'Graphic'];