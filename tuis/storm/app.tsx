import React, { useRef, useState, useMemo } from "react";
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
  Modal,
  Kbd,
  Badge,
  Gauge,
  SyntaxHighlight,
  useInput,
  useApp,
  useTerminal,
  useTick,
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

const CODE_SAMPLE = `// Theme-aware component
export function Button({ label, onClick }: Props) {
  const theme = useTheme();
  return (
    <button
      onClick={onClick}
      style={{
        background: theme.accent,
        color: theme.bg,
        border: \`1px solid \${theme.alt}\`,
      }}
    >
      {label}
    </button>
  );
}`;

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <Box flexDirection="row" alignItems="center" gap={1}>
      <Text backgroundColor={color} color={color}>   </Text>
      <Text dim>{label}</Text>
      <Text>{color}</Text>
    </Box>
  );
}

function LiveDot({ color }: { color: string }) {
  const visibleRef = useRef(true);
  const [, force] = useState(0);
  useTick(600, () => {
    visibleRef.current = !visibleRef.current;
    force((t) => t + 1);
  });
  return <Text color={color}>{visibleRef.current ? "●" : "○"}</Text>;
}

function Overview({ theme }: { theme: Theme }) {
  const c = theme.colors;
  return (
    <Box flexDirection="column" padding={1} gap={1}>
      <Box flexDirection="row" gap={1} alignItems="center">
        <Text bold color={c.accent}>{theme.name}</Text>
        <Badge label={theme.id} variant="info" />
      </Box>
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
          Card styled with the theme&apos;s accent border and muted text.
        </Text>
      </Box>

      <Box flexDirection="row" gap={2} alignItems="center">
        <Box flexDirection="row" gap={1} alignItems="center">
          <LiveDot color={c.accent} />
          <Text color={c.accent}>online</Text>
        </Box>
        <Box flexDirection="row" gap={1} alignItems="center">
          <LiveDot color={c.alt} />
          <Text color={c.alt}>syncing</Text>
        </Box>
        <Text color={c.muted}>● idle</Text>
      </Box>
    </Box>
  );
}

function Palette({ theme }: { theme: Theme }) {
  const c = theme.colors;
  return (
    <Box flexDirection="column" padding={1} gap={0}>
      <Text bold color={c.accent}>Palette — {theme.name}</Text>
      <Text dim>{theme.tagline}</Text>
      <Box height={1} />
      <Swatch color={c.bg}     label="bg     " />
      <Swatch color={c.fg}     label="fg     " />
      <Swatch color={c.accent} label="accent " />
      <Swatch color={c.alt}    label="alt    " />
      <Swatch color={c.muted}  label="muted  " />
      <Box height={1} />
      <Text backgroundColor={c.bg} color={c.fg}>  Lorem ipsum dolor sit amet, consectetur.  </Text>
      <Text backgroundColor={c.bg} color={c.accent} bold>  &gt; sudo make me a theme  </Text>
      <Text backgroundColor={c.bg} color={c.alt}>  Secondary accent for links and marks.  </Text>
      <Text backgroundColor={c.bg} color={c.muted}>  Muted text for metadata.  </Text>
    </Box>
  );
}

function Components({ theme }: { theme: Theme }) {
  const c = theme.colors;
  const dataRef = useRef<number[]>([2, 5, 3, 8, 4, 9, 6, 7, 10, 5, 8, 3, 7, 9, 4, 6, 8, 11, 5, 7]);
  const [dataVersion, setDataVersion] = useState(0);

  useTick(600, () => {
    const next = [...dataRef.current.slice(1), Math.floor(Math.random() * 12) + 1];
    dataRef.current = next;
    setDataVersion((v) => v + 1);
  });

  return (
    <Box flexDirection="column" gap={1} padding={1}>
      <Text bold color={c.accent}>Components — {theme.name}</Text>

      <Box flexDirection="row" gap={2} alignItems="center">
        <Spinner type="dots" color={c.accent} />
        <Text color={c.fg}>Loading modules…</Text>
        <Spinner type="line" color={c.alt} />
        <Text color={c.muted}>Fetching</Text>
      </Box>

      <Box flexDirection="row" gap={2}>
        <Box flexDirection="column" flex={1} gap={0}>
          <Text dim>CPU</Text>
          <ProgressBar value={62} color={c.accent} showPercent />
          <Text dim>MEM</Text>
          <ProgressBar value={34} color={c.alt} showPercent />
          <Text dim>DISK</Text>
          <ProgressBar value={81} color={c.accent} showPercent />
        </Box>
        <Box flexDirection="column" width={24}>
          <Text dim>Latency</Text>
          <Gauge
            value={42}
            color={c.accent}
            thresholds={[
              { value: 60, color: c.alt },
              { value: 85, color: "#ff4f4f" },
            ]}
            showValue
          />
        </Box>
      </Box>

      <Box flexDirection="column">
        <Text dim>Throughput (live)</Text>
        <Sparkline key={dataVersion} data={dataRef.current} color={c.accent} width={40} />
      </Box>

      <Divider />
      <Box flexDirection="row" gap={1}>
        <Badge label="stable" variant="success" />
        <Badge label="beta" variant="warning" />
        <Badge label="alpha" variant="outline" />
      </Box>
    </Box>
  );
}

function CodeTab({ theme }: { theme: Theme }) {
  const c = theme.colors;
  return (
    <Box flexDirection="column" padding={1} gap={1}>
      <Text bold color={c.accent}>Code — {theme.name}</Text>
      <Text dim>SyntaxHighlight widget renders with terminal-native truecolor.</Text>
      <Box borderStyle="round" borderColor={c.muted} padding={1}>
        <SyntaxHighlight language="typescript" code={CODE_SAMPLE} />
      </Box>
    </Box>
  );
}

function HelpOverlay({ onClose, accent }: { onClose: () => void; accent: string }) {
  useInput((e) => {
    if (e.key === "escape" || e.key === "?" || e.key === "q") onClose();
  });
  return (
    <Modal visible={true} onClose={onClose} title="Help" size="md">
      <Box flexDirection="column" gap={0} padding={1}>
        <Text bold color={accent}>Navigation</Text>
        <Text><Kbd>j</Kbd> / <Kbd>k</Kbd>  next / previous theme</Text>
        <Text><Kbd>↓</Kbd> / <Kbd>↑</Kbd>  same as j / k</Text>
        <Text><Kbd>g</Kbd> / <Kbd>G</Kbd>  first / last theme</Text>
        <Box height={1} />
        <Text bold color={accent}>Views</Text>
        <Text><Kbd>Tab</Kbd>          cycle views</Text>
        <Text><Kbd>1</Kbd> <Kbd>2</Kbd> <Kbd>3</Kbd> <Kbd>4</Kbd>  jump to view</Text>
        <Box height={1} />
        <Text bold color={accent}>Other</Text>
        <Text><Kbd>/</Kbd>   search themes</Text>
        <Text><Kbd>?</Kbd>   toggle this help</Text>
        <Text><Kbd>q</Kbd>   quit</Text>
      </Box>
    </Modal>
  );
}

type TabKey = "overview" | "palette" | "components" | "code";

function App() {
  const { exit } = useApp();
  const { width, height } = useTerminal();
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<TabKey>("overview");
  const [filter, setFilter] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const uptimeRef = useRef(0);
  const [, setUptimeTick] = useState(0);

  useTick(1000, () => {
    uptimeRef.current++;
    setUptimeTick((t) => t + 1);
  });

  const filteredThemes = useMemo(() => {
    if (!filter) return THEMES;
    const f = filter.toLowerCase();
    return THEMES.filter((t) =>
      t.name.toLowerCase().includes(f) ||
      t.id.toLowerCase().includes(f) ||
      t.tagline.toLowerCase().includes(f)
    );
  }, [filter]);

  const safeIndex = Math.min(index, Math.max(0, filteredThemes.length - 1));
  const theme = filteredThemes[safeIndex] ?? THEMES[0]!;

  useInput((e) => {
    if (showHelp) return;

    if (searchActive) {
      if (e.key === "escape") { setSearchActive(false); setFilter(""); return; }
      if (e.key === "return") { setSearchActive(false); return; }
      if (e.key === "backspace") { setFilter((s) => s.slice(0, -1)); return; }
      if (e.char && e.char.length === 1) setFilter((s) => s + e.char);
      return;
    }

    if (e.key === "q" || (e.key === "c" && e.ctrl) || e.key === "escape") exit();
    if (e.key === "?") { setShowHelp(true); return; }
    if (e.key === "/") { setSearchActive(true); setFilter(""); setIndex(0); return; }
    if (e.key === "down" || e.key === "j") setIndex((i) => (i + 1) % Math.max(1, filteredThemes.length));
    if (e.key === "up"   || e.key === "k") setIndex((i) => (i - 1 + Math.max(1, filteredThemes.length)) % Math.max(1, filteredThemes.length));
    if (e.key === "g") setIndex(0);
    if (e.key === "G") setIndex(Math.max(0, filteredThemes.length - 1));
    if (e.key === "tab") {
      const order: TabKey[] = ["overview", "palette", "components", "code"];
      setTab((t) => order[(order.indexOf(t) + 1) % order.length]!);
    }
    if (e.key === "1") setTab("overview");
    if (e.key === "2") setTab("palette");
    if (e.key === "3") setTab("components");
    if (e.key === "4") setTab("code");
  });

  const sidebarWidth = width < 80 ? 18 : 24;

  return (
    <Box flexDirection="column" height="100%">
      <Box
        borderStyle="round"
        borderColor={theme.colors.accent}
        paddingX={1}
        flexDirection="row"
        alignItems="center"
        gap={1}
      >
        <Text bold color={theme.colors.accent}>STORM</Text>
        <Text dim>· theme showcase ·</Text>
        <Text color={theme.colors.alt}>{theme.name}</Text>
        <Box flex={1} />
        <LiveDot color={theme.colors.accent} />
        <Text dim>{width}×{height}</Text>
      </Box>

      <Box flexDirection="row" flexGrow={1}>
        <Box
          flexDirection="column"
          width={sidebarWidth}
          borderStyle="round"
          borderColor={theme.colors.muted}
          paddingX={1}
        >
          <Text bold dim>THEMES</Text>
          {searchActive || filter ? (
            <Text color={theme.colors.accent}>/{filter}{searchActive ? "_" : ""}</Text>
          ) : (
            <Text dim>{filteredThemes.length} total</Text>
          )}
          <Box height={1} />
          {filteredThemes.length === 0 ? (
            <Text color={theme.colors.muted}>no matches</Text>
          ) : (
            filteredThemes.map((t, i) => {
              const active = i === safeIndex;
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
            })
          )}
        </Box>

        <Box flexDirection="column" flexGrow={1} borderStyle="round" borderColor={theme.colors.accent}>
          <Tabs
            tabs={[
              { key: "overview",   label: "Overview" },
              { key: "palette",    label: "Palette" },
              { key: "components", label: "Components" },
              { key: "code",       label: "Code" },
            ]}
            activeKey={tab}
            onChange={(k) => setTab(k as TabKey)}
          />
          {filteredThemes.length === 0 ? (
            <Box padding={2}>
              <Text color={theme.colors.muted}>No themes match &ldquo;{filter}&rdquo;. Press Esc to clear.</Text>
            </Box>
          ) : tab === "overview"   ? <Overview   theme={theme} />
            : tab === "palette"    ? <Palette    theme={theme} />
            : tab === "components" ? <Components theme={theme} />
            :                        <CodeTab    theme={theme} />}

          <Divider />
          <Box paddingX={1} flexDirection="row" gap={2}>
            <Text dim>index</Text>
            <Text color={theme.colors.accent}>{safeIndex + 1}/{filteredThemes.length}</Text>
            <Text dim>uptime</Text>
            <Text color={theme.colors.alt}>{uptimeRef.current}s</Text>
          </Box>
        </Box>
      </Box>

      <Footer
        bindings={[
          { key: "j/k",   label: "theme" },
          { key: "g/G",   label: "jump" },
          { key: "Tab",   label: "view" },
          { key: "/",     label: "search" },
          { key: "?",     label: "help" },
          { key: "q",     label: "quit" },
        ]}
      />

      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} accent={theme.colors.accent} />}
    </Box>
  );
}

render(<App />).waitUntilExit();
