import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Tahoma&display=swap');

  /* ──────────────────────────────────────────
     CSS VARIABLES
  ────────────────────────────────────────── */

  [data-theme="y2k"] {
    --bg: #dce4f0;
    --bg-panel: #e8eef8;
    --bg-content: #f0f4fc;
    --sidebar-bg: linear-gradient(180deg, #d0daea 0%, #c4d0e8 100%);
    --border: #a0b0cc;
    --border-light: #c8d4e8;
    --text: #1a2a3a;
    --text-muted: #5a6a7a;
    --text-light: #8898aa;
    --accent: #0088cc;
    --accent-teal: #00bcd4;
    --accent-teal-light: #40e0d0;
    --accent-2: #66ff00;
    --accent-pink: #ff00cc;
    --silver-dark: #a8b8c8;
    --silver-mid: #c8d8e8;
    --silver-light: #e8f0f8;
    --chrome-high: #f5f8ff;
    --chrome-mid: #d0daea;
    --chrome-low: #a8b8cc;
    --xp-blue: #0a6cd4;
    --xp-blue-dark: #084ea0;
    --xp-selected: linear-gradient(180deg, #3090f0 0%, #1060c0 100%);
    --font-body: Tahoma, Verdana, 'Trebuchet MS', system-ui, sans-serif;
    --font-heading: 'Orbitron', Tahoma, sans-serif;
    --font-mono: 'Courier New', 'Lucida Console', monospace;
    --radius-pill: 20px;
    --radius-card: 6px;
  }

  /* ──────────────────────────────────────────
     KEYFRAMES
  ────────────────────────────────────────── */

  @keyframes y2k-spin-cd {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes y2k-shimmer-bar {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes y2k-sparkle-pop {
    0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
    33%       { opacity: 0.7; transform: scale(1.4) rotate(20deg); }
    66%       { opacity: 1; transform: scale(0.9) rotate(-10deg); }
  }

  @keyframes y2k-progress-fill {
    0%   { width: 0%; }
    100% { width: 78%; }
  }

  @keyframes y2k-shine-sweep {
    0%   { left: -100%; opacity: 0; }
    20%  { opacity: 1; }
    80%  { opacity: 0.6; }
    100% { left: 200%; opacity: 0; }
  }

  @keyframes y2k-chrome-shimmer {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes y2k-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  @keyframes y2k-wizard-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0, 136, 204, 0.4); }
    50%       { box-shadow: 0 0 0 6px rgba(0, 136, 204, 0); }
  }

  @keyframes y2k-marquee {
    0%   { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }

  @keyframes y2k-neon-pulse {
    0%, 100% { text-shadow: 0 0 6px #ff00cc, 0 0 12px #ff00cc88; }
    50%       { text-shadow: 0 0 14px #ff00cc, 0 0 28px #ff00ccaa, 0 0 50px #ff00cc44; }
  }

  @keyframes y2k-counter-tick {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes y2k-spin-icon {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* ──────────────────────────────────────────
     ROOT LAYOUT — flex with sidebar
  ────────────────────────────────────────── */

  [data-theme="y2k"] .y2k-root {
    display: flex;
    height: 100%;
    font-family: var(--font-body);
    color: var(--text);
    background: var(--bg);
    font-size: 12px;
  }

  /* ══════════════════════════════════════════
     SIDEBAR — MSN/XP style
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-sidebar {
    width: 180px;
    flex-shrink: 0;
    background: var(--sidebar-bg);
    border-right: 2px solid var(--chrome-low);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: inset -1px 0 0 rgba(255,255,255,0.6);
  }

  /* Chrome top strip */
  [data-theme="y2k"] .y2k-sidebar-chrome {
    height: 36px;
    background: linear-gradient(180deg,
      #5090e0 0%,
      #2060c0 40%,
      #1050b0 60%,
      #3070d0 100%
    );
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4);
    flex-shrink: 0;
  }

  [data-theme="y2k"] .y2k-sidebar-logo {
    font-family: var(--font-heading);
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    letter-spacing: 0.12em;
    line-height: 1;
  }

  [data-theme="y2k"] .y2k-sidebar-online {
    margin-left: auto;
    font-size: 9px;
    font-weight: 700;
    color: #a0ffcc;
    text-shadow: 0 0 6px rgba(100, 255, 180, 0.8);
    letter-spacing: 0.06em;
  }

  [data-theme="y2k"] .y2k-sidebar-section-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 10px 12px 4px;
    border-bottom: 1px solid var(--border-light);
  }

  [data-theme="y2k"] .y2k-nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-size: 11px;
    font-family: var(--font-body);
    color: var(--text);
    background: transparent;
    cursor: pointer;
    border: none;
    border-bottom: 1px solid rgba(180,200,220,0.3);
    transition: background 0.1s;
    text-align: left;
    width: 100%;
  }

  [data-theme="y2k"] .y2k-nav-item:hover {
    background: rgba(0, 136, 204, 0.12);
    color: var(--xp-blue);
  }

  [data-theme="y2k"] .y2k-nav-item.active {
    background: linear-gradient(180deg, #3090f0 0%, #1060c0 100%);
    color: #ffffff;
    font-weight: 700;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
  }


  [data-theme="y2k"] .y2k-nav-icon {
    font-size: 13px;
    flex-shrink: 0;
    width: 16px;
    text-align: center;
  }

  [data-theme="y2k"] .y2k-nav-badge {
    margin-left: auto;
    background: #ff3300;
    color: #ffffff;
    font-size: 9px;
    font-weight: 700;
    border-radius: 50px;
    padding: 1px 5px;
    min-width: 16px;
    text-align: center;
  }

  [data-theme="y2k"] .y2k-nav-sep {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 4px 8px;
  }

  [data-theme="y2k"] .y2k-sidebar-footer {
    margin-top: auto;
    padding: 10px 12px;
    border-top: 1px solid var(--border);
    font-size: 9px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* ══════════════════════════════════════════
     MAIN CONTENT AREA
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-main {
    flex: 1;
    overflow-y: auto;
    background: var(--bg-content);
    display: flex;
    flex-direction: column;
  }

  /* Title bar / top chrome */
  [data-theme="y2k"] .y2k-titlebar {
    height: 32px;
    background: linear-gradient(180deg,
      #5898e8 0%,
      #2868c8 40%,
      #1858b8 60%,
      #3878d8 100%
    );
    display: flex;
    align-items: center;
    padding: 0 14px;
    gap: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5);
    flex-shrink: 0;
  }

  [data-theme="y2k"] .y2k-titlebar-title {
    font-family: var(--font-heading);
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    letter-spacing: 0.1em;
  }

  [data-theme="y2k"] .y2k-titlebar-sparkles {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  [data-theme="y2k"] .y2k-sparkle {
    color: #ffe040;
    font-size: 14px;
    text-shadow: 0 0 6px rgba(255, 220, 0, 0.9);
    animation: y2k-sparkle-pop 2.8s ease-in-out infinite;
  }

  [data-theme="y2k"] .y2k-sparkle:nth-child(2) { animation-delay: 0.8s; font-size: 10px; color: #ffffff; }
  [data-theme="y2k"] .y2k-sparkle:nth-child(3) { animation-delay: 1.5s; font-size: 12px; color: #a0e8ff; }

  [data-theme="y2k"] .y2k-titlebar-winbtns {
    margin-left: auto;
    display: flex;
    gap: 3px;
  }

  [data-theme="y2k"] .y2k-winbtn {
    width: 18px;
    height: 16px;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.4);
    font-size: 9px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    line-height: 1;
  }

  [data-theme="y2k"] .y2k-winbtn--min {
    background: linear-gradient(180deg, #f8f0a0, #d4c040);
  }

  [data-theme="y2k"] .y2k-winbtn--max {
    background: linear-gradient(180deg, #a0e090, #50a840);
  }

  [data-theme="y2k"] .y2k-winbtn--close {
    background: linear-gradient(180deg, #f09090, #d84040);
    color: #ffffff;
  }

  [data-theme="y2k"] .y2k-content {
    flex: 1;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  [data-theme="y2k"] .y2k-section-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  [data-theme="y2k"] .y2k-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--border), transparent);
    max-width: 200px;
  }

  /* ══════════════════════════════════════════
     HEADER — chrome metallic title
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-header {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  [data-theme="y2k"] .y2k-h1-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  [data-theme="y2k"] .y2k-h1 {
    font-family: var(--font-heading);
    font-size: 36px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0.06em;
    background: linear-gradient(180deg,
      #ffffff 0%,
      #d0e8ff 20%,
      #80c0f0 40%,
      #2080d0 60%,
      #60a8e8 80%,
      #c0d8f8 100%
    );
    background-size: 100% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: y2k-chrome-shimmer 4s ease-in-out infinite;
    filter: drop-shadow(0 2px 4px rgba(0,80,160,0.3));
  }

  [data-theme="y2k"] .y2k-sparkle-row {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  [data-theme="y2k"] .y2k-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 14px;
    border-radius: 50px;
    background: linear-gradient(180deg, #70d4ff 0%, #00aacc 50%, #0088aa 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 6px rgba(0,136,204,0.4);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    width: fit-content;
  }

  [data-theme="y2k"] .y2k-header-sub {
    font-size: 12px;
    color: var(--text-muted);
    max-width: 520px;
    line-height: 1.6;
  }

  /* ══════════════════════════════════════════
     CD DISC + FROSTED PANEL ROW
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-holo-row {
    display: flex;
    gap: 20px;
    align-items: stretch;
    flex-wrap: wrap;
  }

  [data-theme="y2k"] .y2k-frosted-panel {
    flex: 1;
    min-width: 240px;
    border-radius: var(--radius-card);
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow:
      inset 1px 1px 0 rgba(255,255,255,0.95),
      inset -1px -1px 0 rgba(0,0,0,0.08),
      2px 2px 10px rgba(0,0,0,0.18);
    padding: 20px;
  }

  [data-theme="y2k"] .y2k-frosted-title {
    font-family: var(--font-heading);
    font-size: 11px;
    font-weight: 700;
    color: var(--xp-blue-dark);
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  [data-theme="y2k"] .y2k-frosted-body {
    font-size: 11px;
    line-height: 1.65;
    color: var(--text-muted);
  }

  [data-theme="y2k"] .y2k-frosted-tag {
    display: inline-block;
    margin-top: 12px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 50px;
    background: linear-gradient(180deg, #70d4ff 0%, #00aacc 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(0,120,180,0.4);
    color: #ffffff;
    text-shadow: 0 1px 1px rgba(0,0,0,0.3);
  }

  /* CD disc */
  [data-theme="y2k"] .y2k-cd-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px 28px;
    background: rgba(255,255,255,0.5);
    border-radius: var(--radius-card);
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow: inset 1px 1px 0 rgba(255,255,255,0.9), 2px 2px 8px rgba(0,0,0,0.15);
  }

  [data-theme="y2k"] .y2k-cd {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      #ff99ee, #aaccff, #99ffee, #ffffaa, #ffcc99, #ffaacc,
      #cc99ff, #88ddff, #aaffcc, #ffff88, #ff99ee
    );
    position: relative;
    animation: y2k-spin-cd 7s linear infinite;
    box-shadow:
      0 4px 16px rgba(0,0,0,0.25),
      inset 0 0 20px rgba(255,255,255,0.3);
    flex-shrink: 0;
  }

  /* Metallic ring around CD */
  [data-theme="y2k"] .y2k-cd::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f0f4f8, #c8d4e0, #f0f4f8);
    box-shadow: 0 0 0 3px rgba(200,220,240,0.6), inset 0 1px 2px rgba(0,0,0,0.15);
    z-index: 2;
  }

  /* Shine layer */
  [data-theme="y2k"] .y2k-cd::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.6) 0%,
      transparent 40%,
      rgba(255,255,255,0.15) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  [data-theme="y2k"] .y2k-cd-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-align: center;
    font-family: var(--font-heading);
  }

  /* ══════════════════════════════════════════
     STAT CARDS — bevel/emboss
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-stats-grid {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  [data-theme="y2k"] .y2k-stat-card {
    flex: 1;
    min-width: 110px;
    background: linear-gradient(180deg, #f2f6fc 0%, #dce6f4 100%);
    border-radius: var(--radius-card);
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-shadow:
      inset 1px 1px 0 rgba(255,255,255,0.95),
      inset -1px -1px 0 rgba(0,0,0,0.12),
      2px 2px 8px rgba(0,0,0,0.18);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    cursor: default;
  }

  [data-theme="y2k"] .y2k-stat-card:hover {
    transform: translateY(-2px);
    box-shadow:
      inset 1px 1px 0 rgba(255,255,255,0.95),
      inset -1px -1px 0 rgba(0,0,0,0.12),
      4px 6px 16px rgba(0,0,0,0.2);
  }

  [data-theme="y2k"] .y2k-stat-number {
    font-family: var(--font-heading);
    font-size: 32px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.02em;
    background: linear-gradient(180deg,
      #f0f8ff 0%,
      #90c8f0 30%,
      #1080d0 60%,
      #80b8e8 100%
    );
    background-size: 100% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  [data-theme="y2k"] .y2k-stat-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  [data-theme="y2k"] .y2k-stat-delta {
    font-size: 10px;
    color: #1a9a40;
    font-weight: 700;
  }

  /* ══════════════════════════════════════════
     LOADING BAR + INSTALL WIZARD
  ══════════════════════════════════════════ */

  /* Loading bar panel — XP style */
  [data-theme="y2k"] .y2k-loading-panel {
    background: linear-gradient(180deg, #f0f4fc 0%, #e4ecf8 100%);
    border-radius: var(--radius-card);
    border: 1px solid rgba(255,255,255,0.9);
    border-top-color: rgba(255,255,255,0.9);
    box-shadow:
      inset 1px 1px 0 rgba(255,255,255,0.9),
      inset -1px -1px 0 rgba(0,0,0,0.08),
      2px 2px 8px rgba(0,0,0,0.15);
    overflow: hidden;
  }

  [data-theme="y2k"] .y2k-loading-titlebar {
    height: 28px;
    background: linear-gradient(180deg,
      #5898e8 0%,
      #2868c8 40%,
      #1858b8 60%,
      #3878d8 100%
    );
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4);
  }

  [data-theme="y2k"] .y2k-loading-title {
    font-family: var(--font-heading);
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    letter-spacing: 0.06em;
  }

  [data-theme="y2k"] .y2k-loading-body {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  [data-theme="y2k"] .y2k-loading-status {
    font-size: 11px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  [data-theme="y2k"] .y2k-loading-status span {
    animation: y2k-blink 1s step-end infinite;
    color: var(--xp-blue);
    font-weight: 700;
  }

  [data-theme="y2k"] .y2k-progress-track {
    width: 100%;
    height: 18px;
    background: #c8d4e0;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.2);
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.2), inset -1px -1px 0 rgba(255,255,255,0.5);
    overflow: hidden;
    position: relative;
  }

  [data-theme="y2k"] .y2k-progress-bar {
    height: 100%;
    background: linear-gradient(180deg,
      #70d4ff 0%,
      #40b8f0 25%,
      #0088cc 50%,
      #40b8f0 75%,
      #70d4ff 100%
    );
    background-size: 200% 100%;
    animation:
      y2k-progress-fill 2.5s ease-out forwards,
      y2k-shimmer-bar 1.8s linear infinite;
    border-radius: 2px;
    position: relative;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
  }

  /* Animated shine sweep on bar */
  [data-theme="y2k"] .y2k-progress-bar::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 40px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    animation: y2k-shine-sweep 2s linear infinite;
  }

  [data-theme="y2k"] .y2k-progress-pct {
    font-size: 10px;
    color: var(--text-muted);
    text-align: right;
    font-weight: 700;
  }

  [data-theme="y2k"] .y2k-loading-rows {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  [data-theme="y2k"] .y2k-loading-row {
    font-size: 10px;
    color: var(--text-muted);
    display: flex;
    gap: 10px;
    align-items: center;
  }

  [data-theme="y2k"] .y2k-loading-row .ok {
    color: #1a9a40;
    font-weight: 700;
    font-size: 9px;
    background: #d4f0dc;
    border-radius: 3px;
    padding: 1px 5px;
  }

  [data-theme="y2k"] .y2k-wizard {
    background: linear-gradient(180deg, #f0f4fc 0%, #e4ecf8 100%);
    border-radius: var(--radius-card);
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow:
      inset 1px 1px 0 rgba(255,255,255,0.9),
      2px 2px 8px rgba(0,0,0,0.15);
    overflow: hidden;
  }

  [data-theme="y2k"] .y2k-wizard-header {
    background: linear-gradient(90deg, #f0f4fc, #d8e8f8);
    border-bottom: 1px solid var(--border);
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  [data-theme="y2k"] .y2k-wizard-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #70d4ff, #0088cc);
    box-shadow: inset 0 2px 0 rgba(255,255,255,0.5), 0 3px 8px rgba(0,136,204,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  [data-theme="y2k"] .y2k-wizard-header-text h3 {
    font-family: var(--font-heading);
    font-size: 13px;
    font-weight: 700;
    color: var(--xp-blue-dark);
    letter-spacing: 0.06em;
    margin: 0 0 4px;
  }

  [data-theme="y2k"] .y2k-wizard-header-text p {
    font-size: 10px;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
  }

  [data-theme="y2k"] .y2k-wizard-body {
    display: flex;
    min-height: 180px;
  }

  [data-theme="y2k"] .y2k-wizard-steps {
    width: 140px;
    flex-shrink: 0;
    background: linear-gradient(180deg, #2060c8 0%, #1040a0 100%);
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  [data-theme="y2k"] .y2k-wizard-step {
    padding: 7px 14px;
    font-size: 10px;
    color: rgba(200, 220, 255, 0.7);
    font-weight: 600;
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    transition: background 0.1s;
  }

  [data-theme="y2k"] .y2k-wizard-step:hover {
    background: rgba(255,255,255,0.1);
    color: rgba(220,240,255,0.9);
  }

  [data-theme="y2k"] .y2k-wizard-step.active {
    background: rgba(255,255,255,0.18);
    color: #ffffff;
    font-weight: 700;
  }

  [data-theme="y2k"] .y2k-wizard-step.done {
    color: #80d0a8;
  }

  [data-theme="y2k"] .y2k-wizard-step-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    flex-shrink: 0;
  }

  [data-theme="y2k"] .y2k-wizard-content {
    flex: 1;
    padding: 20px;
    background: linear-gradient(180deg, #f0f4fc 0%, #e4ecf8 100%);
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    align-items: flex-end;
  }

  /* ══════════════════════════════════════════
     BUDDY LIST PANEL — MSN/AIM style
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-buddy-panel {
    background: #f0f4fc;
    border-radius: var(--radius-card);
    border: 1px solid var(--border);
    box-shadow:
      inset 1px 1px 0 rgba(255,255,255,0.9),
      2px 2px 8px rgba(0,0,0,0.15);
    overflow: hidden;
    max-width: 320px;
  }

  [data-theme="y2k"] .y2k-buddy-titlebar {
    height: 26px;
    background: linear-gradient(180deg,
      #5898e8 0%,
      #2868c8 40%,
      #1858b8 60%,
      #3878d8 100%
    );
    display: flex;
    align-items: center;
    padding: 0 10px;
    gap: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4);
  }

  [data-theme="y2k"] .y2k-buddy-titlebar-text {
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
    letter-spacing: 0.04em;
  }

  [data-theme="y2k"] .y2k-buddy-user {
    padding: 8px 10px;
    background: linear-gradient(180deg, #e0ecfc, #d0dff0);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  [data-theme="y2k"] .y2k-buddy-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #70d4ff, #0088cc);
    border: 2px solid rgba(255,255,255,0.8);
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  [data-theme="y2k"] .y2k-buddy-user-name {
    font-size: 11px;
    font-weight: 700;
    color: var(--text);
  }

  [data-theme="y2k"] .y2k-buddy-user-status {
    font-size: 9px;
    color: var(--text-muted);
  }

  [data-theme="y2k"] .y2k-buddy-section-header {
    padding: 5px 10px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    background: linear-gradient(180deg, #5090d8, #3070c0);
    border-top: 1px solid var(--border);
  }

  [data-theme="y2k"] .y2k-buddy-item {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: var(--text);
    border-bottom: 1px solid rgba(180,200,230,0.3);
    cursor: pointer;
  }

  [data-theme="y2k"] .y2k-buddy-item:hover {
    background: rgba(0,136,204,0.08);
  }

  [data-theme="y2k"] .y2k-buddy-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  [data-theme="y2k"] .y2k-buddy-dot--online {
    background: #30cc60;
    box-shadow: 0 0 4px rgba(50,200,80,0.7);
  }

  [data-theme="y2k"] .y2k-buddy-dot--away {
    background: #f0c030;
    box-shadow: 0 0 4px rgba(240,180,0,0.7);
  }

  [data-theme="y2k"] .y2k-buddy-dot--offline {
    background: #c0c8d0;
  }

  [data-theme="y2k"] .y2k-buddy-item-status {
    margin-left: auto;
    font-size: 9px;
    color: var(--text-muted);
  }

  /* ══════════════════════════════════════════
     CHROME METALLIC PROGRESS BARS
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-chrome-progress-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  [data-theme="y2k"] .y2k-chrome-progress-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  [data-theme="y2k"] .y2k-chrome-progress-name {
    width: 72px;
    font-size: 10px;
    font-weight: 700;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  [data-theme="y2k"] .y2k-chrome-progress-track {
    flex: 1;
    height: 14px;
    background: #c0d0e0;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.18);
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.18), inset -1px -1px 0 rgba(255,255,255,0.5);
    overflow: hidden;
  }

  [data-theme="y2k"] .y2k-chrome-progress-fill {
    height: 100%;
    border-radius: 2px;
    position: relative;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
  }

  [data-theme="y2k"] .y2k-chrome-progress-fill::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 30px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    animation: y2k-shine-sweep 2.5s linear infinite;
  }

  [data-theme="y2k"] .y2k-chrome-progress-fill--teal {
    background: linear-gradient(180deg, #70e0f0 0%, #00bcd4 50%, #0090a8 100%);
  }

  [data-theme="y2k"] .y2k-chrome-progress-fill--blue {
    background: linear-gradient(180deg, #70b8f8 0%, #2080d8 50%, #1060c0 100%);
  }

  [data-theme="y2k"] .y2k-chrome-progress-fill--silver {
    background: linear-gradient(180deg, #f0f4f8 0%, #c0d0e0 50%, #a0b4c8 100%);
  }

  [data-theme="y2k"] .y2k-chrome-progress-fill--lime {
    background: linear-gradient(180deg, #b0ff60 0%, #66cc00 50%, #448800 100%);
  }

  [data-theme="y2k"] .y2k-chrome-progress-val {
    width: 32px;
    text-align: right;
    font-size: 10px;
    font-weight: 700;
    color: var(--text-muted);
    flex-shrink: 0;
  }

  /* ══════════════════════════════════════════
     BUBBLE/PILL BUTTONS
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  [data-theme="y2k"] .y2k-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 20px;
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    border: 1px solid transparent;
    transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
    text-decoration: none;
  }

  [data-theme="y2k"] .y2k-btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }

  [data-theme="y2k"] .y2k-btn:active {
    transform: scale(0.97) translateY(1px);
    filter: brightness(0.95);
  }

  [data-theme="y2k"] .y2k-btn:focus-visible {
    outline: 2px solid var(--xp-blue);
    outline-offset: 3px;
  }

  /* Aqua/teal bubble button — THE Y2K button */
  [data-theme="y2k"] .y2k-btn--aqua {
    background: linear-gradient(180deg, #70d4ff 0%, #00aacc 50%, #0088aa 100%);
    border-color: #006688;
    color: #ffffff;
    text-shadow: 0 1px 1px rgba(0,0,0,0.3);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.8),
      0 2px 6px rgba(0,136,180,0.45);
  }

  [data-theme="y2k"] .y2k-btn--aqua:hover {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.8),
      0 4px 12px rgba(0,136,180,0.6);
  }

  /* Silver chrome button */
  [data-theme="y2k"] .y2k-btn--silver {
    background: linear-gradient(180deg, #f5f8ff 0%, #d0daea 50%, #b8c8dc 100%);
    border-color: #90a0b8;
    color: #1a2a3a;
    text-shadow: 0 1px 0 rgba(255,255,255,0.8);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.95),
      0 2px 4px rgba(0,0,0,0.2);
  }

  [data-theme="y2k"] .y2k-btn--silver:hover {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.95),
      0 3px 8px rgba(0,0,0,0.25);
  }

  /* XP blue button */
  [data-theme="y2k"] .y2k-btn--xpblue {
    background: linear-gradient(180deg, #5090e8 0%, #1860d0 50%, #0848b8 100%);
    border-color: #0040a0;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.5),
      0 2px 6px rgba(0,60,180,0.45);
  }

  /* Lime accent button */
  [data-theme="y2k"] .y2k-btn--lime {
    background: linear-gradient(180deg, #c0ff60 0%, #66dd00 50%, #44aa00 100%);
    border-color: #338800;
    color: #1a3300;
    text-shadow: 0 1px 0 rgba(255,255,255,0.4);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.7),
      0 2px 6px rgba(80,180,0,0.4);
  }

  [data-theme="y2k"] .y2k-btn--disabled {
    background: linear-gradient(180deg, #e4eaf4, #d0d8e8);
    border-color: #b0bcc8;
    color: #8898aa;
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: none;
  }

  /* ══════════════════════════════════════════
     FORM INPUTS — XP inset bevel
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 440px;
  }

  [data-theme="y2k"] .y2k-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  [data-theme="y2k"] .y2k-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--text);
  }

  [data-theme="y2k"] .y2k-input {
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 5px 8px;
    font-family: var(--font-body);
    font-size: 11px;
    color: var(--text);
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    width: 100%;
    box-sizing: border-box;
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.15);
  }

  [data-theme="y2k"] .y2k-input::placeholder {
    color: #a0b0c0;
  }

  [data-theme="y2k"] .y2k-input:focus {
    border-color: var(--xp-blue);
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.1), 0 0 0 2px rgba(0,100,200,0.2);
  }

  [data-theme="y2k"] .y2k-select {
    appearance: none;
    background: #ffffff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 4 5-4' stroke='%230066aa' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 10px center;
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 5px 28px 5px 8px;
    font-family: var(--font-body);
    font-size: 11px;
    color: var(--text);
    outline: none;
    cursor: pointer;
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.15);
  }

  [data-theme="y2k"] .y2k-select:focus {
    border-color: var(--xp-blue);
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.1), 0 0 0 2px rgba(0,100,200,0.2);
  }

  /* ══════════════════════════════════════════
     COLOR PALETTE SWATCH ROW
  ══════════════════════════════════════════ */

  [data-theme="y2k"] .y2k-palette {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  [data-theme="y2k"] .y2k-swatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  [data-theme="y2k"] .y2k-swatch-color {
    width: 52px;
    height: 52px;
    border-radius: var(--radius-card);
    box-shadow:
      inset 1px 1px 0 rgba(255,255,255,0.8),
      inset -1px -1px 0 rgba(0,0,0,0.15),
      2px 2px 6px rgba(0,0,0,0.2);
  }

  [data-theme="y2k"] .y2k-swatch-name {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    text-align: center;
    text-transform: uppercase;
  }

  [data-theme="y2k"] .y2k-swatch-hex {
    font-family: var(--font-mono);
    font-size: 8px;
    color: var(--text-light);
  }

  /* ── DARK MODE (Y2K nightmode) ── */
  [data-theme="y2k"][data-mode="dark"] {
    --bg: #0a0f1a;
    --bg-panel: #0f1628;
    --bg-content: #121c30;
    --sidebar-bg: linear-gradient(180deg, #0a1020 0%, #0c1428 100%);
    --border: #204060;
    --border-light: #182840;
    --text: #c0d8f0;
    --text-muted: #6080a0;
    --text-light: #4060a0;
    --silver-dark: #203040;
    --silver-mid: #182838;
    --silver-light: #102030;
    --chrome-high: #304060;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const Y2KShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const bodyFont: React.CSSProperties = { fontFamily: "Tahoma, Verdana, 'Trebuchet MS', system-ui, sans-serif" };
  const headFont: React.CSSProperties = { fontFamily: "'Orbitron', Tahoma, sans-serif" };
  const monoFont: React.CSSProperties = { fontFamily: "'Courier New', 'Lucida Console', monospace" };

  const xpPanel = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "linear-gradient(180deg, #f0f4fc 0%, #e4ecf8 100%)",
    border: "1px solid rgba(255,255,255,0.9)",
    borderBottomColor: "#a0b0cc",
    borderRightColor: "#a0b0cc",
    boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.08), 2px 2px 8px rgba(0,0,0,0.15)",
    borderRadius: "6px",
    overflow: "hidden",
    ...extra,
  });

  const xpTitlebar = (title: string, icon?: string) => (
    <div style={{ height: "28px", background: "linear-gradient(180deg, #5898e8 0%, #2868c8 40%, #1858b8 60%, #3878d8 100%)", display: "flex", alignItems: "center", padding: "0 10px", gap: "6px", boxShadow: "0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)", flexShrink: 0 }}>
      {icon && <span style={{ fontSize: "12px" }}>{icon}</span>}
      <span style={{ ...headFont, fontSize: "10px", fontWeight: 700, color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.5)", letterSpacing: "0.06em", flex: 1 }}>{title}</span>
      <div style={{ display: "flex", gap: "3px" }}>
        <div style={{ width: "16px", height: "14px", borderRadius: "3px", background: "linear-gradient(180deg, #f8f0a0, #d4c040)", border: "1px solid rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#333", cursor: "pointer" }}>_</div>
        <div style={{ width: "16px", height: "14px", borderRadius: "3px", background: "linear-gradient(180deg, #a0e090, #50a840)", border: "1px solid rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#333", cursor: "pointer" }}>□</div>
        <div style={{ width: "16px", height: "14px", borderRadius: "3px", background: "linear-gradient(180deg, #f09090, #d84040)", border: "1px solid rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#fff", cursor: "pointer" }}>✕</div>
      </div>
    </div>
  );

  const buddyList = [
    { name: "xX_c00lDude_Xx",     status: "online",  msg: "lol brb" },
    { name: "star_gurl_2001",     status: "online",  msg: "~*~luv AOL~*~" },
    { name: "hAx0r_m4n",          status: "away",    msg: "AFK: grinding RuneScape" },
    { name: "webmaster_kev",      status: "online",  msg: "updating my geocities page" },
    { name: "dial_up_dude",       status: "away",    msg: "my mom needs the phone" },
    { name: "napster_4life",      status: "offline", msg: "" },
    { name: "matrix_fan_99",      status: "offline", msg: "" },
  ];

  const guestbookEntries = [
    { name: "SkaterBoi_T",  date: "Apr 14, 2001", msg: "omg ur site is SO KEWL!! bookmarked 4ever!!! 🌟", stars: 5 },
    { name: "princess_J",   date: "Apr 12, 2001", msg: "luv the background music!! what band is that??", stars: 5 },
    { name: "K3vinXXL",     date: "Apr 09, 2001", msg: "ur css is amazing how do u do that flash thingy", stars: 4 },
    { name: "webgirl99",    date: "Apr 07, 2001", msg: "visited from ring!! linking u on my page!!!! ✨✨✨", stars: 5 },
  ];

  const counterDigits = "001337".split("");

  return (
    <div style={{ ...bodyFont, background: "#dce4f0", color: "#1a2a3a", minHeight: "100%", fontSize: "12px", boxSizing: "border-box" }}>

      {/* TITLE BAR */}
      <div style={{ height: "32px", background: "linear-gradient(180deg, #5898e8 0%, #2868c8 40%, #1858b8 60%, #3878d8 100%)", display: "flex", alignItems: "center", padding: "0 14px", gap: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)", flexShrink: 0 }}>
        <span style={{ fontSize: "16px" }}>💾</span>
        <span style={{ ...headFont, fontSize: "11px", fontWeight: 700, color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.5)", letterSpacing: "0.1em", flex: 1 }}>MY HOMEPAGE — Internet Explorer 6.0</span>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <span className="y2k-sparkle" style={{ color: "#ffe040", fontSize: "14px", textShadow: "0 0 6px rgba(255,220,0,0.9)", animation: "y2k-sparkle-pop 2.8s ease-in-out infinite" }}>★</span>
          <span className="y2k-sparkle" style={{ color: "#ffffff", fontSize: "10px", animation: "y2k-sparkle-pop 2.8s ease-in-out 0.8s infinite" }}>✦</span>
          <span className="y2k-sparkle" style={{ color: "#a0e8ff", fontSize: "12px", animation: "y2k-sparkle-pop 2.8s ease-in-out 1.5s infinite" }}>✶</span>
        </div>
        <div style={{ display: "flex", gap: "3px" }}>
          <div style={{ ...headFont, width: "18px", height: "16px", borderRadius: "3px", background: "linear-gradient(180deg, #f8f0a0, #d4c040)", border: "1px solid rgba(0,0,0,0.4)", fontSize: "9px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#000" }}>_</div>
          <div style={{ ...headFont, width: "18px", height: "16px", borderRadius: "3px", background: "linear-gradient(180deg, #a0e090, #50a840)", border: "1px solid rgba(0,0,0,0.4)", fontSize: "9px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#000" }}>□</div>
          <div style={{ ...headFont, width: "18px", height: "16px", borderRadius: "3px", background: "linear-gradient(180deg, #f09090, #d84040)", border: "1px solid rgba(0,0,0,0.4)", fontSize: "9px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>✕</div>
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{ background: "linear-gradient(90deg, #1050b0, #2080cc, #1050b0)", height: "24px", overflow: "hidden", display: "flex", alignItems: "center", borderBottom: "2px solid #60a0e0" }}>
        <div style={{ ...headFont, fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", color: "#a0e8ff", textShadow: "0 0 8px rgba(100,200,255,0.8)", whiteSpace: "nowrap", animation: "y2k-marquee 18s linear infinite" }}>
          ★ WELCOME TO MY HOMEPAGE ★ BEST VIEWED IN 800×600 ★ NETSCAPE NAVIGATOR 4.0+ ★ TURN UP YOUR SPEAKERS ★ LAST UPDATED: APR 2001 ★ YOU ARE VISITOR #001337 ★ SIGN MY GUESTBOOK ★ LINK EXCHANGE OPEN ★
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100% - 80px)" }}>
        {/* SIDEBAR */}
        <div style={{ width: "180px", flexShrink: 0, background: "linear-gradient(180deg, #d0daea 0%, #c4d0e8 100%)", borderRight: "2px solid #a8b8c8", display: "flex", flexDirection: "column", boxShadow: "inset -1px 0 0 rgba(255,255,255,0.6)" }}>
          {/* Logo strip */}
          <div style={{ height: "36px", background: "linear-gradient(180deg, #5090e0 0%, #2060c0 40%, #1050b0 60%, #3070d0 100%)", display: "flex", alignItems: "center", padding: "0 12px", gap: "6px", boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)", flexShrink: 0 }}>
            <span style={{ ...headFont, fontSize: "10px", fontWeight: 700, color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.5)", letterSpacing: "0.12em" }}>Y2K PORTAL</span>
            <span style={{ marginLeft: "auto", fontSize: "9px", fontWeight: 700, color: "#a0ffcc", textShadow: "0 0 6px rgba(100,255,180,0.8)" }}>ONLINE</span>
          </div>
          <div style={{ padding: "8px 0", flex: 1 }}>
            <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a6a7a", padding: "8px 12px 4px", borderBottom: "1px solid #c8d4e8" }}>Navigation</div>
            {[
              { icon: "🏠", label: "Home",        active: true },
              { icon: "📸", label: "My Photos",   badge: "3"  },
              { icon: "📝", label: "My Diary"               },
              { icon: "🎵", label: "My Music"               },
              { icon: "💬", label: "Guestbook",   badge: "4"  },
              { icon: "🔗", label: "My Links"               },
              { icon: "✉️", label: "Contact Me"             },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px", fontSize: "11px", color: item.active ? "#ffffff" : "#1a2a3a", background: item.active ? "linear-gradient(180deg, #3090f0 0%, #1060c0 100%)" : "transparent", fontWeight: item.active ? 700 : 400, borderBottom: "1px solid rgba(180,200,220,0.3)", cursor: "pointer" }}>
                <span style={{ fontSize: "13px", width: "16px", textAlign: "center" }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && <span style={{ background: "#ff3300", color: "#fff", fontSize: "9px", fontWeight: 700, borderRadius: "50px", padding: "1px 5px" }}>{item.badge}</span>}
              </div>
            ))}
          </div>
          {/* Visitor counter */}
          <div style={{ padding: "12px", borderTop: "1px solid #a0b0cc" }}>
            <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a6a7a", marginBottom: "6px", textAlign: "center" }}>VISITORS</div>
            <div style={{ display: "flex", justifyContent: "center", gap: "2px" }}>
              {counterDigits.map((d, i) => (
                <div key={i} style={{ ...monoFont, width: "20px", height: "26px", background: "linear-gradient(180deg, #1a1a1a, #000000)", border: "1px solid #333", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#00ff88", textShadow: "0 0 8px rgba(0,255,136,0.8)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)" }}>
                  {d}
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "8px 12px", borderTop: "1px solid #a0b0cc", fontSize: "9px", color: "#5a6a7a", lineHeight: 1.6 }}>
            <div>© 2001 MyHomepage.net</div>
            <div>Powered by GeoCities™</div>
            <div style={{ color: "#0088cc", cursor: "pointer" }}>Link Exchange</div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, background: "#f0f4fc", padding: "16px", display: "flex", flexDirection: "column", gap: "16px", overflow: "auto" }}>

          {/* WELCOME BANNER */}
          <div style={{ ...xpPanel({ overflow: "visible" }) }}>
            {xpTitlebar("WELCOME TO MY PAGE!! :D :D", "🌟")}
            <div style={{ padding: "16px 20px", display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
              <div className="y2k-cd-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", padding: "16px 24px", background: "rgba(255,255,255,0.5)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.9), 2px 2px 8px rgba(0,0,0,0.15)" }}>
                <div className="y2k-cd" style={{ width: "100px", height: "100px", borderRadius: "50%", background: "conic-gradient(from 0deg, #ff99ee, #aaccff, #99ffee, #ffffaa, #ffcc99, #ffaacc, #cc99ff, #88ddff, #aaffcc, #ffff88, #ff99ee)", position: "relative", animation: "y2k-spin-cd 7s linear infinite", boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 0 20px rgba(255,255,255,0.3)" }}>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "22px", height: "22px", borderRadius: "50%", background: "linear-gradient(135deg, #f0f4f8, #c8d4e0, #f0f4f8)", boxShadow: "0 0 0 3px rgba(200,220,240,0.6)", zIndex: 2 }} />
                </div>
                <div style={{ ...headFont, fontSize: "8px", fontWeight: 700, letterSpacing: "0.12em", color: "#5a6a7a", textTransform: "uppercase" }}>NOW PLAYING</div>
              </div>
              <div style={{ flex: 1 }}>
                <h1 className="y2k-h1" style={{ ...headFont, fontSize: "28px", fontWeight: 900, lineHeight: 1, letterSpacing: "0.06em", background: "linear-gradient(180deg, #ffffff 0%, #d0e8ff 20%, #80c0f0 40%, #2080d0 60%, #60a8e8 80%, #c0d8f8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "y2k-chrome-shimmer 4s ease-in-out infinite", filter: "drop-shadow(0 2px 4px rgba(0,80,160,0.3))", margin: "0 0 8px" }}>
                  WELCOME TO MY HOMEPAGE!!!
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "14px", animation: "y2k-sparkle-pop 2.8s ease-in-out infinite" }}>⭐</span>
                  <span style={{ fontSize: "12px", animation: "y2k-sparkle-pop 2.8s ease-in-out 0.8s infinite" }}>✨</span>
                  <span style={{ fontSize: "14px", animation: "y2k-sparkle-pop 2.8s ease-in-out 1.5s infinite" }}>⭐</span>
                  <span style={{ ...headFont, fontSize: "9px", color: "#0088cc", letterSpacing: "0.1em", fontWeight: 700 }}>HI MY NAME IS EASTILL !!</span>
                  <span style={{ fontSize: "14px", animation: "y2k-sparkle-pop 2.8s ease-in-out 0.4s infinite" }}>✨</span>
                </div>
                <p style={{ fontSize: "11px", color: "#5a6a7a", lineHeight: 1.65, marginBottom: "10px", maxWidth: "400px" }}>
                  WELCOME TO MY AWESOME CORNER OF THE INTERNET!! UR LIKE VISITOR #001337 OMG!!
                  plz sign my guestbook and link exchange with me!! best viewed in 800x600 with javascript ON!!
                </p>
                <div className="y2k-btn-row" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button className="y2k-btn y2k-btn--aqua" style={{ ...bodyFont, display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: "linear-gradient(180deg, #70d4ff 0%, #00aacc 50%, #0088aa 100%)", border: "1px solid #006688", color: "#ffffff", cursor: "pointer", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 6px rgba(0,136,180,0.45)" }}>✉ Sign Guestbook</button>
                  <button className="y2k-btn y2k-btn--lime" style={{ ...bodyFont, display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: "linear-gradient(180deg, #c0ff60 0%, #66dd00 50%, #44aa00 100%)", border: "1px solid #338800", color: "#1a3300", cursor: "pointer", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 6px rgba(80,180,0,0.4)" }}>🔗 Link Exchange</button>
                  <button className="y2k-btn y2k-btn--silver" style={{ ...bodyFont, display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: "linear-gradient(180deg, #f5f8ff 0%, #d0daea 50%, #b8c8dc 100%)", border: "1px solid #90a0b8", color: "#1a2a3a", cursor: "pointer", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 4px rgba(0,0,0,0.2)" }}>📥 Download Winamp</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {/* UNDER CONSTRUCTION */}
            <div style={{ ...xpPanel() }}>
              {xpTitlebar("UNDER CONSTRUCTION", "🚧")}
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <div style={{ fontSize: "40px", animation: "y2k-spin-icon 3s linear infinite", display: "inline-block", flexShrink: 0 }}>⚙️</div>
                  <div>
                    <div style={{ ...headFont, fontSize: "11px", fontWeight: 700, color: "#084ea0", marginBottom: "4px" }}>UPDATING MY PAGE!!</div>
                    <div style={{ fontSize: "10px", color: "#5a6a7a", lineHeight: 1.6 }}>
                      adding new pages soon!! working on my photos section and a quiz about ur fav bands!!
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: "#5a6a7a", marginBottom: "6px", display: "flex", gap: "6px", alignItems: "center" }}>
                    Installing Cool Stuff... <span style={{ animation: "y2k-blink 1s step-end infinite", color: "#0088cc", fontWeight: 700 }}>Please Wait</span>
                  </div>
                  <div className="y2k-progress-track" style={{ width: "100%", height: "18px", background: "#c8d4e0", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.2)", boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.2), inset -1px -1px 0 rgba(255,255,255,0.5)", overflow: "hidden", position: "relative" }}>
                    <div className="y2k-progress-bar" style={{ height: "100%", background: "linear-gradient(180deg, #70d4ff 0%, #40b8f0 25%, #0088cc 50%, #40b8f0 75%, #70d4ff 100%)", backgroundSize: "200% 100%", animation: "y2k-progress-fill 2.5s ease-out forwards, y2k-shimmer-bar 1.8s linear infinite", borderRadius: "2px", position: "relative", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }} />
                  </div>
                  <div style={{ fontSize: "10px", color: "#5a6a7a", textAlign: "right", marginTop: "2px" }}>78%</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  {[
                    { label: "Glitter GIFs",       done: true  },
                    { label: "Frames Layout",       done: true  },
                    { label: "Background Music",    done: true  },
                    { label: "Flash Intro",         done: false },
                    { label: "Hit Counter Script",  done: false },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "10px", color: "#5a6a7a" }}>
                      <span style={{ color: r.done ? "#1a9a40" : "#a0b0cc", fontSize: "9px" }}>{r.done ? "✓" : "○"}</span>
                      <span style={{ color: r.done ? "#1a2a3a" : "#8898aa" }}>{r.label}</span>
                      {r.done && <span style={{ color: "#1a9a40", fontWeight: 700, fontSize: "9px", background: "#d4f0dc", borderRadius: "3px", padding: "1px 5px" }}>DONE</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BUDDY LIST */}
            <div style={{ ...xpPanel() }}>
              {xpTitlebar("AIM Buddy List", "💬")}
              <div style={{ padding: "8px 10px", background: "linear-gradient(180deg, #e0ecfc, #d0dff0)", borderBottom: "1px solid #a0b0cc", display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #70d4ff, #0088cc)", border: "2px solid rgba(255,255,255,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>😎</div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2a3a" }}>eastill2001</div>
                  <div style={{ fontSize: "9px", color: "#5a6a7a" }}>Available — "its 2001 baby!!"</div>
                </div>
              </div>
              <div style={{ padding: "4px 0" }}>
                {[{ group: "Buddies (4/7)", buddies: buddyList.slice(0, 4) }, { group: "Offline (2)", buddies: buddyList.slice(5) }].map(grp => (
                  <React.Fragment key={grp.group}>
                    <div style={{ padding: "4px 10px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", background: "linear-gradient(180deg, #5090d8, #3070c0)", borderTop: "1px solid #a0b0cc" }}>{grp.group}</div>
                    {grp.buddies.map(b => (
                      <div key={b.name} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 10px", fontSize: "11px", color: "#1a2a3a", borderBottom: "1px solid rgba(180,200,230,0.3)", cursor: "pointer" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: b.status === "online" ? "#30cc60" : b.status === "away" ? "#f0c030" : "#c0c8d0", boxShadow: b.status === "online" ? "0 0 4px rgba(50,200,80,0.7)" : "none", flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{b.name}</span>
                        {b.msg && <span style={{ fontSize: "9px", color: "#8898aa", maxWidth: "80px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.msg}</span>}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* GUESTBOOK */}
          <div style={{ ...xpPanel() }}>
            {xpTitlebar("My Guestbook — Sign it plz!!! 😊", "📝")}
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {guestbookEntries.map((entry, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(160,176,204,0.5)", borderRadius: "4px", padding: "10px 14px", boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.9), 1px 1px 4px rgba(0,0,0,0.1)" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "5px" }}>
                    <span style={{ fontWeight: 700, fontSize: "11px", color: "#0a6cd4" }}>{entry.name}</span>
                    <span style={{ fontSize: "9px", color: "#8898aa" }}>{entry.date}</span>
                    <span style={{ marginLeft: "auto", color: "#f0c030", fontSize: "11px" }}>{"★".repeat(entry.stars)}</span>
                  </div>
                  <p style={{ fontSize: "11px", color: "#5a6a7a", margin: 0, lineHeight: 1.5 }}>{entry.msg}</p>
                </div>
              ))}
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <button style={{ ...bodyFont, display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: "linear-gradient(180deg, #70d4ff 0%, #00aacc 50%, #0088aa 100%)", border: "1px solid #006688", color: "#ffffff", cursor: "pointer", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 6px rgba(0,136,180,0.45)" }}>✏️ Sign Guestbook</button>
                <button style={{ ...bodyFont, display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: "linear-gradient(180deg, #f5f8ff 0%, #d0daea 50%, #b8c8dc 100%)", border: "1px solid #90a0b8", color: "#1a2a3a", cursor: "pointer", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 4px rgba(0,0,0,0.2)" }}>📜 View All</button>
              </div>
            </div>
          </div>

          {/* STATS + CD stats row */}
          <div className="y2k-stats-grid" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { num: "2,841",  label: "Page Views",  delta: "+47 today" },
              { num: "128",    label: "Guestbook",   delta: "+4 new"    },
              { num: "64",     label: "Link Buddies", delta: "+2 this wk" },
              { num: "∞",      label: "Fun Factor",  delta: "MAX LEVEL"  },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, minWidth: "100px", background: "linear-gradient(180deg, #f2f6fc 0%, #dce6f4 100%)", borderRadius: "6px", padding: "14px", boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.95), inset -1px -1px 0 rgba(0,0,0,0.12), 2px 2px 8px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column", gap: "3px" }}>
                <div style={{ ...headFont, fontSize: "28px", fontWeight: 700, lineHeight: 1, background: "linear-gradient(180deg, #f0f8ff 0%, #90c8f0 30%, #1080d0 60%, #80b8e8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.num}</div>
                <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a6a7a" }}>{s.label}</div>
                <div style={{ fontSize: "10px", color: "#1a9a40", fontWeight: 700 }}>{s.delta}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* TASKBAR */}
      <div style={{ height: "32px", background: "linear-gradient(180deg, #3878d8 0%, #1858b8 40%, #1060c0 60%, #2870d0 100%)", display: "flex", alignItems: "center", padding: "0 8px", gap: "4px", borderTop: "2px solid #60a0e0", boxShadow: "0 -2px 4px rgba(0,0,0,0.2)" }}>
        <button style={{ ...headFont, padding: "3px 12px", borderRadius: "3px", background: "linear-gradient(180deg, #5898e8 0%, #2060c0 100%)", border: "1px solid #0840a0", color: "#ffffff", fontSize: "10px", fontWeight: 700, cursor: "pointer", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>⊞ Start</button>
        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.2)", margin: "0 2px" }} />
        {["My Homepage.htm", "WinAMP", "MSN Messenger"].map(t => (
          <button key={t} style={{ ...bodyFont, padding: "3px 10px", borderRadius: "2px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: "10px", cursor: "pointer", letterSpacing: "0.02em" }}>{t}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center", paddingRight: "4px" }}>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.7)" }}>3:59 PM</span>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.7)" }}>4/16/2001</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#dce4f0",
  sidebarBg: "linear-gradient(180deg, #d0daea 0%, #c4d0e8 100%)" as any,
  border:    "#a0b0cc",
  text:      "#1a2a3a",
  textMuted: "#5a6a7a",
  accent:    "#0088cc",
  accent2:   "#66ff00",
  cardBg:    "#f0f4fc",
  inputBg:   "#ffffff",
};

export const Y2KTheme: ThemeDefinition = {
  id: "y2k",
  name: "Y2K",
  emoji: "💾",
  description: "Windows XP chrome aesthetic — spinning CD, AIM buddy list, visitor counter, guestbook, and a marquee. Best viewed in 800×600. Turn up your speakers.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg:        "#0a0f1a",
      sidebarBg: "#0f1628",
      border:    "#204060",
      text:      "#c0d8f0",
      textMuted: "#6080a0",
      accent:    "#00aacc",
      accent2:   "#66ff00",
      cardBg:    "#121c30",
      inputBg:   "#0f1628",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: Y2KShowcase,
};
