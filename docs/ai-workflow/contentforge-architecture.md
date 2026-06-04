# ContentForge / P008 Architecture

`video-director` is the video product line inside the broader ContentForge idea.

## System Layers

```text
Knowledge / script / subtitle
-> storyboard
-> component registry
-> scene recipe
-> timeline.json
-> HyperFrames runtime
-> snapshot
-> inspect
-> render
```

## Main Directories

| Directory | Role |
|---|---|
| `AI_VIDEO_COMPONENT_LIBRARY/` | Components, rules, compiler, validators |
| `VIDEO_SYSTEM_V04_REFERENCE_DISTILLATION/` | Reference image to visual grammar |
| `VIDEO_SYSTEM_V05_CREATOR_TEMPLATE_PACK/` | Template pack and component specs |
| `VIDEO_SYSTEM_FINAL_CREATOR_OVERLAY/` | Final production rules and audits |
| `docs/ai-workflow/` | Codex and workflow docs |
| `prompts/` | Copyable task and content templates |
| `.codex/` | Project-specific Codex rules |
| `scripts/` | Compliance and timeline checks |

## Runtime Path

`timeline.json` is the active video-generation contract. It must declare:

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

`index.html` reads these fields and renders the visual modules.

## Product Rule

The system should become a sellable template asset. Keep it:

- understandable
- runnable
- documented
- low-maintenance
- media-artifact free in Git
