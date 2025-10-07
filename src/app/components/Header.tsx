'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LinkedInIcon from './icons/LinkedInIcon';
import GitHubIcon from './icons/GitHubIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full text-light-text p-4 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-purple-dark/50 backdrop-blur-lg border-b border-brand-mauve/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-light-text hover:text-brand-pink transition-colors">
          SOKPA Edo Yawo
        </Link>
        <div className="flex items-center space-x-8">
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li><Link href="/projects" className="hover:text-brand-pink transition-colors">Projets</Link></li>
              <li><Link href="/services" className="hover:text-brand-pink transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-brand-pink transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-brand-pink transition-colors">Contact</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
