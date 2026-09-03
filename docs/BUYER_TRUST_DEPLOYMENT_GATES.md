# Buyer Trust Deployment Gates

This document records the external approvals and operational configuration that remain outside the static website implementation. The website must not present any of these gates as complete until the owner confirms them.

## Required before production release

- **Legal-name relationship approval:** Confirm the approved English legal name, Chinese legal name, public-facing Nutranexa name, and the relationship between `nutranexaps.com` and `nutranexa.cn`. Confirm which entity appears on quotations, contracts, invoices, certificates, and production-licence documents. Until approved, public copy uses source-led, neutral wording and does not call Nutranexa a registered trademark or infer that names are the same legal entity.
- **Enterprise email and delivery:** Open the approved company-domain mailbox(es), test inbound and outbound delivery, and configure SPF, DKIM, and DMARC. Update the form delivery destination only after the owner supplies and approves the real recipient. The existing `/api/inquiry` route and current recipient remain unchanged by this implementation.
- **Real analytics configuration:** Supply the approved GA4/GTM measurement ID(s), then validate page views, qualification-pack clicks, form start, successful submission, errors, source clicks, document previews, video starts, email clicks, and WhatsApp clicks. The source keeps a visible configuration placeholder and does not invent IDs.
- **Certificate and licence review:** Recheck the current validity, scope, issuing entity, product applicability, and controlled-copy status for every certificate, licence, statement, and COA before describing it as current. Historical or representative batch material must remain labelled as such.
- **Asset publication authorization:** Obtain written authorization to publish factory, laboratory, packaging, shipment, team, certificate, COA, and video assets, including any customer or lot information that could identify a buyer.

## Implemented in source

- `config/trust/company.mjs` is the reusable source for the currently approved public facts and verification links.
- `/company-verification/` is generated in English only until human translations are approved. Non-English artifacts and hreflang targets are not generated for this route.
- Qualification Pack CTAs use `/contact/?request=qualification-pack` and preserve the existing inquiry endpoint and required-field model.
- Form options include qualification-pack routing, volume ranges, Halal, Kosher, GMO, SDS, and related document requests without exposing a new mailbox.
- Analytics events are emitted through the existing `dataLayer` architecture without visitor name, email, phone, message, or other PII.
- Organization JSON-LD uses one `@id`, the approved public facts, and only source URLs listed in the trust data. Product JSON-LD is not restored.

## Release verification

Before deployment, run the repository build and SEO/i18n/market checks, confirm the new page is 200/self-canonical/indexable, confirm the sitemap gains exactly one English URL, and perform desktop/tablet/mobile visual checks. Do not send a real inquiry from an unapproved test account; validate form behavior up to the submission boundary unless the owner separately authorizes a delivery smoke test.
