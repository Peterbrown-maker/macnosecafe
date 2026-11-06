import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/Mockups";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { APP_SCREENS, BRAND, whatsappLink } from "@/data/brianos";

const screens = [
  {
    title: "Order Off the Braai",
    description: "Chops, wors, wings and ribs with pap and sides",
    src: APP_SCREENS.braai,
  },
  {
    title: "Catch the Line-up",
    description: "See what's on this week and book your table",
    src: APP_SCREENS.club,
  },
  {
    title: "Delivered to You",
    description: "Delivery, collect or sit-in. You choose",
    src: APP_SCREENS.delivery,
  },
];

export function DownloadSection() {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden" id="download">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/30 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
              The {BRAND.name} App
            </h2>
            <p className="text-lg text-secondary-foreground/70">
              Coming soon to Android. Until then, we're one WhatsApp away.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {screens.map((screen) => (
            <StaggerItem key={screen.title}>
              <div className="glass-card rounded-lg p-8 text-center space-y-4 h-full">
                <h3 className="font-heading font-semibold text-xl text-primary-foreground">
                  {screen.title}
                </h3>
                <p className="text-sm text-secondary-foreground/70">
                  {screen.description}
                </p>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex justify-center"
                >
                  <PhoneMockup src={screen.src} alt={`${BRAND.name} app: ${screen.title}`} />
                </motion.div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Button variant="hero" size="lg" asChild>
              <a href={whatsappLink(`Hi ${BRAND.name}! I'd like to place an order.`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} />
                Order via WhatsApp
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
