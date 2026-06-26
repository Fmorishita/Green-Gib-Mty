import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { CTASection } from "@/components/sections/cta-section";
import { Figure } from "@/components/ui/figure";
import { Badge } from "@/components/ui/badge";
import { MotionStagger, MotionItem } from "@/components/sections/motion-section";
import { getPublishedPosts } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog y guías de paisajismo",
  description:
    "Ideas, guías y consejos de paisajismo, jardines y plantas para el clima de Monterrey. Aprende a aprovechar tus espacios exteriores.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog y guías"
        title="Ideas para vivir mejor tus espacios exteriores"
        description="Consejos prácticos de diseño, plantas y mantenimiento pensados para el clima y el estilo de vida de Monterrey."
        image="Blog de paisajismo Green Gibb"
        variant="olive"
        size="sm"
      />

      <section className="py-section">
        <Container>
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mb-12 grid overflow-hidden rounded-2xl border border-stone/40 bg-cream shadow-soft lg:grid-cols-2"
            >
              <div className="relative min-h-[260px] overflow-hidden">
                <Figure
                  src={featured.cover_image}
                  alt={featured.title}
                  variant="green"
                  priority
                  className="absolute inset-0 h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <div className="flex items-center gap-3">
                  <Badge variant="olive">{featured.category}</Badge>
                  <span className="text-sm text-charcoal-muted">{featured.readingTime} de lectura</span>
                </div>
                <h2 className="mt-4 font-display text-display-sm font-medium text-green-deep transition-colors group-hover:text-green-olive-dark">
                  {featured.title}
                </h2>
                <p className="mt-3 text-charcoal-muted">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-green-olive-dark">
                  Leer artículo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          )}

          <MotionStagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <MotionItem key={post.id} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone/40 bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <Figure
                    src={post.cover_image}
                    alt={post.title}
                    variant="sand"
                    className="aspect-[16/10] w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-charcoal-muted">
                      <Badge variant="olive">{post.category}</Badge>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl leading-snug text-green-deep transition-colors group-hover:text-green-olive-dark">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-muted">
                      {post.excerpt}
                    </p>
                    <time className="mt-4 text-xs text-charcoal-muted" dateTime={post.created_at}>
                      {formatDate(post.created_at)}
                    </time>
                  </div>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <CTASection
        title="¿Listo para pasar de la idea al espacio?"
        description="Te ayudamos a aplicar estas ideas en tu propio jardín, terraza o área exterior."
      />
    </>
  );
}
