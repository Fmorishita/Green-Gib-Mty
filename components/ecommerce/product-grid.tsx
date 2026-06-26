import type { Product } from "@/types";
import { ProductCard } from "@/components/cards/product-card";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  className?: string;
  priorityCount?: number;
}

/** Grid responsive de productos. */
export function ProductGrid({ products, className, priorityCount = 0 }: ProductGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < priorityCount} />
      ))}
    </div>
  );
}
