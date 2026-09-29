import React from "react";
import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Administration — Studio Edo",
  robots: { index: false, follow: false },
  // The access key lives in the URL: never send it to other pages or to /api/track.
  referrer: "no-referrer",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell antialiased">{children}</div>;
}
