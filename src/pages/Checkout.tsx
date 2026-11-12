import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Banknote, CreditCard, Loader2, Lock, ShoppingBag, Store, UtensilsCrossed } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Field, inputClass, SA_PHONE } from "@/components/FormField";
import { QuantityControl } from "@/components/cart/QuantityControl";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { useOrders, type PaymentMethod } from "@/context/orders";
import { formatPrice, OPENING_HOURS } from "@/data/macnose";
import { formatSlot, isTakingOrders, pickupSlots } from "@/lib/hours";
import { cn } from "@/lib/utils";

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-border p-6 md:p-8">
      <h2 className="flex items-center gap-3 font-heading font-bold text-xl text-foreground mb-6">
        <span className="w-8 h-8 rounded-full bg-foreground text-white text-sm font-body flex items-center justify-center">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Choice({
  selected,
  onSelect,
  icon,
  title,
  description,
  disabled,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "w-full text-left flex gap-4 p-4 rounded-xl border-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        selected ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30",
      )}
    >
      <span className={cn("mt-0.5", selected ? "text-primary" : "text-muted-foreground")}>{icon}</span>
      <span>
        <span className="block font-semibold text-foreground">{title}</span>
        <span className="block text-sm text-muted-foreground">{description}</span>
      </span>
    </button>
  );
}

const digits = (s: string) => s.replace(/\D/g, "");

/** Luhn check, so the demo card form behaves like a real one. */
const luhn = (num: string) => {
  let sum = 0;
  [...num].reverse().forEach((c, i) => {
    let d = Number(c);
    if (i % 2) d = d * 2 > 9 ? d * 2 - 9 : d * 2;
    sum += d;
  });
  return num.length >= 13 && sum % 10 === 0;
};

const Checkout = () => {
  const { lines, subtotal, clear } = useCart();
  const { user } = useAuth();
  const { place } = useOrders();
  const navigate = useNavigate();

  const openNow = isTakingOrders();
  const slots = useMemo(() => pickupSlots(), []);

  const [fulfilment, setFulfilment] = useState<"collect" | "dine-in">("collect");
  const [table, setTable] = useState("");
  const [when, setWhen] = useState<string>(openNow ? "asap" : slots[0]?.toISOString() ?? "asap");
  const [contact, setContact] = useState({ name: user?.name ?? "", phone: user?.phone ?? "" });
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("pay-at-counter");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  if (lines.length === 0 && !busy) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-36 pb-24 container mx-auto px-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={28} />
          </div>
          <h1 className="font-heading font-bold text-3xl text-foreground mb-3">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add a few things from the menu, then come back to check out.</p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/menu">Browse the Menu</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (fulfilment === "dine-in" && !table.trim()) e.table = "Tell us your table number.";
    if (contact.name.trim().length < 2) e.name = "Please enter your name.";
    if (!SA_PHONE.test(contact.phone.replace(/\s/g, ""))) e.phone = "Enter a South African number, e.g. 072 123 4567.";
    if (when === "asap" && !openNow) e.when = "We're closed right now. Pick a time below.";
    if (payment === "card-online") {
      if (!luhn(digits(card.number))) e.cardNumber = "Check the card number.";
      const m = card.expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
      const expiryOk = m && +m[1] >= 1 && +m[1] <= 12 && new Date(2000 + +m[2], +m[1]) > new Date();
      if (!expiryOk) e.expiry = "Use MM/YY.";
      if (!/^\d{3,4}$/.test(card.cvc)) e.cvc = "3 or 4 digits.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !validate()) {
      // Wait for the error messages to render, then bring the first one into view.
      setTimeout(() => document.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return;
    }
    setBusy(true);
    // Pretend to talk to the kitchen / payment provider.
    await new Promise((r) => setTimeout(r, payment === "card-online" ? 1600 : 900));
    const order = place({
      userId: user.id,
      lines: lines.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
      total: subtotal,
      fulfilment: fulfilment === "dine-in" ? { type: "dine-in", table: table.trim() } : { type: "collect" },
      readyFor: when,
      contact: { name: contact.name.trim(), phone: contact.phone.replace(/\s/g, "") },
      payment: payment === "card-online" ? { method: payment, cardLast4: digits(card.number).slice(-4) } : { method: payment },
      notes: notes.trim(),
    });
    clear();
    navigate(`/orders/${order.id}?placed=1`, { replace: true });
  };

  const err = (key: string) => errors[key];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground mb-10">Good food takes time to prepare. Everything is made fresh when you order.</p>

          <form onSubmit={submit} noValidate className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="space-y-6">
              <Step n={1} title="How would you like it?">
                <div role="radiogroup" className="grid sm:grid-cols-2 gap-3">
                  <Choice
                    selected={fulfilment === "collect"}
                    onSelect={() => setFulfilment("collect")}
                    icon={<Store size={22} />}
                    title="Collect"
                    description="Pick it up at the counter"
                  />
                  <Choice
                    selected={fulfilment === "dine-in"}
                    onSelect={() => setFulfilment("dine-in")}
                    icon={<UtensilsCrossed size={22} />}
                    title="Dine in"
                    description="We'll bring it to your table"
                  />
                </div>
                {fulfilment === "dine-in" && (
                  <div className="mt-5 max-w-xs" data-error={err("table") ? "" : undefined}>
                    <Field label="Table number" error={err("table")}>
                      <input className={inputClass} value={table} onChange={(e) => setTable(e.target.value)} placeholder="e.g. 12" />
                    </Field>
                  </div>
                )}
              </Step>

              <Step n={2} title="When?">
                {!openNow && (
                  <p className="flex items-start gap-2 text-sm text-foreground bg-muted rounded-lg p-3 mb-4">
                    <AlertCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    We're not taking orders right now, but you can schedule one for later.
                  </p>
                )}
                <div role="radiogroup" className="grid sm:grid-cols-2 gap-3" data-error={err("when") ? "" : undefined}>
                  <Choice
                    selected={when === "asap"}
                    onSelect={() => setWhen("asap")}
                    disabled={!openNow}
                    icon={<span className="font-bold text-sm">⚡</span>}
                    title="As soon as possible"
                    description="Usually 20–30 minutes"
                  />
                  <Choice
                    selected={when !== "asap"}
                    onSelect={() => slots[0] && setWhen(slots[0].toISOString())}
                    disabled={slots.length === 0}
                    icon={<span className="font-bold text-sm">🕒</span>}
                    title="Schedule for later"
                    description="Choose a time below"
                  />
                </div>
                {err("when") && <p className="text-sm text-primary mt-2">{err("when")}</p>}
                {when !== "asap" && (
                  <div className="mt-5 max-w-xs">
                    <Field label="Ready at">
                      <select className={inputClass} value={when} onChange={(e) => setWhen(e.target.value)}>
                        {slots.map((s) => (
                          <option key={s.toISOString()} value={s.toISOString()}>
                            {formatSlot(s)}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-4">
                  Hours: {OPENING_HOURS.map((h) => `${h.days} ${h.hours}`).join(" · ")}
                </p>
              </Step>

              <Step n={3} title="Your details">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div data-error={err("name") ? "" : undefined}>
                    <Field label="Name" error={err("name")}>
                      <input className={inputClass} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} autoComplete="name" />
                    </Field>
                  </div>
                  <div data-error={err("phone") ? "" : undefined}>
                    <Field label="Cellphone" error={err("phone")} hint="We'll call if there's a problem with your order.">
                      <input type="tel" className={inputClass} value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} autoComplete="tel" />
                    </Field>
                  </div>
                </div>
                <div className="mt-5">
                  <Field label="Notes for the kitchen (optional)" hint="Allergies, sauce choice (hot or mild), starch choice, anything we should know.">
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      maxLength={300}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                      placeholder="e.g. Pap with the mogodu, mild sauce on the wings"
                    />
                  </Field>
                </div>
              </Step>

              <Step n={4} title="Payment">
                <div role="radiogroup" className="grid sm:grid-cols-2 gap-3">
                  <Choice
                    selected={payment === "pay-at-counter"}
                    onSelect={() => setPayment("pay-at-counter")}
                    icon={<Banknote size={22} />}
                    title={fulfilment === "dine-in" ? "Pay at the table" : "Pay on collection"}
                    description="Cash or card"
                  />
                  <Choice
                    selected={payment === "card-online"}
                    onSelect={() => setPayment("card-online")}
                    icon={<CreditCard size={22} />}
                    title="Pay now by card"
                    description="Secure online payment"
                  />
                </div>
                {payment === "card-online" && (
                  <div className="mt-5 space-y-5">
                    <div data-error={err("cardNumber") ? "" : undefined}>
                      <Field label="Card number" error={err("cardNumber")} hint="Prototype: try 4242 4242 4242 4242. Nothing is charged or stored.">
                        <input
                          inputMode="numeric"
                          autoComplete="cc-number"
                          className={inputClass}
                          value={card.number}
                          onChange={(e) => setCard({ ...card, number: digits(e.target.value).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ") })}
                          placeholder="1234 5678 9012 3456"
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-5 max-w-sm" data-error={err("expiry") || err("cvc") ? "" : undefined}>
                      <Field label="Expiry" error={err("expiry")}>
                        <input
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          className={inputClass}
                          value={card.expiry}
                          onChange={(e) => {
                            const d = digits(e.target.value).slice(0, 4);
                            setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                          }}
                          placeholder="MM/YY"
                        />
                      </Field>
                      <Field label="CVC" error={err("cvc")}>
                        <input
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          className={inputClass}
                          value={card.cvc}
                          onChange={(e) => setCard({ ...card, cvc: digits(e.target.value).slice(0, 4) })}
                          placeholder="123"
                        />
                      </Field>
                    </div>
                  </div>
                )}
              </Step>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-28 bg-white rounded-2xl border border-border shadow-card p-6">
              <h2 className="font-heading font-bold text-xl text-foreground mb-4">Your Order</h2>
              <ul className="divide-y divide-border max-h-[40vh] overflow-y-auto -mx-1 px-1">
                {lines.map((line) => (
                  <li key={line.id} className="py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{line.name}</p>
                      <p className="text-xs text-muted-foreground">{formatPrice(line.price)} each</p>
                    </div>
                    <QuantityControl id={line.id} size="sm" />
                    <span className="w-16 text-right text-sm font-semibold">{formatPrice(line.price * line.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border mt-2 pt-4 flex justify-between items-baseline">
                <span className="text-muted-foreground">Total</span>
                <span className="font-heading font-bold text-2xl text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full h-12 mt-6" disabled={busy}>
                {busy ? <Loader2 className="animate-spin" /> : payment === "card-online" ? <Lock /> : null}
                {busy
                  ? payment === "card-online"
                    ? "Processing payment…"
                    : "Placing order…"
                  : payment === "card-online"
                    ? `Pay ${formatPrice(subtotal)}`
                    : "Place Order"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Prototype: no real order is sent and no payment is taken.
              </p>
            </aside>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
