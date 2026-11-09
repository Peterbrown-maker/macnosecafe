import { motion } from "framer-motion";
import { ClipboardList, CookingPot, Smartphone, UtensilsCrossed } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const steps = [
  {
    icon: Smartphone,
    title: "Get the App",
    description: "Download Makhanani from the Google Play Store or the Apple App Store",
  },
  {
    icon: ClipboardList,
    title: "Pick Your Plate",
    description: "Half skop, full skop, cow head, pig head, cow heels, with pap and gravy",
  },
  {
    icon: CookingPot,
    title: "We Dish Up",
    description: "Straight out of the pot, spiced and plated hot with fresh pap",
  },
  {
    icon: UtensilsCrossed,
    title: "Eat & Enjoy",
    description: "Sit down and eat with us, or collect and take it home",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-primary-light">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16">
            From the Pot to Your Plate
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-[60px] left-[12.5%] right-[12.5%] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full gradient-primary origin-left"
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative mb-6">
                  <div className="w-[120px] h-[120px] rounded-full gradient-primary flex items-center justify-center shadow-button">
                    <step.icon className="text-primary-foreground" size={40} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card text-foreground font-heading font-bold text-sm flex items-center justify-center shadow-card">
                    {i + 1}
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
