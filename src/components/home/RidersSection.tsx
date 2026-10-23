import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/Mockups";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";

const benefits = [
  "Flexible hours — work when you want",
  "Instant earnings — get paid per delivery",
  "Route optimization — smart navigation built in",
  "Safety features — SOS button and live tracking",
  "Available on Google Play & Apple App Store",
];

export function RidersSection() {
  return (
    <section className="py-24 bg-card" id="riders">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Phone mockup */}
          <ScrollReveal direction="left" delay={0.2}>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <PhoneMockup color="green" />
            </motion.div>
          </ScrollReveal>

          {/* Right — Benefits */}
          <div className="space-y-8">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
                Earn Money on Your Terms
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-success-foreground" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <Button variant="store" size="lg" asChild>
                  <a href="#" className="gap-3">
                    <Play size={20} />
                    <div className="text-left">
                      <div className="text-[10px] opacity-70 leading-none">GET IT ON</div>
                      <div className="text-sm font-semibold leading-tight">Google Play</div>
                    </div>
                  </a>
                </Button>
                <Button variant="store" size="lg" asChild>
                  <a href="#" className="gap-3">
                    <Apple size={20} />
                    <div className="text-left">
                      <div className="text-[10px] opacity-70 leading-none">Download on the</div>
                      <div className="text-sm font-semibold leading-tight">App Store</div>
                    </div>
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}