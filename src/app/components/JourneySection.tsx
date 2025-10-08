// src/app/components/JourneySection.tsx

'use client';

import React from 'react';
// CORRECTION: Importer le type Variants
import { motion, Variants } from 'framer-motion'; 
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa6';
import { educationData, experienceData, JourneyItem } from '../data/journeyData';
import { IconType } from 'react-icons';

// --- Sous-composant pour une colonne ---
interface JourneyColumnProps {
  title: string;
  icon: IconType;
  items: JourneyItem[];
  animationDelay: number;
}

const JourneyColumn: React.FC<JourneyColumnProps> = ({ title, icon: Icon, items, animationDelay }) => {
  // CORRECTION: Appliquer le type Variants
  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: animationDelay,
        ease: 'easeOut' 
      } 
    },
  };

  // CORRECTION: Appliquer le type Variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2 + animationDelay + 0.4,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <motion.div
      variants={columnVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-brand-purple-dark p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-pink-500/20"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-pink-500/20 rounded-lg">
          <Icon className="text-pink-400 w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      <div className="relative pl-6 border-l-2 border-brand-purple">
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            custom={index}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="relative mb-8 last:mb-0"
          >
            <div className="absolute -left-[34px] top-1 w-4 h-4 bg-brand-purple-dark border-4 border-pink-400 rounded-full"></div>
            
            <p className="text-sm text-brand-mauve mb-1">{item.year}</p>
            <h4 className="font-bold text-lg text-light-text">{item.title}</h4>
            <p className="text-brand-mauve">{item.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};


// --- Composant Principal ---
const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="py-20 lg:py-32 px-4 bg-[#11011B]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-brand-mauve font-semibold tracking-wider mb-2">- PARCOURS -</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Mon Parcours Académique <span className="text-pink-400">&</span> Professionnel
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <JourneyColumn 
            title="Formation"
            icon={FaGraduationCap}
            items={educationData}
            animationDelay={0.2}
          />
          <JourneyColumn
            title="Expérience Professionnelle"
            icon={FaBriefcase}
            items={experienceData}
            animationDelay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default JourneySection;