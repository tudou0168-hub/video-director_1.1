import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const candidate = path.join(root, "AI_VIDEO_COMPONENT_LIBRARY/examples/audio_master/compiled.timeline.json");
const target = path.join(root, "timeline.json");
const backup = path.join(root, "timeline.backup.local.json");

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run") || !args.has("--apply");
const apply = args.has("--apply");

function run(command, commandArgs) {
  execFileSync(command, commandArgs, { cwd: root, stdio: "inherit" });
}

function ensureCandidate() {
  if (!fs.existsSync(candidate)) {
    throw new Error(`candidate timeline not found: ${path.relative(root, candidate)}`);
  }
}

function validateCandidate() {
  run("node", ["scripts/validate-timeline.mjs", path.relative(root, candidate)]);
  run("node", ["AI_VIDEO_COMPONENT_LIBRARY/scripts/validate-component-usage.mjs", path.relative(root, candidate)]);
  run("node", ["scripts/validate-timeline-contract.mjs", path.relative(root, candidate)]);
  run("node", ["scripts/check_creator_overlay_compliance.js", path.relative(root, candidate)]);
}

function promote() {
  fs.copyFileSync(target, backup);
  fs.copyFileSync(candidate, target);
}

try {
  ensureCandidate();
  validateCandidate();

  if (dryRun) {
    console.log(`dry-run ok: ${path.relative(root, candidate)} is eligible for promotion`);
    process.exit(0);
  }

  if (!apply) {
    throw new Error("use --dry-run or --apply");
  }

  promote();
  console.log(`promoted ${path.relative(root, candidate)} -> ${path.relative(root, target)}`);
  console.log(`backup written: ${path.relative(root, backup)}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
