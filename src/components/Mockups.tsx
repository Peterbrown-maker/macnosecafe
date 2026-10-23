import { ReactNode } from "react";

interface PhoneMockupProps {
  children?: ReactNode;
  className?: string;
  color?: "blue" | "green" | "purple";
}

const gradients = {
  blue: "from-primary to-primary-hover",
  green: "from-success to-emerald-600",
  purple: "from-accent to-purple-700",
};

export function PhoneMockup({ children, className = "", color = "blue" }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <div className={`w-[200px] h-[400px] md:w-[220px] md:h-[440px] rounded-[2rem] border-[3px] border-foreground/10 bg-gradient-to-br ${gradients[color]} relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]`}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[18px] bg-secondary rounded-b-xl z-10" />
        
        {/* Screen content */}
        <div className="absolute inset-3 top-6 rounded-[1.2rem] bg-secondary/30 backdrop-blur-sm overflow-hidden">
          {children || (
            <div className="p-3 space-y-3">
              <div className="h-6 w-3/4 rounded-md bg-primary-foreground/10" />
              <div className="h-4 w-1/2 rounded-md bg-primary-foreground/10" />
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="h-16 rounded-lg bg-primary-foreground/10" />
                <div className="h-16 rounded-lg bg-primary-foreground/10" />
                <div className="h-16 rounded-lg bg-primary-foreground/10" />
                <div className="h-16 rounded-lg bg-primary-foreground/10" />
              </div>
              <div className="h-20 w-full rounded-lg bg-primary-foreground/10 mt-2" />
              <div className="h-10 w-full rounded-lg bg-primary-foreground/15 mt-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface LaptopMockupProps {
  children?: ReactNode;
  className?: string;
}

export function LaptopMockup({ children, className = "" }: LaptopMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Screen */}
      <div className="w-full max-w-[500px] aspect-[16/10] rounded-t-xl border-[3px] border-foreground/10 bg-gradient-to-br from-secondary to-secondary-light relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
        {/* Camera dot */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground/10" />
        
        {/* Screen content */}
        <div className="absolute inset-3 top-5 rounded-lg bg-secondary-light/50 overflow-hidden">
          {children || (
            <div className="p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-1/4 h-full min-h-[150px] rounded bg-primary/20 p-2 space-y-2">
                  <div className="h-3 w-full rounded bg-primary-foreground/10" />
                  <div className="h-3 w-3/4 rounded bg-primary-foreground/10" />
                  <div className="h-3 w-full rounded bg-primary-foreground/10" />
                  <div className="h-3 w-2/3 rounded bg-primary-foreground/10" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-1/2 rounded bg-primary-foreground/10" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 rounded bg-primary/15" />
                    <div className="h-12 rounded bg-success/15" />
                    <div className="h-12 rounded bg-warning/15" />
                  </div>
                  <div className="h-20 rounded bg-primary-foreground/5" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Base */}
      <div className="w-[110%] -ml-[5%] h-3 bg-foreground/10 rounded-b-lg" />
    </div>
  );
}