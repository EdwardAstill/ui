import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

import { themes } from "./showcase/themes";
import type { LayoutType } from "./showcase/themes";
import { StyleGuide, styleGuideCSS } from "./style/StyleGuide";
import { themeEnhancementsCSS } from "./style/themeEnhancements";
import { VizPanel } from "./viz/App";
import { vizStyles } from "./viz/primitives";

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

  /* Style guide mode: force scrollable + zero outer padding
     (the StyleGuide component provides its own padding) so themes
     that hide overflow or remove padding on the main-panel still render. */
  .main-panel-style,
  [data-theme] .main-panel-style {
    padding: 0 !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }

  @media (max-width: 600px) {
    .sidebar { width: 56px; min-width: 56px; }
    .sidebar-item span:last-child { display: none; }
    .sidebar-header p, .sidebar-header h1 { display: none; }
  }
`;

type ViewMode = "showcase" | "style" | "viz";

function readInitialMode(): ViewMode {
  if (typeof window === "undefined") return "showcase";
  const params = new URLSearchParams(window.location.search);
  const m = params.get("mode");
  if (m === "style") return "style";
  if (m === "viz") return "viz";
  return "showcase";
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePalette, setActivePalette] = useState<string>("Default");
  const [activeLayout, setActiveLayout] = useState<LayoutType>("dashboard");
  const [viewMode, setViewMode] = useState<ViewMode>(readInitialMode());
  const stylesInjected = useRef(false);

  const activeTheme = themes[activeIndex];

  useEffect(() => {
    setActivePalette("Default");
    setActiveLayout(activeTheme.defaultLayout || "dashboard");
  }, [activeIndex, activeTheme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (viewMode === "style") url.searchParams.set("mode", "style");
    else if (viewMode === "viz") url.searchParams.set("mode", "viz");
    else url.searchParams.delete("mode");
    window.history.replaceState(null, "", url.toString());
  }, [viewMode]);

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

    // 1. Global style element: @imports + base styles + style guide CSS
    const globalEl = document.createElement("style");
    globalEl.id = "theme-styles-global";
    globalEl.textContent = importLines.join("\n") + "\n" + globalBaseStyles + "\n" + styleGuideCSS + "\n" + vizStyles;
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

    const enhancementEl = document.createElement("style");
    enhancementEl.id = "theme-style-enhancements";
    enhancementEl.textContent = themeEnhancementsCSS;
    document.head.appendChild(enhancementEl);
  }, []);

  const currentColors = (activePalette === "Default"
    ? activeTheme.colors
    : (activeTheme.palettes?.[activePalette] || activeTheme.colors))!;

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
          <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
            {(["showcase", "style", "viz"] as ViewMode[]).map(m => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                style={{
                  flex: 1,
                  padding: "6px 8px",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  background: viewMode === m ? "var(--accent)" : "var(--input-bg)",
                  color: viewMode === m ? "#fff" : "var(--text)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {m === "showcase" ? "Themes" : m === "style" ? "Style" : "Viz"}
              </button>
            ))}
          </div>
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

          {viewMode === "showcase" && (
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
          )}
        </div>
      </aside>
      <main className={`main-panel ${viewMode === "style" ? "main-panel-style" : ""}`}>
        {viewMode === "style" ? (
          <StyleGuide theme={activeTheme} colors={currentColors} />
        ) : viewMode === "viz" ? (
          <VizPanel />
        ) : (
          <activeTheme.Showcase layout={activeLayout} colors={currentColors} />
        )}
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
