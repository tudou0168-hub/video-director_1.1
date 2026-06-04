import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(new URL("../../", import.meta.url).pathname);
const source = process.argv[2] || "/Users/muzi/Downloads/IMG_8136.mov";
const duration = Number(process.argv[3] || 60);
const assetsDir = path.join(projectRoot, "assets");

if (!fs.existsSync(source)) {
  console.error(`source video not found: ${source}`);
  process.exit(1);
}

fs.mkdirSync(assetsDir, { recursive: true });

const realOutput = path.join(assetsDir, "talking-head-real.mp4");
const videoOutput = path.join(assetsDir, "talking-head-input.mp4");
const audioOutput = path.join(assetsDir, "talking-head-audio-master.wav");

function run(label, args) {
  console.log(`\n${label}`);
  execFileSync("ffmpeg", ["-y", ...args], { stdio: "inherit" });
}

run("1/3 re-encode real reference with stable 30fps", [
  "-i", source,
  "-t", String(duration),
  "-map", "0:v:0",
  "-map", "0:a:0?",
  "-c:v", "libx264",
  "-pix_fmt", "yuv420p",
  "-r", "30",
  "-g", "30",
  "-keyint_min", "30",
  "-sc_threshold", "0",
  "-preset", "medium",
  "-crf", "18",
  "-c:a", "aac",
  "-ar", "48000",
  "-ac", "2",
  "-movflags", "+faststart",
  realOutput
]);

run("2/3 export video-only layer for HyperFrames", [
  "-i", realOutput,
  "-t", String(duration),
  "-map", "0:v:0",
  "-an",
  "-c:v", "copy",
  "-movflags", "+faststart",
  videoOutput
]);

run("3/3 export exact-duration mono audio master", [
  "-i", realOutput,
  "-t", String(duration),
  "-map", "0:a:0",
  "-vn",
  "-af", `loudnorm=I=-16:TP=-1.5:LRA=11,apad=pad_dur=0.2,atrim=0:${duration},asetpts=N/SR/TB`,
  "-ar", "48000",
  "-ac", "1",
  "-c:a", "pcm_s16le",
  audioOutput
]);

console.log("\nmedia prepared:");
console.log(`- ${path.relative(projectRoot, realOutput)}`);
console.log(`- ${path.relative(projectRoot, videoOutput)}`);
console.log(`- ${path.relative(projectRoot, audioOutput)}`);
