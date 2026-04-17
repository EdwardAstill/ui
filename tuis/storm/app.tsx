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

type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
  data?: Record<string, any>;
  _expanded?: boolean;
};

const GREYSCALE = {
  bg: "#0B0B0D",
  fg: "#F4F4F5",
  border: "#525252",
  borderFocused: "#FFFFFF",
  dim: "#71717A",
  selected: "#F4F4F5",
  selectedBg: "#2E2E32",
};

const CODE_SAMPLE = `// Greyscale-only theme
export const theme = {
  colors: {
    bg: "#0B0B0D",
    fg: "#F4F4F5",
    border: "#525252",
    dim: "#71717A",
  },
  typography: {
    body: "Inter, system-ui",
    mono: "JetBrains Mono",
  },
};`;

const TREE_DATA: TreeNode[] = [
  {
    id: "foundations",
    label: "Foundations",
    children: [
      { id: "color", label: "Color System", data: { desc: "16-level greyscale" } },
      { id: "typography", label: "Typography", data: { desc: "Body + mono stacks" } },
      { id: "spacing", label: "Spacing Scale", data: { desc: "4px base unit" } },
      { id: "radius", label: "Border Radius", data: { desc: "0px, 4px, 8px, 16px" } },
    ],
  },
  {
    id: "components",
    label: "Components",
    children: [
      { id: "button", label: "Button", data: { variants: ["primary", "secondary", "ghost"] } },
      { id: "input", label: "Input Field", data: { variants: ["text", "search", "textarea"] } },
      { id: "card", label: "Card", data: { variants: ["default", "elevated", "outlined"] } },
      { id: "modal", label: "Modal", data: { features: ["focus trap", "backdrop", "animations"] } },
    ],
  },
  {
    id: "patterns",
    label: "Patterns",
    children: [
      { id: "forms", label: "Forms", data: { includes: ["validation", "error handling"] } },
      { id: "tables", label: "Data Tables", data: { includes: ["sorting", "filtering", "pagination"] } },
      { id: "nav", label: "Navigation", data: { includes: ["breadcrumbs", "tabs", "menu"] } },
    ],
  },
];

type TabKey = "overview" | "properties" | "code" | "settings";

function TreeRow({
  node,
  level,
  isFocused,
  hintKey,
}: {
  node: TreeNode;
  level: number;
  isFocused: boolean;
  hintKey?: string;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const toggle = hasChildren ? (node._expanded ? "▼ " : "▶ ") : "  ";
  const indent = "  ".repeat(level);

  return (
    <Box flexDirection="row" alignItems="center">
      {hintKey && (
        <Text color={GREYSCALE.borderFocused} backgroundColor={GREYSCALE.selectedBg} bold>
          {` ${hintKey} `}
        </Text>
      )}
      <Text
        color={GREYSCALE.fg}
        backgroundColor={isFocused ? GREYSCALE.selectedBg : undefined}
        bold={isFocused}
      >
        {indent}{toggle}{node.label}
      </Text>
    </Box>
  );
}

type FlatItem = { node: TreeNode & { _expanded?: boolean }; level: number };

function flattenVisible(nodes: TreeNode[], expandedIds: Set<string>, level = 0): FlatItem[] {
  const out: FlatItem[] = [];
  for (const node of nodes) {
    const expanded = expandedIds.has(node.id);
    out.push({ node: { ...node, _expanded: expanded }, level });
    if (expanded && node.children) {
      out.push(...flattenVisible(node.children, expandedIds, level + 1));
    }
  }
  return out;
}

function App() {
  const { exit } = useApp();
  const { width, height } = useTerminal();

  const [searchFilter, setSearchFilter] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["foundations", "components", "patterns"]));
  const [focusedId, setFocusedId] = useState("color");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [treeWidth, setTreeWidth] = useState(25);
  const [topHeight, setTopHeight] = useState(55); // % of right column height
  const [showHelp, setShowHelp] = useState(false);
  const [activePane, setActivePane] = useState<"tree" | "top" | "bottom">("tree");
  const [hintMode, setHintMode] = useState(false);
  const [resizeMode, setResizeMode] = useState(false);
  const [showFloating, setShowFloating] = useState(false);

  const flatTree = useMemo(
    () => flattenVisible(TREE_DATA, expandedIds),
    [expandedIds]
  );

  const filteredTree = useMemo(() => {
    if (!searchFilter) return flatTree;
    const f = searchFilter.toLowerCase();
    return flatTree.filter(({ node }) =>
      node.label.toLowerCase().includes(f) ||
      node.data?.desc?.toLowerCase().includes(f)
    );
  }, [flatTree, searchFilter]);

  const allNodes = useMemo(() => flattenVisible(TREE_DATA, new Set(["foundations", "components", "patterns"])), []);
  const focusedNode = allNodes.find(({ node }) => node.id === focusedId)?.node;

  const navigateTree = useCallback((direction: "up" | "down" | "left" | "right") => {
    const idx = filteredTree.findIndex(({ node }) => node.id === focusedId);
    if (idx === -1) return;

    if (direction === "down") {
      const next = filteredTree[(idx + 1) % filteredTree.length];
      setFocusedId(next.node.id);
    } else if (direction === "up") {
      const next = filteredTree[(idx - 1 + filteredTree.length) % filteredTree.length];
      setFocusedId(next.node.id);
    } else if (direction === "left") {
      if (expandedIds.has(focusedId)) {
        expandedIds.delete(focusedId);
        setExpandedIds(new Set(expandedIds));
      }
    } else if (direction === "right") {
      if (filteredTree.find(({ node }) => node.id === focusedId)?.node.children?.length) {
        expandedIds.add(focusedId);
        setExpandedIds(new Set(expandedIds));
      }
    }
  }, [focusedId, expandedIds, filteredTree]);

  const cycleTab = useCallback((dir: 1 | -1) => {
    const tabs: TabKey[] = ["overview", "properties", "code", "settings"];
    const i = tabs.indexOf(activeTab);
    setActiveTab(tabs[(i + dir + tabs.length) % tabs.length]!);
  }, [activeTab]);

  useInput((e) => {
    if (showFloating) {
      if (e.key === "escape" || e.key === "f") {
        setShowFloating(false);
        return;
      }
      // Still allow 1-4 jumps to tree nodes while floating open
      const shortcuts = ["color", "typography", "spacing", "radius"];
      const digitMap: Record<string, number> = { "1":0, "2":1, "3":2, "4":3 };
      if (e.char && digitMap[e.char] !== undefined) {
        const id = shortcuts[digitMap[e.char]!];
        if (id) { setFocusedId(id); setShowFloating(false); }
        return;
      }
      return;
    }
    if (showHelp) {
      if (e.key === "?" || e.key === "escape" || e.key === "q") {
        setShowHelp(false);
      }
      return;
    }

    if (searchMode) {
      if (e.key === "escape" || e.key === "return") {
        setSearchMode(false);
      } else if (e.key === "backspace") {
        setSearchFilter(s => s.slice(0, -1));
      } else if (e.char && e.char.length === 1 && !e.ctrl && !e.meta) {
        setSearchFilter(s => s + e.char);
      }
      return;
    }

    // Resize mode — arrows grow/shrink the focused pane itself
    if (resizeMode) {
      if (e.key === "escape" || e.key === "capslock" || e.key === "r") {
        setResizeMode(false);
        return;
      }
      if (activePane === "tree") {
        // Tree is left pane. Right = grow rightward. Left = shrink.
        if (e.key === "left" || e.key === "h") setTreeWidth(w => Math.max(15, w - 3));
        if (e.key === "right" || e.key === "l") setTreeWidth(w => Math.min(75, w + 3));
      } else if (activePane === "top") {
        // Top-right: left = grow leftward (tree shrinks). Down = grow downward.
        if (e.key === "left" || e.key === "h") setTreeWidth(w => Math.max(15, w - 3));
        if (e.key === "right" || e.key === "l") setTreeWidth(w => Math.min(75, w + 3));
        if (e.key === "up" || e.key === "k") setTopHeight(h => Math.max(20, h - 5));
        if (e.key === "down" || e.key === "j") setTopHeight(h => Math.min(80, h + 5));
      } else if (activePane === "bottom") {
        // Bottom-right: left = grow leftward (tree shrinks). Up = grow upward.
        if (e.key === "left" || e.key === "h") setTreeWidth(w => Math.max(15, w - 3));
        if (e.key === "right" || e.key === "l") setTreeWidth(w => Math.min(75, w + 3));
        if (e.key === "up" || e.key === "k") setTopHeight(h => Math.max(20, h - 5));
        if (e.key === "down" || e.key === "j") setTopHeight(h => Math.min(80, h + 5));
      }
      return;
    }

    // Global keys
    if (e.ctrl && e.key === "c") { exit(); return; }
    if (e.key === "q") { exit(); return; }
    if (e.key === "?") { setShowHelp(true); return; }
    if (e.key === "/") { setSearchMode(true); return; }
    if (e.key === "f" || (e.ctrl && e.key === "p")) {
      setShowFloating(v => !v);
      return;
    }

    // Resize mode toggle — CapsLock (if terminal sends it) or `r`
    if (e.key === "capslock" || e.key === "r") {
      setResizeMode(true);
      return;
    }

    // Hint mode (Ctrl+Space)
    if (e.ctrl && (e.key === "space" || e.char === " ")) {
      setHintMode(h => !h);
      return;
    }

    // Pane cycle: Tab → tree → top → bottom → tree
    if (e.key === "tab") {
      setActivePane(p => p === "tree" ? "top" : p === "top" ? "bottom" : "tree");
      setHintMode(false);
      return;
    }

    // Number jumps
    const digitMap: Record<string, number> = { "1":0, "2":1, "3":2, "4":3, "5":4, "6":5, "7":6, "8":7, "9":8 };
    if (e.char && digitMap[e.char] !== undefined) {
      const n = digitMap[e.char]!;
      if (hintMode && activePane === "tree" && filteredTree[n]) {
        setFocusedId(filteredTree[n].node.id);
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

    // Pane-specific navigation
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

  const treePixels = Math.floor((width * treeWidth) / 100);

  return (
    <Box flexDirection="column" width={width} height={height}>
      {/* Header */}
      <Box borderStyle="round" borderColor={GREYSCALE.border} paddingX={1}>
        <Text bold color={GREYSCALE.fg}>STORM</Text>
        <Text dim color={GREYSCALE.dim}>  ·  Feature Explorer  ·  </Text>
        <Text color={GREYSCALE.fg}>{focusedNode?.label}</Text>
      </Box>

      {/* Main Content */}
      <Box flex={1} flexDirection="row">
        {/* Tree Pane */}
        <Box
          width={treePixels}
          flexDirection="column"
          borderStyle="round"
          borderColor={activePane === "tree" ? GREYSCALE.borderFocused : GREYSCALE.border}
          paddingX={1}
          paddingTop={1}
        >
          {searchMode && (
            <Box
              flexDirection="row"
              marginBottom={1}
              borderStyle="round"
              borderColor={GREYSCALE.borderFocused}
              paddingX={1}
            >
              <Text dim>/ </Text>
              <Text color={GREYSCALE.fg}>{searchFilter}_</Text>
            </Box>
          )}
          <Text bold dim color={GREYSCALE.dim}>ITEMS</Text>
          <Text dim color={GREYSCALE.dim}>{filteredTree.length} total</Text>
          <Box height={1} />
          <ScrollView flex={1}>
            {filteredTree.length === 0 ? (
              <Text color={GREYSCALE.dim}>no matches</Text>
            ) : (
              filteredTree.map(({ node, level }, i) => (
                <TreeRow
                  key={node.id}
                  node={node}
                  level={level}
                  isFocused={node.id === focusedId}
                  hintKey={hintMode && activePane === "tree" && i < 9 ? String(i + 1) : undefined}
                />
              ))
            )}
          </ScrollView>
        </Box>

        {/* Right column: top + bottom stacked */}
        <Box flexDirection="column" flex={1}>
          {/* Top-right pane */}
          <Box
            flexDirection="column"
            flexGrow={topHeight}
            flexShrink={1}
            flexBasis={0}
            borderStyle="round"
            borderColor={activePane === "top" ? GREYSCALE.borderFocused : GREYSCALE.border}
            paddingX={1}
            paddingTop={1}
          >
            <Box flexDirection="row" gap={1}>
              {(["overview", "properties", "code", "settings"] as TabKey[]).map((k, i) => {
                const labels = { overview: "Overview", properties: "Properties", code: "Code", settings: "Settings" };
                const isActive = activeTab === k;
                const showHint = hintMode && activePane === "top";
                return (
                  <Text
                    key={k}
                    bold={isActive || showHint}
                    dim={!isActive && !showHint}
                    color={showHint ? GREYSCALE.borderFocused : GREYSCALE.fg}
                    backgroundColor={isActive ? GREYSCALE.selectedBg : (showHint ? GREYSCALE.selectedBg : undefined)}
                  >
                    {showHint ? ` [${i + 1}] ${labels[k]} ` : ` ${i + 1} ${labels[k]} `}
                  </Text>
                );
              })}
            </Box>

            <Box flex={1} marginTop={1}>
              {!focusedNode ? (
                <Text color={GREYSCALE.dim}>select an item</Text>
              ) : activeTab === "overview" ? (
                <Box flexDirection="column" gap={1}>
                  <Text bold color={GREYSCALE.fg}>{focusedNode.label}</Text>
                  {focusedNode.data && Object.entries(focusedNode.data).map(([k, v]) => (
                    <Box key={k} flexDirection="row" gap={1}>
                      <Text dim>{k}:</Text>
                      <Text color={GREYSCALE.fg}>
                        {typeof v === "string" ? v : Array.isArray(v) ? v.join(", ") : JSON.stringify(v)}
                      </Text>
                    </Box>
                  ))}
                </Box>
              ) : activeTab === "properties" ? (
                <Box flexDirection="column">
                  <Text dim>id</Text>
                  <Text color={GREYSCALE.fg}>{focusedNode.id}</Text>
                  <Box height={1} />
                  <Text dim>level</Text>
                  <Text color={GREYSCALE.fg}>{flatTree.find(({ node }) => node.id === focusedId)?.level}</Text>
                  <Box height={1} />
                  <Text dim>children</Text>
                  <Text color={GREYSCALE.fg}>{focusedNode.children?.length || 0}</Text>
                </Box>
              ) : activeTab === "code" ? (
                <Box borderStyle="round" borderColor={GREYSCALE.border} padding={1}>
                  <SyntaxHighlight language="typescript" code={CODE_SAMPLE} />
                </Box>
              ) : (
                <Box flexDirection="column" gap={1}>
                  <Text bold color={GREYSCALE.fg}>Settings</Text>
                  <Text dim>Tree width: {treeWidth}%</Text>
                  <Text dim>Filter: {searchFilter || "(none)"}</Text>
                  <Text dim>Expanded nodes: {expandedIds.size}</Text>
                </Box>
              )}
            </Box>
          </Box>

          {/* Bottom-right pane */}
          <Box
            flexDirection="column"
            flexGrow={100 - topHeight}
            flexShrink={1}
            flexBasis={0}
            borderStyle="round"
            borderColor={activePane === "bottom" ? GREYSCALE.borderFocused : GREYSCALE.border}
            paddingX={1}
          >
            <Text bold dim color={GREYSCALE.dim}>STATUS / PREVIEW</Text>
            <Box flexDirection="row" gap={2}>
              <Box flexDirection="column" flex={1}>
                <Box flexDirection="row" gap={1}>
                  <Text dim>pane:</Text>
                  <Text color={GREYSCALE.fg}>{activePane}</Text>
                </Box>
                <Box flexDirection="row" gap={1}>
                  <Text dim>tab:</Text>
                  <Text color={GREYSCALE.fg}>{activeTab}</Text>
                </Box>
                <Box flexDirection="row" gap={1}>
                  <Text dim>hints:</Text>
                  <Text color={GREYSCALE.fg}>{hintMode ? "on" : "off"}</Text>
                </Box>
                <Box flexDirection="row" gap={1}>
                  <Text dim>resize:</Text>
                  <Text color={resizeMode ? GREYSCALE.borderFocused : GREYSCALE.fg} bold={resizeMode}>
                    {resizeMode ? "ON" : "off"}
                  </Text>
                </Box>
              </Box>
              <Box flexDirection="column" flex={1}>
                <Box flexDirection="row" gap={1}>
                  <Text dim>id:</Text>
                  <Text color={GREYSCALE.fg}>{focusedNode?.id ?? "—"}</Text>
                </Box>
                <Box flexDirection="row" gap={1}>
                  <Text dim>label:</Text>
                  <Text color={GREYSCALE.fg}>{focusedNode?.label ?? "—"}</Text>
                </Box>
                <Box flexDirection="row" gap={1}>
                  <Text dim>filter:</Text>
                  <Text color={GREYSCALE.fg}>{searchFilter || "(none)"}</Text>
                </Box>
                <Box flexDirection="row" gap={1}>
                  <Text dim>matches:</Text>
                  <Text color={GREYSCALE.fg}>{filteredTree.length}</Text>
                </Box>
              </Box>
              <Box flexDirection="column" flex={1}>
                <Box flexDirection="row" gap={1}>
                  <Text dim>tree:</Text>
                  <Text color={GREYSCALE.fg}>{treeWidth}%</Text>
                </Box>
                <Box flexDirection="row" gap={1}>
                  <Text dim>top:</Text>
                  <Text color={GREYSCALE.fg}>{topHeight}%</Text>
                </Box>
                <Box flexDirection="row" gap={1}>
                  <Text dim>expanded:</Text>
                  <Text color={GREYSCALE.fg}>{expandedIds.size}/{TREE_DATA.length}</Text>
                </Box>
                <Box flexDirection="row" gap={1}>
                  <Text dim>term:</Text>
                  <Text color={GREYSCALE.fg}>{width}×{height}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer
        bindings={resizeMode ? [
          { key: "arrows", label: `resize ${activePane}` },
          { key: "Esc/r", label: "exit resize" },
        ] : [
          { key: "Tab", label: `pane (${activePane})` },
          { key: "r", label: "resize mode" },
          { key: "C-Spc", label: hintMode ? "hints ON" : "hints" },
          { key: "j/k", label: activePane === "tree" ? "nav" : "—" },
          { key: "h/l", label: activePane === "tree" ? "fold" : activePane === "top" ? "tab" : "—" },
          { key: "f", label: "float panel" },
          { key: "/", label: "search" },
          { key: "?", label: "help" },
          { key: "q", label: "quit" },
        ]}
      />

      {/* Floating pane — absolute-positioned overlay */}
      {showFloating && (
        <Box
          position="absolute"
          top={Math.max(2, Math.floor(height / 2) - 10)}
          left={Math.max(2, Math.floor(width / 2) - 22)}
          width={44}
          flexDirection="column"
          borderStyle="double"
          borderColor={GREYSCALE.borderFocused}
          paddingX={2}
          paddingY={1}
          backgroundColor={GREYSCALE.bg}
        >
          <Text bold color={GREYSCALE.borderFocused}>✦ Quick Panel</Text>
          <Box height={1} />
          <Text dim>Jump to common nodes:</Text>
          <Box flexDirection="column" marginTop={1}>
            <Text><Kbd>1</Kbd>  Color System</Text>
            <Text><Kbd>2</Kbd>  Typography</Text>
            <Text><Kbd>3</Kbd>  Spacing Scale</Text>
            <Text><Kbd>4</Kbd>  Border Radius</Text>
          </Box>
          <Box height={1} />
          <Text bold color={GREYSCALE.fg}>Current</Text>
          <Box flexDirection="row" gap={1}>
            <Text dim>selection:</Text>
            <Text color={GREYSCALE.fg}>{focusedNode?.label ?? "—"}</Text>
          </Box>
          <Box flexDirection="row" gap={1}>
            <Text dim>pane:</Text>
            <Text color={GREYSCALE.fg}>{activePane}</Text>
          </Box>
          <Box height={1} />
          <Text dim>Press <Kbd>f</Kbd> or <Kbd>Esc</Kbd> to close</Text>
        </Box>
      )}

      {/* Help Modal */}
      {showHelp && (
        <Modal
          visible={true}
          onClose={() => setShowHelp(false)}
          title="Help"
          size="md"
        >
          <Box flexDirection="column" gap={1} padding={1}>
            <Text bold color={GREYSCALE.fg}>Panes</Text>
            <Text><Kbd>Tab</Kbd>  — cycle: tree → top-right → bottom-right</Text>
            <Text><Kbd>Ctrl+Space</Kbd>  — toggle shortcut hints</Text>
            <Box height={1} />
            <Text bold color={GREYSCALE.fg}>Tree focused</Text>
            <Text><Kbd>j</Kbd>/<Kbd>k</Kbd> or <Kbd>↓</Kbd>/<Kbd>↑</Kbd>  — nav items</Text>
            <Text><Kbd>h</Kbd>/<Kbd>l</Kbd> or <Kbd>←</Kbd>/<Kbd>→</Kbd>  — fold/unfold</Text>
            <Box height={1} />
            <Text bold color={GREYSCALE.fg}>Top-right focused</Text>
            <Text><Kbd>h</Kbd>/<Kbd>l</Kbd> or <Kbd>←</Kbd>/<Kbd>→</Kbd>  — prev/next tab</Text>
            <Text><Kbd>1</Kbd>-<Kbd>4</Kbd>  — jump to tab</Text>
            <Box height={1} />
            <Text bold color={GREYSCALE.fg}>Resize mode</Text>
            <Text><Kbd>r</Kbd> or <Kbd>CapsLock</Kbd>  — enter resize mode</Text>
            <Text>  arrows resize focused pane; <Kbd>Esc</Kbd> exits</Text>
            <Box height={1} />
            <Text bold color={GREYSCALE.fg}>Other</Text>
            <Text><Kbd>/</Kbd>  — search  ·  <Kbd>?</Kbd>  — help  ·  <Kbd>q</Kbd>  — quit</Text>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

render(<App />).waitUntilExit();
