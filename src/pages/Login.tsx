import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Field, inputClass, SA_PHONE } from "@/components/FormField";
import { useAuth } from "@/context/auth";
import { BRAND, PHOTOS } from "@/data/macnose";

/** Only follow same-site paths after login, never an external URL. */
const safeNext = (next: string | null) => (next && next.startsWith("/") && !next.startsWith("//") ? next : "/account");

const Login = () => {
  const { user, logIn, signUp } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const next = safeNext(params.get("next"));

  const [mode, setMode] = useState<"login" | "signup">(params.get("mode") === "signup" ? "signup" : "login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  if (user && !busy) return <Navigate to={next} replace />;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === "signup" && form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (mode === "signup" && !SA_PHONE.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a South African number, e.g. 072 123 4567.";
    if (form.password.length < (mode === "signup" ? 6 : 1)) e.password = mode === "signup" ? "Use at least 6 characters." : "Enter your password.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setBusy(true);
    try {
      if (mode === "signup") await signUp({ ...form, phone: form.phone.replace(/\s/g, "") });
      else await logIn(form.email, form.password);
      navigate(next, { replace: true });
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  const switchMode = (m: "login" | "signup") => {
    setMode(m);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center max-w-6xl">
          <div className="hidden lg:block relative">
            <div className="absolute -inset-3 rounded-3xl border-2 border-primary/20 -rotate-2" aria-hidden="true" />
            <img src={PHOTOS.food} alt="" className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-card-hover" />
            <img src={BRAND.logo} alt="" className="absolute -bottom-8 -right-6 w-28 h-28 rounded-full border-4 border-white shadow-xl" />
          </div>

          <div className="w-full max-w-md mx-auto">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-muted-foreground mt-2 mb-8">
              {mode === "login"
                ? "Log in to order for collection or to your table, and track your orders."
                : `Sign up to order from ${BRAND.fullName} and keep your order history in one place.`}
            </p>

            <div role="tablist" className="grid grid-cols-2 p-1 rounded-lg bg-muted mb-8">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => switchMode(m)}
                  className={`h-10 rounded-md text-sm font-semibold transition-colors ${mode === m ? "bg-white text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {m === "login" ? "Log in" : "Sign up"}
                </button>
              ))}
            </div>

            <form onSubmit={submit} noValidate className="space-y-5">
              {mode === "signup" && (
                <Field label="Full name" error={errors.name}>
                  <input className={inputClass} value={form.name} onChange={set("name")} autoComplete="name" placeholder="Thabo Mokoena" />
                </Field>
              )}
              <Field label="Email" error={errors.email}>
                <input type="email" className={inputClass} value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" />
              </Field>
              {mode === "signup" && (
                <Field label="Cellphone" error={errors.phone}>
                  <input type="tel" className={inputClass} value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="072 123 4567" />
                </Field>
              )}
              <Field label="Password" error={errors.password}>
                <input
                  type="password"
                  className={inputClass}
                  value={form.password}
                  onChange={set("password")}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
              </Field>

              {errors.form && <p className="text-sm text-primary bg-primary/5 border border-primary/20 rounded-lg p-3">{errors.form}</p>}

              <Button type="submit" variant="hero" size="lg" className="w-full h-12" disabled={busy}>
                {busy && <Loader2 className="animate-spin" />}
                {mode === "login" ? "Log in" : "Create account"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              {mode === "login" ? "New to MacNose? " : "Already have an account? "}
              <button onClick={() => switchMode(mode === "login" ? "signup" : "login")} className="text-primary font-semibold hover:underline">
                {mode === "login" ? "Create an account" : "Log in"}
              </button>
            </p>
            <p className="text-xs text-muted-foreground text-center mt-8 border-t border-border pt-4">
              Prototype: accounts are saved only in this browser. <Link to="/menu" className="underline">Back to the menu</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
