import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ChefHat, CircleCheckBig, ClipboardList, PartyPopper, RotateCcw, XCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { ORDER_STEPS, orderStepIndex, useNow, useOrders } from "@/context/orders";
import { BRAND, DIRECTIONS_URL, formatPrice } from "@/data/macnose";
import { describeFulfilment, describePayment, describeWhen, useReorder } from "@/lib/order-helpers";
import { cn } from "@/lib/utils";

const STEP_ICONS = [ClipboardList, ChefHat, CircleCheckBig, PartyPopper];

const OrderStatus = () => {
  const { id = "" } = useParams();
  const [params] = useSearchParams();
  const { user } = useAuth();
  const { get, cancel } = useOrders();
  const reorder = useReorder();
  const now = useNow(3000);

  const order = get(id);
  const mine = order && user && order.userId === user.id;

  if (!mine) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-36 pb-24 container mx-auto px-4 text-center max-w-md">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-3">Order not found</h1>
          <p className="text-muted-foreground mb-8">We couldn't find that order on your account.</p>
          <Button variant="hero" asChild>
            <Link to="/account">Your Orders</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const step = orderStepIndex(order, now);
  const cancelled = step === -1;
  const justPlaced = params.get("placed") === "1";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {justPlaced && !cancelled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-primary text-primary-foreground p-6 mb-8 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Check size={26} />
              </div>
              <div>
                <p className="font-heading font-bold text-xl">Thank you, {order.contact.name.split(" ")[0]}! Your order is in.</p>
                <p className="text-primary-foreground/85 text-sm">
                  We'll start preparing it {order.readyFor === "asap" ? "right away" : "in time for " + describeWhen(order).toLowerCase()}.
                </p>
              </div>
            </motion.div>
          )}

          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm text-muted-foreground">Order</p>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">#{order.id}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Placed {new Date(order.createdAt).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>
            <Link to="/account" className="text-sm font-semibold text-primary hover:underline">
              All your orders
            </Link>
          </div>

          {/* Tracker */}
          <section className="rounded-2xl border border-border p-6 md:p-8 mb-6">
            {cancelled ? (
              <div className="flex items-center gap-3 text-foreground">
                <XCircle className="text-primary" />
                <p className="font-semibold">This order was cancelled.</p>
              </div>
            ) : (
              <ol className="grid grid-cols-4 gap-2">
                {ORDER_STEPS.map((label, i) => {
                  const Icon = STEP_ICONS[i];
                  const done = i <= step;
                  return (
                    <li key={label} className="relative flex flex-col items-center text-center">
                      {i > 0 && (
                        <span
                          className={cn("absolute top-6 right-1/2 w-full h-0.5 -z-0", i <= step ? "bg-primary" : "bg-border")}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={cn(
                          "relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors",
                          done ? "bg-primary border-primary text-primary-foreground" : "bg-white border-border text-muted-foreground",
                          i === step && "ring-4 ring-primary/20",
                        )}
                      >
                        <Icon size={20} />
                      </span>
                      <span className={cn("mt-3 text-xs md:text-sm font-medium", done ? "text-foreground" : "text-muted-foreground")}>{label}</span>
                    </li>
                  );
                })}
              </ol>
            )}
            {!cancelled && step === 2 && (
              <p className="mt-6 text-center text-sm font-medium text-foreground">
                {order.fulfilment.type === "dine-in" ? "Your food is on its way to your table." : "Your order is ready at the counter."}
              </p>
            )}
            <p className="mt-6 text-xs text-muted-foreground text-center">Prototype: order progress is simulated.</p>
          </section>

          {/* Details */}
          <section className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              ["How", describeFulfilment(order)],
              ["When", describeWhen(order)],
              ["Payment", describePayment(order)],
              ["Contact", `${order.contact.name} · ${order.contact.phone}`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{k}</p>
                <p className="text-sm text-foreground">{v}</p>
              </div>
            ))}
            {order.notes && (
              <div className="rounded-xl border border-border p-4 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Notes</p>
                <p className="text-sm text-foreground whitespace-pre-line">{order.notes}</p>
              </div>
            )}
          </section>

          {/* Items */}
          <section className="rounded-2xl border border-border p-6 mb-8">
            <h2 className="font-heading font-bold text-xl text-foreground mb-4">Items</h2>
            <ul className="divide-y divide-border">
              {order.lines.map((l) => (
                <li key={l.id} className="py-3 flex justify-between gap-4 text-sm">
                  <span>
                    <span className="font-semibold">{l.qty}×</span> {l.name}
                  </span>
                  <span className="font-medium">{formatPrice(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border mt-2 pt-4 flex justify-between items-baseline">
              <span className="text-muted-foreground">Total</span>
              <span className="font-heading font-bold text-2xl">{formatPrice(order.total)}</span>
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <Button variant="hero" onClick={() => reorder(order)}>
              <RotateCcw /> Order Again
            </Button>
            {order.fulfilment.type === "collect" && !cancelled && (
              <Button variant="outline" asChild>
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                  Directions to {BRAND.fullName}
                </a>
              </Button>
            )}
            {step === 0 && (
              <Button variant="ghost" className="text-muted-foreground hover:text-primary" onClick={() => cancel(order.id)}>
                Cancel order
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderStatus;
