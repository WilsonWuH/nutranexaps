import fs from "node:fs/promises";
import path from "node:path";
import { locales } from "../i18n/config.mjs";

// Assemble the Cloudflare Pages deployment directory (out/) from the static
// HTML produced by `npm run generate`. Cloudflare Pages serves this directory
// directly: no Next.js, no rewrites — the generated tree IS the site.
//
// Redirect/header policies that next.config.mjs provides on Vercel are
// emitted here as Cloudflare's _redirects / _headers files.

const root = process.cwd();
const outDir = path.join(root, "out");

const explicitPageDirectories = [
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
];

// Cloudflare Pages deploys out/ as a plain static tree (no rewrites, no
// Functions). Any root directory containing an index.html is therefore a
// published section and MUST be copied, or every URL under it silently falls
// back to the homepage. Discovering them here prevents new axes from being
// omitted the way /solutions/ and /who-we-serve/ were after the three-axis
// upgrade. The explicit list and the locale list stay as a safety net for
// directories that exist without their own index.html.
const ignoredDirectories = new Set([
  ".git", ".github", ".next", ".vercel", ".playwright-cli",
  "assets", "config", "content", "i18n", "node_modules", "out", "public", "tmp", "tools",
]);
const discoveredPageDirectories = [];
for (const entry of await fs.readdir(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith(".") || ignoredDirectories.has(entry.name)) continue;
  try {
    await fs.access(path.join(root, entry.name, "index.html"));
  } catch {
    continue;
  }
  discoveredPageDirectories.push(entry.name);
}

const pageDirectories = [...new Set([
  ...explicitPageDirectories,
  ...locales.map((locale) => locale.code),
  ...discoveredPageDirectories,
])].sort();

const redirects = `# Migrated from next.config.mjs redirects()
/inquiry /contact/ 301
/en / 301
/en/* /:splat 301
/ko/quality-control/ /ko/quality-rd/ 301
/tr/quality-control/ /tr/quality-rd/ 301
`;

const headers = `/*
  Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://formsubmit.co https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com; form-action 'self' https://formsubmit.co
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Referrer-Policy: strict-origin-when-cross-origin
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
`;

await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

await fs.copyFile(path.join(root, "index.html"), path.join(outDir, "index.html"));
await fs.cp(path.join(root, "assets"), path.join(outDir, "assets"), { recursive: true });

for (const directory of pageDirectories) {
  const source = path.join(root, directory);
  // The default locale (en) lives at the site root since the duplicate /en/
  // tree was removed, so some locale directories may not exist. Skip them
  // instead of crashing the Cloudflare build with ENOENT.
  try {
    await fs.access(source);
  } catch {
    continue;
  }
  await fs.cp(source, path.join(outDir, directory), { recursive: true });
}

const rootFiles = await fs.readdir(root);
for (const file of rootFiles.filter((name) => name === "robots.txt" || /^sitemap(?:-[a-z-]+)?\.xml$/.test(name))) {
  await fs.copyFile(path.join(root, file), path.join(outDir, file));
}

await fs.writeFile(path.join(outDir, "_redirects"), redirects, "utf8");
await fs.writeFile(path.join(outDir, "_headers"), headers, "utf8");

console.log("Assembled Cloudflare Pages output in out/.");
