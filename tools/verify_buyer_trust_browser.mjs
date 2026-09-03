import { chromium } from "playwright";

const baseUrl = process.env.BUYER_TRUST_BASE_URL || "http://127.0.0.1:3200";
const viewports = [
  { width: 1440, height: 1000 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];
const routes = ["/", "/quality-rd/", "/company-verification/", "/contact/?request=qualification-pack"];
const consoleErrors = [];
const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(`${viewport.width}px: ${message.text()}`);
    });
    for (const route of routes) {
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      if (!response || response.status() !== 200) throw new Error(`${route}: expected HTTP 200`);
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      if (hasOverflow) throw new Error(`${route}: horizontal overflow at ${viewport.width}px`);
      const bodyText = await page.locator("body").innerText();
      if (bodyText.includes("Baianrui")) throw new Error(`${route}: old English company name remains`);
    }
    await page.close();
  }

  const qualityPage = await browser.newPage();
  await qualityPage.goto(`${baseUrl}/quality-rd/`, { waitUntil: "networkidle" });
  if (await qualityPage.locator('img[src*="doc-fda-food-facility-registration"]').count()) {
    throw new Error("Third-party FDA registrar image remains in the public document gallery");
  }
  const schema = JSON.parse(await qualityPage.locator('script[type="application/ld+json"]').textContent());
  const organization = schema.find((entry) => entry["@type"] === "Organization");
  if (organization?.name !== "Shandong Nutranexa Biopharmaceutical Co., Ltd." || organization?.alternateName !== "Nutranexa") {
    throw new Error("Organization identity schema does not use the approved English name");
  }
  if (organization.legalName || organization.sameAs) throw new Error("Organization schema restored an unapproved legalName or sameAs assertion");
  await qualityPage.close();

  if (consoleErrors.length) throw new Error(`Console errors:\n${consoleErrors.join("\n")}`);
  console.log("Buyer trust browser verification passed: 12 responsive page combinations, identity schema, public-document policy, and console checks.");
} finally {
  await browser.close();
}
