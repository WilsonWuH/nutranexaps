import fs from "node:fs";
import path from "node:path";
import { trustDocumentReview } from "../config/trust/documents.mjs";

const root = path.resolve(".");
const today = new Date().toISOString().slice(0, 10);
const renewalWindowDays = 120;
const errors = [];
const notices = [];

function isIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}

if (isIsoDate("2026-02-31") || isIsoDate("2026-13-01")) {
  errors.push("ISO date validator accepted an impossible calendar date");
}

if (!isIsoDate(trustDocumentReview.reviewedOn)) {
  errors.push("trustDocumentReview.reviewedOn must be an ISO date");
}

for (const document of trustDocumentReview.documents) {
  const imagePath = path.join(root, document.image.replace(/^\//, ""));
  if (!fs.existsSync(imagePath)) errors.push(`${document.title}: missing ${document.image}`);
  if (!document.text?.trim()) errors.push(`${document.title}: public description is empty`);
  if (!document.validThrough) continue;
  if (!isIsoDate(document.validThrough)) {
    errors.push(`${document.title}: invalid validThrough date ${document.validThrough}`);
    continue;
  }
  if (document.validThrough < today) {
    errors.push(`${document.title}: expired on ${document.validThrough}`);
    continue;
  }
  const daysRemaining = Math.ceil((Date.parse(`${document.validThrough}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000);
  if (daysRemaining <= renewalWindowDays) notices.push(`${document.title}: renewal review due in ${daysRemaining} days (${document.validThrough})`);
}

if (errors.length) {
  console.error(`Trust document verification failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Trust documents: ${trustDocumentReview.documents.length} files reviewed; review date ${trustDocumentReview.reviewedOn}; no expired dated documents.`);
for (const notice of notices) console.warn(`NOTICE: ${notice}`);
