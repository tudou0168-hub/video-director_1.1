# Verification Checklist

## Before Editing

- Read `AGENTS.md`.
- Read `.codex/project-rules.md`.
- Identify whether the task affects docs, prompts, timeline, runtime, components, or validation.
- Check current Git status.

## Docs And Prompt Changes

- File has a clear purpose.
- Template is directly copyable.
- Chinese is the default language.
- Forbidden patterns are listed.
- Verification steps are included.
- No duplicate or conflicting rules were introduced.

Minimum check:

```bash
npm run check:creator-overlay
```

## Video Runtime Changes

Run:

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

## Snapshot Review

Open `snapshots/contact-sheet.jpg` locally and confirm:

- TopSectionLabel visible.
- StepBadge visible.
- One main visual center per keyframe.
- HUD is transparent line-frame, not thick card.
- Chinese subtitles only.
- Face and subtitle safe zones are clear.
- Main visual changes every 5-8 seconds.

## SuperDesign / Keyframe Review

- Use `docs/ai-workflow/superdesign-keyframe-workflow.md` before major visual changes.
- Confirm the 8 keyframes have a main visual center.
- Keep keyframe images and design drafts local only.

## Optional Context Pack

Use `scripts/pack_context.sh` or `docs/ai-workflow/repomix-context-pack.md` only when handing context to another agent. The output must stay under `work-repomix/`.

## Git Check

```bash
git ls-files | rg -n '\\.(mp4|mov|m4a|mp3|wav|png|jpg|jpeg|webp|gif)$' || true
rg -n 'Authorization: Bearer|Bearer [A-Za-z0-9_-]{20,}' . || true
```

Expected: no tracked media, no secrets.
