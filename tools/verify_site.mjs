import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire("C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js");
const { chromium } = require("playwright");

const outDir = path.resolve("qa");
const base = "http://127.0.0.1:4173";
const routes = ["/", "/products/phosphatidylserine/", "/contact/", "/resources/phosphatidylserine-guide/"];

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
const results = [];

for (const route of routes) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  const title = await page.title();
  const h1 = await page.locator("h1").first().innerText();
  const ctas = await page.locator("a,button").evaluateAll((els) =>
    els
      .filter((el) => /Request|Contact|Submit|Specs|Quote/i.test(el.textContent || ""))
      .map((el) => el.textContent.trim())
      .slice(0, 8),
  );
  const jsonLdCount = await page.locator('script[type="application/ld+json"]').count();
  const screenshotName = route === "/" ? "home-desktop.png" : `${route.replaceAll("/", "_")}desktop.png`;
  await page.screenshot({ path: path.join(outDir, screenshotName), fullPage: true });
  results.push({ route, title, h1, ctas, jsonLdCount });
}

await page.setViewportSize({ width: 390, height: 900 });
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(outDir, "home-mobile.png"), fullPage: true });

await page.goto(base + "/contact/", { waitUntil: "networkidle" });
await page.fill('input[name="Name"]', "Test Buyer");
await page.fill('input[name="Email"]', "buyer@example.com");
await page.fill('input[name="Phone"]', "+1 555 123 4567");
await page.fill('input[name="Country"]', "United States");
await page.fill('input[name="Interest"]', "Phosphatidylserine (PS)");
await page.fill('textarea[name="Message"]', "Please send current specification and quotation.");
await Promise.all([page.waitForURL("**/thank-you/", { timeout: 10000 }), page.click('button[type="submit"]')]);
const finalUrl = page.url();
await page.screenshot({ path: path.join(outDir, "thank-you-mobile.png"), fullPage: true });

await browser.close();
console.log(JSON.stringify({ results, finalUrl, outDir }, null, 2));
