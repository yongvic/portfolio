// src/app/data/statsData.ts
import { IconType } from 'react-icons';
import { FaCode, FaUsers, FaRocket } from 'react-icons/fa6';

export interface StatItem {
  value: number;
  label: string;
  icon: IconType;
}

export const statsData: StatItem[] = [
  {
    value: 50, // Nombre de maquettes réalisées
    label: 'Maquettes Réalisées',
    icon: FaCode,
  },
  {
    value: 12, // Nombre de projets réussis
    label: 'Projets Réussis',
    icon: FaRocket,
  },
  {
    value: 8, // Nombre de clients ou collaborations
    label: 'Collaborations',
    icon: FaUsers,
  },
];