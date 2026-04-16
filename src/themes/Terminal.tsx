import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

  [data-theme="terminal"] {
    --bg: #0d1117;
    --sidebar-bg: #161b22;
    --border: #30363d;
    --text: #e6edf3;
    --text-muted: #8b949e;
    --accent: #58a6ff;
    --accent-2: #39d353;
    --card-bg: #161b22;
    --input-bg: #0d1117;
    --font-body: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    --radius: 4px;
    --danger: #f85149;
    --warning: #e3b341;
    --success: #39d353;
    --purple: #d2a8ff;
  }

  [data-theme="terminal"] .term-root {
    font-family: var(--font-body);
    color: var(--text);
    background: var(--bg);
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  [data-theme="terminal"] .term-window {
    background: #010409;
    background: rgba(30,40,60,0.8);
  }

  [data-theme="terminal"] .diff-add { background: rgba(57, 211, 83, 0.1); color: #39d353; }
  [data-theme="terminal"] .diff-del { background: rgba(248, 81, 73, 0.1); color: #f85149; }

  [data-theme="terminal"] .term-features {
    padding: 40px;
    background: var(--sidebar-bg);
    border-top: 1px solid var(--border);
  }

  [data-theme="terminal"] .term-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 24px;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const TerminalShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', 'Fira Code', monospace" };
  const card: React.CSSProperties = {
    background: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "6px",
    overflow: "hidden",
  };
  const cardPad: React.CSSProperties = { padding: "16px" };

  // Activity graph data — 12 weeks × 7 days
  const weeks = 12;
  const days = 7;
  const activityData = Array.from({ length: weeks * days }, (_, i) => {
    const seed = (i * 13 + 7) % 17;
    return seed < 5 ? 0 : seed < 9 ? 1 : seed < 13 ? 2 : seed < 16 ? 3 : 4;
  });
  const activityColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

  const diffLines = [
    { type: "meta",  text: "diff --git a/src/auth/jwt.ts b/src/auth/jwt.ts" },
    { type: "meta",  text: "index 3a4f9b2..8c1d0e7 100644" },
    { type: "meta",  text: "--- a/src/auth/jwt.ts" },
    { type: "meta",  text: "+++ b/src/auth/jwt.ts" },
    { type: "hunk",  text: "@@ -24,7 +24,10 @@ export function verifyToken(token: string) {" },
    { type: "ctx",   text: "   const payload = jwt.decode(token);" },
    { type: "ctx",   text: "   if (!payload) throw new AuthError('invalid token');" },
    { type: "del",   text: "-  return payload;" },
    { type: "add",   text: "+  const now = Math.floor(Date.now() / 1000);" },
    { type: "add",   text: "+  if (payload.exp && payload.exp < now) {" },
    { type: "add",   text: "+    throw new AuthError('token expired');" },
    { type: "add",   text: "+  }" },
    { type: "add",   text: "+  return payload;" },
    { type: "ctx",   text: " }" },
  ];

  const fileTree = [
    { depth: 0, name: "ui-system/",   isDir: true  },
    { depth: 1, name: "src/",         isDir: true  },
    { depth: 2, name: "components/",  isDir: true  },
    { depth: 3, name: "Button.tsx",   isDir: false },
    { depth: 3, name: "Input.tsx",    isDir: false },
    { depth: 3, name: "Modal.tsx",    isDir: false },
    { depth: 2, name: "themes/",      isDir: true  },
    { depth: 3, name: "Terminal.tsx", isDir: false, active: true },
    { depth: 3, name: "Cyberpunk.tsx",isDir: false },
    { depth: 2, name: "utils/",       isDir: true  },
    { depth: 3, name: "colors.ts",    isDir: false },
    { depth: 3, name: "layout.ts",    isDir: false },
    { depth: 1, name: "package.json", isDir: false },
    { depth: 1, name: "bun.lockb",    isDir: false },
    { depth: 1, name: "server.ts",    isDir: false },
  ];

  return (
    <div style={{ ...mono, background: "#0d1117", color: "#e6edf3", minHeight: "100%", padding: "24px", boxSizing: "border-box" }}>

      {/* ── REPO HEADER ── */}
      <div style={{ ...card, marginBottom: "16px" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #30363d", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ color: "#8b949e", fontSize: "14px" }}>eastill /</span>
          <span style={{ color: "#58a6ff", fontSize: "16px", fontWeight: 700 }}>ui-system</span>
          <span style={{ background: "#21262d", border: "1px solid #30363d", borderRadius: "20px", padding: "2px 10px", fontSize: "11px", color: "#8b949e" }}>Public</span>
        </div>
        <div style={{ padding: "10px 20px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { icon: "★", label: "Stars",    val: "2.4k" },
            { icon: "⑂", label: "Forks",    val: "381"  },
            { icon: "◎", label: "Watching", val: "47"   },
            { icon: "◉", label: "Issues",   val: "12"   },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#8b949e" }}>
              <span style={{ color: "#e3b341" }}>{s.icon}</span>
              <span style={{ color: "#e6edf3", fontWeight: 600 }}>{s.val}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        {/* Status badges */}
        <div style={{ padding: "0 20px 16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { label: "build", value: "passing", bg: "#39d353" },
            { label: "coverage", value: "94%", bg: "#39d353" },
            { label: "license", value: "MIT", bg: "#58a6ff" },
            { label: "version", value: "2.1.0", bg: "#d2a8ff" },
          ].map(b => (
            <div key={b.label} style={{ display: "inline-flex", fontSize: "11px", borderRadius: "3px", overflow: "hidden", border: "1px solid #30363d" }}>
              <span style={{ background: "#21262d", padding: "3px 7px", color: "#8b949e" }}>{b.label}</span>
              <span style={{ background: b.bg, padding: "3px 7px", color: "#0d1117", fontWeight: 700 }}>{b.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "16px", marginBottom: "16px" }}>
        {/* ── FILE TREE ── */}
        <div style={{ ...card }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid #30363d", fontSize: "12px", color: "#8b949e", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#39d353" }}>⑂</span> main
          </div>
          <div style={{ padding: "8px 0" }}>
            {fileTree.map((f, i) => (
              <div key={i} style={{
                padding: "3px 14px",
                paddingLeft: `${14 + f.depth * 14}px`,
                fontSize: "12px",
                color: f.active ? "#e6edf3" : f.isDir ? "#58a6ff" : "#8b949e",
                background: f.active ? "rgba(88,166,255,0.08)" : "transparent",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                <span style={{ opacity: 0.6 }}>{f.isDir ? "📁" : "📄"}</span>
                {f.name}
              </div>
            ))}
          </div>
        </div>

        {/* ── TERMINAL BLOCK + DIFF ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Terminal block */}
          <div style={{ ...card }}>
            <div style={{ padding: "8px 14px", borderBottom: "1px solid #30363d", background: "#010409", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f85149", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e3b341", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#39d353", display: "inline-block" }} />
              <span style={{ marginLeft: "8px", fontSize: "11px", color: "#8b949e" }}>bash — ui-system</span>
            </div>
            <div style={{ ...cardPad, background: "#010409", fontSize: "12px", lineHeight: "1.8" }}>
              {[
                { prompt: true,  text: "git log --oneline -5" },
                { prompt: false, text: "8c1d0e7 fix(auth): add token expiry check", color: "#e6edf3" },
                { prompt: false, text: "3a4f9b2 feat(themes): add Cyberpunk showcase", color: "#e6edf3" },
                { prompt: false, text: "f2e8a11 chore: update dependencies", color: "#e6edf3" },
                { prompt: false, text: "b9d3c52 fix(layout): responsive grid breakpoints", color: "#e6edf3" },
                { prompt: false, text: "a7f1d08 feat(y2k): initial theme scaffold", color: "#e6edf3" },
                { prompt: true,  text: "bun run dev" },
                { prompt: false, text: "$ bun server.ts --hot", color: "#8b949e" },
                { prompt: false, text: "✓  Server listening on http://localhost:3000", color: "#39d353" },
                { prompt: false, text: "✓  HMR enabled, watching src/**", color: "#39d353" },
                { prompt: false, text: "✓  4 themes loaded", color: "#39d353" },
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "8px" }}>
                  {line.prompt && <span style={{ color: "#39d353", userSelect: "none" }}>❯</span>}
                  {!line.prompt && <span style={{ color: "transparent", userSelect: "none" }}>❯</span>}
                  <span style={{ color: line.color ?? "#58a6ff" }}>{line.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diff view */}
          <div style={{ ...card }}>
            <div style={{ padding: "8px 14px", borderBottom: "1px solid #30363d", fontSize: "12px", color: "#8b949e", display: "flex", gap: "16px" }}>
              <span>src/auth/jwt.ts</span>
              <span style={{ color: "#39d353" }}>+5</span>
              <span style={{ color: "#f85149" }}>-1</span>
            </div>
            <div style={{ fontSize: "12px", lineHeight: "1.7" }}>
              {diffLines.map((line, i) => {
                const bg = line.type === "add" ? "rgba(57,211,83,0.1)" : line.type === "del" ? "rgba(248,81,73,0.1)" : line.type === "hunk" ? "rgba(88,166,255,0.08)" : "transparent";
                const col = line.type === "add" ? "#39d353" : line.type === "del" ? "#f85149" : line.type === "hunk" ? "#58a6ff" : "#8b949e";
                return (
                  <div key={i} style={{ padding: "1px 14px", background: bg, color: col, fontFamily: "inherit" }}>
                    {line.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIVITY GRAPH ── */}
      <div style={{ ...card, marginBottom: "16px" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #30363d", fontSize: "13px", color: "#8b949e" }}>
          <span style={{ color: "#e6edf3" }}>847</span> contributions in the last year
        </div>
        <div style={{ padding: "16px", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: "3px" }}>
            {Array.from({ length: weeks }, (_, w) => (
              <div key={w} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {Array.from({ length: days }, (_, d) => {
                  const idx = w * days + d;
                  return (
                    <div
                      key={d}
                      title={`${activityData[idx]} commits`}
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "2px",
                        background: activityColors[activityData[idx]],
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "11px", color: "#8b949e" }}>
            <span>Less</span>
            {activityColors.map((c, i) => (
              <div key={i} style={{ width: "11px", height: "11px", borderRadius: "2px", background: c, border: "1px solid rgba(255,255,255,0.04)" }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM STATS ROW ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
        {[
          { label: "Total Commits",  value: "1,284", color: "#39d353" },
          { label: "Open PRs",       value: "7",     color: "#58a6ff" },
          { label: "Closed Issues",  value: "94",    color: "#d2a8ff" },
          { label: "Code Coverage",  value: "94.2%", color: "#e3b341" },
          { label: "Bundle Size",    value: "82 kB", color: "#39d353" },
          { label: "Dependabot",     value: "0 ⚠",  color: "#8b949e" },
        ].map(s => (
          <div key={s.label} style={{ ...card, padding: "14px 16px" }}>
            <div style={{ fontSize: "11px", color: "#8b949e", marginBottom: "4px" }}>{s.label}</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#0d1117",
  sidebarBg: "#161b22",
  border:    "#30363d",
  text:      "#e6edf3",
  textMuted: "#8b949e",
  accent:    "#58a6ff",
  accent2:   "#39d353",
  cardBg:    "#161b22",
  inputBg:   "#0d1117",
};

export const TerminalTheme: ThemeDefinition = {
  id: "terminal",
  name: "Terminal",
  emoji: "💻",
  description: "Dark GitHub-style developer theme with monospaced typography, activity graphs, and a full repo dashboard aesthetic.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg:        "#010409",
      sidebarBg: "#0d1117",
      border:    "#21262d",
      text:      "#f0f6fc",
      textMuted: "#8b949e",
      accent:    "#58a6ff",
      accent2:   "#39d353",
      cardBg:    "#0d1117",
      inputBg:   "#010409",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: TerminalShowcase,
};
