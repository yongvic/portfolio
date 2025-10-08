// src/app/components/ServicesSection.tsx
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { servicesData, Service } from '../data/servicesData';

// --- Sous-composant : Carte de Service ---
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-brand-purple-dark p-6 rounded-2xl overflow-hidden
                 border border-transparent hover:border-pink-500/50 transition-colors duration-300"
    >
      {/* Lueur de survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      {/* Accent sur le côté */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-pink-500 to-purple-500 
                 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
      
      <div className="relative z-10">
        <div className="mb-4 inline-block p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
          <service.icon className="w-6 h-6 text-pink-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-brand-mauve text-sm mb-4">{service.description}</p>
        <div className="flex items-center text-pink-400 font-semibold text-sm cursor-pointer">
          <span>En savoir plus</span>
          <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};


// --- Composant Principal ---
const ServicesSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Délai entre l'apparition de chaque carte
      },
    },
  };

  return (
    <section id="services" className="py-20 lg:py-32 px-4 bg-[#11011B]">
      <div className="container mx-auto">
        {/* Titre */}
        <div className="relative text-center mb-16">
          <h2 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-7xl md:text-9xl font-extrabold text-white/5 tracking-widest uppercase pointer-events-none">
            SERVICES
          </h2>
          <div className="relative z-10">
            <p className="text-sm text-pink-400 font-semibold tracking-wider mb-2">MES SPÉCIALISATIONS</p>
            <h3 className="text-4xl md:text-5xl font-bold text-white">
              Services que je Propose
            </h3>
          </div>
        </div>
        
        {/* Grille de Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;