import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { probeAudioDuration } from "./probe-audio-duration.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const sourceArg = process.argv[2] || "samples/final_narration.md";
const sourcePath = path.resolve(projectRoot, sourceArg);
const assetsDir = path.join(projectRoot, "assets");
const outputAudioPath = path.join(assetsDir, "narration-master.wav");
const outputMetaPath = path.join(assetsDir, "tts_result.json");
const tempMp3Path = path.join(assetsDir, "narration-master.tts.mp3");
const provider = "edge-tts";
const voice = process.env.NARRATION_TTS_VOICE || "zh-CN-YunyangNeural";

function toPosixRelative(absPath) {
  return path.relative(projectRoot, absPath).split(path.sep).join("/");
}

function fail(message) {
  console.error(`tts generation failed: ${message}`);
  process.exit(1);
}

function assertCommandAvailable(command, args, message) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.error || result.status !== 0) {
    fail(message);
  }
}

function run(command, args, label) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.error) {
    fail(`${label} could not start: ${result.error.message}`);
  }
  if (result.status !== 0) {
    const stderr = result.stderr ? String(result.stderr).trim() : "";
    const stdout = result.stdout ? String(result.stdout).trim() : "";
    const details = [stderr, stdout].filter(Boolean).join("\n");
    fail(`${label} exited with code ${result.status}${details ? `\n${details}` : ""}`);
  }
  return result;
}

if (!fs.existsSync(sourcePath)) {
  fail(`source narration file not found: ${sourceArg}`);
}

assertCommandAvailable(provider, ["--version"], "no TTS provider available on PATH. expected edge-tts for the minimal narration pipeline.");
assertCommandAvailable("ffmpeg", ["-version"], "ffmpeg is required to convert the narration audio into a master WAV.");
assertCommandAvailable("ffprobe", ["-version"], "ffprobe is required to read the real audio duration.");

fs.mkdirSync(assetsDir, { recursive: true });

try {
  if (fs.existsSync(tempMp3Path)) fs.rmSync(tempMp3Path);
  if (fs.existsSync(outputAudioPath)) fs.rmSync(outputAudioPath);
  if (fs.existsSync(outputMetaPath)) fs.rmSync(outputMetaPath);

  console.log(`using provider: ${provider} (${voice})`);
  console.log(`source narration: ${toPosixRelative(sourcePath)}`);
  console.log(`temp media: ${toPosixRelative(tempMp3Path)}`);
  console.log(`final audio: ${toPosixRelative(outputAudioPath)}`);

  run(provider, [
    "-f",
    sourcePath,
    "-v",
    voice,
    "--write-media",
    tempMp3Path
  ], "edge-tts");

  run("ffmpeg", [
    "-y",
    "-i",
    tempMp3Path,
    "-ac",
    "1",
    "-ar",
    "48000",
    "-c:a",
    "pcm_s16le",
    outputAudioPath
  ], "ffmpeg audio conversion");

  const duration = probeAudioDuration(outputAudioPath);
  const payload = {
    source_text_path: toPosixRelative(sourcePath),
    audio_path: toPosixRelative(outputAudioPath),
    duration,
    voice,
    generated_at: new Date().toISOString(),
    provider
  };

  fs.writeFileSync(outputMetaPath, JSON.stringify(payload, null, 2));

  console.log(`generated audio: ${toPosixRelative(outputAudioPath)}`);
  console.log(`generated tts metadata: ${toPosixRelative(outputMetaPath)}`);
  console.log(`duration=${duration}`);
} catch (error) {
  if (fs.existsSync(outputAudioPath)) fs.rmSync(outputAudioPath);
  if (fs.existsSync(outputMetaPath)) fs.rmSync(outputMetaPath);
  fail(error instanceof Error ? error.message : String(error));
} finally {
  if (fs.existsSync(tempMp3Path)) fs.rmSync(tempMp3Path);
}
