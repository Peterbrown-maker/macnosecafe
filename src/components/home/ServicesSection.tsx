import { Bike, CalendarDays, Martini, Music2, ShoppingBag, UsersRound } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const services = [
  {
    icon: Bike,
    title: "Delivery",
    description: "Hot off the fire and on its way to your live location, usually in 25–40 minutes",
  },
  {
    icon: ShoppingBag,
    title: "Collect",
    description: "Order ahead and skip the wait. Ready in about 20 minutes",
  },
  {
    icon: CalendarDays,
    title: "Sit-in",
    description: "Book a table, pick your time and party size, and eat in with the squad",
  },
  {
    icon: Martini,
    title: "Bar & Cocktails",
    description: "Tropical cocktails shaken to order, with weekday happy hour from 17:00",
  },
  {
    icon: Music2,
    title: "Club Nights",
    description: "Resident DJs and live bands every week, from Amapiano to jazz",
  },
  {
    icon: UsersRound,
    title: "Group Bookings",
    description: "Coming through with 10 or more? Give us a call and we'll sort you out",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-card" id="services-preview">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              More Than a Plate of Meat
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-muted-foreground">
              However you want it, we've got you covered
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="relative bg-card rounded-lg p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group overflow-hidden h-full">
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
