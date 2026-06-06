import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Petición inválida." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const service = body.service?.trim() ?? "Sin especificar";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Email no válido." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO ?? user;

  if (!host || !user || !pass) {
    return NextResponse.json(
      { ok: false, error: "El servicio de correo no está configurado." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `Nueva consulta web — ${service}`;

  const text = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    phone ? `Teléfono: ${phone}` : null,
    `Servicio: ${service}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const row = (label: string, value: string) => `
              <tr>
                <td style="padding: 14px 0; border-bottom: 1px solid #ececec;">
                  <p style="margin: 0; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #b8956c; font-weight: 600;">${label}</p>
                  <p style="margin: 4px 0 0; font-size: 16px; color: #1a1a1a;">${value}</p>
                </td>
              </tr>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); font-family: Arial, 'Segoe UI', Helvetica, sans-serif;">
          <!-- Header -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 36px 40px;">
              <p style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff;">CREA<span style="color: #b8956c;">NOGAL</span></p>
              <p style="margin: 6px 0 0; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #b0b0b0;">Nueva consulta desde la web</p>
            </td>
          </tr>
          <!-- Accent bar -->
          <tr>
            <td style="height: 4px; background-color: #b8956c; line-height: 4px; font-size: 0;">&nbsp;</td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 36px 40px 16px;">
              <p style="margin: 0 0 4px; font-size: 18px; color: #1a1a1a;">Has recibido una nueva consulta</p>
              <p style="margin: 0 0 24px; font-size: 14px; color: #6b6b6b;">Detalles del formulario de contacto:</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Nombre", escapeHtml(name))}
                ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color: #e07020; text-decoration: none;">${escapeHtml(email)}</a>`)}
                ${phone ? row("Teléfono", escapeHtml(phone)) : ""}
                ${row("Servicio", escapeHtml(service))}
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding: 8px 40px 36px;">
              <p style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #b8956c; font-weight: 600;">Mensaje</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #f5f5f5; border-left: 3px solid #b8956c; border-radius: 0 8px 8px 0; padding: 18px 20px;">
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1a1a1a; white-space: pre-line;">${escapeHtml(message)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding: 0 40px 36px;">
              <a href="mailto:${escapeHtml(email)}" style="display: inline-block; background-color: #0a0a0a; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 13px 28px; border-radius: 8px;">Responder a ${escapeHtml(name)}</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 24px 40px;">
              <p style="margin: 0; font-size: 12px; color: #b0b0b0;">Este mensaje se ha generado automáticamente desde el formulario de <a href="https://creanogal.es" style="color: #b8956c; text-decoration: none;">creanogal.es</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Web Creanogal" <${user}>`,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al enviar el correo de contacto:", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el mensaje. Inténtalo más tarde." },
      { status: 502 },
    );
  }
}
