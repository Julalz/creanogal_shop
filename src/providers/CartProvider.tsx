"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ALL_QUOOKER_PRODUCTS } from "@/lib/quooker-catalog";
import { readCartFromStorage, writeCartToStorage } from "@/lib/cart-storage";
import type { CartItem, CartLine } from "@/types/cart";

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isReady: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function resolveLines(items: CartItem[]): CartLine[] {
  return items
    .map((item) => {
      const product = ALL_QUOOKER_PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        ...item,
        product,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((line): line is CartLine => line !== null);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readCartFromStorage());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    writeCartToStorage(items);
  }, [items, isReady]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    const safeQty = Math.max(1, Math.floor(quantity));
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + safeQty }
            : item,
        );
      }
      return [...current, { productId, quantity: safeQty }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const safeQty = Math.floor(quantity);
    if (safeQty <= 0) {
      setItems((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity: safeQty } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const lines = useMemo(() => resolveLines(items), [items]);
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines],
  );
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      lines,
      itemCount,
      subtotal,
      isReady,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [items, lines, itemCount, subtotal, isReady, addItem, removeItem, setQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}
