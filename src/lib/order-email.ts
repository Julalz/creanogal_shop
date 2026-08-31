import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { OrderPayload } from "@/types/order";
import { getSiteUrl } from "@/lib/site-url";

export type SentEmailInfo = {
  to: string;
  messageId: string;
};

export type OrderEmailResult = {
  admin: SentEmailInfo;
  customer?: SentEmailInfo;
};

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

function logEmailSent(label: string, to: string, messageId: string) {
  console.info(`[order-email] ✅ ${label} enviado → ${to} (id: ${messageId})`);
}

export function getMailConfigStatus() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminTo = process.env.CONTACT_TO ?? user;

  return {
    configured: Boolean(host && user && pass && adminTo),
    host: host ?? null,
    adminTo: adminTo ?? null,
  };
}

function getMailConfig() {
  const config = getMailConfigStatus();
  if (!config.configured) {
    throw new Error(
      "SMTP no configurado. Revisa SMTP_HOST, SMTP_USER, SMTP_PASS y CONTACT_TO en .env",
    );
  }

  return {
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
    adminTo: config.adminTo!,
  };
}

function createTransporter(config: ReturnType<typeof getMailConfig>): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });
}

function buildItemsText(items: OrderPayload["items"]) {
  return items
    .map((item) => `- ${item.title} × ${item.quantity} — ${formatEuro(item.lineTotal)}`)
    .join("\n");
}

function buildItemsTableRows(items: OrderPayload["items"]) {
  return items
    .map((item) => {
      const title = escapeHtml(item.title);
      return `<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #ececec; font-size: 15px; color: #1a1a1a;">${title}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #ececec; text-align: center; font-size: 15px; color: #6b6b6b;">${item.quantity}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #ececec; text-align: right; font-size: 15px; color: #1a1a1a;">${formatEuro(item.lineTotal)}</td>
      </tr>`;
    })
    .join("");
}

function emailLayout(title: string, subtitle: string, body: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); font-family: Arial, 'Segoe UI', Helvetica, sans-serif;">
          <tr>
            <td style="background-color: #0a0a0a; padding: 36px 40px;">
              <p style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff;">CREA<span style="color: #b8956c;">NOGAL</span></p>
              <p style="margin: 6px 0 0; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #b0b0b0;">${escapeHtml(subtitle)}</p>
            </td>
          </tr>
          <tr>
            <td style="height: 4px; background-color: #b8956c; line-height: 4px; font-size: 0;">&nbsp;</td>
          </tr>
          ${body}
          <tr>
            <td style="background-color: #0a0a0a; padding: 24px 40px;">
              <p style="margin: 0; font-size: 12px; color: #b0b0b0;">Creanogal · Distribuidor oficial Quooker en Las Palmas · <a href="${escapeHtml(getSiteUrl())}" style="color: #b8956c; text-decoration: none;">creanogal.es</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendAdminOrderEmail(
  transporter: Transporter,
  from: string,
  adminTo: string,
  order: OrderPayload,
): Promise<SentEmailInfo> {
  const { customer, items, subtotal, paymentStatus, stripeSessionId } = order;
  const paymentLabel =
    paymentStatus === "paid" ? "Pagado (Klarna / Stripe)" : "Pago pendiente de confirmar";

  const subject =
    paymentStatus === "paid"
      ? `Pedido pagado Quooker — ${customer.name}`
      : `Nuevo pedido web Quooker — ${customer.name}`;

  const text = [
    paymentStatus === "paid" ? "PEDIDO PAGADO — TIENDA QUOOKER" : "NUEVO PEDIDO — TIENDA QUOOKER",
    "",
    `Estado del pago: ${paymentLabel}`,
    stripeSessionId ? `Referencia Stripe: ${stripeSessionId}` : null,
    "",
    `Cliente: ${customer.name}`,
    `Email: ${customer.email}`,
    `Teléfono: ${customer.phone}`,
    `Dirección: ${customer.address}`,
    `${customer.postalCode} ${customer.city}`,
    customer.notes ? `Notas: ${customer.notes}` : null,
    "",
    "PRODUCTOS:",
    buildItemsText(items),
    "",
    `TOTAL: ${formatEuro(subtotal)}`,
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

  const body = `
    <tr>
      <td style="padding: 36px 40px 16px;">
        <p style="margin: 0 0 4px; font-size: 18px; color: #1a1a1a;">${paymentStatus === "paid" ? "Nuevo pedido pagado" : "Nuevo pedido recibido"}</p>
        <p style="margin: 0 0 24px; font-size: 14px; color: #6b6b6b;">Estado del pago: ${escapeHtml(paymentLabel)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("Cliente", escapeHtml(customer.name))}
          ${row("Email", `<a href="mailto:${escapeHtml(customer.email)}" style="color: #e07020; text-decoration: none;">${escapeHtml(customer.email)}</a>`)}
          ${row("Teléfono", escapeHtml(customer.phone))}
          ${row("Dirección", `${escapeHtml(customer.address)}, ${escapeHtml(customer.postalCode)} ${escapeHtml(customer.city)}`)}
          ${stripeSessionId ? row("Referencia Stripe", escapeHtml(stripeSessionId)) : ""}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 40px 24px;">
        <p style="margin: 0 0 12px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #b8956c; font-weight: 600;">Productos</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th align="left" style="padding-bottom: 8px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #999;">Producto</th>
              <th style="padding-bottom: 8px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #999;">Cant.</th>
              <th align="right" style="padding-bottom: 8px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #999;">Total</th>
            </tr>
          </thead>
          <tbody>${buildItemsTableRows(items)}</tbody>
        </table>
        <p style="margin: 20px 0 0; font-size: 18px; color: #1a1a1a; text-align: right;"><strong>Total: ${formatEuro(subtotal)}</strong></p>
        ${customer.notes ? `<p style="margin: 16px 0 0; font-size: 14px; color: #6b6b6b;"><strong>Notas:</strong> ${escapeHtml(customer.notes)}</p>` : ""}
      </td>
    </tr>
    <tr>
      <td style="padding: 0 40px 36px;">
        <a href="mailto:${escapeHtml(customer.email)}" style="display: inline-block; background-color: #0a0a0a; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 13px 28px; border-radius: 8px;">Contactar al cliente</a>
      </td>
    </tr>`;

  const info = await transporter.sendMail({
    from: `"Creanogal Web" <${from}>`,
    to: adminTo,
    replyTo: customer.email,
    subject,
    text,
    html: emailLayout(subject, "Tienda Quooker", body),
  });

  return { to: adminTo, messageId: info.messageId };
}

async function sendCustomerConfirmationEmail(
  transporter: Transporter,
  from: string,
  order: OrderPayload,
): Promise<SentEmailInfo> {
  const { customer, items, subtotal, stripeSessionId } = order;
  const firstName = customer.name.split(" ")[0] || customer.name;
  const subject = "Confirmación de tu pedido Quooker — Creanogal";

  const text = [
    `Hola ${customer.name},`,
    "",
    "Gracias por tu compra. Hemos recibido tu pago correctamente.",
    "",
    "RESUMEN DEL PEDIDO:",
    buildItemsText(items),
    "",
    `TOTAL PAGADO: ${formatEuro(subtotal)}`,
    stripeSessionId ? `Referencia: ${stripeSessionId}` : null,
    "",
    "Próximos pasos:",
    "Nos pondremos en contacto contigo para confirmar acabados, envío e instalación.",
    "",
    "Dirección de envío:",
    `${customer.address}`,
    `${customer.postalCode} ${customer.city}`,
    "",
    "Si tienes alguna duda, responde a este email o llámanos.",
    "",
    "Creanogal · Distribuidor oficial Quooker en Las Palmas",
  ]
    .filter(Boolean)
    .join("\n");

  const body = `
    <tr>
      <td style="padding: 36px 40px 16px;">
        <p style="margin: 0 0 8px; font-size: 22px; color: #1a1a1a;">Gracias, ${escapeHtml(firstName)}</p>
        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #6b6b6b;">
          Tu pago se ha procesado correctamente. Este email confirma tu pedido en la tienda Quooker de Creanogal.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 8px;">
          <tr>
            <td style="padding: 16px 20px;">
              <p style="margin: 0; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #b8956c; font-weight: 600;">Estado del pago</p>
              <p style="margin: 6px 0 0; font-size: 16px; color: #1a1a1a;">Pago confirmado</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 40px 24px;">
        <p style="margin: 0 0 12px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #b8956c; font-weight: 600;">Tu pedido</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th align="left" style="padding-bottom: 8px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #999;">Producto</th>
              <th style="padding-bottom: 8px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #999;">Cant.</th>
              <th align="right" style="padding-bottom: 8px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #999;">Total</th>
            </tr>
          </thead>
          <tbody>${buildItemsTableRows(items)}</tbody>
        </table>
        <p style="margin: 20px 0 0; font-size: 18px; color: #1a1a1a; text-align: right;"><strong>Total pagado: ${formatEuro(subtotal)}</strong></p>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 40px 24px;">
        <p style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #b8956c; font-weight: 600;">Envío</p>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1a1a1a;">
          ${escapeHtml(customer.address)}<br>
          ${escapeHtml(customer.postalCode)} ${escapeHtml(customer.city)}
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 40px 36px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background-color: #f5f5f5; border-left: 3px solid #b8956c; border-radius: 0 8px 8px 0; padding: 18px 20px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1a1a1a;">
                Nos pondremos en contacto contigo en breve para confirmar acabados, envío e instalación.
                Si tienes alguna duda, responde a este email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  const info = await transporter.sendMail({
    from: `"Creanogal" <${from}>`,
    to: customer.email,
    replyTo: process.env.CONTACT_TO ?? from,
    subject,
    text,
    html: emailLayout(subject, "Confirmación de pedido", body),
  });

  return { to: customer.email, messageId: info.messageId };
}

/** Notifica a Creanogal y, si el pago está confirmado, envía confirmación al cliente. */
export async function sendOrderNotifications(order: OrderPayload): Promise<OrderEmailResult> {
  console.info(
    `[order-email] Enviando pedido ${order.stripeSessionId ?? "(sin ref)"} — cliente: ${order.customer.email}`,
  );

  const config = getMailConfig();
  const transporter = createTransporter(config);

  const admin = await sendAdminOrderEmail(transporter, config.user, config.adminTo, order);
  logEmailSent("Aviso admin (Creanogal)", admin.to, admin.messageId);

  const result: OrderEmailResult = { admin };

  if (order.paymentStatus === "paid") {
    const customer = await sendCustomerConfirmationEmail(transporter, config.user, order);
    logEmailSent("Confirmación cliente", customer.to, customer.messageId);
    result.customer = customer;
  }

  console.info("[order-email] ✅ Pedido notificado por email correctamente");
  return result;
}

/** @deprecated Usa sendOrderNotifications */
export async function sendOrderEmail(order: OrderPayload) {
  return sendOrderNotifications(order);
}
