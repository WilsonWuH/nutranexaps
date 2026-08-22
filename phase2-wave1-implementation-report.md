# Nutranexa PS SEO Phase 2.1 — Wave 1 Implementation Report

## Release scope

Implemented the approved English Wave 1 commercial optimization for six URLs. URL paths, redirects, canonical rules, robots directives, sitemap architecture, hreflang architecture, and locale routing were not changed by the source patch. The post-review content pass also closes the requested comparison matrix, supplier checklist, PS 50% decision guide, source-specific buyer review, and contact-page request-language gaps.

The implementation was made in the `codex/phase2-wave1` branch created from `origin/main` on 2026-08-22. The current production deployment was not changed by this task.

## Pages changed

| URL | Primary change | Result |
|---|---|---|
| `/products/sunflower-phosphatidylserine/` | Source-specific 20% / 50% positioning, COA context, allergen caveat, grade and comparison links | Ready |
| `/products/soy-phosphatidylserine/` | Source-specific bulk sourcing language, controlled-specification caveats, allergen-document guidance, grade and comparison links | Ready |
| `/products/phosphatidylserine-50/` | Grade-specific positioning, controlled-document language, source/comparison/supplier links | Ready |
| `/resources/soy-vs-sunflower-phosphatidylserine/` | B2B sourcing guide, decision matrix, document checklist, product links | Ready |
| `/resources/choose-phosphatidylserine-supplier/` | Supplier qualification checklist, scoring logic, evidence-request table | Ready |
| `/contact/` | Optional Request Type field added to the existing inquiry form | Ready |

## Metadata and content delta

| URL | Old title | New title | Old H1 | New H1 | Words before | Words after |
|---|---|---|---|---|---:|---:|
| `/products/sunflower-phosphatidylserine/` | Sunflower Phosphatidylserine Supplier \| Nutranexa | Sunflower Phosphatidylserine \| 20% & 50% Supplier | Sunflower Phosphatidylserine Supplier for Non-Soy Nutrition Formulas | Sunflower Phosphatidylserine Supplier \| 20% & 50% | 1153 | 1365 |
| `/products/soy-phosphatidylserine/` | Soy Phosphatidylserine Supplier \| Nutranexa | Soy Phosphatidylserine Supplier \| Bulk Source & Specs | Soy Phosphatidylserine Supplier for Bulk Supplement Ingredients | Soy Phosphatidylserine Supplier for Bulk Source Review | 1108 | 1285 |
| `/products/phosphatidylserine-50/` | Phosphatidylserine 50% Ingredient \| Nutranexa | Phosphatidylserine 50% Ingredient \| Nutranexa | Phosphatidylserine 50% Powder | Phosphatidylserine 50% Powder | 904* | 918 |
| `/resources/soy-vs-sunflower-phosphatidylserine/` | Soy vs Sunflower Phosphatidylserine \| Nutranexa | Soy vs Sunflower PS Sourcing Guide \| Nutranexa | Soy Phosphatidylserine vs Sunflower Phosphatidylserine | Soy vs Sunflower Phosphatidylserine: B2B Sourcing Guide | 498 | Expanded: 13-row decision matrix and dedicated decision sections |
| `/resources/choose-phosphatidylserine-supplier/` | How to Choose a PS Supplier \| Nutranexa | How to Choose a PS Supplier \| B2B Checklist | How to Choose a Phosphatidylserine Supplier | How to Choose a Phosphatidylserine Supplier: B2B Checklist | 493 | Expanded: 15 numbered qualification checks and scoring guidance |
| `/contact/` | Contact Nutranexa \| Request PS Ingredient Quote | Contact Nutranexa \| Request PS Ingredient Quote | Request a Quote or Product Documents | Request Specification & COA | 456 | Expanded: quote, sample, COA, MOQ, lead-time, and packaging request language |

\* The PS 50% route is generated from the `psGrades` source model and was not present as a tracked static file in the origin checkout. The before value is the pre-change generated baseline from the same source model; the route already exists in production.

The table preserves the first implementation delta for traceability. The post-review content pass further expanded the six generated pages; the current rendered pages are approximately 1,700 words (sunflower), 1,600 (soy), 1,370 (PS 50%), 1,400 (comparison), 1,230 (supplier guide), and 690 (contact), including shared page chrome.

## First-party evidence handling

- Kept the existing PS 20% and PS 50% sample COA references batch-specific.
- Added explicit wording that source, grade, current specification, and batch COA must match the quoted product.
- Did not claim that soy PS 50% is available because the current soy-specific evidence does not establish that fact.
- Did not equate sunflower origin with allergen-free status.
- Used “available upon request” where certificate or market-specific document scope can vary.

## Internal linking

The source pages now link to the PS 50% grade, the opposite source page, the source-comparison guide, and the supplier qualification guide. The PS 50% page links back to both source pages and forward to the comparison and supplier guides. The two guides link back to the relevant product and technical-document paths.

The comparison page now explicitly links to the soy product, sunflower product, PS 50% grade, PS powder specifications, Quality & R&D, supplier qualification guide, and contact workflow. The supplier guide now links to product, specification, Quality & R&D, and contact paths.

Query ownership is now treated as:

- General PS page: manufacturer, bulk PS, and broad commercial category intent.
- Soy / sunflower pages: source-specific procurement intent.
- PS 50% page: grade and concentration intent.
- Comparison guide: soy-vs-sunflower decision intent.
- Supplier guide: qualification and due-diligence intent.
- Contact page: conversion and document-request intent.

## CTA and form changes

- Product and grade pages retain specification, COA, sample, and quotation paths.
- Contact now exposes an optional Request Type selector: Quote, Sample, Specification, COA, Technical Support, Distributor Inquiry, or Other.
- Required fields remain limited to the existing name, business email, company, country, and consent requirements.
- Existing client-side lead event behavior was preserved.

## Quality and regression checks

- `node --check tools/build_site.mjs`: passed.
- `npm run generate`: passed; 228 English routes and 1,824 localized pages generated.
- `npm run build`: passed; Next.js compilation, TypeScript, static generation, and optimization completed.
- All six pages: one H1, `index,follow`, self-canonical, sitemap inclusion, and nine alternate-language links.
- Internal route links in all six pages: no broken route hrefs detected.
- Desktop 1440px and mobile 390px render checks: no horizontal overflow, no page errors, and forms remained usable.
- No production deployment or mass indexing request was performed.

Post-review content checks:

- Comparison matrix covers all 13 requested buyer dimensions: source, grades, allergen, non-soy positioning, vegetarian suitability, Halal/Kosher documentation, powder characteristics, application considerations, specification differences, commercial availability, MOQ, documentation requirements, and buyer suitability.
- Supplier checklist covers all 15 requested qualification areas, each with a buyer question, evidence to record, and Pass/Hold/Follow-up decision.
- PS 50% page now separates concentration from source, states how to request the assay/test basis, compares 20%/50%/70% routes conservatively, and avoids source-page duplication.
- Sunflower and soy product pages now separate source, grade, allergen documentation, representative specification, and batch evidence.
- Contact first-screen copy now names factory quote, current specification, batch COA, TDS, sample, MOQ, lead time, packaging, source, and concentration requests.

## Potential claim risks

| Risk | Control |
|---|---|
| Soy 50% availability could be overstated | No soy-specific 50% availability claim was added. |
| Sunflower could be read as allergen-free | Explicit source-specific allergen-document caveat added. |
| Sample COA could be read as a permanent guarantee | Batch-specific and current-COA language retained. |
| Certification scope could be generalized | Certificate availability is framed as product/market dependent. |
| Supplier guide could compete for the broad supplier head term | Copy is centered on selection, qualification, and due diligence. |

## Measurement baseline

Use the supplied GSC baseline as the pre-release reference and record the exact export window, country, device, clicks, and deployment timestamp before production release:

| URL | Primary query | Baseline position | Impressions | CTR |
|---|---|---:|---:|---:|
| `/products/sunflower-phosphatidylserine/` | ps 50% from sunflower | 16.17 | 78 | 0% |
| `/products/soy-phosphatidylserine/` | 50 percent soybean phosphatidylserine | 14.02 | 41 | 0% |
| `/resources/soy-vs-sunflower-phosphatidylserine/` | phosphatidylserine sunflower vs soy | 14.96 | 26 | 0% |
| `/products/phosphatidylserine-50/` | phosphatidylserine 50% | 15.50 | — | — |
| `/resources/choose-phosphatidylserine-supplier/` | phosphatidylserine supplier | 21.25 | 20 | 0% |
| `/contact/` | phosphatidylserine factory quote | 18.00 | — | 0% |

Review at day 14 for diagnostics, day 28 for an early decision, and day 56 for the main comparison. Do not rewrite based on only a few days of ranking volatility.

## Deployment gate

The mandatory before/after audit is recorded in [`phase2-wave1-pre-edit-audit.md`](phase2-wave1-pre-edit-audit.md). Static HTML rewrites were compressed to section-level rules in `next.config.mjs` after Vercel rejected the previous 2,083-route configuration; URL behavior and generated page architecture were preserved.

## Production deployment

- Deployment target: `wilson-s-projects88/nutranexaps`
- Commit: `d26a27a` (`Compress static rewrites for Vercel route limit`), including the Wave 1 content commits `e3a3304` and `1f8a95f`
- Deployment ID: `dpl_FPKv9of72kum9Mk9Cn2j6gtMVEpC`
- Deployment URL: https://nutranexaps-e1bt50w77-wilson-s-projects88.vercel.app
- Production aliases: https://nutranexaps.com, https://www.nutranexaps.com, https://nutranexaps.vercel.app
- Deployed at: 2026-08-22 22:34 China Standard Time
- Remote build: passed; Next.js 16.2.9, TypeScript, static generation, and optimization completed
- Post-deployment check: all six Wave 1 URLs returned HTTP 200 with the intended title/H1, self-canonical, `index,follow`, and nine hreflang links; no horizontal-overflow or browser-error regression was observed in the local production build check.
- Vercel error scan: no logs found for the deployment in the first hour after release.

Remaining measurement work is operational rather than a release blocker: record the exact GSC export window/country/device/clicks, run one approved real form-delivery smoke test, and begin the 14/28/56-day query-to-URL review.
