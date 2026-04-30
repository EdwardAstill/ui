import React from "react";
import type { ReactNode, CSSProperties } from "react";

export { vizStyles } from "./styles";

/* ───────────── Shell ───────────── */

export function Shell({
  title,
  meta,
  children,
}: {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="viz-shell">
      {(title || meta) && (
        <div className="viz-shell-head">
          {title && <h2>{title}</h2>}
          {meta && <div className="viz-shell-meta">{meta}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ───────────── Sub ───────────── */

export function Sub({ children }: { children: ReactNode }) {
  return <p className="viz-sub">{children}</p>;
}

/* ───────────── SectionLabel ───────────── */

export function SectionLabel({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="viz-section-label" style={style}>
      {children}
    </div>
  );
}

/* ───────────── Stage (frame around an SVG) ───────────── */

export function Stage({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="viz-stage" style={style}>
      {children}
    </div>
  );
}

/* ───────────── Panel ───────────── */

export function Panel({
  children,
  minWidth = 240,
  style,
}: {
  children: ReactNode;
  minWidth?: number;
  style?: CSSProperties;
}) {
  return (
    <div className="viz-panel" style={{ minWidth, ...style }}>
      {children}
    </div>
  );
}

/* ───────────── Btn ───────────── */

export type BtnKind = "primary" | "ghost" | "tag";

export function Btn({
  kind = "ghost",
  active,
  children,
  ...rest
}: {
  kind?: BtnKind;
  active?: boolean;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = [
    "viz-btn",
    kind === "primary" && "viz-btn-primary",
    kind === "tag" && "viz-btn-tag",
    kind === "ghost" && "viz-btn-ghost",
    active && "viz-btn-active",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/* ───────────── Slider ───────────── */

export function Slider({
  label,
  unit,
  min,
  max,
  step = 1,
  value,
  onChange,
  format,
}: {
  label: string;
  unit?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const fmt = format || ((v: number) => (Number.isFinite(v) ? v.toFixed(2) : String(v)));
  return (
    <div className="viz-slider-row">
      <div className="viz-slider-head">
        <span>{label}</span>
        <span className="viz-slider-value">
          {fmt(value)}
          {unit && <span className="viz-slider-unit">{unit}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  );
}

/* ───────────── Tabs ───────────── */

export interface TabItem {
  id: string;
  label: ReactNode;
}

export function Tabs({
  value,
  onChange,
  items,
}: {
  value: string;
  onChange: (id: string) => void;
  items: TabItem[];
}) {
  return (
    <div className="viz-tabs">
      {items.map((it) => (
        <button
          key={it.id}
          className={`viz-tab${value === it.id ? " active" : ""}`}
          onClick={() => onChange(it.id)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* ───────────── Stat ───────────── */

export function Stat({
  label,
  value,
  color,
}: {
  label: ReactNode;
  value: ReactNode;
  color?: string;
}) {
  return (
    <span className="viz-stat">
      <span>{label}</span>
      <strong className="viz-stat-value" style={color ? { color } : undefined}>
        {value}
      </strong>
    </span>
  );
}

/* ───────────── LegendDot ───────────── */

export function LegendDot({ color, label }: { color: string; label: ReactNode }) {
  return (
    <span className="viz-legend-dot">
      <span className="viz-dot" style={{ background: color }} />
      {label}
    </span>
  );
}

/* ───────────── Notice ───────────── */

export function Notice({ children }: { children: ReactNode }) {
  return <div className="viz-notice">{children}</div>;
}

/* ───────────── Vec (SVG arrow) ───────────── */

export function Vec({
  from,
  to,
  color,
  label,
  width = 3,
}: {
  from: [number, number];
  to: [number, number];
  color: string;
  label?: string;
  width?: number;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const back = Math.max(len - 10, 0.001);
  const tipX = x1 + back * Math.cos(ang);
  const tipY = y1 + back * Math.sin(ang);
  const lx = x2 + 14 * Math.cos(ang) - 6;
  const ly = y2 + 14 * Math.sin(ang) + 5;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <polygon
        points={`${x2},${y2} ${tipX - 6 * Math.sin(ang)},${tipY + 6 * Math.cos(ang)} ${tipX + 6 * Math.sin(ang)},${tipY - 6 * Math.cos(ang)}`}
        fill={color}
      />
      {label && (
        <text
          x={lx}
          y={ly}
          fontSize="14"
          fontWeight="700"
          fill={color}
          fontFamily="var(--font-body, ui-sans-serif, system-ui, sans-serif)"
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ───────────── ToggleRow (checkbox label) ───────────── */

export function ToggleRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 12,
        color: "var(--text-muted)",
        cursor: "pointer",
      }}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {children}
    </label>
  );
}
