"use client";

import React from "react";
import StatsGrid from "./StatsGrid";

type Project = {
  id: string;
  title: string;
  _count: { views: number };
  coverImage: string;
};

type Props = {
  stats: {
    visits: number;
    views: number;
    unreadMessages: number;
  };
  projectCount: number;
  topProjects: Project[];
};

export default function DashboardOverview({ stats, projectCount, topProjects }: Props) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white font-clash uppercase">Dashboard</h2>
        <p className="text-sm text-zinc-500">Vue d&apos;ensemble de l&apos;activité de votre portfolio.</p>
      </div>

      <StatsGrid stats={stats} projectCount={projectCount} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Top Projects */}
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs font-clash">Top Projets</h3>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Par vues</span>
          </div>
          <div className="space-y-4">
            {topProjects.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 group">
                <div className="text-xs font-bold text-zinc-700 w-4">{i + 1}</div>
                <div className="h-10 w-14 overflow-hidden rounded bg-zinc-900 flex-shrink-0 relative">
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{p.title}</div>
                </div>
                <div className="text-sm font-bold text-[#e1ff01]">{p._count.views} <span className="text-[10px] text-zinc-600 font-normal">vues</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips or something else */}
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-center items-center text-center">
          <div className="h-12 w-12 rounded-full bg-[#e1ff01]/10 flex items-center justify-center text-[#e1ff01] mb-4">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
          </div>
          <h3 className="font-bold text-white mb-2">Conseil de performance</h3>
          <p className="text-sm text-zinc-500 max-w-xs">
            Assurez-vous que vos images de couverture sont optimisées pour le web (moins de 500KB) pour garantir un chargement rapide.
          </p>
        </div>

      </div>
    </div>
  );
}
