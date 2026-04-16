import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

import { TerminalTheme } from "./themes/Terminal";
import { GlassTheme } from "./themes/Glass";
import { NeobrutalismTheme } from "./themes/Neobrutalism";
import { CyberpunkTheme } from "./themes/Cyberpunk";
import { PastelTheme } from "./themes/Pastel";
import { Y2KTheme } from "./themes/Y2K";
import { SwissTheme } from "./themes/Swiss";
import { CatppuccinTheme } from "./themes/Catppuccin";
import { RetroOSTheme } from "./themes/RetroOS";
import { Neobrutalism2Theme } from "./themes/Neobrutalism2";
import { ProductivityTheme } from "./themes/Productivity";
import { iOSTheme } from "./themes/iOS";
import { Terminal2Theme } from "./themes/Terminal2";
import { MusicPlayerTheme } from "./themes/MusicPlayer";
import { ClaymorphismTheme } from "./themes/Claymorphism";
import { VaporwaveTheme } from "./themes/Vaporwave";
import { NeumorphismTheme } from "./themes/Neumorphism";
import { ShadcnDarkTheme } from "./themes/ShadcnDark";
import { ModernRetroTheme } from "./themes/ModernRetro";
import { HermesTheme } from "./themes/Hermes";
import { EngProTheme } from "./themes/EngPro";
import { DockTheme } from "./themes/Dock";
import type { ThemeDefinition, LayoutType } from "./themes/types";

const themes: ThemeDefinition[] = [
  TerminalTheme,
  Terminal2Theme,
  GlassTheme,
  NeobrutalismTheme,
  CyberpunkTheme,
  PastelTheme,
  Y2KTheme,
  SwissTheme,
  CatppuccinTheme,
  RetroOSTheme,
  Neobrutalism2Theme,
  ProductivityTheme,
  iOSTheme,
  MusicPlayerTheme,
  ClaymorphismTheme,
  VaporwaveTheme,
  NeumorphismTheme,
  ShadcnDarkTheme,
  ModernRetroTheme,
  HermesTheme,
  EngProTheme,
  DockTheme,
];

const globalBaseStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  .app-shell {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    transition: background 0.4s ease, color 0.4s ease;
  }

  .sidebar {
    width: 220px;
    min-width: 220px;
    height: 100vh;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    overflow-y: auto;
    transition: background 0.4s ease, border-color 0.4s ease;
    z-index: 10;
  }

  .sidebar-header {
    padding: 0 20px 20px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 12px;
    transition: border-color 0.4s ease;
  }

  .sidebar-header h1 {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .sidebar-header p {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 4px;
    opacity: 0.7;
  }

  .sidebar-nav {
    flex: 1;
    padding: 4px 0;
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-muted);
    font-family: var(--font-body);
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    transition: background 0.15s ease, color 0.15s ease;
    position: relative;
  }

  .sidebar-item:hover {
    background: var(--border);
    color: var(--text);
  }

  .sidebar-item.active {
    background: var(--accent);
    color: #fff;
  }

  .sidebar-item .emoji {
    font-size: 16px;
    width: 20px;
    text-align: center;
  }

  .main-panel {
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    padding: 40px;
    transition: background 0.4s ease;
    background: var(--bg);
  }

  @media (max-width: 600px) {
    .sidebar { width: 56px; min-width: 56px; }
    .sidebar-item span:last-child { display: none; }
    .sidebar-header p, .sidebar-header h1 { display: none; }
  }
`;

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePalette, setActivePalette] = useState<string>("Default");
  const [activeLayout, setActiveLayout] = useState<LayoutType>("dashboard");
  const stylesInjected = useRef(false);

  const activeTheme = themes[activeIndex];

  useEffect(() => {
    setActivePalette("Default");
    setActiveLayout(activeTheme.defaultLayout || "dashboard");
  }, [activeIndex, activeTheme]);

  useEffect(() => {
    // Inject styles once on mount — one <style> per theme to avoid
    // browser CSS-parser rule-count limits that silently drop rules
    // when everything is crammed into a single mega-stylesheet.
    if (stylesInjected.current) return;
    stylesInjected.current = true;

    // Collect all @import lines across all themes (must go first)
    const importLines: string[] = [];
    themes.forEach((t) => {
      t.styles.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("@import") && !importLines.includes(trimmed)) {
          importLines.push(trimmed);
        }
      });
    });

    // 1. Global style element: @imports + base styles
    const globalEl = document.createElement("style");
    globalEl.id = "theme-styles-global";
    globalEl.textContent = importLines.join("\n") + "\n" + globalBaseStyles;
    document.head.appendChild(globalEl);

    // 2. One <style> per theme (no @import lines — already hoisted)
    themes.forEach((t) => {
      const themeCSS = t.styles
        .split("\n")
        .filter((line) => !line.trim().startsWith("@import"))
        .join("\n");
      if (!themeCSS.trim()) return;
      const el = document.createElement("style");
      el.id = `theme-styles-${t.id}`;
      el.textContent = themeCSS;
      document.head.appendChild(el);
    });
  }, []);

  const currentColors = activePalette === "Default" 
    ? activeTheme.colors 
    : (activeTheme.palettes?.[activePalette] || activeTheme.colors);

  const cssVariables = Object.fromEntries(
    Object.entries(currentColors).map(([k, v]) => [
      "--" + k.replace(/[A-Z]/g, m => "-" + m.toLowerCase()), 
      v
    ])
  );

  return (
    <div className="app-shell" data-theme={activeTheme.id} style={cssVariables as React.CSSProperties}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>UI Styles</h1>
          <p>{activeTheme.description || "Click to transform"}</p>
        </div>
        
        <nav className="sidebar-nav">
          {themes.map((theme, i) => (
            <button
              key={theme.id}
              className={`sidebar-item${i === activeIndex ? " active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <span className="emoji">{theme.emoji}</span>
              <span>{theme.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer" style={{ padding: "20px", borderTop: "1px solid var(--border)" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "10px", fontWeight: "bold", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Palette</label>
            <select 
              value={activePalette} 
              onChange={(e) => setActivePalette(e.target.value)}
              style={{ width: "100%", background: "var(--input-bg)", color: "var(--text)", border: "1px solid var(--border)", padding: "4px", borderRadius: "4px", fontSize: "12px" }}
            >
              <option value="Default">Default</option>
              {activeTheme.palettes && Object.keys(activeTheme.palettes).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "10px", fontWeight: "bold", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Layout</label>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {(["dashboard", "media", "document", "compact", "landing"] as LayoutType[]).map(l => (
                <button 
                  key={l}
                  onClick={() => setActiveLayout(l)}
                  style={{ 
                    padding: "4px 8px", 
                    fontSize: "10px", 
                    background: activeLayout === l ? "var(--accent)" : "var(--input-bg)", 
                    color: activeLayout === l ? "#fff" : "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
      <main className="main-panel">
        <activeTheme.Showcase layout={activeLayout} colors={currentColors} />
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
