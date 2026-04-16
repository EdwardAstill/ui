import React, { useState } from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

  [data-theme="neo"] {
    --bg: #fffbf0;
    --sidebar-bg: #f5f0e8;
    --border: #000000;
    --text: #000000;
    --text-muted: #444444;
    --accent: #ffdd00;
    --accent-2: #ff4747;
    --card-bg: #ffffff;
    --input-bg: #ffffff;
    --font-body: 'Space Grotesk', 'Arial Black', sans-serif;
    --font-mono: 'Courier New', Courier, monospace;
    --radius: 0px;
  }

  /* ── Reset / base ────────────────────────────────── */
  [data-theme="neo"] * {
    border-radius: 0 !important;
    box-sizing: border-box;
  }

  /* ── MASSIVE HEADER ──────────────────────────────── */
  [data-theme="neo"] .neo-hero {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-bottom: 5px solid var(--text);
    padding-bottom: 24px;
  }

  [data-theme="neo"] .neo-hero-eyebrow {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  [data-theme="neo"] .neo-hero-title {
    font-family: var(--font-body);
    font-size: clamp(52px, 9vw, 96px);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.04em;
    color: var(--text);
    text-transform: uppercase;
    margin: 0;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
  }

  [data-theme="neo"] .neo-hero-stamp {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: var(--accent-2);
    color: #ffffff;
    padding: 4px 10px;
    border: 2px solid #000;
    box-shadow: 3px 3px 0 #000;
  }

  /* ── Typography ─────────────────────────────────── */
  [data-theme="neo"] .neo-h1 {
    font-family: var(--font-body);
    font-size: 48px;
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: var(--text);
    text-transform: uppercase;
    margin: 0;
  }

  [data-theme="neo"] .neo-h2 {
    font-family: var(--font-body);
    font-size: 32px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--text);
    text-transform: uppercase;
    margin: 0;
  }

  [data-theme="neo"] .neo-h3 {
    font-family: var(--font-body);
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--text);
    margin: 0;
  }

  [data-theme="neo"] .neo-body {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
    color: var(--text);
    margin: 0;
  }

  [data-theme="neo"] .neo-muted {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 0;
  }

  [data-theme="neo"] .neo-code {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
    background: var(--accent);
    color: var(--text);
    padding: 2px 6px;
    border: 2px solid #000;
  }

  /* ── Buttons ─────────────────────────────────────── */
  [data-theme="neo"] .neo-btn {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 3px solid var(--text);
    border-radius: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    min-height: 44px;
    box-shadow: 4px 4px 0 var(--text);
    transition: transform 0.08s ease, box-shadow 0.08s ease;
    outline: none;
    text-decoration: none;
  }

  [data-theme="neo"] .neo-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--text);
  }

  [data-theme="neo"] .neo-btn:active {
    transform: translate(4px, 4px);
    box-shadow: 0px 0px 0 var(--text);
  }

  [data-theme="neo"] .neo-btn:focus-visible {
    outline: 3px solid var(--accent-2);
    outline-offset: 3px;
  }

  /* Disabled — diagonal strikethrough pattern */
  [data-theme="neo"] .neo-btn:disabled,
  [data-theme="neo"] .neo-btn[aria-disabled="true"] {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 4px,
      rgba(0,0,0,0.15) 4px,
      rgba(0,0,0,0.15) 6px
    );
  }

  [data-theme="neo"] .neo-btn-primary {
    background: var(--accent);
    color: var(--text);
  }

  [data-theme="neo"] .neo-btn-secondary {
    background: var(--card-bg);
    color: var(--text);
  }

  [data-theme="neo"] .neo-btn-danger {
    background: var(--accent-2);
    color: #ffffff;
  }

  [data-theme="neo"] .neo-btn-ghost {
    background: transparent;
    color: var(--text);
    box-shadow: 4px 4px 0 transparent;
  }

  [data-theme="neo"] .neo-btn-pill {
    border: 2px solid var(--text);
    padding: 5px 14px;
    min-height: 32px;
    font-size: 12px;
    background: var(--card-bg);
    color: var(--text);
    box-shadow: 2px 2px 0 var(--text);
    transition: transform 0.08s, box-shadow 0.08s;
  }

  [data-theme="neo"] .neo-btn-pill.active {
    background: var(--accent);
    color: var(--text);
  }

  /* ── Inputs ─────────────────────────────────────── */
  [data-theme="neo"] .neo-label {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text);
    display: block;
    margin-bottom: 6px;
  }

  [data-theme="neo"] .neo-input {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    background: var(--input-bg);
    border: 3px solid var(--text);
    padding: 10px 14px;
    width: 100%;
    box-shadow: 4px 4px 0 var(--text);
    transition: box-shadow 0.1s ease;
    appearance: none;
  }

  [data-theme="neo"] .neo-input:focus {
    border-color: var(--accent-2);
    box-shadow: 4px 4px 0 var(--accent-2);
    outline: none;
  }

  [data-theme="neo"] .neo-input::placeholder {
    color: #aaaaaa;
    font-weight: 500;
  }

  [data-theme="neo"] .neo-field {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ── Cards ──────────────────────────────────────── */
  [data-theme="neo"] .neo-card {
    background: var(--card-bg);
    border: 3px solid var(--text);
    padding: 24px;
    box-shadow: 4px 4px 0 var(--text);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: default;
  }

  [data-theme="neo"] .neo-card:hover {
    box-shadow: 6px 6px 0 var(--text);
    transform: translate(-2px, -2px);
  }

  [data-theme="neo"] .neo-card-stat {
    background: var(--accent);
    border: 3px solid var(--text);
    padding: 24px;
    box-shadow: 4px 4px 0 var(--text);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: default;
  }

  [data-theme="neo"] .neo-card-stat:hover {
    box-shadow: 6px 6px 0 var(--text);
    transform: translate(-2px, -2px);
  }

  /* FEATURED card — black bg, yellow text, big stat */
  [data-theme="neo"] .neo-card-featured {
    background: var(--text);
    border: 3px solid var(--text);
    padding: 28px;
    box-shadow: 6px 6px 0 var(--accent);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: default;
  }

  [data-theme="neo"] .neo-card-featured:hover {
    box-shadow: 8px 8px 0 var(--accent);
    transform: translate(-2px, -2px);
  }

  [data-theme="neo"] .neo-card-featured-label {
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    background: transparent;
  }

  [data-theme="neo"] .neo-card-notice {
    background: var(--accent-2);
    border: 3px solid var(--text);
    padding: 20px;
    box-shadow: 4px 4px 0 var(--text);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: default;
  }

  [data-theme="neo"] .neo-card-notice:hover {
    box-shadow: 6px 6px 0 var(--text);
    transform: translate(-2px, -2px);
  }

  [data-theme="neo"] .neo-stat-number {
    font-family: var(--font-body);
    font-size: 56px;
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.04em;
    color: var(--text);
    margin: 0;
  }

  [data-theme="neo"] .neo-stat-label {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text);
    margin-top: 4px;
    opacity: 0.7;
  }

  [data-theme="neo"] .neo-feature-icon {
    font-size: 32px;
    margin-bottom: 12px;
    display: block;
    line-height: 1;
  }

  /* ── ALERT BOX ──────────────────────────────────── */
  [data-theme="neo"] .neo-alert {
    width: 100%;
    background: var(--accent-2);
    border: 3px solid var(--text);
    padding: 16px 20px;
    box-shadow: 4px 4px 0 var(--text);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* ── GRID ───────────────────────────────────────── */
  [data-theme="neo"] .neo-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  [data-theme="neo"] .neo-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 720px) {
    [data-theme="neo"] .neo-grid-3 {
      grid-template-columns: 1fr;
    }
    [data-theme="neo"] .neo-hero-title {
      font-size: 48px;
    }
    [data-theme="neo"] .neo-card-featured-stat {
      font-size: 56px;
    }
  }

  /* ── DARK MODE ── */
  [data-theme="neo"][data-mode="dark"] {
    --bg: #111111;
    --sidebar-bg: #1a1a1a;
    --border: #ffffff;
    --text: #ffffff;
    --text-muted: #aaaaaa;
    --accent: #ffdd00;
    --accent-2: #ff4747;
    --card-bg: #1a1a1a;
    --input-bg: #222222;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const NeobrutalismShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const currentColors = colors || defaultColors;
  const [btnPressed, setBtnPressed] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

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

  return (
    <div style={{
      ...customStyle,
      background: "var(--bg)",
      color: "var(--text)",
      minHeight: "100%",
      padding: "40px",
      fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
      maxWidth: "900px",
      margin: "0 auto",
    }}>

      {/* ── HERO HEADLINE ── */}
      <section style={{ borderBottom: "5px solid #000", paddingBottom: "32px", marginBottom: "40px" }}>
        <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px" }}>
          Vol. 01 — The Internet Is Broken
        </div>
        <h1 style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontSize: "clamp(56px, 10vw, 104px)",
          fontWeight: 800,
          lineHeight: 0.88,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          margin: "0 0 20px 0",
          color: "var(--text)",
        }}>
          DESIGN<br />
          <span style={{ color: "var(--accent)", WebkitTextStroke: "3px #000" }}>MUST</span><br />
          CONFRONT
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <span style={{
            display: "inline-block",
            background: "var(--accent-2)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "6px 14px",
            border: "3px solid #000",
            boxShadow: "4px 4px 0 #000",
          }}>Manifesto</span>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 600, lineHeight: 1.5, margin: 0, maxWidth: "540px", color: "var(--text)" }}>
            Brutalism rejects polish as dishonesty. Raw structure IS the aesthetic. Every pixel must earn its place or get the hell out.
          </p>
        </div>
      </section>

      {/* ── STAT CARDS ── */}
      <section style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "3px solid #000", paddingBottom: "8px", marginBottom: "20px" }}>
          By the Numbers
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { n: "847K", label: "Lines Deleted", bg: "var(--accent)" },
            { n: "99%", label: "Less Bullshit", bg: "#fff" },
            { n: "∞", label: "Hard Shadows", bg: "var(--accent-2)", color: "#fff" },
          ].map(({ n, label, bg, color }) => (
            <div key={label} style={{
              background: bg,
              border: "3px solid #000",
              padding: "24px",
              boxShadow: "4px 4px 0 #000",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #000";
              }}
            >
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "56px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", color: color || "var(--text)" }}>{n}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "6px", opacity: 0.75, color: color || "var(--text)" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "3px solid #000", paddingBottom: "8px", marginBottom: "20px" }}>
          Core Principles
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { icon: "⚡", title: "Zero Radius", body: "Border-radius is a lie we tell ourselves to feel safe. Square edges only. Nature doesn't apologize for corners." },
            { icon: "🖤", title: "Hard Shadows", body: "box-shadow: 4px 4px 0 #000. No blur. No spread. Just raw offset like a punch you see coming." },
            { icon: "📐", title: "Thick Borders", body: "3px minimum. Borders that mean business. Borders that show up. Borders you can trust." },
            { icon: "🔴", title: "Contrast Or Die", body: "If you can't read it from across the room, it doesn't belong on the screen. Accessibility through force." },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{
              background: "var(--card-bg)",
              border: "3px solid #000",
              padding: "24px",
              boxShadow: "4px 4px 0 #000",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #000";
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px", lineHeight: 1 }}>{icon}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: "10px" }}>{title}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 500, lineHeight: 1.6, color: "var(--text-muted)" }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "3px solid #000", paddingBottom: "8px", marginBottom: "20px" }}>
          Join The Resistance
        </div>
        <div style={{ background: "var(--card-bg)", border: "3px solid #000", padding: "28px", boxShadow: "4px 4px 0 #000" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="Klaus Baumeister"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  background: "var(--input-bg)",
                  border: "3px solid #000",
                  padding: "10px 14px",
                  width: "100%",
                  boxShadow: "4px 4px 0 #000",
                  outline: "none",
                  color: "var(--text)",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                Your Email
              </label>
              <input
                type="email"
                placeholder="rage@brutalism.io"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  background: "var(--input-bg)",
                  border: "3px solid #000",
                  padding: "10px 14px",
                  width: "100%",
                  boxShadow: "4px 4px 0 #000",
                  outline: "none",
                  color: "var(--text)",
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              Your Manifesto
            </label>
            <textarea
              placeholder="State your grievances with modern design..."
              rows={3}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                background: "var(--input-bg)",
                border: "3px solid #000",
                padding: "10px 14px",
                width: "100%",
                boxShadow: "4px 4px 0 #000",
                outline: "none",
                resize: "vertical",
                color: "var(--text)",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button
              onMouseDown={() => setSubmitPressed(true)}
              onMouseUp={() => setSubmitPressed(false)}
              onMouseLeave={() => setSubmitPressed(false)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "var(--accent)",
                color: "#000",
                border: "3px solid #000",
                padding: "12px 28px",
                cursor: "pointer",
                boxShadow: submitPressed ? "0 0 0 #000" : "4px 4px 0 #000",
                transform: submitPressed ? "translate(4px, 4px)" : "none",
                transition: "transform 0.06s, box-shadow 0.06s",
              }}
            >
              Submit Manifesto
            </button>
            <button
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "transparent",
                color: "var(--text)",
                border: "3px solid #000",
                padding: "12px 28px",
                cursor: "pointer",
                boxShadow: "4px 4px 0 #000",
                transition: "transform 0.08s, box-shadow 0.08s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-1px, -1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 #000";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #000";
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </section>

      {/* ── TAG/BADGE SYSTEM ── */}
      <section style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "3px solid #000", paddingBottom: "8px", marginBottom: "20px" }}>
          Taxonomy
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[
            { label: "No Gradients", bg: "var(--accent)" },
            { label: "No Rounded Corners", bg: "#fff" },
            { label: "LOUD", bg: "var(--accent-2)", color: "#fff" },
            { label: "Confrontational", bg: "#000", color: "#fff" },
            { label: "Grid-Aware", bg: "var(--accent)" },
            { label: "Anti-Skeuomorphism", bg: "#fff" },
            { label: "Post-Flat", bg: "var(--accent-2)", color: "#fff" },
          ].map(({ label, bg, color }) => (
            <span key={label} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: bg,
              color: color || "var(--text)",
              border: "2px solid #000",
              padding: "5px 12px",
              boxShadow: "2px 2px 0 #000",
              display: "inline-block",
            }}>{label}</span>
          ))}
        </div>
      </section>

      {/* ── PRICING CARD ── */}
      <section style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "3px solid #000", paddingBottom: "8px", marginBottom: "20px" }}>
          Pricing
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          {[
            { name: "AMATEUR", price: "Free", features: ["1 project", "Soft shadows allowed", "Rounded corners (gross)", "Gradients OK"], highlight: false },
            { name: "BRUTE", price: "$29", features: ["Unlimited projects", "Hard shadows only", "Zero radius enforced", "Bold typography toolkit", "Manifesto generator"], highlight: true },
            { name: "ARCHITECT", price: "$99", features: ["Everything in Brute", "Custom CSS injection", "White-label system", "Priority brutality", "Quarterly design audit"], highlight: false },
          ].map(({ name, price, features, highlight }) => (
            <div key={name} style={{
              background: highlight ? "var(--accent)" : "var(--card-bg)",
              border: "3px solid #000",
              padding: "24px",
              boxShadow: highlight ? "6px 6px 0 #000" : "4px 4px 0 #000",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = highlight ? "8px 8px 0 #000" : "6px 6px 0 #000";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = highlight ? "6px 6px 0 #000" : "4px 4px 0 #000";
              }}
            >
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px", opacity: 0.7 }}>{name}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "48px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em" }}>{price}</div>
                {price !== "Free" && <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 600, opacity: 0.6 }}>/month</div>}
              </div>
              <div style={{ borderTop: "2px solid #000", paddingTop: "16px" }}>
                {features.map(f => (
                  <div key={f} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 600, lineHeight: 1.8, display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 800 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onMouseDown={() => setBtnPressed(true)}
                onMouseUp={() => setBtnPressed(false)}
                onMouseLeave={() => setBtnPressed(false)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: highlight ? "#000" : "var(--accent)",
                  color: highlight ? "var(--accent)" : "#000",
                  border: "3px solid #000",
                  padding: "10px 16px",
                  cursor: "pointer",
                  boxShadow: "3px 3px 0 #000",
                  transition: "transform 0.06s, box-shadow 0.06s",
                  marginTop: "auto",
                }}
              >
                Get {name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── TYPOGRAPHY SPECIMEN ── */}
      <section>
        <div style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "3px solid #000", paddingBottom: "8px", marginBottom: "20px" }}>
          Type Specimen — Space Grotesk
        </div>
        <div style={{ background: "var(--card-bg)", border: "3px solid #000", padding: "28px", boxShadow: "4px 4px 0 #000" }}>
          {[
            { size: "80px", weight: 800, text: "Aa" },
            { size: "48px", weight: 800, text: "HEADLINE 800" },
            { size: "32px", weight: 700, text: "Subheading 700" },
            { size: "18px", weight: 600, text: "Body Copy 600 — The quick brown fox jumps over the lazy dog" },
            { size: "14px", weight: 500, text: "Caption 500 — Smaller supporting text for auxiliary information" },
          ].map(({ size, weight, text }) => (
            <div key={size} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: size,
              fontWeight: weight,
              lineHeight: 1.15,
              letterSpacing: weight >= 800 ? "-0.03em" : "0",
              borderBottom: "1px solid #ccc",
              paddingBottom: "12px",
              marginBottom: "12px",
              color: "var(--text)",
            }}>{text}</div>
          ))}
          <code style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "14px",
            fontWeight: 700,
            background: "var(--accent)",
            color: "var(--text)",
            padding: "4px 10px",
            border: "2px solid #000",
          }}>monospace — CODE BLOCK</code>
        </div>
      </section>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#fffbf0",
  sidebarBg: "#fff9e6",
  border:    "#000000",
  text:      "#1a1a1a",
  textMuted: "#555555",
  accent:    "#ffdd00",
  accent2:   "#ff4747",
  cardBg:    "#ffffff",
  inputBg:   "#ffffff",
};

export const NeobrutalismTheme: ThemeDefinition = {
  id: "neobrutalism",
  name: "Neobrutalism",
  emoji: "✊",
  description: "Raw confrontational design: hard 4px offset shadows, thick black borders, zero radius, loud yellow + red accents. Beauty is a lie. Structure is truth.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg:        "#111111",
      sidebarBg: "#1a1a1a",
      border:    "#ffffff",
      text:      "#ffffff",
      textMuted: "#aaaaaa",
      accent:    "#ffdd00",
      accent2:   "#ff4747",
      cardBg:    "#1a1a1a",
      inputBg:   "#222222",
    }
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: NeobrutalismShowcase,
};
