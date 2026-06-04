"use client";

import { useCallback, useEffect, useState } from "react";
import "./project-gallery.css";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);

  const show = useCallback(
    (next: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return ((next % images.length) + images.length) % images.length;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") show((openIndex ?? 0) + 1);
      if (event.key === "ArrowLeft") show((openIndex ?? 0) - 1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, openIndex, close, show]);

  return (
    <>
      <ul className="project-gallery">
        {images.map((src, index) => (
          <li key={src} className="project-gallery__item">
            <button
              type="button"
              className="project-gallery__thumb"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ampliar imagen ${index + 1} de ${title}`}
            >
              <img
                src={src}
                alt={`${title} — imagen ${index + 1}`}
                className="project-gallery__image"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </button>
          </li>
        ))}
      </ul>

      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${title}`}
          onClick={close}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={close}
            aria-label="Cerrar"
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={(event) => {
                event.stopPropagation();
                show((openIndex ?? 0) - 1);
              }}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
          )}

          <figure className="lightbox__figure" onClick={(event) => event.stopPropagation()}>
            <img
              src={images[openIndex ?? 0]}
              alt={`${title} — imagen ${(openIndex ?? 0) + 1}`}
              className="lightbox__image"
            />
            <figcaption className="lightbox__caption">
              {(openIndex ?? 0) + 1} / {images.length}
            </figcaption>
          </figure>

          {images.length > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={(event) => {
                event.stopPropagation();
                show((openIndex ?? 0) + 1);
              }}
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
