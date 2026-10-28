import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { QuoteForm } from "@/components/QuoteForm";
import { Container, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.quote" });
  return pageMetadata({ locale, path: "/devis", title: t("title"), description: t("description") });
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("quote");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <section className="bg-white">
        <Container className="max-w-4xl py-16">
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
