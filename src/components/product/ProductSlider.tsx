"use client";

import { useCallback, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import "./product-slider.css";

const PER_SLIDE = 4;

function chunkBy<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

type ProductSliderProps = {
  products: Product[];
  perSlide?: number;
};

export function ProductSlider({ products, perSlide = PER_SLIDE }: ProductSliderProps) {
  const slides = useMemo(() => chunkBy(products, perSlide), [products, perSlide]);
  const [index, setIndex] = useState(0);
  const lastIndex = slides.length - 1;

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(next, lastIndex)));
    },
    [lastIndex],
  );

  return (
    <div className="product-slider">
      <div className="product-slider__viewport">
        <div
          className="product-slider__track"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {slides.map((slideProducts, slideIndex) => (
            <ul
              key={slideIndex}
              className="product-slider__slide"
              aria-hidden={slideIndex !== index}
            >
              {slideProducts.map((product) => (
                <li key={product.id}>
                  <ProductCard
                    productId={product.id}
                    title={product.title}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    imageAlt={product.imageAlt}
                    price={product.price}
                    priceFrom={product.priceFrom}
                    finishes={product.finishes}
                    infoHref={product.infoHref}
                    configureHref={product.configureHref}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="product-slider__controls">
          <button
            type="button"
            className="product-slider__arrow"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Productos anteriores"
          >
            <span aria-hidden>‹</span>
          </button>

          <div className="product-slider__dots" role="tablist" aria-label="Grupos de productos">
            {slides.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                role="tab"
                aria-selected={dotIndex === index}
                aria-label={`Grupo ${dotIndex + 1} de ${slides.length}`}
                className={`product-slider__dot${dotIndex === index ? " product-slider__dot--active" : ""}`}
                onClick={() => goTo(dotIndex)}
              />
            ))}
          </div>

          <button
            type="button"
            className="product-slider__arrow"
            onClick={() => goTo(index + 1)}
            disabled={index === lastIndex}
            aria-label="Siguientes productos"
          >
            <span aria-hidden>›</span>
          </button>
        </div>
      )}
    </div>
  );
}
