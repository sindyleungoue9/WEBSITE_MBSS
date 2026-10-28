import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SERVICES, SITE } from "@/lib/site";

// Liste de toutes les pages pour Google (chaque page existe en FR et en EN)
// "/news" est exclue tant qu'elle ne contient aucun article.
const PAGES = ["", "/solutions", "/catalogue", "/about", "/workflows", "/contact", "/devis", "/mentions-legales"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...PAGES, ...SERVICES.map((s) => `/solutions/${s.slug}`)];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/devis" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE.url}/${l}${path}`])),
      },
    })),
  );
}
