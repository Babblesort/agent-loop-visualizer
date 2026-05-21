import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { AgentNodeData } from '../types';

function AgentNode({ data, selected }: NodeProps & { data: AgentNodeData }) {
  return (
    <div
      className={`agent-node${selected ? ' selected' : ''}`}
      style={{ '--accent': data.color } as React.CSSProperties}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} id="left-target" />
      <div className="agent-node-icon">{data.icon}</div>
      <div className="agent-node-body">
        <div className="agent-node-label">{data.label}</div>
        <div className="agent-node-subtitle">{data.subtitle}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right-source" />
    </div>
  );
}

export default memo(AgentNode);
