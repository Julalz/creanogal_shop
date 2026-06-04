"use client";

import { useState } from "react";
import "./contact-form.css";

const SERVICES = [
  "Cocinas",
  "Carpintería a medida",
  "Reformas integrales",
  "Reforma de local",
  "Quooker",
  "Otro",
] as const;

const EMAIL = "creanogal@gmail.com";

type Status = "idle" | "error" | "sending" | "success";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string>(SERVICES[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Por favor, completa los campos obligatorios (*).");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, message }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error ?? "No se pudo enviar el mensaje.");
      }

      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "No se pudo enviar el mensaje.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-form contact-form--success" role="status">
        <span className="contact-form__success-icon" aria-hidden>
          ✓
        </span>
        <h3 className="contact-form__success-title heading-serif">¡Gracias, {name || "todo listo"}!</h3>
        <p className="contact-form__success-text">
          Hemos recibido tu mensaje y te responderemos lo antes posible. Si lo prefieres, también
          puedes escribirnos a{" "}
          <a href={`mailto:${EMAIL}`} className="contact-form__link">
            {EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          className="btn btn--outline-dark"
          onClick={() => {
            setName("");
            setEmail("");
            setPhone("");
            setService(SERVICES[0]);
            setMessage("");
            setStatus("idle");
          }}
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <label className="contact-form__field">
          <span className="contact-form__label">Nombre*</span>
          <input
            type="text"
            className="contact-form__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            autoComplete="name"
            required
          />
        </label>

        <label className="contact-form__field">
          <span className="contact-form__label">Teléfono</span>
          <input
            type="tel"
            className="contact-form__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Tu teléfono"
            autoComplete="tel"
          />
        </label>
      </div>

      <label className="contact-form__field">
        <span className="contact-form__label">Email*</span>
        <input
          type="email"
          className="contact-form__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
          required
        />
      </label>

      <label className="contact-form__field">
        <span className="contact-form__label">¿En qué podemos ayudarte?</span>
        <select
          className="contact-form__input contact-form__select"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          {SERVICES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="contact-form__field">
        <span className="contact-form__label">Mensaje*</span>
        <textarea
          className="contact-form__input contact-form__textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Cuéntanos tu idea o proyecto..."
          rows={5}
          required
        />
      </label>

      {status === "error" && errorMessage && (
        <p className="contact-form__error" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="btn btn--gold contact-form__submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Enviando..." : "Enviar consulta"}
      </button>

      <p className="contact-form__note">
        Te responderemos lo antes posible en horario de lunes a viernes.
      </p>
    </form>
  );
}
