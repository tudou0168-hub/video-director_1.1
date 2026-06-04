#!/usr/bin/env bash
set -euo pipefail

mkdir -p work-repomix

npx repomix \
  --output work-repomix/video-director-context.md \
  --ignore "node_modules,outputs,snapshots,test-assets,assets,*.mp4,*.mov,*.mp3,*.wav,*.png,*.jpg,*.jpeg,*.webp,*.gif"

echo "context pack written to work-repomix/video-director-context.md"
