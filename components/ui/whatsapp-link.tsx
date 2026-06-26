"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";
import type { VariantProps } from "class-variance-authority";

interface WhatsAppLinkProps extends VariantProps<typeof buttonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Contexto del clic, para tracking de Meta Ads. */
  context?: string;
  asPlainLink?: boolean;
}

/** Enlace a WhatsApp que dispara el evento de conversión WhatsAppClick. */
export function WhatsAppLink({
  href,
  children,
  className,
  variant = "whatsapp",
  size,
  context,
  asPlainLink = false,
}: WhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("WhatsAppClick", { context })}
      className={cn(asPlainLink ? className : buttonVariants({ variant, size }), !asPlainLink && className)}
    >
      {children}
    </a>
  );
}
