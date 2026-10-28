"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Le contenu remonte un peu plus lentement que la page : effet de profondeur au défilement
export function Parallax({ children, className, distance = 60 }: { children: ReactNode; className?: string; distance?: number }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, distance]);
  return (
    <motion.div data-parallax style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
