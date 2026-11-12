import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/data/macnose";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";

function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      onClick={() => setOpen(true)}
      className="relative p-2 text-foreground hover:text-primary transition-colors"
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <ShoppingBag size={22} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Specials", path: "/specials" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const accountPath = user ? "/account" : "/login";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-navbar shadow-card" : "bg-white"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label={`${BRAND.name} home`}>
            <img src={BRAND.logo} alt={BRAND.fullName} className="h-11 md:h-14 w-auto rounded-full" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors duration-200 ${active ? "text-foreground" : "text-foreground/70 hover:text-primary"}`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 gradient-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            <div className="flex items-center gap-1">
              <Link
                to={accountPath}
                className="p-2 text-foreground hover:text-primary transition-colors"
                aria-label={user ? "Your account" : "Log in"}
                title={user ? `Signed in as ${user.name}` : "Log in"}
              >
                <User size={22} />
              </Link>
              <CartButton />
            </div>
            <Button size="sm" className="hidden lg:inline-flex" asChild>
              <Link to="/menu">Order Now</Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-1">
          <CartButton />
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-secondary/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-card-hover z-50 md:hidden p-8 flex flex-col"
            >
              <button
                className="self-end text-foreground p-2 mb-8"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Link
                      to={link.path}
                      className={`text-lg font-medium transition-colors ${
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link
                to={accountPath}
                className="mt-8 flex items-center gap-2 text-lg font-medium text-foreground/70 hover:text-foreground"
              >
                <User size={20} /> {user ? "Your account" : "Log in / Sign up"}
              </Link>

              <div className="mt-auto">
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/menu">Order Now</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
