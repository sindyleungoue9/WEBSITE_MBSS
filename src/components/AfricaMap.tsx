"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AFRICA_PATHS } from "@/lib/africaPaths";

// Pays d'activité de MBSS : centre sur la carte (viewBox 800x880), noms et port principal (à titre indicatif).
// La clé correspond à AFRICA_PATHS[].k. "Cameroon" est la base de MBSS.
const BASE = "Cameroon";
const COUNTRIES: Record<string, { c: [number, number]; en: string; fr: string; portEn: string; portFr: string }> = {
  Cameroon: { c: [397.3, 327.9], en: "Cameroon", fr: "Cameroun", portEn: "Douala", portFr: "Douala" },
  Congo: { c: [420.2, 387.9], en: "Congo (Brazzaville)", fr: "Congo (Brazzaville)", portEn: "Pointe-Noire", portFr: "Pointe-Noire" },
  Angola: { c: [441.4, 493.8], en: "Angola", fr: "Angola", portEn: "Luanda", portFr: "Luanda" },
  "South Africa": { c: [511.8, 658.5], en: "South Africa", fr: "Afrique du Sud", portEn: "Durban", portFr: "Durban" },
  Mozambique: { c: [607.4, 540.6], en: "Mozambique", fr: "Mozambique", portEn: "Maputo", portFr: "Maputo" },
  Benin: { c: [301.8, 291.3], en: "Benin", fr: "Bénin", portEn: "Cotonou", portFr: "Cotonou" },
  "Côte d'Ivoire": { c: [229.2, 310], en: "Côte d'Ivoire", fr: "Côte d'Ivoire", portEn: "Abidjan", portFr: "Abidjan" },
  Djibouti: { c: [671.3, 271.5], en: "Djibouti", fr: "Djibouti", portEn: "Djibouti", portFr: "Djibouti" },
  Guinea: { c: [179.9, 283.8], en: "Guinea (Conakry)", fr: "Guinée (Conakry)", portEn: "Conakry", portFr: "Conakry" },
  "Eq. Guinea": { c: [375.4, 364.5], en: "Equatorial Guinea", fr: "Guinée équatoriale", portEn: "Malabo", portFr: "Malabo" },
  Gabon: { c: [387.5, 388], en: "Gabon", fr: "Gabon", portEn: "Libreville", portFr: "Libreville" },
  Ghana: { c: [269.2, 307], en: "Ghana", fr: "Ghana", portEn: "Tema", portFr: "Tema" },
  Morocco: { c: [200.2, 93.6], en: "Morocco", fr: "Maroc", portEn: "Casablanca", portFr: "Casablanca" },
  Senegal: { c: [147.5, 246.9], en: "Senegal", fr: "Sénégal", portEn: "Dakar", portFr: "Dakar" },
  "Sierra Leone": { c: [172.1, 301.3], en: "Sierra Leone", fr: "Sierra Leone", portEn: "Freetown", portFr: "Freetown" },
  Togo: { c: [289.2, 301.6], en: "Togo", fr: "Togo", portEn: "Lomé", portFr: "Lomé" },
};
const ORDER = Object.keys(COUNTRIES).filter((k) => k !== BASE);

// Arc courbe de la base vers un pays
function arcPath(to: [number, number]) {
  const [bx, by] = COUNTRIES[BASE].c;
  const [x, y] = to;
  const dx = x - bx;
  const dy = y - by;
  const dist = Math.hypot(dx, dy);
  const cx = (bx + x) / 2 - dy * 0.22;
  const cy = (by + y) / 2 + dx * 0.22 - dist * 0.12;
  return `M${bx} ${by} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x} ${y}`;
}

// Carte interactive des pays d'action de MBSS (page À propos)
export function AfricaMap() {
  const t = useTranslations("about.network");
  const locale = useLocale();
  const fr = locale === "fr";
  const [current, setCurrent] = useState(BASE);
  const [shown, setShown] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Les liaisons se tracent quand la carte entre dans l'écran
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const name = (k: string) => (fr ? COUNTRIES[k].fr : COUNTRIES[k].en);
  const port = (k: string) => (fr ? COUNTRIES[k].portFr : COUNTRIES[k].portEn);
  const [bx, by] = COUNTRIES[BASE].c;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
      <div ref={boxRef} className="relative mx-auto w-full max-w-[640px]">
        <svg
          viewBox="0 0 800 880"
          role="img"
          aria-label={t("mapLabel")}
          className={`block h-auto w-full overflow-visible ${shown ? "map-in" : ""}`}
        >
          <g>
            {AFRICA_PATHS.map((p) => {
              const active = COUNTRIES[p.k] && p.k === current;
              const interactive = COUNTRIES[p.k];
              return (
                <path
                  key={p.k}
                  d={p.d}
                  className={`map-country ${interactive ? "map-on" : ""} ${p.k === BASE ? "map-base" : ""} ${active ? "map-act" : ""}`}
                  {...(interactive
                    ? {
                        tabIndex: 0,
                        role: "button",
                        "aria-label": name(p.k),
                        onMouseEnter: () => setCurrent(p.k),
                        onFocus: () => setCurrent(p.k),
                        onClick: () => setCurrent(p.k),
                        onKeyDown: (e: React.KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setCurrent(p.k);
                          }
                        },
                      }
                    : {})}
                />
              );
            })}
          </g>
          <g className="pointer-events-none">
            {ORDER.map((k, i) => (
              <g key={k}>
                <path
                  d={arcPath(COUNTRIES[k].c)}
                  pathLength={1}
                  className={`map-arc ${k === current ? "map-arc-act" : ""}`}
                  style={{ animationDelay: `${0.25 + i * 0.09}s` }}
                />
                <circle
                  cx={COUNTRIES[k].c[0]}
                  cy={COUNTRIES[k].c[1]}
                  r={4}
                  className="map-dot"
                  style={{ animationDelay: `${1.75 + i * 0.09}s` }}
                />
              </g>
            ))}
          </g>
          <g className="pointer-events-none">
            {Object.keys(COUNTRIES).map((k) => (
              <text
                key={k}
                x={COUNTRIES[k].c[0]}
                y={COUNTRIES[k].c[1] - 14}
                textAnchor="middle"
                className={`map-label ${k === current ? "map-label-act" : ""}`}
              >
                {name(k)}
              </text>
            ))}
            <circle cx={bx} cy={by} r={5} className="map-pulse" />
            <circle cx={bx} cy={by} r={5} fill="#fff" />
          </g>
        </svg>
      </div>

      <div className="flex flex-col gap-5">
        <div aria-live="polite" className="border border-white/20 bg-white/[0.07] p-6 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9FE8BD]">{t("selected")}</p>
          <p className="mt-2 font-display text-4xl font-extrabold uppercase leading-none text-white sm:text-5xl">
            {name(current)}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/15 pt-4 text-[#DFE9F8]">
            <span className="text-lg">{port(current)}</span>
            <span className="ml-auto bg-[#E8EEFF] px-2 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand">
              {current === BASE ? t("homeBase") : t("mainPort")}
            </span>
          </div>
          <div className="mt-5 flex gap-8">
            <div>
              <b className="block font-display text-5xl font-extrabold leading-none text-[#7FE09E]">{ORDER.length}</b>
              <span className="text-sm text-[#C3CEE6]">{t("countries")}</span>
            </div>
            <div>
              <b className="block font-display text-5xl font-extrabold leading-none text-[#7FE09E]">1</b>
              <span className="text-sm text-[#C3CEE6]">{t("baseCount")}</span>
            </div>
          </div>
        </div>

        <ul className="flex flex-wrap gap-2">
          {[BASE, ...ORDER].map((k) => (
            <li key={k}>
              <button
                type="button"
                onMouseEnter={() => setCurrent(k)}
                onClick={() => setCurrent(k)}
                aria-pressed={k === current}
                className={`border px-3 py-2 text-[13.5px] transition-colors ${
                  k === current
                    ? "border-[#7FE09E] bg-[#7FE09E]/25 text-white"
                    : k === BASE
                      ? "border-[#8AA3FF] text-[#DFE9F8] hover:bg-white/10"
                      : "border-white/20 text-[#DFE9F8] hover:border-[#7FE09E] hover:bg-white/10"
                }`}
              >
                {name(k)}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-[#9DB0CA]">{t("note")}</p>
      </div>
    </div>
  );
}
