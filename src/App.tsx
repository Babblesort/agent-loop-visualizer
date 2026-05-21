import { useState, useCallback } from 'react';
import AgentLoopFlow from './components/AgentLoopFlow';
import InfoPanel from './components/InfoPanel';
import type { AgentNodeData } from './types';
import './App.css';

export default function App() {
  const [selectedNode, setSelectedNode] = useState<AgentNodeData | null>(null);

  const handleNodeSelect = useCallback((data: AgentNodeData | null) => {
    setSelectedNode(data);
  }, []);

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
          <span className="app-badge">React Flow</span>
          <span className="app-badge app-badge--dim">Click nodes to explore</span>
        </div>
      </header>

      <div className="app-body">
        <div className="app-canvas">
          <AgentLoopFlow onNodeSelect={handleNodeSelect} />
        </div>

        <aside className="app-sidebar">
          <InfoPanel selected={selectedNode} />
        </aside>
      </div>
    </div>
  );
}
