const re = /^\/[^/]+\.[a-z0-9]+(?:[?#].*)?$/i;
const tests = ["/sitemap.xml", "/robots.txt", "/privacy/", "/fr/sitemap.xml/", "/contact/", "/favicon.ico"];
const out = tests.map((t) => `${t} => ${re.test(t)}`).join("\n");
require("node:fs").writeFileSync("tmp/regex_test.txt", out, "utf8");
console.log("ok");
