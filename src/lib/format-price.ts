export function formatPrice(amount: number, maximumFractionDigits = 0) {
  return amount.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits,
  });
}
