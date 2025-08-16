"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
};

interface VibrantCardProps {
  children: ReactNode;
  className?: string;
  as?: typeof motion.div;
  [key: string]: unknown;
}

interface VibrantCardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface VibrantCardContentProps {
  children: ReactNode;
  className?: string;
}

export const VibrantCard = ({ children, className, as: Component = motion.div, ...props }: VibrantCardProps) => {
  return (
    <Component
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "shadow-lg border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50/50 overflow-hidden rounded-2xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const VibrantCardHeader = ({ children, className }: VibrantCardHeaderProps) => (
    <div className={cn("flex flex-row items-center justify-between bg-slate-50/80 border-b border-slate-200/80 p-4", className)}>
        {children}
    </div>
);

export const VibrantCardContent = ({ children, className }: VibrantCardContentProps) => (
    <div className={cn("p-6", className)}>
        {children}
    </div>
);
