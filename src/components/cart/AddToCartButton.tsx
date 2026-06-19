"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import "./cart.css";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
};

export function AddToCartButton({ productId, className = "" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(productId);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      className={`btn btn--gold add-to-cart-btn ${className}`.trim()}
      onClick={handleClick}
    >
      {added ? "Añadido al carrito" : "Añadir al carrito"}
    </button>
  );
}
