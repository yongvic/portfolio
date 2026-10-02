"use client";

import ReactLenis, { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorBubble from "@/components/CursorBubble/CursorBubble";
import TrackVisit from "@/components/Track/TrackVisit";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The admin is a work tool: no smooth-scroll hijack, no decorative cursor.
  if (pathname?.startsWith("/admin")) {
    return (
      <>
        <TrackVisit />
        {children}
      </>
    );
  }

  return (
    <ReactLenis root>
      <LenisScrollTriggerSync />
      <TrackVisit />
      {children}
      <CursorBubble />
    </ReactLenis>
  );
}
