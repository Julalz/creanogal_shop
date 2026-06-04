import type { Metadata } from "next";
import "../accesibilidad/legal.css";

export const metadata: Metadata = {
  title: "Gestión de cookies | Creanogal",
  description:
    "Información sobre el uso de cookies en Creanogal. Solo utilizamos cookies técnicas necesarias para el funcionamiento del sitio.",
};

const LAST_UPDATE = "junio de 2026";
const EMAIL = "creanogal@gmail.com";

export default function GestionCookiesPage() {
  return (
    <article className="legal">
      <div className="container legal__inner">
        <header className="legal__header">
          <span className="legal__eyebrow label-caps">Información legal</span>
          <h1 className="legal__title heading-serif">Gestión de cookies</h1>
          <p className="legal__updated">Última actualización: {LAST_UPDATE}</p>
        </header>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">¿Qué son las cookies?</h2>
          <p className="legal__text">
            Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas un
            sitio web. Sirven para que la página funcione correctamente y, en algunos casos, para
            recordar tus preferencias.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Qué cookies utilizamos</h2>
          <p className="legal__text">
            En este sitio web utilizamos únicamente cookies técnicas y necesarias para su correcto
            funcionamiento. <strong>No usamos cookies de publicidad, de seguimiento ni de análisis
            con fines comerciales</strong>, ni elaboramos perfiles sobre tu navegación.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Uso de tus datos</h2>
          <p className="legal__text">
            Los datos que nos facilitas a través del formulario de contacto (nombre, correo,
            teléfono y tu mensaje) se utilizan con una única finalidad:{" "}
            <strong>ponernos en contacto contigo para poder prestarte un servicio</strong>. No los
            empleamos para envíos comerciales, ni los compartimos ni vendemos a terceros.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Cómo gestionar las cookies</h2>
          <p className="legal__text">
            Como solo utilizamos cookies técnicas imprescindibles, no es necesario tu
            consentimiento para su uso. Aun así, puedes configurar tu navegador para bloquear o
            eliminar las cookies en cualquier momento:
          </p>
          <ul className="legal__list">
            <li>Google Chrome: Ajustes → Privacidad y seguridad → Cookies.</li>
            <li>Mozilla Firefox: Ajustes → Privacidad y seguridad.</li>
            <li>Safari: Preferencias → Privacidad.</li>
            <li>Microsoft Edge: Configuración → Cookies y permisos del sitio.</li>
          </ul>
          <p className="legal__text">
            Ten en cuenta que bloquear las cookies técnicas puede afectar al funcionamiento del
            sitio.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Contacto</h2>
          <p className="legal__text">
            Si tienes cualquier duda sobre nuestra política de cookies, escríbenos a{" "}
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
