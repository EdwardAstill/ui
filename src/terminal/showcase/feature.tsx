/**
 * Terminal SHOWCASE — feature explorer.
 *
 * A realistic-feeling TUI: tree on the left, tabbed detail pane on the right.
 * Use this to feel out how a product's terminal UI should *behave* —
 * keyboard navigation, focus rings, panes, search, resize, hints.
 *
 * For the token reference / component catalog, see `../style/app.tsx`.
 */

import { useState, useMemo, useCallback } from "react";
import {
  render,
  Box,
  Text,
  Footer,
  Modal,
  Kbd,
  ScrollView,
  SyntaxHighlight,
  useInput,
  useApp,
  useTerminal,
} from "@orchetron/storm";
import { THEMES, renderButton, type TuiTheme } from "../themes";

let chosenCode = 0;

type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
  data?: Record<string, any>;
  _expanded?: boolean;
};

const TREE_DATA: TreeNode[] = [
  {
    id: "foundations",
    label: "Foundations",
    children: [
      { id: "color", label: "Color System", data: { desc: "Theme palette" } },
      { id: "typography", label: "Typography", data: { desc: "Body + mono" } },
      { id: "spacing", label: "Spacing Scale", data: { desc: "1ch base" } },
      { id: "radius", label: "Border Style", data: { desc: "Varies per theme" } },
    ],
  },
  {
    id: "components",
    label: "Components",
    children: [
      { id: "button", label: "Button", data: { variants: ["primary", "secondary", "ghost"] } },
      { id: "input", label: "Input Field", data: { variants: ["text", "search", "textarea"] } },
      { id: "card", label: "Card", data: { variants: ["default", "elevated", "outlined"] } },
      { id: "modal", label: "Modal", data: { features: ["focus trap", "backdrop"] } },
    ],
  },
  {
    id: "patterns",
    label: "Patterns",
    children: [
      { id: "forms", label: "Forms", data: { includes: ["validation", "errors"] } },
      { id: "tables", label: "Data Tables", data: { includes: ["sort", "filter"] } },
      { id: "nav", label: "Navigation", data: { includes: ["tabs", "menus"] } },
    ],
  },
];

type TabKey = "overview" | "properties" | "code" | "settings";

function flattenVisible(nodes: TreeNode[], expandedIds: Set<string>, level = 0): { node: TreeNode; level: number }[] {
  const out: { node: TreeNode; level: number }[] = [];
  for (const node of nodes) {
    const expanded = expandedIds.has(node.id);
    out.push({ node: { ...node, _expanded: expanded }, level });
    if (expanded && node.children) out.push(...flattenVisible(node.children, expandedIds, level + 1));
  }
  return out;
}

function ThemeSidebar({
  themes,
  activeId,
  focused,
  focusIdx,
  theme,
}: {
  themes: TuiTheme[];
  activeId: string;
  focused: boolean;
  focusIdx: number;
  theme: TuiTheme;
}) {
  return (
    <Box
      flexDirection="column"
      width={22}
      borderStyle={theme.borderStyle}
      borderColor={focused ? theme.colors.borderFocus : theme.colors.border}
      paddingX={1}
      paddingTop={1}
    >
      <Text bold color={theme.colors.accent}>UI TUI</Text>
      <Text dim color={theme.colors.dim}>{themes.length} themes</Text>
      <Box height={1} />
      <ScrollView flex={1}>
        {themes.map((t, i) => {
          const isActive = t.id === activeId;
          const isFocused = focused && i === focusIdx;
          return (
            <Box key={t.id} flexDirection="row" alignItems="center">
              <Text
                color={isActive ? theme.colors.selected : theme.colors.fg}
                backgroundColor={
                  isActive ? theme.colors.selectedBg :
                  isFocused ? theme.colors.border : undefined
                }
                bold={isActive || isFocused}
              >
                {" "}{t.emoji} {t.name.padEnd(14)}
              </Text>
            </Box>
          );
        })}
      </ScrollView>
    </Box>
  );
}

const CODE_SAMPLE = `// Active theme
export const theme = {
  id: "__ID__",
  border: "__BORDER__",
  button: "__BUTTON__",
};`;

function App() {
  const { exit } = useApp();
  const { width, height } = useTerminal();

  const [themeIdx, setThemeIdx] = useState(0);
  const theme = THEMES[themeIdx]!;

  const [searchFilter, setSearchFilter] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(["foundations", "components", "patterns"])
  );
  const [focusedId, setFocusedId] = useState("color");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [treeWidth, setTreeWidth] = useState(30);
  const [topHeight, setTopHeight] = useState(55);
  const [showHelp, setShowHelp] = useState(false);
  const [activePane, setActivePane] = useState<"themes" | "tree" | "top" | "bottom">("themes");
  const [hintMode, setHintMode] = useState(false);
  const [resizeMode, setResizeMode] = useState(false);

  const flatTree = useMemo(() => flattenVisible(TREE_DATA, expandedIds), [expandedIds]);
  const filteredTree = useMemo(() => {
    if (!searchFilter) return flatTree;
    const f = searchFilter.toLowerCase();
    return flatTree.filter(({ node }) =>
      node.label.toLowerCase().includes(f) ||
      node.data?.desc?.toLowerCase().includes(f)
    );
  }, [flatTree, searchFilter]);

  const focusedNode = flatTree.find(({ node }) => node.id === focusedId)?.node;
  const c = theme.colors;
  const treeFocused = activePane === "tree";
  const topFocused = activePane === "top";
  const bottomFocused = activePane === "bottom";

  const navigateTree = useCallback((direction: "up" | "down" | "left" | "right") => {
    const idx = filteredTree.findIndex(({ node }) => node.id === focusedId);
    if (idx === -1) return;
    if (direction === "down") {
      const next = filteredTree[(idx + 1) % filteredTree.length]!;
      setFocusedId(next.node.id);
    } else if (direction === "up") {
      const next = filteredTree[(idx - 1 + filteredTree.length) % filteredTree.length]!;
      setFocusedId(next.node.id);
    } else if (direction === "left") {
      if (expandedIds.has(focusedId)) {
        const next = new Set(expandedIds);
        next.delete(focusedId);
        setExpandedIds(next);
      }
    } else if (direction === "right") {
      if (filteredTree.find(({ node }) => node.id === focusedId)?.node.children?.length) {
        setExpandedIds(new Set([...expandedIds, focusedId]));
      }
    }
  }, [focusedId, expandedIds, filteredTree]);

  const cycleTab = useCallback((dir: 1 | -1) => {
    const tabs: TabKey[] = ["overview", "properties", "code", "settings"];
    const i = tabs.indexOf(activeTab);
    setActiveTab(tabs[(i + dir + tabs.length) % tabs.length]!);
  }, [activeTab]);

  const paneCycle: Array<"themes" | "tree" | "top" | "bottom"> =
    ["themes", "tree", "top", "bottom"];

  useInput((e) => {
    if (showHelp) {
      if (e.key === "?" || e.key === "escape" || e.key === "q") setShowHelp(false);
      return;
    }
    if (searchMode) {
      if (e.key === "escape" || e.key === "return") setSearchMode(false);
      else if (e.key === "backspace") setSearchFilter(s => s.slice(0, -1));
      else if (e.char && e.char.length === 1 && !e.ctrl && !e.meta) setSearchFilter(s => s + e.char);
      return;
    }
    if (resizeMode) {
      if (e.key === "escape" || e.key === "r") { setResizeMode(false); return; }
      if (activePane === "tree" || activePane === "top" || activePane === "bottom") {
        if (e.key === "left" || e.key === "h") setTreeWidth(w => Math.max(18, w - 2));
        if (e.key === "right" || e.key === "l") setTreeWidth(w => Math.min(70, w + 2));
      }
      if (activePane === "top" || activePane === "bottom") {
        if (e.key === "up" || e.key === "k") setTopHeight(h => Math.max(20, h - 5));
        if (e.key === "down" || e.key === "j") setTopHeight(h => Math.min(80, h + 5));
      }
      return;
    }

    if (e.ctrl && e.key === "c") { exit(); return; }
    if (e.key === "q" || e.key === "escape" || e.key === "b") { chosenCode = 99; exit(); return; }
    if (e.key === "?") { setShowHelp(true); return; }
    if (e.key === "/") { setSearchMode(true); return; }
    if (e.key === "r") { setResizeMode(true); return; }

    if (e.ctrl && (e.key === "space" || e.char === " ")) { setHintMode(h => !h); return; }

    if (e.key === "tab") {
      const i = paneCycle.indexOf(activePane);
      const next = paneCycle[(i + 1) % paneCycle.length]!;
      setActivePane(next);
      setHintMode(false);
      return;
    }

    if (activePane === "themes") {
      if (e.key === "j" || e.key === "down") setThemeIdx(i => (i + 1) % THEMES.length);
      else if (e.key === "k" || e.key === "up") setThemeIdx(i => (i - 1 + THEMES.length) % THEMES.length);
      return;
    }

    const digitMap: Record<string, number> = { "1":0,"2":1,"3":2,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8 };
    if (e.char && digitMap[e.char] !== undefined) {
      const n = digitMap[e.char]!;
      if (hintMode && activePane === "tree" && filteredTree[n]) {
        setFocusedId(filteredTree[n]!.node.id);
        setHintMode(false);
        return;
      }
      const tabs: TabKey[] = ["overview", "properties", "code", "settings"];
      if (n < tabs.length) {
        setActiveTab(tabs[n]!);
        setActivePane("top");
        setHintMode(false);
        return;
      }
    }

    if (activePane === "tree") {
      if (e.key === "j" || e.key === "down") navigateTree("down");
      else if (e.key === "k" || e.key === "up") navigateTree("up");
      else if (e.key === "h" || e.key === "left") navigateTree("left");
      else if (e.key === "l" || e.key === "right") navigateTree("right");
    } else if (activePane === "top") {
      if (e.key === "h" || e.key === "left") cycleTab(-1);
      else if (e.key === "l" || e.key === "right") cycleTab(1);
    }
  });

  return (
    <Box flexDirection="column" width={width} height={height} backgroundColor={theme.colors.bg}>
      <Box
        borderStyle={theme.borderStyle}
        borderColor={theme.colors.border}
        paddingX={1}
      >
        <Text bold color={theme.colors.accent}>STORM</Text>
        <Text dim color={theme.colors.dim}>  ·  Feature Explorer  ·  </Text>
        <Text color={theme.colors.fg}>{theme.name}</Text>
        <Text dim color={theme.colors.dim}>  ({theme.id})</Text>
      </Box>

      <Box flex={1} flexDirection="row">
        <ThemeSidebar
          themes={THEMES}
          activeId={theme.id}
          focused={activePane === "themes"}
          focusIdx={themeIdx}
          theme={theme}
        />

        <Box flex={1} flexDirection="row">
          <Box
            width={Math.max(16, treeWidth)}
            flexDirection="column"
            borderStyle={theme.borderStyle}
            borderColor={treeFocused ? c.borderFocus : c.border}
            paddingX={1}
            paddingTop={1}
          >
            {searchMode && (
              <Box
                flexDirection="row"
                marginBottom={1}
                borderStyle={theme.borderStyle}
                borderColor={c.borderFocus}
                paddingX={1}
              >
                <Text dim color={c.dim}>/ </Text>
                <Text color={c.fg}>{searchFilter}_</Text>
              </Box>
            )}
            <Text bold dim color={c.dim}>ITEMS</Text>
            <Text dim color={c.dim}>{filteredTree.length} total</Text>
            <Box height={1} />
            <ScrollView flex={1}>
              {filteredTree.length === 0 ? (
                <Text color={c.dim}>no matches</Text>
              ) : (
                filteredTree.map(({ node, level }, i) => {
                  const isFocused = node.id === focusedId;
                  const hintKey = hintMode && treeFocused && i < 9 ? String(i + 1) : undefined;
                  const hasChildren = node.children && node.children.length > 0;
                  const toggle = hasChildren ? (node._expanded ? "▼ " : "▶ ") : "  ";
                  const indent = "  ".repeat(level);
                  return (
                    <Box key={node.id} flexDirection="row" alignItems="center">
                      {hintKey && (
                        <Text color={c.borderFocus} backgroundColor={c.selectedBg} bold>
                          {` ${hintKey} `}
                        </Text>
                      )}
                      <Text
                        color={isFocused ? c.selected : c.fg}
                        backgroundColor={isFocused ? c.selectedBg : undefined}
                        bold={isFocused}
                      >
                        {indent}{toggle}{node.label}
                      </Text>
                    </Box>
                  );
                })
              )}
            </ScrollView>
          </Box>

          <Box flexDirection="column" flex={1}>
            <Box
              flexDirection="column"
              flexGrow={topHeight}
              flexShrink={1}
              flexBasis={0}
              borderStyle={theme.borderStyle}
              borderColor={topFocused ? c.borderFocus : c.border}
              paddingX={1}
              paddingTop={1}
            >
              <Box flexDirection="row" gap={1}>
                {(["overview", "properties", "code", "settings"] as TabKey[]).map((k, i) => {
                  const labels = { overview: "Overview", properties: "Properties", code: "Code", settings: "Settings" };
                  const isActive = activeTab === k;
                  const showHint = hintMode && topFocused;
                  return (
                    <Text
                      key={k}
                      bold={isActive || showHint}
                      dim={!isActive && !showHint}
                      color={showHint ? c.borderFocus : (isActive ? c.selected : c.fg)}
                      backgroundColor={isActive ? c.selectedBg : (showHint ? c.selectedBg : undefined)}
                    >
                      {showHint ? ` [${i + 1}] ${labels[k]} ` : ` ${i + 1} ${labels[k]} `}
                    </Text>
                  );
                })}
              </Box>

              <Box flex={1} marginTop={1}>
                {!focusedNode ? (
                  <Text color={c.dim}>select an item</Text>
                ) : activeTab === "overview" ? (
                  <Box flexDirection="column" gap={1}>
                    <Text bold color={c.fg}>{focusedNode.label}</Text>
                    {focusedNode.data && Object.entries(focusedNode.data).map(([k, v]) => (
                      <Box key={k} flexDirection="row" gap={1}>
                        <Text dim color={c.dim}>{k}:</Text>
                        <Text color={c.fg}>
                          {typeof v === "string" ? v : Array.isArray(v) ? v.join(", ") : JSON.stringify(v)}
                        </Text>
                      </Box>
                    ))}
                    <Box height={1} />
                    <Text dim color={c.dim}>theme buttons</Text>
                    <Box flexDirection="row" gap={2}>
                      <Text color={c.selected} backgroundColor={c.accent} bold>
                        {renderButton("Primary", theme.buttonStyle)}
                      </Text>
                      <Text color={c.fg}>{renderButton("Ghost", theme.buttonStyle)}</Text>
                    </Box>
                  </Box>
                ) : activeTab === "properties" ? (
                  <Box flexDirection="column">
                    <Text dim color={c.dim}>id</Text>
                    <Text color={c.fg}>{focusedNode.id}</Text>
                    <Box height={1} />
                    <Text dim color={c.dim}>level</Text>
                    <Text color={c.fg}>{flatTree.find(({ node }) => node.id === focusedId)?.level}</Text>
                    <Box height={1} />
                    <Text dim color={c.dim}>children</Text>
                    <Text color={c.fg}>{focusedNode.children?.length || 0}</Text>
                  </Box>
                ) : activeTab === "code" ? (
                  <Box borderStyle={theme.borderStyle} borderColor={c.border} padding={1}>
                    <SyntaxHighlight
                      language="typescript"
                      code={CODE_SAMPLE
                        .replace("__ID__", theme.id)
                        .replace("__BORDER__", theme.borderStyle)
                        .replace("__BUTTON__", theme.buttonStyle)}
                    />
                  </Box>
                ) : (
                  <Box flexDirection="column" gap={1}>
                    <Text bold color={c.fg}>Settings</Text>
                    <Text dim color={c.dim}>Theme: {theme.name}</Text>
                    <Text dim color={c.dim}>Tree width: {treeWidth} cols</Text>
                    <Text dim color={c.dim}>Filter: {searchFilter || "(none)"}</Text>
                    <Text dim color={c.dim}>Expanded nodes: {expandedIds.size}</Text>
                  </Box>
                )}
              </Box>
            </Box>

            <Box
              flexDirection="column"
              flexGrow={100 - topHeight}
              flexShrink={1}
              flexBasis={0}
              borderStyle={theme.borderStyle}
              borderColor={bottomFocused ? c.borderFocus : c.border}
              paddingX={1}
            >
              <Text bold dim color={c.dim}>STATUS / PREVIEW</Text>
              <Box flexDirection="row" gap={2}>
                <Box flexDirection="column" flex={1}>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>theme:</Text>
                    <Text color={c.accent}>{theme.name}</Text>
                  </Box>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>border:</Text>
                    <Text color={c.fg}>{theme.borderStyle}</Text>
                  </Box>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>button:</Text>
                    <Text color={c.fg}>{theme.buttonStyle}</Text>
                  </Box>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>pane:</Text>
                    <Text color={c.fg}>{activePane}</Text>
                  </Box>
                </Box>
                <Box flexDirection="column" flex={1}>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>id:</Text>
                    <Text color={c.fg}>{focusedNode?.id ?? "—"}</Text>
                  </Box>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>label:</Text>
                    <Text color={c.fg}>{focusedNode?.label ?? "—"}</Text>
                  </Box>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>filter:</Text>
                    <Text color={c.fg}>{searchFilter || "(none)"}</Text>
                  </Box>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>matches:</Text>
                    <Text color={c.fg}>{filteredTree.length}</Text>
                  </Box>
                </Box>
                <Box flexDirection="column" flex={1}>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>hints:</Text>
                    <Text color={c.fg}>{hintMode ? "on" : "off"}</Text>
                  </Box>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>resize:</Text>
                    <Text color={resizeMode ? c.borderFocus : c.fg} bold={resizeMode}>
                      {resizeMode ? "ON" : "off"}
                    </Text>
                  </Box>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>tree:</Text>
                    <Text color={c.fg}>{treeWidth}</Text>
                  </Box>
                  <Box flexDirection="row" gap={1}>
                    <Text dim color={c.dim}>top:</Text>
                    <Text color={c.fg}>{topHeight}%</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer
        bindings={resizeMode ? [
          { key: "arrows", label: `resize ${activePane}` },
          { key: "Esc/r", label: "exit resize" },
        ] : [
          { key: "Tab", label: `pane (${activePane})` },
          { key: "j/k", label: activePane === "themes" ? "theme" : activePane === "tree" ? "nav" : "—" },
          { key: "h/l", label: activePane === "tree" ? "fold" : activePane === "top" ? "tab" : "—" },
          { key: "r", label: "resize" },
          { key: "/", label: "search" },
          { key: "?", label: "help" },
          { key: "q/Esc", label: "back" },
        ]}
      />

      {showHelp && (
        <Modal visible={true} onClose={() => setShowHelp(false)} title="Help" size="md">
          <Box flexDirection="column" gap={1} padding={1}>
            <Text bold color={theme.colors.fg}>Panes</Text>
            <Text><Kbd>Tab</Kbd>  — cycle panes</Text>
            <Text><Kbd>j</Kbd>/<Kbd>k</Kbd>  — nav (theme list / tree)</Text>
            <Text><Kbd>h</Kbd>/<Kbd>l</Kbd>  — fold / switch tab</Text>
            <Text><Kbd>/</Kbd>  — search</Text>
            <Text><Kbd>r</Kbd>  — resize mode (arrows; Esc exits)</Text>
            <Text><Kbd>q</Kbd>  — quit  ·  <Kbd>?</Kbd>  — help</Text>
            <Box height={1} />
            <Text dim color={theme.colors.dim}>
              Launch style guide with: <Text color={theme.colors.accent}>ui tui style</Text>
            </Text>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

render(<App />).waitUntilExit().then(() => process.exit(chosenCode));
