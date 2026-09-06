import type { Metadata } from "next";
import { COMPANY, formatFiscalAddress, formatLegalIdentity } from "@/lib/company-legal";
import "../accesibilidad/legal.css";

export const metadata: Metadata = {
  title: "Aviso legal | Creanogal",
  description:
    "Aviso legal y condiciones de uso del sitio web de Creanogal, carpintería y reformas en Las Palmas.",
};

export default function AvisoLegalPage() {
  return (
    <article className="legal">
      <div className="container legal__inner">
        <header className="legal__header">
          <span className="legal__eyebrow label-caps">Información legal</span>
          <h1 className="legal__title heading-serif">Aviso legal</h1>
          <p className="legal__updated">Última actualización: {COMPANY.lastUpdate}</p>
        </header>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Titular del sitio web</h2>
          <p className="legal__text">
            El presente sitio web <strong>{COMPANY.website}</strong> es titularidad de{" "}
            <strong>{formatLegalIdentity()}</strong>.
          </p>
          <ul className="legal__list">
            <li>
              <strong>Razón social:</strong> {COMPANY.legalName}
            </li>
            {COMPANY.taxId ? (
              <li>
                <strong>NIF/CIF:</strong> {COMPANY.taxId}
              </li>
            ) : null}
            <li>
              <strong>Domicilio fiscal:</strong> {formatFiscalAddress()}
            </li>
            <li>
              <strong>Correo electrónico:</strong>{" "}
              <a href={`mailto:${COMPANY.email}`} className="legal__link">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <strong>Teléfono:</strong>{" "}
              <a href={`tel:${COMPANY.phoneTel}`} className="legal__link">
                {COMPANY.phone}
              </a>
            </li>
          </ul>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Objeto</h2>
          <p className="legal__text">
            Este sitio web tiene como finalidad presentar los servicios de carpintería, cocinas,
            reformas y la tienda de productos Quooker que ofrece {COMPANY.tradeName}, así como
            facilitar el contacto y la contratación entre los usuarios y la empresa. El acceso y
            uso del sitio implica la aceptación de las presentes condiciones.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Condiciones de uso</h2>
          <p className="legal__text">
            El usuario se compromete a hacer un uso adecuado de los contenidos y servicios del
            sitio web y a no emplearlos para actividades ilícitas o contrarias a la buena fe y al
            orden público.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Compras online</h2>
          <p className="legal__text">
            Las compras realizadas a través de la tienda online se rigen, además, por la{" "}
            <a href="/politica-devoluciones" className="legal__link">
              política de desistimiento y devoluciones
            </a>
            , donde se detallan el plazo de 14 días naturales para solicitar la devolución y el
            reembolso mediante el mismo método de pago utilizado en la compra.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Propiedad intelectual e industrial</h2>
          <p className="legal__text">
            Todos los contenidos del sitio web (textos, imágenes, diseño, logotipos y código) son
            propiedad de {COMPANY.tradeName} o de terceros que han autorizado su uso, y están
            protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
            reproducción, distribución o comunicación pública sin autorización previa.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Responsabilidad</h2>
          <p className="legal__text">
            {COMPANY.tradeName} no se hace responsable de los posibles daños derivados de un uso
            inadecuado del sitio web, ni de las interrupciones o errores técnicos ajenos a su
            voluntad. Procuramos mantener la información actualizada y libre de errores.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Protección de datos</h2>
          <p className="legal__text">
            Los datos personales que nos facilites se tratan conforme a nuestra{" "}
            <a href="/politica-privacidad" className="legal__link">
              política de privacidad
            </a>
            . Los utilizamos únicamente para gestionar pedidos, ponernos en contacto contigo y
            prestarte un servicio.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Legislación aplicable</h2>
          <p className="legal__text">
            Las presentes condiciones se rigen por la legislación española. Para la resolución de
            cualquier controversia, las partes se someten a los juzgados y tribunales que
            correspondan conforme a derecho.
          </p>
        </section>
      </div>
    </article>
  );
}
