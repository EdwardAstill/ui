import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";
import { FeatureCard } from "../components/Layouts";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* ── Keyframes ── */

@keyframes mp-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes mp-pulse-ring {
  0%, 100% { box-shadow: 0 0 0 0 rgba(200,200,200,0.12); }
  50%       { box-shadow: 0 0 0 8px rgba(200,200,200,0); }
}

@keyframes mp-eq-dance {
  0%, 100% { transform: scaleY(0.3); }
  50%       { transform: scaleY(1); }
}

/* ── Root Variables ── */

[data-theme="music-player"] {
  --bg:         #141414;
  --sidebar-bg: #0e0e0e;
  --border:     #252525;
  --text:       #dcdcdc;
  --text-muted: #808080;
  --accent:     #e0e0e0;
  --accent-2:   #555555;
  --card-bg:    #1b1b1b;
  --input-bg:   #202020;
  --font-body:  'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:  'JetBrains Mono', monospace;
  --radius:     14px;
}

/* ── Override main-panel padding for full-bleed app layout ── */

[data-theme="music-player"] .main-panel {
  padding: 0 !important;
  overflow: hidden !important;
}

/* ── Showcase root fills the full panel ── */

[data-theme="music-player"] .mp-root {
  font-family: var(--font-body);
  color: var(--text);
  background: var(--bg);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* ── Top bar ── */

[data-theme="music-player"] .mp-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  height: 60px;
  border-bottom: 1px solid var(--border);
  background: var(--card-bg);
  flex-shrink: 0;
}

[data-theme="music-player"] .mp-logo {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text);
  white-space: nowrap;
}

[data-theme="music-player"] .mp-search {
  flex: 1;
  max-width: 420px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--input-bg);
color 0.15s;
}

[data-theme="music-player"] .mp-nav-btn:hover {
  background: var(--border);
  color: var(--text);
}

[data-theme="music-player"] .mp-nav-btn.active {
  background: #2e2e2e;
  color: var(--text);
}

/* ── Main content ── */

[data-theme="music-player"] .mp-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-width: 0;
}

[data-theme="music-player"] .mp-main-split {
  display: flex;
  flex: 1;
  min-height: 600px;
}

/* ── Left: player panel ── */

[data-theme="music-player"] .mp-player-panel {
  width: 44%;
  min-width: 320px;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 24px 28px;
  gap: 18px;
  background: var(--bg);
}

/* ── Vinyl record ── */

[data-theme="music-player"] .mp-vinyl-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  max-width: 240px;
  align-self: center;
  flex-shrink: 0;
}

[data-theme="music-player"] .mp-vinyl-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, #1e1e1e 0%, #161616 70%, #111 100%);
  box-shadow: 0 0 0 2px #2a2a2a, 0 12px 48px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04);
}

[data-theme="music-player"] .mp-vinyl {
  position: relative;
  width: 84%;
  aspect-ratio: 1;
  border-radius: 50%;
  z-index: 1;
  background: radial-gradient(circle at 50% 50%, #111 0%, #111 3.5%, transparent 3.6%), radial-gradient(circle at 50% 50%, #2d2d2d 0%, #2d2d2d 21%, transparent 21.1%), repeating-radial-gradient(circle at 50% 50%, #1c1c1c 0px, #1c1c1c 1.5px, #212121 1.5px, #212121 3px);
  box-shadow: 0 0 0 1px #2a2a2a, 0 4px 20px rgba(0,0,0,0.5);
  transition: animation-play-state 0.3s;
}

[data-theme="music-player"] .mp-vinyl.playing {
  animation: mp-spin 4s linear infinite;
}

[data-theme="music-player"] .mp-tonearm {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 55%;
  height: 3px;
  background: linear-gradient(270deg, #686868 0%, #4a4a4a 60%, #383838 100%);
  transform-origin: right center;
  transform: rotate(22deg);
  border-radius: 2px 0 0 2px;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* ── Now playing ── */

[data-theme="music-player"] .mp-track-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

/* ── Progress bar ── */

[data-theme="music-player"] .mp-progress-track {
  flex: 1;
  height: 3px;
  background: var(--border);
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

[data-theme="music-player"] .mp-progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
}

/* ── Waveform ── */

[data-theme="music-player"] .mp-waveform {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 32px;
  cursor: pointer;
}

[data-theme="music-player"] .mp-wave-bar {
  flex: 1;
  width: 3px;
  border-radius: 2px;
  background: var(--border);
  transition: background 0.15s, height 0.2s ease;
}

[data-theme="music-player"] .mp-wave-bar.played {
  background: var(--accent);
}

/* ── Playback controls ── */

[data-theme="music-player"] .mp-play-btn {
  width: 52px;
  height: 52px;
  background: var(--text);
  color: var(--bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

// Waveform heights for visual variation
const WAVE_HEIGHTS = [
  18,28,38,44,50,42,34,52,40,30,46,54,36,24,42,48,38,26,44,56,32,20,40,50,
  44,30,52,38,28,46,34,22,40,54,48,36,26,42,30,50,44,38,20,46,52,34,28,40,
];

const fakeTracks = [
  { title: "Midnight Static",     artist: "Neon Atlas",        album: "Phase I",       dur: "3:42", plays: "1.2M" },
  { title: "Glass Architecture",  artist: "SABLE",             album: "Structures",    dur: "4:18", plays: "847K" },
  { title: "Heat Death",          artist: "Neon Atlas",        album: "Phase I",       dur: "5:03", plays: "2.1M" },
  { title: "Parallel Lines",      artist: "The Voids",         album: "Dark Matter",   dur: "3:28", plays: "654K" },
  { title: "Interlude (Rain)",    artist: "Orphic",            album: "Drift",         dur: "2:14", plays: "391K" },
  { title: "Nova Collapse",       artist: "SABLE",             album: "Structures",    dur: "4:57", plays: "1.8M" },
];

const MusicPlayerShowcase: FC<{ layout?: string; colors?: any }> = ({ layout, colors }) => {
  const c = colors || defaultColors;
  const bg = c.bg || "#141414";
  const cardBg = c.cardBg || "#1b1b1b";
  const border = c.border || "#252525";
  const text = c.text || "#dcdcdc";
  const textMuted = c.textMuted || "#808080";
  const accent = c.accent || "#e0e0e0";
  const inputBg = c.inputBg || "#202020";

  // Progress: 38% through the track
  const progressPct = 38;

  return (
    <div style={{ background: bg, minHeight: "100%", color: text, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── Top Bar ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "0 24px", height: "60px", borderBottom: `1px solid ${border}`, background: cardBg, flexShrink: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: text, whiteSpace: "nowrap" }}>
          ♫ WAVELENGTH
        </div>
        {/* Search */}
        <div style={{ flex: 1, maxWidth: "380px", display: "flex", alignItems: "center", gap: "8px", background: inputBg, borderRadius: "8px", padding: "0 12px", height: "34px", border: `1px solid ${border}` }}>
          <span style={{ color: textMuted, fontSize: "13px" }}>🔍</span>
          <span style={{ color: textMuted, fontSize: "13px" }}>Search songs, artists, albums…</span>
        </div>
        {/* Nav tabs */}
        <div style={{ display: "flex", gap: "4px", marginLeft: "auto" }}>
          {["Home", "Browse", "Radio", "Library"].map((tab, i) => (
            <button key={i} style={{
              padding: "6px 14px", borderRadius: "8px", border: "none",
              background: i === 0 ? "#2e2e2e" : "transparent",
              color: i === 0 ? text : textMuted, fontSize: "13px", fontWeight: 500,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              {tab}
            </button>
          ))}
        </div>
        {/* Avatar */}
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#2e2e2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
          👤
        </div>
      </div>

      {/* ── Main split ── */}
      <div style={{ display: "flex", flex: 1, minHeight: "580px" }}>

        {/* ── Left: Now Playing Panel ── */}
        <div style={{ width: "42%", minWidth: "300px", borderRight: `1px solid ${border}`, display: "flex", flexDirection: "column", padding: "28px", gap: "20px", background: bg, flexShrink: 0 }}>

          {/* Album Art — vinyl disc */}
          <div style={{ position: "relative", width: "200px", height: "200px", alignSelf: "center", flexShrink: 0 }}>
            {/* Outer shadow ring */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "radial-gradient(circle, #1e1e1e 0%, #161616 70%, #111 100%)",
              boxShadow: `0 0 0 2px #2a2a2a, 0 16px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)`,
            }} />
            {/* Vinyl disc */}
            <div style={{
              position: "absolute", inset: "8%",
              borderRadius: "50%", zIndex: 1,
              background: "repeating-radial-gradient(circle at 50% 50%, #1c1c1c 0px, #1c1c1c 1.5px, #212121 1.5px, #212121 3px)",
              boxShadow: "0 0 0 1px #2a2a2a",
              animation: "mp-spin 5s linear infinite",
            }}>
              {/* Center label */}
              <div style={{
                position: "absolute", inset: "30%", borderRadius: "50%",
                background: "linear-gradient(135deg, #2a2a2a 0%, #222 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}>
                <span style={{ fontSize: "20px" }}>🎵</span>
              </div>
            </div>
            {/* Tonearm */}
            <div style={{
              position: "absolute", top: "8px", right: "8px", width: "52%", height: "3px",
              background: "linear-gradient(270deg, #686868, #4a4a4a 60%, #383838)",
              transformOrigin: "right center", transform: "rotate(20deg)",
              borderRadius: "2px 0 0 2px", zIndex: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.6)",
            }} />
          </div>

          {/* Track Info */}
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: text, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                  Midnight Static
                </div>
                <div style={{ fontSize: "14px", color: textMuted, fontWeight: 400 }}>
                  Neon Atlas · Phase I
                </div>
              </div>
              <button style={{ background: "none", border: "none", color: textMuted, fontSize: "18px", cursor: "pointer", padding: "4px" }}>♡</button>
            </div>
          </div>

          {/* Waveform */}
          <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "36px", cursor: "pointer" }}>
            {WAVE_HEIGHTS.map((h, i) => (
              <div key={i} style={{
                flex: 1, borderRadius: "2px",
                height: `${h}px`,
                background: i / WAVE_HEIGHTS.length < progressPct / 100 ? text : border,
                transition: "background 0.15s",
                minWidth: "2px",
              }} />
            ))}
          </div>

          {/* Progress bar + times */}
          <div>
            <div style={{ position: "relative", height: "3px", background: border, borderRadius: "2px", marginBottom: "6px", cursor: "pointer" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progressPct}%`, background: text, borderRadius: "2px" }} />
              <div style={{
                position: "absolute", top: "50%",
                left: `${progressPct}%`,
                width: "12px", height: "12px", borderRadius: "50%",
                background: text, transform: "translate(-50%, -50%)",
                boxShadow: "0 0 0 3px rgba(220,220,220,0.15)",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: textMuted }}>
              <span>1:26</span><span>3:42</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px", justifyContent: "center" }}>
            <button style={{ background: "none", border: "none", color: textMuted, fontSize: "18px", cursor: "pointer" }}>⇄</button>
            <button style={{ background: "none", border: "none", color: text, fontSize: "22px", cursor: "pointer" }}>⏮</button>
            <button style={{
              width: "52px", height: "52px", borderRadius: "50%",
              background: text, color: bg, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", cursor: "pointer",
              boxShadow: `0 0 0 6px rgba(220,220,220,0.08)`,
              animation: "mp-pulse-ring 2s ease-in-out infinite",
            }}>
              ⏸
            </button>
            <button style={{ background: "none", border: "none", color: text, fontSize: "22px", cursor: "pointer" }}>⏭</button>
            <button style={{ background: "none", border: "none", color: textMuted, fontSize: "18px", cursor: "pointer" }}>↻</button>
          </div>

          {/* Volume */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: textMuted, fontSize: "14px" }}>🔉</span>
            <div style={{ flex: 1, position: "relative", height: "3px", background: border, borderRadius: "2px", cursor: "pointer" }}>
              <div style={{ width: "68%", height: "100%", background: text, borderRadius: "2px" }} />
              <div style={{ position: "absolute", top: "50%", left: "68%", width: "10px", height: "10px", borderRadius: "50%", background: text, transform: "translate(-50%, -50%)" }} />
            </div>
            <span style={{ color: textMuted, fontSize: "14px" }}>🔊</span>
          </div>

          {/* Equalizer bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: textMuted, textTransform: "uppercase" }}>Equalizer</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "40px" }}>
              {[60, 80, 100, 65, 45, 85, 75, 55, 70, 90, 60, 50].map((h, i) => (
                <div key={i} style={{
                  flex: 1, borderRadius: "2px 2px 0 0",
                  background: `linear-gradient(to top, ${text}, ${text}66)`,
                  height: `${h * 0.4}px`,
                  animation: `mp-eq-dance ${0.4 + i * 0.07}s ease-in-out infinite`,
                  transformOrigin: "bottom center",
                  minWidth: "4px",
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Queue + Browse ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Section tabs */}
          <div style={{ display: "flex", gap: "0", borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
            {["Queue", "Related", "Lyrics"].map((tab, i) => (
              <button key={i} style={{
                padding: "14px 20px", background: "transparent", border: "none",
                borderBottom: i === 0 ? `2px solid ${text}` : "2px solid transparent",
                color: i === 0 ? text : textMuted,
                fontSize: "13px", fontWeight: i === 0 ? 600 : 400,
                cursor: "pointer", fontFamily: "inherit",
              }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Now Playing header */}
          <div style={{ padding: "16px 24px 8px", borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: textMuted, textTransform: "uppercase", marginBottom: "4px" }}>
              Now Playing
            </div>
            <div style={{ fontSize: "14px", color: text, fontWeight: 500 }}>
              Midnight Static — Neon Atlas
            </div>
          </div>

          {/* Track list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            {fakeTracks.map((track, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "10px 24px",
                background: i === 0 ? `${cardBg}` : "transparent",
                borderLeft: i === 0 ? `2px solid ${text}` : "2px solid transparent",
                cursor: "pointer",
                transition: "background 0.15s",
              }}>
                {/* Track number / play indicator */}
                <div style={{ width: "18px", textAlign: "right", flexShrink: 0 }}>
                  {i === 0
                    ? <span style={{ color: text, fontSize: "12px" }}>▶</span>
                    : <span style={{ color: textMuted, fontSize: "12px" }}>{i + 1}</span>
                  }
                </div>

                {/* Album art placeholder */}
                <div style={{
                  width: "40px", height: "40px", borderRadius: "6px",
                  background: `linear-gradient(135deg, #2a2a2a, #1e1e1e)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", flexShrink: 0, border: `1px solid ${border}`,
                }}>
                  🎵
                </div>

                {/* Track info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "14px", fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? text : text,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    marginBottom: "2px",
                  }}>
                    {track.title}
                  </div>
                  <div style={{ fontSize: "12px", color: textMuted }}>
                    {track.artist} · {track.album}
                  </div>
                </div>

                {/* Plays */}
                <div style={{ fontSize: "12px", color: textMuted, flexShrink: 0 }}>
                  {track.plays}
                </div>

                {/* Duration */}
                <div style={{ fontSize: "12px", color: textMuted, flexShrink: 0, minWidth: "32px", textAlign: "right" }}>
                  {track.dur}
                </div>

                {/* Heart */}
                <button style={{ background: "none", border: "none", color: textMuted, fontSize: "14px", cursor: "pointer", flexShrink: 0, padding: "0 4px" }}>
                  {i === 0 || i === 2 ? "♥" : "♡"}
                </button>
              </div>
            ))}
          </div>

          {/* Bottom: Featured albums */}
          <div style={{ borderTop: `1px solid ${border}`, padding: "16px 24px", flexShrink: 0 }}>
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: textMuted, textTransform: "uppercase", marginBottom: "12px" }}>
              More from Neon Atlas
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { emoji: "🌌", title: "Phase I", year: "2022", tracks: "12 tracks" },
                { emoji: "⚡", title: "Phase II", year: "2023", tracks: "10 tracks" },
                { emoji: "🔭", title: "Collapse EP", year: "2024", tracks: "5 tracks" },
              ].map((album, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", cursor: "pointer" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "6px",
                    background: "linear-gradient(135deg, #2a2a2a, #1e1e1e)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", flexShrink: 0, border: `1px solid ${border}`,
                  }}>
                    {album.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: text }}>{album.title}</div>
                    <div style={{ fontSize: "11px", color: textMuted }}>{album.year} · {album.tracks}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom stats bar ── */}
      <div style={{ borderTop: `1px solid ${border}`, background: cardBg, padding: "12px 24px", display: "flex", gap: "32px", flexShrink: 0 }}>
        {[
          { label: "Tracks", value: "2,847" },
          { label: "Artists", value: "412" },
          { label: "Listening time", value: "1,240 hrs" },
          { label: "Top genre", value: "Dark Ambient" },
          { label: "Last sync", value: "2 min ago" },
        ].map((stat, i) => (
          <div key={i}>
            <div style={{ fontSize: "11px", color: textMuted, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2px" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: text }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#141414",
  sidebarBg: "#0e0e0e",
  border:    "#252525",
  text:      "#dcdcdc",
  textMuted: "#808080",
  accent:    "#e0e0e0",
  accent2:   "#555555",
  cardBg:    "#1b1b1b",
  inputBg:   "#202020",
};

export const MusicPlayerTheme: ThemeDefinition = {
  id: "musicplayer",
  name: "Music Player",
  emoji: "🎵",
  description: "Premium dark music player UI with vinyl record art, waveform scrubber, equalizer bars, and a full track queue — Spotify meets Apple Music.",
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
  Showcase: MusicPlayerShowcase,
};
