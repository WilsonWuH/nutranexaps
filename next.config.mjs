import fs from "node:fs";
import path from "node:path";
import { locales } from "./i18n/config.mjs";

function collectHtmlRewrites(directory) {
  if (!fs.existsSync(directory)) return [];

  const sections = fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  // Every generated page is stored as <section>/<path>/index.html. Two rules
  // per top-level section preserve those routes while staying below Vercel's
  // 2,048-route limit. Assets, sitemaps, and /api are outside /site and are
  // therefore not intercepted by these section-specific rules.
  return [
    { source: "/", destination: "/site/index.html" },
    ...sections.flatMap((section) => [
      { source: `/${section}`, destination: `/site/${section}/index.html` },
      { source: `/${section}/:path*`, destination: `/site/${section}/:path*/index.html` },
    ]),
  ];
}

const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/inquiry", destination: "/contact/", permanent: true },
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
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
