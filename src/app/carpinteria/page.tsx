import type { Metadata } from "next";
import {
  CARPINTERIA_BLOCKS,
  CARPINTERIA_CTA,
  CARPINTERIA_GALLERY_INTRO,
  CARPINTERIA_HERO,
  CARPINTERIA_IMAGES,
  CARPINTERIA_MANIFESTO,
} from "@/lib/carpinteria-content";
import "./carpinteria.css";

export const metadata: Metadata = {
  title: "Carpintería a medida en Las Palmas | Creanogal",
  description:
    "Carpintería de autor en Las Palmas: armarios, mobiliario y piezas a medida fabricadas en taller propio con maderas nobles y acabado artesanal.",
};

export default function CarpinteriaPage() {
  return (
    <>
      <section
        className="carp-hero"
        style={{ backgroundImage: `url(${CARPINTERIA_IMAGES.hero})` }}
      >
        <div className="carp-hero__overlay" aria-hidden />
        <div className="container carp-hero__content">
          <h1 className="carp-hero__title heading-serif">{CARPINTERIA_HERO.title}</h1>
          <p className="carp-hero__intro">{CARPINTERIA_HERO.intro}</p>
          <a href={CARPINTERIA_HERO.cta.href} className="btn btn--gold">
            {CARPINTERIA_HERO.cta.label}
          </a>
        </div>
      </section>

      <section className="carp-manifesto">
        <div className="container">
          <p className="carp-manifesto__text heading-serif">{CARPINTERIA_MANIFESTO}</p>
        </div>
      </section>

      <section className="carp-gallery" aria-label="Galería de trabajos">
        <div className="container">
          <header className="carp-gallery__header">
            <span className="label-caps carp-gallery__eyebrow">
              {CARPINTERIA_GALLERY_INTRO.label}
            </span>
            <h2 className="carp-gallery__title heading-serif">
              {CARPINTERIA_GALLERY_INTRO.title}
            </h2>
          </header>
          <div className="carp-gallery__grid">
            {CARPINTERIA_IMAGES.gallery.map((src, index) => (
              <figure
                key={src}
                className={`carp-gallery__item carp-gallery__item--${index + 1}`}
              >
                <img
                  src={src}
                  alt={`Proyecto de carpintería ${index + 1}`}
                  className="carp-gallery__image"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {CARPINTERIA_BLOCKS.map((block, index) => (
        <section
          key={block.id}
          className={`carp-block ${index % 2 === 1 ? "carp-block--reverse" : ""}`.trim()}
        >
          <div className="container carp-block__inner">
            <figure className="carp-block__media">
              <img
                src={block.image}
                alt={block.title}
                className="carp-block__image"
                loading="lazy"
              />
            </figure>
            <div className="carp-block__content">
              <span className="carp-block__label label-caps">{block.label}</span>
              <h2 className="carp-block__title heading-serif">{block.title}</h2>
              <p className="carp-block__text">{block.text}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="carp-cta">
        <div className="container carp-cta__inner">
          <h2 className="carp-cta__title heading-serif">{CARPINTERIA_CTA.title}</h2>
          <p className="carp-cta__subtitle">{CARPINTERIA_CTA.subtitle}</p>
          <a href={CARPINTERIA_CTA.href} className="btn btn--gold">
            {CARPINTERIA_CTA.buttonLabel}
          </a>
        </div>
      </section>
    </>
  );
}
