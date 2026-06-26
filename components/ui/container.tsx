import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  size?: "default" | "narrow" | "wide";
}

/** Contenedor centrado con ancho máximo y padding responsive. */
export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  const max =
    size === "narrow"
      ? "max-w-3xl"
      : size === "wide"
        ? "max-w-[88rem]"
        : "max-w-7xl";
  return (
    // @ts-expect-error -- dynamic tag
    <Tag className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", max, className)} {...props}>
      {children}
    </Tag>
  );
}
