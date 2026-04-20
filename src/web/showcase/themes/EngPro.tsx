import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";
import { FeatureCard } from "../components/Layouts";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

/* ── CSS VARIABLES ── */
[data-theme="eng-pro"] {
  --bg:           #1e1e1e;
  --panel-bg:     #252526;
  --panel-bg2:    #2d2d30;
  --border:       #3c3c3c;
  --border-light: #2a2a2a;
  --text:         #cccccc;
  --text-muted:   #858585;
  --text-dim:     #555555;
  --accent:       #0e7acc;
  --accent-hover: #1a85d6;
  --success:      #4ec9b0;
  --warning:      #d7ba7d;
  --error:        #f44747;
  --viewport-bg:  #0f0f1a;
  --menubar-bg:   #1c1c1c;
  --toolbar-bg:   #252526;
  --statusbar-bg: #007acc;
  --font-body:    system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono:    'JetBrains Mono', 'Consolas', 'Courier New', monospace;
}

/* ── ROOT LAYOUT ── */
[data-theme="eng-pro"] .ep-root {
  display: flex;
  height: 100%;
  flex-direction: column;
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  font-size: 12px;
  overflow-y: auto;
}

/* ── MENU BAR ── */
[data-theme="eng-pro"] .ep-menubar {
  height: 24px;
  min-height: 24px;
  background: var(--menubar-bg);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 4px;
  flex-shrink: 0;
}

[data-theme="eng-pro"] .ep-menu-item {
  padding: 0 10px;
  height: 24px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--text);
  cursor: pointer;
}

[data-theme="eng-pro"] .ep-menu-item:hover {
  background: rgba(0,0,0,0.40);
}

[data-theme="eng-pro"] .ep-mesh-cell {
  transition: filter 0.1s, transform 0.2s;
  cursor: crosshair;
}

[data-theme="eng-pro"] .ep-mesh-cell:hover {
  filter: brightness(1.5);
  transform: scale(1.1);
  z-index: 10;
  border-color: #fff;
}

/* Stress color classes */
[data-theme="eng-pro"] .sc-0  { background: #0000c8; }
[data-theme="eng-pro"] .sc-7  { background: #44dd00; }
[data-theme="eng-pro"] .sc-15 { background: #bb0000; }

[data-theme="eng-pro"] .ep-console {
  height: 160px;
  background: #0c0c0e;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 8px;
  overflow-y: auto;
}

[data-theme="eng-pro"] .ep-features {
  padding: 40px;
  background: var(--panel-bg);
  border-top: 1px solid var(--border);
}

[data-theme="eng-pro"] .ep-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const EngProShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const c = colors || defaultColors;

  const panel: React.CSSProperties = {
    background: "#252526",
    border: "1px solid #3c3c3c",
    borderRadius: "2px",
  };

  const panelHdr: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 12px",
    borderBottom: "1px solid #3c3c3c",
    background: "#2d2d30",
  };

  const panelTitle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: "600",
    color: "#858585",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
  };

  const mono: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', 'Consolas', monospace",
  };

  const metricVal: React.CSSProperties = {
    fontSize: "26px",
    fontWeight: "600",
    color: "#0e7acc",
    letterSpacing: "-0.03em",
    lineHeight: 1,
    ...mono,
  };

  const bar = (pct: number, col: string) => (
    <div style={{ height: "6px", background: "#2a2a2a", borderRadius: "1px", overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: col }} />
    </div>
  );

  const statusBadge = (code: number): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "1px 7px",
    fontSize: "11px",
    fontWeight: "600",
    ...mono,
    background: code < 300 ? "rgba(78,201,176,0.15)" : code < 400 ? "rgba(215,186,125,0.15)" : "rgba(244,71,71,0.15)",
    color: code < 300 ? "#4ec9b0" : code < 400 ? "#d7ba7d" : "#f44747",
    borderRadius: "2px",
  });

  const methodBadge = (method: string): React.CSSProperties => ({
    display: "inline-block",
    padding: "1px 6px",
    fontSize: "10px",
    fontWeight: "700",
    ...mono,
    background: method === "GET" ? "rgba(14,122,204,0.2)" : method === "POST" ? "rgba(78,201,176,0.2)" : method === "DELETE" ? "rgba(244,71,71,0.2)" : "rgba(215,186,125,0.2)",
    color: method === "GET" ? "#0e7acc" : method === "POST" ? "#4ec9b0" : method === "DELETE" ? "#f44747" : "#d7ba7d",
    borderRadius: "2px",
  });

  const ciStatus = (s: "pass" | "fail" | "running" | "skip"): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "2px 8px",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    ...mono,
    background: s === "pass" ? "rgba(78,201,176,0.15)" : s === "fail" ? "rgba(244,71,71,0.15)" : s === "running" ? "rgba(14,122,204,0.15)" : "rgba(133,133,133,0.15)",
    color: s === "pass" ? "#4ec9b0" : s === "fail" ? "#f44747" : s === "running" ? "#0e7acc" : "#858585",
    borderRadius: "2px",
  });

  return (
    <div style={{
      background: "#1e1e1e",
      color: "#cccccc",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      minHeight: "100%",
      fontSize: "12px",
    }}>
      {/* ── Status bar (top) ── */}
      <div style={{ height: "22px", background: "#007acc", display: "flex", alignItems: "center", gap: "16px", padding: "0 12px", flexShrink: 0 }}>
        {[
          ["⎇ main", "#fff"],
          ["✓ 0 errors", "#fff"],
          ["⚠ 2 warnings", "#ffdd99"],
          ["CPU 34%", "#fff"],
          ["MEM 6.2 GB", "#fff"],
          ["● LIVE", "#4ec9b0"],
        ].map(([label, col]) => (
          <span key={label as string} style={{ fontSize: "11px", fontWeight: "500", color: col as string, ...mono }}>{label}</span>
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", ...mono }}>UTC 14:32:08</span>
      </div>

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* ── System metrics row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {[
            { label: "CPU Usage", val: "34%", sub: "8 cores · 3.4 GHz", pct: 34, col: "#0e7acc" },
            { label: "Memory", val: "6.2 GB", sub: "16 GB total · 61%", pct: 61, col: "#4ec9b0" },
            { label: "Network I/O", val: "142 MB/s", sub: "↑ 38 · ↓ 104 MB/s", pct: 55, col: "#d7ba7d" },
            { label: "Disk I/O", val: "44 MB/s", sub: "512 GB NVMe · 18%", pct: 18, col: "#569cd6" },
          ].map(({ label, val, sub, pct, col }) => (
            <div key={label} style={panel}>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: "10px", color: "#858585", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px", ...mono }}>{label}</div>
                <div style={metricVal}>{val}</div>
                <div style={{ fontSize: "11px", color: "#555555", marginTop: "4px", marginBottom: "8px", ...mono }}>{sub}</div>
                {bar(pct, col)}
              </div>
            </div>
          ))}
        </div>

        {/* ── CPU sparklines ── */}
        <div style={panel}>
          <div style={panelHdr}>
            <span style={panelTitle}>CPU Core Utilization</span>
            <span style={{ ...mono, fontSize: "10px", color: "#555555" }}>8 cores · last 60s</span>
          </div>
          <div style={{ padding: "12px", display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "8px" }}>
            {[34, 78, 22, 91, 45, 67, 12, 56].map((pct, i) => (
              <div key={i}>
                <div style={{ fontSize: "10px", color: "#858585", ...mono, marginBottom: "4px", textAlign: "center" }}>C{i}</div>
                <div style={{ height: "40px", background: "#1e1e1e", borderRadius: "1px", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${pct}%`, background: pct > 80 ? "#f44747" : pct > 60 ? "#d7ba7d" : "#0e7acc", transition: "height 0.3s" }} />
                </div>
                <div style={{ fontSize: "10px", color: pct > 80 ? "#f44747" : pct > 60 ? "#d7ba7d" : "#4ec9b0", ...mono, textAlign: "center", marginTop: "3px" }}>{pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Middle row: API table + CI/CD pipeline ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {/* API endpoint status */}
          <div style={panel}>
            <div style={panelHdr}>
              <span style={panelTitle}>API Endpoints</span>
              <span style={{ ...mono, fontSize: "10px", color: "#4ec9b0" }}>● ALL SYSTEMS GO</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Method", "Endpoint", "Latency", "Status", "RPS"].map((h) => (
                    <th key={h} style={{ padding: "6px 12px", textAlign: "left", fontSize: "10px", fontWeight: "600", color: "#555555", borderBottom: "1px solid #3c3c3c", letterSpacing: "0.06em", ...mono }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["GET",    "/api/v2/users",          "12ms",  200, "1.4k"],
                  ["POST",   "/api/v2/auth/token",     "34ms",  201, "892"],
                  ["GET",    "/api/v2/metrics",        "8ms",   200, "3.1k"],
                  ["DELETE", "/api/v2/sessions/{id}",  "19ms",  204, "211"],
                  ["GET",    "/api/v2/health",         "2ms",   200, "8.7k"],
                  ["POST",   "/api/v2/webhooks",       "67ms",  404, "44"],
                  ["PUT",    "/api/v2/users/{id}",     "28ms",  200, "317"],
                ].map(([m, ep, lat, code, rps], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #2a2a2a" }}>
                    <td style={{ padding: "7px 12px" }}><span style={methodBadge(m as string)}>{m}</span></td>
                    <td style={{ padding: "7px 12px", ...mono, fontSize: "11px", color: "#cccccc" }}>{ep}</td>
                    <td style={{ padding: "7px 12px", ...mono, fontSize: "11px", color: "#858585" }}>{lat}</td>
                    <td style={{ padding: "7px 12px" }}><span style={statusBadge(code as number)}>{code}</span></td>
                    <td style={{ padding: "7px 12px", ...mono, fontSize: "11px", color: "#858585" }}>{rps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CI/CD pipeline */}
          <div style={panel}>
            <div style={panelHdr}>
              <span style={panelTitle}>CI/CD Pipeline</span>
              <span style={{ ...mono, fontSize: "10px", color: "#858585" }}>commit a4f3c2e</span>
            </div>
            <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { stage: "lint",      label: "ESLint + Prettier",     duration: "14s",  status: "pass" as const },
                { stage: "typecheck", label: "TypeScript Check",      duration: "22s",  status: "pass" as const },
                { stage: "unit",      label: "Unit Tests (312/312)",  duration: "1m04s",status: "pass" as const },
                { stage: "e2e",       label: "E2E Tests (48/48)",     duration: "3m21s",status: "running" as const },
                { stage: "build",     label: "Production Build",      duration: "--",   status: "skip" as const },
                { stage: "deploy",    label: "Deploy to Staging",     duration: "--",   status: "skip" as const },
              ].map(({ stage, label, duration, status }) => (
                <div key={stage} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", background: "#1e1e1e", borderRadius: "2px", border: "1px solid #2a2a2a" }}>
                  <span style={ciStatus(status)}>
                    {(status as string) === "pass" ? "✓" : (status as string) === "fail" ? "✗" : (status as string) === "running" ? "⟳" : "—"} {status}
                  </span>
                  <span style={{ flex: 1, fontSize: "11px", color: "#cccccc" }}>{label}</span>
                  <span style={{ ...mono, fontSize: "10px", color: "#555555" }}>{duration}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #3c3c3c", paddingTop: "8px", display: "flex", gap: "8px" }}>
                <button style={{ padding: "5px 12px", background: "#0e7acc", color: "#fff", border: "none", borderRadius: "2px", fontSize: "11px", fontWeight: "600", cursor: "pointer", ...mono }}>
                  Rerun Failed
                </button>
                <button style={{ padding: "5px 12px", background: "transparent", color: "#858585", border: "1px solid #3c3c3c", borderRadius: "2px", fontSize: "11px", cursor: "pointer", ...mono }}>
                  View Logs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Log viewer ── */}
        <div style={panel}>
          <div style={panelHdr}>
            <span style={panelTitle}>System Log</span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ ...mono, fontSize: "10px", color: "#4ec9b0" }}>● LIVE</span>
              <span style={{ fontSize: "10px", color: "#555555", ...mono }}>tail -f /var/log/app.log</span>
            </div>
          </div>
          <div style={{ padding: "8px 12px", background: "#0c0c0e", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", lineHeight: "1.7" }}>
            {[
              { ts: "14:32:08.441", level: "INFO",  col: "#0e7acc", msg: "API server started on :8080 — workers: 4, timeout: 30s" },
              { ts: "14:32:09.102", level: "INFO",  col: "#0e7acc", msg: "Connected to PostgreSQL @ 10.0.1.4:5432 (pool: 20)" },
              { ts: "14:32:11.877", level: "INFO",  col: "#0e7acc", msg: "Redis cache connected @ 10.0.1.5:6379, ping: 0.4ms" },
              { ts: "14:32:14.003", level: "WARN",  col: "#d7ba7d", msg: "Rate limit threshold at 78% for /api/v2/health — consider scaling" },
              { ts: "14:32:15.289", level: "INFO",  col: "#0e7acc", msg: "Prometheus metrics exposed at /metrics" },
              { ts: "14:32:19.512", level: "ERROR", col: "#f44747", msg: "Webhook delivery failed: POST https://hooks.client.io/events — 404 Not Found" },
              { ts: "14:32:22.801", level: "INFO",  col: "#0e7acc", msg: "Health check passed — latency p99: 12ms, uptime: 99.97%" },
              { ts: "14:32:25.114", level: "INFO",  col: "#4ec9b0", msg: "Deployment a4f3c2e promoted to staging ✓" },
            ].map(({ ts, level, col, msg }, i) => (
              <div key={i} style={{ display: "flex", gap: "12px" }}>
                <span style={{ color: "#555555", flexShrink: 0 }}>{ts}</span>
                <span style={{ color: col, minWidth: "44px", fontWeight: "600" }}>{level}</span>
                <span style={{ color: "#cccccc" }}>{msg}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: "12px", marginTop: "2px" }}>
              <span style={{ color: "#555555" }}>14:32:26.003</span>
              <span style={{ color: "#0e7acc", minWidth: "44px", fontWeight: "600" }}>INFO</span>
              <span style={{ color: "#4ec9b0" }}>█</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#1e1e1e",
  sidebarBg: "#252526",
  border:    "#3c3c3c",
  text:      "#cccccc",
  textMuted: "#858585",
  accent:    "#0e7acc",
  cardBg:    "#252526",
  inputBg:   "#1e1e1e",
};

export const EngProTheme: ThemeDefinition = {
  id: "engpro",
  name: "Eng Pro",
  emoji: "⚙️",
  description: "VS Code-inspired engineering dashboard — system metrics, CPU sparklines, API endpoint monitor, CI/CD pipeline status, and live log viewer.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: EngProShowcase,
};
