import { Button } from "@/components/ui/button";
import { PhoneMockup, LaptopMockup } from "@/components/Mockups";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Apple, Play, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const platforms = [
  {
    title: "Customers",
    description: "Order food and essentials from local businesses",
    mockup: "phone" as const,
    phoneColor: "blue" as const,
    buttons: [
      { label: "Download on Android", icon: Play, variant: "store" as const },
    ],
    note: "iOS Coming Soon",
  },
  {
    title: "Riders",
    description: "Earn money delivering in your community",
    mockup: "phone" as const,
    phoneColor: "green" as const,
    buttons: [
      { label: "Google Play", icon: Play, variant: "store" as const },
      { label: "App Store", icon: Apple, variant: "store" as const },
    ],
  },
  {
    title: "Restaurants",
    description: "Manage orders and grow your business",
    mockup: "laptop" as const,
    phoneColor: "blue" as const,
    buttons: [
      { label: "Access Restaurant Hub", icon: ExternalLink, variant: "hero" as const },
    ],
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
              Get Flavor Deliveries
            </h2>
            <p className="text-lg text-secondary-foreground/70">
              Available on all platforms
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {platforms.map((platform) => (
            <StaggerItem key={platform.title}>
              <div className="glass-card rounded-lg p-8 text-center space-y-6">
                <h3 className="font-heading font-semibold text-xl text-primary-foreground">
                  {platform.title}
                </h3>
                <p className="text-sm text-secondary-foreground/60">
                  {platform.description}
                </p>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex justify-center py-4"
                >
                  {platform.mockup === "phone" ? (
                    <PhoneMockup color={platform.phoneColor} className="scale-75" />
                  ) : (
                    <LaptopMockup className="scale-90" />
                  )}
                </motion.div>

                <div className="space-y-3">
                  {platform.buttons.map((btn) => (
                    <Button
                      key={btn.label}
                      variant={btn.variant}
                      size="default"
                      className="w-full"
                      asChild
                    >
                      <a href="#" className="gap-2">
                        <btn.icon size={18} />
                        {btn.label}
                      </a>
                    </Button>
                  ))}
                  {platform.note && (
                    <p className="text-xs text-secondary-foreground/40">{platform.note}</p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}