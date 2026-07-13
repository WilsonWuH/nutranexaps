import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
const base = process.env.MARKET_TEST_BASE_URL || "http://127.0.0.1:3100";
const outDir = path.resolve("qa", "markets");
const routes = ["/ko/", "/tr/", "/ko/contact/", "/tr/contact/"];
const results = [];
const errors = [];

await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });

for (const route of routes) {
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  const data = await page.evaluate(() => ({
    title: document.title,
    lang: document.documentElement.lang,
    h1: document.querySelector("h1")?.textContent?.trim(),
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    imagesWithoutAlt: [...document.images].filter((image) => !image.hasAttribute("alt") || !image.alt.trim()).length,
    forms: document.querySelectorAll("form").length,
  }));
  if (!response?.ok()) errors.push(`${route} returned ${response?.status()}`);
  if (!data.h1 || data.horizontalOverflow || data.imagesWithoutAlt) errors.push(`${route} failed layout/content checks`);
  await page.screenshot({ path: path.join(outDir, `${route.split("/").filter(Boolean).join("-") || "home"}-desktop.png`), fullPage: true });
  results.push({ route, viewport: "desktop", status: response?.status(), ...data });
}

await page.setViewportSize({ width: 390, height: 844 });
for (const route of ["/ko/", "/tr/", "/ko/contact/", "/tr/contact/"]) {
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  await page.locator(".nav-toggle").click();
  const data = await page.evaluate(() => ({
    navOpen: document.querySelector("#market-nav")?.classList.contains("open"),
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    overflowing: [...document.querySelectorAll("body *")].filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0, 8).map((element) => ({ tag: element.tagName, className: element.className, text: element.textContent?.trim().slice(0, 80), right: Math.round(element.getBoundingClientRect().right), width: Math.round(element.getBoundingClientRect().width) })),
    buttonWidth: document.querySelector(".button")?.getBoundingClientRect().width,
    viewportWidth: document.documentElement.clientWidth,
  }));
  if (!response?.ok() || !data.navOpen || data.horizontalOverflow || data.buttonWidth > data.viewportWidth) errors.push(`${route} failed mobile checks`);
  await page.screenshot({ path: path.join(outDir, `${route.split("/").filter(Boolean).join("-") || "home"}-mobile.png`), fullPage: true });
  results.push({ route, viewport: "mobile", status: response?.status(), ...data });
}

const invalidResponse = await page.request.post(`${base}/api/inquiry`, { data: { Locale: "ko", Email: "not-an-email" } });
if (invalidResponse.status() !== 400) errors.push(`server validation returned ${invalidResponse.status()}, expected 400`);

await browser.close();
const report = { passed: errors.length === 0, results, serverValidationStatus: invalidResponse.status(), screenshots: outDir, errors };
await fs.writeFile(path.join(outDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
