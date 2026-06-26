import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
import { Badge } from "@/components/ui/badge";
import { ArticleContent } from "@/components/sections/article-content";
import { SectionTitle } from "@/components/sections/section-title";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { SEOJsonLd } from "@/components/sections/seo-json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { blogPosts, getPostBySlug, getPublishedPosts } from "@/lib/data/blog";
import { whatsappValuation } from "@/lib/whatsapp";
import { formatDate } from "@/lib/utils";
import { pageMetadata, articleJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return pageMetadata({ title: "Artículo", path: "/blog" });
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover_image,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getPublishedPosts()
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);
  const fallback =
    related.length > 0 ? related : getPublishedPosts().filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <SEOJsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          image: post.cover_image,
          slug: post.slug,
          datePublished: post.created_at,
          author: post.author,
        })}
      />

      <article>
        <header className="pt-section-sm">
          <Container size="narrow">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-green-olive-dark transition-colors hover:text-green-deep"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Volver al blog
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <Badge variant="olive">{post.category}</Badge>
              <span className="text-sm text-charcoal-muted">{post.readingTime} de lectura</span>
            </div>
            <h1 className="mt-4 font-display text-display-lg font-medium text-green-deep">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-charcoal-muted">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
            </div>
          </Container>
        </header>

        <Container size="narrow" className="py-section-sm">
          <Figure
            src={post.cover_image}
            alt={post.title}
            variant="green"
            priority
            className="aspect-[16/9] w-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 768px"
          />

          <div className="mt-12">
            <ArticleContent content={post.content} />
          </div>

          {/* CTA intermedio */}
          <div className="mt-12 rounded-2xl bg-green-deep p-8 text-center text-cream sm:p-10">
            <h2 className="font-display text-2xl font-medium">
              ¿Quieres aplicar esto en tu espacio?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-cream/80">
              Agenda una valoración y te ayudamos a llevar estas ideas a tu jardín, terraza o área
              exterior.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-terracotta px-6 font-medium text-cream transition-colors hover:bg-terracotta-dark"
              >
                Agendar valoración
              </Link>
              <WhatsAppLink href={whatsappValuation()} context={`blog-${post.slug}`}>
                <MessageCircle className="h-4 w-4" aria-hidden />
                Escríbenos por WhatsApp
              </WhatsAppLink>
            </div>
          </div>
        </Container>
      </article>

      {fallback.length > 0 && (
        <section className="bg-cream-dark/50 py-section">
          <Container>
            <SectionTitle eyebrow="Sigue leyendo" title="Artículos relacionados" />
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {fallback.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone/40 bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <Figure
                    src={p.cover_image}
                    alt={p.title}
                    variant="sand"
                    className="aspect-[16/10] w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <Badge variant="olive" className="w-fit">
                      {p.category}
                    </Badge>
                    <h3 className="mt-3 font-display text-lg leading-snug text-green-deep transition-colors group-hover:text-green-olive-dark">
                      {p.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-olive-dark">
                      Leer
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
