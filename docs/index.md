---
layout: home

hero:
  name: q
  text: The Shell's Quiet Companion
  tagline: Elegant CLI agent for quick queries with Claude
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/hyperb1iss/q

features:
  - icon: ⚡
    title: Lightning Fast
    details: Sub-100ms startup. First token streams within 200ms of API response.

  - icon: 🎨
    title: Gorgeous UI
    details: SilkCircuit design language with syntax highlighting and beautiful markdown rendering.

  - icon: 🔧
    title: Agent Mode
    details: Grant tool access for file operations and command execution with approval flow.

  - icon: 🔄
    title: Context-Aware
    details: Automatically includes git state, working directory, and stdin context.
---

## Quick Start

```bash
# Install
bun add -g @hyperb1iss/q

# Quick question
q "what does this error mean"

# Pipe context
cat error.log | q "explain this"

# Interactive mode
q

# Agent mode
q -x "find all TODO comments"
```
