import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { motion } from "framer-motion";
import { Bike, Flame, Martini, Moon, Music2, UtensilsCrossed } from "lucide-react";
import { BRAND, GALLERY } from "@/data/brianos";

const team = [
  { icon: Flame, name: "The Braai Masters", role: "Keeping the fire lit and the meat right" },
  { icon: Martini, name: "The Bar Team", role: "Shaking cocktails to order" },
  { icon: Music2, name: "Our Resident DJs", role: "Log drums and deep house, all night" },
  { icon: Bike, name: "Our Drivers", role: "Getting it to you while it's hot" },
];

const dayAtTheVenue = [
  { time: "11:00", event: "The fire's lit. Doors open and the first chops hit the grill, seven days a week" },
  { time: "17:00", event: "Happy hour on weekdays, with 50% off drinks until 19:00" },
  { time: "20:00", event: "The night gets going. Amapiano Fridays with our resident DJs" },
  { time: "02:00", event: "Last song on Fridays and Saturdays. Get home safe and come back soon" },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden pt-32 pb-24">
          <img src={BRAND.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionPill variant="dark">Our Story</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                {BRAND.tagline}
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                {BRAND.name} is a shisanyama, bar and lounge in Soshanguve. We do the two things that bring people
                together best: good meat off the fire, and good music when the sun goes down.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <SectionPill>What We're About</SectionPill>
                <blockquote className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mt-8 leading-snug">
                  "Braai. Drinks. Vibes. <span className="text-primary">Order the meat, or come through.</span>"
                </blockquote>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Day & Night */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="bg-white rounded-lg p-8 md:p-10 shadow-card h-full">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <UtensilsCrossed size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-4">By Day</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Flame-grilled chops, wors, wings and ribs with pap and sides, the way it should be done. Sit in with
                    the squad, collect on your way home, or have it delivered to where you are. There's a platter for
                    every table and a burger for when you're keeping it simple.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="bg-white rounded-lg p-8 md:p-10 shadow-card h-full">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Moon size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-4">By Night</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Then the night gets going. Amapiano Fridays, deep house Saturdays and Sunday chill sessions with a
                    live band, jazz and sundowners. Book a table, order something from the bar and pull through.
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
                <SectionPill>Our People</SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
                  The People Behind the Fire
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {team.map((member) => (
                <StaggerItem key={member.name}>
                  <div className="text-center group">
                    <div className="w-32 h-32 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center group-hover:shadow-card-hover transition-shadow duration-300">
                      <member.icon className="text-primary-foreground" size={40} />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* A day at the venue */}
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
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-foreground/30" />

              {dayAtTheVenue.map((moment, i) => (
                <motion.div
                  key={moment.time}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative flex items-start gap-6 py-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
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
                <SectionPill>Off the Fire</SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
                  Hungry Yet?
                </h2>
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
