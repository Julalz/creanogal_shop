"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SequraFormInstance?: {
      show: () => void;
      setCloseCallback: (callback: () => void) => void;
    };
    SequraFormElement?: string;
  }
}

type SequraFormOverlayProps = {
  merchantOrderRef: string;
  onClose: () => void;
  onComplete: () => void;
};

export function SequraFormOverlay({
  merchantOrderRef,
  onClose,
  onComplete,
}: SequraFormOverlayProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadForm() {
      try {
        const response = await fetch(
          `/api/sequra/form?ref=${encodeURIComponent(merchantOrderRef)}`,
        );
        const data = (await response.json()) as { ok?: boolean; html?: string; error?: string };

        if (cancelled) return;

        if (!response.ok || !data.ok || !data.html) {
          setError(data.error ?? "No se pudo cargar el formulario SeQura.");
          setLoading(false);
          return;
        }

        const host = hostRef.current;
        if (!host) return;

        host.innerHTML = data.html;

        const scripts = host.querySelectorAll("script");
        const loadScript = (script: HTMLScriptElement) =>
          new Promise<void>((resolve, reject) => {
            const el = document.createElement("script");
            if (script.src) {
              el.src = script.src;
              el.onload = () => resolve();
              el.onerror = () => reject(new Error("Error al cargar SeQura."));
            } else {
              el.textContent = script.textContent;
              resolve();
            }
            document.body.appendChild(el);
            script.remove();
          });

        for (const script of Array.from(scripts)) {
          await loadScript(script as HTMLScriptElement);
        }

        if (cancelled) return;

        if (window.SequraFormInstance) {
          window.SequraFormInstance.setCloseCallback(() => {
            onClose();
          });
          window.SequraFormInstance.show();
        }

        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Error de conexión al cargar SeQura.");
          setLoading(false);
        }
      }
    }

    loadForm();

    return () => {
      cancelled = true;
    };
  }, [merchantOrderRef, onClose]);

  return (
    <div className="sequra-overlay" role="dialog" aria-modal="true" aria-label="Financiación SeQura">
      <div className="sequra-overlay__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="sequra-overlay__panel">
        <header className="sequra-overlay__header">
          <h2>Financiación con SeQura</h2>
          <button type="button" className="sequra-overlay__close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </header>

        {loading && <p className="sequra-overlay__loading">Cargando formulario…</p>}
        {error && (
          <p className="sequra-overlay__error" role="alert">
            {error}
          </p>
        )}

        <div ref={hostRef} className="sequra-overlay__host" />

        <p className="sequra-overlay__hint">
          Al completar la identificación serás redirigido a la confirmación del pedido.
        </p>
        <button type="button" className="btn btn--outline-dark sequra-overlay__done" onClick={onComplete}>
          Ya he completado el proceso
        </button>
      </div>
    </div>
  );
}
