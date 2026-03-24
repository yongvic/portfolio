"use client";

import ReactLenis from "lenis/react";
import CursorBubble from "@/components/CursorBubble/CursorBubble";
import TrackVisit from "@/components/Track/TrackVisit";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <TrackVisit />
      {children}
      <CursorBubble />
    </ReactLenis>
  );
}
