import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(new URL("../../", import.meta.url).pathname);
const file = process.argv[2] || path.join(projectRoot, "timeline.json");
const timeline = JSON.parse(fs.readFileSync(file, "utf8"));
const errors = [];
const warnings = [];

function durationOf(relativePath) {
  if (!relativePath) return null;
  const fullPath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`media file does not exist: ${relativePath}`);
    return null;
  }
  const output = execFileSync("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    fullPath
  ], { encoding: "utf8" }).trim();
  return Number(output);
}

function check(label, relativePath, tolerance = 2) {
  const duration = durationOf(relativePath);
  if (!Number.isFinite(duration)) return;
  const delta = Math.abs(duration - timeline.duration);
  if (delta > tolerance) {
    errors.push(`${label} duration mismatch: ${relativePath}=${duration.toFixed(3)}s, timeline=${timeline.duration.toFixed(3)}s`);
  } else if (delta > 0.5) {
    warnings.push(`${label} duration close but not exact: ${duration.toFixed(3)}s vs ${timeline.duration.toFixed(3)}s`);
  }
}

check("video", timeline.media?.video);
check("audio", timeline.media?.audio);

if (warnings.length > 0) {
  console.warn("media sync warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length > 0) {
  console.error("media sync validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`media sync ok: ${file}`);
