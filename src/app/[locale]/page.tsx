import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BENEFITS, CATALOG_CATEGORY_COUNT, SERVICES, SITE, STEPS, yearsOfExperience } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { Counters } from "@/components/Counters";
import { FamilyCards } from "@/components/FamilyCards";
import { Icon } from "@/components/Icon";
import { Marquee } from "@/components/Marquee";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { ShipArt } from "@/components/ShipArt";
import { TiltCard } from "@/components/TiltCard";
import { btnOutline, btnPrimary, Container, CtaBand, Eyebrow, JsonLd } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return pageMetadata({ locale, path: "", title: t("title"), description: t("description") });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const svc = await getTranslations("services");
  const cat = await getTranslations("catalog");
  const proc = await getTranslations("process");
  const schema = await getTranslations("schema");

  // Chiffres : seuls les chiffres connus et vrais sont affichés
  const stats = [
    { to: [SITE.founded], from: [SITE.founded - 25], label: t("stats.founded") },
    { to: [yearsOfExperience()], suffix: t("stats.yearsUnit"), label: t("stats.experience") },
    { to: [24, 7], from: [0, 0], label: t("stats.availability") },
    { to: [CATALOG_CATEGORY_COUNT], label: t("stats.categories") },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "Organization"],
          name: SITE.name,
          legalName: SITE.legalName,
          url: `${SITE.url}/${locale}`,
          logo: `${SITE.url}/images/logo.jpg`,
          image: `${SITE.url}/images/logo.jpg`,
          description: schema("description"),
          foundingDate: String(SITE.founded),
          telephone: SITE.phone,
          ...(SITE.email ? { email: SITE.email } : {}),
          address: {
            "@type": "PostalAddress",
            streetAddress: SITE.address.street,
            addressLocality: SITE.address.city,
            addressCountry: SITE.address.countryCode,
          },
          areaServed: SITE.ports.map((p) => ({ "@type": "City", name: p })),
          openingHours: "Mo-Su 00:00-23:59",
        }}
      />

      {/* Hero : le titre entre mot par mot, le navire flotte et suit le défilement */}
      <section className="overflow-hidden bg-gradient-to-b from-white to-mist">
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Reveal y={16}>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            </Reveal>
            <AnimatedTitle
              text={t("hero.title")}
              className="font-display text-5xl font-extrabold uppercase leading-[0.95] text-navy sm:text-6xl lg:text-7xl"
            />
            <Reveal delay={0.45} y={20}>
              <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t("hero.subtitle")}</p>
            </Reveal>
            <Reveal delay={0.6} y={20} className="flex flex-wrap gap-3">
              <Link href="/devis" className={btnPrimary}>
                {t("hero.ctaPrimary")} <Icon name="arrow" className="size-5" />
              </Link>
              <Link href="/solutions" className={btnOutline}>
                {t("hero.ctaSecondary")}
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.3} x={60} y={0} className="relative">
            <Parallax distance={50}>
              <ShipArt className="w-full" />
            </Parallax>
            <p className="absolute bottom-3 left-3 bg-navy px-4 py-2 text-sm font-semibold text-white sm:left-6">
              {t("hero.badge", { year: SITE.founded })}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Bandeau défilant : les catégories du catalogue */}
      <Marquee />

      {/* Atouts */}
      <section aria-label={t("hero.eyebrow")} className="border-b border-line bg-white">
        <Container className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.key} delay={i * 0.1} className="flex gap-4 px-2 py-8 lg:px-6">
              <span className="flex size-12 shrink-0 items-center justify-center bg-[#E8EEFF] text-brand">
                <Icon name={b.icon} className="size-6" />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-navy">{t(`benefits.${b.key}.title`)}</h2>
                <p className="text-[15px] leading-relaxed text-muted">{t(`benefits.${b.key}.text`)}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Solutions : 3 cartes de services sur fond bleu nuit */}
      <section className="relative overflow-hidden bg-night text-white">
        {/* Lueurs décoratives */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-brand/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 size-[28rem] rounded-full bg-leaf/15 blur-3xl" />

        <Container className="relative flex flex-col gap-14 py-20 sm:py-28">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal className="flex max-w-2xl flex-col gap-5">
              <Eyebrow light>{t("services.eyebrow")}</Eyebrow>
              <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
                {t("services.title")}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-md text-lg leading-relaxed text-[#C3CEE6]">{t("services.text")}</p>
            </Reveal>
          </div>

          <ol className="grid gap-5 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.12} y={40}>
                <TiltCard className="h-full">
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="group relative flex h-full flex-col gap-5 overflow-hidden border border-white/15 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7FE09E] hover:bg-white/10"
                  >
                    {/* Grand numéro en filigrane */}
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 -top-4 font-display text-[7rem] font-extrabold leading-none text-white/[0.06] transition-colors group-hover:text-[#7FE09E]/15"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative flex size-16 items-center justify-center bg-white/10 text-[#7FE09E] transition-colors group-hover:bg-[#7FE09E] group-hover:text-night">
                      <Icon name={s.icon} className="size-8" />
                    </span>
                    <div className="relative flex flex-col gap-2">
                      <h3 className="font-display text-3xl font-bold uppercase leading-none">{svc(`${s.key}.title`)}</h3>
                      <p className="text-[15px] text-[#B8C6E6]">{svc(`${s.key}.short`)}</p>
                    </div>
                    <span className="relative mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold uppercase tracking-[0.1em] text-[#7FE09E] transition-all group-hover:gap-4">
                      {t("services.discover")} <Icon name="arrow" className="size-5" />
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Catalogue : 8 familles */}
      <section className="bg-mist">
        <Container className="flex flex-col gap-12 py-20 sm:py-24">
          <Reveal className="flex max-w-3xl flex-col gap-4">
            <Eyebrow>{t("catalog.eyebrow")}</Eyebrow>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-none text-navy sm:text-6xl">
              {t("catalog.title")}
            </h2>
            <p className="text-lg leading-relaxed text-muted">{t("catalog.text", { count: CATALOG_CATEGORY_COUNT })}</p>
          </Reveal>
          <FamilyCards />
          <Reveal className="flex flex-wrap gap-3">
            <Link href="/catalogue" className={btnOutline}>
              {cat("seeAll")}
            </Link>
            <Link href="/devis" className={btnPrimary}>
              {t("catalog.cta")} <Icon name="arrow" className="size-5" />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Chiffres animés */}
      <Counters items={stats} title={t("stats.title")} />

      {/* Processus */}
      <section className="bg-white">
        <Container className="flex flex-col gap-12 py-20 sm:py-28">
          <Reveal className="flex max-w-3xl flex-col gap-4">
            <Eyebrow>{t("process.eyebrow")}</Eyebrow>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-none text-navy sm:text-6xl">
              {t("process.title")}
            </h2>
          </Reveal>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal
                as="li"
                key={s.key}
                delay={i * 0.12}
                className={`flex flex-col gap-3 border-t-[3px] pt-6 ${i < 2 ? "border-brand" : "border-leaf"}`}
              >
                <span className="flex items-center gap-3 font-display text-lg font-bold tracking-[0.1em] text-brand">
                  <Icon name={s.icon} className="size-6" />
                  {proc("step").toUpperCase()} {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl font-bold uppercase text-navy">{proc(`${s.key}.title`)}</h3>
                <p className="leading-relaxed text-muted">{proc(`${s.key}.text`)}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <Link href="/workflows" className={btnOutline}>
              {t("process.cta")}
            </Link>
          </Reveal>
        </Container>
      </section>

      <CtaBand title={t("banner.title")} text={t("banner.text")} cta={t("banner.cta")} />
    </>
  );
}
