import { cn } from "@/lib/utils";

/** Barra de progreso de un curso. */
export function ProgressBar({
  percent,
  className,
  light,
}: {
  percent: number;
  className?: string;
  light?: boolean;
}) {
  const safe = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full", light ? "bg-cream/20" : "bg-green-deep/10", className)}
      role="progressbar"
      aria-valuenow={safe}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso del curso"
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500 ease-smooth", light ? "bg-sand" : "bg-green-olive")}
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}
