interface PhoneMockupProps {
  /** Screenshot of the app to show on the phone's screen. */
  src: string;
  alt: string;
  className?: string;
}

export function PhoneMockup({ src, alt, className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-[200px] h-[430px] md:w-[220px] md:h-[474px] rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-top rounded-[1.6rem]" />
      </div>
    </div>
  );
}
