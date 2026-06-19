"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/hooks/useCart";
import type { CartLine } from "@/types/cart";

type CartItemProps = {
  line: CartLine;
};

export function CartItem({ line }: CartItemProps) {
  const { setQuantity, removeItem } = useCart();
  const { product, quantity, lineTotal } = line;

  return (
    <article className="cart-item">
      <Link href={product.infoHref} className="cart-item__media" tabIndex={-1} aria-hidden>
        <Image
          src={product.imageUrl}
          alt={product.imageAlt ?? product.title}
          width={120}
          height={120}
          className="cart-item__image"
        />
      </Link>

      <div className="cart-item__body">
        <header className="cart-item__head">
          <h2 className="cart-item__title">
            <Link href={product.infoHref}>{product.title}</Link>
          </h2>
          <p className="cart-item__price">{formatPrice(lineTotal)}</p>
        </header>

        <p className="cart-item__unit">
          {product.priceFrom && "Desde "}
          {formatPrice(product.price)} / ud.
        </p>

        <div className="cart-item__actions">
          <label className="cart-item__qty-label">
            <span className="visually-hidden">Cantidad</span>
            <select
              className="cart-item__qty"
              value={quantity}
              onChange={(e) => setQuantity(product.id, Number(e.target.value))}
              aria-label={`Cantidad de ${product.title}`}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="cart-item__remove"
            onClick={() => removeItem(product.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
