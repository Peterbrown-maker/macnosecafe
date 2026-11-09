import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { motion } from "framer-motion";
import { CookingPot, Flame, HandPlatter, UsersRound } from "lucide-react";
import { BRAND, GALLERY, PHOTOS } from "@/data/makhanani";

const values = [
  { icon: Flame, name: "Cooked Slow", role: "The heads go in early and come out when they're ready, not before" },
  { icon: CookingPot, name: "Fresh Pap", role: "Made through the day so it's always soft and hot" },
  { icon: HandPlatter, name: "Big Portions", role: "Nobody leaves Makhanani hungry" },
  { icon: UsersRound, name: "Good Vibes", role: "Come as you are, eat with your people" },
];

const dayAtMakhanani = [
  { time: "Early", event: "The pots go on. Heads are cleaned, prepped and set to cook low and slow" },
  { time: "Mid-morning", event: "The gravy's thick, the pap's on, and the first plates of skop go out" },
  { time: "Lunch", event: "The busiest time of day. Half skop and pap, one after another" },
  { time: "Evening", event: "Last plates of the day. When the pot's empty, it's empty, so come early" },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden pt-32 pb-24">
          <img src={PHOTOS.headAndPap} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <SectionPill variant="dark">Our Story</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                {BRAND.tagline}
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                {BRAND.fullName} serves the food that brings people together: head meats cooked slow, fresh pap, and a
                gravy you'll want to drink. Simple food, done properly.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <ScrollReveal>
                <img src={BRAND.emblem} alt={BRAND.fullName} className="w-full max-w-sm mx-auto rounded-2xl shadow-card-hover" />
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <SectionPill>What We're About</SectionPill>
                <blockquote className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mt-6 leading-snug">
                  "Cow heads, pig heads, sheep heads. <span className="text-primary">Cooked to perfection.</span>"
                </blockquote>
                <p className="text-muted-foreground leading-relaxed mt-6">
                  Skop is a kasi classic, and we treat it that way. Every head is cleaned properly, cooked until the meat
                  falls off the bone, then finished with our spice. Have it half or full, on its own or with pap and
                  gravy.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SectionPill>How We Do It</SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">No Shortcuts</h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {values.map((value) => (
                <StaggerItem key={value.name}>
                  <div className="text-center group">
                    <div className="w-32 h-32 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center group-hover:shadow-card-hover transition-shadow duration-300">
                      <value.icon className="text-primary-foreground" size={40} />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">{value.name}</h4>
                    <p className="text-sm text-muted-foreground">{value.role}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* A day at Makhanani */}
        <section className="py-24 gradient-hero relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground">
                  A Day at {BRAND.name}
                </h2>
              </div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto space-y-0 relative">
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-foreground/30" />

              {dayAtMakhanani.map((moment, i) => (
                <motion.div
                  key={moment.time}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative flex items-start gap-6 py-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-button z-10 mt-1" />
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                    <span className="font-heading font-bold text-primary-foreground text-lg">{moment.time}</span>
                    <p className="text-primary-foreground/80 mt-1">{moment.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <SectionPill>Out the Pot</SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">Hungry Yet?</h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {GALLERY.map((photo) => (
                <StaggerItem key={photo.src}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full aspect-[3/4] object-cover rounded-lg shadow-card"
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
