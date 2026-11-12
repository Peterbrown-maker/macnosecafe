import { Link } from "react-router-dom";
import { Clock, MapPin, Navigation } from "lucide-react";
import { BRAND, DIRECTIONS_URL, OPENING_HOURS } from "@/data/macnose";
import { SocialIcons } from "@/components/VisitButtons";

const exploreLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Specials", path: "/specials" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={BRAND.logo} alt={BRAND.fullName} className="h-20 w-20 rounded-full" />
            <p className="text-sm text-white/70 leading-relaxed">
              Pub &amp; restaurant in Short Left, Soshanguve since {BRAND.established}. South African cuisine, quality
              grills, seafood, premium bottles and feel-good music.
            </p>
            <SocialIcons onDark />
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-white">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2 text-white">
              <Clock size={16} /> Opening Hours
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {OPENING_HOURS.map((row) => (
                <li key={row.days}>
                  <div>{row.days}</div>
                  <div className="text-white">{row.hours}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-white">Find Us</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  {BRAND.address.street}
                  <br />
                  {BRAND.address.city}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Navigation size={16} className="flex-shrink-0" />
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Get directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} {BRAND.fullName}, Short Left. All rights reserved.
          </p>
          <p className="font-script text-xl text-primary">{BRAND.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
