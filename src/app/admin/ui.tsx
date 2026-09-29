"use client";

import React, { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import type { ActionState } from "./actions";

/* ---------- Toasts ---------- */

type ToastAction = { label: string; onAction: () => void };
type Toast = { id: number; text: string; tone: "success" | "error"; action?: ToastAction };
type ToastInput = Omit<Toast, "id">;

const ToastContext = createContext<(t: ToastInput) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => setToasts((all) => all.filter((t) => t.id !== id)), []);

  const push = useCallback(
    (t: ToastInput) => {
      const id = ++nextId.current;
      setToasts((all) => [...all.slice(-2), { ...t, id }]);
      // Errors stay until dismissed: they carry something the user must act on.
      if (t.tone === "success") setTimeout(() => dismiss(id), t.action ? 8000 : 5000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] z-[60] flex flex-col items-center gap-2 lg:inset-x-auto lg:bottom-6 lg:right-6 lg:items-end"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.tone === "error" ? "alert" : "status"}
            className={`a-toast pointer-events-auto w-full max-w-md ${t.tone === "error" ? "a-toast--error" : ""}`}
          >
            <p className="flex-1 py-1.5">{t.text}</p>
            {t.action && (
              <button
                type="button"
                className="a-btn a-btn--secondary"
                onClick={() => {
                  t.action?.onAction();
                  dismiss(t.id);
                }}
              >
                {t.action.label}
              </button>
            )}
            <button type="button" className="a-btn a-btn--quiet" onClick={() => dismiss(t.id)}>
              Fermer
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ---------- Confirm dialog (native <dialog>: focus trap, Esc, inert background) ---------- */

export function ConfirmDialog({
  title,
  body,
  confirmLabel,
  cancelLabel = "Annuler",
  tone = "neutral",
  pending,
  onConfirm,
  onCancel,
}: {
  title: string;
  body: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: "neutral" | "danger";
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => {
      dialog.close();
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="a-dialog"
      onCancel={(e) => {
        e.preventDefault();
        if (!pending) onCancel();
      }}
    >
      <h2 id={titleId} className="a-section-title">
        {title}
      </h2>
      <div className="mt-2">{body}</div>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" className="a-btn a-btn--secondary a-btn--main" onClick={onCancel} disabled={pending} autoFocus>
          {cancelLabel}
        </button>
        <button
          type="button"
          className={`a-btn a-btn--main ${tone === "danger" ? "a-btn--danger" : "a-btn--primary"}`}
          onClick={onConfirm}
          disabled={pending}
          aria-busy={pending}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}

/* ---------- Layout pieces ---------- */

export function ScreenHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? <div className="mb-1">{eyebrow}</div> : null}
        <h1 className="a-screen-title" tabIndex={-1} data-screen-title>
          {title}
        </h1>
        {subtitle ? <p className="mt-2">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </header>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="a-panel px-6 py-10 text-center">
      <h2 className="a-section-title">{title}</h2>
      <div className="mx-auto mt-2 max-w-md">{body}</div>
      {action ? <div className="mt-6 flex flex-wrap justify-center gap-2">{action}</div> : null}
    </div>
  );
}

export function Field({
  label,
  note,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  note?: string;
  hint?: React.ReactNode;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="a-field">
      <label htmlFor={htmlFor} className="a-label">
        {label} {note ? <span className="a-label-note">— {note}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="a-error">
          {error}
        </p>
      ) : null}
      {hint ? (
        <div id={`${htmlFor}-hint`} className="a-hint">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Environment hooks ---------- */

// Dates depend on the viewer's timezone; render them only after hydration.
export function useNow(intervalMs = 60000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
}

function isAuthFailure(message?: string) {
  return !!message && message.startsWith("Accès non autorisé");
}

// `undefined` means the request never got an answer (network, server down).
export function useActionFailure() {
  const toast = useToast();
  return useCallback(
    (res: ActionState | undefined, fallback: string) => {
      if (res === undefined) {
        toast({ tone: "error", text: "Le serveur ne répond pas : rien n’a été modifié. Vérifie ta connexion, puis réessaie." });
      } else if (isAuthFailure(res?.message)) {
        toast({
          tone: "error",
          text: "Ta clé d’accès n’est plus valide : rien n’a été modifié.",
          action: { label: "Se reconnecter", onAction: () => window.location.assign("/admin") },
        });
      } else {
        toast({ tone: "error", text: fallback });
      }
    },
    [toast]
  );
}
