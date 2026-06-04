import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/proyectos/ProjectGallery";
import { PROYECTOS, getProyecto } from "@/lib/proyectos-content";
import "../proyectos.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROYECTOS.map((proyecto) => ({ slug: proyecto.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = getProyecto(slug);

  if (!proyecto) {
    return { title: "Proyecto no encontrado | Creanogal" };
  }

  return {
    title: `${proyecto.title} | Proyectos · Creanogal`,
    description: proyecto.summary,
  };
}

export default async function ProyectoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const proyecto = getProyecto(slug);

  if (!proyecto) {
    notFound();
  }

  return (
    <article className="proyecto-detail">
      <div className="container">
        <Link href="/proyectos" className="proyecto-detail__back">
          ← Volver a proyectos
        </Link>

        <header className="proyecto-detail__header">
          <span className="proyecto-detail__category label-caps">{proyecto.category}</span>
          <h1 className="proyecto-detail__title heading-serif">{proyecto.title}</h1>
          <p className="proyecto-detail__description">{proyecto.description}</p>

          <dl className="proyecto-detail__meta">
            <div className="proyecto-detail__meta-item">
              <dt className="label-caps">Ubicación</dt>
              <dd>{proyecto.location}</dd>
            </div>
            <div className="proyecto-detail__meta-item">
              <dt className="label-caps">Año</dt>
              <dd>{proyecto.year}</dd>
            </div>
            <div className="proyecto-detail__meta-item">
              <dt className="label-caps">Servicio</dt>
              <dd>{proyecto.category}</dd>
            </div>
          </dl>
        </header>

        <ProjectGallery images={proyecto.images} title={proyecto.title} />

        <div className="proyecto-detail__cta">
          <p className="proyecto-detail__cta-text">
            ¿Quieres un proyecto así? Cuéntanos tu idea y la hacemos realidad.
          </p>
          <Link href="/contacto" className="btn btn--gold">
            Pide presupuesto
          </Link>
        </div>
      </div>
    </article>
  );
}
