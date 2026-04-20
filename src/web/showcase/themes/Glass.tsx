import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  /* ── GOOGLE FONT IMPORT ─────────────────────────────────────── */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  /* ── CSS VARIABLES ──────────────────────────────────────────── */
  [data-theme="glass"] {
    --bg: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    --sidebar-bg: rgba(255, 255, 255, 0.06);
    --border: rgba(255, 255, 255, 0.15);
    --text: #f0e9ff;
    --text-muted: rgba(255, 255, 255, 0.52);
    --accent: #a78bfa;
    --accent-2: #60a5fa;
    --card-bg: rgba(255, 255, 255, 0.08);
    --input-bg: rgba(255, 255, 255, 0.07);
    --font-body: 'Inter', system-ui, -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    --radius: 16px;

    /* Glass depth layers */
    --glass-deep:    rgba(255, 255, 255, 0.04);
    --glass-mid:     rgba(255, 255, 255, 0.10);
    --glass-surface: rgba(255, 255, 255, 0.18);

    /* Blur per layer */
    --blur-deep:    blur(12px) saturate(160%);
    --blur-mid:     blur(20px) saturate(180%);
    --blur-surface: blur(28px) saturate(200%);
  }

  /* ── KEYFRAMES ──────────────────────────────────────────────── */

  @keyframes g-orb-drift-1 {
    0%   { transform: translate(0px,   0px)   scale(1);    }
    25%  { transform: translate(60px,  -40px) scale(1.08); }
    50%  { transform: translate(30px,  70px)  scale(0.95); }
    75%  { transform: translate(-50px, 30px)  scale(1.05); }
    100% { transform: translate(0px,   0px)   scale(1);    }
  }

  @keyframes g-orb-drift-2 {
    0%   { transform: translate(0px,   0px)   scale(1);    }
    33%  { transform: translate(-80px, 60px)  scale(1.1);  }
    66%  { transform: translate(50px,  -50px) scale(0.92); }
    100% { transform: translate(0px,   0px)   scale(1);    }
  }

  @keyframes g-orb-drift-3 {
    0%   { transform: translate(0px, 0px)    scale(1);    }
    40%  { transform: translate(40px, 80px)  scale(1.12); }
    80%  { transform: translate(-30px, -40px) scale(0.9); }
    100% { transform: translate(0px, 0px)    scale(1);    }
  }

  @keyframes g-orb-drift-4 {
    0%   { transform: translate(0px, 0px)   scale(1);    }
    50%  { transform: translate(70px, -60px) scale(1.06); }
    100% { transform: translate(0px, 0px)   scale(1);    }
  }

  @keyframes g-pulse-glow {
    0%, 100% { opacity: 0.6; }
    50%       { opacity: 1;   }
  }

  @keyframes g-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  @keyframes g-float {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-6px); }
  }

  @keyframes g-spin-slow {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }

  /* ── FIXED COSMIC BACKGROUND + ANIMATED ORBS ───────────────── */

  [data-theme="glass"] .main-panel {
    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%) !important;
    background-attachment: fixed !important;
    position: relative;
    isolation: isolate;
  }

  /* Four animated ambient orbs */
  [data-theme="glass"] .main-panel::before,
  [data-theme="glass"] .main-panel::after {
    content: '';
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  [data-theme="glass"] .main-panel::before {
    top: -15%;
    left: 15%;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, transparent 70%);
    animation: g-orb-drift-1 22s ease-in-out infinite;
  }

  [data-theme="glass"] .main-panel::after {
    bottom: -10%;
    right: 5%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(96, 165, 250, 0.14) 0%, transparent 70%);
    animation: g-orb-drift-2 28s ease-in-out infinite;
  }

  /* Extra orbs via injected pseudo elements on the showcase wrapper */
  [data-theme="glass"] .g-bg-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
  }

  [data-theme="glass"] .g-bg-orb-3 {
    top: 40%;
    left: -8%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.10) 0%, transparent 70%);
    animation: g-orb-drift-3 24s ease-in-out infinite;
  }

  [data-theme="glass"] .g-bg-orb-4 {
    top: 20%;
    right: 20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(52, 211, 153, 0.07) 0%, transparent 70%);
    animation: g-orb-drift-4 30s ease-in-out infinite;
  }

  /* ── SIDEBAR ────────────────────────────────────────────────── */

  [data-theme="glass"] .sidebar {
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: var(--blur-mid) !important;
    -webkit-backdrop-filter: var(--blur-mid) !important;
    border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
    box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.04), 4px 0 24px rgba(0,0,0,0.2);
  }

  [data-theme="glass"] .sidebar-item.active {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.38), rgba(96, 165, 250, 0.28)) !important;
    color: #ffffff !important;
    box-shadow: 0 0 20px rgba(167, 139, 250, 0.28), inset 0 1px 0 rgba(255,255,255,0.18);
    border-radius: 10px;
    margin: 0 8px;
    width: calc(100% - 16px);
    padding-left: 12px;
  }

  [data-theme="glass"] .sidebar-item:hover:not(.active) {
    background: rgba(255, 255, 255, 0.07) !important;
    border-radius: 10px;
    margin: 0 8px;
    width: calc(100% - 16px);
    padding-left: 12px;
    transition: background 0.18s ease;
  }

  /* ── SHOWCASE WRAPPER ───────────────────────────────────────── */

  [data-theme="glass"] .g-showcase {
    position: relative;
    z-index: 1;
    max-width: 920px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-bottom: 80px;
    font-family: var(--font-body);
  }

  /* ── GLASS PANEL BASE ───────────────────────────────────────── */

  [data-theme="glass"] .g-panel {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: var(--blur-mid);
    -webkit-backdrop-filter: var(--blur-mid);
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: var(--radius);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.32),
      inset 0 1px 0 rgba(255, 255, 255, 0.16),
      inset 0 -1px 0 rgba(0, 0, 0, 0.08);
  }

  /* Glass depth variants */
  [data-theme="glass"] .g-panel-deep {
    background: var(--glass-deep);
    backdrop-filter: var(--blur-deep);
    -webkit-backdrop-filter: var(--blur-deep);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: var(--radius);
    box-shadow: 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06);
  }

  [data-theme="glass"] .g-panel-surface {
    background: var(--glass-surface);
    backdrop-filter: var(--blur-surface);
    -webkit-backdrop-filter: var(--blur-surface);
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: var(--radius);
    box-shadow:
      0 12px 40px rgba(0,0,0,0.3),
      inset 0 2px 0 rgba(255,255,255,0.3),
      inset 0 -1px 0 rgba(0,0,0,0.06);
  }

  /* ── SECTION LABEL ──────────────────────────────────────────── */

  [data-theme="glass"] .g-section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  [data-theme="glass"] .g-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(167,139,250,0.45), transparent);
  }

  /* ── GLOW DIVIDER ───────────────────────────────────────────── */

  [data-theme="glass"] .g-glow-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.55), rgba(96,165,250,0.55), transparent);
    margin: 0;
    box-shadow: 0 0 10px rgba(167,139,250,0.35);
  }

  /* ═══════════════════════════════════════════════════════════════
     HEADER
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-header {
    padding: 52px 52px 44px;
    position: relative;
    overflow: hidden;
  }

  /* Decorative spinning ring */
  [data-theme="glass"] .g-header::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    border: 1px solid rgba(167,139,250,0.15);
    pointer-events: none;
    animation: g-spin-slow 40s linear infinite;
  }

  [data-theme="glass"] .g-header::after {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 1px solid rgba(96,165,250,0.1);
    pointer-events: none;
    animation: g-spin-slow 28s linear infinite reverse;
  }

  [data-theme="glass"] .g-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 16px;
    background: linear-gradient(135deg, rgba(167,139,250,0.22), rgba(96,165,250,0.22));
    border: 1px solid rgba(167,139,250,0.45);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    color: #c4b5fd;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 20px;
    animation: g-pulse-glow 4s ease-in-out infinite;
  }

  [data-theme="glass"] .g-header-badge::before {
    content: '✦';
    font-size: 9px;
    animation: g-spin-slow 6s linear infinite;
    display: inline-block;
  }

  /* Hero gradient heading */
  [data-theme="glass"] .g-hero-heading {
    font-size: 56px;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.04em;
    background: linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #93c5fd 70%, #f9a8d4 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 16px;
    animation: g-shimmer 6s linear infinite;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 32px rgba(167,139,250,0.35));
  }

  [data-theme="glass"] .g-hero-sub {
    font-size: 17px;
    color: rgba(255,255,255,0.58);
    line-height: 1.65;
    max-width: 500px;
    position: relative;
    z-index: 1;
    margin-bottom: 28px;
  }

  /* Hero stat number */
  [data-theme="glass"] .g-hero-stats {
    display: flex;
    gap: 32px;
    position: relative;
    z-index: 1;
  }

  [data-theme="glass"] .g-hero-stat {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  [data-theme="glass"] .g-hero-stat-number {
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    background: linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #60a5fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    filter: drop-shadow(0 0 16px rgba(167,139,250,0.5));
  }

  [data-theme="glass"] .g-hero-stat-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.42);
  }

  /* ═══════════════════════════════════════════════════════════════
     TYPOGRAPHY
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-typo-section {
    padding: 44px;
  }

  [data-theme="glass"] .g-h1 {
    font-size: 38px;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.03em;
    background: linear-gradient(120deg, #ffffff 0%, #ddd6fe 60%, #bfdbfe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
  }

  [data-theme="glass"] .g-h2 {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.22;
    letter-spacing: -0.02em;
    color: #ede9fe;
    margin-bottom: 8px;
  }

  [data-theme="glass"] .g-h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: #ddd6fe;
    margin-bottom: 12px;
  }

  [data-theme="glass"] .g-body {
    font-size: 15px;
    line-height: 1.65;
    color: rgba(255,255,255,0.72);
    margin-bottom: 10px;
  }

  [data-theme="glass"] .g-muted {
    font-size: 13px;
    line-height: 1.55;
    color: rgba(255,255,255,0.42);
    margin-bottom: 12px;
  }

  [data-theme="glass"] .g-code {
    font-family: var(--font-mono);
    font-size: 13px;
    background: rgba(167,139,250,0.14);
    border: 1px solid rgba(167,139,250,0.28);
    color: #c4b5fd;
    padding: 2px 8px;
    border-radius: 6px;
  }

  [data-theme="glass"] .g-typo-stack {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* ═══════════════════════════════════════════════════════════════
     BUTTONS — gradient border + glow hover
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-btn-section {
    padding: 44px;
  }

  [data-theme="glass"] .g-btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  [data-theme="glass"] .g-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;
    border: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  /* Specular highlight strip */
  [data-theme="glass"] .g-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 44%;
    background: rgba(255,255,255,0.07);
    pointer-events: none;
  }

  /* ── Primary ── */
  [data-theme="glass"] .g-btn-primary {
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    color: #ffffff;
    box-shadow:
      0 4px 16px rgba(124,58,237,0.45),
      0 0 0 1px rgba(167,139,250,0.25),
      inset 0 1px 0 rgba(255,255,255,0.18);
  }

  [data-theme="glass"] .g-btn-primary:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow:
      0 8px 28px rgba(124,58,237,0.65),
      0 0 0 1px rgba(167,139,250,0.5),
      0 0 40px rgba(167,139,250,0.25),
      inset 0 1px 0 rgba(255,255,255,0.22);
  }

  [data-theme="glass"] .g-btn-primary:active {
    transform: translateY(0) scale(0.99);
  }

  /* ── Secondary ── */
  [data-theme="glass"] .g-btn-secondary {
    background: rgba(255,255,255,0.06);
    color: #f0e9ff;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(167,139,250,0.3);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
  }

  [data-theme="glass"] .g-btn-secondary:hover {
    background: rgba(167,139,250,0.1);
    transform: translateY(-1px);
    box-shadow:
      0 6px 20px rgba(0,0,0,0.22),
      inset 0 1px 0 rgba(255,255,255,0.14),
      0 0 24px rgba(167,139,250,0.18);
  }

  /* ── Danger ── */
  [data-theme="glass"] .g-btn-danger {
    background: linear-gradient(135deg, rgba(220,38,38,0.65), rgba(185,28,28,0.65));
    color: #fecaca;
    border: 1px solid rgba(248,165,165,0.28);
    box-shadow: 0 4px 16px rgba(220,38,38,0.28), inset 0 1px 0 rgba(255,255,255,0.12);
  }

  [data-theme="glass"] .g-btn-danger:hover {
    background: linear-gradient(135deg, rgba(220,38,38,0.85), rgba(185,28,28,0.85));
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(220,38,38,0.48), 0 0 20px rgba(248,113,113,0.2);
  }

  /* ── Ghost / icon ── */
  [data-theme="glass"] .g-btn-ghost {
    background: transparent;
    color: #a78bfa;
    border: 1px solid rgba(167,139,250,0.2);
  }
  [data-theme="glass"] .g-btn-ghost:hover {
    background: rgba(167,139,250,0.12);
    color: #c4b5fd;
    transform: translateY(-1px);
  }

  [data-theme="glass"] .g-btn-icon {
    padding: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13);
    color: #a78bfa;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.09);
  }

  [data-theme="glass"] .g-btn-icon:hover {
    background: rgba(167,139,250,0.14);
    border-color: rgba(167,139,250,0.4);
    color: #c4b5fd;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(167,139,250,0.22);
  }

  /* ═══════════════════════════════════════════════════════════════
     INPUTS
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-input-section {
    padding: 44px;
  }

  [data-theme="glass"] .g-input-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  [data-theme="glass"] .g-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  [data-theme="glass"] .g-field-full {
    grid-column: 1 / -1;
  }

  [data-theme="glass"] .g-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.48);
  }

  [data-theme="glass"] .g-input,
  [data-theme="glass"] .g-textarea,
  [data-theme="glass"] .g-select {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 14px;
    font-family: var(--font-body);
    color: #f0e9ff;
    backdrop-filter: blur(8px);
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    outline: none;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
  }

  [data-theme="glass"] .g-input::placeholder,
  [data-theme="glass"] .g-textarea::placeholder {
    color: rgba(255,255,255,0.26);
  }

  [data-theme="glass"] .g-input:focus,
  [data-theme="glass"] .g-textarea:focus,
  [data-theme="glass"] .g-select:focus {
    border-color: rgba(167,139,250,0.65);
    background: rgba(167,139,250,0.08);
    box-shadow:
      0 0 0 3px rgba(167,139,250,0.18),
      inset 0 1px 0 rgba(255,255,255,0.1);
  }

  [data-theme="glass"] .g-textarea {
    resize: vertical;
    min-height: 88px;
    line-height: 1.6;
  }

  [data-theme="glass"] .g-select {
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 12 12'%3E%3Cpath stroke='rgba(255,255,255,0.45)' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m2 4 4 4 4-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }

  [data-theme="glass"] .g-select option {
    background: #24243e;
    color: #f0e9ff;
  }

  /* ═══════════════════════════════════════════════════════════════
     CARDS — hover scale + glow
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-cards-section {
    padding: 44px;
  }

  [data-theme="glass"] .g-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  [data-theme="glass"] .g-card {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--radius);
    padding: 26px;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 8px 32px rgba(0,0,0,0.28),
      inset 0 1px 0 rgba(255,255,255,0.15);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  [data-theme="glass"] .g-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow:
      0 20px 50px rgba(0,0,0,0.38),
      0 0 30px rgba(167,139,250,0.14),
      inset 0 1px 0 rgba(255,255,255,0.2);
  }

  /* Shimmer top edge */
  [data-theme="glass"] .g-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%);
  }

  [data-theme="glass"] .g-stat-value {
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    background: linear-gradient(135deg, #ffffff 0%, #c4b5fd 60%, #93c5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 6px;
    filter: drop-shadow(0 0 12px rgba(167,139,250,0.4));
  }

  [data-theme="glass"] .g-stat-label {
    font-size: 11px;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
  }

  [data-theme="glass"] .g-stat-trend {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #34d399;
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.22);
    padding: 3px 10px;
    border-radius: 999px;
  }

  [data-theme="glass"] .g-card-icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(167,139,250,0.28), rgba(96,165,250,0.28));
    border: 1px solid rgba(167,139,250,0.28);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 18px;
    box-shadow: 0 4px 16px rgba(167,139,250,0.18);
    animation: g-float 5s ease-in-out infinite;
  }

  [data-theme="glass"] .g-card-title {
    font-size: 15px;
    font-weight: 700;
    color: #f0e9ff;
    margin-bottom: 6px;
  }

  [data-theme="glass"] .g-card-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.48);
    line-height: 1.6;
  }

  [data-theme="glass"] .g-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c3aed, #4f46e5, #2563eb);
    border: 2px solid rgba(167,139,250,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 14px;
    box-shadow: 0 4px 16px rgba(124,58,237,0.4), 0 0 0 4px rgba(167,139,250,0.1);
  }

  [data-theme="glass"] .g-profile-name {
    font-size: 15px;
    font-weight: 700;
    color: #f0e9ff;
    margin-bottom: 3px;
  }

  [data-theme="glass"] .g-profile-role {
    font-size: 12px;
    color: rgba(255,255,255,0.42);
    margin-bottom: 14px;
  }

  [data-theme="glass"] .g-profile-stat {
    display: flex;
    justify-content: space-between;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  [data-theme="glass"] .g-profile-stat-item {
    text-align: center;
  }

  [data-theme="glass"] .g-profile-stat-value {
    font-size: 17px;
    font-weight: 800;
    color: #c4b5fd;
  }

  [data-theme="glass"] .g-profile-stat-key {
    font-size: 10px;
    color: rgba(255,255,255,0.36);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }

  /* ═══════════════════════════════════════════════════════════════
     BADGES
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-badges-section {
    padding: 44px;
  }

  [data-theme="glass"] .g-badges-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  [data-theme="glass"] .g-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 13px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.03em;
    border: 1px solid transparent;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  [data-theme="glass"] .g-badge:hover {
    transform: translateY(-1px);
  }

  [data-theme="glass"] .g-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  [data-theme="glass"] .g-badge-purple {
    background: rgba(167,139,250,0.16);
    border-color: rgba(167,139,250,0.38);
    color: #c4b5fd;
  }
  [data-theme="glass"] .g-badge-blue {
    background: rgba(96,165,250,0.16);
    border-color: rgba(96,165,250,0.38);
    color: #93c5fd;
  }
  [data-theme="glass"] .g-badge-green {
    background: rgba(52,211,153,0.13);
    border-color: rgba(52,211,153,0.32);
    color: #6ee7b7;
  }
  [data-theme="glass"] .g-badge-rose {
    background: rgba(251,113,133,0.13);
    border-color: rgba(251,113,133,0.32);
    color: #fda4af;
  }
  [data-theme="glass"] .g-badge-amber {
    background: rgba(251,191,36,0.13);
    border-color: rgba(251,191,36,0.32);
    color: #fcd34d;
  }

  /* ═══════════════════════════════════════════════════════════════
     TABLE — alternating glass opacity rows
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-table-section {
    padding: 44px;
    overflow: hidden;
  }

  [data-theme="glass"] .g-table-wrap {
    overflow-x: auto;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(12px);
  }

  [data-theme="glass"] .g-table {
    width: 100%;
    border-collapse: collapse;
  }

  /* Header — more opaque glass */
  [data-theme="glass"] .g-table thead {
    background: rgba(167,139,250,0.18);
    border-bottom: 1px solid rgba(255,255,255,0.14);
  }

  [data-theme="glass"] .g-table th {
    padding: 13px 18px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.52);
    text-align: left;
    white-space: nowrap;
  }

  /* Even rows — slightly more visible */
  [data-theme="glass"] .g-table tbody tr:nth-child(even) td {
    background: rgba(255,255,255,0.025);
  }

  /* Odd rows — deep glass */
  [data-theme="glass"] .g-table tbody tr:nth-child(odd) td {
    background: transparent;
  }

  [data-theme="glass"] .g-table td {
    padding: 14px 18px;
    font-size: 13px;
    color: rgba(255,255,255,0.78);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: background 0.15s ease;
  }

  [data-theme="glass"] .g-table tbody tr:hover td {
    background: rgba(167,139,250,0.07) !important;
  }

  [data-theme="glass"] .g-table tbody tr:last-child td {
    border-bottom: none;
  }

  [data-theme="glass"] .g-table-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
  }

  [data-theme="glass"] .g-table-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ═══════════════════════════════════════════════════════════════
     PROGRESS BARS
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-progress-section {
    padding: 44px;
  }

  [data-theme="glass"] .g-progress-stack {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  [data-theme="glass"] .g-progress-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  [data-theme="glass"] .g-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  [data-theme="glass"] .g-progress-label {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.72);
  }

  [data-theme="glass"] .g-progress-value {
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,0.45);
    font-family: var(--font-mono);
  }

  [data-theme="glass"] .g-progress-track {
    height: 8px;
    background: rgba(255,255,255,0.07);
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.09);
    overflow: hidden;
    position: relative;
  }

  [data-theme="glass"] .g-progress-fill {
    height: 100%;
    border-radius: 999px;
    position: relative;
  }

  [data-theme="glass"] .g-progress-fill::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 5px;
    height: 100%;
    background: rgba(255,255,255,0.65);
    border-radius: 999px;
    filter: blur(2px);
  }

  [data-theme="glass"] .g-progress-purple {
    background: linear-gradient(90deg, #7c3aed, #a78bfa);
    box-shadow: 0 0 14px rgba(167,139,250,0.65), 0 0 28px rgba(124,58,237,0.3);
  }
  [data-theme="glass"] .g-progress-blue {
    background: linear-gradient(90deg, #2563eb, #60a5fa);
    box-shadow: 0 0 14px rgba(96,165,250,0.65), 0 0 28px rgba(37,99,235,0.3);
  }
  [data-theme="glass"] .g-progress-mixed {
    background: linear-gradient(90deg, #7c3aed, #4f46e5, #2563eb, #60a5fa);
    box-shadow: 0 0 14px rgba(96,165,250,0.55), 0 0 28px rgba(124,58,237,0.3);
  }

  /* ═══════════════════════════════════════════════════════════════
     DEPTH SECTION
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-depth-section {
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  [data-theme="glass"] .g-depth-bg {
    padding: 52px;
    position: relative;
    background:
      radial-gradient(ellipse at 18% 55%, rgba(167,139,250,0.22) 0%, transparent 58%),
      radial-gradient(ellipse at 82% 45%, rgba(96,165,250,0.18) 0%, transparent 58%);
  }

  [data-theme="glass"] .g-depth-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(44px);
    pointer-events: none;
  }

  [data-theme="glass"] .g-depth-orb-1 {
    top: -50px; left: 30px;
    width: 200px; height: 200px;
    background: rgba(167,139,250,0.32);
    animation: g-orb-drift-1 16s ease-in-out infinite;
  }

  [data-theme="glass"] .g-depth-orb-2 {
    bottom: -50px; right: 50px;
    width: 220px; height: 220px;
    background: rgba(96,165,250,0.26);
    animation: g-orb-drift-2 20s ease-in-out infinite;
  }

  [data-theme="glass"] .g-depth-orb-3 {
    top: 50%; left: 48%;
    width: 140px; height: 140px;
    background: rgba(236,72,153,0.18);
    transform: translate(-50%, -50%);
    animation: g-orb-drift-3 18s ease-in-out infinite;
  }

  [data-theme="glass"] .g-depth-headline {
    font-size: 24px;
    font-weight: 800;
    color: #f0e9ff;
    line-height: 1.2;
    letter-spacing: -0.025em;
    margin-bottom: 8px;
    position: relative;
    z-index: 1;
  }

  [data-theme="glass"] .g-depth-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    position: relative;
    z-index: 1;
    line-height: 1.55;
    max-width: 500px;
    margin-bottom: 28px;
  }

  [data-theme="glass"] .g-depth-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    position: relative;
    z-index: 1;
  }

  [data-theme="glass"] .g-depth-card {
    padding: 26px;
    border-radius: 14px;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  [data-theme="glass"] .g-depth-card:hover {
    transform: scale(1.03) translateY(-3px);
  }

  [data-theme="glass"] .g-depth-card-deep {
    z-index: 1;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(8px) saturate(150%);
    -webkit-backdrop-filter: blur(8px) saturate(150%);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }

  [data-theme="glass"] .g-depth-card-deep:hover {
    box-shadow: 0 12px 36px rgba(0,0,0,0.3), 0 0 20px rgba(167,139,250,0.08);
  }

  [data-theme="glass"] .g-depth-card-mid {
    z-index: 2;
    background: rgba(167,139,250,0.10);
    backdrop-filter: blur(14px) saturate(170%);
    -webkit-backdrop-filter: blur(14px) saturate(170%);
    border: 1px solid rgba(167,139,250,0.22);
    box-shadow: 0 8px 28px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.12);
  }

  [data-theme="glass"] .g-depth-card-mid:hover {
    box-shadow: 0 16px 44px rgba(0,0,0,0.35), 0 0 28px rgba(167,139,250,0.18);
  }

  [data-theme="glass"] .g-depth-card-surface {
    z-index: 3;
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(22px) saturate(200%);
    -webkit-backdrop-filter: blur(22px) saturate(200%);
    border: 1px solid rgba(255,255,255,0.32);
    box-shadow:
      0 12px 40px rgba(0,0,0,0.3),
      inset 0 2px 0 rgba(255,255,255,0.28),
      inset 0 -1px 0 rgba(0,0,0,0.05);
  }

  [data-theme="glass"] .g-depth-card-surface:hover {
    box-shadow:
      0 20px 56px rgba(0,0,0,0.38),
      0 0 32px rgba(255,255,255,0.1),
      inset 0 2px 0 rgba(255,255,255,0.3);
  }

  [data-theme="glass"] .g-depth-card-tag {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  [data-theme="glass"] .g-depth-card-value {
    font-size: 30px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #93c5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 8px rgba(167,139,250,0.4));
  }

  [data-theme="glass"] .g-depth-card-desc {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    margin-top: 10px;
    line-height: 1.55;
  }

  /* ═══════════════════════════════════════════════════════════════
     NOTIFICATION PANEL
  ═══════════════════════════════════════════════════════════════ */

  [data-theme="glass"] .g-notif-section {
    padding: 44px;
  }

  [data-theme="glass"] .g-notif-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
  }

  [data-theme="glass"] .g-notif-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.18s ease;
    position: relative;
  }

  [data-theme="glass"] .g-notif-item:last-child {
    border-bottom: none;
  }

  [data-theme="glass"] .g-notif-item:hover {
    background: rgba(167,139,250,0.06);
  }

  /* Unread indicator */
  [data-theme="glass"] .g-notif-item.unread::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, #a78bfa, #60a5fa);
    border-radius: 0 2px 2px 0;
  }

  [data-theme="glass"] .g-notif-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    border: 1px solid transparent;
  }
  [data-theme="glass"] .g-notif-icon-purple {
    background: rgba(167,139,250,0.18);
    border-color: rgba(167,139,250,0.28);
  }
  [data-theme="glass"] .g-notif-icon-green {
    background: rgba(52,211,153,0.15);
    border-color: rgba(52,211,153,0.25);
  }
  [data-theme="glass"] .g-notif-icon-blue {
    background: rgba(96,165,250,0.15);
    border-color: rgba(96,165,250,0.25);
  }
  [data-theme="glass"] .g-notif-icon-rose {
    background: rgba(251,113,133,0.15);
    border-color: rgba(251,113,133,0.25);
  }

  [data-theme="glass"] .g-notif-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  [data-theme="glass"] .g-notif-title {
    font-size: 13px;
    font-weight: 700;
    color: #f0e9ff;
    line-height: 1.3;
  }

  [data-theme="glass"] .g-notif-text {
    font-size: 12px;
    color: rgba(255,255,255,0.46);
    line-height: 1.45;
  }

  [data-theme="glass"] .g-notif-time {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    align-self: flex-start;
    padding-top: 2px;
  }

  [data-theme="glass"] .g-notif-unread-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #a78bfa;
    box-shadow: 0 0 6px rgba(167,139,250,0.6);
    flex-shrink: 0;
    align-self: center;
    margin-left: 4px;
  }

  /* ── DARK MODE (deeper, denser glass) ── */
  [data-theme="glass"][data-mode="dark"] {
    --bg: linear-gradient(135deg, #05030f 0%, #120e2a 50%, #0a0a1e 100%);
    --sidebar-bg: rgba(255,255,255,0.03);
    --border: rgba(255,255,255,0.08);
    --text: #e0d9ff;
    --text-muted: rgba(255,255,255,0.35);
    --card-bg: rgba(255,255,255,0.04);
    --input-bg: rgba(255,255,255,0.04);
  }
  [data-theme="glass"][data-mode="dark"] .main-panel {
    background: linear-gradient(135deg, #05030f 0%, #120e2a 50%, #0a0a1e 100%) !important;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const GlassShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
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

  const sparkHeights = [18, 24, 14, 28, 20, 32, 16, 26, 22, 30, 18, 28];

  return (
    <div style={{
      ...customStyle,
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      color: "#f0e9ff",
      minHeight: "100%",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      position: "relative",
    }}>
      {/* Ambient orbs */}
      <div className="g-bg-orb g-bg-orb-3" />
      <div className="g-bg-orb g-bg-orb-4" />

      <div className="g-showcase" style={{ position: "relative", zIndex: 1, maxWidth: "920px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px", padding: "32px 40px 80px" }}>

        {/* ── HERO PANEL ── */}
        <div className="g-panel g-header" style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.13)",
          borderRadius: "16px",
          padding: "52px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.16)",
        }}>
          <div className="g-header-badge" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "5px 16px",
            background: "linear-gradient(135deg, rgba(167,139,250,0.22), rgba(96,165,250,0.22))",
            border: "1px solid rgba(167,139,250,0.45)",
            borderRadius: "999px",
            fontSize: "11px", fontWeight: 700, color: "#c4b5fd",
            letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            🔮 Glassmorphism · v3.0
          </div>
          <h1 className="g-hero-heading" style={{
            fontSize: "56px", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #93c5fd 70%, #f9a8d4 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: "16px",
            filter: "drop-shadow(0 0 32px rgba(167,139,250,0.35))",
          }}>
            Cosmic Dashboard
          </h1>
          <p className="g-hero-sub" style={{ fontSize: "17px", color: "rgba(255,255,255,0.58)", lineHeight: 1.65, maxWidth: "500px", marginBottom: "28px" }}>
            Frosted glass surfaces, animated ambient orbs, and deep cosmic gradients — a SaaS dashboard that lives in the stars.
          </p>
          <div className="g-hero-stats" style={{ display: "flex", gap: "32px" }}>
            {[
              { n: "98.7%", lbl: "Uptime" },
              { n: "4.2ms", lbl: "Latency" },
              { n: "2.4M",  lbl: "Events/s" },
            ].map(({ n, lbl }) => (
              <div key={lbl} className="g-hero-stat" style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span className="g-hero-stat-number" style={{
                  fontSize: "36px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  filter: "drop-shadow(0 0 16px rgba(167,139,250,0.5))",
                }}>{n}</span>
                <span className="g-hero-stat-label" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)" }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div>
          <div className="g-section-label" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#a78bfa", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            Live Metrics
          </div>
          <div className="g-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
            {[
              { icon: "📊", stat: "142k", label: "Active Users", trend: "+12.4%", trendUp: true },
              { icon: "💰", stat: "$84.2k", label: "MRR",         trend: "+8.1%",  trendUp: true },
              { icon: "⚡", stat: "99.9%", label: "Availability",  trend: "stable", trendUp: true },
            ].map(({ icon, stat, label, trend, trendUp }) => (
              <div key={label} className="g-card" style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "16px",
                padding: "26px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}>
                <div className="g-card-icon" style={{
                  width: "46px", height: "46px", borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(167,139,250,0.28), rgba(96,165,250,0.28))",
                  border: "1px solid rgba(167,139,250,0.28)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                  marginBottom: "18px", boxShadow: "0 4px 16px rgba(167,139,250,0.18)",
                }}>{icon}</div>
                <div className="g-stat-value" style={{
                  fontSize: "36px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 60%, #93c5fd 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  marginBottom: "6px", filter: "drop-shadow(0 0 12px rgba(167,139,250,0.4))",
                }}>{stat}</div>
                <div className="g-stat-label" style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{label}</div>
                <div className="g-stat-trend" style={{
                  display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "10px",
                  fontSize: "12px", fontWeight: 700, color: "#34d399",
                  background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.22)",
                  padding: "3px 10px", borderRadius: "999px",
                }}>↑ {trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CHART + TEAM ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px" }}>
          {/* Fake bar chart */}
          <div className="g-panel" style={{
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.13)", borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 className="g-h3" style={{ fontSize: "16px", fontWeight: 700, color: "#ddd6fe", margin: 0 }}>Weekly Traffic</h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0" }}>Requests per day</p>
              </div>
              <div className="g-badge g-badge-purple" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "5px 13px", borderRadius: "999px",
                fontSize: "12px", fontWeight: 700,
                background: "rgba(167,139,250,0.16)", border: "1px solid rgba(167,139,250,0.38)", color: "#c4b5fd",
              }}>
                <span className="g-badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor" }} />
                Live
              </div>
            </div>
            {/* Bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "100px" }}>
              {[62, 88, 45, 92, 74, 55, 98].map((h, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                  <div style={{
                    width: "100%",
                    height: `${h}%`,
                    borderRadius: "4px 4px 0 0",
                    background: i === 6
                      ? "linear-gradient(180deg, #a78bfa, #7c3aed)"
                      : "rgba(167,139,250,0.22)",
                    border: "1px solid rgba(167,139,250,0.28)",
                    boxShadow: i === 6 ? "0 0 16px rgba(167,139,250,0.5)" : "none",
                    alignSelf: "flex-end",
                    transition: "height 0.3s ease",
                  }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                <div key={d} style={{ flex: 1, textAlign: "center", fontSize: "10px", color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.04em" }}>{d}</div>
              ))}
            </div>
          </div>

          {/* Team list */}
          <div className="g-panel" style={{
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.13)", borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#ddd6fe", marginBottom: "20px" }}>Team Online</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { initials: "AL", name: "Alex L.", role: "Designer",    grad: "linear-gradient(135deg,#a78bfa,#60a5fa)", online: true },
                { initials: "MK", name: "Maya K.", role: "Engineer",    grad: "linear-gradient(135deg,#f9a8d4,#a78bfa)", online: true },
                { initials: "SR", name: "Sam R.",  role: "PM",          grad: "linear-gradient(135deg,#60a5fa,#34d399)", online: false },
                { initials: "JW", name: "Jan W.",  role: "DevOps",      grad: "linear-gradient(135deg,#fcd34d,#f97316)", online: true },
              ].map(({ initials, name, role, grad, online }) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: grad,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 800, color: "#fff",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    position: "relative",
                  }}>
                    {initials}
                    <div style={{
                      position: "absolute", bottom: "0", right: "0",
                      width: "10px", height: "10px", borderRadius: "50%",
                      background: online ? "#34d399" : "rgba(255,255,255,0.2)",
                      border: "2px solid rgba(15,12,41,0.8)",
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#f0e9ff" }}>{name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{role}</div>
                  </div>
                  <div style={{
                    fontSize: "10px", fontWeight: 700,
                    color: online ? "#34d399" : "rgba(255,255,255,0.3)",
                    textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                    {online ? "●" : "○"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── GLASS DEPTH DEMO ── */}
        <div className="g-panel g-depth-section" style={{
          background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.13)", borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.16)",
        }}>
          <div className="g-depth-bg" style={{
            padding: "44px",
            background: "radial-gradient(ellipse at 18% 55%, rgba(167,139,250,0.22) 0%, transparent 58%), radial-gradient(ellipse at 82% 45%, rgba(96,165,250,0.18) 0%, transparent 58%)",
            position: "relative",
          }}>
            <div className="g-depth-orb g-depth-orb-1" style={{ position: "absolute", top: "-50px", left: "30px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(167,139,250,0.32)", filter: "blur(44px)", pointerEvents: "none" }} />
            <div className="g-depth-orb g-depth-orb-2" style={{ position: "absolute", bottom: "-50px", right: "50px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(96,165,250,0.26)", filter: "blur(44px)", pointerEvents: "none" }} />
            <h3 className="g-depth-headline" style={{ fontSize: "20px", fontWeight: 800, color: "#f0e9ff", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "8px", position: "relative", zIndex: 1 }}>
              Three Layers of Glass
            </h3>
            <p className="g-depth-sub" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", position: "relative", zIndex: 1, lineHeight: 1.55, maxWidth: "500px", marginBottom: "24px" }}>
              Deep (4%) · Mid (10%) · Surface (18%) — each layer adds more blur and opacity.
            </p>
            <div className="g-depth-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", position: "relative", zIndex: 1 }}>
              {[
                { tag: "Deep", cls: "g-depth-card-deep", val: "4%",  desc: "Subtle, minimal presence. Background shows through strongly.", border: "rgba(255,255,255,0.08)", bg: "rgba(255,255,255,0.04)" },
                { tag: "Mid",  cls: "g-depth-card-mid",  val: "10%", desc: "Balanced frosted glass. Primary card surface layer.", border: "rgba(167,139,250,0.22)", bg: "rgba(167,139,250,0.10)" },
                { tag: "Surface", cls: "g-depth-card-surface", val: "18%", desc: "Prominent, highly frosted. Modals and highlights.", border: "rgba(255,255,255,0.32)", bg: "rgba(255,255,255,0.18)" },
              ].map(({ tag, val, desc, border: b, bg }) => (
                <div key={tag} className={`g-depth-card ${tag}`} style={{
                  padding: "26px", borderRadius: "14px", position: "relative", overflow: "hidden",
                  background: bg, backdropFilter: "blur(14px) saturate(170%)", WebkitBackdropFilter: "blur(14px) saturate(170%)",
                  border: `1px solid ${b}`,
                  boxShadow: "0 8px 28px rgba(0,0,0,0.26)",
                }}>
                  <div className="g-depth-card-tag" style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>{tag}</div>
                  <div className="g-depth-card-value" style={{
                    fontSize: "30px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #93c5fd 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    filter: "drop-shadow(0 0 8px rgba(167,139,250,0.4))",
                  }}>{val}</div>
                  <div className="g-depth-card-desc" style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "10px", lineHeight: 1.55 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SIDEBAR NAV WIDGET ── */}
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "20px" }}>
          <div className="g-panel" style={{
            background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px) saturate(160%)",
            WebkitBackdropFilter: "blur(12px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            display: "flex", flexDirection: "column", gap: "4px",
          }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", padding: "8px 12px 4px" }}>Navigation</div>
            {[
              { icon: "📊", label: "Dashboard", active: true },
              { icon: "📈", label: "Analytics", active: false },
              { icon: "👥", label: "Team",       active: false },
              { icon: "⚙️", label: "Settings",   active: false },
              { icon: "🔔", label: "Alerts",     active: false, badge: "3" },
            ].map(({ icon, label, active, badge }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "8px",
                background: active ? "linear-gradient(135deg, rgba(167,139,250,0.38), rgba(96,165,250,0.28))" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                fontSize: "13px", fontWeight: active ? 600 : 400,
                cursor: "pointer",
                boxShadow: active ? "0 0 20px rgba(167,139,250,0.28), inset 0 1px 0 rgba(255,255,255,0.18)" : "none",
              }}>
                <span style={{ fontSize: "15px" }}>{icon}</span>
                <span style={{ flex: 1 }}>{label}</span>
                {badge && (
                  <span style={{
                    fontSize: "10px", fontWeight: 700,
                    background: "#a78bfa", color: "#fff",
                    padding: "2px 7px", borderRadius: "999px",
                  }}>{badge}</span>
                )}
              </div>
            ))}
          </div>

          {/* Notification list */}
          <div className="g-panel" style={{
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.13)", borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}>
            <div style={{ padding: "20px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#ddd6fe" }}>Recent Activity</div>
            </div>
            <div className="g-notif-list" style={{ display: "flex", flexDirection: "column" }}>
              {[
                { icon: "✅", iconCls: "g-notif-icon-green", title: "Deployment successful", text: "prod-v2.4.1 deployed to all regions", time: "2m ago", unread: true },
                { icon: "⚠️", iconCls: "g-notif-icon-rose",  title: "High memory usage",    text: "us-east-1 at 87% capacity — review now", time: "14m ago", unread: true },
                { icon: "🔔", iconCls: "g-notif-icon-purple", title: "New team member",    text: "Alex joined your organization", time: "1h ago", unread: false },
                { icon: "📊", iconCls: "g-notif-icon-blue",   title: "Weekly report ready", text: "Analytics digest for Apr 7–14", time: "3h ago", unread: false },
              ].map(({ icon, iconCls, title, text, time, unread }) => (
                <div key={title} className={`g-notif-item${unread ? " unread" : ""}`} style={{
                  display: "flex", alignItems: "flex-start", gap: "14px",
                  padding: "16px 18px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                  background: unread ? "rgba(167,139,250,0.03)" : "transparent",
                }}>
                  {unread && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: "linear-gradient(to bottom, #a78bfa, #60a5fa)", borderRadius: "0 2px 2px 0" }} />}
                  <div className={`g-notif-icon ${iconCls}`} style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", flexShrink: 0,
                    background: iconCls === "g-notif-icon-green"  ? "rgba(52,211,153,0.15)"  :
                                iconCls === "g-notif-icon-rose"   ? "rgba(251,113,133,0.15)" :
                                iconCls === "g-notif-icon-blue"   ? "rgba(96,165,250,0.15)"  :
                                                                    "rgba(167,139,250,0.18)",
                    border: iconCls === "g-notif-icon-green"  ? "1px solid rgba(52,211,153,0.25)"  :
                            iconCls === "g-notif-icon-rose"   ? "1px solid rgba(251,113,133,0.25)" :
                            iconCls === "g-notif-icon-blue"   ? "1px solid rgba(96,165,250,0.25)"  :
                                                                "1px solid rgba(167,139,250,0.28)",
                  }}>{icon}</div>
                  <div className="g-notif-body" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3px" }}>
                    <div className="g-notif-title" style={{ fontSize: "13px", fontWeight: 700, color: "#f0e9ff" }}>{title}</div>
                    <div className="g-notif-text" style={{ fontSize: "12px", color: "rgba(255,255,255,0.46)", lineHeight: 1.45 }}>{text}</div>
                  </div>
                  <div className="g-notif-time" style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap", flexShrink: 0 }}>{time}</div>
                  {unread && <div className="g-notif-unread-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 6px rgba(167,139,250,0.6)", flexShrink: 0, alignSelf: "center", marginLeft: "4px" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── GLOW DIVIDER ── */}
        <div className="g-glow-divider" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.55), rgba(96,165,250,0.55), transparent)", boxShadow: "0 0 10px rgba(167,139,250,0.35)" }} />

        {/* ── BADGE STRIP ── */}
        <div>
          <div className="g-section-label" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#a78bfa", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
            Status Indicators
          </div>
          <div className="g-badges-row" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { cls: "g-badge-purple", text: "Production",  },
              { cls: "g-badge-green",  text: "All Systems Operational" },
              { cls: "g-badge-blue",   text: "v3.4.1" },
              { cls: "g-badge-amber",  text: "Maintenance Window Sun 2AM" },
              { cls: "g-badge-rose",   text: "Incident Resolved" },
              { cls: "g-badge-purple", text: "99.97% SLA" },
            ].map(({ cls, text }) => (
              <div key={text} className={`g-badge ${cls}`} style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "5px 13px", borderRadius: "999px",
                fontSize: "12px", fontWeight: 700, letterSpacing: "0.03em",
                ...(cls === "g-badge-purple" ? { background: "rgba(167,139,250,0.16)", border: "1px solid rgba(167,139,250,0.38)", color: "#c4b5fd" } :
                    cls === "g-badge-blue"   ? { background: "rgba(96,165,250,0.16)",  border: "1px solid rgba(96,165,250,0.38)",  color: "#93c5fd" } :
                    cls === "g-badge-green"  ? { background: "rgba(52,211,153,0.13)",  border: "1px solid rgba(52,211,153,0.32)",  color: "#6ee7b7" } :
                    cls === "g-badge-rose"   ? { background: "rgba(251,113,133,0.13)", border: "1px solid rgba(251,113,133,0.32)", color: "#fda4af" } :
                                              { background: "rgba(251,191,36,0.13)",  border: "1px solid rgba(251,191,36,0.32)",  color: "#fcd34d" }),
              }}>
                <span className="g-badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor" }} />
                {text}
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
  bg:        "#0f0c29",
  sidebarBg: "rgba(15,12,41,0.8)",
  border:    "rgba(255,255,255,0.15)",
  text:      "#ffffff",
  textMuted: "rgba(255,255,255,0.6)",
  accent:    "#a78bfa",
  accent2:   "#60a5fa",
  cardBg:    "rgba(255,255,255,0.08)",
  inputBg:   "rgba(255,255,255,0.05)",
};

export const GlassTheme: ThemeDefinition = {
  id: "glass",
  name: "Glass",
  emoji: "🔮",
  description: "Cosmic glassmorphism — frosted glass panels with backdrop blur, animated ambient orbs, and deep purple gradients.",
  colors: defaultColors,
  palettes: {
    "Cosmic": defaultColors,
    "Deep Dark": {
      bg:        "#05030f",
      sidebarBg: "rgba(5,3,15,0.85)",
      border:    "rgba(255,255,255,0.08)",
      text:      "#e0d9ff",
      textMuted: "rgba(255,255,255,0.35)",
      accent:    "#a78bfa",
      accent2:   "#60a5fa",
      cardBg:    "rgba(255,255,255,0.04)",
      inputBg:   "rgba(255,255,255,0.04)",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: GlassShowcase,
};
