import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MENU, formatPrice } from "@/data/macnose";

/** The food sections that have a photo, shown as cards with a "from" price. */
const highlights = MENU.filter((s) => s.kind === "food" && s.image).slice(0, 3);

const fromPrice = (sectionId: string) => {
  const section = MENU.find((s) => s.id === sectionId)!;
  const prices = section.groups.flatMap((g) => g.items.map((i) => i.price)).filter((p): p is number => typeof p === "number");
  return formatPrice(Math.min(...prices));
};

export function HighlightsSection() {
  return (
    <section className="py-24 bg-white border-t border-border relative overflow-hidden" id="highlights">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-script text-3xl text-primary mb-2">Proudly South African</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Something for Every Appetite
            </h2>
            <p className="text-lg text-muted-foreground">
              Mogodu on a Monday, flame grills any day, and slow-cooked oxtail when you need something hearty.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
            >
              <Link to={`/menu#${section.id}`} className="bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow rounded-2xl overflow-hidden group block h-full">
                <div className="overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.name}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-xs font-bold tracking-wider uppercase text-primary">{section.tagline}</div>
                  <h3 className="font-heading font-semibold text-xl text-foreground">{section.name}</h3>
                  <p className="text-sm text-muted-foreground">From {fromPrice(section.id)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Button variant="hero" size="lg" asChild>
              <Link to="/menu">See the Menu &amp; Order</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
