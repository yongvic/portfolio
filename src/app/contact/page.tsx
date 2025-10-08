// src/app/contact/page.tsx
import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-stone-100 py-20 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Contactez-moi</h1>
        <p className="text-lg mb-8">
          N&apos;hésitez pas à me contacter pour toute question ou opportunité.
        </p>
        <form
          action="mailto:edoyawosokpa@gmail.com"
          method="post"
          encType="text/plain"
          className="bg-white p-8 rounded-2xl shadow-lg text-left"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nom</label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border rounded-lg" required></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-sky-blue text-white font-bold py-2 px-4 rounded-full hover:bg-sky-blue-dark transition duration-300">
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
