import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { load, newId, save } from "@/lib/storage";

// PROTOTYPE ONLY: orders are saved in this browser and never reach the
// restaurant. Order progress is simulated from the time the order was placed.

export type Fulfilment = { type: "collect" } | { type: "dine-in"; table: string };
export type PaymentMethod = "pay-at-counter" | "card-online";

export interface OrderLine {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  userId: string;
  createdAt: string;
  lines: OrderLine[];
  total: number;
  fulfilment: Fulfilment;
  /** "asap" or an ISO time the customer picked. */
  readyFor: string;
  contact: { name: string; phone: string };
  payment: { method: PaymentMethod; cardLast4?: string };
  notes: string;
  cancelledAt?: string;
}

export const ORDER_STEPS = ["Order received", "Being prepared", "Ready", "Completed"] as const;
export type OrderStep = (typeof ORDER_STEPS)[number] | "Cancelled";

/** Simulated kitchen timing, in seconds after the order is placed (or after the chosen time). */
const STEP_AFTER = [0, 30, 180, 30 * 60];

/** Index into ORDER_STEPS, or -1 if cancelled. */
export function orderStepIndex(order: Order, now = Date.now()) {
  if (order.cancelledAt) return -1;
  const placed = new Date(order.createdAt).getTime();
  // A scheduled order starts cooking 15 minutes before its time.
  const start = order.readyFor === "asap" ? placed : Math.max(placed, new Date(order.readyFor).getTime() - 15 * 60_000);
  const elapsed = (now - start) / 1000;
  let step = 0;
  STEP_AFTER.forEach((after, i) => {
    if (elapsed >= after) step = i;
  });
  return step;
}

export const orderStatus = (order: Order, now = Date.now()): OrderStep => {
  const i = orderStepIndex(order, now);
  return i === -1 ? "Cancelled" : ORDER_STEPS[i];
};

/** Re-render every few seconds so simulated statuses move along on screen. */
export function useNow(intervalMs = 5000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs]);
  return now;
}

interface OrdersContextValue {
  orders: Order[];
  ordersFor: (userId: string) => Order[];
  get: (id: string) => Order | undefined;
  place: (order: Omit<Order, "id" | "createdAt">) => Order;
  cancel: (id: string) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => load<Order[]>("orders", []));
  useEffect(() => save("orders", orders), [orders]);

  const place = useCallback<OrdersContextValue["place"]>((data) => {
    const order: Order = { ...data, id: newId("MN"), createdAt: new Date().toISOString() };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const value = useMemo<OrdersContextValue>(
    () => ({
      orders,
      ordersFor: (userId) => orders.filter((o) => o.userId === userId),
      get: (id) => orders.find((o) => o.id === id),
      place,
      cancel: (id) =>
        setOrders((prev) =>
          prev.map((o) => (o.id === id && orderStepIndex(o) === 0 ? { ...o, cancelledAt: new Date().toISOString() } : o)),
        ),
    }),
    [orders, place],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used inside <OrdersProvider>");
  return ctx;
}
