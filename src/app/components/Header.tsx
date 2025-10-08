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
      className={`fixed top-0 left-0 w-full text-gray-200 p-4 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1a0528]/80 backdrop-blur-lg border-b border-pink-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/#home" className="text-2xl font-bold text-white hover:text-pink-400 transition-colors">
           Port<span className="text-pink-400">folio</span>
        </Link>
        <div className="flex items-center space-x-8">
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li><Link href="/#projects" className="hover:text-pink-400 transition-colors">Projets</Link></li>
              <li><Link href="/#services" className="hover:text-pink-400 transition-colors">Services</Link></li>
              <li><Link href="/#about" className="hover:text-pink-400 transition-colors">À propos</Link></li>
              <li><Link href="/#contact" className="hover:text-pink-400 transition-colors">Contact</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
