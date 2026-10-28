import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirige "/" vers "/fr" (ou "/en" selon le navigateur du visiteur)
export default createMiddleware(routing);

export const config = {
  // Tout sauf l'API, les fichiers internes de Next et les fichiers statiques (images, sitemap...)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
