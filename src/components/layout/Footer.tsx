import { Logo } from "./Logo";
import { FooterFeatures } from "./FooterFeatures";
import "./footer.css";

const SERVICES = [
  { label: "Carpintería", href: "/categorias/carpinteria" },
  { label: "Cocinas", href: "/categorias/cocinas" },
  { label: "Mobiliario a medida", href: "/categorias/mobiliario" },
  { label: "Reformas", href: "/categorias/reformas" },
] as const;

const LEGAL_LINKS = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Política de cookies", href: "/politica-cookies" },
  { label: "Gestión de cookies", href: "/gestion-cookies" },
  { label: "Política de privacidad", href: "/politica-privacidad" },
  { label: "Declaración de accesibilidad", href: "/accesibilidad" },
] as const;

const DEV_WHATSAPP = "34633326622";
const DEV_WHATSAPP_MSG =
  "Hola, te escribo desde la web de Creanogal porque estoy interesado en el diseño y desarrollo de una página web / software a medida y me gustaría recibir más información y un presupuesto.";
const DEV_WHATSAPP_URL = `https://api.whatsapp.com/send/?phone=${DEV_WHATSAPP}&text=${encodeURIComponent(DEV_WHATSAPP_MSG)}&type=phone_number&app_absent=0`;

export function Footer() {
  return (
    <footer className="site-footer">
      <FooterFeatures />

      <div className="footer-info section--dark section-padding">
        <div className="container footer-info__grid">
          <div className="footer-info__col">
            <a href="/" className="footer-info__brand">
              <Logo className="logo--footer" />
            </a>
          </div>

          <div className="footer-info__col">
            <h2 className="footer-info__heading footer-info__heading--gold label-caps">
              Para tu negocio
            </h2>
            <p className="footer-info__text">
              Si tienes un negocio y te gustaría{" "}
              <strong>hacer una reforma</strong> ponte en{" "}
              <a href="mailto:creanogal@gmail.com" className="footer-info__link">
                contacto
              </a>{" "}
              con nosotros para contarnos tu idea y recibir atención personalizada.
            </p>
          </div>

          <div className="footer-info__col">
            <h2 className="footer-info__heading label-caps">Carpintería en Las Palmas</h2>
            <ul className="footer-info__list">
              {SERVICES.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="footer-info__service-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-info__col">
            <h2 className="footer-info__heading label-caps">Contacto</h2>
            <p className="footer-info__text">
              Llámanos o envía un Whatsapp. Horario:{" "}
              <strong>lunes a viernes de 8:00h a 17:00h</strong>
            </p>
            <div className="footer-info__contact">
              <a href="tel:+34654184933" className="footer-info__contact-link">
                654 18 49 33
              </a>
              <a href="mailto:creanogal@gmail.com" className="footer-info__contact-link">
                creanogal@gmail.com
              </a>
            </div>
          </div>
        </div>

        <nav className="footer-info__legal container" aria-label="Enlaces legales">
          {LEGAL_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="footer-info__legal-link">
              {label}
            </a>
          ))}
        </nav>

        <p className="footer-info__credit container">
          Hecho con <span className="footer-info__heart" aria-label="amor">♥</span> por{" "}
          <a
            href={DEV_WHATSAPP_URL}
            className="footer-info__credit-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Juli Alz
            <span className="footer-info__credit-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
}
