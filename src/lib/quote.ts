import { z } from "zod";

// Règles du formulaire de devis, partagées entre le navigateur et le serveur.
// Les "messages" sont des codes : le texte affiché vient de messages/*.json > quote.errors

export const SERVICE_OPTIONS = ["provisions", "catering", "logistics"] as const;

export const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 Mo
export const ALLOWED_EXTENSIONS = ["pdf", "xls", "xlsx", "csv", "doc", "docx", "txt"] as const;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "required").max(100, "tooLong"),
  company: z.string().trim().max(120, "tooLong"),
  email: z.email("email"),
  phone: z.string().trim().max(40, "tooLong"),
  vessel: z.string().trim().max(100, "tooLong"),
  // Numéro IMO : 7 chiffres (facultatif)
  imo: z.string().trim().regex(/^(\d{7})?$/, "imo"),
  port: z.string().trim().max(100, "tooLong"),
  eta: z.string().trim().regex(/^(\d{4}-\d{2}-\d{2})?$/, "date"),
  services: z.array(z.enum(SERVICE_OPTIONS)).min(1, "services"),
  message: z.string().trim().max(4000, "tooLong"),
  consent: z.literal(true, { error: "consent" }),
  // Champ piège invisible pour les robots : un humain ne le remplit jamais
  website: z.string().max(0),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export function fileExtension(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}
