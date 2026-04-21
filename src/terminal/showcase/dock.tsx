/**
 * Dock TUI — Pyseas-Dock inspired showcase.
 *
 * Left column: sections tree + calculations list (stacked).
 * Right column: detail pane with I/O / JSON / Guide / Script sub-tabs.
 * Mock data only — no backend. Interactive: pane cycle, edit I/O values
 * with block cursor, working modal overlays (new/open/add), help.
 *
 * Visual style: Pyseas-Dock — no box borders on panes, colored 1-char-wide
 * left strip marks the focused pane, HLine strips separate stacked regions,
 * single-line borders only on floating modals + inline text inputs.
 */

import { useState, useMemo, useCallback, useRef } from "react";
import {
  render,
  Box,
  Text,
  Footer,
  Kbd,
  ScrollView,
  useInput,
  useApp,
  useTerminal,
  useTick,
} from "@orchetron/storm";

let chosenCode = 0;

// --------------------------- Theme ---------------------------
const C = {
  bg: "#0B0B0D",
  fg: "#E4E4E7",
  border: "#52525B",
  borderFocused: "#FAFAFA",
  dim: "#71717A",
  muted: "#52525B",
  selectedBg: "#27272A",
  accent: "#22C55E",
  error: "#EF4444",
  warn: "#F59E0B",
  tabActive: "#FAFAFA",
  headerBg: "#18181B",
};

function VLine({ color = C.border }: { color?: string }) {
  return <Box width={1} backgroundColor={color} />;
}
function HLine({ color = C.border }: { color?: string }) {
  return <Box height={1} backgroundColor={color} />;
}

// --------------------------- Mock data ---------------------------
type Section = {
  id: string;
  label: string;
  kind: "folder" | "file";
  children?: Section[];
  calcRef?: string;
};

const SECTIONS: Section[] = [
  {
    id: "root-loads", label: "Loads", kind: "folder", children: [
      { id: "wind",    label: "Wind Loads",    kind: "file", calcRef: "wind-pressure" },
      { id: "seismic", label: "Seismic",       kind: "file", calcRef: "seismic-base-shear" },
      { id: "dead",    label: "Dead Loads",    kind: "file", calcRef: "dead-load-sum" },
      { id: "live",    label: "Live Loads",    kind: "file", calcRef: "live-load-area" },
    ],
  },
  {
    id: "root-structure", label: "Structure", kind: "folder", children: [
      { id: "beam",   label: "Beam Sizing",    kind: "file", calcRef: "beam-flexure" },
      { id: "column", label: "Column Design",  kind: "file", calcRef: "column-axial" },
      { id: "conn",   label: "Connections",    kind: "file", calcRef: "bolt-group" },
    ],
  },
  {
    id: "root-geotech", label: "Geotechnical", kind: "folder", children: [
      { id: "bear",   label: "Bearing Capacity", kind: "file", calcRef: "terzaghi-bearing" },
      { id: "settle", label: "Settlement",       kind: "file", calcRef: "consolidation" },
    ],
  },
];

type MockCalc = {
  calc_name: string;
  display_name: string;
  category: string;
  description: string;
  inputs: Record<string, { value: number; units: string; label: string }>;
  outputs: Record<string, { value: number; units: string; label: string }>;
  guide: string;
  script: string;
};

const CALCS: MockCalc[] = [
  {
    calc_name: "wind-pressure",
    display_name: "Wind Pressure (ASCE 7)",
    category: "Wind",
    description: "Design wind pressure on low-rise enclosed building.",
    inputs: {
      V:   { value: 115,  units: "mph",   label: "Basic wind speed" },
      Kz:  { value: 0.85, units: "-",     label: "Velocity pressure coeff" },
      Kzt: { value: 1.0,  units: "-",     label: "Topographic factor" },
      Kd:  { value: 0.85, units: "-",     label: "Directionality factor" },
      Ke:  { value: 1.0,  units: "-",     label: "Elevation factor" },
    },
    outputs: {
      qz:  { value: 23.8, units: "psf",   label: "Velocity pressure" },
      p:   { value: 19.1, units: "psf",   label: "Design pressure" },
    },
    guide: "ASCE 7-22 Chapter 26 procedure for Main Wind Force Resisting System.\nApply pressure to enclosed building envelope.",
    script: "// Typst calculation template\n#let V = input.V\n#let qz = 0.00256 * Kz * Kzt * Kd * Ke * V*V\n#let p  = qz * GCp",
  },
  {
    calc_name: "seismic-base-shear",
    display_name: "Seismic Base Shear",
    category: "Seismic",
    description: "ELF procedure base shear V = Cs * W.",
    inputs: {
      SDS: { value: 0.45, units: "g",    label: "Design short-period accel" },
      SD1: { value: 0.20, units: "g",    label: "Design 1-sec accel" },
      R:   { value: 6.0,  units: "-",    label: "Response modification" },
      Ie:  { value: 1.0,  units: "-",    label: "Importance factor" },
      W:   { value: 2400, units: "kip",  label: "Effective seismic weight" },
    },
    outputs: {
      Cs:  { value: 0.075, units: "-",   label: "Seismic response coeff" },
      V:   { value: 180,   units: "kip", label: "Base shear" },
    },
    guide: "ASCE 7 §12.8 Equivalent Lateral Force procedure.",
    script: "#let Cs = min(SDS / (R / Ie), SD1 / (T * R / Ie))\n#let V  = Cs * W",
  },
  {
    calc_name: "dead-load-sum",
    display_name: "Dead Load Summation",
    category: "Gravity",
    description: "Sum of self-weight for floor assembly.",
    inputs: {
      slab:  { value: 75,  units: "psf", label: "Concrete slab" },
      steel: { value: 12,  units: "psf", label: "Steel framing" },
      mech:  { value: 8,   units: "psf", label: "Mech/Electrical" },
      ceil:  { value: 3,   units: "psf", label: "Ceiling" },
    },
    outputs: {
      DL:    { value: 98,  units: "psf", label: "Total dead load" },
    },
    guide: "Per ASCE 7 Table C3.1-1a for typical assemblies.",
    script: "#let DL = slab + steel + mech + ceil",
  },
  {
    calc_name: "live-load-area",
    display_name: "Live Load Reduction",
    category: "Gravity",
    description: "Area-based reduction per ASCE 7 §4.7.",
    inputs: {
      Lo: { value: 50,  units: "psf",  label: "Unreduced live load" },
      AT: { value: 800, units: "ft²",  label: "Tributary area" },
      KLL:{ value: 4,   units: "-",    label: "Live load element factor" },
    },
    outputs: {
      L:  { value: 30.2, units: "psf", label: "Reduced live load" },
    },
    guide: "L = Lo · (0.25 + 15/sqrt(KLL·AT)), not less than 0.5·Lo.",
    script: "#let L = max(Lo * (0.25 + 15/sqrt(KLL*AT)), 0.5 * Lo)",
  },
  {
    calc_name: "beam-flexure",
    display_name: "Beam Flexural Capacity",
    category: "Steel",
    description: "W-shape nominal moment Mn = Fy·Zx (compact LTB OK).",
    inputs: {
      Fy: { value: 50,   units: "ksi",  label: "Yield stress" },
      Zx: { value: 66.5, units: "in³",  label: "Plastic section modulus" },
    },
    outputs: {
      Mn: { value: 277,  units: "kip·ft", label: "Nominal moment" },
      phiMn: { value: 249, units: "kip·ft", label: "Design moment" },
    },
    guide: "AISC F2 compact section, unbraced length within Lp.",
    script: "#let Mn = Fy * Zx / 12\n#let phiMn = 0.9 * Mn",
  },
  {
    calc_name: "column-axial",
    display_name: "Column Axial Capacity",
    category: "Steel",
    description: "Compression capacity AISC E3.",
    inputs: {
      Fy: { value: 50,   units: "ksi", label: "Yield stress" },
      Ag: { value: 14.7, units: "in²", label: "Gross area" },
      KL: { value: 144,  units: "in",  label: "Effective length" },
      r:  { value: 3.72, units: "in",  label: "Radius of gyration" },
    },
    outputs: {
      Pn:    { value: 655, units: "kip", label: "Nominal compression" },
      phiPn: { value: 590, units: "kip", label: "Design compression" },
    },
    guide: "AISC E3 flexural buckling, KL/r governs.",
    script: "#let lambda = KL / r\n#let Fcr = (lambda <= 4.71*sqrt(29000/Fy)) ? ...",
  },
  {
    calc_name: "bolt-group",
    display_name: "Bolt Group Shear",
    category: "Connections",
    description: "Eccentrically loaded bolt group IC method (approx).",
    inputs: {
      n:  { value: 6,   units: "-",   label: "Number of bolts" },
      Fv: { value: 54,  units: "ksi", label: "Bolt shear strength" },
      Ab: { value: 0.44, units: "in²", label: "Bolt area" },
    },
    outputs: {
      Rn: { value: 142.6, units: "kip", label: "Nominal shear" },
    },
    guide: "AISC J3 high-strength bolts, threads excluded.",
    script: "#let Rn = n * Fv * Ab",
  },
  {
    calc_name: "terzaghi-bearing",
    display_name: "Terzaghi Bearing Capacity",
    category: "Soil",
    description: "Ultimate bearing capacity continuous footing.",
    inputs: {
      c:     { value: 150, units: "psf",  label: "Cohesion" },
      gamma: { value: 120, units: "pcf",  label: "Unit weight" },
      B:     { value: 4,   units: "ft",   label: "Footing width" },
      Nc:    { value: 17.7, units: "-",   label: "Bearing factor Nc" },
      Ngam:  { value: 5.0,  units: "-",   label: "Bearing factor Nγ" },
    },
    outputs: {
      qult: { value: 3855, units: "psf", label: "Ultimate capacity" },
      qall: { value: 1285, units: "psf", label: "Allowable (FS=3)" },
    },
    guide: "qult = c·Nc + 0.5·γ·B·Nγ (continuous, no surcharge).",
    script: "#let qult = c*Nc + 0.5*gamma*B*Ngam\n#let qall = qult / 3",
  },
  {
    calc_name: "consolidation",
    display_name: "Primary Consolidation",
    category: "Soil",
    description: "1-D consolidation settlement of clay layer.",
    inputs: {
      Cc: { value: 0.25, units: "-",   label: "Compression index" },
      e0: { value: 0.85, units: "-",   label: "Initial void ratio" },
      H:  { value: 12,   units: "ft",  label: "Layer thickness" },
      p0: { value: 1800, units: "psf", label: "Initial effective stress" },
      dp: { value: 1200, units: "psf", label: "Stress increase" },
    },
    outputs: {
      S:  { value: 2.1,  units: "in",  label: "Settlement" },
    },
    guide: "Terzaghi 1-D primary consolidation for NC clay.",
    script: "#let S = (Cc * H / (1+e0)) * log10((p0+dp)/p0)",
  },
];

const LIBRARY_CALCS = [
  { id: "wind-pressure",     name: "Wind Pressure",       category: "Wind",        description: "ASCE 7 wind on MWFRS envelope" },
  { id: "seismic-base-shear",name: "Seismic Base Shear",  category: "Seismic",     description: "ELF procedure V = Cs·W" },
  { id: "beam-flexure",      name: "Beam Flexural",       category: "Steel",       description: "AISC F2 Mn = Fy·Zx" },
  { id: "column-axial",      name: "Column Axial",        category: "Steel",       description: "AISC E3 compression" },
  { id: "bolt-group",        name: "Bolt Group",          category: "Connections", description: "IC method eccentric shear" },
  { id: "terzaghi-bearing",  name: "Terzaghi Bearing",    category: "Soil",        description: "Ultimate footing capacity" },
  { id: "consolidation",     name: "Consolidation",       category: "Soil",        description: "1-D primary settlement" },
  { id: "rebar-dev",         name: "Rebar Development",   category: "Concrete",    description: "ACI 318 ld for tension bars" },
  { id: "shear-friction",    name: "Shear Friction",      category: "Concrete",    description: "ACI 318 Vn interface shear" },
];

const RECENT_PROJECTS = [
  { path: "/projects/tower-404",      name: "Tower 404 Frame",     last: "2 hours ago" },
  { path: "/projects/bridge-eastside", name: "Eastside Pedestrian", last: "yesterday" },
  { path: "/projects/retail-shell",    name: "Retail Shell Expansion", last: "3 days ago" },
  { path: "/projects/datacenter-b",    name: "Datacenter B Podium",    last: "last week" },
];

const MOCK_FILES = [
  { filename: "soil-report-2024.pdf",  size_kb: 428.3 },
  { filename: "geotech-memo.docx",     size_kb: 38.1 },
  { filename: "reference-plans.dwg",   size_kb: 1204.7 },
];

const MOCK_IMAGES = [
  { filename: "site-plan.png",       size_kb: 89.2 },
  { filename: "detail-a.png",        size_kb: 41.8 },
  { filename: "load-diagram.svg",    size_kb: 12.4 },
  { filename: "elevation-north.png", size_kb: 134.6 },
];

// --------------------------- Helpers ---------------------------
type FlatItem = { node: Section; level: number };

function flattenVisible(nodes: Section[], expandedIds: Set<string>, level = 0): FlatItem[] {
  const out: FlatItem[] = [];
  for (const node of nodes) {
    const expanded = expandedIds.has(node.id);
    out.push({ node, level });
    if (expanded && node.children) out.push(...flattenVisible(node.children, expandedIds, level + 1));
  }
  return out;
}

// Block cursor: render the char at `cursorIdx` with inverted colors (bg = fg).
// At end-of-string, render a space with inverted colors.
function EditableText({ value, cursorIdx, blink, focused }: {
  value: string;
  cursorIdx: number;
  blink: boolean;
  focused: boolean;
}) {
  if (!focused) return <Text color={C.fg}>{value}</Text>;
  const before = value.slice(0, cursorIdx);
  const atCursor = value[cursorIdx] ?? " ";
  const after = value.slice(cursorIdx + 1);
  return (
    <Box flexDirection="row">
      <Text color={C.fg}>{before}</Text>
      {blink ? (
        <Text color={C.bg} backgroundColor={C.fg}>{atCursor}</Text>
      ) : (
        <Text color={C.fg}>{atCursor}</Text>
      )}
      <Text color={C.fg}>{after}</Text>
    </Box>
  );
}

// --------------------------- App ---------------------------
type MainTab = "calculation" | "files" | "images";
type SubTab = "io" | "json" | "guide" | "script";
type Pane = "tree" | "calcs" | "detail";
type ModalMode = "none" | "new-project" | "open-project" | "add-calc";

const PANE_CYCLE: Pane[] = ["tree", "calcs", "detail"];

function App() {
  const { exit } = useApp();
  const { width, height } = useTerminal();

  const [activePane, setActivePane] = useState<Pane>("tree");
  const [mainTab, setMainTab] = useState<MainTab>("calculation");
  const [subTab, setSubTab] = useState<SubTab>("io");
  const [showHelp, setShowHelp] = useState(false);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["root-loads", "root-structure"]));
  const [focusedSectionId, setFocusedSectionId] = useState("wind");

  const [focusedCalcIdx, setFocusedCalcIdx] = useState(0);

  // I/O editing
  const [focusedIOSide, setFocusedIOSide] = useState<"inputs" | "outputs">("inputs");
  const [focusedInputIdx, setFocusedInputIdx] = useState(0);
  const [focusedOutputIdx, setFocusedOutputIdx] = useState(0);
  const [editingInputField, setEditingInputField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [cursorIdx, setCursorIdx] = useState(0);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [runState, setRunState] = useState<"idle" | "done" | "running">("idle");

  // Modals
  const [modalMode, setModalMode] = useState<ModalMode>("none");
  const [modalInput, setModalInput] = useState("");
  const [modalCursor, setModalCursor] = useState(0);
  const [modalFocusIdx, setModalFocusIdx] = useState(0);
  const [addCalcSearch, setAddCalcSearch] = useState("");

  // Projects (mock)
  const [projectName, setProjectName] = useState("Tower 404 Frame");
  const [activeProjectCalcs, setActiveProjectCalcs] = useState<string[]>(
    CALCS.map(c => c.calc_name),
  );

  // Blinking block cursor
  const blinkRef = useRef(true);
  const [blinkTick, setBlinkTick] = useState(0);
  useTick(500, () => {
    blinkRef.current = !blinkRef.current;
    setBlinkTick(t => t + 1);
  });
  const blink = blinkRef.current;
  void blinkTick; // tick state forces rerender; value unused

  // Derived
  const flatTree = useMemo(() => flattenVisible(SECTIONS, expandedIds), [expandedIds]);
  const calcList = useMemo(
    () => CALCS.filter(c => activeProjectCalcs.includes(c.calc_name)),
    [activeProjectCalcs],
  );
  const focusedCalc = calcList[focusedCalcIdx];
  const inputRows = useMemo(() => focusedCalc
    ? Object.entries(focusedCalc.inputs).map(([field, spec]) => ({
        field, label: spec.label,
        value: editedValues[field] ?? String(spec.value),
        units: spec.units,
        isEdited: field in editedValues,
      }))
    : [], [focusedCalc, editedValues]);
  const outputRows = useMemo(() => focusedCalc
    ? Object.entries(focusedCalc.outputs).map(([field, spec]) => ({
        field, label: spec.label, value: String(spec.value), units: spec.units,
      }))
    : [], [focusedCalc]);

  // Filter add-calc library
  const filteredLibrary = useMemo(() => {
    const q = addCalcSearch.toLowerCase();
    return !q ? LIBRARY_CALCS : LIBRARY_CALCS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q),
    );
  }, [addCalcSearch]);

  // Auto-sync tree selection → calc list
  const navigateTree = useCallback((dir: "up" | "down" | "left" | "right") => {
    const idx = flatTree.findIndex(f => f.node.id === focusedSectionId);
    if (idx === -1) { if (flatTree[0]) setFocusedSectionId(flatTree[0].node.id); return; }
    if (dir === "down") {
      const next = flatTree[(idx + 1) % flatTree.length]!.node;
      setFocusedSectionId(next.id);
      if (next.calcRef) {
        const ci = calcList.findIndex(c => c.calc_name === next.calcRef);
        if (ci >= 0) setFocusedCalcIdx(ci);
      }
    } else if (dir === "up") {
      const next = flatTree[(idx - 1 + flatTree.length) % flatTree.length]!.node;
      setFocusedSectionId(next.id);
      if (next.calcRef) {
        const ci = calcList.findIndex(c => c.calc_name === next.calcRef);
        if (ci >= 0) setFocusedCalcIdx(ci);
      }
    } else if (dir === "left") {
      if (expandedIds.has(focusedSectionId)) {
        setExpandedIds(s => { const n = new Set(s); n.delete(focusedSectionId); return n; });
      }
    } else {
      const node = flatTree[idx]?.node;
      if (node?.children?.length) setExpandedIds(s => new Set([...s, focusedSectionId]));
    }
  }, [focusedSectionId, expandedIds, flatTree, calcList]);

  const cyclePane = useCallback(() => {
    setActivePane(p => PANE_CYCLE[(PANE_CYCLE.indexOf(p) + 1) % PANE_CYCLE.length]!);
  }, []);

  const saveEdit = useCallback(() => {
    if (editingInputField) {
      setEditedValues(v => ({ ...v, [editingInputField]: editValue }));
    }
    setEditingInputField(null);
    setEditValue("");
    setCursorIdx(0);
  }, [editingInputField, editValue]);

  const cancelEdit = useCallback(() => {
    setEditingInputField(null); setEditValue(""); setCursorIdx(0);
  }, []);

  const mockRun = useCallback(() => {
    setRunState("running");
    setTimeout(() => {
      setRunState("done");
      setEditedValues({});
      setTimeout(() => setRunState("idle"), 1400);
    }, 400);
  }, []);

  // --------------------------- Input ---------------------------
  useInput((e) => {
    // 1. Edit mode intercepts everything
    if (editingInputField) {
      if (e.key === "escape") { cancelEdit(); return; }
      if (e.key === "return") { saveEdit(); return; }
      if (e.key === "backspace") {
        if (cursorIdx > 0) {
          setEditValue(v => v.slice(0, cursorIdx - 1) + v.slice(cursorIdx));
          setCursorIdx(i => i - 1);
        }
        return;
      }
      if (e.key === "left") { setCursorIdx(i => Math.max(0, i - 1)); return; }
      if (e.key === "right") { setCursorIdx(i => Math.min(editValue.length, i + 1)); return; }
      if (e.key === "home") { setCursorIdx(0); return; }
      if (e.key === "end") { setCursorIdx(editValue.length); return; }
      if (e.char && e.char.length === 1 && !e.ctrl && !e.meta) {
        setEditValue(v => v.slice(0, cursorIdx) + e.char + v.slice(cursorIdx));
        setCursorIdx(i => i + 1);
        return;
      }
      return;
    }

    // 2. Modal intercepts everything
    if (modalMode !== "none") {
      if (modalMode === "new-project") {
        if (e.key === "escape") { setModalMode("none"); setModalInput(""); setModalCursor(0); return; }
        if (e.key === "return") {
          if (modalInput.trim()) {
            setProjectName(modalInput.trim());
            setActiveProjectCalcs([]);
            setModalMode("none"); setModalInput(""); setModalCursor(0);
          }
          return;
        }
        if (e.key === "backspace") {
          if (modalCursor > 0) {
            setModalInput(v => v.slice(0, modalCursor - 1) + v.slice(modalCursor));
            setModalCursor(i => i - 1);
          }
          return;
        }
        if (e.key === "left") { setModalCursor(i => Math.max(0, i - 1)); return; }
        if (e.key === "right") { setModalCursor(i => Math.min(modalInput.length, i + 1)); return; }
        if (e.char && e.char.length === 1 && !e.ctrl && !e.meta) {
          setModalInput(v => v.slice(0, modalCursor) + e.char + v.slice(modalCursor));
          setModalCursor(i => i + 1);
        }
        return;
      }
      if (modalMode === "open-project") {
        if (e.key === "escape") { setModalMode("none"); return; }
        if (e.key === "j" || e.key === "down") { setModalFocusIdx(i => Math.min(RECENT_PROJECTS.length - 1, i + 1)); return; }
        if (e.key === "k" || e.key === "up") { setModalFocusIdx(i => Math.max(0, i - 1)); return; }
        if (e.key === "return") {
          const p = RECENT_PROJECTS[modalFocusIdx];
          if (p) { setProjectName(p.name); setActiveProjectCalcs(CALCS.map(c => c.calc_name)); }
          setModalMode("none");
          return;
        }
        return;
      }
      if (modalMode === "add-calc") {
        if (e.key === "escape") { setModalMode("none"); setAddCalcSearch(""); return; }
        if (e.key === "j" || e.key === "down") { setModalFocusIdx(i => Math.min(filteredLibrary.length - 1, i + 1)); return; }
        if (e.key === "k" || e.key === "up") { setModalFocusIdx(i => Math.max(0, i - 1)); return; }
        if (e.key === "return") {
          const pick = filteredLibrary[modalFocusIdx];
          if (pick && !activeProjectCalcs.includes(pick.id) && CALCS.find(c => c.calc_name === pick.id)) {
            setActiveProjectCalcs(list => [...list, pick.id]);
          }
          setModalMode("none"); setAddCalcSearch(""); setModalFocusIdx(0);
          return;
        }
        if (e.key === "backspace") { setAddCalcSearch(s => s.slice(0, -1)); setModalFocusIdx(0); return; }
        if (e.char && e.char.length === 1 && !e.ctrl && !e.meta) {
          setAddCalcSearch(s => s + e.char); setModalFocusIdx(0);
        }
        return;
      }
    }

    if (showHelp) {
      if (e.key === "escape" || e.key === "?" || e.key === "q") { setShowHelp(false); return; }
      return;
    }

    // 3. Global
    if (e.ctrl && e.key === "c") { exit(); return; }
    if (e.key === "q" || e.key === "b") { chosenCode = 99; exit(); return; }
    if (e.key === "escape") { chosenCode = 99; exit(); return; }
    if (e.key === "?") { setShowHelp(true); return; }

    // 4. Project-management shortcuts (no pane restriction, any context)
    if (e.char === "n" && !e.ctrl) {
      setModalMode("new-project"); setModalInput(""); setModalCursor(0); return;
    }
    if (e.char === "o" && !e.ctrl) {
      setModalMode("open-project"); setModalFocusIdx(0); return;
    }
    if (e.char === "a" && !e.ctrl && activePane === "calcs") {
      setModalMode("add-calc"); setAddCalcSearch(""); setModalFocusIdx(0); return;
    }

    // 5. Tab cycles panes — strict, always advances
    if (e.key === "tab") { cyclePane(); return; }

    // 6. Pane-specific
    if (activePane === "tree") {
      if (e.key === "j" || e.key === "down")  navigateTree("down");
      else if (e.key === "k" || e.key === "up") navigateTree("up");
      else if (e.key === "h" || e.key === "left") navigateTree("left");
      else if (e.key === "l" || e.key === "right") navigateTree("right");
    } else if (activePane === "calcs") {
      if (e.char && /[1-3]/.test(e.char)) {
        const tabs: MainTab[] = ["calculation", "files", "images"];
        setMainTab(tabs[parseInt(e.char) - 1]!);
        return;
      }
      if (mainTab === "calculation") {
        if (e.key === "j" || e.key === "down") setFocusedCalcIdx(i => Math.min(calcList.length - 1, i + 1));
        else if (e.key === "k" || e.key === "up") setFocusedCalcIdx(i => Math.max(0, i - 1));
      }
    } else if (activePane === "detail") {
      if (e.char && /[1-4]/.test(e.char)) {
        const tabs: SubTab[] = ["io", "json", "guide", "script"];
        setSubTab(tabs[parseInt(e.char) - 1]!);
        return;
      }
      if (e.key === "h" || e.key === "left") {
        const tabs: SubTab[] = ["io", "json", "guide", "script"];
        setSubTab(t => tabs[(tabs.indexOf(t) - 1 + tabs.length) % tabs.length]!);
        return;
      }
      if (e.key === "l" || e.key === "right") {
        const tabs: SubTab[] = ["io", "json", "guide", "script"];
        setSubTab(t => tabs[(tabs.indexOf(t) + 1) % tabs.length]!);
        return;
      }
      if (subTab === "io") {
        if (e.key === "tab" && e.shift) {
          setFocusedIOSide(s => s === "inputs" ? "outputs" : "inputs"); return;
        }
        if (e.key === "j" || e.key === "down") {
          if (focusedIOSide === "inputs") setFocusedInputIdx(i => Math.min(inputRows.length - 1, i + 1));
          else setFocusedOutputIdx(i => Math.min(outputRows.length - 1, i + 1));
        } else if (e.key === "k" || e.key === "up") {
          if (focusedIOSide === "inputs") setFocusedInputIdx(i => Math.max(0, i - 1));
          else setFocusedOutputIdx(i => Math.max(0, i - 1));
        } else if (e.key === "return" && focusedIOSide === "inputs") {
          const row = inputRows[focusedInputIdx];
          if (row) {
            setEditingInputField(row.field);
            setEditValue(row.value);
            setCursorIdx(row.value.length);
          }
        } else if (e.char === "s" && !e.ctrl) {
          if (Object.keys(editedValues).length > 0) mockRun();
        }
      }
    }
  });

  // --------------------------- Render ---------------------------
  const treeWidth = Math.max(26, Math.floor(width * 0.26));

  return (
    <Box flexDirection="column" width={width} height={height} backgroundColor={C.bg}>
      {/* Header */}
      <Box paddingX={1} flexDirection="row" alignItems="center">
        <Text bold color={C.fg}>{projectName}</Text>
        <Text dim color={C.dim}>  ·  </Text>
        <Text dim color={C.dim}>Dock TUI showcase</Text>
        <Box flex={1} />
        <Text dim color={C.dim}>{calcList.length} calcs</Text>
      </Box>
      <HLine />

      {/* Body */}
      <Box flex={1} flexDirection="row">
        {/* Left column: tree + calcs stacked */}
        <Box width={treeWidth} flexDirection="column">
          {/* Tree pane */}
          <Box flexGrow={50} flexShrink={1} flexBasis={0} flexDirection="row">
            <VLine color={activePane === "tree" ? C.borderFocused : C.bg} />
            <Box flex={1} flexDirection="column" paddingX={1} paddingTop={1}>
              <Box flexDirection="row" alignItems="center" gap={1}>
                <Text bold color={activePane === "tree" ? C.borderFocused : C.dim}>
                  {activePane === "tree" ? "▸ " : "  "}SECTIONS {flatTree.length}
                </Text>
              </Box>
              <Box height={1} />
              <ScrollView flex={1}>
                {flatTree.map(({ node, level }) => {
                  const isFocused = node.id === focusedSectionId;
                  const hasChildren = !!node.children?.length;
                  const toggle = hasChildren ? (expandedIds.has(node.id) ? "▼" : "▶") : " ";
                  const icon = node.kind === "folder" ? "▤" : "▢";
                  const indent = "  ".repeat(level);
                  return (
                    <Box key={node.id} flexDirection="row" alignItems="center">
                      <Text
                        color={isFocused ? C.fg : C.fg}
                        backgroundColor={isFocused ? C.selectedBg : undefined}
                        bold={isFocused}
                      >
                        {indent}{toggle} {icon} {node.label}
                      </Text>
                    </Box>
                  );
                })}
              </ScrollView>
            </Box>
          </Box>
          <HLine />
          {/* Calcs pane */}
          <Box flexGrow={50} flexShrink={1} flexBasis={0} flexDirection="row">
            <VLine color={activePane === "calcs" ? C.borderFocused : C.bg} />
            <Box flex={1} flexDirection="column" paddingX={1} paddingTop={1}>
              <Box flexDirection="row" alignItems="center" gap={1}>
                <Text bold color={activePane === "calcs" ? C.borderFocused : C.dim}>
                  {activePane === "calcs" ? "▸ " : "  "}
                </Text>
                {(["calculation", "files", "images"] as MainTab[]).map((t, i) => {
                  const active = mainTab === t;
                  const label = t === "calculation" ? "Calcs" : t === "files" ? "Files" : "Images";
                  return (
                    <Text key={t} color={active ? C.tabActive : C.dim}
                      backgroundColor={active ? C.headerBg : undefined} bold={active}>
                      {` ${i + 1} ${label} `}
                    </Text>
                  );
                })}
              </Box>
              <Box height={1} />
              {mainTab === "calculation" ? (
                <ScrollView flex={1}>
                  {calcList.length === 0
                    ? <Text dim color={C.dim}>no calcs · press <Text color={C.fg}>a</Text> to add</Text>
                    : calcList.map((calc, i) => {
                        const active = i === focusedCalcIdx;
                        return (
                          <Box key={calc.calc_name} flexDirection="row" gap={1} alignItems="center">
                            <Text color={active ? C.accent : C.dim}>{active ? "●" : "○"}</Text>
                            <Text color={C.fg} backgroundColor={active ? C.selectedBg : undefined} bold={active}>
                              {calc.display_name}
                            </Text>
                          </Box>
                        );
                      })
                  }
                </ScrollView>
              ) : mainTab === "files" ? (
                <ScrollView flex={1}>
                  {MOCK_FILES.map(f => (
                    <Box key={f.filename} flexDirection="row" gap={2}>
                      <Text color={C.fg}>{f.filename}</Text>
                      <Box flex={1} />
                      <Text dim color={C.dim}>{f.size_kb.toFixed(1)} KB</Text>
                    </Box>
                  ))}
                </ScrollView>
              ) : (
                <ScrollView flex={1}>
                  {MOCK_IMAGES.map(img => (
                    <Box key={img.filename} flexDirection="row" gap={1}>
                      <Text color={C.fg}>▢ {img.filename}</Text>
                      <Box flex={1} />
                      <Text dim color={C.dim}>{img.size_kb.toFixed(1)} KB</Text>
                    </Box>
                  ))}
                </ScrollView>
              )}
            </Box>
          </Box>
        </Box>

        <VLine />

        {/* Detail pane */}
        <Box flex={1} flexDirection="row">
          <VLine color={activePane === "detail" ? C.borderFocused : C.bg} />
          <Box flex={1} flexDirection="column" paddingX={1} paddingTop={1}>
            <Box flexDirection="row" gap={2} alignItems="center">
              <Text bold color={activePane === "detail" ? C.borderFocused : C.dim}>
                {activePane === "detail" ? "▸" : " "}
              </Text>
              {(["io", "json", "guide", "script"] as SubTab[]).map((k, i) => {
                const labels: Record<SubTab, string> = { io: "I/O", json: "JSON", guide: "Guide", script: "Script" };
                const active = subTab === k;
                return (
                  <Text key={k} color={active ? C.tabActive : C.dim} bold={active}
                    backgroundColor={active ? C.headerBg : undefined}>
                    {` ${i + 1} ${labels[k]} `}
                  </Text>
                );
              })}
              <Box flex={1} />
              {runState === "running" ? <Text color={C.warn}>⟳ running…</Text> :
               runState === "done" ? <Text color={C.accent}>✓ saved + run</Text> :
               Object.keys(editedValues).length > 0 ? <Text dim color={C.dim}>unsaved · <Text color={C.fg}>s</Text> save+run</Text> :
               <Text dim color={C.dim}>s save+run</Text>}
            </Box>
            <Box height={1} />

            {!focusedCalc ? (
              <Text dim color={C.dim}>no calculation selected</Text>
            ) : subTab === "io" ? (
              <IOView
                inputRows={inputRows}
                outputRows={outputRows}
                focusedSide={focusedIOSide}
                focusedInputIdx={focusedInputIdx}
                focusedOutputIdx={focusedOutputIdx}
                editingField={editingInputField}
                editValue={editValue}
                cursorIdx={cursorIdx}
                blink={blink}
                isDetailFocused={activePane === "detail"}
              />
            ) : subTab === "json" ? (
              <ScrollView flex={1}>
                <Text color={C.fg}>{JSON.stringify({
                  inputs: focusedCalc.inputs,
                  outputs: focusedCalc.outputs,
                }, null, 2)}</Text>
              </ScrollView>
            ) : subTab === "guide" ? (
              <ScrollView flex={1}>
                <Text bold color={C.fg}>{focusedCalc.display_name}</Text>
                <Box height={1} />
                <Text dim color={C.dim}>{focusedCalc.category}</Text>
                <Box height={1} />
                <Text color={C.fg}>{focusedCalc.description}</Text>
                <Box height={1} />
                {focusedCalc.guide.split("\n").map((line, i) => (
                  <Text key={i} color={C.fg}>{line}</Text>
                ))}
              </ScrollView>
            ) : (
              <ScrollView flex={1}>
                {focusedCalc.script.split("\n").map((line, i) => (
                  <Box key={i} flexDirection="row">
                    <Text dim color={C.dim}>{String(i + 1).padStart(3, " ")}</Text>
                    <Text>  </Text>
                    <Text color={C.fg}>{line}</Text>
                  </Box>
                ))}
              </ScrollView>
            )}
          </Box>
        </Box>
      </Box>

      <HLine />

      {/* Status bar */}
      <Box paddingX={1} flexDirection="row">
        <Text color={C.accent}>● mock data</Text>
        <Text dim color={C.dim}>  ·  </Text>
        <Text dim color={C.dim}>pane: </Text>
        <Text color={C.fg}>{activePane}</Text>
        <Text dim color={C.dim}>  ·  </Text>
        <Text dim color={C.dim}>section: </Text>
        <Text color={C.fg}>{focusedSectionId}</Text>
        <Text dim color={C.dim}>  ·  </Text>
        <Text dim color={C.dim}>calc: </Text>
        <Text color={C.fg}>{focusedCalc?.display_name ?? "—"}</Text>
        <Box flex={1} />
        {editingInputField && <Text color={C.warn} bold>EDITING</Text>}
        {modalMode !== "none" && <Text color={C.warn} bold>{modalMode.toUpperCase()}</Text>}
      </Box>

      <Footer
        bindings={
          editingInputField
            ? [
                { key: "←/→", label: "cursor" },
                { key: "Home/End", label: "line" },
                { key: "Enter", label: "save" },
                { key: "Esc", label: "cancel" },
              ]
            : modalMode !== "none"
            ? [
                { key: "j/k", label: "navigate" },
                { key: "Enter", label: "confirm" },
                { key: "Esc", label: "cancel" },
              ]
            : [
                { key: "Tab", label: `pane (${activePane})` },
                { key: "j/k", label: "nav" },
                { key: "Enter", label: activePane === "detail" && subTab === "io" ? "edit" : "—" },
                { key: "n/o", label: "new/open" },
                { key: "a", label: "add calc" },
                { key: "?", label: "help" },
                { key: "q/Esc", label: "back" },
              ]
        }
      />

      {/* Modal overlays */}
      {modalMode === "new-project" && (
        <ModalBox width={56} top={Math.max(2, Math.floor(height / 2) - 6)} left={Math.max(2, Math.floor(width / 2) - 28)}>
          <Text bold color={C.borderFocused}>New Project</Text>
          <Box height={1} />
          <Text dim color={C.dim}>Project name:</Text>
          <Box flexDirection="row" borderStyle="single" borderColor={C.borderFocused} paddingX={1} marginTop={1}>
            <EditableText value={modalInput} cursorIdx={modalCursor} blink={blink} focused />
          </Box>
          <Box height={1} />
          <Text dim color={C.dim}>Enter confirm · Esc cancel</Text>
        </ModalBox>
      )}

      {modalMode === "open-project" && (
        <ModalBox width={60} top={Math.max(2, Math.floor(height / 2) - 10)} left={Math.max(2, Math.floor(width / 2) - 30)}>
          <Text bold color={C.borderFocused}>Open Project</Text>
          <Box height={1} />
          <ScrollView height={8}>
            {RECENT_PROJECTS.map((p, i) => (
              <Box key={p.path} flexDirection="row" gap={1}>
                <Text color={C.fg}
                  backgroundColor={i === modalFocusIdx ? C.selectedBg : undefined}
                  bold={i === modalFocusIdx}>
                  {` ${p.name.padEnd(26)} `}
                </Text>
                <Text dim color={C.dim}>{p.last}</Text>
              </Box>
            ))}
          </ScrollView>
          <Box height={1} />
          {RECENT_PROJECTS[modalFocusIdx] && (
            <Text dim color={C.dim}>{RECENT_PROJECTS[modalFocusIdx]!.path}</Text>
          )}
          <Box height={1} />
          <Text dim color={C.dim}>j/k navigate · Enter open · Esc cancel</Text>
        </ModalBox>
      )}

      {modalMode === "add-calc" && (
        <ModalBox width={64} top={Math.max(2, Math.floor(height / 2) - 12)} left={Math.max(2, Math.floor(width / 2) - 32)}>
          <Text bold color={C.borderFocused}>Add Calculation</Text>
          <Box height={1} />
          <Box flexDirection="row" borderStyle="single" borderColor={C.borderFocused} paddingX={1}>
            <Text dim color={C.dim}>/ </Text>
            <Text color={C.fg}>{addCalcSearch}</Text>
          </Box>
          <Box height={1} />
          {filteredLibrary.length === 0 ? (
            <Text dim color={C.dim}>no matches</Text>
          ) : (
            <ScrollView height={10}>
              {filteredLibrary.map((item, i) => {
                const focused = i === modalFocusIdx;
                const alreadyAdded = activeProjectCalcs.includes(item.id);
                return (
                  <Box key={item.id} flexDirection="row" gap={1}
                    backgroundColor={focused ? C.selectedBg : undefined}>
                    <Text color={focused ? C.tabActive : C.fg} bold={focused}>
                      {` ${item.name.padEnd(22)} `}
                    </Text>
                    <Text dim color={C.dim}>{item.category.padEnd(14)}</Text>
                    {alreadyAdded && <Text color={C.accent}>✓</Text>}
                  </Box>
                );
              })}
            </ScrollView>
          )}
          <Box height={1} />
          {filteredLibrary[modalFocusIdx]?.description && (
            <Text dim color={C.dim}>{filteredLibrary[modalFocusIdx]!.description}</Text>
          )}
          <Box height={1} />
          <Text dim color={C.dim}>type to filter · j/k navigate · Enter add · Esc cancel</Text>
        </ModalBox>
      )}

      {showHelp && (
        <ModalBox width={60} top={2} left={Math.max(2, Math.floor(width / 2) - 30)}>
          <Text bold color={C.borderFocused}>Help — Dock TUI</Text>
          <Box height={1} />
          <Text bold color={C.fg}>Panes</Text>
          <Text><Kbd>Tab</Kbd> cycle: tree → calcs → detail</Text>
          <Text><Kbd>j</Kbd>/<Kbd>k</Kbd> nav  <Kbd>h</Kbd>/<Kbd>l</Kbd> fold/tabs</Text>
          <Box height={1} />
          <Text bold color={C.fg}>I/O editing (detail focused)</Text>
          <Text><Kbd>Enter</Kbd> edit input value  <Kbd>←</Kbd>/<Kbd>→</Kbd> cursor</Text>
          <Text><Kbd>Home</Kbd>/<Kbd>End</Kbd> line ends  <Kbd>s</Kbd> save+run</Text>
          <Box height={1} />
          <Text bold color={C.fg}>Project</Text>
          <Text><Kbd>n</Kbd> new  <Kbd>o</Kbd> open  <Kbd>a</Kbd> add calc (calcs pane)</Text>
          <Box height={1} />
          <Text bold color={C.fg}>Other</Text>
          <Text><Kbd>?</Kbd> help  <Kbd>q</Kbd>/<Kbd>Esc</Kbd> back</Text>
        </ModalBox>
      )}
    </Box>
  );
}

// --------------------------- I/O view ---------------------------
type IORow = { field: string; label: string; value: string; units: string; isEdited?: boolean };

function IOView({
  inputRows, outputRows, focusedSide, focusedInputIdx, focusedOutputIdx,
  editingField, editValue, cursorIdx, blink, isDetailFocused,
}: {
  inputRows: IORow[];
  outputRows: IORow[];
  focusedSide: "inputs" | "outputs";
  focusedInputIdx: number;
  focusedOutputIdx: number;
  editingField: string | null;
  editValue: string;
  cursorIdx: number;
  blink: boolean;
  isDetailFocused: boolean;
}) {
  return (
    <Box flexDirection="row" gap={3} flex={1}>
      <Box flexDirection="column" flex={1}>
        <Text bold color={isDetailFocused && focusedSide === "inputs" ? C.tabActive : C.dim}>Inputs</Text>
        <Box height={1} />
        <Box flexDirection="row" gap={1}>
          <Box width={22}><Text dim bold color={C.dim}>FIELD</Text></Box>
          <Box width={12}><Text dim bold color={C.dim}>VALUE</Text></Box>
          <Box width={8}><Text dim bold color={C.dim}>UNIT</Text></Box>
        </Box>
        <ScrollView flex={1}>
          {inputRows.length === 0 ? <Text dim color={C.dim}>no inputs</Text> :
            inputRows.map((row, i) => {
              const focused = isDetailFocused && focusedSide === "inputs" && i === focusedInputIdx;
              const editing = editingField === row.field;
              return (
                <Box key={row.field} flexDirection="row" gap={1} alignItems="center"
                  backgroundColor={focused ? C.selectedBg : undefined}>
                  <Box width={22}>
                    <Text color={row.isEdited ? C.accent : C.fg}>{row.label}</Text>
                  </Box>
                  <Box width={12}>
                    {editing ? (
                      <EditableText value={editValue} cursorIdx={cursorIdx} blink={blink} focused />
                    ) : (
                      <Text color={focused ? C.tabActive : C.fg}>{row.value}</Text>
                    )}
                  </Box>
                  <Box width={8}><Text dim color={C.dim}>{row.units}</Text></Box>
                </Box>
              );
            })
          }
        </ScrollView>
      </Box>
      <Box flexDirection="column" flex={1}>
        <Text bold color={isDetailFocused && focusedSide === "outputs" ? C.tabActive : C.dim}>Outputs</Text>
        <Box height={1} />
        <Box flexDirection="row" gap={1}>
          <Box width={22}><Text dim bold color={C.dim}>FIELD</Text></Box>
          <Box width={12}><Text dim bold color={C.dim}>VALUE</Text></Box>
          <Box width={8}><Text dim bold color={C.dim}>UNIT</Text></Box>
        </Box>
        <ScrollView flex={1}>
          {outputRows.length === 0 ? <Text dim color={C.dim}>no outputs</Text> :
            outputRows.map((row, i) => {
              const focused = isDetailFocused && focusedSide === "outputs" && i === focusedOutputIdx;
              return (
                <Box key={row.field} flexDirection="row" gap={1} alignItems="center"
                  backgroundColor={focused ? C.selectedBg : undefined}>
                  <Box width={22}><Text color={C.fg}>{row.label}</Text></Box>
                  <Box width={12}><Text color={focused ? C.tabActive : C.fg}>{row.value}</Text></Box>
                  <Box width={8}><Text dim color={C.dim}>{row.units}</Text></Box>
                </Box>
              );
            })
          }
        </ScrollView>
      </Box>
    </Box>
  );
}

// --------------------------- Modal overlay box ---------------------------
function ModalBox({
  children, width, top, left,
}: {
  children: React.ReactNode;
  width: number;
  top: number;
  left: number;
}) {
  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      width={width}
      flexDirection="column"
      borderStyle="double"
      borderColor={C.borderFocused}
      backgroundColor={C.bg}
      paddingX={2}
      paddingY={1}
    >
      {children}
    </Box>
  );
}

render(<App />).waitUntilExit().then(() => process.exit(chosenCode));
