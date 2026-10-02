"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import './SectionWords.css'

interface SplitTextInstance {
  chars: HTMLElement[];
  revert: () => void;
}

const SectionWords: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      const titleHeadings = gsap.utils.toArray<HTMLHeadingElement>(".title h1", sectionRef.current);
      const splits: SplitTextInstance[] = [];
      const isNarrow = window.matchMedia("(max-width: 1000px)").matches;
      const travel = isNarrow ? 70 : 150;

      titleHeadings.forEach((heading) => {
        const splitInstance = new SplitText(heading, {
          type: "chars",
          charsClass: "char",
        }) as unknown as SplitTextInstance;
        splits.push(splitInstance);

        splitInstance.chars.forEach((char, i) => {
          const charInitialY = i % 2 === 0 ? -travel : travel;
          gsap.set(char, { y: charInitialY });
        });
      });

      const titles = gsap.utils.toArray<HTMLDivElement>(".title", sectionRef.current);

      titles.forEach((title, index) => {
        const titleContainer = title.querySelector<HTMLDivElement>(".title-container");
        const titleContainerInitialX = index === 1 ? -100 : 100;
        const split = splits[index];
        const charCount = split.chars.length;

        ScrollTrigger.create({
          trigger: title,
          start: "top bottom",
          end: "top -25%",
          scrub: 1,
          onUpdate: (self) => {
            const titleContainerX =
              titleContainerInitialX - self.progress * titleContainerInitialX;
            if (titleContainer) {
              gsap.set(titleContainer, { x: `${titleContainerX}%` });
            }

            split.chars.forEach((char, i) => {
              let charStaggerIndex: number;
              if (index === 1) {
                charStaggerIndex = charCount - 1 - i;
              } else {
                charStaggerIndex = i;
              }

              const charStartDelay = 0.1;
              const charTimeLineSpan = 1 - charStartDelay;
              const staggerFactor = Math.min(0.75, charTimeLineSpan * 0.75);
              const delay =
                charStartDelay + (charStaggerIndex / charCount) * staggerFactor;
              const duration =
                charTimeLineSpan - (staggerFactor * (charCount - 1)) / charCount;
              const start = delay;

              let charProgress = 0;
              if (self.progress >= start) {
                charProgress = Math.min(1, (self.progress - start) / duration);
              }

              const charInitialY = i % 2 === 0 ? -travel : travel;
              const charY = charInitialY - charProgress * charInitialY;
              gsap.set(char, { y: charY });
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="animated-titles" translate="no" ref={sectionRef}>
      <div className="title">
        <div className="title-container">
          <h1>Vous imaginez</h1>
        </div>
      </div>
      <div className="title">
        <div className="title-container">
          <h1>Je conçois</h1>
        </div>
      </div>
      <div className="title">
        <div className="title-container">
          <h1>On livre</h1>
        </div>
      </div>
    </section>
  );
};

export default SectionWords;
