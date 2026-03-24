"use client";

import React, { useActionState } from "react";
import { deleteMessageAction, markMessageReadAction } from "../actions";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
};

type Props = {
  messages: Message[];
  adminKey: string;
};

export default function MessageManager({ messages, adminKey }: Props) {
  const [, deleteFormAction] = useActionState(deleteMessageAction, null);
  const [, readFormAction] = useActionState(markMessageReadAction, null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white font-clash uppercase">Messages</h2>
        <p className="text-sm text-zinc-500">Gérez les prises de contact de vos visiteurs.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`group relative overflow-hidden rounded-3xl border transition-all ${
              msg.isRead 
                ? "border-white/5 bg-white/[0.01]" 
                : "border-[#e1ff01]/20 bg-[#e1ff01]/5 ring-1 ring-[#e1ff01]/10"
            }`}
          >
            <div className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white">{msg.name}</h3>
                    {!msg.isRead && (
                      <span className="rounded-full bg-[#e1ff01] px-2 py-0.5 text-[10px] font-bold text-black uppercase">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-400">{msg.email}</div>
                  <div className="text-xs text-zinc-500">
                    {new Date(msg.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <form action={readFormAction}>
                    <input type="hidden" name="key" value={adminKey} />
                    <input type="hidden" name="id" value={msg.id} />
                    <input type="hidden" name="isRead" value={(!msg.isRead).toString()} />
                    <button
                      className={`flex h-10 items-center gap-2 rounded-full px-4 text-xs font-bold transition-all ${
                        msg.isRead
                          ? "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                          : "bg-[#e1ff01] text-black hover:scale-105"
                      }`}
                    >
                      {msg.isRead ? "Marquer comme non lu" : "Marquer comme lu"}
                    </button>
                  </form>

                  <form action={deleteFormAction}>
                    <input type="hidden" name="key" value={adminKey} />
                    <input type="hidden" name="id" value={msg.id} />
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-rose-500/60 transition-all hover:bg-rose-500/20 hover:text-rose-500"
                      onClick={(e) => {
                        if (!confirm("Supprimer ce message ?")) e.preventDefault();
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-zinc-300">
                {msg.message}
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-12 text-center">
            <p className="text-zinc-500 italic">Aucun message pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
