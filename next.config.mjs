import fs from "node:fs";
import path from "node:path";
import { locales } from "./i18n/config.mjs";

function collectHtmlRewrites(directory, base = "") {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.posix.join(base, entry.name);
    const absolute = path.join(directory, entry.name);

    if (entry.isDirectory()) return collectHtmlRewrites(absolute, relative);
    if (entry.name !== "index.html") return [];

    const routeDirectory = path.posix.dirname(relative);
    const source = routeDirectory === "." ? "/" : `/${routeDirectory}`;
    return [{ source, destination: `/site/${relative}` }];
  });
}

const nextConfig = {
  trailingSlash: true,
  async redirects() {
    const localizedPrefixes = new Set(locales.map((locale) => `/${locale.code}`));
    const englishRoutes = collectHtmlRewrites(path.join(process.cwd(), "public", "site"))
      .map((rewrite) => rewrite.source)
      .filter((source) => ![...localizedPrefixes].some((prefix) => source === prefix || source.startsWith(`${prefix}/`)));
    return [
      { source: "/inquiry", destination: "/en/contact/", permanent: true },
      ...englishRoutes.map((source) => ({ source, destination: source === "/" ? "/en/" : `/en${source}/`, permanent: true })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: collectHtmlRewrites(path.join(process.cwd(), "public", "site")),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
