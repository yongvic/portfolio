
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import JourneySection from './components/JourneySection';
import ServicesSection from './components/ServicesSection';

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
