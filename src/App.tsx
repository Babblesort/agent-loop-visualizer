import { useState, useCallback } from 'react';
import AgentLoopFlow from './components/AgentLoopFlow';
import InfoPanel from './components/InfoPanel';
import type { AgentNodeData } from './types';
import './App.css';

export default function App() {
  const [selectedNode, setSelectedNode] = useState<AgentNodeData | null>(null);
  const [showHitl, setShowHitl] = useState(false);

  const handleNodeSelect = useCallback((data: AgentNodeData | null) => {
    setSelectedNode(data);
  }, []);

  const handleToggleHitl = useCallback(() => {
    setShowHitl((prev) => {
      // If hiding HITL while it's selected, clear the sidebar
      if (prev && selectedNode?.label === 'Human-in-the-Loop') {
        setSelectedNode(null);
      }
      return !prev;
    });
  }, [selectedNode]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-left">
          <span className="app-logo">⟳</span>
          <div>
            <h1 className="app-title">Agentic Harness Loop</h1>
            <p className="app-tagline">
              Interactive diagram of a typical LLM agent execution loop
            </p>
          </div>
        </div>
        <div className="app-header-right">
          <button
            className={`hitl-toggle${showHitl ? ' hitl-toggle--on' : ''}`}
            onClick={handleToggleHitl}
            title={showHitl ? 'Hide Human-in-the-Loop node' : 'Show Human-in-the-Loop node'}
          >
            <span>🙋</span>
            <span>Human-in-the-Loop</span>
            <span className="hitl-toggle-indicator" />
          </button>

        </div>
      </header>

      <div className="app-body">
        <div className="app-canvas">
          <AgentLoopFlow onNodeSelect={handleNodeSelect} showHitl={showHitl} />
        </div>

        <aside className="app-sidebar">
          <InfoPanel selected={selectedNode} />
        </aside>
      </div>
    </div>
  );
}
