import { Navigation } from "lucide-react";
import { DIRECTIONS_URL, SOCIALS } from "@/data/macnose";
import { cn } from "@/lib/utils";

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path
      fill="currentColor"
      d="M13.5 21.9v-7.4h2.5l.4-2.9h-2.9V9.8c0-.8.2-1.4 1.4-1.4h1.6V5.8c-.3 0-1.2-.1-2.3-.1-2.2 0-3.8 1.4-3.8 3.9v2.1H8v2.9h2.5v7.4C5.7 21.2 2 17 2 12 2 6.5 6.5 2 12 2s10 4.5 10 10c0 5-3.7 9.2-8.5 9.9Z"
    />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM21.9 7.8c-.1-1.6-.4-3-1.6-4.1-1.2-1.2-2.6-1.5-4.1-1.6C14.6 2 9.4 2 7.8 2.1c-1.6.1-3 .4-4.1 1.6C2.5 4.8 2.2 6.2 2.1 7.8 2 9.4 2 14.6 2.1 16.2c.1 1.6.4 3 1.6 4.1 1.2 1.2 2.6 1.5 4.1 1.6 1.6.1 6.8.1 8.4 0 1.6-.1 3-.4 4.1-1.6 1.2-1.2 1.5-2.6 1.6-4.1.1-1.6.1-6.8 0-8.4Zm-2.1 10.2a3.3 3.3 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.9.4s-4.6.1-5.9-.4A3.3 3.3 0 0 1 4.4 18c-.5-1.3-.4-4.3-.4-5.9s-.1-4.6.4-5.9A3.3 3.3 0 0 1 6.2 4.4c1.3-.5 4.3-.4 5.9-.4s4.6-.1 5.9.4a3.3 3.3 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.9s.1 4.6-.4 5.9Z"
    />
  </svg>
);

export const SOCIAL_LINKS = [
  { href: SOCIALS.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIALS.instagram, label: "Instagram", Icon: InstagramIcon },
];

/** Round Facebook / Instagram icon links. Pass `onDark` on the black footer. */
export function SocialIcons({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <div className={cn("flex gap-3", className)}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`MacNose Cafe on ${label}`}
          className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition-colors",
            onDark
              ? "border-white/25 text-white/80 hover:text-white hover:border-primary"
              : "border-border text-foreground/70 hover:text-primary hover:border-primary",
          )}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

/** "Get Directions" plus social links. Used wherever the old app-store buttons were. */
export function VisitButtons({ className, center = false }: { className?: string; center?: boolean }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", center && "justify-center", className)}>
      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 h-12 px-6 rounded-[0.5rem] gradient-primary text-primary-foreground font-semibold shadow-button hover:scale-[1.02] transition-transform"
      >
        <Navigation size={18} />
        Get Directions
      </a>
      <SocialIcons />
    </div>
  );
}
