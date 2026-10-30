"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CATALOG_FAMILIES } from "@/lib/site";
import { Icon } from "./Icon";

// Enlève les accents et les majuscules pour que "pièces" soit trouvé en tapant "pieces"
const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

// Catalogue complet : recherche + filtre par famille
export function CatalogBrowser() {
  const t = useTranslations("catalog");
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<string>("all");

  const families = useMemo(() => {
    const q = normalize(query);
    return CATALOG_FAMILIES.filter((f) => family === "all" || f.key === family)
      .map((f) => {
        const familyMatches = q !== "" && normalize(t(`families.${f.key}.title`)).includes(q);
        const categories = f.categories.filter(
          (c) => q === "" || familyMatches || normalize(t(`categories.${c.key}`)).includes(q),
        );
        return { ...f, categories };
      })
      .filter((f) => f.categories.length > 0);
  }, [query, family, t]);

  const chip = (active: boolean) =>
    `shrink-0 border px-4 py-2.5 text-sm font-bold transition-colors ${
      active ? "border-brand bg-brand text-white" : "border-line bg-white text-navy hover:border-brand hover:text-brand"
    }`;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-sm font-bold text-navy" htmlFor="catalog-search">
          {t("searchLabel")}
          <span className="relative">
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full border border-[#B9C4DB] bg-white py-4 pl-12 pr-4 text-base font-normal text-navy placeholder:text-muted/60 focus:border-brand"
            />
          </span>
        </label>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label={t("all")}>
          <button type="button" onClick={() => setFamily("all")} aria-pressed={family === "all"} className={chip(family === "all")}>
            {t("all")}
          </button>
          {CATALOG_FAMILIES.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFamily(f.key)}
              aria-pressed={family === f.key}
              className={chip(family === f.key)}
            >
              {t(`families.${f.key}.title`)}
            </button>
          ))}
        </div>
      </div>

      {families.length === 0 ? (
        <p role="status" className="border border-line bg-mist p-8 text-lg text-muted">
          {t("noResult")}
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {families.map((f) => (
            <section key={f.key} id={f.key} aria-labelledby={`${f.key}-title`} className="flex flex-col gap-5">
              <div className="flex items-center gap-4 border-b border-line pb-4">
                <span className="flex size-12 shrink-0 items-center justify-center bg-brand text-white">
                  <Icon name={f.icon} />
                </span>
                <div className="flex flex-col">
                  <h2 id={`${f.key}-title`} className="font-display text-3xl font-bold uppercase leading-none text-navy">
                    {t(`families.${f.key}.title`)}
                  </h2>
                  <p className="mt-1 text-[15px] text-muted">{t(`families.${f.key}.text`)}</p>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {f.categories.map((c) => (
                  <li key={c.key} className="relative flex flex-col border border-line bg-white text-navy">
                    <div className="relative aspect-square w-full bg-white">
                      {/* Photos de catégories (public/images/catalog/<clé>.jpg) */}
                      <Image
                        src={`/images/catalog/${c.key}.jpg`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-contain"
                      />
                      {"onRequest" in c && c.onRequest && (
                        <span className="absolute left-2 top-2 bg-[#E8EEFF] px-2 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand">
                          {t("onRequest")}
                        </span>
                      )}
                    </div>
                    <span className="flex flex-1 items-center gap-2 border-t border-line px-4 py-3 text-[15px] font-bold leading-snug">
                      <span className="shrink-0 text-leaf-dark">
                        <Icon name="check" className="size-4" />
                      </span>
                      {t(`categories.${c.key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
