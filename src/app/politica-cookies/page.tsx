import type { Metadata } from "next";
import "../accesibilidad/legal.css";

export const metadata: Metadata = {
  title: "Política de cookies | Creanogal",
  description:
    "Política de cookies de Creanogal. Solo utilizamos cookies técnicas necesarias para el funcionamiento del sitio web.",
};

const LAST_UPDATE = "junio de 2026";
const EMAIL = "creanogal@gmail.com";

export default function PoliticaCookiesPage() {
  return (
    <article className="legal">
      <div className="container legal__inner">
        <header className="legal__header">
          <span className="legal__eyebrow label-caps">Información legal</span>
          <h1 className="legal__title heading-serif">Política de cookies</h1>
          <p className="legal__updated">Última actualización: {LAST_UPDATE}</p>
        </header>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Introducción</h2>
          <p className="legal__text">
            Esta política explica qué son las cookies y cómo las utiliza Creanogal en su sitio
            web. Nuestro objetivo es ofrecerte una navegación transparente y respetuosa con tu
            privacidad.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">¿Qué son las cookies?</h2>
          <p className="legal__text">
            Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo
            al visitarlo. Permiten que la página funcione correctamente y recuerde cierta
            información.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Tipos de cookies que utilizamos</h2>
          <p className="legal__text">
            En este sitio utilizamos exclusivamente{" "}
            <strong>cookies técnicas y necesarias</strong> para el correcto funcionamiento de la
            web. No empleamos cookies de análisis, de publicidad ni de redes sociales, ni
            realizamos ningún tipo de seguimiento de tu actividad con fines comerciales.
          </p>
          <ul className="legal__list">
            <li>
              <strong>Cookies técnicas:</strong> imprescindibles para la navegación y el uso de
              las funciones básicas del sitio.
            </li>
          </ul>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Uso de tus datos</h2>
          <p className="legal__text">
            Los datos que nos facilitas mediante el formulario de contacto se utilizan únicamente
            para <strong>ponernos en contacto contigo y poder prestarte un servicio</strong>. No
            se usan con fines publicitarios ni se ceden a terceros.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Cómo desactivar las cookies</h2>
          <p className="legal__text">
            Puedes configurar tu navegador para bloquear o eliminar las cookies en cualquier
            momento desde sus ajustes de privacidad. Ten en cuenta que desactivar las cookies
            técnicas puede afectar al funcionamiento del sitio.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Contacto</h2>
          <p className="legal__text">
            Si tienes cualquier duda sobre esta política de cookies, escríbenos a{" "}
            <a href={`mailto:${EMAIL}`} className="legal__link">
              {EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
