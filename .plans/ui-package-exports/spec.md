# Granular package exports specification

## Goal

Let applications consume core UI, document viewers, Markdown, and CAD
independently, and replace the monolithic embedded font payload with optional
external WOFF2 assets.

## Public contract

- Keep `ui` and `ui/dist/ui.css` working.
- Add `ui/core`, `ui/viewers`, `ui/markdown`, and `ui/cad`.
- Add `ui/styles.css` plus `ui/styles/{tokens,base,fonts,core,viewers,cad,katex}.css`.
- Root JavaScript remains an aggregate re-export and does not inject CSS.
- `ui/styles.css` is a backwards-compatible aggregate importing every style
  layer. Granular consumers explicitly select the style layers they need.

## Practical target

The ideal boundary is adjusted in two ways after the audit:

1. Markdown is separate from ordinary viewers because KaTeX and MarkdownIt are
   materially heavier than the CSV/text/PDF/drawing components.
2. Vite produces component CSS chunks, while a post-build asset step emits the
   stable semantic CSS wrappers and external font files. This avoids Vite
   library mode's unconditional asset inlining without adding another bundler.

## Non-goals

- No component behavior or visual redesign.
- No dependency upgrades or publishing.
- No changes to consuming repositories or local dependency wiring.
- No cleanup of unrelated terminal/showcase type and lint failures.

## Acceptance criteria

- Every documented package export resolves to a built file and declaration.
- The root entry still exposes all prior exports.
- The core entry contains no CAD, Three.js, MarkdownIt, or KaTeX implementation.
- Public CSS contains no embedded font data URLs and references no WOFF/TTF.
- Exactly the required WOFF2 assets are shipped externally.
- Package build, package-scoped typecheck/lint, package tests, frozen install,
  export-contract tests, and `git diff --check` pass.
- Before/after sizes are recorded.

## Risks and rollback

- CSS chunk names can vary with Vite configuration. Contract tests must assert
  the stable output names.
- Existing aggregate CSS remains intentionally broad; consumers obtain the
  savings only after moving to granular imports.
- Rollback is the package manifest, multi-entry config, new barrels, and asset
  build script; no data migration is involved.

