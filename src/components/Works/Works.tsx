"use client"
import React, { useEffect, useRef } from 'react'
import './Works.css'
import gsap from 'gsap'
import ParallaxImage from './ParallaxImage'
import { TransitionLink } from '../TransitionLink/TransitionLink'
import { projectCaseStudies, staticProjects, type UiProject } from '@/lib/content'
import { TechLogos } from '../techlogo/TechLogos'

type WorksProps = {
  projects?: UiProject[];
};

const Works = ({ projects = staticProjects }: WorksProps) => {
  const linkRefs = useRef<Array<HTMLDivElement | null>>([])

  // Animation GSAP pour les boutons
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

      const handleMouseEnter = () => {
        hoverTL.restart()
      }

      const handleMouseLeave = () => {
        hoverTL.reverse()
      }

      linkElement.addEventListener("mouseenter", handleMouseEnter)
      linkElement.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        linkElement.removeEventListener("mouseenter", handleMouseEnter)
        linkElement.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    const cleanups = linkRefs.current.map((ref) => setupButtonAnimation(ref))

    return () => {
      cleanups.forEach((cleanup) => cleanup?.())
    }
  }, [])

  return (
      <div className='works'>
        <h1 id='projets' >Projets</h1>
        <div className="container-works">
          {projects.map((project, index) => {
            const caseStudy = projectCaseStudies[project.slug];
            const images = caseStudy?.images ?? {
              hero: project.coverImage,
              desktop: project.coverImage,
              mobile: project.coverImage,
              details: [project.coverImage],
            };
            const isEven = index % 2 === 0;

            const leftBlock = (
              <div className="works1-left">
                <div className="img-left">
                  <ParallaxImage
                    src={images.desktop}
                    alt={project.title}
                    speed={0.2}
                  />
                </div>

                <div className="work-desc">
                  <p className='work-title-block'>
                    <span
                      className='work-title'
                      style={{
                        color: caseStudy?.accent ?? "var(--accent1)",
                        fontFamily: caseStudy?.fontFamily ?? "var(--font-clash-display)",
                      }}
                    >
                      {project.title}
                    </span>
                    <span className='opa_desc'>{project.excerpt}</span>
                  </p>
                  <TransitionLink href={`/works/${project.slug}`}>
                    <div className="link" ref={(el) => { linkRefs.current[index] = el; }}>
                      <div className="pink1"></div>
                      <span className="learn-more">voir le projet</span>
                      <span className='button-arrow'>
                        <TechLogos.Arrowright />
                      </span>
                    </div>
                  </TransitionLink>
                </div>
              </div>
            );

            const rightBlock = (
              <div className="works1-right">
                <ParallaxImage
                  src={images.mobile}
                  alt={project.title}
                  speed={0.2}
                />
              </div>
            );

            return (
              <div className="works1" key={project.id}>
                {isEven ? (
                  <>
                    {leftBlock}
                    {rightBlock}
                  </>
                ) : (
                  <>
                    {rightBlock}
                    {leftBlock}
                  </>
                )}
              </div>
            );
          })}

        </div>
      </div>
  )
}

export default Works
