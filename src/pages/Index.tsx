import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { LineUpSection } from "@/components/home/LineUpSection";
import { AppSection } from "@/components/home/AppSection";
import { StatsSection } from "@/components/home/StatsSection";
import { SpecialsSection } from "@/components/home/SpecialsSection";
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
        <LineUpSection />
        <AppSection />
        <StatsSection />
        <SpecialsSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
