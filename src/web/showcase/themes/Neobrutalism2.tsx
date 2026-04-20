import React, { useState } from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  [data-theme="neo2"] {
    --bg: #F2EDE4;
    --sidebar-bg: #E8E3DA;
    --border: #000000;
    --text: #000000;
    --text-muted: #555555;
    --accent: #0000DF;
    --accent-2: #FF0000;
    --accent-3: #FFFF00;
    --card-bg: #FFFFFF;
    --input-bg: #FFFFFF;
    --font-body: "Space Grotesk", "Arial", sans-serif;
    --font-mono: "JetBrains Mono", "Courier New", monospace;
    --radius: 0px;
  }

  /* ── Box reset ───────────────────────────────────────── */
  [data-theme="neo2"] * {
    box-sizing: border-box;
  }

  /* ── Elevation tokens (hard shadow, NO blur) ─────────── */
  [data-theme="neo2"] .elev-1 { box-shadow: 2px 2px 0 #000000; }
  [data-theme="neo2"] .elev-2 { box-shadow: 4px 4px 0 #000000; }
  [data-theme="neo2"] .elev-3 { box-shadow: 6px 6px 0 #000000; }
  [data-theme="neo2"] .elev-4 { box-shadow: 8px 8px 0 #000000; }

  /* ── POSTER TITLE — explicit everything, no CSS vars ─── */
  [data-theme="neo2"] .n2-poster-title {
    border-top: 3px solid #000000;
    padding-top: 16px;
    min-height: 200px;
    overflow: visible;
    display: block;
  }

  [data-theme="neo2"] .n2-poster-display {
    font-family: "Bebas Neue", Impact, "Arial Black", sans-serif;
    font-size: 72px;
    line-height: 1;
    letter-spacing: 0.02em;
    color: #000000 !important;
    text-transform: uppercase;
    display: block;
    opacity: 1;
    visibility: visible;
  }

  [data-theme="neo2"] .n2-poster-subtitle {
    font-family: "Bebas Neue", Impact, "Arial Black", sans-serif;
    font-size: 72px;
    line-height: 1;
    letter-spacing: 0.02em;
    color: #000000 !important;
    text-transform: uppercase;
    display: block;
    opacity: 1;
    visibility: visible;
  }

  [data-theme="neo2"] .n2-poster-meta {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    color: #555555;
    text-transform: uppercase;
    margin-top: 16px;
  }

  /* ── Typography ──────────────────────────────────────── */
  [data-theme="neo2"] .n2-display {
    font-family: "Bebas Neue", Impact, "Arial Black", sans-serif;
    font-size: 72px;
    line-height: 1;
    letter-spacing: 0.01em;
    color: #000000;
    text-transform: uppercase;
    display: block;
  }

  [data-theme="neo2"] .n2-h2 {
    font-family: var(--font-body);
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #000000;
  }

  [data-theme="neo2"] .n2-body {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    color: #000000;
  }

  [data-theme="neo2"] .n2-caption {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.01em;
    color: #555555;
  }

  [data-theme="neo2"] .n2-label {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #000000;
  }

  [data-theme="neo2"] .n2-mono {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 400;
    color: #000000;
  }

  /* ── Section heading ─────────────────────────────────── */
  [data-theme="neo2"] .n2-section-head {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #000000;
    border-bottom: 2px solid #000000;
    padding-bottom: 6px;
    margin-bottom: 24px;
  }

  /* ── Buttons ─────────────────────────────────────────── */
  [data-theme="neo2"] .n2-btn {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border-radius: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    min-height: 44px;
    border: 2px solid #000000;
    box-shadow: 4px 4px 0 #000000;
    transition: transform 0.07s ease, box-shadow 0.07s ease;
    outline: none;
    text-decoration: none;
  }

  [data-theme="neo2"] .n2-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000000;
  }

  [data-theme="neo2"] .n2-btn:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 #000000;
  }

  [data-theme="neo2"] .n2-btn:focus-visible {
    outline: 3px solid #000000;
    outline-offset: 2px;
    box-shadow: 4px 4px 0 #000000, 0 0 0 5px #FFFF00;
  }

  [data-theme="neo2"] .n2-btn-filled {
    background: #0000DF;
    color: #ffffff;
  }

  [data-theme="neo2"] .n2-btn-outline {
    background: #ffffff;
    color: #000000;
  }

  [data-theme="neo2"] .n2-btn-text {
    background: transparent;
    color: #000000;
    box-shadow: none;
  }

  [data-theme="neo2"] .n2-btn-state-active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 #000000;
  }

  /* ── Inputs ──────────────────────────────────────────── */
  [data-theme="neo2"] .n2-input-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  [data-theme="neo2"] .n2-input-label {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #000000;
  }

  [data-theme="neo2"] .n2-input {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 400;
    color: #000000;
    background: #ffffff;
    border: 2px solid #000000;
    padding: 10px 14px;
    width: 100%;
    transition: box-shadow 0.07s;
  }

  [data-theme="neo2"] .n2-input:focus {
    border-color: #FF0000;
    outline: 2px solid #FF0000;
    outline-offset: 1px;
  }

  [data-theme="neo2"] .n2-input::placeholder {
    color: #aaaaaa;
    font-weight: 400;
  }

  [data-theme="neo2"] .n2-input-error {
    border-color: #FF0000;
  }

  [data-theme="neo2"] .n2-input-helper {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 400;
    color: #555555;
  }

  [data-theme="neo2"] .n2-input-helper-error {
    color: #FF0000;
    font-weight: 600;
  }

  /* ── Cards ───────────────────────────────────────────── */
  [data-theme="neo2"] .n2-card {
    background: #ffffff;
    border: 2px solid #000000;
    padding: 20px;
  }

  /* ── Callout — prominent ───────────────────────── */
  [data-theme="neo2"] .n2-callout {
    background: #FFFF00;
    border: 2px solid #000000;
    padding: 16px 20px;
  }

  /* ── Tabs ────────────────────────────────────────────── */
  [data-theme="neo2"] .n2-tab {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    padding: 10px 16px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    color: #555555;
    transition: border-color 0.07s, color 0.07s;
    min-height: 44px;
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  [data-theme="neo2"] .n2-tab:hover {
    color: #000000;
  }

  [data-theme="neo2"] .n2-tab.active {
    color: #0000DF;
    border-bottom: 3px solid #0000DF;
    font-weight: 700;
  }

  [data-theme="neo2"] .n2-tab:focus-visible {
    outline: 3px solid #000000;
    outline-offset: 2px;
  }

  /* ── Steps ───────────────────────────────────────────── */
  [data-theme="neo2"] .n2-steps {
    display: flex;
    align-items: center;
    gap: 0;
  }

  [data-theme="neo2"] .n2-step {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
  }

  [data-theme="neo2"] .n2-step-num {
    width: 28px;
    height: 28px;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
    flex-shrink: 0;
  }

  /* ── Grids ───────────────────────────────────────────── */
  [data-theme="neo2"] .n2-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  [data-theme="neo2"] .n2-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  [data-theme="neo2"] .n2-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @media (max-width: 720px) {
    [data-theme="neo2"] .n2-grid-3,
    [data-theme="neo2"] .n2-grid-4 {
      grid-template-columns: 1fr 1fr;
    }
    [data-theme="neo2"] .n2-poster-display,
    [data-theme="neo2"] .n2-poster-subtitle {
      font-size: 48px;
    }
  }

  @media (max-width: 480px) {
    [data-theme="neo2"] .n2-grid-2,
    [data-theme="neo2"] .n2-grid-3,
    [data-theme="neo2"] .n2-grid-4 {
      grid-template-columns: 1fr;
    }
  }

  /* ── DARK MODE ── */
  [data-theme="neo2"][data-mode="dark"] {
    --bg: #111111;
    --sidebar-bg: #1a1a1a;
    --border: #ffffff;
    --text: #ffffff;
    --text-muted: #aaaaaa;
    --accent: #0000ff;
    --accent-2: #ff0000;
    --accent-3: #ffff00;
    --card-bg: #1a1a1a;
    --input-bg: #222222;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const Neobrutalism2Showcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const currentColors = colors || defaultColors;
  const [ctaPressed, setCtaPressed] = useState(false);

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

  const bebasStyle: React.CSSProperties = {
    fontFamily: '"Bebas Neue", Impact, "Arial Black", sans-serif',
  };

  const sgStyle: React.CSSProperties = {
    fontFamily: '"Space Grotesk", Arial, sans-serif',
  };

  return (
    <div style={{
      ...customStyle,
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100%",
      padding: "40px",
      maxWidth: "920px",
      margin: "0 auto",
    }}>

      {/* ── MEGA POSTER HEADLINE ── */}
      <section style={{ borderTop: "4px solid #000", paddingTop: "20px", marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              ...bebasStyle,
              fontSize: "clamp(64px, 11vw, 120px)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              color: "#0000DF",
              textTransform: "uppercase",
              margin: "0 0 8px 0",
            }}>
              EDITORIAL<br />
              <span style={{ color: "#000" }}>BRUTALISM</span>
            </h1>
            <div style={{
              ...bebasStyle,
              fontSize: "28px",
              letterSpacing: "0.08em",
              color: "#FF0000",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>
              The Magazine of Raw Typography
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{
                ...sgStyle,
                background: "#FFFF00",
                border: "2px solid #000",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "4px 10px",
                boxShadow: "3px 3px 0 #000",
              }}>BREAKING</span>
              <span style={{ ...sgStyle, fontSize: "13px", fontWeight: 500, color: "#555", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Issue 47 — Spring 2025 — Vol. III
              </span>
            </div>
          </div>
          <div style={{
            background: "#FF0000",
            border: "3px solid #000",
            padding: "20px 24px",
            boxShadow: "6px 6px 0 #000",
            textAlign: "center",
            minWidth: "140px",
          }}>
            <div style={{ ...bebasStyle, fontSize: "64px", color: "#fff", lineHeight: 1 }}>47</div>
            <div style={{ ...sgStyle, fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#fff", marginTop: "4px" }}>ISSUE NO.</div>
          </div>
        </div>
      </section>

      {/* ── ELEVATION SHOWCASE ── */}
      <section style={{ marginBottom: "48px" }}>
        <div style={{ ...sgStyle, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "2px solid #000", paddingBottom: "8px", marginBottom: "24px" }}>
          Elevation System — Hard Shadow Tokens
        </div>
        <div className="n2-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {[
            { cls: "elev-1", shadow: "2px", label: "ELEV–1", bg: "#fff" },
            { cls: "elev-2", shadow: "4px", label: "ELEV–2", bg: "#fff" },
            { cls: "elev-3", shadow: "6px", label: "ELEV–3", bg: "#FFFF00" },
            { cls: "elev-4", shadow: "8px", label: "ELEV–4", bg: "#0000DF" },
          ].map(({ cls, shadow, label, bg }) => (
            <div
              key={cls}
              className={cls}
              style={{
                background: bg,
                border: "2px solid #000",
                padding: "20px 16px",
                textAlign: "center",
                transition: "transform 0.1s",
                cursor: "default",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ""}
            >
              <div style={{ ...bebasStyle, fontSize: "36px", color: bg === "#0000DF" ? "#fff" : "#000", lineHeight: 1 }}>{shadow}</div>
              <div style={{ ...sgStyle, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: bg === "#0000DF" ? "#fff" : "#555", marginTop: "6px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE-COLUMN EDITORIAL GRID ── */}
      <section style={{ marginBottom: "48px" }}>
        <div style={{ ...sgStyle, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "2px solid #000", paddingBottom: "8px", marginBottom: "24px" }}>
          Editorial Layout
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "0", border: "2px solid #000", boxShadow: "5px 5px 0 #000" }}>
          {/* Main story */}
          <div style={{ background: "#fff", borderRight: "2px solid #000", padding: "24px" }}>
            <div style={{
              background: "#FF0000",
              color: "#fff",
              ...sgStyle,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "3px 8px",
              display: "inline-block",
              marginBottom: "12px",
            }}>Feature</div>
            <h2 style={{ ...bebasStyle, fontSize: "42px", lineHeight: 0.95, color: "#000", textTransform: "uppercase", margin: "0 0 14px 0" }}>
              The Death of<br />Soft UI
            </h2>
            <p style={{ ...sgStyle, fontSize: "14px", fontWeight: 400, lineHeight: 1.65, color: "#333", margin: "0 0 16px 0" }}>
              Neumorphism had a moment. Then we remembered that invisible buttons are not accessible, they are a crime. The pendulum swings back — harder this time.
            </p>
            <p style={{ ...sgStyle, fontSize: "14px", fontWeight: 400, lineHeight: 1.65, color: "#333", margin: 0 }}>
              Designers who spent 2019 beveling everything are now voluntarily drawing 3px black borders on their mockups. Justice served cold.
            </p>
          </div>
          {/* Secondary */}
          <div style={{ background: "var(--bg)", borderRight: "2px solid #000", padding: "20px" }}>
            <div style={{ ...bebasStyle, fontSize: "14px", letterSpacing: "0.1em", color: "#FF0000", textTransform: "uppercase", marginBottom: "8px" }}>Opinion</div>
            <h3 style={{ ...bebasStyle, fontSize: "28px", lineHeight: 0.98, color: "#000", textTransform: "uppercase", margin: "0 0 12px 0" }}>
              Gradients Must Die
            </h3>
            <p style={{ ...sgStyle, fontSize: "13px", lineHeight: 1.6, color: "#555", margin: "0 0 16px 0" }}>
              Every gradient hides a decision the designer refused to make. Pick a color. Commit. Move on.
            </p>
            <div style={{ borderTop: "1px solid #000", paddingTop: "12px" }}>
              <div style={{ ...sgStyle, fontSize: "11px", fontWeight: 600, color: "#555" }}>By K. Baumeister</div>
              <div style={{ ...sgStyle, fontSize: "11px", color: "#888" }}>March 14, 2025</div>
            </div>
          </div>
          {/* Sidebar column */}
          <div style={{ background: "#0000DF", padding: "20px" }}>
            <div style={{ ...sgStyle, fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFFF00", marginBottom: "16px" }}>Also In This Issue</div>
            {[
              "Why Figma Kills Creativity",
              "The 8-Point Grid Is A Crutch",
              "Helvetica: Overrated?",
              "Print Is Not Dead",
            ].map((title, i) => (
              <div key={i} style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.2)" : "none", paddingBottom: "10px", marginBottom: "10px" }}>
                <div style={{ ...sgStyle, fontSize: "10px", fontWeight: 700, color: "#FFFF00", letterSpacing: "0.1em" }}>p.{(i + 1) * 12}</div>
                <div style={{ ...sgStyle, fontSize: "13px", fontWeight: 600, color: "#fff", lineHeight: 1.4, marginTop: "2px" }}>{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ARTICLE CARD ── */}
      <section style={{ marginBottom: "48px" }}>
        <div style={{ ...sgStyle, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "2px solid #000", paddingBottom: "8px", marginBottom: "24px" }}>
          Breaking News
        </div>
        <div style={{
          background: "#fff",
          border: "3px solid #000",
          boxShadow: "6px 6px 0 #000",
          overflow: "hidden",
        }}>
          <div style={{ background: "#000", padding: "10px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{
              background: "#FF0000",
              color: "#fff",
              ...sgStyle,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "3px 8px",
              border: "1px solid rgba(255,255,255,0.3)",
            }}>BREAKING</span>
            <span style={{ ...sgStyle, fontSize: "11px", color: "#aaa", letterSpacing: "0.08em" }}>LIVE — Updated 2 minutes ago</span>
          </div>
          <div style={{ padding: "24px" }}>
            <h2 style={{ ...bebasStyle, fontSize: "48px", lineHeight: 0.95, color: "#000", textTransform: "uppercase", margin: "0 0 16px 0" }}>
              Designers Refuse<br />To Use Drop Shadows
            </h2>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ ...sgStyle, fontSize: "12px", fontWeight: 600, color: "#555" }}>By Staff Reporter</span>
              <span style={{ width: "3px", height: "3px", background: "#555", borderRadius: "50%" }} />
              <span style={{ ...sgStyle, fontSize: "12px", color: "#888" }}>Apr 16, 2025, 14:03 UTC</span>
            </div>
            <p style={{ ...sgStyle, fontSize: "15px", lineHeight: 1.65, color: "#333", margin: "0 0 16px 0" }}>
              In a landmark shift reported across design communities worldwide, practitioners are abandoning drop shadows with blur radius in favor of hard, offset-only box shadows. Industry analysts describe this as "long overdue" and "visually honest."
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {["#Typography", "#UXDesign", "#Brutalism"].map(tag => (
                <span key={tag} style={{
                  ...sgStyle,
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#0000DF",
                  border: "1px solid #0000DF",
                  padding: "2px 8px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BIG RED CTA BUTTON ── */}
      <section style={{ marginBottom: "48px" }}>
        <div style={{ ...sgStyle, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "2px solid #000", paddingBottom: "8px", marginBottom: "24px" }}>
          Subscribe
        </div>
        <div style={{ background: "var(--bg)", border: "3px solid #000", padding: "32px", boxShadow: "5px 5px 0 #000", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
          <div>
            <div style={{ ...bebasStyle, fontSize: "52px", lineHeight: 1, color: "#000", textTransform: "uppercase" }}>Never Miss An Issue</div>
            <div style={{ ...sgStyle, fontSize: "15px", color: "#555", marginTop: "8px", maxWidth: "480px" }}>Weekly dispatches from the front lines of confrontational design. Unsubscribe whenever cowardice sets in.</div>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                ...sgStyle,
                fontSize: "15px",
                fontWeight: 500,
                background: "#fff",
                border: "2px solid #000",
                padding: "12px 16px",
                width: "280px",
                outline: "none",
                color: "#000",
              }}
            />
            <button
              onMouseDown={() => setCtaPressed(true)}
              onMouseUp={() => setCtaPressed(false)}
              onMouseLeave={() => setCtaPressed(false)}
              style={{
                ...sgStyle,
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "#FF0000",
                color: "#fff",
                border: "2px solid #000",
                padding: "12px 28px",
                cursor: "pointer",
                boxShadow: ctaPressed ? "0 0 0 #000" : "4px 4px 0 #000",
                transform: ctaPressed ? "translate(4px, 4px)" : "none",
                transition: "transform 0.06s, box-shadow 0.06s",
              }}
            >
              Subscribe Now →
            </button>
          </div>
        </div>
      </section>

      {/* ── TYPOGRAPHY SPECIMEN ── */}
      <section>
        <div style={{ ...sgStyle, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "2px solid #000", paddingBottom: "8px", marginBottom: "24px" }}>
          Type Specimen — Bebas Neue vs Space Grotesk
        </div>
        <div style={{ border: "2px solid #000", boxShadow: "4px 4px 0 #000", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "2px solid #000" }}>
            <div style={{ background: "#000", padding: "20px 24px", borderRight: "2px solid #000" }}>
              <div style={{ ...sgStyle, fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FFFF00", marginBottom: "12px" }}>BEBAS NEUE — Display</div>
              <div style={{ ...bebasStyle, fontSize: "56px", color: "#fff", lineHeight: 0.95, textTransform: "uppercase" }}>ABCDEFG<br />HIJKLMN</div>
              <div style={{ ...bebasStyle, fontSize: "28px", color: "#0000DF", marginTop: "8px", textTransform: "uppercase" }}>THE QUICK FOX</div>
            </div>
            <div style={{ background: "#fff", padding: "20px 24px" }}>
              <div style={{ ...sgStyle, fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: "12px" }}>SPACE GROTESK — Body</div>
              <div style={{ ...sgStyle, fontSize: "32px", fontWeight: 700, color: "#000", lineHeight: 1.1 }}>Aa Bb Cc</div>
              <div style={{ ...sgStyle, fontSize: "16px", fontWeight: 400, color: "#333", marginTop: "8px", lineHeight: 1.6 }}>The quick brown fox jumps over the lazy dog — readable at any size.</div>
            </div>
          </div>
          <div style={{ background: "var(--bg)", padding: "16px 24px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { weight: 400, label: "Regular 400" },
              { weight: 500, label: "Medium 500" },
              { weight: 600, label: "SemiBold 600" },
              { weight: 700, label: "Bold 700" },
            ].map(({ weight, label }) => (
              <div key={weight}>
                <div style={{ ...sgStyle, fontSize: "22px", fontWeight: weight, color: "#000" }}>Grotesk</div>
                <div style={{ ...sgStyle, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#F2EDE4",
  sidebarBg: "#EDE8DF",
  border:    "#000000",
  text:      "#1a1a1a",
  textMuted: "#555555",
  accent:    "#0000DF",
  accent2:   "#FF0000",
  cardBg:    "#ffffff",
  inputBg:   "#ffffff",
};

export const Neobrutalism2Theme: ThemeDefinition = {
  id: "neobrutalism2",
  name: "Neobrutalism2",
  emoji: "🗞️",
  description: "Editorial magazine brutalism: Bebas Neue display + Space Grotesk body, 4-level hard-shadow elevation system, electric blue + red + yellow tricolor palette. Confrontational and structured.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg:        "#111111",
      sidebarBg: "#1a1a1a",
      border:    "#ffffff",
      text:      "#ffffff",
      textMuted: "#aaaaaa",
      accent:    "#0000ff",
      accent2:   "#ff0000",
      cardBg:    "#1a1a1a",
      inputBg:   "#222222",
    }
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: Neobrutalism2Showcase,
};
