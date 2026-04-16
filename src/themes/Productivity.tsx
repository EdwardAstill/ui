import React from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";
import { FeatureCard } from "../components/Layouts";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  [data-theme="productivity"] {
    --bg: #FFFFFF;
    --sidebar-bg: #F7F8FA;
    --border: #E8EAED;
    --text: #1A1A2E;
    --text-muted: #6B7280;
    --accent: #4F46E5;
    --accent-2: #10B981;
    --accent-light: rgba(79, 70, 229, 0.08);
    --card-bg: #FFFFFF;
    --input-bg: #F9FAFB;
    --font-body: "Inter", -apple-system, sans-serif;
    --font-mono: "JetBrains Mono", monospace;
    --radius: 10px;
  }

  /* ── Layout wrapper ── */
  [data-theme="productivity"] .pd-layout {
    display: flex;
    width: 100%;
    height: 100%;
    font-family: var(--font-body);
    background: var(--bg);
  }

  /* ── Sidebar override ── */
  [data-theme="productivity"] .sidebar {
    width: 248px;
    min-width: 248px;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
  }

  /* ── Workspace switcher ── */
  [data-theme="productivity"] .pd-workspace-switcher {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 14px 12px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.15s;
    user-select: none;
    background: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    width: 100%;
    font-family: var(--font-body);
    text-align: left;
  }

  [data-theme="productivity"] .pd-workspace-switcher:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  [data-theme="productivity"] .pd-workspace-switcher:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }

  [data-theme="productivity"] .pd-workspace-avatar {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
    letter-spacing: -0.03em;
  }

  [data-theme="productivity"] .pd-workspace-info {
    flex: 1;
    min-width: 0;
  }

  [data-theme="productivity"] .pd-workspace-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [data-theme="productivity"] .pd-workspace-plan {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 1px;
  }

  [data-theme="productivity"] .pd-workspace-chevron {
    font-size: 12px;
    color: var(--text-muted);
    flex-shrink: 0;
    line-height: 1;
  }

  /* ── Sidebar nav ── */
  [data-theme="productivity"] .pd-nav {
    padding: 10px 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  [data-theme="productivity"] .pd-nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 7px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    transition: background 0.15s, color 0.15s;
  }

  [data-theme="productivity"] .pd-nav-item:hover {
    background: rgba(79, 70, 229, 0.07);
    color: var(--accent);
  }

  [data-theme="productivity"] .pd-nav-item:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
  }

  [data-theme="productivity"] .pd-nav-item.active {
    background: rgba(79, 70, 229, 0.10);
    color: var(--accent);
    font-weight: 600;
  }

  [data-theme="productivity"] .pd-nav-icon {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(0,0,0,0.04);
  }

  [data-theme="productivity"] .pd-doc-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  [data-theme="productivity"] .pd-doc-info {
    flex: 1;
    min-width: 0;
  }

  [data-theme="productivity"] .pd-doc-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [data-theme="productivity"] .pd-doc-sub {
    font-size: 11px;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 1px;
  }

  [data-theme="productivity"] .pd-doc-chevron {
    font-size: 14px;
    color: var(--text-muted);
    flex-shrink: 0;
    line-height: 1;
  }

  /* ── Sidebar user profile footer ── */
  [data-theme="productivity"] .pd-sidebar-footer {
    margin-top: auto;
    padding: 10px 12px 14px;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  [data-theme="productivity"] .pd-user-avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }

  [data-theme="productivity"] .pd-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
  }

  [data-theme="productivity"] .pd-online-dot {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #10B981;
    border: 2px solid var(--sidebar-bg);
  }

  [data-theme="productivity"] .pd-btn-new-task {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: pointer;
    background: var(--accent);
    color: #fff;
    border: none;
    transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
    box-shadow: 0 2px 8px rgba(79, 70, 229, 0.30);
  }

  [data-theme="productivity"] .pd-btn-new-task:hover {
    background: #4338CA;
    box-shadow: 0 4px 14px rgba(79, 70, 229, 0.38);
  }

  [data-theme="productivity"] .pd-btn-new-task:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  [data-theme="productivity"] .pd-btn-new-task:active {
    transform: scale(0.98);
    background: #3730A3;
  }

  [data-theme="productivity"] .pd-btn-new-task-plus {
    font-size: 16px;
    line-height: 1;
    font-weight: 400;
    margin-top: -1px;
  }

  /* ── Tab bar ── */
  [data-theme="productivity"] .pd-tabs {
    display: flex;
    gap: 2px;
    margin-bottom: 20px;
    background: var(--input-bg);
    border-radius: 10px;
    padding: 4px;
    width: fit-content;
  }

  [data-theme="productivity"] .pd-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    background: transparent;
    border: none;
    font-family: var(--font-body);
    transition: color 0.15s, box-shadow 0.15s;
    white-space: nowrap;
  }

  [data-theme="productivity"] .pd-tab:hover {
    color: var(--text);
    background: rgba(0,0,0,0.04);
  }

  [data-theme="productivity"] .pd-tab:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
  }

  [data-theme="productivity"] .pd-tab.active {
    background: #ffffff;
    color: var(--text);
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06);
  }

  [data-theme="productivity"] .pd-tab-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    background: rgba(79, 70, 229, 0.12);
    color: var(--accent);
    line-height: 1;
  }

  [data-theme="productivity"] .pd-tab.active .pd-tab-badge {
    background: var(--accent);
    color: #fff;
  }

  /* ── Task list ── */
  [data-theme="productivity"] .pd-task-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  [data-theme="productivity"] .pd-meta-emoji {
    flex-shrink: 0;
    font-size: 12px;
    line-height: 1;
  }

  [data-theme="productivity"] .pd-assignee-avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  [data-theme="productivity"] .pd-priority-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 20px;
    border: 1px solid;
    background: rgba(239, 68, 68, 0.08);
    color: #DC2626;
    border-color: rgba(239, 68, 68, 0.18);
  }

  [data-theme="productivity"] .pd-priority-tag.medium {
    background: rgba(245, 158, 11, 0.08);
    color: #D97706;
    border-color: rgba(245, 158, 11, 0.18);
  }

  [data-theme="productivity"] .pd-priority-tag.low {
    background: rgba(16, 185, 129, 0.08);
    color: #059669;
    border-color: rgba(16, 185, 129, 0.18);
  }

  /* ── Task actions column ── */
  [data-theme="productivity"] .pd-task-actions {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
    padding-top: 2px;
  }

  [data-theme="productivity"] .pd-btn-completed {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-body);
    cursor: default;
    border: 1px solid rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.08);
    color: #059669;
    white-space: nowrap;
  }

  [data-theme="productivity"] .pd-btn-mark {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    font-family: var(--font-body);
    cursor: pointer;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }

  [data-theme="productivity"] .pd-btn-mark:hover {
    border-color: var(--accent-2);
    color: var(--accent-2);
    background: rgba(16, 185, 129, 0.05);
  }

  [data-theme="productivity"] .pd-btn-mark:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  [data-theme="productivity"] .pd-btn-mark:active {
    background: rgba(16, 185, 129, 0.1);
    transform: scale(0.98);
  }

  /* ── Empty state ── */
  [data-theme="productivity"] .pd-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 56px 32px;
    gap: 16px;
  }

  [data-theme="productivity"] .pd-content::-webkit-scrollbar,
  [data-theme="productivity"] .pd-right-panel::-webkit-scrollbar {
    width: 5px;
  }

  [data-theme="productivity"] .pd-content::-webkit-scrollbar-track,
  [data-theme="productivity"] .pd-right-panel::-webkit-scrollbar-track {
    background: transparent;
  }

  [data-theme="productivity"] .pd-content::-webkit-scrollbar-thumb,
  [data-theme="productivity"] .pd-right-panel::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }

  /* ── DARK MODE ── */
  [data-theme="productivity"][data-mode="dark"] {
    --bg: #0f1117;
    --sidebar-bg: #161b22;
    --border: #30363d;
    --text: #e6edf3;
    --text-muted: #8b949e;
    --accent: #7c6df0;
    --accent-2: #3fb950;
    --accent-light: rgba(124, 109, 240, 0.1);
    --card-bg: #161b22;
    --input-bg: #0d1117;
  }
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const ProductivityShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ layout, colors }) => {
  const c = colors || defaultColors;

  const card: React.CSSProperties = {
    background: c.cardBg,
    border: `1px solid ${c.border}`,
    borderRadius: "10px",
    padding: "16px 20px",
  };

  const kpiNum: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "700",
    color: c.accent,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  };

  const tag = (type: "p0" | "p1" | "p2"): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 8px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    background: type === "p0" ? "rgba(239,68,68,0.1)" : type === "p1" ? "rgba(245,158,11,0.1)" : "rgba(107,114,128,0.1)",
    color: type === "p0" ? "#DC2626" : type === "p1" ? "#D97706" : "#6B7280",
    border: `1px solid ${type === "p0" ? "rgba(239,68,68,0.2)" : type === "p1" ? "rgba(245,158,11,0.2)" : "rgba(107,114,128,0.2)"}`,
  });

  const statusChip = (s: "todo" | "inprog" | "done"): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 9px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    background: s === "todo" ? "rgba(107,114,128,0.1)" : s === "inprog" ? "rgba(79,70,229,0.1)" : "rgba(16,185,129,0.1)",
    color: s === "todo" ? "#6B7280" : s === "inprog" ? "#4F46E5" : "#059669",
  });

  const avatar = (initials: string, bg: string): React.CSSProperties => ({
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: bg,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "700",
    color: "#fff",
    flexShrink: 0,
  });

  return (
    <div style={{
      background: c.bg,
      color: c.text,
      fontFamily: '"Inter", -apple-system, sans-serif',
      minHeight: "100%",
      padding: "28px 32px",
      fontSize: "13px",
    }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "700", color: c.text, letterSpacing: "-0.02em", margin: 0 }}>
              Sprint 14 — Platform Redesign
            </h1>
            <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", background: "rgba(16,185,129,0.1)", color: "#059669", border: "1px solid rgba(16,185,129,0.2)" }}>
              Active
            </span>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: c.textMuted }}>Due Apr 28 · 5 members · 3 of 4 milestones complete</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {[["AK","#4F46E5"],["JS","#7C3AED"],["TR","#10B981"],["ML","#F59E0B"],["PD","#EF4444"]].map(([init, bg]) => (
            <div key={init} style={{ ...avatar(init, bg as string), border: `2px solid ${c.bg}`, marginLeft: "-8px" }}>{init}</div>
          ))}
          <button style={{ marginLeft: "8px", padding: "7px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", background: c.accent, color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(79,70,229,0.3)" }}>
            + Add Task
          </button>
        </div>
      </div>

      {/* ── Sprint progress ── */}
      <div style={{ ...card, marginBottom: "20px", padding: "14px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "12px", fontWeight: "600", color: c.textMuted, letterSpacing: "0.02em" }}>SPRINT PROGRESS</span>
          <span style={{ fontSize: "12px", fontWeight: "700", color: c.accent }}>68%</span>
        </div>
        <div style={{ height: "6px", background: c.inputBg, borderRadius: "3px", overflow: "hidden" }}>
          <div style={{ width: "68%", height: "100%", background: `linear-gradient(90deg, ${c.accent}, #7C3AED)`, borderRadius: "3px" }} />
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
          {[["17","Completed","#10B981"],["8","In Progress","#4F46E5"],["5","Blocked","#EF4444"],["2","Review","#F59E0B"]].map(([n, label, col]) => (
            <span key={label} style={{ fontSize: "12px", color: c.textMuted }}>
              <span style={{ fontWeight: "700", color: col as string }}>{n}</span> {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── KPI row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          ["Tasks Completed", "47", "+12 this week", "#10B981"],
          ["Open Issues", "8", "↓ 3 from last sprint", "#4F46E5"],
          ["Velocity", "62 pts", "Sprint avg 58 pts", "#7C3AED"],
          ["Team Health", "94%", "All members active", "#10B981"],
        ].map(([label, val, sub, col]) => (
          <div key={label as string} style={card}>
            <div style={{ fontSize: "11px", fontWeight: "600", color: c.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "8px" }}>{label}</div>
            <div style={{ ...kpiNum, color: col as string }}>{val}</div>
            <div style={{ fontSize: "11px", color: c.textMuted, marginTop: "4px" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Kanban board ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
        {[
          {
            col: "Todo", count: 5, color: "#6B7280",
            tasks: [
              { title: "Migrate auth service to OAuth 2.0", priority: "p0", assignee: ["AK","#4F46E5"], due: "Apr 22" },
              { title: "Design onboarding flow v3", priority: "p1", assignee: ["JS","#7C3AED"], due: "Apr 24" },
              { title: "Update API rate limit docs", priority: "p2", assignee: ["TR","#10B981"], due: "Apr 26" },
            ]
          },
          {
            col: "In Progress", count: 4, color: "#4F46E5",
            tasks: [
              { title: "Rebuild dashboard with new design system", priority: "p0", assignee: ["ML","#F59E0B"], due: "Apr 20" },
              { title: "Performance audit — reduce bundle 40%", priority: "p1", assignee: ["PD","#EF4444"], due: "Apr 21" },
              { title: "Integrate Stripe billing webhooks", priority: "p1", assignee: ["AK","#4F46E5"], due: "Apr 23" },
            ]
          },
          {
            col: "Done", count: 8, color: "#10B981",
            tasks: [
              { title: "Ship dark mode toggle", priority: "p2", assignee: ["JS","#7C3AED"], due: "Apr 18" },
              { title: "Fix regression in search indexing", priority: "p0", assignee: ["TR","#10B981"], due: "Apr 17" },
              { title: "Set up CI/CD pipeline for staging", priority: "p1", assignee: ["ML","#F59E0B"], due: "Apr 16" },
            ]
          },
        ].map(({ col, count, color, tasks }) => (
          <div key={col} style={{ background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${c.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color }} />
                <span style={{ fontWeight: "600", fontSize: "13px", color: c.text }}>{col}</span>
              </div>
              <span style={{ fontSize: "11px", fontWeight: "700", color: color, background: `${color}15`, padding: "2px 8px", borderRadius: "20px" }}>{count}</span>
            </div>
            <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {tasks.map((t) => (
                <div key={t.title} style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: "8px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "500", color: c.text, marginBottom: "8px", lineHeight: "1.4" }}>{t.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={tag(t.priority as "p0" | "p1" | "p2")}>{t.priority.toUpperCase()}</span>
                    <span style={{ flex: 1 }} />
                    <span style={{ fontSize: "11px", color: c.textMuted }}>{t.due}</span>
                    <div style={{ ...avatar(t.assignee[0], t.assignee[1]) }}>{t.assignee[0]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom row: activity feed + quick add ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "16px" }}>
        {/* Activity feed */}
        <div style={card}>
          <div style={{ fontWeight: "600", fontSize: "13px", marginBottom: "14px", color: c.text }}>Activity Feed</div>
          {[
            { who: "AK", bg: "#4F46E5", action: "completed", what: "Fix regression in search indexing", time: "2m ago" },
            { who: "ML", bg: "#F59E0B", action: "moved", what: "Rebuild dashboard → In Progress", time: "14m ago" },
            { who: "JS", bg: "#7C3AED", action: "commented on", what: "Design onboarding flow v3", time: "1h ago" },
            { who: "TR", bg: "#10B981", action: "opened", what: "Update API rate limit docs", time: "2h ago" },
            { who: "PD", bg: "#EF4444", action: "assigned", what: "Performance audit to themselves", time: "3h ago" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ ...avatar(item.who, item.bg), width: "24px", height: "24px", fontSize: "10px", flexShrink: 0, marginTop: "1px" }}>{item.who}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: "600", color: c.text }}>{item.who} </span>
                <span style={{ color: c.textMuted }}>{item.action} </span>
                <span style={{ fontWeight: "500", color: c.text }}>{item.what}</span>
              </div>
              <span style={{ fontSize: "11px", color: c.textMuted, flexShrink: 0 }}>{item.time}</span>
            </div>
          ))}
        </div>

        {/* Quick add */}
        <div style={card}>
          <div style={{ fontWeight: "600", fontSize: "13px", marginBottom: "14px", color: c.text }}>Quick Add Task</div>
          <input
            readOnly
            value="Implement token refresh endpoint"
            style={{ width: "100%", padding: "9px 12px", background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: "8px", fontSize: "13px", color: c.text, boxSizing: "border-box", marginBottom: "10px", outline: "none" }}
          />
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            <select style={{ flex: 1, padding: "7px 10px", background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: "8px", fontSize: "12px", color: c.text, outline: "none" }}>
              <option>Assignee: AK</option>
            </select>
            <select style={{ flex: 1, padding: "7px 10px", background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: "8px", fontSize: "12px", color: c.text, outline: "none" }}>
              <option>Priority: P1</option>
            </select>
          </div>
          <button style={{ width: "100%", padding: "9px", background: c.accent, color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: "0 2px 8px rgba(79,70,229,0.3)" }}>
            Add to Sprint 14
          </button>

          <div style={{ marginTop: "20px", borderTop: `1px solid ${c.border}`, paddingTop: "14px" }}>
            <div style={{ fontWeight: "600", fontSize: "12px", color: c.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "10px" }}>Upcoming Deadlines</div>
            {[
              ["Rebuild dashboard", "Apr 20", "#EF4444"],
              ["Performance audit", "Apr 21", "#F59E0B"],
              ["OAuth migration", "Apr 22", "#F59E0B"],
            ].map(([task, date, col]) => (
              <div key={task as string} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${c.border}` }}>
                <span style={{ fontSize: "12px", color: c.text }}>{task}</span>
                <span style={{ fontSize: "11px", fontWeight: "600", color: col as string }}>{date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#ffffff",
  sidebarBg: "#F7F8FA",
  border:    "#E8EAED",
  text:      "#1A1A2E",
  textMuted: "#6B7280",
  accent:    "#4F46E5",
  accent2:   "#10B981",
  cardBg:    "#ffffff",
  inputBg:   "#F9FAFB",
};

export const ProductivityTheme: ThemeDefinition = {
  id: "productivity",
  name: "Productivity",
  emoji: "📋",
  description: "Clean SaaS productivity dashboard — Linear/Notion aesthetic with kanban boards, sprint tracking, KPI metrics, and team collaboration.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg: "#0f1117",
      sidebarBg: "#161b22",
      border: "#30363d",
      text: "#e6edf3",
      textMuted: "#8b949e",
      accent: "#7c6df0",
      accent2: "#3fb950",
      cardBg: "#161b22",
      inputBg: "#0d1117",
    }
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: ProductivityShowcase,
};
