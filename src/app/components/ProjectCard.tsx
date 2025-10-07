// src/app/components/ProjectCard.tsx
import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, tags }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-brand-purple-dark/50 p-1 shadow-lg hover:shadow-brand-pink/20 transition-all duration-300">
      <div className="absolute -inset-0 bg-gradient-to-r from-brand-mauve to-brand-pink rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
      <div className="relative rounded-xl overflow-hidden h-full bg-brand-purple-dark">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-light-text mb-2">{title}</h3>
          <p className="text-light-text-secondary mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="bg-brand-purple-light text-brand-pink text-xs font-semibold px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <a href="#" className="inline-flex items-center text-brand-pink group-hover:text-light-text font-semibold transition-colors">
            Voir le projet
            <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
