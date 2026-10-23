import { UtensilsCrossed, Users, Heart } from "lucide-react";
import { SectionPill } from "@/components/SectionPill";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Quality Dining",
    description: "Carefully crafted menus tailored to nutritional needs and resident preferences. Fresh ingredients, authentic recipes.",
    accent: "border-t-primary",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Expert Service",
    description: "Professional hospitality staff trained in senior care and dining service excellence. Personalized attention for every resident.",
    accent: "border-t-primary",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: Heart,
    title: "Well-being Focus",
    description: "We believe great food enhances health and happiness. Nutritious, delicious meals that bring residents together.",
    accent: "border-t-primary",
    iconBg: "bg-primary/10 text-primary",
  },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <SectionPill>About Flavor Hospitality</SectionPill>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6">
              Authentic Dining for Retirement Living
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Flavor Hospitality specializes in enhancing the dining experience at retirement estates. With over 15 years of hospitality expertise, we deliver quality meals, professional service, and genuine care to residents across South Africa.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className={`bg-card rounded-lg p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-t-4 ${feature.accent} group`}>
                <div className={`w-14 h-14 rounded-lg ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
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