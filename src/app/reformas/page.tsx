import type { Metadata } from "next";
import {
  REFORMAS_CTA,
  REFORMAS_HERO,
  REFORMAS_IMAGES,
  REFORMAS_SHOWCASE,
  REFORMAS_STATS,
  REFORMAS_STEPS,
} from "@/lib/reformas-content";
import "./reformas.css";

export const metadata: Metadata = {
  title: "Reformas integrales en Las Palmas | Creanogal",
  description:
    "Reformas integrales llave en mano en Las Palmas. Diseño, obra y carpintería a medida coordinados por un único equipo.",
};

export default function ReformasPage() {
  return (
    <>
      <section className="reformas-hero">
        <div className="container reformas-hero__inner">
          <div className="reformas-hero__content">
            <span className="reformas-hero__label label-caps">{REFORMAS_HERO.label}</span>
            <h1 className="reformas-hero__title heading-serif">
              {REFORMAS_HERO.title} <em>{REFORMAS_HERO.titleHighlight}</em>
            </h1>
            <p className="reformas-hero__intro">{REFORMAS_HERO.intro}</p>
            <div className="reformas-hero__actions">
              <a href={REFORMAS_HERO.primaryCta.href} className="btn btn--gold">
                {REFORMAS_HERO.primaryCta.label}
              </a>
              <a href={REFORMAS_HERO.secondaryCta.href} className="btn btn--outline-dark">
                {REFORMAS_HERO.secondaryCta.label}
              </a>
            </div>
          </div>
          <figure className="reformas-hero__media">
            <img
              src={REFORMAS_HERO.image}
              alt="Reforma integral realizada por Creanogal"
              className="reformas-hero__image"
            />
          </figure>
        </div>
      </section>

      <section className="reformas-stats">
        <div className="container reformas-stats__grid">
          {REFORMAS_STATS.map((stat) => (
            <div key={stat.label} className="reformas-stat">
              <span className="reformas-stat__value heading-serif">{stat.value}</span>
              <span className="reformas-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="reformas-process">
        <div className="container">
          <header className="reformas-process__header">
            <span className="label-caps reformas-process__eyebrow">Cómo trabajamos</span>
            <h2 className="reformas-process__title heading-serif">
              Un proceso claro, <em>sin sorpresas</em>
            </h2>
          </header>
          <ol className="reformas-process__grid">
            {REFORMAS_STEPS.map((step) => (
              <li key={step.number} className="reformas-step">
                <span className="reformas-step__number">{step.number}</span>
                <h3 className="reformas-step__title heading-serif">{step.title}</h3>
                <p className="reformas-step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="reformas-showcase" id="proyectos">
        <div className="container">
          <header className="reformas-showcase__header">
            <span className="label-caps reformas-showcase__eyebrow">
              {REFORMAS_SHOWCASE.label}
            </span>
            <h2 className="reformas-showcase__title heading-serif">
              {REFORMAS_SHOWCASE.title}
            </h2>
          </header>
        </div>
        <div className="reformas-showcase__grid">
          {REFORMAS_IMAGES.map((src, index) => (
            <figure key={src} className="reformas-showcase__item">
              <img
                src={src}
                alt={`Reforma integral ${index + 1}`}
                className="reformas-showcase__image"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="reformas-cta">
        <div className="container reformas-cta__inner">
          <h2 className="reformas-cta__title heading-serif">{REFORMAS_CTA.title}</h2>
          <p className="reformas-cta__subtitle">{REFORMAS_CTA.subtitle}</p>
          <a href={REFORMAS_CTA.href} className="btn btn--gold">
            {REFORMAS_CTA.buttonLabel}
          </a>
        </div>
      </section>
    </>
  );
}
