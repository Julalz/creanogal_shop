"use client";

import { useState } from "react";
import type { QuookerFaq } from "@/lib/quooker-content";

type FaqAccordionProps = {
  items: QuookerFaq[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="quooker-faq">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="quooker-faq__item">
            <button
              type="button"
              className="quooker-faq__question"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {item.question}
              <span className="quooker-faq__icon" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && <div className="quooker-faq__answer">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
