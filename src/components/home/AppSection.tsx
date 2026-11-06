import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/Mockups";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { APP_SCREENS, BRAND, whatsappLink } from "@/data/brianos";

const benefits = [
  "Order for delivery, collect or sit-in",
  "We use your live location, so there's no address to type",
  "Book a table with your time and party size",
  "Track your driver all the way to your door",
  "Pay by card or cash, whichever suits you",
];

export function AppSection() {
  return (
    <section className="py-24 bg-card" id="app">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Phone mockup */}
          <ScrollReveal direction="left" delay={0.2}>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <PhoneMockup src={APP_SCREENS.signIn} alt={`${BRAND.name} app sign-in screen`} />
            </motion.div>
          </ScrollReveal>

          {/* Right — Benefits */}
          <div className="space-y-8">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
                The Whole Shisanyama in Your Pocket
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
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-primary-foreground" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="store" size="lg" asChild>
                  <a href={whatsappLink(`Hi ${BRAND.name}! Please tell me when the app is out.`)} target="_blank" rel="noopener noreferrer">
                    Tell Me When It's Out
                  </a>
                </Button>
                <span className="text-sm text-muted-foreground">Coming soon to Android</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
