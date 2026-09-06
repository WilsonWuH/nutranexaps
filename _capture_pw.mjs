import { chromium } from "playwright";

const pages = [
  ["http://127.0.0.1:8123/manufacturing/", "C:/Users/Administrator/.zcode/workspace/default/nx-mfg-full.png"],
  ["http://127.0.0.1:8123/quality-rd/", "C:/Users/Administrator/.zcode/workspace/default/nx-quality-full.png"],
  ["http://127.0.0.1:8123/", "C:/Users/Administrator/.zcode/workspace/default/nx-home-full.png"],
  ["http://127.0.0.1:8123/products/phosphatidylserine-50/", "C:/Users/Administrator/.zcode/workspace/default/nx-ps50-full.png"],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [url, path] of pages) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      html { scroll-behavior: auto !important; }
      .site-header { position: static !important; }
      .whatsapp-float { display: none !important; }
      * { transition: none !important; animation: none !important; }
    `,
  });
  await page.evaluate(async () => {
    const step = 800;
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800);
  await page.screenshot({ path, fullPage: true });
  console.log("captured", path);
}
await browser.close();
