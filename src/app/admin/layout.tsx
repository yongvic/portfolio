import React from "react";
import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Studio — Administration",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell font-sans antialiased">{children}</div>;
}
