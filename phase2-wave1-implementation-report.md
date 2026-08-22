# Nutranexa PS SEO Phase 2.1 — Wave 1 Implementation Report

## Release scope

Implemented the approved English Wave 1 commercial optimization for six URLs. URL paths, redirects, canonical rules, robots directives, sitemap architecture, hreflang architecture, and locale routing were not changed by the source patch.

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
| `/resources/soy-vs-sunflower-phosphatidylserine/` | Soy vs Sunflower Phosphatidylserine \| Nutranexa | Soy vs Sunflower PS Sourcing Guide \| Nutranexa | Soy Phosphatidylserine vs Sunflower Phosphatidylserine | Soy vs Sunflower Phosphatidylserine: B2B Sourcing Guide | 498 | 939 |
| `/resources/choose-phosphatidylserine-supplier/` | How to Choose a PS Supplier \| Nutranexa | How to Choose a PS Supplier \| B2B Checklist | How to Choose a Phosphatidylserine Supplier | How to Choose a Phosphatidylserine Supplier: B2B Checklist | 493 | 903 |
| `/contact/` | Contact Nutranexa \| Request PS Ingredient Quote | Contact Nutranexa \| Request PS Ingredient Quote | Request a Quote or Product Documents | Request Specification & COA | 456 | 584 |

\* The PS 50% route is generated from the `psGrades` source model and was not present as a tracked static file in the origin checkout. The before value is the pre-change generated baseline from the same source model; the route already exists in production.

## First-party evidence handling

- Kept the existing PS 20% and PS 50% sample COA references batch-specific.
- Added explicit wording that source, grade, current specification, and batch COA must match the quoted product.
- Did not claim that soy PS 50% is available because the current soy-specific evidence does not establish that fact.
- Did not equate sunflower origin with allergen-free status.
- Used “available upon request” where certificate or market-specific document scope can vary.

## Internal linking

The source pages now link to the PS 50% grade, the opposite source page, the source-comparison guide, and the supplier qualification guide. The PS 50% page links back to both source pages and forward to the comparison and supplier guides. The two guides link back to the relevant product and technical-document paths.

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

The branch is ready for production review. Before deployment, confirm the exact GSC export, review the generated diff for the deployment system, and perform one real form-delivery smoke test in an approved test context.
