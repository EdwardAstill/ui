import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
@import url('https://fonts.bunny.net/css?family=geist:400,500,600&display=swap');
@import url('https://fonts.bunny.net/css?family=geist-mono:400,500&display=swap');

[data-theme="claude-pack"] {
  --bg: #0A0A0B;
  --panel: #0F0F10;
  --card: #111112;
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.15);
  --text: #E8E8E8;
  --text-dim: #9A9A9A;
  --text-muted: #6B6B6B;
  --text-subtle: #4A4A4A;
  --text-ghost: #3A3A3A;
  --accent: #FFFFFF;
  --ok: #4ade80;
  --font-body: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
  --fs: 12px;
  --fs-sm: 11px;
  --fs-xs: 10px;
}

[data-theme="claude-pack"] .main-panel {
  padding: 0 !important;
  overflow: hidden !important;
}

[data-theme="claude-pack"] .cp-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--fs);
  overflow: hidden;
}

/* top bar */
[data-theme="claude-pack"] .cp-top {
  height: 40px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  background: var(--bg);
}
[data-theme="claude-pack"] .cp-title { font-weight: 500; }
[data-theme="claude-pack"] .cp-sub { color: var(--text-subtle); font-family: var(--font-mono); font-size: var(--fs-sm); }
[data-theme="claude-pack"] .cp-btn {
  padding: 4px 10px;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--border);
  font-family: var(--font-body);
  font-size: var(--fs-sm);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
[data-theme="claude-pack"] .cp-btn.on { color: var(--text); border-color: var(--border-strong); }
[data-theme="claude-pack"] .cp-btn .kbd { color: var(--text-subtle); font-family: var(--font-mono); margin-left: 8px; font-size: 10px; }

/* body */
[data-theme="claude-pack"] .cp-body { display: flex; flex: 1; min-height: 0; overflow: hidden; }

/* icon sidebar */
[data-theme="claude-pack"] .cp-icons {
  width: 48px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  background: var(--bg);
}
[data-theme="claude-pack"] .cp-icon {
  width: 48px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  position: relative;
}
[data-theme="claude-pack"] .cp-icon.active { color: var(--accent); background: rgba(255,255,255,0.08); }
[data-theme="claude-pack"] .cp-icon.active::before {
  content: "";
  position: absolute;
  left: 0; top: 6px; bottom: 6px;
  width: 2px;
  background: var(--accent);
}

/* session list */
[data-theme="claude-pack"] .cp-list {
  width: 260px;
  flex-shrink: 0;
  background: var(--panel);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
[data-theme="claude-pack"] .cp-head {
  height: 40px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: var(--fs-sm);
  color: var(--text-subtle);
}
[data-theme="claude-pack"] .cp-head .ct { color: var(--text-ghost); font-family: var(--font-mono); margin-left: auto; }
[data-theme="claude-pack"] .cp-session {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  position: relative;
}
[data-theme="claude-pack"] .cp-session.open { background: rgba(255,255,255,0.03); }
[data-theme="claude-pack"] .cp-session.open::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: var(--accent);
}
[data-theme="claude-pack"] .cp-row1 { display: flex; align-items: center; gap: 8px; }
[data-theme="claude-pack"] .cp-name { font-weight: 500; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
[data-theme="claude-pack"] .cp-row2 {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
[data-theme="claude-pack"] .cp-row3 { margin-top: 5px; font-size: var(--fs-sm); color: var(--text-dim); }
[data-theme="claude-pack"] .cp-branch { font-family: var(--font-mono); color: var(--text-dim); }
[data-theme="claude-pack"] .cp-chips { display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap; }
[data-theme="claude-pack"] .cp-chip {
  padding: 1px 6px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: var(--fs-xs);
  line-height: 1.5;
}
[data-theme="claude-pack"] .cp-chip.on { color: var(--text); border-color: var(--border-strong); background: rgba(255,255,255,0.04); }
[data-theme="claude-pack"] .cp-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; background: var(--text-subtle); }
[data-theme="claude-pack"] .cp-dot.ok { background: var(--ok); }
[data-theme="claude-pack"] .cp-dot.attn { background: var(--accent); }
[data-theme="claude-pack"] .cp-dot.err { background: transparent; border: 1px solid var(--text); }
[data-theme="claude-pack"] .cp-runner {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  padding: 0 4px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  line-height: 1.4;
}
[data-theme="claude-pack"] .cp-bar { height: 2px; background: rgba(255,255,255,0.05); margin-top: 6px; }
[data-theme="claude-pack"] .cp-bar > div { height: 100%; background: var(--text-dim); }

/* main */
[data-theme="claude-pack"] .cp-main { flex: 1; display: flex; flex-direction: column; min-width: 0; background: var(--bg); }
[data-theme="claude-pack"] .cp-tabs {
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
}
[data-theme="claude-pack"] .cp-tab {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  font-size: var(--fs-sm);
  color: var(--text-subtle);
  border-right: 1px solid var(--border);
}
[data-theme="claude-pack"] .cp-tab.active { color: var(--text); background: rgba(255,255,255,0.08); }
[data-theme="claude-pack"] .cp-tab .x { color: var(--text-ghost); margin-left: 2px; }
[data-theme="claude-pack"] .cp-term {
  flex: 1;
  padding: 16px 20px;
  font-family: var(--font-mono);
  font-size: var(--fs);
  line-height: 1.7;
  color: var(--text-dim);
  overflow-y: auto;
  background: var(--bg);
}
[data-theme="claude-pack"] .cp-term pre { white-space: pre-wrap; font-family: inherit; font-size: inherit; }
[data-theme="claude-pack"] .cp-u { color: var(--text); }
[data-theme="claude-pack"] .cp-h { color: var(--text); font-weight: 500; }
[data-theme="claude-pack"] .cp-d { color: var(--text-subtle); }
[data-theme="claude-pack"] .cp-g { color: var(--text-ghost); font-style: italic; }
[data-theme="claude-pack"] .cp-m { color: var(--text-muted); }
[data-theme="claude-pack"] .cp-ok { color: var(--ok); }
[data-theme="claude-pack"] .cp-box { color: var(--text-ghost); }

[data-theme="claude-pack"] .cp-status {
  height: 28px;
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  font-size: var(--fs-sm);
  color: var(--text-muted);
  background: var(--panel);
}
[data-theme="claude-pack"] .cp-status .s { color: var(--text-ghost); }

/* inspector */
[data-theme="claude-pack"] .cp-insp {
  width: 280px;
  flex-shrink: 0;
  background: var(--panel);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}
[data-theme="claude-pack"] .cp-insp-section { border-bottom: 1px solid var(--border); padding: 12px 16px; }
[data-theme="claude-pack"] .cp-insp-title { font-size: var(--fs-sm); color: var(--text-subtle); margin-bottom: 8px; }
[data-theme="claude-pack"] .cp-kv {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: var(--fs);
}
[data-theme="claude-pack"] .cp-kv .k { color: var(--text-dim); }
[data-theme="claude-pack"] .cp-kv .v { color: var(--text); font-family: var(--font-mono); }
`;

/* ─────────────────────────── icons ─────────────────────────── */

const Icon: FC<{ name: string; size?: number }> = ({ name, size = 16 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "menu":    return <svg {...p}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case "brain":   return <svg {...p}><path d="M12 5a3 3 0 1 0-6 .1 4 4 0 0 0-2.5 5.8A4 4 0 0 0 6.5 18a4 4 0 0 0 5.5 0 4 4 0 0 0 5.5 0 4 4 0 0 0 3-7.1A4 4 0 0 0 18 5.1 3 3 0 1 0 12 5z"/></svg>;
    case "history": return <svg {...p}><path d="M1 4v6h6"/><path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10"/><path d="M12 7v5l4 2"/></svg>;
    case "git":     return <svg {...p}><circle cx={6} cy={6} r={2}/><circle cx={18} cy={6} r={2}/><circle cx={6} cy={18} r={2}/><path d="M6 8v8M6 18h8a4 4 0 0 0 4-4V8"/></svg>;
    case "book":    return <svg {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
    case "clock":   return <svg {...p}><circle cx={12} cy={12} r={9}/><path d="M12 7v5l3 2"/></svg>;
    case "gear":    return <svg {...p}><circle cx={12} cy={12} r={3}/><path d="M12 1v4M12 19v4M4.2 4.2l2.9 2.9M16.9 16.9l2.9 2.9M1 12h4M19 12h4M4.2 19.8l2.9-2.9M16.9 7.1l2.9-2.9"/></svg>;
    case "search":  return <svg {...p}><circle cx={11} cy={11} r={7}/><path d="m21 21-4.3-4.3"/></svg>;
    case "mic":     return <svg {...p}><rect x={9} y={2} width={6} height={12}/><path d="M5 10a7 7 0 0 0 14 0M12 19v4"/></svg>;
    default: return null;
  }
};

/* ─────────────────────────── Showcase ─────────────────────────── */

const ClaudePackShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = () => (
  <div className="cp-root">

    {/* topbar */}
    <div className="cp-top">
      <div className="cp-title">claude-pack</div>
      <div className="cp-sub">v0.1.0</div>
      <button className="cp-btn on">pack: morning ▾</button>
      <div style={{ flex: 1 }} />
      <button className="cp-btn">
        <Icon name="search" size={12} />
        search · run
        <span className="kbd">⌘K</span>
      </button>
      <button className="cp-btn on">
        <Icon name="mic" size={12} />
        voice
      </button>
    </div>

    {/* body */}
    <div className="cp-body">

      {/* icon sidebar */}
      <nav className="cp-icons">
        <div className="cp-icon active"><Icon name="menu" /></div>
        <div className="cp-icon"><Icon name="brain" /></div>
        <div className="cp-icon"><Icon name="history" /></div>
        <div className="cp-icon"><Icon name="git" /></div>
        <div className="cp-icon"><Icon name="book" /></div>
        <div className="cp-icon"><Icon name="clock" /></div>
        <div style={{ flex: 1 }} />
        <div className="cp-icon"><Icon name="gear" /></div>
      </nav>

      {/* session list */}
      <aside className="cp-list">
        <div className="cp-head">
          <span>sessions</span>
          <span className="ct">3</span>
        </div>

        <div className="cp-session open">
          <div className="cp-row1">
            <span className="cp-dot ok" />
            <span className="cp-name">agentfiles</span>
            <span className="cp-runner">C</span>
          </div>
          <div className="cp-row2">
            <span className="cp-branch">main</span>
            <span>·</span>
            <span>running</span>
          </div>
          <div className="cp-row3">extracting worktree cli</div>
          <div className="cp-chips">
            <span className="cp-chip on">tdd</span>
            <span className="cp-chip on">simplify</span>
          </div>
          <div className="cp-bar"><div style={{ width: "23%" }} /></div>
        </div>

        <div className="cp-session open">
          <div className="cp-row1">
            <span className="cp-dot attn" />
            <span className="cp-name">dock-calcs</span>
            <span className="cp-runner">C</span>
          </div>
          <div className="cp-row2">
            <span className="cp-branch">feat/beam-check</span>
            <span>·</span>
            <span>asking</span>
          </div>
          <div className="cp-row3" style={{ color: "var(--text)" }}>
            "euler-bernoulli or timoshenko?"
          </div>
          <div className="cp-chips">
            <span className="cp-chip on">dock-calc-creation</span>
          </div>
        </div>

        <div className="cp-session">
          <div className="cp-row1">
            <span className="cp-dot err" />
            <span className="cp-name">sandbox</span>
            <span className="cp-runner">G</span>
          </div>
          <div className="cp-row2">
            <span className="cp-branch">scratch</span>
            <span>·</span>
            <span>permission</span>
          </div>
          <div className="cp-row3">
            <span className="cp-chip">rm -rf ./build</span>
          </div>
        </div>
      </aside>

      {/* main */}
      <main className="cp-main">
        <div className="cp-tabs">
          <div className="cp-tab active">
            <span className="cp-dot ok" />
            agentfiles
            <span className="x">×</span>
          </div>
          <div className="cp-tab">
            <span className="cp-dot attn" />
            dock-calcs
            <span className="x">×</span>
          </div>
          <div style={{ flex: 1 }} />
        </div>

        <div className="cp-term">
          <pre>
{``}<span className="cp-box">{`╭─────────────────────────────────────────────────────────╮`}</span>{`
`}<span className="cp-box">│</span>{`  `}<span className="cp-h">Claude Code</span>{` `}<span className="cp-d">· opus-4.7 · ~/projects/agentfiles</span>{`       `}<span className="cp-box">│</span>{`
`}<span className="cp-box">│</span>{`  `}<span className="cp-g">loaded: tdd · simplify · git-worktree-workflow</span>{`       `}<span className="cp-box">│</span>{`
`}<span className="cp-box">{`╰─────────────────────────────────────────────────────────╯`}</span>{`

`}<span className="cp-u">▸ extract the worktree cli into its own skill and wire up the manifest</span>{`

`}<span className="cp-g">scanning workspace…</span>{`
`}<span className="cp-d">├─</span>{` found `}<span className="cp-h">skills/git-worktree-workflow/</span>{`
`}<span className="cp-d">└─</span>{` manifest entries: 1

`}<span className="cp-u">▸ writing the failing test first.</span>{`

`}<span className="cp-m">$ </span>{`bun test skills/git-worktree-workflow/tests/launch.test.ts
`}<span className="cp-h">FAIL</span>{`  launch.test.ts
  `}<span className="cp-d">●</span>{` `}<span className="cp-h">launch flag</span>{` › forwards editor name to `}<span className="cp-m">gwt start --launch</span>{`

`}<span className="cp-u">▸ good — red. now implementing.</span>{`

`}<span className="cp-m">$ </span>{`bun test skills/git-worktree-workflow/tests/launch.test.ts
`}<span className="cp-ok">PASS</span>{`  launch.test.ts`}
          </pre>
        </div>

        <div className="cp-status">
          <span>running</span>
          <span className="s">·</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>main</span>
          <span className="s">·</span>
          <span>opus-4.7</span>
          <span className="s">·</span>
          <span>ctx <span style={{ color: "var(--text)" }}>23%</span></span>
          <span className="s">·</span>
          <span>$0.04</span>
          <span className="s">·</span>
          <span>perm: ask</span>
        </div>
      </main>

      {/* inspector */}
      <aside className="cp-insp">
        <div className="cp-head"><span>agentfiles</span></div>

        <section className="cp-insp-section">
          <div className="cp-insp-title">skills</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <span className="cp-chip on">tdd</span>
            <span className="cp-chip on">simplify</span>
            <span className="cp-chip on">git-worktree-workflow</span>
            <span className="cp-chip">+ add</span>
          </div>
        </section>

        <section className="cp-insp-section">
          <div className="cp-kv"><span className="k">model</span><span className="v">opus-4.7</span></div>
          <div className="cp-kv"><span className="k">permission</span><span className="v">ask</span></div>
          <div className="cp-kv"><span className="k">branch</span><span className="v">main · ±3</span></div>
        </section>

        <section className="cp-insp-section">
          <div className="cp-insp-title">cost · session</div>
          <div className="cp-kv"><span className="k">input tokens</span><span className="v">14.2k</span></div>
          <div className="cp-kv"><span className="k">output tokens</span><span className="v">2.1k</span></div>
          <div className="cp-kv"><span className="k">cache hits</span><span className="v">93%</span></div>
          <div className="cp-kv"><span className="k">session cost</span><span className="v">$0.04</span></div>
        </section>

        <section className="cp-insp-section">
          <div className="cp-insp-title">af log · last 4</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--text-dim)", lineHeight: 1.7 }}>
            <div><span style={{ color: "var(--text-ghost)" }}>18:02</span> executor → tdd</div>
            <div><span style={{ color: "var(--text-ghost)" }}>18:02</span> tdd → red-green</div>
            <div><span style={{ color: "var(--text-ghost)" }}>18:03</span> simplify · pass 1/2</div>
            <div><span style={{ color: "var(--text-ghost)" }}>18:04</span> executor → verify</div>
          </div>
        </section>
      </aside>
    </div>
  </div>
);

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#0A0A0B",
  sidebarBg: "#0A0A0B",
  border:    "rgba(255,255,255,0.08)",
  text:      "#E8E8E8",
  textMuted: "#6B6B6B",
  accent:    "#FFFFFF",
  cardBg:    "#111112",
  inputBg:   "#161617",
};

export const ClaudePackTheme: ThemeDefinition = {
  id: "claude-pack",
  name: "Claude Pack",
  emoji: "\u25A3",
  description: "Monochrome multi-session dashboard. Icon sidebar for workspaces · session list with skill chips · tabs · terminal · per-session inspector.",
  colors: defaultColors,
  defaultLayout: "dashboard",
  styles,
  Showcase: ClaudePackShowcase,
};
