import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bike, CalendarDays, Clock, Music2, ShoppingBag } from "lucide-react";
import { BRAND, OPENING_HOURS, WEEKLY_LINEUP } from "@/data/brianos";

const services = [
  {
    icon: Bike,
    title: "Delivery",
    longDescription:
      "Stay home and let the braai come to you. We deliver within our area around Soshanguve, usually in 25–40 minutes depending on how busy the fire is and how far you are.",
    howItWorks: "Share your location → Pick your meal → Pay by card or cash → Track your driver → Eat",
  },
  {
    icon: ShoppingBag,
    title: "Collect",
    longDescription:
      "On your way home? Order ahead and we'll have it ready at the counter in about 20 minutes, so you can skip the wait.",
    howItWorks: "Pick your meal → Place your order → We fire it up → Collect at the counter",
  },
  {
    icon: CalendarDays,
    title: "Sit-in & Table Bookings",
    longDescription:
      "Eat in with the squad and stay for the vibes. Choose your time and party size and we'll keep a table for you. Coming through with 10 or more? Give us a call.",
    howItWorks: "Pick a date and time → Tell us how many → Send your WhatsApp → We confirm your table",
  },
  {
    icon: Music2,
    title: "Club Nights",
    longDescription:
      "When the sun goes down, the music comes up. Resident DJs, live bands and something on the line-up four nights a week. Check below and pull through.",
    howItWorks: "Check the line-up → Book a table → Pull through → Enjoy the night",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden pt-32 pb-24">
          <img src="/images/brianos/cocktails.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionPill variant="dark">What's On</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                Order the Meat, or Come Through
              </h1>
              <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
                Delivery, collect or sit-in by day. Amapiano, deep house and live music by night. Here's how to do {BRAND.name}.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <StaggerContainer className="space-y-8">
              {services.map((service) => (
                <StaggerItem key={service.title}>
                  <div className="relative bg-card rounded-lg p-8 md:p-10 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                    <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center gradient-primary text-primary-foreground">
                        <service.icon size={36} />
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-heading font-bold text-2xl text-foreground">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">
                          {service.longDescription}
                        </p>
                        <div className="bg-primary-light rounded-lg p-4">
                          <p className="text-sm font-medium text-foreground mb-1">How it works:</p>
                          <p className="text-sm text-muted-foreground">{service.howItWorks}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Weekly line-up */}
        <section className="py-24 bg-primary-light" id="lineup">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SectionPill>The Weekly Line-up</SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
                  This Week at {BRAND.name}
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WEEKLY_LINEUP.map((event) => (
                <StaggerItem key={event.title}>
                  <div className="bg-card rounded-lg shadow-card overflow-hidden h-full">
                    <img src={event.image} alt="" loading="lazy" className="w-full h-44 object-cover" />
                    <div className="p-5 space-y-2">
                      <div className="text-xs font-bold tracking-wider text-primary">{event.day}</div>
                      <h3 className="font-heading font-semibold text-lg text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.vibe}</p>
                      <p className="text-sm font-medium text-foreground">{event.time}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Hours */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <SectionPill>
                  <Clock size={14} /> Opening Hours
                </SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
                  When the Fire's Lit
                </h2>
              </div>
              <div className="space-y-3">
                {OPENING_HOURS.map((row) => (
                  <div key={row.days} className="flex justify-between items-center gap-4 bg-card p-4 rounded-lg shadow-card">
                    <span className="font-medium text-foreground">{row.days}</span>
                    <span className="text-primary font-semibold whitespace-nowrap">{row.hours}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-primary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-6">
                Ready to Pull Through?
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                Book your table now and we'll keep the fire going.
              </p>
              <Button
                variant="heroOutline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/menu#book">Book a Table</Link>
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
