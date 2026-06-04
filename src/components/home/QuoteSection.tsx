import "./quote.css";

export function QuoteSection() {
  return (
    <section className="quote-section section--white">
      <div className="container">
        <blockquote>
          <p className="quote-section__text">
            &ldquo;La calidad se nota en cada detalle&rdquo;
          </p>
          <footer className="quote-section__author">Grupo Nogal</footer>
        </blockquote>
      </div>
    </section>
  );
}
