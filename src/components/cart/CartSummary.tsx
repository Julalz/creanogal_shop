import "./cart.css";

type CartSummaryProps = {
  subtotal: number;
};

export function CartSummary({ subtotal }: CartSummaryProps) {
  return (
    <aside className="cart-summary">
      <div className="cart-summary__row">
        <span>Subtotal</span>
        <span>
          {subtotal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
        </span>
      </div>
      <div className="cart-summary__row cart-summary__total">
        <span>Total</span>
        <span>
          {subtotal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
        </span>
      </div>
      <button type="button" className="btn btn--primary">
        Finalizar compra
      </button>
    </aside>
  );
}
