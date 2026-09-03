import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { companyIdentity } from "../config/trust/company.mjs";

const root = process.cwd();
const excludedDirectories = new Set([".git", ".next", "node_modules", "public", "assets", "apps", "config", "content", "docs", "qa", "tmp"]);
const deprecatedNames = [
  "Shandong Baianrui Biopharmaceutical Co., Ltd.",
  "산둥 백안루이 바이오제약유한회사",
  "바이안루이",
  "백루이",
];
const errors = [];
let htmlCount = 0;
let organizationCount = 0;

async function findHtmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await findHtmlFiles(absolute)));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(absolute);
  }
  return files;
}

function visitSchema(value, file, primaryCandidate = true) {
  if (Array.isArray(value)) {
    for (const item of value) visitSchema(item, file, primaryCandidate);
    return;
  }
  if (!value || typeof value !== "object") return;
  const types = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
  if (primaryCandidate && types.includes("Organization")) {
    organizationCount += 1;
    if (value.name !== companyIdentity.englishCompanyName || value.alternateName !== companyIdentity.publicName) {
      errors.push(`${file}: Organization must use the approved full name and Nutranexa alternateName`);
    }
    if (value.legalName || value.sameAs) errors.push(`${file}: Organization contains an unapproved legalName or sameAs assertion`);
  }
  for (const [key, child] of Object.entries(value)) visitSchema(child, file, key === "@graph");
}

for (const file of await findHtmlFiles(root)) {
  htmlCount += 1;
  const relative = path.relative(root, file);
  const html = await fs.readFile(file, "utf8");
  for (const deprecatedName of deprecatedNames) {
    if (html.includes(deprecatedName)) errors.push(`${relative}: deprecated company name remains (${deprecatedName})`);
  }
  const $ = load(html, { decodeEntities: false });
  $("script[type='application/ld+json']").each((_, element) => {
    try {
      visitSchema(JSON.parse($(element).text()), relative);
    } catch (error) {
      errors.push(`${relative}: invalid JSON-LD (${error.message})`);
    }
  });
}

if (errors.length) {
  console.error(`Company identity verification failed:\n- ${errors.slice(0, 50).join("\n- ")}${errors.length > 50 ? `\n- ...and ${errors.length - 50} more` : ""}`);
  process.exit(1);
}

console.log(`Company identity verification passed: ${htmlCount} HTML files, ${organizationCount} Organization nodes, no deprecated company names.`);
