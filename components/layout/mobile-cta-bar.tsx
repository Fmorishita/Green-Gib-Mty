"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, CalendarCheck } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { whatsappGeneral } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Barra de conversión fija en móvil.
 *
 * En pantallas pequeñas el CTA del header queda oculto, así que el prospecto
 * puede recorrer toda la página sin una acción a la mano. Esta barra mantiene
 * las dos vías de contacto siempre visibles después del primer scroll.
 *
 * Se oculta en /contacto y /gracias, donde ya existe la acción principal.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/contacto") || pathname.startsWith("/gracias")) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-stone/40 bg-cream/95 backdrop-blur-md transition-transform duration-300 ease-smooth md:hidden",
        "pb-[env(safe-area-inset-bottom)]",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center gap-2.5 px-4 py-3">
        <Link
          href="/contacto"
          onClick={() => trackEvent("Contact", { context: "mobile-cta-bar" })}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-green-deep px-4 py-3 text-sm font-medium text-cream transition-colors active:bg-green-deep/90"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden />
          Cotizar proyecto
        </Link>
        <a
          href={whatsappGeneral()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("WhatsAppClick", { context: "mobile-cta-bar" })}
          aria-label="Escríbenos por WhatsApp"
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform active:scale-95"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
