"use client";

import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import { TechLogos } from "../techlogo/TechLogos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/content";
import Signature from "../Signature/Signature";

gsap.registerPlugin(ScrollTrigger);

// Regex email

const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{2,255}\.[a-zA-Z]{2,}$/;

const MAX_EMAIL_LENGTH = 60;

const Footer = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = EMAIL_REGEX.test(email);

  // Fonction pour valider et retourner un message d'erreur spécifique
  const getEmailError = (value: string): string => {
    if (value.length === 0) return "";
    if (!value.includes("@")) return "L'email doit contenir @";
    if (value.startsWith("@")) return "L'email ne peut pas commencer par @";
    if (value.endsWith("@")) return "L'email est incomplet";
    if (!value.includes(".")) return "Ajoute un domaine (.com, .fr, etc.)";
    if (value.split("@").length > 2) return "Un seul @ est autorisé";
    const [local, domain] = value.split("@");
    if (local.length === 0) return "Ajoute un texte avant @";
    if (domain.length === 0) return "Ajoute un domaine après @";
    if (!domain.includes(".")) return "Le domaine doit contenir un point";
    if (domain.endsWith(".")) return "L'email ne peut pas finir par un point";
    if (domain.split(".").pop()!.length < 2) return "Extension de domaine trop courte";
    if (!isValidEmail) return "Adresse email invalide";
    return "";
  };

  /*GSAP*/
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
      start: "top 10%",
      once: true,
    },
  });

  tl.to(clipRect, {
    attr: { width: viewBoxWidth },
    duration: 1.8,
    ease: "power2.out",
  });

  return () => {
    tl.kill(); // clean & suffisant
  };
}, []);
// Tableau de dépendances vide pour exécuter une seule fois

  /*formulaire */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      setStatus("error");
      return;
    }

    try {
      setLoading(true);
      setStatus("idle");

      const subject = "Demande de collaboration";
      const body = `Bonjour Edo,

Je vous contacte suite à la consultation de votre portfolio.

Mon email : ${email}

J'aimerais discuter d'un projet/collaboration avec vous.

Cordialement,
[Votre Nom]`;

      window.open(
        `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_blank"
      );

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Mise à jour du message d'erreur en temps réel
    const error = getEmailError(value);
    setErrorMessage(error);
    
    if (status !== "idle") {
      setStatus("idle");
    }
  };

  return (
    <div className="say-hello"  ref={sectionRef}>
      <h1 className="say-hello-title" >Dites bonjour !</h1>

      <div className="message">
        <p>Construisons une expérience forte et mémorable ensemble.</p>

        <div style={{ position: "relative" }}>
          <form className="email-container" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              maxLength={MAX_EMAIL_LENGTH}
              onChange={handleEmailChange}
              aria-invalid={!isValidEmail && email.length > 0}
              aria-describedby={status === "error" ? "email-error" : undefined}
              required
            />

            <button
              className="send"
              type="submit"
              disabled={!isValidEmail || loading}
              aria-busy={loading}
            >
              {loading ? "Envoi…" : "Envoyer"}
            </button>
          </form>

          <div style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "0.5rem",
            whiteSpace: "nowrap",
            minHeight: "1.5rem"
          }}>
            {status === "error" && (
              <p id="email-error" className="form-error" role="alert" style={{ margin: 0 }}>
                Envoi impossible. Réessaie.
              </p>
            )}

            {errorMessage && status === "idle" && (
              <p className="form-error" role="alert" style={{ margin: 0 }}>
                {errorMessage}
              </p>
            )}

            {status === "success" && (
              <p className="form-success" role="status" style={{ margin: 0 }}>
                Merci ! Je te réponds rapidement.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="say-hello-contact">
        <div className="social-contact">
          <TechLogos.GitHub />
          <TechLogos.LinkedIn />
          <TechLogos.Whatsapp />
        </div>

        <div className="my-contact">
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
        </div>
      </div>

      <div className="say-name">
        <div className="copyright-container">
          <div className="copyright">
            <TechLogos.brand />
            <p>© {profile.name} | {new Date().getFullYear()}</p>
          </div>
          <div className="designed-by">
            <p>design & développement par Edo Yawo</p>
          </div>
        </div>

        <div className="name-mask" id="contact">
          <h1>
            ED
            <Signature
              className="sign"
              ref={svgRef}
              color="#d7fb61"
            />
            O
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
