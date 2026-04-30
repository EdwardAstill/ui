/**
 * Viz styles. Injected once by the unified web shell.
 *
 * Strategy:
 *   - `.viz-root` element holds the active theme's CSS variables
 *     (--bg, --text, --accent, --border, --card-bg, --input-bg,
 *     --text-muted, --font-body, --font-mono, etc. — set by the
 *     theme dropdown via inline style).
 *   - This stylesheet adds viz-specific tokens (--viz-grid,
 *     --viz-axis, --viz-trace, --viz-positive, --viz-negative,
 *     --viz-warn) defaulted from existing theme tokens so that
 *     every theme works out of the box.
 *   - Themes that want viz-aware colors can override these with
 *     more specific selectors (e.g. `[data-theme="cyberpunk"]
 *     .viz-root { --viz-trace: #00ffe0; }`).
 *   - All viz primitives consume only CSS variables — no
 *     hard-coded hexes.
 */
export const vizStyles = `
.viz-root {
  --viz-grid: var(--border);
  --viz-axis: var(--text-muted);
  --viz-trace: var(--accent);
  --viz-trace-2: var(--accent-2, var(--accent));
  --viz-positive: #10b981;
  --viz-negative: #ef4444;
  --viz-warn: #f59e0b;
  --viz-info: #3b82f6;
  --viz-violet: #8b5cf6;
  --viz-pink: #ec4899;

  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body, ui-sans-serif, system-ui, sans-serif);
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.viz-root-embedded {
  min-height: 100%;
  background: transparent;
}

.viz-panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}

.viz-panel-head h2 {
  font-size: 22px;
  font-weight: 650;
  margin: 0;
  color: var(--text);
  font-family: var(--font-display, inherit);
}

.viz-panel-head p,
.viz-panel-head span {
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-muted);
}

.viz-panel-head p {
  margin-top: 4px;
}

.viz-panel-head span {
  max-width: 420px;
  text-align: right;
}

.viz-picker {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 0 20px;
  border-bottom: 1px solid var(--border);
}

.viz-picker-group {
  display: grid;
  grid-template-columns: minmax(120px, 160px) 1fr;
  gap: 12px;
  align-items: start;
}

.viz-picker-items {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.viz-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 32px;
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius, 6px);
  background: var(--input-bg, var(--card-bg));
  color: var(--text);
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  line-height: 1.2;
}

.viz-chip:hover {
  border-color: var(--accent);
}

.viz-chip.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-weight: 650;
}

.viz-chip .viz-emoji {
  width: 16px;
  text-align: center;
}

.viz-main-embedded {
  padding: 24px 0 0;
  overflow: visible;
  background: transparent;
}

@media (max-width: 800px) {
  .viz-panel-head {
    flex-direction: column;
  }

  .viz-panel-head span {
    max-width: none;
    text-align: left;
  }

  .viz-picker-group {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}

.viz-app {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.viz-app aside.viz-sidebar {
  width: 240px;
  min-width: 240px;
  height: 100vh;
  background: var(--sidebar-bg, var(--bg));
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 18px 0 0;
  overflow-y: auto;
}

.viz-sidebar-header {
  padding: 0 18px 14px;
  border-bottom: 1px solid var(--border);
}

.viz-sidebar-header h1 {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
}

.viz-sidebar-header p {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 4px;
  opacity: 0.75;
}

.viz-sidebar-section {
  padding: 12px 18px 4px;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.6;
}

.viz-sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-muted);
  font-family: inherit;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  transition: background 0.12s, color 0.12s;
}

.viz-sidebar-item:hover {
  background: var(--input-bg, var(--border));
  color: var(--text);
}

.viz-sidebar-item.active {
  background: var(--accent);
  color: #fff;
}

.viz-sidebar-item .viz-emoji {
  font-size: 14px;
  width: 18px;
  text-align: center;
}

.viz-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--card-bg, var(--bg));
  flex-shrink: 0;
}

.viz-topbar label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.viz-topbar select {
  background: var(--input-bg);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 6px 10px;
  border-radius: 4px;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
  min-width: 180px;
}

.viz-main {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  background: var(--bg);
}

.viz-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
  font-size: 14px;
}

/* ── Shell ── */
.viz-shell {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius, 12px);
  padding: 22px;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--text);
}

.viz-shell-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 4px;
}

.viz-shell-head h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
  font-family: var(--font-display, inherit);
}

.viz-shell-meta {
  display: flex;
  gap: 12px;
  align-items: baseline;
  flex-wrap: wrap;
}

.viz-sub {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 0 0 14px;
}

/* ── Section Label ── */
.viz-section-label {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}

/* ── Stage (frame around SVG) ── */
.viz-stage {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius, 10px);
  padding: 8px;
  overflow: hidden;
  max-width: 100%;
}

/* ── Panel ── */
.viz-panel {
  flex: 1;
  min-width: 240px;
}

/* ── Buttons ── */
.viz-btn {
  font-size: 12px;
  padding: 6px 12px;
  border-radius: var(--radius, 6px);
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  border: 1px solid var(--border);
  background: var(--input-bg);
  color: var(--text);
  transition: background 0.1s, color 0.1s, border-color 0.1s, filter 0.1s;
}

.viz-btn:hover { filter: brightness(1.1); }
.viz-btn:active { filter: brightness(0.92); }

.viz-btn-primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  font-weight: 600;
  padding: 8px 14px;
}

.viz-btn-tag {
  font-size: 11px;
  padding: 4px 9px;
  background: transparent;
  color: var(--text-muted);
}

.viz-btn-tag:hover {
  background: var(--input-bg);
  color: var(--text);
}

.viz-btn-ghost {
  background: transparent;
}

.viz-btn-active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

/* ── Slider ── */
.viz-slider-row {
  margin-bottom: 14px;
  min-width: 140px;
}

.viz-slider-head {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 4px;
  color: var(--text-muted);
}

.viz-slider-value {
  font-family: var(--font-mono, ui-monospace, monospace);
  color: var(--text);
}

.viz-slider-unit {
  color: var(--text-muted);
  margin-left: 4px;
  font-weight: normal;
}

.viz-slider-row input[type="range"] {
  width: 100%;
  accent-color: var(--accent);
}

/* ── Tabs ── */
.viz-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.viz-tab {
  font-size: 12px;
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius, 6px);
  background: var(--input-bg);
  color: var(--text-muted);
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: background 0.1s, color 0.1s;
}

.viz-tab:hover {
  color: var(--text);
}

.viz-tab.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

/* ── Stat ── */
.viz-stat {
  display: inline-flex;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
  align-items: baseline;
}

.viz-stat-value {
  font-family: var(--font-mono, ui-monospace, monospace);
  color: var(--text);
  font-weight: 600;
}

/* ── LegendDot ── */
.viz-legend-dot {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted);
}

.viz-legend-dot .viz-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

/* ── Notice ── */
.viz-notice {
  margin-top: 16px;
  padding: 12px 14px;
  background: var(--input-bg);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius, 4px);
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.55;
}

.viz-notice strong { color: var(--text); }

/* ── Layout helpers ── */
.viz-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.viz-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.viz-stat-row {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

input[type="checkbox"] { accent-color: var(--accent); }

/* ── Theme switcher buttons in topbar ── */
.viz-theme-row {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
}

.viz-theme-chip {
  font-size: 11px;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--input-bg);
  color: var(--text-muted);
  cursor: pointer;
  font-family: inherit;
}

.viz-theme-chip.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
`;
