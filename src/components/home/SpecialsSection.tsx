import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SPECIALS } from "@/data/makhanani";

export function SpecialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % SPECIALS.length);
  const prev = () => setCurrent((p) => (p - 1 + SPECIALS.length) % SPECIALS.length);
  const special = SPECIALS[current];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16">
            Specials Worth Pulling Through For
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-lg p-8 md:p-12 shadow-card text-center"
            >
              <Tag className="mx-auto text-primary/30 mb-6" size={48} />
              <div className="font-heading font-extrabold text-3xl md:text-4xl text-primary mb-4 uppercase">
                {special.deal}
              </div>
              <div className="font-heading font-semibold text-xl text-foreground mb-3">
                {special.title}
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {special.description}
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarDays size={16} className="text-primary" />
                {special.when}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:text-primary hover:shadow-card-hover transition-all duration-300"
              aria-label="Previous special"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {SPECIALS.map((item, i) => (
                <button
                  key={item.title}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-8" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to ${item.title}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:text-primary hover:shadow-card-hover transition-all duration-300"
              aria-label="Next special"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
