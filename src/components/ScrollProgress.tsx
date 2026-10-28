"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Fine barre verte tout en haut de l'écran : elle se remplit au fil de la lecture de la page
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-leaf" />;
}
