"use client"
import React, { useEffect, useRef } from 'react'
import './Works.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParallaxImage from './ParallaxImage'
import { TransitionLink } from '../TransitionLink/TransitionLink'
import { projectCaseStudies, staticProjects, type UiProject } from '@/lib/content'
import { TechLogos } from '../techlogo/TechLogos'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type WorksProps = {
  projects?: UiProject[];
};

const Works = ({ projects = staticProjects }: WorksProps) => {
  const linkRefs = useRef<Array<HTMLDivElement | null>>([])
  const projectRefs = useRef<Array<HTMLDivElement | null>>([])

  // Animation GSAP pour les boutons de lien
  useEffect(() => {
    const setupButtonAnimation = (linkElement: HTMLDivElement | null) => {
      if (!linkElement) return

      const pink = linkElement.querySelector(".pink1")
      if (!pink) return

      const hoverTL = gsap.timeline({ paused: true })

      hoverTL.to(pink, {
        width: "calc(100% + 1.3em)", 
        ease: "power2.out",
        duration: 0.4
      })

      hoverTL.to(pink, {
        width: "2em", 
        left: "calc(100% - 1.45em)",
        ease: "power3.inOut", 
        duration: 0.35
      })

      const handleMouseEnter = () => hoverTL.restart()
      const handleMouseLeave = () => hoverTL.reverse()

      linkElement.addEventListener("mouseenter", handleMouseEnter)
      linkElement.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        linkElement.removeEventListener("mouseenter", handleMouseEnter)
        linkElement.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    const cleanups = linkRefs.current.map((ref) => setupButtonAnimation(ref))
    return () => cleanups.forEach((cleanup) => cleanup?.())
  }, [])

  // Animation d'apparition au scroll pour l'effet Waouh premium
  useEffect(() => {
    projectRefs.current.forEach((el, index) => {
      if (!el) return;
      
      const imageWrapper = el.querySelector('.works-image-wrapper');
      const textWrapper = el.querySelector('.works-text');
      const isEven = index % 2 === 0;

      gsap.fromTo(imageWrapper, 
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(textWrapper,
        { opacity: 0, x: isEven ? -50 : 50 },
        {
          opacity: 1, x: 0,
          duration: 1,
          delay: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, []);

  return (
      <div className='works'>
        <div className="works-header">
           <h1 id='projets'>Selected Works</h1>
           <p className="works-subtitle">Création d&apos;expériences digitales, identités de marque et applications SaaS.</p>
        </div>
        
        <div className="container-works">
          {projects.map((project, index) => {
            const caseStudy = projectCaseStudies[project.slug];
            const images = caseStudy?.images ?? {
              hero: project.coverImage,
              desktop: project.coverImage,
            };
            const isEven = index % 2 === 0;

            const textBlock = (
              <div className="works-text">
                  <span className="work-number">{(index + 1).toString().padStart(2, '0')}/</span>
                  <h2
                    className='work-title'
                    style={{
                      color: caseStudy?.accent ?? "var(--accent1)",
                      fontFamily: caseStudy?.fontFamily ?? "var(--font-clash-display)",
                    }}
                  >
                    {project.title}
                  </h2>
                  <p className='work-excerpt'>{project.excerpt}</p>
                  
                  <div className="work-tech">
                    {project.technologies.slice(0, 4).map(tech => (
                       <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                    {project.technologies.length > 4 && <span className="tech-badge">+{project.technologies.length - 4}</span>}
                  </div>

                  <TransitionLink href={`/works/${project.slug}`}>
                    <div className="link" ref={(el) => { linkRefs.current[index] = el; }}>
                      <div className="pink1"></div>
                      <span className="learn-more">Découvrir le projet</span>
                      <span className='button-arrow'>
                        <TechLogos.Arrowright />
                      </span>
                    </div>
                  </TransitionLink>
              </div>
            );

            const imageBlock = (
              <div className="works-image-wrapper">
                <TransitionLink href={`/works/${project.slug}`} className="works-image-inner">
                  <ParallaxImage
                    src={images.hero}
                    alt={project.title}
                    speed={0.15}
                  />
                  <div className="image-overlay">
                    <span>Explorer</span>
                  </div>
                </TransitionLink>
              </div>
            );

            return (
              <div 
                className={`works-project ${isEven ? 'even' : 'odd'}`} 
                key={project.id}
                ref={(el) => { projectRefs.current[index] = el; }}
              >
                 {isEven ? <>{textBlock}{imageBlock}</> : <>{imageBlock}{textBlock}</>}
              </div>
            );
          })}
        </div>
      </div>
  )
}

export default Works
