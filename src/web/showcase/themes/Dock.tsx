import React, { useState } from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.bunny.net/css?family=geist:400,500&display=swap');
@import url('https://fonts.bunny.net/css?family=geist-mono:400&display=swap');

[data-theme="dock"] {
  --bg: #0A0A0B;
  --sidebar-bg: #0A0A0B;
  --border: rgba(255,255,255,0.08);
  --text: #E8E8E8;
  --text-muted: #6B6B6B;
  --accent: #FFFFFF;
  --accent-2: #1A1A1B;
  --card-bg: #111112;
  --input-bg: #161617;
  --font-body: 'Geist', system-ui, -apple-system, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', monospace;
  --radius: 0px;
  --dk-fs: 12px;
  --dk-fs-sm: 11px;
}

[data-theme="dock"] .main-panel {
  padding: 0 !important;
  overflow: hidden !important;
}

/* ── TOGGLE GROUP (ghost + solid block) ── */
[data-theme="dock"] .dk-toggle-group {
  display: inline-flex;
  gap: 0;
}

[data-theme="dock"] .dk-toggle-option {
  padding: 4px 12px;
  font-size: var(--dk-fs-sm);
  color: #4A4A4A;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  transition: background 0.1s, color 0.1s;
}

[data-theme="dock"] .dk-toggle-option:hover { color: #9A9A9A; }

[data-theme="dock"] .dk-toggle-option.active {
  background: rgba(255,255,255,0.1);
  color: #E8E8E8;
}

/* ── SUB-TABS (underline only) ── */
[data-theme="dock"] .dk-calc-tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 0 12px;
  height: 32px;
  flex-shrink: 0;
}

[data-theme="dock"] .dk-calc-tab {
  padding: 6px 12px;
  font-size: var(--dk-fs-sm);
  color: #4A4A4A;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  font-family: var(--font-body);
  transition: color 0.1s, border-color 0.1s;
}

[data-theme="dock"] .dk-calc-tab:hover { color: #9A9A9A; }

[data-theme="dock"] .dk-calc-tab.active {
  color: #E8E8E8;
  border-bottom-color: #E8E8E8;
}

/* ── ICON SIDEBAR ── */
[data-theme="dock"] .dk-icon-sidebar {
  width: 48px;
  flex-shrink: 0;
  background: #0A0A0B;
  border-right: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 2px;
}

[data-theme="dock"] .dk-icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #6B6B6B;
  cursor: pointer;
  transition: color 0.1s, background 0.1s;
}

[data-theme="dock"] .dk-icon-btn:hover {
  color: #E8E8E8;
  background: rgba(255,255,255,0.06);
}

[data-theme="dock"] .dk-icon-btn.active {
  color: #FFFFFF;
  background: rgba(255,255,255,0.1);
}

[data-theme="dock"] .dk-icon-spacer { flex: 1; }

[data-theme="dock"] .dk-icon-divider {
  width: 24px;
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin: 6px 0;
}

/* ── TREE SIDEBAR ── */
[data-theme="dock"] .dk-tree-sidebar {
  width: 220px;
  flex-shrink: 0;
  background: #0F0F10;
  border-right: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

[data-theme="dock"] .dk-tree-section-label {
  font-size: var(--dk-fs-sm);
  color: #4A4A4A;
  padding: 12px 16px 4px;
}

[data-theme="dock"] .dk-tree-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

[data-theme="dock"] .dk-tree-node {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 16px;
  font-size: var(--dk-fs);
  color: #9A9A9A;
  cursor: pointer;
  transition: background 0.08s, color 0.08s;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-family: var(--font-body);
}

[data-theme="dock"] .dk-tree-node:hover {
  background: rgba(255,255,255,0.04);
  color: #E8E8E8;
}

[data-theme="dock"] .dk-tree-node.selected {
  background: rgba(255,255,255,0.08);
  color: #FFFFFF;
}

[data-theme="dock"] .dk-tree-node.folder { color: #C8C8C8; font-weight: 500; }

[data-theme="dock"] .dk-tree-chevron {
  color: #4A4A4A;
  width: 12px;
  text-align: center;
  flex-shrink: 0;
}

[data-theme="dock"] .dk-tree-icon {
  width: 16px;
  text-align: center;
  flex-shrink: 0;
}

[data-theme="dock"] .dk-tree-count {
  margin-left: auto;
  color: #4A4A4A;
}

/* ── ROOT LAYOUT ── */
[data-theme="dock"] .dk-root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #0A0A0B;
  color: #E8E8E8;
  font-family: var(--font-body);
  font-size: var(--dk-fs);
  overflow: hidden;
}

[data-theme="dock"] .dk-top-area {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

[data-theme="dock"] .dk-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

/* ── TOP BAR ── */
[data-theme="dock"] .dk-topbar {
  height: 40px;
  flex-shrink: 0;
  background: #0A0A0B;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
}

[data-theme="dock"] .dk-topbar-title {
  font-weight: 500;
  color: #E8E8E8;
}

[data-theme="dock"] .dk-topbar-subtitle {
  color: #4A4A4A;
  font-family: var(--font-mono);
}

[data-theme="dock"] .dk-topbar-spacer { flex: 1; }

[data-theme="dock"] .dk-topbar-btn {
  padding: 4px 10px;
  color: #6B6B6B;
  background: none;
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: color 0.1s, background 0.1s, border-color 0.1s;
  font-family: var(--font-body);
  font-size: var(--dk-fs-sm);
}

[data-theme="dock"] .dk-topbar-btn:hover {
  color: #E8E8E8;
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.15);
}

/* ── PANEL AREA ── */
[data-theme="dock"] .dk-panels {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
  gap: 1px;
  background: rgba(255,255,255,0.08);
}

[data-theme="dock"] .dk-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  background: #0A0A0B;
}

[data-theme="dock"] .dk-panel-header {
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  gap: 8px;
}

[data-theme="dock"] .dk-panel-label {
  color: #6B6B6B;
  font-size: var(--dk-fs-sm);
}

[data-theme="dock"] .dk-panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

/* ── TYPST CODE ── */
[data-theme="dock"] .dk-code-line {
  display: flex;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: var(--dk-fs);
  line-height: 1.7;
}

[data-theme="dock"] .dk-line-num {
  color: #333;
  width: 24px;
  text-align: right;
  flex-shrink: 0;
  user-select: none;
}

[data-theme="dock"] .dk-line-content { color: #9A9A9A; }
[data-theme="dock"] .dk-line-keyword { color: #E8E8E8; }
[data-theme="dock"] .dk-line-string  { color: #7A7A7A; }
[data-theme="dock"] .dk-line-comment { color: #3A3A3A; font-style: italic; }
[data-theme="dock"] .dk-line-function { color: #B0B0B0; }

/* ── PDF PANEL ── */
[data-theme="dock"] .dk-pdf-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0D0D0E;
}

[data-theme="dock"] .dk-pdf-page {
  width: 80%;
  max-width: 280px;
  background: #FFFFFF;
  aspect-ratio: 1 / 1.414;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.5);
}

[data-theme="dock"] .dk-pdf-line { height: 3px; background: #E0E0E0; }
[data-theme="dock"] .dk-pdf-line.title { height: 6px; width: 60%; background: #0A0A0B; margin-bottom: 4px; }
[data-theme="dock"] .dk-pdf-line.subtitle { height: 4px; width: 40%; background: #999; margin-bottom: 8px; }
[data-theme="dock"] .dk-pdf-line.short { width: 70%; }
[data-theme="dock"] .dk-pdf-line.med { width: 85%; }
[data-theme="dock"] .dk-pdf-line.gap { margin-top: 8px; }

[data-theme="dock"] .dk-pdf-table { margin-top: 8px; border: 1px solid #DDD; }
[data-theme="dock"] .dk-pdf-table-row { display: flex; border-bottom: 1px solid #DDD; }
[data-theme="dock"] .dk-pdf-table-row:last-child { border-bottom: none; }
[data-theme="dock"] .dk-pdf-table-cell {
  flex: 1; height: 8px; border-right: 1px solid #DDD;
  display: flex; align-items: center; justify-content: center; padding: 3px 4px;
}
[data-theme="dock"] .dk-pdf-table-cell:last-child { border-right: none; }
[data-theme="dock"] .dk-pdf-table-cell .dk-pdf-line { height: 2px; width: 80%; }
[data-theme="dock"] .dk-pdf-table-row.header .dk-pdf-table-cell .dk-pdf-line { background: #0A0A0B; height: 2px; }

/* ── BOTTOM CALC PANEL ── */
[data-theme="dock"] .dk-bottom-panel {
  flex-shrink: 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  background: #0A0A0B;
}

[data-theme="dock"] .dk-calc-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  gap: 1px;
  background: rgba(255,255,255,0.08);
}

[data-theme="dock"] .dk-calc-col {
  flex: 1;
  padding: 10px 14px;
  overflow-y: auto;
  background: #0A0A0B;
}

/* ── FIELD ROW ── */
[data-theme="dock"] .dk-field-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  height: 28px;
}

[data-theme="dock"] .dk-field-name {
  width: 140px;
  flex-shrink: 0;
  color: #9A9A9A;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-theme="dock"] .dk-field-val {
  flex: 1;
  min-width: 60px;
  padding: 4px 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  color: #E8E8E8;
  font-family: var(--font-mono);
  font-size: var(--dk-fs);
  outline: none;
  box-sizing: border-box;
  height: 28px;
}

[data-theme="dock"] .dk-field-val:focus { border-color: rgba(255,255,255,0.2); }

[data-theme="dock"] .dk-field-val.readonly {
  color: #6B6B6B;
  background: rgba(255,255,255,0.02);
}

[data-theme="dock"] .dk-field-units {
  width: 50px;
  flex-shrink: 0;
  color: #4A4A4A;
  font-family: var(--font-mono);
  text-align: right;
}

[data-theme="dock"] .dk-status-pass {
  color: #4ade80;
  width: 36px;
  text-align: right;
  flex-shrink: 0;
}

[data-theme="dock"] .dk-status-fail {
  color: #f87171;
  width: 36px;
  text-align: right;
  flex-shrink: 0;
}

[data-theme="dock"] .dk-group-label {
  color: #4A4A4A;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

/* ── STATUS BAR ── */
[data-theme="dock"] .dk-statusbar {
  height: 22px;
  flex-shrink: 0;
  background: #0A0A0B;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 16px;
  font-size: var(--dk-fs-sm);
  color: #4A4A4A;
  font-family: var(--font-mono);
}

[data-theme="dock"] .dk-statusbar-dot {
  width: 6px;
  height: 6px;
  background: #4ade80;
  flex-shrink: 0;
}

[data-theme="dock"] .dk-statusbar-spacer { flex: 1; }

/* ── SCROLLBAR ── */
[data-theme="dock"] ::-webkit-scrollbar { width: 4px; height: 4px; }
[data-theme="dock"] ::-webkit-scrollbar-track { background: transparent; }
[data-theme="dock"] ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); }
[data-theme="dock"] ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
`;

/* ─────────────────────────── SVG Icons ─────────────────────────── */

const Icon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const FolderIcon = () => <Icon d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />;
const FileIcon = () => <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" />;
const SettingsIcon = () => <Icon d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" size={16} />;
const BoxIcon = () => <Icon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12" size={16} />;
const CodeIcon = () => <Icon d="M16 18l6-6-6-6 M8 6l-6 6 6 6" size={16} />;
const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={12} />;
const ChevronDown = () => <Icon d="M6 9l6 6 6-6" size={12} />;

/* ─────────────────────────── Toggle Group ─────────────────────────── */

const ToggleGroup = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="dk-toggle-group">
    {options.map((opt) => (
      <button
        key={opt}
        className={`dk-toggle-option${value === opt ? " active" : ""}`}
        onClick={() => onChange(opt)}
      >
        {opt}
      </button>
    ))}
  </div>
);

/* ─────────────────────────── Showcase ─────────────────────────── */

const DockShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = () => {
  const [selectedNode, setSelectedNode] = useState("Padeye.typ");
  const [calcTab, setCalcTab] = useState("I/O");
  const [calcMode, setCalcMode] = useState("GUI");
  const [bottomTab, setBottomTab] = useState("Calculation");
  const [sidebarMode, setSidebarMode] = useState("Sections");
  const [calcAdding, setCalcAdding] = useState(false);
  const [selectedCalc, setSelectedCalc] = useState("padeye");
  const [addSelected, setAddSelected] = useState("");

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
    { num: 1, content: "// Padeye Design Check", type: "comment" },
    { num: 2, content: "" },
    { num: 3, content: "#import", type: "keyword", rest: ' "functions.typ": *' },
    { num: 4, content: "" },
    { num: 5, content: "= Padeye Design", type: "keyword" },
    { num: 6, content: "" },
    { num: 7, content: "== Input Parameters", type: "keyword" },
    { num: 8, content: "" },
    { num: 9, content: "#calc-table(", type: "function" },
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
          className={`dk-tree-node${isSelected ? " selected" : ""}${isFolder ? " folder" : ""}`}
          style={{ paddingLeft: `${16 + indent}px` }}
          onClick={() => !isFolder && setSelectedNode(node.name)}
        >
          <span className="dk-tree-chevron">
            {isFolder ? (node.expanded ? <ChevronDown /> : <ChevronRight />) : ""}
          </span>
          <span className="dk-tree-icon">
            {isFolder ? <FolderIcon /> : <FileIcon />}
          </span>
          <span>{node.name}</span>
          {node.count !== undefined && <span className="dk-tree-count">{node.count}</span>}
        </button>
        {isFolder && node.expanded && node.children?.map((child: any) => renderTreeNode(child))}
      </React.Fragment>
    );
  };

  const renderFieldRows = (fields: any[], readonly?: boolean) => (
    fields.map((f, i) => {
      if (f.group) {
        return <div className="dk-group-label" key={`g-${i}`}>{f.group}</div>;
      }
      return (
        <div className="dk-field-row" key={f.name}>
          <span className="dk-field-name">{f.name}</span>
          <input
            className={`dk-field-val${readonly ? " readonly" : ""}`}
            defaultValue={f.value}
            readOnly={readonly}
          />
          <span className="dk-field-units">{f.units}</span>
          {f.status && (
            <span className={f.status === "PASS" ? "dk-status-pass" : "dk-status-fail"}>
              {f.status}
            </span>
          )}
        </div>
      );
    })
  );

  return (
    <div className="dk-root">
      {/* ── TOP BAR (full width) ── */}
      <div className="dk-topbar">
        <span className="dk-topbar-title">Mooring Analysis</span>
        <span className="dk-topbar-subtitle">v0.0.8</span>
        <div className="dk-topbar-spacer" />
      </div>

      {/* ── CONTENT AREA: icon sidebar (full height) + right column ── */}
      <div className="dk-top-area">
        {/* Icon sidebar — spans full height between topbar and statusbar */}
        <div className="dk-icon-sidebar">
          <button className="dk-icon-btn active" title="Sections"><FolderIcon /></button>
          <button className="dk-icon-btn" title="Resources"><BoxIcon /></button>
          <button className="dk-icon-btn" title="Editor"><CodeIcon /></button>
          <div className="dk-icon-divider" />
          <button className="dk-icon-btn" title="Settings"><SettingsIcon /></button>
          <div className="dk-icon-spacer" />
          <div style={{ fontSize: "10px", color: "#333", fontFamily: "var(--font-mono)", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.1em" }}>DOCK</div>
        </div>

        {/* Right of icon sidebar: panels top + calc bottom */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
          {/* Upper: tree sidebar + editor panels */}
          <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
            {/* Tree sidebar */}
            <div className="dk-tree-sidebar">
              <div className="dk-panel-header">
                <ToggleGroup options={["Sections", "Outline"]} value={sidebarMode} onChange={setSidebarMode} />
              </div>
              <div className="dk-tree-list">
                {sidebarMode === "Sections" ? (
                  treeData.map((node) => renderTreeNode(node))
                ) : (
                  <>
                    {["Padeye Design", "Input Parameters", "Bearing Check", "Tear-out Check", "Shear Check", "Summary"].map((h) => (
                      <button className="dk-tree-node" key={h}><span className="dk-tree-icon"><span style={{ color: "#4A4A4A" }}>#</span></span><span>{h}</span></button>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Main content: panels */}
            <div className="dk-main">
              <div className="dk-panels">
                {/* Typst panel */}
                <div className="dk-panel" style={{ flex: "1.2" }}>
                  <div className="dk-panel-header">
                    <span className="dk-panel-label">Typst</span>
                    <span style={{ fontSize: "11px", color: "#4A4A4A", fontFamily: "var(--font-mono)" }}>Structural / Padeye.typ</span>
                  </div>
                  <div className="dk-panel-body" style={{ padding: "12px 0" }}>
                    {typstLines.map((line) => (
                      <div className="dk-code-line" key={line.num}>
                        <span className="dk-line-num">{line.num}</span>
                        <span className={
                          line.type === "comment" ? "dk-line-comment" :
                          line.type === "keyword" ? "dk-line-keyword" :
                          line.type === "function" ? "dk-line-function" :
                          "dk-line-content"
                        }>
                          {line.content}
                          {line.rest && <span className="dk-line-string">{line.rest}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PDF panel — with Render / Export in header */}
                <div className="dk-panel" style={{ flex: "0.8" }}>
                  <div className="dk-panel-header">
                    <span className="dk-panel-label">Preview</span>
                    <div style={{ flex: 1 }} />
                    <button className="dk-topbar-btn">Render</button>
                    <button className="dk-topbar-btn">Export PDF</button>
                  </div>
                  <div className="dk-pdf-area">
                    <div className="dk-pdf-page">
                      <div className="dk-pdf-line title" />
                      <div className="dk-pdf-line subtitle" />
                      <div className="dk-pdf-line" />
                      <div className="dk-pdf-line med" />
                      <div className="dk-pdf-line short" />
                      <div className="dk-pdf-line" />
                      <div className="dk-pdf-table">
                        <div className="dk-pdf-table-row header">
                          {[0,1,2,3].map(i => <div className="dk-pdf-table-cell" key={i}><div className="dk-pdf-line" /></div>)}
                        </div>
                        {[0,1,2].map(i => (
                          <div className="dk-pdf-table-row" key={i}>
                            {[0,1,2,3].map(j => <div className="dk-pdf-table-cell" key={j}><div className="dk-pdf-line" /></div>)}
                          </div>
                        ))}
                      </div>
                      <div className="dk-pdf-line gap" />
                      <div className="dk-pdf-line med" />
                      <div className="dk-pdf-line short" />
                      <div className="dk-pdf-line" />
                      <div className="dk-pdf-line med" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM PANEL ── */}
          <div className="dk-bottom-panel" style={{ height: "45vh" }}>
            <div className="dk-panel-header">
              <ToggleGroup options={["Calculation", "Files", "Images"]} value={bottomTab} onChange={setBottomTab} />
              <div style={{ flex: 1 }} />
            </div>
            <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0, gap: 1, background: "rgba(255,255,255,0.08)" }}>
              {/* Calc list sidebar */}
              <div style={{ width: 160, flexShrink: 0, display: "flex", flexDirection: "column", overflow: "hidden", background: "#0A0A0B" }}>
                {calcAdding ? (
                  <>
                    <div className="dk-tree-list" style={{ flex: 1 }}>
                      <div className="dk-tree-section-label">Library</div>
                      {["padeye", "bolt-group", "shackle", "weld-check", "anchor", "chain-sling", "pile-capacity"].map((c) => (
                        <button className={`dk-tree-node${c === addSelected ? " selected" : ""}`} key={c} onClick={() => setAddSelected(c)}>
                          <span className="dk-tree-icon"><BoxIcon /></span>
                          <span>{c}</span>
                        </button>
                      ))}
                    </div>
                    <button className="dk-topbar-btn" style={{ margin: "8px", textAlign: "center", display: "block" }} onClick={() => { setCalcAdding(false); setAddSelected(""); }}>
                      {addSelected ? "Confirm" : "+ Add"}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="dk-tree-list" style={{ flex: 1 }}>
                      {["padeye", "bolt-group", "shackle"].map((c) => (
                        <button className={`dk-tree-node${c === selectedCalc ? " selected" : ""}`} key={c} onClick={() => setSelectedCalc(c)}>
                          <span style={{ color: c === selectedCalc ? "#4ade80" : "#4A4A4A" }}>&#10003;</span>
                          <span>{c}</span>
                        </button>
                      ))}
                    </div>
                    <button className="dk-topbar-btn" style={{ margin: "8px", textAlign: "center", display: "block" }} onClick={() => setCalcAdding(true)}>+ Add</button>
                  </>
                )}
              </div>

              {/* Right area: editor or add-preview */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden", background: "#0A0A0B" }}>
                {calcAdding ? (
                  <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
                    {addSelected ? (
                      <>
                        <div style={{ color: "#E8E8E8", fontWeight: 500, marginBottom: "4px" }}>{addSelected}</div>
                        <div style={{ color: "#6B6B6B", marginBottom: "16px" }}>Design check calculation from the library. Includes inputs, script, and section template.</div>
                        <div className="dk-group-label" style={{ borderBottom: "none" }}>Inputs</div>
                        {["Load", "Factor of Safety", "Geometry", "Material Grade"].map((f) => (
                          <div className="dk-field-row" key={f}>
                            <span className="dk-field-name">{f}</span>
                            <span className="dk-field-val readonly" style={{ flex: 1, display: "flex", alignItems: "center", padding: "4px 8px", color: "#4A4A4A" }}>--</span>
                          </div>
                        ))}
                        <div className="dk-group-label" style={{ borderBottom: "none", marginTop: "12px" }}>Outputs</div>
                        {["Stress Check", "Unity Check", "Status"].map((f) => (
                          <div className="dk-field-row" key={f}>
                            <span className="dk-field-name">{f}</span>
                            <span className="dk-field-val readonly" style={{ flex: 1, display: "flex", alignItems: "center", padding: "4px 8px", color: "#4A4A4A" }}>--</span>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div style={{ color: "#4A4A4A", padding: "40px 0", textAlign: "center" }}>Select a calculation from the library</div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="dk-calc-tabs">
                      {["I/O", "JSON", "Guide", "Script"].map((t) => (
                        <button key={t} className={`dk-calc-tab${calcTab === t ? " active" : ""}`} onClick={() => setCalcTab(t)}>{t}</button>
                      ))}
                      <div style={{ flex: 1 }} />
                      <ToggleGroup options={["GUI", "Code"]} value={calcMode} onChange={setCalcMode} />
                    </div>
                    <div className="dk-calc-body">
                      <div className="dk-calc-col">
                        <div className="dk-group-label" style={{ marginBottom: "8px", borderBottom: "none" }}>Inputs</div>
                        {renderFieldRows(calcInputs)}
                      </div>
                      <div className="dk-calc-col">
                        <div className="dk-group-label" style={{ marginBottom: "8px", borderBottom: "none" }}>Outputs</div>
                        {renderFieldRows(calcOutputs, true)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>{/* close right-column */}
      </div>{/* close dk-top-area */}

      {/* Status bar */}
      <div className="dk-statusbar">
        <span className="dk-statusbar-dot" />
        <span>Backend connected</span>
        <span>typst v0.13</span>
        <div className="dk-statusbar-spacer" />
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

export const DockTheme: ThemeDefinition = {
  id: "dock",
  name: "Dock IDE",
  emoji: "\u2693",
  description: "Typst document IDE with tree sidebar, code editor, PDF preview, and calculation panel.",
  colors: defaultColors,
  defaultLayout: "dashboard",
  styles,
  Showcase: DockShowcase,
};
