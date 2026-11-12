import { ReactNode } from "react";
import { motion } from "framer-motion";
import { SectionPill } from "@/components/SectionPill";

interface PageHeroProps {
  pill: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  image: string;
  imageAlt?: string;
}

/** White page header: text on the left, a framed photo on the right. */
export function PageHero({ pill, title, children, image, imageAlt = "" }: PageHeroProps) {
  return (
    <section className="bg-white pt-32 pb-16 md:pb-24 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <SectionPill>{pill}</SectionPill>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mt-6 mb-6 leading-tight">
            {title}
          </h1>
          {children && <div className="text-lg text-muted-foreground max-w-xl leading-relaxed">{children}</div>}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-3xl border-2 border-primary/20 -rotate-2" aria-hidden="true" />
          <img src={image} alt={imageAlt} className="relative w-full aspect-[4/3] object-cover rounded-2xl shadow-card-hover" />
        </motion.div>
      </div>
    </section>
  );
}
