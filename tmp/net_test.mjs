import fs from "node:fs";
const lines = [];
const endpoints = [
  ["github", "https://api.github.com/zen"],
  ["bing-token", "https://edge.microsoft.com/translate/auth"],
  ["bing-www", "https://www.bing.com/"],
  ["cnbing", "https://cn.bing.com/"],
  ["mymemory", "https://api.mymemory.translated.net/get?q=hello&langpair=en|es"],
  ["gclients5", "https://clients5.google.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=hi"],
  ["deepl", "https://api-free.deepl.com/v2/usage"],
];
for (const [name, url] of endpoints) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const r = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    const body = await r.text();
    lines.push(`${name}: HTTP ${r.status} | ${body.slice(0, 60).replace(/\n/g, " ")}`);
  } catch (e) {
    lines.push(`${name}: FAIL ${String(e.cause || e).slice(0, 100)}`);
  }
}
fs.writeFileSync("tmp/net_result.txt", lines.join("\n"), "utf8");
