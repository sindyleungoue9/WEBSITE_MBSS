"use client";

import { motion } from "motion/react";

// Titre principal (h1) dont les mots entrent un par un.
// Le texte reste du vrai texte dans la page : Google le lit normalement.
export function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <motion.span
            data-reveal
            className="inline-block"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
