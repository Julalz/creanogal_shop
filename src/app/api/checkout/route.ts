import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type CheckoutItem = {
  productId?: string;
  title?: string;
  quantity?: number;
  unitPrice?: number;
  lineTotal?: number;
};

type CheckoutPayload = {
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    notes?: string;
  };
  items?: CheckoutItem[];
  subtotal?: number;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatEuro(amount: number) {
  return amount.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

export async function POST(request: Request) {
  let body: CheckoutPayload;

  try {
    body = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Petición inválida." }, { status: 400 });
  }

  const customer = body.customer ?? {};
  const name = customer.name?.trim() ?? "";
  const email = customer.email?.trim() ?? "";
  const phone = customer.phone?.trim() ?? "";
  const address = customer.address?.trim() ?? "";
  const city = customer.city?.trim() ?? "";
  const postalCode = customer.postalCode?.trim() ?? "";
  const notes = customer.notes?.trim() ?? "";
  const items = Array.isArray(body.items) ? body.items : [];
  const subtotal = typeof body.subtotal === "number" ? body.subtotal : 0;

  if (!name || !email || !phone || !address || !city || !postalCode) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Email no válido." }, { status: 400 });
  }

  if (items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "El carrito está vacío." },
      { status: 400 },
    );
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

  const itemsText = items
    .map((item) => {
      const title = item.title ?? item.productId ?? "Producto";
      const qty = item.quantity ?? 1;
      const lineTotal = item.lineTotal ?? 0;
      return `- ${title} × ${qty} — ${formatEuro(lineTotal)}`;
    })
    .join("\n");

  const subject = `Nuevo pedido web Quooker — ${name}`;

  const text = [
    "NUEVO PEDIDO — TIENDA QUOOKER",
    "",
    `Cliente: ${name}`,
    `Email: ${email}`,
    `Teléfono: ${phone}`,
    `Dirección: ${address}`,
    `${postalCode} ${city}`,
    notes ? `Notas: ${notes}` : null,
    "",
    "PRODUCTOS:",
    itemsText,
    "",
    `TOTAL: ${formatEuro(subtotal)}`,
    "",
    "Pago pendiente de confirmar (SeQura por activar).",
  ]
    .filter(Boolean)
    .join("\n");

  const itemsHtml = items
    .map((item) => {
      const title = escapeHtml(item.title ?? item.productId ?? "Producto");
      const qty = item.quantity ?? 1;
      const lineTotal = formatEuro(item.lineTotal ?? 0);
      return `<tr><td>${title}</td><td>${qty}</td><td>${lineTotal}</td></tr>`;
    })
    .join("");

  const html = `
    <h2>Nuevo pedido — Tienda Quooker</h2>
    <p><strong>Cliente:</strong> ${escapeHtml(name)}<br>
    <strong>Email:</strong> ${escapeHtml(email)}<br>
    <strong>Teléfono:</strong> ${escapeHtml(phone)}<br>
    <strong>Dirección:</strong> ${escapeHtml(address)}, ${escapeHtml(postalCode)} ${escapeHtml(city)}</p>
    ${notes ? `<p><strong>Notas:</strong> ${escapeHtml(notes)}</p>` : ""}
    <table border="1" cellpadding="8" cellspacing="0">
      <thead><tr><th>Producto</th><th>Cant.</th><th>Total</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <p><strong>Total:</strong> ${formatEuro(subtotal)}</p>
    <p><em>Pago pendiente de confirmar (SeQura por activar).</em></p>
  `;

  try {
    await transporter.sendMail({
      from: `"Creanogal Web" <${user}>`,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el pedido. Inténtalo más tarde." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
