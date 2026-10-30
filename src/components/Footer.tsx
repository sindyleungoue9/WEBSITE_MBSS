import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  const linkClass = "py-1 text-[#C3CEE6] transition-colors hover:text-white";

  return (
    <footer className="bg-night text-[15px] text-[#C3CEE6]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-8 pt-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit rounded-lg bg-white px-3 py-1.5">
            <Image src="/images/logo.jpg" alt={SITE.name} width={850} height={600} className="h-16 w-auto" />
          </span>
          <p>{t("about", { year: SITE.founded })}</p>
        </div>

        <div className="flex flex-col">
          <span className="mb-2 font-bold text-white">{t("menu")}</span>
          <Link href="/" className={linkClass}>
            {nav("home")}
          </Link>
          {NAV.map((item) => (
            <Link key={item.key} href={item.href} className={linkClass}>
              {nav(item.key)}
            </Link>
          ))}
          <Link href="/devis" className={linkClass}>
            {nav("quote")}
          </Link>
        </div>

        <div className="flex flex-col">
          <span className="mb-2 font-bold text-white">{t("contact")}</span>
          <a href={`tel:${SITE.phone}`} className={linkClass}>
            {SITE.phoneDisplay}
          </a>
          {SITE.email && (
            <a href={`mailto:${SITE.email}`} className={linkClass}>
              {SITE.email}
            </a>
          )}
          <address className="py-1 not-italic">
            {SITE.address.street}
            <br />
            {SITE.address.district}, {SITE.address.city}, {SITE.address.country}
          </address>
        </div>

        <div className="flex flex-col">
          <span className="mb-2 font-bold text-white">{t("follow")}</span>
          {SITE.social.linkedin && (
            <a href={SITE.social.linkedin} className={linkClass} rel="noopener">
              LinkedIn
            </a>
          )}
          {SITE.social.facebook && (
            <a href={SITE.social.facebook} className={linkClass} rel="noopener">
              Facebook
            </a>
          )}
          <Link href="/mentions-legales" className={linkClass}>
            {t("legal")}
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-white/10 px-4 py-6 text-sm sm:px-6">
        {t("rights", { year })}
      </div>
    </footer>
  );
}
