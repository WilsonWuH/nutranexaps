import fs from "node:fs/promises";

const dir = "i18n/messages";
const en = JSON.parse(await fs.readFile(`${dir}/en.json`, "utf8"));
const enKeys = Object.keys(en.messages);
const report = [`en: ${enKeys.length} keys`];

for (const code of ["es", "pt", "fr", "ar", "ru", "ko", "tr"]) {
  const dict = JSON.parse(await fs.readFile(`${dir}/${code}.json`, "utf8"));
  const keys = Object.keys(dict.messages || {});
  const missing = enKeys.filter((k) => !dict.messages[k]);
  // count keys whose value is identical to English (untranslated fallback copies)
  const identical = keys.filter((k) => dict.messages[k] === en.messages[k]);
  report.push(`${code}: ${keys.length} keys, missing ${missing.length}, identical-to-en ${identical.length}`);
}
await fs.writeFile("tmp/dict_report.txt", report.join("\n"), "utf8");
console.log("done");
