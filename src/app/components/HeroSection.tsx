// src/app/components/HeroSection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion'; // NOUVEAU: Import de Framer Motion
import { FiArrowRight } from 'react-icons/fi';
import { 
  FaFigma, 
  FaDocker, 
  FaNodeJs,
} from 'react-icons/fa6'; 
import { FaJsSquare } from "react-icons/fa";
// Correction: Utilisation de fa6
import { SiAdobephotoshop, SiN8N } from 'react-icons/si';
import { IconType } from 'react-icons';

// --- Interfaces (modifiées pour plus de flexibilité) ---
interface TechIconProps {
  icon: IconType;
  position: string; // CORRECTION: On passe des classes Tailwind plutôt qu'un objet de style
  delay: string;
}

interface Technology {
  icon: IconType;
  position: string;
  delay: string;
}

// --- Sous-composant TechIcon (simplifié) ---
const TechIcon: React.FC<TechIconProps> = ({ icon: Icon, position, delay }) => (
  <div 
    className={`absolute rounded-full bg-white/10 p-2 md:p-3 backdrop-blur-sm shadow-lg 
                transition-transform duration-300 hover:scale-110 
                animate-float ${position} ${delay}`}
  >
    <Icon className="w-5 h-5 md:w-8 md:h-8 text-pink-400" />
  </div>
);


// --- Composant Principal ---
const HeroSection: React.FC = () => {
  // CORRECTION: Utilisation de classes Tailwind pour la position et les délais
  const technologies: Technology[] = [
    { icon: FaFigma, position: 'top-[10%] left-[20%]', delay: '[animation-delay:0s]' },
    { icon: SiN8N, position: 'top-[30%] right-[-5%]', delay: '[animation-delay:1s]' },
    { icon: SiAdobephotoshop, position: 'top-[65%] right-[0%]', delay: '[animation-delay:2s]' },
    { icon: FaDocker, position: 'bottom-[5%] left-[40%]', delay: '[animation-delay:3s]' },
    { icon: FaNodeJs, position: 'top-[70%] left-[-10%]', delay: '[animation-delay:1.5s]' },
    { icon: FaJsSquare, position: 'top-[20%] left-[-5%]', delay: '[animation-delay:2.5s]' },
  ];
  
  // NOUVEAU: Variantes d'animation pour Framer Motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Délai entre l'animation des enfants
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0528] via-[#2c0a3e] to-[#1a0528] text-white p-4 sm:p-8">
      {/* Orbes de fond */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-400/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-400/20 rounded-full filter blur-3xl opacity-50 animate-pulse [animation-delay:4s]"></div>

      <div className="container mx-auto z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* --- Colonne de Gauche (animée) --- */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <motion.h2 variants={itemVariants} className="text-lg font-medium text-brand-mauve">
              Hey, je suis SOKPA Edo Yawo
            </motion.h2>
            
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold my-4 leading-tight">
              Designer & Développeur <span className="text-pink-400">Créatif</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-md md:text-lg mb-8 text-brand-mauve max-w-lg mx-auto md:mx-0">
              Étudiant en cybersécurité, je transforme des idées complexes en applications web modernes, sécurisées et esthétiques.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
              <Link href="/#projects">
                <button className="group flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-500/30 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <span>Mes Projets</span>
                  <FiArrowRight className="transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </Link>
              <Link href="/#contact">
                 <button className="group flex items-center justify-center gap-2 bg-transparent border-2 border-brand-purple hover:border-pink-400 hover:text-pink-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <span>Me Contacter</span>
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
              <span className="text-brand-purple-light font-semibold">Stack:</span>
              <p className="text-brand-mauve">FIGMA</p>
              <p className="text-brand-mauve">N8N</p>
              <p className="text-brand-mauve">PHOTOSHOP</p>
              <p className="text-brand-mauve">DOCKER</p>
              <p className="text-brand-mauve">NODEJS</p>
            </motion.div>
          </motion.div>

          {/* --- Colonne de Droite (animée) --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="relative hidden md:flex justify-center items-center"
          >
            {/* CORRECTION: Tailles responsives pour l'image et les orbites */}
            <div className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 border-2 border-pink-500/30 rounded-full animate-slow-spin"></div>
              <div className="absolute inset-8 border-2 border-teal-400/30 rounded-full animate-slow-spin-reverse"></div>
              
              {technologies.map((tech) => (
                <TechIcon key={tech.delay} {...tech} />
              ))}
              
              <div className="absolute inset-12 lg:inset-20 animate-float">
                <Image
                  src="/img.jpg"
                  alt="SOKPA Edo Yawo"
                  width={350}
                  height={350}
                  className="rounded-full object-cover w-full h-full shadow-2xl shadow-black/50"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;