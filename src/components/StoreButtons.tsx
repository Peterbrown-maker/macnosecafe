import { APP_LINKS } from "@/data/makhanani";
import { cn } from "@/lib/utils";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
    <path fill="currentColor" d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.7-.6-1.2V3c0-.5.2-1 .6-1.2Zm11.6 11.6 2.5 2.5-11.9 6.8 9.4-9.3Zm3.9-3.9 2.9 1.7c.8.5.8 1.6 0 2.1l-2.9 1.7-2.8-2.8 2.8-2.7ZM5.8 1.3l11.9 6.8-2.5 2.5-9.4-9.3Z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
    <path fill="currentColor" d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1ZM13.9 4.9c.7-.9 1.2-2 1-3.2-1 0-2.2.7-3 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.3-.6 3-1.4Z" />
  </svg>
);

const stores = [
  { href: APP_LINKS.playStore, small: "GET IT ON", big: "Google Play", Icon: PlayIcon },
  { href: APP_LINKS.appStore, small: "Download on the", big: "App Store", Icon: AppleIcon },
];

/** Google Play and App Store download buttons. Every order on the site goes through these. */
export function StoreButtons({ className, center = false }: { className?: string; center?: boolean }) {
  return (
    <div className={cn("flex flex-wrap gap-3", center && "justify-center", className)}>
      {stores.map(({ href, small, big, Icon }) => (
        <a
          key={big}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-[0.625rem] bg-black text-white border border-white/25 px-4 py-2 hover:bg-neutral-900 hover:border-white/50 transition-colors"
        >
          <Icon />
          <span className="flex flex-col leading-tight text-left">
            <span className="text-[10px] uppercase tracking-wide text-white/70">{small}</span>
            <span className="font-heading font-semibold text-base">{big}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
