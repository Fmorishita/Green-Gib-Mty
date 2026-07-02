import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/sections/section-title";
import { ProductCard } from "@/components/cards/product-card";
import { ProductGallery } from "@/components/ecommerce/product-gallery";
import { ProductPurchase } from "@/components/ecommerce/product-purchase";
import { Badge } from "@/components/ui/badge";
import { SEOJsonLd } from "@/components/sections/seo-json-ld";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { pageMetadata, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return pageMetadata({ title: "Producto", path: "/tienda" });
  return pageMetadata({
    title: product.name,
    description: product.description,
    path: `/tienda/${product.slug}`,
    image: product.images[0],
  });
}

export default function ProductoDetallePage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
      <SEOJsonLd
        data={productJsonLd({
          name: product.name,
          description: product.description,
          image: product.images[0],
          price: product.price,
          slug: product.slug,
          availability: product.stock > 0,
        })}
      />

      <section className="pt-section-sm">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Tienda", path: "/tienda" },
              { name: product.name, path: `/tienda/${product.slug}` },
            ]}
          />
        </Container>
      </section>

      <section className="py-section-sm">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery
              images={product.images}
              name={product.name}
              productId={product.id}
              price={product.price}
            />

            <div className="lg:py-4">
              <Badge variant="olive">{product.category}</Badge>
              <h1 className="mt-4 font-display text-display-sm font-medium text-green-deep">
                {product.name}
              </h1>
              <p className="mt-4 font-display text-3xl font-medium text-green-deep">
                {formatPrice(product.price)}
              </p>

              <p className="mt-2 flex items-center gap-2 text-sm">
                {product.stock > 0 ? (
                  <>
                    <Check className="h-4 w-4 text-green-olive" aria-hidden />
                    <span className="text-green-olive-dark">
                      {product.availability}
                      {product.stock <= 5 && ` · últimas ${product.stock} piezas`}
                    </span>
                  </>
                ) : (
                  <span className="text-terracotta-dark">Temporalmente agotado</span>
                )}
              </p>

              <div className="mt-6 border-t border-stone/40 pt-6">
                <p className="leading-relaxed text-charcoal">{product.description}</p>
              </div>

              <div className="mt-8">
                <ProductPurchase product={product} />
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-lg bg-cream-dark/60 p-4 text-sm text-charcoal-muted">
                <Truck className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-olive" aria-hidden />
                Coordinamos entrega y disponibilidad por WhatsApp en Monterrey y zona
                metropolitana. Aún no procesamos pagos en línea.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-cream-dark/50 py-section">
          <Container>
            <SectionTitle eyebrow="Completa tu espacio" title="Productos relacionados" />
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
