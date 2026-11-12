import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { SpecialsSection } from "@/components/home/SpecialsSection";
import { VisitSection } from "@/components/home/VisitSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <HighlightsSection />
        <SpecialsSection />
        <StatsSection />
        <VisitSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
