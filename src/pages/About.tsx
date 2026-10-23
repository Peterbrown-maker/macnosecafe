import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { motion } from "framer-motion";
import { UtensilsCrossed, Heart, Users } from "lucide-react";

const team = [
  { name: "Chef Master", role: "Head Chef & Founder" },
  { name: "Hospitality Director", role: "Senior Manager" },
  { name: "Nutrition Specialist", role: "Menu Planning" },
  { name: "Service Excellence Lead", role: "Staff Training" },
];

const milestones = [
  { year: "2010", event: "Founded Flavor Hospitality with a passion for senior care dining" },
  { year: "2015", event: "Expanded to 10 retirement estates across South Africa" },
  { year: "2020", event: "Reached 30+ estate partners and 5,000+ daily meals served" },
  { year: "2026", event: "50+ partner estates, 10,000+ daily meals, national excellence" },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0 opacity-30">
            <motion.div
              animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary-foreground/20 blur-[100px]"
            />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionPill variant="dark" className="bg-primary-foreground/20 text-primary-foreground">Our Story</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                Quality Dining, Authentic Care
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                For over 15 years, Flavor Hospitality has been dedicated to enhancing the dining experience at retirement estates across South Africa. We believe great food brings people together.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <SectionPill>Our Mission</SectionPill>
                <blockquote className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mt-8 leading-snug">
                  "To deliver authentic, <span className="text-primary">quality dining experiences</span> that nourish body, mind, and community"
                </blockquote>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="bg-white rounded-lg p-8 md:p-10 shadow-card h-full">
                  <div className="w-14 h-14 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-6">
                    <Heart size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Our Passion</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We understand that nutrition and dining are central to senior wellness. More than just meals, we provide social connection, comfort, and joy. Every dish is crafted with the knowledge that quality food directly impacts health and happiness in retirement living.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="bg-white rounded-lg p-8 md:p-10 shadow-card h-full">
                  <div className="w-14 h-14 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-6">
                    <UtensilsCrossed size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Our Approach</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tailored meal planning, fresh ingredients, professional service, and genuine care. We partner with retirement estates to create customized dining programs that respect preferences, accommodate dietary needs, and celebrate the joy of shared meals. Excellence in every course.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SectionPill>Our Team</SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
                  Hospitality Professionals
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {team.map((member) => (
                <StaggerItem key={member.name}>
                  <div className="text-center group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/80 mx-auto mb-4 flex items-center justify-center group-hover:shadow-card-hover transition-shadow duration-300">
                      <Users className="text-primary-foreground" size={40} />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground">
                  Our Journey
                </h2>
              </div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto space-y-0 relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-foreground/30" />

              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative flex items-start gap-6 py-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-foreground shadow-button z-10 mt-1" />

                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                    <span className="font-heading font-bold text-primary-foreground text-lg">{milestone.year}</span>
                    <p className="text-primary-foreground/80 mt-1">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;