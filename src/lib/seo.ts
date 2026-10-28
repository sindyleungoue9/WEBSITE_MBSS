import type { Metadata } from "next";
import { SITE } from "./site";

type Args = {
  locale: string;
  path: string; // "" pour l'accueil, sinon "/solutions"...
  title: string;
  description: string;
  noindex?: boolean;
};

// Métadonnées communes : titre, description, adresse canonique, alternatives FR/EN, partage social
export function pageMetadata({ locale, path, title, description, noindex }: Args): Metadata {
  const url = `/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `/fr${path}`,
        en: `/en${path}`,
        "x-default": `/fr${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      type: "website",
      images: [{ url: "/images/logo.jpg", width: 850, height: 600, alt: SITE.name }],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
