import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./Services.css";
import { SvgService } from "./SvgService";
import { services } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  

  // Animation opacité / background
  // Background + opacité
  useEffect(() => {
    if (typeof window === 'undefined' || !serviceRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(serviceRef.current, {
        '--title-opacity': 1,
        scrollTrigger: {
          trigger: serviceRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      });
      ScrollTrigger.create({
        trigger: serviceRef.current,
        start: 'top 20%',
        onEnter: () => document.body.classList.add('works-active'),
        onLeaveBack: () => document.body.classList.remove('works-active'),
      });
    });
    return () => {
      ctx.revert();
      document.body.classList.remove('works-active');
    };
  }, []);

useEffect(() => {
  if (!sectionRef.current || !triggerRef.current || window.innerWidth < 1000) return;

  const ctx = gsap.context(() => {
    const cards = sectionRef.current!;
    const progress = progressBarRef.current!;

    // Petit offset pour laisser respirer la dernière card
    const getExtraOffset = () => window.innerWidth * 0.15; // 15vw

    const getScrollAmount = () => {
      return cards.scrollWidth - window.innerWidth + getExtraOffset();
    };

    gsap.to(cards, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 20%",
        end: () => `+=${getScrollAmount()}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.style.width = `${self.progress * 100}%`;
        },
      },
    });
  });

  return () => ctx.revert();
}, []);



  const baseFallbacks = [
    {
      title: "Direction artistique",
      description: "Définition d'une identité visuelle cohérente, raffinée et mémorable.",
    },
    {
      title: "UI/UX Design",
      description: "Parcours utilisateurs clairs, interfaces élégantes et interactions maîtrisées.",
    },
    {
      title: "Développement Next.js",
      description: "Intégration fullstack moderne, performante et maintenable.",
    },
    {
      title: "Automatisation & n8n",
      description: "Workflows intelligents pour accélérer la production et réduire la friction.",
    },
  ];

  const fallbackService = {
    title: "Optimisation des performances",
    description:
      "Optimisation du chargement, du rendu et de l'expérience globale pour livrer des interfaces rapides et stables.",
  };

  const serviceCards = [
    { ...(services[0] ?? baseFallbacks[0]), icon: SvgService.moderne, number: "01" },
    { ...(services[1] ?? baseFallbacks[1]), icon: SvgService.dev, number: "02" },
    { ...(services[2] ?? baseFallbacks[2]), icon: SvgService.secure, number: "03" },
    { ...(services[3] ?? baseFallbacks[3]), icon: SvgService.devops, number: "04" },
    { ...fallbackService, icon: SvgService.performance, number: "05" },
  ];

  return (
    <div className="services" ref={serviceRef}>
      <p className="services-desc">
        J&apos;accompagne les marques et produits avec une direction artistique forte,
        des interfaces premium et une exécution technique fiable.
      </p>

      <div ref={triggerRef} className="cards-pin">
        <div className="scroll-progress-container">
          <div className="scroll-progress-bar" ref={progressBarRef}></div>
        </div>

        <div ref={sectionRef} className="cards-container">
          {serviceCards.map((service, index) => (
            <div key={service.title} className={`card card${index + 1}`}>
              <div className="card-head">
                <div className="card-svg">{service.icon()}</div>
                <div className="card-number">{service.number}</div>
              </div>
              <div className="card-desc">
                <h2 className="card-title" translate="no">{service.title}</h2>
                <div className="card-body">
                  <hr />
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
