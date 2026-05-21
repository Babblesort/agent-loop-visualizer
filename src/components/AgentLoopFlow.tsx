import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type NodeMouseHandler,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import AgentNode from '../nodes/AgentNode';
import { initialNodes, initialEdges } from '../data/flowData';
import type { AgentNodeData } from '../types';

const nodeTypes = { agentNode: AgentNode };


const HITL_NODE_ID = 'hitl';
const HITL_EDGE_IDS = new Set(['e-llm-hitl', 'e-hitl-llm']);

interface AgentLoopFlowProps {
  onNodeSelect: (data: AgentNodeData | null) => void;
  showHitl: boolean;
}

export default function AgentLoopFlow({ onNodeSelect, showHitl }: AgentLoopFlowProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const visibleNodes = useMemo(
    () => (showHitl ? nodes : nodes.filter((n) => n.id !== HITL_NODE_ID)),
    [nodes, showHitl],
  );

  const visibleEdges = useMemo(
    () => (showHitl ? edges : edges.filter((e) => !HITL_EDGE_IDS.has(e.id))),
    [edges, showHitl],
  );

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      onNodeSelect(node.data as AgentNodeData);
    },
    [onNodeSelect],
  );

  const handlePaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  const flowStyle = useMemo(
    () => ({ background: '#070c18' }),
    [],
  );

  return (
    <ReactFlow
      nodes={visibleNodes}
      edges={visibleEdges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick}
      onPaneClick={handlePaneClick}
      style={flowStyle}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.4}
      maxZoom={2}
      attributionPosition="bottom-left"
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={24}
        size={1}
        color="#1e2d4a"
      />
      <Controls
        style={{
          background: '#0d1526',
          border: '1px solid #1e2d4a',
          borderRadius: 8,
        }}
      />

    </ReactFlow>
  );
}
