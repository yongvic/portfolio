// src/app/components/PortfolioSection.tsx
import React from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

interface PortfolioSectionProps {
  projects: Project[];
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ projects }) => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-light-text">
          <span className="text-brand-pink">Mes</span> Projets
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;