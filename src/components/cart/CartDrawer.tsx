import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { QuantityControl } from "@/components/cart/QuantityControl";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { formatPrice } from "@/data/macnose";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, setOpen, setQty, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const checkout = () => {
    setOpen(false);
    navigate(user ? "/checkout" : "/login?next=/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-white">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border text-left">
          <SheetTitle className="font-heading text-2xl">Your Order</SheetTitle>
          <SheetDescription>
            {count === 0 ? "Nothing here yet." : `${count} item${count === 1 ? "" : "s"} · freshly prepared to order`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <ShoppingBag size={28} />
            </div>
            <p className="text-muted-foreground max-w-xs">Your cart is empty. Find something good on the menu.</p>
            <Button variant="hero" asChild onClick={() => setOpen(false)}>
              <Link to="/menu">Browse the Menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 divide-y divide-border">
              {lines.map((line) => (
                <li key={line.id} className="py-4 flex gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{line.name}</p>
                    <p className="text-xs text-muted-foreground">{line.sectionName}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <QuantityControl id={line.id} size="sm" />
                      <button
                        onClick={() => setQty(line.id, 0)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Remove ${line.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="font-heading font-semibold text-foreground whitespace-nowrap">{formatPrice(line.price * line.qty)}</p>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5 space-y-4 bg-white">
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Total</span>
                <span className="font-heading font-bold text-2xl text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <Button variant="hero" size="lg" className="w-full h-12" onClick={checkout}>
                {user ? "Checkout" : "Log in to Checkout"}
              </Button>
              <button onClick={clear} className="w-full text-sm text-muted-foreground hover:text-primary transition-colors">
                Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
