import fs from "node:fs";

const timelinePath = process.argv[2] || "timeline.json";
const htmlPath = process.argv[3] || "index.html";

const timeline = JSON.parse(fs.readFileSync(timelinePath, "utf8"));
const duration = Number(timeline.duration);

if (!Number.isFinite(duration) || duration <= 0) {
  throw new Error(`Invalid timeline duration: ${timeline.duration}`);
}

let html = fs.readFileSync(htmlPath, "utf8");
html = html.replace(/(<div id="root"[^>]*data-duration=")[^"]+("[^>]*>)/, `$1${duration}$2`);
html = html.replace(/(<video id="talkingVideo"[^>]*data-duration=")[^"]+("[^>]*>)/, `$1${duration}$2`);
html = html.replace(/(<audio id="narration"[^>]*data-duration=")[^"]+("[^>]*>)/, `$1${duration}$2`);

const audioSrc = timeline.media?.audio || "";
const videoSrc = timeline.media?.video || "";
html = html.replace(/(<audio id="narration"[^>]*src=")[^"]*("[^>]*>)/, `$1${audioSrc}$2`);
html = html.replace(/(<video id="talkingVideo"[^>]*src=")[^"]*("[^>]*>)/, `$1${videoSrc}$2`);

fs.writeFileSync(htmlPath, html);
console.log(`synced ${htmlPath} static duration to ${duration}s`);
