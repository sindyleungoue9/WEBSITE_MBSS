"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV, SITE } from "@/lib/site";
import { Icon } from "./Icon";

// Menu en haut sur ordinateur, tiroir latéral sur mobile
export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const otherLocale = locale === "fr" ? "en" : "fr";

  // L'en-tête se réduit et prend de l'ombre dès qu'on descend dans la page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le tiroir à chaque changement de page
  useEffect(() => setOpen(false), [pathname]);

  // Touche Échap pour fermer + page figée derrière le tiroir
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      className={`sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-navy/10" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-[padding] duration-300 sm:px-6 ${
          scrolled ? "py-1" : "py-3"
        }`}
      >
        <Link href="/" aria-label={`${SITE.name} – ${t("home")}`} className="flex shrink-0 items-center">
          <Image src="/images/logo.jpg" alt={SITE.name} width={850} height={600} priority
            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-11 sm:h-12" : "h-14 sm:h-16"}`}
          />
        </Link>

        <nav aria-label={t("main")} className="hidden items-center gap-8 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`border-b-2 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:text-brand ${
                isActive(item.href) ? "border-brand text-brand" : "border-transparent text-navy"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={pathname}
            locale={otherLocale}
            hrefLang={otherLocale}
            aria-label={`${t("language")} : ${otherLocale.toUpperCase()}`}
            className="hidden px-2 py-2 text-sm font-bold uppercase text-muted hover:text-brand sm:block"
          >
            {otherLocale}
          </Link>
          <Link
            href="/devis"
            className="hidden items-center bg-leaf-dark px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-navy xl:inline-flex"
          >
            {t("quote")}
          </Link>
          <button
            type="button"
            aria-label={t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="flex size-12 items-center justify-center border border-line text-navy xl:hidden"
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
    </header>

    {/* Le tiroir est placé HORS de l'en-tête : le flou de l'en-tête enfermerait sinon sa position "fixed" */}
    {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-night/60" onClick={() => setOpen(false)}>
          <nav
            id="mobile-menu"
            aria-label={t("mobile")}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-[84%] max-w-sm flex-col gap-1 overflow-y-auto bg-night p-6 text-white"
          >
            <button
              type="button"
              aria-label={t("closeMenu")}
              onClick={() => setOpen(false)}
              className="mb-2 flex size-12 items-center justify-center self-end border border-white/30"
            >
              <Icon name="close" />
            </button>
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="border-b border-white/10 py-3 font-display text-3xl font-bold uppercase"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/devis"
              className="mt-5 bg-leaf-dark px-4 py-4 text-center font-bold uppercase tracking-[0.08em]"
            >
              {t("quote")}
            </Link>
            <div className="mt-auto flex flex-col gap-2 pt-8 text-[#C3CEE6]">
              <a href={`tel:${SITE.phone}`} className="font-semibold text-white">
                {SITE.phoneDisplay}
              </a>
              <div className="flex gap-3 font-bold">
                <span className="text-white">{locale.toUpperCase()}</span>
                <span aria-hidden="true">|</span>
                <Link href={pathname} locale={otherLocale} hrefLang={otherLocale} className="text-[#8EA3D1]">
                  {otherLocale.toUpperCase()}
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
