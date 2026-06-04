# 15 Rule Implementation Audit

Date: 2026-05-27

This audit maps the three source rule documents into the running HyperFrames video system.

## Source Rule Priority

1. Final engineer rules: `HyperFrames 口播视频包装系统工程师.md`
2. Reference distillation rules: `Codex 学到的是抽象规则V0.4.md`
3. V0.5 template pack: `V0.5参考图级口播包装模板库.md`

If older V0.5 wording conflicts with final engineer rules, the final rules win. The known conflict is subtitles: V0.5 references bilingual subtitles in places, but final rules require Chinese-only subtitles. The implementation uses `BottomChineseSubtitle` only.

## Implemented Rules

| Source Rule | Implementation |
|---|---|
| Reference images must become visual grammar, not raw copying | `VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/` defines five reference classes, grammar, layout, type, color, module mapping, and scoring. |
| Ten reference-grade Creator Overlay templates | `VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/02_template_registry.md` registers all ten templates. |
| Required component specs | `VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/components_to_build/` contains all required component specs plus `BottomChineseSubtitle`. |
| No thick Dashboard cards | CSS HUD backgrounds are constrained to low-alpha line-frame surfaces; compliance script checks non-caption HUD alpha. |
| TopSectionLabel and StepBadge | `timeline.json` declares both in every active segment; `index.html` renders them inside creator scenes. |
| Big Chinese visual center | `BigKineticTitle`, `MegaNumber`, `OptionSplitCard`, tables, proof panels, and CTA components are registered and timeline-driven. |
| Pure Chinese captions | `BottomChineseSubtitle` is registered and required; English subtitle fields and `BottomBilingualSubtitle` are forbidden by compliance checks. |
| Snapshot before render | `package.json` includes validation, lint, snapshot, and inspect scripts; README documents snapshot-first flow. |
| Timeline drives video generation | `timeline.json` contains `template`, `components`, `component_props`, `safe_zone`, `animation`, and `snapshotAt`; `index.html` reads these fields to render components. |
| No media artifacts in Git | `.gitignore` excludes video/audio/image/render artifacts; compliance script checks tracked media files. |

## Active Video Generation Path

```text
rules -> registry -> recipe -> timeline.json -> index.html runtime -> snapshot -> inspect -> render
```

The active `timeline.json` uses `AI_Content_System_60s`, `talking_head_overlay`, and P008 product metadata. The current sample uses eight checkpoints (`1s / 6s / 14s / 24s / 32s / 40s / 48s / 56s`) so the main visual rhythm stays within the 5-8 second rule. Each segment is required to include:

- `start`
- `end`
- `template`
- `component`
- `component_props`
- `components`
- `caption_line`
- `subtitleCN`
- `safe_zone`
- `animation`
- `snapshotAt`

## Automated Checks

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

The compliance check now verifies both rule existence and active timeline wiring.

## Current Known Gap

`ProofScreenshotOverlay` still uses a demo proof asset marker in the current sample timeline. This is intentional for the template stage. Product-quality videos must replace it with a real output screenshot before final publishing.
