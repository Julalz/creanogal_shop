export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
};

export type OrderItem = {
  productId: string;
  title: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderPayload = {
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  paymentStatus: "paid" | "pending";
  stripeSessionId?: string;
};
