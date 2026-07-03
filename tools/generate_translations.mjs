import fs from "node:fs/promises";
import path from "node:path";
import { localeConfig, locales, protectedTerms } from "../i18n/config.mjs";

const root = process.cwd();
const messagesDir = path.join(root, "i18n", "messages");
const source = JSON.parse(await fs.readFile(path.join(messagesDir, "en.json"), "utf8"));
const requestedProvider = process.argv.find((argument) => argument.startsWith("--provider="))?.split("=")[1];
const requestedLocales = process.argv.find((argument) => argument.startsWith("--locales="))?.split("=")[1]?.split(",");
const overwrite = process.argv.includes("--overwrite");
const targets = locales.filter((locale) => locale.code !== "en" && (!requestedLocales || requestedLocales.includes(locale.code)));

const provider = requestedProvider || (process.env.DEEPL_API_KEY ? "deepl" : process.env.GOOGLE_TRANSLATE_API_KEY ? "google-cloud" : null);
if (!provider) {
  throw new Error("Choose --provider=google-public for the one-time bootstrap, or configure DEEPL_API_KEY / GOOGLE_TRANSLATE_API_KEY.");
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sortedTerms = [...protectedTerms].sort((a, b) => b.length - a.length);

function protect(text) {
  let output = text;
  const terms = [];
  for (const term of sortedTerms) {
    const expression = new RegExp(escapeRegExp(term), "g");
    if (!expression.test(output)) continue;
    const token = `[[8300${String(terms.length).padStart(3, "0")}]]`;
    terms.push(term);
    output = output.replace(expression, token);
  }
  return { text: output, terms };
}

function restore(text, terms) {
  return terms.reduce((output, term, index) => output.replaceAll(`[[8300${String(index).padStart(3, "0")}]]`, term), text).trim();
}

function repairLegacyTokens(english, translated) {
  const { terms } = protect(english);
  return translated.replace(/\[\[[^\]\d]+?(\d+)\]\]/g, (token, rawIndex) => terms[Number(rawIndex)] || token);
}

function batches(entries, maxCharacters = 1500) {
  const result = [];
  let current = [];
  let characters = 0;
  for (const entry of entries) {
    const size = entry.protected.text.length + 20;
    if (current.length && characters + size > maxCharacters) {
      result.push(current);
      current = [];
      characters = 0;
    }
    current.push(entry);
    characters += size;
  }
  if (current.length) result.push(current);
  return result;
}

async function fetchWithRetry(url, options, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(700 * attempt);
    }
  }
  throw lastError;
}

async function translateGooglePublic(batch, locale) {
  const joined = batch.map((entry, index) => `[[NX${index}]] ${entry.protected.text}`).join("\n");
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${locale.googleCode}&dt=t&q=${encodeURIComponent(joined)}`;
  const payload = await (await fetchWithRetry(url)).json();
  const translated = payload[0].map((part) => part[0]).join("");
  const parsed = new Map();
  const expression = /\[\[NX(\d+)\]\]\s*([\s\S]*?)(?=\n\[\[NX\d+\]\]|$)/g;
  for (const match of translated.matchAll(expression)) parsed.set(Number(match[1]), match[2].trim());
  if (parsed.size !== batch.length) {
    const translations = [];
    for (const entry of batch) {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${locale.googleCode}&dt=t&q=${encodeURIComponent(entry.protected.text)}`;
      const payload = await (await fetchWithRetry(url)).json();
      translations.push(restore(payload[0].map((part) => part[0]).join(""), entry.protected.terms));
      await sleep(120);
    }
    return translations;
  }
  return batch.map((entry, index) => restore(parsed.get(index), entry.protected.terms));
}

async function translateGoogleCloud(batch, locale) {
  const response = await fetchWithRetry(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: batch.map((entry) => entry.protected.text), source: "en", target: locale.googleCode, format: "text" }),
  });
  const payload = await response.json();
  return payload.data.translations.map((item, index) => restore(item.translatedText, batch[index].protected.terms));
}

async function translateDeepL(batch, locale) {
  const response = await fetchWithRetry("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ text: batch.map((entry) => entry.protected.text), source_lang: "EN", target_lang: locale.deeplCode }),
  });
  const payload = await response.json();
  return payload.translations.map((item, index) => restore(item.text, batch[index].protected.terms));
}

async function translateBatch(batch, locale) {
  if (provider === "google-public") return translateGooglePublic(batch, locale);
  if (provider === "google-cloud") return translateGoogleCloud(batch, locale);
  if (provider === "deepl") return translateDeepL(batch, locale);
  throw new Error(`Unsupported translation provider: ${provider}`);
}

for (const locale of targets) {
  const outputPath = path.join(messagesDir, `${locale.code}.json`);
  let existing = { messages: {} };
  if (!overwrite) {
    try {
      existing = JSON.parse(await fs.readFile(outputPath, "utf8"));
    } catch {
      // Generate a new dictionary when no previous file exists.
    }
  }

  const translatedMessages = overwrite
    ? {}
    : Object.fromEntries(Object.entries(existing.messages || {}).map(([english, translated]) => [english, repairLegacyTokens(english, translated)]));
  const entries = Object.keys(source.messages)
    .filter((english) => overwrite || !translatedMessages[english])
    .map((english) => ({ english, protected: protect(english) }));
  if (!entries.length) {
    console.log(`Skipped ${locale.code}; dictionary is already complete.`);
    continue;
  }
  const groups = batches(entries);

  for (let index = 0; index < groups.length; index += 1) {
    const group = groups[index];
    const translations = await translateBatch(group, localeConfig(locale.code));
    group.forEach((entry, itemIndex) => {
      translatedMessages[entry.english] = translations[itemIndex];
    });
    console.log(`${locale.code}: translated batch ${index + 1}/${groups.length}`);
    if (provider === "google-public") await sleep(300);
  }

  await fs.writeFile(
    outputPath,
    `${JSON.stringify({ _meta: { locale: locale.code, sourceLocale: "en", provider, generatedAt: new Date().toISOString(), humanReviewRequired: true }, messages: translatedMessages }, null, 2)}\n`,
    "utf8",
  );
}
