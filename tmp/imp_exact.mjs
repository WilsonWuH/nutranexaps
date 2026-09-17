import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import { defaultLocale, localeConfig, localePath, locales, runtimeMessages } from "../i18n/config.mjs";
import { translationOverrides } from "../i18n/overrides.mjs";
import { companyIdentity } from "../config/trust/company.mjs";
import {
  indexableLocalesForRoute,
  sitemapLocalesForRoute,
  isRouteIndexable,
  sitemapFiles,
  sitemapGroup,
  englishOnlyRoutes,
  untranslatedEnglishOnlyRoutes,
} from "../config/seo/indexing.mjs";

console.log("ALL IMPORTS DONE, executing top-level");
fs.writeFile("tmp/imp_exact.txt", `imports done, cwd=${process.cwd()}`, "utf8").then(() => console.log("wrote marker"));
