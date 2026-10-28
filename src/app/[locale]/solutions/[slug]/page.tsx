import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { SERVICES, SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { btnPrimary, Container, CtaBand, Eyebrow, JsonLd, PageHero } from "@/components/ui";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SERVICES.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata({
    locale,
    path: `/solutions/${slug}`,
    title: t(`${service.key}.pageTitle`),
    description: t(`${service.key}.description`),
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("solutions");
  const svc = await getTranslations("services");
  const common = await getTranslations("common");
  const items = svc.raw(`${service.key}.items`) as string[];
  const others = SERVICES.filter((s) => s.slug !== slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: svc(`${service.key}.title`),
          description: svc(`${service.key}.description`),
          provider: { "@type": "LocalBusiness", name: SITE.name, url: `${SITE.url}/${locale}` },
          areaServed: SITE.ports.map((p) => ({ "@type": "City", name: p })),
        }}
      />

      <PageHero eyebrow={t("eyebrow")} title={svc(`${service.key}.title`)} intro={svc(`${service.key}.intro`)}>
        <div className="pt-2">
          <Link href="/devis" className={btnPrimary}>
            {t("requestFor")} <Icon name="arrow" className="size-5" />
          </Link>
        </div>
      </PageHero>

      <section className="bg-white">
        <Container className="flex flex-col gap-10 py-20">
          <h2 className="font-display text-4xl font-extrabold uppercase text-navy sm:text-5xl">{t("included")}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item, i) => (
              <Reveal as="li" key={item} delay={(i % 2) * 0.08} className="flex items-start gap-4 border border-line bg-mist p-5 text-lg text-navy">
                <span className="mt-0.5 text-leaf-dark">
                  <Icon name="check" className="size-6" />
                </span>
                {item}
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-mist">
        <Container className="flex flex-col gap-8 py-16">
          <Eyebrow>{t("othersTitle")}</Eyebrow>
          <ul className="grid gap-4 sm:grid-cols-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="flex h-full items-center gap-3 border border-line bg-white p-5 font-bold text-navy transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon name={s.icon} className="size-6 shrink-0" />
                  {svc(`${s.key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/solutions" className="inline-flex w-fit items-center gap-2 font-bold text-brand">
            {common("backToSolutions")} <Icon name="arrow" className="size-5" />
          </Link>
        </Container>
      </section>

      <CtaBand title={t("ctaTitle")} text={t("ctaText")} cta={common("sendList")} />
    </>
  );
}
