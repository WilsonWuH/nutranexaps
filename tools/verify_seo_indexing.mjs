import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { defaultLocale, localePath, locales } from "../i18n/config.mjs";
import {
  coreProductRoutes,
  indexableLocalesForRoute,
  isRouteIndexable,
  sitemapFiles,
  siteUrl,
  tierARoutes,
} from "../config/seo/indexing.mjs";

const root = process.cwd();
const errors = [];
const sitemapEntries = new Map();
const sitemapStats = {};

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

function fileForUrl(url) {
  const normalized = normalizeUrl(url);
  if (!normalized) return null;
  const pathname = new URL(normalized).pathname;
  if (pathname === "/") return path.join(root, "index.html");
  return path.join(root, ...pathname.split("/").filter(Boolean), "index.html");
}

function pageUrlForFile(file) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (relative === "index.html") return `${siteUrl}/`;
  if (!relative.endsWith("/index.html")) return null;
  const pathname = `/${relative.slice(0, -"index.html".length)}`;
  return normalizeUrl(`${siteUrl}${pathname}`);
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

function collectSchemaObjects(value, output = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaObjects(item, output));
  } else if (value && typeof value === "object") {
    if (value["@type"] === "Product" || (Array.isArray(value["@type"]) && value["@type"].includes("Product"))) output.push(value);
    Object.values(value).forEach((child) => collectSchemaObjects(child, output));
  }
  return output;
}

async function verifyPage(url) {
  const file = fileForUrl(url);
  if (!file) return;
  const html = await fs.readFile(file, "utf8").catch(() => null);
  if (html === null) {
    fail(`sitemap: ${url} points to a missing generated page`);
    return;
  }
  const $ = load(html, { decodeEntities: false });
  const canonical = normalizeUrl($("link[rel='canonical']").attr("href"));
  if (canonical !== url) fail(`canonical: ${url} resolves to ${canonical || "missing"}`);
  const robots = ($("meta[name='robots']").attr("content") || "").toLowerCase();
  if (robots.includes("noindex")) fail(`sitemap: noindex page included: ${url}`);
  $("script[type='application/ld+json']").each((_, element) => {
    try {
      const schema = JSON.parse($(element).text());
      for (const product of collectSchemaObjects(schema)) {
        if (!product.offers && !product.review && !product.aggregateRating) {
          fail(`schema: Product without offers, review, or aggregateRating on ${url}`);
        }
      }
    } catch {
      fail(`schema: invalid JSON-LD on ${url}`);
    }
  });
}

async function walkHtml(directory, files = []) {
  const entries = await fs.readdir(directory, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if ([".git", ".next", "node_modules", "public", "apps", "assets", "config", "content", "docs", "i18n", "tmp", "en", "es", "ru", "ar", "fr", "pt", "ko", "tr"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walkHtml(absolute, files);
    else if (entry.isFile() && entry.name === "index.html") files.push(absolute);
  }
  return files;
}

async function verifyInternalLinks() {
  const htmlFiles = await walkHtml(root, []);
  const sourcesByRoute = new Map();
  for (const file of htmlFiles) {
    const html = await fs.readFile(file, "utf8");
    const $ = load(html, { decodeEntities: false });
    $("a[href]").each((_, element) => {
      const href = $(element).attr("href") || "";
      if (!href.startsWith("/") || href.startsWith("//") || /^\/(?:assets|api)\//.test(href)) return;
      const route = new URL(href, siteUrl).pathname.endsWith("/")
        ? new URL(href, siteUrl).pathname
        : `${new URL(href, siteUrl).pathname}/`;
      const sourceUrl = pageUrlForFile(file);
      if (!sourceUrl || route === "/thank-you/") return;
      if (!sourcesByRoute.has(route)) sourcesByRoute.set(route, new Set());
      sourcesByRoute.get(route).add(sourceUrl);
    });
  }

  for (const route of tierARoutes) {
    if (route === "/") continue;
    const sources = sourcesByRoute.get(route)?.size || 0;
    if (!sources) fail(`internal links: Tier A route has no English source: ${route}`);
  }
  for (const route of ["/products/lecithin/", "/products/soy-lecithin/"]) {
    const sources = sourcesByRoute.get(route)?.size || 0;
    if (sources < 5) fail(`internal links: ${route} has ${sources} sources; expected at least 5`);
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
  await verifyPage(url);
  if (entry.alternates.has("x-default") && !entry.alternates.get("x-default").endsWith("/")) fail(`hreflang: x-default is malformed on ${url}`);
  for (const [hreflang, alternateUrl] of entry.alternates) {
    if (hreflang === "x-default") continue;
    const target = sitemapEntries.get(alternateUrl);
    if (!target) fail(`hreflang: ${url} points to a URL outside the sitemap set: ${alternateUrl}`);
    else if (![...target.alternates.values()].includes(url)) fail(`hreflang: ${url} is not reciprocal from ${alternateUrl}`);
  }
}

const manifest = JSON.parse(await fs.readFile(path.join(root, "i18n", "routes.json"), "utf8").catch(() => "{}"));
let expectedUrls = 0;
for (const route of manifest.routes || []) {
  const allowed = indexableLocalesForRoute(route);
  expectedUrls += allowed.size;
  for (const locale of locales) {
    const expectedUrl = `${siteUrl}${publicLocalePath(locale.code, route)}`;
    const shouldBeIndexed = isRouteIndexable(route, locale.code);
    if (shouldBeIndexed !== sitemapEntries.has(expectedUrl)) fail(`sitemap: policy mismatch for ${expectedUrl}`);
  }
}
if (expectedUrls !== sitemapEntries.size) fail(`sitemap: expected ${expectedUrls} policy URLs, found ${sitemapEntries.size}`);
for (const route of coreProductRoutes) {
  const expectedUrl = `${siteUrl}${route}`;
  if (!sitemapEntries.has(expectedUrl)) fail(`sitemap: English core product URL missing: ${expectedUrl}`);
}
for (const route of ["/products/lecithin/", "/products/soy-lecithin/"]) {
  if (!sitemapEntries.has(`${siteUrl}${route}`)) fail(`sitemap: English Lecithin URL missing: ${siteUrl}${route}`);
}

await verifyInternalLinks();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ passed: true, sitemapUrls: sitemapEntries.size, sitemapStats, coreProducts: coreProductRoutes.size }, null, 2));
}
