import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Images, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { ConversionTracker } from "@/components/analytics/conversion-tracker";
import { whatsappGeneral } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "¡Gracias por tu mensaje!",
    description: "Hemos recibido tu solicitud. Te contactaremos a la brevedad.",
    path: "/gracias",
  }),
  robots: { index: false, follow: false },
};

const steps = [
  {
    icon: Clock3,
    title: "Te contactamos pronto",
    description: "Revisamos tu solicitud y te escribimos en menos de 24 horas hábiles.",
  },
  {
    icon: MessageCircle,
    title: "Conversamos tu proyecto",
    description: "Entendemos tu espacio, tus objetivos y resolvemos tus dudas iniciales.",
  },
  {
    icon: CheckCircle2,
    title: "Coordinamos tu valoración",
    description: "Agendamos una visita o videollamada para preparar tu propuesta.",
  },
];

export default function GraciasPage() {
  return (
    <>
      {/* Evento de conversión preparado para Meta Pixel */}
      <ConversionTracker event="Lead" params={{ source: "gracias-page" }} />

      <section className="flex min-h-[80vh] items-center py-section">
        <Container size="narrow" className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-olive/15">
            <CheckCircle2 className="h-10 w-10 text-green-olive" aria-hidden />
          </div>
          <h1 className="mt-8 font-display text-display-lg font-medium text-green-deep">
            ¡Gracias! Hemos recibido tu solicitud
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-charcoal-muted">
            Uno de nuestros especialistas en paisajismo revisará tu mensaje y se pondrá en contacto
            contigo muy pronto. Mientras tanto, te invitamos a conocer más de nuestro trabajo.
          </p>

          <div className="mt-10 grid gap-5 text-left sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-xl border border-stone/40 bg-cream p-6">
                <div className="flex items-center gap-2 text-green-olive">
                  <step.icon className="h-5 w-5" aria-hidden />
                  <span className="text-sm font-semibold text-green-deep">Paso {i + 1}</span>
                </div>
                <h2 className="mt-3 font-display text-lg text-green-deep">{step.title}</h2>
                <p className="mt-1.5 text-sm text-charcoal-muted">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppLink href={whatsappGeneral()} size="lg" context="gracias-page">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Adelantar por WhatsApp
            </WhatsAppLink>
            <Link href="/portafolio" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
              <Images className="h-4 w-4" aria-hidden />
              Ver portafolio
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
