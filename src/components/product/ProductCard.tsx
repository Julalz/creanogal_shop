import Image from "next/image";
import type { ProductFinish } from "@/types/product";
import "./product-card.css";

export type ProductCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  price: number;
  priceFrom?: boolean;
  finishes?: ProductFinish[];
  infoHref: string;
  configureHref: string;
  infoLabel?: string;
  configureLabel?: string;
};

function formatPrice(amount: number) {
  return amount.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

export function ProductCard({
  title,
  description,
  imageUrl,
  imageAlt,
  price,
  priceFrom = true,
  finishes = [],
  infoHref,
  configureHref,
  infoLabel = "Ver detalle",
  configureLabel = "Configurar",
}: ProductCardProps) {
  return (
    <article className="product-card">
      <a href={infoHref} className="product-card__media" tabIndex={-1} aria-hidden>
        <Image
          src={imageUrl}
          alt={imageAlt ?? title}
          width={520}
          height={440}
          className="product-card__image"
        />
      </a>

      <div className="product-card__body">
        <header className="product-card__head">
          <h3 className="product-card__title">
            <a href={infoHref}>{title}</a>
          </h3>
          <p className="product-card__price">
            {priceFrom && <span className="product-card__price-from">Desde </span>}
            <span className="product-card__price-value">{formatPrice(price)}</span>
          </p>
        </header>

        <p className="product-card__description">{description}</p>

        {finishes.length > 0 && (
          <div className="product-card__finishes">
            <span className="product-card__finishes-label label-caps">Acabados</span>
            <ul className="product-card__swatches" aria-label="Acabados disponibles">
              {finishes.map((finish) => (
                <li key={finish.id}>
                  <span
                    className={`product-card__swatch product-card__swatch--${finish.id}`}
                    title={finish.label}
                    aria-label={finish.label}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="product-card__footer">
          <a href={infoHref} className="product-card__link">
            {infoLabel}
          </a>
          <span className="product-card__footer-sep" aria-hidden>
            /
          </span>
          <a href={configureHref} className="product-card__link product-card__link--primary">
            {configureLabel}
            <span className="product-card__link-arrow" aria-hidden>
              →
            </span>
          </a>
        </footer>
      </div>
    </article>
  );
}
