import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Exo+2:wght@300;400;600;700;800&display=swap');

@keyframes hm-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

@keyframes hm-pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(78,201,176,0.6); }
  50%       { box-shadow: 0 0 0 4px rgba(78,201,176,0); }
}

/* ── TOKENS ── */
[data-theme="hermes"] {
  --bg:          #041C1C;
  --surface:     #020e0e;
  --surface-2:   #030f0f;
  --border:      rgba(255,230,203,0.12);
  --border-hi:   rgba(255,230,203,0.22);
  --mid:         #ffe6cb;
  --mid-dim:     rgba(255,230,203,0.45);
  --mid-ghost:   rgba(255,230,203,0.12);
  --mid-faint:   rgba(255,230,203,0.06);
  --accent:      #ffb84d;
  --teal:        #4ec9b0;
  --highlight:   #ffff89;
  --font-body:   'Exo 2', sans-serif;
  --font-mono:   'Courier Prime', 'Courier New', monospace;
}

/* ── LIGHT ── */
[data-theme="hermes"][data-mode="light"] {
  --bg:          #f0ede8;
  --surface:     #e8e2d9;
  --surface-2:   #ede7de;
  --border:      rgba(4,28,28,0.12);
  --border-hi:   rgba(4,28,28,0.22);
  --mid:         #041C1C;
  --mid-dim:     rgba(4,28,28,0.5);
  --mid-ghost:   rgba(4,28,28,0.08);
  --mid-faint:   rgba(4,28,28,0.04);
  --accent:      #c47a00;
  --teal:        #1a8a74;
}

/* ── SCANLINE TEXTURE ── */
[data-theme="hermes"] .hm-scanlines {
  background-image: repeating-linear-gradient(
    0deg,
    transparent, transparent 2px,
    rgba(255,230,203,0.013) 2px, rgba(255,230,203,0.013) 4px
  );
}

[data-theme="hermes"][data-mode="light"] .hm-scanlines {
  background-image: repeating-linear-gradient(
    0deg,
    transparent, transparent 2px,
    rgba(4,28,28,0.013) 2px, rgba(4,28,28,0.013) 4px
  );
}
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const HermesShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = () => {
  const bg       = "#041C1C";
  const surface  = "#020e0e";
  const surface2 = "#030f0f";
  const border   = "rgba(255,230,203,0.12)";
  const mid      = "#ffe6cb";
  const midDim   = "rgba(255,230,203,0.45)";
  const midFaint = "rgba(255,230,203,0.06)";
  const accent   = "#ffb84d";
  const teal     = "#4ec9b0";

  const mono: React.CSSProperties = { fontFamily: "'Courier Prime','Courier New',monospace" };
  const body: React.CSSProperties = { fontFamily: "'Exo 2',sans-serif" };

  const navItem = (label: string) => (
    <div key={label} style={{
      padding: "14px 28px",
      borderRight: `1px solid ${border}`,
      display: "flex",
      alignItems: "center",
    }}>
      <span style={{ fontSize: "11px", letterSpacing: "0.18em", color: midDim, ...mono }}>{label}</span>
    </div>
  );

  const step = (n: string, cmd: string) => (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ fontSize: "9px", letterSpacing: "0.18em", color: midDim, ...mono }}>{n}</span>
        <span style={{ fontSize: "9px", letterSpacing: "0.14em", color: midDim, cursor: "default", ...mono }}>COPY</span>
      </div>
      <div style={{
        background: `rgba(4,28,28,0.5)`,
        border: `1px solid ${border}`,
        padding: "9px 14px",
        ...mono,
        fontSize: "11px",
        color: mid,
        letterSpacing: "0.02em",
        lineHeight: 1.5,
      }}>
        {cmd}
      </div>
    </div>
  );

  const featureCards = [
    { title: "LIVES WHERE YOU DO",        desc: "Telegram, Discord, Slack, WhatsApp, Signal, Email, CLI — and a growing list of platforms. Start on one, pick up on another." },
    { title: "GROWS THE LONGER IT RUNS",  desc: "Persistent memory and auto-grows in skills — it lives on your project and never forgets how it solved a problem." },
    { title: "SCHEDULED AUTOMATIONS",     desc: "Natural-language cron jobs: looking for reports, backups, and findings — running seamlessly through the gateway." },
    { title: "DELEGATES & PARALLELIZES",  desc: "Isolated subagents with their own conversation, terminals, and Python REPL scripts." },
    { title: "REAL SANDBOXING",           desc: "Per-lockdown — local Docker, SSH, Singularity Model — with container hardening and namespace isolation." },
    { title: "FULL WEB & BROWSER CONTROL", desc: "Web search, browser automation: vision, image generation, text-to-speech, and multi-model streaming." },
  ];

  return (
    <div className="hm-scanlines" style={{
      background: bg,
      color: mid,
      minHeight: "100%",
      fontSize: "13px",
      ...body,
      position: "relative",
    }}>

      {/* ══ HEADER ══ */}
      <header style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr 1fr 1fr 1fr auto",
        borderBottom: `1px solid ${border}`,
        borderTop: `1px solid ${border}`,
      }}>
        {/* Logo */}
        <div style={{
          padding: "14px 20px",
          borderRight: `1px solid ${border}`,
        }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: "26px",
            lineHeight: 1,
            letterSpacing: "0.05em",
            color: mid,
            mixBlendMode: "plus-lighter",
            ...body,
          }}>
            HERMES<br />AGENT
          </h2>
        </div>

        {navItem("DOCS")}
        {navItem("PORTAL")}
        {navItem("GITHUB")}
        {navItem("DISCORD")}

        {/* Theme toggle */}
        <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.15em", color: midDim, ...mono }}>THEME</span>
          <div style={{
            width: "44px", height: "24px",
            borderRadius: "12px",
            border: `1px solid rgba(255,230,203,0.25)`,
            background: midFaint,
            position: "relative",
            flexShrink: 0,
          }}>
            <div style={{
              position: "absolute",
              right: "3px", top: "3px",
              width: "16px", height: "16px",
              borderRadius: "50%",
              background: mid,
            }} />
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section style={{ padding: "56px 80px 48px", textAlign: "center" }}>
        <p style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: midDim,
          marginBottom: "16px",
          textTransform: "uppercase",
          ...mono,
        }}>
          Open Source • MIT License
        </p>

        <h1 style={{
          fontSize: "clamp(36px, 5.5vw, 72px)",
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: "0.01em",
          textTransform: "uppercase",
          color: mid,
          marginBottom: "24px",
          ...body,
        }}>
          An Agent That<br />Grows With You.
        </h1>

        <p style={{
          maxWidth: "520px",
          margin: "0 auto 40px",
          fontSize: "15px",
          lineHeight: 1.7,
          color: midDim,
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}>
          Not a coding copilot tethered to an IDE or a chatbot wrapper around a single API. An
          autonomous agent that lives on your server, remembers what it learns, and gets more
          capable the longer it runs.
        </p>

        <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "left" }}>
          {step("1. INSTALL", "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash")}
          {step("2. CONFIGURE", "hermes setup")}
        </div>
      </section>

      {/* ══ SEE IT IN ACTION ══ */}
      <section style={{ borderTop: `1px solid ${border}` }}>
        <div style={{ padding: "20px 80px 0" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", color: midDim, ...mono, textTransform: "uppercase" }}>
            See It In Action
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: "20px" }}>
          {/* Terminal */}
          <div style={{ background: surface, borderTop: `1px solid ${border}`, borderRight: `1px solid ${border}` }}>
            {/* Window chrome */}
            <div style={{
              background: surface2,
              borderBottom: `1px solid ${border}`,
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              {["#ff6b6b","#ffb84d","#4ec9b0"].map(c => (
                <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
              ))}
              <span style={{ fontSize: "10px", letterSpacing: "0.12em", marginLeft: "10px", color: midDim, ...mono }}>
                hermes
              </span>
            </div>
            {/* Output */}
            <div style={{ padding: "16px 20px", ...mono, fontSize: "11px", lineHeight: 1.9 }}>
              <div style={{ color: midDim }}>
                <span style={{ color: accent }}>❯</span> Research the latest approaches to 3000 tokenizing and more 🔍
              </div>
              <div style={{ color: teal, marginTop: "6px" }}>↳ Fetching papers from arXiv...</div>
              <div style={{ color: midDim, opacity: 0.6 }}>↳ Cross-referencing memory store (1,204 nodes)</div>
              <div style={{ color: accent }}>↳ Found 3 novel approaches not in prior memory</div>
              <div style={{ color: midDim, opacity: 0.5 }}>↳ Saving to knowledge graph...</div>
              <div style={{ color: midDim, opacity: 0.4 }}>↳ Tool: web_search <span style={{ color: teal }}>active</span></div>
              <div style={{ color: midDim, opacity: 0.4 }}>↳ Tool: file_write <span style={{ color: midDim }}>queued</span></div>
              <div style={{ marginTop: "6px", color: mid }}>
                <span style={{ color: accent }}>❯</span>{" "}
                <span style={{ borderRight: `1.5px solid ${mid}`, animation: "hm-blink 1s step-end infinite", paddingRight: "1px" }}>&nbsp;</span>
              </div>
            </div>
          </div>

          {/* Decorative right panel */}
          <div style={{
            position: "relative",
            minHeight: "240px",
            background: `linear-gradient(160deg, #020e0e 0%, #062020 45%, #041C1C 100%)`,
            borderTop: `1px solid ${border}`,
            overflow: "hidden",
          }}>
            {/* Teal radial glow */}
            <div style={{
              position: "absolute",
              top: "40%", left: "55%",
              width: "260px", height: "260px",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(78,201,176,0.12) 0%, transparent 70%)`,
              transform: "translate(-50%,-50%)",
            }} />
            {/* Concentric rings */}
            {[180, 120, 70].map((s, i) => (
              <div key={s} style={{
                position: "absolute",
                top: "50%", left: "60%",
                width: `${s}px`, height: `${s}px`,
                border: `1px solid rgba(78,201,176,${0.08 - i*0.02})`,
                borderRadius: "50%",
                transform: "translate(-50%,-50%)",
              }} />
            ))}
            {/* Label */}
            <div style={{
              position: "absolute",
              bottom: "16px", right: "20px",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: midDim,
              opacity: 0.5,
              ...mono,
              textTransform: "uppercase",
            }}>
              Hermes Agent
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section style={{ padding: "40px 80px", borderTop: `1px solid ${border}` }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.2em", color: midDim, marginBottom: "28px", ...mono, textTransform: "uppercase" }}>
          Features
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px 48px" }}>
          {featureCards.map(({ title, desc }) => (
            <div key={title} style={{ borderTop: `1px solid ${border}`, paddingTop: "14px" }}>
              <p style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: mid,
                marginBottom: "8px",
                textTransform: "uppercase",
                ...body,
              }}>
                {title}
              </p>
              <p style={{ fontSize: "11px", lineHeight: 1.65, color: midDim }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MORE DETAILS ══ */}
      <div style={{ padding: "0 80px 8px", borderTop: `1px solid ${border}` }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.14em", color: midDim, opacity: 0.6, ...mono, textDecoration: "underline", cursor: "pointer" }}>
          MORE DETAILS +
        </span>
      </div>

      {/* ══ FOOTER ══ */}
      <footer style={{
        borderTop: `1px solid ${border}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        padding: "14px 80px",
      }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.06em", color: midDim, opacity: 0.5, ...mono }}>HERMES AGENT v0.0.0</span>
        <span style={{ fontSize: "10px", letterSpacing: "0.06em", color: midDim, opacity: 0.5, ...mono, textAlign: "center" }}>NOUS RESEARCH</span>
        <span style={{ fontSize: "10px", letterSpacing: "0.06em", color: midDim, opacity: 0.5, ...mono, textAlign: "right" }}>MIT LICENSE • 2026</span>
      </footer>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#041C1C",
  sidebarBg: "#020e0e",
  border:    "rgba(255,230,203,0.12)",
  text:      "#ffe6cb",
  textMuted: "rgba(255,230,203,0.45)",
  accent:    "#ffb84d",
  cardBg:    "#030f0f",
  inputBg:   "#041C1C",
};

export const HermesTheme: ThemeDefinition = {
  id: "hermes",
  name: "Hermes",
  emoji: "🌿",
  description: "Replica of the Hermes Agent landing page — deep teal, warm cream, grid nav, hero install steps, terminal demo, features grid.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Light": {
      bg:        "#f0ede8",
      sidebarBg: "#e8e2d9",
      border:    "rgba(4,28,28,0.12)",
      text:      "#041C1C",
      textMuted: "rgba(4,28,28,0.5)",
      accent:    "#c47a00",
      cardBg:    "#ede7de",
      inputBg:   "#f0ede8",
    },
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: HermesShowcase,
};
