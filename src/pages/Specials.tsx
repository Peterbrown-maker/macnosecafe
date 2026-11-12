import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CalendarDays, Clock } from "lucide-react";
import { MENU, OPENING_HOURS, PHOTOS, SPECIALS, formatPrice } from "@/data/macnose";

const monday = MENU.find((s) => s.id === "traditional")!;
const oysters = MENU.flatMap((s) => s.groups.flatMap((g) => g.items)).find((i) => i.name === "MacNose Champagne Oysters")!;

const Specials = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero pill="Weekend Favourites" title="MacNose Specials" image={PHOTOS.food} imageAlt="A table of MacNose dishes">
          Buffets for four, wine-and-dine combos, bottle deals and warm treats. Here's what's on at MacNose.
        </PageHero>

        {/* Posters */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {SPECIALS.map((special, i) => (
                <StaggerItem key={special.src}>
                  <button
                    onClick={() => setOpen(i)}
                    className="block w-full overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-shadow group"
                    aria-label={`View ${special.alt}`}
                  >
                    <img
                      src={special.src}
                      alt={special.alt}
                      loading="lazy"
                      className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <p className="text-center text-sm italic text-muted-foreground mt-8">
              Specials change regularly. Ask your waitron what's on today.
            </p>
          </div>
        </section>

        <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
          <DialogContent className="max-w-2xl p-2 bg-black border-white/10">
            <DialogTitle className="sr-only">{open !== null ? SPECIALS[open].alt : "Special"}</DialogTitle>
            {open !== null && (
              <img src={SPECIALS[open].src} alt={SPECIALS[open].alt} className="w-full max-h-[85vh] object-contain rounded" />
            )}
          </DialogContent>
        </Dialog>

        {/* Traditional Mondays + Champagne Oysters */}
        <section className="py-24 bg-white border-t border-border">
          <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-8 max-w-6xl">
            <ScrollReveal>
              <div className="bg-card rounded-2xl overflow-hidden shadow-card h-full">
                <img src={monday.image} alt={monday.name} loading="lazy" className="w-full aspect-[16/9] object-cover" />
                <div className="p-8">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-2">
                    <CalendarDays size={14} /> Every Monday
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">{monday.name}</h2>
                  <p className="text-muted-foreground mb-6">
                    Mogodu, nama ya tlhogo, tlhakwana, chicken feet, masonja, skop and marapo, or the buffet with four
                    proteins, your starch and two veggies for {formatPrice(monday.groups[0].items[0].price)}.
                  </p>
                  <Button variant="hero" asChild>
                    <Link to="/menu#traditional">See Monday Prices</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="bg-card rounded-2xl overflow-hidden shadow-card h-full">
                <img src={PHOTOS.oysters} alt={oysters.name} loading="lazy" className="w-full aspect-[16/9] object-cover" />
                <div className="p-8">
                  <div className="text-xs font-bold tracking-widest uppercase text-primary mb-2">Fresh &amp; Fruity</div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">{oysters.name}</h2>
                  <p className="text-muted-foreground mb-2">{oysters.description}.</p>
                  <p className="font-heading font-semibold text-xl text-primary mb-6">{formatPrice(oysters.price)}</p>
                  <Button variant="heroOutline" asChild>
                    <Link to="/menu#light">Light Meals &amp; Dessert</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Hours */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <SectionPill>
                  <Clock size={14} /> Opening Hours
                </SectionPill>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">Open Late on Weekends</h2>
              </div>
              <div className="space-y-3">
                {OPENING_HOURS.map((row) => (
                  <div key={row.days} className="flex justify-between items-center gap-4 bg-card p-4 rounded-lg shadow-card">
                    <span className="font-medium text-foreground">{row.days}</span>
                    <span className="text-primary font-semibold whitespace-nowrap">{row.hours}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-primary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-6">Take a Short Left</h2>
              <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                Good food takes time to prepare. Good memories are made here.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12" asChild>
                <Link to="/contact">Find Us</Link>
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Specials;
