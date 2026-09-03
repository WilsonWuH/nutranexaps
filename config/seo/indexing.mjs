import { defaultLocale, locales } from "../../i18n/config.mjs";

// Indexability and sitemap inclusion are deliberately separate decisions.
// Without a complete GSC export, an existing localized page stays indexable and
// crawlable even when it is temporarily omitted from the concentrated sitemap.
export const siteUrl = "https://nutranexaps.com";
export const localeCodes = locales.map(({ code }) => code);

export const utilityRoutes = new Set(["/thank-you/"]);

export const englishOnlyRoutes = new Set([
  "/products/lecithin/",
  "/products/soy-lecithin/",
  "/company-verification/",
]);

// These pages are intentionally published in English only until an approved
// human translation exists. The generator skips non-English artifacts instead
// of creating a noindex page that looks like a translated page.
export const untranslatedEnglishOnlyRoutes = new Set([
  "/company-verification/",
]);

export const coreProductRoutes = new Set([
  "/products/",
  "/products/phosphatidylserine/",
  "/products/soy-phosphatidylserine/",
  "/products/sunflower-phosphatidylserine/",
  "/products/soluble-soybean-polysaccharide/",
  "/products/phosphatidylserine-20/",
  "/products/phosphatidylserine-50/",
  "/products/phosphatidylserine-70/",
]);

export const coreRoutes = new Set([
  "/",
  "/about/",
  "/contact/",
  "/manufacturing/",
  "/quality-rd/",
  "/applications/",
  "/applications/dietary-supplements/",
  "/applications/functional-foods/",
  "/applications/oem-odm/",
  "/benefits/",
  "/science/",
  "/science/how-ps-works/",
  "/science/research-library/",
  "/science/formulation-support/",
  "/cases/",
  "/resources/",
  "/news/",
  ...coreProductRoutes,
]);

// These are the six localized URLs with a known search-performance signal.
// Product URLs are also covered by coreProductRoutes; keeping them here makes
// the exception auditable and protects the intended policy from regressions.
export const performanceRoutes = new Map([
  ["ko", new Set([
    "/products/soluble-soybean-polysaccharide/",
    "/resources/what-is-phosphatidylserine/",
  ])],
  ["fr", new Set(["/products/sunflower-phosphatidylserine/"])],
  ["tr", new Set(["/products/phosphatidylserine-20/"])],
  ["ar", new Set(["/resources/phosphatidylserine-coa-specification-certificate-review/"])],
  ["pt", new Set(["/products/soy-phosphatidylserine/"])],
]);

export const tierARoutes = new Set([
  ...coreRoutes,
  ...englishOnlyRoutes,
]);

export function isCoreProductRoute(route) {
  return coreProductRoutes.has(route);
}

export function isResourceRoute(route) {
  return route === "/resources/" || route.startsWith("/resources/");
}

export function isNewsRoute(route) {
  return route === "/news/" || route.startsWith("/news/");
}

export function isRouteIndexable(route, locale = defaultLocale) {
  if (!route || utilityRoutes.has(route) || route === "/quality-control/") return false;
  if (englishOnlyRoutes.has(route)) return locale === defaultLocale;
  // Existing localized pages remain index,follow until a complete GSC export
  // supports a deliberate noindex batch. The sitemap policy below is narrower.
  return true;
}

export function indexableLocalesForRoute(route) {
  return new Set(localeCodes.filter((locale) => isRouteIndexable(route, locale)));
}

export function includeInSitemap(route, locale = defaultLocale) {
  if (!isRouteIndexable(route, locale)) return false;
  if (englishOnlyRoutes.has(route)) return locale === defaultLocale;
  if (coreRoutes.has(route)) return true;
  if (performanceRoutes.get(locale)?.has(route)) return true;
  return locale === defaultLocale;
}

export function sitemapLocalesForRoute(route) {
  return new Set(localeCodes.filter((locale) => includeInSitemap(route, locale)));
}

export function sitemapGroup(route, locale) {
  if (route === "/company-verification/") return "core";
  if (isCoreProductRoute(route) || englishOnlyRoutes.has(route)) return "products";
  if (isResourceRoute(route)) return locale === defaultLocale ? "resources-en" : "resources-localized";
  if (isNewsRoute(route)) return locale === defaultLocale ? "news-en" : "news-localized";
  return "core";
}

export const sitemapFiles = [
  "sitemap-core.xml",
  "sitemap-products.xml",
  "sitemap-resources-en.xml",
  "sitemap-news-en.xml",
  "sitemap-resources-localized.xml",
  "sitemap-news-localized.xml",
];
