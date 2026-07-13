import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import ko from "../content/ko/site.mjs";
import tr from "../content/tr/site.mjs";
import { englishRouteMap, localizedPath, siteOrigin } from "../config/locales/markets.mjs";

const root = process.cwd();
const sites = { ko, tr };
const errors = [];
const checked = [];

function fail(locale, route, message) {
  errors.push(`${locale}${route}: ${message}`);
}

async function exists(file) {
  return fs.stat(file).then(() => true).catch(() => false);
}

for (const site of Object.values(sites)) {
  if (site.pages.length < 12 || site.pages.length > 18) fail(site.locale, "/", `page count ${site.pages.length} is outside 12–18`);
  for (const page of site.pages) {
    const target = path.join(root, site.locale, ...page.route.split("/").filter(Boolean), "index.html");
    if (!(await exists(target))) {
      fail(site.locale, page.route, "missing generated HTML");
      continue;
    }
    const html = await fs.readFile(target, "utf8");
    const $ = load(html, { decodeEntities: false });
    if ($("html").attr("lang") !== site.locale) fail(site.locale, page.route, "incorrect html lang");
    if (!$('meta[charset="utf-8"]').length) fail(site.locale, page.route, "missing UTF-8 charset");
    if (!$('meta[name="description"]').attr("content")) fail(site.locale, page.route, "missing meta description");
    if ($("h1").length !== 1) fail(site.locale, page.route, `expected one H1, found ${$("h1").length}`);
    if ($('link[rel="canonical"]').attr("href") !== `${siteOrigin}${localizedPath(site.locale, page.route)}`) fail(site.locale, page.route, "incorrect canonical");
    for (const locale of ["ko", "tr"]) {
      if (!$(`link[rel="alternate"][hreflang="${locale}"]`).length) fail(site.locale, page.route, `missing ${locale} hreflang`);
    }
    const enExpected = englishRouteMap.has(page.route);
    if (Boolean($('link[rel="alternate"][hreflang="en"]').length) !== enExpected) fail(site.locale, page.route, "English hreflang mapping mismatch");
    if ($('img:not([alt]), img[alt=""]').length) fail(site.locale, page.route, "image without alt text");
    for (const element of $('script[type="application/ld+json"]').toArray()) {
      try { JSON.parse($(element).text()); } catch { fail(site.locale, page.route, "invalid JSON-LD"); }
    }
    if (/�|T眉|頃滉淡|脺reticisi|陌leti/.test(html)) fail(site.locale, page.route, "possible encoding corruption");
    if (site.locale === "ko" && !/[가-힣]/.test($("body").text())) fail(site.locale, page.route, "Korean text not detected");
    if (site.locale === "tr" && !/[çğıöşüÇĞİÖŞÜ]/.test($("body").text())) fail(site.locale, page.route, "Turkish characters not detected");

    for (const href of $('a[href^="/ko/"],a[href^="/tr/"]').map((_, el) => $(el).attr("href")).get()) {
      const clean = href.split(/[?#]/)[0];
      const parts = clean.split("/").filter(Boolean);
      const linked = path.join(root, parts[0], ...parts.slice(1), "index.html");
      if (!(await exists(linked))) fail(site.locale, page.route, `broken localized link ${href}`);
    }
    if (page.type === "form") {
      const names = new Set($("form [name]").map((_, el) => $(el).attr("name")).get());
      for (const field of ["Name","Company","Country","Email","WhatsApp","Requested Product","Requested Assay","Application","Estimated Quantity","Sample Required","Documents Required","Message","Privacy Consent","Language","Locale","Source Page","Landing Page","Referrer","UTM Source","UTM Medium","UTM Campaign","_honey"]) {
        if (!names.has(field)) fail(site.locale, page.route, `missing form field ${field}`);
      }
      if ($("form").attr("action") !== "/api/inquiry") fail(site.locale, page.route, "form does not use server endpoint");
    }
    checked.push(`${site.locale}${page.route}`);
  }
}

const englishHome = await fs.readFile(path.join(root, "index.html"), "utf8");
const $en = load(englishHome);
if ($en('link[rel="canonical"]').attr("href") !== `${siteOrigin}/`) errors.push("English home canonical no longer points to root URL");
for (const locale of ["ko", "tr"]) if (!$en(`link[rel="alternate"][hreflang="${locale}"]`).length) errors.push(`English home missing ${locale} hreflang`);

for (const name of ["sitemap.xml","sitemap-en.xml","sitemap-ko.xml","sitemap-tr.xml","robots.txt"]) {
  if (!(await exists(path.join(root, name)))) errors.push(`missing ${name}`);
}

if (errors.length) {
  console.error(JSON.stringify({ passed: false, checked: checked.length, errors }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ passed: true, checked: checked.length, pages: { ko: ko.pages.length, tr: tr.pages.length }, sitemaps: ["/sitemap.xml","/sitemap-en.xml","/sitemap-ko.xml","/sitemap-tr.xml"] }, null, 2));
}
