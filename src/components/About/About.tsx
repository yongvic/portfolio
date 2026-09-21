"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InversionLens from "./InversionLens/InversionLens";
import "./About.css";
import AnimatedCopy from "./AnimatedCopy";
import { profile } from "@/lib/content";
import Signature from "../Signature/Signature";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const clipRect = svgRef.current.querySelector(".signature-clip-rect") as SVGRectElement | null;
    if (!clipRect) return;

    const viewBoxWidth = svgRef.current.viewBox.baseVal.width || 0;

    gsap.set(clipRect, {
      attr: { width: 0 },
    });

    // TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 80%",
        end: "bottom 35%",
        scrub: true,
      },
    });

    // révélation progressive de la signature
    tl.to(clipRect, {
      attr: { width: viewBoxWidth },
      duration: 2.2,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    // Vérifie si on est sur mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // désactive l'effet sur mobile

    const strength = 0.4; // force d'attraction
    const radius = 120;   // distance d'activation (px)

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;

      const distX = e.clientX - btnX;
      const distY = e.clientY - btnY;

      const distance = Math.sqrt(distX ** 2 + distY ** 2);

      if (distance < radius) {
        gsap.to(btn, {
          x: distX * strength,
          y: distY * strength,
          duration: 0.3,
          ease: "power3.out",
        });
      } else {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleContactClick = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="about-container" aria-label="À propos de moi">
      <h1 className="about-title" id="a-propos">
        À propos
      </h1>

      <div className="about-content1">
        <div className="about-me-description">
          <AnimatedCopy>
            <p>{profile.intro}</p>
          </AnimatedCopy>

          <AnimatedCopy>
            <p>
              Je privilégie une <span>direction artistique</span> nette, une <span>UX</span> claire et
              une exécution technique fiable. Curieux et rigoureux, je combine <span>design graphique</span>,
              automatisation et développement Next.js pour livrer des produits prêts à être déployés.
            </p>
          </AnimatedCopy>

          <button
            translate="no"
            ref={buttonRef}
            className="magnetic-btn fill-btn"
            onClick={handleContactClick}
            aria-label="Accéder au formulaire de contact et brief"
          >
            <span className="fill-bg"></span>
            <span className="text">
              {"Me contacter".split("").map((char, i) => (
                <span key={i} className="char">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </button>
        </div>

        <div className="img_inversed">
          <Signature className="sign" ref={svgRef} color="#d7fb61" />
          <InversionLens src="/moi.png" className="inversion-lens" />
        </div>
      </div>
    </section>
  );
};

export default About;
