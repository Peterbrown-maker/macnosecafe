import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { StoreButtons } from "@/components/StoreButtons";
import { motion } from "framer-motion";
import { CalendarDays, Clock, ShoppingBag, UsersRound } from "lucide-react";
import { BRAND, OPENING_HOURS, PHOTOS } from "@/data/makhanani";

const services = [
  {
    icon: UsersRound,
    title: "Eat In",
    longDescription:
      "Pull up a chair and eat it hot, straight out of the pot. Half skop, pap and gravy tastes best with good company.",
    howItWorks: "Come through → Order at the counter → Pay cash or card → Eat",
  },
  {
    icon: ShoppingBag,
    title: "Takeaway",
    longDescription:
      "On your way home? Order ahead in the Makhanani app and we'll have it packed and ready when you pull up.",
    howItWorks: "Open the app → Pick your plate → Place your order → Collect at the counter",
  },
  {
    icon: CalendarDays,
    title: "Big Orders & Events",
    longDescription:
      "Funerals, family gatherings, stokvels, parties and after-tears. Tell us how many people you're feeding and when, and we'll cook for everyone. Please order at least a day ahead.",
    howItWorks: "Order in the app or call us → Tell us the date and headcount → We confirm → Collect on the day",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden pt-32 pb-24">
          <img src={PHOTOS.feetAndPap} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionPill variant="dark">How to Order</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                Eat In, Take Away, or Feed the Family
              </h1>
              <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
                However you want your skop and pap, here's how to get it from {BRAND.name}.
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

        {/* Hours */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <SectionPill>
                  <Clock size={14} /> Opening Hours
                </SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
                  When the Pots Are On
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
                Ready to Eat?
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                Download the Makhanani app and place your order.
              </p>
              <StoreButtons center />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
