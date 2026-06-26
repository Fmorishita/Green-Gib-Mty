import Link from "next/link";
import type { Product } from "@/types";
import { Figure } from "@/components/ui/figure";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/ecommerce/add-to-cart-button";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

/** Tarjeta de producto para la tienda. */
export function ProductCard({ product, priority }: ProductCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone/30 bg-cream transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-soft-lg">
      <Link
        href={`/tienda/${product.slug}`}
        className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-deep/60 focus-visible:ring-inset"
        aria-label={product.name}
      >
        <Figure
          src={product.images[0]}
          alt={product.name}
          variant="sand"
          priority={priority}
          className="aspect-square w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.stock <= 0 && (
          <span className="absolute right-3 top-3">
            <Badge variant="terracotta">Agotado</Badge>
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-green-olive">
          {product.category}
        </p>
        <Link href={`/tienda/${product.slug}`} className="mt-1">
          <h3 className="font-display text-lg leading-snug text-green-deep transition-colors group-hover:text-green-olive-dark">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto pt-4">
          <p className="font-display text-xl font-medium text-green-deep">
            {formatPrice(product.price)}
          </p>
          <AddToCartButton
            product={product}
            size="sm"
            variant="secondary"
            className="mt-3 w-full"
            label="Agregar"
          />
        </div>
      </div>
    </div>
  );
}
