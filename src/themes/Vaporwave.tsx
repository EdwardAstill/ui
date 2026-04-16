import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";
import { FeatureCard } from "../components/Layouts";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Inter:wght@300;400;500&display=swap');

/* ── Keyframes ── */

@keyframes vw-glitch {
  0%   { clip-path: inset(5% 0 90% 0);  transform: translate(-6px, 0); }
  10%  { clip-path: inset(60% 0 25% 0); transform: translate(6px, 0); }
  20%  { clip-path: inset(30% 0 55% 0); transform: translate(-4px, 0); }
  30%  { clip-path: inset(80% 0 5% 0);  transform: translate(4px, 0); }
  40%  { clip-path: inset(15% 0 70% 0); transform: translate(-3px, 0); }
  50%  { clip-path: inset(50% 0 35% 0); transform: translate(3px, 0); }
  60%  { clip-path: inset(75% 0 10% 0); transform: translate(-5px, 0); }
  70%  { clip-path: inset(40% 0 45% 0); transform: translate(5px, 0); }
  80%  { clip-path: inset(20% 0 65% 0); transform: translate(-2px, 0); }
  90%  { clip-path: inset(90% 0 2% 0);  transform: translate(2px, 0); }
  100% { clip-path: inset(0% 0 100% 0); transform: translate(0, 0); }
}

@keyframes vw-flicker {
  0%, 92%, 100% { opacity: 1; }
  93%            { opacity: 0.75; }
  94%            { opacity: 1; }
  96%            { opacity: 0.85; }
  97%            { opacity: 1; }
}

@keyframes vw-neon-pulse-pink {
  0%, 100% { box-shadow: 0 0 4px #ff71ce, 0 0 8px #ff71ce55; }
  50%       { box-shadow: 0 0 12px #ff71ce, 0 0 28px #ff71ceaa, 0 0 50px #ff71ce44; }
}

@keyframes vw-neon-pulse-cyan {
  0%, 100% { box-shadow: 0 0 4px #01cdfe, 0 0 8px #01cdfe55; }
  50%       { box-shadow: 0 0 12px #01cdfe, 0 0 28px #01cdfeaa, 0 0 50px #01cdfe44; }
}

@keyframes vw-neon-pulse-purple {
  0%, 100% { box-shadow: 0 0 4px #b967ff, 0 0 8px #b967ff55; }
  50%       { box-shadow: 0 0 12px #b967ff, 0 0 28px #b967ffaa, 0 0 50px #b967ff44; }
}

@keyframes vw-marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes vw-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

@keyframes vw-sun-stripe-scroll {
  0%   { background-position: 0 0; }
  100% { background-position: 0 40px; }
}

@keyframes vw-float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}

@keyframes vw-scanline {
  0%   { background-position: 0 0; }
  100% { background-position: 0 100%; }
}

@keyframes vw-eq-bar {
  0%, 100% { scaleY: 0.3; }
  50%       { scaleY: 1; }
}

/* ── Root Variables ── */

[data-theme="vaporwave"] {
  --bg:          #0d0221;
  --sidebar-bg:  #120330;
  --border:      #2a0a4a;
  --text:        #f0e6ff;
  --text-muted:  #7a5fa0;
  --accent:      #ff71ce;
  --accent-2:    #01cdfe;
  --accent-3:    #b967ff;
  --card-bg:     rgba(26, 5, 51, 0.85);
  --input-bg:    rgba(13, 2, 33, 0.9);
  --font-body:   'Inter', 'Segoe UI', sans-serif;
  --font-pixel:  'VT323', monospace;
  --font-press:  'Press Start 2P', monospace;
  --font-mono:   'VT323', monospace;
  --radius:      4px;
}

/* ── Root container ── */

[data-theme="vaporwave"] .vw-root {
  font-family: var(--font-body);
  color: var(--text);
  background: var(--bg);
  min-height: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow-x: hidden;
}

/* ── CRT scanline overlay ── */

[data-theme="vaporwave"] .vw-root::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.04) 2px,
    rgba(0, 0, 0, 0.04) 3px
  );
}

/* ─────────────── SIDEBAR ─────────────── */

[data-theme="vaporwave"] .vw-sidebar {
  width: 168px;
  flex-shrink: 0;
  background: #140428;
  border-right: 1px solid #ff71ce;
  box-shadow: 2px 0 12px #ff71ce44;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  z-index: 10;
}

/* Decorative gradient strip at top */
[data-theme="vaporwave"] .vw-sidebar-strip {
  height: 3px;
  background: linear-gradient(90deg, #ff71ce, #b967ff, #01cdfe, #ff71ce);
  flex-shrink: 0;
}

[data-theme="vaporwave"] .vw-sidebar-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 14px 0 12px;
  overflow-y: auto;
  overflow-x: hidden;
}

[data-theme="vaporwave"] .vw-sidebar-title {
  font-family: var(--font-press);
  font-size: 8px;
  letter-spacing: 0.1em;
  line-height: 1.4;
  background: linear-gradient(90deg, #ff71ce, #01cdfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  padding: 0 14px;
  margin-bottom: 4px;
  filter: drop-shadow(0 0 6px #ff71ce66);
}

[data-theme="vaporwave"] .vw-sidebar-jp {
  font-family: var(--font-pixel);
  font-size: 13px;
  letter-spacing: 0.25em;
  color: rgba(185, 103, 255, 0.4);
  padding: 0 14px;
  margin-bottom: 16px;
}

[data-theme="vaporwave"] .vw-sidebar-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 113, 206, 0.25), transparent);
  margin: 0 10px 12px;
}

[data-theme="vaporwave"] .vw-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  font-family: var(--font-pixel);
  font-size: 14px;
  letter-spacing: 0.08em;
  color: #5a3f78;
  cursor: pointer;
  border-left: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s, background 0.15s, text-shadow 0.15s;
  user-select: none;
}

[data-theme="vaporwave"] .vw-nav-item:hover {
  color: #ff71ce;
  text-shadow: 0 0 8px #ff71ce;
  border-left-color: #ff71ce;
  background: rgba(255, 113, 206, 0.06);
}

[data-theme="vaporwave"] .vw-nav-item.active {
  color: #ff71ce;
  text-shadow: 0 0 10px #ff71cecc, 0 0 20px #ff71ce44;
  border-left-color: #ff71ce;
  background: rgba(255, 113, 206, 0.1);
}

[data-theme="vaporwave"] .vw-nav-bullet {
  font-size: 12px;
  color: rgba(185, 103, 255, 0.55);
  flex-shrink: 0;
  transition: color 0.15s;
}

[data-theme="vaporwave"] .vw-nav-item:hover .vw-nav-bullet,
[data-theme="vaporwave"] .vw-nav-item.active .vw-nav-bullet {
  color: rgba(255, 113, 206, 0.75);
}

[data-theme="vaporwave"] .vw-sidebar-spacer {
  flex: 1;
}

[data-theme="vaporwave"] .vw-sidebar-ver {
  font-family: var(--font-press);
  font-size: 6px;
  letter-spacing: 0.08em;
  color: #ff71ce;
  text-shadow: 0 0 8px #ff71ce88;
  padding: 0 14px 4px;
  opacity: 0.8;
}

/* ─────────────── MAIN SCROLL AREA ─────────────── */

[data-theme="vaporwave"] .vw-main {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ─────────────── PERSPECTIVE GRID FLOOR ─────────────── */

[data-theme="vaporwave"] .vw-grid-stage {
  position: relative;
  height: 180px;
  overflow: hidden;
  margin-bottom: 0;
  background: linear-gradient(180deg, #0d0221 0%, #1a0533 60%, #2d0050 100%);
}

[data-theme="vaporwave"] .vw-grid-horizon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    180deg,
    #0d0221 0%,
    #1a0533 70%,
    #3d0066 100%
  );
}

[data-theme="vaporwave"] .vw-grid-floor {
  position: absolute;
  bottom: 0;
  left: -50%;
  right: -50%;
  height: 55%;
  transform-origin: 50% 0%;
  transform: perspective(300px) rotateX(65deg);
  background-image:
    linear-gradient(rgba(185, 103, 255, 0.7) 1px, transparent 1px),
    linear-gradient(90deg, rgba(185, 103, 255, 0.7) 1px, transparent 1px);
  background-size: 60px 60px;
  background-color: transparent;
}

/* ─────────────── RETRO SUN ─────────────── */

[data-theme="vaporwave"] .vw-sun-wrap {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 90px;
  z-index: 2;
  animation: vw-float 4s ease-in-out infinite;
}

[data-theme="vaporwave"] .vw-sun {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow:
    0 0 0 2px #ff71ce44,
    0 0 24px #ff71ce88,
    0 0 60px #b967ff55;
}

/* Top half: solid gradient orange→pink */
[data-theme="vaporwave"] .vw-sun-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, #ffe033 0%, #ff8c00 40%, #ff71ce 100%);
}

/* Bottom half: horizontal stripe mask (the classic vaporwave sun stripes) */
[data-theme="vaporwave"] .vw-sun-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, #ff71ce 0%, #b967ff 100%);
  /* Stripe mask via repeating-linear-gradient over the background */
  -webkit-mask-image: repeating-linear-gradient(
    180deg,
    black 0px,
    black 4px,
    transparent 4px,
    transparent 8px,
    black 8px,
    black 10px,
    transparent 10px,
    transparent 15px,
    black 15px,
    black 16px,
    transparent 16px,
    transparent 22px,
    black 22px,
    black 23px,
    transparent 23px,
    transparent 30px,
    black 30px,
    black 31px,
    transparent 31px,
    transparent 40px,
    black 40px,
    black 45px
  );
  mask-image: repeating-linear-gradient(
    180deg,
    black 0px,
    black 4px,
    transparent 4px,
    transparent 8px,
    black 8px,
    black 10px,
    transparent 10px,
    transparent 15px,
    black 15px,
    black 16px,
    transparent 16px,
    transparent 22px,
    black 22px,
    black 23px,
    transparent 23px,
    transparent 30px,
    black 30px,
    black 31px,
    transparent 31px,
    transparent 40px,
    black 40px,
    black 45px
  );
}

/* ─────────────── MARQUEE ─────────────── */

[data-theme="vaporwave"] .vw-marquee-wrap {
  overflow: hidden;
  background: rgba(185, 103, 255, 0.12);
  border-top: 1px solid rgba(185, 103, 255, 0.4);
  border-bottom: 1px solid rgba(255, 113, 206, 0.4);
  height: 32px;
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

[data-theme="vaporwave"] .vw-marquee-inner {
  display: flex;
  white-space: nowrap;
  animation: vw-marquee 28s linear infinite;
  gap: 0;
}

[data-theme="vaporwave"] .vw-marquee-item {
  padding: 0 24px;
  font-family: var(--font-pixel);
  font-size: 18px;
  letter-spacing: 0.15em;
  color: var(--accent-2);
  border-right: 1px solid rgba(185, 103, 255, 0.3);
}

[data-theme="vaporwave"] .vw-marquee-item.jp {
  color: #ff71ce;
}

[data-theme="vaporwave"] .vw-marquee-item.pu {
  color: var(--accent-3);
}

/* ─────────────── HEADER ─────────────── */

[data-theme="vaporwave"] .vw-header {
  padding: 28px 32px 20px;
  text-align: center;
  position: relative;
}

[data-theme="vaporwave"] .vw-header-sub {
  font-family: var(--font-pixel);
  font-size: 20px;
  letter-spacing: 0.3em;
  color: var(--accent-3);
  margin-bottom: 6px;
  text-shadow: 0 0 10px #b967ff88;
}

[data-theme="vaporwave"] .vw-header-title {
  font-family: var(--font-press);
  font-size: 28px;
  line-height: 1.3;
  letter-spacing: 0.05em;
  position: relative;
  display: inline-block;
  cursor: default;
  /* Gradient
#ff71ce 0%, #b967ff 50%, #01cdfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 10px #ff71ce66) drop-shadow(0 0 20px #b967ff44);
  animation: vw-flicker 15s infinite;
}

/* Chromatic aberration glitch on hover */
[data-theme="vaporwave"] .vw-header-title::before,
[data-theme="vaporwave"] .vw-header-title::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  font-family: var(--font-press);
  font-size: 28px;
  line-height: 1.3;
  letter-spacing: 0.05em;
  background: none;
  -webkit-text-fill-color: initial;
  opacity: 0;
  pointer-events: none;
}

[data-theme="vaporwave"] .vw-header-title:hover::before {
  opacity: 0.8;
  color: #ff0055;
  animation: vw-glitch 0.35s steps(1) infinite;
  mix-blend-mode: screen;
}

[data-theme="vaporwave"] .vw-header-title:hover::after {
  opacity: 0.7;
  color: #00ffff;
  animation: vw-glitch 0.35s steps(1) infinite reverse;
  animation-delay: 0.06s;
  mix-blend-mode: screen;
}

[data-theme="vaporwave"] .vw-header-tagline {
  font-family: var(--font-pixel);
  font-size: 16px;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  margin-top: 8px;
}

/* ─────────────── SECTION LABEL ─────────────── */

[data-theme="vaporwave"] .vw-section-label {
  font-family: var(--font-pixel);
  font-size: 14px;
  letter-spacing: 0.25em;
  color: var(--accent);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 0 0 8px #ff71ce88;
}

[data-theme="vaporwave"] .vw-section-label::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 2px;
  background: linear-gradient(90deg, #ff71ce, transparent);
  box-shadow: 0 0 6px #ff71ce;
}

[data-theme="vaporwave"] .vw-section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 113, 206, 0.3), transparent);
}

/* ─────────────── CONTENT PANEL ─────────────── */

[data-theme="vaporwave"] .vw-content {
  padding: 24px 32px 48px;
}

/* ─────────────── STAT CARDS ─────────────── */

[data-theme="vaporwave"] .vw-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 32px;
}

[data-theme="vaporwave"] .vw-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 32px;
}

[data-theme="vaporwave"] .vw-card {
  background: var(--card-bg);
103, 255, 0.35);
  border-radius: var(--radius);
  padding: 20px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: box-shadow 0.2s, border-color 0.2s;
}

[data-theme="vaporwave"] .vw-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff71ce, #b967ff, #01cdfe, transparent);
  opacity: 0.7;
}

[data-theme="vaporwave"] .vw-card:hover {
  border-color: rgba(255, 113, 206, 0.6);
  box-shadow: 0 0 18px rgba(185, 103, 255, 0.3), inset 0 0 18px rgba(185, 103, 255, 0.06);
}

[data-theme="vaporwave"] .vw-card-label {
  font-family: var(--font-pixel);
  font-size: 14px;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  margin-bottom: 8px;
}

[data-theme="vaporwave"] .vw-card-value {
  font-family: var(--font-pixel);
  font-size: 36px;
  line-height: 1;
  letter-spacing: 0.05em;
  background: linear-gradient(90deg, #ff71ce, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 6px #ff71ce66);
  margin-bottom: 4px;
}

[data-theme="vaporwave"] .vw-card-value.cyan {
  background: linear-gradient(90deg, #01cdfe, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 6px #01cdfe66);
}

[data-theme="vaporwave"] .vw-card-sub {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

/* Neon border card variants */
[data-theme="vaporwave"] .vw-card.pink {
  border-color: rgba(255, 113, 206, 0.6);
  animation: vw-neon-pulse-pink 3s ease-in-out infinite;
}

[data-theme="vaporwave"] .vw-card.cyan-glow {
  border-color: rgba(1, 205, 254, 0.6);
  animation: vw-neon-pulse-cyan 3s ease-in-out infinite;
}

[data-theme="vaporwave"] .vw-card.purple-glow {
  border-color: rgba(185, 103, 255, 0.6);
  animation: vw-neon-pulse-purple 3s ease-in-out infinite;
}

/* ─────────────── VHS BADGE / LABEL ─────────────── */

[data-theme="vaporwave"] .vw-vhs-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(13, 2, 33, 0.9);
113, 206, 0.5);
  border-radius: 2px;
  padding: 4px 12px;
  font-family: var(--font-pixel);
  font-size: 13px;
  letter-spacing: 0.2em;
  color: #ff71ce;
  text-shadow: 0 0 6px #ff71ce;
  box-shadow: inset 0 0 8px rgba(255, 113, 206, 0.1);
  animation: vw-neon-pulse-pink 2.5s ease-in-out infinite;
}

[data-theme="vaporwave"] .vw-vhs-badge::before {
  content: '▶';
  font-size: 10px;
  color: #ff71ce;
}

[data-theme="vaporwave"] .vw-cassette {
  background: linear-gradient(135deg, rgba(20, 5, 40, 0.95) 0%, rgba(13, 2, 33, 0.95) 100%);
103, 255, 0.5);
  border-radius: 4px;
  padding: 16px 20px;
  position: relative;
  overflow: hidden;
}

/* The "reel windows" on a cassette tape */
[data-theme="vaporwave"] .vw-cassette::before {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 20px;
  width: 28px;
  height: 28px;
103, 255, 0.4);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(185, 103, 255, 0.3);
}

[data-theme="vaporwave"] .vw-cassette::after {
  content: '';
  position: absolute;
  bottom: 8px;
  right: 20px;
  width: 28px;
  height: 28px;
103, 255, 0.4);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(185, 103, 255, 0.3);
}

[data-theme="vaporwave"] .vw-cassette-label {
  text-align: center;
  padding-bottom: 40px;
}

[data-theme="vaporwave"] .vw-cassette-title {
  font-family: var(--font-pixel);
  font-size: 22px;
  letter-spacing: 0.2em;
  background: linear-gradient(90deg, #ff71ce, #01cdfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: block;
  margin-bottom: 4px;
}

[data-theme="vaporwave"] .vw-cassette-side {
  font-family: var(--font-pixel);
  font-size: 13px;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}

/* ─────────────── BUTTONS ─────────────── */

[data-theme="vaporwave"] .vw-btn-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 0;
}

[data-theme="vaporwave"] .vw-btn {
  font-family: var(--font-pixel);
  font-size: 14px;
  letter-spacing: 0.15em;
  padding: 10px 22px;
box-shadow 0.15s, color 0.15s, text-shadow 0.15s;
  position: relative;
  text-shadow: 0 0 6px #ff71ce88;
}

/* Chromatic aberration on hover — red/blue offset via filter */
[data-theme="vaporwave"] .vw-btn:hover {
  background: rgba(255, 113, 206, 0.1);
  box-shadow: 0 0 14px #ff71ceaa, inset 0 0 10px rgba(255, 113, 206, 0.1);
  filter: drop-shadow(-2px 0 0 rgba(0,200,255,0.6)) drop-shadow(2px 0 0 rgba(255,0,100,0.6));
}

[data-theme="vaporwave"] .vw-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

[data-theme="vaporwave"] .vw-btn:active {
  transform: scale(0.97);
}

[data-theme="vaporwave"] .vw-btn.cyan {
  border-color: #01cdfe;
  color: #01cdfe;
  text-shadow: 0 0 6px #01cdfe88;
}

[data-theme="vaporwave"] .vw-btn.cyan:hover {
  background: rgba(1, 205, 254, 0.1);
  box-shadow: 0 0 14px #01cdfeaa, inset 0 0 10px rgba(1, 205, 254, 0.1);
  filter: drop-shadow(-2px 0 0 rgba(255,0,200,0.6)) drop-shadow(2px 0 0 rgba(0,200,255,0.6));
}

[data-theme="vaporwave"] .vw-btn.purple {
  border-color: #b967ff;
  color: #b967ff;
  text-shadow: 0 0 6px #b967ff88;
}

[data-theme="vaporwave"] .vw-btn.purple:hover {
  background: rgba(185, 103, 255, 0.1);
  box-shadow: 0 0 14px #b967ffaa;
  filter: drop-shadow(-2px 0 0 rgba(255,0,200,0.5)) drop-shadow(2px 0 0 rgba(0,200,255,0.5));
}

/* Dream button — gradient fill */
[data-theme="vaporwave"] .vw-btn-dream {
  font-family: var(--font-pixel);
  font-size: 14px;
  letter-spacing: 0.15em;
  padding: 12px 28px;
#ff71ce, #b967ff, #01cdfe);
  background-size: 200% 100%;
  color: #fff;
  cursor: pointer;
  transition: filter 0.2s, transform 0.1s, background-position 0.4s;
  filter: drop-shadow(0 0 8px #b967ffaa);
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
}

[data-theme="vaporwave"] .vw-btn-dream:hover {
  filter: drop-shadow(0 0 16px #ff71ce) brightness(1.15);
  background-position: 100% 0;
}

[data-theme="vaporwave"] .vw-btn-dream:focus-visible {
  outline: 2px solid #ff71ce;
  outline-offset: 3px;
}

[data-theme="vaporwave"] .vw-btn-dream:active {
  transform: scale(0.97);
}

/* ─────────────── FORM INPUTS ─────────────── */

[data-theme="vaporwave"] .vw-input {
  font-family: var(--font-pixel);
  font-size: 15px;
  letter-spacing: 0.08em;
  color: var(--text);
  background: var(--input-bg);
103, 255, 0.4);
  border-radius: var(--radius);
  padding: 9px 14px;
  width: 100%;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

[data-theme="vaporwave"] .vw-input:focus {
  border-color: #ff71ce;
  box-shadow: 0 0 0 2px rgba(255, 113, 206, 0.2), 0 0 8px rgba(255, 113, 206, 0.3);
}

[data-theme="vaporwave"] .vw-input::placeholder {
  color: rgba(122, 95, 160, 0.7);
  font-family: var(--font-pixel);
}

[data-theme="vaporwave"] .vw-label {
  display: block;
  font-family: var(--font-pixel);
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  margin-bottom: 6px;
  text-transform: uppercase;
}

[data-theme="vaporwave"] .vw-form-group {
  margin-bottom: 14px;
}

/* ─────────────── COLOR PALETTE ─────────────── */

[data-theme="vaporwave"] .vw-palette {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 0;
}

[data-theme="vaporwave"] .vw-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

[data-theme="vaporwave"] .vw-swatch-color {
  width: 52px;
  height: 52px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
  transition: transform 0.15s, box-shadow 0.15s;
  cursor: default;
}

[data-theme="vaporwave"] .vw-swatch-color:hover {
  transform: scale(1.1) translateY(-3px);
}

[data-theme="vaporwave"] .vw-swatch-hex {
  font-family: var(--font-pixel);
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

/* ─────────────── JAPANESE AESTHETIC STRIP ─────────────── */

[data-theme="vaporwave"] .vw-jp-strip {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  flex-wrap: wrap;
}

[data-theme="vaporwave"] .vw-jp-char {
  font-family: var(--font-pixel);
  font-size: 28px;
  color: rgba(185, 103, 255, 0.6);
  text-shadow: 0 0 12px rgba(185, 103, 255, 0.5);
  letter-spacing: 0.1em;
  transition: color 0.2s, text-shadow 0.2s;
  cursor: default;
}

[data-theme="vaporwave"] .vw-jp-char:hover {
  color: #ff71ce;
  text-shadow: 0 0 16px #ff71ceaa;
}

/* ─────────────── GRADIENT DIVIDER ─────────────── */

[data-theme="vaporwave"] .vw-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff71ce44, #b967ff66, #01cdfe44, transparent);
  margin: 28px 0;
}

/* ─────────────── TRACK LIST (music aesthetic) ─────────────── */

[data-theme="vaporwave"] .vw-tracklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

[data-theme="vaporwave"] .vw-track {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: var(--radius);
  transition: background 0.15s;
  cursor: default;
}

[data-theme="vaporwave"] .vw-track:hover {
  background: rgba(185, 103, 255, 0.1);
}

[data-theme="vaporwave"] .vw-track-num {
  font-family: var(--font-pixel);
  font-size: 13px;
  color: var(--text-muted);
  width: 20px;
  text-align: right;
  flex-shrink: 0;
}

[data-theme="vaporwave"] .vw-track-title {
  font-family: var(--font-pixel);
  font-size: 15px;
  color: var(--text);
  flex: 1;
  letter-spacing: 0.05em;
}

[data-theme="vaporwave"] .vw-track-jp {
  font-size: 13px;
  color: var(--accent-3);
  letter-spacing: 0.1em;
  flex-shrink: 0;
}

[data-theme="vaporwave"] .vw-track-dur {
  font-family: var(--font-pixel);
  font-size: 13px;
  color: var(--text-muted);
  flex-shrink: 0;
}

/* ─────────────── MISC ─────────────── */

[data-theme="vaporwave"] .vw-mb-8  { margin-bottom: 8px; }
[data-theme="vaporwave"] .vw-mb-14 { margin-bottom: 14px; }
[data-theme="vaporwave"] .vw-mb-24 { margin-bottom: 24px; }
[data-theme="vaporwave"] .vw-mb-32 { margin-bottom: 32px; }

[data-theme="vaporwave"] .vw-text-gradient {
  background: linear-gradient(90deg, #ff71ce, #b967ff, #01cdfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* ── LIGHT MODE (pastel vaporwave) ── */
[data-theme="vaporwave"][data-mode="light"] {
  --bg: #fce4f8;
  --sidebar-bg: #f4d0f0;
  --border: #e0a0e0;
  --text: #3a1050;
  --text-muted: #9060a0;
  --card-bg: #faf0fc;
  --input-bg: #f8eafc;
}
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const VaporwaveShowcase: FC<{ layout?: string; colors?: any }> = ({ layout, colors }) => {
  const c = colors || defaultColors;

  const cardStyle: React.CSSProperties = {
    background: "rgba(26, 5, 51, 0.85)",
    border: "1px solid rgba(185,103,255,0.35)",
    borderRadius: "4px",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
  };

  const glowLine: React.CSSProperties = {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, #ff71ce, #b967ff, #01cdfe, transparent)",
    opacity: 0.7,
  };

  const pixelFont: React.CSSProperties = { fontFamily: "'VT323', monospace" };
  const pressFont: React.CSSProperties = { fontFamily: "'Press Start 2P', monospace" };

  return (
    <div style={{
      background: "#0d0221",
      minHeight: "100%",
      color: "#f0e6ff",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* ── CRT scanline overlay ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 3px)",
      }} />

      {/* ── Perspective Grid Stage ── */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "linear-gradient(180deg, #0d0221 0%, #1a0533 60%, #2d0050 100%)" }}>
        {/* Sky gradient */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg, #0d0221 0%, #1a0533 70%, #3d0066 100%)" }} />
        {/* Grid floor */}
        <div style={{
          position: "absolute", bottom: 0, left: "-50%", right: "-50%", height: "60%",
          transformOrigin: "50% 0%", transform: "perspective(300px) rotateX(65deg)",
          backgroundImage: "linear-gradient(rgba(185,103,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(185,103,255,0.7) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Retro Sun */}
        <div style={{
          position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)",
          width: "90px", height: "90px", zIndex: 2,
          animation: "vw-float 4s ease-in-out infinite",
        }}>
          <div style={{
            width: "90px", height: "90px", borderRadius: "50%", overflow: "hidden",
            boxShadow: "0 0 0 2px #ff71ce44, 0 0 24px #ff71ce88, 0 0 60px #b967ff55",
          }}>
            <div style={{ height: "50%", background: "linear-gradient(180deg, #ffe033 0%, #ff8c00 40%, #ff71ce 100%)" }} />
            <div style={{
              height: "50%",
              background: "linear-gradient(180deg, #ff71ce 0%, #b967ff 100%)",
              WebkitMaskImage: "repeating-linear-gradient(180deg, black 0px, black 4px, transparent 4px, transparent 8px, black 8px, black 10px, transparent 10px, transparent 15px, black 15px, black 16px, transparent 16px, transparent 22px, black 22px, black 23px, transparent 23px, transparent 30px, black 30px, black 31px, transparent 31px, transparent 40px)",
              maskImage: "repeating-linear-gradient(180deg, black 0px, black 4px, transparent 4px, transparent 8px, black 8px, black 10px, transparent 10px, transparent 15px, black 15px, black 16px, transparent 16px, transparent 22px, black 22px, black 23px, transparent 23px, transparent 30px, black 30px, black 31px, transparent 31px, transparent 40px)",
            }} />
          </div>
        </div>
        {/* Palm trees */}
        <div style={{ position: "absolute", bottom: "12px", left: "12%", fontSize: "40px", zIndex: 3 }}>🌴</div>
        <div style={{ position: "absolute", bottom: "12px", right: "12%", fontSize: "40px", zIndex: 3, transform: "scaleX(-1)" }}>🌴</div>
      </div>

      {/* ── Marquee ── */}
      <div style={{
        overflow: "hidden", background: "rgba(185,103,255,0.12)",
        borderTop: "1px solid rgba(185,103,255,0.4)",
        borderBottom: "1px solid rgba(255,113,206,0.4)",
        height: "32px", display: "flex", alignItems: "center",
      }}>
        <div style={{ display: "flex", animation: "vw-marquee 28s linear infinite", whiteSpace: "nowrap" }}>
          {["DREAM WAVE", "夢の波", "CYBER CITY", "サイバー都市", "NEON NIGHTS", "ネオンの夜", "RETRO FUTURE", "レトロフューチャー",
            "DREAM WAVE", "夢の波", "CYBER CITY", "サイバー都市", "NEON NIGHTS", "ネオンの夜", "RETRO FUTURE", "レトロフューチャー"].map((item, i) => (
            <span key={i} style={{
              ...pixelFont, fontSize: "18px", letterSpacing: "0.15em",
              padding: "0 24px",
              borderRight: "1px solid rgba(185,103,255,0.3)",
              color: i % 3 === 0 ? "#01cdfe" : i % 3 === 1 ? "#ff71ce" : "#b967ff",
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", padding: "28px 32px 8px" }}>
        <div style={{ ...pixelFont, fontSize: "20px", letterSpacing: "0.3em", color: "#b967ff", marginBottom: "6px", textShadow: "0 0 10px #b967ff88" }}>
          ヴェイパーウェイブ
        </div>
        <h1 style={{
          ...pressFont, fontSize: "clamp(16px, 3vw, 28px)",
          background: "linear-gradient(90deg, #ff71ce 0%, #b967ff 50%, #01cdfe 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          filter: "drop-shadow(0 0 10px #ff71ce66) drop-shadow(0 0 20px #b967ff44)",
          animation: "vw-flicker 15s infinite",
          marginBottom: "8px",
        }}>
          DREAM MACHINE
        </h1>
        <div style={{ ...pixelFont, fontSize: "16px", letterSpacing: "0.2em", color: "#7a5fa0" }}>
          AESTHETIC · NOSTALGIA · FUTURE
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ padding: "20px 32px 48px" }}>

        {/* ── Stat Cards ── */}
        <div style={{ ...pixelFont, fontSize: "14px", letterSpacing: "0.25em", color: "#ff71ce", marginBottom: "14px", textShadow: "0 0 8px #ff71ce88", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "16px", height: "2px", background: "linear-gradient(90deg, #ff71ce, transparent)", boxShadow: "0 0 6px #ff71ce", display: "inline-block" }} />
          SYSTEM STATUS
          <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(255,113,206,0.3), transparent)", display: "inline-block" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "28px" }}>
          {[
            { label: "VISITORS", value: "84.2K", sub: "+12% this week", cls: "pink" },
            { label: "STREAMS", value: "1.2M", sub: "All time plays", cls: "cyan-glow" },
            { label: "VIBES", value: "∞", sub: "Maximum aesthetic", cls: "purple-glow" },
          ].map((s, i) => (
            <div key={i} style={{
              ...cardStyle,
              boxShadow: i === 0 ? "0 0 12px #ff71ce55" : i === 1 ? "0 0 12px #01cdfe55" : "0 0 12px #b967ff55",
              borderColor: i === 0 ? "rgba(255,113,206,0.6)" : i === 1 ? "rgba(1,205,254,0.6)" : "rgba(185,103,255,0.6)",
            }}>
              <div style={glowLine} />
              <div style={{ ...pixelFont, fontSize: "14px", letterSpacing: "0.15em", color: "#7a5fa0", marginBottom: "8px" }}>{s.label}</div>
              <div style={{
                ...pixelFont, fontSize: "36px", lineHeight: 1,
                background: i === 0 ? "linear-gradient(90deg, #ff71ce, #b967ff)" : i === 1 ? "linear-gradient(90deg, #01cdfe, #b967ff)" : "linear-gradient(90deg, #b967ff, #ff71ce)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 6px ${i === 0 ? "#ff71ce" : i === 1 ? "#01cdfe" : "#b967ff"}66)`,
                marginBottom: "4px",
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: "11px", color: "#7a5fa0", letterSpacing: "0.05em" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Cassette + Now Playing ── */}
        <div style={{ ...pixelFont, fontSize: "14px", letterSpacing: "0.25em", color: "#ff71ce", marginBottom: "14px", textShadow: "0 0 8px #ff71ce88", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "16px", height: "2px", background: "linear-gradient(90deg, #ff71ce, transparent)", display: "inline-block" }} />
          NOW PLAYING
          <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(255,113,206,0.3), transparent)", display: "inline-block" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "28px" }}>
          {/* Cassette card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(20,5,40,0.95), rgba(13,2,33,0.95))",
            border: "1px solid rgba(185,103,255,0.5)",
            borderRadius: "4px", padding: "20px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={glowLine} />
            <div style={{ textAlign: "center", paddingBottom: "44px" }}>
              <span style={{
                ...pixelFont, fontSize: "22px", letterSpacing: "0.2em",
                background: "linear-gradient(90deg, #ff71ce, #01cdfe)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                display: "block", marginBottom: "4px",
              }}>
                SUNSET DRIVE
              </span>
              <span style={{ ...pixelFont, fontSize: "13px", letterSpacing: "0.15em", color: "#7a5fa0" }}>SIDE A · 1984</span>
            </div>
            {/* Cassette reels */}
            <div style={{ position: "absolute", bottom: "10px", left: "22px", width: "30px", height: "30px", borderRadius: "50%", border: "2px solid rgba(185,103,255,0.4)", boxShadow: "0 0 6px rgba(185,103,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(185,103,255,0.4)" }} />
            </div>
            <div style={{ position: "absolute", bottom: "10px", right: "22px", width: "30px", height: "30px", borderRadius: "50%", border: "2px solid rgba(185,103,255,0.4)", boxShadow: "0 0 6px rgba(185,103,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(185,103,255,0.4)" }} />
            </div>
          </div>

          {/* Track list */}
          <div style={cardStyle}>
            <div style={glowLine} />
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
              {[
                { n: "01", title: "CITY LIGHTS", jp: "都市の光", dur: "4:22", active: true },
                { n: "02", title: "NEON RAIN", jp: "ネオン雨", dur: "3:58" },
                { n: "03", title: "CHROME BEACH", jp: "クロームビーチ", dur: "5:11" },
                { n: "04", title: "SUNSET MALL", jp: "夕日モール", dur: "4:05" },
                { n: "05", title: "RETRO WAVE", jp: "レトロ波", dur: "6:33" },
              ].map((t, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "7px 10px", borderRadius: "4px",
                  background: t.active ? "rgba(185,103,255,0.15)" : "transparent",
                  cursor: "default",
                }}>
                  <span style={{ ...pixelFont, fontSize: "13px", color: t.active ? "#ff71ce" : "#7a5fa0", width: "20px", textAlign: "right", flexShrink: 0 }}>
                    {t.active ? "▶" : t.n}
                  </span>
                  <span style={{ ...pixelFont, fontSize: "14px", color: t.active ? "#f0e6ff" : "#a080c0", flex: 1, letterSpacing: "0.05em" }}>{t.title}</span>
                  <span style={{ ...pixelFont, fontSize: "12px", color: "#b967ff", letterSpacing: "0.1em", flexShrink: 0 }}>{t.jp}</span>
                  <span style={{ ...pixelFont, fontSize: "12px", color: "#7a5fa0", flexShrink: 0 }}>{t.dur}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── VHS Buttons row ── */}
        <div style={{ ...pixelFont, fontSize: "14px", letterSpacing: "0.25em", color: "#ff71ce", marginBottom: "14px", textShadow: "0 0 8px #ff71ce88", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "16px", height: "2px", background: "linear-gradient(90deg, #ff71ce, transparent)", display: "inline-block" }} />
          CONTROLS
          <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(255,113,206,0.3), transparent)", display: "inline-block" }} />
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
          {[
            { label: "▶ PLAY", color: "#ff71ce", border: "#ff71ce" },
            { label: "⏸ PAUSE", color: "#01cdfe", border: "#01cdfe" },
            { label: "⏹ STOP", color: "#b967ff", border: "#b967ff" },
            { label: "⏮ REWIND", color: "#ff71ce", border: "#ff71ce" },
            { label: "⏭ FF", color: "#01cdfe", border: "#01cdfe" },
          ].map((btn, i) => (
            <button key={i} style={{
              ...pixelFont, fontSize: "13px", letterSpacing: "0.15em",
              padding: "10px 20px", background: "transparent",
              border: `1px solid ${btn.border}`, borderRadius: "2px",
              color: btn.color, textShadow: `0 0 6px ${btn.color}88`,
              cursor: "pointer",
              boxShadow: `0 0 4px ${btn.border}44`,
            }}>
              {btn.label}
            </button>
          ))}
          <button style={{
            ...pixelFont, fontSize: "13px", letterSpacing: "0.15em",
            padding: "10px 24px",
            background: "linear-gradient(90deg, #ff71ce, #b967ff, #01cdfe)",
            backgroundSize: "200% 100%",
            border: "none", borderRadius: "2px",
            color: "#fff", cursor: "pointer",
            filter: "drop-shadow(0 0 8px #b967ffaa)",
          }}>
            ★ DREAM MODE
          </button>
        </div>

        {/* ── Color Swatches + Japanese characters ── */}
        <div style={{ ...pixelFont, fontSize: "14px", letterSpacing: "0.25em", color: "#ff71ce", marginBottom: "14px", textShadow: "0 0 8px #ff71ce88", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "16px", height: "2px", background: "linear-gradient(90deg, #ff71ce, transparent)", display: "inline-block" }} />
          PALETTE
          <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(255,113,206,0.3), transparent)", display: "inline-block" }} />
        </div>
        <div style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
          {[
            { color: "#ff71ce", label: "#FF71CE", glow: "#ff71ce" },
            { color: "#b967ff", label: "#B967FF", glow: "#b967ff" },
            { color: "#01cdfe", label: "#01CDFE", glow: "#01cdfe" },
            { color: "#ffe033", label: "#FFE033", glow: "#ffe033" },
            { color: "#05ffa1", label: "#05FFA1", glow: "#05ffa1" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "4px", background: s.color,
                boxShadow: `0 0 10px ${s.glow}88, 0 0 20px ${s.glow}44`,
                cursor: "default",
              }} />
              <span style={{ ...pixelFont, fontSize: "11px", color: "#7a5fa0" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Japanese characters */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", padding: "12px 0", flexWrap: "wrap", marginBottom: "28px" }}>
          {["夢", "波", "光", "星", "空", "海", "愛", "音"].map((char, i) => (
            <span key={i} style={{
              ...pixelFont, fontSize: "28px",
              color: "rgba(185,103,255,0.6)",
              textShadow: "0 0 12px rgba(185,103,255,0.5)",
              letterSpacing: "0.1em", cursor: "default",
            }}>
              {char}
            </span>
          ))}
        </div>

        {/* ── Divider ── */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #ff71ce44, #b967ff66, #01cdfe44, transparent)", margin: "0 0 28px" }} />

        {/* ── Form inputs ── */}
        <div style={{ ...pixelFont, fontSize: "14px", letterSpacing: "0.25em", color: "#ff71ce", marginBottom: "14px", textShadow: "0 0 8px #ff71ce88", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "16px", height: "2px", background: "linear-gradient(90deg, #ff71ce, transparent)", display: "inline-block" }} />
          ENTER THE GRID
          <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(255,113,206,0.3), transparent)", display: "inline-block" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div>
            <label style={{ ...pixelFont, fontSize: "12px", letterSpacing: "0.2em", color: "#7a5fa0", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
              HANDLE
            </label>
            <input placeholder="@neonrider" style={{
              ...pixelFont, fontSize: "15px", letterSpacing: "0.08em",
              background: "rgba(13,2,33,0.9)",
              border: "1px solid rgba(185,103,255,0.4)", borderRadius: "4px",
              padding: "9px 14px", width: "100%", outline: "none",
              color: "#f0e6ff", boxSizing: "border-box",
            }} />
          </div>
          <div>
            <label style={{ ...pixelFont, fontSize: "12px", letterSpacing: "0.2em", color: "#7a5fa0", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
              WAVE FREQ
            </label>
            <input placeholder="84.2 MHz" style={{
              ...pixelFont, fontSize: "15px", letterSpacing: "0.08em",
              background: "rgba(13,2,33,0.9)",
              border: "1px solid rgba(1,205,254,0.4)", borderRadius: "4px",
              padding: "9px 14px", width: "100%", outline: "none",
              color: "#01cdfe", boxSizing: "border-box",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#1a0533",
  sidebarBg: "#0d0020",
  border:    "#ff2d78",
  text:      "#e0d0ff",
  textMuted: "#b090d0",
  accent:    "#ff2d78",
  accent2:   "#00e5ff",
  cardBg:    "rgba(30,0,60,0.8)",
  inputBg:   "rgba(40,0,80,0.6)",
};

export const VaporwaveTheme: ThemeDefinition = {
  id: "vaporwave",
  name: "Vaporwave",
  emoji: "🌴",
  description: "80s/90s aesthetic with deep purple gradients, neon pink/cyan glow, perspective grid floor, retro sun, and CRT scanlines.",
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
  Showcase: VaporwaveShowcase,
};
