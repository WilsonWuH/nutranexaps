# Buyer Trust Deployment Gates

This document records the external approvals and operational configuration that remain outside the static website implementation. The website must not present any of these gates as complete until the owner confirms them.

## Required before production release

- **Legal-name relationship approval:** Confirm whether `Shandong Baianrui Biopharmaceutical Co., Ltd.`, `山东佰安瑞生物药业有限公司`, the public-facing Nutranexa name, `nutranexaps.com`, and `nutranexa.cn` refer to the same legal or commercial entity, and confirm which entity appears on quotations, contracts, invoices, certificates, and production-licence documents. Until approved, public copy lists these names by source and does not put the English or Chinese name in `Organization.legalName`, does not use them as `alternateName`, does not call Nutranexa a registered trademark, and does not infer that the names are the same legal entity.
- **Enterprise email and delivery:** Open the approved company-domain mailbox(es), test inbound and outbound delivery, and configure SPF, DKIM, and DMARC. Update the form delivery destination only after the owner supplies and approves the real recipient. The existing `/api/inquiry` route and current recipient remain unchanged by this implementation.
- **Real analytics configuration:** Supply the approved GA4/GTM measurement ID(s), implement the approved loader, and validate that `next.config.mjs` CSP `script-src` and `connect-src` allow the required analytics endpoints. Then validate page views, qualification-pack clicks, verification clicks, form start, successful submission, errors, source clicks, document previews, video starts, email clicks, and WhatsApp clicks. The source keeps a visible configuration placeholder and does not invent IDs or pretend the loader is connected.
- **Certificate and licence review:** Recheck the current validity, scope, issuing entity, product applicability, and controlled-copy status for every certificate, licence, statement, and COA before describing it as current. Historical or representative batch material must remain labelled as such.
- **Asset publication authorization:** Obtain written authorization to publish factory, laboratory, packaging, shipment, team, certificate, COA, and video assets, including any customer or lot information that could identify a buyer.

## Implemented in source

- `config/trust/company.mjs` is the reusable source for source-listed public facts and verification links; it does not decide the unapproved legal-name relationship.
- `/company-verification/` is generated in English only until human translations are approved. Non-English artifacts and hreflang targets are not generated for this route.
- Qualification Pack CTAs use `/contact/?request=qualification-pack` and preserve the existing inquiry endpoint and required-field model.
- Form options include qualification-pack routing, volume ranges, Halal, Kosher, GMO, SDS, and related document requests without exposing a new mailbox.
- Analytics events are emitted through the existing `dataLayer` architecture without visitor name, email, phone, message, or other PII.
- The event set is `verification_view` (verification-page load), `verification_click` (homepage entry), `verification_source_click`, `qualification_pack_click`, `qualification_form_start`, `qualification_form_submit`, `qualification_form_error`, `document_preview`, `factory_video_start`, `email_click`, and `whatsapp_click`; no event contains visitor-entered PII.
- Organization JSON-LD keeps one `@id` and the public-facing `Nutranexa` subject with minimal safe fields. It intentionally omits unapproved `legalName`, `alternateName`, `sameAs`, and patent relationships. Source pages are listed in page content with neutral source types. Product JSON-LD is not restored.
- `npm run seo:no-products` checks all repository HTML, including `apps/kr-site/dist` and `apps/tr-site/dist`, for Product JSON-LD.

## Release verification

Before deployment, run the repository build and SEO/i18n/market checks, confirm the new page is 200/self-canonical/indexable, confirm the sitemap gains exactly one English URL, and perform desktop/tablet/mobile visual checks. Do not send a real inquiry from an unapproved test account; validate form behavior up to the submission boundary unless the owner separately authorizes a delivery smoke test.
