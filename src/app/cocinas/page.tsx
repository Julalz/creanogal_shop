import type { Metadata } from "next";
import { KitchenSlider } from "@/components/cocinas/KitchenSlider";
import {
  COCINAS_CTA,
  COCINAS_FEATURES,
  COCINAS_HERO,
  COCINAS_SLIDES,
} from "@/lib/cocinas-content";
import "./cocinas.css";

export const metadata: Metadata = {
  title: "Cocinas a medida en Las Palmas | Creanogal",
  description:
    "Diseño y fabricación de cocinas a medida en Las Palmas. Materiales premium, fabricación propia e instalación garantizada.",
};

export default function CocinasPage() {
  return (
    <>
      <section className="cocinas-hero">
        <div className="container cocinas-hero__content">
          <span className="cocinas-hero__label label-caps">{COCINAS_HERO.label}</span>
          <h1 className="cocinas-hero__title heading-serif">
            {COCINAS_HERO.title} <em>{COCINAS_HERO.titleHighlight}</em>
          </h1>
          <p className="cocinas-hero__intro">{COCINAS_HERO.intro}</p>
          <div className="cocinas-hero__actions">
            <a href={COCINAS_HERO.primaryCta.href} className="btn btn--gold">
              {COCINAS_HERO.primaryCta.label}
            </a>
            <a href={COCINAS_HERO.secondaryCta.href} className="btn btn--ghost">
              {COCINAS_HERO.secondaryCta.label}
            </a>
          </div>
        </div>
      </section>

      <section className="cocinas-gallery" aria-label="Estilos de cocina">
        <div className="container cocinas-gallery__header">
          <span className="label-caps cocinas-gallery__eyebrow">Inspiración</span>
          <h2 className="cocinas-gallery__title heading-serif">
            Cada cocina, <em>una historia</em>
          </h2>
        </div>
        <KitchenSlider slides={COCINAS_SLIDES} />
      </section>

      <section className="cocinas-features" aria-label="Por qué elegirnos">
        <div className="container">
          <div className="cocinas-features__grid">
            {COCINAS_FEATURES.map((feature) => (
              <div key={feature.number} className="cocinas-feature">
                <span className="cocinas-feature__number">{feature.number}</span>
                <h3 className="cocinas-feature__title heading-serif">{feature.title}</h3>
                <p className="cocinas-feature__text">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cocinas-cta">
        <div className="container cocinas-cta__inner">
          <h2 className="cocinas-cta__title heading-serif">{COCINAS_CTA.title}</h2>
          <p className="cocinas-cta__subtitle">{COCINAS_CTA.subtitle}</p>
          <a href={COCINAS_CTA.href} className="btn btn--gold">
            {COCINAS_CTA.buttonLabel}
          </a>
        </div>
      </section>
    </>
  );
}
