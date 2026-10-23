import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UtensilsCrossed, ShoppingCart, Package, Pill, Store, Code } from "lucide-react";

const services = [
  {
    icon: UtensilsCrossed,
    title: "Food Delivery",
    description: "Restaurant meals delivered hot and fast to your doorstep.",
    longDescription: "Partner with over 50 local restaurants and enjoy your favourite meals delivered in minutes. Our riders know every shortcut in the township, ensuring your food arrives hot and fresh.",
    howItWorks: "Browse restaurants → Select your meal → Place order → Track your rider → Enjoy!",
    comingSoon: false,
  },
  {
    icon: ShoppingCart,
    title: "Grocery Delivery",
    description: "Fresh produce and essentials from local stores.",
    longDescription: "Skip the queues and get your groceries delivered. From fresh fruit and veg to household essentials, we bring the store to your door.",
    howItWorks: "Choose your store → Add items to cart → Schedule delivery → Receive at your door",
    comingSoon: false,
  },
  {
    icon: Package,
    title: "Package Delivery",
    description: "Send parcels across the township quickly and safely.",
    longDescription: "Need to send a package across town? Our riders will pick it up and deliver it same-day. Real-time tracking keeps you updated every step of the way.",
    howItWorks: "Enter pickup & drop-off → Select package size → Rider picks up → Delivered with proof",
    comingSoon: false,
  },
  {
    icon: Pill,
    title: "Pharmacy Delivery",
    description: "Medication and health products delivered discreetly.",
    longDescription: "Get your prescriptions and over-the-counter medication delivered safely. We partner with registered pharmacies to ensure quality and compliance.",
    howItWorks: "Upload prescription → Pharmacy verifies → Rider delivers → Secure handover",
    comingSoon: true,
  },
  {
    icon: Store,
    title: "Township Marketplace",
    description: "Buy from local vendors, crafters, and artisans.",
    longDescription: "A digital marketplace celebrating township creativity. Discover handmade crafts, local fashion, and unique products from your community's most talented creators.",
    howItWorks: "Browse vendors → Shop products → Checkout → Local delivery or pickup",
    comingSoon: true,
  },
  {
    icon: Code,
    title: "Business Solutions",
    description: "Custom delivery API for local businesses.",
    longDescription: "Integrate Sosha's delivery network into your own business. Our API lets you offer delivery to your customers without building your own fleet.",
    howItWorks: "Apply for API access → Integrate → Start delivering → Scale your business",
    comingSoon: true,
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
              <SectionPill variant="dark">What We Offer</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                Our Services
              </h1>
              <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
                From food to parcels, we're building the complete delivery infrastructure for township communities.
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
                    {service.comingSoon && (
                      <span className="absolute top-4 right-4 bg-warning text-warning-foreground text-xs font-bold px-3 py-1 rounded-pill z-10">
                        Coming Soon
                      </span>
                    )}

                    <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
                      <div className={`w-20 h-20 rounded-xl flex items-center justify-center ${
                        service.comingSoon
                          ? "bg-muted text-muted-foreground"
                          : "gradient-primary text-primary-foreground"
                      }`}>
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
                Want to Partner With Sosha?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Whether you're a restaurant, store, or business — we'd love to work with you.
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