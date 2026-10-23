import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ScrollReveal } from "@/components/ScrollReveal";

const stats = [
  { target: 500, suffix: "+", label: "Daily Deliveries" },
  { target: 50, suffix: "+", label: "Restaurant Partners" },
  { target: 200, suffix: "+", label: "Active Riders" },
  { target: 99, suffix: ".2%", label: "Order Accuracy" },
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
                <div className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-2">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Partner logos placeholder */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-10 md:w-32 md:h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center"
              >
                <span className="text-xs text-primary-foreground/30 font-medium">Partner {i + 1}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}