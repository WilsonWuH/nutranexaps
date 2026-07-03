import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { defaultLocale, localeConfig, localePath, locales, runtimeMessages } from "../i18n/config.mjs";
import { translationOverrides } from "../i18n/overrides.mjs";

const root = process.cwd();
const siteUrl = "https://nutranexaps.com";
const excludedDirectories = new Set([".git", ".next", "node_modules", "public", "assets", "i18n"]);
const localeCodes = new Set(locales.map((locale) => locale.code));

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

function localizeInternalPath(value, locale) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return value;
  if (/^\/(assets|api)(\/|$)/.test(value)) return value;
  const match = value.match(/^([^?#]*)([?#].*)?$/);
  const pathname = match?.[1] || value;
  const suffix = match?.[2] || "";
  const withoutLocale = pathname.replace(new RegExp(`^/(${[...localeCodes].join("|")})(?=/|$)`), "") || "/";
  return `${localePath(locale, withoutLocale)}${suffix}`;
}

function localizeAbsoluteUrl(value, locale) {
  try {
    const url = new URL(value);
    if (url.origin !== siteUrl || /^\/assets\//.test(url.pathname)) return value;
    url.pathname = localePath(locale, url.pathname);
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
  if (["url", "item", "@id"].includes(key) || value.startsWith(siteUrl)) return localizeAbsoluteUrl(value, locale);
  return translateText(value, messages);
}

function languageSwitcher(locale, route) {
  const current = localeConfig(locale);
  const links = locales
    .map((item) => `<a href="${localePath(item.code, route)}" lang="${item.code}" dir="${item.dir}"${item.code === locale ? ' aria-current="page"' : ""}><span>${item.code.toUpperCase()}</span>${item.nativeLabel}</a>`)
    .join("");
  return `<details class="language-switcher"><summary aria-label="${current.switcherLabel}"><span class="language-code">${locale.toUpperCase()}</span><span class="language-name">${current.nativeLabel}</span></summary><div class="language-menu">${links}</div></details>`;
}

function alternateLinks(route) {
  return [
    ...locales.map((locale) => `<link rel="alternate" hreflang="${locale.code}" href="${siteUrl}${localePath(locale.code, route)}">`),
    `<link rel="alternate" hreflang="x-default" href="${siteUrl}${localePath(defaultLocale, route)}">`,
  ].join("\n  ");
}

function localizeHtml(html, locale, route, messages, { compatibility = false } = {}) {
  const config = localeConfig(locale);
  const $ = load(html, { decodeEntities: false });
  const localizedRoute = localePath(locale, route);
  const localizedCanonical = `${siteUrl}${localizedRoute}`;

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
  $("link[rel='canonical']").after(`\n  ${alternateLinks(route)}`);
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
  $(".nav-cta").before(languageSwitcher(locale, route));
  $("script[src='/assets/site.js']").before(`<script>window.NUTRANEXA_I18N=${JSON.stringify(runtimeMessages[locale])};</script>`);
  $("[data-i18n-skip]").removeAttr("data-i18n-skip");
  return $.html();
}

const dictionaries = new Map();
for (const locale of locales) {
  const content = JSON.parse(await fs.readFile(path.join(root, "i18n", "messages", `${locale.code}.json`), "utf8"));
  dictionaries.set(locale.code, { ...content.messages, ...(translationOverrides[locale.code] || {}) });
  await fs.rm(path.join(root, locale.code), { recursive: true, force: true });
}

const pages = await findEnglishPages(root);
const routes = pages.map((page) => routeFromRelative(page.relative));
for (const page of pages) {
  const route = routeFromRelative(page.relative);
  const html = await fs.readFile(page.absolute, "utf8");
  for (const locale of locales) {
    const destination = outputPath(locale.code, route);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, localizeHtml(html, locale.code, route, dictionaries.get(locale.code)), "utf8");
  }
  await fs.writeFile(page.absolute, localizeHtml(html, defaultLocale, route, dictionaries.get(defaultLocale), { compatibility: true }), "utf8");
}

const sitemapEntries = [];
for (const route of routes) {
  const alternates = [
    ...locales.map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale.code}" href="${siteUrl}${localePath(locale.code, route)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${localePath(defaultLocale, route)}"/>`,
  ].join("\n");
  for (const locale of locales) {
    sitemapEntries.push(`  <url>\n    <loc>${siteUrl}${localePath(locale.code, route)}</loc>\n${alternates}\n  </url>`);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries.join("\n")}\n</urlset>\n`;
await fs.writeFile(path.join(root, "sitemap.xml"), sitemap, "utf8");
await fs.writeFile(path.join(root, "i18n", "routes.json"), `${JSON.stringify({ defaultLocale, locales: locales.map((locale) => locale.code), routes }, null, 2)}\n`, "utf8");

console.log(`Generated ${pages.length * locales.length} localized pages across ${locales.length} locales.`);
