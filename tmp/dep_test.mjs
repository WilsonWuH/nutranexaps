import fs from "node:fs";
let msg = [];
try {
  const cheerio = await import("cheerio");
  msg.push("cheerio loaded: " + typeof cheerio.load);
} catch (err) {
  msg.push("cheerio FAILED: " + String(err));
}
try {
  const config = await import("../i18n/config.mjs");
  msg.push("i18n config loaded: " + config.locales.length + " locales");
} catch (err) {
  msg.push("i18n config FAILED: " + String(err));
}
try {
  const indexing = await import("../config/seo/indexing.mjs");
  msg.push("indexing loaded: " + indexing.sitemapFiles.length + " sitemap files");
} catch (err) {
  msg.push("indexing FAILED: " + String(err));
}
fs.writeFileSync("D:/Projects/nutranexaps/tmp/dep_result.txt", msg.join("\n"), "utf8");
console.log("deps test done");
