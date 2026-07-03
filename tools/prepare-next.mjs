import fs from "node:fs/promises";
import path from "node:path";
import { locales } from "../i18n/config.mjs";

const root = process.cwd();
const publicDir = path.join(root, "public");
const siteDir = path.join(publicDir, "site");
const pageDirectories = [
  "about",
  "applications",
  "benefits",
  "cases",
  "contact",
  "manufacturing",
  "news",
  "privacy",
  "products",
  "quality-rd",
  "resources",
  "thank-you",
  ...locales.map((locale) => locale.code),
];

await fs.rm(publicDir, { recursive: true, force: true });
await fs.mkdir(siteDir, { recursive: true });

await fs.copyFile(path.join(root, "index.html"), path.join(siteDir, "index.html"));
await fs.cp(path.join(root, "assets"), path.join(publicDir, "assets"), { recursive: true });

for (const directory of pageDirectories) {
  await fs.cp(path.join(root, directory), path.join(siteDir, directory), { recursive: true });
}

for (const file of ["robots.txt", "sitemap.xml"]) {
  await fs.copyFile(path.join(root, file), path.join(publicDir, file));
}

console.log("Prepared Nutranexa static pages for Next.js.");
