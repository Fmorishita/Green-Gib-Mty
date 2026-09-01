import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/sections/section-title";
import { SEOJsonLd } from "@/components/sections/seo-json-ld";
import { faqs as defaultFaqs } from "@/lib/data/site";
import { cn } from "@/lib/utils";

interface Faq {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs?: Faq[];
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Envuelve en <section> con Container. Desactívalo si ya vas dentro de uno. */
  standalone?: boolean;
  className?: string;
}

/** JSON-LD FAQPage para rich results en Google. */
function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Lista de preguntas frecuentes con acordeón nativo (<details>). */
export function FaqList({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-xl border border-stone/40 bg-cream p-5 transition-colors hover:border-green-deep/25 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg text-green-deep">
            {faq.question}
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-deep/8 text-green-deep transition-transform duration-300 group-open:rotate-45">
              <Plus className="h-3.5 w-3.5" aria-hidden />
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-charcoal-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * Sección de preguntas frecuentes con JSON-LD FAQPage.
 * Maneja objeciones en el punto de decisión y habilita rich results.
 */
export function FaqSection({
  faqs = defaultFaqs,
  eyebrow = "Preguntas frecuentes",
  title = "Resolvemos tus dudas antes de empezar",
  description,
  standalone = true,
  className,
}: FaqSectionProps) {
  const content = (
    <>
      <SEOJsonLd data={faqJsonLd(faqs)} />
      <SectionTitle align="center" eyebrow={eyebrow} title={title} description={description} />
      <FaqList faqs={faqs} className="mx-auto mt-10 max-w-3xl" />
    </>
  );

  if (!standalone) return <div className={className}>{content}</div>;

  return (
    <section className={cn("bg-cream-dark/50 py-section", className)}>
      <Container>{content}</Container>
    </section>
  );
}
