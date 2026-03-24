"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/About/Services";
import Works from "@/components/Works/Works";
import Skills from "@/components/Skills/Skills";
import SectionWords from "@/components/SectionWords/SectionWords";
import Footer from "@/components/Footer/Footer";
import type { UiProject } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

type HomeClientProps = {
  projects: UiProject[];
};

export default function HomeClient({ projects }: HomeClientProps) {
  useEffect(() => {
    // Force un reset complet de ScrollTrigger
    ScrollTrigger.refresh(true);

    // Scroll vers le haut
    window.scrollTo(0, 0);

    return () => {
      // Cleanup lors du démontage
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navbar />

      <main id="scroll-root">
        <Hero />
        <About />
        <Services />
        <Works projects={projects} />
        <Skills />
        <SectionWords />
        <Footer />
      </main>
    </>
  );
}
