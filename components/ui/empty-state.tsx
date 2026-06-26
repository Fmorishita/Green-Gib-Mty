import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

/** Estado vacío reutilizable (búsquedas sin resultados, carrito vacío, etc.). */
export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-stone/50 bg-cream/40 px-6 py-16 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-deep/10 text-green-deep">
        {icon ?? <Leaf className="h-6 w-6" aria-hidden />}
      </div>
      <h3 className="font-display text-xl text-green-deep">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-charcoal-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
