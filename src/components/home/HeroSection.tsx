import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StoreButtons } from "@/components/StoreButtons";
import { BRAND } from "@/data/makhanani";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Food photo behind everything, darkened so the text stays readable */}
      <img
        src={BRAND.heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      {/* Ember glow */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/25 blur-[120px]"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-xs font-semibold tracking-wide bg-primary/20 text-white border border-primary/40"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              {BRAND.fullName}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[60px] leading-tight text-white"
            >
              Half Skops. Paps. <span className="text-primary">Good Vibes.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/75 max-w-xl leading-relaxed"
            >
              Sheep, cow and pig heads slow-cooked until they fall off the bone, cow heels in rich gravy, and soft
              fresh pap to go with it all. {BRAND.promise}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/menu">See the Menu</Link>
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
              <p className="text-sm text-white/60 mb-3">Order in the {BRAND.name} app</p>
              <StoreButtons />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/15"
            >
              {[
                { value: "3", label: "Kinds of heads" },
                { value: "Fresh", label: "Pap all day" },
                { value: "Slow", label: "Cooked, never rushed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="font-heading font-bold text-2xl md:text-3xl text-primary">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <motion.img
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src={BRAND.emblem}
              alt={`${BRAND.fullName}: head meats, paps, good vibes`}
              className="w-full max-w-[460px] rounded-3xl shadow-[0_25px_80px_-12px_rgba(249,115,22,0.45)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
