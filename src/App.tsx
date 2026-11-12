import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Specials from "./pages/Specials";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import OrderStatus from "./pages/OrderStatus";
import Account from "./pages/Account";
import { RequireAuth } from "@/components/RequireAuth";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/cart";
import { AuthProvider } from "@/context/auth";
import { OrdersProvider } from "@/context/orders";

const queryClient = new QueryClient();

/** Start each new page at the top, or at the #section the link points to. */
const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <OrdersProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />
              <CartDrawer />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/specials" element={<Specials />} />
                <Route path="/services" element={<Navigate to="/specials" replace />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
                <Route path="/orders/:id" element={<RequireAuth><OrderStatus /></RequireAuth>} />
                <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </OrdersProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
