import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CATALOG_CATEGORY_COUNT, SERVICES } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { FamilyCards } from "@/components/FamilyCards";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { btnOutline, Container, CtaBand, Eyebrow, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.solutions" });
  return pageMetadata({ locale, path: "/solutions", title: t("title"), description: t("description") });
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("solutions");
  const svc = await getTranslations("services");
  const cat = await getTranslations("catalog");
  const common = await getTranslations("common");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      {/* Les 5 services */}
      <section className="bg-white">
        <Container className="grid gap-6 py-20 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const items = (svc.raw(`${s.key}.items`) as string[]).slice(0, 3);
            return (
              <Reveal key={s.slug} delay={i * 0.12} y={40} className="h-full">
              <TiltCard className="h-full">
              <Link
                href={`/solutions/${s.slug}`}
                className="group relative flex h-full flex-col gap-5 overflow-hidden border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-2xl hover:shadow-navy/10"
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-4 font-display text-[7rem] font-extrabold leading-none text-brand/[0.06] transition-colors group-hover:text-brand/10"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex size-16 items-center justify-center bg-[#E8EEFF] text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={s.icon} className="size-8" />
                </span>
                <div className="relative flex flex-col gap-2">
                  <h2 className="font-display text-3xl font-bold uppercase leading-none text-navy">{svc(`${s.key}.title`)}</h2>
                  <p className="text-[15px] font-semibold text-leaf-dark">{svc(`${s.key}.short`)}</p>
                </div>
                <ul className="relative flex flex-col gap-2 text-[15px] text-muted">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 text-leaf-dark">
                        <Icon name="check" className="size-5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="relative mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold uppercase tracking-[0.1em] text-brand transition-all group-hover:gap-4">
                  {common("learnMore")} <Icon name="arrow" className="size-5" />
                </span>
              </Link>
              </TiltCard>
              </Reveal>
            );
          })}
        </Container>
      </section>

      {/* Le catalogue en 8 familles */}
      <section className="bg-mist">
        <Container className="flex flex-col gap-10 py-20">
          <Reveal className="flex max-w-3xl flex-col gap-4">
            <Eyebrow>{cat("eyebrow")}</Eyebrow>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-none text-navy sm:text-5xl">
              {t("categoriesTitle")}
            </h2>
            <p className="text-lg text-muted">{t("categoriesText", { count: CATALOG_CATEGORY_COUNT })}</p>
          </Reveal>
          <FamilyCards />
          <div>
            <Link href="/catalogue" className={btnOutline}>
              {cat("seeAll")} <Icon name="arrow" className="size-5" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand title={t("ctaTitle")} text={t("ctaText")} cta={common("sendList")} />
    </>
  );
}
