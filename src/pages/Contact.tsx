import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, ChevronDown, Clock } from "lucide-react";
import { BRAND, FAQS, OPENING_HOURS, whatsappLink } from "@/data/brianos";

const SUBJECTS: Record<string, string> = {
  general: "General enquiry",
  booking: "Table booking",
  group: "Group booking (10+)",
  order: "Help with an order",
  events: "Events & line-up",
};

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Hi ${BRAND.name}! (${SUBJECTS[formState.subject]})`,
      formState.message,
      `From: ${formState.name} (${formState.email})`,
    ].join("\n\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setFormState({ name: "", email: "", subject: "general", message: "" });
  };

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
              <SectionPill variant="dark">Get In Touch</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
                Booking for a birthday, asking about the line-up, or just hungry? We're one WhatsApp away.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form + Info */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_380px] gap-12 max-w-5xl mx-auto">
              {/* Form */}
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    >
                      {Object.entries(SUBJECTS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                      placeholder="Tell us what you need..."
                    />
                  </div>

                  <Button type="submit" size="lg">
                    <MessageCircle size={18} />
                    Send via WhatsApp
                  </Button>
                </form>
              </ScrollReveal>

              {/* Info sidebar */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-8">
                  {/* Location */}
                  <div className="w-full aspect-[4/3] rounded-lg gradient-hero relative overflow-hidden">
                    <img src="/images/brianos/mixed_grill_platter.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="text-white mx-auto mb-2" size={32} />
                        <p className="text-white font-semibold">{BRAND.area}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Email</p>
                        <a href={`mailto:${BRAND.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {BRAND.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <MessageCircle size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">WhatsApp & Calls</p>
                        <a href={whatsappLink(`Hi ${BRAND.name}!`)} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {BRAND.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Where</p>
                        <p className="text-sm text-muted-foreground">{BRAND.area}</p>
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
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-primary-light">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <SectionPill>FAQ</SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
                  Frequently Asked Questions
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-card rounded-lg shadow-card overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium text-foreground pr-4">{faq.q}</span>
                      <ChevronDown
                        size={20}
                        className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === i ? "auto" : 0,
                        opacity: openFaq === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
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