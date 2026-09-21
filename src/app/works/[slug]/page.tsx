import "./WorksDetails.css";
import ParallaxImage from "@/components/Works/ParallaxImage";
import { TransitionLink } from "@/components/TransitionLink/TransitionLink";
import Navbar from "@/components/Navbar/Navbar";
import { profile, projectCaseStudies, staticProjects } from "@/lib/content";
import { TechLogos } from "@/components/techlogo/TechLogos";
import { getProjectBySlug, getProjects } from "@/lib/db";
import TrackProjectView from "@/components/Track/TrackProjectView";

type WorkDetailProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function WorkDetail({ params }: WorkDetailProps) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  const [baseProject, allProjects] = await Promise.all([
    getProjectBySlug(currentSlug),
    getProjects().catch(() => staticProjects),
  ]);

  const caseStudy = projectCaseStudies[currentSlug];
  const images = caseStudy?.images ?? {
    hero: baseProject?.coverImage ?? "/moi.png",
    desktop: baseProject?.coverImage ?? "/moi.png",
    mobile: baseProject?.coverImage ?? "/moi.png",
    details: [baseProject?.coverImage ?? "/moi.png"],
  };

  // Gestion de l'état 404 Projet Introuvable avec récupération élégante
  if (!baseProject) {
    const suggestedProjects = (allProjects.length ? allProjects : staticProjects).slice(0, 3);

    return (
      <>
        <Navbar />
        <main className="work-not-found-container" role="main">
          <div className="work-not-found-card">
            <span className="not-found-tag">Erreur 404</span>
            <h1>Projet introuvable</h1>
            <p>
              Le projet « {currentSlug} » n&apos;existe pas ou a été déplacé dans le catalogue.
            </p>

            <div className="not-found-actions">
              <TransitionLink href="/#projets" className="btn-return-home">
                <TechLogos.Arrowleft />
                <span>Retour au catalogue complet</span>
              </TransitionLink>
            </div>

            <div className="suggested-projects-section">
              <h3>Découvrir d&apos;autres réalisations</h3>
              <div className="suggested-grid">
                {suggestedProjects.map((p) => (
                  <TransitionLink key={p.id} href={`/works/${p.slug}`} className="suggested-card">
                    <img src={p.coverImage} alt={p.title} className="suggested-img" />
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.category}</p>
                    </div>
                  </TransitionLink>
                ))}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Calcul du projet précédent et suivant pour navigation séquentielle
  const currentIndex = allProjects.findIndex((p) => p.slug === currentSlug);
  const prevProject =
    currentIndex > 0
      ? allProjects[currentIndex - 1]
      : allProjects.length > 1
      ? allProjects[allProjects.length - 1]
      : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects.length > 1
      ? allProjects[0]
      : null;

  const work = {
    title: baseProject.title,
    subtitle: baseProject.excerpt,
    description: baseProject.description,
    year: caseStudy?.year ?? "2026",
    role: caseStudy?.role ?? profile.role,
    category: baseProject.category || "Web & SaaS",
    technologies: baseProject.technologies,
    images,
    link: baseProject.projectUrl ?? undefined,
    github: baseProject.repository ?? undefined,
    challenge:
      caseStudy?.challenge ??
      "Clarifier le positionnement du produit et créer une expérience utilisateur fluide, percutante et hautement convertible.",
    solution:
      caseStudy?.solution ??
      "Architecture fullstack Next.js moderne, hiérarchie typographique forte et intégration de workflows automatisés.",
    results:
      caseStudy?.results ?? [
        "Parcours utilisateur plus direct et suppression des frictions.",
        "Identité visuelle cohérente, mémorable et premium.",
        "Interface fluide et optimisée sur mobile et desktop.",
      ],
  };

  const titleFontFamily = caseStudy?.fontFamily ?? "var(--font-clash-display)";
  const accentColor = caseStudy?.accent ?? "#D7FB61";

  return (
    <>
      <Navbar />
      {baseProject.id ? <TrackProjectView projectId={baseProject.id} /> : null}

      <div className="work-detail">
        {/* Fil d'Ariane & Barre de Navigation Supérieure Contextuelle */}
        <header className="work-breadcrumb-bar" aria-label="Navigation contextuelle">
          <div className="breadcrumb-inner">
            <TransitionLink href="/#projets" className="btn-back-breadcrumb">
              <TechLogos.Arrowleft />
              <span>Tous les projets</span>
            </TransitionLink>

            <div className="breadcrumb-trail">
              <span className="trail-root">Edo Sokpa</span>
              <span className="trail-sep">/</span>
              <span className="trail-cat">{work.category}</span>
              <span className="trail-sep">/</span>
              <span className="trail-current">{work.title}</span>
            </div>

            <div className="quick-pager">
              {prevProject && (
                <TransitionLink
                  href={`/works/${prevProject.slug}`}
                  className="pager-btn"
                  title={`Projet précédent : ${prevProject.title}`}
                  aria-label="Projet précédent"
                >
                  <TechLogos.Arrowleft />
                </TransitionLink>
              )}
              {nextProject && (
                <TransitionLink
                  href={`/works/${nextProject.slug}`}
                  className="pager-btn"
                  title={`Projet suivant : ${nextProject.title}`}
                  aria-label="Projet suivant"
                >
                  <TechLogos.Arrowright />
                </TransitionLink>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-work-section">
          <div className="hero-work-content">
            <div className="meta-pills">
              <span className="work-year" style={{ color: accentColor }}>
                {work.year}
              </span>
              <span className="work-category-pill">{work.category}</span>
              {work.link && <span className="work-live-pill">● En production</span>}
            </div>

            <h1
              className="work-title"
              style={{
                fontFamily: titleFontFamily,
              }}
            >
              {work.title}
            </h1>
            <p className="work-subtitle">{work.subtitle}</p>
            <div className="work-meta">
              <span><strong>Rôle :</strong> {work.role}</span>
            </div>
          </div>

          <div className="hero-work-image">
            <ParallaxImage src={work.images.hero} alt={work.title} speed={0.3} />
          </div>
        </section>

        {/* Overview & Stack */}
        <section className="overview-section">
          <div className="section-content">
            <h2>Aperçu & Vision</h2>
            <p className="large-text">{work.description}</p>

            <div className="tech-stack">
              <h3>Stack & Outils</h3>
              <div className="tech-tags">
                {work.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(work.link || work.github) && (
              <div className="project-links">
                {work.link && (
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Visiter le site en ligne</span>{" "}
                    <span className="arrow-visite">
                      <TechLogos.Arrowright />
                    </span>
                  </a>
                )}
                {work.github && (
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Voir le code source
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="challenge-section">
          <div className="section-content">
            <div className="challenge-grid">
              <div className="challenge-item">
                <span className="challenge-num">01</span>
                <h3>Le Défi</h3>
                <p>{work.challenge}</p>
              </div>
              <div className="challenge-item">
                <span className="challenge-num">02</span>
                <h3>La Solution Apportée</h3>
                <p>{work.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Showcase */}
        <section className="showcase-section">
          <div className="showcase-grid">
            <div className="showcase-item large">
              <ParallaxImage
                src={work.images.desktop}
                alt={`${work.title} aperçu desktop`}
                speed={0.2}
              />
            </div>
            <div className="showcase-item">
              <ParallaxImage
                src={work.images.mobile}
                alt={`${work.title} aperçu mobile`}
                speed={0.15}
              />
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="results-section">
          <div className="section-content">
            <h2>Impact & Résultats</h2>
            <div className="results-grid">
              {work.results.map((result, index) => (
                <div key={index} className="result-item">
                  <span className="result-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Inférieure Complète */}
        <footer className="navigation-section">
          <div className="bottom-nav-inner">
            {prevProject && (
              <TransitionLink
                href={`/works/${prevProject.slug}`}
                className="bottom-project-card prev"
              >
                <span className="direction-label">← Projet Précédent</span>
                <span className="project-name">{prevProject.title}</span>
              </TransitionLink>
            )}

            <TransitionLink href="/#projets" className="back-to-all-btn">
              <span>Retour à tous les projets</span>
            </TransitionLink>

            {nextProject && (
              <TransitionLink
                href={`/works/${nextProject.slug}`}
                className="bottom-project-card next"
              >
                <span className="direction-label">Projet Suivant →</span>
                <span className="project-name">{nextProject.title}</span>
              </TransitionLink>
            )}
          </div>
        </footer>
      </div>
    </>
  );
}
