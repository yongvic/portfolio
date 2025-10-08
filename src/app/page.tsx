
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import JourneySection from './components/JourneySection';
import ServicesSection from './components/ServicesSection';

// const projects = [
//   {
//     title: 'Portfolio V1',
//     description: 'Ma première itération de mon portfolio personnel, construit avec Next.js et Tailwind CSS.',
//     imageUrl: '/moi.png',
//     tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
//   },
//   {
//     title: 'Clone de Netflix',
//     description: 'Un clone de l\'interface de Netflix pour pratiquer l\'intégration d\'API et le state management.',
//     imageUrl: '/moi.png',
//     tags: ['React', 'API REST', 'Styled Components', 'JavaScript'],
//   },
//   {
//     title: 'Application Météo',
//     description: 'Une application simple qui affiche la météo en temps réel pour une ville donnée.',
//     imageUrl: '/moi.png',
//     tags: ['JavaScript', 'HTML', 'CSS', 'API'],
//   },
//   {
//     title: 'E-commerce de Sneakers',
//     description: 'Une plateforme de vente en ligne de sneakers avec un panier et un système de paiement.',
//     imageUrl: '/moi.png',
//     tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
//   },
//   {
//     title: 'Blog Personnel',
//     description: 'Un blog simple avec un back-office pour gérer les articles, construit avec le TALL stack.',
//     imageUrl: '/moi.png',
//     tags: ['Tailwind CSS', 'Alpine.js', 'Laravel', 'Livewire'],
//   },
//   {
//     title: 'Outil de productivité',
//     description: 'Une application de type "to-do list" avec des fonctionnalités de gestion de projet.',
//     imageUrl: '/moi.png',
//     tags: ['Vue.js', 'Firebase', 'Vuetify'],
//   },
// ];

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <JourneySection/>
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
