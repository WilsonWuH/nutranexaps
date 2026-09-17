import fs from "node:fs";
const out = [];
try {
  const o = await import("../i18n/overrides.mjs");
  out.push("overrides loaded: " + Object.keys(o.translationOverrides).length + " locales");
} catch (e) { out.push("overrides FAILED: " + String(e)); }
try {
  const c = await import("../config/trust/company.mjs");
  out.push("company loaded: " + Object.keys(c).length + " exports");
} catch (e) { out.push("company FAILED: " + String(e)); }
fs.writeFileSync("tmp/imp2_result.txt", out.join("\n"), "utf8");
console.log("done");
