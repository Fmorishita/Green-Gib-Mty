import type { Metadata } from "next";
import { resolveImageSrc } from "@/lib/placeholder";

export const SITE_NAME = "Green Gib";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const SITE_DESCRIPTION =
  "Paisajismo premium, diseño de jardines, muros verdes y decoración exterior en Monterrey. Transformamos espacios residenciales, comerciales y arquitectónicos.";

export const DEFAULT_KEYWORDS = [
  "paisajismo Monterrey",
  "diseño de jardines Monterrey",
  "jardines verticales Monterrey",
  "muros verdes Monterrey",
  "decoración exterior Monterrey",
  "mantenimiento de jardines Monterrey",
  "jardines residenciales Monterrey",
  "diseño de terrazas Monterrey",
  "jardinería premium Monterrey",
  "paisajismo residencial Monterrey",
];

interface PageMetaParams {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
}

function imageUrl(image: string): string {
  const resolved = resolveImageSrc(image);
  return resolved.startsWith("/") ? `${SITE_URL}${resolved}` : resolved;
}

/** Genera Metadata consistente para cada página. */
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = "/images/og-default.jpg",
  keywords = DEFAULT_KEYWORDS,
}: PageMetaParams): Metadata {
  const url = `${SITE_URL}${path}`;
  const resolvedImage = imageUrl(image);
  const fullTitle =
    path === "/" ? `${SITE_NAME} — Paisajismo Premium en Monterrey` : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_MX",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: resolvedImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [resolvedImage],
    },
  };
}

/** JSON-LD: LocalBusiness. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/images/og-default.jpg`,
    priceRange: "$$$",
    areaServed: {
      "@type": "City",
      name: "Monterrey",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Monterrey",
      addressRegion: "Nuevo León",
      addressCountry: "MX",
    },
    sameAs: ["https://www.instagram.com/greengib"],
  };
}

/** JSON-LD: Product. */
export function productJsonLd(params: {
  name: string;
  description: string;
  image: string;
  price: number;
  slug: string;
  availability: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: params.name,
    description: params.description,
    image: imageUrl(params.image),
    url: `${SITE_URL}/tienda/${params.slug}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: params.price,
      availability: params.availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}

/** JSON-LD: BlogPosting / Article. */
export function articleJsonLd(params: {
  title: string;
  description: string;
  image: string;
  slug: string;
  datePublished: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    image: imageUrl(params.image),
    url: `${SITE_URL}/blog/${params.slug}`,
    datePublished: params.datePublished,
    author: { "@type": "Organization", name: params.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/brand/logo.svg` },
    },
  };
}

/** JSON-LD: BreadcrumbList. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
