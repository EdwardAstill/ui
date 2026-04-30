import React, { useState } from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.bunny.net/css?family=geist:400,500,600&display=swap');
@import url('https://fonts.bunny.net/css?family=geist-mono:400,500&display=swap');

[data-theme="dock-pack"] {
  --bg: #0A0A0B;
  --panel: #0F0F10;
  --sidebar-bg: #0A0A0B;
  --card-bg: #111112;
  --input-bg: #161617;
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.15);
  --text: #E8E8E8;
  --text-dim: #9A9A9A;
  --text-muted: #6B6B6B;
  --text-subtle: #4A4A4A;
  --text-ghost: #3A3A3A;
  --accent: #FFFFFF;
  --accent-2: #1A1A1B;
  --ok: #4ade80;
  --fail: #f87171;
  --font-body: 'Geist', system-ui, -apple-system, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;
  --radius: 0px;
  --fs: 12px;
  --fs-sm: 11px;
  --fs-xs: 10px;
}

[data-theme="dock-pack"] .main-panel {
  padding: 0 !important;
  overflow: hidden !important;
}

/* ─────────── ROOT ─────────── */
[data-theme="dock-pack"] .dp-root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--fs);
  overflow: hidden;
}

[data-theme="dock-pack"] .dp-top-area {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

[data-theme="dock-pack"] .dp-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

/* ─────────── TOP BAR ─────────── */
[data-theme="dock-pack"] .dp-topbar {
  height: 40px;
  flex-shrink: 0;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
}
[data-theme="dock-pack"] .dp-topbar-title { font-weight: 500; color: var(--text); }
[data-theme="dock-pack"] .dp-topbar-sub {
  color: var(--text-subtle);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
}
[data-theme="dock-pack"] .dp-btn {
  padding: 4px 10px;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--border);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--fs-sm);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color .1s, background .1s, border-color .1s;
}
[data-theme="dock-pack"] .dp-btn:hover { color: var(--text); border-color: var(--border-strong); background: rgba(255,255,255,.04); }
[data-theme="dock-pack"] .dp-btn.on { color: var(--text); border-color: var(--border-strong); }
[data-theme="dock-pack"] .dp-btn .kbd { color: var(--text-subtle); font-family: var(--font-mono); margin-left: 8px; font-size: 10px; }

/* ─────────── ICON RAIL (left edge) ─────────── */
[data-theme="dock-pack"] .dp-icons {
  width: 48px;
  flex-shrink: 0;
  background: var(--bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 2px;
}
[data-theme="dock-pack"] .dp-icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  position: relative;
  transition: color .1s, background .1s;
}
[data-theme="dock-pack"] .dp-icon-btn:hover { color: var(--text); background: rgba(255,255,255,.06); }
[data-theme="dock-pack"] .dp-icon-btn.active { color: var(--accent); background: rgba(255,255,255,.1); }
[data-theme="dock-pack"] .dp-icon-btn.active::before {
  content: "";
  position: absolute;
  left: -2px; top: 6px; bottom: 6px;
  width: 2px;
  background: var(--accent);
}
[data-theme="dock-pack"] .dp-icon-divider { width: 24px; height: 1px; background: var(--border); margin: 6px 0; }
[data-theme="dock-pack"] .dp-icon-spacer { flex: 1; }

/* ─────────── SESSION LIST (Claude Pack) ─────────── */
[data-theme="dock-pack"] .dp-sessions {
  width: 220px;
  flex-shrink: 0;
  background: var(--panel);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
[data-theme="dock-pack"] .dp-section-head {
  height: 32px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: var(--fs-sm);
  color: var(--text-subtle);
  background: rgba(255,255,255,.02);
}
[data-theme="dock-pack"] .dp-section-head .ct { color: var(--text-ghost); font-family: var(--font-mono); margin-left: auto; }
[data-theme="dock-pack"] .dp-session {
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  position: relative;
  cursor: pointer;
  transition: background .1s;
}
[data-theme="dock-pack"] .dp-session:hover { background: rgba(255,255,255,.02); }
[data-theme="dock-pack"] .dp-session.open { background: rgba(255,255,255,.04); }
[data-theme="dock-pack"] .dp-session.open::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: var(--accent);
}
[data-theme="dock-pack"] .dp-row1 { display: flex; align-items: center; gap: 8px; }
[data-theme="dock-pack"] .dp-name { font-weight: 500; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
[data-theme="dock-pack"] .dp-row2 { display: flex; align-items: center; gap: 6px; margin-top: 4px; font-size: var(--fs-sm); color: var(--text-muted); }
[data-theme="dock-pack"] .dp-row3 { margin-top: 5px; font-size: var(--fs-sm); color: var(--text-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
[data-theme="dock-pack"] .dp-branch { font-family: var(--font-mono); color: var(--text-dim); }
[data-theme="dock-pack"] .dp-chips { display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap; }
[data-theme="dock-pack"] .dp-chip {
  padding: 1px 6px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: var(--fs-xs);
  line-height: 1.5;
}
[data-theme="dock-pack"] .dp-chip.on { color: var(--text); border-color: var(--border-strong); background: rgba(255,255,255,.04); }
[data-theme="dock-pack"] .dp-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; background: var(--text-subtle); }
[data-theme="dock-pack"] .dp-dot.ok { background: var(--ok); }
[data-theme="dock-pack"] .dp-dot.attn { background: var(--accent); }
[data-theme="dock-pack"] .dp-dot.err { background: transparent; border: 1px solid var(--text); }
[data-theme="dock-pack"] .dp-runner {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  padding: 0 4px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  line-height: 1.4;
}
[data-theme="dock-pack"] .dp-bar { height: 2px; background: rgba(255,255,255,.05); margin-top: 6px; }
[data-theme="dock-pack"] .dp-bar > div { height: 100%; background: var(--text-dim); }

/* ─────────── TREE SIDEBAR ─────────── */
[data-theme="dock-pack"] .dp-tree-sidebar {
  width: 220px;
  flex-shrink: 0;
  background: var(--panel);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
[data-theme="dock-pack"] .dp-tree-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}
[data-theme="dock-pack"] .dp-tree-node {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 16px;
  font-size: var(--fs);
  color: var(--text-dim);
  cursor: pointer;
  transition: background .08s, color .08s;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-family: var(--font-body);
}
[data-theme="dock-pack"] .dp-tree-node:hover { background: rgba(255,255,255,.04); color: var(--text); }
[data-theme="dock-pack"] .dp-tree-node.selected { background: rgba(255,255,255,.08); color: var(--accent); }
[data-theme="dock-pack"] .dp-tree-node.folder { color: #C8C8C8; font-weight: 500; }
[data-theme="dock-pack"] .dp-tree-chevron { color: var(--text-subtle); width: 12px; text-align: center; flex-shrink: 0; }
[data-theme="dock-pack"] .dp-tree-icon { width: 16px; text-align: center; flex-shrink: 0; }
[data-theme="dock-pack"] .dp-tree-count { margin-left: auto; color: var(--text-subtle); }

/* ─────────── PANEL FRAMING ─────────── */
[data-theme="dock-pack"] .dp-panels {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
  gap: 1px;
  background: var(--border);
}
[data-theme="dock-pack"] .dp-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  background: var(--bg);
}
[data-theme="dock-pack"] .dp-panel-header {
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid var(--border);
  background: rgba(255,255,255,.02);
  gap: 8px;
}
[data-theme="dock-pack"] .dp-panel-label { color: var(--text-muted); font-size: var(--fs-sm); }
[data-theme="dock-pack"] .dp-panel-body { flex: 1; overflow-y: auto; padding: 12px; }

/* ─────────── TYPST CODE ─────────── */
[data-theme="dock-pack"] .dp-code-line {
  display: flex;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: var(--fs);
  line-height: 1.7;
}
[data-theme="dock-pack"] .dp-line-num { color: #333; width: 24px; text-align: right; flex-shrink: 0; user-select: none; }
[data-theme="dock-pack"] .dp-line-content  { color: var(--text-dim); }
[data-theme="dock-pack"] .dp-line-keyword  { color: var(--text); }
[data-theme="dock-pack"] .dp-line-string   { color: #7A7A7A; }
[data-theme="dock-pack"] .dp-line-comment  { color: var(--text-ghost); font-style: italic; }
[data-theme="dock-pack"] .dp-line-function { color: #B0B0B0; }
[data-theme="dock-pack"] .dp-line-prompt   { color: var(--text); }
[data-theme="dock-pack"] .dp-line-ok       { color: var(--ok); }

/* ─────────── PDF PANEL ─────────── */
[data-theme="dock-pack"] .dp-pdf-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0D0D0E;
}
[data-theme="dock-pack"] .dp-pdf-page {
  width: 80%;
  max-width: 280px;
  background: #FFFFFF;
  aspect-ratio: 1 / 1.414;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 24px rgba(0,0,0,.5);
}
[data-theme="dock-pack"] .dp-pdf-line { height: 3px; background: #E0E0E0; }
[data-theme="dock-pack"] .dp-pdf-line.title    { height: 6px; width: 60%; background: #0A0A0B; margin-bottom: 4px; }
[data-theme="dock-pack"] .dp-pdf-line.subtitle { height: 4px; width: 40%; background: #999; margin-bottom: 8px; }
[data-theme="dock-pack"] .dp-pdf-line.short    { width: 70%; }
[data-theme="dock-pack"] .dp-pdf-line.med      { width: 85%; }
[data-theme="dock-pack"] .dp-pdf-line.gap      { margin-top: 8px; }
[data-theme="dock-pack"] .dp-pdf-table { margin-top: 8px; border: 1px solid #DDD; }
[data-theme="dock-pack"] .dp-pdf-table-row { display: flex; border-bottom: 1px solid #DDD; }
[data-theme="dock-pack"] .dp-pdf-table-row:last-child { border-bottom: none; }
[data-theme="dock-pack"] .dp-pdf-table-cell {
  flex: 1; height: 8px; border-right: 1px solid #DDD;
  display: flex; align-items: center; justify-content: center; padding: 3px 4px;
}
[data-theme="dock-pack"] .dp-pdf-table-cell:last-child { border-right: none; }
[data-theme="dock-pack"] .dp-pdf-table-cell .dp-pdf-line { height: 2px; width: 80%; }
[data-theme="dock-pack"] .dp-pdf-table-row.header .dp-pdf-table-cell .dp-pdf-line { background: #0A0A0B; height: 2px; }

/* ─────────── INSPECTOR (Claude Pack) ─────────── */
[data-theme="dock-pack"] .dp-insp {
  width: 240px;
  flex-shrink: 0;
  background: var(--panel);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
[data-theme="dock-pack"] .dp-insp-section { border-bottom: 1px solid var(--border); padding: 12px 14px; }
[data-theme="dock-pack"] .dp-insp-title { font-size: var(--fs-sm); color: var(--text-subtle); margin-bottom: 8px; }
[data-theme="dock-pack"] .dp-kv {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: var(--fs);
}
[data-theme="dock-pack"] .dp-kv .k { color: var(--text-dim); }
[data-theme="dock-pack"] .dp-kv .v { color: var(--text); font-family: var(--font-mono); }

/* ─────────── BOTTOM CALC PANEL ─────────── */
[data-theme="dock-pack"] .dp-bottom-panel {
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  background: var(--bg);
}
[data-theme="dock-pack"] .dp-toggle-group { display: inline-flex; gap: 0; }
[data-theme="dock-pack"] .dp-toggle-option {
  padding: 4px 12px;
  font-size: var(--fs-sm);
  color: var(--text-subtle);
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  transition: background .1s, color .1s;
}
[data-theme="dock-pack"] .dp-toggle-option:hover { color: var(--text-dim); }
[data-theme="dock-pack"] .dp-toggle-option.active { background: rgba(255,255,255,.1); color: var(--text); }
[data-theme="dock-pack"] .dp-calc-tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding: 0 12px;
  height: 32px;
  flex-shrink: 0;
}
[data-theme="dock-pack"] .dp-calc-tab {
  padding: 6px 12px;
  font-size: var(--fs-sm);
  color: var(--text-subtle);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  font-family: var(--font-body);
}
[data-theme="dock-pack"] .dp-calc-tab:hover { color: var(--text-dim); }
[data-theme="dock-pack"] .dp-calc-tab.active { color: var(--text); border-bottom-color: var(--text); }
[data-theme="dock-pack"] .dp-calc-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  gap: 1px;
  background: var(--border);
}
[data-theme="dock-pack"] .dp-calc-col {
  flex: 1;
  padding: 10px 14px;
  overflow-y: auto;
  background: var(--bg);
}
[data-theme="dock-pack"] .dp-field-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  height: 28px;
}
[data-theme="dock-pack"] .dp-field-name { width: 140px; flex-shrink: 0; color: var(--text-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
[data-theme="dock-pack"] .dp-field-val {
  flex: 1; min-width: 60px;
  padding: 4px 8px;
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fs);
  outline: none;
  box-sizing: border-box;
  height: 28px;
}
[data-theme="dock-pack"] .dp-field-val:focus { border-color: var(--border-strong); }
[data-theme="dock-pack"] .dp-field-val.readonly { color: var(--text-muted); background: rgba(255,255,255,.02); }
[data-theme="dock-pack"] .dp-field-units { width: 50px; flex-shrink: 0; color: var(--text-subtle); font-family: var(--font-mono); text-align: right; }
[data-theme="dock-pack"] .dp-status-pass { color: var(--ok); width: 36px; text-align: right; flex-shrink: 0; }
[data-theme="dock-pack"] .dp-status-fail { color: var(--fail); width: 36px; text-align: right; flex-shrink: 0; }
[data-theme="dock-pack"] .dp-group-label { color: var(--text-subtle); margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,.04); }

/* ─────────── STATUS BAR ─────────── */
[data-theme="dock-pack"] .dp-statusbar {
  height: 22px;
  flex-shrink: 0;
  background: var(--bg);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 16px;
  font-size: var(--fs-sm);
  color: var(--text-subtle);
  font-family: var(--font-mono);
}
[data-theme="dock-pack"] .dp-statusbar-dot { width: 6px; height: 6px; background: var(--ok); flex-shrink: 0; }
[data-theme="dock-pack"] .dp-statusbar-spacer { flex: 1; }

/* ─────────── SCROLLBAR ─────────── */
[data-theme="dock-pack"] ::-webkit-scrollbar { width: 4px; height: 4px; }
[data-theme="dock-pack"] ::-webkit-scrollbar-track { background: transparent; }
[data-theme="dock-pack"] ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); }
[data-theme="dock-pack"] ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.15); }
`;

/* ─────────────────────────── icons ─────────────────────────── */

const Icon = ({ d, size = 16, sw = 2 }: { d: string; size?: number; sw?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const FolderIcon   = () => <Icon d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />;
const FileIcon     = () => <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" />;
const SettingsIcon = () => <Icon d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.46.18.85.46 1.18.83.33.36.55.79.66 1.26h.09a2 2 0 1 1 0 4h-.09c-.46.18-.85.46-1.18.83-.33.36-.55.79-.66 1.26z" />;
const BoxIcon      = () => <Icon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12" />;
const CodeIcon     = () => <Icon d="M16 18l6-6-6-6 M8 6l-6 6 6 6" />;
const HistoryIcon  = () => <Icon d="M1 4v6h6 M3.5 15a9 9 0 1 0 2.1-9.4L1 10 M12 7v5l4 2" sw={1.6} />;
const GitIcon      = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx={6} cy={6} r={2}/><circle cx={18} cy={6} r={2}/><circle cx={6} cy={18} r={2}/><path d="M6 8v8M6 18h8a4 4 0 0 0 4-4V8"/></svg>;
const SearchIcon   = ({ size = 12 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={7}/><path d="m21 21-4.3-4.3"/></svg>;
const MicIcon      = ({ size = 12 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x={9} y={2} width={6} height={12}/><path d="M5 10a7 7 0 0 0 14 0M12 19v4"/></svg>;
const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={12} />;
const ChevronDown  = () => <Icon d="M6 9l6 6 6-6" size={12} />;

/* ─────────────────────────── Toggle Group ─────────────────────────── */

const ToggleGroup = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="dp-toggle-group">
    {options.map((opt) => (
      <button
        key={opt}
        className={`dp-toggle-option${value === opt ? " active" : ""}`}
        onClick={() => onChange(opt)}
      >
        {opt}
      </button>
    ))}
  </div>
);

/* ─────────────────────────── Showcase ─────────────────────────── */

const DockPackShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = () => {
  const [selectedNode, setSelectedNode] = useState("Padeye.typ");
  const [calcTab, setCalcTab] = useState("I/O");
  const [calcMode, setCalcMode] = useState("GUI");
  const [bottomTab, setBottomTab] = useState("Calculation");
  const [sidebarMode, setSidebarMode] = useState("Sections");
  const [selectedSession, setSelectedSession] = useState("agentfiles");

  const sessions = [
    { id: "agentfiles", name: "agentfiles", branch: "main", state: "running",   note: "extracting worktree cli", chips: ["tdd","simplify"], runner: "C", dot: "ok",   bar: 23 },
    { id: "dock-calcs", name: "dock-calcs", branch: "feat/beam-check", state: "asking", note: "“euler-bernoulli or timoshenko?”", chips: ["dock-calc-creation"], runner: "C", dot: "attn" },
    { id: "sandbox",    name: "sandbox",    branch: "scratch", state: "permission", note: "rm -rf ./build", chips: [], runner: "G", dot: "err" },
  ];

  const treeData = [
    { name: "Mooring Analysis", type: "folder", level: 0, expanded: true, children: [
      { name: "General", type: "folder", level: 1, expanded: true, children: [
        { name: "Scope.typ", type: "file", level: 2 },
        { name: "References.typ", type: "file", level: 2 },
      ]},
      { name: "Environmental", type: "folder", level: 1, expanded: false, count: 3 },
      { name: "Structural", type: "folder", level: 1, expanded: true, children: [
        { name: "Padeye.typ", type: "file", level: 2 },
        { name: "Shackle.typ", type: "file", level: 2 },
        { name: "Chain.typ", type: "file", level: 2 },
      ]},
      { name: "Results", type: "folder", level: 1, expanded: false, count: 2 },
    ]},
  ];

  const typstLines = [
    { num: 1,  content: "// Padeye Design Check", type: "comment" },
    { num: 2,  content: "" },
    { num: 3,  content: "#import", type: "keyword", rest: ' "functions.typ": *' },
    { num: 4,  content: "" },
    { num: 5,  content: "= Padeye Design", type: "keyword" },
    { num: 6,  content: "" },
    { num: 7,  content: "== Input Parameters", type: "keyword" },
    { num: 8,  content: "" },
    { num: 9,  content: "#calc-table(", type: "function" },
    { num: 10, content: '  [Load], [SWL], [Variable], [#val("Padeye.swl")],' },
    { num: 11, content: '  [Load], [MBL], [Variable], [#val("Padeye.mbl")],' },
    { num: 12, content: '  [Geometry], [Hole dia], [d], [#val("Padeye.d_hole")],' },
    { num: 13, content: ")", type: "function" },
    { num: 14, content: "" },
    { num: 15, content: "== Bearing Check", type: "keyword" },
    { num: 16, content: "" },
    { num: 17, content: "#check(", type: "function" },
    { num: 18, content: '  "Bearing stress",' },
    { num: 19, content: '  $sigma_b = #val("Padeye.sigma_b")$,' },
    { num: 20, content: '  {{Padeye.bearing_status}},' },
    { num: 21, content: ")" },
  ];

  const calcInputs = [
    { group: "Loading" },
    { name: "SWL", value: "150", units: "kN" },
    { name: "Factor of Safety", value: "3.0", units: "" },
    { group: "Geometry" },
    { name: "Hole Diameter", value: "50", units: "mm" },
    { name: "Plate Thickness", value: "25", units: "mm" },
    { name: "Plate Width", value: "120", units: "mm" },
    { name: "Edge Distance", value: "60", units: "mm" },
    { group: "Material" },
    { name: "Steel Grade", value: "S355", units: "" },
    { name: "Yield Strength", value: "355", units: "MPa" },
    { name: "UTS", value: "510", units: "MPa" },
  ];

  const calcOutputs = [
    { group: "Loads" },
    { name: "MBL", value: "450.00", units: "kN" },
    { name: "Design Load", value: "450.00", units: "kN" },
    { group: "Checks" },
    { name: "Bearing Stress", value: "240.00", units: "MPa", status: "PASS" },
    { name: "Tear-out", value: "312.50", units: "MPa", status: "PASS" },
    { name: "Shear Stress", value: "180.00", units: "MPa", status: "PASS" },
    { name: "Unity Check", value: "0.72", units: "", status: "PASS" },
  ];

  const renderTreeNode = (node: any) => {
    const isFolder = node.type === "folder";
    const isSelected = node.name === selectedNode;
    const indent = node.level * 16;
    return (
      <React.Fragment key={node.name}>
        <button
          className={`dp-tree-node${isSelected ? " selected" : ""}${isFolder ? " folder" : ""}`}
          style={{ paddingLeft: `${16 + indent}px` }}
          onClick={() => !isFolder && setSelectedNode(node.name)}
        >
          <span className="dp-tree-chevron">
            {isFolder ? (node.expanded ? <ChevronDown /> : <ChevronRight />) : ""}
          </span>
          <span className="dp-tree-icon">
            {isFolder ? <FolderIcon /> : <FileIcon />}
          </span>
          <span>{node.name}</span>
          {node.count !== undefined && <span className="dp-tree-count">{node.count}</span>}
        </button>
        {isFolder && node.expanded && node.children?.map((child: any) => renderTreeNode(child))}
      </React.Fragment>
    );
  };

  const renderFieldRows = (fields: any[], readonly?: boolean) => (
    fields.map((f, i) => {
      if (f.group) {
        return <div className="dp-group-label" key={`g-${i}`}>{f.group}</div>;
      }
      return (
        <div className="dp-field-row" key={f.name}>
          <span className="dp-field-name">{f.name}</span>
          <input
            className={`dp-field-val${readonly ? " readonly" : ""}`}
            defaultValue={f.value}
            readOnly={readonly}
          />
          <span className="dp-field-units">{f.units}</span>
          {f.status && (
            <span className={f.status === "PASS" ? "dp-status-pass" : "dp-status-fail"}>
              {f.status}
            </span>
          )}
        </div>
      );
    })
  );

  return (
    <div className="dp-root">
      {/* ── TOP BAR ── */}
      <div className="dp-topbar">
        <span className="dp-topbar-title">Mooring Analysis</span>
        <span className="dp-topbar-sub">v0.0.8</span>
        <button className="dp-btn on">pack: morning &#9662;</button>
        <div style={{ flex: 1 }} />
        <button className="dp-btn">
          <SearchIcon />
          search · run
          <span className="kbd">⌘K</span>
        </button>
        <button className="dp-btn on">
          <MicIcon />
          voice
        </button>
      </div>

      {/* ── BODY ── */}
      <div className="dp-top-area">
        {/* Icon rail */}
        <nav className="dp-icons">
          <button className="dp-icon-btn active" title="Sections"><FolderIcon /></button>
          <button className="dp-icon-btn" title="Resources"><BoxIcon /></button>
          <button className="dp-icon-btn" title="Editor"><CodeIcon /></button>
          <button className="dp-icon-btn" title="History"><HistoryIcon /></button>
          <button className="dp-icon-btn" title="Git"><GitIcon /></button>
          <div className="dp-icon-divider" />
          <button className="dp-icon-btn" title="Settings"><SettingsIcon /></button>
          <div className="dp-icon-spacer" />
          <div style={{ fontSize: "10px", color: "#333", fontFamily: "var(--font-mono)", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.1em" }}>DOCK·PACK</div>
        </nav>

        {/* Session list */}
        <aside className="dp-sessions">
          <div className="dp-section-head">
            <span>sessions</span>
            <span className="ct">{sessions.length}</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {sessions.map((s) => (
              <div
                key={s.id}
                className={`dp-session${s.id === selectedSession ? " open" : ""}`}
                onClick={() => setSelectedSession(s.id)}
              >
                <div className="dp-row1">
                  <span className={`dp-dot ${s.dot}`} />
                  <span className="dp-name">{s.name}</span>
                  <span className="dp-runner">{s.runner}</span>
                </div>
                <div className="dp-row2">
                  <span className="dp-branch">{s.branch}</span>
                  <span>·</span>
                  <span>{s.state}</span>
                </div>
                {s.note && (
                  <div className="dp-row3" style={s.dot === "attn" ? { color: "var(--text)" } : undefined}>
                    {s.dot === "err" ? <span className="dp-chip">{s.note}</span> : s.note}
                  </div>
                )}
                {s.chips.length > 0 && (
                  <div className="dp-chips">
                    {s.chips.map((c) => <span key={c} className="dp-chip on">{c}</span>)}
                  </div>
                )}
                {s.bar !== undefined && (
                  <div className="dp-bar"><div style={{ width: `${s.bar}%` }} /></div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Right column: tree + main + bottom */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
          <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
            {/* Tree sidebar */}
            <div className="dp-tree-sidebar">
              <div className="dp-panel-header">
                <ToggleGroup options={["Sections", "Outline"]} value={sidebarMode} onChange={setSidebarMode} />
              </div>
              <div className="dp-tree-list">
                {sidebarMode === "Sections" ? (
                  treeData.map((node) => renderTreeNode(node))
                ) : (
                  ["Padeye Design", "Input Parameters", "Bearing Check", "Tear-out Check", "Shear Check", "Summary"].map((h) => (
                    <button className="dp-tree-node" key={h}>
                      <span className="dp-tree-icon"><span style={{ color: "var(--text-subtle)" }}>#</span></span>
                      <span>{h}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Main panels: typst + pdf */}
            <div className="dp-main">
              <div className="dp-panels">
                <div className="dp-panel" style={{ flex: "1.2" }}>
                  <div className="dp-panel-header">
                    <span className="dp-panel-label">Typst</span>
                    <span style={{ fontSize: "11px", color: "var(--text-subtle)", fontFamily: "var(--font-mono)" }}>Structural / Padeye.typ</span>
                  </div>
                  <div className="dp-panel-body" style={{ padding: "12px 0" }}>
                    {typstLines.map((line) => (
                      <div className="dp-code-line" key={line.num}>
                        <span className="dp-line-num">{line.num}</span>
                        <span className={
                          line.type === "comment" ? "dp-line-comment" :
                          line.type === "keyword" ? "dp-line-keyword" :
                          line.type === "function" ? "dp-line-function" :
                          "dp-line-content"
                        }>
                          {line.content}
                          {line.rest && <span className="dp-line-string">{line.rest}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dp-panel" style={{ flex: "0.8" }}>
                  <div className="dp-panel-header">
                    <span className="dp-panel-label">Preview</span>
                    <div style={{ flex: 1 }} />
                    <button className="dp-btn">Render</button>
                    <button className="dp-btn">Export PDF</button>
                  </div>
                  <div className="dp-pdf-area">
                    <div className="dp-pdf-page">
                      <div className="dp-pdf-line title" />
                      <div className="dp-pdf-line subtitle" />
                      <div className="dp-pdf-line" />
                      <div className="dp-pdf-line med" />
                      <div className="dp-pdf-line short" />
                      <div className="dp-pdf-line" />
                      <div className="dp-pdf-table">
                        <div className="dp-pdf-table-row header">
                          {[0,1,2,3].map(i => <div className="dp-pdf-table-cell" key={i}><div className="dp-pdf-line" /></div>)}
                        </div>
                        {[0,1,2].map(i => (
                          <div className="dp-pdf-table-row" key={i}>
                            {[0,1,2,3].map(j => <div className="dp-pdf-table-cell" key={j}><div className="dp-pdf-line" /></div>)}
                          </div>
                        ))}
                      </div>
                      <div className="dp-pdf-line gap" />
                      <div className="dp-pdf-line med" />
                      <div className="dp-pdf-line short" />
                      <div className="dp-pdf-line" />
                      <div className="dp-pdf-line med" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspector */}
            <aside className="dp-insp">
              <div className="dp-section-head">
                <span>{selectedSession}</span>
              </div>
              <section className="dp-insp-section">
                <div className="dp-insp-title">skills</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  <span className="dp-chip on">tdd</span>
                  <span className="dp-chip on">simplify</span>
                  <span className="dp-chip on">git-worktree-workflow</span>
                  <span className="dp-chip">+ add</span>
                </div>
              </section>
              <section className="dp-insp-section">
                <div className="dp-kv"><span className="k">model</span><span className="v">opus-4.7</span></div>
                <div className="dp-kv"><span className="k">permission</span><span className="v">ask</span></div>
                <div className="dp-kv"><span className="k">branch</span><span className="v">main · ±3</span></div>
              </section>
              <section className="dp-insp-section">
                <div className="dp-insp-title">cost · session</div>
                <div className="dp-kv"><span className="k">input tokens</span><span className="v">14.2k</span></div>
                <div className="dp-kv"><span className="k">output tokens</span><span className="v">2.1k</span></div>
                <div className="dp-kv"><span className="k">cache hits</span><span className="v">93%</span></div>
                <div className="dp-kv"><span className="k">session cost</span><span className="v">$0.04</span></div>
              </section>
              <section className="dp-insp-section">
                <div className="dp-insp-title">af log · last 4</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-dim)", lineHeight: 1.7 }}>
                  <div><span style={{ color: "var(--text-ghost)" }}>18:02</span> executor → tdd</div>
                  <div><span style={{ color: "var(--text-ghost)" }}>18:02</span> tdd → red-green</div>
                  <div><span style={{ color: "var(--text-ghost)" }}>18:03</span> simplify · pass 1/2</div>
                  <div><span style={{ color: "var(--text-ghost)" }}>18:04</span> executor → verify</div>
                </div>
              </section>
            </aside>
          </div>

          {/* Bottom calc panel */}
          <div className="dp-bottom-panel" style={{ height: "42vh" }}>
            <div className="dp-panel-header">
              <ToggleGroup options={["Calculation", "Files", "Images"]} value={bottomTab} onChange={setBottomTab} />
              <div style={{ flex: 1 }} />
            </div>
            <div className="dp-calc-tabs">
              {["I/O", "JSON", "Guide", "Script"].map((t) => (
                <button key={t} className={`dp-calc-tab${calcTab === t ? " active" : ""}`} onClick={() => setCalcTab(t)}>{t}</button>
              ))}
              <div style={{ flex: 1 }} />
              <ToggleGroup options={["GUI", "Code"]} value={calcMode} onChange={setCalcMode} />
            </div>
            <div className="dp-calc-body">
              <div className="dp-calc-col">
                <div className="dp-group-label" style={{ marginBottom: "8px", borderBottom: "none" }}>Inputs</div>
                {renderFieldRows(calcInputs)}
              </div>
              <div className="dp-calc-col">
                <div className="dp-group-label" style={{ marginBottom: "8px", borderBottom: "none" }}>Outputs</div>
                {renderFieldRows(calcOutputs, true)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="dp-statusbar">
        <span className="dp-statusbar-dot" />
        <span>backend connected</span>
        <span>typst v0.13</span>
        <span>·</span>
        <span>opus-4.7</span>
        <span>ctx <span style={{ color: "var(--text)" }}>23%</span></span>
        <span>$0.04</span>
        <div className="dp-statusbar-spacer" />
        <span>Padeye.typ</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#0A0A0B",
  sidebarBg: "#0A0A0B",
  border:    "rgba(255,255,255,0.08)",
  text:      "#E8E8E8",
  textMuted: "#6B6B6B",
  accent:    "#FFFFFF",
  cardBg:    "#111112",
  inputBg:   "#161617",
};

export const DockPackTheme: ThemeDefinition = {
  id: "dock-pack",
  name: "Dock Pack",
  emoji: "⚓",
  description: "Multi-project Typst IDE with Claude session telemetry. Combines the Dock document IDE (tree, editor, PDF preview, calc panel) with Claude Pack's session list and inspector.",
  colors: defaultColors,
  defaultLayout: "dashboard",
  styles,
  Showcase: DockPackShowcase,
};
