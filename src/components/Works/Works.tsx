"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import "./Works.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxImage from "./ParallaxImage";
import { TransitionLink } from "../TransitionLink/TransitionLink";
import { projectCaseStudies, staticProjects, type UiProject } from "@/lib/content";
import { TechLogos } from "../techlogo/TechLogos";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type WorksProps = {
  projects?: UiProject[];
};

type CategoryFilter = "ALL" | "WEB" | "GRAPHIC" | "AUTO";

export default function Works({ projects = staticProjects }: WorksProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [quickViewProject, setQuickViewProject] = useState<UiProject | null>(null);

  const linkRefs = useRef<Array<HTMLDivElement | null>>([]);
  const projectRefs = useRef<Array<HTMLElement | null>>([]);

  // Normalisation des catégories
  const getProjectFilterCategory = (p: UiProject): CategoryFilter => {
    const cat = (p.category || "").toLowerCase();
    if (cat.includes("graph") || cat.includes("brand") || cat.includes("design")) return "GRAPHIC";
    if (cat.includes("auto") || cat.includes("n8n") || cat.includes("bot")) return "AUTO";
    return "WEB";
  };

  // Filtrage combiné catégorie + recherche texte
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        selectedCategory === "ALL" || getProjectFilterCategory(project) === selectedCategory;

      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchExcerpt = project.excerpt.toLowerCase().includes(q);
      const matchTech = project.technologies.some((t) => t.toLowerCase().includes(q));
      const matchCat = project.category.toLowerCase().includes(q);

      return matchTitle || matchExcerpt || matchTech || matchCat;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Comptes par catégorie
  const counts = useMemo(() => {
    return {
      ALL: projects.length,
      WEB: projects.filter((p) => getProjectFilterCategory(p) === "WEB").length,
      GRAPHIC: projects.filter((p) => getProjectFilterCategory(p) === "GRAPHIC").length,
      AUTO: projects.filter((p) => getProjectFilterCategory(p) === "AUTO").length,
    };
  }, [projects]);

  // Animation d'apparition des projets au scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((el, index) => {
        if (!el) return;

        const imageWrapper = el.querySelector(".works-image-wrapper");
        const textWrapper = el.querySelector(".works-text");
        const isEven = index % 2 === 0;

        gsap.fromTo(
          imageWrapper,
          { opacity: 0, scale: 0.94, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          textWrapper,
          { opacity: 0, x: isEven ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [filteredProjects]);

  // Fermeture du Quick View avec la touche Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuickViewProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="works" id="projets" aria-label="Projets sélectionnés">
      {/* En-tête de section */}
      <div className="works-header">
        <span className="section-eyebrow">Portfolio & Réalisations</span>
        <h1 className="works-title">Selected Works</h1>
        <p className="works-subtitle">
          Une sélection d&apos;applications SaaS, identités de marque et architectures fullstack
          conçues avec une exigence studio internationale.
        </p>
      </div>

      {/* Barre de contrôle : Filtres par catégories & Recherche instantanée */}
      <div className="works-controls-container">
        <div className="category-tabs" role="tablist" aria-label="Filtrer les projets par catégorie">
          <button
            role="tab"
            aria-selected={selectedCategory === "ALL"}
            className={`cat-tab ${selectedCategory === "ALL" ? "active" : ""}`}
            onClick={() => setSelectedCategory("ALL")}
          >
            <span>Tous les projets</span>
            <span className="cat-count">{counts.ALL}</span>
          </button>
          <button
            role="tab"
            aria-selected={selectedCategory === "WEB"}
            className={`cat-tab ${selectedCategory === "WEB" ? "active" : ""}`}
            onClick={() => setSelectedCategory("WEB")}
          >
            <span>Web & SaaS</span>
            <span className="cat-count">{counts.WEB}</span>
          </button>
          <button
            role="tab"
            aria-selected={selectedCategory === "GRAPHIC"}
            className={`cat-tab ${selectedCategory === "GRAPHIC" ? "active" : ""}`}
            onClick={() => setSelectedCategory("GRAPHIC")}
          >
            <span>Direction Artistique</span>
            <span className="cat-count">{counts.GRAPHIC}</span>
          </button>
          <button
            role="tab"
            aria-selected={selectedCategory === "AUTO"}
            className={`cat-tab ${selectedCategory === "AUTO" ? "active" : ""}`}
            onClick={() => setSelectedCategory("AUTO")}
          >
            <span>Automatisation & IA</span>
            <span className="cat-count">{counts.AUTO}</span>
          </button>
        </div>

        {/* Barre de recherche instantanée */}
        <div className="search-bar-wrapper">
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Filtrer par techno (Next.js, Figma, n8n, Stripe...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Rechercher parmi les projets"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Effacer la recherche"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Résumé du nombre de résultats visibles */}
      <div className="results-summary">
        <span>
          Affichage de <strong>{filteredProjects.length}</strong> projet{filteredProjects.length > 1 ? "s" : ""}
          {selectedCategory !== "ALL" || searchQuery ? " (filtres actifs)" : ""}
        </span>
      </div>

      {/* Grille principale des projets */}
      <div className="container-works">
        {filteredProjects.map((project, index) => {
          const caseStudy = projectCaseStudies[project.slug];
          const images = caseStudy?.images ?? {
            hero: project.coverImage,
            desktop: project.coverImage,
          };
          const isEven = index % 2 === 0;

          const textBlock = (
            <div className="works-text">
              <div className="work-meta-top">
                <span className="work-number">{(index + 1).toString().padStart(2, "0")}/</span>
                <span className="work-category-badge">{project.category}</span>
                {project.projectUrl && <span className="work-status-badge live">● En ligne</span>}
              </div>

              <h2
                className="work-title"
                style={{
                  color: caseStudy?.accent ?? "var(--dark)",
                  fontFamily: caseStudy?.fontFamily ?? "var(--font-clash-display)",
                }}
              >
                {project.title}
              </h2>

              <p className="work-excerpt">{project.excerpt}</p>

              {/* Technologies utilisées */}
              <div className="work-tech" aria-label="Technologies du projet">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="tech-badge more">+{project.technologies.length - 5}</span>
                )}
              </div>

              {/* Barre d'actions du projet */}
              <div className="work-actions">
                <TransitionLink href={`/works/${project.slug}`} className="btn-case-study">
                  <div
                    className="link"
                    ref={(el) => {
                      linkRefs.current[index] = el;
                    }}
                  >
                    <div className="pink1"></div>
                    <span className="learn-more">Étude de cas détaillée</span>
                    <span className="button-arrow">
                      <TechLogos.Arrowright />
                    </span>
                  </div>
                </TransitionLink>

                <button
                  className="btn-quick-view"
                  onClick={() => setQuickViewProject(project)}
                  aria-label={`Aperçu rapide de ${project.title}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Aperçu express
                </button>

                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-live-link"
                    aria-label={`Visiter ${project.title} en production`}
                  >
                    <span>Site live</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          );

          const imageBlock = (
            <div className="works-image-wrapper">
              <TransitionLink href={`/works/${project.slug}`} className="works-image-inner">
                <ParallaxImage src={images.hero} alt={project.title} speed={0.15} />
                <div className="image-overlay">
                  <span>Ouvrir l&apos;étude de cas</span>
                </div>
              </TransitionLink>
            </div>
          );

          return (
            <article
              className={`works-project ${isEven ? "even" : "odd"}`}
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
            >
              {isEven ? (
                <>
                  {textBlock}
                  {imageBlock}
                </>
              ) : (
                <>
                  {imageBlock}
                  {textBlock}
                </>
              )}
            </article>
          );
        })}

        {/* État vide quand la recherche / le filtre n'a aucun résultat */}
        {filteredProjects.length === 0 && (
          <div className="works-empty-state" role="status">
            <div className="empty-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3>Aucun projet trouvé</h3>
            <p>
              Aucune réalisation ne correspond à votre recherche « {searchQuery} » dans cette catégorie.
            </p>
            <button
              className="btn-reset-filters"
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </div>

      {/* Modal / Tiroir d'Aperçu Rapide (Quick View) */}
      {quickViewProject && (
        <div
          className="quickview-backdrop"
          onClick={() => setQuickViewProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quickview-title"
        >
          <div
            className="quickview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="quickview-close"
              onClick={() => setQuickViewProject(null)}
              aria-label="Fermer l'aperçu"
            >
              ✕
            </button>

            <div className="quickview-header">
              <div className="quickview-tags">
                <span className="tag-category">{quickViewProject.category}</span>
                {quickViewProject.projectUrl && (
                  <span className="tag-live">● En production</span>
                )}
              </div>
              <h3 id="quickview-title">{quickViewProject.title}</h3>
              <p className="quickview-excerpt">{quickViewProject.excerpt}</p>
            </div>

            <div className="quickview-media">
              <img
                src={quickViewProject.coverImage}
                alt={quickViewProject.title}
                className="quickview-img"
              />
            </div>

            <div className="quickview-body">
              <h4>Description & Contexte</h4>
              <p>{quickViewProject.description}</p>

              <div className="quickview-stack">
                <h4>Technologies utilisées</h4>
                <div className="stack-badges">
                  {quickViewProject.technologies.map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="quickview-footer">
              <TransitionLink
                href={`/works/${quickViewProject.slug}`}
                className="btn-modal-primary"
              >
                Lire l&apos;étude de cas complète →
              </TransitionLink>

              <div className="quickview-ext-links">
                {quickViewProject.projectUrl && (
                  <a
                    href={quickViewProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modal-secondary"
                  >
                    Visiter le site
                  </a>
                )}
                {quickViewProject.repository && (
                  <a
                    href={quickViewProject.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modal-secondary"
                  >
                    Code GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
