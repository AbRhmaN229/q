# Getting Started

**q** is the shell's quiet companion—an elegant CLI tool that brings Claude's agent capabilities
directly into your terminal workflow.

## Installation

### Using Bun (Recommended)

```bash
bun add -g @hyperb1iss/q
```

### Using npm

```bash
npm install -g @hyperb1iss/q
```

### From Source

```bash
git clone https://github.com/hyperb1iss/q.git
cd q
bun install
bun run build
bun link
```

### Compiled Binary

You can also compile q to a standalone binary:

```bash
bun run build:compile
```

This creates a native binary, but note that some dependencies (shiki for syntax highlighting, Claude Agent SDK) are external and require `node_modules` to be present. For fully portable deployment, use the npm/bun package installation methods.

## Prerequisites

1. **Bun 1.1+** or Node.js 20+
2. **Anthropic API Key** - Set the `ANTHROPIC_API_KEY` environment variable

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

## Your First Query

Once installed, try a simple query:

```bash
q "what's the difference between git rebase and git merge"
```

You'll see a streaming response with syntax-highlighted code blocks and beautiful markdown
rendering.

## Next Steps

- Learn about the different [modes](/guide/modes)
- Set up your [configuration](/guide/configuration)
- Enable [shell integration](/guide/shell-integration) for hotkeys
