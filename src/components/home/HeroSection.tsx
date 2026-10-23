import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/Mockups";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Animated gradient mesh with orange tones */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/15 blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-xs font-semibold tracking-wide bg-primary/15 text-primary border border-primary/30 animate-pulse-soft"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              Authentic Dining Excellence
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-tight text-foreground"
            >
              Flavor That Makes You{" "}
              <span className="text-primary">Smile</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Flavor Hospitality enhances dining experiences at retirement estates with tailored meal plans, quality service, and a focus on resident well-being. Every meal is crafted with care and served with a smile.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <a href="#services">Explore Our Services</a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border"
            >
              {[
                { target: 15, suffix: "+", label: "Years Experience" },
                { target: 50, suffix: "+", label: "Retirement Estates" },
                { target: 10000, suffix: "+", label: "Daily Meals Served" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="font-heading font-bold text-2xl md:text-3xl text-primary">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Featured menu image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="/images/Flavor-Hospitality_Platter.png" 
                  alt="Flavor Hospitality Platter" 
                  className="w-full max-w-md rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}