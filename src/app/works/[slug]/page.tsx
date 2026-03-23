// app/works/[slug]/page.tsx
"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import './WorksDetails.css'
import ParallaxImage from '@/components/Works/ParallaxImage'
import { TransitionLink } from '@/components/TransitionLink/TransitionLink'
import Navbar from '@/components/Navbar/Navbar'
import { profile, projectCaseStudies, staticProjects } from '@/lib/content'
import { TechLogos } from '@/components/techlogo/TechLogos'

const WorkDetail = () => {
  const params = useParams()
  const slug = params?.slug as string
  const baseProject = staticProjects.find((project) => project.slug === slug)
  const caseStudy = projectCaseStudies[slug]
  const images = caseStudy?.images ?? {
    hero: baseProject?.coverImage ?? "/moi.png",
    desktop: baseProject?.coverImage ?? "/moi.png",
    mobile: baseProject?.coverImage ?? "/moi.png",
    details: [baseProject?.coverImage ?? "/moi.png"],
  }

  if (!baseProject) {
    return (
      <>
        <Navbar />
        <div className="work-not-found">
          <h1>Projet introuvable</h1>
          <TransitionLink href="/#projets">
            <span><TechLogos.Arrowleft /> </span>
            <span>Retour aux projets</span>
          </TransitionLink>
        </div>
      </>
    )
  }

  const work = {
    title: baseProject.title,
    subtitle: baseProject.excerpt,
    description: baseProject.description,
    year: caseStudy?.year ?? "2026",
    role: caseStudy?.role ?? profile.role,
    technologies: baseProject.technologies,
    images,
    link: baseProject.projectUrl ?? undefined,
    github: baseProject.repository ?? undefined,
    challenge:
      caseStudy?.challenge ??
      "Clarifier le positionnement du projet tout en gardant une expérience fluide et lisible.",
    solution:
      caseStudy?.solution ??
      "Structuration des contenus, hiérarchie visuelle forte et UI optimisée pour la performance.",
    results:
      caseStudy?.results ?? [
        "Parcours utilisateur plus direct.",
        "Identité visuelle cohérente et premium.",
        "Interface stable sur desktop et mobile.",
      ],
  }

  const titleFontFamily = caseStudy?.fontFamily ?? 'var(--font-clash-display)';
  const accentColor = caseStudy?.accent ?? '#D7FB61';

  return (
    <>
      {/* Ajouter la Navbar */}
      <Navbar />
      
      <div className="work-detail">
        {/* Hero Section */}
        <section className="hero-work-section">
          <div className="hero-work-content">
            <span className="work-year" style={{ color: accentColor }}>{work.year}</span>
                       <h1 
              className="work-title" 
              style={{ 
                fontFamily: titleFontFamily
              }}
            >
              {work.title}
            </h1>
            <p className="work-subtitle">{work.subtitle}</p>
            <div className="work-meta">
              <span>{work.role}</span>
            </div>
          </div>
          <div className="hero-work-image">
            <ParallaxImage 
              src={work.images.hero}
              alt={work.title}
              speed={0.3}
            />
          </div>
        </section>

        {/* Overview */}
        <section className="overview-section">
          <div className="section-content">
            <h2>Aperçu</h2>
            <p className="large-text">{work.description}</p>
            
            <div className="tech-stack">
              <h3>Technologies</h3>
              <div className="tech-tags">
                {work.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {(work.link || work.github) && (
              <div className="project-links">
                {work.link && (
                  <a href={work.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                     <span>Visiter le site</span> <span className='arrow-visite'> <TechLogos.Arrowright /> </span>
                  </a>
                )}
                {work.github && (
                  <a href={work.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    Voir le code
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="challenge-section">
          <div className="section-content">
            <div className="challenge-grid">
              <div className="challenge-item">
                <h3>Défi</h3>
                <p>{work.challenge}</p>
              </div>
              <div className="challenge-item">
                <h3>Solution</h3>
                <p>{work.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Showcase */}
        <section className="showcase-section">
          <div className="showcase-grid">
            <div className="showcase-item large">
              <ParallaxImage 
                src={work.images.desktop}
                alt={`${work.title} desktop`}
                speed={0.2}
              />
            </div>
            <div className="showcase-item">
              <ParallaxImage 
                src={work.images.mobile}
                alt={`${work.title} mobile`}
                speed={0.15}
              />
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="results-section">
          <div className="section-content">
            <h2>Résultats</h2>
            <div className="results-grid">
              {work.results.map((result, index) => (
                <div key={index} className="result-item">
                  <span className="result-number">{String(index + 1).padStart(2, '0')}</span>
                  <p>{result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="navigation-section">
          <TransitionLink href="/#projets" className="back-link">
            <span><TechLogos.Arrowleft /> </span> 
            <span>Retour aux projets</span>
          </TransitionLink>
        </section>
      </div>
    </>
  )
}

export default WorkDetail
