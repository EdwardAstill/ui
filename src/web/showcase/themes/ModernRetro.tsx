import React, { useState } from "react";
import type { FC } from "react";
import type { ThemeDefinition, ColorPalette, LayoutType } from "./types";

/* ─────────────────────────── CSS ─────────────────────────── */

const styles = `
[data-theme="modern-retro"] {
  --bg: #B0B7C4;
  --sidebar-bg: #9AA0AA;
  --border: #808080;
  --text: #000000;
  --text-muted: #444444;
  --accent: #007BFF;
  --accent-2: #DC3545;
  --card-bg: #D4D8E0;
  --input-bg: #F5F5F0;
  --font-body: 'Courier New', Courier, monospace;
  --font-mono: 'Courier New', Courier, monospace;
  --radius: 0px;
}

[data-theme="modern-retro"][data-mode="dark"] {
  --bg: #1e1e1e;
  --sidebar-bg: #1a2a3a;
  --border: #555555;
  --text: #d4d0c8;
  --text-muted: #9a9a9a;
  --accent: #4a9eff;
  --accent-2: #ff6b6b;
  --card-bg: #2a2a2a;
  --input-bg: #1a1a1a;
}

/* ═══════════════════════════════════════════════════════
   SHELL LAYOUT
═══════════════════════════════════════════════════════ */

.mr-shell {
  display: flex;
  height: 100%;
  font-family: Tahoma, 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  background: var(--bg);
}

/* ═══════════════════════════════════════════════════════
   XP EXPLORER TASK PANE (SIDEBAR)
═══════════════════════════════════════════════════════ */

.mr-sidebar {
  width: 220px;
  min-width: 220px;
  height: 100%;
  background: var(--sidebar-bg);
  border-right: 1px solid #7a96df;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-sidebar {
  background: #1a2a3a;
  border-right-color: #2a4a6a;
}

/* Task pane section header */
.mr-pane-section {
  margin: 6px 8px 4px 8px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-pane-section {
  box-shadow: inset -1px -1px #000, inset 1px 1px #555, inset -2px -2px #333, inset 2px 2px #444;
}

.mr-pane-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 8px 3px 10px;
  background: linear-gradient(180deg, #448cff 0%, #2267cb 60%, #1a5aa8 100%);
  cursor: pointer;
  user-select: none;
  min-height: 22px;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-pane-header {
  background: linear-gradient(180deg, #2a5a9f 0%, #1a3a7a 60%, #102a5a 100%);
}

.mr-pane-header-text {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mr-pane-chevron {
  font-size: 9px;
  color: #ffffff;
  flex-shrink: 0;
  margin-left: 4px;
}

.mr-pane-links {
  background: var(--sidebar-bg);
  padding: 4px 0;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-pane-links {
  background: #1a2a3a;
}

.mr-pane-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px 3px 14px;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: #2267cb;
  cursor: pointer;
  text-decoration: underline;
}

.mr-pane-link:hover {
  color: #cc0000;
}

/* ── Toggle button group ─────────────────────────────────── */
.mr-toggle-btn {
  padding: 3px 12px;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(236,235,229,1) 86%, rgba(216,208,196,1) 100%);
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  color: var(--text);
  text-align: center;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-toggle-btn {
  background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 86%, #222222 100%);
  color: #d4d0c8;
  box-shadow: inset -1px -1px #000, inset 1px 1px #666, inset -2px -2px #333, inset 2px 2px #4a4a4a;
}

.mr-toggle-btn:hover {
  box-shadow: inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a;
}

.mr-toggle-btn:active {
  background: linear-gradient(180deg, rgba(205,202,195,1) 0%, rgba(227,227,219,1) 8%, rgba(229,229,222,1) 94%, rgba(242,242,241,1) 100%);
}

/* ═══════════════════════════════════════════════════════
   MAIN CONTENT AREA
═══════════════════════════════════════════════════════ */

.mr-content {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ═══════════════════════════════════════════════════════
   XP WINDOW CHROME
═══════════════════════════════════════════════════════ */

.mr-window {
  background: var(--card-bg);
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  flex-shrink: 0;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-window {
  box-shadow: inset -1px -1px #000, inset 1px 1px #666, inset -2px -2px #333, inset 2px 2px #4a4a4a;
}

.mr-titlebar {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 4px 0 6px;
  background: linear-gradient(180deg, #448cff 0%, #2267cb 60%, #1a5aa8 100%);
  gap: 6px;
  user-select: none;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-titlebar {
  background: linear-gradient(180deg, #2a5a9f 0%, #1a3a7a 60%, #102a5a 100%);
}

.mr-titlebar-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.mr-titlebar-text {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mr-winctrls {
  display: flex;
  gap: 2px;
  align-items: center;
  flex-shrink: 0;
}

.mr-wc {
  width: 21px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(236,235,229,1) 86%, rgba(216,208,196,1) 100%);
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  font-family: Tahoma, Arial, sans-serif;
  line-height: 1;
}

.mr-wc:hover {
  box-shadow: inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a;
}

.mr-wc:active {
  background: linear-gradient(180deg, rgba(205,202,195,1) 0%, rgba(227,227,219,1) 8%, rgba(229,229,222,1) 94%, rgba(242,242,241,1) 100%);
}

.mr-wc-close {
  background: linear-gradient(180deg, #f07070 0%, #cc3333 86%, #aa1111 100%);
  color: #ffffff;
  box-shadow: inset -1px -1px #6a0000, inset 1px 1px #ffaaaa, inset -2px -2px #990000, inset 2px 2px #ff8888;
}

.mr-wc-close:hover {
  background: linear-gradient(180deg, #ff8888 0%, #ee4444 86%, #cc2222 100%);
  box-shadow: inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a;
}

/* Toolbar below titlebar */
.mr-toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px 4px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
}

.mr-toolbar-btn {
  padding: 2px 8px;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(236,235,229,1) 86%, rgba(216,208,196,1) 100%);
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  color: var(--text);
}

[data-theme="modern-retro"][data-mode="dark"] .mr-toolbar-btn {
  background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 86%, #222222 100%);
  color: #d4d0c8;
  box-shadow: inset -1px -1px #000, inset 1px 1px #666, inset -2px -2px #333, inset 2px 2px #4a4a4a;
}

.mr-toolbar-btn:hover {
  box-shadow: inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a;
}

.mr-toolbar-btn:active {
  background: linear-gradient(180deg, rgba(205,202,195,1) 0%, rgba(227,227,219,1) 8%, rgba(229,229,222,1) 94%, rgba(242,242,241,1) 100%);
}

.mr-toolbar-sep {
  width: 1px;
  height: 18px;
  background: var(--border);
  margin: 0 3px;
}

/* Window body */
.mr-window-body {
  padding: 8px;
}

/* ═══════════════════════════════════════════════════════
   XP BUTTONS
═══════════════════════════════════════════════════════ */

.mr-btn {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  padding: 4px 16px;
  cursor: pointer;
  border-radius: 3px;
  min-height: 23px;
  color: var(--text);
}

.mr-btn-standard {
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(236,235,229,1) 86%, rgba(216,208,196,1) 100%);
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  color: var(--text);
}

[data-theme="modern-retro"][data-mode="dark"] .mr-btn-standard {
  background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 86%, #222222 100%);
  color: #d4d0c8;
  box-shadow: inset -1px -1px #000, inset 1px 1px #666, inset -2px -2px #333, inset 2px 2px #4a4a4a;
}

.mr-btn-standard:hover {
  box-shadow: inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a;
}

.mr-btn-standard:active {
  background: linear-gradient(180deg, rgba(205,202,195,1) 0%, rgba(227,227,219,1) 8%, rgba(229,229,222,1) 94%, rgba(242,242,241,1) 100%);
}

.mr-btn-standard:focus {
  box-shadow: inset -1px 1px #cee7ff, inset 1px 2px #98b8ea, inset -2px 2px #bcd4f6, inset 1px -1px #89ade4, inset 2px -2px #89ade4;
  outline: none;
}

.mr-btn-primary {
  background: linear-gradient(180deg, #6eb1e9 0%, #3b7fca 50%, #2267cb 100%);
  color: #ffffff;
  box-shadow: inset -1px -1px #0a3a8a, inset 1px 1px #9ecfff, inset -2px -2px #1a5aaa, inset 2px 2px #78b8f0;
  text-shadow: 0 1px 1px rgba(0,0,50,0.5);
}

[data-theme="modern-retro"][data-mode="dark"] .mr-btn-primary {
  background: linear-gradient(180deg, #3a6aaa 0%, #1a4a8a 50%, #0e3366 100%);
  box-shadow: inset -1px -1px #000, inset 1px 1px #5a9aee, inset -2px -2px #0a2a5a, inset 2px 2px #3a7acc;
}

.mr-btn-primary:hover {
  background: linear-gradient(180deg, #88c4f0 0%, #5595dd 50%, #3475d8 100%);
}

.mr-btn-primary:active {
  background: linear-gradient(180deg, #1a55b8 0%, #2a6acc 50%, #4a88e0 100%);
}

.mr-btn-disabled {
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(236,235,229,1) 86%, rgba(216,208,196,1) 100%);
  color: #808080;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  cursor: not-allowed;
}

.mr-btn-hover-demo {
  background: var(--card-bg);
  box-shadow: inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a;
  color: var(--text);
}

.mr-btn-focus-demo {
  background: var(--card-bg);
  box-shadow: inset -1px 1px #cee7ff, inset 1px 2px #98b8ea, inset -2px 2px #bcd4f6, inset 1px -1px #89ade4, inset 2px -2px #89ade4;
  color: var(--text);
}

.mr-btn-active-demo {
  background: linear-gradient(180deg, rgba(205,202,195,1) 0%, rgba(227,227,219,1) 8%, rgba(229,229,222,1) 94%, rgba(242,242,241,1) 100%);
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  color: var(--text);
}

/* ═══════════════════════════════════════════════════════
   XP GROUPBOX
═══════════════════════════════════════════════════════ */

.mr-groupbox {
  border: 1px solid #808080;
  border-radius: 3px;
  padding: 8px 10px 8px 10px;
  position: relative;
  margin-top: 8px;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: var(--text);
}

/* ═══════════════════════════════════════════════════════
   XP INPUT / TEXTBOX
═══════════════════════════════════════════════════════ */

.mr-input {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  padding: 2px 4px;
  background: #ffffff;
  border: 1px solid #7f9db9;
  box-shadow: inset 1px 1px #7f9db9, inset -1px -1px #c8d8e8;
  color: #000000;
  outline: none;
  height: 21px;
  box-sizing: border-box;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-input {
  background: #1a1a1a;
  border-color: #3a5a7a;
  box-shadow: inset 1px 1px #2a4a6a, inset -1px -1px #3a3a3a;
  color: #d4d0c8;
}

.mr-input:focus {
  border-color: #789dbc;
  box-shadow: inset 1px 1px #7f9db9, inset -1px -1px #c8d8e8;
}

/* ═══════════════════════════════════════════════════════
   XP TABS
═══════════════════════════════════════════════════════ */

.mr-tabs {
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid #808080;
  margin-bottom: 0;
}

.mr-tab {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  padding: 3px 12px 4px 12px;
  cursor: pointer;
  background: #d4cfbf;
  border: 1px solid #808080;
  border-bottom: none;
  margin-bottom: -1px;
  color: var(--text);
}

.mr-tab.active {
  background: var(--card-bg);
  border-bottom: 2px solid var(--card-bg);
  font-weight: bold;
  padding-top: 2px;
}

/* ── Checkboxes ────────────────────────── */
.mr-checkbox {
  width: 13px;
  height: 13px;
  background: #ffffff;
  border: 1px solid #7f9db9;
  box-shadow: inset 1px 1px #7f9db9, inset -1px -1px #c8d8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  flex-shrink: 0;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-checkbox {
  background: #1a1a1a;
  border-color: #3a5a7a;
  box-shadow: inset 1px 1px #2a4a6a, inset -1px -1px #3a3a3a;
  color: #d4d0c8;
}

.mr-check-label {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: var(--text);
}

/* ═══════════════════════════════════════════════════════
   XP TREE VIEW
═══════════════════════════════════════════════════════ */

.mr-tree {
  background: #ffffff;
  border: 1px solid #7f9db9;
  box-shadow: inset 1px 1px #7f9db9;
  overflow-y: auto;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-tree {
  background: #1a1a1a;
  border-color: #3a5a7a;
  box-shadow: inset 1px 1px #2a4a6a;
}

.mr-tree-item {
  padding: 1px 8px;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: var(--text);
  cursor: pointer;
  white-space: nowrap;
}

.mr-tree-item:hover {
  background: #316ac5;
  color: #ffffff;
}

.mr-tree-item.selected {
  background: #316ac5;
  color: #ffffff;
}

.mr-tree-item-icon {
  margin-right: 4px;
  font-size: 12px;
}

.mr-tree-item-indent {
  margin-left: 16px;
}

/* ═══════════════════════════════════════════════════════
   XP TABLE / LIST VIEW
═══════════════════════════════════════════════════════ */

.mr-listview {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border: 1px solid #7f9db9;
  box-shadow: inset 1px 1px #7f9db9;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-listview {
  background: #1a1a1a;
  border-color: #3a5a7a;
  box-shadow: inset 1px 1px #2a4a6a;
}

.mr-listview th {
  background: linear-gradient(180deg, #f0ede4 0%, #e0ddd4 100%);
  border-right: 1px solid #808080;
  border-bottom: 2px solid #808080;
  padding: 2px 8px;
  font-weight: bold;
  text-align: left;
  color: var(--text);
  cursor: pointer;
}

.mr-listview th:last-child {
  border-right: none;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-listview th {
  background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%);
  border-color: #555;
  color: #d4d0c8;
}

.mr-listview td {
  padding: 1px 8px;
  border-bottom: 1px solid #ece9d8;
  color: var(--text);
}

[data-theme="modern-retro"][data-mode="dark"] .mr-listview td {
  border-bottom-color: #333;
}

.mr-listview tr:hover td {
  background: #e8f0f8;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-listview tr:hover td {
  background: #1e2e3e;
}

.mr-listview tr.selected td {
  background: #316ac5;
  color: #ffffff;
}

/* ═══════════════════════════════════════════════════════
   XP STATUSBAR
═══════════════════════════════════════════════════════ */

.mr-statusbar {
  display: flex;
  align-items: stretch;
  height: 20px;
  background: var(--border);
  border-top: 1px solid var(--border);
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: var(--text);
  gap: 1px;
}

.mr-statusbar-panel {
  padding: 0 8px;
  background: var(--card-bg);
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.mr-statusbar-panel:last-child {
  flex: 1;
}

/* XP progress bar in status */
.mr-progress-bar {
  height: 14px;
  background: #ffffff;
  border: 1px solid #7f9db9;
  box-shadow: inset 1px 1px #7f9db9;
}

.mr-progress-fill {
  height: 100%;
  background: linear-gradient(180deg, #3a8cee 0%, #2267cb 50%, #1a55aa 100%);
  background-size: 20px 100%;
}

/* ═══════════════════════════════════════════════════════
   XP ADDRESS BAR
═══════════════════════════════════════════════════════ */

.mr-addressbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
}

.mr-addressbar-label {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: var(--text);
  white-space: nowrap;
}

.mr-addressbar-input {
  flex: 1;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  padding: 2px 4px;
  background: #ffffff;
  border: 1px solid #7f9db9;
  box-shadow: inset 1px 1px #7f9db9, inset -1px -1px #c8d8e8;
  color: #000000;
  outline: none;
  height: 21px;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-addressbar-input {
  background: #1a1a1a;
  border-color: #3a5a7a;
  color: #d4d0c8;
  box-shadow: inset 1px 1px #2a4a6a, inset -1px -1px #3a3a3a;
}

/* ═══════════════════════════════════════════════════════
   XP WARNING BANNER
═══════════════════════════════════════════════════════ */

.mr-warning-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #fffacd;
  border: 1px solid #e0c060;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: #333;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-warning-bar {
  background: #3a3300;
  border-color: #8a7000;
  color: #d4d0c8;
}

.mr-warning-icon {
  font-size: 16px;
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════════════════
   LAYOUT HELPERS
═══════════════════════════════════════════════════════ */

.mr-row {
  display: flex;
  gap: 14px;
}

.mr-row > * {
  flex: 1;
  min-width: 0;
}

.mr-split {
  display: flex;
  height: 100%;
}

.mr-split-left {
  width: 180px;
  min-width: 180px;
  border-right: 1px solid #808080;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-split-left {
  border-right-color: #555;
}

.mr-split-right {
  flex: 1;
}

.mr-flex-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.mr-kv-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-kv-table {
  background: #1a1a1a;
}

.mr-kv-table tr:nth-child(odd) td {
  background: #f0ede0;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-kv-table tr:nth-child(odd) td {
  background: #222222;
}

.mr-kv-table td {
  padding: 2px 6px;
  border-bottom: 1px solid #ddd;
  color: var(--text);
}

[data-theme="modern-retro"][data-mode="dark"] .mr-kv-table td {
  border-bottom-color: #333;
}

.mr-kv-table td:first-child {
  font-weight: bold;
  width: 44%;
  color: var(--text);
}

/* Favorites / bookmarks bar */
.mr-favbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 1px 4px;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}

.mr-fav-btn {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 1px 6px;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: var(--text);
  cursor: pointer;
  background: none;
  border: none;
}

.mr-fav-btn:hover {
  text-decoration: underline;
  color: #2267cb;
}

/* Update items */
.mr-update-item {
  padding: 6px 8px;
  border-bottom: 1px solid var(--border);
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
}

[data-theme="modern-retro"][data-mode="dark"] .mr-update-item {
  border-bottom-color: #333;
}

.mr-update-item:last-child {
  border-bottom: none;
}

.mr-update-title {
  font-weight: bold;
  color: var(--text);
}

.mr-update-desc {
  color: var(--text-muted);
  margin-top: 2px;
}

/* Properties dialog label */
.mr-prop-label {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 2px;
  display: block;
}

.mr-prop-value {
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: var(--text);
  font-weight: bold;
}

.mr-field {
  margin-bottom: 8px;
}

/* Separator line */
.mr-sep {
  height: 1px;
  background: var(--border);
  margin: 6px 0;
}
`;

/* ─────────────────────────── Showcase ─────────────────────────── */

const ModernRetroShowcase: FC<{ layout?: LayoutType; colors?: ColorPalette }> = ({ colors }) => {
  const currentColors = colors || defaultColors;
  const [activeTab, setActiveTab] = useState("tab_02");

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

  const blue = currentColors.accent || "#007BFF";
  const red = currentColors.accent2 || "#DC3545";

  const WinControls = () => (
    <div className="mr-winctrls">
      <div className="mr-wc">_</div>
      <div className="mr-wc">□</div>
      <div className="mr-wc mr-wc-close">✕</div>
    </div>
  );

  const PanelHead = ({ label }: { label: string }) => (
    <div className="mr-titlebar">
      <span className="mr-titlebar-text" style={{ fontFamily: "'Courier New', monospace", letterSpacing: "1px" }}>{label}</span>
      <WinControls />
    </div>
  );

  const swatch = (bg: string) => ({
    width: "36px", height: "36px", background: bg,
    border: "1px solid #808080", flexShrink: 0 as const,
    boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff",
  });

  const mono: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };

  return (
    <div style={{
      ...customStyle,
      background: currentColors.bg,
      backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
      minHeight: "100%",
      padding: "24px",
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: "12px",
    }}>

      {/* ── PAGE TITLE ── */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{
          ...mono,
          fontSize: "40px",
          fontWeight: 900,
          letterSpacing: "4px",
          color: blue,
          textShadow: `2px 2px 0 ${blue}55`,
          lineHeight: 1,
          textTransform: "uppercase",
        }}>
          RETRO_OS UI KIT
        </div>
        <div style={{ ...mono, fontSize: "13px", color: currentColors.textMuted, letterSpacing: "2px", marginTop: "6px" }}>
          DESIGN SYSTEM. VER 1.0.
        </div>
      </div>

      {/* ── TWO COLUMNS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "16px", alignItems: "start" }}>

        {/* ══ LEFT COLUMN ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* COLOR TOKENS */}
          <div className="mr-window">
            <PanelHead label="COLOR TOKENS" />
            <div className="mr-window-body" style={{ padding: "6px 8px" }}>
              {[
                { name: "SYSTEM_GRAY", hex: "#B0B7C4", bg: "#B0B7C4" },
                { name: "PAPER_WHITE", hex: "#F5F5F0", bg: "#F5F5F0" },
                { name: "ACCENT_BLUE", hex: "#007BFF", bg: blue },
                { name: "ALERT_RED",   hex: "#DC3545", bg: red },
              ].map(({ name, hex, bg }) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={swatch(bg)} />
                  <div>
                    <div style={{ ...mono, fontSize: "11px", fontWeight: "bold", color: "var(--text)" }}>{name}</div>
                    <div style={{ ...mono, fontSize: "11px", color: "var(--text-muted)" }}>{hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BORDERS & RADIUS */}
          <div className="mr-window">
            <PanelHead label="BORDERS &amp; RADIUS" />
            <div className="mr-window-body">
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
                {[
                  { label: "1px SOLID", radius: "0px", border: "1px solid #808080" },
                  { label: "1px RADIU", radius: "1px", border: "1px solid #808080" },
                  { label: "4px RADIU", radius: "4px", border: "1px solid #808080" },
                ].map(({ label, radius, border }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ width: "60px", height: "44px", background: "var(--input-bg)", border, borderRadius: radius, marginBottom: "6px" }} />
                    <div style={{ ...mono, fontSize: "10px", color: "var(--text-muted)" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TYPE SCALE */}
          <div className="mr-window">
            <PanelHead label="TYPE SCALE" />
            <div className="mr-window-body">
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  {[
                    { tag: "H1", size: "28px", w: 900 },
                    { tag: "H2", size: "22px", w: 700 },
                    { tag: "H3", size: "16px", w: 600 },
                    { tag: "H4", size: "13px", w: 500 },
                  ].map(({ tag, size, w }) => (
                    <div key={tag} style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "5px" }}>
                      <span style={{ ...mono, fontSize: size, fontWeight: w, color: "var(--text)", lineHeight: 1 }}>{tag}</span>
                      <span style={{ ...mono, fontSize: "10px", color: "var(--text-muted)" }}>{size}</span>
                    </div>
                  ))}
                </div>
                <div style={{ ...mono, fontSize: "10px", color: "var(--text-muted)", paddingTop: "4px" }}>
                  {[["12px","14px"],["14px","14px"],["15px","14px"],["18px","12px"]].map(([s,l], i) => (
                    <div key={i} style={{ marginBottom: "5px" }}>{s} &nbsp; {l}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ICON GRID */}
          <div className="mr-window">
            <PanelHead label="ICON GRID" />
            <div className="mr-window-body">
              {[
                { label: "16PX GRID", size: "16px", icons: ["🏠","👤","⚙️","📢","📁","🗑️","📄","📣"] },
                { label: "24PX GRID", size: "22px", icons: ["🏠","👤","⚙️","📁","📄","🗑️"] },
              ].map(({ label, size, icons }) => (
                <div key={label} style={{ marginBottom: "10px" }}>
                  <div style={{ ...mono, fontSize: "10px", fontWeight: "bold", color: "var(--text-muted)", marginBottom: "6px" }}>{label}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {icons.map((icon, i) => (
                      <div key={i} style={{
                        width: "34px", height: "34px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: size,
                        background: "var(--input-bg)",
                        border: "1px solid var(--border)",
                        boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
                      }}>
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* COMPONENT GALLERY */}
          <div className="mr-window">
            <PanelHead label="COMPONENT GALLERY" />
            <div className="mr-window-body" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* WINDOW HEADER demo */}
              <div>
                <div style={{ ...mono, fontSize: "10px", color: "var(--text-muted)", marginBottom: "5px", fontWeight: "bold" }}>WINDOW HEADER</div>
                <div style={{
                  background: blue, display: "flex", alignItems: "center",
                  padding: "0 6px", height: "24px", gap: "6px",
                }}>
                  <span style={{ ...mono, fontSize: "11px", color: "#fff", flex: 1 }}>My Computer</span>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {["_","□","✕"].map((c, i) => (
                      <div key={i} style={{
                        width: "18px", height: "18px",
                        background: i === 2 ? "#cc1111" : "#d4d8e0",
                        border: "1px solid #808080",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", fontFamily: "monospace", cursor: "pointer",
                        color: i === 2 ? "#fff" : "#000",
                        boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff",
                      }}>{c}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div>
                <div style={{ ...mono, fontSize: "10px", color: "var(--text-muted)", marginBottom: "5px", fontWeight: "bold" }}>BUTTONS</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="mr-btn mr-btn-primary" style={mono}>PRIMARY_BTN</button>
                  <button className="mr-btn mr-btn-standard" style={mono}>SECONDARY_BTN</button>
                </div>
              </div>

              {/* INPUT FIELD */}
              <div>
                <div style={{ ...mono, fontSize: "10px", color: "var(--text-muted)", marginBottom: "5px", fontWeight: "bold" }}>INPUT FIELD</div>
                <input
                  className="mr-input"
                  style={{ width: "100%", ...mono }}
                  placeholder="Type command..."
                  readOnly
                />
              </div>

              {/* TABS */}
              <div>
                <div style={{ ...mono, fontSize: "10px", color: "var(--text-muted)", marginBottom: "5px", fontWeight: "bold" }}>TABS</div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {["TAB_01","TAB_02","TAB_03"].map((tab) => {
                    const key = tab.toLowerCase();
                    const active = activeTab === key;
                    return (
                      <button key={tab} onClick={() => setActiveTab(key)} style={{
                        padding: "4px 12px",
                        ...mono,
                        fontSize: "11px",
                        background: active ? blue : "var(--card-bg)",
                        color: active ? "#fff" : "var(--text)",
                        border: "1px solid #808080",
                        cursor: "pointer",
                        boxShadow: active
                          ? "none"
                          : "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
                      }}>{tab}</button>
                    );
                  })}
                </div>
              </div>

              {/* CHECKBOX */}
              <div>
                <div style={{ ...mono, fontSize: "10px", color: "var(--text-muted)", marginBottom: "5px", fontWeight: "bold" }}>CHECKBOX</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div className="mr-checkbox" style={{ color: blue, fontWeight: "bold" }}>✓</div>
                  <span style={{ ...mono, fontSize: "11px" }}>ENABLE_GRID</span>
                </div>
              </div>

              {/* MODAL + TOAST */}
              <div>
                <div style={{ ...mono, fontSize: "10px", color: "var(--text-muted)", marginBottom: "5px", fontWeight: "bold" }}>MODAL</div>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  {/* Modal */}
                  <div style={{
                    flex: 1,
                    border: "1px solid #808080",
                    background: "var(--card-bg)",
                    boxShadow: "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
                  }}>
                    <div style={{ background: blue, padding: "2px 6px", display: "flex", alignItems: "center" }}>
                      <span style={{ ...mono, fontSize: "11px", color: "#fff", flex: 1 }}>MODAL</span>
                      <span style={{ ...mono, fontSize: "11px", color: "#fff", cursor: "pointer" }}>✕</span>
                    </div>
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      <div style={{ ...mono, fontSize: "11px", marginBottom: "8px" }}>SYSTEM ALERT</div>
                      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                        <button className="mr-btn mr-btn-standard" style={{ ...mono, fontSize: "11px", padding: "3px 10px" }}>CANCEL</button>
                        <button className="mr-btn mr-btn-primary" style={{ ...mono, fontSize: "11px", padding: "3px 10px" }}>CONFIRM</button>
                      </div>
                    </div>
                  </div>
                  {/* Toast */}
                  <div style={{
                    flex: 1,
                    border: "1px solid #808080",
                    background: "var(--input-bg)",
                    boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  }}>
                    <div style={{ background: red, padding: "2px 6px" }}>
                      <span style={{ ...mono, fontSize: "11px", color: "#fff", fontWeight: "bold" }}>TOAST</span>
                    </div>
                    <div style={{ padding: "8px", ...mono, fontSize: "11px", lineHeight: 1.5 }}>
                      ERROR:<br />Connection Lost
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RULES CARD */}
          <div className="mr-window">
            <div className="mr-titlebar" style={{ background: `linear-gradient(180deg, ${red}cc 0%, ${red} 100%)` }}>
              <span className="mr-titlebar-icon">⚠</span>
              <span className="mr-titlebar-text" style={{ ...mono, letterSpacing: "1px" }}>RULES CARD</span>
              <WinControls />
            </div>
            <div className="mr-window-body">
              <ul style={{ ...mono, fontSize: "12px", paddingLeft: "20px", lineHeight: 1.9, color: "var(--text)", margin: 0 }}>
                <li>Use 1 accent color</li>
                <li>Avoid heavy shadows</li>
                <li>Keep borders 1px</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Export ─────────────────────────── */

const defaultColors: ColorPalette = {
  bg:        "#ece9d8",
  sidebarBg: "#dde9f7",
  border:    "#808080",
  text:      "#000000",
  textMuted: "#444444",
  accent:    "#2267cb",
  accent2:   "#cc0000",
  cardBg:    "#ece9d8",
  inputBg:   "#ffffff",
};

export const ModernRetroTheme: ThemeDefinition = {
  id: "modernretro",
  name: "Modern Retro",
  emoji: "👾",
  description: "Windows XP meets retro gaming: chunky inset shadows, XP-style chrome, a full leaderboard & achievement tracker, and pixel-number stats — nostalgia rendered in Tahoma at 11px.",
  colors: defaultColors,
  palettes: {
    "Default": defaultColors,
    "Dark": {
      bg:        "#1e1e1e",
      sidebarBg: "#1a2a3a",
      border:    "#555555",
      text:      "#d4d0c8",
      textMuted: "#9a9a9a",
      accent:    "#4a9eff",
      accent2:   "#ff6b6b",
      cardBg:    "#2a2a2a",
      inputBg:   "#1a1a1a",
    }
  },
  defaultLayout: "dashboard",
  styles,
  Showcase: ModernRetroShowcase,
};
