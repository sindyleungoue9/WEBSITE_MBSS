import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE, VALUES } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { ShipArt } from "@/components/ShipArt";
import { btnPrimary, btnOutlineLight, Container, Eyebrow, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return pageMetadata({ locale, path: "/about", title: t("title"), description: t("description") });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} />

      <section className="bg-white">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
            <p>{t("text1", { year: SITE.founded })}</p>
            <p>{t("text2")}</p>
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-navy">{t("portsTitle")}</span>
              <ul className="flex flex-wrap gap-2">
                {SITE.ports.map((p) => (
                  <li key={p} className="bg-brand px-4 py-2 font-bold text-white">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4">
              <Link href="/devis" className={btnPrimary}>
                {nav("quote")}
              </Link>
            </div>
          </div>
          <ShipArt className="w-full" />
        </Container>
      </section>

      <section className="bg-mist">
        <Container className="flex flex-col gap-10 py-20">
          <Eyebrow>{t("valuesTitle")}</Eyebrow>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.key} delay={i * 0.1} className="flex flex-col gap-3 border border-line bg-white p-6">
                <span className="flex size-12 items-center justify-center bg-[#E8EEFF] text-brand">
                  <Icon name={v.icon} />
                </span>
                <h3 className="text-xl font-bold text-navy">{t(`values.${v.key}.title`)}</h3>
                <p className="text-muted">{t(`values.${v.key}.text`)}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-gradient-to-r from-night to-[#12337E] text-white">
        <Container className="flex flex-col gap-5 py-20">
          <h2 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">{t("missionTitle")}</h2>
          <p className="max-w-3xl text-xl leading-relaxed text-[#C3CEE6]">{t("missionText")}</p>
          <div>
            <Link href="/workflows" className={btnOutlineLight}>
              {t("missionCta")}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
