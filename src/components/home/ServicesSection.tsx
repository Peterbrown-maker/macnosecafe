import { CalendarDays, ShoppingBag, UsersRound } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const services = [
  {
    icon: UsersRound,
    title: "Eat In",
    description: "Pull up a chair and eat it hot, straight out of the pot, with good company",
  },
  {
    icon: ShoppingBag,
    title: "Takeaway",
    description: "WhatsApp your order ahead and collect it on your way home",
  },
  {
    icon: CalendarDays,
    title: "Big Orders",
    description: "Funerals, family gatherings, stokvels and parties. Order a day ahead and we'll feed everyone",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-card" id="services-preview">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              However You Want It
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-muted-foreground">Eat with us, take it home, or let us cater for the whole family</p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="relative bg-card rounded-lg p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group overflow-hidden h-full">
                <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
