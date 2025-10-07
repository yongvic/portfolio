// src/app/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import LinkedInIcon from './icons/LinkedInIcon';
import GitHubIcon from './icons/GitHubIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Footer = () => {
  return (
    <footer className="bg-brand-purple-dark/30 border-t border-brand-mauve/20 text-light-text-secondary py-8">
      <div className="container mx-auto text-center">
        <p className="text-2xl font-bold text-light-text mb-4">SOKPA Edo Yawo</p>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.linkedin.com/in/edo-yawo-sokpa-06617b333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/yongvic" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">
            <GitHubIcon />
          </a>
          <a href="https://wa.me/22891480288" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">
            <WhatsAppIcon />
          </a>
        </div>
        <div className="flex justify-center space-x-6 mb-6 text-sm">
          <Link href="/projects" className="hover:text-brand-pink transition-colors">Projets</Link>
          <Link href="/services" className="hover:text-brand-pink transition-colors">Services</Link>
          <Link href="/about" className="hover:text-brand-pink transition-colors">À propos</Link>
          <Link href="/contact" className="hover:text-brand-pink transition-colors">Contact</Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} SOKPA Edo Yawo. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
