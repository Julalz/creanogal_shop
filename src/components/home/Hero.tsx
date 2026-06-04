import "./hero.css";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden />
      <div className="hero__counter" aria-hidden>
        <span className="hero__counter-num hero__counter-num--active">01</span>
        <span className="hero__counter-line" />
        <span className="hero__counter-num">03</span>
      </div>
      <div className="container hero__content">
        <span className="hero__label label-caps">Carpintería de autor en Las Palmas</span>
        <h1 className="hero__title heading-serif">
          Diseñamos espacios que inspiran
        </h1>
        <p className="hero__subtitle">
          Cocinas, armarios y reformas integrales con materiales premium y acabado impecable
        </p>
        <div className="hero__actions">
          <a href="/contacto" className="btn btn--gold">
            Pide presupuesto
          </a>
          <a href="/proyectos" className="btn btn--ghost">
            Ver proyectos
          </a>
        </div>
      </div>
    </section>
  );
}
