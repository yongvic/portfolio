// src/app/components/ProjectsSection.tsx

'use client'; // Ce composant est interactif

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, filters, Project } from '../data/projectsData'; // Assurez-vous que ce chemin d'importation est correct
import { FiArrowUpRight } from 'react-icons/fi';

// --- Sous-composant : Carte de Projet ---
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="group relative rounded-lg overflow-hidden shadow-lg bg-brand-purple-dark"
    >
      <Image
        src={project.image}
        alt={project.title}
        width={500}
        height={400}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Superposition au survol */}
      <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-brand-mauve mb-3">{project.description}</p>
        
        {/* Étiquettes de logiciels */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="bg-pink-500/30 text-pink-300 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="absolute top-4 right-4 text-white p-2 bg-white/10 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45"
            aria-label={`Voir le projet ${project.title}`}
          >
            <FiArrowUpRight size={20} />
          </a>
        )}
      </div>
    </motion.div>
  );
};


// --- Composant Principal ---
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tous') {
      return projectsData;
    }
    return projectsData.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-16 lg:py-32 px-4">
      <div className="container mx-auto">
        {/* Titre */}
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white relative inline-block">
                Mes Projets
                <span className="text-pink-400 text-5xl md:text-7xl absolute -top-3 -right-6 md:-top-4 md:-right-8">.</span>
            </h2>
            <p className="text-brand-mauve mt-4 max-w-xl mx-auto">Une sélection de mes travaux récents.</p>
        </div>
        
        {/* Filtres - Maintenant plus responsives */}
        <div className="flex justify-center flex-wrap gap-x-2 gap-y-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-3 sm:px-4 py-2 text-sm sm:text-md font-semibold transition-colors duration-300
                ${activeFilter === filter ? 'text-pink-400' : 'text-brand-mauve hover:text-white'}
              `}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-400"
                  layoutId="underline" // Animation magique !
                />
              )}
            </button>
          ))}
        </div>

        {/* Grille de Projets */}
        <motion.div
          layout // Permet d'animer les changements de position
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;