import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

  [data-theme="pastel"] {
    --bg: #fdf6ff;
    --sidebar-bg: #f5eeff;
    --border: #e5d5f5;
    --text: #3d2952;
    --text-muted: #9b7ab5;
    --accent: #9333ea;
    --accent-2: #f472b6;
    --card-bg: #ffffff;
    --input-bg: #ffffff;
    --font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
    --radius: 16px;

    --mint:     #a8edea;
    --peach:    #fed6a8;
    --rose:     #f9a8d4;
    --sky:      #7dd3fc;
    --lavender: #c4b5fd;
    --pink:     #f472b6;
  }

  /* ─────────────────────────────────────────
     Typography
  ───────────────────────────────────────── */
  [data-theme="pastel"] .p-h1 {
    font-family: var(--font-body);
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.03em;
    color: var(--text);
  }

  [data-theme="pastel"] .p-h2 {
    font-family: var(--font-body);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.02em;
    color: var(--text);
  }

  [data-theme="pastel"] .p-h3 {
    font-family: var(--font-body);
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--text);
  }

  [data-theme="pastel"] .p-body {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text);
  }

  [data-theme="pastel"] .p-muted {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--text-muted);
  }

  [data-theme="pastel"] .p-code {
    font-family: var(--font-mono);
    font-size: 0.875em;
    background: #f0e4ff;
    color: #7c3aed;
    padding: 0.125em 0.4em;
    border-radius: 6px;
  }

  /* ─────────────────────────────────────────
     Hero
  ───────────────────────────────────────── */
  [data-theme="pastel"] .p-hero {
    background: linear-gradient(135deg, #fdf6ff 0%, #fce7f3 50%, #f0fdf4 100%);
    border-radius: 24px;
    border: 1px solid rgba(192,132,252,0.12);
    position: relative;
    overflow: hidden;
  }

  [data-theme="pastel"] .p-hero::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(249,168,212,0.22) 0%, transparent 70%);
    pointer-events: none;
  }

  [data-theme="pastel"] .p-hero::after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: -40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(134,239,172,0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  [data-theme="pastel"] .p-hero-title {
    font-family: var(--font-body);
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.04em;
    background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #34d399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    z-index: 1;
  }

  [data-theme="pastel"] .p-hero-subtitle {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-muted);
    max-width: 480px;
    position: relative;
    z-index: 1;
  }

  [data-theme="pastel"] .p-hero-emojis {
    display: flex;
    gap: 12px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  [data-theme="pastel"] .p-hero-emoji {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(192,132,252,0.2);
    font-size: 1.25rem;
    box-shadow: 0 4px 12px rgba(192, 132, 252, 0.15);
    animation: p-float 3s ease-in-out infinite;
  }

  [data-theme="pastel"] .p-hero-emoji:nth-child(1) { animation-delay: 0s; }
  [data-theme="pastel"] .p-hero-emoji:nth-child(2) { animation-delay: 0.4s; }
  [data-theme="pastel"] .p-hero-emoji:nth-child(3) { animation-delay: 0.8s; }
  [data-theme="pastel"] .p-hero-emoji:nth-child(4) { animation-delay: 1.2s; }
  [data-theme="pastel"] .p-hero-emoji:nth-child(5) { animation-delay: 1.6s; }

  @keyframes p-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }

  /* ─────────────────────────────────────────
     Color pills
  ───────────────────────────────────────── */
  [data-theme="pastel"] .p-color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }

  [data-theme="pastel"] .p-color-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 999px;
    border: 1px solid rgba(0,0,0,0.06);
    background: var(--card-bg);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: default;
  }

  [data-theme="pastel"] .p-color-pill:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(192,132,252,0.18);
  }

  [data-theme="pastel"] .p-color-dot {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid rgba(0,0,0,0.08);
  }

  [data-theme="pastel"] .p-color-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text);
    white-space: nowrap;
  }

  [data-theme="pastel"] .p-color-hex {
    font-size: 0.6875rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  /* ─────────────────────────────────────────
     Cards
  ───────────────────────────────────────── */
  [data-theme="pastel"] .p-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }

  [data-theme="pastel"] .p-card {
    background: var(--card-bg);
    border: 1px solid rgba(192,132,252,0.1);
    border-radius: var(--radius);
    padding: 24px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  [data-theme="pastel"] .p-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(192, 132, 252, 0.2);
  }

  /* ─────────────────────────────────────────
     Tags
  ───────────────────────────────────────── */
  [data-theme="pastel"] .p-tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  [data-theme="pastel"] .p-tag {
    display: inline-flex;
    align-items: center;
    padding: 5px 14px;
    border-radius: 999px;
    font-weight: 500;
    border: 1px solid transparent;
    font-size: 0.875rem;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  [data-theme="pastel"] .p-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(192,132,252,0.2);
  }

  [data-theme="pastel"] .p-tag-lavender { background: #f0e4ff; color: #6d28d9; border-color: #ddd6fe; }
  [data-theme="pastel"] .p-tag-rose     { background: #fff0f3; color: #be123c; border-color: #fecdd3; }
  [data-theme="pastel"] .p-tag-mint     { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
  [data-theme="pastel"] .p-tag-peach    { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }
  [data-theme="pastel"] .p-tag-sky      { background: #f0f9ff; color: #0369a1; border-color: #bae6fd; }
  [data-theme="pastel"] .p-tag-pink     { background: #fdf2f8; color: #9d174d; border-color: #f9a8d4; }

  /* ─────────────────────────────────────────
     Progress bars
  ───────────────────────────────────────── */
  [data-theme="pastel"] .p-progress-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  [data-theme="pastel"] .p-progress-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  [data-theme="pastel"] .p-progress-track {
    height: 10px;
    border-radius: 999px;
    background: #f0e4ff;
    overflow: hidden;
  }

  [data-theme="pastel"] .p-progress-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [data-theme="pastel"] .p-progress-lavender { background: linear-gradient(90deg, #c084fc 0%, #a855f7 100%); }
  [data-theme="pastel"] .p-progress-pink     { background: linear-gradient(90deg, #f9a8d4 0%, #ec4899 100%); }
  [data-theme="pastel"] .p-progress-mint     { background: linear-gradient(90deg, #86efac 0%, #22c55e 100%); }
  [data-theme="pastel"] .p-progress-peach    { background: linear-gradient(90deg, #fdba74 0%, #f97316 100%); }

  /* ── DARK MODE ── */
  [data-theme="pastel"][data-mode="dark"] {
    --bg: #1e1628;
    --sidebar-bg: #251c32;
    --border: #3d2952;
    --text: #e8d8f8;
    --text-muted: #9b7ab5;
    --card-bg: #251c32;
    --input-bg: #2d2038;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const PastelShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
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

  const accent  = currentColors.accent  || "#9333ea";
  const accent2 = currentColors.accent2 || "#f472b6";
  const textCol = currentColors.text    || "#3d2952";
  const muted   = currentColors.textMuted || "#9b7ab5";
  const cardBg  = currentColors.cardBg  || "#ffffff";
  const border  = currentColors.border  || "#e5d5f5";
  const bg      = currentColors.bg      || "#fdf6ff";

  const paletteColors = [
    { name: "Mint",     hex: "#a8edea", textCol: "#047857" },
    { name: "Peach",    hex: "#fed6a8", textCol: "#92400e" },
    { name: "Rose",     hex: "#f9a8d4", textCol: "#9d174d" },
    { name: "Sky",      hex: "#7dd3fc", textCol: "#0369a1" },
    { name: "Lavender", hex: "#c4b5fd", textCol: "#5b21b6" },
    { name: "Pink",     hex: "#f472b6", textCol: "#831843" },
  ];

  const highlights = [
    { emoji: "🌿", title: "Morning Walk", sub: "32 min · 2.4 km", bg: "#f0fdf4", border: "#bbf7d0", textAccent: "#15803d" },
    { emoji: "📚", title: "Reading Time", sub: "45 pages · Fiction", bg: "#fdf4ff", border: "#e9d5ff", textAccent: "#7e22ce" },
    { emoji: "🧘", title: "Meditation", sub: "10 min · Calm", bg: "#fff7ed", border: "#fed7aa", textAccent: "#c2410c" },
  ];

  const wellness = [
    { label: "Hydration",    pct: 78, cls: "p-progress-sky",      color: "linear-gradient(90deg,#7dd3fc,#38bdf8)" },
    { label: "Sleep",        pct: 85, cls: "p-progress-lavender",  color: "linear-gradient(90deg,#c084fc,#a855f7)" },
    { label: "Movement",     pct: 62, cls: "p-progress-mint",      color: "linear-gradient(90deg,#86efac,#22c55e)" },
    { label: "Mindfulness",  pct: 90, cls: "p-progress-pink",      color: "linear-gradient(90deg,#f9a8d4,#ec4899)" },
  ];

  return (
    <div style={{
      ...customStyle,
      background: bg,
      color: textCol,
      minHeight: "100%",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      padding: "0",
    }}>
      {/* ── HERO ── */}
      <div className="p-hero" style={{
        margin: "0",
        padding: "48px",
        background: "linear-gradient(135deg, #fdf6ff 0%, #fce7f3 50%, #f0fdf4 100%)",
        borderRadius: "0",
        borderBottom: `1px solid ${border}`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,168,212,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(134,239,172,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          {["🌸", "✨", "🌿", "💜", "🌈"].map((e, i) => (
            <div key={i} style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(192,132,252,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.25rem",
              boxShadow: "0 4px 12px rgba(192,132,252,0.15)",
            }}>{e}</div>
          ))}
        </div>

        <h1 style={{
          fontSize: "3rem",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          background: "linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #34d399 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: "0 0 12px",
        }}>
          Your Soft Space
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.65, color: muted, maxWidth: "460px", margin: "0 0 24px" }}>
          A gentle, airy design language built for moments of clarity, calm, and quiet joy.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button style={{
            padding: "10px 24px",
            background: "linear-gradient(135deg, #c084fc, #a855f7)",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(192,132,252,0.35)",
          }}>
            Get started
          </button>
          <button style={{
            padding: "10px 24px",
            background: "linear-gradient(135deg, #fce7f3, #fbcfe8)",
            color: "#be185d",
            border: "1px solid rgba(249,168,212,0.4)",
            borderRadius: "999px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}>
            Learn more
          </button>
        </div>
      </div>

      <div style={{ padding: "40px 48px", display: "flex", flexDirection: "column", gap: "40px" }}>

        {/* ── MOOD BOARD: Extended Palette ── */}
        <section>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, marginBottom: "16px" }}>
            Extended Palette
          </div>
          <div className="p-color-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
            {paletteColors.map(c => (
              <div key={c.name} className="p-color-pill" style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 16px", borderRadius: "999px",
                border: "1px solid rgba(0,0,0,0.06)",
                background: cardBg,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}>
                <div className="p-color-dot" style={{ width: "22px", height: "22px", borderRadius: "50%", background: c.hex, flexShrink: 0, border: "1px solid rgba(0,0,0,0.08)" }} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: textCol }}>{c.name}</div>
                  <div style={{ fontSize: "11px", color: muted, fontFamily: "monospace" }}>{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── USER PROFILE CARD ── */}
        <section style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: "20px",
            padding: "28px",
            width: "220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 4px 16px rgba(192,132,252,0.1)",
          }}>
            {/* Avatar */}
            <div style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: "linear-gradient(135deg, #c084fc, #f9a8d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "28px",
              border: "3px solid #fff",
              boxShadow: "0 4px 12px rgba(192,132,252,0.3)",
            }}>
              🌸
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, color: textCol, fontSize: "15px" }}>Lily Moreau</div>
              <div style={{ fontSize: "12px", color: muted, marginTop: "2px" }}>@lily.designs</div>
            </div>
            <div style={{
              background: "#f0e4ff", color: "#7c3aed",
              padding: "4px 14px", borderRadius: "999px",
              fontSize: "12px", fontWeight: 600,
            }}>
              Pro member
            </div>
            <div style={{ width: "100%", borderTop: `1px solid ${border}`, paddingTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[{ val: "248", lbl: "Posts" }, { val: "1.4k", lbl: "Followers" }].map(({ val, lbl }) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, color: accent, fontSize: "16px" }}>{val}</div>
                  <div style={{ fontSize: "11px", color: muted }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Highlights */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, marginBottom: "16px" }}>
              Today's Highlights
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {highlights.map(h => (
                <div key={h.title} style={{
                  background: h.bg,
                  border: `1px solid ${h.border}`,
                  borderRadius: "14px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}>
                  <span style={{ fontSize: "24px" }}>{h.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: textCol, fontSize: "14px" }}>{h.title}</div>
                    <div style={{ fontSize: "12px", color: h.textAccent, fontWeight: 500, marginTop: "2px" }}>{h.sub}</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: "18px", color: h.textAccent, opacity: 0.5 }}>›</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WELLNESS TRACKER ── */}
        <section>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, marginBottom: "16px" }}>
            Wellness Tracker
          </div>
          <div style={{
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: "20px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxShadow: "0 4px 16px rgba(192,132,252,0.08)",
          }}>
            {wellness.map(w => (
              <div key={w.label} className="p-progress-item" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: textCol }}>{w.label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: muted }}>{w.pct}%</span>
                </div>
                <div className="p-progress-track" style={{ height: "10px", borderRadius: "999px", background: "#f0e4ff", overflow: "hidden" }}>
                  <div className={`p-progress-fill ${w.cls}`} style={{ height: "100%", width: `${w.pct}%`, borderRadius: "999px", background: w.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TAGS ── */}
        <section>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, marginBottom: "16px" }}>
            Topic Tags
          </div>
          <div className="p-tag-cloud" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { cls: "p-tag-lavender", text: "Wellness" },
              { cls: "p-tag-mint",     text: "Nature" },
              { cls: "p-tag-rose",     text: "Self-care" },
              { cls: "p-tag-sky",      text: "Mindfulness" },
              { cls: "p-tag-peach",    text: "Creative" },
              { cls: "p-tag-pink",     text: "Journaling" },
              { cls: "p-tag-lavender", text: "Design" },
              { cls: "p-tag-mint",     text: "Goals" },
              { cls: "p-tag-rose",     text: "Gratitude" },
            ].map(({ cls, text }) => (
              <span key={text} className={`p-tag ${cls}`} style={{
                display: "inline-flex", alignItems: "center",
                padding: "6px 16px", borderRadius: "999px",
                fontWeight: 500, fontSize: "13px",
                border: "1px solid transparent",
                ...(cls === "p-tag-lavender" ? { background: "#f0e4ff", color: "#6d28d9", borderColor: "#ddd6fe" } :
                    cls === "p-tag-mint"     ? { background: "#f0fdf4", color: "#15803d", borderColor: "#bbf7d0" } :
                    cls === "p-tag-rose"     ? { background: "#fff0f3", color: "#be123c", borderColor: "#fecdd3" } :
                    cls === "p-tag-sky"      ? { background: "#f0f9ff", color: "#0369a1", borderColor: "#bae6fd" } :
                    cls === "p-tag-peach"    ? { background: "#fff7ed", color: "#c2410c", borderColor: "#fed7aa" } :
                                              { background: "#fdf2f8", color: "#9d174d", borderColor: "#f9a8d4" }),
              }}>
                {text}
              </span>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          background: "linear-gradient(135deg, #f5eeff 0%, #fce7f3 50%, #ecfdf5 100%)",
          border: `1px solid ${border}`,
          borderRadius: "20px",
          padding: "40px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "16px", left: "24px", fontSize: "1.5rem", color: "rgba(192,132,252,0.3)" }}>✦</div>
          <div style={{ position: "absolute", bottom: "16px", right: "24px", fontSize: "1rem", color: "rgba(249,168,212,0.35)" }}>✦</div>
          <blockquote style={{ maxWidth: "520px", margin: "0 auto 24px" }}>
            <p style={{
              fontSize: "1.25rem",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "#5b2b82",
              margin: 0,
            }}>
              <span style={{ fontSize: "3rem", lineHeight: 0, verticalAlign: "-0.5em", color: "rgba(192,132,252,0.35)", fontStyle: "normal", marginRight: "4px" }}>"</span>
              Design is the silent ambassador of your brand. Make it soft, make it kind.
            </p>
            <div style={{ width: "40px", height: "2px", borderRadius: "999px", background: "linear-gradient(90deg,#c084fc,#f9a8d4)", margin: "16px auto 8px" }} />
            <footer style={{ fontSize: "12px", color: muted, fontWeight: 500, letterSpacing: "0.04em" }}>— Pastel Design System</footer>
          </blockquote>
          <button style={{
            padding: "12px 32px",
            background: "linear-gradient(135deg, #c084fc, #a855f7)",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(192,132,252,0.35)",
          }}>
            Start your journey ✨
          </button>
        </section>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#fdf6ff",
  sidebarBg: "#f5eeff",
  border:    "#e5d5f5",
  text:      "#3d2952",
  textMuted: "#9b7ab5",
  accent:    "#9333ea",
  accent2:   "#f472b6",
  cardBg:    "#ffffff",
  inputBg:   "#ffffff",
};

export const PastelTheme: ThemeDefinition = {
  id: "pastel",
  name: "Pastel",
  emoji: "🌸",
  description: "Soft lavender & purple palette with DM Sans, large radius, gentle gradients — lifestyle-app meets mood board.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Blush": {
      bg:        "#fff5f9",
      sidebarBg: "#ffe4ee",
      border:    "#fecdd3",
      text:      "#4a1a2c",
      textMuted: "#c47a9a",
      accent:    "#e11d48",
      accent2:   "#f472b6",
      cardBg:    "#ffffff",
      inputBg:   "#fff5f9",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: PastelShowcase,
};
