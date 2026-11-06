import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BRAND, WEEKLY_LINEUP } from "@/data/brianos";

export function LineUpSection() {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden" id="lineup">
      {/* Subtle mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/40 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Line-up */}
          <div className="space-y-8">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground">
                This Week at {BRAND.name}
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {WEEKLY_LINEUP.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm text-primary-foreground">
                    {event.day}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-primary-foreground">{event.title}</div>
                    <div className="text-sm text-secondary-foreground/70">
                      {event.vibe} · {event.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <ScrollReveal delay={0.4}>
              <Button variant="hero" size="lg" asChild>
                <Link to="/menu#book">Book Your Table</Link>
              </Button>
            </ScrollReveal>
          </div>

          {/* Right — Photo */}
          <ScrollReveal direction="right" delay={0.2}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <img
                src={BRAND.heroImage}
                alt={`A feast of grilled meat, sides and cocktails at ${BRAND.name}`}
                loading="lazy"
                className="w-full max-w-[560px] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
