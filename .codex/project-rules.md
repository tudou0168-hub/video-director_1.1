# Codex Project Rules

This is the lightweight ECC layer for `video-director`.

## Best-Fit ECC Strategy

Use ECC ideas, not ECC weight.

Adopt:

- research-first development
- project-specific `AGENTS.md`
- skill-based workflow
- verification loops
- security and dependency caution
- multi-file change discipline
- reusable prompt templates

Do not adopt by default:

- external ECC hooks
- global memory systems
- broad agent fleets
- generic software rules unrelated to P008
- copied ECC directories

## Task Workflow

1. Locate the relevant rule files and implementation files.
2. Identify the smallest useful change.
3. Modify code, rules, or prompts.
4. Run project checks.
5. Record warnings and next manual checks.

## Rule Priority

1. Current user instruction.
2. `AGENTS.md`.
3. Final Creator Overlay rules.
4. V0.4 reference distillation.
5. V0.5 template pack.
6. Existing project code and tests.
7. External references.

## Verification Loop

For any video-generation change, run:

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

For docs/prompt-only changes, run at least:

```bash
npm run check:creator-overlay
```

## Security And Asset Rules

- Do not commit tokens, API keys, or local credentials.
- Do not commit media artifacts.
- Use real proof screenshots only when available.
- Mark missing assets as `TODO_ASSET_REQUIRED` or `DEMO_RENDER_SNAPSHOT`.
- Do not invent fake platform UI.

## Prompt Rules

- Chinese first.
- Include input variables.
- Include output format.
- Include forbidden patterns.
- Include verification criteria.
- Keep templates directly copyable.
