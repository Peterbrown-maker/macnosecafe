import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { StoreButtons } from "@/components/StoreButtons";
import { motion } from "framer-motion";
import { Beef, CookingPot, Footprints, UtensilsCrossed } from "lucide-react";
import { BRAND, MENU, PHOTOS } from "@/data/makhanani";

const GROUP_ICONS = { heads: Beef, feet: Footprints, plates: UtensilsCrossed, sides: CookingPot } as Record<string, typeof Beef>;

const Menu = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden pt-32 pb-24">
          <img src={PHOTOS.fullPlate} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <SectionPill variant="dark">Straight Out the Pot</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                Our Menu
              </h1>
              <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
                Half skops, full skops, cow heads, pig heads and cow heels, with fresh pap and gravy. Cooked to perfection.
              </p>
              <StoreButtons center />
            </motion.div>
          </div>
        </section>

        {/* Menu Categories */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <StaggerContainer className="space-y-24">
              {MENU.map((group, index) => {
                const Icon = GROUP_ICONS[group.id];
                return (
                  <StaggerItem key={group.id}>
                    <div id={group.id} className="grid lg:grid-cols-2 gap-12 items-center">
                      {/* Image */}
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`flex justify-center ${index % 2 === 1 ? "lg:order-2" : ""}`}
                      >
                        <motion.div
                          animate={{ y: [0, -15, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="relative"
                        >
                          <img
                            src={group.image}
                            alt={group.name}
                            loading="lazy"
                            className="w-full max-w-md rounded-2xl shadow-xl"
                          />
                        </motion.div>
                      </motion.div>

                      {/* Content */}
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                            <Icon size={28} />
                          </div>
                          <h2 className="font-heading font-bold text-3xl text-foreground">{group.name}</h2>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">{group.description}</p>

                        <div className="space-y-3">
                          {group.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: itemIndex * 0.1 }}
                              className="flex items-center gap-4 bg-card p-3 rounded-lg shadow-card hover:shadow-md transition-shadow"
                            >
                              <img
                                src={item.image}
                                alt=""
                                loading="lazy"
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-foreground">{item.name}</div>
                                <div className="text-sm text-muted-foreground">{item.description}</div>
                              </div>
                              <span className="text-primary font-semibold whitespace-nowrap">R{item.price}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Get the app */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-6">Ready to Eat?</h2>
              <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
                Order everything on this menu in the {BRAND.name} app, for collection or for your next big event.
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

export default Menu;
