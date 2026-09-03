import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { defaultLocale, localeConfig, localePath, locales, runtimeMessages } from "../i18n/config.mjs";
import { translationOverrides } from "../i18n/overrides.mjs";
import { companyIdentity } from "../config/trust/company.mjs";
import {
  indexableLocalesForRoute,
  sitemapLocalesForRoute,
  isRouteIndexable,
  sitemapFiles,
  sitemapGroup,
  englishOnlyRoutes,
  untranslatedEnglishOnlyRoutes,
} from "../config/seo/indexing.mjs";

const root = process.cwd();
const siteUrl = "https://nutranexaps.com";
const excludedDirectories = new Set([".git", ".next", "node_modules", "public", "assets", "i18n", "apps", "config", "content", "docs", "qa", "tmp"]);
const localeCodes = new Set(locales.map((locale) => locale.code));
const legacyMarketLocales = new Set(["ko", "tr"]);
const protectedSchemaIdentityValues = new Set([
  companyIdentity.englishCompanyName,
  companyIdentity.publicName,
  companyIdentity.chineseName,
]);
const preservedLegacyRoutes = [
  "/quote/",
  "/sample-request/",
  "/technical-documents/",
  "/packaging-delivery/",
  "/faq/",
  "/blog/",
  "/products/ps-specifications/",
  // The market configuration still exposes this legacy commercial route. Keep
  // its localized HTML available while the main English application taxonomy
  // remains focused on current application pages.
  "/applications/oem-odm/",
];

const terminologyReplacements = {
  ko: [
    [/\bPhosphatidylserine\b/gi, "포스파티딜세린"],
    [/\bphosphatidyl serine\b/gi, "포스파티딜세린"],
    [/(?:인산|포|호)[가-힣]{0,8}\s?세린/g, "포스파티딜세린"],
    [/화약/g, "분말"],
    [/콩 유래/g, "대두 유래"],
    [/조형/g, "제형"],
    [/(?:용해성|가용성) 대두 (?:다당류|다당체)/g, "수용성 대두 다당류"],
  ],
  tr: [
    [/\bPhosphatidylserine\b/g, "Fosfatidilserin"],
    [/\bphosphatidylserine\b/g, "fosfatidilserin"],
    [/\bPhosphatidyl serine\b/g, "Fosfatidilserin"],
    [/\bphosphatidyl serine\b/g, "fosfatidilserin"],
    [/\bFosfatidil\s+serin\b/gi, "Fosfatidilserin"],
    [/\bbarutun\b/gi, "tozun"],
    [/\bbarutu\b/gi, "tozu"],
    [/\bbarut\b/gi, "toz"],
    [/PS notları/g, "PS saflık dereceleri"],
    [/devrim/gi, "devir"],
    [/Çözünür Soya Fasulyesi Polisakkaridi/gi, "Suda Çözünür Soya Polisakkariti"],
    [/Formülasyonun için/g, "Formülasyonunuz için"],
  ],
};

function applyTerminology(messages, locale) {
  const replacements = terminologyReplacements[locale] || [];
  return Object.fromEntries(
    Object.entries(messages).map(([source, translated]) => [
      source,
      replacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), translated),
    ]),
  );
}

function normalize(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

async function findEnglishPages(directory, base = "") {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const pages = [];
  for (const entry of entries) {
    if (excludedDirectories.has(entry.name) || localeCodes.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.join(base, entry.name);
    if (entry.isDirectory()) pages.push(...(await findEnglishPages(absolute, relative)));
    if (entry.isFile() && entry.name === "index.html") pages.push({ absolute, relative });
  }
  return pages;
}

function routeFromRelative(relative) {
  const directory = path.posix.dirname(relative.replaceAll("\\", "/"));
  return directory === "." ? "/" : `/${directory}/`;
}

function outputPath(locale, route) {
  const parts = route.split("/").filter(Boolean);
  return path.join(root, locale, ...parts, "index.html");
}

function publicLocalePath(locale, route) {
  const normalized = route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
  return locale === defaultLocale ? normalized : localePath(locale, normalized);
}

function localizeInternalPath(value, locale) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return value;
  if (/^\/(assets|api)(\/|$)/.test(value)) return value;
  const match = value.match(/^([^?#]*)([?#].*)?$/);
  const pathname = match?.[1] || value;
  const suffix = match?.[2] || "";
  const withoutLocale = pathname.replace(new RegExp(`^/(${[...localeCodes].join("|")})(?=/|$)`), "") || "/";
  if (englishOnlyRoutes.has(withoutLocale)) return `${withoutLocale}${suffix}`;
  return `${localePath(locale, withoutLocale)}${suffix}`;
}

function localizeAbsoluteUrl(value, locale) {
  try {
    const url = new URL(value);
    if (url.origin !== siteUrl || /^\/assets\//.test(url.pathname)) return value;
    url.pathname = publicLocalePath(locale, url.pathname);
    return url.toString();
  } catch {
    return value;
  }
}

function translateText(value, messages) {
  const key = normalize(value);
  return messages[key] || value;
}

function translateNode(node, messages) {
  const raw = node.data || "";
  const key = normalize(raw);
  if (!key || !messages[key]) return;
  const leading = raw.match(/^\s*/)?.[0] || "";
  const trailing = raw.match(/\s*$/)?.[0] || "";
  node.data = `${leading}${messages[key]}${trailing}`;
}

function translateSchema(value, messages, locale, key = "") {
  if (Array.isArray(value)) return value.map((item) => translateSchema(item, messages, locale, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([childKey, child]) => [childKey, translateSchema(child, messages, locale, childKey)]));
  }
  if (typeof value !== "string") return value;
  if (key.startsWith("@") || key === "query-input") return value;
  if (["url", "item", "@id"].includes(key) || value.startsWith(siteUrl)) return localizeAbsoluteUrl(value, locale);
  if (protectedSchemaIdentityValues.has(value)) return value;
  return translateText(value, messages);
}

function languageSwitcher(locale, route, availableLocales = locales) {
  const current = localeConfig(locale);
  const standardLinks = availableLocales.map((item) => `<a href="${publicLocalePath(item.code, route)}" lang="${item.code}" dir="${item.dir}"${item.code === locale ? ' aria-current="page"' : ""}><span>${item.code.toUpperCase()}</span>${item.nativeLabel}</a>`);
  const links = standardLinks.join("");
  return `<details class="language-switcher"><summary aria-label="${current.switcherLabel}"><span class="language-code">${locale.toUpperCase()}</span><span class="language-name">${current.nativeLabel}</span></summary><div class="language-menu">${links}</div></details>`;
}

function alternateLinks(route, indexableLocaleCodes) {
  const links = locales
    .filter((locale) => indexableLocaleCodes.has(locale.code))
    .map((locale) => `<link rel="alternate" hreflang="${locale.code}" href="${siteUrl}${publicLocalePath(locale.code, route)}">`);
  if (indexableLocaleCodes.has(defaultLocale)) {
    links.push(`<link rel="alternate" hreflang="x-default" href="${siteUrl}${publicLocalePath(defaultLocale, route)}">`);
  }
  return links.join("\n  ");
}

function localizeHtml(html, locale, route, messages, indexableLocaleCodes, { compatibility = false } = {}) {
  const config = localeConfig(locale);
  const $ = load(html, { decodeEntities: false });
  const localizedRoute = publicLocalePath(locale, route);
  const localizedCanonical = `${siteUrl}${localizedRoute}`;
  const isIndexable = isRouteIndexable(route, locale);

  $("html").attr("lang", locale).attr("dir", config.dir);
  $("body").addClass(`locale-${locale}`);

  $("script[type='application/ld+json']").each((_, element) => {
    try {
      const schema = JSON.parse($(element).text());
      $(element).text(JSON.stringify(translateSchema(schema, messages, locale)));
    } catch {
      // Keep existing schema when a source block cannot be parsed.
    }
  });

  $("script, style").each((_, element) => $(element).attr("data-i18n-skip", "true"));
  $("body *:not([data-i18n-skip])").contents().each((_, node) => {
    if (node.type === "text" && !$(node).parents("script,style").length) translateNode(node, messages);
  });

  if (route === "/" && locale === "ko") {
    $("h1").first().html('인지 건강 혁신을 위한 <span>프리미엄 포스파티딜세린 원료</span>');
  }
  if (route === "/" && locale === "tr") {
    $("h1").first().html('Bilişsel Sağlık İnovasyonu için <span>Premium Fosfatidilserin Hammaddeleri</span>');
  }

  const attributes = [
    ["meta[name='description'], meta[property='og:title'], meta[property='og:description']", "content"],
    ["img[alt]", "alt"],
    ["input[placeholder], textarea[placeholder]", "placeholder"],
    ["[aria-label]", "aria-label"],
  ];
  for (const [selector, attribute] of attributes) {
    $(selector).each((_, element) => {
      const value = $(element).attr(attribute);
      if (value) $(element).attr(attribute, translateText(value, messages));
    });
  }
  $("title").text(translateText($("title").text(), messages));

  $("link[rel='canonical']").attr("href", localizedCanonical);
  $("link[rel='alternate'][hreflang]").remove();
  if (isIndexable) {
    const alternates = alternateLinks(route, indexableLocaleCodes);
    if (alternates) $("link[rel='canonical']").after(`\n  ${alternates}`);
  }
  if (!isIndexable) {
    const robots = $("meta[name='robots']");
    if (robots.length) robots.attr("content", "noindex,follow");
    else $("head").append('\n  <meta name="robots" content="noindex,follow">');
  }
  $("meta[property='og:url']").attr("content", localizedCanonical);
  $("meta[property='og:locale'], meta[property='og:locale:alternate']").remove();
  $("meta[property='og:url']").after(`\n  <meta property="og:locale" content="${config.ogLocale}">${locales.filter((item) => item.code !== locale).map((item) => `\n  <meta property="og:locale:alternate" content="${item.ogLocale}">`).join("")}`);

  if (!compatibility) {
    $("a[href]").each((_, element) => {
      const href = $(element).attr("href");
      $(element).attr("href", localizeInternalPath(href, locale));
    });
    $("input[name='_next']").attr("value", `${siteUrl}${localePath(locale, "/thank-you/")}`);
    $("input[name='_url']").attr("value", `${siteUrl}${localePath(locale, "/contact/")}`);
  }

  $(".language-switcher").remove();
  const isPlainNewsArticle = route.startsWith("/news/") && route !== "/news/";
  if (!isPlainNewsArticle) {
    const availableLocales = indexableLocaleCodes.size ? locales.filter((item) => indexableLocaleCodes.has(item.code)) : locales;
    const switcher = languageSwitcher(locale, route, availableLocales);
    if ($(".nav-cta").length) $(".nav-cta").first().before(switcher);
    else if ($("header").length) $("header").first().append(switcher);
  }
  $("script[src='/assets/site.js']").before(`<script>window.NUTRANEXA_I18N=${JSON.stringify(runtimeMessages[locale])};</script>`);
  $("[data-i18n-skip]").removeAttr("data-i18n-skip");
  return $.html();
}

const dictionaries = new Map();
const preservedLegacyPages = new Map();
for (const locale of locales) {
  const content = JSON.parse(await fs.readFile(path.join(root, "i18n", "messages", `${locale.code}.json`), "utf8"));
  dictionaries.set(locale.code, applyTerminology({ ...content.messages, ...(translationOverrides[locale.code] || {}) }, locale.code));
  const legacyPages = new Map();
  if (legacyMarketLocales.has(locale.code)) {
    for (const route of preservedLegacyRoutes) {
      const file = outputPath(locale.code, route);
      const html = await fs.readFile(file, "utf8").catch(() => null);
      if (html) legacyPages.set(route, html.replaceAll("/quality-control/", "/quality-rd/"));
    }
  }
  preservedLegacyPages.set(locale.code, legacyPages);
  await fs.rm(path.join(root, locale.code), { recursive: true, force: true });
}

const pages = await findEnglishPages(root);
const routes = pages.map((page) => routeFromRelative(page.relative));
const indexableLocalesByRoute = new Map();
const sitemapLocalesByRoute = new Map();
for (const page of pages) {
  const route = routeFromRelative(page.relative);
  const html = await fs.readFile(page.absolute, "utf8");
  const indexableLocaleCodes = indexableLocalesForRoute(route);
  indexableLocalesByRoute.set(route, indexableLocaleCodes);
  sitemapLocalesByRoute.set(route, sitemapLocalesForRoute(route));
  for (const locale of locales) {
    if (locale.code !== defaultLocale && untranslatedEnglishOnlyRoutes.has(route)) continue;
    const destination = outputPath(locale.code, route);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, localizeHtml(html, locale.code, route, dictionaries.get(locale.code), indexableLocaleCodes), "utf8");
  }
  await fs.writeFile(page.absolute, localizeHtml(html, defaultLocale, route, dictionaries.get(defaultLocale), indexableLocaleCodes, { compatibility: true }), "utf8");
}

const generatedRouteSet = new Set(routes);
for (const [locale, pagesToRestore] of preservedLegacyPages) {
  for (const [route, html] of pagesToRestore) {
    // OEM/ODM is now a first-class generated application route. Keep it in the
    // compatibility inventory for old checkouts, but prefer the current page
    // so every locale receives the normal WebPage/hreflang head.
    if (route === "/applications/oem-odm/" && generatedRouteSet.has(route)) continue;
    const destination = outputPath(locale, route);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, html, "utf8");
  }
}

const sitemapEntries = new Map(sitemapFiles.map((name) => [name, []]));
for (const route of routes) {
  const sitemapLocaleCodes = sitemapLocalesByRoute.get(route) || new Set();
  const sitemapLocales = locales.filter((locale) => sitemapLocaleCodes.has(locale.code));
  if (!sitemapLocales.length) continue;
  const alternates = [
    ...sitemapLocales.map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale.code}" href="${siteUrl}${publicLocalePath(locale.code, route)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${publicLocalePath(defaultLocale, route)}"/>`,
  ].join("\n");
  for (const locale of sitemapLocales) {
    const entry = `  <url>\n    <loc>${siteUrl}${publicLocalePath(locale.code, route)}</loc>\n${alternates}\n  </url>`;
    const filename = `sitemap-${sitemapGroup(route, locale.code)}.xml`;
    sitemapEntries.get(filename)?.push(entry);
  }
}

const sitemapHeader = '<?xml version="1.0" encoding="UTF-8"?>';
const sitemapUrlset = (entries) => `${sitemapHeader}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
await Promise.all(sitemapFiles.map((filename) => fs.writeFile(path.join(root, filename), sitemapUrlset(sitemapEntries.get(filename)), "utf8")));
const sitemapIndex = `${sitemapHeader}\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapFiles.map((filename) => `  <sitemap><loc>${siteUrl}/${filename}</loc></sitemap>`).join("\n")}\n</sitemapindex>\n`;
await fs.writeFile(path.join(root, "sitemap.xml"), sitemapIndex, "utf8");
await Promise.all([
  "sitemap-en.xml",
  "sitemap-ko.xml",
  "sitemap-tr.xml",
  "sitemap-existing-locales.xml",
].map((filename) => fs.rm(path.join(root, filename), { force: true })));
await fs.writeFile(path.join(root, "i18n", "routes.json"), `${JSON.stringify({ defaultLocale, locales: locales.map((locale) => locale.code), routes }, null, 2)}\n`, "utf8");

const sitemapStats = Object.fromEntries(sitemapFiles.map((filename) => [filename, sitemapEntries.get(filename).length]));
console.log(`Generated ${pages.length * locales.length} localized pages across ${locales.length} locales. Sitemap URLs: ${JSON.stringify(sitemapStats)}`);
