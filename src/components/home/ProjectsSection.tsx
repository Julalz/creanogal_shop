import Link from "next/link";
import { PROYECTOS } from "@/lib/proyectos-content";
import "./projects.css";

const FEATURED = PROYECTOS.slice(0, 3);

export function ProjectsSection() {
  return (
    <section className="projects section--white section-padding">
      <div className="container">
        <div className="projects__header">
          <div>
            <span className="label-caps">Portfolio</span>
            <h2 className="projects__title heading-serif">Últimos proyectos</h2>
          </div>
          <Link href="/proyectos" className="btn btn--outline-dark">
            Ver todos
          </Link>
        </div>
        <ul className="projects__grid">
          {FEATURED.map((proyecto) => (
            <li key={proyecto.slug}>
              <Link href={`/proyectos/${proyecto.slug}`} className="projects__card">
                <img
                  src={proyecto.images[0]}
                  alt={proyecto.title}
                  className="projects__card-bg"
                  loading="lazy"
                />
                <div className="projects__card-overlay" aria-hidden />
                <div className="projects__card-content">
                  <span className="projects__card-category label-caps">
                    {proyecto.category}
                  </span>
                  <h3 className="projects__card-title">{proyecto.title}</h3>
                  <p className="projects__card-meta">
                    {proyecto.location} · {proyecto.year}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
