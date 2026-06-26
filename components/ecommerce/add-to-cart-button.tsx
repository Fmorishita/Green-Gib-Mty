"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCart } from "@/components/ecommerce/cart-provider";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  label?: string;
}

/** Botón para agregar un producto al carrito con feedback. */
export function AddToCartButton({
  product,
  quantity = 1,
  variant = "primary",
  size = "md",
  className,
  label = "Agregar al carrito",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;

  const handleClick = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={soldOut}
      className={cn(className)}
      aria-label={`${label}: ${product.name}`}
    >
      {soldOut ? (
        "Agotado"
      ) : added ? (
        <>
          <Check className="h-4 w-4" aria-hidden /> Agregado
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" aria-hidden /> {label}
        </>
      )}
    </Button>
  );
}
