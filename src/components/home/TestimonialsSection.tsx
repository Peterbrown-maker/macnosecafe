import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const testimonials = [
  {
    text: "Sosha has transformed my restaurant business. Before, I could only serve walk-in customers. Now I'm reaching people across the whole township. My revenue has doubled in just three months!",
    name: "Thando Mokoena",
    role: "Restaurant Owner",
    rating: 5,
  },
  {
    text: "I order from Sosha at least three times a week. The app is so easy to use, and the riders are always friendly. It's amazing to have this kind of technology right here in our community.",
    name: "Naledi Dlamini",
    role: "Regular Customer",
    rating: 5,
  },
  {
    text: "Being a Sosha rider has changed my life. I can work when I want, earn good money, and I feel safe with the tracking features. It's the best job I've ever had.",
    name: "Sipho Nkosi",
    role: "Sosha Rider",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16">
            Loved by Our Community
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
              <Quote className="mx-auto text-primary/20 mb-6" size={48} />
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-warning text-warning" />
                ))}
              </div>
              <div className="font-heading font-semibold text-foreground">
                {testimonials[current].name}
              </div>
              <div className="text-sm text-muted-foreground">
                {testimonials[current].role}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:text-primary hover:shadow-card-hover transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-8" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:text-primary hover:shadow-card-hover transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}