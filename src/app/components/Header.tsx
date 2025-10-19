'use client';

// CORRECTION : useMemo est importé depuis React
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import LinkedInIcon from './icons/LinkedInIcon';
import GitHubIcon from './icons/GitHubIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('/#home');

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  // CORRECTION : Les tableaux sont mémorisés avec useMemo pour éviter leur re-création
  const navLinks = useMemo(() => [
    { href: '/#services', label: 'Services' },
    { href: '/#projects', label: 'Projets' },
    { href: '/#journey', label: 'Parcours' },
    { href: '/#contact', label: 'Contact' },
  ], []);

  const socialLinks = useMemo(() => [
    { href: 'https://www.linkedin.com/in/edo-yawo-sokpa-06617b333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', icon: <LinkedInIcon />, label: 'LinkedIn' },
    { href: 'https://github.com/yongvic', icon: <GitHubIcon />, label: 'GitHub' },
    { href: 'https://wa.me/22891480288', icon: <WhatsAppIcon />, label: 'WhatsApp' },
  ], []);
  
  // Le useEffect a maintenant une dépendance stable
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`/${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    navLinks.forEach((link) => {
      const sectionId = link.href.split('#')[1];
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navLinks]); // Cette dépendance ne change plus à chaque render


  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full text-gray-200 p-4 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'bg-[#1a0528]/80 backdrop-blur-lg border-b border-pink-500/20 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/#home" className="text-2xl font-bold text-white hover:text-pink-400 transition-colors z-50 shrink-0">
             Port<span className="text-pink-400">folio</span>
          </Link>
          
          <nav className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ul className="flex items-center gap-6 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`transition-colors text-sm font-medium ${
                    activeSection === link.href
                      ? 'text-pink-400'
                      : 'text-gray-200 hover:text-pink-400'
                  }`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
            
          <div className="hidden md:flex items-center gap-4">
            <AnimatePresence mode="wait">
              {isScrolled ? (
                <motion.a
                  key="cv-button"
                  href="/Cv-SOKPA-Edo-Yawo.pdf"
                  download
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors whitespace-nowrap"
                >
                  Télécharger CV
                </motion.a>
              ) : (
                <motion.div
                  key="social-icons"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4"
                >
                  {socialLinks.map(link => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="hover:text-pink-400 transition-colors">
                      {link.icon}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-50 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-12 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <nav onClick={(e) => e.stopPropagation()}>
              <ul className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * navLinks.indexOf(link) }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-2xl font-semibold hover:text-pink-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col items-center gap-8" onClick={(e) => e.stopPropagation()}>
              <a href="/Cv-SOKPA-Edo-Yawo.pdf" download
                 className="group flex items-center justify-center gap-3 bg-pink-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Télécharger mon CV</span>
                <FiDownload />
              </a>
              <div className="flex items-center gap-6">
                {socialLinks.map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="hover:text-pink-400 transition-colors transform hover:scale-110">
                    {React.cloneElement(link.icon, { className: 'w-6 h-6' })}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;