"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import "./Footer.css";
import { TechLogos } from "../techlogo/TechLogos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, socialLinks } from "@/lib/content";
import Signature from "../Signature/Signature";
import { submitContactMessageAction } from "@/app/contact/actions";

gsap.registerPlugin(ScrollTrigger);

const AVAILABLE_SERVICES = [
  "Direction Artistique & Branding",
  "UI/UX Design & Figma",
  "Développement Web Next.js / SaaS",
  "Automatisation n8n & Workflows",
];

const TIMELINE_OPTIONS = [
  "Urgent (< 2 semaines)",
  "1 à 2 mois",
  "3 mois et plus",
  "Conseil / Audit ponctuel",
];

export default function Footer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!svgRef.current || !sectionRef.current) return;

    const clipRect = svgRef.current.querySelector(".signature-clip-rect") as SVGRectElement | null;
    if (!clipRect) return;

    const viewBoxWidth = svgRef.current.viewBox.baseVal.width || 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(clipRect, {
      attr: { width: viewBoxWidth },
    });

    if (reduceMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    tl.fromTo(
      clipRect,
      { attr: { width: 0 } },
      {
        attr: { width: viewBoxWidth },
        duration: 1.8,
        ease: "power2.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setFeedback({ type: "error", text: "Veuillez renseigner une adresse email valide." });
      return;
    }
    if (!name.trim()) {
      setFeedback({ type: "error", text: "Veuillez renseigner votre nom ou entreprise." });
      return;
    }
    if (!message.trim()) {
      setFeedback({ type: "error", text: "Veuillez décrire brièvement votre besoin ou projet." });
      return;
    }

    setFeedback(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("services", selectedServices.join(", "));
    formData.append("timeline", selectedTimeline);

    startTransition(async () => {
      const result = await submitContactMessageAction(null, formData);
      if (result?.success) {
        setFeedback({
          type: "success",
          text: result.message || "Message reçu avec succès ! Je reviens vers vous sous 24h.",
        });
        setName("");
        setEmail("");
        setMessage("");
        setSelectedServices([]);
        setSelectedTimeline("");
      } else {
        setFeedback({
          type: "error",
          text: result?.message || "Erreur lors de l'envoi. Vous pouvez me joindre sur WhatsApp ou par email.",
        });
      }
    });
  };

  const handleWhatsAppDirect = () => {
    const srvText = selectedServices.length ? selectedServices.join(", ") : "Projet digital";
    const text = `Bonjour Edo, je vous contacte au sujet d'un projet (${srvText}). Mon nom est ${name || "un client potentiel"}.`;
    window.open(`https://wa.me/22891480288?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <footer className="site-footer" id="contact" ref={sectionRef} aria-label="Contact et brief de projet">
      <div className="footer-shell">
        <div className="footer-grid">
          <div className="footer-intro">
            <span className="contact-eyebrow">Démarrer une collaboration</span>
            <h2 className="footer-title">Parlons de votre prochain projet</h2>
            <p className="footer-lead">
              Disponible pour la direction artistique, le design UI/UX et le développement Next.js sur-mesure.
            </p>

            <ul className="footer-meta">
              <li>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span>Téléphone</span>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
              </li>
              <li>
                <span>Studio</span>
                <p>{profile.city} · GMT+0</p>
              </li>
            </ul>

            <div className="footer-socials" aria-label="Réseaux sociaux">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="Profil GitHub d'Edo Sokpa">
                <TechLogos.GitHub />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Profil LinkedIn d'Edo Sokpa">
                <TechLogos.LinkedIn />
              </a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Contact WhatsApp direct">
                <TechLogos.Whatsapp />
              </a>
            </div>
          </div>

          <form className="footer-brief" onSubmit={handleSubmit} noValidate>
            <div className="form-step">
              <p className="step-label">
                <span>01</span> Services
              </p>
              <div className="chips-grid" role="group" aria-label="Sélection des services">
                {AVAILABLE_SERVICES.map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    className={`chip-btn ${selectedServices.includes(srv) ? "selected" : ""}`}
                    onClick={() => toggleService(srv)}
                    aria-pressed={selectedServices.includes(srv)}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-step">
              <p className="step-label">
                <span>02</span> Calendrier
              </p>
              <div className="chips-grid" role="group" aria-label="Sélection du calendrier">
                {TIMELINE_OPTIONS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`chip-btn ${selectedTimeline === time ? "selected" : ""}`}
                    onClick={() => setSelectedTimeline(selectedTimeline === time ? "" : time)}
                    aria-pressed={selectedTimeline === time}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-step">
              <p className="step-label">
                <span>03</span> Brief
              </p>
              <div className="inputs-grid">
                <div className="input-group">
                  <label htmlFor="contact-name">Nom &amp; entreprise</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Sophie Laurent — Agence Nova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="sophie@agence-nova.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="contact-message">Votre vision</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Produit, objectifs, références..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </div>

            {feedback && (
              <div className={`feedback-banner ${feedback.type === "success" ? "success" : "error"}`} role="status">
                <span>{feedback.type === "success" ? "✓" : "⚠"}</span>
                <p>{feedback.text}</p>
              </div>
            )}

            <div className="form-actions-bar">
              <button type="submit" className="btn-send-brief" disabled={isPending} aria-busy={isPending}>
                {isPending ? "Envoi en cours..." : "Envoyer le brief"}
              </button>
              <button type="button" onClick={handleWhatsAppDirect} className="btn-channel-whatsapp">
                <TechLogos.Whatsapp />
                <span>WhatsApp</span>
              </button>
            </div>
          </form>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          <p className="footer-mark">
            ED
            <Signature className="sign" ref={svgRef} color="#121212" />
            O
          </p>
        </div>

        <div className="footer-legal">
          <div className="copyright">
            <TechLogos.brand />
            <p>
              © {profile.name} · {new Date().getFullYear()}
            </p>
          </div>
          <p className="designed-by">Direction artistique &amp; ingénierie front-end</p>
        </div>
      </div>
    </footer>
  );
}
