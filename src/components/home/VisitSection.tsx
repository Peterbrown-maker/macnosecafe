import { Clock, MapPin } from "lucide-react";
import { VisitButtons } from "@/components/VisitButtons";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { BRAND, GALLERY, OPENING_HOURS } from "@/data/macnose";

export function VisitSection() {
  return (
    <section className="py-24 bg-white border-t border-border relative overflow-hidden" id="visit">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-script text-3xl text-primary mb-2">{BRAND.slogan}</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Come Through</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pull up a chair on the terrace. Our food is freshly prepared to order, so sit back, pour something good and
              let the evening happen.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {GALLERY.map((photo) => (
            <StaggerItem key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full aspect-square object-cover rounded-lg shadow-card" />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal>
          <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-foreground">
            <div className="bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow rounded-xl p-6 flex gap-4">
              <MapPin className="text-primary flex-shrink-0" />
              <div>
                <p className="font-heading font-semibold mb-1">Where</p>
                <p className="text-sm text-muted-foreground">
                  {BRAND.address.street}
                  <br />
                  {BRAND.address.city}
                </p>
              </div>
            </div>
            <div className="bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow rounded-xl p-6 flex gap-4">
              <Clock className="text-primary flex-shrink-0" />
              <div>
                <p className="font-heading font-semibold mb-1">When</p>
                {OPENING_HOURS.map((row) => (
                  <p key={row.days} className="text-sm text-muted-foreground">
                    {row.days}: <span className="text-foreground">{row.hours}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <VisitButtons center className="mt-10" />
        </ScrollReveal>
      </div>
    </section>
  );
}
