import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Instagram, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/sections/section-title";
import { ContactForm } from "@/components/forms/contact-form";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { Figure } from "@/components/ui/figure";
import { siteConfig, faqs } from "@/lib/data/site";
import { whatsappGeneral } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contacto — Cotiza tu proyecto de paisajismo",
  description:
    "Contáctanos para cotizar tu proyecto de paisajismo en Monterrey. Formulario, WhatsApp y correo. Atendemos Monterrey y zona metropolitana.",
  path: "/contacto",
});

export default function ContactoPage({
  searchParams,
}: {
  searchParams: { servicio?: string };
}) {
  const source = searchParams.servicio ? `contacto:${searchParams.servicio}` : "contacto";

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Cuéntanos sobre tu proyecto"
        description="Cada gran espacio empieza con una conversación. Completa el formulario o escríbenos por WhatsApp y te respondemos a la brevedad."
        image="Contacto Green Gib paisajismo"
        size="sm"
      />

      <section className="py-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            {/* Formulario */}
            <div>
              <h2 className="font-display text-display-sm font-medium text-green-deep">
                Solicita tu cotización
              </h2>
              <p className="mt-2 text-charcoal-muted">
                Mientras más nos cuentes, mejor podremos orientarte. Todos los campos marcados con
                <span className="text-terracotta"> *</span> son obligatorios.
              </p>
              <div className="mt-8">
                <ContactForm source={source} defaultProjectType={searchParams.servicio} />
              </div>
            </div>

            {/* Información de contacto */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-stone/40 bg-cream p-7">
                <h3 className="font-display text-xl text-green-deep">Datos de contacto</h3>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-green-deep/8 text-green-deep">
                      <MapPin className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-medium text-charcoal">Área de servicio</p>
                      <p className="text-charcoal-muted">{siteConfig.serviceArea}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-green-deep/8 text-green-deep">
                      <Mail className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-medium text-charcoal">Correo</p>
                      <a href={`mailto:${siteConfig.email}`} className="text-charcoal-muted hover:text-green-deep">
                        {siteConfig.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-green-deep/8 text-green-deep">
                      <Instagram className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-medium text-charcoal">Instagram</p>
                      <a href={siteConfig.instagram} className="text-charcoal-muted hover:text-green-deep">
                        {siteConfig.instagramHandle}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-green-deep/8 text-green-deep">
                      <Clock className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-medium text-charcoal">Horario de atención</p>
                      <p className="text-charcoal-muted">Lun a Sáb · 9:00 a 18:00</p>
                    </div>
                  </li>
                </ul>
                <WhatsAppLink href={whatsappGeneral()} size="lg" context="contacto-sidebar" className="mt-6 w-full">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Escríbenos por WhatsApp
                </WhatsAppLink>
              </div>

              {/* Cobertura visual */}
              <div className="overflow-hidden rounded-2xl border border-stone/40">
                <Figure
                  src="Mapa de cobertura Monterrey zona metropolitana"
                  alt="Cobertura de Green Gib en Monterrey y zona metropolitana"
                  variant="green"
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-cream-dark/50 py-section">
        <Container size="narrow">
          <SectionTitle align="center" eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-stone/40 bg-cream p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg text-green-deep">
                  {faq.question}
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-deep/8 text-green-deep transition-transform group-open:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-charcoal-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
