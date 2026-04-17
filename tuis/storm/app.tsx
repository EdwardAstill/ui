import React, { useState } from "react";
import {
  render,
  Box,
  Text,
  Tabs,
  Footer,
  Spinner,
  Sparkline,
  ProgressBar,
  Divider,
  useInput,
  useApp,
} from "@orchetron/storm";

type Theme = {
  id: string;
  name: string;
  tagline: string;
  colors: { bg: string; fg: string; accent: string; alt: string; muted: string };
};

const THEMES: Theme[] = [
  { id: "terminal",    name: "Terminal",    tagline: "phosphor green on black",         colors: { bg: "#0a0f0a", fg: "#9aff9a", accent: "#39ff14", alt: "#2fa82f", muted: "#4d734d" } },
  { id: "glass",       name: "Glass",       tagline: "frosted translucent minimalism",  colors: { bg: "#12162a", fg: "#e6ecff", accent: "#6ea8ff", alt: "#a1b8ff", muted: "#6b7798" } },
  { id: "neobrutal",   name: "Neobrutal",   tagline: "hard shadows, primary colors",    colors: { bg: "#fff7d6", fg: "#111111", accent: "#ff4f4f", alt: "#2b7bff", muted: "#777777" } },
  { id: "cyberpunk",   name: "Cyberpunk",   tagline: "neon on midnight",                colors: { bg: "#0a0018", fg: "#fff6ff", accent: "#ff2bd6", alt: "#27f5ff", muted: "#6a3a8a" } },
  { id: "pastel",      name: "Pastel",      tagline: "soft candy palette",              colors: { bg: "#fff5fa", fg: "#4a3b52", accent: "#ffb6c1", alt: "#b6e3ff", muted: "#b9a9c2" } },
  { id: "y2k",         name: "Y2K",         tagline: "chrome and optimism",             colors: { bg: "#e6f0ff", fg: "#102040", accent: "#ff8adf", alt: "#60d0ff", muted: "#7a8aa8" } },
  { id: "swiss",       name: "Swiss",       tagline: "helvetica grid discipline",       colors: { bg: "#f4f4f2", fg: "#1a1a1a", accent: "#ff1f1f", alt: "#1a1a1a", muted: "#888888" } },
  { id: "catppuccin",  name: "Catppuccin",  tagline: "soothing pastel mocha",           colors: { bg: "#1e1e2e", fg: "#cdd6f4", accent: "#f5c2e7", alt: "#89b4fa", muted: "#6c7086" } },
  { id: "retroos",     name: "RetroOS",     tagline: "beveled windows, 1996",           colors: { bg: "#008080", fg: "#000000", accent: "#c0c0c0", alt: "#0000aa", muted: "#555555" } },
  { id: "vaporwave",   name: "Vaporwave",   tagline: "aesthetic magenta & cyan",        colors: { bg: "#1a0030", fg: "#ffe0ff", accent: "#ff71ce", alt: "#01cdfe", muted: "#7a4a9a" } },
  { id: "shadcn",      name: "Shadcn Dark", tagline: "neutral engineered dark",         colors: { bg: "#0b0b0d", fg: "#f4f4f5", accent: "#a1a1aa", alt: "#6366f1", muted: "#52525b" } },
  { id: "dock",        name: "Dock IDE",    tagline: "editor slab with rail",           colors: { bg: "#161821", fg: "#d2d4de", accent: "#84a0c6", alt: "#a093c7", muted: "#6b7089" } },
];

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <Box flexDirection="row" alignItems="center" gap={1}>
      <Text backgroundColor={color} color={color}>   </Text>
      <Text dim>{label}</Text>
      <Text>{color}</Text>
    </Box>
  );
}

function Palette({ theme }: { theme: Theme }) {
  const c = theme.colors;
  return (
    <Box flexDirection="column" gap={0} padding={1}>
      <Text bold color={c.accent}>Palette — {theme.name}</Text>
      <Text dim>{theme.tagline}</Text>
      <Box height={1} />
      <Swatch color={c.bg}     label="bg     " />
      <Swatch color={c.fg}     label="fg     " />
      <Swatch color={c.accent} label="accent " />
      <Swatch color={c.alt}    label="alt    " />
      <Swatch color={c.muted}  label="muted  " />
      <Box height={1} />
      <Text backgroundColor={c.bg} color={c.fg}>  Lorem ipsum dolor sit amet, consectetur adipiscing.  </Text>
      <Box height={1} />
      <Text backgroundColor={c.bg} color={c.accent} bold>  &gt; sudo make me a theme  </Text>
    </Box>
  );
}

function Components({ theme }: { theme: Theme }) {
  const c = theme.colors;
  const data = [2, 5, 3, 8, 4, 9, 6, 7, 10, 5, 8, 3, 7, 9, 4, 6, 8, 11, 5, 7];
  return (
    <Box flexDirection="column" gap={1} padding={1}>
      <Text bold color={c.accent}>Components in {theme.name}</Text>
      <Box flexDirection="row" gap={2}>
        <Spinner type="dots" color={c.accent} />
        <Text color={c.fg}>Loading modules…</Text>
      </Box>
      <Box flexDirection="column" gap={0}>
        <Text dim>CPU</Text>
        <ProgressBar value={62} color={c.accent} showPercent />
        <Text dim>MEM</Text>
        <ProgressBar value={34} color={c.alt} showPercent />
        <Text dim>DISK</Text>
        <ProgressBar value={81} color={c.accent} showPercent />
      </Box>
      <Box flexDirection="column">
        <Text dim>Throughput</Text>
        <Sparkline data={data} color={c.accent} width={40} />
      </Box>
      <Divider />
      <Text color={c.muted}>Toggle layouts with Tab • Scroll themes with j/k</Text>
    </Box>
  );
}

function Overview({ theme }: { theme: Theme }) {
  const c = theme.colors;
  return (
    <Box flexDirection="column" padding={1} gap={1}>
      <Text bold color={c.accent}>{theme.name}</Text>
      <Text dim>{theme.tagline}</Text>
      <Box flexDirection="row" gap={1}>
        {[c.bg, c.fg, c.accent, c.alt, c.muted].map((col, i) => (
          <Text key={i} backgroundColor={col}>      </Text>
        ))}
      </Box>
      <Box height={1} />
      <Box borderStyle="round" borderColor={c.accent} padding={1} flexDirection="column">
        <Text color={c.fg} bold>Hello, terminal.</Text>
        <Text color={c.muted}>
          This card uses the theme&apos;s accent border and foreground text.
          Every Storm Box and Text inherits parent layout through flex.
        </Text>
      </Box>
      <Box flexDirection="row" gap={2}>
        <Text color={c.accent}>● online</Text>
        <Text color={c.alt}>● syncing</Text>
        <Text color={c.muted}>● idle</Text>
      </Box>
    </Box>
  );
}

function App() {
  const { exit } = useApp();
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<"overview" | "palette" | "components">("overview");

  const theme = THEMES[index]!;

  useInput((e) => {
    if (e.key === "q" || (e.key === "c" && e.ctrl) || e.key === "escape") exit();
    if (e.key === "down" || e.key === "j") setIndex((i) => (i + 1) % THEMES.length);
    if (e.key === "up"   || e.key === "k") setIndex((i) => (i - 1 + THEMES.length) % THEMES.length);
    if (e.key === "tab") {
      setTab((t) => (t === "overview" ? "palette" : t === "palette" ? "components" : "overview"));
    }
    if (e.key === "1") setTab("overview");
    if (e.key === "2") setTab("palette");
    if (e.key === "3") setTab("components");
  });

  return (
    <Box flexDirection="column" height="100%">
      <Box borderStyle="round" borderColor={theme.colors.accent} paddingX={1}>
        <Text bold color={theme.colors.accent}>STORM</Text>
        <Text dim>  · theme showcase · </Text>
        <Text color={theme.colors.alt}>{theme.name}</Text>
      </Box>

      <Box flexDirection="row" flexGrow={1}>
        <Box
          flexDirection="column"
          width={24}
          borderStyle="round"
          borderColor={theme.colors.muted}
          paddingX={1}
        >
          <Text bold dim>THEMES</Text>
          <Box height={1} />
          {THEMES.map((t, i) => {
            const active = i === index;
            return (
              <Text
                key={t.id}
                color={active ? theme.colors.bg : theme.colors.fg}
                backgroundColor={active ? theme.colors.accent : undefined}
                bold={active}
              >
                {active ? "▶ " : "  "}{t.name}
              </Text>
            );
          })}
        </Box>

        <Box flexDirection="column" flexGrow={1} borderStyle="round" borderColor={theme.colors.accent}>
          <Tabs
            tabs={[
              { key: "overview",   label: "Overview" },
              { key: "palette",    label: "Palette" },
              { key: "components", label: "Components" },
            ]}
            activeKey={tab}
            onChange={(k) => setTab(k as typeof tab)}
          />
          {tab === "overview"   && <Overview   theme={theme} />}
          {tab === "palette"    && <Palette    theme={theme} />}
          {tab === "components" && <Components theme={theme} />}
        </Box>
      </Box>

      <Footer
        bindings={[
          { key: "j/k",   label: "theme" },
          { key: "Tab",   label: "view" },
          { key: "1/2/3", label: "jump" },
          { key: "q",     label: "quit" },
        ]}
      />
    </Box>
  );
}

render(<App />).waitUntilExit();
