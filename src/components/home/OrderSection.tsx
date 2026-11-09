import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { BRAND, GALLERY, whatsappLink } from "@/data/makhanani";

export function OrderSection() {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden" id="order">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/30 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
              Hungry Yet?
            </h2>
            <p className="text-lg text-secondary-foreground/70">Straight out of our pots. We're one WhatsApp away.</p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {GALLERY.map((photo) => (
            <StaggerItem key={photo.src}>
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full aspect-square object-cover rounded-lg shadow-card"
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Button variant="hero" size="lg" asChild>
              <a
                href={whatsappLink(`Hi ${BRAND.name}! I'd like to place an order.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
