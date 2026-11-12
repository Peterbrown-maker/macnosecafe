import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ChevronRight, LogOut, Receipt, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Field, inputClass, SA_PHONE } from "@/components/FormField";
import { useAuth } from "@/context/auth";
import { orderStatus, useNow, useOrders } from "@/context/orders";
import { formatPrice } from "@/data/macnose";
import { cn } from "@/lib/utils";
import { describeFulfilment, useReorder } from "@/lib/order-helpers";

const STATUS_STYLE: Record<string, string> = {
  "Order received": "bg-muted text-foreground",
  "Being prepared": "bg-primary/10 text-primary",
  Ready: "bg-primary text-primary-foreground",
  Completed: "bg-foreground text-white",
  Cancelled: "bg-muted text-muted-foreground line-through",
};

const Account = () => {
  const { user, logOut, updateProfile } = useAuth();
  const { ordersFor } = useOrders();
  const reorder = useReorder();
  const navigate = useNavigate();
  const now = useNow();

  const [profile, setProfile] = useState({ name: user?.name ?? "", phone: user?.phone ?? "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user) return null; // RequireAuth handles the redirect.
  const orders = ordersFor(user.id);
  const dirty = profile.name !== user.name || profile.phone !== user.phone;

  const saveProfile = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (profile.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!SA_PHONE.test(profile.phone.replace(/\s/g, ""))) errs.phone = "Enter a South African number.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    updateProfile({ name: profile.name, phone: profile.phone.replace(/\s/g, "") });
    toast.success("Your details are saved");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm text-muted-foreground">Your account</p>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Hi, {user.name.split(" ")[0]}</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                logOut();
                navigate("/");
                toast("You're logged out. See you soon!");
              }}
            >
              <LogOut /> Log out
            </Button>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            {/* Orders */}
            <section>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Your Orders</h2>
              {orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                  <Receipt className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground mb-6">No orders yet. Your first plate is waiting.</p>
                  <Button variant="hero" asChild>
                    <Link to="/menu">Browse the Menu</Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {orders.map((o) => {
                    const status = orderStatus(o, now);
                    const count = o.lines.reduce((n, l) => n + l.qty, 0);
                    return (
                      <li key={o.id} className="rounded-xl border border-border hover:shadow-card transition-shadow">
                        <div className="flex items-center gap-4 p-4">
                          <Link to={`/orders/${o.id}`} className="flex-1 min-w-0 group">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">#{o.id}</span>
                              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-pill", STATUS_STYLE[status])}>{status}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {new Date(o.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })} ·{" "}
                              {count} item{count === 1 ? "" : "s"} · {describeFulfilment(o)}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">{o.lines.map((l) => l.name).join(", ")}</p>
                          </Link>
                          <div className="text-right flex-shrink-0">
                            <p className="font-heading font-bold text-foreground">{formatPrice(o.total)}</p>
                            <button
                              onClick={() => reorder(o)}
                              className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                            >
                              <RotateCcw size={12} /> Reorder
                            </button>
                          </div>
                          <ChevronRight size={18} className="text-muted-foreground flex-shrink-0 hidden sm:block" />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* Profile */}
            <aside className="rounded-2xl border border-border p-6">
              <h2 className="font-heading font-bold text-xl text-foreground mb-1">Your Details</h2>
              <p className="text-sm text-muted-foreground mb-6">{user.email}</p>
              <form onSubmit={saveProfile} noValidate className="space-y-4">
                <Field label="Name" error={errors.name}>
                  <input className={inputClass} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </Field>
                <Field label="Cellphone" error={errors.phone}>
                  <input type="tel" className={inputClass} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </Field>
                <Button type="submit" className="w-full" disabled={!dirty}>
                  Save details
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-6">
                Member since {new Date(user.createdAt).toLocaleDateString("en-ZA", { month: "long", year: "numeric" })}
              </p>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
