import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { probeAudioDuration } from "./probe-audio-duration.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const resultArg = process.argv[2] || path.join(projectRoot, "assets/tts_result.json");
const resultPath = path.resolve(resultArg);
const schemaPath = path.join(projectRoot, "schemas/tts_result.schema.json");

function fail(message) {
  console.error("tts result validation failed:");
  console.error(`- ${message}`);
  process.exit(1);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function resolveRelative(baseFile, maybeRelativePath) {
  if (path.isAbsolute(maybeRelativePath)) return maybeRelativePath;
  const projectRelative = path.resolve(projectRoot, maybeRelativePath);
  if (fs.existsSync(projectRelative)) return projectRelative;
  return path.resolve(path.dirname(baseFile), maybeRelativePath);
}

if (!fs.existsSync(schemaPath)) {
  fail(`schema missing: ${path.relative(projectRoot, schemaPath)}`);
}

if (!fs.existsSync(resultPath)) {
  fail(`tts result file not found: ${path.relative(projectRoot, resultPath)}`);
}

let result;
try {
  result = JSON.parse(fs.readFileSync(resultPath, "utf8"));
} catch (error) {
  fail(`unable to parse JSON: ${error instanceof Error ? error.message : String(error)}`);
}

const requiredFields = ["source_text_path", "audio_path", "duration", "voice", "provider", "generated_at"];
for (const field of requiredFields) {
  if (!(field in result)) {
    fail(`missing required field: ${field}`);
  }
}

if (!isNonEmptyString(result.source_text_path)) fail("source_text_path must be a non-empty string");
if (!isNonEmptyString(result.audio_path)) fail("audio_path must be a non-empty string");
if (!isNonEmptyString(result.voice)) fail("voice must be a non-empty string");
if (!isNonEmptyString(result.provider)) fail("provider must be a non-empty string");
if (!isNonEmptyString(result.generated_at)) fail("generated_at must be a non-empty string");

if (typeof result.duration !== "number" || !Number.isFinite(result.duration) || result.duration <= 0) {
  fail("duration must be a positive number");
}

const audioPath = resolveRelative(resultPath, result.audio_path);
if (!fs.existsSync(audioPath)) {
  fail(`audio file not found: ${result.audio_path}`);
}

const probeDuration = probeAudioDuration(audioPath);
const delta = Math.abs(probeDuration - result.duration);
if (delta > 0.05) {
  fail(`duration mismatch: tts_result=${result.duration} ffprobe=${probeDuration} delta=${delta}`);
}

console.log("tts result ok");
