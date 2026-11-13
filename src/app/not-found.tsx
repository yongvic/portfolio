import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";
import { TechLogos } from "@/components/techlogo/TechLogos";
import "@/components/Works/Works.css";
import "./not-found.css";

export const metadata: Metadata = {
  title: "Page introuvable — SOKPA Edo Yawo",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="scroll-root" className="not-found">
        <span className="section-eyebrow">Erreur 404</span>
        <h1 className="works-title">Page introuvable</h1>
        <p className="works-subtitle">
          La page que vous cherchez n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil pour continuer la visite.
        </p>
        <TransitionLink href="/" className="btn-all-projects">
          <span>Retour à l&apos;accueil</span>
          <TechLogos.Arrowright />
        </TransitionLink>
      </main>
    </>
  );
}
