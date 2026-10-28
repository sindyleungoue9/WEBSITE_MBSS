import { defineRouting } from "next-intl/routing";

// Deux langues : français (par défaut) et anglais. Le préfixe /fr ou /en est toujours présent
// dans l'adresse, ce qui est le plus clair pour Google (balises hreflang).
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
