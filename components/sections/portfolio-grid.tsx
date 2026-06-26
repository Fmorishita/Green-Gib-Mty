"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/cards/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

interface PortfolioGridProps {
  projects: Project[];
  categories: readonly string[];
}

/** Grid de portafolio filtrable por categoría. */
export function PortfolioGrid({ projects, categories }: PortfolioGridProps) {
  const [active, setActive] = useState("Todos");

  const filtered = useMemo(
    () => (active === "Todos" ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <Chip label="Todos" active={active === "Todos"} onClick={() => setActive("Todos")} />
        {categories.map((cat) => (
          <Chip key={cat} label={cat} active={active === cat} onClick={() => setActive(cat)} />
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} priority={i < 3} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Pronto compartiremos proyectos de esta categoría"
          description="Mientras tanto, explora el resto de nuestro portafolio."
        />
      )}
    </div>
  );
}

function Chip({
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
