import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  [data-theme="ios"] {
    --bg: #F2F2F7;
    --sidebar-bg: #FFFFFF;
    --border: rgba(60,60,67,0.13);
    --text: #000000;
    --text-muted: rgba(60,60,67,0.6);
    --accent: #007AFF;
    --accent-2: #34C759;
    --card-bg: #FFFFFF;
    --input-bg: rgba(118,118,128,0.12);
    --font-body: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
    --font-mono: "SF Mono", "Menlo", monospace;
    --radius: 12px;
  }

  /* ── Sidebar ── */
  [data-theme="ios"] .sidebar {
    background: #FFFFFF !important;
    border-right: 0.5px solid rgba(60,60,67,0.2) !important;
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
  }
  [data-theme="ios"] .sidebar-item {
    min-height: 44px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: 17px;
    font-weight: 400;
    color: #000000;
    position: relative;
    border-radius: 0;
    transition: background 0.15s ease;
  }
  [data-theme="ios"] .sidebar-item.active {
    background: rgba(0,122,255,0.1) !important;
    color: #007AFF !important;
    border-radius: 10px;
    margin: 2px 8px;
    width: calc(100% - 16px);
    padding: 0 12px;
  }
  [data-theme="ios"] .sidebar-item:hover:not(.active) {
    background: rgba(60,60,67,0.05) !important;
    border-radius: 10px;
    margin: 2px 8px;
    width: calc(100% - 16px);
    padding: 0 12px;
  }

  /* ── Page scaffold ── */
  [data-theme="ios"] .ios-page {
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
    background: #F2F2F7;
    color: #000000;
    min-height: 100%;
  }

  /* ── Typography ramp ── */
  [data-theme="ios"] .ios-large-title {
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.4px;
    color: #000000;
    line-height: 1.15;
  }
  [data-theme="ios"] .ios-title1 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: #000000;
    line-height: 1.2;
  }
  [data-theme="ios"] .ios-title2 {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.2px;
    line-height: 1.25;
  }
  [data-theme="ios"] .ios-title3 {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.1px;
    line-height: 1.25;
  }
  [data-theme="ios"] .ios-headline {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }
  [data-theme="ios"] .ios-body {
    font-size: 17px;
    font-weight: 400;
    line-height: 1.55;
  }
  [data-theme="ios"] .ios-callout {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  }
  [data-theme="ios"] .ios-subhead {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.45;
  }
  [data-theme="ios"] .ios-footnote {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
  }
  [data-theme="ios"] .ios-caption {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.01em;
    line-height: 1.4;
  }

  /* ── Navigation Bar (compact) ── */
  [data-theme="ios"] .ios-navbar {
    background: rgba(242,242,247,0.85);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 0.5px solid rgba(60,60,67,0.2);
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  [data-theme="ios"] .ios-navbar-back {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #007AFF;
    font-size: 17px;
    font-weight: 400;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: -apple-system, "SF Pro Text", sans-serif;
  }
  [data-theme="ios"] .ios-navbar-large {
    background: rgba(242,242,247,0.85);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 0.5px solid rgba(60,60,67,0.2);
    padding: 8px 16px 12px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  [data-theme="ios"] .ios-navbar-large-top {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  [data-theme="ios"] .ios-navbar-large-title {
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.4px;
    color: #000000;
    line-height: 1.15;
    margin-top: 4px;
  }

  /* ── Section scaffold ── */
  [data-theme="ios"] .ios-section {
    padding: 24px 16px 0;
  }
  [data-theme="ios"] .ios-section-header {
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(60,60,67,0.6);
    margin-bottom: 8px;
    padding: 0 4px;
  }
  [data-theme="ios"] .ios-section-footer {
    font-size: 13px;
    font-weight: 400;
    color: rgba(60,60,67,0.6);
    margin-top: 8px;
    padding: 0 4px;
    line-height: 1.4;
  }

  /* ── Grouped Table / List ── */
  [data-theme="ios"] .ios-group {
    background: #FFFFFF;
    border-radius: 12px;
    overflow: hidden;
  }
  [data-theme="ios"] .ios-row {
    min-height: 44px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    position: relative;
    gap: 12px;
  }
  [data-theme="ios"] .ios-row + .ios-row::before {
    content: '';
    position: absolute;
    top: 0;
    left: 16px;
    right: 0;
    height: 0.5px;
    background: rgba(60,60,67,0.13);
  }
  [data-theme="ios"] .ios-row-label {
    font-size: 17px;
    color: #000000;
    flex: 1;
  }
  [data-theme="ios"] .ios-row-value {
    font-size: 17px;
    color: rgba(60,60,67,0.6);
  }
  [data-theme="ios"] .ios-chevron {
    color: rgba(60,60,67,0.3);
    font-size: 14px;
    font-weight: 600;
    margin-left: 4px;
  }
  [data-theme="ios"] .ios-row-icon {
    width: 29px;
    height: 29px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  /* ── Toggle Switch ── */
  [data-theme="ios"] .ios-toggle {
    width: 51px;
    height: 31px;
    border-radius: 15.5px;
    position: relative;
    cursor: pointer;
    transition: background 0.25s ease;
  }
  [data-theme="ios"] .ios-toggle.off { background: rgba(120,120,128,0.2); }
  [data-theme="ios"] .ios-toggle.on  { background: #34C759; }
  [data-theme="ios"] .ios-toggle-thumb {
    position: absolute;
    top: 2px;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #FFFFFF;
    box-shadow: 0 3px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1);
    transition: left 0.25s ease;
  }
  [data-theme="ios"] .ios-toggle.off .ios-toggle-thumb { left: 2px; }
  [data-theme="ios"] .ios-toggle.on  .ios-toggle-thumb { left: 22px; }

  /* ── Cards ── */
  [data-theme="ios"] .ios-card {
    background: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 16px;
    overflow: hidden;
  }
  [data-theme="ios"] .ios-app-icon {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }
  [data-theme="ios"] .ios-sparkline {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 32px;
  }
  [data-theme="ios"] .ios-sparkline-dot {
    width: 6px;
    border-radius: 3px;
    background: #007AFF;
    opacity: 0.7;
    flex-shrink: 0;
  }

  /* ── Buttons ── */
  [data-theme="ios"] .ios-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 44px;
    border-radius: 12px;
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: opacity 0.1s ease, transform 0.1s ease;
    padding: 0 20px;
    text-decoration: none;
  }
  [data-theme="ios"] .ios-btn:active { transform: scale(0.97); opacity: 0.85; }
  [data-theme="ios"] .ios-btn-primary     { background: #007AFF; color: #FFFFFF; }
  [data-theme="ios"] .ios-btn-tinted      { background: rgba(0,122,255,0.12); color: #007AFF; }
  [data-theme="ios"] .ios-btn-plain       { background: none; color: #007AFF; font-weight: 400; }
  [data-theme="ios"] .ios-btn-destructive { background: none; color: #FF3B30; font-weight: 400; }
  [data-theme="ios"] .ios-btn-gray        { background: rgba(118,118,128,0.12); color: #000000; }

  /* ── Text Fields ── */
  [data-theme="ios"] .ios-text-field {
    background: rgba(118,118,128,0.12);
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 11px 14px;
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
    font-size: 17px;
    color: #000000;
    width: 100%;
    transition: box-shadow 0.2s ease;
  }
  [data-theme="ios"] .ios-text-field::placeholder { color: rgba(60,60,67,0.45); }
  [data-theme="ios"] .ios-text-field:focus {
    box-shadow: 0 0 0 3px rgba(0,122,255,0.3);
    background: rgba(118,118,128,0.1);
  }
  [data-theme="ios"] .ios-search-wrapper { position: relative; }
  [data-theme="ios"] .ios-search-field {
    background: rgba(118,118,128,0.12);
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 8px 10px 8px 34px;
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
    font-size: 15px;
    color: #000000;
    width: 100%;
    transition: box-shadow 0.2s ease;
  }
  [data-theme="ios"] .ios-search-field::placeholder { color: rgba(60,60,67,0.45); }
  [data-theme="ios"] .ios-search-field:focus { box-shadow: 0 0 0 3px rgba(0,122,255,0.3); }
  [data-theme="ios"] .ios-search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(60,60,67,0.45);
    font-size: 14px;
    pointer-events: none;
  }

  /* ── Segmented Control ── */
  [data-theme="ios"] .ios-segmented {
    background: rgba(118,118,128,0.12);
    border-radius: 9px;
    padding: 2px;
    display: inline-flex;
    width: 100%;
  }
  [data-theme="ios"] .ios-segment {
    flex: 1;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
    cursor: pointer;
    border-radius: 7px;
    transition: background 0.2s ease, box-shadow 0.2s ease;
    padding: 0 8px;
    color: rgba(60,60,67,0.7);
    border: none;
    background: none;
  }
  [data-theme="ios"] .ios-segment.active {
    background: #FFFFFF;
    color: #000000;
    box-shadow: 0 1px 4px rgba(0,0,0,0.12), 0 0.5px 1px rgba(0,0,0,0.08);
  }

  /* ── Badges and Pills ── */
  [data-theme="ios"] .ios-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #FF3B30;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: 600;
    padding: 0 6px;
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
  }
  [data-theme="ios"] .ios-pill {
    display: inline-flex;
    align-items: center;
    height: 22px;
    border-radius: 11px;
    padding: 0 10px;
    font-size: 12px;
    font-weight: 600;
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
    letter-spacing: 0.01em;
  }

  /* ── Notification Banner ── */
  [data-theme="ios"] .ios-notification {
    background: rgba(255,255,255,0.94);
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08);
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
  }
  [data-theme="ios"] .ios-notification-icon {
    width: 38px;
    height: 38px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }
  [data-theme="ios"] .ios-notification-content { flex: 1; min-width: 0; }
  [data-theme="ios"] .ios-notification-app {
    font-size: 12px;
    font-weight: 500;
    color: rgba(60,60,67,0.6);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 2px;
  }
  [data-theme="ios"] .ios-notification-title {
    font-size: 15px;
    font-weight: 600;
    color: #000000;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
  [data-theme="ios"] .ios-notification-message {
    font-size: 15px;
    font-weight: 400;
    color: rgba(60,60,67,0.9);
    line-height: 1.35;
    margin-top: 1px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  [data-theme="ios"] .ios-notification-time {
    font-size: 12px;
    color: rgba(60,60,67,0.45);
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* ── Tab Bar ── */
  [data-theme="ios"] .ios-tabbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    background: rgba(248,248,248,0.94);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-top: 0.5px solid rgba(60,60,67,0.2);
    padding: 8px 0 4px;
    font-family: -apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
  }
  [data-theme="ios"] .ios-tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    min-width: 48px;
    cursor: pointer;
    padding: 0 8px;
    background: none;
    border: none;
  }
  [data-theme="ios"] .ios-tabbar-icon { font-size: 22px; }
  [data-theme="ios"] .ios-tabbar-label { font-size: 10px; font-weight: 500; letter-spacing: 0.01em; }
  [data-theme="ios"] .ios-tabbar-item.active .ios-tabbar-icon,
  [data-theme="ios"] .ios-tabbar-item.active .ios-tabbar-label {
    color: #007AFF;
  }
  [data-theme="ios"] .ios-tabbar-item:not(.active) .ios-tabbar-icon,
  [data-theme="ios"] .ios-tabbar-item:not(.active) .ios-tabbar-label {
    color: rgba(60,60,67,0.45);
  }

  /* ── Layout helpers ── */
  [data-theme="ios"] .ios-spacer-sm  { height: 8px; }
  [data-theme="ios"] .ios-spacer-md  { height: 16px; }
  [data-theme="ios"] .ios-spacer-lg  { height: 24px; }
  [data-theme="ios"] .ios-row-inset  { padding-left: 52px !important; }

  /* ── DARK MODE ── */
  [data-theme="ios"][data-mode="dark"] {
    --bg: #000000;
    --sidebar-bg: #1c1c1e;
    --border: rgba(255,255,255,0.1);
    --text: #ffffff;
    --text-muted: rgba(235,235,245,0.6);
    --card-bg: #1c1c1e;
    --input-bg: rgba(118,118,128,0.24);
  }
  [data-theme="ios"][data-mode="dark"] .sidebar {
    background: #1c1c1e !important;
    border-right-color: rgba(255,255,255,0.1) !important;
  }
  [data-theme="ios"][data-mode="dark"] .ios-tabbar {
    background: rgba(28,28,30,0.85) !important;
    border-top-color: rgba(255,255,255,0.1) !important;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const iOSShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const currentColors = colors || defaultColors;

  const customStyle = {
    "--bg": currentColors.bg,
    "--sidebar-bg": currentColors.sidebarBg,
    "--border": currentColors.border,
    "--text": currentColors.text,
    "--text-muted": currentColors.textMuted,
    "--accent": currentColors.accent,
    "--accent-2": currentColors.accent2 || currentColors.accent,
    "--card-bg": currentColors.cardBg,
    "--input-bg": currentColors.inputBg,
  } as React.CSSProperties;

  const blue    = "#007AFF";
  const green   = "#34C759";
  const red     = "#FF3B30";
  const orange  = "#FF9500";
  const indigo  = "#5856D6";
  const teal    = "#30B0C7";
  const sep     = "rgba(60,60,67,0.13)";
  const label   = "rgba(60,60,67,0.6)";

  return (
    <div className="ios-page" style={{
      ...customStyle,
      background: "#F2F2F7",
      color: "#000000",
      minHeight: "100%",
      fontFamily: '-apple-system, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif',
    }}>
      {/* ── NAVIGATION BAR ── */}
      <div className="ios-navbar" style={{
        background: "rgba(242,242,247,0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: `0.5px solid ${sep}`,
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
      }}>
        <button className="ios-navbar-back" style={{ display: "flex", alignItems: "center", gap: "4px", color: blue, fontSize: "17px", fontWeight: 400, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
          ‹ Back
        </button>
        <span style={{ fontSize: "17px", fontWeight: 600, color: "#000" }}>Settings</span>
        <span style={{ fontSize: "17px", color: blue }}>Done</span>
      </div>

      {/* ── SEARCH BAR ── */}
      <div style={{ padding: "12px 16px", background: "#F2F2F7" }}>
        <div className="ios-search-wrapper" style={{ position: "relative" }}>
          <span className="ios-search-icon" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: label, fontSize: "14px", pointerEvents: "none" }}>⌕</span>
          <input
            className="ios-search-field"
            readOnly
            placeholder="Search"
            style={{
              background: "rgba(118,118,128,0.12)",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              padding: "8px 10px 8px 34px",
              fontFamily: "inherit",
              fontSize: "15px",
              color: "#000",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* ── SEGMENTED CONTROL ── */}
      <div style={{ padding: "0 16px 12px" }}>
        <div className="ios-segmented" style={{ background: "rgba(118,118,128,0.12)", borderRadius: "9px", padding: "2px", display: "inline-flex", width: "100%" }}>
          {["All", "New", "Updates"].map((seg, i) => (
            <button key={seg} className={`ios-segment${i === 0 ? " active" : ""}`} style={{
              flex: 1, minHeight: "32px", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: i === 0 ? 600 : 500, fontFamily: "inherit",
              cursor: "pointer", borderRadius: "7px",
              background: i === 0 ? "#FFFFFF" : "transparent",
              color: i === 0 ? "#000" : label,
              border: "none",
              boxShadow: i === 0 ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
              padding: "0 8px",
            }}>{seg}</button>
          ))}
        </div>
      </div>

      {/* ── NOTIFICATION BANNER ── */}
      <div style={{ padding: "0 16px 16px" }}>
        <div className="ios-notification" style={{
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
          padding: "12px 14px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}>
          <div className="ios-notification-icon" style={{ width: "38px", height: "38px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0, background: `${blue}22` }}>
            📱
          </div>
          <div style={{ flex: 1 }}>
            <div className="ios-notification-app" style={{ fontSize: "12px", fontWeight: 500, color: label, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "2px" }}>Messages</div>
            <div className="ios-notification-title" style={{ fontSize: "15px", fontWeight: 600, color: "#000", lineHeight: 1.3 }}>Sarah Johnson</div>
            <div className="ios-notification-message" style={{ fontSize: "15px", color: "rgba(60,60,67,0.9)", lineHeight: 1.35, marginTop: "1px" }}>
              Hey! Are we still on for lunch tomorrow? 🍜
            </div>
          </div>
          <div className="ios-notification-time" style={{ fontSize: "12px", color: "rgba(60,60,67,0.45)", flexShrink: 0, marginTop: "2px" }}>now</div>
        </div>
      </div>

      {/* ── SECTION 1: Account ── */}
      <div className="ios-section" style={{ padding: "4px 16px 0" }}>
        <div className="ios-section-header" style={{ fontSize: "13px", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.06em", color: label, marginBottom: "8px", paddingLeft: "4px" }}>
          Account
        </div>
        <div className="ios-group" style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden" }}>
          {[
            { icon: "👤", iconBg: blue,   label: "Profile",       value: "Lily Johnson", hasChevron: true },
            { icon: "🔒", iconBg: "#636366", label: "Sign-In & Security", value: "",    hasChevron: true },
            { icon: "💳", iconBg: "#1C1C1E", label: "Payment & Shipping", value: "Visa ···4291", hasChevron: true },
          ].map(({ icon, iconBg, label: lbl, value, hasChevron }, i, arr) => (
            <div key={lbl} className="ios-row" style={{
              minHeight: "44px", display: "flex", alignItems: "center",
              padding: "0 16px", position: "relative", gap: "12px",
              borderBottom: i < arr.length - 1 ? `0.5px solid ${sep}` : "none",
              paddingLeft: "16px",
            }}>
              <div className="ios-row-icon" style={{ width: "29px", height: "29px", borderRadius: "7px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>
                {icon}
              </div>
              <span className="ios-row-label" style={{ fontSize: "17px", color: "#000", flex: 1 }}>{lbl}</span>
              {value && <span className="ios-row-value" style={{ fontSize: "17px", color: label }}>{value}</span>}
              {hasChevron && <span className="ios-chevron" style={{ color: "rgba(60,60,67,0.3)", fontSize: "14px", fontWeight: 600 }}>›</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: Preferences with toggles ── */}
      <div className="ios-section" style={{ padding: "20px 16px 0" }}>
        <div className="ios-section-header" style={{ fontSize: "13px", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.06em", color: label, marginBottom: "8px", paddingLeft: "4px" }}>
          Preferences
        </div>
        <div className="ios-group" style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden" }}>
          {[
            { icon: "🔔", iconBg: red,    label: "Notifications",    toggle: true,  on: true  },
            { icon: "🌙", iconBg: indigo, label: "Dark Mode",          toggle: true,  on: false },
            { icon: "📍", iconBg: blue,   label: "Location Services",  toggle: true,  on: true  },
            { icon: "🔄", iconBg: green,  label: "Background Refresh", toggle: true,  on: false },
          ].map(({ icon, iconBg, label: lbl, toggle, on }, i, arr) => (
            <div key={lbl} className="ios-row" style={{
              minHeight: "44px", display: "flex", alignItems: "center",
              padding: "0 16px", gap: "12px",
              borderBottom: i < arr.length - 1 ? `0.5px solid ${sep}` : "none",
            }}>
              <div style={{ width: "29px", height: "29px", borderRadius: "7px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>
                {icon}
              </div>
              <span style={{ fontSize: "17px", color: "#000", flex: 1 }}>{lbl}</span>
              {toggle && (
                <div className={`ios-toggle ${on ? "on" : "off"}`} style={{
                  width: "51px", height: "31px", borderRadius: "15.5px",
                  position: "relative", cursor: "pointer",
                  background: on ? green : "rgba(120,120,128,0.2)",
                  transition: "background 0.25s ease",
                  flexShrink: 0,
                }}>
                  <div className="ios-toggle-thumb" style={{
                    position: "absolute",
                    top: "2px",
                    left: on ? "22px" : "2px",
                    width: "27px", height: "27px", borderRadius: "50%",
                    background: "#FFFFFF",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)",
                    transition: "left 0.25s ease",
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="ios-section-footer" style={{ fontSize: "13px", color: label, marginTop: "8px", paddingLeft: "4px", lineHeight: 1.4 }}>
          Enabling notifications requires permission from your device.
        </div>
      </div>

      {/* ── SECTION 3: Display & Sound ── */}
      <div className="ios-section" style={{ padding: "20px 16px 0" }}>
        <div className="ios-section-header" style={{ fontSize: "13px", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.06em", color: label, marginBottom: "8px", paddingLeft: "4px" }}>
          Display & Sound
        </div>
        <div className="ios-group" style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden" }}>
          {[
            { icon: "☀️", iconBg: orange, label: "Brightness",    value: "" },
            { icon: "🔊", iconBg: red,    label: "Volume",         value: "" },
            { icon: "🎨", iconBg: teal,   label: "Appearance",     value: "Light",  hasChevron: true },
            { icon: "⌨️", iconBg: "#636366", label: "Text Size",   value: "Medium", hasChevron: true },
          ].map(({ icon, iconBg, label: lbl, value, hasChevron }, i, arr) => (
            <div key={lbl} style={{
              minHeight: "44px", display: "flex", alignItems: "center",
              padding: "0 16px", gap: "12px",
              borderBottom: i < arr.length - 1 ? `0.5px solid ${sep}` : "none",
            }}>
              <div style={{ width: "29px", height: "29px", borderRadius: "7px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>
                {icon}
              </div>
              <span style={{ fontSize: "17px", color: "#000", flex: 1 }}>{lbl}</span>
              {value && <span style={{ fontSize: "17px", color: label }}>{value}</span>}
              {hasChevron && <span style={{ color: "rgba(60,60,67,0.3)", fontSize: "14px", fontWeight: 600 }}>›</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── DESTRUCTIVE ACTION ── */}
      <div style={{ padding: "20px 16px 8px" }}>
        <div style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden" }}>
          <button style={{
            width: "100%", minHeight: "44px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "17px", fontWeight: 400, fontFamily: "inherit",
            color: red, background: "none", border: "none", cursor: "pointer",
          }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div className="ios-tabbar" style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-around",
        background: "rgba(248,248,248,0.94)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: `0.5px solid ${sep}`,
        padding: "8px 0 16px",
        marginTop: "8px",
      }}>
        {[
          { icon: "🏠", label: "Home",    active: false },
          { icon: "🔍", label: "Search",  active: false },
          { icon: "⚙️", label: "Settings", active: true },
          { icon: "👤", label: "Profile",  active: false },
        ].map(({ icon, label: lbl, active }) => (
          <button key={lbl} className={`ios-tabbar-item${active ? " active" : ""}`} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
            minWidth: "48px", cursor: "pointer", padding: "0 8px",
            background: "none", border: "none",
          }}>
            <span className="ios-tabbar-icon" style={{ fontSize: "22px", color: active ? blue : "rgba(60,60,67,0.45)" }}>{icon}</span>
            <span className="ios-tabbar-label" style={{ fontSize: "10px", fontWeight: 500, color: active ? blue : "rgba(60,60,67,0.45)", letterSpacing: "0.01em" }}>{lbl}</span>
          </button>
        ))}
      </div>

      {/* ── LEGAL ── */}
      <div style={{ padding: "12px 24px 32px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", color: label, lineHeight: 1.5, margin: 0 }}>
          iOS Design System v17.4 · Apple Inc. · All rights reserved<br />
          By using this app you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#F2F2F7",
  sidebarBg: "#ffffff",
  border:    "rgba(60,60,67,0.13)",
  text:      "#000000",
  textMuted: "#8E8E93",
  accent:    "#007AFF",
  accent2:   "#34C759",
  cardBg:    "#ffffff",
  inputBg:   "#ffffff",
};

export const iOSTheme: ThemeDefinition = {
  id: "ios",
  name: "iOS",
  emoji: "📱",
  description: "Apple Human Interface Guidelines — native iOS patterns: grouped lists, toggles, nav bars, tab bars, and system colors.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg:        "#000000",
      sidebarBg: "#1c1c1e",
      border:    "rgba(255,255,255,0.1)",
      text:      "#ffffff",
      textMuted: "rgba(235,235,245,0.6)",
      accent:    "#0A84FF",
      accent2:   "#30D158",
      cardBg:    "#1c1c1e",
      inputBg:   "rgba(118,118,128,0.24)",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: iOSShowcase,
};
