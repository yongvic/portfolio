import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Signature from '../Signature/Signature';

interface HeroLoaderProps {
  onLoadComplete?: () => void;
}

const HeroLoader: React.FC<HeroLoaderProps> = ({ onLoadComplete }) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<Array<HTMLDivElement | null>>([]);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const signatureRef = useRef<SVGSVGElement | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Force le body à cacher la navbar immédiatement
    document.body.classList.add('loader-active');
    
    // Retirer la classe de blocage initial
    document.documentElement.classList.remove('initial-load');

    // CRITIQUE : Cacher la signature IMMÉDIATEMENT avant toute animation
    if (signatureRef.current) {
      signatureRef.current.style.opacity = '0';

      const clipRect = signatureRef.current.querySelector('.signature-clip-rect') as SVGRectElement | null;
      if (clipRect) {
        gsap.set(clipRect, { attr: { width: 0 } });
      }
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Animation de sortie
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            document.body.classList.remove('loader-active');
            onLoadComplete?.();
          }
        });
      }
    });

    // Faire apparaître la signature en fondu
    tl.to(signatureRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    // Animation du compteur
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(Math.floor(this.targets()[0].val));
      }
    }, "-=0.3");

    // Animation de la signature (révélation)
    const clipRect = signatureRef.current?.querySelector('.signature-clip-rect') as SVGRectElement | null;
    const viewBoxWidth = signatureRef.current?.viewBox.baseVal.width || 0;

    if (clipRect && viewBoxWidth) {
      tl.to(clipRect, {
        attr: { width: viewBoxWidth },
        duration: 1.5,
        ease: "power2.inOut"
      }, "-=1.8");
    }

    // Animation des blocs qui se retirent
    const blocks = blocksRef.current.filter(Boolean) as HTMLDivElement[];
    tl.to(blocks, {
      scaleY: 0,
      stagger: {
        amount: 0.8,
        from: "random"
      },
      duration: 0.6,
      ease: "power3.inOut"
    }, "-=0.3");

    return () => {
      tl.kill();
      document.body.classList.remove('loader-active');
    };
  }, [onLoadComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f8f8',
        pointerEvents: 'none'
      }}
    >
      {/* Grille de blocs */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
        gap: '2px',
        background: '#d7fb61'
      }}>
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            ref={el => { blocksRef.current[i] = el }}
            style={{
              backgroundColor: '#f8f8f8',
              transformOrigin: i % 2 === 0 ? 'top' : 'bottom',
              willChange: 'transform'
            }}
          />
        ))}
      </div>

      {/* Contenu central */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
        zIndex: 1
      }}>
        {/* Signature SVG - CACHÉE PAR DÉFAUT */}
        <Signature
          ref={signatureRef}
          className="hero-loader-signature"
          color="#141414"
          style={{ opacity: 0 }}
        />

        {/* Compteur de progression */}
        <div
          ref={counterRef}
          translate='no'
          style={{
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            fontFamily: 'var(--font-clash-display)',
            fontWeight: 700,
            color: '#141414',
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}
        >
          {progress.toString().padStart(2, '0')}%
        </div>

        {/* Texte de chargement */}
        <div style={{
          fontFamily: 'var(--font-generale-sans)',
          fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
          color: '#141414',
          opacity: 0.6,
          letterSpacing: '0.2em',
          textTransform: 'uppercase'
        }}>
          Chargement de l&apos;expérience
        </div>

        {/* Barre de progression */}
        <div style={{
          width: 'min(80vw, 400px)',
          height: '2px',
          backgroundColor: 'rgba(20,20,20,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#141414',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

export { HeroLoader };

export const InitialLoaderScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          const isRefresh = performance.getEntriesByType('navigation')[0]?.type === 'reload';
          const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
          
          if (isRefresh || !hasSeenLoader) {
            document.documentElement.classList.add('initial-load');
          }
        })();
      `
    }}
  />
);

// Hero.tsx avec gestion intelligente du loader
export function HeroWithSmartLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const isRefresh = 
      (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';
    
    // Détecte si on vient d'une autre page de l'app
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    
    // Si refresh OU première visite : montrer le loader
    if (isRefresh || !hasSeenLoader) {
      // Réinitialiser le flag si c'est un refresh
      if (isRefresh) {
        sessionStorage.removeItem('hasSeenLoader');
      }
      
      // Cacher la navbar immédiatement
      document.body.classList.add('loader-active');
      setIsLoading(true);
    } else {
      // Skip le loader si déjà vu dans cette session (navigation interne)
      setIsLoading(false);
      setShowContent(true);
    }

    // Désactiver le scroll pendant le chargement
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('loader-active');
    };
  }, [isLoading]);

  const handleLoadComplete = () => {
    // Marquer qu'on a vu le loader dans cette session
    sessionStorage.setItem('hasSeenLoader', 'true');
    setIsLoading(false);
    
    // Délai pour la transition
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  return (
    <>
      {isLoading && <HeroLoader onLoadComplete={handleLoadComplete} />}
      
      <div
        style={{
          opacity: showContent ? 1 : 0,
          visibility: showContent ? 'visible' : 'hidden',
          transition: 'opacity 0.5s ease'
        }}
      >
        {children}
      </div>
    </>
  );
}

const criticalStyles = `
/* Cache la navbar immédiatement au chargement initial */
body.loader-active .navbar-wrapper,
body.loader-active nav {
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  transition: none !important;
}

/* Empêche le flash de la signature SVG */
body.loader-active .hero canvas {
  visibility: hidden !important;
}

/* S'assure que le loader est au-dessus de tout */
.hero-loader-wrapper {
  z-index: 10000 !important;
}
`;

export const loaderStyles = criticalStyles;
