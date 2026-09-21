import React from "react";
import Link from "next/link";
import { TechLogos } from "@/components/techlogo/TechLogos";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-300 selection:bg-lime-400 selection:text-black font-sans">
      {/* Sidebar Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-zinc-950 hidden lg:flex flex-col">
        <div className="flex h-16 items-center px-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <TechLogos.brand />
            <span className="text-sm font-semibold tracking-tight text-white">Edo Studio Console</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="px-3 pb-2 pt-4 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            Navigation
          </div>
          <SidebarNav />
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <Link
            href="/"
            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voir le portfolio live
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-zinc-950/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <TechLogos.brand />
            </div>
            <div className="h-4 w-px bg-white/10 hidden lg:block" />
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <span className="text-zinc-500">Edo Studio</span>
              <span>/</span>
              <span className="text-white font-semibold">Console d&apos;administration</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Système actif</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarNav() {
  return (
    <div className="space-y-1">
      <Link
        href="/admin"
        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
      >
        <svg className="h-4 w-4 text-zinc-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span>Vue d&apos;ensemble</span>
      </Link>

      <Link
        href="/admin?view=projects"
        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
      >
        <svg className="h-4 w-4 text-zinc-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span>Gestion des Projets</span>
      </Link>

      <Link
        href="/admin?view=messages"
        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
      >
        <svg className="h-4 w-4 text-zinc-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>Messagerie de Briefs</span>
      </Link>
    </div>
  );
}
