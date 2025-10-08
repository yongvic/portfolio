// src/app/components/Header.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import LinkedInIcon from './icons/LinkedInIcon';
import GitHubIcon from './icons/GitHubIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Gère l'effet de fond au défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Empêche le défilement de la page lorsque le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#projects', label: 'Projets' },
    { href: '/#journey', label: 'Parcours' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full text-gray-200 p-4 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'bg-[#1a0528]/80 backdrop-blur-lg border-b border-pink-500/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/#home" className="text-2xl font-bold text-white hover:text-pink-400 transition-colors z-50">
             Port<span className="text-pink-400">folio</span>
          </Link>
          
          {/* Menu de navigation centré pour Desktop */}
          <nav className="hidden md:block">
            <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <ul className="flex items-center space-x-8">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="hover:text-pink-400 transition-colors text-sm font-medium">
                            {link.label}
                        </Link>
                    </li>
                ))}
                </ul>
            </div>
          </nav>
          
          {/* Icônes sociales et bouton de menu mobile */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
                <a href="https://www.linkedin.com/in/edo-yawo-sokpa-06617b333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                <LinkedInIcon />
                </a>
                <a href="https://github.com/yongvic" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                <GitHubIcon />
                </a>
                <a href="https://wa.me/22891480288" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                <WhatsAppIcon />
                </a>
            </div>
            {/* Bouton Hamburger pour mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-50 text-white p-2 rounded-md focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay pour Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 flex items-center justify-center md:hidden"
          >
            <nav>
              <ul className="flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-2xl font-semibold hover:text-pink-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)} // Ferme le menu au clic
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;