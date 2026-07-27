# Implementation tasks

1. **Create public module boundaries** — complete
   - Add core, viewers, markdown, and CAD barrels; make the root barrel an
     aggregate re-export.
   - Verify: `bun run typecheck:package`.

2. **Configure granular build outputs** — complete
   - Convert Vite library mode to explicit entries and CSS splitting; restrict
     declaration emit to the public entry graph.
   - Verify: `bun run build`.

3. **Emit semantic CSS and external WOFF2 assets** — complete
   - Separate base/tokens/fonts/KaTeX and copy only selected WOFF2 files; write
     aggregate compatibility CSS.
   - Verify: `bun test tests/packageExports.test.ts`.

4. **Expose and document the contract** — complete
   - Add package exports, package-scoped scripts, README migration examples,
     and a built-artifact contract test.
   - Verify: `bun pm pack --dry-run`.

5. **Full verification and measurement** — complete
   - Run frozen install, build, package-scoped typecheck/lint, all tests,
     package dry-run, `git diff --check`, and inspect status/output sizes.
   - Verify: all commands pass or pre-existing full-repo failures are reported
     separately from the package result.
