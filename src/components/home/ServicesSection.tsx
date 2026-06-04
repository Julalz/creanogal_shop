import type { ReactNode } from "react";
import Link from "next/link";
import "./services.css";

type Service = {
  title: string;
  text: string;
  href: string;
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    title: "Cocinas",
    text: "Diseño y montaje de cocinas a medida",
    href: "/cocinas",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M4 9h16M9 6h2M9 13v4" />
      </>
    ),
  },
  {
    title: "Armarios",
    text: "Vestidores y soluciones de almacenaje",
    href: "/carpinteria",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1" />
        <path d="M12 3v18M9 11h.5M14.5 11h.5" />
      </>
    ),
  },
  {
    title: "Puertas",
    text: "Puertas correderas, batientes y empotradas",
    href: "/carpinteria",
    icon: (
      <>
        <rect x="6" y="3" width="12" height="18" rx="1" />
        <path d="M14 12h.5" />
      </>
    ),
  },
  {
    title: "Reformas",
    text: "Reformas integrales llave en mano",
    href: "/reformas",
    icon: (
      <>
        <path d="M4 20V9l8-5 8 5v11" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
  },
];

export function ServicesSection() {
  return (
    <section className="services section--white section-padding">
      <div className="container">
        <header className="services__header">
          <span className="services__label label-caps">Servicios</span>
          <h2 className="services__title heading-serif">Nuestros servicios</h2>
          <p className="services__subtitle">
            Todo lo que necesitas para tu espacio, de la mano de un único equipo.
          </p>
        </header>
        <ul className="services__grid">
          {SERVICES.map(({ title, text, href, icon }) => (
            <li key={title}>
              <Link href={href} className="services__item">
                <span className="services__item-icon" aria-hidden>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon}
                  </svg>
                </span>
                <h3 className="services__item-title">{title}</h3>
                <p className="services__item-text">{text}</p>
                <span className="services__item-link" aria-hidden>
                  Ver más →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
