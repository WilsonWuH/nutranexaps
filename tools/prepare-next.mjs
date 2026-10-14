import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { locales } from "../i18n/config.mjs";

const root = process.cwd();
const publicDir = path.join(root, "public");
const siteDir = path.join(publicDir, "site");
const controlledAssetPaths = new Set([
  path.normalize(path.join(root, "assets", "images", "doc-fda-food-facility-registration.webp")),
]);
const pageDirectories = [
  "about",
  "applications",
  "benefits",
  "cases",
  "company-verification",
  "contact",
  "manufacturing",
  "news",
  "privacy",
  "products",
  "quality-rd",
  "resources",
  "science",
  "thank-you",
  ...locales.map((locale) => locale.code),
];

await fs.rm(publicDir, { recursive: true, force: true });
await fs.mkdir(siteDir, { recursive: true });

await fs.copyFile(path.join(root, "index.html"), path.join(siteDir, "index.html"));
await fs.cp(path.join(root, "assets"), path.join(publicDir, "assets"), {
  recursive: true,
  filter: (source) => !controlledAssetPaths.has(path.normalize(source)),
});

for (const directory of pageDirectories) {
  const source = path.join(root, directory);
  // The default locale (en) has no directory of its own: English pages are
  // served from the site root and /en/:path* is 301-redirected there. Skip
  // any page directory that does not exist instead of failing the build.
  if (!existsSync(source)) continue;
  await fs.cp(source, path.join(siteDir, directory), { recursive: true });
}

const rootFiles = await fs.readdir(root);
for (const file of rootFiles.filter((name) => name === "robots.txt" || /^sitemap(?:-[a-z-]+)?\.xml$/.test(name))) {
  await fs.copyFile(path.join(root, file), path.join(publicDir, file));
}

console.log("Prepared Nutranexa static pages for Next.js.");
