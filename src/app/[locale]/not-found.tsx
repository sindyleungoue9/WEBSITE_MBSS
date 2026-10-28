import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { btnPrimary, Container } from "@/components/ui";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="bg-white">
      <Container className="flex flex-col items-start gap-5 py-28">
        <span className="font-display text-8xl font-extrabold text-brand">404</span>
        <h1 className="font-display text-5xl font-extrabold uppercase text-navy">{t("title")}</h1>
        <p className="text-lg text-muted">{t("text")}</p>
        <Link href="/" className={btnPrimary}>
          {t("cta")}
        </Link>
      </Container>
    </section>
  );
}
