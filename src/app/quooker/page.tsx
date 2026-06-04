import { AdvantageBlock } from "@/components/quooker/AdvantageBlock";
import { FaqAccordion } from "@/components/quooker/FaqAccordion";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductSlider } from "@/components/product/ProductSlider";
import {
  QUOOKER_ADVANTAGES,
  QUOOKER_CUBE_SECTION,
  QUOOKER_FAQS,
  QUOOKER_VENTAJAS_INTRO,
} from "@/lib/quooker-content";
import { QUOOKER_CATALOG, QUOOKER_CUBE_ACCESSORIES } from "@/lib/quooker-products";
import "./quooker.css";

export default function QuookerVentajasPage() {
  return (
    <>
      <section className="quooker-hero">
        <div className="container quooker-hero__inner">
          <span className="quooker-hero__label label-caps">¿Por qué Quooker?</span>
          <h1 className="quooker-hero__title heading-serif">
            Las <em>ventajas</em> de Quooker
          </h1>
          <p className="quooker-hero__intro">{QUOOKER_VENTAJAS_INTRO}</p>
        </div>
      </section>

      <section className="quooker-advantages" aria-label="Ventajas de Quooker">
        <div className="container quooker-advantages__list">
          {QUOOKER_ADVANTAGES.map((advantage) => (
            <AdvantageBlock key={advantage.number} {...advantage} />
          ))}
        </div>
      </section>

      <section className="quooker-catalog" id="coleccion">
        <div className="container">
          <header className="quooker-catalog__header">
            <span className="label-caps">Colección</span>
            <h2 className="quooker-catalog__title heading-serif">
              Tu cocina, tu estilo. <em>¿Qué grifo Quooker se adapta mejor a tus necesidades?</em>
            </h2>
            <a href="#coleccion" className="btn btn--outline-dark">
              Consulta nuestra gama completa
            </a>
          </header>
          <ProductSlider products={QUOOKER_CATALOG} />
        </div>
      </section>

      <section className="quooker-faq-section">
        <div className="container">
          <header className="quooker-faq-section__header">
            <h2 className="quooker-faq-section__title heading-serif">
              Preguntas <em>más frecuentes</em> sobre Quooker
            </h2>
          </header>
          <FaqAccordion items={QUOOKER_FAQS} />
        </div>
      </section>

      <section className="quooker-cube" aria-label="Accesorios CUBE">
        <div className="container">
          <header className="quooker-cube__header">
            <span className="label-caps">{QUOOKER_CUBE_SECTION.label}</span>
            <h2 className="quooker-cube__title heading-serif">
              <span className="quooker-cube__title-question">{QUOOKER_CUBE_SECTION.title}</span>
              <em className="quooker-cube__title-highlight">{QUOOKER_CUBE_SECTION.titleHighlight}</em>
            </h2>
          </header>
          <ProductGrid
            products={QUOOKER_CUBE_ACCESSORIES}
            className="product-grid--cube"
          />

          <div className="quooker-cube__cta">
            <p className="quooker-cube__cta-text">
              Distribuidor oficial Quooker en Las Palmas — asesoramiento e instalación
            </p>
            <a href="/contacto" className="btn btn--gold">
              Pide presupuesto
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
