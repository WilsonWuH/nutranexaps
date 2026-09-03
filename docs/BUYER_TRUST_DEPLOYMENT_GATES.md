# Buyer Trust Deployment Gates

This document records completed approvals and the operational configuration that still remains outside the static website implementation.

## Required before production release

- **Enterprise email and delivery:** Open the approved company-domain mailbox(es), test inbound and outbound delivery, and configure SPF, DKIM, and DMARC. Update the form delivery destination only after the owner supplies and approves the real recipient. The existing `/api/inquiry` route and current recipient remain unchanged by this implementation.
- **Analytics account IDs:** Add the approved GTM or GA4 ID and optional Clarity ID to Vercel, then verify receipt in GTM Preview/GA4 DebugView/Clarity. The loader, format validation, direct-GA4 event bridge, and CSP allow-list are implemented; IDs are intentionally blank until supplied.
- **FDA record renewal:** The supplied private registrar record shows expiration on Dec 31, 2026. Replace it with current facility-controlled evidence before that date. FDA does not issue or endorse third-party registration certificates. The supplied image uses an FDA logo, so it is retained for controlled buyer review and removed from the public document gallery and homepage claims.

## Owner approvals recorded on 2026-09-03

- **English company name:** The owner confirmed Nutranexa as the company's new English name. Public copy uses `Shandong Nutranexa Biopharmaceutical Co., Ltd.` as the full English form shown on supplied English-language certificates and `Nutranexa` as the short form. The Chinese legal name remains exactly as shown on the business licence. Organization Schema intentionally avoids `legalName` but may use the approved English name plus the Nutranexa alternate name.
- **Asset publication authorization:** The owner confirmed that the website's factory, laboratory, packaging, shipment, team, certificate, COA, and video materials are authorized for publication.
- **Document review:** The displayed licence/certificate copies were reviewed on Sep 3, 2026. Dated copies are currently in date: production licence and item details through Dec 9, 2030; private food-facility registration record through Dec 31, 2026; Kosher through May 31, 2027; Halal through Dec 26, 2027. The business licence copy has no fixed expiry printed. COAs remain labelled representative/historical. See `config/trust/documents.mjs`.

## Implemented in source

- `config/trust/company.mjs` is the reusable source for approved English naming, the Chinese licence name, public facts, and verification links.
- `config/trust/documents.mjs` records document scope, displayed dates, review status, and authorization date. `npm run trust:verify` fails on missing files or expired dated documents and warns 120 days before renewal.
- `/company-verification/` is generated in English only until human translations are approved. Non-English artifacts and hreflang targets are not generated for this route.
- Qualification Pack CTAs use `/contact/?request=qualification-pack` and preserve the existing inquiry endpoint and required-field model.
- Form options include qualification-pack routing, volume ranges, Halal, Kosher, GMO, SDS, and related document requests without exposing a new mailbox.
- Analytics events are emitted through the existing `dataLayer` architecture without visitor name, email, phone, message, or other PII. GTM, direct GA4, and Clarity loaders activate only with validated environment IDs; see `docs/ANALYTICS_CONFIGURATION.md`.
- The event set is `verification_view` (verification-page load), `verification_click` (homepage entry), `verification_source_click`, `qualification_pack_click`, `qualification_form_start`, `qualification_form_submit`, `qualification_form_error`, `document_preview`, `factory_video_start`, `email_click`, and `whatsapp_click`; no event contains visitor-entered PII.
- Organization JSON-LD keeps one `@id`, the approved full English company name, `Nutranexa` as `alternateName`, and minimal safe fields. It omits `legalName`, `sameAs`, and patent relationships. Source pages are listed in page content with neutral source types. Product JSON-LD is not restored.
- `npm run seo:no-products` checks all repository HTML, including `apps/kr-site/dist` and `apps/tr-site/dist`, for Product JSON-LD.

## Release verification

Before deployment, run the repository build and SEO/i18n/market checks, confirm the new page is 200/self-canonical/indexable, confirm the sitemap gains exactly one English URL, and perform desktop/tablet/mobile visual checks. Do not send a real inquiry from an unapproved test account; validate form behavior up to the submission boundary unless the owner separately authorizes a delivery smoke test.
