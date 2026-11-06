import { Flame, Martini, Music2 } from "lucide-react";
import { SectionPill } from "@/components/SectionPill";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { BRAND } from "@/data/brianos";

const features = [
  {
    icon: Flame,
    title: "Off the Braai",
    description: "Flame-grilled chops, wors, wings and ribs with pap and sides. The way it should be done.",
  },
  {
    icon: Martini,
    title: "The Bar & Lounge",
    description: "Fresh tropical cocktails shaken to order, cold drinks and a spot to sit down with the squad.",
  },
  {
    icon: Music2,
    title: "The Club Nights",
    description: "Amapiano Fridays, deep house Saturdays and Sunday chill sessions with a live band.",
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
              Shisanyama by Day, Club by Night
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {BRAND.name} is where Soshanguve comes for the meat and stays for the music. Grab a plate off the fire,
              get it delivered to where you are, or book a table and pull through. {BRAND.tagline}.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="bg-card rounded-lg p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-primary group">
                <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
