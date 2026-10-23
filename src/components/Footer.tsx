import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const footerLinks = {
  Company: ["About", "Careers", "Blog", "Contact"],
  Services: ["Meal Planning", "Catering", "Restaurant Services", "FAQ"],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/images/flavor-logo.png" 
                alt="Flavor Hospitality" 
                className="h-8 w-auto"
              />
              <span className="font-heading font-bold text-lg text-primary-foreground">Flavor</span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Authentic dining experiences for retirement estates. Quality, care, and flavor that will make you smile.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 hover:rotate-6"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-sm mb-4 text-primary-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-primary-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@flavorhospitality.co.za" className="hover:text-primary-foreground transition-colors">
                  info@flavorhospitality.co.za
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+27 (0)XX XXX XXXX</span>
              </li>
              <li>South Africa</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© 2026 Flavor Hospitality. All rights reserved.</p>
          <p>Flavor that will make you smile ❤️</p>
        </div>
      </div>
    </footer>
  );
}