interface SEOJsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Inyecta JSON-LD estructurado para SEO. */
export function SEOJsonLd({ data }: SEOJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
