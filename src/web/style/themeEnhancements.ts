export const themeEnhancementsCSS = `
/* Pinterest-informed polish for the shared shell and Style tab.
   These overlays sit after individual theme CSS so generic sg-* blocks
   inherit the active theme's own visual language. */

[data-theme] .sg-hero-title,
[data-theme] .sg-section-title {
  letter-spacing: 0;
}

[data-theme] .sg-swatch-chip {
  position: relative;
  overflow: hidden;
}

[data-theme] .sg-swatch-chip::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255,255,255,0.18);
  pointer-events: none;
}

[data-theme] .sg-button,
[data-theme] .sg-input,
[data-theme] .sg-card,
[data-theme] .sg-alert,
[data-theme] .sg-topbar {
  transition: transform 120ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
}

[data-theme] .sg-button.hover {
  transform: translateY(-1px);
}

[data-theme] .sidebar-item.active {
  background: var(--accent) !important;
  background-color: var(--accent) !important;
  color: #ffffff !important;
}

/* Dark developer / IDE boards: dense, gridded, terminal-like. */
[data-theme="terminal"] .sg-root,
[data-theme="terminal2"] .sg-root,
[data-theme="engpro"] .sg-root,
[data-theme="dock"] .sg-root,
[data-theme="shadcndark"] .sg-root,
[data-theme="claude-pack"] .sg-root {
  background:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px),
    var(--bg);
  background-size: 24px 24px, 24px 24px, auto;
}

[data-theme="terminal"] .sg-hero,
[data-theme="terminal"] .sg-root > section,
[data-theme="terminal2"] .sg-hero,
[data-theme="terminal2"] .sg-root > section,
[data-theme="engpro"] .sg-hero,
[data-theme="engpro"] .sg-root > section,
[data-theme="dock"] .sg-hero,
[data-theme="dock"] .sg-root > section,
[data-theme="shadcndark"] .sg-hero,
[data-theme="shadcndark"] .sg-root > section,
[data-theme="claude-pack"] .sg-hero,
[data-theme="claude-pack"] .sg-root > section {
  padding: 22px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.014)),
    var(--card-bg);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 40px rgba(0,0,0,0.28);
}

[data-theme="terminal"] .sg-hero-title,
[data-theme="terminal2"] .sg-hero-title,
[data-theme="engpro"] .sg-hero-title,
[data-theme="dock"] .sg-hero-title,
[data-theme="shadcndark"] .sg-hero-title,
[data-theme="claude-pack"] .sg-hero-title {
  font-family: var(--font-mono);
  font-size: 44px;
  text-shadow: 0 0 18px rgba(88,166,255,0.28);
}

[data-theme="terminal"] .sg-section-title::before,
[data-theme="terminal2"] .sg-section-title::before,
[data-theme="engpro"] .sg-section-title::before,
[data-theme="dock"] .sg-section-title::before,
[data-theme="shadcndark"] .sg-section-title::before,
[data-theme="claude-pack"] .sg-section-title::before {
  content: "./";
  color: var(--accent);
}

[data-theme="terminal"] .sg-button,
[data-theme="terminal2"] .sg-button,
[data-theme="engpro"] .sg-button,
[data-theme="dock"] .sg-button,
[data-theme="shadcndark"] .sg-button,
[data-theme="claude-pack"] .sg-button,
[data-theme="terminal"] .sg-input,
[data-theme="terminal2"] .sg-input,
[data-theme="engpro"] .sg-input,
[data-theme="dock"] .sg-input,
[data-theme="shadcndark"] .sg-input,
[data-theme="claude-pack"] .sg-input {
  border-radius: 4px;
  font-family: var(--font-mono);
}

/* Glass: translucent panes, edge glare, airy spacing. */
[data-theme="glass"] .sg-root {
  background:
    linear-gradient(135deg, rgba(255,255,255,0.08), transparent 32%),
    linear-gradient(180deg, #0f0c29 0%, #302b63 52%, #24243e 100%);
}

[data-theme="glass"] .sg-hero,
[data-theme="glass"] .sg-root > section,
[data-theme="glass"] .sg-card,
[data-theme="glass"] .sg-alert,
[data-theme="glass"] .sg-topbar {
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(255,255,255,0.13), rgba(255,255,255,0.045));
  backdrop-filter: blur(22px) saturate(160%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 24px 70px rgba(5,3,20,0.38);
}

[data-theme="glass"] .sg-hero-title {
  color: #ffffff;
  text-shadow: 0 0 22px rgba(167,139,250,0.5), 0 0 38px rgba(96,165,250,0.28);
}

[data-theme="glass"] .sg-button {
  border-radius: 999px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 30px rgba(96,165,250,0.2);
}

/* Brutalist boards: posters, ink, thick rules, hard shadows. */
[data-theme="neobrutalism"] .sg-root,
[data-theme="neobrutalism2"] .sg-root {
  background:
    linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
    var(--bg);
  background-size: 28px 28px, 28px 28px, auto;
}

[data-theme="neobrutalism"] .sg-hero,
[data-theme="neobrutalism"] .sg-root > section,
[data-theme="neobrutalism"] .sg-card,
[data-theme="neobrutalism"] .sg-alert,
[data-theme="neobrutalism2"] .sg-hero,
[data-theme="neobrutalism2"] .sg-root > section,
[data-theme="neobrutalism2"] .sg-card,
[data-theme="neobrutalism2"] .sg-alert {
  border: 3px solid #000;
  border-radius: 0;
  background: var(--card-bg);
  box-shadow: 8px 8px 0 #000;
}

[data-theme="neobrutalism"] .sg-hero-title,
[data-theme="neobrutalism"] .sg-section-title,
[data-theme="neobrutalism2"] .sg-hero-title,
[data-theme="neobrutalism2"] .sg-section-title {
  text-transform: uppercase;
  color: #000;
}

[data-theme="neobrutalism"] .sg-button,
[data-theme="neobrutalism"] .sg-input,
[data-theme="neobrutalism2"] .sg-button,
[data-theme="neobrutalism2"] .sg-input {
  border: 3px solid #000;
  border-radius: 0;
  box-shadow: 4px 4px 0 #000;
  font-weight: 800;
}

/* Neon boards: scanlines, grid floor, electric edges. */
[data-theme="cyberpunk"] .sg-root,
[data-theme="vaporwave"] .sg-root {
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 4px),
    linear-gradient(rgba(255,0,170,0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px),
    var(--bg);
  background-size: auto, 42px 42px, 42px 42px, auto;
}

[data-theme="cyberpunk"] .sg-hero,
[data-theme="cyberpunk"] .sg-root > section,
[data-theme="vaporwave"] .sg-hero,
[data-theme="vaporwave"] .sg-root > section {
  border: 1px solid var(--accent);
  border-radius: 4px;
  background: linear-gradient(180deg, rgba(255,0,170,0.08), rgba(0,255,255,0.035)), var(--card-bg);
  box-shadow: 0 0 0 1px rgba(255,0,170,0.25), 0 0 30px rgba(0,255,255,0.16);
}

[data-theme="cyberpunk"] .sg-hero-title,
[data-theme="vaporwave"] .sg-hero-title {
  color: var(--accent);
  text-shadow: 0 0 8px var(--accent), 0 0 24px var(--accent-2);
}

[data-theme="cyberpunk"] .sg-button,
[data-theme="vaporwave"] .sg-button {
  border-radius: 2px;
  box-shadow: 0 0 18px rgba(0,255,255,0.18);
}

/* Vaporwave: sunset grid, VHS chrome, magenta/cyan tape UI. */
[data-theme="vaporwave"] .sg-root {
  --vw-hot: #ff71ce;
  --vw-cyan: #01cdfe;
  --vw-violet: #b967ff;
  --vw-night: #0d0221;
  position: relative;
  isolation: isolate;
  gap: 48px;
  padding: 44px 48px 56px;
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 5px),
    radial-gradient(ellipse at 50% -10%, rgba(255,113,206,0.28), transparent 42%),
    radial-gradient(ellipse at 86% 16%, rgba(1,205,254,0.16), transparent 34%),
    linear-gradient(180deg, #050012 0%, #0d0221 42%, #1a0533 100%);
}

[data-theme="vaporwave"] .sg-root > * {
  position: relative;
  z-index: 1;
}

[data-theme="vaporwave"] .sg-root::before {
  content: "";
  position: fixed;
  left: 220px;
  right: 0;
  bottom: -12vh;
  height: 44vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.42;
  transform: perspective(540px) rotateX(62deg);
  transform-origin: 50% 100%;
  background-image:
    linear-gradient(rgba(255,113,206,0.34) 1px, transparent 1px),
    linear-gradient(90deg, rgba(1,205,254,0.26) 1px, transparent 1px);
  background-size: 74px 46px;
  filter: drop-shadow(0 0 10px rgba(255,113,206,0.42));
}

[data-theme="vaporwave"] .sg-root::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0)),
    repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.14) 2px 3px);
  mix-blend-mode: soft-light;
}

[data-theme="vaporwave"] .sg-hero,
[data-theme="vaporwave"] .sg-root > section {
  border: 1px solid rgba(255,113,206,0.62);
  border-radius: 4px;
  background:
    linear-gradient(180deg, rgba(255,113,206,0.13), rgba(1,205,254,0.045)),
    rgba(13,2,33,0.9);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    inset 0 -1px 0 rgba(1,205,254,0.24),
    0 0 0 1px rgba(185,103,255,0.18),
    0 22px 56px rgba(5,0,22,0.46),
    0 0 32px rgba(255,113,206,0.18);
  backdrop-filter: blur(12px);
}

[data-theme="vaporwave"] .sg-hero {
  min-height: 272px;
  align-items: center;
  padding: 34px 36px 42px;
  overflow: hidden;
}

[data-theme="vaporwave"] .sg-hero > * {
  position: relative;
  z-index: 2;
}

[data-theme="vaporwave"] .sg-hero::before {
  content: "";
  position: absolute;
  left: -12%;
  right: -12%;
  bottom: -36px;
  height: 128px;
  z-index: 0;
  opacity: 0.75;
  transform: perspective(360px) rotateX(64deg);
  transform-origin: 50% 100%;
  background-image:
    linear-gradient(rgba(255,113,206,0.48) 1px, transparent 1px),
    linear-gradient(90deg, rgba(1,205,254,0.42) 1px, transparent 1px);
  background-size: 58px 38px;
}

[data-theme="vaporwave"] .sg-hero::after {
  content: "VHS  PLAY  SP  1984";
  position: absolute;
  top: 16px;
  right: 20px;
  z-index: 3;
  font-family: var(--font-pixel);
  font-size: 15px;
  letter-spacing: 0.22em;
  color: var(--vw-cyan);
  text-shadow: 0 0 10px rgba(1,205,254,0.82);
}

[data-theme="vaporwave"] .sg-hero-title {
  font-family: var(--font-press);
  font-size: clamp(24px, 4.8vw, 58px);
  line-height: 1.08;
  color: var(--vw-hot);
  text-transform: uppercase;
  text-shadow:
    2px 0 0 rgba(1,205,254,0.8),
    -2px 0 0 rgba(185,103,255,0.72),
    0 0 18px rgba(255,113,206,0.72),
    0 0 42px rgba(185,103,255,0.42);
}

[data-theme="vaporwave"] .sg-hero-sub {
  max-width: 560px;
  margin-top: 16px;
  font-family: var(--font-pixel);
  font-size: 18px;
  line-height: 1.35;
  letter-spacing: 0.08em;
  color: #d8c7ff;
  text-shadow: 0 0 10px rgba(185,103,255,0.42);
}

[data-theme="vaporwave"] .sg-hero-disc {
  border-radius: 50%;
  overflow: hidden;
  background:
    repeating-linear-gradient(180deg, transparent 0 8px, rgba(13,2,33,0.78) 8px 13px),
    linear-gradient(180deg, #ffe66d 0%, #ff9f1c 30%, #ff71ce 62%, #b967ff 100%);
  box-shadow: 0 0 0 2px rgba(255,113,206,0.34), 0 0 28px rgba(255,113,206,0.82), 0 0 70px rgba(185,103,255,0.46);
}

[data-theme="vaporwave"] .sg-hero-disc-sm {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: var(--vw-cyan);
  border-color: rgba(1,205,254,0.82);
  transform: rotate(45deg);
  box-shadow: 0 0 18px rgba(1,205,254,0.72);
}

[data-theme="vaporwave"] .sg-section-title,
[data-theme="vaporwave"] .sg-card-title,
[data-theme="vaporwave"] .sg-topbar-brand,
[data-theme="vaporwave"] .sg-button-col-title {
  font-family: var(--font-pixel);
  letter-spacing: 0.08em;
  color: var(--vw-cyan);
  text-shadow: 0 0 12px rgba(1,205,254,0.52);
}

[data-theme="vaporwave"] .sg-section-title {
  font-size: 34px;
  text-transform: uppercase;
}

[data-theme="vaporwave"] .sg-section-title::before {
  content: "◇ ";
  color: var(--vw-hot);
  text-shadow: 0 0 12px rgba(255,113,206,0.7);
}

[data-theme="vaporwave"] .sg-label,
[data-theme="vaporwave"] .sg-swatch-name,
[data-theme="vaporwave"] .sg-swatch-hex,
[data-theme="vaporwave"] .sg-type-meta,
[data-theme="vaporwave"] .sg-type-specimen-meta,
[data-theme="vaporwave"] .sg-button-state-label,
[data-theme="vaporwave"] .sg-button-spec,
[data-theme="vaporwave"] .sg-input-label,
[data-theme="vaporwave"] .sg-card-body,
[data-theme="vaporwave"] .sg-card-meta,
[data-theme="vaporwave"] .sg-topbar-right {
  font-family: var(--font-pixel);
  letter-spacing: 0.08em;
}

[data-theme="vaporwave"] .sg-swatch-chip,
[data-theme="vaporwave"] .sg-card,
[data-theme="vaporwave"] .sg-alert,
[data-theme="vaporwave"] .sg-topbar,
[data-theme="vaporwave"] .sg-input,
[data-theme="vaporwave"] .sg-spacing-square,
[data-theme="vaporwave"] .sg-radius-square {
  border-color: rgba(185,103,255,0.52);
  background-color: rgba(13,2,33,0.78);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 0 18px rgba(185,103,255,0.16);
}

[data-theme="vaporwave"] .sg-swatch-chip {
  border-radius: 4px;
  box-shadow: 0 0 18px rgba(255,113,206,0.24), 0 0 34px rgba(1,205,254,0.14);
}

[data-theme="vaporwave"] .sg-button {
  height: 38px;
  border-radius: 2px;
  font-family: var(--font-pixel);
  font-size: 16px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-shadow: 0 0 8px currentColor;
}

[data-theme="vaporwave"] .sg-button-primary {
  color: #ffffff;
  border-color: transparent;
  background: linear-gradient(90deg, var(--vw-hot), var(--vw-violet), var(--vw-cyan));
  box-shadow: 0 0 16px rgba(255,113,206,0.46), 0 0 26px rgba(1,205,254,0.26);
}

[data-theme="vaporwave"] .sg-button-secondary {
  color: var(--vw-cyan);
  border-color: rgba(1,205,254,0.72);
  background: rgba(13,2,33,0.72);
}

[data-theme="vaporwave"] .sg-button-primary.disabled,
[data-theme="vaporwave"] .sg-button-secondary.disabled,
[data-theme="vaporwave"] .sg-button-icon.disabled {
  color: rgba(216,199,255,0.48);
  border-color: rgba(122,95,160,0.42);
  background: rgba(42,10,74,0.55);
  box-shadow: none;
  text-shadow: none;
}

[data-theme="vaporwave"] .sg-input {
  color: var(--text);
  border-radius: 4px;
  background: rgba(13,2,33,0.92);
  font-family: var(--font-pixel);
  font-size: 17px;
  letter-spacing: 0.07em;
}

[data-theme="vaporwave"] .sg-input:focus {
  border-color: var(--vw-hot);
  box-shadow: 0 0 0 1px rgba(255,113,206,0.54), 0 0 18px rgba(255,113,206,0.24);
}

[data-theme="vaporwave"] .sg-check-box.checked,
[data-theme="vaporwave"] .sg-toggle.on {
  background: linear-gradient(90deg, var(--vw-hot), var(--vw-cyan));
  border-color: transparent;
  box-shadow: 0 0 16px rgba(1,205,254,0.28);
}

[data-theme="vaporwave"] .sg-alert {
  border-left-width: 3px;
}

[data-theme="vaporwave"] .sg-alert-info { border-left-color: var(--vw-cyan); }
[data-theme="vaporwave"] .sg-alert-warning { border-left-color: #ffe66d; }
[data-theme="vaporwave"] .sg-alert-error { border-left-color: var(--vw-hot); }

@media (max-width: 600px) {
  [data-theme="vaporwave"] .sg-root {
    padding: 28px 18px 40px;
    gap: 36px;
  }

  [data-theme="vaporwave"] .sg-root::before {
    left: 56px;
    opacity: 0.26;
  }

  [data-theme="vaporwave"] .sg-hero {
    min-height: 300px;
    padding: 30px 20px 40px;
  }
}

/* Soft color boards: pastel, cozy, rounded, editorial. */
[data-theme="pastel"] .sg-root,
[data-theme="catppuccin"] .sg-root {
  background:
    linear-gradient(135deg, rgba(255,255,255,0.68), rgba(255,255,255,0.08)),
    var(--bg);
}

[data-theme="pastel"] .sg-hero,
[data-theme="pastel"] .sg-root > section,
[data-theme="pastel"] .sg-card,
[data-theme="pastel"] .sg-alert,
[data-theme="catppuccin"] .sg-hero,
[data-theme="catppuccin"] .sg-root > section,
[data-theme="catppuccin"] .sg-card,
[data-theme="catppuccin"] .sg-alert {
  border: 1px solid rgba(255,255,255,0.55);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(255,255,255,0.42), rgba(255,255,255,0.16)), var(--card-bg);
  box-shadow: 0 14px 34px rgba(90,80,140,0.14);
}

[data-theme="pastel"] .sg-hero-title,
[data-theme="catppuccin"] .sg-hero-title {
  color: var(--accent);
  text-shadow: 0 8px 28px rgba(120,90,160,0.18);
}

/* Swiss: rigid grid, black ink, red registration marks. */
[data-theme="swiss"] .sg-root {
  background:
    linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
    var(--bg);
  background-size: 64px 64px, 64px 64px, auto;
}

[data-theme="swiss"] .sg-hero,
[data-theme="swiss"] .sg-root > section {
  border-top: 8px solid var(--text);
  border-right: 0;
  border-bottom: 1px solid var(--text);
  border-left: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

[data-theme="swiss"] .sg-section-title {
  color: var(--accent);
  text-transform: lowercase;
}

[data-theme="swiss"] .sg-button,
[data-theme="swiss"] .sg-input,
[data-theme="swiss"] .sg-card {
  border-radius: 0;
}

/* Retro desktop boards: window chrome and pixel-era panels. */
[data-theme="retro-os"] .sg-hero,
[data-theme="retro-os"] .sg-root > section,
[data-theme="modernretro"] .sg-hero,
[data-theme="modernretro"] .sg-root > section {
  position: relative;
  padding-top: 46px;
  border: 2px solid var(--border);
  border-radius: 6px;
  background: var(--card-bg);
  box-shadow: inset 2px 2px 0 rgba(255,255,255,0.7), inset -2px -2px 0 rgba(0,0,0,0.22), 6px 8px 0 rgba(0,0,0,0.16);
}

[data-theme="retro-os"] .sg-hero::before,
[data-theme="retro-os"] .sg-root > section::before,
[data-theme="modernretro"] .sg-hero::before,
[data-theme="modernretro"] .sg-root > section::before {
  content: "SYSTEM";
  position: absolute;
  inset: 0 0 auto 0;
  height: 28px;
  padding: 7px 12px 0;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  background: linear-gradient(90deg, #005cc8, #4d9fff);
}

[data-theme="retro-os"] .sg-hero-title,
[data-theme="modernretro"] .sg-hero-title {
  text-shadow: 2px 2px 0 rgba(0,0,0,0.12);
}

/* Native app / SaaS boards: grouped surfaces and restrained contrast. */
[data-theme="ios"] .sg-root,
[data-theme="productivity"] .sg-root {
  background: var(--bg);
  gap: 36px;
}

[data-theme="ios"] .sg-hero,
[data-theme="ios"] .sg-root > section,
[data-theme="productivity"] .sg-hero,
[data-theme="productivity"] .sg-root > section {
  border: 1px solid rgba(120,120,128,0.18);
  border-radius: 8px;
  background: var(--card-bg);
  box-shadow: 0 1px 0 rgba(255,255,255,0.65), 0 18px 38px rgba(15,23,42,0.08);
}

[data-theme="ios"] .sg-button,
[data-theme="ios"] .sg-input,
[data-theme="productivity"] .sg-button,
[data-theme="productivity"] .sg-input {
  border-radius: 8px;
}

/* Premium player boards: vinyl, waveform, low-key glow. */
[data-theme="musicplayer"] .sg-root {
  background:
    repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 8px),
    var(--bg);
}

[data-theme="musicplayer"] .sg-hero,
[data-theme="musicplayer"] .sg-root > section {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025)), var(--card-bg);
  box-shadow: 0 22px 60px rgba(0,0,0,0.45);
}

[data-theme="musicplayer"] .sg-hero-disc {
  background:
    radial-gradient(circle at center, var(--bg) 0 10%, var(--accent) 11% 13%, transparent 14%),
    repeating-radial-gradient(circle at center, #141414 0 5px, #050505 5px 9px);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 18px 45px rgba(0,0,0,0.6);
}

/* Tactile boards: clay blocks and soft pressed controls. */
[data-theme="claymorphism"] .sg-hero,
[data-theme="claymorphism"] .sg-root > section,
[data-theme="claymorphism"] .sg-card,
[data-theme="claymorphism"] .sg-alert {
  border: 0;
  border-radius: 8px;
  background: var(--card-bg);
  box-shadow: 10px 12px 0 rgba(0,0,0,0.14), inset 3px 3px 8px rgba(255,255,255,0.45);
}

[data-theme="claymorphism"] .sg-button,
[data-theme="claymorphism"] .sg-input {
  border: 0;
  border-radius: 8px;
  box-shadow: inset 3px 3px 8px rgba(255,255,255,0.48), 5px 7px 0 rgba(0,0,0,0.12);
}

[data-theme="neumorphism"] .sg-hero,
[data-theme="neumorphism"] .sg-root > section,
[data-theme="neumorphism"] .sg-card,
[data-theme="neumorphism"] .sg-alert,
[data-theme="neumorphism"] .sg-button,
[data-theme="neumorphism"] .sg-input {
  border: 0;
  border-radius: 8px;
  background: var(--bg);
  box-shadow: 10px 10px 22px rgba(150,160,175,0.48), -10px -10px 22px rgba(255,255,255,0.78);
}

[data-theme="neumorphism"] .sg-input:focus {
  box-shadow: inset 7px 7px 16px rgba(150,160,175,0.44), inset -7px -7px 16px rgba(255,255,255,0.74);
}

/* Hermes: warm editorial panels on deep teal. */
[data-theme="hermes"] .sg-root {
  background:
    linear-gradient(90deg, rgba(255,230,203,0.08) 1px, transparent 1px),
    linear-gradient(rgba(255,230,203,0.06) 1px, transparent 1px),
    var(--bg);
  background-size: 52px 52px, 52px 52px, auto;
}

[data-theme="hermes"] .sg-hero,
[data-theme="hermes"] .sg-root > section,
[data-theme="hermes"] .sg-card,
[data-theme="hermes"] .sg-alert {
  border: 1px solid rgba(255,230,203,0.34);
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(255,230,203,0.12), rgba(255,230,203,0.045));
  box-shadow: 0 18px 45px rgba(0,0,0,0.22);
}

[data-theme="hermes"] .sg-section-title::after {
  content: "";
  display: block;
  width: 72px;
  height: 2px;
  margin-top: 10px;
  background: var(--accent);
}
`;
