import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";
import { FeatureCard } from "../components/Layouts";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* ── Keyframes ── */

@keyframes nm-pulse-glow {
  0%, 100% {
    box-shadow:
      6px 6px 12px rgba(163, 177, 198, 0.6),
      -6px -6px 12px rgba(255, 255, 255, 0.8),
      inset 0 0 0 rgba(163, 177, 198, 0),
      inset 0 0 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow:
      8px 8px 16px rgba(163, 177, 198, 0.7),
      -8px -8px 16px rgba(255, 255, 255, 0.9),
      inset 0 0 0 rgba(163, 177, 198, 0),
      inset 0 0 0 rgba(255, 255, 255, 0);
  }
}

@keyframes nm-accent-pulse {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1; }
}

@keyframes nm-fill-bar {
  from { width: 0%; }
  to   { width: var(--nm-bar-width, 70%); }
}

@keyframes nm-float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-3px); }
}

@keyframes nm-spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── Root Variables ── */

[data-theme="neumorphism"] {
  --bg:          #e0e5ec;
  --sidebar-bg:  #d8dde6;
  --border:      #c8cdd6;
  --text:        #4a5568;
  --text-muted:  #8896a5;
  --accent:      #4a90d9;
  --accent-2:    #7c6bdc;
  --card-bg:     #e0e5ec;
  --input-bg:    #e0e5ec;
  --font-body:   'Inter', 'Helvetica Neue', Arial, sans-serif;
  --font-mono:   'SF Mono', 'Fira Code', 'Courier New', monospace;
  --radius:      16px;

  /* Neumorphic shadow tokens */
  --nm-shadow-light:  rgba(255, 255, 255, 0.85);
  --nm-shadow-dark:   rgba(163, 177, 198, 0.65);
  --nm-extrude:       6px 6px 14px var(--nm-shadow-dark), -6px -6px 14px var(--nm-shadow-light);
  --nm-extrude-lg:    10px 10px 24px var(--nm-shadow-dark), -10px -10px 24px var(--nm-shadow-light);
  --nm-extrude-sm:    3px 3px 8px var(--nm-shadow-dark), -3px -3px 8px var(--nm-shadow-light);
  --nm-inset:         inset 4px 4px 10px var(--nm-shadow-dark), inset -4px -4px 10px var(--nm-shadow-light);
  --nm-inset-sm:      inset 2px 2px 6px var(--nm-shadow-dark), inset -2px -2px 6px var(--nm-shadow-light);
}

/* ── Base ── */

[data-theme="neumorphism"] .nm-root {
  font-family: var(--font-body);
  color: var(--text);
  background: var(--bg);
  min-height: 100%;
  height: 100%;
  padding: 0;
  display: flex;
}

/* ── Typography ── */

[data-theme="neumorphism"] .nm-section-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

[data-theme="neumorphism"] .nm-section-title::before,
[data-theme="neumorphism"] .nm-section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border));
}

[data-theme="neumorphism"] .nm-section-title::before {
  flex: 0 0 24px;
  background: linear-gradient(90deg, var(--border), transparent);
}

/* ── Header ── */

[data-theme="neumorphism"] .nm-header {
  padding: 40px 0 36px;
  margin-bottom: 40px;
  position: relative;
}

[data-theme="neumorphism"] .nm-header-inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

[data-theme="neumorphism"] .nm-logo-block {
  display: flex;
  align-items: center;
  gap: 20px;
}

[data-theme="neumorphism"] .nm-logo-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: var(--bg);
  box-shadow: var(--nm-extrude-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
  animation: nm-float 4s ease-in-out infinite;
}

[data-theme="neumorphism"] .nm-header-text h1 {
  font-size: 40px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 6px;
}

[data-theme="neumorphism"] .nm-header-text p {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 0.01em;
}

[data-theme="neumorphism"] .nm-header-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: flex-start;
  padding-top: 4px;
}

[data-theme="neumorphism"] .nm-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

[data-theme="neumorphism"] .nm-badge.accent {
  color: var(--accent);
}

[data-theme="neumorphism"] .nm-badge.accent-2 {
  color: var(--accent-2);
}

/* ── Extruded Card ── */

[data-theme="neumorphism"] .nm-card {
  background: var(--bg);
  border-radius: var(--radius);
  box-shadow: var(--nm-extrude);
  padding: 24px;
  position: relative;
1fr);
  gap: 20px;
  margin-bottom: 36px;
}

[data-theme="neumorphism"] .nm-stat-card {
  background: var(--bg);
  border-radius: var(--radius);
  box-shadow: var(--nm-extrude);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

[data-theme="neumorphism"] .nm-stat-card:hover {
  box-shadow: var(--nm-extrude-lg);
  transform: translateY(-2px);
}

[data-theme="neumorphism"] .nm-stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

[data-theme="neumorphism"] .nm-stat-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

[data-theme="neumorphism"] .nm-stat-value {
  font-size: 30px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  line-height: 1;
}

[data-theme="neumorphism"] .nm-stat-value.accent  { color: var(--accent); }
[data-theme="neumorphism"] .nm-stat-value.accent-2 { color: var(--accent-2); }
[data-theme="neumorphism"] .nm-stat-value.success  { color: #48bb78; }
[data-theme="neumorphism"] .nm-stat-value.warning  { color: #ed8936; }

[data-theme="neumorphism"] .nm-stat-delta {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
}

[data-theme="neumorphism"] .nm-stat-delta.up   { color: #48bb78; }
[data-theme="neumorphism"] .nm-stat-delta.down { color: #fc8181; }

/* ── Buttons ── */

[data-theme="neumorphism"] .nm-btn-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
}

/* Base extruded button */
[data-theme="neumorphism"] .nm-btn {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 12px 24px;
  border-radius: 12px;
transform 0.12s ease, color 0.18s ease;
  outline: none;
  position: relative;
}

[data-theme="neumorphism"] .nm-btn:hover {
  box-shadow: var(--nm-extrude-lg);
  transform: translateY(-1px);
}

[data-theme="neumorphism"] .nm-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* Pressed / active — inset shadow */
[data-theme="neumorphism"] .nm-btn:active,
[data-theme="neumorphism"] .nm-btn.pressed {
  box-shadow: var(--nm-inset);
  transform: translateY(0px);
  color: var(--accent);
}

/* Primary filled button */
[data-theme="neumorphism"] .nm-btn-primary {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 12px 28px;
  border-radius: 12px;
#5aa3e8 0%, #4a90d9 100%);
  color: #fff;
  cursor: pointer;
  box-shadow:
    4px 4px 10px rgba(74, 144, 217, 0.4),
    -2px -2px 8px rgba(255, 255, 255, 0.6);
  transition: box-shadow 0.18s ease, transform 0.12s ease, filter 0.18s ease;
  outline: none;
}

[data-theme="neumorphism"] .nm-btn-primary:hover {
  box-shadow:
    6px 6px 14px rgba(74, 144, 217, 0.5),
    -3px -3px 10px rgba(255, 255, 255, 0.7);
  filter: brightness(1.05);
  transform: translateY(-1px);
}

[data-theme="neumorphism"] .nm-btn-primary:active {
  box-shadow:
    inset 3px 3px 8px rgba(0, 0, 0, 0.15),
    inset -2px -2px 6px rgba(255, 255, 255, 0.2);
  transform: translateY(0);
  filter: brightness(0.97);
}

[data-theme="neumorphism"] .nm-btn-primary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* Secondary / accent-2 */
[data-theme="neumorphism"] .nm-btn-secondary {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 12px 24px;
  border-radius: 12px;
#9589e8 0%, #7c6bdc 100%);
  color: #fff;
  cursor: pointer;
  box-shadow:
    4px 4px 10px rgba(124, 107, 220, 0.35),
    -2px -2px 8px rgba(255, 255, 255, 0.6);
  transition: box-shadow 0.18s ease, transform 0.12s ease, filter 0.18s ease;
  outline: none;
}

[data-theme="neumorphism"] .nm-btn-secondary:hover {
  box-shadow:
    6px 6px 14px rgba(124, 107, 220, 0.45),
    -3px -3px 10px rgba(255, 255, 255, 0.7);
  filter: brightness(1.05);
  transform: translateY(-1px);
}

[data-theme="neumorphism"] .nm-btn-secondary:active {
  box-shadow:
    inset 3px 3px 8px rgba(0, 0, 0, 0.12),
    inset -2px -2px 6px rgba(255, 255, 255, 0.15);
  transform: translateY(0);
}

[data-theme="neumorphism"] .nm-btn-secondary:focus-visible {
  outline: 2px solid var(--accent-2);
  outline-offset: 3px;
}

/* Icon button — circular */
[data-theme="neumorphism"] .nm-btn-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
transform 0.12s ease;
  outline: none;
}

[data-theme="neumorphism"] .nm-btn-icon:hover {
  box-shadow: var(--nm-extrude);
  transform: translateY(-1px);
}

[data-theme="neumorphism"] .nm-btn-icon:active {
  box-shadow: var(--nm-inset-sm);
  transform: translateY(0);
}

[data-theme="neumorphism"] .nm-btn-icon:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* ── Form Inputs ── */

[data-theme="neumorphism"] .nm-form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}

[data-theme="neumorphism"] .nm-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

[data-theme="neumorphism"] .nm-input {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text);
  background: var(--bg);
color 0.2s ease;
}

[data-theme="neumorphism"] .nm-input::placeholder {
  color: var(--text-muted);
  opacity: 0.65;
}

[data-theme="neumorphism"] .nm-input:focus {
  box-shadow:
    inset 4px 4px 10px var(--nm-shadow-dark),
    inset -4px -4px 10px var(--nm-shadow-light),
    0 0 0 2px rgba(74, 144, 217, 0.3);
  color: var(--text);
}

[data-theme="neumorphism"] .nm-textarea {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text);
  background: var(--bg);
inset -4px -4px 10px var(--nm-shadow-light),
    0 0 0 2px rgba(74, 144, 217, 0.3);
}

[data-theme="neumorphism"] .nm-select {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text);
  background: var(--bg);
%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238896a5' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
}

[data-theme="neumorphism"] .nm-select:focus {
  box-shadow:
    inset 4px 4px 10px var(--nm-shadow-dark),
    inset -4px -4px 10px var(--nm-shadow-light),
    0 0 0 2px rgba(74, 144, 217, 0.3);
}

/* ── Toggle Switch ── */

[data-theme="neumorphism"] .nm-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
}

[data-theme="neumorphism"] .nm-toggle-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

[data-theme="neumorphism"] .nm-toggle-sublabel {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

[data-theme="neumorphism"] .nm-toggle {
  width: 54px;
  height: 28px;
  border-radius: 14px;
  background: var(--bg);
  box-shadow: var(--nm-inset-sm);
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: box-shadow 0.2s ease;
1.56, 0.64, 1), background 0.2s ease, box-shadow 0.2s ease;
}

[data-theme="neumorphism"] .nm-toggle.on .nm-toggle-thumb {
  left: 30px;
  background: var(--accent);
  box-shadow:
    2px 2px 6px rgba(74, 144, 217, 0.5),
    -1px -1px 4px rgba(255, 255, 255, 0.6);
}

[data-theme="neumorphism"] .nm-toggle.on {
  box-shadow:
    inset 3px 3px 8px rgba(74, 144, 217, 0.2),
    inset -3px -3px 8px rgba(255, 255, 255, 0.7);
}

[data-theme="neumorphism"] .nm-toggle-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
  margin: 2px 0;
}

/* ── Range Slider ── */

[data-theme="neumorphism"] .nm-slider-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

[data-theme="neumorphism"] .nm-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

[data-theme="neumorphism"] .nm-slider-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
}

[data-theme="neumorphism"] .nm-slider-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  min-width: 36px;
  text-align: right;
}

[data-theme="neumorphism"] .nm-slider-track {
  height: 8px;
  border-radius: 4px;
  background: var(--bg);
  box-shadow: var(--nm-inset-sm);
  position: relative;
  overflow: visible;
}

[data-theme="neumorphism"] .nm-slider-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--accent), #6ab4f5);
  box-shadow: 0 1px 4px rgba(74, 144, 217, 0.4);
  transition: width 0.15s ease;
}

[data-theme="neumorphism"] .nm-slider-thumb {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: box-shadow 0.15s ease;
  z-index: 1;
}

[data-theme="neumorphism"] .nm-slider-thumb:hover {
  box-shadow: var(--nm-extrude);
}

[data-theme="neumorphism"] input[type="range"].nm-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: transparent;
  box-shadow: var(--nm-inset-sm);
  outline: none;
  cursor: pointer;
  position: relative;
}

[data-theme="neumorphism"] input[type="range"].nm-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  cursor: pointer;
  transition: box-shadow 0.15s ease;
  margin-top: -7px;
}

[data-theme="neumorphism"] input[type="range"].nm-range::-webkit-slider-thumb:hover {
  box-shadow: var(--nm-extrude);
}

[data-theme="neumorphism"] input[type="range"].nm-range::-webkit-slider-thumb:active {
  box-shadow: var(--nm-inset-sm);
}

[data-theme="neumorphism"] input[type="range"].nm-range::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  cursor: pointer;
var(--accent), #6ab4f5);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
  position: relative;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="neumorphism"] .nm-progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: rgba(255,255,255,0.2);
  border-radius: 5px 5px 0 0;
}

[data-theme="neumorphism"] .nm-progress-fill.purple {
  background: linear-gradient(90deg, var(--accent-2), #a99ef5);
}

[data-theme="neumorphism"] .nm-progress-fill.green {
  background: linear-gradient(90deg, #48bb78, #68d391);
}

[data-theme="neumorphism"] .nm-progress-fill.orange {
  background: linear-gradient(90deg, #ed8936, #f6ad55);
}

/* ── Circular Progress ── */

[data-theme="neumorphism"] .nm-circle-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 8px 0;
}

[data-theme="neumorphism"] .nm-circle-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

[data-theme="neumorphism"] .nm-circle-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: var(--nm-extrude);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

[data-theme="neumorphism"] .nm-circle-ring::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: var(--nm-inset-sm);
  z-index: 1;
}

[data-theme="neumorphism"] .nm-circle-inner {
  position: relative;
  z-index: 2;
  text-align: center;
}

[data-theme="neumorphism"] .nm-circle-val {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}

[data-theme="neumorphism"] .nm-circle-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.03em;
}

[data-theme="neumorphism"] .nm-circle-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  z-index: 0;
}

/* ── Icon Elements ── */

[data-theme="neumorphism"] .nm-icon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

[data-theme="neumorphism"] .nm-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

[data-theme="neumorphism"] .nm-icon-bubble {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: var(--bg);
  box-shadow: var(--nm-extrude);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.15s ease;
}

[data-theme="neumorphism"] .nm-icon-bubble:hover {
  box-shadow: var(--nm-extrude-lg);
  transform: translateY(-2px);
}

[data-theme="neumorphism"] .nm-icon-bubble:active {
  box-shadow: var(--nm-inset-sm);
  transform: translateY(0);
}

[data-theme="neumorphism"] .nm-icon-bubble.active {
  box-shadow: var(--nm-inset-sm);
  animation: nm-accent-pulse 2s ease-in-out infinite;
}

[data-theme="neumorphism"] .nm-icon-name {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.03em;
  text-align: center;
}

/* ── Two column layout ── */

[data-theme="neumorphism"] .nm-cols-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

[data-theme="neumorphism"] .nm-cols-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

/* ── Spacing utilities ── */

[data-theme="neumorphism"] .nm-mb-4  { margin-bottom: 4px; }
[data-theme="neumorphism"] .nm-mb-8  { margin-bottom: 8px; }
[data-theme="neumorphism"] .nm-mb-16 { margin-bottom: 16px; }
[data-theme="neumorphism"] .nm-mb-24 { margin-bottom: 24px; }
[data-theme="neumorphism"] .nm-mb-32 { margin-bottom: 32px; }
[data-theme="neumorphism"] .nm-mb-40 { margin-bottom: 40px; }

/* ── Notification / list items ── */

[data-theme="neumorphism"] .nm-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

[data-theme="neumorphism"] .nm-list-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  transition: box-shadow 0.2s ease, transform 0.15s ease;
  cursor: default;
}

[data-theme="neumorphism"] .nm-list-item:hover {
  box-shadow: var(--nm-extrude);
  transform: translateX(2px);
}

[data-theme="neumorphism"] .nm-list-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: var(--nm-extrude-sm);
}

[data-theme="neumorphism"] .nm-list-dot.blue   { background: var(--accent); box-shadow: 2px 2px 4px rgba(74,144,217,0.4), -1px -1px 3px rgba(255,255,255,0.7); }
[data-theme="neumorphism"] .nm-list-dot.purple { background: var(--accent-2); box-shadow: 2px 2px 4px rgba(124,107,220,0.4), -1px -1px 3px rgba(255,255,255,0.7); }
[data-theme="neumorphism"] .nm-list-dot.green  { background: #48bb78; box-shadow: 2px 2px 4px rgba(72,187,120,0.4), -1px -1px 3px rgba(255,255,255,0.7); }
[data-theme="neumorphism"] .nm-list-dot.orange { background: #ed8936; box-shadow: 2px 2px 4px rgba(237,137,54,0.4), -1px -1px 3px rgba(255,255,255,0.7); }

[data-theme="neumorphism"] .nm-list-body {
  flex: 1;
  min-width: 0;
}

[data-theme="neumorphism"] .nm-list-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

[data-theme="neumorphism"] .nm-list-sub {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

[data-theme="neumorphism"] .nm-list-time {
  font-size: 11px;
  color: var(--text-muted);
  flex-shrink: 0;
}

/* ── Tabs ── */

[data-theme="neumorphism"] .nm-tab-bar {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 14px;
  background: var(--bg);
  box-shadow: var(--nm-inset);
  margin-bottom: 24px;
  width: fit-content;
}

[data-theme="neumorphism"] .nm-tab {
  padding: 8px 18px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
color 0.18s ease, background 0.18s ease;
  outline: none;
  font-family: var(--font-body);
}

[data-theme="neumorphism"] .nm-tab:hover {
  color: var(--text);
}

[data-theme="neumorphism"] .nm-tab:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

[data-theme="neumorphism"] .nm-tab.active {
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  color: var(--accent);
  font-weight: 600;
}

/* ── Player-style card ── */

[data-theme="neumorphism"] .nm-player {
  background: var(--bg);
  border-radius: 20px;
  box-shadow: var(--nm-extrude-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

[data-theme="neumorphism"] .nm-player-art {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d0d7e4 0%, #c8d0de 100%);
  box-shadow: var(--nm-extrude);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  animation: nm-spin-slow 12s linear infinite;
}

[data-theme="neumorphism"] .nm-player-art.paused {
  animation-play-state: paused;
}

[data-theme="neumorphism"] .nm-player-info {
  text-align: center;
}

[data-theme="neumorphism"] .nm-player-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}

[data-theme="neumorphism"] .nm-player-sub {
  font-size: 12px;
  color: var(--text-muted);
}

[data-theme="neumorphism"] .nm-player-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

[data-theme="neumorphism"] .nm-player-track {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

[data-theme="neumorphism"] .nm-player-times {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-muted);
}

/* ── Sidebar Layout ── */

[data-theme="neumorphism"] .nm-sidebar {
  width: 200px;
  flex-shrink: 0;
  background: #e0e5ec;
  box-shadow: 4px 0 15px rgba(163, 177, 198, 0.4);
  display: flex;
  flex-direction: column;
  padding: 28px 0 20px;
  gap: 0;
  z-index: 1;
  position: relative;
}

[data-theme="neumorphism"] .nm-sidebar-header {
  padding: 0 20px 24px;
  border-bottom: 1px solid rgba(163, 177, 198, 0.25);
  margin-bottom: 12px;
}

[data-theme="neumorphism"] .nm-sidebar-logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 12px;
}

[data-theme="neumorphism"] .nm-sidebar-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.01em;
  line-height: 1;
  margin-bottom: 3px;
}

[data-theme="neumorphism"] .nm-sidebar-subtitle {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

[data-theme="neumorphism"] .nm-sidebar-section {
  padding: 0 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

[data-theme="neumorphism"] .nm-sidebar-group-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 12px 8px 4px;
  opacity: 0.7;
}

[data-theme="neumorphism"] .nm-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
color 0.18s ease, background 0.18s ease;
  outline: none;
  box-shadow: none;
}

[data-theme="neumorphism"] .nm-nav-item:hover {
  color: var(--text);
  box-shadow:
    3px 3px 6px rgba(163, 177, 198, 0.5),
    -3px -3px 6px rgba(255, 255, 255, 0.8);
  background: var(--bg);
}

[data-theme="neumorphism"] .nm-nav-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

[data-theme="neumorphism"] .nm-nav-item.active {
  color: var(--accent);
  font-weight: 600;
  box-shadow:
    inset 3px 3px 6px rgba(163, 177, 198, 0.5),
    inset -3px -3px 6px rgba(255, 255, 255, 0.8);
  background: var(--bg);
}

[data-theme="neumorphism"] .nm-nav-item-icon {
  font-size: 15px;
  flex-shrink: 0;
  width: 18px;
  text-align: center;
}

[data-theme="neumorphism"] .nm-nav-item-label {
  flex: 1;
}

[data-theme="neumorphism"] .nm-nav-badge {
  font-size: 10px;
  font-weight: 700;
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  padding: 1px 6px;
  flex-shrink: 0;
  box-shadow: 1px 1px 3px rgba(74, 144, 217, 0.4);
}

[data-theme="neumorphism"] .nm-sidebar-footer {
  padding: 16px 12px 0;
  border-top: 1px solid rgba(163, 177, 198, 0.25);
  margin-top: 8px;
}

[data-theme="neumorphism"] .nm-sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.18s ease;
}

[data-theme="neumorphism"] .nm-sidebar-user:hover {
  box-shadow:
    3px 3px 6px rgba(163, 177, 198, 0.5),
    -3px -3px 6px rgba(255, 255, 255, 0.8);
}

[data-theme="neumorphism"] .nm-sidebar-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

[data-theme="neumorphism"] .nm-sidebar-user-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
}

[data-theme="neumorphism"] .nm-sidebar-user-role {
  font-size: 10px;
  color: var(--text-muted);
}

[data-theme="neumorphism"] .nm-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 40px 40px;
}

/* ── Chips / Tags ── */

[data-theme="neumorphism"] .nm-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

[data-theme="neumorphism"] .nm-chip {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: var(--bg);
  box-shadow: var(--nm-extrude-sm);
  color: var(--text);
  cursor: default;
  transition: box-shadow 0.18s ease, color 0.18s ease;
52, 68, 0.7);
  --nm-shadow-dark:   rgba(10, 14, 20, 0.8);
  --nm-extrude:       6px 6px 14px var(--nm-shadow-dark), -6px -6px 14px var(--nm-shadow-light);
  --nm-extrude-lg:    10px 10px 24px var(--nm-shadow-dark), -10px -10px 24px var(--nm-shadow-light);
  --nm-extrude-sm:    3px 3px 8px var(--nm-shadow-dark), -3px -3px 8px var(--nm-shadow-light);
  --nm-inset:         inset 4px 4px 10px var(--nm-shadow-dark), inset -4px -4px 10px var(--nm-shadow-light);
  --nm-inset-sm:      inset 2px 2px 6px var(--nm-shadow-dark), inset -2px -2px 6px var(--nm-shadow-light);
}
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const NM_BG = "#e0e5ec";
const NM_EXTRUDE = "6px 6px 14px rgba(163,177,198,0.65), -6px -6px 14px rgba(255,255,255,0.85)";
const NM_EXTRUDE_LG = "10px 10px 24px rgba(163,177,198,0.65), -10px -10px 24px rgba(255,255,255,0.85)";
const NM_EXTRUDE_SM = "3px 3px 8px rgba(163,177,198,0.65), -3px -3px 8px rgba(255,255,255,0.85)";
const NM_INSET = "inset 4px 4px 10px rgba(163,177,198,0.65), inset -4px -4px 10px rgba(255,255,255,0.85)";
const NM_INSET_SM = "inset 2px 2px 6px rgba(163,177,198,0.65), inset -2px -2px 6px rgba(255,255,255,0.85)";

const NeumorphismShowcase: FC<{ layout?: string; colors?: any }> = ({ layout, colors }) => {
  const c = colors || defaultColors;
  const bg = c.bg || NM_BG;
  const text = c.text || "#31344b";
  const textMuted = c.textMuted || "#6b7080";
  const accent = c.accent || "#4d79ff";

  const card = (children: React.ReactNode, extra: React.CSSProperties = {}) => (
    <div style={{ background: bg, borderRadius: "16px", boxShadow: NM_EXTRUDE, padding: "24px", ...extra }}>
      {children}
    </div>
  );

  const sectionLabel = (label: string) => (
    <div style={{
      fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em",
      textTransform: "uppercase", color: textMuted,
      marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px",
    }}>
      <span style={{ flex: "0 0 24px", height: "1px", background: `linear-gradient(90deg, ${textMuted}44, transparent)`, display: "block" }} />
      {label}
      <span style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${textMuted}44)`, display: "block" }} />
    </div>
  );

  return (
    <div style={{
      background: bg, minHeight: "100%",
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: "40px", color: text,
    }}>

      {/* ── Header Panel ── */}
      <div style={{ marginBottom: "36px" }}>
        <div style={{
          background: bg, borderRadius: "20px", padding: "32px",
          boxShadow: NM_EXTRUDE_LG, marginBottom: "8px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "18px", background: bg,
              boxShadow: NM_EXTRUDE_LG, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "28px", flexShrink: 0,
              animation: "nm-float 4s ease-in-out infinite",
            }}>
              💿
            </div>
            <div>
              <h1 style={{ fontSize: "32px", fontWeight: 700, color: text, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "6px" }}>
                Soft UI Panel
              </h1>
              <p style={{ fontSize: "14px", color: textMuted }}>
                Extruded & inset shadows creating tactile physical depth
              </p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
              {["v3.0", "Stable", "MIT"].map((badge, i) => (
                <div key={i} style={{
                  padding: "6px 14px", borderRadius: "20px", fontSize: "11px",
                  fontWeight: 600, background: bg, boxShadow: NM_EXTRUDE_SM,
                  color: i === 1 ? accent : textMuted, letterSpacing: "0.04em",
                }}>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ marginBottom: "36px" }}>
        {sectionLabel("System Metrics")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "18px" }}>
          {[
            { icon: "📡", label: "Uptime", value: "99.9%", delta: "+0.1%", color: "#48bb78", dir: "up" },
            { icon: "⚡", label: "Latency", value: "12ms",  delta: "-3ms",  color: "#48bb78", dir: "up" },
            { icon: "💾", label: "Memory",  value: "4.2GB", delta: "+0.3GB", color: "#ed8936", dir: "down" },
            { icon: "🔥", label: "CPU",     value: "34%",   delta: "+8%",   color: "#fc8181", dir: "down" },
          ].map((s, i) => (
            <div key={i} className="nm-stat-card">
              <div className="nm-stat-icon">{s.icon}</div>
              <div className="nm-stat-label">{s.label}</div>
              <div className="nm-stat-value" style={{ fontSize: "26px" }}>{s.value}</div>
              <div className="nm-stat-delta" style={{ color: s.color }}>
                {s.dir === "up" ? "▲" : "▼"} {s.delta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Physical Device Panel + Toggles ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "36px" }}>

        {/* Device Panel */}
        {card(
          <>
            <div style={{ fontWeight: 600, fontSize: "13px", color: textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
              Control Panel
            </div>
            {/* Inset display */}
            <div style={{
              background: bg, borderRadius: "12px", padding: "16px 20px",
              boxShadow: NM_INSET, marginBottom: "20px",
              fontFamily: "'Courier New', monospace", fontSize: "13px", color: textMuted, lineHeight: 1.7,
            }}>
              <div style={{ color: accent, fontWeight: 600 }}>● SYSTEM ONLINE</div>
              <div>Temp: 42°C  |  Fan: 1240rpm</div>
              <div>Net: 82.4 Mb/s ↑  |  56.1 Mb/s ↓</div>
              <div style={{ color: "#48bb78" }}>All processes nominal</div>
            </div>

            {/* Circular knob-style meters */}
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "18px" }}>
              {[
                { label: "CPU", pct: 34, color: accent },
                { label: "MEM", pct: 68, color: "#7c6bdc" },
                { label: "DSK", pct: 51, color: "#48bb78" },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "70px", height: "70px", borderRadius: "50%",
                    background: bg, boxShadow: NM_EXTRUDE,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}>
                    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                      <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(163,177,198,0.3)" strokeWidth="4" />
                      <circle cx="35" cy="35" r="28" fill="none" stroke={m.color} strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 28 * m.pct / 100} ${2 * Math.PI * 28}`}
                        strokeLinecap="round" />
                    </svg>
                    <div style={{ position: "absolute", inset: "8px", borderRadius: "50%", background: bg, boxShadow: NM_INSET_SM, zIndex: 1 }} />
                    <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: text }}>{m.pct}%</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: 600, color: textMuted, letterSpacing: "0.08em" }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Extruded action buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{
                flex: 1, padding: "10px", background: bg, border: "none",
                borderRadius: "10px", boxShadow: NM_EXTRUDE_SM,
                color: accent, fontWeight: 600, fontSize: "12px",
                cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em",
              }}>
                RESTART
              </button>
              <button style={{
                flex: 1, padding: "10px",
                background: "linear-gradient(135deg, #5aa3e8 0%, #4a90d9 100%)",
                border: "none", borderRadius: "10px",
                boxShadow: "4px 4px 10px rgba(74,144,217,0.4), -2px -2px 8px rgba(255,255,255,0.6)",
                color: "#fff", fontWeight: 600, fontSize: "12px",
                cursor: "pointer", fontFamily: "inherit",
              }}>
                DEPLOY
              </button>
            </div>
          </>
        )}

        {/* Toggles & Sliders */}
        {card(
          <>
            <div style={{ fontWeight: 600, fontSize: "13px", color: textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
              Settings
            </div>

            {[
              { label: "Dark Mode", sub: "System preference", on: true },
              { label: "Notifications", sub: "Push & email", on: true },
              { label: "Auto Backup", sub: "Every 24 hours", on: false },
              { label: "Analytics", sub: "Anonymous data", on: true },
            ].map((t, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: text }}>{t.label}</div>
                    <div style={{ fontSize: "11px", color: textMuted, marginTop: "2px" }}>{t.sub}</div>
                  </div>
                  {/* Toggle */}
                  <div style={{
                    width: "52px", height: "27px", borderRadius: "14px",
                    background: bg,
                    boxShadow: t.on
                      ? `inset 3px 3px 8px rgba(74,144,217,0.2), inset -3px -3px 8px rgba(255,255,255,0.7)`
                      : NM_INSET_SM,
                    position: "relative", cursor: "pointer", flexShrink: 0,
                  }}>
                    <div style={{
                      position: "absolute", top: "3.5px", width: "20px", height: "20px",
                      borderRadius: "50%", transition: "left 0.2s, background 0.2s",
                      left: t.on ? "29px" : "4px",
                      background: t.on ? accent : "#c8cdd6",
                      boxShadow: t.on
                        ? `2px 2px 6px rgba(74,144,217,0.5), -1px -1px 4px rgba(255,255,255,0.6)`
                        : NM_EXTRUDE_SM,
                    }} />
                  </div>
                </div>
                {i < 3 && <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, rgba(163,177,198,0.3), transparent)` }} />}
              </div>
            ))}

            {/* Slider */}
            <div style={{ marginTop: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontSize: "13px", fontWeight: 500, color: text }}>Brightness</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: accent }}>72%</span>
              </div>
              <div style={{ position: "relative" }}>
                <input type="range" className="nm-range" defaultValue={72}
                  style={{
                    width: "100%", height: "8px", borderRadius: "4px",
                    background: bg, boxShadow: NM_INSET_SM,
                    WebkitAppearance: "none", appearance: "none", outline: "none", cursor: "pointer",
                  }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", marginTop: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: 500, color: text }}>Volume</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#7c6bdc" }}>58%</span>
              </div>
              <input type="range" className="nm-range" defaultValue={58}
                style={{
                  width: "100%", height: "8px", borderRadius: "4px",
                  background: bg, boxShadow: NM_INSET_SM,
                  WebkitAppearance: "none", appearance: "none", outline: "none", cursor: "pointer",
                }} />
            </div>
          </>
        )}
      </div>

      {/* ── Music Player ── */}
      <div style={{ marginBottom: "36px" }}>
        {sectionLabel("Now Playing")}
        <div style={{
          background: bg, borderRadius: "20px", boxShadow: NM_EXTRUDE_LG,
          padding: "28px", display: "flex", gap: "28px", alignItems: "center",
        }}>
          {/* Album art */}
          <div style={{
            width: "100px", height: "100px", borderRadius: "50%",
            background: "linear-gradient(135deg, #d0d7e4, #c8d0de)",
            boxShadow: NM_EXTRUDE,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "38px", flexShrink: 0,
            animation: "nm-spin-slow 12s linear infinite",
          }}>
            🎵
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "18px", fontWeight: 700, color: text, marginBottom: "4px" }}>
              Midnight Resonance
            </div>
            <div style={{ fontSize: "13px", color: textMuted, marginBottom: "16px" }}>
              Echo Chamber · Soft UI Sessions
            </div>

            {/* Progress track */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{
                height: "6px", borderRadius: "3px", background: bg,
                boxShadow: NM_INSET_SM, position: "relative", marginBottom: "6px",
              }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, height: "100%",
                  width: "38%", borderRadius: "3px",
                  background: `linear-gradient(90deg, ${accent}, #6ab4f5)`,
                  boxShadow: `0 1px 4px rgba(74,144,217,0.4)`,
                }} />
                <div style={{
                  position: "absolute", top: "50%", left: "38%",
                  width: "16px", height: "16px", borderRadius: "50%",
                  background: bg, boxShadow: NM_EXTRUDE_SM,
                  transform: "translate(-50%, -50%)", cursor: "pointer",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: textMuted }}>
                <span>1:24</span><span>3:47</span>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {["⏮", "⏪", "⏸", "⏩", "⏭"].map((ctrl, i) => (
                <button key={i} style={{
                  width: i === 2 ? "48px" : "38px",
                  height: i === 2 ? "48px" : "38px",
                  borderRadius: "50%", background: bg, border: "none",
                  boxShadow: i === 2 ? NM_EXTRUDE : NM_EXTRUDE_SM,
                  fontSize: i === 2 ? "18px" : "14px",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  color: i === 2 ? accent : textMuted,
                }}>
                  {ctrl}
                </button>
              ))}
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", color: textMuted }}>🔊</span>
                <div style={{ width: "80px", height: "6px", borderRadius: "3px", background: bg, boxShadow: NM_INSET_SM, position: "relative" }}>
                  <div style={{ width: "65%", height: "100%", borderRadius: "3px", background: `linear-gradient(90deg, ${accent}, #6ab4f5)` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Progress Bars + Icon Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "36px" }}>
        {/* Progress */}
        {card(
          <>
            <div style={{ fontWeight: 600, fontSize: "13px", color: textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
              Project Progress
            </div>
            {[
              { label: "Frontend", pct: 82, color: accent, cls: "" },
              { label: "Backend", pct: 64, color: "#7c6bdc", cls: "purple" },
              { label: "Testing", pct: 47, color: "#48bb78", cls: "green" },
              { label: "Deploy", pct: 23, color: "#ed8936", cls: "orange" },
            ].map((p, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? "18px" : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: text }}>{p.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: p.color }}>{p.pct}%</span>
                </div>
                <div style={{ height: "10px", borderRadius: "5px", background: bg, boxShadow: NM_INSET_SM, position: "relative" }}>
                  <div style={{
                    position: "absolute", left: 0, top: 0, height: "100%",
                    width: `${p.pct}%`, borderRadius: "5px",
                    background: `linear-gradient(90deg, ${p.color}, ${p.color}cc)`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3)`,
                  }}>
                    <div style={{ position: "absolute", inset: "0 20% 0 8px", height: "50%", top: 0, borderRadius: "5px 5px 0 0", background: "rgba(255,255,255,0.2)" }} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Icon grid */}
        {card(
          <>
            <div style={{ fontWeight: 600, fontSize: "13px", color: textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
              App Launcher
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
              {[
                { icon: "📊", name: "Analytics", active: true },
                { icon: "📧", name: "Mail" },
                { icon: "📅", name: "Calendar" },
                { icon: "📁", name: "Files" },
                { icon: "⚙️", name: "Settings" },
                { icon: "🔔", name: "Alerts" },
                { icon: "👤", name: "Profile" },
                { icon: "🔒", name: "Security" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: bg,
                    boxShadow: item.active ? NM_INSET_SM : NM_EXTRUDE,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px", cursor: "pointer",
                    color: item.active ? accent : "inherit",
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: 500, color: textMuted }}>{item.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Notification List ── */}
      <div style={{ marginBottom: "36px" }}>
        {sectionLabel("Recent Activity")}
        <div className="nm-list">
          {[
            { dot: "blue",   title: "Deployment succeeded",  sub: "main → production · 99.9% uptime", time: "2m ago" },
            { dot: "green",  title: "New user registered",   sub: "alex@company.io joined the workspace", time: "8m ago" },
            { dot: "purple", title: "PR #142 merged",        sub: "feat: neumorphic slider component", time: "22m ago" },
            { dot: "orange", title: "Memory warning",        sub: "Instance i-0abc reached 78% usage", time: "1h ago" },
          ].map((item, i) => (
            <div key={i} className="nm-list-item">
              <div className={`nm-list-dot ${item.dot}`} />
              <div className="nm-list-body">
                <div className="nm-list-title">{item.title}</div>
                <div className="nm-list-sub">{item.sub}</div>
              </div>
              <div className="nm-list-time">{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chips ── */}
      <div>
        {sectionLabel("Tags")}
        <div className="nm-chip-row">
          {["Extruded", "Inset", "Tactile", "Monochrome", "Soft Shadow", "Depth", "Material", "Physical UI", "Light Gray"].map((chip, i) => (
            <div key={i} style={{
              padding: "7px 16px", borderRadius: "20px", fontSize: "12px",
              fontWeight: 500, background: bg, boxShadow: NM_EXTRUDE_SM,
              color: i % 3 === 0 ? accent : i % 3 === 1 ? "#7c6bdc" : textMuted,
              cursor: "default",
            }}>
              {chip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#e0e5ec",
  sidebarBg: "#dde1e7",
  border:    "transparent",
  text:      "#31344b",
  textMuted: "#6b7080",
  accent:    "#4d79ff",
  cardBg:    "#e0e5ec",
  inputBg:   "#e0e5ec",
};

export const NeumorphismTheme: ThemeDefinition = {
  id: "neumorphism",
  name: "Neumorphism",
  emoji: "💿",
  description: "Soft UI with dual-tone extruded and inset shadows pressed into a monochromatic light-gray material — every element feels physically embedded.",
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
  Showcase: NeumorphismShowcase,
};
