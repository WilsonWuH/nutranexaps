import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { defaultLocale, localePath, locales } from "../i18n/config.mjs";
import { translationOverrides } from "../i18n/overrides.mjs";
import { indexableLocalesForRoute, isRouteIndexable, sitemapFiles } from "../config/seo/indexing.mjs";

const root = process.cwd();
const siteUrl = "https://nutranexaps.com";
const manifest = JSON.parse(await fs.readFile(path.join(root, "i18n", "routes.json"), "utf8"));
const errors = [];

function publicLocalePath(locale, route) {
  const normalized = route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
  return locale === defaultLocale ? normalized : localePath(locale, normalized);
}

for (const locale of locales) {
  const dictionary = JSON.parse(await fs.readFile(path.join(root, "i18n", "messages", `${locale.code}.json`), "utf8"));
  const english = JSON.parse(await fs.readFile(path.join(root, "i18n", "messages", "en.json"), "utf8"));
  const missing = Object.keys(english.messages).filter((key) => !dictionary.messages[key] && !translationOverrides[locale.code]?.[key]);
  if (["ko", "tr"].includes(locale.code) && missing.length) errors.push(`${locale.code}: ${missing.length} dictionary entries are missing`);

  for (const route of manifest.routes) {
    const file = path.join(root, locale.code, ...route.split("/").filter(Boolean), "index.html");
    let html;
    try {
      html = await fs.readFile(file, "utf8");
    } catch {
      errors.push(`${locale.code}${route}: localized page is missing`);
      continue;
    }
    const $ = load(html);
    const expectedUrl = `${siteUrl}${publicLocalePath(locale.code, route)}`;
    if ($("html").attr("lang") !== locale.code) errors.push(`${locale.code}${route}: incorrect html lang`);
    if ($("html").attr("dir") !== locale.dir) errors.push(`${locale.code}${route}: incorrect text direction`);
    if ($("title").text().trim().length < 8) errors.push(`${locale.code}${route}: SEO title is missing`);
    if (!$("meta[name='description']").attr("content")?.trim()) errors.push(`${locale.code}${route}: meta description is missing`);
    if ($("h1").length !== 1) errors.push(`${locale.code}${route}: expected one H1, found ${$("h1").length}`);
    if ($("link[rel='canonical']").attr("href") !== expectedUrl) errors.push(`${locale.code}${route}: canonical is incorrect`);
    const indexableLocaleCodes = indexableLocalesForRoute(route);
    const expectedHreflangs = isRouteIndexable(route, locale.code)
      ? indexableLocaleCodes.size + (indexableLocaleCodes.has(defaultLocale) ? 1 : 0)
      : 0;
    if ($("link[rel='alternate'][hreflang]").length !== expectedHreflangs) errors.push(`${locale.code}${route}: hreflang set is incomplete`);
    const isPlainNewsArticle = route.startsWith("/news/") && route !== "/news/";
    if (!isPlainNewsArticle && !$(".language-switcher").length) errors.push(`${locale.code}${route}: language switcher is missing`);
    $("img").each((_, image) => {
      if ($(image).attr("alt") === undefined) errors.push(`${locale.code}${route}: image without alt attribute`);
    });
  }
}

const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
if (!sitemap.includes("<sitemapindex") || !sitemapFiles.every((filename) => sitemap.includes(`<loc>${siteUrl}/${filename}</loc>`))) {
  errors.push("sitemap: index or required child sitemap is missing");
}
const expectedUrls = manifest.routes.reduce((total, route) => total + indexableLocalesForRoute(route).size, 0);
let actualUrls = 0;
for (const filename of sitemapFiles) {
  const child = await fs.readFile(path.join(root, filename), "utf8").catch(() => "");
  if (!child.includes("<urlset")) errors.push(`sitemap: ${filename} is not a URL set`);
  actualUrls += (child.match(/<url>/g) || []).length;
}
if (actualUrls !== expectedUrls) errors.push(`sitemap: expected ${expectedUrls} URLs, found ${actualUrls}`);
let hasXDefault = false;
for (const filename of sitemapFiles) {
  const child = await fs.readFile(path.join(root, filename), "utf8").catch(() => "");
  if (child.includes('hreflang="x-default"')) hasXDefault = true;
}
if (!hasXDefault) errors.push("sitemap: x-default hreflang is missing");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified ${manifest.routes.length * locales.length} localized pages, ${locales.length} dictionaries, and ${actualUrls} sitemap URLs.`);
}
