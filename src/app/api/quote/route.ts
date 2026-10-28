import { Resend } from "resend";
import { ALLOWED_EXTENSIONS, MAX_FILE_BYTES, fileExtension, quoteSchema } from "@/lib/quote";

export const runtime = "nodejs";

// --- Limite simple : 5 demandes par adresse IP et par 10 minutes (suffisant pour un site vitrine) ---
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

// Vérifie le jeton Cloudflare Turnstile (seulement si la clé secrète est configurée)
async function turnstileOk(token: string | null, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}

// Évite d'injecter du HTML dans l'e-mail
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) return Response.json({ error: "rate" }, { status: 429 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "bad-request" }, { status: 400 });
  }

  // 1. Données du formulaire, revalidées côté serveur (on ne fait jamais confiance au navigateur)
  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("data") ?? ""));
  } catch {
    return Response.json({ error: "bad-request" }, { status: 400 });
  }

  // Robot détecté (champ piège rempli) : on répond "ok" sans rien envoyer
  if (typeof raw === "object" && raw && "website" in raw && (raw as { website?: string }).website) {
    return Response.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) return Response.json({ error: "invalid" }, { status: 422 });
  const q = parsed.data;

  // 2. Anti-spam Turnstile (si activé)
  if (!(await turnstileOk(form.get("turnstile") as string | null, ip))) {
    return Response.json({ error: "captcha" }, { status: 400 });
  }

  // 3. Fichier joint : taille et type contrôlés
  const upload = form.get("file");
  let attachment: { filename: string; content: Buffer } | undefined;
  if (upload instanceof File && upload.size > 0) {
    if (upload.size > MAX_FILE_BYTES || !(ALLOWED_EXTENSIONS as readonly string[]).includes(fileExtension(upload.name))) {
      return Response.json({ error: "file" }, { status: 422 });
    }
    // Nom de fichier nettoyé
    const safeName = upload.name.replace(/[^\w.\- ]/g, "_").slice(0, 120);
    attachment = { filename: safeName, content: Buffer.from(await upload.arrayBuffer()) };
  }

  // 4. Construction de l'e-mail
  const rows: [string, string][] = [
    ["Nom", q.name],
    ["Société", q.company],
    ["E-mail", q.email],
    ["Téléphone", q.phone],
    ["Navire", q.vessel],
    ["IMO", q.imo],
    ["Port", q.port],
    ["ETA", q.eta],
    ["Prestations", q.services.join(", ")],
    ["Message", q.message],
    ["Fichier joint", attachment?.filename ?? "aucun"],
  ];
  const text = rows.map(([k, v]) => `${k} : ${v || "-"}`).join("\n");
  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #dce3f0;background:#f3f6fc"><b>${esc(k)}</b></td><td style="border:1px solid #dce3f0;white-space:pre-wrap">${esc(v || "-")}</td></tr>`,
    )
    .join("")}</table>`;
  const subject = `Demande de devis – ${q.vessel || q.name}${q.port ? ` (${q.port})` : ""}`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL ?? "MBSS Devis <onboarding@resend.dev>";

  // En développement sans clé : on affiche la demande dans le terminal au lieu de l'envoyer
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`\n[devis – non envoyé, clés absentes]\n${subject}\n${text}\n`);
      return Response.json({ ok: true, dev: true });
    }
    console.error("RESEND_API_KEY ou QUOTE_TO_EMAIL manquant");
    return Response.json({ error: "server" }, { status: 500 });
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    replyTo: q.email,
    subject,
    text,
    html,
    attachments: attachment ? [attachment] : undefined,
  });
  if (error) {
    console.error("Resend :", error);
    return Response.json({ error: "server" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
