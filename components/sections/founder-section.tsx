import { Check, FileText, MessageCircle, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { MotionSection } from "@/components/sections/motion-section";
import { PatentHighlightCard } from "@/components/sections/patent-highlight-card";
import { founder, patent, founderHome, founderAbout } from "@/lib/data/founder";
import { whatsappGeneral } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface FounderSectionProps {
  variant?: "home" | "about";
}

/** Card flotante de autoridad sobre la fotografía del fundador. */
function AuthorityCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-stone/30 bg-cream/95 p-5 shadow-soft-lg backdrop-blur",
        className
      )}
    >
      <p className="font-display text-lg leading-tight text-green-deep">{founder.name}</p>
      <p className="text-sm text-charcoal-muted">{founder.role}</p>
      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-olive/15 px-2.5 py-1 text-xs font-medium text-green-olive-dark">
        {founder.badge}
      </p>
    </div>
  );
}

/** Fotografía del fundador con card de autoridad. */
function FounderPortrait({ priority }: { priority?: boolean }) {
  return (
    <div className="relative">
      <Figure
        src={founder.photo}
        alt={founder.photoAlt}
        variant="green"
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="aspect-[4/5] w-full rounded-2xl shadow-card"
      />
      <AuthorityCard className="absolute -bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-[18rem]" />
    </div>
  );
}

export function FounderSection({ variant = "home" }: FounderSectionProps) {
  if (variant === "about") {
    return (
      <section id="fundador" className="py-section">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <MotionSection className="lg:sticky lg:top-28">
              <FounderPortrait />
            </MotionSection>

            <MotionSection delay={1} className="pt-6 lg:pt-0">
              <p className="text-eyebrow font-semibold uppercase text-green-olive">
                {founderAbout.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-display-md font-medium text-green-deep">
                {founderAbout.title}
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-charcoal-muted">
                {founderAbout.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <figure className="mt-8 border-l-2 border-terracotta pl-5">
                <Quote className="h-6 w-6 text-green-olive/40" aria-hidden />
                <blockquote className="mt-2 font-display text-xl italic text-green-deep">
                  “{founderAbout.quote}”
                </blockquote>
              </figure>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {founderAbout.trust.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-charcoal">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-olive" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </MotionSection>
          </div>

          <MotionSection className="mt-14">
            <PatentHighlightCard variant="light" showDetails />
          </MotionSection>
        </Container>
      </section>
    );
  }

  // variant === "home"
  return (
    <section id="fundador" className="bg-cream-dark/40 py-section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionSection className="order-2 lg:order-1">
            <p className="text-eyebrow font-semibold uppercase text-green-olive">
              {founderHome.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-display-md font-medium text-green-deep">
              {founderHome.title}
            </h2>
            <p className="mt-4 text-lg text-charcoal">{founderHome.subtitle}</p>
            <div className="mt-5 space-y-4 leading-relaxed text-charcoal-muted">
              {founderHome.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ul className="mt-7 space-y-3">
              {founderHome.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-charcoal">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-olive" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink href={whatsappGeneral()} variant="primary" size="lg" context="founder-home">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Hablar con Green Gib
              </WhatsAppLink>
              <a
                href={patent.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                <FileText className="h-4 w-4" aria-hidden />
                Ver patente
              </a>
            </div>
          </MotionSection>

          <MotionSection delay={1} className="order-1 mb-8 lg:order-2 lg:mb-0 lg:pl-6">
            <FounderPortrait priority />
          </MotionSection>
        </div>
      </Container>
    </section>
  );
}
