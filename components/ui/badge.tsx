import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "olive" | "sand" | "terracotta" | "outline";
}

/** Etiqueta pequeña para categorías y estados. */
export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  const styles = {
    default: "bg-green-deep/10 text-green-deep",
    olive: "bg-green-olive/15 text-green-olive-dark",
    sand: "bg-sand/40 text-charcoal",
    terracotta: "bg-terracotta/15 text-terracotta-dark",
    outline: "border border-green-deep/20 text-green-deep",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        styles,
        className
      )}
      {...props}
    />
  );
}
