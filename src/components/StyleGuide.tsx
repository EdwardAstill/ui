import React from "react";
import type { FC } from "react";
import type { ColorPalette, ThemeDefinition } from "../themes/types";

/**
 * Style Guide component — renders a consistent set of UI elements
 * (colours, typography, buttons, inputs, topbar, cards, alerts) using
 * only the active theme's CSS custom properties. Each theme is
 * responsible for setting --bg, --text, --accent, --radius, etc.
 *
 * All structural styling lives in the `.sg-*` class namespace injected
 * once via `styleGuideCSS` below. Theme colour comes from CSS vars so
 * the same markup reflects each theme's flavour.
 */

export const styleGuideCSS = `
/* ───── Style Guide (.sg-*) ───── */
.sg-root {
  padding: 40px 48px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 56px;
  color: var(--text);
  background: var(--bg);
  font-family: var(--font-body);
}

.sg-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);
}

.sg-hero-title {
  font-size: 56px;
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--text);
}

.sg-hero-sub {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 12px;
  max-width: 480px;
  line-height: 1.5;
}

.sg-hero-marks {
  display: flex;
  gap: 16px;
  align-items: center;
}

.sg-hero-disc {
  width: 96px;
  height: 96px;
  border-radius: 999px;
  background: var(--accent);
}
.sg-hero-disc-sm {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: var(--card-bg);
  border: 1px solid var(--border);
}

.sg-section-title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 20px 0;
  color: var(--text);
}

.sg-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 12px;
}

/* ── Colours ── */
.sg-colour-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 24px;
}
.sg-swatch {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sg-swatch-chip {
  width: 120px;
  height: 72px;
  border: 1px solid var(--border);
  border-radius: var(--radius, 4px);
}
.sg-swatch-name {
  font-size: 12px;
  color: var(--text);
  font-weight: 500;
}
.sg-swatch-hex {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.sg-ramp {
  display: flex;
  gap: 0;
  margin-top: 12px;
}
.sg-ramp-chip {
  width: 64px;
  height: 48px;
  position: relative;
}
.sg-ramp-chip::after {
  content: attr(data-hex);
  position: absolute;
  bottom: -18px;
  left: 0;
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--text-muted);
}

/* ── Typography ── */
.sg-type-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px 48px;
  align-items: start;
}
.sg-type-meta {
  font-size: 12px;
  color: var(--text-muted);
}
.sg-type-meta-name {
  font-size: 32px;
  color: var(--text);
  font-weight: 600;
  margin-top: 4px;
}
.sg-type-weights {
  display: flex;
  gap: 16px;
  font-size: 22px;
  margin-top: 4px;
}
.sg-type-specimens {
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 24px 28px;
  align-items: end;
}
.sg-type-specimen {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.sg-type-specimen-big { color: var(--text); line-height: 1; }
.sg-type-specimen-meta {
  font-size: 10px;
  color: var(--text-muted);
  line-height: 1.4;
}

.sg-body-sample {
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}
.sg-body-sample h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--text);
}
.sg-body-sample p {
  font-size: 13px;
  line-height: 1.55;
  color: var(--text-muted);
  margin: 0 0 8px 0;
}
.sg-body-sample .sg-byline {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 8px;
  opacity: 0.7;
}

/* ── Buttons ── */
.sg-button-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.sg-button-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.sg-button-col-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}
.sg-button-state-label {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.sg-button-row {
  display: flex;
  gap: 12px;
}
.sg-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 20px;
  height: 36px;
  min-width: 88px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font-body);
  border-radius: var(--radius, 6px);
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease, transform 0.08s ease;
  border: 1px solid transparent;
  line-height: 1;
}
.sg-button-primary {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}
.sg-button-primary.hover {
  filter: brightness(1.1);
}
.sg-button-primary.disabled {
  background: var(--border);
  color: var(--text-muted);
  border-color: var(--border);
  cursor: not-allowed;
}
.sg-button-secondary {
  background: transparent;
  color: var(--text);
  border-color: var(--border);
}
.sg-button-secondary.hover {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}
.sg-button-secondary.disabled {
  color: var(--text-muted);
  border-color: var(--border);
  background: var(--input-bg);
  cursor: not-allowed;
}
.sg-button-icon {
  width: 36px;
  min-width: 36px;
  padding: 0;
}
.sg-button-icon.sg-button-primary { background: var(--accent); color: var(--bg); }
.sg-button-icon.disabled { background: var(--border); color: var(--text-muted); cursor: not-allowed; }

.sg-button-ghost {
  background: transparent;
  color: var(--accent);
  border-color: transparent;
}

.sg-arrow::after { content: "→"; font-size: 14px; }

.sg-button-spec {
  margin-top: 24px;
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ── Topbar ── */
.sg-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius, 6px);
  background: var(--card-bg);
  gap: 20px;
}
.sg-topbar-brand {
  font-weight: 700;
  font-size: 15px;
  color: var(--text);
  letter-spacing: -0.01em;
}
.sg-topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-muted);
  font-size: 13px;
}
.sg-topbar-dot {
  width: 8px; height: 8px;
  background: var(--accent);
  border-radius: 999px;
  margin-right: 4px;
}

/* ── Inputs ── */
.sg-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.sg-input-group { display: flex; flex-direction: column; gap: 6px; }
.sg-input-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.sg-input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius, 6px);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 13px;
  outline: none;
}
.sg-input:focus { border-color: var(--accent); }
.sg-input.error { border-color: #e43a2f; }
.sg-input-error-msg { font-size: 11px; color: #e43a2f; }

.sg-check-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text); }
.sg-check-box {
  width: 18px; height: 18px;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius, 4px) / 2);
  background: var(--input-bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.sg-check-box.checked {
  background: var(--accent);
  border-color: var(--accent);
}
.sg-check-box.checked::after {
  content: "✓";
  color: var(--bg);
  font-size: 12px;
  line-height: 1;
}

.sg-toggle {
  position: relative;
  width: 38px;
  height: 22px;
  background: var(--border);
  border-radius: 999px;
  transition: background 0.15s ease;
}
.sg-toggle.on { background: var(--accent); }
.sg-toggle::after {
  content: "";
  position: absolute;
  top: 3px; left: 3px;
  width: 16px; height: 16px;
  background: var(--bg);
  border-radius: 999px;
  transition: left 0.15s ease;
}
.sg-toggle.on::after { left: 19px; }

/* ── Cards ── */
.sg-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.sg-card {
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius, 8px);
  background: var(--card-bg);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sg-card-elev { box-shadow: 0 4px 14px rgba(0,0,0,0.08); }
.sg-card-title { font-size: 15px; font-weight: 600; color: var(--text); }
.sg-card-body { font-size: 12px; color: var(--text-muted); line-height: 1.5; }
.sg-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-muted);
  padding-top: 8px;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

/* ── Alerts ── */
.sg-alerts { display: flex; flex-direction: column; gap: 12px; }
.sg-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-left-width: 4px;
  border-radius: var(--radius, 6px);
  font-size: 13px;
  background: var(--card-bg);
  color: var(--text);
}
.sg-alert-success { border-left-color: #2ca76a; }
.sg-alert-info    { border-left-color: #3b82f6; }
.sg-alert-warning { border-left-color: #d49b2b; }
.sg-alert-error   { border-left-color: #e43a2f; }

/* ── Spacing & radius displays ── */
.sg-spacing-row, .sg-radius-row {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}
.sg-spacing-item, .sg-radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted);
}
.sg-spacing-square {
  border: 1px dashed var(--border);
  background: transparent;
}
.sg-radius-square {
  width: 56px; height: 56px;
  background: var(--card-bg);
  border: 1px solid var(--border);
}
`;

function hexFromVar(el: HTMLElement, name: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || "—";
}

const Swatch: FC<{ name: string; value: string; varName: string }> = ({ name, value, varName }) => (
  <div className="sg-swatch">
    <div className="sg-swatch-chip" style={{ background: `var(${varName})` }} />
    <div>
      <div className="sg-swatch-name">{name}</div>
      <div className="sg-swatch-hex">{value}</div>
    </div>
  </div>
);

const ButtonExamples: FC<{ state: "normal" | "hover" | "disabled" }> = ({ state }) => (
  <>
    <div className="sg-button-state-label">
      {state === "normal" ? "Default" : state === "hover" ? "Hover" : "Disabled"}
    </div>
    <div className="sg-button-row">
      <button className={`sg-button sg-button-primary ${state !== "normal" ? state : ""}`}>Button</button>
      <button className={`sg-button sg-button-primary ${state !== "normal" ? state : ""}`}>
        <span>Action</span>
        <span className="sg-arrow" />
      </button>
    </div>
  </>
);

const SecondaryButtonExamples: FC<{ state: "normal" | "hover" | "disabled" }> = ({ state }) => (
  <>
    <div className="sg-button-state-label">
      {state === "normal" ? "Default" : state === "hover" ? "Hover" : "Disabled"}
    </div>
    <div className="sg-button-row">
      <button className={`sg-button sg-button-secondary ${state !== "normal" ? state : ""}`}>Button</button>
      <button className={`sg-button sg-button-secondary ${state !== "normal" ? state : ""}`}>
        <span>Action</span>
        <span className="sg-arrow" />
      </button>
    </div>
  </>
);

const IconButtonExamples: FC<{ state: "normal" | "hover" | "disabled" }> = ({ state }) => (
  <>
    <div className="sg-button-state-label">
      {state === "normal" ? "Default" : state === "hover" ? "Hover" : "Disabled"}
    </div>
    <div className="sg-button-row">
      <button className={`sg-button sg-button-icon sg-button-primary ${state !== "normal" ? state : ""}`} aria-label="play">▶</button>
      <button className={`sg-button sg-button-icon sg-button-secondary ${state !== "normal" ? state : ""}`} aria-label="more">⋯</button>
    </div>
  </>
);

export const StyleGuide: FC<{ theme: ThemeDefinition; colors: ColorPalette }> = ({ theme, colors }) => {
  return (
    <div className="sg-root">
      {/* Hero */}
      <div className="sg-hero">
        <div>
          <h1 className="sg-hero-title">Style<br />Guide.</h1>
          <div className="sg-hero-sub">
            {theme.name} — {theme.description || "Consistent elements rendered in this theme's visual language."}
          </div>
        </div>
        <div className="sg-hero-marks">
          <div className="sg-hero-disc-sm" />
          <div className="sg-hero-disc" />
        </div>
      </div>

      {/* Colours */}
      <section>
        <h2 className="sg-section-title">Colours.</h2>
        <div className="sg-label">Theme tokens</div>
        <div className="sg-colour-row">
          <Swatch name="Background" value={colors.bg} varName="--bg" />
          <Swatch name="Surface" value={colors.cardBg} varName="--card-bg" />
          <Swatch name="Text" value={colors.text} varName="--text" />
          <Swatch name="Muted" value={colors.textMuted} varName="--text-muted" />
          <Swatch name="Accent" value={colors.accent} varName="--accent" />
          {colors.accent2 && <Swatch name="Accent 2" value={colors.accent2} varName="--accent-2" />}
          <Swatch name="Border" value={colors.border} varName="--border" />
          <Swatch name="Input" value={colors.inputBg} varName="--input-bg" />
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="sg-section-title">Typography.</h2>
        <div className="sg-type-grid">
          <div>
            <div className="sg-type-meta">Font family</div>
            <div className="sg-type-meta-name" style={{ fontFamily: "var(--font-body)" }}>
              Aa
            </div>
            <div className="sg-type-meta" style={{ marginTop: 8 }}>Body</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text)", marginTop: 2 }}>
              {extractFirstFamily(colors)}
            </div>
            <div className="sg-type-weights">
              <span style={{ fontWeight: 700 }}>Bold</span>
              <span style={{ fontWeight: 500 }}>Medium</span>
              <span style={{ fontWeight: 400 }}>Regular</span>
              <span style={{ fontWeight: 300 }}>Light</span>
            </div>
          </div>
          <div className="sg-type-specimens">
            <div className="sg-type-specimen">
              <span className="sg-type-specimen-big" style={{ fontSize: 48, fontWeight: 700 }}>h1</span>
              <span className="sg-type-specimen-meta">Title<br/>48px<br/>Bold</span>
            </div>
            <div className="sg-type-specimen">
              <span className="sg-type-specimen-big" style={{ fontSize: 36, fontWeight: 700 }}>h2</span>
              <span className="sg-type-specimen-meta">Subtitle<br/>36px<br/>Bold</span>
            </div>
            <div className="sg-type-specimen">
              <span className="sg-type-specimen-big" style={{ fontSize: 24, fontWeight: 500 }}>h3</span>
              <span className="sg-type-specimen-meta">Subtitle<br/>24px<br/>Medium</span>
            </div>
            <div className="sg-type-specimen">
              <span className="sg-type-specimen-big" style={{ fontSize: 18, fontWeight: 500 }}>H4</span>
              <span className="sg-type-specimen-meta">Subtitle<br/>18px<br/>Medium</span>
            </div>
            <div className="sg-type-specimen">
              <span className="sg-type-specimen-big" style={{ fontSize: 16, fontWeight: 400 }}>p1</span>
              <span className="sg-type-specimen-meta">Body<br/>16px<br/>Regular</span>
            </div>
            <div className="sg-type-specimen">
              <span className="sg-type-specimen-big" style={{ fontSize: 14, fontWeight: 400 }}>p2</span>
              <span className="sg-type-specimen-meta">Byline<br/>14px<br/>Regular</span>
            </div>
          </div>
        </div>

        <div className="sg-body-sample">
          <div>
            <h3>Next-Generation API</h3>
            <div className="sg-byline">By the platform team</div>
            <p>
              Achieve architectural freedom by connecting your microservices and
              APIs natively within and across clouds, Kubernetes, and data-centers.
              Run resilient, secure, and observable workloads at any scale.
            </p>
          </div>
          <div>
            <h3>Next-Generation API</h3>
            <p>
              Achieve architectural freedom by connecting your microservices and
              APIs natively within and across clouds, Kubernetes, and data-centers.
              Run resilient, secure, and observable workloads at any scale.
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="sg-section-title">Buttons.</h2>
        <div className="sg-button-grid">
          <div className="sg-button-col">
            <div className="sg-button-col-title">Primary</div>
            <div><ButtonExamples state="normal" /></div>
            <div><ButtonExamples state="hover" /></div>
            <div><ButtonExamples state="disabled" /></div>
          </div>
          <div className="sg-button-col">
            <div className="sg-button-col-title">Secondary</div>
            <div><SecondaryButtonExamples state="normal" /></div>
            <div><SecondaryButtonExamples state="hover" /></div>
            <div><SecondaryButtonExamples state="disabled" /></div>
          </div>
          <div className="sg-button-col">
            <div className="sg-button-col-title">Icon</div>
            <div><IconButtonExamples state="normal" /></div>
            <div><IconButtonExamples state="hover" /></div>
            <div><IconButtonExamples state="disabled" /></div>
          </div>
        </div>
        <div className="sg-button-spec">
          Font size: 13px, Medium &nbsp;·&nbsp; Height: 36px &nbsp;·&nbsp; Padding: 8px 20px &nbsp;·&nbsp; Radius: var(--radius)
        </div>
      </section>

      {/* Topbar */}
      <section>
        <h2 className="sg-section-title">Topbar.</h2>
        <div className="sg-topbar">
          <div className="sg-topbar-brand">{theme.name}</div>
          <div className="sg-topbar-right">
            <span>🔍</span>
            <span><span className="sg-topbar-dot" />3</span>
            <span>⬤  Hello, Isaac ▾</span>
          </div>
        </div>
        <div className="sg-button-spec">Height: 64px · Padding-x: 20px · Border-radius: var(--radius)</div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="sg-section-title">Form elements.</h2>
        <div className="sg-inputs">
          <div className="sg-input-group">
            <label className="sg-input-label">Search</label>
            <input className="sg-input" placeholder="Search invoices…" />
          </div>
          <div className="sg-input-group">
            <label className="sg-input-label">Filled state</label>
            <input className="sg-input" defaultValue="Invoice #12345" />
          </div>
          <div className="sg-input-group">
            <label className="sg-input-label">Error state</label>
            <input className="sg-input error" defaultValue="" placeholder="Error message" />
            <span className="sg-input-error-msg">Field is required</span>
          </div>

          <div className="sg-input-group">
            <label className="sg-input-label">Dropdown</label>
            <select className="sg-input" defaultValue="a">
              <option value="a">Select option</option>
              <option value="b">Option B</option>
            </select>
          </div>
          <div className="sg-input-group">
            <label className="sg-input-label">Checkbox & toggle</label>
            <div style={{ display: "flex", gap: 16, alignItems: "center", height: 36 }}>
              <div className="sg-check-row"><span className="sg-check-box checked" />Enable</div>
              <div className="sg-check-row"><span className="sg-check-box" />Optional</div>
              <div className="sg-check-row"><span className="sg-toggle on" />On</div>
              <div className="sg-check-row"><span className="sg-toggle" />Off</div>
            </div>
          </div>
          <div className="sg-input-group">
            <label className="sg-input-label">Textarea</label>
            <textarea
              className="sg-input"
              style={{ height: 36, padding: 8, resize: "none" }}
              placeholder="Short message…"
            />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="sg-section-title">Cards.</h2>
        <div className="sg-card-grid">
          <div className="sg-card">
            <div className="sg-card-title">Content card</div>
            <div className="sg-card-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
              pellentesque purus, ac iaculis lectus.
            </div>
            <div className="sg-card-meta"><span>Status</span><span>Active</span></div>
          </div>
          <div className="sg-card sg-card-elev">
            <div className="sg-card-title">Interactive card</div>
            <div className="sg-card-body">
              Click effects, selectable headers, quick-actions — all use the
              theme's accent for affordance.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="sg-button sg-button-secondary" style={{ height: 30, minWidth: 72 }}>Cancel</button>
              <button className="sg-button sg-button-primary" style={{ height: 30, minWidth: 72 }}>Confirm</button>
            </div>
          </div>
          <div className="sg-card">
            <div className="sg-card-title">Stat card</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Revenue</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "var(--text)" }}>$56,000</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Change</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)" }}>+12.8%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section>
        <h2 className="sg-section-title">Alerts.</h2>
        <div className="sg-alerts">
          <div className="sg-alert sg-alert-success">✓ Success — your changes have been saved.</div>
          <div className="sg-alert sg-alert-info">ⓘ Info — new updates available for your workspace.</div>
          <div className="sg-alert sg-alert-warning">⚠ Warning — this action cannot be undone.</div>
          <div className="sg-alert sg-alert-error">✕ Error — could not reach the server.</div>
        </div>
      </section>

      {/* Spacing + Radius */}
      <section>
        <h2 className="sg-section-title">Spacing & radius.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <div className="sg-label">Spacing scale</div>
            <div className="sg-spacing-row">
              {[4, 8, 16, 24, 32, 48].map(v => (
                <div key={v} className="sg-spacing-item">
                  <div className="sg-spacing-square" style={{ width: v, height: v }} />
                  <span>{v}px</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="sg-label">Radius samples</div>
            <div className="sg-radius-row">
              {[
                { label: "None", r: 0 },
                { label: "SM", r: 4 },
                { label: "MD", r: 8 },
                { label: "LG", r: 16 },
                { label: "Full", r: 999 },
              ].map(({ label, r }) => (
                <div key={label} className="sg-radius-item">
                  <div className="sg-radius-square" style={{ borderRadius: r }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function extractFirstFamily(_colors: ColorPalette): string {
  // Placeholder — actual font-family is read via CSS var. The label below
  // the Aa uses whatever font-body resolves to; this string is just a hint.
  return "System font";
}
