// src/app/data/journeyData.ts

export interface JourneyItem {
  year: string;
  title: string;
  subtitle: string;
}

export const educationData: JourneyItem[] = [
  {
    year: '2023 - 2025 (en cours)',
    title: 'Master en Cybersécurité',
    subtitle: 'Université de Technologie de Troyes (UTT), France',
  },
  {
    year: '2020 - 2023',
    title: 'BUT Métiers du Multimédia et de l\'Internet',
    subtitle: 'IUT de Troyes, France',
  },
  {
    year: '2019',
    title: 'Baccalauréat Scientifique',
    subtitle: 'Lycée Chrestien de Troyes, France',
  },
];

export const experienceData: JourneyItem[] = [
  {
    year: '2023 - Présent',
    title: 'Développeur Freelance',
    subtitle: 'Création de sites web et automatisations pour divers clients.',
  },
  {
    year: '2022',
    title: 'Stage Développeur Web',
    subtitle: 'Agence Web Créativa, Troyes',
  },
  {
    year: '2021',
    title: 'Projet Universitaire - Site E-commerce',
    subtitle: 'Développement d\'une plateforme de A à Z en équipe.',
  },
];