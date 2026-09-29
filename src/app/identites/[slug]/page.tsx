import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import CharterViewer from "@/components/CharterViewer/CharterViewer";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";
import { TechLogos } from "@/components/techlogo/TechLogos";
import { brandIdentities, getBrandIdentity } from "@/lib/identities";
import "../identites.css";

type IdentityPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brandIdentities.map((identity) => ({ slug: identity.slug }));
}

export async function generateMetadata({ params }: IdentityPageProps): Promise<Metadata> {
  const identity = getBrandIdentity((await params).slug);
  if (!identity) return { title: "Identité introuvable — SOKPA Edo Yawo" };
  return {
    title: `${identity.name} — Identité visuelle — SOKPA Edo Yawo`,
    description: identity.excerpt,
  };
}

export default async function IdentityPage({ params }: IdentityPageProps) {
  const { slug } = await params;
  const identity = getBrandIdentity(slug);
  if (!identity) notFound();

  const index = brandIdentities.findIndex((item) => item.slug === slug);
  const prev = brandIdentities[(index - 1 + brandIdentities.length) % brandIdentities.length];
  const next = brandIdentities[(index + 1) % brandIdentities.length];
  const cover = identity.variants[identity.coverVariant] ?? identity.variants[0];

  return (
    <>
      <Navbar />
      <div className="identity-detail" style={{ ["--brand-accent" as string]: identity.accent }}>
        <header className="identity-breadcrumb" aria-label="Navigation contextuelle">
          <TransitionLink href="/identites" className="identity-back">
            <TechLogos.Arrowleft />
            <span>Toutes les identités</span>
          </TransitionLink>
          <div className="identity-trail">
            <span>Edo Sokpa</span>
            <span className="identity-trail-sep">/</span>
            <span>Identités visuelles</span>
            <span className="identity-trail-sep">/</span>
            <span className="identity-trail-current">{identity.name}</span>
          </div>
          <div className="identity-pager">
            <TransitionLink href={`/identites/${prev.slug}`} title={`Précédent : ${prev.name}`} aria-label="Identité précédente">
              <TechLogos.Arrowleft />
            </TransitionLink>
            <TransitionLink href={`/identites/${next.slug}`} title={`Suivant : ${next.name}`} aria-label="Identité suivante">
              <TechLogos.Arrowright />
            </TransitionLink>
          </div>
        </header>

        <section className="identity-hero">
          <div className="identity-hero-text">
            <div className="identity-card-meta">
              <span className="identity-pill">Identité visuelle</span>
              {identity.sector && <span className="identity-pill">{identity.sector}</span>}
              {identity.year && <span className="identity-pill">{identity.year}</span>}
            </div>
            <h1 className="identity-hero-title">{identity.name}</h1>
            <p className="identity-hero-excerpt">{identity.excerpt}</p>
            {identity.charter && (
              <CharterViewer brandName={identity.name} charter={identity.charter} accent={identity.accent} />
            )}
          </div>
          <div className="identity-hero-stage" style={{ background: cover.background }}>
            <Image
              src={cover.src}
              alt={`Logo ${identity.name}`}
              width={cover.width}
              height={cover.height}
              sizes="(max-width: 1000px) 90vw, 50vw"
              priority
              draggable={false}
            />
          </div>
        </section>

        <section className="identity-section">
          <div className="identity-section-head">
            <span className="identity-section-num">01</span>
            <h2>La genèse du logo</h2>
          </div>
          <div className="identity-story">
            {identity.story.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "is-lead" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="identity-section">
          <div className="identity-section-head">
            <span className="identity-section-num">02</span>
            <h2>Palette</h2>
          </div>
          <div className="identity-palette">
            {identity.palette.map((color) => (
              <div key={color.hex} className="identity-swatch">
                <div className="identity-swatch-color" style={{ background: color.hex }} />
                <div className="identity-swatch-info">
                  <strong>{color.name}</strong>
                  <span>{color.hex}</span>
                </div>
              </div>
            ))}
          </div>
          {identity.typography && identity.typography.length > 0 && (
            <div className="identity-typography">
              <h3>Typographies</h3>
              <div className="identity-type-list">
                {identity.typography.map((font) => (
                  <span key={font}>{font}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="identity-section">
          <div className="identity-section-head">
            <span className="identity-section-num">03</span>
            <h2>Déclinaisons</h2>
          </div>
          <div className="identity-variants">
            {identity.variants.map((v) => (
              <figure key={v.src} className="identity-variant">
                <div className="identity-variant-stage" style={{ background: v.background }}>
                  <Image
                    src={v.src}
                    alt={`${identity.name}, ${v.label.toLowerCase()}`}
                    width={v.width}
                    height={v.height}
                    sizes="(max-width: 700px) 90vw, 45vw"
                    draggable={false}
                  />
                </div>
                <figcaption>{v.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {identity.charter && (
          <section className="identity-section identity-charter-cta">
            <div>
              <span className="identity-section-num">04</span>
              <h2>La charte graphique complète</h2>
              <p>
                Règles d&apos;usage, zones de protection, couleurs et typographies : le document remis au client, à
                consulter directement ici.
              </p>
            </div>
            <CharterViewer brandName={identity.name} charter={identity.charter} accent={identity.accent} />
          </section>
        )}

        <footer className="identity-bottom-nav" aria-label="Autres identités">
          <TransitionLink href={`/identites/${prev.slug}`} className="identity-bottom-card">
            <span>← Précédent</span>
            <strong>{prev.name}</strong>
          </TransitionLink>
          <TransitionLink href="/identites" className="identity-bottom-all">
            Toutes les identités
          </TransitionLink>
          <TransitionLink href={`/identites/${next.slug}`} className="identity-bottom-card is-next">
            <span>Suivant →</span>
            <strong>{next.name}</strong>
          </TransitionLink>
        </footer>
      </div>
    </>
  );
}
