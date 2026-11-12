import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { SPECIALS } from "@/data/macnose";

/** Swipeable strip of the current special posters. */
export function SpecialsSection() {
  const strip = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <SectionPill>Weekend Favourites</SectionPill>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mt-4">MacNose Specials</h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => scroll(-1)}
                className="w-11 h-11 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:text-primary hover:shadow-card-hover transition-all"
                aria-label="Previous specials"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-11 h-11 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:text-primary hover:shadow-card-hover transition-all"
                aria-label="Next specials"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div
          ref={strip}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin]"
        >
          {SPECIALS.map((special) => (
            <img
              key={special.src}
              src={special.src}
              alt={special.alt}
              loading="lazy"
              className="snap-start flex-shrink-0 w-[72%] sm:w-[42%] lg:w-[23%] aspect-[4/5] object-cover rounded-xl shadow-card"
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/specials">All Specials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
