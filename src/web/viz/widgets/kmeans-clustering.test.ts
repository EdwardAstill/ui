import { describe, expect, test } from "bun:test";
import {
  buildDecisionCells,
  calculateInertia,
  clampToStage,
  clearClusterAssignments,
  nearestIndex,
  updatePointAt,
  type Pt,
} from "./kmeans-clustering";

describe("k-means clustering helpers", () => {
  test("clears stale cluster assignments when k changes", () => {
    const assigned: Pt[] = [
      { x: 12, y: 20, c: 4 },
      { x: 40, y: 80, c: 0 },
    ];

    expect(clearClusterAssignments(assigned)).toEqual([
      { x: 12, y: 20 },
      { x: 40, y: 80 },
    ]);
  });

  test("inertia ignores stale assignments outside the current centroid list", () => {
    const points: Pt[] = [{ x: 12, y: 20, c: 4 }];
    const centroids: Pt[] = [{ x: 10, y: 20 }];

    expect(calculateInertia(points, centroids)).toBe(0);
  });

  test("clamps dragged points to the visible stage", () => {
    expect(clampToStage({ x: -10, y: 140 }, 100, 120)).toEqual({ x: 0, y: 120 });
    expect(clampToStage({ x: 40, y: 50 }, 100, 120)).toEqual({ x: 40, y: 50 });
  });

  test("finds the nearest draggable item within a hit radius", () => {
    const points: Pt[] = [
      { x: 10, y: 10 },
      { x: 80, y: 80 },
    ];

    expect(nearestIndex(points, { x: 76, y: 80 }, 10)).toBe(1);
    expect(nearestIndex(points, { x: 50, y: 50 }, 8)).toBeUndefined();
  });

  test("updates a single point and clears its old assignment", () => {
    const points: Pt[] = [
      { x: 10, y: 10, c: 2 },
      { x: 20, y: 20, c: 0 },
    ];

    expect(updatePointAt(points, 0, { x: 30, y: 40 })).toEqual([
      { x: 30, y: 40 },
      { x: 20, y: 20, c: 0 },
    ]);
  });

  test("builds decision cells for nearest-centroid regions", () => {
    const cells = buildDecisionCells([{ x: 0, y: 0 }, { x: 100, y: 0 }], 100, 20, 50);

    expect(cells).toEqual([
      { x: 0, y: 0, c: 0, size: 50 },
      { x: 50, y: 0, c: 1, size: 50 },
    ]);
  });
});
