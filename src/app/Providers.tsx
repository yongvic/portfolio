"use client";

import ReactLenis from "lenis/react";
import { usePathname } from "next/navigation";
import CursorBubble from "@/components/CursorBubble/CursorBubble";
import TrackVisit from "@/components/Track/TrackVisit";

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
      <TrackVisit />
      {children}
      <CursorBubble />
    </ReactLenis>
  );
}
