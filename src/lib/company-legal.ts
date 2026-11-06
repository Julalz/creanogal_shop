/** Datos legales — COMPANY_LEGAL_NAME (nombre completo del titular) y COMPANY_DNI en .env */
export const COMPANY = {
  tradeName: "Creanogal",
  legalName: process.env.COMPANY_LEGAL_NAME?.trim() || "Creanogal",
  dni: process.env.COMPANY_DNI?.trim() || "",
  fiscalAddressLine1: "Calle General Mas de Gaminde, 41",
  postalCode: "35006",
  city: "Las Palmas de Gran Canaria",
  province: "Las Palmas",
  country: "España",
  email: "creanogal@gmail.com",
  phone: "654 18 49 33",
  phoneTel: "+34654184933",
  whatsapp: "34654184933",
  instagram: "https://www.instagram.com/creanogal/",
  website: "creanogal.es",
  /** Plazo máximo de entrega declarado en condiciones (SeQura: no superar 40 días). */
  deliveryMaxDays: 30,
  lastUpdate: "noviembre de 2026",
} as const;

export function formatFiscalAddress() {
  return `${COMPANY.fiscalAddressLine1}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.province}, ${COMPANY.country}`;
}

export function formatLegalIdentity() {
  if (COMPANY.dni) {
    return `${COMPANY.legalName}, con DNI ${COMPANY.dni}, domicilio en ${formatFiscalAddress()}`;
  }
  return `${COMPANY.legalName}, domicilio en ${formatFiscalAddress()}`;
}

export function formatDeliveryTerms() {
  return (
    `El plazo máximo de entrega de los productos adquiridos en la tienda online es de ${COMPANY.deliveryMaxDays} días naturales desde la confirmación del pedido y la verificación de stock, acabados e instalación acordados con el cliente. ` +
    `En productos Quooker, envío e instalación se concretan tras el pedido; en ningún caso el plazo total superará los ${COMPANY.deliveryMaxDays} días naturales salvo causa de fuerza mayor o acuerdo expreso distinto por escrito.`
  );
}
