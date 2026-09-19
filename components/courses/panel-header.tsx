"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { LogOut, LayoutGrid, BookOpen, Loader2 } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { signOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

/** Barra superior del panel privado. */
export function PanelHeader({ userName, email }: { userName: string | null; email: string }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const initial = (userName || email || "?").trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-stone/30 bg-cream/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Panel">
            <Link
              href="/mi-cuenta"
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-charcoal-light transition-colors hover:bg-green-deep/5 hover:text-green-deep"
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
              Mis cursos
            </Link>
            <Link
              href="/cursos"
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-charcoal-light transition-colors hover:bg-green-deep/5 hover:text-green-deep"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Catálogo
            </Link>
          </nav>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="flex items-center gap-2.5 rounded-full border border-stone/40 py-1.5 pl-1.5 pr-3.5 transition-colors hover:border-green-deep/30"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-deep text-sm font-semibold text-cream">
              {initial}
            </span>
            <span className="hidden max-w-[10rem] truncate text-sm font-medium text-charcoal sm:block">
              {userName || email}
            </span>
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
              <div
                role="menu"
                className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-xl border border-stone/40 bg-cream shadow-float"
              >
                <div className="border-b border-stone/30 px-4 py-3">
                  <p className="truncate text-sm font-medium text-charcoal">{userName || "Mi cuenta"}</p>
                  <p className="truncate text-xs text-charcoal-light">{email}</p>
                </div>
                <Link
                  href="/cursos"
                  role="menuitem"
                  className="block px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-cream-dark sm:hidden"
                >
                  Catálogo de cursos
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  disabled={isPending}
                  onClick={() => startTransition(() => { void signOut(); })}
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-charcoal transition-colors hover:bg-cream-dark",
                    isPending && "opacity-60"
                  )}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <LogOut className="h-4 w-4" aria-hidden />
                  )}
                  Cerrar sesión
                </button>
              </div>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
