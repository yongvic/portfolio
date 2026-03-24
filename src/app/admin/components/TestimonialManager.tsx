"use client";

import React, { useActionState, useState } from "react";
import { upsertTestimonialAction, deleteTestimonialAction } from "../actions";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string | null;
  quote: string;
};

type Props = {
  testimonials: Testimonial[];
  adminKey: string;
};

export default function TestimonialManager({ testimonials, adminKey }: Props) {
  const [upsertState, upsertFormAction, isUpsertPending] = useActionState(upsertTestimonialAction, null);
  const [deleteState, deleteFormAction] = useActionState(deleteTestimonialAction, null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const testimonialToEdit = editingId ? testimonials.find(t => t.id === editingId) : null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white font-clash uppercase">Témoignages</h2>
        <p className="text-sm text-zinc-500">Ce que les clients disent de votre travail.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* List */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04]"
            >
              <div className="flex flex-col h-full justify-between gap-4">
                <blockquote className="text-sm italic text-zinc-400 leading-relaxed line-clamp-4">
                  &quot;{t.quote}&quot;
                </blockquote>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}{t.company ? ` @ ${t.company}` : ""}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(t.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:bg-[#e1ff01]/20 hover:text-[#e1ff01]"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <form action={deleteFormAction}>
                      <input type="hidden" name="key" value={adminKey} />
                      <input type="hidden" name="id" value={t.id} />
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-rose-500/60 hover:bg-rose-500/20 hover:text-rose-500"
                        onClick={(e) => {
                          if (!confirm("Supprimer ce témoignage ?")) e.preventDefault();
                        }}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {testimonials.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-white/10 p-12 text-center text-zinc-500 italic">
              Aucun témoignage.
            </div>
          )}
        </div>

        {/* Form */}
        <div>
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-xl backdrop-blur-sm">
            <h3 className="mb-6 text-lg font-bold text-white font-clash uppercase">
              {editingId ? "Édition Témoignage" : "Nouveau Témoignage"}
            </h3>

            <form action={upsertFormAction} className="space-y-4">
              <input type="hidden" name="key" value={adminKey} />
              <input type="hidden" name="id" value={editingId ?? ""} />

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-1">Nom</label>
                <input
                  name="name"
                  required
                  defaultValue={testimonialToEdit?.name}
                  className="w-full h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-[#e1ff01]/50 focus:bg-white/[0.08]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-1">Rôle</label>
                <input
                  name="role"
                  required
                  defaultValue={testimonialToEdit?.role}
                  className="w-full h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-[#e1ff01]/50 focus:bg-white/[0.08]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-1">Entreprise</label>
                <input
                  name="company"
                  defaultValue={testimonialToEdit?.company ?? ""}
                  className="w-full h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-[#e1ff01]/50 focus:bg-white/[0.08]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-1">Citation</label>
                <textarea
                  name="quote"
                  required
                  rows={4}
                  defaultValue={testimonialToEdit?.quote}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white focus:border-[#e1ff01]/50 focus:bg-white/[0.08]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  disabled={isUpsertPending}
                  className="flex-1 h-12 rounded-full bg-[#e1ff01] text-xs font-bold text-black hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-6 rounded-full border border-white/10 text-xs font-bold text-zinc-400 hover:text-white"
                  >
                    Annuler
                  </button>
                )}
              </div>

              {upsertState?.message && (
                <div className={`mt-4 rounded-xl p-3 text-center text-xs font-bold border ${
                  upsertState.success ? "bg-[#e1ff01]/10 text-[#e1ff01] border-[#e1ff01]/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                }`}>
                  {upsertState.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
