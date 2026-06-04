# 13 Codex Execution Plan

## Before Editing

1. Read `AGENTS.md`.
2. Read rules `01` through `12`.
3. Restate hard constraints.
4. Identify files to modify.

## During Editing

- Keep changes scoped.
- Do not generate media outputs for Git.
- Do not render before snapshot.
- Keep HUD transparent and line-based.
- Keep subtitles Chinese-only.

## Required Checks

```bash
npm run check:creator-overlay
npm run validate
npm run validate:components
npm run validate:proof-assets
npm run validate:media-sync
npx hyperframes lint
npm run snapshot:creator60
npx hyperframes inspect
```

## Failure Loop

Any failure means fix CSS, registry, timeline, or component rules, then rerun checks. Render only after snapshot score is 85+.
