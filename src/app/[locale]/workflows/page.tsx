import { getTranslations, setRequestLocale } from "next-intl/server";
import { STEPS } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Container, CtaBand, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.workflows" });
  return pageMetadata({ locale, path: "/workflows", title: t("title"), description: t("description") });
}

export default async function WorkflowsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const p = await getTranslations("process");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={nav("workflows")} title={p("pageTitle")} intro={p("pageIntro")} />

      <section className="bg-white">
        <Container className="py-20">
          <ol className="flex flex-col">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.key} className="grid gap-4 border-t border-line py-10 md:grid-cols-[200px_1fr] md:gap-10">
                <div className="flex items-center gap-4 font-display text-xl font-bold tracking-[0.1em] text-brand">
                  <span className="flex size-14 items-center justify-center bg-[#E8EEFF]">
                    <Icon name={s.icon} className="size-7" />
                  </span>
                  {p("step").toUpperCase()} {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-4xl font-bold uppercase text-navy">{p(`${s.key}.title`)}</h2>
                  <p className="max-w-2xl text-lg leading-relaxed text-muted">{p(`${s.key}.text`)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand title={p("ctaTitle")} text={p("ctaText")} cta={nav("quote")} />
    </>
  );
}
