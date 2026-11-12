import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ORDERABLE, type OrderableItem } from "@/lib/menu";
import { load, save } from "@/lib/storage";

export interface CartLine extends OrderableItem {
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  qtyOf: (id: string) => number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

type Stored = { id: string; qty: number }[];

export const MAX_QTY = 20;

export function CartProvider({ children }: { children: ReactNode }) {
  // Only keep ids that still exist on the menu, in case the menu changed since the last visit.
  const [stored, setStored] = useState<Stored>(() => load<Stored>("cart", []).filter((l) => ORDERABLE.has(l.id) && l.qty > 0));
  const [isOpen, setOpen] = useState(false);

  useEffect(() => save("cart", stored), [stored]);

  const setQty = useCallback((id: string, qty: number) => {
    const next = Math.max(0, Math.min(MAX_QTY, Math.floor(qty)));
    setStored((prev) => {
      const rest = prev.filter((l) => l.id !== id);
      if (next === 0) return rest;
      const existing = prev.findIndex((l) => l.id === id);
      if (existing === -1) return [...prev, { id, qty: next }];
      const copy = [...prev];
      copy[existing] = { id, qty: next };
      return copy;
    });
  }, []);

  const add = useCallback(
    (id: string, qty = 1) => {
      if (!ORDERABLE.has(id)) return;
      setStored((prev) => {
        const current = prev.find((l) => l.id === id)?.qty ?? 0;
        const next = Math.min(MAX_QTY, current + qty);
        return current ? prev.map((l) => (l.id === id ? { id, qty: next } : l)) : [...prev, { id, qty: next }];
      });
    },
    [],
  );

  const value = useMemo<CartContextValue>(() => {
    const lines = stored.map((l) => ({ ...ORDERABLE.get(l.id)!, qty: l.qty }));
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
      qtyOf: (id) => stored.find((l) => l.id === id)?.qty ?? 0,
      add,
      setQty,
      clear: () => setStored([]),
      isOpen,
      setOpen,
    };
  }, [stored, add, setQty, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
