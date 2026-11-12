import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { MAX_QTY, useCart } from "@/context/cart";
import { ORDERABLE } from "@/lib/menu";
import { cn } from "@/lib/utils";

/** "Add" button that turns into a − qty + stepper once the item is in the cart. */
export function QuantityControl({ id, size = "md", className }: { id: string; size?: "sm" | "md"; className?: string }) {
  const { qtyOf, add, setQty, setOpen } = useCart();
  const qty = qtyOf(id);
  const item = ORDERABLE.get(id);
  if (!item) return null;

  const btn = size === "sm" ? "w-7 h-7" : "w-8 h-8";

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => {
          add(id);
          toast.success(`${item.name} added to your order`, {
            action: { label: "View cart", onClick: () => setOpen(true) },
          });
        }}
        aria-label={`Add ${item.name} to cart`}
        className={cn(
          "inline-flex items-center gap-1 rounded-pill border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors",
          size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-sm",
          className,
        )}
      >
        <Plus size={14} /> Add
      </button>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-pill bg-primary text-primary-foreground", className)}>
      <button
        type="button"
        onClick={() => setQty(id, qty - 1)}
        className={cn(btn, "rounded-full flex items-center justify-center hover:bg-white/20 transition-colors")}
        aria-label={`Remove one ${item.name}`}
      >
        <Minus size={14} />
      </button>
      <span className="min-w-5 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => setQty(id, qty + 1)}
        disabled={qty >= MAX_QTY}
        className={cn(btn, "rounded-full flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-40")}
        aria-label={`Add one more ${item.name}`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
