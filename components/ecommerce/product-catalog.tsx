"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/ecommerce/product-grid";
import { ProductFilters, type SortOption } from "@/components/ecommerce/product-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

interface ProductCatalogProps {
  products: Product[];
  categories: readonly string[];
}

/** Catálogo interactivo: filtros + búsqueda + orden + grid. */
export function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("destacados");

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.active);

    if (activeCategory !== "Todos") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "precio-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "precio-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "nombre":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, "es"));
        break;
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return result;
  }, [products, activeCategory, query, sort]);

  return (
    <div className="space-y-8">
      <ProductFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
        resultCount={filtered.length}
      />

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} priorityCount={4} />
      ) : (
        <EmptyState
          title="No encontramos productos"
          description="Prueba con otra categoría o término de búsqueda."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setActiveCategory("Todos");
                setQuery("");
              }}
            >
              Limpiar filtros
            </Button>
          }
        />
      )}
    </div>
  );
}
