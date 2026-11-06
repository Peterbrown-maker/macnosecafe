import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Beef, BookOpen, Calendar, Drumstick, Fish, Martini, MessageCircle, Smartphone, Utensils, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BRAND, MENU, whatsappLink } from "@/data/brianos";

const GROUP_ICONS = { braai: Beef, "wings-burgers": Drumstick, platters: Fish, bar: Martini } as Record<string, typeof Beef>;

type BookingType = "table" | "meal";

const BOOKING_LABEL: Record<BookingType, string> = { table: "Book a Table", meal: "Pre-order a Meal" };

const Menu = () => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>("table");
  const [bookingLink, setBookingLink] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState("");
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    guests: "2",
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
  });

  const openBooking = (type: BookingType) => {
    setBookingType(type);
    setModalOpen(false);
    setBookingModalOpen(true);
  };

  // "Book a Table" buttons elsewhere on the site link to /menu#book.
  useEffect(() => {
    if (location.hash === "#book") openBooking("table");
  }, [location.key, location.hash]);

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = `${bookingForm.date} at ${bookingForm.time} for ${bookingForm.guests} ${bookingForm.guests === "1" ? "guest" : "guests"}`;
    const message = [
      `Hi ${BRAND.name}! I'd like to ${bookingType === "table" ? "book a table" : "pre-order a meal"}.`,
      `When: ${summary}`,
      `Name: ${bookingForm.name}`,
      `Phone: ${bookingForm.phone}`,
      bookingForm.email && `Email: ${bookingForm.email}`,
      bookingForm.specialRequests && `Requests: ${bookingForm.specialRequests}`,
    ]
      .filter(Boolean)
      .join("\n");
    const link = whatsappLink(message);
    setBookingDetails(summary);
    setBookingLink(link);
    setBookingModalOpen(false);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const orderOptions = [
    {
      id: "order-now",
      name: "Order in the App",
      description: "Delivery or collect, right from your phone",
      icon: Smartphone,
      action: null,
      badge: "Coming Soon",
    },
    {
      id: "book-meal",
      name: BOOKING_LABEL.meal,
      description: "Tell us what you'd like via WhatsApp",
      icon: MessageCircle,
      action: () => openBooking("meal"),
      badge: null,
    },
    {
      id: "book-table",
      name: BOOKING_LABEL.table,
      description: "Eat in with the squad and stay for the vibes",
      icon: Utensils,
      action: () => openBooking("table"),
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden pt-32 pb-24">
          <img src="/images/brianos/mixed_grill_platter.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionPill variant="dark">Straight Off the Braai</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                Our Menu
              </h1>
              <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
                Flame-grilled meat, sharing platters, seafood, burgers and cocktails, all made with love and served with joy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Menu Categories */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <StaggerContainer className="space-y-24">
              {MENU.map((group, index) => {
                const Icon = GROUP_ICONS[group.id];
                return (
                  <StaggerItem key={group.id}>
                    <div id={group.id} className="grid lg:grid-cols-2 gap-12 items-center">
                      {/* Image */}
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`flex justify-center ${index % 2 === 1 ? "lg:order-2" : ""}`}
                      >
                        <motion.div
                          animate={{ y: [0, -15, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="relative"
                        >
                          <img
                            src={group.image}
                            alt={group.name}
                            loading="lazy"
                            className="w-full max-w-md rounded-2xl shadow-xl"
                          />
                        </motion.div>
                      </motion.div>

                      {/* Content */}
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                            <Icon size={28} />
                          </div>
                          <h2 className="font-heading font-bold text-3xl text-foreground">
                            {group.name}
                          </h2>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {group.description}
                        </p>

                        {/* Menu Items */}
                        <div className="space-y-3">
                          {group.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: itemIndex * 0.1 }}
                              className="flex items-center gap-4 bg-card p-3 rounded-lg shadow-card hover:shadow-md transition-shadow"
                            >
                              <img
                                src={item.image}
                                alt=""
                                loading="lazy"
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-foreground">{item.name}</div>
                                <div className="text-sm text-muted-foreground">{item.description}</div>
                              </div>
                              <span className="text-primary font-semibold whitespace-nowrap">
                                R{item.price}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="pt-4 space-y-3">
                          <Button variant="hero" size="lg" onClick={() => setModalOpen(true)} className="w-full">
                            Order Now
                          </Button>
                          <Button variant="heroOutline" size="lg" onClick={() => openBooking("table")} className="w-full">
                            Book a Table
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section id="download" className="py-20 gradient-primary">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-6">
                Ready to Eat?
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                Send us a WhatsApp to order or book, and we'll get the fire going.
              </p>
              <Button
                variant="heroOutline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a
                  href={whatsappLink(`Hi ${BRAND.name}! I'd like to place an order.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order via WhatsApp
                </a>
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />

      {/* Order Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <BookOpen className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      How to Order
                    </h3>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} className="text-muted-foreground" />
                  </button>
                </div>

                {/* Options */}
                <div className="p-6 space-y-3">
                  {orderOptions.map((option, index) => {
                    const Icon = option.icon;
                    const isDisabled = option.action === null;

                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={option.action ?? undefined}
                        disabled={isDisabled}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          isDisabled
                            ? "border-border bg-muted cursor-not-allowed opacity-75"
                            : "border-border hover:border-primary bg-card hover:bg-primary-light cursor-pointer"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 text-white">
                            <Icon size={24} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">
                                {option.name}
                              </h4>
                              {option.badge && (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                                  {option.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-border bg-muted">
                  <p className="text-xs text-muted-foreground text-center">
                    Pay by card or cash. Alcohol is for customers 18+ only.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 flex items-start justify-center p-4 pointer-events-none overflow-y-auto"
            >
              <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto my-8">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <Calendar className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {BOOKING_LABEL[bookingType]}
                    </h3>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} className="text-muted-foreground" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      📅 Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      🕐 Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={bookingForm.time}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      👥 Number of Guests *
                    </label>
                    <select
                      name="guests"
                      value={bookingForm.guests}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      10 or more? Call us on {BRAND.phoneDisplay}.
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      👤 Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleBookingChange}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      📱 Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleBookingChange}
                      placeholder="071 234 5678"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      📧 Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleBookingChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      📝 {bookingType === "meal" ? "What Would You Like? *" : "Special Requests (Optional)"}
                    </label>
                    <textarea
                      name="specialRequests"
                      value={bookingForm.specialRequests}
                      onChange={handleBookingChange}
                      required={bookingType === "meal"}
                      placeholder={
                        bookingType === "meal"
                          ? "e.g. 1 Mixed Grill Platter, 2 Tropical Cocktails"
                          : "Birthdays, allergies, where you'd like to sit..."
                      }
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" variant="hero" size="lg" className="w-full mt-6">
                    <MessageCircle size={18} />
                    Continue on WhatsApp
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Next-step Modal */}
      <AnimatePresence>
        {bookingLink && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingLink(null)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto">
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 text-white"
                  >
                    <MessageCircle size={36} />
                  </motion.div>

                  <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                    Almost There!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Press send in WhatsApp to get your request to us:
                  </p>
                  <div className="bg-muted rounded-lg p-4 mb-6 border border-border">
                    <p className="text-sm font-semibold text-foreground">
                      {bookingDetails}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">
                    We'll confirm with you in that chat. WhatsApp didn't open? Use the button below.
                  </p>

                  <div className="space-y-3">
                    <Button variant="hero" size="lg" className="w-full" asChild>
                      <a href={bookingLink} target="_blank" rel="noopener noreferrer">
                        Open WhatsApp
                      </a>
                    </Button>
                    <Button variant="heroOutline" size="lg" onClick={() => setBookingLink(null)} className="w-full">
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
