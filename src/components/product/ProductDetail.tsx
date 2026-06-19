"use client";

import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";
import "./product-detail.css";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="product-detail">
      <div className="container product-detail__inner">
        <nav className="product-detail__breadcrumb" aria-label="Ruta de navegación">
          <Link href="/productos">Tienda Quooker</Link>
          <span aria-hidden> / </span>
          <span>{product.title}</span>
        </nav>

        <div className="product-detail__layout">
          <div className="product-detail__media">
            <Image
              src={product.imageUrl}
              alt={product.imageAlt ?? product.title}
              width={640}
              height={640}
              className="product-detail__image"
              priority
            />
          </div>

          <div className="product-detail__info">
            <span className="label-caps">Quooker</span>
            <h1 className="product-detail__title heading-serif">{product.title}</h1>
            <p className="product-detail__price">
              {product.priceFrom && <span className="product-detail__price-from">Desde </span>}
              <span>{formatPrice(product.price)}</span>
            </p>
            <p className="product-detail__description">{product.description}</p>

            {product.finishes && product.finishes.length > 0 && (
              <div className="product-detail__finishes">
                <span className="label-caps">Acabados disponibles</span>
                <ul className="product-detail__swatches" aria-label="Acabados disponibles">
                  {product.finishes.map((finish) => (
                    <li key={finish.id}>
                      <span
                        className={`product-detail__swatch product-detail__swatch--${finish.id}`}
                        title={finish.label}
                        aria-label={finish.label}
                      />
                    </li>
                  ))}
                </ul>
                <p className="product-detail__finishes-note">
                  El precio puede variar según el acabado elegido. Te confirmaremos el importe
                  final antes del pago.
                </p>
              </div>
            )}

            <div className="product-detail__actions">
              <AddToCartButton productId={product.id} />
              <Link href="/carrito" className="btn btn--outline-dark">
                Ver carrito
              </Link>
            </div>

            <p className="product-detail__install">
              Distribuidor oficial Quooker en Las Palmas —{" "}
              <Link href="/contacto">solicita asesoramiento e instalación</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
