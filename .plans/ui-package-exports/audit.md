# Actual architecture audit

## Coverage

The package manifest, Vite config, declaration config, public barrel, global
styles, token stylesheet, Fontsource inputs, component import graph, CSS build
helper, README import examples, smoke tests, and existing `dist/` artifact were
audited. LSP and AST-grep tools are not available in this environment, so the
dependency map was produced with `rg` over every import in `src/components/`.

## Current flow

```text
src/index.ts
  -> src/styles.css
       -> tokens.css
       -> 6 Fontsource CSS files
  -> all core components
  -> all document viewers
       -> markdown-it + texmath + KaTeX CSS
  -> all CAD viewers
       -> dxf-viewer + Three.js

single Vite library entry
  -> dist/ui.es.js
  -> dist/ui.css
```

The fresh Vite phase emits a 3,652,188-byte JavaScript file and a
1,914,500-byte stylesheet. The stylesheet contains 72 embedded font data URLs:
26 WOFF2, 26 WOFF, and 20 TTF resources. The packed artifact is 5.78 MB
uncompressed.

## Comparison

| Category | Finding | Action |
|---|---|---|
| Optimal | React and ReactDOM are external peers. | Keep. |
| Optimal | CSS Modules already colocate component styling. | Reuse them as entry-specific CSS chunks. |
| Optimal | Root exports form a documented public API. | Retain as the compatibility aggregate. |
| Close | Viewers already have recognizable component boundaries and mostly shared viewer CSS. | Add explicit viewer and Markdown barrels. |
| Close | Fontsource provides the desired WOFF2 files. | Copy only the six used WOFF2 assets and generate a small optional stylesheet. |
| Different | One root entry eagerly reaches core, Markdown/KaTeX, DXF, and Three.js. | Add core, viewers, markdown, and cad build entries. |
| Different | Global CSS imports Fontsource and KaTeX into Vite library mode, which inlines every format. | Remove those imports from the Vite CSS graph; emit external WOFF2 assets and static CSS. |
| Different | Only `ui` and `ui/dist/ui.css` are exported. | Add semantic JS and CSS subpaths while preserving both legacy paths. |
| Different | Declaration generation includes unrelated terminal/showcase code and fails. | Limit the package declaration build to the public entry graph. |
| Dead | Multi-format WOFF/TTF files in the aggregate CSS are redundant for supported modern consumers. | Do not emit or reference them. |

## Baseline verification

- `bun install --frozen-lockfile`: passes with no changes.
- `bun test`: 68 pass, 0 fail.
- `bun run typecheck`: fails on existing design-lab, terminal, and web showcase
  errors outside the package entry graph.
- `bun run lint`: fails with 69 existing errors and 78 warnings, primarily in
  terminal and showcase sources.
- `bun run build`: Vite succeeds, then declaration generation fails because
  `tsconfig.build.json` includes all of `src/`, including the same unrelated
  terminal/showcase errors.

