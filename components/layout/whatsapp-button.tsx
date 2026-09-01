"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/tracking";
import { whatsappGeneral } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Botón flotante de WhatsApp, presente en todas las páginas. */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappGeneral()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("WhatsAppClick", { context: "floating-button" })}
      aria-label="Escríbenos por WhatsApp"
      className={cn(
        // En móvil la conversión la cubre MobileCtaBar; aquí solo desde md.
        "fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-float transition-all duration-300 ease-smooth hover:scale-105 md:flex",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20"
      />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-current" aria-hidden>
        <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2 7.7L.5 31.5l8-2.1c2.2 1.2 4.8 1.9 7.5 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5Zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5a12.7 12.7 0 0 1-2-6.9c0-7.1 5.8-12.8 12.9-12.8S28.8 8.9 28.8 16 23 28.8 16 28.8Zm7-9.6c-.4-.2-2.3-1.1-2.6-1.3-.3-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.2-.2.2-.4.4-.6.1-.3 0-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.6.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z" />
      </svg>
    </a>
  );
}
