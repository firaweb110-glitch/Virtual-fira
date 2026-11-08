"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Clip-path reveal that plays once when media scrolls into view. */
export function ImageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
