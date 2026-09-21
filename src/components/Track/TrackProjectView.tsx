"use client";

import { useEffect, useRef } from "react";

type TrackProjectViewProps = {
  projectId: string;
};

export default function TrackProjectView({ projectId }: TrackProjectViewProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!projectId || hasTracked.current) return;
    if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return;

    hasTracked.current = true;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "project_view", projectId }),
    }).catch(() => null);
  }, [projectId]);

  return null;
}
