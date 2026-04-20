import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  [data-theme="catppuccin"] {
    --bg: #1e1e2e;
    --sidebar-bg: #181825;
    --border: #313244;
    --text: #cdd6f4;
    --text-muted: #a6adc8;
    --accent: #cba6f7;
    --accent-2: #89b4fa;
    --card-bg: #313244;
    --input-bg: #181825;
    --font-body: system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-mono: "JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace;
    --radius: 8px;

    /* Catppuccin Mocha full palette */
    --ctp-rosewater: #f5e0dc;
    --ctp-flamingo:  #f2cdcd;
    --ctp-pink:      #f5c2e7;
    --ctp-mauve:     #cba6f7;
    --ctp-red:       #f38ba8;
    --ctp-maroon:    #eba0ac;
    --ctp-peach:     #fab387;
    --ctp-yellow:    #f9e2af;
    --ctp-green:     #a6e3a1;
    --ctp-teal:      #94e2d5;
    --ctp-sky:       #89dceb;
    --ctp-sapphire:  #74c7ec;
    --ctp-blue:      #89b4fa;
    --ctp-lavender:  #b4befe;

    /* Surfaces */
    --ctp-base:      #1e1e2e;
    --ctp-mantle:    #181825;
    --ctp-crust:     #11111b;
    --ctp-surface0:  #313244;
    --ctp-surface1:  #45475a;
    --ctp-surface2:  #585b70;
    --ctp-overlay0:  #6c7086;
    --ctp-overlay1:  #7f849c;
    --ctp-subtext0:  #a6adc8;
    --ctp-subtext1:  #bac2de;
    --ctp-text:      #cdd6f4;
  }

  [data-theme="catppuccin"] .sidebar {
    background: #181825 !important;
    border-right: 1px solid #313244 !important;
  }

  [data-theme="catppuccin"] .sidebar-item.active {
    background: rgba(203,166,247,0.15) !important;
    color: #cba6f7 !important;
    border-radius: 6px;
    margin: 2px 8px;
    width: calc(100% - 16px);
    padding-left: 12px;
    border-left: 2px solid #cba6f7;
  }

  [data-theme="catppuccin"] .sidebar-item:hover:not(.active) {
    background: rgba(205,214,244,0.07) !important;
    border-radius: 6px;
    margin: 2px 8px;
    width: calc(100% - 16px);
    padding-left: 12px;
  }

  /* ── DARK MODE (Latte — light variant) ── */
  [data-theme="catppuccin"][data-mode="dark"] {
    --bg: #11111b;
    --sidebar-bg: #181825;
    --border: #1e1e2e;
    --card-bg: #181825;
    --input-bg: #11111b;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const CatppuccinShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
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

  const base    = "#1e1e2e";
  const mantle  = "#181825";
  const crust   = "#11111b";
  const surf0   = "#313244";
  const surf1   = "#45475a";
  const text    = "#cdd6f4";
  const sub0    = "#a6adc8";
  const sub1    = "#bac2de";

  // Full accent palette
  const accents = [
    { name: "Rosewater", hex: "#f5e0dc" },
    { name: "Flamingo",  hex: "#f2cdcd" },
    { name: "Pink",      hex: "#f5c2e7" },
    { name: "Mauve",     hex: "#cba6f7" },
    { name: "Red",       hex: "#f38ba8" },
    { name: "Maroon",    hex: "#eba0ac" },
    { name: "Peach",     hex: "#fab387" },
    { name: "Yellow",    hex: "#f9e2af" },
    { name: "Green",     hex: "#a6e3a1" },
    { name: "Teal",      hex: "#94e2d5" },
    { name: "Sky",       hex: "#89dceb" },
    { name: "Sapphire",  hex: "#74c7ec" },
    { name: "Blue",      hex: "#89b4fa" },
    { name: "Lavender",  hex: "#b4befe" },
  ];

  // Flavor variants
  const flavors = [
    { name: "Latte",     bg: "#eff1f5", text: "#4c4f69", border: "#ccd0da" },
    { name: "Frappé",    bg: "#303446", text: "#c6d0f5", border: "#414559" },
    { name: "Macchiato", bg: "#24273a", text: "#cad3f5", border: "#363a4f" },
    { name: "Mocha",     bg: "#1e1e2e", text: "#cdd6f4", border: "#313244", active: true },
  ];

  return (
    <div style={{
      ...customStyle,
      background: base,
      color: text,
      minHeight: "100%",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      padding: "0",
    }}>
      {/* ── HEADER ── */}
      <header style={{
        background: mantle,
        borderBottom: `1px solid ${surf0}`,
        padding: "32px 40px 28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <span style={{ fontSize: "32px" }}>🐱</span>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#cba6f7", margin: 0, letterSpacing: "-0.02em" }}>
              Catppuccin
            </h1>
            <p style={{ fontSize: "13px", color: sub0, margin: 0, marginTop: "2px" }}>
              Soothing pastel theme for the high-spirited
            </p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <span style={{ fontSize: "12px", background: "rgba(203,166,247,0.15)", color: "#cba6f7", padding: "4px 12px", borderRadius: "999px", border: "1px solid rgba(203,166,247,0.3)" }}>v2.0 Mocha</span>
          </div>
        </div>

        {/* Flavor chips */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {flavors.map(f => (
            <div key={f.name} style={{
              background: f.bg,
              color: f.text,
              border: `1px solid ${f.border}`,
              padding: "6px 16px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: f.active ? 700 : 500,
              outline: f.active ? "2px solid #cba6f7" : "none",
              outlineOffset: "2px",
            }}>
              {f.name}
            </div>
          ))}
        </div>
      </header>

      <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* ── 14-COLOR ACCENT STRIP ── */}
        <section>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: sub0, marginBottom: "14px" }}>
            Accent Palette — 14 Colors
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
            {accents.map(a => (
              <div key={a.name} style={{
                background: surf0,
                border: `1px solid ${surf1}`,
                borderRadius: "6px",
                padding: "10px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}>
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: a.hex,
                  boxShadow: `0 0 10px ${a.hex}55`,
                }} />
                <div style={{ fontSize: "10px", color: sub0, textAlign: "center", letterSpacing: "0.02em" }}>{a.name}</div>
                <div style={{ fontSize: "9px", fontFamily: "monospace", color: surf1.replace(surf1, a.hex) + "cc", color: sub0 }}>{a.hex}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAKE CODE EDITOR ── */}
        <section>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: sub0, marginBottom: "14px" }}>
            Code Editor
          </div>
          <div style={{
            background: crust,
            border: `1px solid ${surf0}`,
            borderRadius: "8px",
            overflow: "hidden",
          }}>
            {/* Editor titlebar */}
            <div style={{
              background: mantle,
              borderBottom: `1px solid ${surf0}`,
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f38ba8" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f9e2af" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#a6e3a1" }} />
              <div style={{ marginLeft: "12px", fontSize: "12px", color: sub0 }}>theme.ts — Catppuccin Mocha</div>
            </div>
            {/* Code content */}
            <div style={{
              padding: "20px 24px",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: "13px",
              lineHeight: 1.8,
            }}>
              <div><span style={{ color: "#6c7086" }}>// 🐱 Catppuccin Mocha</span></div>
              <div><span style={{ color: "#89dceb" }}>const</span><span style={{ color: text }}> palette </span><span style={{ color: "#89b4fa" }}>=</span><span style={{ color: text }}> {"{"}</span></div>
              <div style={{ paddingLeft: "24px" }}><span style={{ color: "#a6e3a1" }}>base</span><span style={{ color: text }}>:      </span><span style={{ color: "#f9e2af" }}>"#1e1e2e"</span><span style={{ color: text }}>,</span></div>
              <div style={{ paddingLeft: "24px" }}><span style={{ color: "#a6e3a1" }}>mauve</span><span style={{ color: text }}>:     </span><span style={{ color: "#f9e2af" }}>"#cba6f7"</span><span style={{ color: text }}>,</span></div>
              <div style={{ paddingLeft: "24px" }}><span style={{ color: "#a6e3a1" }}>blue</span><span style={{ color: text }}>:      </span><span style={{ color: "#f9e2af" }}>"#89b4fa"</span><span style={{ color: text }}>,</span></div>
              <div style={{ paddingLeft: "24px" }}><span style={{ color: "#a6e3a1" }}>green</span><span style={{ color: text }}>:     </span><span style={{ color: "#f9e2af" }}>"#a6e3a1"</span><span style={{ color: text }}>,</span></div>
              <div style={{ paddingLeft: "24px" }}><span style={{ color: "#a6e3a1" }}>peach</span><span style={{ color: text }}>:     </span><span style={{ color: "#f9e2af" }}>"#fab387"</span><span style={{ color: text }}>,</span></div>
              <div><span style={{ color: text }}>{"}"}</span></div>
              <div style={{ marginTop: "8px" }}><span style={{ color: "#89dceb" }}>export</span><span style={{ color: text }}> default palette</span></div>
            </div>
          </div>
        </section>

        {/* ── STATS CARDS ── */}
        <section>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: sub0, marginBottom: "14px" }}>
            Repository Stats
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[
              { icon: "⭐", label: "Stars", value: "14.2k", color: "#f9e2af" },
              { icon: "🍴", label: "Forks", value: "892",   color: "#89b4fa" },
              { icon: "🐛", label: "Issues", value: "43",   color: "#f38ba8" },
              { icon: "🔀", label: "PRs",    value: "12",   color: "#a6e3a1" },
            ].map(({ icon, label, value, color }) => (
              <div key={label} style={{
                background: surf0,
                border: `1px solid ${surf1}`,
                borderRadius: "8px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}>
                <div style={{ fontSize: "20px" }}>{icon}</div>
                <div style={{ fontSize: "28px", fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "12px", color: sub0, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SETTINGS PANEL + ACTIVITY ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Settings */}
          <section>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: sub0, marginBottom: "14px" }}>
              Config Panel
            </div>
            <div style={{
              background: surf0,
              border: `1px solid ${surf1}`,
              borderRadius: "8px",
              overflow: "hidden",
            }}>
              {[
                { label: "Flavor", value: "Mocha", valueColor: "#cba6f7" },
                { label: "Accent", value: "Mauve", valueColor: "#cba6f7" },
                { label: "Transparency", value: "On", valueColor: "#a6e3a1" },
                { label: "Italic keywords", value: "On", valueColor: "#a6e3a1" },
                { label: "Bold operators", value: "Off", valueColor: "#f38ba8" },
                { label: "Font", value: "JetBrains Mono", valueColor: sub1 },
              ].map(({ label, value, valueColor }, i, arr) => (
                <div key={label} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderBottom: i < arr.length - 1 ? `1px solid ${surf1}` : "none",
                }}>
                  <span style={{ fontSize: "13px", color: text }}>{label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: valueColor }}>{value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Activity feed */}
          <section>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: sub0, marginBottom: "14px" }}>
              Activity
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { user: "nyoom",    action: "merged PR #847",         color: "#a6e3a1", time: "2m ago" },
                { user: "catgirl",  action: "opened issue #848",      color: "#f38ba8", time: "14m ago" },
                { user: "cozy",     action: "pushed 3 commits",       color: "#89b4fa", time: "1h ago" },
                { user: "pastel",   action: "released v2.0.1",        color: "#f9e2af", time: "3h ago" },
                { user: "soothing", action: "reviewed PR #844",       color: "#cba6f7", time: "5h ago" },
              ].map(({ user, action, color, time }) => (
                <div key={user + action} style={{
                  background: surf0,
                  border: `1px solid ${surf1}`,
                  borderRadius: "6px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: color + "33",
                    border: `1px solid ${color}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {user[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, color, fontSize: "13px" }}>{user}</span>
                    <span style={{ color: sub0, fontSize: "13px" }}> {action}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: sub0, whiteSpace: "nowrap" }}>{time}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── CAT FOOTER ── */}
        <footer style={{
          background: mantle,
          border: `1px solid ${surf0}`,
          borderRadius: "8px",
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}>
          <span style={{ fontSize: "36px" }}>🐱</span>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#cba6f7" }}>
              Catppuccin — Soothing pastel theme
            </div>
            <div style={{ fontSize: "12px", color: sub0, marginTop: "4px" }}>
              4 flavors · 14 accent colors · ported to 400+ apps · made with 🩷 by the community
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
            {["#f5e0dc","#f2cdcd","#f5c2e7","#cba6f7","#f38ba8","#fab387","#f9e2af","#a6e3a1","#89b4fa"].map(c => (
              <div key={c} style={{ width: "14px", height: "14px", borderRadius: "50%", background: c }} />
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#1e1e2e",
  sidebarBg: "#181825",
  border:    "#313244",
  text:      "#cdd6f4",
  textMuted: "#a6adc8",
  accent:    "#cba6f7",
  accent2:   "#89b4fa",
  cardBg:    "#313244",
  inputBg:   "#181825",
};

export const CatppuccinTheme: ThemeDefinition = {
  id: "catppuccin",
  name: "Catppuccin",
  emoji: "🐱",
  description: "Soothing pastel theme for the high-spirited. Mocha flavor — cozy warm darks with a 14-color pastel accent palette.",
  colors: defaultColors,
  palettes: {
    "Mocha": defaultColors,
    "Crust": {
      bg:        "#11111b",
      sidebarBg: "#181825",
      border:    "#1e1e2e",
      text:      "#cdd6f4",
      textMuted: "#a6adc8",
      accent:    "#cba6f7",
      accent2:   "#89b4fa",
      cardBg:    "#181825",
      inputBg:   "#11111b",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: CatppuccinShowcase,
};
