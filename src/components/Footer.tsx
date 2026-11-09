import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, OPENING_HOURS } from "@/data/makhanani";
import { StoreButtons } from "@/components/StoreButtons";

const exploreLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "How to Order", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={BRAND.logo} alt={BRAND.fullName} className="h-16 w-auto rounded" />
            <p className="text-sm text-white/70 leading-relaxed">
              Half skops, cow heads, pig heads, cow heels and fresh pap, slow-cooked and {BRAND.promise.toLowerCase()} Order in the Makhanani app.
            </p>
            <StoreButtons />
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Explore</h4>
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
            <h4 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
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

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Find Us</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-white transition-colors">
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="flex-shrink-0" />
                {BRAND.area}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center md:text-left">
          <p>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</p>
          <p>{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
