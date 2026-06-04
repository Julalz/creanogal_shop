import type { QuookerAdvantage } from "@/lib/quooker-content";

export function AdvantageBlock({
  number,
  title,
  titleHighlight,
  description,
  link,
}: QuookerAdvantage) {
  return (
    <article className="quooker-advantage">
      <span className="quooker-advantage__number" aria-hidden>
        {number.padStart(2, "0")}
      </span>
      <div className="quooker-advantage__body">
        <h2 className="quooker-advantage__title heading-serif">
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span className="quooker-advantage__highlight">{titleHighlight}</span>
            </>
          )}
        </h2>
        <p className="quooker-advantage__text">{description}</p>
        {link && (
          <a href={link.href} className="quooker-link">
            {link.label}
            <span aria-hidden> →</span>
          </a>
        )}
      </div>
    </article>
  );
}
