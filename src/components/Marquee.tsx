import { useTranslations } from "next-intl";
import { CATALOG_FAMILIES } from "@/lib/site";

// Bandeau qui fait défiler en boucle les catégories du catalogue (pause au survol).
// Purement décoratif : la liste complète et lisible est sur la page Catalogue.
export function Marquee() {
  const t = useTranslations("catalog");
  const labels = CATALOG_FAMILIES.flatMap((f) => f.categories.map((c) => t(`categories.${c.key}`)));

  return (
    <div aria-hidden="true" className="marquee overflow-hidden border-y border-white/10 bg-navy py-4 text-white">
      <div className="marquee-track">
        {/* La liste est écrite deux fois pour que la boucle soit sans coupure */}
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {labels.map((label) => (
              <li
                key={label}
                className="flex items-center gap-6 pr-6 font-display text-xl font-bold uppercase tracking-wide whitespace-nowrap"
              >
                {label}
                <span className="size-2 rotate-45 bg-leaf" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
