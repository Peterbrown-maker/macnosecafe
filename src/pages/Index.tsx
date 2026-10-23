import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { RestaurantsSection } from "@/components/home/RestaurantsSection";
import { RidersSection } from "@/components/home/RidersSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { DownloadSection } from "@/components/home/DownloadSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <ServicesSection />
        <RestaurantsSection />
        <RidersSection />
        <StatsSection />
        <TestimonialsSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;