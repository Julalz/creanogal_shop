import type { Metadata } from "next";
import "./legal.css";

export const metadata: Metadata = {
  title: "Declaración de accesibilidad | Creanogal",
  description:
    "Declaración de accesibilidad de Creanogal. Nuestro compromiso con un sitio web accesible para todas las personas.",
};

const LAST_UPDATE = "junio de 2026";
const EMAIL = "creanogal@gmail.com";

export default function AccesibilidadPage() {
  return (
    <article className="legal">
      <div className="container legal__inner">
        <header className="legal__header">
          <span className="legal__eyebrow label-caps">Información legal</span>
          <h1 className="legal__title heading-serif">Declaración de accesibilidad</h1>
          <p className="legal__updated">Última actualización: {LAST_UPDATE}</p>
        </header>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Nuestro compromiso</h2>
          <p className="legal__text">
            En Creanogal queremos que nuestro sitio web pueda ser usado por el mayor número
            posible de personas, con independencia de sus capacidades técnicas o físicas.
            Trabajamos para que la navegación sea clara, sencilla y accesible.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Grado de conformidad</h2>
          <p className="legal__text">
            Este sitio web pretende ajustarse a las Pautas de Accesibilidad para el Contenido
            Web (WCAG) 2.1 en su nivel AA. Es posible que algunos contenidos no cumplan todavía
            la totalidad de los criterios; seguimos mejorando de forma continua.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Medidas adoptadas</h2>
          <ul className="legal__list">
            <li>Estructura semántica del contenido con encabezados y secciones claras.</li>
            <li>Textos alternativos en las imágenes con valor informativo.</li>
            <li>Contraste de color cuidado entre texto y fondo.</li>
            <li>Navegación mediante teclado en los elementos interactivos.</li>
            <li>Diseño adaptable (responsive) a distintos tamaños de pantalla.</li>
          </ul>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Contacto y sugerencias</h2>
          <p className="legal__text">
            Si encuentras alguna barrera de accesibilidad o quieres hacernos una sugerencia,
            escríbenos a{" "}
            <a href={`mailto:${EMAIL}`} className="legal__link">
              {EMAIL}
            </a>{" "}
            y lo revisaremos lo antes posible.
          </p>
        </section>
      </div>
    </article>
  );
}
