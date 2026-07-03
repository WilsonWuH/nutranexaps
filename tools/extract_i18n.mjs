import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { locales } from "../i18n/config.mjs";

const root = process.cwd();
const excludedDirectories = new Set([".git", ".next", "node_modules", "public", "assets", "i18n"]);
const localeCodes = new Set(locales.map((locale) => locale.code));
const sourceStrings = new Set();

function normalize(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function shouldTranslate(value) {
  const text = normalize(value);
  if (!text || !/[A-Za-z]/.test(text)) return false;
  if (/^(https?:|mailto:|tel:|\+?\d[\d\s().-]+$)/i.test(text)) return false;
  return true;
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

function collectDocumentStrings(html) {
  const $ = load(html, { decodeEntities: false });
  $("script[type='application/ld+json']").each((_, element) => {
    try {
      const schema = JSON.parse($(element).text());
      const visit = (value, key = "") => {
        if (Array.isArray(value)) return value.forEach((item) => visit(item, key));
        if (value && typeof value === "object") return Object.entries(value).forEach(([childKey, child]) => visit(child, childKey));
        if (typeof value === "string" && !key.startsWith("@") && shouldTranslate(value)) sourceStrings.add(normalize(value));
      };
      visit(schema);
    } catch {
      // Invalid schema is left untouched and will be caught by site verification.
    }
  });
  $("script, style").remove();

  $("body *").contents().each((_, node) => {
    if (node.type !== "text") return;
    const text = normalize($(node).text());
    if (shouldTranslate(text)) sourceStrings.add(text);
  });

  const attributes = [
    ["meta[name='description'], meta[property='og:title'], meta[property='og:description']", "content"],
    ["img[alt]", "alt"],
    ["input[placeholder], textarea[placeholder]", "placeholder"],
    ["[aria-label]", "aria-label"],
    ["title", null],
  ];

  for (const [selector, attribute] of attributes) {
    $(selector).each((_, element) => {
      const value = normalize(attribute ? $(element).attr(attribute) : $(element).text());
      if (shouldTranslate(value)) sourceStrings.add(value);
    });
  }
}

const pages = await findEnglishPages(root);
for (const page of pages) collectDocumentStrings(await fs.readFile(page.absolute, "utf8"));

const messages = Object.fromEntries([...sourceStrings].sort((a, b) => a.localeCompare(b)).map((text) => [text, text]));
await fs.mkdir(path.join(root, "i18n", "messages"), { recursive: true });
await fs.writeFile(
  path.join(root, "i18n", "messages", "en.json"),
  `${JSON.stringify({ _meta: { locale: "en", sourcePages: pages.length, generatedAt: new Date().toISOString() }, messages }, null, 2)}\n`,
  "utf8",
);

console.log(`Extracted ${sourceStrings.size} strings from ${pages.length} English pages.`);
