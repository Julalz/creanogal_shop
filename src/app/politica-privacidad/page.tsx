import type { Metadata } from "next";
import "../accesibilidad/legal.css";

export const metadata: Metadata = {
  title: "Política de privacidad | Creanogal",
  description:
    "Política de privacidad de Creanogal: cómo tratamos y protegemos tus datos personales.",
};

const LAST_UPDATE = "junio de 2026";
const EMAIL = "creanogal@gmail.com";

export default function PoliticaPrivacidadPage() {
  return (
    <article className="legal">
      <div className="container legal__inner">
        <header className="legal__header">
          <span className="legal__eyebrow label-caps">Información legal</span>
          <h1 className="legal__title heading-serif">Política de privacidad</h1>
          <p className="legal__updated">Última actualización: {LAST_UPDATE}</p>
        </header>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Responsable del tratamiento</h2>
          <p className="legal__text">
            El responsable del tratamiento de tus datos personales es Creanogal, con domicilio en
            Las Palmas de Gran Canaria. Para cualquier cuestión relacionada con tus datos puedes
            escribirnos a{" "}
            <a href={`mailto:${EMAIL}`} className="legal__link">
              {EMAIL}
            </a>
            .
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Datos que recopilamos</h2>
          <p className="legal__text">
            Recopilamos únicamente los datos que nos facilitas voluntariamente a través del
            formulario de contacto (nombre, correo electrónico, teléfono y el contenido de tu
            mensaje), así como datos técnicos básicos de navegación.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Finalidad y base legal</h2>
          <p className="legal__text">
            Tratamos tus datos para responder a tus consultas y, en su caso, elaborar
            presupuestos y prestarte nuestros servicios. La base legal es tu consentimiento y la
            ejecución de la relación que solicitas. No utilizamos tus datos para fines distintos
            ni elaboramos perfiles comerciales.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Conservación de los datos</h2>
          <p className="legal__text">
            Conservaremos tus datos durante el tiempo necesario para atender tu solicitud y,
            posteriormente, durante los plazos legalmente exigidos. Cuando dejen de ser
            necesarios, los eliminaremos de forma segura.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Cesión a terceros</h2>
          <p className="legal__text">
            No cedemos tus datos a terceros, salvo obligación legal o cuando sea imprescindible
            para la prestación del servicio (por ejemplo, proveedores tecnológicos que actúan como
            encargados del tratamiento).
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Tus derechos</h2>
          <p className="legal__text">
            Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión,
            oposición, limitación y portabilidad de tus datos.
          </p>
          <ul className="legal__list">
            <li>Acceder a los datos personales que tenemos sobre ti.</li>
            <li>Solicitar la rectificación de datos inexactos.</li>
            <li>Pedir la supresión de tus datos cuando ya no sean necesarios.</li>
            <li>Oponerte o limitar su tratamiento.</li>
          </ul>
          <p className="legal__text">
            Para ejercerlos, escríbenos a{" "}
            <a href={`mailto:${EMAIL}`} className="legal__link">
              {EMAIL}
            </a>
            . También tienes derecho a reclamar ante la Agencia Española de Protección de Datos.
          </p>
        </section>
      </div>
    </article>
  );
}
