# Repomix Context Pack

Repomix is optional. It is useful when handing the project to another agent or asking for an architectural review.

## Recommended Command

```bash
mkdir -p work-repomix
npx repomix \
  --output work-repomix/video-director-context.md \
  --ignore "node_modules,outputs,snapshots,test-assets,assets,*.mp4,*.mov,*.mp3,*.wav,*.png,*.jpg,*.jpeg,*.webp,*.gif"
```

`work-repomix/` matches the existing `work-*` ignore rule, so the generated context pack stays local.

## What To Include

- `AGENTS.md`
- `.codex/project-rules.md`
- `docs/ai-workflow/`
- `prompts/`
- `AI_VIDEO_COMPONENT_LIBRARY/`
- `VIDEO_SYSTEM_*`
- `scripts/`
- `timeline.json`
- `index.html`
- `package.json`

## What To Exclude

- video files
- audio files
- screenshots
- snapshots
- render outputs
- browser profiles
- credentials

## Use Cases

- Hand off implementation to another agent.
- Ask for a rule consistency review.
- Share project context without media artifacts.
