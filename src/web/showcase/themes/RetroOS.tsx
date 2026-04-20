import React, { useState } from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  [data-theme="retro-os"] {
    --bg: #FAF0DC;
    --sidebar-bg: #F5E8C8;
    --border: #2D1B00;
    --text: #2D1B00;
    --text-muted: #6B4C1E;
    --accent: #6C3FBD;
    --accent-2: #E8543A;
    --card-bg: #FFF8EC;
    --input-bg: #FFFDF5;
    --font-body: 'Space Grotesk', 'Segoe UI', sans-serif;
    --font-pixel: 'Press Start 2P', monospace;
    --radius: 10px;
  }

  [data-theme="retro-os"] * {
    box-sizing: border-box;
  }

  /* ── Desktop canvas with dot-grid ── */
  [data-theme="retro-os"] .ros-desktop {
    background-image: radial-gradient(#2D1B00 1px, transparent 1px);
    background-size: 20px 20px;
    background-color: #FAF0DC;
    min-height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
  }

  /* ── Window chrome ── */
  [data-theme="retro-os"] .cwin {
    background: var(--card-bg);
    border: 3px solid var(--border);
    border-radius: 10px;
    box-shadow: 4px 4px 0 var(--border);
    overflow: hidden;
    flex-shrink: 0;
  }

  [data-theme="retro-os"] .cwin-titlebar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-bottom: 2px solid var(--border);
    border-radius: 7px 7px 0 0;
    user-select: none;
  }

  /* Traffic lights */
  [data-theme="retro-os"] .cwin-light {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid rgba(0,0,0,0.35);
    flex-shrink: 0;
    cursor: pointer;
    transition: filter 0.1s;
  }
  [data-theme="retro-os"] .cwin-light:hover {
    filter: brightness(1.2);
  }
  [data-theme="retro-os"] .cwin-light-close  { background: #FF6059; }
  [data-theme="retro-os"] .cwin-light-min    { background: #FFBC2E; }
  [data-theme="retro-os"] .cwin-light-max    { background: #27C93F; }

  [data-theme="retro-os"] .cwin-title {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    color: var(--border);
    flex: 1;
    text-align: center;
    margin-right: 42px; /* balance the traffic lights */
  }

  [data-theme="retro-os"] .cwin-body {
    padding: 14px;
  }

  /* ── Title bar colour variants ── */
  [data-theme="retro-os"] .cwin-tb-mint   { background: #A7F3D0; }
  [data-theme="retro-os"] .cwin-tb-purple { background: #C4B5FD; }
  [data-theme="retro-os"] .cwin-tb-peach  { background: #FDBA74; }
  [data-theme="retro-os"] .cwin-tb-sky    { background: #7DD3FC; }
  [data-theme="retro-os"] .cwin-tb-yellow { background: #FDE68A; }
  [data-theme="retro-os"] .cwin-tb-dark   { background: #2D1B00; }

  /* ── Pixel font elements ── */
  [data-theme="retro-os"] .ros-pixel {
    font-family: var(--font-pixel);
    font-size: 9px;
    line-height: 1.8;
    color: var(--text);
  }

  [data-theme="retro-os"] .ros-pixel-sm {
    font-family: var(--font-pixel);
    font-size: 7px;
    line-height: 1.9;
    color: var(--text);
  }

  /* ── File browser row ── */
  [data-theme="retro-os"] .ros-file-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 8px;
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    cursor: pointer;
    transition: background 0.1s;
  }
  [data-theme="retro-os"] .ros-file-row:hover {
    background: rgba(108, 63, 189, 0.12);
  }
  [data-theme="retro-os"] .ros-file-row.selected {
    background: var(--accent);
    color: #fff;
  }

  /* ── Terminal ── */
  [data-theme="retro-os"] .ros-terminal {
    background: #1A0A00;
    border-radius: 0 0 7px 7px;
    padding: 14px;
    font-family: var(--font-pixel);
    font-size: 8px;
    line-height: 2;
    color: #A0FF60;
    overflow-y: auto;
  }
  [data-theme="retro-os"] .ros-terminal-prompt {
    color: #FFD700;
  }
  [data-theme="retro-os"] .ros-terminal-out {
    color: #A0FF60;
  }
  [data-theme="retro-os"] .ros-terminal-err {
    color: #FF6059;
  }
  [data-theme="retro-os"] .ros-terminal-muted {
    color: #556644;
  }

  /* ── Notes ── */
  [data-theme="retro-os"] .ros-note-body {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.9;
    color: var(--text);
    background: #FFFEF5;
    border: none;
    resize: none;
    width: 100%;
    outline: none;
    border-radius: 4px;
    padding: 4px;
  }

  /* ── Settings toggles ── */
  [data-theme="retro-os"] .ros-toggle {
    width: 40px;
    height: 22px;
    border-radius: 11px;
    border: 2px solid var(--border);
    position: relative;
    cursor: pointer;
    transition: background 0.15s;
    flex-shrink: 0;
  }
  [data-theme="retro-os"] .ros-toggle-on  { background: var(--accent); }
  [data-theme="retro-os"] .ros-toggle-off { background: #ccc; }
  [data-theme="retro-os"] .ros-toggle-knob {
    position: absolute;
    top: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 1.5px solid var(--border);
    transition: left 0.15s;
  }
  [data-theme="retro-os"] .ros-toggle-on  .ros-toggle-knob { left: 20px; }
  [data-theme="retro-os"] .ros-toggle-off .ros-toggle-knob { left: 2px;  }

  /* ── Taskbar ── */
  [data-theme="retro-os"] .ros-taskbar {
    background: var(--card-bg);
    border: 3px solid var(--border);
    border-radius: 10px;
    box-shadow: 4px 4px 0 var(--border);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  /* ── Status bar inside window ── */
  [data-theme="retro-os"] .ros-statusbar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-top: 2px solid var(--border);
    background: var(--sidebar-bg);
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    border-radius: 0 0 7px 7px;
  }

  [data-theme="retro-os"][data-mode="dark"] {
    --bg: #1A0E00;
    --sidebar-bg: #241500;
    --border: #E8C87A;
    --text: #F5E8C8;
    --text-muted: #B89A6A;
    --accent: #9B6FEE;
    --accent-2: #FF7A5A;
    --card-bg: #2A1800;
    --input-bg: #1E1100;
  }
  [data-theme="retro-os"][data-mode="dark"] .ros-desktop {
    background-image: radial-gradient(#E8C87A 1px, transparent 1px);
    background-color: #1A0E00;
  }
  [data-theme="retro-os"][data-mode="dark"] .ros-terminal {
    background: #050200;
  }
`;

/* ─────────────────────────── Sub-components ─────────────────────────── */

const TrafficLights: FC = () => (
  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
    <div className="cwin-light cwin-light-close" />
    <div className="cwin-light cwin-light-min" />
    <div className="cwin-light cwin-light-max" />
  </div>
);

interface WinProps {
  title: string;
  tbClass: string;
  titleColor?: string;
  children: React.ReactNode;
  statusText?: string;
  style?: React.CSSProperties;
}

const Window: FC<WinProps> = ({ title, tbClass, titleColor, children, statusText, style }) => (
  <div className="cwin" style={style}>
    <div className={`cwin-titlebar ${tbClass}`}>
      <TrafficLights />
      <div className="cwin-title" style={{ color: titleColor || "#2D1B00" }}>{title}</div>
    </div>
    {children}
    {statusText && (
      <div className="ros-statusbar">
        <span style={{ opacity: 0.6 }}>◉</span>
        {statusText}
      </div>
    )}
  </div>
);

/* ─────────────────────────── Showcase ─────────────────────────── */

const RetroOSShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const currentColors = colors || defaultColors;
  const [selectedFile, setSelectedFile] = useState<string | null>("documents");
  const [settings, setSettings] = useState({ wifi: true, notifications: true, darkMode: false, autoSave: true, sound: false });

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

  const files = [
    { id: "desktop", icon: "🖥️", name: "Desktop", kind: "Folder", size: "—", modified: "Today" },
    { id: "documents", icon: "📁", name: "Documents", kind: "Folder", size: "—", modified: "Today" },
    { id: "notes_txt", icon: "📝", name: "notes.txt", kind: "Text", size: "4 KB", modified: "1 hr ago" },
    { id: "sketch_fig", icon: "🎨", name: "wireframe.fig", kind: "Figma", size: "2.1 MB", modified: "Yesterday" },
    { id: "script_sh", icon: "⚙️", name: "build.sh", kind: "Script", size: "1 KB", modified: "3 days ago" },
    { id: "photo_png", icon: "🖼️", name: "screenshot.png", kind: "Image", size: "840 KB", modified: "4 days ago" },
    { id: "archive_zip", icon: "📦", name: "backup.zip", kind: "Archive", size: "18.4 MB", modified: "Last week" },
  ];

  const terminalLines = [
    { type: "prompt", text: "user@retro-os:~$ ls -la" },
    { type: "out", text: "total 64" },
    { type: "out", text: "drwxr-xr-x  12 user  staff   384 Apr 16 14:03 ." },
    { type: "out", text: "drwxr-xr-x   8 user  staff   256 Apr 15 09:12 .." },
    { type: "out", text: "-rw-r--r--   1 user  staff  2048 Apr 16 13:59 .zshrc" },
    { type: "out", text: "drwxr-xr-x   4 user  staff   128 Apr 14 11:30 Desktop" },
    { type: "out", text: "drwxr-xr-x  24 user  staff   768 Apr 16 12:44 Documents" },
    { type: "prompt", text: "user@retro-os:~$ bun --hot server.ts" },
    { type: "out", text: "" },
    { type: "out", text: "  🍞 Bun v1.1.0" },
    { type: "out", text: "  Server running on http://localhost:3000" },
    { type: "out", text: "  Watching for changes..." },
    { type: "muted", text: "" },
    { type: "prompt", text: "user@retro-os:~$ █" },
  ];

  const noteContent = `★ Today's Tasks
────────────────
☑ Fix the nav spacing bug
☑ Write documentation
☐ Review design tokens
☐ Push to staging

💡 Ideas
────────────────
- Dot grid backgrounds are
  underrated in UI design
- Try Press Start 2P for
  pixel-art effects

📅 Meeting @ 3pm
→ Design system review
→ Bring mockups!`;

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(s => ({ ...s, [key]: !s[key] }));
  };

  const settingRows: { key: keyof typeof settings; label: string; desc: string }[] = [
    { key: "wifi", label: "Wi-Fi", desc: "Connected to CartoonNet_5G" },
    { key: "notifications", label: "Notifications", desc: "Show app badges and banners" },
    { key: "darkMode", label: "Dark Mode", desc: "Reduce eye strain at night" },
    { key: "autoSave", label: "Auto-Save", desc: "Save documents every 30s" },
    { key: "sound", label: "System Sounds", desc: "Play UI interaction sounds" },
  ];

  return (
    <div className="ros-desktop" style={{ ...customStyle }}>

      {/* ── TASKBAR ── */}
      <div className="ros-taskbar">
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--text)", marginRight: "8px" }}>
          🖼️ CartoonOS
        </div>
        <div style={{ width: "1px", height: "20px", background: "var(--border)", opacity: 0.3, margin: "0 4px" }} />
        {[
          { icon: "📁", label: "Files" },
          { icon: "💻", label: "Terminal" },
          { icon: "📝", label: "Notes" },
          { icon: "⚙️", label: "Settings" },
        ].map(({ icon, label }) => (
          <div key={label} style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            border: "2px solid var(--border)",
            borderRadius: "6px",
            background: "var(--input-bg)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--text)",
            cursor: "pointer",
            boxShadow: "2px 2px 0 var(--border)",
          }}>
            <span>{icon}</span>{label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "var(--text-muted)" }}>
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* ── ROW 1: Files + Terminal side by side ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px", alignItems: "start" }}>

        {/* FILES WINDOW */}
        <Window title="📁 Files — Documents" tbClass="cwin-tb-mint" statusText={`${files.length} items — 22.3 MB available`}>
          {/* Toolbar */}
          <div style={{ display: "flex", gap: "6px", padding: "8px 12px", borderBottom: "2px solid var(--border)", background: "var(--sidebar-bg)" }}>
            {["←", "→", "↑"].map(btn => (
              <button key={btn} style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                background: "var(--card-bg)",
                border: "2px solid var(--border)",
                borderRadius: "5px",
                padding: "2px 10px",
                cursor: "pointer",
                color: "var(--text)",
                boxShadow: "2px 2px 0 var(--border)",
              }}>{btn}</button>
            ))}
            <div style={{
              flex: 1,
              marginLeft: "4px",
              background: "var(--input-bg)",
              border: "2px solid var(--border)",
              borderRadius: "5px",
              padding: "3px 10px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
            }}>
              ~/Documents
            </div>
          </div>
          {/* File list */}
          <div style={{ padding: "8px" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: "8px", padding: "4px 8px", borderBottom: "1px solid var(--border)", marginBottom: "4px" }}>
              {["Name", "Size", "Modified"].map(h => (
                <div key={h} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</div>
              ))}
            </div>
            {files.map(f => (
              <div
                key={f.id}
                className={`ros-file-row ${selectedFile === f.id ? "selected" : ""}`}
                onClick={() => setSelectedFile(f.id)}
                style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: "8px", padding: "6px 8px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{f.icon}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 500 }}>{f.name}</span>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: selectedFile === f.id ? "rgba(255,255,255,0.8)" : "var(--text-muted)" }}>{f.size}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: selectedFile === f.id ? "rgba(255,255,255,0.8)" : "var(--text-muted)" }}>{f.modified}</div>
              </div>
            ))}
          </div>
        </Window>

        {/* TERMINAL WINDOW */}
        <Window title="💻 Terminal — bash" tbClass="cwin-tb-dark" titleColor="#FDE68A">
          <div className="ros-terminal">
            {terminalLines.map((line, i) => (
              <div key={i} className={`ros-terminal-${line.type}`}>
                {line.text}
              </div>
            ))}
          </div>
        </Window>
      </div>

      {/* ── ROW 2: Notes + Settings side by side ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "20px", alignItems: "start" }}>

        {/* NOTES WINDOW */}
        <Window title="📝 Notes — Today.txt" tbClass="cwin-tb-yellow" statusText="Auto-saved 12s ago">
          <div style={{ padding: "12px 14px" }}>
            <textarea
              className="ros-note-body"
              defaultValue={noteContent}
              rows={18}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                lineHeight: 1.85,
                color: "var(--text)",
                background: "#FFFEF5",
                border: "none",
                resize: "none",
                width: "100%",
                outline: "none",
                borderRadius: "4px",
                padding: "4px",
              }}
            />
          </div>
        </Window>

        {/* SETTINGS WINDOW */}
        <Window title="⚙️ System Settings" tbClass="cwin-tb-purple">
          <div style={{ padding: "14px" }}>
            {/* Pixel font header */}
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "var(--text-muted)", marginBottom: "16px", lineHeight: 1.8 }}>
              SYSTEM PREFERENCES v2.0
            </div>

            {/* Settings rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {settingRows.map(({ key, label, desc }) => (
                <div key={key} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "2px solid transparent",
                  background: "transparent",
                  transition: "background 0.1s, border-color 0.1s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(108,63,189,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(108,63,189,0.2)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  }}
                  onClick={() => toggleSetting(key)}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>{label}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{desc}</div>
                  </div>
                  <div className={`ros-toggle ros-toggle-${settings[key] ? "on" : "off"}`}>
                    <div className="ros-toggle-knob" />
                  </div>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div style={{ height: "1px", background: "var(--border)", opacity: 0.2, margin: "14px 0" }} />

            {/* Color theme swatches */}
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "10px" }}>
              Accent Color
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {["#6C3FBD", "#E8543A", "#27AE60", "#2980B9", "#F39C12", "#E74C3C"].map(c => (
                <div key={c} style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: c,
                  border: c === "#6C3FBD" ? "3px solid var(--border)" : "2px solid rgba(0,0,0,0.15)",
                  cursor: "pointer",
                  boxShadow: c === "#6C3FBD" ? "0 0 0 2px var(--card-bg), 0 0 0 4px var(--border)" : "none",
                  transition: "transform 0.1s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.15)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                />
              ))}
            </div>

            {/* Pixel art info box */}
            <div style={{
              marginTop: "16px",
              background: "var(--sidebar-bg)",
              border: "2px solid var(--border)",
              borderRadius: "8px",
              padding: "10px 12px",
              boxShadow: "2px 2px 0 var(--border)",
            }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "var(--accent)", lineHeight: 1.9 }}>
                CARTOON OS 2.0<br />
                BUILD 2025.04.16<br />
                ALL RIGHTS RESERVED
              </div>
            </div>
          </div>
        </Window>
      </div>

      {/* ── ROW 3: Sky blue info window spanning full width ── */}
      <Window title="🌐 Network & System Info" tbClass="cwin-tb-sky">
        <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[
            { icon: "📶", label: "Wi-Fi", value: "CartoonNet_5G", sub: "192.168.1.42" },
            { icon: "💾", label: "Storage", value: "42.1 GB", sub: "of 256 GB used" },
            { icon: "🔋", label: "Battery", value: "87%", sub: "Charging via USB-C" },
            { icon: "🧠", label: "Memory", value: "6.2 GB", sub: "of 16 GB in use" },
          ].map(({ icon, label, value, sub }) => (
            <div key={label} style={{
              background: "var(--sidebar-bg)",
              border: "2px solid var(--border)",
              borderRadius: "8px",
              padding: "14px",
              boxShadow: "2px 2px 0 var(--border)",
            }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px" }}>{label}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--text)", lineHeight: 1.1 }}>{value}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>{sub}</div>
            </div>
          ))}
        </div>
      </Window>

    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#FAF0DC",
  sidebarBg: "#F5E8C8",
  border:    "#2D1B00",
  text:      "#2D1B00",
  textMuted: "#6B4C1E",
  accent:    "#6C3FBD",
  accent2:   "#E8543A",
  cardBg:    "#FFF8EC",
  inputBg:   "#FFFDF5",
};

export const RetroOSTheme: ThemeDefinition = {
  id: "retro-os",
  name: "Cartoon OS",
  emoji: "🖼️",
  description: "Whimsical cartoon desktop: dot-grid parchment background, stacked windows with pastel title bars and macOS-style traffic lights, pixel font terminal, and Press Start 2P accents.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg:        "#1A0E00",
      sidebarBg: "#241500",
      border:    "#E8C87A",
      text:      "#F5E8C8",
      textMuted: "#B89A6A",
      accent:    "#9B6FEE",
      accent2:   "#FF7A5A",
      cardBg:    "#2A1800",
      inputBg:   "#1E1100",
    }
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: RetroOSShowcase,
};
