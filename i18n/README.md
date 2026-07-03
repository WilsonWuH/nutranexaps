# Nutranexa localization

Supported locale prefixes: `en`, `es`, `ru`, `ar`, `fr`, and `pt`.

## Content workflow

1. Run `npm run i18n:extract` after changing English page copy.
2. Generate or update dictionaries with one of the configured providers.
3. Run `npm run build`; localized HTML, hreflang links, canonical URLs, and the multilingual sitemap are generated automatically.

## Translation provider configuration

- DeepL: set `DEEPL_API_KEY`, then run `npm run i18n:translate -- --provider=deepl`.
- Google Cloud Translation: set `GOOGLE_TRANSLATE_API_KEY`, then run `npm run i18n:translate -- --provider=google-cloud`.
- `google-public` is only intended for the initial checked-in dictionary bootstrap. Production content updates should use an authenticated provider and human review.

Brand names, product names, model numbers, and certification terms listed in `config.mjs` are protected during automated translation. All generated translations are marked for human review, especially regulatory wording, product claims, and technical document names.
