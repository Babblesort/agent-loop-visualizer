# agent-loop-visualizer

An interactive web diagram visualizing the concepts of a typical **agentic harness loop** — the cycle of inference, tool use, and feedback that drives modern LLM-based agents.

Built with **React + TypeScript + Vite** and **React Flow**.

## What it shows

The diagram maps out the key nodes in a typical agentic execution loop:

| Node | Concept |
|---|---|
| ⚙️ System Prompt | Persistent context, tool schemas, and behavioral constraints injected each turn |
| 💬 User Prompt | Current-turn input from a human, API, or parent agent |
| 🧠 LLM Inference | Core reasoning engine — receives full context, emits tool calls or a final answer |
| 🔧 Tool Call Request | Structured JSON emitted by the LLM to invoke an external capability |
| 🙋 Human-in-the-Loop | Approval gate — harness pauses execution and waits for human authorization |
| ⚡ Tool Executor | The "inner loop" — where the actual function runs (search, code exec, API call, etc.) |
| 📤 Tool Output | Result packaged by the harness and appended back to the context window |
| ✅ Final Response | LLM outputs a plain response (no tool calls) — loop completes for this turn |

Edge numbers (①②③④) trace the data flow through a single turn.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

Click any node on the canvas to read a detailed explanation of that component in the sidebar panel.

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 8](https://vite.dev)
- [React Flow (@xyflow/react)](https://reactflow.dev)
