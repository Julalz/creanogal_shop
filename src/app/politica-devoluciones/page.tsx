import type { Metadata } from "next";
import { COMPANY, formatFiscalAddress, formatLegalIdentity } from "@/lib/company-legal";
import "../accesibilidad/legal.css";

export const metadata: Metadata = {
  title: "Política de desistimiento y devoluciones | Creanogal",
  description:
    "Condiciones de desistimiento, devoluciones y reembolsos en la tienda online de Creanogal.",
};

export default function PoliticaDevolucionesPage() {
  return (
    <article className="legal">
      <div className="container legal__inner">
        <header className="legal__header">
          <span className="legal__eyebrow label-caps">Información legal</span>
          <h1 className="legal__title heading-serif">Política de desistimiento y devoluciones</h1>
          <p className="legal__updated">Última actualización: {COMPANY.lastUpdate}</p>
        </header>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Identificación del vendedor</h2>
          <p className="legal__text">
            {formatLegalIdentity()}. Contacto:{" "}
            <a href={`mailto:${COMPANY.email}`} className="legal__link">
              {COMPANY.email}
            </a>
            , teléfono{" "}
            <a href={`tel:${COMPANY.phoneTel}`} className="legal__link">
              {COMPANY.phone}
            </a>
            .
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Derecho de desistimiento</h2>
          <p className="legal__text">
            De conformidad con el Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se
            aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y
            Usuarios, el cliente dispone de un{" "}
            <strong>plazo de 14 días naturales</strong> desde la recepción del pedido para ejercer
            su derecho de desistimiento, sin necesidad de justificación.
          </p>
          <p className="legal__text">
            Para ejercer este derecho, debe comunicarnos su decisión de desistir del contrato
            mediante una declaración inequívoca enviada a{" "}
            <a href={`mailto:${COMPANY.email}`} className="legal__link">
              {COMPANY.email}
            </a>{" "}
            o al teléfono {COMPANY.phone}, indicando su nombre, número de pedido y productos
            afectados.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Reembolso del importe</h2>
          <p className="legal__text">
            En caso de devolución aceptada, el <strong>reembolso del importe del pedido se
            realizará mediante el mismo método de pago</strong> utilizado en la compra inicial
            (tarjeta de crédito o débito, financiación con SeQura, financiación con Klarna u otro
            medio de pago empleado en el checkout).
          </p>
          <p className="legal__text">
            Procederemos al reembolso en un plazo máximo de <strong>14 días naturales</strong> desde
            que recibamos el producto devuelto o desde que nos comunique su decisión de desistir,
            según corresponda conforme a la normativa aplicable. No se aplicará ninguna comisión
            por el reembolso, salvo que la devolución se deba a un uso indebido o deterioro del
            producto imputable al cliente.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Devolución de los productos</h2>
          <p className="legal__text">
            El cliente deberá devolver los productos sin demora indebida y, en todo caso, dentro de
            los 14 días naturales siguientes a la comunicación del desistimiento. Los productos deben
            devolverse en su embalaje original, sin uso indebido y en condiciones que permitan su
            reventa, salvo el desgaste razonable derivado de su manipulación para comprobar su
            naturaleza, características o funcionamiento.
          </p>
          <p className="legal__text">
            Los gastos directos de devolución correrán a cargo del cliente, salvo que el producto
            recibido fuera defectuoso o no correspondiera con lo pedido.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Excepciones</h2>
          <p className="legal__text">
            Conforme a la normativa vigente, el derecho de desistimiento no será aplicable, entre
            otros supuestos, a:
          </p>
          <ul className="legal__list">
            <li>Bienes confeccionados conforme a las especificaciones del cliente o claramente personalizados.</li>
            <li>Bienes precintados que no sean aptos para ser devueltos por razones de protección de la salud o de higiene y que hayan sido desprecintados tras la entrega.</li>
            <li>Bienes que, tras su entrega, se hayan mezclado de forma indisociable con otros bienes.</li>
            <li>Servicios de instalación ya ejecutados con consentimiento previo del cliente.</li>
          </ul>
          <p className="legal__text">
            Productos Quooker, cocinas a medida o piezas de carpintería fabricadas según acabados o
            medidas indicadas por el cliente pueden quedar excluidos del desistimiento cuando
            cumplan los requisitos legales de personalización. En cada pedido le informaremos si
            aplica alguna excepción antes de confirmar la compra.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Productos defectuosos o errores en el pedido</h2>
          <p className="legal__text">
            Si recibe un producto defectuoso o que no corresponde con su pedido, contacte con
            nosotros en un plazo máximo de 48 horas desde la recepción. Gestionaremos la
            sustitución, reparación o reembolso conforme a la garantía legal y, en su caso, al
            reembolso por el mismo método de pago utilizado en la compra.
          </p>
        </section>

        <section className="legal__section">
          <h2 className="legal__heading heading-serif">Contacto</h2>
          <p className="legal__text">
            Para cualquier consulta sobre desistimiento o devoluciones: {COMPANY.email} ·{" "}
            {COMPANY.phone} · {formatFiscalAddress()}.
          </p>
        </section>
      </div>
    </article>
  );
}
