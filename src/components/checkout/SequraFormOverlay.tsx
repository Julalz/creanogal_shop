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

function findSequraIframe(root: ParentNode) {
  return root.querySelector<HTMLIFrameElement>(
    "iframe.sq-identification-iframe, iframe[id^='sq-identification-']",
  );
}

function mountSequraIframe(host: HTMLElement) {
  const iframe = findSequraIframe(host);
  if (!iframe) return null;
  document.body.appendChild(iframe);
  return iframe;
}

function waitForIframeLoad(iframe: HTMLIFrameElement) {
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    iframe.addEventListener("load", done, { once: true });
    window.setTimeout(done, 12_000);
  });
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function setSequraBodyState(loading: boolean) {
  document.body.classList.toggle("sequra-form-open", true);
  document.body.classList.toggle("sequra-form-open--loading", loading);
}

function cleanupSequraIframe(iframe: HTMLIFrameElement | null) {
  document.body.classList.remove("sequra-form-open", "sequra-form-open--loading");
  iframe?.remove();
}

export function SequraFormOverlay({
  merchantOrderRef,
  onClose,
  onComplete,
}: SequraFormOverlayProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const onCloseRef = useRef(onClose);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  onCloseRef.current = onClose;

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

        const iframe = mountSequraIframe(host);
        iframeRef.current = iframe;
        setSequraBodyState(true);

        if (window.SequraFormInstance) {
          window.SequraFormInstance.setCloseCallback(() => {
            onCloseRef.current();
          });
          window.SequraFormInstance.show();
        }

        if (iframe) {
          await waitForIframeLoad(iframe);
          await sleep(400);
        }

        if (cancelled) return;

        setSequraBodyState(false);
        setFormVisible(true);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Error de conexión al cargar SeQura.");
          setLoading(false);
          document.body.classList.remove("sequra-form-open--loading");
        }
      }
    }

    loadForm();

    return () => {
      cancelled = true;
      cleanupSequraIframe(iframeRef.current);
      iframeRef.current = null;
    };
  }, [merchantOrderRef]);

  return (
    <div className="sequra-overlay" role="dialog" aria-modal="true" aria-label="Financiación SeQura">
      {loading && (
        <>
          <div className="sequra-overlay__backdrop sequra-overlay__backdrop--loading" aria-hidden="true" />
          <div className="sequra-overlay__loading-card">
            <header className="sequra-overlay__header">
              <h2>Financiación con SeQura</h2>
              <button type="button" className="sequra-overlay__close" onClick={onClose} aria-label="Cerrar">
                ×
              </button>
            </header>
            <div className="sequra-overlay__loader" aria-live="polite" aria-busy="true">
              <span className="sequra-overlay__loader-bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </span>
              <p className="sequra-overlay__loading">Cargando formulario…</p>
            </div>
          </div>
        </>
      )}

      {error && (
        <>
          <div className="sequra-overlay__backdrop" onClick={onClose} aria-hidden="true" />
          <div className="sequra-overlay__loading-card">
            <header className="sequra-overlay__header">
              <h2>Financiación con SeQura</h2>
              <button type="button" className="sequra-overlay__close" onClick={onClose} aria-label="Cerrar">
                ×
              </button>
            </header>
            <p className="sequra-overlay__error" role="alert">
              {error}
            </p>
          </div>
        </>
      )}

      {formVisible && !error && (
        <div className="sequra-overlay__assist">
          <p className="sequra-overlay__hint">
            Al completar la identificación serás redirigido a la confirmación del pedido.
          </p>
          <button type="button" className="btn btn--outline-dark sequra-overlay__done" onClick={onComplete}>
            Ya he completado el proceso
          </button>
        </div>
      )}

      <div ref={hostRef} className="sequra-overlay__host" aria-hidden="true" />
    </div>
  );
}
