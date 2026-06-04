# 01 Reference Image Taxonomy

V0.4 is the reference-image distillation layer. It converts visual examples into reusable rules before V0.5 turns those rules into templates.

## Five Reference Classes

| Class | Visual Signal | Primary Upgrade Target | Use When |
|---|---|---|---|
| Big Word Impact | Huge Chinese title, keyword color, top label, person right/center | `BigKineticTitle`, `TopSectionLabel` | Hook, hard truth, result promise |
| Chart Explanation | Bars, line charts, progress, KPI numbers | `KPIBigNumberOverlay`, `ScoringDimensionPanel` | Efficiency, money, score, before/after |
| Comparison Card | Red vs blue, old path vs new path, VS split | `OptionSplitCard` | Wrong effort vs right system |
| Comment / Evidence | Quote, viewer comment, warning note, feedback card | `ProofScreenshotOverlay`, `TermExplainerPanel` | Trust, objections, user voice |
| Product / Case Proof | Screenshot stack, product steps, result gallery | `DetailsTableOverlay`, `ViralSourceCarousel` | Product proof, workflow demo, paid bridge |

## Selection Rule

Do not feed 40-50 raw images directly into Codex. Pick 3-5 representative examples for each class, annotate them, then generate component rules from the annotations.

## Hard Constraint

The target is not cyberpunk HUD. The target is creator packaging: readable, useful, high-density, and immediately tied to the spoken point.
