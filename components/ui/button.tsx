import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-deep/60 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-green-deep text-cream shadow-soft hover:bg-green-deep-600 hover:shadow-soft-lg active:scale-[0.98]",
        secondary:
          "border border-green-deep/20 bg-cream text-green-deep hover:border-green-deep/40 hover:bg-cream-dark active:scale-[0.98]",
        terracotta:
          "bg-terracotta text-cream shadow-soft hover:bg-terracotta-dark hover:shadow-soft-lg active:scale-[0.98]",
        ghost: "text-green-deep hover:bg-green-deep/5 active:scale-[0.98]",
        outlineLight:
          "border border-cream/40 text-cream hover:bg-cream/10 active:scale-[0.98]",
        whatsapp:
          "bg-[#25D366] text-white shadow-soft hover:bg-[#1ebe5d] hover:shadow-soft-lg active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.95rem]",
        lg: "h-12 px-8 text-base sm:h-[3.25rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
