import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { SOCIAL_LINKS } from "@/components/VisitButtons";
import { motion } from "framer-motion";
import { ChevronDown, Clock, MapPin, Navigation } from "lucide-react";
import { BRAND, DIRECTIONS_URL, FAQS, MAP_EMBED_URL, OPENING_HOURS, PHOTOS } from "@/data/macnose";

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero pill="Find Us" title="Take a Short Left" image={PHOTOS.interior} imageAlt="Inside MacNose Cafe">
          We're at {BRAND.address.street} in Short Left, Soshanguve. Come through, or say hi on Facebook and Instagram.
        </PageHero>

        {/* Map + Info */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_380px] gap-12 max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] rounded-2xl overflow-hidden shadow-card bg-muted">
                  <iframe
                    title={`Map showing ${BRAND.fullName}`}
                    src={MAP_EMBED_URL}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {BRAND.address.street}
                        <br />
                        {BRAND.address.area}
                        <br />
                        {BRAND.address.city}
                      </p>
                      <a
                        href={DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-2"
                      >
                        <Navigation size={14} /> Get directions
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Opening Hours</p>
                      {OPENING_HOURS.map((row) => (
                        <p key={row.days} className="text-sm text-muted-foreground">
                          {row.days}: {row.hours}
                        </p>
                      ))}
                    </div>
                  </div>

                  {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {label === "Instagram" ? "@shortleft_soshanguve" : "Macnose Cafe Short Left"}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white border-t border-border">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <SectionPill>FAQ</SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">Frequently Asked Questions</h2>
              </div>
            </ScrollReveal>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <ScrollReveal key={faq.q} delay={i * 0.05}>
                  <div className="bg-card rounded-lg shadow-card overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-medium text-foreground pr-4">{faq.q}</span>
                      <ChevronDown
                        size={20}
                        className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </motion.div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
