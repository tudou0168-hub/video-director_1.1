import fs from "node:fs";

const file = process.argv[2] || "timeline.json";
let timeline;

try {
  timeline = JSON.parse(fs.readFileSync(file, "utf8"));
} catch (error) {
  console.error(`timeline contract failed: unable to read or parse ${file}`);
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const errors = [];
const EPS_START = 0.05;
const EPS_END = 0.1;

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function add(message) {
  errors.push(message);
}

if (!isNumber(timeline.duration) || timeline.duration <= 0) {
  add("timeline.duration must be a positive number");
}

if (!Array.isArray(timeline.segments) || timeline.segments.length === 0) {
  add("segments must be a non-empty array");
}

if (!Array.isArray(timeline.snapshot_at)) {
  add("snapshot_at must be an array");
}

const segments = Array.isArray(timeline.segments) ? timeline.segments : [];
const snapshotAtSet = new Set(Array.isArray(timeline.snapshot_at) ? timeline.snapshot_at : []);
const snapshotAtList = Array.isArray(timeline.snapshot_at) ? timeline.snapshot_at : [];

if (segments.length > 0) {
  const firstStart = segments[0]?.start;
  if (!isNumber(firstStart)) {
    add("first segment start must be a number");
  } else if (Math.abs(firstStart - 0) > EPS_START) {
    add(`first segment start must be within ${EPS_START}s of 0 (got ${firstStart})`);
  }

  const lastEnd = segments[segments.length - 1]?.end;
  if (!isNumber(lastEnd)) {
    add("last segment end must be a number");
  } else if (isNumber(timeline.duration) && Math.abs(lastEnd - timeline.duration) > EPS_END) {
    add(`last segment end must be within ${EPS_END}s of timeline.duration (end=${lastEnd}, duration=${timeline.duration})`);
  }
}

let previousEnd = null;
segments.forEach((segment, index) => {
  const prefix = `segments[${index}]`;
  const { start, end, snapshotAt, caption_line: captionLine } = segment || {};

  if (!isNumber(start)) {
    add(`${prefix}.start must be a number`);
  }

  if (!isNumber(end)) {
    add(`${prefix}.end must be a number`);
  }

  if (isNumber(start) && isNumber(end) && end <= start) {
    add(`${prefix}.end must be greater than start`);
  }

  if (isNumber(start) && start < 0) {
    add(`${prefix}.start must be non-negative`);
  }

  if (isNumber(end) && end < 0) {
    add(`${prefix}.end must be non-negative`);
  }

  if (isNumber(timeline.duration) && isNumber(start) && start > timeline.duration) {
    add(`${prefix}.start exceeds timeline.duration`);
  }

  if (isNumber(timeline.duration) && isNumber(end) && end > timeline.duration + EPS_END) {
    add(`${prefix}.end exceeds timeline.duration`);
  }

  if (isNumber(snapshotAt) && isNumber(timeline.duration) && snapshotAt > timeline.duration + EPS_END) {
    add(`${prefix}.snapshotAt exceeds timeline.duration`);
  }

  if (!captionLine || String(captionLine).trim() === "") {
    add(`${prefix}.caption_line must be non-empty`);
  }

  if (isNumber(start) && previousEnd !== null && start < previousEnd - EPS_START) {
    add(`${prefix} overlaps previous segment`);
  }

  if (isNumber(end)) {
    previousEnd = end;
  }

  if (isNumber(snapshotAt) && !snapshotAtSet.has(snapshotAt)) {
    add(`${prefix}.snapshotAt ${snapshotAt} is not listed in snapshot_at`);
  }
});

if (Array.isArray(timeline.snapshot_at)) {
  const seen = new Set();
  let previous = null;
  timeline.snapshot_at.forEach((value, index) => {
    const prefix = `snapshot_at[${index}]`;

    if (!isNumber(value)) {
      add(`${prefix} must be a number`);
      return;
    }

    if (value < 0) {
      add(`${prefix} must be non-negative`);
    }

    if (isNumber(timeline.duration) && value > timeline.duration + EPS_END) {
      add(`${prefix} exceeds timeline.duration`);
    }

    if (seen.has(value)) {
      add(`${prefix} is duplicated`);
    }
    seen.add(value);

    if (previous !== null && value < previous) {
      add(`snapshot_at must be sorted ascending (${prefix} is out of order)`);
    }
    previous = value;
  });
}

if (errors.length > 0) {
  console.error("timeline contract failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("timeline contract ok");
