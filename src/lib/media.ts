import { existsSync } from "node:fs";
import path from "node:path";

// Photos de MBSS, dans public/images/mbss/. À utiliser dans des composants serveur uniquement.
// Pour ajouter une photo : copier le fichier dans public/images/mbss/ avec le nom indiqué ci-dessous,
// elle apparaît toute seule (relancer `npm run dev` si le site tourne déjà).
const DIR = "/images/mbss";

// Renvoie l'adresse de la photo si le fichier existe, sinon null
export function localPhoto(file: string): string | null {
  return existsSync(path.join(process.cwd(), "public", DIR, file)) ? `${DIR}/${file}` : null;
}

// Direction : noms et fonctions du site officiel (https://mbss-sarl.com/notre-equipe/).
// "role" correspond à messages > about.team.roles.<role>
export const TEAM = [
  { name: "Christine Demanga", role: "ceo", file: "team-christine-demanga.jpg" },
  { name: "Alexis Njumfo Nkuissi", role: "md", file: "team-alexis-njumfo-nkuissi.jpg" },
  { name: "John Tabi Bah", role: "td", file: "team-john-tabi-bah.jpg" },
  { name: "Ryann Le Boss", role: "pm", file: "team-ryann-le-boss.jpg" },
] as const;

// Photo de tout le personnel (page À propos, section "depuis 2011")
export const STAFF_PHOTO_FILE = "equipe-mbss.jpg";

// Une photo par étape de la page Workflows, dans l'ordre des étapes (STEPS)
export const WORKFLOW_PHOTOS = [
  `${DIR}/workflow-1-demande.jpg`,
  `${DIR}/workflow-2-verification.jpg`,
  `${DIR}/workflow-3-approvisionnement.jpg`,
  `${DIR}/workflow-4-livraison.jpg`,
] as const;
