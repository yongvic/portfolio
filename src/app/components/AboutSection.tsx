'use client';

import React from 'react';
import Image from 'next/image';
// CORRECTION : Importer le type 'Variants' en plus de 'motion'
import { motion, Variants } from 'framer-motion'; 
import { FiDownload } from 'react-icons/fi';

// --- Interfaces & Données ---
interface SkillPillProps {
  skill: string;
  position: string;
  delay: string;
}

interface SkillBarProps {
  skill: string;
  level: number;
  delay: string;
}

const skillsOnImage = [
  { name: 'React', position: 'top-[20%] left-[5%]', delay: 'delay-300' },
  { name: 'Next.js', position: 'top-[40%] right-[0%]', delay: 'delay-500' },
  { name: 'TypeScript', position: 'top-[60%] left-[0%]', delay: 'delay-700' },
  { name: 'Node.js', position: 'bottom-[10%] right-[10%]', delay: 'delay-900' },
];

const skillsWithLevels = [
  { name: 'Développement Front-End', level: 70, delay: 'delay-300' },
  { name: 'Automatisation N8N', level: 50, delay: 'delay-500' },
  { name: 'Créativité & Résolution de problèmes', level: 75, delay: 'delay-700' },
  { name: 'UI/UX Design', level: 85, delay: 'delay-900' },
];

// --- Sous-composants ---

const SkillPill: React.FC<SkillPillProps> = ({ skill, position, delay }) => (
  <div className={`absolute ${position} ${delay} animate-fade-in-up`}>
    <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg transition-transform hover:scale-110 cursor-pointer">
      {skill}
    </span>
  </div>
);

const SkillBar: React.FC<SkillBarProps> = ({ skill, level, delay }) => {
  // CORRECTION : On type explicitement notre constante avec 'Variants'
  const barVariants: Variants = {
    hidden: { width: '0%' },
    visible: {
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className={`w-full animate-fade-in-up ${delay}`}>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-brand-mauve">{skill}</span>
        <span className="text-sm font-medium text-brand-mauve">{level}%</span>
      </div>
      <div className="w-full bg-brand-purple-dark rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full"
          variants={barVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        ></motion.div>
      </div>
    </div>
  );
};


// --- Composant Principal ---

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 lg:py-32 px-4 overflow-hidden">
        {/* Formes décoratives en fond */}
        <div className="absolute top-10 left-5 w-8 h-8 bg-pink-500 rounded-full opacity-20 animate-drift animation-delay-300"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 border-2 border-teal-400 rounded-full opacity-20 animate-drift animation-delay-500"></div>
        <div className="absolute bottom-20 left-1/4 w-6 h-6 opacity-30 animate-drift">
            <svg viewBox="0 0 100 100" className="fill-current text-orange-400">
                <polygon points="50,0 100,100 0,100"/>
            </svg>
        </div>
      
      <div className="container mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Colonne de Gauche (Image) */}
          <div className="relative flex justify-center items-center animate-fade-in-up">
            <div className="absolute w-[90%] h-[90%] bg-orange-400 rounded-full filter blur-xl opacity-30"></div>
            <div className="relative w-full max-w-md aspect-square p-4">
              <div className="absolute inset-0 border-4 border-pink-500/50 rounded-full animate-pulse-glow"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/avatar.jpg"
                  alt="SOKPA Edo Yawo"
                  layout="fill"
                  objectFit="cover"
                  className="scale-105"
                />
              </div>
              {skillsOnImage.map(pill => (
                <SkillPill key={pill.name} skill={pill.name} position={pill.position} delay={pill.delay} />
              ))}
            </div>
          </div>
          
          {/* Colonne de Droite (Texte) */}
          <div className="animate-fade-in-up delay-200">
            <h2 className="text-4xl font-bold mb-2 text-white">À Propos de Moi</h2>
            <p className="font-semibold text-pink-400 mb-6 text-lg">
              Créateur d&apos;expériences web sécurisées et mémorables
            </p>
            <p className="mb-8 text-brand-mauve leading-relaxed">
              Bonjour ! Étudiant en cybersécurité et développeur passionné, je me spécialise dans la création d&apos;applications web modernes et réactives. J&apos;aime transformer des idées complexes en solutions simples, intuitives et surtout, sécurisées. Mon objectif est de toujours livrer des produits performants et esthétiques.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {skillsWithLevels.map(skill => (
                <SkillBar key={skill.name} skill={skill.name} level={skill.level} delay={skill.delay} />
              ))}
            </div>

            <a href="/Cv-SOKPA-Edo-Yawo.pdf" download>
              <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-lg shadow-pink-500/30 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                <span>Télécharger mon CV</span>
                <FiDownload className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;