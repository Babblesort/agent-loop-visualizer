import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type NodeMouseHandler,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import AgentNode from '../nodes/AgentNode';
import { initialNodes, initialEdges } from '../data/flowData';
import type { AgentNodeData } from '../types';

const nodeTypes = { agentNode: AgentNode };

const miniMapNodeColor = (node: Node) => {
  const data = node.data as AgentNodeData;
  return data?.color ?? '#334155';
};

interface AgentLoopFlowProps {
  onNodeSelect: (data: AgentNodeData | null) => void;
}

export default function AgentLoopFlow({ onNodeSelect }: AgentLoopFlowProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

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
      nodes={nodes}
      edges={edges}
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
      <MiniMap
        nodeColor={miniMapNodeColor}
        style={{
          background: '#0d1526',
          border: '1px solid #1e2d4a',
          borderRadius: 8,
        }}
        maskColor="rgba(7,12,24,0.7)"
      />
    </ReactFlow>
  );
}
