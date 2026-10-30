import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UtensilsCrossed, Clock, MapPin, TrendingUp } from "lucide-react";

const services = [
  {
    icon: UtensilsCrossed,
    title: "Food Delivery",
    description: "Restaurant meals delivered hot and fast to your doorstep.",
    longDescription: "Partner with over 50 local restaurants and enjoy your favourite meals delivered in minutes. Our riders know every shortcut in the township, ensuring your food arrives hot and fresh. From breakfast to dinner, we deliver it all.",
    howItWorks: "Browse restaurants → Select your meal → Place order → Track your rider → Enjoy!",
    comingSoon: false,
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Get your meals delivered in under 30 minutes.",
    longDescription: "Speed is our priority. Our optimized routing system and dedicated riders ensure your food arrives while it's still hot. Real-time GPS tracking lets you know exactly when your order is arriving.",
    howItWorks: "Order placed → Rider assigned → Kitchen prepares → Delivery en route → Doorstep delivery",
    comingSoon: false,
  },
  {
    icon: MapPin,
    title: "Township Coverage",
    description: "Serving all corners of your community.",
    longDescription: "We operate across the entire township, delivering to residential areas, offices, and community spaces. No matter where you are, we'll bring your favorite meals right to your door.",
    howItWorks: "Check coverage → Add your address → Browse restaurants → Place order → Track delivery",
    comingSoon: false,
  },
  {
    icon: TrendingUp,
    title: "Restaurant Growth",
    description: "Help restaurants reach more customers.",
    longDescription: "For restaurant partners, our platform provides the tools to reach customers beyond walk-in traffic. Manage orders, track revenue, and grow your business with Flavor's delivery network.",
    howItWorks: "Register restaurant → Set up menu → Receive orders → Prepare meals → Our riders deliver",
    comingSoon: false,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden pt-32 pb-24">
          <div className="gradient-mesh" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionPill variant="dark">Our Service</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                Food Delivery Made Easy
              </h1>
              <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
                Flavor delivers delicious meals from your favorite local restaurants straight to your door, fast and fresh.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <StaggerContainer className="space-y-8">
              {services.map((service, i) => (
                <StaggerItem key={service.title}>
                  <div className={`relative bg-card rounded-lg p-8 md:p-10 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden ${
                    i % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}>
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

        {/* CTA */}
        <section className="py-20 gradient-primary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-6">
                Ready to Experience Flavor Delivery?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Download our app or partner with us as a restaurant to reach more customers.
              </p>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="/contact">Get in Touch</a>
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