import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { ProductCatalog } from "@/components/ecommerce/product-catalog";
import { Figure } from "@/components/ui/figure";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, productCategories, getFeaturedProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Tienda — Plantas, macetas y decoración exterior",
  description:
    "Compra plantas, macetas, jardineras, decoración exterior y accesorios para tu jardín en Monterrey. Pedidos por WhatsApp.",
  path: "/tienda",
});

export default function TiendaPage() {
  const featured = getFeaturedProducts()[0];

  return (
    <>
      <PageHero
        eyebrow="Tienda"
        title="Productos para espacios naturales"
        description="Plantas, macetas, jardineras y decoración exterior seleccionadas para complementar tu espacio. Haz tu pedido por WhatsApp."
        image="Tienda de plantas y macetas Green Gibb"
        variant="sand"
        size="sm"
      />

      {/* Producto destacado */}
      {featured && (
        <section className="py-section-sm">
          <Container>
            <div className="overflow-hidden rounded-2xl bg-green-deep text-cream">
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[300px]">
                  <Figure
                    src={featured.images[0]}
                    alt={featured.name}
                    variant="sand"
                    priority
                    className="absolute inset-0 h-full w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <Badge className="w-fit bg-sand/20 text-sand">Producto destacado</Badge>
                  <h2 className="mt-4 font-display text-display-sm font-medium text-cream">
                    {featured.name}
                  </h2>
                  <p className="mt-3 text-cream/80">{featured.description}</p>
                  <p className="mt-5 font-display text-2xl font-medium text-sand">
                    {formatPrice(featured.price)}
                  </p>
                  <Link
                    href={`/tienda/${featured.slug}`}
                    className={cn(buttonVariants({ variant: "terracotta", size: "lg" }), "mt-6 w-fit")}
                  >
                    Ver producto
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="pb-section pt-section-sm">
        <Container>
          <ProductCatalog products={products} categories={productCategories} />
        </Container>
      </section>
    </>
  );
}
