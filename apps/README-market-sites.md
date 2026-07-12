# Nutranexa PS Korea and Turkey Independent Sites

This folder contains two independent B2B market sites generated from the Nutranexa PS source material.

## Sites

- `kr-site`: Korean independent site for Korean supplement, functional food, OEM/ODM, importer, and distributor buyers.
- `tr-site`: Turkish independent site for Turkey supplement manufacturers, importers, distributors, and regional trade buyers.

These are not `/ko` or `/tr` subfolders of the English site. Each site is designed to be deployed separately with its own domain, canonical URLs, sitemap, robots.txt, analytics, and search-console setup.

## Build

From the repository root:

```bash
node tools/build_market_sites.mjs
```

Build only one site:

```bash
node tools/build_market_sites.mjs kr-site
node tools/build_market_sites.mjs tr-site
```

Output folders:

- `apps/kr-site/dist`
- `apps/tr-site/dist`

## Deployment

Deploy each folder as a separate Vercel project:

- Project root: `apps/kr-site`
- Output directory: `dist`
- Build command: `npm run build`

And:

- Project root: `apps/tr-site`
- Output directory: `dist`
- Build command: `npm run build`

## Domain And SEO

Before production deployment, replace `NEXT_PUBLIC_SITE_URL` in each site's environment variables:

- `apps/kr-site/.env.example`
- `apps/tr-site/.env.example`

Canonical URLs and sitemap locations are generated from `NEXT_PUBLIC_SITE_URL`. Do not point these domains to `nutranexaps.com`.

## Needed From Client

- Final Korean domain.
- Final Turkish domain.
- Korean KakaoTalk ID, if available.
- Dedicated GA4 / GTM IDs for each site.
- Naver Search Advisor verification code for the Korean site.
- Google Search Console verification codes for both sites.
- Whether PS 70% and PS 80% are actually available for export.
- Current lead time ranges for sample and bulk orders.
- Supported Incoterms and payment methods.
- Confirmed SDS/TDS/GMO/allergen statement availability per product.
