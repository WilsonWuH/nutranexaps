import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import ko from "../content/ko/site.mjs";
import tr from "../content/tr/site.mjs";
import { defaultLocale, localePath, locales } from "../i18n/config.mjs";
import { localizedPath, siteOrigin } from "../config/locales/markets.mjs";
import {
  coreProductRoutes,
  includeInSitemap,
  indexableLocalesForRoute,
  isRouteIndexable,
  sitemapFiles,
  sitemapLocalesForRoute,
  siteUrl,
  tierARoutes,
} from "../config/seo/indexing.mjs";

const root = process.cwd();
const localeCodes = new Set(locales.map(({ code }) => code));
const errors = [];
const sitemapEntries = new Map();
const sitemapStats = {};
const htmlStats = { files: 0, jsonLdErrors: 0, productSchemas: 0, brokenLinks: 0 };
const redirectRoutes = new Set([
  "/inquiry/",
  "/en/",
  "/ko/quality-control/",
  "/tr/quality-control/",
]);

function fail(message) {
  errors.push(message);
}

function decodeXml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalizeUrl(value) {
  try {
    const url = new URL(decodeXml(value), siteUrl);
    if (url.origin !== siteUrl) return null;
    url.search = "";
    url.hash = "";
    if (url.pathname !== "/" && !url.pathname.endsWith("/")) url.pathname += "/";
    return `${siteUrl}${url.pathname}`;
  } catch {
    return null;
  }
}

function publicLocalePath(locale, route) {
  return locale === defaultLocale ? route : localePath(locale, route);
}

function fileForPath(pathname) {
  const normalized = pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
  if (normalized === "/") return path.join(root, "index.html");
  return path.join(root, ...normalized.split("/").filter(Boolean), "index.html");
}

function fileForUrl(url) {
  const normalized = normalizeUrl(url);
  return normalized ? fileForPath(new URL(normalized).pathname) : null;
}

function pageUrlForFile(file) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (relative === "index.html") return `${siteUrl}/`;
  if (!relative.endsWith("/index.html")) return null;
  return normalizeUrl(`${siteUrl}/${relative.slice(0, -"index.html".length)}`);
}

function routeAndLocaleForUrl(url) {
  const pathname = new URL(url).pathname;
  const parts = pathname.split("/").filter(Boolean);
  const locale = localeCodes.has(parts[0]) ? parts.shift() : defaultLocale;
  const route = parts.length ? `/${parts.join("/")}/` : "/";
  return { locale, route };
}

function collectSchemaObjects(value, output = []) {
  if (Array.isArray(value)) value.forEach((item) => collectSchemaObjects(item, output));
  else if (value && typeof value === "object") {
    output.push(value);
    Object.values(value).forEach((child) => collectSchemaObjects(child, output));
  }
  return output;
}

function schemaTypes(value) {
  return collectSchemaObjects(value)
    .flatMap((item) => Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]])
    .filter(Boolean);
}

function parseJsonLd($, source) {
  const values = [];
  $("script[type='application/ld+json']").each((_, element) => {
    try {
      values.push(JSON.parse($(element).text()));
    } catch {
      htmlStats.jsonLdErrors += 1;
      fail(`schema: invalid JSON-LD in ${source}`);
    }
  });
  return values;
}

async function walkHtml(directory, files = []) {
  const entries = await fs.readdir(directory, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if ([".git", ".next", "node_modules", "public", "apps", "assets", "config", "content", "docs", "i18n", "qa", "tmp"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walkHtml(absolute, files);
    else if (entry.isFile() && entry.name === "index.html") files.push(absolute);
  }
  return files;
}

async function readSitemapEntries(filename) {
  const xml = await fs.readFile(path.join(root, filename), "utf8").catch(() => "");
  if (!xml) {
    fail(`sitemap: ${filename} is missing or empty`);
    return;
  }
  if (!xml.includes("<urlset")) {
    fail(`sitemap: ${filename} must be a URL set`);
    return;
  }
  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  sitemapStats[filename] = blocks.length;
  for (const block of blocks) {
    const loc = normalizeUrl(block.match(/<loc>([\s\S]*?)<\/loc>/)?.[1]);
    if (!loc) {
      fail(`sitemap: ${filename} contains an invalid <loc>`);
      continue;
    }
    if (sitemapEntries.has(loc)) fail(`sitemap: duplicate URL ${loc}`);
    const alternates = new Map();
    for (const match of block.matchAll(/<xhtml:link\b[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"[^>]*\/?>(?:<\/xhtml:link>)?/g)) {
      const alternateUrl = normalizeUrl(match[2]);
      if (alternateUrl) alternates.set(match[1], alternateUrl);
      else fail(`sitemap: ${loc} has an invalid hreflang URL`);
    }
    sitemapEntries.set(loc, { filename, alternates });
  }
}

async function verifySitemapPage(url) {
  const file = fileForUrl(url);
  const html = file ? await fs.readFile(file, "utf8").catch(() => null) : null;
  if (html === null) {
    fail(`sitemap: ${url} points to a missing generated page`);
    return;
  }
  const $ = load(html, { decodeEntities: false });
  const canonical = normalizeUrl($("link[rel='canonical']").attr("href"));
  if (canonical !== url) fail(`canonical: ${url} resolves to ${canonical || "missing"}`);
  if (($("meta[name='robots']").attr("content") || "").toLowerCase().includes("noindex")) fail(`sitemap: noindex page included: ${url}`);
  const schemas = parseJsonLd($, url);
  if (schemas.flatMap(schemaTypes).includes("Product")) {
    htmlStats.productSchemas += 1;
    fail(`schema: Product schema is not allowed on ${url}`);
  }
}

function localPathFromHref(href) {
  try {
    const url = new URL(href, siteUrl);
    if (url.origin !== siteUrl) return null;
    if (/^\/(?:assets|api)(?:\/|$)/.test(url.pathname)) return null;
    return url.pathname === "/" ? "/" : `/${url.pathname.replace(/^\/+|\/+$/g, "")}/`;
  } catch {
    return null;
  }
}

async function verifyAllHtml(htmlFiles) {
  const sourceByRoute = new Map();
  for (const file of htmlFiles) {
    const sourceUrl = pageUrlForFile(file);
    if (!sourceUrl) continue;
    htmlStats.files += 1;
    const html = await fs.readFile(file, "utf8");
    const $ = load(html, { decodeEntities: false });
    const { locale, route } = routeAndLocaleForUrl(sourceUrl);
    const canonical = normalizeUrl($("link[rel='canonical']").attr("href"));
    const expectedCanonical = locale === defaultLocale ? `${siteUrl}${route}` : sourceUrl;
    if (canonical !== expectedCanonical) fail(`canonical: ${sourceUrl} resolves to ${canonical || "missing"}`);
    const schemas = parseJsonLd($, sourceUrl);
    const types = schemas.flatMap(schemaTypes);
    if (types.includes("Product")) {
      htmlStats.productSchemas += 1;
      fail(`schema: Product schema found in final HTML ${sourceUrl}`);
    }
    const robots = ($("meta[name='robots']").attr("content") || "").toLowerCase();
    if (isRouteIndexable(route, locale) && robots.includes("noindex")) fail(`robots: unexpectedly noindex on ${sourceUrl}`);
    if (isRouteIndexable(route, locale) && !types.includes("WebPage")) fail(`schema: missing WebPage on indexable page ${sourceUrl}`);
    const hasVisibleFaq = $(".product-faq, .faq-list, details:not(.language-switcher)").length > 0;
    if (hasVisibleFaq && !types.includes("FAQPage")) fail(`schema: visible FAQ has no FAQPage on ${sourceUrl}`);

    for (const href of $("a[href]").map((_, element) => $(element).attr("href") || "").get()) {
      if (!href || href.startsWith("#") || /^(?:mailto:|tel:|javascript:)/i.test(href)) continue;
      const targetRoute = localPathFromHref(href);
      if (!targetRoute) continue;
      if (targetRoute === "/thank-you/") continue;
      if (!sourceByRoute.has(targetRoute)) sourceByRoute.set(targetRoute, new Set());
      sourceByRoute.get(targetRoute).add(sourceUrl);
      if (!redirectRoutes.has(targetRoute) && !(await fs.stat(fileForPath(targetRoute)).then(() => true).catch(() => false))) {
        htmlStats.brokenLinks += 1;
        fail(`links: broken internal link ${href} in ${sourceUrl}`);
      }
    }
  }

  for (const route of tierARoutes) {
    if (route === "/") continue;
    const englishSources = [...(sourceByRoute.get(route) || [])].filter((url) => routeAndLocaleForUrl(url).locale === defaultLocale);
    if (!englishSources.length) fail(`internal links: Tier A route has no English source: ${route}`);
  }
  for (const route of ["/products/lecithin/", "/products/soy-lecithin/"]) {
    const englishSources = [...(sourceByRoute.get(route) || [])].filter((url) => routeAndLocaleForUrl(url).locale === defaultLocale);
    if (englishSources.length < 5) fail(`internal links: ${route} has ${englishSources.length} English sources; expected at least 5`);
  }
}

async function verifyMarketConfigArtifacts() {
  for (const site of [ko, tr]) {
    for (const page of site.pages) {
      const url = `${siteOrigin}${localizedPath(site.locale, page.route)}`;
      if (!(await fs.stat(fileForUrl(url)).then(() => true).catch(() => false))) fail(`market config: ${url} has no generated artifact`);
    }
  }
}

const sitemapIndex = await fs.readFile(path.join(root, "sitemap.xml"), "utf8").catch(() => "");
if (!sitemapIndex.includes("<sitemapindex")) fail("sitemap: sitemap.xml is not a Sitemap Index");
for (const filename of sitemapFiles) {
  if (!sitemapIndex.includes(`<loc>${siteUrl}/${filename}</loc>`)) fail(`sitemap: sitemap.xml does not reference ${filename}`);
  await readSitemapEntries(filename);
}

for (const [url, entry] of sitemapEntries) {
  const pathname = new URL(url).pathname;
  if (/^\/en(?:\/|$)/.test(pathname)) fail(`sitemap: legacy /en/ URL included: ${url}`);
  if (pathname.includes("/quality-control/") || pathname.includes("/thank-you/")) fail(`sitemap: forbidden legacy or utility URL included: ${url}`);
  await verifySitemapPage(url);
  const xDefault = entry.alternates.get("x-default");
  if (!xDefault || !sitemapEntries.has(xDefault)) fail(`hreflang: ${url} has no x-default sitemap target`);
  for (const [hreflang, alternateUrl] of entry.alternates) {
    if (hreflang === "x-default") continue;
    const target = sitemapEntries.get(alternateUrl);
    if (!target) fail(`hreflang: ${url} points to a URL outside the sitemap set: ${alternateUrl}`);
    else if (![...target.alternates.values()].includes(url)) fail(`hreflang: ${url} is not reciprocal from ${alternateUrl}`);
    const { locale, route } = routeAndLocaleForUrl(alternateUrl);
    if (!isRouteIndexable(route, locale)) fail(`hreflang: ${url} points to non-indexable ${alternateUrl}`);
  }
}

const manifest = JSON.parse(await fs.readFile(path.join(root, "i18n", "routes.json"), "utf8").catch(() => "{}"));
let expectedSitemapUrls = 0;
for (const route of manifest.routes || []) {
  const indexable = indexableLocalesForRoute(route);
  const sitemapLocales = sitemapLocalesForRoute(route);
  expectedSitemapUrls += sitemapLocales.size;
  for (const locale of locales) {
    const expectedUrl = `${siteUrl}${publicLocalePath(locale.code, route)}`;
    const shouldBeInSitemap = includeInSitemap(route, locale.code);
    if (shouldBeInSitemap !== sitemapEntries.has(expectedUrl)) fail(`sitemap: policy mismatch for ${expectedUrl}`);
    if (!isRouteIndexable(route, locale.code) && indexable.has(locale.code)) fail(`indexing: policy contradiction for ${expectedUrl}`);
  }
}
if (expectedSitemapUrls !== sitemapEntries.size) fail(`sitemap: expected ${expectedSitemapUrls} policy URLs, found ${sitemapEntries.size}`);
for (const route of coreProductRoutes) if (!sitemapEntries.has(`${siteUrl}${route}`)) fail(`sitemap: English core product URL missing: ${siteUrl}${route}`);
for (const route of ["/products/lecithin/", "/products/soy-lecithin/"]) if (!sitemapEntries.has(`${siteUrl}${route}`)) fail(`sitemap: English Lecithin URL missing: ${siteUrl}${route}`);

const htmlFiles = await walkHtml(root, []);
await verifyAllHtml(htmlFiles);
await verifyMarketConfigArtifacts();

if (errors.length) {
  console.error(JSON.stringify({ passed: false, htmlFiles: htmlStats.files, jsonLdErrors: htmlStats.jsonLdErrors, productSchemas: htmlStats.productSchemas, brokenLinks: htmlStats.brokenLinks, errors }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ passed: true, htmlFiles: htmlStats.files, jsonLdErrors: htmlStats.jsonLdErrors, productSchemas: htmlStats.productSchemas, brokenLinks: htmlStats.brokenLinks, sitemapUrls: sitemapEntries.size, sitemapStats, coreProducts: coreProductRoutes.size }, null, 2));
}
