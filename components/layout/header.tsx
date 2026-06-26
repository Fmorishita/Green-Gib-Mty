"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { CartButton } from "@/components/ecommerce/cart-drawer";
import { mainNav } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/** Header premium sticky con navegación principal, carrito y CTA. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-smooth",
        scrolled
          ? "border-b border-stone/30 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-cream/60 backdrop-blur-sm"
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {mainNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-green-deep"
                    : "text-charcoal-light hover:text-green-deep"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <CartButton />
          <Link
            href="/contacto"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), "hidden sm:inline-flex")}
          >
            Cotizar proyecto
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="rounded-full p-2 text-green-deep transition-colors hover:bg-green-deep/5 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMenuOpen(false)} aria-hidden />
            <motion.nav
              className="absolute right-0 top-0 flex h-full w-full max-w-xs flex-col bg-cream p-6 shadow-float"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Navegación móvil"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="rounded-full p-2 text-green-deep hover:bg-green-deep/5"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-1">
                {mainNav.map((item) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-lg px-4 py-3 text-lg font-medium transition-colors",
                        active ? "bg-green-deep/5 text-green-deep" : "text-charcoal hover:bg-green-deep/5"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/contacto"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-6")}
              >
                Cotizar mi proyecto
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
