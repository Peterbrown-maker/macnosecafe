import { Music, UtensilsCrossed, Wine } from "lucide-react";
import { SectionPill } from "@/components/SectionPill";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { BRAND } from "@/data/macnose";

const features = [
  {
    icon: UtensilsCrossed,
    title: "South African Cuisine",
    description:
      "A huge variety of South African dishes, from ox tripe and traditional Monday meals to seafood, oysters and quality steak.",
  },
  {
    icon: Wine,
    title: "Wines, Bottles & Bubbles",
    description: "Superior wines, premium whiskey, cognac and tequila, champagne on ice and cocktails from the bar.",
  },
  {
    icon: Music,
    title: "Feel-Good Music",
    description: "Good food, good company and the right music. A dining experience you'll want to come back for.",
  },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-background" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <SectionPill>Our Sanctuary · Since {BRAND.established}</SectionPill>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
              "Take a Short Left"
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our extensive menu offers a huge variety of South African dishes, specialising in African cuisine (like ox
              tripe), seafood (like oysters) and quality meat (like steak). Superior wines, premium bottles, bubbles and
              feel-good music make for a unique dining experience.
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
