# Analytics Configuration

The main site includes a validated, environment-driven analytics loader. No analytics identifier is hard-coded or invented.

## Supported variables

- `NEXT_PUBLIC_GTM_ID`: preferred when Google Tag Manager manages GA4 and other Google tags; format `GTM-` followed by 6–12 uppercase letters or digits.
- `NEXT_PUBLIC_GA4_ID`: direct GA4 fallback when GTM is not supplied; format `G-` followed by exactly 10 uppercase letters or digits.
- `NEXT_PUBLIC_CLARITY_ID`: optional Microsoft Clarity project ID; lowercase letters and numbers only.

If both GTM and GA4 are present, the site loads GTM only so GA4 is not counted twice. Configure the GA4 tag inside the GTM container in that case. If GTM is blank and GA4 is present, the direct GA4 loader sends page views and the site's approved non-PII events. Clarity loads independently when its ID is present.

The Content Security Policy permits only the Google Tag Manager, Google Analytics, Microsoft Clarity, and required Bing collection endpoints in addition to the site's existing services. Invalid identifier formats stop generation rather than being written into HTML.

## Production activation

1. Add the approved IDs to the Production environment in Vercel; use Preview IDs only if a separate test property/container exists.
2. Redeploy so the static pages are generated with the configured IDs.
3. Confirm one loader mode in page source: GTM or direct GA4, never both.
4. Verify `verification_click`, `verification_view`, `qualification_pack_click`, form start/success/error, source/document/video, email, and WhatsApp events in GTM Preview or GA4 DebugView.
5. Confirm that event parameters contain only allow-listed operational values and never visitor-entered contact details or message text.

Until approved IDs are supplied, the site keeps collecting events only in the local `dataLayer`; no external analytics request is made.
