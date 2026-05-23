import type { Node, Edge } from '@xyflow/react';
import type { AgentNodeData } from '../types';

export const initialNodes: Node<AgentNodeData>[] = [
  {
    id: 'system-prompt',
    type: 'agentNode',
    position: { x: 55, y: 20 },
    data: {
      label: 'System Prompt',
      subtitle: 'Persistent context & constraints',
      icon: '⚙️',
      color: '#8b5cf6',
      description:
        'The system prompt is the foundational layer of every agentic harness. It establishes the LLM\'s persona, operational scope, available tools (with their schemas), behavioral constraints, and any persistent instructions that apply to every turn. The harness injects it at the very beginning of the context window on each inference call — before the conversation history and before the current user message.',
      details: [
        'Defines agent role, persona, and identity',
        'Declares available tool schemas and usage instructions',
        'Sets safety and operational boundaries',
        'Injected fresh on every inference call',
        'Changes here affect ALL subsequent turns in the loop',
      ],
    },
  },
  {
    id: 'user-prompt',
    type: 'agentNode',
    position: { x: 520, y: 20 },
    data: {
      label: 'User Prompt',
      subtitle: 'Current turn input',
      icon: '💬',
      color: '#3b82f6',
      description:
        'The user prompt is the current-turn input — the task, question, or instruction driving this iteration of the loop. In an agentic system this might come from a human typing in a UI, a Slack message, a webhook payload, or even the output of an orchestrating parent agent. Combined with the system prompt and accumulated conversation history, it forms the complete context window the LLM sees.',
      details: [
        'The immediate trigger for this inference round',
        'Can originate from a human, API call, or parent agent',
        'Appended to conversation history after the system prompt',
        'May include attachments, files, or structured data',
        'Scope narrows as conversation history grows',
      ],
    },
  },
  {
    id: 'llm',
    type: 'agentNode',
    position: { x: 285, y: 190 },
    data: {
      label: 'LLM Inference',
      subtitle: 'Core reasoning engine',
      icon: '🧠',
      color: '#f59e0b',
      description:
        'The LLM is the reasoning heart of the harness. On each call it receives the complete context window — system prompt, conversation history, tool results from prior turns, and the current input — and produces one of three outputs: (1) a final text response signalling the task is done, (2) one or more structured tool call requests, or (3) a request that the harness pause and seek human approval. The harness inspects the response and routes accordingly, determining whether to re-enter the loop or deliver a final answer.',
      details: [
        'Receives full context: system + history + tool results + current input',
        'Outputs a final response OR tool call requests OR HITL gate trigger',
        'Can batch multiple tool calls in a single inference turn',
        'The harness re-invokes it after each tool result is appended',
        'Context window grows each turn; compaction may occur',
      ],
    },
  },
  {
    id: 'tool-request',
    type: 'agentNode',
    position: { x: 156, y: 551 },
    data: {
      label: 'Tool Call Request',
      subtitle: 'Structured function invocation',
      icon: '🔧',
      color: '#06b6d4',
      description:
        'When the LLM determines it needs external capability — searching the web, querying a database, running code, reading a file — it emits a structured tool call: a JSON object containing the tool name and typed parameters. The harness intercepts this before it ever reaches the user, validates the schema, and dispatches it to the appropriate executor. Multiple tool calls can be requested in a single inference turn and are often executed in parallel.',
      details: [
        'Structured JSON: { name, arguments } per the declared schema',
        'Harness validates parameters before execution',
        'Multiple tool calls can be batched in one turn',
        'Parallel execution is possible for independent calls',
        'Each call gets a unique ID for result correlation',
      ],
    },
  },
  {
    id: 'hitl',
    type: 'agentNode',
    position: { x: 281, y: 299 },
    data: {
      label: 'Human-in-the-Loop',
      subtitle: 'Approval gate',
      icon: '🙋',
      color: '#f97316',
      description:
        'The human-in-the-loop (HITL) gate is a harness-enforced pause point. It triggers when the LLM or the harness itself determines that proceeding requires explicit human authorization — for example before executing a destructive action, making an irreversible API call, accessing sensitive data, or when the agent\'s confidence is below a threshold. The harness surfaces the pending action to a human reviewer and blocks until an approved or rejected decision arrives. An approval resumes the loop; a rejection appends the refusal to context so the LLM can reroute.',
      details: [
        'Harness blocks execution until human responds',
        'Triggered by destructive, irreversible, or high-stakes actions',
        'Can also be triggered by low-confidence scoring',
        'Approved → loop resumes; Rejected → LLM reroutes',
        'Decision and rationale are appended to conversation context',
      ],
    },
  },
  {
    id: 'final-response',
    type: 'agentNode',
    position: { x: 414, y: 550 },
    data: {
      label: 'Final Response',
      subtitle: 'Task complete — answer delivered',
      icon: '✅',
      color: '#22c55e',
      description:
        'The final response is produced when the LLM determines it has gathered sufficient information and completed all required tool calls. Rather than emitting another tool call, it outputs a plain-language answer, structured result, or action summary. The harness detects this (no tool call blocks in the output), delivers it back to the originating caller (user, API, or parent agent), and appends the exchange to conversation history — leaving the loop ready for the next turn.',
      details: [
        'LLM outputs text with no tool call blocks — harness detects completion',
        'Delivered to the user, API consumer, or parent agent',
        'Full exchange appended to conversation history',
        'Loop is now ready for the next user input',
        'Conversation history may be compacted at this boundary',
      ],
    },
  },
  {
    id: 'tool-executor',
    type: 'agentNode',
    position: { x: 155, y: 664 },
    data: {
      label: 'Tool Executor',
      subtitle: 'Inner loop — function runs here',
      icon: '⚡',
      color: '#10b981',
      description:
        'The tool executor is where the actual work happens. It receives the validated tool call from the harness and runs the real function: a web search, a database query, a code execution sandbox, a file system read/write, or a third-party API call. This is the "inner loop" of the agentic harness — it operates entirely within a single outer LLM turn. The executor manages timeouts, retries, sandboxing, and error handling. Its raw output is then packaged by the harness as a tool result message.',
      details: [
        'Runs the actual function: search, code exec, DB query, API call, etc.',
        'The "inner loop" — all of this happens within one LLM turn',
        'Manages timeouts, retries, and sandboxing',
        'Handles errors gracefully and returns structured error objects',
        'May spawn sub-processes, containers, or child agents',
      ],
    },
  },
  {
    id: 'tool-output',
    type: 'agentNode',
    position: { x: 148, y: 785 },
    data: {
      label: 'Tool Output',
      subtitle: 'Result packaged back into context',
      icon: '📤',
      color: '#14b8a6',
      description:
        'The tool output is the executor\'s result packaged by the harness as a structured "tool result" message. It includes the tool name, the original call ID (for correlation), the execution status, and the actual return value — which might be a text blob, JSON object, image, or error. The harness appends this result to the conversation history and immediately re-invokes the LLM, giving it the new information to reason about. This is the feedback arc that closes the agentic loop.',
      details: [
        'Packaged as a tool_result message with call ID for correlation',
        'Includes status (success/error) and the return value',
        'Appended to conversation history by the harness',
        'Immediately triggers another LLM inference round',
        'Multiple tool outputs are batched if calls ran in parallel',
      ],
    },
  },
];

export const initialEdges: Edge[] = [
  // Inputs → LLM
  {
    id: 'e-sysprompt-llm',
    source: 'system-prompt',
    target: 'llm',
    label: 'system context',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
    labelStyle: { fill: '#8b5cf6', fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: '#0a0f1e', fillOpacity: 0.85 },
  },
  {
    id: 'e-userprompt-llm',
    source: 'user-prompt',
    target: 'llm',
    label: 'user input',
    type: 'smoothstep',
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    labelStyle: { fill: '#3b82f6', fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: '#0a0f1e', fillOpacity: 0.85 },
  },
  // LLM → branches
  {
    id: 'e-llm-toolrequest',
    source: 'llm',
    target: 'tool-request',
    label: '① tool call',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#06b6d4', strokeWidth: 2 },
    labelStyle: { fill: '#06b6d4', fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: '#0a0f1e', fillOpacity: 0.85 },
  },
  {
    id: 'e-llm-hitl',
    source: 'llm',
    target: 'hitl',
    label: '① needs approval',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    labelStyle: { fill: '#f97316', fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: '#0a0f1e', fillOpacity: 0.85 },
  },
  {
    id: 'e-llm-final',
    source: 'llm',
    target: 'final-response',
    label: '① final answer',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#22c55e', strokeWidth: 2 },
    labelStyle: { fill: '#22c55e', fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: '#0a0f1e', fillOpacity: 0.85 },
  },
  // HITL → LLM (back edge — arcs around the RIGHT side of the canvas)
  {
    id: 'e-hitl-llm',
    source: 'hitl',
    sourceHandle: 'right-source',
    target: 'llm',
    targetHandle: 'right-target',
    label: '② approved / rejected',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    labelStyle: { fill: '#f97316', fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: '#0a0f1e', fillOpacity: 0.85 },
  },
  // Tool chain inner loop
  {
    id: 'e-toolrequest-executor',
    source: 'tool-request',
    target: 'tool-executor',
    label: '② execute',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    labelStyle: { fill: '#10b981', fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: '#0a0f1e', fillOpacity: 0.85 },
  },
  {
    id: 'e-executor-output',
    source: 'tool-executor',
    target: 'tool-output',
    label: '③ raw result',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#14b8a6', strokeWidth: 2 },
    labelStyle: { fill: '#14b8a6', fontWeight: 600, fontSize: 11 },
    labelBgStyle: { fill: '#0a0f1e', fillOpacity: 0.85 },
  },
  // Tool Output → LLM (the loop-back — arcs around the LEFT side of the canvas)
  {
    id: 'e-tooloutput-llm',
    source: 'tool-output',
    sourceHandle: 'left-source',
    target: 'llm',
    targetHandle: 'left-target',
    label: '④ tool result → re-infer',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 2.5 },
    labelStyle: { fill: '#f59e0b', fontWeight: 700, fontSize: 11 },
    labelBgStyle: { fill: '#0a0f1e', fillOpacity: 0.9 },
  },
];
