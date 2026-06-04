"use client";

import { useCallback, useEffect, useState } from "react";
import type { KitchenSlide } from "@/lib/cocinas-content";
import "./kitchen-slider.css";

const AUTOPLAY_MS = 6000;

type KitchenSliderProps = {
  slides: KitchenSlide[];
};

export function KitchenSlider({ slides }: KitchenSliderProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count]);

  return (
    <div className="kitchen-slider">
      <div className="kitchen-slider__viewport">
        <div
          className="kitchen-slider__track"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {slides.map((slide, slideIndex) => (
            <article
              key={slide.id}
              className="kitchen-slide"
              aria-hidden={slideIndex !== index}
            >
              <img
                src={slide.imageUrl}
                alt={slide.imageAlt}
                className="kitchen-slide__image"
                loading={slideIndex === 0 ? "eager" : "lazy"}
              />
              <div className="kitchen-slide__overlay" />
              <div className="container kitchen-slide__content">
                <h3 className="kitchen-slide__title heading-serif">{slide.title}</h3>
                <p className="kitchen-slide__text">{slide.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="kitchen-slider__controls">
          <button
            type="button"
            className="kitchen-slider__arrow"
            onClick={() => goTo(index - 1)}
            aria-label="Cocina anterior"
          >
            <span aria-hidden>‹</span>
          </button>

          <div className="kitchen-slider__dots" role="tablist" aria-label="Estilos de cocina">
            {slides.map((slide, dotIndex) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={dotIndex === index}
                aria-label={slide.label}
                className={`kitchen-slider__dot${dotIndex === index ? " kitchen-slider__dot--active" : ""}`}
                onClick={() => goTo(dotIndex)}
              />
            ))}
          </div>

          <button
            type="button"
            className="kitchen-slider__arrow"
            onClick={() => goTo(index + 1)}
            aria-label="Siguiente cocina"
          >
            <span aria-hidden>›</span>
          </button>
        </div>
      )}
    </div>
  );
}
