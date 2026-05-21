import type { AgentNodeData } from '../types';

interface InfoPanelProps {
  selected: AgentNodeData | null;
}

export default function InfoPanel({ selected }: InfoPanelProps) {
  if (!selected) {
    return (
      <div className="info-panel info-panel--empty">
        <div className="info-panel-hint-icon">🔍</div>
        <h3>Explore the Harness Loop</h3>
        <p>
          Click any node on the diagram to learn how that component
          fits into the agentic harness loop.
        </p>
        <div className="info-panel-legend">
          <div className="legend-section">
            <div className="legend-title">Reading the diagram</div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#8b5cf6' }} />
              Purple — configuration layer
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#3b82f6' }} />
              Blue — human input
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#f59e0b' }} />
              Amber — LLM inference
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#06b6d4' }} />
              Cyan — tool call request
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#10b981' }} />
              Green — tool execution &amp; output
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#f97316' }} />
              Orange — human-in-the-loop gate
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#22c55e' }} />
              Emerald — final response
            </div>
          </div>
          <div className="legend-section">
            <div className="legend-title">Edge annotations</div>
            <div className="legend-item">① LLM decides what to do next</div>
            <div className="legend-item">② Inner loop starts — tool dispatched or human queried</div>
            <div className="legend-item">③ Executor returns raw result</div>
            <div className="legend-item">④ Tool result fed back → re-inference</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="info-panel">
      <div
        className="info-panel-header"
        style={{ borderLeftColor: selected.color }}
      >
        <span className="info-panel-icon">{selected.icon}</span>
        <div>
          <h2 className="info-panel-title">{selected.label}</h2>
          <div className="info-panel-subtitle">{selected.subtitle}</div>
        </div>
      </div>

      <div className="info-panel-description">{selected.description}</div>

      <div className="info-panel-details">
        <div className="info-panel-details-title">Key points</div>
        <ul>
          {selected.details.map((d, i) => (
            <li key={i} style={{ '--bullet': selected.color } as React.CSSProperties}>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
