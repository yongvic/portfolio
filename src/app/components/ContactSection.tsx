'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { statsData } from '../data/statsData';
import Counter from './Counter';

const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const yourPhoneNumber = '22891480288';
    const messageLines = [
      '*Nouveau Contact depuis le Portfolio !* 👋',
      '',
      `*Nom* : ${name}`,
      `*Email* : ${email}`,
      '',
      '*Message* :',
      message
    ];
    const formattedMessage = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${yourPhoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
    
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.8, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.2,},
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen flex flex-col items-center justify-center py-16 md:py-20 px-4 overflow-hidden bg-[#11011B]"
    >
      <div className="absolute inset-0 z-0">
        <Image 
          src="/back_contact.png" 
          alt="Portrait pour la section contact" 
          layout="fill" 
          objectFit="cover"
          objectPosition="center bottom" 
          className="opacity-60"
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11011B] via-transparent to-[#11011B]"></div>
      </div>

      <div className="container mx-auto max-w-2xl z-10 text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Contactez-moi</h2>
        <p className="text-base sm:text-lg text-gray-300">N&apos;hésitez pas à me contacter pour toute question ou opportunité.</p>
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 w-[95%] max-w-5xl h-auto bg-black/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-pink-500/20"
      >
        <div className="absolute -inset-px rounded-3xl border border-pink-500/30 shadow-lg shadow-pink-500/10 pointer-events-none"></div>

        <motion.div variants={itemVariants}>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                name="name" 
                placeholder="Votre nom" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 text-white placeholder-gray-400 px-5 py-3 rounded-full border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Votre email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/30 text-white placeholder-gray-400 px-5 py-3 rounded-full border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
              />
            </div>
            <textarea
              name="message"
              placeholder="Votre message..."
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/30 text-white placeholder-gray-400 px-5 py-3 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
            ></textarea>
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/20"
            >
              Envoyer sur WhatsApp <FiSend className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>

        {/* --- SECTION DES STATISTIQUES CORRIGÉE --- */}
        <motion.div variants={itemVariants} className="mt-12 pt-10 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 text-center">
            {statsData.map((stat, index) => {
              // On récupère le composant icône depuis les données
              const Icon = stat.icon; 
              return (
                <div key={index} className="flex flex-col items-center">
                  {/* AJOUT : Affichage de l'icône */}
                  <div className="mb-4">
                    <Icon className="w-10 h-10 text-pink-400" />
                  </div>
                  
                  <p className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                    <Counter to={stat.value} />
                  </p>
                  <p className="text-sm uppercase tracking-widest text-brand-mauve mt-2">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default ContactSection;