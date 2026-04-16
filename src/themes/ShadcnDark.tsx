import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";
import { FeatureCard } from "../components/Layouts";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.bunny.net/css?family=geist:400,500,600&display=swap');
@import url('https://fonts.bunny.net/css?family=geist-mono:400,500&display=swap');

@keyframes sd-spin {
  to { transform: rotate(360deg); }
}

[data-theme="shadcn-dark"] {
  --bg: #0a0a0a;
  --sidebar-bg: #171717;
  --border: rgba(255,255,255,0.1);
  --text: #fafafa;
  --text-muted: #a1a1a1;
  --accent: #e5e5e5;
  --accent-2: #262626;
  --card-bg: #171717;
  --input-bg: rgba(255,255,255,0.15);
  --font-body: 'Geist Sans', 'Geist Sans', 'Geist', system-ui, -apple-system, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', monospace;
  --radius: 0.625rem;
}

/* ── ROOT ── */
[data-theme="shadcn-dark"] .sd-root {
  font-family: var(--font-body);
  color: var(--text);
  background: var(--bg);
  min-height: 100%;
  display: flex;
}

/* ── INTERNAL SIDEBAR ── */
[data-theme="shadcn-dark"] .sd-sidebar {
  width: 200px;
  flex-shrink: 0;
  background: #171717;
  border-right: 1px solid rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
  padding: 20px 0 16px;
  min-height: 100%;
}

[data-theme="shadcn-dark"] .sd-sidebar-logo {
  padding: 0 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 8px;
}

[data-theme="shadcn-dark"] .sd-sidebar-logo-name {
  font-size: 14px;
  font-weight: 600;
  color: #fafafa;
  letter-spacing: -0.01em;
}

[data-theme="shadcn-dark"] .sd-sidebar-logo-sub {
  font-size: 11px;
  color: #a1a1a1;
  margin-top: 2px;
}

[data-theme="shadcn-dark"] .sd-sidebar-section {
  padding: 8px 0 4px;
}

[data-theme="shadcn-dark"] .sd-sidebar-section-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #52525b;
  padding: 0 16px 6px;
}

[data-theme="shadcn-dark"] .sd-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 400;
  color: #a1a1aa;
  cursor: pointer;
  background: transparent;
  transition: background 0.1s, color 0.1s;
}

[data-theme="shadcn-dark"] .sd-nav-item:hover {
  background: rgba(255,255,255,0.06);
  color: #fafafa;
}

[data-theme="shadcn-dark"] .sd-nav-item.active {
  background: rgba(255,255,255,0.1);
  color: #ffffff;
  font-weight: 500;
}

[data-theme="shadcn-dark"] .sd-nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #52525b;
  flex-shrink: 0;
}

[data-theme="shadcn-dark"] .sd-nav-item.active .sd-nav-dot {
  background: #ffffff;
}

[data-theme="shadcn-dark"] .sd-sidebar-spacer {
  flex: 1;
}

[data-theme="shadcn-dark"] .sd-sidebar-ver {
  padding: 12px 16px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 11px;
  font-family: var(--font-mono);
  color: #525252;
  letter-spacing: 0.04em;
}

/* ── MAIN CONTENT ── */
[data-theme="shadcn-dark"] .sd-content {
  flex: 1;
  padding: 32px 36px;
  overflow-y: auto;
}

[data-theme="shadcn-dark"] .sd-content-header {
  margin-bottom: 28px;
}

[data-theme="shadcn-dark"] .sd-content-title {
  font-size: 22px;
  font-weight: 600;
  color: #fafafa;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

[data-theme="shadcn-dark"] .sd-content-subtitle {
  font-size: 13px;
  color: #a1a1a1;
}

/* ── 3-COLUMN GRID ── */
[data-theme="shadcn-dark"] .sd-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: start;
}

/* ── CARD ── */
[data-theme="shadcn-dark"] .sd-card {
  background: #171717;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.625rem;
  overflow: hidden;
}

/* ── SELECT ── */
[data-theme="shadcn-dark"] .sd-select {
  width: 100%;
  padding: 8px 32px 8px 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.5rem;
  font-size: 13px;
  color: #fafafa;
  font-family: var(--font-body);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  cursor: pointer;
  transition: border-color 0.15s;
}

[data-theme="shadcn-dark"] .sd-select:focus {
  border-color: rgba(255,255,255,0.25);
}

[data-theme="shadcn-dark"] .sd-textarea {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.5rem;
  font-size: 13px;
  color: #fafafa;
  font-family: var(--font-body);
  transition: border-color 0.1s;
}

[data-theme="shadcn-dark"] .sd-checkbox.checked {
  background: #fafafa;
  border-color: #fafafa;
}

[data-theme="shadcn-dark"] .sd-checkbox-check {
  width: 9px;
  height: 9px;
  color: #171717;
}

[data-theme="shadcn-dark"] .sd-checkbox-label {
  font-size: 12px;
  color: #fafafa;
}

/* ── BUTTONS ── */
[data-theme="shadcn-dark"] .sd-btn-primary {
  background: #e5e5e5;
  color: #171717;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-body);
  cursor: pointer;
  padding: 7px 14px;
  transition: background 0.1s, border-color 0.1s;
  letter-spacing: -0.01em;
}

[data-theme="shadcn-dark"] .sd-btn-outline {
  background: transparent;
  color: #fafafa;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 0.5rem;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-body);
  cursor: pointer;
  padding: 7px 14px;
  transition: background 0.1s, border-color 0.1s;
}

[data-theme="shadcn-dark"] .sd-btn-outline:hover {
  background: rgba(255,255,255,0.08);
}

[data-theme="shadcn-dark"] .sd-btn-ghost {
  background: transparent;
  color: #a1a1a1;
  border: none;
  border-radius: 0.5rem;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-body);
  cursor: pointer;
  padding: 7px 14px;
  transition: background 0.1s, color 0.1s;
}

[data-theme="shadcn-dark"] .sd-btn-ghost:hover {
  background: rgba(255,255,255,0.08);
  color: #fafafa;
}

[data-theme="shadcn-dark"] .sd-btn-row {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

[data-theme="shadcn-dark"] .sd-btn-sm {
  font-size: 12px;
  padding: 5px 12px;
}

[data-theme="shadcn-dark"] .sd-btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 0.5rem;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #a1a1a1;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}

[data-theme="shadcn-dark"] .sd-btn-icon:hover {
  background: rgba(255,255,255,0.08);
  color: #fafafa;
}

/* ── AVATAR GROUP ── */
[data-theme="shadcn-dark"] .sd-avatar-group {
  display: flex;
  align-items: center;
}

[data-theme="shadcn-dark"] .sd-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #171717;
  margin-left: -6px;
}

[data-theme="shadcn-dark"] .sd-input-btn-right {
  background: rgba(255,255,255,0.08);
  border: none;
  border-left: 1px solid rgba(255,255,255,0.1);
  color: #a1a1a1;
  cursor: pointer;
  padding: 0 12px;
  font-size: 13px;
  transition: background 0.1s, color 0.1s;
}

[data-theme="shadcn-dark"] .sd-input-btn-right:hover {
  background: rgba(255,255,255,0.12);
  color: #fafafa;
}

/* ── CHAT TEXTAREA ── */
[data-theme="shadcn-dark"] .sd-chat-wrap {
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: border-color 0.1s;
}

[data-theme="shadcn-dark"] .sd-chat-send-btn {
  background: rgba(255,255,255,0.08);
  border: none;
  color: #a1a1a1;
  cursor: pointer;
  padding: 7px 12px;
  font-size: 13px;
  transition: background 0.1s, color 0.1s;
}

[data-theme="shadcn-dark"] .sd-chat-send-btn:hover {
  background: rgba(255,255,255,0.12);
  color: #fafafa;
}

/* ── SLIDER ── */
[data-theme="shadcn-dark"] .sd-slider-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

[data-theme="shadcn-dark"] .sd-slider-label {
  font-size: 12px;
  font-weight: 500;
  color: #fafafa;
}

[data-theme="shadcn-dark"] .sd-slider-value {
  font-size: 11px;
  color: #a1a1a1;
}

[data-theme="shadcn-dark"] .sd-slider {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255,255,255,0.12);
  border-radius: 2px;
  outline: none;
  margin-bottom: 14px;
}

[data-theme="shadcn-dark"] .sd-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #ffffff;
  border-radius: 50%;
  cursor: pointer;
}

[data-theme="shadcn-dark"] .sd-slider::-moz-range-thumb {
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  background: #ffffff;
  border-radius: 50%;
  cursor: pointer;
}

/* ── SETTINGS ROW ── */
[data-theme="shadcn-dark"] .sd-settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

[data-theme="shadcn-dark"] .sd-settings-row:last-child {
  border-bottom: none;
}

[data-theme="shadcn-dark"] .sd-settings-row-info {
  flex: 1;
  min-width: 0;
}

[data-theme="shadcn-dark"] .sd-settings-row-title {
  font-size: 13px;
  font-weight: 500;
  color: #fafafa;
  margin-bottom: 1px;
}

[data-theme="shadcn-dark"] .sd-settings-row-desc {
  font-size: 11px;
  color: #a1a1a1;
}

[data-theme="shadcn-dark"] .sd-settings-verified {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
}

[data-theme="shadcn-dark"] .sd-settings-verified:hover .sd-chevron {
  color: #fafafa;
}

[data-theme="shadcn-dark"] .sd-verified-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

[data-theme="shadcn-dark"] .sd-verified-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #166534;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #4ade80;
  flex-shrink: 0;
}

[data-theme="shadcn-dark"] .sd-verified-text {
  font-size: 12px;
  color: #a1a1aa;
}

[data-theme="shadcn-dark"] .sd-chevron {
  color: #52525b;
  font-size: 13px;
  transition: color 0.1s;
}

/* ── URL BAR ── */
[data-theme="shadcn-dark"] .sd-url-bar {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.5rem;
  overflow: hidden;
}

[data-theme="shadcn-dark"] .sd-radio-card {
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.5rem;
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.1s;
  background: transparent;
}

[data-theme="shadcn-dark"] .sd-radio-card.selected {
  border-color: rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.06);
}

[data-theme="shadcn-dark"] .sd-radio-card:hover:not(.selected) {
  background: rgba(255,255,255,0.04);
}

[data-theme="shadcn-dark"] .sd-radio-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.1s;
}

[data-theme="shadcn-dark"] .sd-counter-btn {
  background: transparent;
  border: none;
  color: #a1a1a1;
  cursor: pointer;
  padding: 0 10px;
  font-size: 16px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.1s;
}

[data-theme="shadcn-dark"] .sd-counter-btn:hover {
  background: rgba(255,255,255,0.08);
  color: #fafafa;
}

[data-theme="shadcn-dark"] .sd-counter-val {
  font-size: 13px;
  font-weight: 500;
  color: #fafafa;
  width: 32px;
  text-align: center;
  border-left: 1px solid rgba(255,255,255,0.1);
  border-right: 1px solid rgba(255,255,255,0.1);
  line-height: 30px;
}

/* ── TOGGLE SWITCH ── */
[data-theme="shadcn-dark"] .sd-toggle {
  position: relative;
  width: 36px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
}

[data-theme="shadcn-dark"] .sd-toggle-track {
  width: 36px;
  height: 20px;
  background: #404040;
  border-radius: 10px;
  transition: background 0.2s;
}

[data-theme="shadcn-dark"] .sd-toggle-track.on {
  background: #ffffff;
}

[data-theme="shadcn-dark"] .sd-toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #a1a1a1;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.4);
}

[data-theme="shadcn-dark"] .sd-toggle-track.on ~ .sd-toggle-thumb,
[data-theme="shadcn-dark"] .sd-toggle.on .sd-toggle-thumb {
  transform: translateX(16px);
  background: #171717;
}

[data-theme="shadcn-dark"] .sd-toggle-inner {
  position: relative;
  width: 36px;
  height: 20px;
}

/* ── COL SPACER ── */
[data-theme="shadcn-dark"] .sd-col-gap {
  margin-bottom: 14px;
}

/* ── LIGHT MODE (shadcn light) ── */
[data-theme="shadcn-dark"][data-mode="light"] {
  --bg: #ffffff;
  --sidebar-bg: #fafafa;
  --border: #e5e5e5;
  --text: #0a0a0a;
  --text-muted: #737373;
  --accent: #171717;
  --accent-2: #f5f5f5;
  --card-bg: #ffffff;
  --input-bg: #ffffff;
}
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const ShadcnDarkShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const c = colors || defaultColors;

  const card: React.CSSProperties = {
    background: c.cardBg,
    border: `1px solid ${c.border}`,
    borderRadius: "0.625rem",
    overflow: "hidden",
  };

  const cardHeader: React.CSSProperties = {
    padding: "14px 16px 12px",
    borderBottom: `1px solid ${c.border}`,
  };

  const cardTitle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "600",
    color: c.text,
    letterSpacing: "-0.01em",
    marginBottom: "2px",
  };

  const cardSub: React.CSSProperties = {
    fontSize: "12px",
    color: c.textMuted,
  };

  const badge = (variant: "default" | "secondary" | "destructive" | "outline" | "blue"): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "500",
    border: "1px solid",
    background: variant === "default" ? c.text : variant === "secondary" ? "#262626" : variant === "destructive" ? "rgba(255,101,104,0.15)" : variant === "blue" ? "rgba(59,130,246,0.15)" : "transparent",
    color: variant === "default" ? c.bg : variant === "secondary" ? c.textMuted : variant === "destructive" ? "#ff6568" : variant === "blue" ? "#60a5fa" : c.textMuted,
    borderColor: variant === "default" ? c.text : variant === "secondary" ? "rgba(255,255,255,0.1)" : variant === "destructive" ? "rgba(255,101,104,0.3)" : variant === "blue" ? "rgba(59,130,246,0.3)" : c.border,
  });

  const btn = (variant: "default" | "destructive" | "outline" | "ghost" | "secondary"): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "7px 14px",
    borderRadius: "0.5rem",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    border: "1px solid",
    fontFamily: "'Geist Sans', 'Geist', system-ui, sans-serif",
    background: variant === "default" ? "#e5e5e5" : variant === "destructive" ? "#ff6568" : variant === "secondary" ? "#262626" : "transparent",
    color: variant === "default" ? "#171717" : variant === "destructive" ? "#0a0a0a" : variant === "secondary" ? "#fafafa" : variant === "ghost" ? c.textMuted : c.textMuted,
    borderColor: variant === "default" ? "#e5e5e5" : variant === "destructive" ? "#ff6568" : variant === "secondary" ? "rgba(255,255,255,0.1)" : variant === "outline" ? c.border : "transparent",
  });

  const input: React.CSSProperties = {
    width: "100%",
    padding: "8px 11px",
    background: c.inputBg,
    border: `1px solid ${c.border}`,
    borderRadius: "0.5rem",
    fontSize: "14px",
    color: c.text,
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "'Geist Sans', 'Geist', system-ui, sans-serif",
  };

  return (
    <div style={{
      background: c.bg,
      color: c.text,
      fontFamily: "'Geist Sans', 'Geist', system-ui, -apple-system, sans-serif",
      minHeight: "100%",
      padding: "28px 32px",
      fontSize: "14px",
    }}>
      {/* ── Header ── */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "600", color: c.text, letterSpacing: "-0.02em", margin: "0 0 4px" }}>Components</h1>
        <p style={{ margin: 0, fontSize: "13px", color: c.textMuted }}>Beautifully designed components built with Radix UI and Tailwind CSS.</p>
      </div>

      {/* ── Top grid: buttons + badges + command palette ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>

        {/* Buttons */}
        <div style={card}>
          <div style={cardHeader}>
            <div style={cardTitle}>Button</div>
            <div style={cardSub}>Displays a button or a component that looks like a button.</div>
          </div>
          <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button style={btn("default")}>Default</button>
              <button style={btn("destructive")}>Destructive</button>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button style={btn("outline")}>Outline</button>
              <button style={btn("secondary")}>Secondary</button>
              <button style={btn("ghost")}>Ghost</button>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button style={{ ...btn("outline"), opacity: 0.5, cursor: "not-allowed" }}>Disabled</button>
              <button style={{ ...btn("default"), padding: "5px 10px", fontSize: "11px" }}>Small</button>
              <button style={{ ...btn("default"), padding: "9px 18px", fontSize: "13px" }}>Large</button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div style={card}>
          <div style={cardHeader}>
            <div style={cardTitle}>Badge</div>
            <div style={cardSub}>Displays a badge or a component that looks like a badge.</div>
          </div>
          <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
              <span style={badge("default")}>Default</span>
              <span style={badge("secondary")}>Secondary</span>
              <span style={badge("destructive")}>Destructive</span>
              <span style={badge("outline")}>Outline</span>
              <span style={badge("blue")}>New</span>
            </div>
            <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: "600", color: c.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>Input</div>
              <input readOnly value="shadcn/ui" style={input} />
            </div>
          </div>
        </div>

        {/* Command palette */}
        <div style={card}>
          <div style={cardHeader}>
            <div style={cardTitle}>Command</div>
            <div style={cardSub}>Fast, composable command menu.</div>
          </div>
          <div style={{ padding: "12px" }}>
            <div style={{ background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: "0.5rem", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderBottom: `1px solid ${c.border}` }}>
                <span style={{ fontSize: "14px", color: c.textMuted }}>⌘</span>
                <span style={{ fontSize: "12px", color: c.textMuted }}>Search commands...</span>
              </div>
              {[
                ["Calendar", "⌘C"],
                ["Search Emoji", "⌘E"],
                ["Launch", "⌘L"],
                ["Settings", "⌘S"],
              ].map(([label, kbd], i) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: i === 0 ? "rgba(255,255,255,0.08)" : "transparent", cursor: "pointer" }}>
                  <span style={{ fontSize: "13px", color: i === 0 ? c.text : c.textMuted }}>{label}</span>
                  <span style={{ fontSize: "10px", color: c.textMuted, background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "4px", fontFamily: "monospace" }}>{kbd}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Data table ── */}
      <div style={{ ...card, marginBottom: "16px" }}>
        <div style={{ ...cardHeader, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={cardTitle}>Data Table</div>
            <div style={cardSub}>Powerful table with sorting, filtering, and pagination.</div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input readOnly placeholder="Filter emails..." style={{ ...input, width: "200px" }} />
            <button style={btn("outline")}>Columns ↕</button>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr>
              {["", "Status", "Email", "Amount", ""].map((h, i) => (
                <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: c.textMuted, borderBottom: `1px solid ${c.border}`, background: "rgba(255,255,255,0.03)", letterSpacing: "0.04em" }}>
                  {h === "Amount" ? <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>{h} <span style={{ fontSize: "10px" }}>↕</span></span> : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["success", "m@example.com", "$316.00", "2024-01-15"],
              ["processing", "example@gmail.com", "$242.00", "2024-01-14"],
              ["success", "test@test.com", "$837.00", "2024-01-13"],
              ["failed", "user@company.io", "$874.00", "2024-01-12"],
              ["pending", "admin@org.dev", "$721.00", "2024-01-11"],
            ].map(([status, email, amount, date], i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${c.border}` }}>
                <td style={{ padding: "11px 16px" }}>
                  <input type="checkbox" style={{ width: "13px", height: "13px", accentColor: c.text }} />
                </td>
                <td style={{ padding: "11px 16px" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "5px", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "500",
                    background: status === "success" ? "rgba(34,197,94,0.12)" : status === "processing" ? "rgba(59,130,246,0.12)" : status === "failed" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)",
                    color: status === "success" ? "#4ade80" : status === "processing" ? "#60a5fa" : status === "failed" ? "#f87171" : "#fbbf24",
                  }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor" }} />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: "11px 16px", color: c.text }}>{email}</td>
                <td style={{ padding: "11px 16px", color: c.text, fontWeight: "500" }}>{amount}</td>
                <td style={{ padding: "11px 16px" }}>
                  <button style={{ ...btn("ghost"), padding: "4px 8px", fontSize: "16px", color: c.textMuted }}>···</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderTop: `1px solid ${c.border}` }}>
          <span style={{ fontSize: "12px", color: c.textMuted }}>0 of 5 row(s) selected.</span>
          <div style={{ display: "flex", gap: "6px" }}>
            {["Previous", "Next"].map((l) => <button key={l} style={btn("outline")}>{l}</button>)}
          </div>
        </div>
      </div>

      {/* ── Bottom row: form + alert/dialog + toggles ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>

        {/* Form */}
        <div style={card}>
          <div style={cardHeader}>
            <div style={cardTitle}>Form</div>
            <div style={cardSub}>Create an account with validation.</div>
          </div>
          <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[["Username", "johndoe"], ["Email", "john@example.com"], ["Password", "••••••••"]].map(([label, val]) => (
              <div key={label as string}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "500", color: c.text, marginBottom: "5px" }}>{label}</label>
                <input readOnly value={val as string} type={label === "Password" ? "password" : "text"} style={input} />
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: c.text, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "9px", color: c.bg }}>✓</span>
              </div>
              <span style={{ fontSize: "12px", color: c.textMuted }}>Accept terms and conditions</span>
            </div>
            <button style={{ ...btn("default"), justifyContent: "center", width: "100%" }}>Create Account</button>
          </div>
        </div>

        {/* Alert + Dialog */}
        <div style={card}>
          <div style={cardHeader}>
            <div style={cardTitle}>Alert / Dialog</div>
            <div style={cardSub}>Feedback and confirmation patterns.</div>
          </div>
          <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "6px", padding: "12px 14px" }}>
              <div style={{ fontWeight: "600", fontSize: "13px", color: "#60a5fa", marginBottom: "3px" }}>ℹ New features available</div>
              <div style={{ fontSize: "12px", color: c.textMuted }}>Check out the new components in v14.2</div>
            </div>
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", padding: "12px 14px" }}>
              <div style={{ fontWeight: "600", fontSize: "13px", color: "#f87171", marginBottom: "3px" }}>⚠ Destructive action</div>
              <div style={{ fontSize: "12px", color: c.textMuted }}>This will permanently delete your data.</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${c.border}`, borderRadius: "0.5rem", padding: "14px" }}>
              <div style={{ fontWeight: "600", fontSize: "13px", color: c.text, marginBottom: "4px" }}>Are you absolutely sure?</div>
              <div style={{ fontSize: "12px", color: c.textMuted, marginBottom: "12px" }}>This action cannot be undone. This will permanently delete your account.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <button style={btn("outline")}>Cancel</button>
                <button style={btn("destructive")}>Delete</button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings toggles */}
        <div style={card}>
          <div style={cardHeader}>
            <div style={cardTitle}>Settings</div>
            <div style={cardSub}>Notifications and preferences.</div>
          </div>
          <div style={{ padding: "0 16px" }}>
            {[
              ["Email notifications", "Receive emails for activity", true],
              ["Push notifications", "Get notified on mobile", false],
              ["Marketing emails", "Receive product updates", false],
              ["Security alerts", "Critical security events only", true],
            ].map(([title, desc, on]) => (
              <div key={title as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: `1px solid ${c.border}` }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: c.text, marginBottom: "1px" }}>{title}</div>
                  <div style={{ fontSize: "11px", color: c.textMuted }}>{desc}</div>
                </div>
                <div style={{ position: "relative", width: "36px", height: "20px", flexShrink: 0 }}>
                  <div style={{ width: "36px", height: "20px", background: on ? "#e5e5e5" : "#404040", borderRadius: "10px", transition: "background 0.2s" }} />
                  <div style={{ position: "absolute", top: "2px", left: on ? "18px" : "2px", width: "16px", height: "16px", borderRadius: "50%", background: on ? "#171717" : "#a1a1a1", transition: "left 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.4)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#0a0a0a",
  sidebarBg: "#171717",
  border:    "rgba(255,255,255,0.1)",
  text:      "#fafafa",
  textMuted: "#a1a1a1",
  accent:    "#e5e5e5",
  cardBg:    "#171717",
  inputBg:   "rgba(255,255,255,0.06)",
};

export const ShadcnDarkTheme: ThemeDefinition = {
  id: "shadcndark",
  name: "Shadcn Dark",
  emoji: "🌑",
  description: "Neutral-dark component library showcase with exact shadcn/ui dark mode tokens — buttons, badges, data tables, forms, alerts, and settings.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Light": {
      bg: "#ffffff",
      sidebarBg: "#fafafa",
      border: "#e5e5e5",
      text: "#0a0a0a",
      textMuted: "#737373",
      accent: "#171717",
      cardBg: "#ffffff",
      inputBg: "#ffffff",
    }
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: ShadcnDarkShowcase,
};
