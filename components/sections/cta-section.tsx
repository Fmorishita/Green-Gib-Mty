import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { MotionSection } from "@/components/sections/motion-section";
import { whatsappQuote } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  whatsappLabel?: string;
  whatsappHref?: string;
  context?: string;
}

/** Banda de llamada a la acción reutilizable al cierre de las páginas. */
export function CTASection({
  eyebrow = "Demos el primer paso",
  title = "¿Listo para transformar tu espacio?",
  description = "Cuéntanos sobre tu proyecto y te entregamos una propuesta clara, con diseño, alcance y presupuesto. Sin compromiso.",
  primaryLabel = "Cotizar mi proyecto",
  primaryHref = "/contacto",
  whatsappLabel = "Escríbenos por WhatsApp",
  whatsappHref,
  context = "cta-section",
}: CTASectionProps) {
  return (
    <section className="py-section-sm">
      <Container>
        <MotionSection className="relative overflow-hidden rounded-2xl bg-green-deep px-6 py-14 text-center sm:px-12 sm:py-20">
          <Figure
            src="Jardín San Pedro iluminación nocturna"
            alt=""
            variant="green"
            sizes="100vw"
            className="absolute inset-0 h-full w-full"
          />
          <div aria-hidden className="absolute inset-0 bg-green-deep/85" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-green-olive/25 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="mb-3 text-eyebrow font-semibold uppercase text-sand">{eyebrow}</p>
            <h2 className="font-display text-display-md font-medium text-cream">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-cream/80">{description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={primaryHref} className={cn(buttonVariants({ variant: "terracotta", size: "lg" }))}>
                {primaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <WhatsAppLink
                href={whatsappHref ?? whatsappQuote()}
                size="lg"
                context={context}
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {whatsappLabel}
              </WhatsAppLink>
            </div>
          </div>
        </MotionSection>
      </Container>
    </section>
  );
}
