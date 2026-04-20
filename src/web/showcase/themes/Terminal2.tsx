import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

@keyframes t2-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes t2-scan {
  0% { top: 0%; }
  100% { top: 100%; }
}

[data-theme="terminal2"] {
  --bg: #0d0d0d;
  --bg-panel: #161616;
  --bg-hover: #1e1e1e;
  --bg-selected: #242424;
  --border: #262626;
  --border-bright: #363636;
  --text: #c8c8c8;
  --text-bright: #ebebeb;
  --text-muted: #505050;
  --accent: #5c9cf5;
  --accent-2: #e5c07b;
  --danger: #e06c75;
  --success: #7ec98e;
  --font-pixel: 'Press Start 2P', monospace;
  --font-mono: 'Courier New', Courier, monospace;
  --radius: 0px;
}

/* ── CRT scanline overlay ── */
[data-theme="terminal2"] .t2-root {
  font-family: var(--font-mono);
  color: var(--text);
  background: var(--bg);
  min-height: 100%;
  position: relative;
}

[data-theme="terminal2"] .t2-root::after {
  content: '';
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 300;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 0, 0, 0.025) 3px,
    rgba(0, 0, 0, 0.025) 4px
  );
}

/* ── TOP BAR ── */
[data-theme="terminal2"] .t2-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 28px;
  background: var(--bg-panel);
  border-bottom: 1px solid var(--border-bright);
  font-size: 16px;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

[data-theme="terminal2"] .t2-topbar-left {
  display: flex;
  gap: 16px;
  align-items: center;
}

[data-theme="terminal2"] .t2-topbar-title {
  color: var(--text);
  letter-spacing: 0.06em;
}

[data-theme="terminal2"] .t2-topbar-right {
  display: flex;
  gap: 16px;
  align-items: center;
}

[data-theme="terminal2"] .t2-topbar-key {
  color: var(--text-bright);
}

/* ── BOTTOM STATUS BAR ── */
[data-theme="terminal2"] .t2-statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 26px;
  background: var(--bg-selected);
  border-top: 1px solid var(--border-bright);
  color: var(--text-muted);
  font-size: 16px;
  letter-spacing: 0.06em;
  margin-top: 40px;
}

[data-theme="terminal2"] .t2-statusbar-keys {
  display: flex;
  gap: 16px;
}

[data-theme="terminal2"] .t2-statusbar-key {
  color: var(--text-bright);
  font-weight: bold;
}

[data-theme="terminal2"] .t2-statusbar-right {
  opacity: 0.7;
}

/* ── MAIN LAYOUT ── */
[data-theme="terminal2"] .t2-body {
  display: flex;
  min-height: calc(100% - 54px);
}

[data-theme="terminal2"] .t2-sidebar {
  width: 160px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background: var(--bg-panel);
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

[data-theme="terminal2"] .t2-sidebar-title {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--text-bright);
  padding: 0 16px 12px;
  letter-spacing: 0.06em;
  line-height: 1.8;
}

[data-theme="terminal2"] .t2-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 16px;
  font-size: 14px;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  cursor: pointer;
  background: transparent;
  transition: color 0.05s;
}

[data-theme="terminal2"] .t2-nav-item:hover {
  background: var(--bg-hover);
  color: var(--text);
}

[data-theme="terminal2"] .t2-nav-item.active {
  background: var(--bg-selected);
  color: var(--text-bright);
}

[data-theme="terminal2"] .t2-nav-badge {
  font-size: 16px;
  color: var(--accent-2);
}

[data-theme="terminal2"] .t2-nav-sep {
  height: 1px;
  background: var(--border);
  margin: 6px 0;
}

[data-theme="terminal2"] .t2-sidebar-ver {
  margin-top: auto;
  padding: 10px 16px 0;
  font-size: 15px;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

/* ── CONTENT ── */
[data-theme="terminal2"] .t2-content {
  flex: 1;
  padding: 24px 28px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ── SECTION LABEL ── */
[data-theme="terminal2"] .t2-section-label {
  font-size: 15px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

[data-theme="terminal2"] .t2-section-label::before {
  content: '>';
  color: var(--text-muted);
  font-size: 14px;
}

[data-theme="terminal2"] .t2-section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
  max-width: 200px;
}

/* ── TYPOGRAPHY ── */
[data-theme="terminal2"] .t2-h1 {
  font-family: var(--font-pixel);
  font-size: 16px;
  line-height: 2.2;
  letter-spacing: 0.1em;
  color: var(--text-bright);
  margin-bottom: 14px;
}

[data-theme="terminal2"] .t2-h2 {
  font-family: var(--font-pixel);
  font-size: 16px;
  line-height: 2.4;
  letter-spacing: 0.08em;
  color: var(--text-bright);
  margin-bottom: 10px;
}

[data-theme="terminal2"] .t2-h3 {
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0.08em;
  color: var(--text);
  margin-bottom: 6px;
}

[data-theme="terminal2"] .t2-body {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
  letter-spacing: 0.02em;
}

[data-theme="terminal2"] .t2-muted {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
}

[data-theme="terminal2"] .t2-code {
  font-family: var(--font-mono);
  font-size: 15px;
  background: var(--bg-panel);
  color: var(--accent-2);
  padding: 1px 6px;
}

[data-theme="terminal2"] .t2-hud::after {
  content: '◈';
  position: absolute;
  top: -8px;
  font-size: 15px;
  color: var(--text-muted);
  background: var(--bg);
  padding: 0 4px;
}

[data-theme="terminal2"] .t2-hud::before {
  left: 16px;
}

[data-theme="terminal2"] .t2-hud::after {
  right: 16px;
}

[data-theme="terminal2"] .t2-hud-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

[data-theme="terminal2"] .t2-hud-logo {
  font-family: var(--font-pixel);
  font-size: 15px;
  color: var(--text-bright);
  letter-spacing: 0.04em;
}

[data-theme="terminal2"] .t2-hud-corp {
  font-size: 16px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

[data-theme="terminal2"] .t2-hud-title-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  border-top: 1px solid var(--border-bright);
  border-left: 1px solid var(--border-bright);
}

[data-theme="terminal2"] .t2-hud-cell {
  border-right: 1px solid var(--border-bright);
  border-bottom: 1px solid var(--border-bright);
  padding: 8px 10px;
}

[data-theme="terminal2"] .t2-hud-cell-label {
  font-size: 15px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 6px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 4px;
}

[data-theme="terminal2"] .t2-hud-cell-values {
  font-size: 14px;
  letter-spacing: 0.06em;
  color: var(--text);
  line-height: 1.7;
}

[data-theme="terminal2"] .t2-hud-footer {
  text-align: right;
  font-size: 15px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 10px;
  border-top: 1px solid var(--border);
  padding-top: 8px;
}

/* ── TUI FEED / TABS ── */
[data-theme="terminal2"] .t2-tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}

[data-theme="terminal2"] .t2-tab {
  font-family: var(--font-mono);
  font-size: 15px;
  letter-spacing: 0.06em;
  padding: 7px 16px;
  background: transparent;
  transition: border-color 0.08s, color 0.08s;
}

[data-theme="terminal2"] .t2-btn::before {
  content: '[';
  color: var(--accent);
  margin-right: 4px;
}

[data-theme="terminal2"] .t2-btn::after {
  content: ']';
  color: var(--accent);
  margin-left: 4px;
}

[data-theme="terminal2"] .t2-btn:hover {
  background: var(--bg-hover);
  border-color: var(--text);
  color: var(--text-bright);
}

[data-theme="terminal2"] .t2-btn:focus-visible {
  outline: 1px solid var(--accent);
  outline-offset: 2px;
}

[data-theme="terminal2"] .t2-btn:active {
  background: var(--bg-selected);
}

[data-theme="terminal2"] .t2-btn-primary {
  background: var(--text-bright);
  border-color: var(--text-bright);
  color: var(--bg);
}

[data-theme="terminal2"] .t2-btn-primary::before,
[data-theme="terminal2"] .t2-btn-primary::after {
  color: var(--bg-selected);
}

[data-theme="terminal2"] .t2-btn-primary:hover {
  background: #ffffff;
  border-color: #ffffff;
  color: var(--bg);
}

[data-theme="terminal2"] .t2-btn-danger {
  border-color: var(--danger);
  color: var(--danger);
}

[data-theme="terminal2"] .t2-btn-danger::before,
[data-theme="terminal2"] .t2-btn-danger::after {
  color: var(--danger);
}

[data-theme="terminal2"] .t2-btn-danger:hover {
  background: rgba(200, 64, 64, 0.1);
}

[data-theme="terminal2"] .t2-btn-ghost {
  border-color: transparent;
  color: var(--text-muted);
}

[data-theme="terminal2"] .t2-btn-ghost::before,
[data-theme="terminal2"] .t2-btn-ghost::after {
  color: var(--text-muted);
}

[data-theme="terminal2"] .t2-btn-ghost:hover {
  border-color: var(--border);
  background: transparent;
  color: var(--text);
}

/* ── INPUTS ── */
[data-theme="terminal2"] .t2-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

[data-theme="terminal2"] .t2-label {
  font-size: 15px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

[data-theme="terminal2"] .t2-input-wrap {
  display: flex;
  align-items: center;
}

[data-theme="terminal2"] .t2-badge-solid::after {
  display: none;
}

/* ── PROGRESS BARS ── */
[data-theme="terminal2"] .t2-progress-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

[data-theme="terminal2"] .t2-progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

[data-theme="terminal2"] .t2-progress-name {
  width: 80px;
  color: var(--text-muted);
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 0.1em;
  flex-shrink: 0;
}

[data-theme="terminal2"] .t2-progress-ascii {
  font-family: var(--font-mono);
  font-size: 15px;
  letter-spacing: -0.03em;
  color: var(--text);
  flex: 1;
}

[data-theme="terminal2"] .t2-progress-val {
  width: 32px;
  text-align: right;
  color: var(--text-muted);
  font-size: 14px;
  flex-shrink: 0;
}

/* ── LIGHT MODE ── */
[data-theme="terminal2"][data-mode="light"] {
  --bg: #f4f4f4;
  --bg-panel: #ebebeb;
  --bg-hover: #e0e0e0;
  --bg-selected: #d6d6d6;
  --border: #c0c0c0;
  --border-bright: #a0a0a0;
  --text: #2a2a2a;
  --text-bright: #111111;
  --text-muted: #888888;
}
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const Terminal2Showcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const mono: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };

  const panel = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "#161616",
    border: "1px solid #262626",
    ...extra,
  });

  const sectionLabel = (text: string) => (
    <div style={{ ...mono, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#505050", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: "#505050" }}>&gt;</span>
      {text}
      <span style={{ flex: 1, height: "1px", background: "#262626", maxWidth: "160px", display: "inline-block" }} />
    </div>
  );

  const shellLines: Array<{ ps?: boolean; text: string; color?: string }> = [
    { ps: true,  text: "ls -la ~/projects/ui/src" },
    { text: "total 48", color: "#505050" },
    { text: "drwxr-xr-x  6 eastill staff  192 Apr 16 09:14 .", color: "#505050" },
    { text: "drwxr-xr-x 12 eastill staff  384 Apr 16 09:12 ..", color: "#505050" },
    { text: "drwxr-xr-x  3 eastill staff   96 Apr 16 09:10 \x1b[34mcomponents\x1b[0m", color: "#5c9cf5" },
    { text: "-rw-r--r--  1 eastill staff 4821 Apr 16 09:14 server.ts", color: "#c8c8c8" },
    { text: "drwxr-xr-x  8 eastill staff  256 Apr 16 09:14 \x1b[34mthemes\x1b[0m", color: "#5c9cf5" },
    { ps: true,  text: "git status" },
    { text: "On branch main", color: "#c8c8c8" },
    { text: "Changes not staged for commit:", color: "#e5c07b" },
    { text: "  modified:   src/themes/Terminal2.tsx", color: "#e06c75" },
    { text: "  modified:   src/themes/Cyberpunk.tsx", color: "#e06c75" },
    { ps: true,  text: "npm run dev" },
    { text: "> ui-system@2.1.0 dev", color: "#505050" },
    { text: "> bun --hot server.ts", color: "#505050" },
    { text: "", color: "" },
    { text: "  VITE v5.2.0  ready in 312 ms", color: "#7ec98e" },
    { text: "  ➜  Local:   http://localhost:3000/", color: "#5c9cf5" },
    { text: "  ➜  Network: http://192.168.1.42:3000/", color: "#505050" },
  ];

  const processes = [
    { pid: "1",    user: "root",    cpu: "0.0", mem: "0.1", cmd: "/sbin/init" },
    { pid: "312",  user: "eastill", cpu: "2.4", mem: "1.8", cmd: "bun server.ts --hot" },
    { pid: "317",  user: "eastill", cpu: "0.8", mem: "0.9", cmd: "node_modules/.bin/esbuild" },
    { pid: "441",  user: "eastill", cpu: "0.1", mem: "0.4", cmd: "git fsck --connectivity-only" },
    { pid: "880",  user: "root",    cpu: "0.0", mem: "0.1", cmd: "sshd: /usr/sbin/sshd [listener]" },
    { pid: "1024", user: "eastill", cpu: "0.0", mem: "0.3", cmd: "fish -l" },
    { pid: "1337", user: "eastill", cpu: "0.0", mem: "0.2", cmd: "vim src/themes/Terminal2.tsx" },
  ];

  const sysInfo = [
    { label: "OS",      value: "Arch Linux x86_64" },
    { label: "Kernel",  value: "6.19.6-arch1-1" },
    { label: "Uptime",  value: "3 days, 7 hours" },
    { label: "Shell",   value: "fish 3.7.1" },
    { label: "Memory",  value: "6.2 GiB / 16.0 GiB" },
    { label: "CPU",     value: "AMD Ryzen 7 5800X (16)" },
    { label: "GPU",     value: "NVIDIA RTX 3070" },
    { label: "Disk",    value: "124 GiB / 512 GiB" },
  ];

  const codeLines = [
    { n: "1",  tok: [{ t: "keyword", v: "import " }, { t: "punct", v: "{ " }, { t: "default", v: "useState" }, { t: "punct", v: " } " }, { t: "keyword", v: "from " }, { t: "string", v: "'react'" }, { t: "punct", v: ";" }] },
    { n: "2",  tok: [] },
    { n: "3",  tok: [{ t: "keyword", v: "const " }, { t: "fn", v: "useTheme " }, { t: "punct", v: "= (" }, { t: "param", v: "id: string" }, { t: "punct", v: ") => {" }] },
    { n: "4",  tok: [{ t: "keyword", v: "  const " }, { t: "punct", v: "[" }, { t: "default", v: "theme" }, { t: "punct", v: ", " }, { t: "default", v: "setTheme" }, { t: "punct", v: "] = " }, { t: "fn", v: "useState" }, { t: "punct", v: "(" }, { t: "param", v: "id" }, { t: "punct", v: ");" }] },
    { n: "5",  tok: [{ t: "keyword", v: "  return " }, { t: "punct", v: "{ " }, { t: "default", v: "theme" }, { t: "punct", v: ", " }, { t: "default", v: "setTheme" }, { t: "punct", v: " };" }] },
    { n: "6",  tok: [{ t: "punct", v: "};" }] },
  ];

  const tokColor: Record<string, string> = {
    keyword: "#c678dd",
    fn:      "#61afef",
    string:  "#98c379",
    param:   "#e06c75",
    punct:   "#abb2bf",
    default: "#e5c07b",
  };

  const barChar = (pct: number, w = 20) => {
    const filled = Math.round((pct / 100) * w);
    return "[" + "█".repeat(filled) + "░".repeat(w - filled) + "]";
  };

  return (
    <div style={{ ...mono, background: "#0d0d0d", color: "#c8c8c8", minHeight: "100%", boxSizing: "border-box" }}>

      {/* TOP BAR */}
      <div style={{ ...panel(), height: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: "1px solid #363636", fontSize: "12px", letterSpacing: "0.08em" }}>
        <div style={{ display: "flex", gap: "20px", color: "#505050" }}>
          <span style={{ color: "#ebebeb" }}>TERMINAL2</span>
          <span>File</span><span>Edit</span><span>View</span><span>Help</span>
        </div>
        <div style={{ display: "flex", gap: "16px", color: "#505050" }}>
          <span><span style={{ color: "#ebebeb" }}>^X</span> Exit</span>
          <span><span style={{ color: "#ebebeb" }}>^O</span> Save</span>
          <span><span style={{ color: "#ebebeb" }}>^W</span> Close</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", minHeight: "calc(100% - 54px)" }}>

        {/* LEFT COLUMN */}
        <div style={{ borderRight: "1px solid #262626", padding: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Shell session */}
          <div>
            {sectionLabel("shell session")}
            <div style={{ ...panel({ padding: "12px 14px", fontSize: "12px", lineHeight: "1.8" }) }}>
              {shellLines.map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "8px" }}>
                  {line.ps
                    ? <><span style={{ color: "#7ec98e", userSelect: "none" }}>eastill@arch</span><span style={{ color: "#5c9cf5", userSelect: "none" }}>:~$</span><span style={{ color: "#ebebeb", marginLeft: "6px" }}>{line.text}</span></>
                    : <span style={{ color: line.color ?? "#c8c8c8", paddingLeft: "4px" }}>{line.text}</span>
                  }
                </div>
              ))}
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <span style={{ color: "#7ec98e" }}>eastill@arch</span>
                <span style={{ color: "#5c9cf5" }}>:~$</span>
                <span style={{ display: "inline-block", width: "8px", height: "14px", background: "#c8c8c8", verticalAlign: "middle", animation: "t2-blink 1s step-start infinite" }} />
              </div>
            </div>
          </div>

          {/* System info (neofetch style) */}
          <div>
            {sectionLabel("system info")}
            <div style={{ ...panel({ padding: "14px", display: "flex", gap: "16px" }) }}>
              <div style={{ fontSize: "10px", lineHeight: "1.6", color: "#5c9cf5", userSelect: "none", flexShrink: 0 }}>
                {[
                  "   ___   ",
                  "  (   )  ",
                  "  | | |  ",
                  "  |_|_|  ",
                  " /     \\ ",
                  "|       |",
                  " \\_____/ ",
                ].map((r, i) => <div key={i}>{r}</div>)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", color: "#ebebeb", marginBottom: "8px", letterSpacing: "0.1em" }}>
                  <span style={{ color: "#5c9cf5" }}>eastill</span>
                  <span style={{ color: "#505050" }}>@</span>
                  <span style={{ color: "#5c9cf5" }}>arch</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {sysInfo.map(s => (
                    <div key={s.label} style={{ display: "flex", gap: "8px", fontSize: "11px" }}>
                      <span style={{ color: "#5c9cf5", width: "56px", flexShrink: 0 }}>{s.label}</span>
                      <span style={{ color: "#505050" }}>:</span>
                      <span style={{ color: "#c8c8c8" }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resource usage */}
          <div>
            {sectionLabel("resource usage")}
            <div style={{ ...panel({ padding: "14px" }), fontSize: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { name: "CPU",  pct: 24, col: "#5c9cf5" },
                { name: "MEM",  pct: 39, col: "#e5c07b" },
                { name: "DISK", pct: 24, col: "#7ec98e" },
                { name: "NET",  pct: 11, col: "#c678dd" },
              ].map(r => (
                <div key={r.name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#505050", width: "36px", letterSpacing: "0.1em" }}>{r.name}</span>
                  <span style={{ color: r.col, flex: 1, letterSpacing: "-0.02em" }}>{barChar(r.pct)}</span>
                  <span style={{ color: "#505050", width: "34px", textAlign: "right" }}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Code block */}
          <div>
            {sectionLabel("syntax highlight")}
            <div style={{ ...panel({ overflow: "hidden" }) }}>
              <div style={{ background: "#1e1e1e", padding: "6px 12px", borderBottom: "1px solid #262626", fontSize: "11px", color: "#505050", display: "flex", gap: "12px" }}>
                <span style={{ color: "#e5c07b" }}>useTheme.ts</span>
                <span>TypeScript</span>
                <span style={{ marginLeft: "auto" }}>UTF-8</span>
              </div>
              <div style={{ padding: "10px 0", fontSize: "12px", lineHeight: "1.8" }}>
                {codeLines.map((line) => (
                  <div key={line.n} style={{ display: "flex" }}>
                    <span style={{ width: "36px", textAlign: "right", color: "#363636", paddingRight: "12px", userSelect: "none", flexShrink: 0 }}>{line.n}</span>
                    <span>
                      {line.tok.map((tk, ti) => (
                        <span key={ti} style={{ color: tokColor[tk.t] ?? "#c8c8c8" }}>{tk.v}</span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process list */}
          <div>
            {sectionLabel("processes")}
            <div style={{ ...panel({ overflow: "hidden" }) }}>
              <div style={{ display: "grid", gridTemplateColumns: "50px 70px 50px 50px 1fr", padding: "6px 12px", borderBottom: "1px solid #363636", fontSize: "11px", color: "#505050", letterSpacing: "0.1em" }}>
                <span>PID</span><span>USER</span><span>%CPU</span><span>%MEM</span><span>COMMAND</span>
              </div>
              {processes.map((p, i) => (
                <div key={p.pid} style={{ display: "grid", gridTemplateColumns: "50px 70px 50px 50px 1fr", padding: "4px 12px", fontSize: "12px", background: i % 2 === 0 ? "transparent" : "#111111", borderBottom: "1px solid #1a1a1a" }}>
                  <span style={{ color: "#5c9cf5" }}>{p.pid}</span>
                  <span style={{ color: p.user === "root" ? "#e06c75" : "#e5c07b" }}>{p.user}</span>
                  <span style={{ color: parseFloat(p.cpu) > 1 ? "#7ec98e" : "#505050" }}>{p.cpu}</span>
                  <span style={{ color: "#505050" }}>{p.mem}</span>
                  <span style={{ color: "#c8c8c8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.cmd}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* STATUS BAR */}
      <div style={{ ...panel({ borderTop: "1px solid #363636" }), height: "26px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", fontSize: "11px", letterSpacing: "0.06em", color: "#505050" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          <span><span style={{ color: "#ebebeb" }}>^X</span> Exit</span>
          <span><span style={{ color: "#ebebeb" }}>^O</span> Write</span>
          <span><span style={{ color: "#ebebeb" }}>^R</span> Read</span>
          <span><span style={{ color: "#ebebeb" }}>^W</span> Search</span>
        </div>
        <span style={{ color: "#363636" }}>terminal2 v2.1.0 — 4 themes loaded — UTF-8</span>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#0d0d0d",
  sidebarBg: "#161616",
  border:    "#262626",
  text:      "#c8c8c8",
  textMuted: "#505050",
  accent:    "#5c9cf5",
  accent2:   "#e5c07b",
  cardBg:    "#161616",
  inputBg:   "#0d0d0d",
};

export const Terminal2Theme: ThemeDefinition = {
  id: "terminal2",
  name: "Terminal2",
  emoji: "🖥️",
  description: "Raw Linux shell aesthetic — nano-style top bar, htop resource meters, ps aux process list, and syntax-highlighted code blocks.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg:        "#080808",
      sidebarBg: "#101010",
      border:    "#1e1e1e",
      text:      "#ebebeb",
      textMuted: "#404040",
      accent:    "#5c9cf5",
      accent2:   "#e5c07b",
      cardBg:    "#101010",
      inputBg:   "#080808",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: Terminal2Showcase,
};
