import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { localePath, locales } from "../i18n/config.mjs";

const root = process.cwd();
const siteUrl = "https://nutranexaps.com";
const manifest = JSON.parse(await fs.readFile(path.join(root, "i18n", "routes.json"), "utf8"));
const errors = [];

for (const locale of locales) {
  const dictionary = JSON.parse(await fs.readFile(path.join(root, "i18n", "messages", `${locale.code}.json`), "utf8"));
  const english = JSON.parse(await fs.readFile(path.join(root, "i18n", "messages", "en.json"), "utf8"));
  const missing = Object.keys(english.messages).filter((key) => !dictionary.messages[key]);
  if (missing.length) errors.push(`${locale.code}: ${missing.length} dictionary entries are missing`);

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
    const expectedUrl = `${siteUrl}${localePath(locale.code, route)}`;
    if ($("html").attr("lang") !== locale.code) errors.push(`${locale.code}${route}: incorrect html lang`);
    if ($("html").attr("dir") !== locale.dir) errors.push(`${locale.code}${route}: incorrect text direction`);
    if ($("title").text().trim().length < 8) errors.push(`${locale.code}${route}: SEO title is missing`);
    if (!$("meta[name='description']").attr("content")?.trim()) errors.push(`${locale.code}${route}: meta description is missing`);
    if ($("h1").length !== 1) errors.push(`${locale.code}${route}: expected one H1, found ${$("h1").length}`);
    if ($("link[rel='canonical']").attr("href") !== expectedUrl) errors.push(`${locale.code}${route}: canonical is incorrect`);
    if ($("link[rel='alternate'][hreflang]").length !== locales.length + 1) errors.push(`${locale.code}${route}: hreflang set is incomplete`);
    if (!$(".language-switcher").length) errors.push(`${locale.code}${route}: language switcher is missing`);
    $("img").each((_, image) => {
      if ($(image).attr("alt") === undefined) errors.push(`${locale.code}${route}: image without alt attribute`);
    });
  }
}

const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
const expectedUrls = manifest.routes.length * locales.length;
const actualUrls = (sitemap.match(/<url>/g) || []).length;
if (actualUrls !== expectedUrls) errors.push(`sitemap: expected ${expectedUrls} URLs, found ${actualUrls}`);
if (!sitemap.includes('hreflang="x-default"')) errors.push("sitemap: x-default hreflang is missing");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified ${manifest.routes.length * locales.length} localized pages, ${locales.length} dictionaries, and ${actualUrls} sitemap URLs.`);
}
