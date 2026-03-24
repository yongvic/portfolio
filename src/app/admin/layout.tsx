import React from "react";
import Link from "next/link";
import { TechLogos } from "@/components/techlogo/TechLogos";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-400 selection:bg-white/10 selection:text-white font-sans">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-zinc-950 hidden lg:flex flex-col">
        <div className="flex h-16 items-center px-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <TechLogos.brand />
            <span className="text-sm font-semibold tracking-tight text-white">Edo Console</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="px-3 pb-2 pt-4 text-[10px] font-medium uppercase tracking-widest text-zinc-500">Menu</div>
          <SidebarItem href="/admin" icon="dashboard" label="Overview" active />
          <SidebarItem href="/admin?view=projects" icon="projects" label="Projects" />
          <SidebarItem href="/admin?view=messages" icon="mail" label="Messages" disabled />
          
          <div className="px-3 pb-2 pt-8 text-[10px] font-medium uppercase tracking-widest text-zinc-500">Settings</div>
          <SidebarItem href="/admin?view=settings" icon="settings" label="Site Config" disabled />
        </nav>

        <div className="p-4 mt-auto">
          <Link href="/" className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-all">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-zinc-950/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
             <div className="lg:hidden">
                <TechLogos.brand />
             </div>
             <div className="h-4 w-px bg-white/10 hidden lg:block" />
             <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                <span>Edo</span>
                <span>/</span>
                <span className="text-zinc-200">Admin</span>
             </div>
          </div>

          <div className="flex items-center gap-5">
             <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-2 py-1 text-[10px] text-zinc-400">
                <span className="font-sans">⌘</span>
                <span>K</span>
             </div>
             <div className="h-8 w-8 rounded-full bg-zinc-800 border border-white/10 overflow-hidden flex items-center justify-center">
                <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
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

function SidebarItem({ href, icon, label, active = false, disabled = false }: { href: string; icon: string; label: string; active?: boolean; disabled?: boolean }) {
  const icons: Record<string, React.ReactNode> = {
    dashboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
    projects: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
    mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  };

  return (
    <Link
      href={disabled ? "#" : href}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active 
          ? "bg-white/10 text-white" 
          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
      } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
    >
      <svg className={`h-4 w-4 ${active ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icons[icon]}
      </svg>
      {label}
    </Link>
  );
}
