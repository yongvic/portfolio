"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import Navbar from "@/components/Navbar/Navbar";
import Works from "@/components/Works/Works";
import Footer from "@/components/Footer/Footer";
import type { UiProject } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

type ProjetsClientProps = {
  projects: UiProject[];
};

export default function ProjetsClient({ projects }: ProjetsClientProps) {
  useEffect(() => {
    ScrollTrigger.refresh(true);
    window.scrollTo(0, 0);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="scroll-root">
        <Works projects={projects} variant="catalog" />
        <Footer />
      </main>
    </>
  );
}
