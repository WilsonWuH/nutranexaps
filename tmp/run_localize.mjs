import { spawnSync } from "node:child_process";
import fs from "node:fs";

const node = process.execPath;
const result = spawnSync(node, ["tools/localize_site.mjs"], {
  cwd: process.cwd(),
  encoding: "utf8",
  timeout: 300000,
});
const report = [
  `status: ${result.status}`,
  `error: ${result.error ? String(result.error) : "none"}`,
  "--- STDOUT (last 2000 chars) ---",
  (result.stdout || "").slice(-2000),
  "--- STDERR (last 3000 chars) ---",
  (result.stderr || "").slice(-3000),
].join("\n");
fs.writeFileSync("D:/Projects/localize_err.txt", report, "utf8");
