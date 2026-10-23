import { UtensilsCrossed, ShoppingCart, Package, Pill, Store, Code } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const services = [
  {
    icon: UtensilsCrossed,
    title: "Food Delivery",
    description: "Restaurant meals delivered hot and fast",
    comingSoon: false,
  },
  {
    icon: ShoppingCart,
    title: "Grocery Delivery",
    description: "Fresh produce and essentials from local stores",
    comingSoon: false,
  },
  {
    icon: Package,
    title: "Package Delivery",
    description: "Send parcels across the township",
    comingSoon: false,
  },
  {
    icon: Pill,
    title: "Pharmacy Delivery",
    description: "Medication and health products",
    comingSoon: true,
  },
  {
    icon: Store,
    title: "Township Marketplace",
    description: "Buy from local vendors and crafters",
    comingSoon: true,
  },
  {
    icon: Code,
    title: "Business Solutions",
    description: "Custom delivery API for local businesses",
    comingSoon: true,
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-card" id="services-preview">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Beyond Food Delivery
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-muted-foreground">
              We're building delivery infrastructure for every township need
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="relative bg-card rounded-lg p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                {service.comingSoon && (
                  <div className="absolute inset-0 bg-card/60 backdrop-blur-[2px] z-10 flex items-start justify-end p-4">
                    <span className="bg-warning text-warning-foreground text-xs font-bold px-3 py-1 rounded-pill">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}