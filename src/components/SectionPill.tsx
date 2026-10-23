import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionPillProps {
  children: ReactNode;
  variant?: "light" | "dark";
}

export function SectionPill({ children, variant = "light" }: SectionPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-xs font-semibold tracking-wider uppercase ${
        variant === "dark"
          ? "bg-primary/20 text-primary-foreground border border-primary/30"
          : "bg-primary/10 text-primary border border-primary/20"
      }`}
    >
      {children}
    </motion.div>
  );
}