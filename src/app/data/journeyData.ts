// src/app/data/journeyData.ts

export interface JourneyItem {
  year: string;
  title: string;
  subtitle: string;
}

export const educationData: JourneyItem[] = [
  {
    year: '2024 - 2027',
    title: 'Bachelor Système d\'Information',
    subtitle: 'Lomé Business School',
  },
  {
    year: 'Mai 2025',
    title: 'Badge Microsoft : Menaces liées aux appareils et contrôles de sécurité',
    subtitle: 'Microsoft',
  },
  {
    year: 'Janvier 2025',
    title: 'Introduction to HTML, CSS, JAVAScript, React',
    subtitle: 'OpenClassrooms',
  },
  {
    year: 'Février 2025',
    title: 'Introduction à la Cybersécurité',
    subtitle: 'Cisco Networking Academie',
  },
  {
    year: 'Déc 2024',
    title: 'Adobe Photoshop',
    subtitle: 'Cursa',
  },
  {
    year: 'Juin 2023',
    title: 'Baccalauréat',
    subtitle: 'Collège Saint Joseph de Lomé',
  },
];

export const experienceData: JourneyItem[] = [
  {
    year: 'Juil - Sept 2025',
    title: 'Stagiaire en Informatique',
    subtitle: 'KYA-Energy Group',
  },
  {
    year: 'Août 2025 - Now',
    title: 'Designer Graphique',
    subtitle: 'Koodi Africa',
  },
  {
    year: 'Octobre 2025 - Now',
    title: 'Designer Graphique',
    subtitle: 'Centre Elevator One',
  },
];