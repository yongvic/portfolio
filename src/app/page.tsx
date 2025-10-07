import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-center md:text-left animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-light-text">
              DEVELOPPEUR <br />
              <span className="text-brand-pink">CREATIF</span> & PASSIONE
            </h1>
            <p className="text-lg md:text-xl mb-8 text-light-text-secondary max-w-lg mx-auto md:mx-0">
              Étudiant en cybersécurité et passionné par le développement web. 
              Je transforme des idées complexes en applications web modernes, sécurisées et esthétiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/projects">
                <button className="group bg-gradient-to-r from-brand-mauve to-brand-pink hover:shadow-lg hover:shadow-brand-pink/30 transform transition-all duration-300 text-white font-bold py-4 px-8 rounded-full w-full sm:w-auto flex items-center justify-center gap-2">
                  <span>Voir mes projets</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex justify-center items-center animate-fade-in-up [animation-delay:300ms]">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Animated Circles */}
              <div className="absolute inset-0 bg-brand-pink/30 rounded-full animate-pulse-glow"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-mauve to-brand-pink rounded-full animate-float"></div>
              <div
                className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] border-4 border-brand-pink/50 rounded-full"
                style={{ animation: 'spin 20s linear infinite' }}
              ></div>
               <div
                className="absolute w-[150%] h-[150%] -left-[25%] -top-[25%] border-2 border-accent-violet/30 rounded-full"
                style={{ animation: 'spin 30s linear infinite reverse' }}
              ></div>

              {/* Image */}
              <div className="absolute inset-0 p-2">
                <Image
                  src="/moi.png"
                  alt="SOKPA Edo Yawo"
                  width={384}
                  height={384}
                  className="rounded-full object-cover w-full h-full shadow-2xl shadow-brand-purple-dark"
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