import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { VisitButtons } from "@/components/VisitButtons";
import { motion } from "framer-motion";
import { Info, ShoppingBag } from "lucide-react";
import { QuantityControl } from "@/components/cart/QuantityControl";
import { useCart } from "@/context/cart";
import { itemId } from "@/lib/menu";
import { BRAND, MENU, PHOTOS, formatPrice, type MenuGroup, type MenuSection } from "@/data/macnose";

const FOOD = MENU.filter((s) => s.kind === "food");
const DRINKS = MENU.filter((s) => s.kind === "drinks");

function PriceList({ sectionId, group }: { sectionId: string; group: MenuGroup }) {
  return (
    <div>
      {group.name && (
        <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-primary mt-6 mb-3 first:mt-0">✦ {group.name}</h4>
      )}
      <ul className="space-y-3">
        {group.items.map((item) => (
          <li key={item.name}>
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-foreground">{item.name}</span>
              <span className="flex-1 border-b border-dotted border-foreground/25 translate-y-[-3px] min-w-4" aria-hidden="true" />
              <span className="font-heading font-semibold text-primary whitespace-nowrap">{formatPrice(item.price)}</span>
              <span className="w-[84px] flex-shrink-0 flex justify-end self-center">
                {typeof item.price === "number" ? (
                  <QuantityControl id={itemId(sectionId, group.name, item.name)} size="sm" />
                ) : (
                  <span className="text-[11px] leading-tight text-muted-foreground text-right">Ask your waitron</span>
                )}
              </span>
            </div>
            {item.description && <p className="text-sm text-muted-foreground mt-0.5 pr-24">{item.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeading({ section }: { section: MenuSection }) {
  return (
    <div className="mb-6">
      {section.tagline && <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-1">{section.tagline}</p>}
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">{section.name}</h2>
    </div>
  );
}

function SectionNote({ note }: { note?: string }) {
  if (!note) return null;
  return (
    <p className="mt-6 flex items-center gap-2 text-sm italic text-muted-foreground">
      <Info size={14} className="flex-shrink-0" /> {note}
    </p>
  );
}

function FoodSection({ section, index }: { section: MenuSection; index: number }) {
  return (
    <motion.div
      id={section.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`scroll-mt-36 grid gap-10 items-start ${section.image ? "lg:grid-cols-[2fr_3fr]" : ""}`}
    >
      {section.image && (
        <div className={`lg:sticky lg:top-40 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
          <img src={section.image} alt={section.name} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl" />
        </div>
      )}
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
        <SectionHeading section={section} />
        <div className={section.image ? "" : "grid md:grid-cols-2 gap-x-12 gap-y-6"}>
          {section.groups.map((group, i) => (
            <PriceList key={group.name ?? i} sectionId={section.id} group={group} />
          ))}
        </div>
        <SectionNote note={section.note} />
      </div>
    </motion.div>
  );
}

function DrinkSection({ section }: { section: MenuSection }) {
  return (
    <div id={section.id} className="scroll-mt-36 break-inside-avoid mb-8 bg-card rounded-2xl p-6 shadow-card">
      <SectionHeading section={section} />
      <div className="space-y-2">
        {section.groups.map((group, i) => (
          <PriceList key={group.name ?? i} sectionId={section.id} group={group} />
        ))}
      </div>
    </div>
  );
}

function CategoryBar() {
  const link = (s: MenuSection) => (
    <a
      key={s.id}
      href={`#${s.id}`}
      className="flex-shrink-0 px-3 py-1.5 rounded-pill text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
    >
      {s.name}
    </a>
  );
  return (
    <div className="sticky top-16 md:top-20 z-30 glass-navbar shadow-card">
      <nav aria-label="Menu sections" className="container mx-auto px-4 lg:px-8 flex items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        <span className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-primary pr-2">Food</span>
        {FOOD.map(link)}
        <span className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-primary px-2 border-l border-border ml-2">
          Drinks
        </span>
        {DRINKS.map(link)}
      </nav>
    </div>
  );
}

/** Sticky "view order" bar so the cart is always one tap away while browsing. */
function CartBar() {
  const { count, subtotal, setOpen } = useCart();
  if (count === 0) return null;
  return (
    <div className="fixed bottom-4 inset-x-4 z-40 flex justify-center pointer-events-none">
      <button
        onClick={() => setOpen(true)}
        className="pointer-events-auto w-full max-w-md h-14 px-5 rounded-pill gradient-primary text-primary-foreground shadow-button flex items-center gap-3 font-semibold hover:scale-[1.01] transition-transform"
      >
        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">{count}</span>
        <span className="flex-1 text-left flex items-center gap-2">
          <ShoppingBag size={18} /> View your order
        </span>
        <span>{formatPrice(subtotal)}</span>
      </button>
    </div>
  );
}

const Menu = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero pill="Food &amp; Drinks" title="Our Menu" image={PHOTOS.foodDrink} imageAlt="Food and drinks at MacNose Cafe">
          Traditional Monday meals, flame grills, slow-cooked stews, sharing platters, oysters and a full bar. Tap Add on
          anything you fancy, then order for collection or straight to your table.
        </PageHero>

        <CategoryBar />

        {/* Food */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8 space-y-20">
            {FOOD.map((section, i) => (
              <FoodSection key={section.id} section={section} index={i} />
            ))}
          </div>
        </section>

        {/* Drinks */}
        <section className="py-20 bg-white border-t border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="font-script text-3xl text-primary">From the Bar</p>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-1">Drinks &amp; Cocktails</h2>
              </div>
            </ScrollReveal>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
              {DRINKS.map((section) => (
                <DrinkSection key={section.id} section={section} />
              ))}
            </div>
            <p className="text-center text-sm italic text-muted-foreground mt-4">
              Ask your waitron for our full drinks selection and specials.
            </p>
          </div>
        </section>

        {/* Visit */}
        <section className="py-20 bg-white border-t border-border">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">Hungry Yet?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Take a short left to {BRAND.address.street}. We're open from 10:00 every day, and until 02:00 on
                Fridays and Saturdays.
              </p>
              <VisitButtons center />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <CartBar />
      <Footer />
    </div>
  );
};

export default Menu;
