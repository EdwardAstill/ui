import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";
import { FeatureCard } from "../components/Layouts";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');

  [data-theme="claymorphism"] {
    --bg:           #faf5f0;
    --sidebar-bg:   #f5ede6;
    --border:       #e8d8ce;
    --text:         #3d2b1f;
    --text-muted:   #9c7b6e;
    --accent:       #ff8fab;
    --accent-2:     #a8d8ea;
    --card-bg:      #ffffff;
    --input-bg:     #ffffff;
    --font-body:    'Nunito', system-ui, -apple-system, sans-serif;
    --font-mono:    'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
    --radius:       24px;
  }

  /* ─────────────────────────────────────────
     Keyframes
  ───────────────────────────────────────── */
  @keyframes clay-bob {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }

  @keyframes clay-bob-hover {
    0%, 100% { transform: translateY(-4px) scale(1.02); }
    50%       { transform: translateY(-10px) scale(1.03); }
  }

  @keyframes clay-pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.05); }
  }

  @keyframes clay-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  /* ─────────────────────────────────────────
     Root layout: sidebar + content
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-root {
    display: flex;
    height: 100%;
    font-family: var(--font-body);
  }

  /* ─────────────────────────────────────────
     Sidebar
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-sidebar {
    width: 192px;
    flex-shrink: 0;
    background: var(--sidebar-bg);
    border-radius: 0 20px 20px 0;
    box-shadow: 4px 0 0 var(--border);
    padding: 20px 0 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: relative;
    z-index: 10;
  }

  [data-theme="claymorphism"] .clay-sidebar-title {
    font-size: 1.0625rem;
    font-weight: 900;
    color: var(--accent);
    letter-spacing: -0.02em;
    padding: 0 16px 16px;
    border-bottom: 2px solid var(--border);
    margin-bottom: 8px;
  }

  [data-theme="claymorphism"] .clay-nav-items {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    padding: 0 0 8px;
  }

  [data-theme="claymorphism"] .clay-nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 10px 14px;
    margin: 0 10px;
    border-radius: 16px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text);
    cursor: pointer;
    background: transparent;
1.56, 0.64, 1),
                box-shadow 0.18s ease,
                background 0.15s ease;
    outline: none;
  }

  [data-theme="claymorphism"] .clay-nav-item:hover {
    background: var(--border);
    box-shadow:
      0 4px 0 rgba(0,0,0,0.12),
      inset 0 2px 0 rgba(255,255,255,0.5);
    transform: translateY(-1px);
  }

  [data-theme="claymorphism"] .clay-nav-item.active {
    background: var(--border);
    box-shadow:
      0 4px 0 var(--accent),
      inset 0 2px 0 rgba(255,255,255,0.5);
    font-weight: 800;
    color: var(--accent);
  }

  [data-theme="claymorphism"] .clay-nav-emoji {
    font-size: 1rem;
    line-height: 1;
    flex-shrink: 0;
  }

  [data-theme="claymorphism"] .clay-sidebar-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 8px 16px 0;
    padding: 6px 14px;
    border-radius: 999px;
    background: var(--border);
    font-size: 0.75rem;
    font-weight: 800;
    color: var(--accent);
    box-shadow:
      0 4px 0 var(--accent),
      inset 0 2px 0 rgba(255,255,255,0.5);
    letter-spacing: 0.02em;
    align-self: flex-start;
  }

  /* ─────────────────────────────────────────
     Main content area
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-content {
    flex: 1;
    overflow-y: auto;
  }

  /* ─────────────────────────────────────────
     Showcase wrapper
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-showcase {
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 60px;
    padding-bottom: 80px;
    font-family: var(--font-body);
  }

  [data-theme="claymorphism"] .clay-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  [data-theme="claymorphism"] .clay-section-label {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  /* ─────────────────────────────────────────
     Clay card base mixin — inflated look
     Usage: apply clay-card + a color modifier
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-card {
    border-radius: 24px;
    padding: 28px;
1.56, 0.64, 1),
                box-shadow 0.25s ease;
    cursor: default;
    position: relative;
  }

  [data-theme="claymorphism"] .clay-card:hover {
    animation: clay-bob-hover 0.6s ease-in-out infinite;
    transform: translateY(-4px);
  }

  /* Coral card */
  [data-theme="claymorphism"] .clay-coral {
    background: #ffcab0;
    box-shadow:
      0 8px 0 #e89b79,
      inset 0 2px 0 rgba(255,255,255,0.65);
  }
  [data-theme="claymorphism"] .clay-coral:hover {
    box-shadow:
      0 12px 0 #e89b79,
      inset 0 2px 0 rgba(255,255,255,0.65),
      0 20px 40px rgba(232,155,121,0.3);
  }

  /* Mint card */
  [data-theme="claymorphism"] .clay-mint {
    background: #b5f0d3;
    box-shadow:
      0 8px 0 #7dcba8,
      inset 0 2px 0 rgba(255,255,255,0.65);
  }
  [data-theme="claymorphism"] .clay-mint:hover {
    box-shadow:
      0 12px 0 #7dcba8,
      inset 0 2px 0 rgba(255,255,255,0.65),
      0 20px 40px rgba(125,203,168,0.3);
  }

  /* Lavender card */
  [data-theme="claymorphism"] .clay-lavender {
    background: #d4bbf8;
    box-shadow:
      0 8px 0 #a87ee0,
      inset 0 2px 0 rgba(255,255,255,0.65);
  }
  [data-theme="claymorphism"] .clay-lavender:hover {
    box-shadow:
      0 12px 0 #a87ee0,
      inset 0 2px 0 rgba(255,255,255,0.65),
      0 20px 40px rgba(168,126,224,0.3);
  }

  /* Sky card */
  [data-theme="claymorphism"] .clay-sky {
    background: #a8d8f0;
    box-shadow:
      0 8px 0 #6aabcc,
      inset 0 2px 0 rgba(255,255,255,0.65);
  }
  [data-theme="claymorphism"] .clay-sky:hover {
    box-shadow:
      0 12px 0 #6aabcc,
      inset 0 2px 0 rgba(255,255,255,0.65),
      0 20px 40px rgba(106,171,204,0.3);
  }

  /* Peach card */
  [data-theme="claymorphism"] .clay-peach {
    background: #ffd9a0;
    box-shadow:
      0 8px 0 #e0a85c,
      inset 0 2px 0 rgba(255,255,255,0.65);
  }
  [data-theme="claymorphism"] .clay-peach:hover {
    box-shadow:
      0 12px 0 #e0a85c,
      inset 0 2px 0 rgba(255,255,255,0.65),
      0 20px 40px rgba(224,168,92,0.3);
  }

  /* Lime card */
  [data-theme="claymorphism"] .clay-lime {
    background: #cff080;
    box-shadow:
      0 8px 0 #94c440,
      inset 0 2px 0 rgba(255,255,255,0.65);
  }
  [data-theme="claymorphism"] .clay-lime:hover {
    box-shadow:
      0 12px 0 #94c440,
      inset 0 2px 0 rgba(255,255,255,0.65),
      0 20px 40px rgba(148,196,64,0.3);
  }

  /* Pink card */
  [data-theme="claymorphism"] .clay-pink {
    background: #ffb8d2;
    box-shadow:
      0 8px 0 #e07fa5,
      inset 0 2px 0 rgba(255,255,255,0.65);
  }
  [data-theme="claymorphism"] .clay-pink:hover {
    box-shadow:
      0 12px 0 #e07fa5,
      inset 0 2px 0 rgba(255,255,255,0.65),
      0 20px 40px rgba(224,127,165,0.3);
  }

  /* Lemon card */
  [data-theme="claymorphism"] .clay-lemon {
    background: #fef08a;
    box-shadow:
      0 8px 0 #caba3a,
      inset 0 2px 0 rgba(255,255,255,0.65);
  }
  [data-theme="claymorphism"] .clay-lemon:hover {
    box-shadow:
      0 12px 0 #caba3a,
      inset 0 2px 0 rgba(255,255,255,0.65),
      0 20px 40px rgba(202,186,58,0.3);
  }

  /* ─────────────────────────────────────────
     1. Hero Header
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-hero {
    background: linear-gradient(135deg, var(--sidebar-bg) 0%, var(--bg) 100%);
    border-radius: 32px;
    padding: 52px 44px;
    box-shadow:
      0 10px 0 var(--border),
      inset 0 2px 0 rgba(255,255,255,0.8);
    position: relative;
    overflow: hidden;
  }

  [data-theme="claymorphism"] .clay-hero::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -60px;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
    opacity: 0.35;
    pointer-events: none;
  }

  [data-theme="claymorphism"] .clay-hero::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-2) 0%, transparent 70%);
    opacity: 0.3;
    pointer-events: none;
  }

  [data-theme="claymorphism"] .clay-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(255,255,255,0.75);
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--accent);
    box-shadow:
      0 4px 0 rgba(0,0,0,0.1),
      inset 0 1px 0 rgba(255,255,255,0.9);
    width: fit-content;
    position: relative;
    z-index: 1;
    margin-bottom: 16px;
  }

  [data-theme="claymorphism"] .clay-hero-title {
    font-size: 3.6rem;
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    z-index: 1;
    margin-bottom: 12px;
  }

  [data-theme="claymorphism"] .clay-hero-sub {
    font-size: 1.0625rem;
    font-weight: 500;
    color: var(--text-muted);
    line-height: 1.6;
    max-width: 500px;
    position: relative;
    z-index: 1;
    margin-bottom: 28px;
  }

  [data-theme="claymorphism"] .clay-hero-blobs {
    display: flex;
    gap: 14px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  [data-theme="claymorphism"] .clay-blob {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    font-size: 1.5rem;
    box-shadow:
      0 6px 0 rgba(0,0,0,0.12),
      inset 0 2px 0 rgba(255,255,255,0.7);
    animation: clay-bob 3s ease-in-out infinite;
    cursor: default;
  }

  [data-theme="claymorphism"] .clay-blob:nth-child(1) { background: #ffcab0; animation-delay: 0s; }
  [data-theme="claymorphism"] .clay-blob:nth-child(2) { background: #ffb8d2; animation-delay: 0.35s; }
  [data-theme="claymorphism"] .clay-blob:nth-child(3) { background: #d4bbf8; animation-delay: 0.7s; }
  [data-theme="claymorphism"] .clay-blob:nth-child(4) { background: #a8d8f0; animation-delay: 1.05s; }
  [data-theme="claymorphism"] .clay-blob:nth-child(5) { background: #b5f0d3; animation-delay: 1.4s; }

  /* ─────────────────────────────────────────
     2. Stats grid
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
  }

  [data-theme="claymorphism"] .clay-stat-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  [data-theme="claymorphism"] .clay-stat-icon {
    font-size: 2rem;
    line-height: 1;
    filter: drop-shadow(0 3px 4px rgba(0,0,0,0.15));
  }

  [data-theme="claymorphism"] .clay-stat-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  [data-theme="claymorphism"] .clay-stat-value {
    font-size: 2.25rem;
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--text);
    opacity: 0.85;
  }

  [data-theme="claymorphism"] .clay-stat-change {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-muted);
    opacity: 0.7;
  }

  /* ─────────────────────────────────────────
     3. Buttons
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
  }

  [data-theme="claymorphism"] .clay-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 999px;
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
1.56, 0.64, 1),
                box-shadow 0.15s ease;
    letter-spacing: -0.01em;
  }

  [data-theme="claymorphism"] .clay-btn:active {
    transform: translateY(4px) !important;
  }

  [data-theme="claymorphism"] .clay-btn-coral {
    background: #ff8a65;
    color: #fff;
    box-shadow:
      0 6px 0 #c85a38,
      inset 0 2px 0 rgba(255,255,255,0.35);
  }
  [data-theme="claymorphism"] .clay-btn-coral:hover {
    transform: translateY(-3px);
    box-shadow:
      0 9px 0 #c85a38,
      inset 0 2px 0 rgba(255,255,255,0.35),
      0 16px 32px rgba(200,90,56,0.3);
  }
  [data-theme="claymorphism"] .clay-btn-coral:active {
    box-shadow: 0 2px 0 #c85a38, inset 0 2px 0 rgba(255,255,255,0.35);
  }

  [data-theme="claymorphism"] .clay-btn-lavender {
    background: #c084fc;
    color: #fff;
    box-shadow:
      0 6px 0 #8040cc,
      inset 0 2px 0 rgba(255,255,255,0.35);
  }
  [data-theme="claymorphism"] .clay-btn-lavender:hover {
    transform: translateY(-3px);
    box-shadow:
      0 9px 0 #8040cc,
      inset 0 2px 0 rgba(255,255,255,0.35),
      0 16px 32px rgba(128,64,204,0.3);
  }
  [data-theme="claymorphism"] .clay-btn-lavender:active {
    box-shadow: 0 2px 0 #8040cc, inset 0 2px 0 rgba(255,255,255,0.35);
  }

  [data-theme="claymorphism"] .clay-btn-mint {
    background: #4dd9a0;
    color: #fff;
    box-shadow:
      0 6px 0 #27a070,
      inset 0 2px 0 rgba(255,255,255,0.35);
  }
  [data-theme="claymorphism"] .clay-btn-mint:hover {
    transform: translateY(-3px);
    box-shadow:
      0 9px 0 #27a070,
      inset 0 2px 0 rgba(255,255,255,0.35),
      0 16px 32px rgba(39,160,112,0.3);
  }
  [data-theme="claymorphism"] .clay-btn-mint:active {
    box-shadow: 0 2px 0 #27a070, inset 0 2px 0 rgba(255,255,255,0.35);
  }

  [data-theme="claymorphism"] .clay-btn-sky {
    background: #60c8f0;
    color: #fff;
    box-shadow:
      0 6px 0 #2890bb,
      inset 0 2px 0 rgba(255,255,255,0.35);
  }
  [data-theme="claymorphism"] .clay-btn-sky:hover {
    transform: translateY(-3px);
    box-shadow:
      0 9px 0 #2890bb,
      inset 0 2px 0 rgba(255,255,255,0.35),
      0 16px 32px rgba(40,144,187,0.3);
  }
  [data-theme="claymorphism"] .clay-btn-sky:active {
    box-shadow: 0 2px 0 #2890bb, inset 0 2px 0 rgba(255,255,255,0.35);
  }

  /* ─────────────────────────────────────────
     4. Form
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-form-card {
    background: var(--card-bg);
    border-radius: 28px;
    padding: 36px;
    box-shadow:
      0 8px 0 var(--border),
      inset 0 2px 0 rgba(255,255,255,0.2);
  }

  [data-theme="claymorphism"] .clay-form-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 24px;
  }

  [data-theme="claymorphism"] .clay-field-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  [data-theme="claymorphism"] .clay-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  [data-theme="claymorphism"] .clay-label {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text);
  }

  [data-theme="claymorphism"] .clay-input,
  [data-theme="claymorphism"] .clay-textarea,
  [data-theme="claymorphism"] .clay-select {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--text);
    background: var(--input-bg);
box-shadow 0.15s ease, transform 0.15s ease;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    box-shadow: inset 0 2px 0 rgba(255,255,255,0.1);
  }

  [data-theme="claymorphism"] .clay-input::placeholder,
  [data-theme="claymorphism"] .clay-textarea::placeholder {
    color: var(--text-muted);
    opacity: 0.6;
  }

  [data-theme="claymorphism"] .clay-input:focus,
  [data-theme="claymorphism"] .clay-textarea:focus,
  [data-theme="claymorphism"] .clay-select:focus {
    border-color: var(--accent);
    box-shadow:
      inset 0 2px 0 rgba(255,255,255,0.1),
      0 0 0 4px rgba(192,132,252,0.18);
    transform: translateY(-1px);
  }

  [data-theme="claymorphism"] .clay-textarea {
    resize: vertical;
    min-height: 96px;
    line-height: 1.55;
  }

  [data-theme="claymorphism"] .clay-select-wrap {
    position: relative;
  }

  [data-theme="claymorphism"] .clay-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    pointer-events: none;
    font-size: 1rem;
    font-weight: 700;
  }

  [data-theme="claymorphism"] .clay-select { padding-right: 40px; cursor: pointer; }

  /* ─────────────────────────────────────────
     5. Tags/Badges
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-tag-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  [data-theme="claymorphism"] .clay-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 8px 18px;
    border-radius: 999px;
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.875rem;
    cursor: default;
1.56, 0.64, 1),
                box-shadow 0.2s ease;
  }

  [data-theme="claymorphism"] .clay-tag:hover {
    transform: translateY(-3px) scale(1.05);
  }

  [data-theme="claymorphism"] .clay-tag-coral    { background: #ffcab0; color: #a04020; box-shadow: 0 4px 0 #e89b79, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-coral:hover    { box-shadow: 0 7px 0 #e89b79, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-mint     { background: #b5f0d3; color: #1d6b46; box-shadow: 0 4px 0 #7dcba8, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-mint:hover     { box-shadow: 0 7px 0 #7dcba8, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-lavender { background: #d4bbf8; color: #5e2d9c; box-shadow: 0 4px 0 #a87ee0, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-lavender:hover { box-shadow: 0 7px 0 #a87ee0, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-sky      { background: #a8d8f0; color: #1558a0; box-shadow: 0 4px 0 #6aabcc, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-sky:hover      { box-shadow: 0 7px 0 #6aabcc, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-peach    { background: #ffd9a0; color: #8a4e00; box-shadow: 0 4px 0 #e0a85c, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-peach:hover    { box-shadow: 0 7px 0 #e0a85c, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-lime     { background: #cff080; color: #3a6200; box-shadow: 0 4px 0 #94c440, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-lime:hover     { box-shadow: 0 7px 0 #94c440, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-pink     { background: #ffb8d2; color: #8a1f50; box-shadow: 0 4px 0 #e07fa5, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-pink:hover     { box-shadow: 0 7px 0 #e07fa5, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-lemon    { background: #fef08a; color: #7a5c00; box-shadow: 0 4px 0 #caba3a, inset 0 1px 0 rgba(255,255,255,0.6); }
  [data-theme="claymorphism"] .clay-tag-lemon:hover    { box-shadow: 0 7px 0 #caba3a, inset 0 1px 0 rgba(255,255,255,0.6); }

  /* ─────────────────────────────────────────
     6. Profile / Avatar card
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-profile-card {
    background: var(--card-bg);
    border-radius: 28px;
    padding: 36px;
    box-shadow:
      0 10px 0 var(--border),
      inset 0 2px 0 rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    gap: 28px;
  }

  [data-theme="claymorphism"] .clay-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.25rem;
    flex-shrink: 0;
    box-shadow:
      0 6px 0 rgba(0,0,0,0.15),
      inset 0 2px 0 rgba(255,255,255,0.6);
    animation: clay-bob 4s ease-in-out infinite;
  }

  [data-theme="claymorphism"] .clay-profile-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  [data-theme="claymorphism"] .clay-profile-name {
    font-size: 1.375rem;
    font-weight: 900;
    color: var(--text);
    letter-spacing: -0.02em;
  }

  [data-theme="claymorphism"] .clay-profile-role {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--accent);
  }

  [data-theme="claymorphism"] .clay-profile-bio {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-muted);
    line-height: 1.55;
    margin-top: 4px;
  }

  [data-theme="claymorphism"] .clay-profile-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  [data-theme="claymorphism"] .clay-profile-stat-row {
    display: flex;
    gap: 24px;
    margin-top: 12px;
  }

  [data-theme="claymorphism"] .clay-profile-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  [data-theme="claymorphism"] .clay-profile-stat-val {
    font-size: 1.25rem;
    font-weight: 900;
    color: var(--text);
    letter-spacing: -0.03em;
  }

  [data-theme="claymorphism"] .clay-profile-stat-lbl {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* ─────────────────────────────────────────
     7. Progress bars
  ───────────────────────────────────────── */
  [data-theme="claymorphism"] .clay-progress-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  [data-theme="claymorphism"] .clay-progress-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  [data-theme="claymorphism"] .clay-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  [data-theme="claymorphism"] .clay-progress-name {
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  [data-theme="claymorphism"] .clay-progress-pct {
    font-size: 0.875rem;
    font-weight: 800;
    color: var(--text-muted);
    background: rgba(255,255,255,0.8);
    padding: 2px 10px;
    border-radius: 999px;
    box-shadow: 0 3px 0 rgba(0,0,0,0.08);
  }

  [data-theme="claymorphism"] .clay-progress-track {
    height: 14px;
    border-radius: 999px;
    background: rgba(0,0,0,0.06);
    overflow: visible;
    box-shadow:
      inset 0 3px 6px rgba(0,0,0,0.08),
      inset 0 -1px 0 rgba(255,255,255,0.6);
    position: relative;
  }

  [data-theme="claymorphism"] .clay-progress-fill {
    height: 100%;
    border-radius: 999px;
    box-shadow:
      0 3px 0 rgba(0,0,0,0.15),
      inset 0 2px 0 rgba(255,255,255,0.4);
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  [data-theme="claymorphism"] .clay-progress-fill::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 8px;
    right: 20%;
    height: 4px;
    border-radius: 999px;
    background: rgba(255,255,255,0.35);
  }

  [data-theme="claymorphism"] .clay-fill-coral    { background: linear-gradient(90deg, #ff9a7a 0%, #ff6b45 100%); }
  [data-theme="claymorphism"] .clay-fill-lavender { background: linear-gradient(90deg, #d4bbf8 0%, #a87ee0 100%); }
  [data-theme="claymorphism"] .clay-fill-mint     { background: linear-gradient(90deg, #b5f0d3 0%, #4dd9a0 100%); }
  [data-theme="claymorphism"] .clay-fill-sky      { background: linear-gradient(90deg, #a8d8f0 0%, #60c8f0 100%); }
  [data-theme="claymorphism"] .clay-fill-peach    { background: linear-gradient(90deg, #ffd9a0 0%, #ffab40 100%); }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const ClaymorphismShowcase: FC<{ layout?: string; colors?: any }> = ({ layout, colors }) => {
  const c = colors || defaultColors;

  return (
    <div style={{
      background: c.bg || "#f0f4ff",
      minHeight: "100%",
      fontFamily: "'Nunito', system-ui, sans-serif",
      padding: "40px",
      color: c.text || "#2d2b55",
    }}>
      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #f5ede6 0%, #f0f4ff 100%)",
        borderRadius: "32px",
        padding: "48px 44px",
        boxShadow: "0 10px 0 #e8d8ce, inset 0 2px 0 rgba(255,255,255,0.8)",
        position: "relative",
        overflow: "hidden",
        marginBottom: "40px",
      }}>
        {/* Decorative blobs in background */}
        <div style={{
          position: "absolute", top: "-60px", right: "-40px",
          width: "220px", height: "220px", borderRadius: "50%",
          background: "radial-gradient(circle, #ff8fab 0%, transparent 70%)",
          opacity: 0.3, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-50px", left: "-30px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: "radial-gradient(circle, #a8d8ea 0%, transparent 70%)",
          opacity: 0.3, pointerEvents: "none",
        }} />
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "7px 16px", borderRadius: "999px",
          background: "rgba(255,255,255,0.8)",
          fontSize: "0.8rem", fontWeight: 700, color: "#ff8fab",
          boxShadow: "0 4px 0 rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
          marginBottom: "16px", position: "relative", zIndex: 1,
        }}>
          🧸 New release — v2.4.0
        </div>
        <h1 style={{
          fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 900,
          lineHeight: 1.05, letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #ff8fab 0%, #a8d8ea 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text", marginBottom: "12px", position: "relative", zIndex: 1,
        }}>
          Squish, Bounce & Play
        </h1>
        <p style={{
          fontSize: "1.05rem", fontWeight: 500, color: "#9c7b6e",
          lineHeight: 1.65, maxWidth: "480px",
          marginBottom: "28px", position: "relative", zIndex: 1,
        }}>
          A tactile UI toolkit inspired by the satisfying squish of fresh clay. Every element feels chunky, colorful, and fun.
        </p>
        {/* Bouncing blob row */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center", position: "relative", zIndex: 1, marginBottom: "28px" }}>
          {[
            { bg: "#ffcab0", shadow: "#e89b79", emoji: "🎨" },
            { bg: "#ffb8d2", shadow: "#e07fa5", emoji: "🌸" },
            { bg: "#d4bbf8", shadow: "#a87ee0", emoji: "✨" },
            { bg: "#a8d8f0", shadow: "#6aabcc", emoji: "💧" },
            { bg: "#b5f0d3", shadow: "#7dcba8", emoji: "🍀" },
            { bg: "#ffd9a0", shadow: "#e0a85c", emoji: "🍊" },
          ].map((b, i) => (
            <div key={i} style={{
              width: "52px", height: "52px", borderRadius: "50%",
              background: b.bg, fontSize: "1.4rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 6px 0 ${b.shadow}, inset 0 2px 0 rgba(255,255,255,0.7)`,
              animation: `clay-bob 3s ease-in-out ${i * 0.35}s infinite`,
              cursor: "default",
            }}>
              {b.emoji}
            </div>
          ))}
        </div>
        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <button className="clay-btn clay-btn-coral" style={{ border: "none" }}>
            Get Started 🚀
          </button>
          <button className="clay-btn clay-btn-lavender" style={{ border: "none" }}>
            View Docs
          </button>
          <button className="clay-btn clay-btn-mint" style={{ border: "none" }}>
            GitHub
          </button>
        </div>
      </div>

      {/* ── App Icon Grid ── */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "20px" }}>
          Clay App Icons
        </div>
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          {[
            { bg: "#ffcab0", shadow: "#e89b79", emoji: "🎵", label: "Music" },
            { bg: "#d4bbf8", shadow: "#a87ee0", emoji: "📷", label: "Camera" },
            { bg: "#b5f0d3", shadow: "#7dcba8", emoji: "💬", label: "Chat" },
            { bg: "#a8d8f0", shadow: "#6aabcc", emoji: "🗺", label: "Maps" },
            { bg: "#ffd9a0", shadow: "#e0a85c", emoji: "📚", label: "Books" },
            { bg: "#ffb8d2", shadow: "#e07fa5", emoji: "❤️", label: "Health" },
            { bg: "#cff080", shadow: "#94c440", emoji: "🌱", label: "Garden" },
            { bg: "#fef08a", shadow: "#caba3a", emoji: "⭐", label: "Starred" },
          ].map((icon, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "68px", height: "68px", borderRadius: "20px",
                background: icon.bg, fontSize: "1.8rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 8px 0 ${icon.shadow}, inset 0 2px 0 rgba(255,255,255,0.65)`,
                cursor: "pointer",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}>
                {icon.emoji}
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9c7b6e" }}>
                {icon.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "20px" }}>
          Clay Stat Tablets
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "18px" }}>
          {[
            { color: "clay-coral",   icon: "🔥", label: "Active Users",  value: "48.2k", change: "+12% this week" },
            { color: "clay-mint",    icon: "💰", label: "Revenue",       value: "$92k",  change: "+8.4% MoM" },
            { color: "clay-lavender",icon: "🎯", label: "Conversions",   value: "3,841", change: "+5.1% WoW" },
            { color: "clay-peach",   icon: "📦", label: "Orders",        value: "1,204", change: "+21% today" },
          ].map((s, i) => (
            <div key={i} className={`clay-card ${s.color}`} style={{ padding: "24px 22px" }}>
              <div className="clay-stat-icon">{s.icon}</div>
              <div className="clay-stat-label">{s.label}</div>
              <div className="clay-stat-value">{s.value}</div>
              <div className="clay-stat-change">{s.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Media Cards ── */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "20px" }}>
          Content Cards
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
          {[
            { color: "clay-sky",    emoji: "🎵", title: "Chill Beats Vol.3", sub: "42 tracks · 2h 18m", tag: "Music" },
            { color: "clay-pink",   emoji: "🎬", title: "Studio Ghibli Faves", sub: "8 films · 14h total", tag: "Video" },
            { color: "clay-lime",   emoji: "🎮", title: "Indie Gems 2024", sub: "23 games · Editor pick", tag: "Games" },
            { color: "clay-lemon",  emoji: "📖", title: "Design Thinking", sub: "320 pages · 5★ rating", tag: "Books" },
          ].map((card, i) => (
            <div key={i} className={`clay-card ${card.color}`} style={{ padding: "24px 22px", cursor: "pointer" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: "12px", filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.15))" }}>
                {card.emoji}
              </div>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(61,43,31,0.5)", marginBottom: "6px" }}>
                {card.tag}
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#3d2b1f", marginBottom: "6px", lineHeight: 1.2 }}>
                {card.title}
              </div>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#9c7b6e" }}>
                {card.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress + Tags ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
        {/* Progress */}
        <div style={{
          background: "#fff", borderRadius: "28px", padding: "28px",
          boxShadow: "0 8px 0 #e8d8ce, inset 0 2px 0 rgba(255,255,255,0.2)",
        }}>
          <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#3d2b1f", marginBottom: "22px" }}>
            🏋️ Skill Progress
          </div>
          <div className="clay-progress-list">
            {[
              { label: "🎨 Design", pct: 88, fill: "clay-fill-coral" },
              { label: "💻 Code",   pct: 72, fill: "clay-fill-lavender" },
              { label: "📊 Data",   pct: 55, fill: "clay-fill-mint" },
              { label: "🚀 DevOps", pct: 41, fill: "clay-fill-sky" },
            ].map((p, i) => (
              <div key={i} className="clay-progress-item">
                <div className="clay-progress-header">
                  <span className="clay-progress-name">{p.label}</span>
                  <span className="clay-progress-pct">{p.pct}%</span>
                </div>
                <div className="clay-progress-track">
                  <div className={`clay-progress-fill ${p.fill}`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div style={{
          background: "#fff", borderRadius: "28px", padding: "28px",
          boxShadow: "0 8px 0 #e8d8ce, inset 0 2px 0 rgba(255,255,255,0.2)",
        }}>
          <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#3d2b1f", marginBottom: "22px" }}>
            🏷️ Clay Tags
          </div>
          <div className="clay-tag-grid">
            <span className="clay-tag clay-tag-coral">Design</span>
            <span className="clay-tag clay-tag-mint">React</span>
            <span className="clay-tag clay-tag-lavender">TypeScript</span>
            <span className="clay-tag clay-tag-sky">CSS</span>
            <span className="clay-tag clay-tag-peach">Figma</span>
            <span className="clay-tag clay-tag-lime">Node.js</span>
            <span className="clay-tag clay-tag-pink">Animation</span>
            <span className="clay-tag clay-tag-lemon">3D</span>
            <span className="clay-tag clay-tag-coral">Motion</span>
            <span className="clay-tag clay-tag-mint">A11y</span>
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <div style={{
        background: "#fff", borderRadius: "28px", padding: "36px",
        boxShadow: "0 8px 0 #e8d8ce, inset 0 2px 0 rgba(255,255,255,0.2)",
        marginBottom: "40px",
      }}>
        <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#3d2b1f", marginBottom: "28px" }}>
          🌈 Send a Clay Message
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div className="clay-field">
            <label className="clay-label">Your Name</label>
            <input className="clay-input" placeholder="e.g. Alex Chen"
              style={{ border: "2px solid #e8d8ce", borderRadius: "16px", padding: "12px 16px", outline: "none", fontFamily: "inherit" }} />
          </div>
          <div className="clay-field">
            <label className="clay-label">Email</label>
            <input className="clay-input" placeholder="hello@example.com"
              style={{ border: "2px solid #e8d8ce", borderRadius: "16px", padding: "12px 16px", outline: "none", fontFamily: "inherit" }} />
          </div>
        </div>
        <div className="clay-field" style={{ marginBottom: "20px" }}>
          <label className="clay-label">Mood</label>
          <div className="clay-select-wrap">
            <select className="clay-select"
              style={{ border: "2px solid #e8d8ce", borderRadius: "16px", padding: "12px 16px", fontFamily: "inherit", width: "100%", background: "#fff" }}>
              <option>🎉 Excited!</option>
              <option>😊 Happy</option>
              <option>🤔 Thinking</option>
              <option>🌊 Chill</option>
            </select>
          </div>
        </div>
        <div className="clay-field" style={{ marginBottom: "24px" }}>
          <label className="clay-label">Message</label>
          <textarea className="clay-textarea" placeholder="Tell us something fun..."
            style={{ border: "2px solid #e8d8ce", borderRadius: "16px", padding: "12px 16px", outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: "90px" }} />
        </div>
        <div style={{ display: "flex", gap: "14px" }}>
          <button className="clay-btn clay-btn-coral" style={{ border: "none" }}>
            Send Message 💌
          </button>
          <button className="clay-btn clay-btn-sky" style={{ border: "none" }}>
            Save Draft
          </button>
        </div>
      </div>

      {/* ── Profile ── */}
      <div className="clay-profile-card">
        <div className="clay-avatar">🦊</div>
        <div className="clay-profile-info">
          <div className="clay-profile-name">Nova Clayfield</div>
          <div className="clay-profile-role">Senior Clay Sculptor · Design Lead</div>
          <div className="clay-profile-bio">
            Crafting squishy interfaces that bring joy and delight. Obsessed with tactile UI patterns and color theory.
          </div>
          <div className="clay-profile-tags">
            <span className="clay-tag clay-tag-coral" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Design</span>
            <span className="clay-tag clay-tag-mint" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Motion</span>
            <span className="clay-tag clay-tag-lavender" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>3D</span>
          </div>
          <div className="clay-profile-stat-row">
            <div className="clay-profile-stat">
              <span className="clay-profile-stat-val">1.2k</span>
              <span className="clay-profile-stat-lbl">Projects</span>
            </div>
            <div className="clay-profile-stat">
              <span className="clay-profile-stat-val">48k</span>
              <span className="clay-profile-stat-lbl">Followers</span>
            </div>
            <div className="clay-profile-stat">
              <span className="clay-profile-stat-val">392</span>
              <span className="clay-profile-stat-lbl">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#f0f4ff",
  sidebarBg: "#e8ecff",
  border:    "transparent",
  text:      "#2d2b55",
  textMuted: "#6b6895",
  accent:    "#ff6b6b",
  accent2:   "#4ecdc4",
  cardBg:    "#ffffff",
  inputBg:   "#ffffff",
};

export const ClaymorphismTheme: ThemeDefinition = {
  id: "claymorphism",
  name: "Claymorphism",
  emoji: "🧸",
  description: "3D clay-sculpted UI with bold extruded shadows, vibrant pastels, and tactile rounded shapes inspired by Play-Doh.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg: "#121212",
      sidebarBg: "#1a1a1a",
      border: "#333333",
      text: "#eeeeee",
      textMuted: "#888888",
      accent: "#bb86fc",
      cardBg: "#1e1e1e",
      inputBg: "#2c2c2c",
    }
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: ClaymorphismShowcase,
};
