import { useCart } from "@/context/cart";
import type { Order } from "@/context/orders";
import { formatSlot } from "@/lib/hours";
import { ORDERABLE } from "@/lib/menu";

export const describeFulfilment = (o: Order) => (o.fulfilment.type === "dine-in" ? `Dine in · Table ${o.fulfilment.table}` : "Collect at the counter");
export const describeWhen = (o: Order) => (o.readyFor === "asap" ? "As soon as possible" : formatSlot(new Date(o.readyFor), new Date(o.createdAt)));
export const describePayment = (o: Order) =>
  o.payment.method === "card-online"
    ? `Paid by card ending ${o.payment.cardLast4}`
    : o.fulfilment.type === "dine-in"
      ? "Pay at the table (cash or card)"
      : "Pay on collection (cash or card)";

/** Put an old order's items back in the cart. Returns how many lines could be added. */
export function useReorder() {
  const { add, setOpen } = useCart();
  return (order: Order) => {
    const available = order.lines.filter((l) => ORDERABLE.has(l.id));
    available.forEach((l) => add(l.id, l.qty));
    if (available.length) setOpen(true);
    return available.length;
  };
}
