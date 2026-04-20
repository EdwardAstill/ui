import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');

  [data-theme="swiss"] {
    --bg: #ffffff;
    --sidebar-bg: #f5f5f5;
    --border: #111111;
    --text: #111111;
    --text-muted: #666666;
    --accent: #ff0000;
    --accent-2: #0066ff;
    --card-bg: #ffffff;
    --input-bg: #f5f5f5;
    --font-body: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    --font-mono: 'Courier New', Courier, monospace;
    --radius: 0px;
  }

  [data-theme="swiss"] * {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  [data-theme="swiss"] .sidebar {
    background: #f5f5f5 !important;
    border-right: 2px solid #111111 !important;
  }

  [data-theme="swiss"] .sidebar-item.active {
    background: #ff0000 !important;
    color: #ffffff !important;
    border-radius: 0 !important;
  }

  [data-theme="swiss"] .sidebar-item:hover:not(.active) {
    background: #111111 !important;
    color: #ffffff !important;
    border-radius: 0 !important;
  }

  /* ── DARK MODE ── */
  [data-theme="swiss"][data-mode="dark"] {
    --bg: #111111;
    --sidebar-bg: #1a1a1a;
    --border: #eeeeee;
    --text: #eeeeee;
    --text-muted: #888888;
    --card-bg: #1a1a1a;
    --input-bg: #222222;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const SwissShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
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

  const red = currentColors.accent || "#ff0000";
  const black = currentColors.text || "#111111";
  const muted = currentColors.textMuted || "#666666";
  const bg = currentColors.bg || "#ffffff";
  const cardBg = currentColors.cardBg || "#ffffff";
  const inputBg = currentColors.inputBg || "#f5f5f5";

  return (
    <div style={{
      ...customStyle,
      background: bg,
      color: black,
      minHeight: "100%",
      fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      maxWidth: "960px",
      margin: "0 auto",
      padding: "0",
    }}>

      {/* ── MASTHEAD ── */}
      <header style={{
        borderBottom: `4px solid ${black}`,
        padding: "40px 48px 32px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "flex-end",
        gap: "24px",
      }}>
        <div>
          <div style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: red,
            marginBottom: "12px",
          }}>
            Internationale Typografische Gesellschaft — Est. 1959
          </div>
          <h1 style={{
            fontSize: "80px",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: black,
            margin: 0,
          }}>
            SWISS
          </h1>
          <div style={{
            height: "6px",
            background: red,
            width: "180px",
            marginTop: "16px",
          }} />
        </div>
        <div style={{ textAlign: "right", paddingBottom: "8px" }}>
          <div style={{ fontSize: "13px", color: muted, letterSpacing: "0.05em" }}>Vol. 12 / No. 4</div>
          <div style={{ fontSize: "13px", color: muted, letterSpacing: "0.05em" }}>April 2026</div>
        </div>
      </header>

      {/* ── NAVIGATION STRIP ── */}
      <nav style={{
        borderBottom: `2px solid ${black}`,
        display: "flex",
        alignItems: "stretch",
      }}>
        {["DESIGN", "TYPOGRAPHY", "GRID", "COLOR", "MOTION"].map((item, i) => (
          <div key={item} style={{
            padding: "14px 24px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            cursor: "pointer",
            borderRight: `1px solid ${black}`,
            background: i === 0 ? red : "transparent",
            color: i === 0 ? "#ffffff" : black,
            display: "flex",
            alignItems: "center",
          }}>
            {item}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{
          padding: "14px 24px",
          fontSize: "11px",
          fontWeight: 500,
          color: muted,
          letterSpacing: "0.06em",
          display: "flex",
          alignItems: "center",
        }}>
          ↑ Issue Archive
        </div>
      </nav>

      {/* ── MAIN GRID ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        borderBottom: `2px solid ${black}`,
      }}>
        {/* Left: Editorial Lead */}
        <div style={{ padding: "48px", borderRight: `2px solid ${black}` }}>
          {/* Pull quote */}
          <blockquote style={{
            borderLeft: `6px solid ${red}`,
            paddingLeft: "24px",
            margin: "0 0 40px",
          }}>
            <p style={{
              fontSize: "36px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              margin: 0,
              color: black,
            }}>
              "FORM FOLLOWS FUNCTION. CLARITY IS THE ULTIMATE SOPHISTICATION."
            </p>
            <footer style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: red,
              marginTop: "16px",
            }}>
              — Josef Müller-Brockmann, 1961
            </footer>
          </blockquote>

          {/* Manifesto */}
          <div style={{
            borderLeft: `4px solid ${red}`,
            paddingLeft: "20px",
            marginBottom: "40px",
          }}>
            <h2 style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: red,
              margin: "0 0 12px",
            }}>
              MANIFESTO
            </h2>
            <p style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: black,
              margin: 0,
              fontWeight: 400,
            }}>
              The grid is not a constraint — it is liberation. Mathematical
              precision in layout creates visual harmony that transcends
              cultural boundaries. White space is not empty; it is the
              breath between ideas. Typography is the foundation of all
              visual communication. Red signals urgency, truth, vitality.
            </p>
          </div>

          {/* Typography scale */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: muted,
              marginBottom: "20px",
              borderBottom: `1px solid ${black}`,
              paddingBottom: "8px",
            }}>
              TYPOGRAPHIC SCALE
            </div>
            {[
              { size: "72px", weight: 900, label: "Display / 72px / Black" },
              { size: "48px", weight: 700, label: "Headline / 48px / Bold" },
              { size: "28px", weight: 700, label: "Title / 28px / Bold" },
              { size: "18px", weight: 500, label: "Subhead / 18px / Medium" },
              { size: "15px", weight: 400, label: "Body / 15px / Regular" },
              { size: "12px", weight: 400, label: "Caption / 12px / Regular" },
            ].map(({ size, weight, label }) => (
              <div key={label} style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "baseline",
                borderBottom: `1px solid ${inputBg}`,
                padding: "8px 0",
                gap: "16px",
              }}>
                <span style={{ fontSize: size, fontWeight: weight, lineHeight: 1.1, color: black }}>
                  Aa
                </span>
                <span style={{ fontSize: "11px", color: muted, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Color blocks */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ background: black, height: "80px" }} />
            <div style={{ background: red, height: "80px" }} />
            <div style={{ background: "#f5f5f5", height: "40px", borderBottom: `1px solid ${black}` }} />
            <div style={{ background: "#666666", height: "40px", borderBottom: `1px solid ${black}` }} />
          </div>

          {/* Data table */}
          <div style={{ padding: "32px 28px", borderTop: `2px solid ${black}` }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: muted,
              marginBottom: "16px",
            }}>
              GRID METRICS
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${black}` }}>
                  <th style={{ textAlign: "left", padding: "6px 0", fontWeight: 700, letterSpacing: "0.06em", fontSize: "10px", textTransform: "uppercase", color: muted }}>PROPERTY</th>
                  <th style={{ textAlign: "right", padding: "6px 0", fontWeight: 700, letterSpacing: "0.06em", fontSize: "10px", textTransform: "uppercase", color: muted }}>VALUE</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Column width", "60px"],
                  ["Gutter", "20px"],
                  ["Columns", "12"],
                  ["Max width", "960px"],
                  ["Base unit", "8px"],
                  ["Line height", "1.5"],
                  ["Base size", "16px"],
                  ["Border radius", "0"],
                ].map(([prop, val]) => (
                  <tr key={prop} style={{ borderBottom: `1px solid ${inputBg}` }}>
                    <td style={{ padding: "9px 0", color: black, fontWeight: 400 }}>{prop}</td>
                    <td style={{ padding: "9px 0", textAlign: "right", color: red, fontWeight: 700, fontFamily: "'Courier New', monospace" }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats */}
          <div style={{
            borderTop: `2px solid ${black}`,
            padding: "28px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: black,
          }}>
            {[
              { label: "TYPEFACES", val: "2" },
              { label: "WEIGHTS", val: "5" },
              { label: "COLUMNS", val: "12" },
              { label: "COLORS", val: "3" },
            ].map(({ label, val }) => (
              <div key={label} style={{
                background: cardBg,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}>
                <div style={{ fontSize: "40px", fontWeight: 900, color: black, lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: red, textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION: Principles grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderBottom: `2px solid ${black}`,
        background: black,
        gap: "1px",
      }}>
        {[
          { num: "01", title: "ORDER", desc: "Every element occupies its rightful place in the hierarchy." },
          { num: "02", title: "CLARITY", desc: "Communication stripped of all unnecessary decoration." },
          { num: "03", title: "PRECISION", desc: "Mathematical accuracy in spacing, sizing, alignment." },
          { num: "04", title: "UTILITY", desc: "Purpose drives form. Function over aesthetics always." },
        ].map(({ num, title, desc }) => (
          <div key={num} style={{
            background: cardBg,
            padding: "32px 28px",
          }}>
            <div style={{ fontSize: "48px", fontWeight: 900, color: inputBg, lineHeight: 1, marginBottom: "12px" }}>{num}</div>
            <div style={{ fontSize: "14px", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: black, marginBottom: "10px" }}>{title}</div>
            <div style={{ height: "2px", background: red, width: "24px", marginBottom: "12px" }} />
            <p style={{ fontSize: "12px", lineHeight: 1.6, color: muted, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "24px 48px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        borderTop: `4px solid ${red}`,
      }}>
        <div style={{
          fontSize: "11px",
          color: muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          International Typographic Style — Swiss Design System — Since 1950
        </div>
        <div style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: red,
        }}>
          HELVETICA · GRID · ORDER
        </div>
      </footer>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#ffffff",
  sidebarBg: "#f5f5f5",
  border:    "#111111",
  text:      "#111111",
  textMuted: "#666666",
  accent:    "#ff0000",
  accent2:   "#0066ff",
  cardBg:    "#ffffff",
  inputBg:   "#f5f5f5",
};

export const SwissTheme: ThemeDefinition = {
  id: "swiss",
  name: "Swiss",
  emoji: "🇨🇭",
  description: "International Typographic Style — strict grid, black & red, zero decoration, pure typographic hierarchy.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg:        "#111111",
      sidebarBg: "#1a1a1a",
      border:    "#eeeeee",
      text:      "#eeeeee",
      textMuted: "#888888",
      accent:    "#ff0000",
      accent2:   "#4499ff",
      cardBg:    "#1a1a1a",
      inputBg:   "#222222",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: SwissShowcase,
};
