import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LaptopMockup } from "@/components/Mockups";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const benefits = [
  "Receive orders instantly on your dashboard",
  "Manage your menu with images and categories",
  "Track revenue, analytics, and customer reviews",
  "No upfront costs — commission-based model",
  "Dedicated restaurant support team",
];

export function RestaurantsSection() {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden" id="restaurants">
      {/* Subtle mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Benefits */}
          <div className="space-y-8">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground">
                Grow Your Restaurant With Flavor
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-success-foreground" />
                  </div>
                  <span className="text-secondary-foreground/80">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <ScrollReveal delay={0.4}>
              <Button variant="hero" size="lg" asChild>
                <a href="#">Register Your Restaurant</a>
              </Button>
            </ScrollReveal>
          </div>

          {/* Right — Laptop mockup */}
          <ScrollReveal direction="right" delay={0.2}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <LaptopMockup />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}