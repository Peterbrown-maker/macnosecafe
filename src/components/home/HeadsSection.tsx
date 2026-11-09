import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HEADS } from "@/data/makhanani";

export function HeadsSection() {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden" id="heads">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/40 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
              Cow. Pig. Sheep.
            </h2>
            <p className="text-lg text-secondary-foreground/70">
              Three kinds of head meat, all cooked to perfection. Pick your favourite, or try them all.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {HEADS.map((head, i) => (
            <motion.div
              key={head.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="overflow-hidden">
                <img
                  src={head.image}
                  alt={head.title}
                  loading="lazy"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="text-xs font-bold tracking-wider uppercase text-primary">{head.local}</div>
                <h3 className="font-heading font-semibold text-xl text-primary-foreground">{head.title}</h3>
                <p className="text-sm text-secondary-foreground/70">{head.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Button variant="hero" size="lg" asChild>
              <Link to="/menu">See Prices</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
