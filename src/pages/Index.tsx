import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { HeadsSection } from "@/components/home/HeadsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { SpecialsSection } from "@/components/home/SpecialsSection";
import { OrderSection } from "@/components/home/OrderSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <HeadsSection />
        <HowItWorksSection />
        <ServicesSection />
        <StatsSection />
        <SpecialsSection />
        <OrderSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
