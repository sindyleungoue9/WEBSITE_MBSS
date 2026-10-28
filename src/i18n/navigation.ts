import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Liens et redirections qui gardent automatiquement la langue courante
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
