import fs from "node:fs";

let out = [];
try {
  await import("../tools/localize_site.mjs");
  out.push("IMPORT COMPLETED OK");
} catch (err) {
  out.push("IMPORT FAILED:");
  out.push(err && err.stack ? err.stack : String(err));
}
fs.writeFileSync("D:/Projects/nutranexaps/tmp/localize_result.txt", out.join("\n"), "utf8");
process.exit(0);
