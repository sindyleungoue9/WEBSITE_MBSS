"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const; // démarre vite, termine en douceur

type Props = {
  children: ReactNode;
  className?: string;
  /** Retard en secondes (utile pour faire apparaître une liste en escalier) */
  delay?: number;
  /** Décalage de départ en pixels : l'élément glisse jusqu'à sa place */
  y?: number;
  x?: number;
  as?: "div" | "li";
};

// Fait apparaître son contenu en glissant, quand il entre dans l'écran (une seule fois).
// Si l'animation est coupée (réglage "réduire les animations" ou JavaScript désactivé),
// le CSS (globals.css + <noscript> du layout) affiche le contenu tout de suite grâce à "data-reveal".
export function Reveal({ children, className, delay = 0, y = 28, x = 0, as = "div" }: Props) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -70px 0px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
