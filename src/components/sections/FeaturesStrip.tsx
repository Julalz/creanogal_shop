import type { ReactNode } from "react";
import "./features-strip.css";

const FEATURES = [
  {
    title: "Diseño a medida",
    description: "Cada proyecto se adapta a tu espacio y estilo de vida",
    icon: "design",
  },
  {
    title: "Calidad premium",
    description: "Materiales seleccionados y acabados de primera",
    icon: "quality",
  },
  {
    title: "Fabricación propia",
    description: "Taller propio en Las Palmas con control total",
    icon: "factory",
  },
  {
    title: "Instalación completa",
    description: "Montaje profesional y seguimiento hasta el final",
    icon: "install",
  },
] as const;

type FeaturesStripProps = {
  variant?: "light" | "dark";
};

function FeatureIcon({ type }: { type: string }) {
  const paths: Record<string, ReactNode> = {
    design: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M4 9h16M9 4v16" />
      </>
    ),
    quality: (
      <>
        <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.6L12 15.5 7 18.3l1-5.6-4-3.9 5.5-.8L12 3z" />
      </>
    ),
    factory: (
      <>
        <path d="M4 20V10l6-4 6 4v10" />
        <path d="M10 20v-6h4v6" />
      </>
    ),
    install: (
      <>
        <path d="M6 18V8l6-4 6 4v10" />
        <path d="M9 18v-4h6v4" />
      </>
    ),
  };

  return (
    <svg className="features-strip__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {paths[type] ?? paths.design}
      </g>
    </svg>
  );
}

export function FeaturesStrip({ variant = "light" }: FeaturesStripProps) {
  return (
    <section
      className={`features-strip section-padding ${variant === "dark" ? "section--dark" : "section--light"}`}
    >
      <div className="container">
        <ul className="features-strip__grid">
          {FEATURES.map(({ title, description, icon }) => (
            <li key={title} className="features-strip__item">
              <FeatureIcon type={icon} />
              <h3 className="features-strip__title label-caps">{title}</h3>
              <p className="features-strip__text">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
