# EmergencyFundGuides — Next.js production site

Production-grade Next.js (App Router, TypeScript) port of the EmergencyFundGuides marketing site.

## What's inside

- **App Router** with server components by default; client components only where interactivity is required (Header menu, Calculator, Situations preselect bridge).
- **TypeScript strict** mode end-to-end.
- **next/font** for self-hosted Plus Jakarta Sans / Instrument Serif / JetBrains Mono — no render-blocking Google Fonts CSS.
- **Article system** (`src/data/articles.tsx`) — typed content blocks, FAQ, JSON-LD, related articles. Add a new guide by appending one entry.
- **SEO** — per-route `generateMetadata`, OpenGraph + Twitter cards, canonical URLs, three flavors of JSON-LD (`WebApplication` + `Organization` + `FAQPage` site-wide; `Article` + `FAQPage` + `BreadcrumbList` per guide), `sitemap.xml`, `robots.txt`, `llms.txt`.
- **Static-first** — every route is statically renderable. The lead-form POST is the only side effect; wire it up in `src/components/Calculator.tsx → submitLead`.

## Routes

| Path | Description |
|---|---|
| `/` | Marketing homepage |
| `/resources` | Index of all guides |
| `/resources/[slug]` | Individual guide page (statically generated for every article) |
| `/about`, `/privacy`, `/terms`, `/contact`, `/disclosure` | Static legal/info pages |
| `/sitemap.xml` | Generated sitemap |
| `/robots.txt` | Generated robots policy |
| `/llms.txt` | Plain-text site map for LLM crawlers |

## Run locally

```bash
cd next-app
npm install
npm run dev
# open http://localhost:3000
```

## Build for production

```bash
npm run build
npm run start
```

## Configure deployment URL

Set the canonical site URL via `NEXT_PUBLIC_SITE_URL`:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://emergencyfundguides.com
```

This propagates to OpenGraph URLs, JSON-LD, sitemap entries, and `llms.txt`. If unset it falls back to `https://emergencyfundguides.com` (see `src/lib/site.ts`).

## Project structure

```
next-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout, fonts, JSON-LD, header/footer
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Single global stylesheet (ported verbatim + additions)
│   │   ├── resources/
│   │   │   ├── page.tsx          # /resources index
│   │   │   └── [slug]/page.tsx   # Per-guide page (generateStaticParams)
│   │   ├── about/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── disclosure/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── llms.txt/route.ts
│   ├── components/
│   │   ├── Header.tsx            # Client — sticky nav, mobile menu, smooth scroll
│   │   ├── Hero.tsx              # Server
│   │   ├── Situations.tsx        # Client — emits efg:preselect → Calculator
│   │   ├── Stats.tsx             # Server
│   │   ├── HowItWorks.tsx        # Server
│   │   ├── Calculator.tsx        # Client — 8-step quiz + lead form (incl. optional comment)
│   │   ├── ArticlesSection.tsx   # Server
│   │   ├── CtaBanner.tsx         # Server
│   │   ├── Footer.tsx            # Server
│   │   └── icons.tsx             # SVG icon library (server-renderable)
│   ├── data/
│   │   └── articles.tsx          # All guide content + types
│   └── lib/
│       ├── calcData.tsx          # Quiz options, scoring, ranked-option builder
│       └── site.ts               # Canonical URL + brand config
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Adding a new guide

1. Open `src/data/articles.tsx`.
2. Append an entry to the `articles` array with a unique `slug`.
3. Author the body using typed `ContentBlock`s (`p`, `h2`, `h3`, `ul`, `ol`, `callout`, `quote`).
4. Add at least 3 FAQ items — they feed the on-page FAQ block and the `FAQPage` JSON-LD.
5. (Optional) Provide `cardArt` / `cardBg` SVG for the homepage card.
6. (Optional) List `related` slugs for the in-article "Keep reading" section.

Sitemap, JSON-LD, and the homepage card grid pick up the new article automatically on next build.

## Wiring the lead form

`src/components/Calculator.tsx → submitLead` is where the POST to your backend belongs. The full payload — quiz answers, lead score, plus the optional comment field — is already shaped in scope:

```ts
// inside submitLead()
const payload = {
  ...answers,
  firstName, email, phone, comment,
  score: scoreLeadTotal(answers),
};
await fetch('/api/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
```

The project now includes `src/app/api/submit/route.ts` for Vercel deployments.

- It can store leads in **MongoDB** when `MONGODB_URI` is present.
- It can send lead notifications via **Resend** when `RESEND_API_KEY` and `LEAD_NOTIFY_EMAIL` are present.

Set these env vars in Vercel Project Settings:

```bash
RESEND_API_KEY=...
LEAD_NOTIFY_EMAIL=you@example.com
LEAD_FROM_EMAIL="EmergencyFundGuides <onboarding@resend.dev>"

MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
MONGODB_DB=emergencyfundguides
MONGODB_COLLECTION=leads
```

## Notes from the port

- The original prototype was a single static HTML file; component boundaries here mirror its semantic sections.
- All hard-coded font URLs were removed; `next/font` injects the same families via CSS variables (`--font-sans`, `--font-serif`, `--font-mono`) which `globals.css` consumes.
- The `Situations` cards (above the quiz) emit a `CustomEvent('efg:preselect', { detail: { type } })` that the `Calculator` listens for, so the homepage can stay server-rendered above the quiz.
- Dates in articles use `YYYY-MM-DD` and are formatted in UTC at render time so SSR and CSR output match exactly.
