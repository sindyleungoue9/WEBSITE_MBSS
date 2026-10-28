import { getTranslations, setRequestLocale } from "next-intl/server";
import { CATALOG_CATEGORY_COUNT } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { Container, CtaBand, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.catalogue" });
  return pageMetadata({ locale, path: "/catalogue", title: t("title"), description: t("description") });
}

export default async function CataloguePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("catalog");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("pageTitle")}
        intro={t("pageIntro", { count: CATALOG_CATEGORY_COUNT })}
      />

      <section className="bg-white">
        <Container className="py-16">
          <CatalogBrowser />
        </Container>
      </section>

      <CtaBand title={t("missingTitle")} text={t("missingText")} cta={t("cta")} />
    </>
  );
}
