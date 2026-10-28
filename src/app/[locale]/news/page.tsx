import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { btnPrimary, Container, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.news" });
  // Page non référencée tant qu'elle ne contient aucun article (évite une page vide dans Google)
  return pageMetadata({ locale, path: "/news", title: t("title"), description: t("description"), noindex: true });
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} />
      <section className="bg-white">
        <Container className="flex flex-col items-start gap-5 py-20">
          <h2 className="font-display text-4xl font-extrabold uppercase text-navy">{t("emptyTitle")}</h2>
          <p className="max-w-2xl text-lg text-muted">{t("emptyText")}</p>
          <Link href="/contact" className={btnPrimary}>
            {t("cta")}
          </Link>
        </Container>
      </section>
    </>
  );
}
