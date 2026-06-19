"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import "./header-cart.css";

export function HeaderCartLink() {
  const { itemCount, isReady } = useCart();

  return (
    <Link href="/carrito" className="header-cart" aria-label={`Carrito (${itemCount} artículos)`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 6h15l-1.5 9h-12L6 6zM6 6L5 3H2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1" fill="currentColor" />
        <circle cx="18" cy="20" r="1" fill="currentColor" />
      </svg>
      {isReady && itemCount > 0 && (
        <span className="header-cart__badge" aria-hidden>
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
