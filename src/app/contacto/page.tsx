import type { Metadata } from "next";
import { ContactForm } from "@/components/contacto/ContactForm";
import "./contacto.css";

export const metadata: Metadata = {
  title: "Contacto | Creanogal · Carpintería y reformas en Las Palmas",
  description:
    "Ponte en contacto con Creanogal. Presupuesto sin compromiso para cocinas, carpintería y reformas en Las Palmas.",
};

const PHONE_DISPLAY = "654 18 49 33";
const PHONE_RAW = "+34654184933";
const WHATSAPP = "34654184933";
const EMAIL = "creanogal@gmail.com";

const QUICK_CONTACTS = [
  {
    id: "phone",
    label: "Llámanos",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_RAW}`,
    icon: (
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Escríbenos ahora",
    href: `https://wa.me/${WHATSAPP}`,
    icon: (
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zM8.5 8c.2 0 .5 0 .7.5l.7 1.6c.1.2 0 .4 0 .5l-.5.7c-.1.2-.2.3 0 .6a7 7 0 0 0 3 2.6c.3.1.4 0 .6-.1l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.4 0 .6-.4 1.3-1 1.5-.6.2-1.4.3-3-.4a9 9 0 0 1-4-3.6c-.4-.7-.8-1.7-.8-2.6 0-.9.5-1.4.8-1.6.2-.2.4-.2.5-.2z" />
    ),
  },
  {
    id: "email",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
] as const;

export default function ContactoPage() {
  return (
    <>
      <section className="contacto-hero">
        <div className="container contacto-hero__inner">
          <span className="contacto-hero__label label-caps">Hablemos</span>
          <h1 className="contacto-hero__title heading-serif">
            Cuéntanos tu <em>proyecto</em>
          </h1>
          <p className="contacto-hero__intro">
            Estamos en Las Palmas y te asesoramos sin compromiso. Escríbenos por el medio que
            prefieras y te respondemos lo antes posible.
          </p>
        </div>
      </section>

      <section className="contacto-quick">
        <div className="container contacto-quick__grid">
          {QUICK_CONTACTS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="contacto-quick__card"
              {...(item.id === "whatsapp"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <svg
                className="contacto-quick__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {item.icon}
              </svg>
              <span className="contacto-quick__label label-caps">{item.label}</span>
              <span className="contacto-quick__value">{item.value}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="contacto-main">
        <div className="container contacto-main__grid">
          <aside className="contacto-info">
            <h2 className="contacto-info__title heading-serif">Información</h2>

            <div className="contacto-info__block">
              <span className="contacto-info__heading label-caps">Horario</span>
              <p className="contacto-info__text">
                Lunes a viernes
                <br />
                de 8:00 h a 17:00 h
              </p>
            </div>

            <div className="contacto-info__block">
              <span className="contacto-info__heading label-caps">Dónde estamos</span>
              <p className="contacto-info__text">Las Palmas de Gran Canaria</p>
            </div>

            <div className="contacto-info__block">
              <span className="contacto-info__heading label-caps">Contacto directo</span>
              <p className="contacto-info__text">
                <a href={`tel:${PHONE_RAW}`} className="contacto-info__link">
                  {PHONE_DISPLAY}
                </a>
                <br />
                <a href={`mailto:${EMAIL}`} className="contacto-info__link">
                  {EMAIL}
                </a>
              </p>
            </div>

            <p className="contacto-info__pitch">
              ¿Tienes un negocio y quieres reformarlo? Escríbenos y te damos atención
              personalizada.
            </p>
          </aside>

          <div className="contacto-form-wrap">
            <h2 className="contacto-form-wrap__title heading-serif">Escríbenos</h2>
            <p className="contacto-form-wrap__subtitle">
              Rellena el formulario y te preparamos un presupuesto a medida.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
