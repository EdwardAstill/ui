import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');

/* ── Keyframes ── */

@keyframes cp-glitch {
  0%   { clip-path: inset(10% 0 85% 0); transform: translate(-4px, 0); color: #ff00aa; }
  10%  { clip-path: inset(55% 0 30% 0); transform: translate(4px, 0);  color: #00ffcc; }
  20%  { clip-path: inset(80% 0 5%  0); transform: translate(-2px, 0); color: #ff00aa; }
  30%  { clip-path: inset(25% 0 60% 0); transform: translate(2px, 0);  color: #00ffcc; }
  40%  { clip-path: inset(45% 0 40% 0); transform: translate(-3px, 0); color: #ff00aa; }
  50%  { clip-path: inset(70% 0 10% 0); transform: translate(3px, 0);  color: #00ffcc; }
  60%  { clip-path: inset(15% 0 75% 0); transform: translate(-1px, 0); color: #ff00aa; }
  70%  { clip-path: inset(60% 0 20% 0); transform: translate(1px, 0);  color: #00ffcc; }
  80%  { clip-path: inset(35% 0 50% 0); transform: translate(-4px, 0); color: #ff00aa; }
  90%  { clip-path: inset(5%  0 90% 0); transform: translate(4px, 0);  color: #00ffcc; }
  100% { clip-path: inset(0%  0 100% 0); transform: translate(0, 0);   color: #ff00aa; }
}

@keyframes cp-rotate {
  0%   { --cp-grad-angle: 0deg; }
  100% { --cp-grad-angle: 360deg; }
}

@keyframes cp-neon-pulse {
  0%, 100% {
    box-shadow: 0 0 4px #ff00aa, 0 0 8px #ff00aa44;
  }
  50% {
    box-shadow: 0 0 10px #ff00aa, 0 0 20px #ff00aaaa, 0 0 40px #ff00aa44;
  }
}

@keyframes cp-neon-pulse-cyan {
  0%, 100% {
    box-shadow: 0 0 4px #00ffcc, 0 0 8px #00ffcc44;
  }
  50% {
    box-shadow: 0 0 10px #00ffcc, 0 0 24px #00ffccaa, 0 0 48px #00ffcc44;
  }
}

@keyframes cp-scroll-feed {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

@keyframes cp-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

@keyframes cp-ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes cp-flicker {
  0%, 96%, 100% { opacity: 1; }
  97%           { opacity: 0.8; }
  98%           { opacity: 1; }
  99%           { opacity: 0.85; }
}

/* ── Custom property for rotating gradient (Houdini-compatible) ── */
@property --cp-grad-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

/* ── Root Variables ── */

[data-theme="cyberpunk"] {
  --bg:          #05010f;
  --sidebar-bg:  #080415;
  --border:      #1a0f2e;
  --border-hot:  #ff00aa55;
  --border-cyan: #00ffcc44;
  --text:        #e8e0f0;
  --text-muted:  #6a5f80;
  --accent:      #ff00aa;
  --accent-2:    #00ffcc;
  --card-bg:     #0c0820;
  --input-bg:    #0a0618;
  --font-body:   'JetBrains Mono', 'Courier New', monospace;
  --font-mono:   'JetBrains Mono', 'Courier New', monospace;
  --radius:      2px;
}

/* ── Base ── */

[data-theme="cyberpunk"] .cp-root {
  font-family: var(--font-body);
  color: var(--text);
  background: var(--bg);
  min-height: 100%;
  position: relative;
}

/* ── Grid pattern bg ── */

[data-theme="cyberpunk"] .cp-root::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(rgba(0, 255, 204, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 204, 0.025) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* ── Main panel scanlines ── */

[data-theme="cyberpunk"] .cp-main-panel {
  position: relative;
  z-index: 1;
}

[data-theme="cyberpunk"] .cp-main-panel::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 0, 0, 0.03) 3px,
    rgba(0, 0, 0, 0.03) 4px
  );
}

/* ── Ticker bar ── */

[data-theme="cyberpunk"] .cp-ticker-wrap {
  border-bottom: 1px solid var(--border-hot);
  overflow: hidden;
  height: 26px;
  display: flex;
  align-items: center;
  background: rgba(255, 0, 170, 0.05);
}

[data-theme="cyberpunk"] .cp-ticker-inner {
  display: flex;
  gap: 0;
  white-space: nowrap;
  animation: cp-ticker 22s linear infinite;
}

[data-theme="cyberpunk"] .cp-ticker-item {
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0 20px;
  border-right: 1px solid var(--border);
}

[data-theme="cyberpunk"] .cp-ticker-item.up   { color: var(--accent-2); }
[data-theme="cyberpunk"] .cp-ticker-item.down { color: #ff3b3b; }
[data-theme="cyberpunk"] .cp-ticker-item.hot  { color: var(--accent); }

/* ── Header ── */

[data-theme="cyberpunk"] .cp-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 32px 0 20px;
  border-bottom: 1px solid var(--border-hot);
  margin-bottom: 36px;
  gap: 24px;
}

[data-theme="cyberpunk"] .cp-sku {
  font-size: 10px;
  letter-spacing: 0.25em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 4px;
}

/* ── Split neon title ── */
/* Magenta left half + cyan right half via background-clip trick */

[data-theme="cyberpunk"] .cp-header-title {
  font-family: var(--font-mono);
  font-size: 52px;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1;
  position: relative;
  display: inline-block;
  cursor: default;
  animation: cp-flicker 12s infinite;
  /* Gradient spanning magenta → cyan left-to-right */
  background: linear-gradient(90deg, #ff00aa 40%, #00ffcc 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 8px #ff00aa88) drop-shadow(0 0 16px #00ffcc44);
}

/* Glitch pseudo-layers on hover — they don't inherit background-clip,
   so we color them directly via the animation */
[data-theme="cyberpunk"] .cp-header-title::before,
[data-theme="cyberpunk"] .cp-header-title::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  font-family: var(--font-mono);
  font-size: 52px;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1;
  background: none;
  -webkit-text-fill-color: initial;
  color: #ff00aa;
  opacity: 0;
  pointer-events: none;
}

[data-theme="cyberpunk"] .cp-header-title:hover::before {
  opacity: 0.9;
  animation: cp-glitch 0.4s steps(1) infinite;
}

[data-theme="cyberpunk"] .cp-header-title:hover::after {
  opacity: 0.7;
  animation: cp-glitch 0.4s steps(1) infinite reverse;
  animation-delay: 0.05s;
  color: #00ffcc;
}

/* ── System status bar ── */

[data-theme="cyberpunk"] .cp-status-bar {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 8px;
  padding: 6px 10px;
  background: rgba(0, 255, 204, 0.04);
  border: 1px solid var(--border-cyan);
}

[data-theme="cyberpunk"] .cp-stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 32px;
}

/* ── Standard card ── */

[data-theme="cyberpunk"] .cp-card {
  background: var(--card-bg);
  border: 1px solid var(--border-hot);
  padding: 18px 20px;
  position: relative;
  overflow: hidden;
}

[data-theme="cyberpunk"] .cp-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.5;
}

[data-theme="cyberpunk"] .cp-card-label {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

[data-theme="cyberpunk"] .cp-card-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--accent-2);
  letter-spacing: 0.02em;
  line-height: 1;
  text-shadow: 0 0 12px var(--accent-2);
}

[data-theme="cyberpunk"] .cp-card-value.hot {
  color: var(--accent);
  text-shadow: 0 0 12px var(--accent);
}

[data-theme="cyberpunk"] .cp-card-sub {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 4px;
  letter-spacing: 0.08em;
}

/* ── Holographic card — rotating conic-gradient border ── */

[data-theme="cyberpunk"] .cp-holo-wrap {
  position: relative;
  padding: 2px;
  border-radius: var(--radius);
  background: conic-gradient(
    from var(--cp-grad-angle),
    #ff00aa,
    #00ffcc,
    #ff00aa55,
    #00ffcc55,
    #ff00aa
  );
  animation: cp-rotate 3s linear infinite;
}

[data-theme="cyberpunk"] .cp-holo-inner {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  position: relative;
  overflow: hidden;
}

[data-theme="cyberpunk"] .cp-holo-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 0, 170, 0.08) 0%,
    transparent 50%,
    rgba(0, 255, 204, 0.08) 100%
  );
  pointer-events: none;
}

[data-theme="cyberpunk"] .cp-holo-badge {
  display: inline-block;
  font-size: 8px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--border-hot);
  padding: 3px 8px;
  margin-bottom: 12px;
}

[data-theme="cyberpunk"] .cp-feed-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-hot);
  background: rgba(255, 204, 0.04);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-2);
}

[data-theme="cyberpunk"] .cp-feed-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff44;
  box-shadow: 0 0 6px #00ff44;
  animation: cp-blink 1s ease-in-out infinite;
  flex-shrink: 0;
}

[data-theme="cyberpunk"] .cp-feed-body {
  height: 160px;
  overflow: hidden;
  position: relative;
}

[data-theme="cyberpunk"] .cp-feed-body::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(0deg, var(--card-bg), transparent);
  pointer-events: none;
  z-index: 2;
}

[data-theme="cyberpunk"] .cp-feed-scroll {
  animation: cp-scroll-feed 18s linear infinite;
}

[data-theme="cyberpunk"] .cp-feed-line {
  padding: 3px 14px;
  font-size: 10px;
  letter-spacing: 0.05em;
  color: #00ff44;
  line-height: 1.7;
  font-family: var(--font-mono);
}

[data-theme="cyberpunk"] .cp-feed-line .ts {
  color: var(--text-muted);
  margin-right: 8px;
}

[data-theme="cyberpunk"] .cp-feed-line .tag-warn  { color: var(--accent); }
[data-theme="cyberpunk"] .cp-feed-line .tag-err   { color: #ff3b3b; }
[data-theme="cyberpunk"] .cp-feed-line .tag-ok    { color: #00ff44; }
[data-theme="cyberpunk"] .cp-feed-line .tag-info  { color: var(--accent-2); }

[data-theme="cyberpunk"] .cp-cursor {
  display: inline-block;
  width: 7px;
  height: 12px;
  background: #00ff44;
  vertical-align: middle;
  animation: cp-blink 0.9s step-start infinite;
  margin-left: 2px;
}

/* ── Buttons ── */

[data-theme="cyberpunk"] .cp-btn-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

[data-theme="cyberpunk"] .cp-btn {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 10px 22px;
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s, color 0.15s;
  position: relative;
}

[data-theme="cyberpunk"] .cp-btn:hover {
  background: rgba(255, 0, 170, 0.12);
  box-shadow: 0 0 12px var(--accent), inset 0 0 12px rgba(255, 0, 170, 0.1);
}

[data-theme="cyberpunk"] .cp-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

[data-theme="cyberpunk"] .cp-btn:active {
  transform: scale(0.97);
  background: rgba(255, 0, 170, 0.2);
}

[data-theme="cyberpunk"] .cp-btn.cyan {
  border-color: var(--accent-2);
  color: var(--accent-2);
}

[data-theme="cyberpunk"] .cp-btn.cyan:hover {
  background: rgba(0, 255, 204, 0.1);
  box-shadow: 0 0 12px var(--accent-2), inset 0 0 12px rgba(0, 255, 204, 0.08);
}

/* EXECUTE — chevron clip-path */
[data-theme="cyberpunk"] .cp-btn-execute {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  padding: 12px 36px 12px 28px;
  background: linear-gradient(90deg, #ff00aa, #cc0088);
  color: #fff;
  border: none;
  cursor: pointer;
  position: relative;
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%, 16px 50%);
  transition: filter 0.15s, transform 0.1s;
  filter: drop-shadow(0 0 6px #ff00aaaa);
}

[data-theme="cyberpunk"] .cp-btn-execute:hover {
  filter: drop-shadow(0 0 14px #ff00aa) brightness(1.15);
}

[data-theme="cyberpunk"] .cp-btn-execute:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

[data-theme="cyberpunk"] .cp-btn-execute:active {
  transform: scale(0.97);
}

/* ── Progress bars ── */

[data-theme="cyberpunk"] .cp-progress-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

[data-theme="cyberpunk"] .cp-progress-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

[data-theme="cyberpunk"] .cp-progress-meta {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

[data-theme="cyberpunk"] .cp-progress-track {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

[data-theme="cyberpunk"] .cp-progress-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  animation: cp-neon-pulse 2.5s ease-in-out infinite;
}

[data-theme="cyberpunk"] .cp-progress-fill.cyan {
  background: var(--accent-2);
  animation: cp-neon-pulse-cyan 2.5s ease-in-out infinite;
}

[data-theme="cyberpunk"] .cp-progress-fill.hot {
  background: var(--accent);
  animation: cp-neon-pulse 2.5s ease-in-out infinite;
}

/* ── Table ── */

[data-theme="cyberpunk"] .cp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  letter-spacing: 0.05em;
}

[data-theme="cyberpunk"] .cp-table thead tr {
  border-bottom: 1px solid var(--border-hot);
}

[data-theme="cyberpunk"] .cp-table th {
  text-align: left;
  padding: 8px 12px;
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 400;
}

[data-theme="cyberpunk"] .cp-table td {
  padding: 9px 12px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
}

[data-theme="cyberpunk"] .cp-table td.lit {
  color: var(--text);
}

[data-theme="cyberpunk"] .cp-table td.pos { color: var(--accent-2); }
[data-theme="cyberpunk"] .cp-table td.neg { color: #ff3b3b; }

[data-theme="cyberpunk"] .cp-table tbody tr {
  transition: background 0.12s, box-shadow 0.12s;
}

[data-theme="cyberpunk"] .cp-table tbody tr:hover {
  background: rgba(255, 0, 170, 0.06);
  box-shadow: inset 2px 0 0 var(--accent), inset -2px 0 0 var(--accent);
}

[data-theme="cyberpunk"] .cp-table tbody tr:hover td {
  color: var(--text);
  text-shadow: 0 0 8px rgba(255, 0, 170, 0.4);
}

/* ── Two-column layout ── */

[data-theme="cyberpunk"] .cp-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 32px;
}

[data-theme="cyberpunk"] .cp-cols-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 32px;
}

/* ── Form input ── */

[data-theme="cyberpunk"] .cp-input {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--text);
  background: var(--input-bg);
  border: 1px solid var(--border-hot);
  padding: 8px 12px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

[data-theme="cyberpunk"] .cp-input:focus {
  border-color: var(--accent-2);
  box-shadow: 0 0 0 2px rgba(0, 255, 204, 0.15);
}

[data-theme="cyberpunk"] .cp-input::placeholder {
  color: var(--text-muted);
}

/* ── Misc utility ── */

[data-theme="cyberpunk"] .cp-mb-8  { margin-bottom: 8px; }
[data-theme="cyberpunk"] .cp-mb-16 { margin-bottom: 16px; }
[data-theme="cyberpunk"] .cp-mb-32 { margin-bottom: 32px; }
[data-theme="cyberpunk"] .cp-mb-4  { margin-bottom: 4px; }

/* ── LIGHT MODE ── */
[data-theme="cyberpunk"][data-mode="light"] {
  --bg: #f0e8ff;
  --sidebar-bg: #e4d8f8;
  --border: #c0a0e0;
  --border-hot: #ff00aa88;
  --border-cyan: #00ccaa88;
  --text: #1a0030;
  --text-muted: #6a40a0;
  --card-bg: #e8daf8;
  --input-bg: #f4eeff;
}
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const CyberpunkShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', 'Courier New', monospace" };

  const neonCard = (accentColor: string, extra?: React.CSSProperties): React.CSSProperties => ({
    background: "#0c0820",
    border: `1px solid ${accentColor}44`,
    boxShadow: `0 0 8px ${accentColor}22, inset 0 0 16px ${accentColor}08`,
    position: "relative",
    overflow: "hidden",
    ...extra,
  });

  const tickerItems = [
    { label: "NEURO-LINK v4.2", val: "ONLINE", cls: "up" },
    { label: "CORP-NET BREACH", val: "DETECTED", cls: "down" },
    { label: "ICE FIREWALL", val: "87.3%", cls: "hot" },
    { label: "BLACK MARKET", val: "+12.4%", cls: "up" },
    { label: "ARASAKA STOCK", val: "-4.2%", cls: "down" },
    { label: "MILITECH OPS", val: "ACTIVE", cls: "hot" },
    { label: "NEURAL TRAFFIC", val: "4.1 TB/s", cls: "up" },
    { label: "GRID POWER", val: "NOMINAL", cls: "up" },
    { label: "ROGUE AI ALERT", val: "LEVEL 2", cls: "down" },
    { label: "CYBERWARE MODS", val: "+8.9%", cls: "up" },
  ];

  const systemNodes = [
    { id: "SYS-001", name: "NEURAL_CORE",    status: "ONLINE",   load: 78, color: "#00ffcc" },
    { id: "SYS-002", name: "ICE_MATRIX",     status: "ACTIVE",   load: 45, color: "#00ffcc" },
    { id: "SYS-003", name: "CORP_FIREWALL",  status: "WARNING",  load: 92, color: "#ff00aa" },
    { id: "SYS-004", name: "DATA_BROKER",    status: "ONLINE",   load: 31, color: "#00ffcc" },
    { id: "SYS-005", name: "GHOST_PROTOCOL", status: "OFFLINE",  load: 0,  color: "#ff3b3b" },
    { id: "SYS-006", name: "STREET_GRID",    status: "ONLINE",   load: 56, color: "#00ffcc" },
  ];

  const intrusions = [
    { time: "04:17:32", src: "192.168.77.14", type: "BRUTE_FORCE",  status: "BLOCKED",  sev: "MED" },
    { time: "04:18:01", src: "10.0.0.255",    type: "PORT_SCAN",    status: "BLOCKED",  sev: "LOW" },
    { time: "04:19:44", src: "UNKNOWN",        type: "ICE_BREACH",   status: "ACTIVE",   sev: "CRIT" },
    { time: "04:21:09", src: "203.0.113.42",  type: "DATA_EXFIL",   status: "BLOCKED",  sev: "HIGH" },
    { time: "04:22:55", src: "172.16.0.88",   type: "NETWATCH_PING",status: "ALLOWED",  sev: "INFO" },
  ];

  const logLines = [
    { ts: "04:22:56", tag: "ok",   msg: "NEURAL_LINK :: handshake complete" },
    { ts: "04:22:57", tag: "info", msg: "CORP_NET :: auth token refreshed" },
    { ts: "04:22:58", tag: "warn", msg: "ICE_MATRIX :: anomaly detected at 0xF4A2" },
    { ts: "04:22:59", tag: "ok",   msg: "GHOST_PROTOCOL :: stealth mode engaged" },
    { ts: "04:23:00", tag: "err",  msg: "ARASAKA_FIREWALL :: breach attempt 0x9E1C" },
    { ts: "04:23:01", tag: "ok",   msg: "NETWATCH :: countermeasure deployed" },
    { ts: "04:23:02", tag: "info", msg: "STREET_GRID :: sector 7 rerouted" },
    { ts: "04:23:03", tag: "warn", msg: "DATA_BROKER :: price spike detected" },
    { ts: "04:23:04", tag: "ok",   msg: "NEURAL_CORE :: sync 99.7%" },
    { ts: "04:22:56", tag: "ok",   msg: "NEURAL_LINK :: handshake complete" },
    { ts: "04:22:57", tag: "info", msg: "CORP_NET :: auth token refreshed" },
    { ts: "04:22:58", tag: "warn", msg: "ICE_MATRIX :: anomaly detected at 0xF4A2" },
    { ts: "04:22:59", tag: "ok",   msg: "GHOST_PROTOCOL :: stealth mode engaged" },
    { ts: "04:23:00", tag: "err",  msg: "ARASAKA_FIREWALL :: breach attempt 0x9E1C" },
  ];

  const tagColor: Record<string, string> = { ok: "#00ff44", info: "#00ffcc", warn: "#ff00aa", err: "#ff3b3b" };
  const sevColor: Record<string, string> = { CRIT: "#ff3b3b", HIGH: "#ff00aa", MED: "#e3b341", LOW: "#00ffcc", INFO: "#6a5f80" };
  const statusColor: Record<string, string> = { ACTIVE: "#ff3b3b", BLOCKED: "#00ffcc", ALLOWED: "#6a5f80" };

  return (
    <div style={{ ...mono, background: "#05010f", color: "#e8e0f0", minHeight: "100%", boxSizing: "border-box", position: "relative" }}>

      {/* Grid BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(0,255,204,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,204,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Scanlines */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* TICKER */}
        <div className="cp-ticker-wrap">
          <div className="cp-ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className={`cp-ticker-item ${item.cls}`}>
                {item.label} :: {item.val}
              </span>
            ))}
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* HEADLINE */}
          <div style={{ marginBottom: "28px", borderBottom: "1px solid #ff00aa55", paddingBottom: "20px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#6a5f80", textTransform: "uppercase", marginBottom: "6px" }}>
              ◈ NETWATCH COMMAND CENTER ◈ NODE-7 ◈ SECTOR 12
            </div>
            <h1
              className="cp-header-title"
              data-text="CYBERPUNK"
              style={{ fontSize: "48px", fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1, margin: "0 0 8px", display: "block", background: "linear-gradient(90deg, #ff00aa 40%, #00ffcc 60%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 8px #ff00aa88) drop-shadow(0 0 16px #00ffcc44)", animation: "cp-flicker 12s infinite" }}
            >
              CYBERPUNK
            </h1>
            <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
              {[
                { label: "THREAT LEVEL", val: "CRITICAL", col: "#ff3b3b" },
                { label: "ICE INTEGRITY", val: "87.3%", col: "#00ffcc" },
                { label: "NET LATENCY", val: "2ms", col: "#00ffcc" },
                { label: "AGENTS ACTIVE", val: "14", col: "#ff00aa" },
              ].map(s => (
                <div key={s.label} style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
                  <span style={{ color: "#6a5f80" }}>{s.label}: </span>
                  <span style={{ color: s.col, textShadow: `0 0 8px ${s.col}` }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STAT CARDS ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px", marginBottom: "24px" }}>
            {[
              { label: "NEURAL SYNCS",    val: "4,821",  sub: "+12 this cycle",  hot: false },
              { label: "ICE BREACHES",    val: "7",       sub: "2 critical",      hot: true  },
              { label: "DATA STREAMS",    val: "1.4 TB",  sub: "outbound/hr",     hot: false },
              { label: "ROGUE AI NODES",  val: "3",       sub: "contained",       hot: true  },
              { label: "CREDITS FLOW",    val: "¥847K",   sub: "last 24h",        hot: false },
            ].map(c => (
              <div key={c.label} style={{ ...neonCard(c.hot ? "#ff00aa" : "#00ffcc", { padding: "14px 16px" }) }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${c.hot ? "#ff00aa" : "#00ffcc"}, transparent)` }} />
                <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6a5f80", marginBottom: "6px" }}>{c.label}</div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: c.hot ? "#ff00aa" : "#00ffcc", textShadow: `0 0 12px ${c.hot ? "#ff00aa" : "#00ffcc"}`, lineHeight: 1, marginBottom: "4px" }}>{c.val}</div>
                <div style={{ fontSize: "9px", color: "#6a5f80", letterSpacing: "0.06em" }}>{c.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>

            {/* SYSTEM NODES */}
            <div style={{ ...neonCard("#00ffcc", { overflow: "hidden" }) }}>
              <div style={{ padding: "10px 14px", borderBottom: "1px solid #00ffcc22", display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00ffcc" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff44", boxShadow: "0 0 6px #00ff44", animation: "cp-blink 1s ease-in-out infinite", display: "inline-block" }} />
                SYSTEM NODES
              </div>
              <div>
                {systemNodes.map(node => (
                  <div key={node.id} style={{ display: "grid", gridTemplateColumns: "64px 1fr 70px 60px", alignItems: "center", padding: "7px 14px", borderBottom: "1px solid #1a0f2e", fontSize: "11px" }}>
                    <span style={{ color: "#6a5f80" }}>{node.id}</span>
                    <span style={{ color: "#e8e0f0", letterSpacing: "0.04em" }}>{node.name}</span>
                    <span style={{ color: node.color, fontSize: "9px", letterSpacing: "0.1em", textShadow: `0 0 6px ${node.color}` }}>{node.status}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <div style={{ flex: 1, height: "3px", background: "#1a0f2e", overflow: "hidden" }}>
                        <div style={{ width: `${node.load}%`, height: "100%", background: node.load > 80 ? "#ff00aa" : "#00ffcc", boxShadow: `0 0 4px ${node.load > 80 ? "#ff00aa" : "#00ffcc"}` }} />
                      </div>
                      <span style={{ fontSize: "9px", color: "#6a5f80", width: "26px" }}>{node.load}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE LOG FEED */}
            <div style={{ ...neonCard("#ff00aa", { overflow: "hidden" }) }}>
              <div className="cp-feed-header">
                <span className="cp-feed-dot" />
                LIVE NET LOG
              </div>
              <div className="cp-feed-body">
                <div className="cp-feed-scroll">
                  {[...logLines, ...logLines].map((line, i) => (
                    <div key={i} className="cp-feed-line">
                      <span className="ts">{line.ts}</span>
                      <span className={`tag-${line.tag}`}>[{line.tag.toUpperCase()}]</span>
                      {" "}{line.msg}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* INTRUSION DETECTION TABLE */}
          <div style={{ ...neonCard("#ff00aa", { marginBottom: "20px", overflow: "hidden" }) }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid #ff00aa33", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff00aa" }}>
              INTRUSION DETECTION — LAST 5 EVENTS
            </div>
            <table className="cp-table" style={{ ...mono }}>
              <thead>
                <tr>
                  {["TIME", "SOURCE", "TYPE", "STATUS", "SEV"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {intrusions.map((row, i) => (
                  <tr key={i}>
                    <td style={{ color: "#6a5f80" }}>{row.time}</td>
                    <td className="lit">{row.src}</td>
                    <td style={{ color: "#e8e0f0", letterSpacing: "0.04em" }}>{row.type}</td>
                    <td style={{ color: statusColor[row.status] ?? "#6a5f80", textShadow: `0 0 6px ${statusColor[row.status] ?? "#6a5f80"}`, fontSize: "10px" }}>{row.status}</td>
                    <td style={{ color: sevColor[row.sev], fontWeight: 700, fontSize: "10px", textShadow: `0 0 6px ${sevColor[row.sev]}` }}>{row.sev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PROGRESS + ACTIONS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ ...neonCard("#00ffcc", { padding: "16px" }) }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00ffcc", marginBottom: "14px" }}>NEURAL BANDWIDTH</div>
              <div className="cp-progress-group">
                {[
                  { label: "UPLOAD",   pct: 74, cls: "hot" },
                  { label: "DOWNLOAD", pct: 48, cls: "cyan" },
                  { label: "ICE SYNC", pct: 87, cls: "" },
                  { label: "LATENCY",  pct: 12, cls: "cyan" },
                ].map(p => (
                  <div key={p.label} className="cp-progress-row">
                    <div className="cp-progress-meta">
                      <span>{p.label}</span>
                      <span>{p.pct}%</span>
                    </div>
                    <div className="cp-progress-track">
                      <div className={`cp-progress-fill ${p.cls}`} style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...neonCard("#ff00aa", { padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }) }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ff00aa", marginBottom: "2px" }}>COMMAND INTERFACE</div>
              <input className="cp-input" placeholder="ENTER DIRECTIVE..." style={{ ...mono }} />
              <div className="cp-btn-row">
                <button className="cp-btn-execute" style={{ ...mono }}>EXECUTE</button>
                <button className="cp-btn cyan" style={{ ...mono }}>SCAN</button>
                <button className="cp-btn" style={{ ...mono }}>BREACH</button>
              </div>
              <div style={{ fontSize: "10px", color: "#6a5f80", letterSpacing: "0.05em" }}>
                <span style={{ color: "#00ff44" }}>$</span> NETWATCH_CMD v4.2 :: node-7 :: sector-12<span className="cp-cursor" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TICKER */}
        <div className="cp-ticker-wrap" style={{ borderTop: "1px solid #ff00aa55", borderBottom: "none", marginTop: "4px" }}>
          <div className="cp-ticker-inner" style={{ animationDirection: "reverse" }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className={`cp-ticker-item ${item.cls}`}>
                {item.val} :: {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#05010f",
  sidebarBg: "#080415",
  border:    "#1a0f2e",
  text:      "#e8e0f0",
  textMuted: "#6a5f80",
  accent:    "#ff00aa",
  accent2:   "#00ffcc",
  cardBg:    "#0c0820",
  inputBg:   "#0a0618",
};

export const CyberpunkTheme: ThemeDefinition = {
  id: "cyberpunk",
  name: "Cyberpunk",
  emoji: "🤖",
  description: "Neon magenta and cyan on void-black. Animated scanlines, glitch effects, live intrusion feed, and a full NETWATCH command center aesthetic.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Hot Pink": {
      bg:        "#0f0008",
      sidebarBg: "#140010",
      border:    "#2a0020",
      text:      "#ffe0f4",
      textMuted: "#804060",
      accent:    "#ff0066",
      accent2:   "#ff66ff",
      cardBg:    "#180010",
      inputBg:   "#120008",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: CyberpunkShowcase,
};
