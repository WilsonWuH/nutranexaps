import fs from "node:fs";
const lines = [];
const endpoints = [
  ["api-edge-auth", "https://api.edge.microsoft.com/translate/auth"],
  ["edge-translator", "https://edge.microsoft.com/translator/auth"],
];
for (const [name, url] of endpoints) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const r = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    const body = await r.text();
    lines.push(`${name}: HTTP ${r.status} | ${body.slice(0, 80).replace(/\n/g, " ")}`);
  } catch (e) {
    lines.push(`${name}: FAIL ${String(e.cause || e).slice(0, 100)}`);
  }
}
fs.writeFileSync("tmp/net_result2.txt", lines.join("\n"), "utf8");
