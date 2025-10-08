import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { 
  FaFigma, 
  FaDocker, 
  FaNodeJs, 
  FaJsSquare 
} from 'react-icons/fa';
import { SiAdobephotoshop, SiN8N } from 'react-icons/si';
import { IconType } from 'react-icons'; // Import du type pour les icônes

// --- Définition des types TypeScript ---

// Interface pour les props du composant TechIcon
interface TechIconProps {
  icon: IconType;
  position: React.CSSProperties; // Utilisation du type CSSProperties de React pour le style
  animationDelay: string;
}

// Interface pour la structure d'un objet dans notre tableau de technologies
interface Technology {
  icon: IconType;
  position: React.CSSProperties;
  delay: string;
}

// --- Composants ---

// Composant pour les icônes de technologie, maintenant typé avec TechIconProps
const TechIcon: React.FC<TechIconProps> = ({ icon: Icon, position, animationDelay }) => (
  <div 
    className="absolute rounded-full bg-white/10 p-3 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-110"
    style={{ ...position, animation: `float 6s ease-in-out infinite`, animationDelay }}
  >
    <Icon className="w-6 h-6 md:w-8 md:h-8 text-pink-400" />
  </div>
);


const HeroSection: React.FC = () => {
  // Le tableau est maintenant typé avec notre interface Technology
  const technologies: Technology[] = [
    { icon: FaFigma, position: { top: '0%', left: '30%' }, delay: '0s' },
    { icon: SiN8N, position: { top: '25%', right: '-5%' }, delay: '1s' },
    { icon: SiAdobephotoshop, position: { top: '65%', right: '0%' }, delay: '2s' },
    { icon: FaDocker, position: { bottom: '-5%', left: '40%' }, delay: '3s' },
    { icon: FaNodeJs, position: { top: '70%', left: '-10%' }, delay: '1.5s' },
    { icon: FaJsSquare, position: { top: '20%', left: '-5%' }, delay: '2.5s' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0528] via-[#2c0a3e] to-[#1a0528] text-white p-4">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-400/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse [animation-delay:2s]"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-400/20 rounded-full filter blur-3xl opacity-50 animate-pulse [animation-delay:4s]"></div>

      <div className="container mx-auto z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* --- Colonne de Gauche --- */}
          <div className="text-center md:text-left">
            <h2 
              className="text-lg font-medium text-gray-300 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Hey, je suis SOKPA Edo Yawo
            </h2>
            <h1 
              className="text-5xl md:text-7xl font-extrabold my-4 leading-tight animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              Designer UX/UI Développeur  <span className="text-pink-400">Créatif</span>
            </h1>
            <p 
              className="text-md md:text-lg mb-8 text-gray-400 max-w-lg mx-auto md:mx-0 animate-fade-in-up"
              style={{ animationDelay: '500ms' }}
            >
              Étudiant en cybersécurité et passionné par le développement. Je transforme des idées complexes en applications web modernes, sécurisées et esthétiques.
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12 animate-fade-in-up"
              style={{ animationDelay: '700ms' }}
            >
              <Link href="/#projects">
                <button className="group flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-500/30 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <span>Mes Projets</span>
                  <FiArrowRight className="transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </Link>
              <Link href="/#contact">
                 <button className="group flex items-center justify-center gap-2 bg-transparent border-2 border-gray-500 hover:border-pink-400 hover:text-pink-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <span>Me Contacter</span>
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
            
            <div 
              className="flex items-center justify-center md:justify-start gap-6 animate-fade-in-up"
              style={{ animationDelay: '900ms' }}
            >
              <span className="text-gray-500 font-semibold">Stack:</span>
              <p className="text-gray-300">FIGMA</p>
              <p className="text-gray-300">N8N</p>
              <p className="text-gray-300">PHOTOSHOP</p>
              <p className="text-gray-300">DOCKER</p>
              <p className="text-gray-300">NODEJS</p>
            </div>
          </div>

          {/* --- Colonne de Droite --- */}
          <div 
            className="relative flex justify-center items-center animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
              {/* Orbites animées */}
              <div className="absolute inset-0 border-2 border-pink-500/30 rounded-full animate-slow-spin"></div>
              <div className="absolute inset-8 border-2 border-teal-400/30 rounded-full animate-slow-spin-reverse"></div>
              
              {/* Icônes de technologie */}
              {technologies.map((tech, index) => (
                <TechIcon key={index} icon={tech.icon} position={tech.position} animationDelay={tech.delay} />
              ))}
              
              {/* Image principale */}
              <div className="absolute inset-12 md:inset-20 animate-float">
                <Image
                  src="/moi.png"
                  alt="SOKPA Edo Yawo"
                  width={350}
                  height={350}
                  className="rounded-full object-cover w-full h-full shadow-2xl shadow-black/50"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;