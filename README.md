# Site vitrine MBSS SARL

Site bilingue (français / anglais) de MBSS SARL, ship chandler à Douala.

**Technologies :** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · next-intl · React Hook Form + Zod · Resend.

## Lancer le site sur votre ordinateur

```bash
npm install
npm run dev
```

Puis ouvrez http://localhost:3000 (le site redirige vers `/fr`).

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Téléphone, adresse, WhatsApp, ports, année de fondation | `src/lib/site.ts` |
| Tous les textes (français) | `messages/fr.json` |
| Tous les textes (anglais) | `messages/en.json` |
| Couleurs et polices | `src/app/globals.css` |
| Le logo | `public/images/logo.jpg` |
| Les services et catégories (liste) | `src/lib/site.ts` (+ leurs textes dans `messages/`) |

## Le formulaire de devis

1. Copiez `.env.example` en `.env.local` et remplissez les valeurs.
2. Créez un compte sur https://resend.com, vérifiez le domaine `mbss-sarl.com`, copiez la clé dans `RESEND_API_KEY`.
3. `QUOTE_TO_EMAIL` = l'adresse qui reçoit les demandes.

Sans clé, en développement, la demande s'affiche simplement dans le terminal (rien n'est envoyé).

## Avant la mise en ligne : informations à fournir

- [ ] E-mail professionnel unique (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] RCCM et NIU (`NEXT_PUBLIC_LEGAL_RCCM`, `NEXT_PUBLIC_LEGAL_NIU`)
- [ ] Ports desservis à confirmer (Kribi, Limbé) : `ports` dans `src/lib/site.ts`
- [ ] Nombre de navires servis, clients, certifications (à ajouter seulement s'ils sont exacts)
- [ ] Vraies photos (navire, équipe, livraisons) pour remplacer l'illustration
- [ ] Liens LinkedIn / Facebook : `social` dans `src/lib/site.ts`
- [ ] Première actualité (la page News est masquée de Google tant qu'elle est vide)

## Mise en ligne (Vercel)

1. Poussez le code sur GitHub.
2. Sur https://vercel.com, importez le dépôt.
3. Ajoutez les variables de `.env.example` dans *Settings → Environment Variables*.
4. Branchez le domaine `mbss-sarl.com`.
5. Après la mise en ligne, déclarez `https://mbss-sarl.com/sitemap.xml` dans Google Search Console.
