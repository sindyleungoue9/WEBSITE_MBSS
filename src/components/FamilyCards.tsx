import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CATALOG_FAMILIES } from "@/lib/site";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

const PREVIEW = 3; // nombre de catégories montrées sur la carte

// Photo représentative de chaque famille (fichiers de public/images/catalog/)
const FAMILY_IMAGE: Record<(typeof CATALOG_FAMILIES)[number]["key"], string> = {
  foodWelfare: "provisions",
  linenGalley: "tableware",
  deckMooring: "rope",
  paintCleaning: "marinePaint",
  safety: "safetyGear",
  tools: "handTools",
  pipingHardware: "valves",
  machineryElectrical: "bearings",
};

// Les 8 familles du catalogue sous forme de cartes cliquables (accueil et page Solutions)
export function FamilyCards({ dark = false }: { dark?: boolean }) {
  const t = useTranslations("catalog");

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {CATALOG_FAMILIES.map((f, i) => {
        const rest = f.categories.length - PREVIEW;
        return (
          <Reveal as="li" key={f.key} delay={(i % 4) * 0.08}>
            <TiltCard className="h-full">
            <Link
              href={`/catalogue#${f.key}`}
              className={`group flex h-full flex-col gap-4 border p-6 transition-all hover:-translate-y-1 ${
                dark
                  ? "border-white/15 bg-white/5 hover:border-[#7FE09E] hover:bg-white/10"
                  : "border-line bg-white shadow-sm shadow-navy/5 hover:border-brand hover:shadow-xl hover:shadow-navy/10"
              }`}
            >
              <span className="relative -mx-6 -mt-6 block aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={`/images/catalog/${FAMILY_IMAGE[f.key]}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="flex items-center justify-between">
                <span
                  className={`flex size-14 items-center justify-center transition-colors ${
                    dark
                      ? "bg-white/10 text-[#7FE09E] group-hover:bg-[#7FE09E] group-hover:text-night"
                      : "bg-[#E8EEFF] text-brand group-hover:bg-brand group-hover:text-white"
                  }`}
                >
                  <Icon name={f.icon} className="size-7" />
                </span>
                <span
                  className={`text-xs font-bold uppercase tracking-[0.14em] ${dark ? "text-[#B8C6E6]" : "text-muted"}`}
                >
                  {t("count", { count: f.categories.length })}
                </span>
              </span>

              <h3 className={`font-display text-2xl font-bold uppercase leading-tight ${dark ? "text-white" : "text-navy"}`}>
                {t(`families.${f.key}.title`)}
              </h3>
              <p className={`text-[15px] leading-relaxed ${dark ? "text-[#C3CEE6]" : "text-muted"}`}>
                {t(`families.${f.key}.text`)}
              </p>

              <ul className={`mt-auto flex flex-wrap gap-2 pt-2 text-[13px] ${dark ? "text-[#C3CEE6]" : "text-ink"}`}>
                {f.categories.slice(0, PREVIEW).map((c) => (
                  <li
                    key={c.key}
                    className={`px-2.5 py-1 ${dark ? "bg-white/10" : "bg-mist"}`}
                  >
                    {t(`categories.${c.key}`)}
                  </li>
                ))}
                {rest > 0 && (
                  <li className={`px-2.5 py-1 font-bold ${dark ? "text-[#7FE09E]" : "text-brand"}`}>
                    {t("more", { count: rest })}
                  </li>
                )}
              </ul>
            </Link>
            </TiltCard>
          </Reveal>
        );
      })}
    </ul>
  );
}
