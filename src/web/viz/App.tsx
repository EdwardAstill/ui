import React, { useEffect, useState } from "react";
import { registry, TOPIC_LABEL, TOPIC_ORDER, vizById, vizByTopic } from "./registry";

const STORAGE = {
  viz: "viz-active-id",
};

function readStored(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function VizPanel() {
  const [activeVizId, setActiveVizId] = useState<string>(readStored(STORAGE.viz, registry[0]!.id));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE.viz, activeVizId);
    } catch {}
  }, [activeVizId]);

  const grouped = vizByTopic();
  const activeViz = vizById(activeVizId) || registry[0]!;
  const ActiveViz = activeViz.Component;

  return (
    <div className="viz-root viz-root-embedded">
      <div className="viz-panel-head">
        <div>
          <h2>Visualizations</h2>
          <p>{registry.length} interactive JSX demos using the selected site theme.</p>
        </div>
        <span>{activeViz.description}</span>
      </div>

      <div className="viz-picker">
        {TOPIC_ORDER.map((topic) => {
          const items = grouped[topic];
          if (!items.length) return null;
          return (
            <section className="viz-picker-group" key={topic}>
              <div className="viz-sidebar-section">{TOPIC_LABEL[topic]}</div>
              <div className="viz-picker-items">
                {items.map((v) => (
                  <button
                    key={v.id}
                    className={`viz-chip${v.id === activeVizId ? " active" : ""}`}
                    onClick={() => setActiveVizId(v.id)}
                    title={v.description}
                  >
                    <span className="viz-emoji">{v.emoji}</span>
                    <span>{v.title}</span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="viz-main viz-main-embedded">
        <ActiveViz />
      </div>
    </div>
  );
}
