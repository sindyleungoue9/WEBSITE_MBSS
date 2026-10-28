import { getTranslations, setRequestLocale } from "next-intl/server";
import { SITE, WHATSAPP_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import { QuoteForm } from "@/components/QuoteForm";
import { Container, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return pageMetadata({ locale, path: "/contact", title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const common = await getTranslations("common");

  const a = SITE.address;
  const mapQuery = encodeURIComponent(`${a.street}, ${a.district}, ${a.city}, ${a.country}`);
  const row = "flex items-start gap-3 text-lg";

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <section className="bg-white">
        <Container className="grid gap-12 py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-3xl font-bold uppercase text-navy">{t("hq")}</h2>
            <address className="flex flex-col gap-4 not-italic">
              <p className={row}>
                <Icon name="pin" className="mt-1 size-6 shrink-0 text-brand" />
                <span>
                  {a.street}
                  <br />
                  {a.district}, {a.city}, {a.country}
                </span>
              </p>
              <a href={`tel:${SITE.phone}`} className={`${row} font-semibold text-brand`}>
                <Icon name="phone" className="mt-1 size-6 shrink-0" />
                {SITE.phoneDisplay}
              </a>
              <a href={WHATSAPP_URL} rel="noopener" className={`${row} font-semibold text-leaf-dark`}>
                <Icon name="chat" className="mt-1 size-6 shrink-0" />
                WhatsApp {SITE.whatsappDisplay}
              </a>
              {SITE.email && (
                <a href={`mailto:${SITE.email}`} className={`${row} font-semibold text-brand`}>
                  <Icon name="mail" className="mt-1 size-6 shrink-0" />
                  {SITE.email}
                </a>
              )}
            </address>
            <p className="text-muted">{common("available")}</p>
            <iframe
              title={t("mapTitle")}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border border-line"
            />
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="font-display text-3xl font-bold uppercase text-navy">{t("formTitle")}</h2>
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
