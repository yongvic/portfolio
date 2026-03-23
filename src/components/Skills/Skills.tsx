import React, { useRef, useEffect } from 'react'
import './Skills.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/lib/content'
gsap.registerPlugin(ScrollTrigger)

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
  if (!skillsRef.current) return

  const ctx = gsap.context(() => {
    const skills = skillsRef.current!

    const categoryEls = Array.from(
      skills.querySelectorAll<HTMLDivElement>('.skill-category')
    )
    const tagEls = Array.from(
      skills.querySelectorAll<HTMLDivElement>('.skill-tag')
    )

    // Normaliser les data-category
    categoryEls.forEach(el => {
      if (el.dataset.category) el.dataset.category = el.dataset.category.toLowerCase()
    })
    tagEls.forEach(el => {
      if (el.dataset.category) el.dataset.category = el.dataset.category.toLowerCase()
    })

    const categories = categoryEls.map(el => el.dataset.category || '')
    const stepDuration = 0.55

    // Activation visuelle
    const activate = (cat: string) => {
      categoryEls.forEach(el => {
        const isActive = el.dataset.category === cat
        gsap.to(el, {
          opacity: isActive ? 1 : 0.4,
          duration: 0.4,
          ease: 'power2.out'
        })
      })

      tagEls.forEach(el => {
        const isActive = el.dataset.category === cat
        gsap.to(el, {
          opacity: isActive ? 1 : 0.4,
          borderColor: `rgba(225,255,1,${isActive ? 1 : 0.6})`,
          duration: 0.4,
          ease: 'power2.out'
        })
      })
    }

    // État initial déterministe
    gsap.set(categoryEls, { opacity: 0.4 })
    gsap.set(tagEls, {
      opacity: 0.4,
      borderColor: 'rgba(225,255,1,0.6)'
    })

    if (categories.length > 0) {
      activate(categories[0])
    }

    // Timeline scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skills,
        start: 'top 8%',
        end: `+=${categories.length * stepDuration * 100}%`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      }
    })

    categories.forEach(cat => {
      tl.to({}, { duration: stepDuration }).call(() => activate(cat))
    })

    // Hover tags
    const enterHandlers = new Map<Element, EventListener>()
    const leaveHandlers = new Map<Element, EventListener>()

    tagEls.forEach(tag => {
      const span = tag.querySelector('span')

      const handleEnter = () => {
        const opacity = parseFloat(getComputedStyle(tag).opacity)
        const border = `rgba(225,255,1,${opacity})`

        gsap.killTweensOf([tag, span])

        gsap.to(tag, {
          scale: 1.08,
          borderColor: border,
          backgroundColor: 'rgba(255,255,255,0.05)',
          duration: 0.25,
          ease: 'back.out(1.5)'
        })

        if (span) {
          gsap.to(span, {
            y: -2,
            duration: 0.25,
            ease: 'back.out(1.5)'
          })
        }
      }

      const handleLeave = () => {
        const opacity = parseFloat(getComputedStyle(tag).opacity)
        const border = `rgba(225,255,1,${opacity})`

        gsap.to(tag, {
          scale: 1,
          borderColor: border,
          backgroundColor: 'transparent',
          duration: 0.25,
          ease: 'power2.out'
        })

        if (span) {
          gsap.to(span, {
            y: 0,
            duration: 0.25,
            ease: 'power2.out'
          })
        }
      }

      tag.addEventListener('mouseenter', handleEnter)
      tag.addEventListener('mouseleave', handleLeave)

      enterHandlers.set(tag, handleEnter)
      leaveHandlers.set(tag, handleLeave)
    })
  }, skillsRef)

  return () => {
    ctx.revert()
  }
}, [])


  const safeTags = (tags: Array<string | undefined>) =>
    tags.filter((tag): tag is string => Boolean(tag));

  const groupedSkills = [
    {
      category: "Design",
      tags: safeTags(["Figma / systèmes UI", "Design graphique", services[0]?.title, services[1]?.title]),
    },
    {
      category: "Développement",
      tags: safeTags(["Next.js / React", "TypeScript", services[2]?.title]),
    },
    {
      category: "Automatisation",
      tags: safeTags(["Automatisation n8n", services[3]?.title]),
    },
    {
      category: "Sécurité",
      tags: ["Cybersécurité (fondamentaux)", "Bonnes pratiques sécurité"],
    },
  ];

  return (
    <div className='skills' id='competences' ref={skillsRef}>
      <h1>Compétences</h1>
      <div className="skills-container">
      <div className="skill-left">
        {groupedSkills.map((group) => (
          <div key={group.category} className="skill-category" data-category={group.category} translate="no">
            <p>{group.category}</p>
          </div>
        ))}
      </div>

      <div className="skills-right">
        <div className="tech-list" translate="no">
          {groupedSkills.flatMap((group) =>
            group.tags.map((tag) => (
              <div key={`${group.category}-${tag}`} className="skill-tag" data-category={group.category}>
                <span>{tag}</span>
              </div>
            ))
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Skills
