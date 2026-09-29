"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLenis } from "lenis/react";
import type { BrandCharter } from "@/lib/identities";
import "./CharterViewer.css";

type CharterViewerProps = {
  brandName: string;
  charter: BrandCharter;
  accent: string;
};

const preventDefault = (event: { preventDefault: () => void }) => event.preventDefault();

export default function CharterViewer({ brandName, charter, accent }: CharterViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(1);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lenis = useLenis();
  const total = charter.pages.length;

  const close = useCallback(() => setIsOpen(false), []);

  const goTo = useCallback(
    (page: number) => {
      const target = pageRefs.current[Math.min(Math.max(page, 1), total) - 1];
      const scroller = scrollerRef.current;
      if (!target || !scroller) return;
      scroller.scrollTo({ top: target.offsetTop - 24, behavior: "smooth" });
    },
    [total]
  );

  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();
    document.documentElement.classList.add("charter-open");

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && (key === "s" || key === "p")) {
        event.preventDefault();
        return;
      }
      if (event.key === "Escape") close();
      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goTo(currentPageRef.current + 1);
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goTo(currentPageRef.current - 1);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const page = Number((entry.target as HTMLElement).dataset.page);
            currentPageRef.current = page;
            setCurrentPage(page);
          }
        });
      },
      { root: scrollerRef.current, threshold: 0.55 }
    );
    pageRefs.current.forEach((el) => el && observer.observe(el));

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
      document.documentElement.classList.remove("charter-open");
      lenis?.start();
    };
  }, [isOpen, lenis, close, goTo]);

  const viewer = (
    <div
      className="charter-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`Charte graphique ${brandName}`}
      style={{ ["--charter-accent" as string]: accent }}
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
      onCopy={preventDefault}
    >
      <div className="charter-toolbar">
        <div className="charter-toolbar-title">
          <span className="charter-dot" />
          <span>Charte graphique — {brandName}</span>
        </div>
        <div className="charter-toolbar-nav">
          <button type="button" onClick={() => goTo(currentPage - 1)} disabled={currentPage <= 1} aria-label="Page précédente">
            ↑
          </button>
          <span className="charter-counter">
            {currentPage} / {total}
          </span>
          <button type="button" onClick={() => goTo(currentPage + 1)} disabled={currentPage >= total} aria-label="Page suivante">
            ↓
          </button>
        </div>
        <button type="button" className="charter-close" onClick={close} aria-label="Fermer la charte">
          ✕
        </button>
      </div>

      <div className="charter-scroller" ref={scrollerRef} data-lenis-prevent>
        {charter.pages.map((src, index) => (
          <div
            key={src}
            className="charter-page"
            data-page={index + 1}
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            style={{ aspectRatio: `${charter.width} / ${charter.height}` }}
          >
            <Image
              src={src}
              alt={`${brandName}, page ${index + 1} sur ${total}`}
              width={charter.width}
              height={charter.height}
              sizes="(max-width: 1100px) 94vw, 1000px"
              quality={80}
              draggable={false}
              priority={index < 2}
            />
            <div className="charter-watermark" aria-hidden="true" />
          </div>
        ))}
        <p className="charter-footnote">
          Document présenté en consultation uniquement. © {brandName} — conception Edo Sokpa.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="charter-open-btn"
        onClick={() => {
          currentPageRef.current = 1;
          setCurrentPage(1);
          setIsOpen(true);
        }}
      >
        <span>Consulter la charte graphique</span>
        <span className="charter-open-count">{total} pages</span>
      </button>
      {isOpen && typeof document !== "undefined" ? createPortal(viewer, document.body) : null}
    </>
  );
}
