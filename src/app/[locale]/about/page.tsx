import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE, VALUES } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { AfricaMap } from "@/components/AfricaMap";
import { localPhoto, STAFF_PHOTO_FILE, TEAM } from "@/lib/media";
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
  const staffPhoto = localPhoto(STAFF_PHOTO_FILE);

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
          {/* Photo de tout le personnel (public/images/mbss/equipe-mbss.jpg) */}
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[600px]">
            <div className="absolute inset-0 bottom-8 right-8 overflow-hidden bg-mist shadow-xl shadow-navy/20">
              {staffPhoto && (
                <Image src={staffPhoto} alt={t("photoMain")} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover object-top" />
              )}
            </div>
            <p className="absolute bottom-0 right-0 bg-brand px-5 py-4 text-white shadow-xl shadow-navy/30">
              <span className="block font-display text-4xl font-extrabold leading-none">{SITE.founded}</span>
              <span className="text-sm">{t("since")}</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Direction (public/images/mbss/team-*.jpg) */}
      <section className="bg-mist">
        <Container className="flex flex-col gap-10 py-20">
          <Reveal className="flex max-w-3xl flex-col gap-4">
            <Eyebrow>{t("team.eyebrow")}</Eyebrow>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-none text-navy sm:text-5xl">{t("team.title")}</h2>
          </Reveal>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {TEAM.map((m, i) => {
              const photo = localPhoto(m.file);
              return (
                <Reveal as="li" key={m.name} delay={i * 0.1} className="relative aspect-[3/4] overflow-hidden bg-navy shadow-lg shadow-navy/15">
                  {photo ? (
                    <Image src={photo} alt={m.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top" />
                  ) : (
                    <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display text-7xl font-extrabold text-white/25">
                      {m.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/95 to-transparent px-4 pb-4 pt-16 text-white">
                    <p className="font-display text-xl font-bold leading-tight sm:text-2xl">{m.name}</p>
                    <p className="text-sm text-[#C3CEE6]">{t(`team.roles.${m.role}`)}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Carte des pays d'action */}
      <section className="relative overflow-hidden bg-night text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 size-[32rem] rounded-full bg-brand/25 blur-3xl" />
        <Container className="relative flex flex-col gap-12 py-20 sm:py-24">
          <Reveal className="flex max-w-3xl flex-col gap-4">
            <Eyebrow light>{t("network.eyebrow")}</Eyebrow>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-none sm:text-6xl">{t("network.title")}</h2>
            <p className="text-lg leading-relaxed text-[#C3CEE6]">{t("network.text")}</p>
          </Reveal>
          <AfricaMap />
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
