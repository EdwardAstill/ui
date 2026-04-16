import type { FC } from "react";

export type LayoutType = "dashboard" | "media" | "document" | "compact" | "landing";

export interface ColorPalette {
  bg: string;
  sidebarBg: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accent2?: string;
  cardBg: string;
  inputBg: string;
  [key: string]: string | undefined;
}

export interface ThemeDefinition {
  /** kebab-case identifier used as data-theme value */
  id: string;
  /** Display name in sidebar */
  name: string;
  /** Emoji shown in sidebar next to name */
  emoji: string;
  /** Short description shown in sidebar */
  description?: string;
  /**
   * CSS string injected into a global <style> tag.
   * All rules MUST be scoped to [data-theme="<id>"] so themes don't bleed.
   * Define CSS custom properties + any structural overrides here.
   *
   * Required CSS variables:
   *   --bg           main background
   *   --sidebar-bg   sidebar background
   *   --border       border color
   *   --text         primary text
   *   --text-muted   secondary/muted text
   *   --accent       primary accent / link color
   *   --accent-2     secondary accent (optional)
   *   --card-bg      card/panel background
   *   --input-bg     form input background
   *   --font-body    body font stack
   *   --font-mono    monospace font stack
   *   --radius       base border radius (e.g. 6px, 0px, 16px)
   */
  styles: string;
  /** Default color palette */
  colors?: ColorPalette;
  /** Named alternative palettes */
  palettes?: Record<string, ColorPalette>;
  /** Default layout to show */
  defaultLayout?: LayoutType;
  /** React component rendered as the main content panel */
  Showcase: FC<{ layout?: LayoutType; colors?: ColorPalette }>;
}
