"use client";

import React from "react";

type StatsProps = {
  stats: {
    visits: number;
    views: number;
    unreadMessages: number;
  };
  projectCount: number;
};

export default function StatsGrid({ stats, projectCount }: StatsProps) {
  const items = [
    { label: "Visites Totales", value: stats.visits, icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
    { label: "Vues Projets", value: stats.views, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { label: "Messages non lus", value: stats.unreadMessages, icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z", color: stats.unreadMessages > 0 ? "text-rose-400" : "text-zinc-400" },
    { label: "Projets Actifs", value: projectCount, icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors group-hover:text-zinc-400">
                {item.label}
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">{item.value}</h3>
            </div>
            <div className={`rounded-2xl bg-white/5 p-3 transition-colors group-hover:bg-white/10 ${item.color || "text-zinc-400 group-hover:text-[#e1ff01]"}`}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#e1ff01] transition-all group-hover:w-full" />
        </div>
      ))}
    </div>
  );
}
