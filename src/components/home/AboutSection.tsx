import "./about.css";

export function AboutSection() {
  return (
    <section className="section--dark section-padding">
      <div className="container about">
        <img
          src="/images/proyectos/1/3.jpeg"
          alt="Proyecto realizado por Grupo Nogal"
          className="about__image"
          loading="lazy"
        />
        <div>
          <span className="about__label label-caps">Sobre nosotros</span>
          <h2 className="about__title heading-serif">
            Más de 30 años fabricando tus ideas
          </h2>
          <p className="about__text">
            En Grupo Nogal combinamos diseño, carpintería y reformas integrales. Trabajamos
            materiales nobles con un equipo propio para controlar cada fase del proyecto,
            desde el primer boceto hasta la instalación final.
          </p>
          <a href="/nosotros" className="btn btn--ghost">
            Conocer más
          </a>
        </div>
      </div>
    </section>
  );
}
