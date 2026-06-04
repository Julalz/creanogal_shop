"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./cookie-consent.css";

const STORAGE_KEY = "creanogal-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, date: new Date().toISOString() }),
      );
    } catch {
      // Si localStorage no está disponible, simplemente cerramos el aviso.
    }
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <div className="cookie-consent__inner">
        <p className="cookie-consent__text">
          Usamos únicamente cookies técnicas necesarias para que la web funcione. No utilizamos
          cookies de publicidad ni de seguimiento. Más información en nuestra{" "}
          <Link href="/politica-cookies" className="cookie-consent__link">
            política de cookies
          </Link>
          .
        </p>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="btn btn--outline-dark cookie-consent__btn"
            onClick={() => decide("rejected")}
          >
            Rechazar
          </button>
          <button
            type="button"
            className="btn btn--gold cookie-consent__btn"
            onClick={() => decide("accepted")}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
