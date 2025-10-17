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
  title: 'Chatbot Moeris',
  description: 'Application web de chatbot simple permettant d’interagir avec un bot via une interface moderne et intuitive.',
  image: '/chatbot.png', 
  category: 'Automatisation',
  tags: ['HTML5', 'CSS3', 'JavaScript', 'n8n'],
  link: 'https://yongvic.github.io/ChatbotMoeris/',
 },
  {
    
  id: 2,
  title: 'Marketplace "KYA-Energy Group"',
  description: 'Développement d’une marketplace moderne et performante pour KYA-Energy Group, facilitant la vente, la gestion et la promotion de produits solaires.',
  image: '/kya_marketplace.jpg',
  category: 'Web',
  tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'postgreSQL'],
  link: '#',

  },
  {
  id: 3,
  title: 'Affiche Word Fashion Agency',
  description: 'Création d’une affiche publicitaire professionnelle pour Word Fashion Agency (WFA), une agence de mannequins. Réalisée sur Figma avec une mise en page moderne et des tons africains élégants.',
  image: '/WFA.png', // Mets ici le chemin de ton image
  category: 'Graphic',
  tags: ['Figma'],
 },
  {
  id: 4,
  title: 'Jeu de Romance 💞',
  description: 'Jeu de mémoire romantique à deux joueurs avec des gages amusants et un thème conçu pour les couples.',
  image: '/ensemble.jpg', 
  category: 'Web',
  tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
  link: 'https://yongvic.github.io/Ensemble/', 
 },
  {
  id: 5,
  title: 'Affiche Rentrée Scolaire - KYA-Energy Group',
  description: 'Création d\'une affiche pour la campagne "Rentrée Scolaire" de KYA-Energy Group. Le design a pour but de souhaiter une bonne reprise aux élèves du Togo, en mettant en avant des valeurs d\'avenir et de réussite. La composition allie la charte graphique de l\'entreprise, une photographie inspirante et des informations de contact essentielles.',
  image: '/KYA.png',
  category: 'Graphic',
  tags: ['Affiche', 'Réseaux Sociaux', 'Communication'],
 },
  {
  id: 6,
  title: 'Never Bored Lovers',
  description: 'Application web pour couples regroupant plusieurs mini-jeux amusants et interactifs afin de passer du temps de qualité à deux.',
  image: '/for_our.jpg', // Remplace par ton image
  category: 'Web',
  tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Node.js'],
  link: 'https://for-mira.vercel.app/', // Mets le lien de démo ou de repo GitHub
},

];

export const filters: ProjectCategory[] = ['Tous', 'Web', 'UX/Ui', 'Automatisation', 'Graphic'];