import type { Metadata } from "next";
import {
  NOSOTROS_BLOCKS,
  NOSOTROS_CTA,
  NOSOTROS_HERO,
  NOSOTROS_INTRO,
} from "@/lib/nosotros-content";
import "./nosotros.css";

export const metadata: Metadata = {
  title: "Quiénes somos | Carpinteros en Las Palmas | Creanogal",
  description:
    "Conoce Creanogal: carpintería a medida en Las Palmas. Calidad, estilo y funcionalidad para tu hogar y tu negocio.",
};

export default function NosotrosPage() {
  return (
    <>
      <section className="nosotros-hero">
        <div className="container nosotros-hero__inner">
          <p className="nosotros-hero__brand">{NOSOTROS_HERO.label}</p>
          <p className="nosotros-hero__tagline label-caps">{NOSOTROS_HERO.tagline}</p>
          <h1 className="nosotros-hero__title heading-serif">Quiénes somos</h1>
          <p className="nosotros-hero__intro">{NOSOTROS_HERO.intro}</p>
        </div>
      </section>

      <section className="nosotros-intro">
        <div className="container nosotros-intro__inner">
          {NOSOTROS_INTRO.map((paragraph) => (
            <p key={paragraph} className="nosotros-intro__text">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {NOSOTROS_BLOCKS.map((block, index) => {
        const isDark = index % 2 === 1;
        const reverse = index % 2 === 1 ? "nosotros-block--reverse" : "";
        return (
          <section
            key={block.id}
            className={isDark ? "section--dark" : "section--white"}
          >
            <div
              className={`container nosotros-block ${isDark ? "nosotros-block--dark" : ""} ${reverse}`.trim()}
            >
              {block.image ? (
                <img
                  src={block.image}
                  alt={block.label}
                  className="nosotros-block__visual"
                  loading="lazy"
                />
              ) : (
                <div
                  className="nosotros-block__visual"
                  role="img"
                  aria-label={block.label}
                />
              )}
              <div className="nosotros-block__content">
                <span className="nosotros-block__label label-caps">{block.label}</span>
                <h2 className="nosotros-block__title heading-serif">{block.title}</h2>
                <p className="nosotros-block__text">{block.text}</p>
                <a href={block.link.href} className="nosotros-block__link">
                  {block.link.label} →
                </a>
              </div>
            </div>
          </section>
        );
      })}

      <section className="nosotros-cta">
        <div className="container nosotros-cta__inner">
          <h2 className="nosotros-cta__title heading-serif">{NOSOTROS_CTA.title}</h2>
          <p className="nosotros-cta__subtitle">{NOSOTROS_CTA.subtitle}</p>
          <a href={NOSOTROS_CTA.href} className="btn btn--gold">
            {NOSOTROS_CTA.buttonLabel}
          </a>
        </div>
      </section>
    </>
  );
}
