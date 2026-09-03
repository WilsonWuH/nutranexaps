import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

const root = path.resolve(".");
const skipDirectories = new Set([".git", ".next", "node_modules", "public"]);
const htmlFiles = [];
const productFiles = [];
const parseErrors = [];

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && skipDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(absolute);
  }
}

function containsProductSchema(value) {
  if (Array.isArray(value)) return value.some(containsProductSchema);
  if (!value || typeof value !== "object") return false;
  const type = value["@type"];
  if (type === "Product" || (Array.isArray(type) && type.includes("Product"))) return true;
  return Object.values(value).some(containsProductSchema);
}

await walk(root);
for (const file of htmlFiles) {
  const $ = load(await fs.readFile(file, "utf8"), { decodeEntities: false });
  for (const element of $("script[type='application/ld+json']").toArray()) {
    try {
      if (containsProductSchema(JSON.parse($(element).text()))) productFiles.push(path.relative(root, file));
    } catch {
      parseErrors.push(path.relative(root, file));
    }
  }
}

if (parseErrors.length || productFiles.length) {
  if (parseErrors.length) console.error(`Invalid JSON-LD found in ${parseErrors.length} HTML file(s).`);
  if (productFiles.length) console.error(`Product JSON-LD found in: ${[...new Set(productFiles)].join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files; Product JSON-LD: 0.`);
}
