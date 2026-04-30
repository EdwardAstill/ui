import type { FC } from "react";

import { MatrixTransformation } from "./widgets/matrix-transformation";
import { DistributionExplorer } from "./widgets/distribution-explorer";
import { NeuronFiring } from "./widgets/neuron-firing";
import { ForceGraph } from "./widgets/force-graph";
import { SortTracer } from "./widgets/sort-tracer";
import { GradientDescent } from "./widgets/gradient-descent";
import { FourierBuilder } from "./widgets/fourier-builder";
import { BayesCoin } from "./widgets/bayes-coin";
import { CellularAutomaton } from "./widgets/cellular-automaton";
import { DijkstraPathfinder } from "./widgets/dijkstra-pathfinder";
import { KMeansClustering } from "./widgets/kmeans-clustering";
import { WaveInterference } from "./widgets/wave-interference";
import { LorenzAttractor } from "./widgets/lorenz-attractor";

export type VizTopic =
  | "math"
  | "stats"
  | "biology"
  | "cs"
  | "systems"
  | "signals";

export interface VizEntry {
  id: string;
  title: string;
  topic: VizTopic;
  emoji: string;
  description: string;
  Component: FC;
}

export const TOPIC_LABEL: Record<VizTopic, string> = {
  math: "Mathematics",
  stats: "Statistics",
  biology: "Biology",
  cs: "Computer Science",
  systems: "Systems & Dynamics",
  signals: "Signals & Waves",
};

export const TOPIC_ORDER: VizTopic[] = ["math", "stats", "biology", "cs", "systems", "signals"];

export const registry: VizEntry[] = [
  {
    id: "matrix-transformation",
    title: "Matrix Transformation",
    topic: "math",
    emoji: "🔢",
    description: "Drag basis vectors î and ĵ. Watch the plane warp and decompose into rotate × scale × shear.",
    Component: MatrixTransformation,
  },
  {
    id: "gradient-descent",
    title: "Gradient Descent",
    topic: "math",
    emoji: "⛰️",
    description: "Drop a marble on a 2-D loss surface. Step through gradient descent vs. momentum vs. Adam.",
    Component: GradientDescent,
  },
  {
    id: "lorenz-attractor",
    title: "Lorenz Attractor",
    topic: "math",
    emoji: "🦋",
    description: "The classic chaotic system. Two trajectories, tiny perturbation, exponential divergence.",
    Component: LorenzAttractor,
  },
  {
    id: "distribution-explorer",
    title: "Distribution Explorer",
    topic: "stats",
    emoji: "📊",
    description: "Morph between Normal/Beta/Gamma/Exponential. Drag cursors to integrate P(a < X < b).",
    Component: DistributionExplorer,
  },
  {
    id: "bayes-coin",
    title: "Bayesian Coin",
    topic: "stats",
    emoji: "🪙",
    description: "Flip a biased coin. Watch the Beta posterior tighten around the true bias.",
    Component: BayesCoin,
  },
  {
    id: "kmeans-clustering",
    title: "K-Means Clustering",
    topic: "stats",
    emoji: "🎯",
    description: "Click to drop points. Watch centroids hunt for cluster centres in real time.",
    Component: KMeansClustering,
  },
  {
    id: "neuron-firing",
    title: "Neuron Firing",
    topic: "biology",
    emoji: "🧠",
    description: "Leaky integrate-and-fire neurons (single and coupled). Click to inject current; watch spike rasters.",
    Component: NeuronFiring,
  },
  {
    id: "sort-tracer",
    title: "Sort Tracer",
    topic: "cs",
    emoji: "🔀",
    description: "Step through Bubble, Insertion, Selection, Quick, Merge, and Heap sort. Live op counts.",
    Component: SortTracer,
  },
  {
    id: "dijkstra-pathfinder",
    title: "Pathfinder (BFS / Dijkstra / A*)",
    topic: "cs",
    emoji: "🗺️",
    description: "Draw walls on a grid. Switch between BFS, Dijkstra, and A* — see the explored area shrink.",
    Component: DijkstraPathfinder,
  },
  {
    id: "cellular-automaton",
    title: "Cellular Automaton",
    topic: "systems",
    emoji: "🧬",
    description: "Elementary rules (30, 90, 110) and Conway's Game of Life. Edit the seed and step.",
    Component: CellularAutomaton,
  },
  {
    id: "force-graph",
    title: "Force-Directed Graph",
    topic: "systems",
    emoji: "🕸️",
    description: "Random / ring / small-world / scale-free generators. Drag nodes; live degree histogram.",
    Component: ForceGraph,
  },
  {
    id: "fourier-builder",
    title: "Fourier Builder",
    topic: "signals",
    emoji: "🌊",
    description: "Stack sine harmonics. Watch a square wave emerge as you add terms.",
    Component: FourierBuilder,
  },
  {
    id: "wave-interference",
    title: "Wave Interference",
    topic: "signals",
    emoji: "💧",
    description: "Two-source interference pattern. Drag the sources, slide frequency and phase.",
    Component: WaveInterference,
  },
];

export function vizById(id: string): VizEntry | undefined {
  return registry.find((v) => v.id === id);
}

export function vizByTopic(): Record<VizTopic, VizEntry[]> {
  const out: Record<VizTopic, VizEntry[]> = {
    math: [],
    stats: [],
    biology: [],
    cs: [],
    systems: [],
    signals: [],
  };
  for (const v of registry) out[v.topic].push(v);
  return out;
}
