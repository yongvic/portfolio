"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { adminPath, parseAdminRoute, type AdminRoute } from "./admin-path";
import { ConfirmDialog } from "./ui";

type NavContextValue = {
  adminKey: string;
  route: AdminRoute;
  href: (route: AdminRoute) => string;
  go: (route: AdminRoute, opts?: { replace?: boolean; force?: boolean }) => void;
  setLeaveGuard: (message: string | null) => void;
};

const NavContext = createContext<NavContextValue | null>(null);

export function useAdminNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useAdminNav must be used inside AdminNavProvider");
  return ctx;
}

export function AdminNavProvider({ adminKey, children }: { adminKey: string; children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const route = useMemo(() => parseAdminRoute(searchParams), [searchParams]);
  const guardRef = useRef<string | null>(null);
  const [pending, setPending] = useState<{ route: AdminRoute; replace?: boolean } | null>(null);

  const href = useCallback((r: AdminRoute) => adminPath(adminKey, r), [adminKey]);

  // pushState keeps back/forward and reload working without a server round-trip:
  // all admin data is already on the page.
  const commit = useCallback(
    (r: AdminRoute, replace?: boolean) => {
      const url = adminPath(adminKey, r);
      if (replace) window.history.replaceState(null, "", url);
      else window.history.pushState(null, "", url);
    },
    [adminKey]
  );

  const go = useCallback<NavContextValue["go"]>(
    (r, opts) => {
      if (guardRef.current && !opts?.force) {
        setPending({ route: r, replace: opts?.replace });
        return;
      }
      commit(r, opts?.replace);
    },
    [commit]
  );

  const setLeaveGuard = useCallback((message: string | null) => {
    guardRef.current = message;
  }, []);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!guardRef.current) return;
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  const value = useMemo(() => ({ adminKey, route, href, go, setLeaveGuard }), [adminKey, route, href, go, setLeaveGuard]);

  return (
    <NavContext.Provider value={value}>
      {children}
      {pending && (
        <ConfirmDialog
          title="Quitter sans enregistrer ?"
          body={`${guardRef.current ?? ""} Elles restent gardées sur cet appareil : tu les retrouveras en rouvrant ce projet.`}
          cancelLabel="Continuer l’édition"
          confirmLabel="Quitter"
          onCancel={() => setPending(null)}
          onConfirm={() => {
            const target = pending;
            setPending(null);
            commit(target.route, target.replace);
          }}
        />
      )}
    </NavContext.Provider>
  );
}

export function BackLink({ to, label }: { to: AdminRoute; label: string }) {
  return (
    <AdminLink to={to} className="a-link -ml-0.5 no-underline">
      ← {label}
    </AdminLink>
  );
}

type AdminLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: AdminRoute;
  replace?: boolean;
};

export function AdminLink({ to, replace, onClick, children, ...rest }: AdminLinkProps) {
  const { href, go } = useAdminNav();
  return (
    <a
      {...rest}
      href={href(to)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        go(to, { replace });
      }}
    >
      {children}
    </a>
  );
}
