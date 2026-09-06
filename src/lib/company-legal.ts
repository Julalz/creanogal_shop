/** Datos legales de la empresa — actualizar COMPANY_LEGAL_NAME y COMPANY_TAX_ID en .env */
export const COMPANY = {
  tradeName: "Creanogal",
  legalName: process.env.COMPANY_LEGAL_NAME?.trim() || "Creanogal",
  taxId: process.env.COMPANY_TAX_ID?.trim() || "",
  fiscalAddressLine1: "Calle General Mas de Gaminde, 41",
  postalCode: "35006",
  city: "Las Palmas de Gran Canaria",
  province: "Las Palmas",
  country: "España",
  email: "creanogal@gmail.com",
  phone: "654 18 49 33",
  phoneTel: "+34654184933",
  website: "creanogal.es",
  lastUpdate: "abril de 2026",
} as const;

export function formatFiscalAddress() {
  return `${COMPANY.fiscalAddressLine1}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.province}, ${COMPANY.country}`;
}

export function formatLegalIdentity() {
  if (COMPANY.taxId) {
    return `${COMPANY.legalName}, con NIF ${COMPANY.taxId}, domicilio social en ${formatFiscalAddress()}`;
  }
  return `${COMPANY.legalName}, domicilio social en ${formatFiscalAddress()}`;
}
