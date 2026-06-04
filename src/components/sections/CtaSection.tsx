import "./cta-section.css";

type CtaSectionProps = {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export function CtaSection({
  title = "¿Te gustaría un proyecto así?",
  subtitle = "Cuéntanos tu idea y diseñamos un espacio a tu medida",
  buttonLabel = "Solicitar presupuesto",
  buttonHref = "/contacto",
}: CtaSectionProps) {
  return (
    <section className="cta-section section--dark">
      <div className="container cta-section__inner">
        <h2 className="cta-section__title heading-serif">{title}</h2>
        <p className="cta-section__subtitle">{subtitle}</p>
        <a href={buttonHref} className="btn btn--ghost">
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
