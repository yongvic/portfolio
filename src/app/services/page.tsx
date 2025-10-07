// src/app/services/page.tsx
import React from 'react';

const services = [
  {
    title: 'Développement Web',
    description: 'Création de sites web modernes et réactifs avec les dernières technologies.',
  },
  {
    title: 'Développement Mobile',
    description: 'Développement d\'applications mobiles pour iOS et Android.',
  },
  {
    title: 'UI/UX Design',
    description: 'Conception d\'interfaces utilisateur intuitives et esthétiques.',
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-stone-100 py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Mes Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
