// src/app/components/ContactSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { FiMail, FiSend, FiUser } from 'react-icons/fi';
import { statsData } from '../data/statsData';
import Counter from './Counter';

// --- Composant Principal ---
const ContactSection: React.FC = () => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/moi-contact.png" // Utilisez une image de vous sur fond transparent !
          alt="Votre portrait"
          layout="fill"
          objectFit="contain"
          objectPosition="center bottom"
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11011B] via-transparent to-[#11011B]"></div>
      </div>

      <div className="container mx-auto max-w-2xl z-30 text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Contactez-moi</h2>
        <p className="text-lg mb-8 text-gray-300">
          N&apos;hésitez pas à me contacter pour toute question ou opportunité.
        </p>
      </div>
      {/* Carte en verre */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 w-full max-w-5xl h-auto bg-black/20 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-pink-500/20"
      >
        {/* Lueur de la bordure */}
        <div className="absolute -inset-px rounded-3xl border border-pink-500/30 shadow-lg shadow-pink-500/10 pointer-events-none"></div>

        {/* Header de la carte avec icônes (optionnel) */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
            <div className="p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-colors"><FiUser className="text-white"/></div>
            <div className="p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-colors"><FiMail className="text-white"/></div>
        </motion.div>

        {/* Formulaire */}
        <motion.div variants={itemVariants}>
          <form
            action="mailto:edoyawosokpa@gmail.com"
            method="post"
            encType="text/plain"
            className="w-full max-w-lg mx-auto flex flex-col gap-4"
          >
            <input 
              type="text" 
              name="name" 
              placeholder="Votre nom" 
              required
              className="w-full bg-black/30 text-white placeholder-gray-400 px-5 py-3 rounded-full border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Votre email" 
              required
              className="w-full bg-black/30 text-white placeholder-gray-400 px-5 py-3 rounded-full border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
            />
            <textarea
              name="message"
              placeholder="Votre message..."
              rows={4}
              required
              className="w-full bg-black/30 text-white placeholder-gray-400 px-5 py-3 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
            ></textarea>
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/20"
            >
              Envoyer le Message <FiSend className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>

        {/* Séparateur et Statistiques */}
        <motion.div variants={itemVariants} className="mt-10 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {statsData.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-5xl font-bold text-white tracking-tighter">
                  <Counter to={stat.value} />
                </p>
                <p className="text-sm uppercase tracking-widest text-brand-mauve mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default ContactSection;