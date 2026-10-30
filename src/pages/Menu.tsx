import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SectionPill } from "@/components/SectionPill";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Clock, Leaf, X, MessageCircle, Utensils, BookOpen, Calendar, Users } from "lucide-react";
import { useState } from "react";

const menuCategories = [
  {
    id: "café",
    name: "Café Menu",
    description: "Start your day with our freshly prepared breakfast and coffee selections",
    icon: UtensilsCrossed,
    image: "/images/Flavor-Hospitality_Platter.png",
    items: [
      { name: "Breakfast Platters", price: "R89 - R129" },
      { name: "Fresh Pastries", price: "R35 - R65" },
      { name: "Specialty Coffee", price: "R28 - R55" },
      { name: "Fresh Juices", price: "R32 - R48" },
    ],
  },
  {
    id: "signature",
    name: "Signature Menu",
    description: "Our most popular dishes crafted with premium ingredients",
    icon: Leaf,
    image: "/images/Flavor-Hospitality_Chicken-Prego.png",
    items: [
      { name: "Grilled Chicken Prego", price: "R95 - R135" },
      { name: "Chicken Wings Combo", price: "R109 - R169" },
      { name: "Fresh Salad Platters", price: "R79 - R145" },
      { name: "Gourmet Wraps", price: "R85 - R125" },
    ],
  },
  {
    id: "specials",
    name: "Daily Specials",
    description: "Limited time offers and chef's special creations",
    icon: Clock,
    image: "/images/Flavor-Hospitality_Buffet-salads.png",
    items: [
      { name: "Monday: Rotisserie Special", price: "R115" },
      { name: "Wednesday: Buffet Day", price: "R149" },
      { name: "Friday: BBQ Selection", price: "R135" },
      { name: "Weekend Brunch Combo", price: "R165" },
    ],
  },
];

const Menu = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
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

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDetails(`${bookingForm.date} at ${bookingForm.time} for ${bookingForm.guests} ${bookingForm.guests === "1" ? "guest" : "guests"}`);
    setBookingSuccess(true);
    setBookingModalOpen(false);
  };

  const orderOptions = [
    {
      id: "order-now",
      name: "Order Now",
      description: "Quick delivery to your location",
      icon: UtensilsCrossed,
      action: null,
      badge: "Coming Soon",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "book-meal",
      name: "Book a Meal",
      description: "Reserve your meal via WhatsApp",
      icon: MessageCircle,
      action: () => {
        setModalOpen(false);
        setBookingModalOpen(true);
      },
      badge: null,
      color: "from-green-500 to-green-600",
    },
    {
      id: "book-table",
      name: "Book a Table",
      description: "Dine in and enjoy our atmosphere",
      icon: Utensils,
      action: () => {
        setModalOpen(false);
        setBookingModalOpen(true);
      },
      badge: null,
      color: "from-blue-500 to-blue-600",
    },
  ];
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden pt-32 pb-24">
          <div className="gradient-mesh" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionPill variant="dark">Taste Our Selection</SectionPill>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6">
                Our Menu
              </h1>
              <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
                Discover our delicious range of freshly prepared meals, from café favorites to signature dishes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Menu Categories */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <StaggerContainer className="space-y-24">
              {menuCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <StaggerItem key={category.id}>
                    <div
                      id={category.id}
                      className={`grid lg:grid-cols-2 gap-12 items-center ${
                        index % 2 === 1 ? "lg:flex-row-reverse" : ""
                      }`}
                    >
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
                            src={category.image}
                            alt={category.name}
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
                          <div className="w-12 h-12 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center">
                            <Icon size={28} />
                          </div>
                          <h2 className="font-heading font-bold text-3xl text-foreground">
                            {category.name}
                          </h2>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {category.description}
                        </p>

                        {/* Menu Items */}
                        <div className="space-y-3">
                          {category.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: itemIndex * 0.1 }}
                              className="flex justify-between items-center bg-card p-4 rounded-lg hover:shadow-md transition-shadow"
                            >
                              <span className="font-medium text-foreground">
                                {item.name}
                              </span>
                              <span className="text-primary font-semibold">
                                {item.price}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="pt-4 space-y-3">
                          <Button variant="hero" size="lg" onClick={() => setModalOpen(true)} className="w-full">
                            Order Now
                          </Button>
                          <Button variant="heroOutline" size="lg" onClick={() => setBookingModalOpen(true)} className="w-full">
                            Book a Meal
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
                Ready to Order?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Download our complete menu or book your meal now through WhatsApp for quick delivery.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="heroOutline" size="lg" asChild>
                  <a href="/">Download Full Menu</a>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <a
                    href="https://wa.me/27665655305?text=I%20want%20to%20book%20a%20meal%20at%20Flavor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book via WhatsApp
                  </a>
                </Button>
              </div>
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
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
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
                        onClick={option.action}
                        disabled={isDisabled}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          isDisabled
                            ? "border-border bg-secondary/50 cursor-not-allowed opacity-75"
                            : "border-border hover:border-primary bg-card hover:bg-secondary cursor-pointer"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center flex-shrink-0 text-white`}
                          >
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
                <div className="px-6 py-4 border-t border-border bg-secondary/30">
                  <p className="text-xs text-muted-foreground text-center">
                    More options coming soon. Stay tuned! 🍽️
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto"
            >
              <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto my-8">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <Calendar className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      Book Your Meal
                    </h3>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
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
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
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
                      placeholder="+27..."
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
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      📝 Special Requests (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={bookingForm.specialRequests}
                      onChange={handleBookingChange}
                      placeholder="Any dietary requirements, allergies, or special requests..."
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" variant="hero" size="lg" className="w-full mt-6">
                    Confirm Booking
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {bookingSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingSuccess(false)}
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
                {/* Success Icon */}
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-4xl"
                    >
                      ✓
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                      Booking Confirmed!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Your booking has been successfully submitted for:
                    </p>
                    <div className="bg-secondary/50 rounded-lg p-4 mb-6 border border-border">
                      <p className="text-sm font-semibold text-foreground">
                        {bookingDetails}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      You will receive a WhatsApp confirmation shortly with all your booking details.
                    </p>
                  </motion.div>

                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => setBookingSuccess(false)}
                    className="w-full"
                  >
                    Done
                  </Button>
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
