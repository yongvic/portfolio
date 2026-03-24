"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function TrackVisit() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPathRef.current === pathname) return;
    if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return;

    lastPathRef.current = pathname;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visit", path: pathname }),
    }).catch(() => null);
  }, [pathname]);

  return null;
}
