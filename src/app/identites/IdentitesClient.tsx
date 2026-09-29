"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";
import { identityPlanche, type BrandIdentity } from "@/lib/identities";
import "./identites.css";

gsap.registerPlugin(ScrollTrigger);

type IdentitesClientProps = {
  identities: BrandIdentity[];
};

export default function IdentitesClient({ identities }: IdentitesClientProps) {
  useEffect(() => {
    ScrollTrigger.refresh(true);
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".identity-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: (index % 2) * 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const withCharter = identities.filter((identity) => identity.charter).length;

  return (
    <>
      <Navbar />
      <main id="scroll-root" className="identites-page">
        <header className="identites-header">
          <span className="section-eyebrow">Profil designer</span>
          <h1 className="identites-title">Identités visuelles</h1>
          <p className="identites-subtitle">
            Logos, déclinaisons et chartes graphiques. Chaque marque part d&apos;une idée simple, puis se construit en
            formes, couleurs et règles d&apos;usage.
          </p>
          <div className="identites-stats" aria-label="Résumé">
            <span>
              <strong>{identities.length}</strong> identités
            </span>
            {withCharter > 0 && (
              <span>
                <strong>{withCharter}</strong> {withCharter > 1 ? "chartes consultables" : "charte consultable"}
              </span>
            )}
          </div>
        </header>

        <section className="identites-grid" aria-label="Liste des identités visuelles">
          {identities.map((identity, index) => {
            return (
              <TransitionLink
                key={identity.slug}
                href={`/identites/${identity.slug}`}
                className="identity-card"
                aria-label={`Voir l'identité ${identity.name}`}
              >
                <div className="identity-card-stage identity-card-stage--planche">
                  <Image
                    src={identityPlanche(identity.slug)}
                    alt={`Planche ${identity.name}`}
                    fill
                    sizes="(max-width: 900px) 90vw, 45vw"
                    className="identity-card-cover"
                    draggable={false}
                    priority={index < 2}
                  />
                  <div className="identity-card-variants" aria-hidden="true">
                    {identity.variants.map((v) => (
                      <div key={v.src} style={{ background: v.background }}>
                        <Image src={v.src} alt="" width={v.width} height={v.height} sizes="22vw" draggable={false} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="identity-card-body">
                  <div className="identity-card-meta">
                    <span className="identity-card-index">{String(index + 1).padStart(2, "0")}/</span>
                    {identity.sector && <span className="identity-pill">{identity.sector}</span>}
                    <span className={`identity-pill ${identity.charter ? "is-charter" : ""}`}>
                      {identity.charter ? "Charte disponible" : "Logo & déclinaisons"}
                    </span>
                  </div>
                  <h2 className="identity-card-name">{identity.name}</h2>
                  <p className="identity-card-excerpt">{identity.excerpt}</p>
                  <div className="identity-card-palette" aria-label="Palette">
                    {identity.palette.map((color) => (
                      <span key={color.hex} style={{ background: color.hex }} title={`${color.name} ${color.hex}`} />
                    ))}
                  </div>
                </div>
              </TransitionLink>
            );
          })}
        </section>

        <Footer />
      </main>
    </>
  );
}
