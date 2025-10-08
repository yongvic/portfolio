
import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-[#1a0528]">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Contactez-moi</h2>
        <p className="text-lg mb-8 text-gray-300">
          N&apos;hésitez pas à me contacter pour toute question ou opportunité.
        </p>
        <form
          action="mailto:edoyawosokpa@gmail.com"
          method="post"
          encType="text/plain"
          className="bg-[#2c0a3e]/60 p-8 rounded-2xl shadow-lg text-left border border-pink-500/20"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 font-bold mb-2">Nom</label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 bg-[#1a0528] border border-pink-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 bg-[#1a0528] border border-pink-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-300 font-bold mb-2">Message</label>
            <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 bg-[#1a0528] border border-pink-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" required></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-pink-500 text-white font-bold py-3 px-6 rounded-full hover:bg-pink-600 transition duration-300 shadow-lg shadow-pink-500/20">
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
