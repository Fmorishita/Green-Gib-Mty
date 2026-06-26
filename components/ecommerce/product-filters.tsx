"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortOption = "destacados" | "precio-asc" | "precio-desc" | "nombre";

interface ProductFiltersProps {
  categories: readonly string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

/** Controles de filtrado, búsqueda y ordenamiento de la tienda. */
export function ProductFilters({
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  sort,
  onSortChange,
  resultCount,
}: ProductFiltersProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar productos…"
            aria-label="Buscar productos"
            className="w-full rounded-full border border-stone/50 bg-cream py-2.5 pl-10 pr-4 text-sm text-charcoal placeholder:text-charcoal-muted/60 focus:border-green-deep focus:outline-none focus:ring-2 focus:ring-green-deep/15"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-charcoal-muted">
          Ordenar por
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="rounded-full border border-stone/50 bg-cream px-3 py-2 text-sm text-charcoal focus:border-green-deep focus:outline-none focus:ring-2 focus:ring-green-deep/15"
          >
            <option value="destacados">Destacados</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre A–Z</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip label="Todos" active={activeCategory === "Todos"} onClick={() => onCategoryChange("Todos")} />
        {categories.map((cat) => (
          <FilterChip
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => onCategoryChange(cat)}
          />
        ))}
      </div>

      <p className="text-sm text-charcoal-muted">
        {resultCount} {resultCount === 1 ? "producto" : "productos"}
      </p>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-green-deep bg-green-deep text-cream"
          : "border-stone/50 bg-cream text-charcoal hover:border-green-deep/40"
      )}
    >
      {label}
    </button>
  );
}
