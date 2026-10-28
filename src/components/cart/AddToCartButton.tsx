"use client";

import { useCart } from "@/hooks/useCart";
import "./cart.css";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
};

export function AddToCartButton({ productId, className = "" }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className={`btn btn--gold add-to-cart-btn ${className}`.trim()}
      onClick={() => addItem(productId)}
    >
      Añadir al carrito
    </button>
  );
}
