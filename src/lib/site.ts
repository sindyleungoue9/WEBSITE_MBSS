// Toutes les informations de l'entreprise au même endroit.
// Pour changer un numéro, une adresse ou ajouter un port : c'est ICI.

export const SITE = {
  name: "MBSS SARL",
  legalName: "Marini & Brice Shipschandler Supplier",
  tagline: "Ship's Solutions",
  founded: 2011,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mbss-sarl.com",

  phone: "+237233412743",
  phoneDisplay: "+237 2 33 41 27 43",
  whatsapp: "237679693805",
  whatsappDisplay: "+237 679 693 805",
  // Une seule adresse e-mail pro : définie dans .env.local (vide = non affichée)
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",

  address: {
    street: "553, rue Charley Eyoum Ebele",
    district: "Deido",
    city: "Douala",
    country: "Cameroun",
    countryCode: "CM",
  },

  // Ports desservis. Ajouter "Kribi" ou "Limbé" ici SEULEMENT une fois confirmés par l'entreprise.
  ports: ["Douala"],

  // Informations légales (mentions légales) : affichées seulement si renseignées dans .env.local
  legal: {
    rccm: process.env.NEXT_PUBLIC_LEGAL_RCCM ?? "",
    niu: process.env.NEXT_PUBLIC_LEGAL_NIU ?? "",
  },

  // Réseaux sociaux : renseigner l'adresse complète pour afficher le lien dans le pied de page
  social: {
    linkedin: "",
    facebook: "",
  },
} as const;

// Années d'expérience calculées automatiquement à partir de la fondation
export function yearsOfExperience(now = new Date()) {
  return now.getFullYear() - SITE.founded;
}

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}`;

// Menu principal : "key" correspond à messages/*.json > nav
export const NAV = [
  { key: "solutions", href: "/solutions" },
  { key: "catalogue", href: "/catalogue" },
  { key: "news", href: "/news" },
  { key: "about", href: "/about" },
  { key: "workflows", href: "/workflows" },
  { key: "contact", href: "/contact" },
] as const;

// Les 3 services : "icon" voir components/Icon.tsx, textes dans messages > services.<key>
// (le reste du catalogue IMPA est présenté dans la page Catalogue)
export const SERVICES = [
  { slug: "provisions", key: "provisions", icon: "leaf" },
  { slug: "catering", key: "catering", icon: "utensils" },
  { slug: "logistics", key: "logistics", icon: "truck" },
] as const;

// Catalogue : les 36 catégories du catalogue IMPA (https://impa.services), regroupées en 8 familles.
// L'entreprise peut fournir tout le catalogue : le but est de le montrer au visiteur.
// "onRequest" = affiché "sur demande" (produits qui demandent souvent une autorisation particulière).
// Les noms sont dans messages > catalog.families.<key> et catalog.categories.<key>
export const CATALOG_FAMILIES = [
  {
    key: "foodWelfare",
    icon: "leaf",
    categories: [
      { key: "provisions" },
      { key: "whiskyCigarettes", onRequest: true },
      { key: "welfare" },
      { key: "medicine", onRequest: true },
    ],
  },
  {
    key: "linenGalley",
    icon: "utensils",
    categories: [
      { key: "clothLinen" },
      { key: "tableware" },
      { key: "clothing" },
      { key: "lavatory" },
      { key: "brushesMats" },
      { key: "stationery" },
    ],
  },
  {
    key: "deckMooring",
    icon: "anchor",
    categories: [{ key: "rope" }, { key: "rigging" }, { key: "nautical" }],
  },
  {
    key: "paintCleaning",
    icon: "droplet",
    categories: [{ key: "marinePaint" }, { key: "paintingEquipment" }, { key: "cleaning" }],
  },
  {
    key: "safety",
    icon: "lifebuoy",
    categories: [{ key: "safetyGear" }, { key: "safetyEquipment" }],
  },
  {
    key: "tools",
    icon: "tools",
    categories: [
      { key: "pneumaticElectricalTools" },
      { key: "handTools" },
      { key: "cuttingTools" },
      { key: "measuringTools" },
      { key: "welding" },
      { key: "fishingTools" },
    ],
  },
  {
    key: "pipingHardware",
    icon: "wrench",
    categories: [
      { key: "hose" },
      { key: "pipes" },
      { key: "pipeFittings" },
      { key: "valves" },
      { key: "hardware" },
      { key: "screwsNuts" },
      { key: "metalSheets" },
    ],
  },
  {
    key: "machineryElectrical",
    icon: "zap",
    categories: [
      { key: "machinery" },
      { key: "bearings" },
      { key: "packing" },
      { key: "electrical" },
      { key: "petroleum" },
    ],
  },
] as const;

// Nombre total de catégories, calculé automatiquement (36 aujourd'hui)
export const CATALOG_CATEGORY_COUNT = CATALOG_FAMILIES.reduce((n, f) => n + f.categories.length, 0);

export const BENEFITS = [
  { key: "quality", icon: "shield" },
  { key: "reactivity", icon: "clock" },
  { key: "trust", icon: "award" },
  { key: "expertise", icon: "globe" },
] as const;

export const STEPS = [
  { key: "request", icon: "chat" },
  { key: "check", icon: "check" },
  { key: "sourcing", icon: "package" },
  { key: "delivery", icon: "truck" },
] as const;

export const VALUES = [
  { key: "quality", icon: "shield" },
  { key: "reliability", icon: "check" },
  { key: "proximity", icon: "pin" },
  { key: "commitment", icon: "award" },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
