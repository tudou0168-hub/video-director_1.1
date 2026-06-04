import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(new URL("../../", import.meta.url).pathname);
const file = process.argv[2] || path.join(projectRoot, "timeline.json");
const timeline = JSON.parse(fs.readFileSync(file, "utf8"));
const errors = [];
const warnings = [];

function resolveAsset(assetPath) {
  if (!assetPath || typeof assetPath !== "string") return null;
  if (assetPath.includes("..")) return null;
  if (!assetPath.startsWith("assets/") && !assetPath.startsWith("./assets/")) return null;
  return path.join(projectRoot, assetPath.replace(/^\.\//, ""));
}

for (const [index, segment] of (timeline.segments || []).entries()) {
  const component = segment.component || segment.visual_module;
  if (component !== "ProofScreenshotOverlay") continue;

  const props = segment.component_props || {};
  const assetPath = props.asset_path || "";
  const status = props.asset_status || "";

  if (!assetPath) {
    warnings.push(`segments[${index}] ProofScreenshotOverlay has no asset_path; fallback placeholder will be used`);
    continue;
  }

  const resolved = resolveAsset(assetPath);
  if (!resolved) {
    errors.push(`segments[${index}] asset_path must stay inside assets/: ${assetPath}`);
    continue;
  }

  if (!fs.existsSync(resolved)) {
    errors.push(`segments[${index}] asset_path does not exist: ${assetPath}`);
  }

  if (/TODO|DEMO/i.test(status)) {
    warnings.push(`segments[${index}] proof asset is not final: ${status}`);
  }
}

if (warnings.length > 0) {
  console.warn("proof asset warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length > 0) {
  console.error("proof asset validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`proof assets ok: ${file}`);
