/** Nombre completo del titular (texto fijo en código; no usar variables de entorno por problemas de codificación con la ñ). */
export const OWNER_FULL_NAME = "Brayan Noguera Castaño";

/** Datos legales — opcional: COMPANY_DNI en .env */
export const COMPANY = {
  tradeName: "Creanogal",
  legalName: OWNER_FULL_NAME,
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
    return `${OWNER_FULL_NAME}, con DNI ${COMPANY.dni}, domicilio en ${formatFiscalAddress()}`;
  }
  return `${OWNER_FULL_NAME}, domicilio en ${formatFiscalAddress()}`;
}

export function formatDeliveryTerms() {
  return (
    `El plazo máximo de entrega de los productos adquiridos en la tienda online es de ${COMPANY.deliveryMaxDays} días naturales desde la confirmación del pedido y la verificación de stock, acabados e instalación acordados con el cliente. ` +
    `En productos Quooker, envío e instalación se concretan tras el pedido; en ningún caso el plazo total superará los ${COMPANY.deliveryMaxDays} días naturales salvo causa de fuerza mayor o acuerdo expreso distinto por escrito.`
  );
}
