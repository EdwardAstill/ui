# Ideal package architecture

## Purpose

The `ui` package supplies domain-neutral React controls, workbench layout,
theming, document viewers, and CAD viewers. Consumers must be able to select
the capability and styling they use without paying for unrelated viewers,
renderers, or font formats.

## Inputs

- React 19 supplied by the consuming application.
- Package-owned TypeScript/React components and CSS Modules.
- Package-owned `--ps-*` design tokens.
- Optional viewer dependencies and assets for document and CAD features.
- A build that can emit JavaScript, declarations, CSS, and static assets.

## Outputs

- A backwards-compatible root JavaScript entry point.
- Granular JavaScript entry points for core controls, document viewers, and
  CAD viewers.
- Granular public CSS entry points for tokens/base styles, optional fonts,
  core component styles, document-viewer styles, and CAD-viewer styles.
- External WOFF2 font assets referenced from CSS, with no embedded WOFF or TTF
  duplicates.
- Type declarations and package metadata that make every public subpath
  resolvable by TypeScript, Vite, Bun, and Node-compatible ESM tooling.

## Invariants

- Existing `import { ... } from 'ui'` remains valid.
- Existing `import 'ui/dist/ui.css'` remains valid during migration.
- React remains a peer dependency and is not bundled.
- Core JavaScript entry points do not import CAD or document-viewer modules.
- Core CSS does not contain KaTeX, CAD, or document-viewer styling.
- CSS entry points compose in a documented order and do not rely on app-level
  Tailwind configuration.
- Public files referenced by package exports are present in a packed artifact.

## Capabilities

- Consumers can load only core components and their styles.
- Consumers can opt into document viewers and CAD viewers independently.
- Consumers can choose packaged fonts or retain system fallbacks.
- Existing consumers can continue using the aggregate root JS and CSS while
  migrating.
- Maintainers can verify package exports, asset references, and absence of
  embedded multi-format fonts automatically.

## Target boundaries

```text
ui                        aggregate compatibility JS entry
ui/core                   themes, controls, layout, workspace
ui/viewers                drawing, CSV, code, text, and PDF viewers
ui/markdown               Markdown + math viewer
ui/cad                    DXF and STEP viewers

ui/styles/tokens.css      variables/theme token packs
ui/styles/base.css        reset/base rules
ui/styles/fonts.css       optional external WOFF2 faces
ui/styles/core.css        controls/layout/workspace CSS
ui/styles/viewers.css     document/drawing viewer CSS
ui/styles/cad.css         CAD viewer CSS
ui/styles/katex.css       optional KaTeX CSS + external WOFF2 references
ui/styles.css             aggregate compatibility stylesheet
```

Entry points must form a one-way dependency graph: `core` stands alone;
`viewers`, `markdown`, and `cad` may reuse core utilities, but core must never
depend on an optional layer. Markdown is isolated from ordinary viewers so
KaTeX and MarkdownIt remain opt-in. The aggregate entry may re-export all
layers for compatibility.

## Build and release model

Use explicit multi-entry library outputs so tree-shaking does not depend on a
single monolithic source barrel. Preserve assets rather than data-URL inlining;
font CSS should reference emitted WOFF2 files. Package `exports` is the public
contract and should expose stable semantic subpaths instead of build-tool
filenames. A contract test should pack or inspect the built package, resolve
each exported path, and reject embedded font payloads and missing CSS assets.

## Success criteria

- Existing root imports build unchanged.
- Core-only imports do not resolve or bundle CAD/viewer dependencies.
- Granular CSS is emitted and the aggregate stylesheet remains available.
- Only WOFF2 font files are shipped, referenced externally.
- Public-contract tests plus the repository's build, typecheck, lint, and test
  commands pass.
