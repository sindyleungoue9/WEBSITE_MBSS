import { getTranslations, setRequestLocale } from "next-intl/server";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Container, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.legal" });
  return pageMetadata({ locale, path: "/mentions-legales", title: t("title"), description: t("description") });
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const a = SITE.address;

  const h2 = "font-display text-3xl font-bold uppercase text-navy";

  return (
    <>
      <PageHero eyebrow="MBSS SARL" title={t("title")} />
      <section className="bg-white">
        <Container className="flex max-w-3xl flex-col gap-10 py-16 text-lg leading-relaxed text-ink">
          <div className="flex flex-col gap-3">
            <h2 className={h2}>{t("publisher")}</h2>
            <p>{t("publisherText")}</p>
            <p>
              {a.street}, {a.district}, {a.city}, {a.country}
              <br />
              {SITE.phoneDisplay}
              {SITE.email && (
                <>
                  <br />
                  {SITE.email}
                </>
              )}
            </p>
          </div>

          {(SITE.legal.rccm || SITE.legal.niu) && (
            <div className="flex flex-col gap-3">
              <h2 className={h2}>{t("registration")}</h2>
              {SITE.legal.rccm && (
                <p>
                  {t("rccm")} : {SITE.legal.rccm}
                </p>
              )}
              {SITE.legal.niu && (
                <p>
                  {t("niu")} : {SITE.legal.niu}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <h2 className={h2}>{t("hosting")}</h2>
            <p>{t("hostingText")}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className={h2}>{t("dataTitle")}</h2>
            <p>{t("dataText")}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className={h2}>{t("cookiesTitle")}</h2>
            <p>{t("cookiesText")}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
