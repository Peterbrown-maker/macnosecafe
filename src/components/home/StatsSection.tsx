import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BRAND, MENU, MENU_ITEM_COUNT } from "@/data/macnose";

const stats = [
  { target: String(BRAND.established), label: "Serving Short Left Since" },
  { target: `${Math.floor(MENU_ITEM_COUNT / 10) * 10}+`, label: "Dishes & Drinks" },
  { target: "02:00", label: "Late on Fridays & Saturdays" },
  { target: "7", label: "Days a Week" },
];

export function StatsSection() {
  return (
    <section className="py-20 gradient-primary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-2">{stat.target}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Every section of the menu, as quick links */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {MENU.map((section) => (
              <Link
                key={section.id}
                to={`/menu#${section.id}`}
                className="px-4 py-2 rounded-pill bg-primary-foreground/15 text-sm text-primary-foreground font-medium hover:bg-primary-foreground/25 transition-colors"
              >
                {section.name}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
