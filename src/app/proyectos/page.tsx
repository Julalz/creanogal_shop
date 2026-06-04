import type { Metadata } from "next";
import Link from "next/link";
import { PROYECTOS } from "@/lib/proyectos-content";
import "./proyectos.css";

export const metadata: Metadata = {
  title: "Proyectos | Creanogal · Carpintería y reformas en Las Palmas",
  description:
    "Descubre nuestros proyectos de cocinas, reformas integrales y carpintería a medida en Las Palmas.",
};

export default function ProyectosPage() {
  return (
    <>
      <section className="proyectos-hero">
        <div className="container proyectos-hero__inner">
          <span className="proyectos-hero__label label-caps">Portfolio</span>
          <h1 className="proyectos-hero__title heading-serif">
            Nuestros <em>proyectos</em>
          </h1>
          <p className="proyectos-hero__intro">
            Una selección de cocinas, reformas y carpintería a medida realizadas en Las Palmas.
            Haz clic en cualquier proyecto para verlo en detalle.
          </p>
        </div>
      </section>

      <section className="proyectos-list">
        <div className="container">
          <ul className="proyectos-grid">
            {PROYECTOS.map((proyecto) => (
              <li key={proyecto.slug} className="proyecto-card">
                <Link href={`/proyectos/${proyecto.slug}`} className="proyecto-card__link">
                  <span className="proyecto-card__media">
                    <img
                      src={proyecto.images[0]}
                      alt={proyecto.title}
                      className="proyecto-card__image"
                      loading="lazy"
                    />
                    <span className="proyecto-card__count">
                      {proyecto.images.length} fotos
                    </span>
                  </span>
                  <span className="proyecto-card__body">
                    <span className="proyecto-card__category label-caps">
                      {proyecto.category}
                    </span>
                    <span className="proyecto-card__title heading-serif">
                      {proyecto.title}
                    </span>
                    <span className="proyecto-card__summary">{proyecto.summary}</span>
                    <span className="proyecto-card__cta">Ver proyecto →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
