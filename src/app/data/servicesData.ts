// src/app/data/servicesData.ts
import { IconType } from 'react-icons';
import { FaCode, FaServer, FaPalette, FaRobot, FaSearch, FaShieldAlt } from 'react-icons/fa';

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
    icon: FaServer,
    title: 'Développement Back-End',
    description: 'Conception d\'API REST robustes et de logiques serveur sécurisées avec Node.js et Express.',
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
    icon: FaShieldAlt,
    title: 'Sécurité Web',
    description: 'Analyse et renforcement de la sécurité de vos applications web pour protéger les données sensibles.',
  },
  {
    icon: FaSearch,
    title: 'Optimisation SEO',
    description: 'Amélioration du référencement naturel de votre site pour une meilleure visibilité sur les moteurs de recherche.',
  },
];