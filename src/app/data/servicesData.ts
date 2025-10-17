// src/app/data/servicesData.ts
import { IconType } from 'react-icons';
import { FaCode, FaPenNib, FaPalette, FaRobot, FaSearch, FaBrush } from 'react-icons/fa';

export interface Service {
  icon: IconType;
  title: string;
  description: string;
}

export const servicesData: Service[] = [
  {
    icon: FaCode,
    title: 'Développement Front-End',
    description: 'Création d\'interfaces utilisateur réactives, modernes et performantes avec React, Next.js et TypeScript.',
  },
  {
  icon: FaPenNib,
  title: 'Branding & Identité Visuelle',
  description: 'Conception de logos, chartes graphiques et éléments de marque qui reflètent la personnalité de votre entreprise.',
 },
  {
    icon: FaPalette,
    title: 'UX/UI Design',
    description: 'Maquettage et prototypage d\'interfaces intuitives et esthétiques sur Figma pour une expérience utilisateur optimale.',
  },
  {
    icon: FaRobot,
    title: 'Automatisation de Tâches',
    description: 'Mise en place de workflows automatisés avec des outils comme N8n pour optimiser vos processus métier.',
  },
  {
  icon: FaBrush,
  title: 'Direction Artistique',
  description: 'Création d’univers visuels cohérents et impactants pour donner une identité forte à chaque projet.',
  },
  {
    icon: FaSearch,
    title: 'Optimisation SEO',
    description: 'Amélioration du référencement naturel de votre site pour une meilleure visibilité sur les moteurs de recherche.',
  },
];