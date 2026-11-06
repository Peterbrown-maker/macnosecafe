import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/Mockups";
import { APP_SCREENS, BRAND } from "@/data/brianos";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Animated gradient mesh */}
      <div className="gradient-mesh" />

      {/* Extra floating orb */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px]"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-xs font-semibold tracking-wide bg-primary/15 text-primary border border-primary/30"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              {BRAND.descriptor} — Soshanguve
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-tight text-foreground"
            >
              Braai. Drinks. <span className="text-primary">Vibes.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              {BRAND.promise} Flame-grilled chops, wors, wings and ribs with pap and sides, then Amapiano and deep house
              when the night gets going. Order the meat, or come through.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/menu">See the Menu</Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/menu#book">Book a Table</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border"
            >
              {[
                { target: 7, label: "Days a week" },
                { target: 4, label: "Nights on the line-up" },
                { target: 3, label: "Ways to eat" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="font-heading font-bold text-2xl md:text-3xl text-primary">
                    {stat.target}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Phone mockups */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <PhoneMockup
                src={APP_SCREENS.club}
                alt={`${BRAND.name} app: the weekly club line-up`}
                className="-rotate-6 translate-x-[50px] translate-y-[20px] z-10"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="relative z-20"
            >
              <PhoneMockup
                src={APP_SCREENS.braai}
                alt={`${BRAND.name} app: straight off the braai`}
                className="scale-110"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="relative"
            >
              <PhoneMockup
                src={APP_SCREENS.delivery}
                alt={`${BRAND.name} app: delivered to where you are`}
                className="rotate-6 translate-x-[-50px] translate-y-[20px] z-10"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
