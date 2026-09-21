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
  const sectionRef = useRef<HTMLDivElement>(null);

  // États du formulaire de brief
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  // Animation de la signature GSAP
  useEffect(() => {
    if (!svgRef.current || !sectionRef.current) return;

    const clipRect = svgRef.current.querySelector(".signature-clip-rect") as SVGRectElement | null;
    if (!clipRect) return;

    const viewBoxWidth = svgRef.current.viewBox.baseVal.width || 0;

    gsap.set(clipRect, {
      attr: { width: 0 },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 25%",
        once: true,
      },
    });

    tl.to(clipRect, {
      attr: { width: viewBoxWidth },
      duration: 1.8,
      ease: "power2.out",
    });

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
          text: result?.message || "Erreur lors de l'envoi. Vous pouvez me joindre sur WhatsApp ou par email direct.",
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
    <footer className="say-hello" id="contact" ref={sectionRef} aria-label="Contact et brief de projet">
      <div className="contact-main-wrapper">
        <div className="contact-header">
          <span className="contact-eyebrow">Démarrer une collaboration</span>
          <h2 className="say-hello-title">Parlons de votre prochain projet</h2>
          <p className="contact-sub">
            Disponible pour des projets de direction artistique, conception UI/UX et développement Next.js sur-mesure.
          </p>
        </div>

        {/* Studio Brief Builder Form */}
        <div className="brief-builder-container">
          <form className="brief-form" onSubmit={handleSubmit} noValidate>
            {/* Étape 1 : Services souhaités */}
            <div className="form-step">
              <label className="step-label">
                <span>01</span> Quels services recherchez-vous ?
              </label>
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

            {/* Étape 2 : Délais / Planning */}
            <div className="form-step">
              <label className="step-label">
                <span>02</span> Quel est votre calendrier ?
              </label>
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

            {/* Étape 3 : Coordonnées & Message */}
            <div className="form-step">
              <label className="step-label">
                <span>03</span> Vos coordonnées & détails du besoin
              </label>
              <div className="inputs-grid">
                <div className="input-group">
                  <label htmlFor="contact-name">Nom & Entreprise</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Ex: Sophie Laurent — Agence Nova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="contact-email">Adresse Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Ex: sophie@agence-nova.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group mt-4">
                <label htmlFor="contact-message">Parlez-moi de votre vision ou objectif</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Décrivez votre produit, vos attentes, vos liens d'inspiration..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Notification de statut */}
            {feedback && (
              <div
                className={`feedback-banner ${feedback.type === "success" ? "success" : "error"}`}
                role="status"
              >
                <span>{feedback.type === "success" ? "✓" : "⚠"}</span>
                <p>{feedback.text}</p>
              </div>
            )}

            {/* Actions de validation */}
            <div className="form-actions-bar">
              <button
                type="submit"
                className="btn-send-brief"
                disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? "Envoi du brief en cours..." : "Envoyer le brief projet →"}
              </button>

              <div className="direct-channels">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="btn-channel-whatsapp"
                >
                  <TechLogos.Whatsapp />
                  <span>Discussion WhatsApp Direct</span>
                </button>

                <a
                  href={`mailto:${profile.email}?subject=Collaboration%20Portfolio`}
                  className="btn-channel-email"
                >
                  <span>{profile.email}</span>
                </a>
              </div>
            </div>
          </form>
        </div>

        {/* Liens Réseaux Sociaux & Contact Direct */}
        <div className="say-hello-contact">
          <div className="social-contact" aria-label="Réseaux sociaux">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil GitHub d'Edo Sokpa"
              className="social-link"
            >
              <TechLogos.GitHub />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil LinkedIn d'Edo Sokpa"
              className="social-link"
            >
              <TechLogos.LinkedIn />
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact WhatsApp direct"
              className="social-link"
            >
              <TechLogos.Whatsapp />
            </a>
          </div>

          <div className="my-contact">
            <p className="contact-coord-title">Localisation & Fuseau</p>
            <p className="contact-city">{profile.city} (GMT+0)</p>
            <p className="contact-phone">{profile.phone}</p>
          </div>
        </div>

        {/* Signature Finale & Copyright */}
        <div className="say-name">
          <div className="copyright-container">
            <div className="copyright">
              <TechLogos.brand />
              <p>
                © {profile.name} · {new Date().getFullYear()} — Tous droits réservés
              </p>
            </div>
            <div className="designed-by">
              <p>Direction artistique & ingénierie front-end par Edo Yawo Sokpa</p>
            </div>
          </div>

          <div className="name-mask" aria-hidden="true">
            <h1>
              ED
              <Signature className="sign" ref={svgRef} color="#d7fb61" />
              O
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
}
