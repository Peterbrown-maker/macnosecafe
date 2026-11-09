import { CookingPot, Flame, UsersRound } from "lucide-react";
import { SectionPill } from "@/components/SectionPill";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { BRAND } from "@/data/makhanani";

const features = [
  {
    icon: Flame,
    title: "Head Meats",
    description: "Sheep, cow and pig heads, cleaned, slow-cooked and spiced. Half skop is the one everyone asks for.",
  },
  {
    icon: CookingPot,
    title: "Pap & Gravy",
    description: "Soft, smooth pap made fresh through the day, with a rich gravy that's been on the pot since morning.",
  },
  {
    icon: UsersRound,
    title: "Good Vibes",
    description: "Pull up a chair and eat it hot with the people you came with, or take it home to the family.",
  },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <SectionPill>About {BRAND.name}</SectionPill>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
              Proper Kasi Food, Cooked Slow
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {BRAND.fullName} is where you come for a real plate of skop and pap. No shortcuts: the heads cook low and
              slow until the meat falls off the bone, the pap is fresh, and the gravy is thick. {BRAND.promise}
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-primary group h-full">
                <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
