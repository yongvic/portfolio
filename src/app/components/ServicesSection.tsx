
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

const ServicesSection = () => {
  return (
    <section id="services" className="bg-[#1a0528] py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Mes Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-[#2c0a3e]/60 p-8 rounded-2xl shadow-lg hover:shadow-pink-500/20 transform hover:-translate-y-2 transition-all duration-300 border border-pink-500/20">
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
