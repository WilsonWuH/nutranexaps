import fs from "node:fs";
const md = fs.readFileSync("content/resources/2026-09-16-phosphatidylserine-incoterms-air-freight-shipping-us-eu.md", "utf8");
function metaValue(markdown, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return markdown.match(new RegExp(`^[-*] ${escaped}:\\s*([^\\r\\n]+)`, "mi"))?.[1]?.replace(/`/g, "").trim() || "";
}
const out = [];
out.push("URL Slug: [" + metaValue(md, "URL Slug") + "]");
out.push("SEO Title: [" + metaValue(md, "SEO Title") + "]");
out.push("Meta Description: [" + metaValue(md, "Meta Description") + "]");
out.push("has CRLF: " + md.includes("\r\n"));
const m = md.match(/^[-*] URL Slug.*$/mi);
out.push("raw slug line: " + JSON.stringify(m ? m[0] : null));
// compare with a working file
const md2 = fs.readFileSync("content/resources/2026-09-15-phosphatidylserine-coa-red-flags-audit-us-eu.md", "utf8");
out.push("working URL Slug: [" + metaValue(md2, "URL Slug") + "]");
fs.writeFileSync("tmp/metatest_result.txt", out.join("\n"), "utf8");
