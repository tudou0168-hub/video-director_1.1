import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

export function probeAudioDuration(audioFile) {
  const resolved = path.resolve(audioFile);
  if (!fs.existsSync(resolved)) {
    throw new Error(`audio file not found: ${audioFile}`);
  }

  const probe = spawnSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    resolved
  ], { encoding: "utf8" });

  if (probe.error) {
    throw new Error(`ffprobe failed: ${probe.error.message}`);
  }

  if (probe.status !== 0) {
    const stderr = probe.stderr ? String(probe.stderr).trim() : "";
    throw new Error(`ffprobe failed for ${audioFile}${stderr ? `\n${stderr}` : ""}`);
  }

  const duration = Number.parseFloat(String(probe.stdout).trim());
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error(`invalid duration reported by ffprobe for ${audioFile}`);
  }

  return duration;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: node scripts/probe-audio-duration.mjs <audio-file>");
    process.exit(1);
  }
  try {
    console.log(probeAudioDuration(file));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
