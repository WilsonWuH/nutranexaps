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
      { source: "/ko/quality-control/", destination: "/ko/quality-rd/", permanent: true },
      { source: "/tr/quality-control/", destination: "/tr/quality-rd/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://formsubmit.co https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com; form-action 'self' https://formsubmit.co" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
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
