// src/app/about/page.tsx
import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-stone-100 py-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/moi.png"
                alt="Votre Nom"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">À propos de moi</h1>
            <p className="text-lg mb-6">
              Bonjour ! Je suis un développeur web passionné avec une expertise dans la création de sites web modernes et réactifs. J`&apos;` aime transformer des idées complexes en applications simples et intuitives. Mon objectif est de toujours créer des produits performants et esthétiques.
            </p>
            <h2 className="text-2xl font-bold mb-4">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-sky-blue text-white px-3 py-1 rounded-full text-sm">React</span>
              <span className="bg-sky-blue text-white px-3 py-1 rounded-full text-sm">Next.js</span>
              <span className="bg-sky-blue text-white px-3 py-1 rounded-full text-sm">TypeScript</span>
              <span className="bg-sky-blue text-white px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
              <span className="bg-sky-blue text-white px-3 py-1 rounded-full text-sm">Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
