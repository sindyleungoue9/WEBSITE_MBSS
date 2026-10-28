import { useTranslations } from "next-intl";
import { WHATSAPP_URL } from "@/lib/site";

// Bouton flottant toujours visible, en bas à droite
export function WhatsAppButton() {
  const t = useTranslations("common");
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className="fixed bottom-5 right-4 z-30 flex size-14 items-center justify-center rounded-full bg-leaf-dark text-white shadow-xl shadow-navy/30 transition-transform hover:scale-105 sm:right-6"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 7 3.86Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.71-1.32.08-.16.04-.3-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.23 3.74 1.57.68 2.18.74 2.96.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.23-.16-.47-.28Z" />
      </svg>
    </a>
  );
}
