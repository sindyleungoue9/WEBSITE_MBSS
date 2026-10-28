import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { AnimatedTitle } from "./AnimatedTitle";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

// Petits éléments de design réutilisés sur toutes les pages

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 bg-leaf-dark px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-navy";
export const btnBrand =
  "inline-flex items-center justify-center gap-2 bg-brand px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-dark";
export const btnOutline =
  "inline-flex items-center justify-center gap-2 border border-navy px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-navy transition-colors hover:bg-navy hover:text-white";
export const btnOutlineLight =
  "inline-flex items-center justify-center gap-2 border border-white px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-navy";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`text-sm font-bold uppercase tracking-[0.2em] ${light ? "text-[#7FE09E]" : "text-leaf-dark"}`}
    >
      {children}
    </span>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

// Bandeau de titre en haut des pages intérieures
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-night text-white">
      <Container className="flex flex-col gap-5 py-16 sm:py-24">
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </Reveal>
        <AnimatedTitle
          text={title}
          className="max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl"
        />
        {intro && (
          <Reveal delay={0.3}>
            <p className="max-w-2xl text-lg leading-relaxed text-[#C3CEE6] sm:text-xl">{intro}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.4}>{children}</Reveal>}
      </Container>
    </section>
  );
}

// Bandeau d'appel à l'action (fond bleu nuit)
export function CtaBand({
  title,
  text,
  cta,
  href = "/devis",
}: {
  title: string;
  text: string;
  cta: string;
  href?: string;
}) {
  return (
    <section className="bg-gradient-to-r from-night to-[#12337E] text-white">
      <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <Reveal className="flex max-w-2xl flex-col gap-3">
          <h2 className="font-display text-4xl font-extrabold uppercase leading-none sm:text-5xl">{title}</h2>
          <p className="text-lg text-[#C3CEE6]">{text}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link href={href} className={btnPrimary}>
            {cta} <Icon name="arrow" className="size-5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

// Données structurées pour Google (JSON-LD)
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu est généré par nous (pas de saisie utilisateur) ; "<" est neutralisé par précaution
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
