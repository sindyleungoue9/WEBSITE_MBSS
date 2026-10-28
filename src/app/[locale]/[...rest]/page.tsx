import { notFound } from "next/navigation";

// Toute adresse inconnue affiche la page "introuvable" (avec l'en-tête et le pied de page du site)
export default function CatchAll() {
  notFound();
}
