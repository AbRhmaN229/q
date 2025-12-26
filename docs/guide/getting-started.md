# Getting Started

**q** is the shell's quiet companion—an elegant CLI tool that brings Claude's agent capabilities
directly into your terminal workflow. It connects to [Claude](https://www.anthropic.com/claude),
Anthropic's AI assistant, to answer questions, explain code, and even execute commands.

## Prerequisites

Before installing q, you'll need:

### 1. Runtime Environment

- **Bun 1.1+** (recommended) — [Install from bun.sh](https://bun.sh/)
- **Node.js 20+** — [Install from nodejs.org](https://nodejs.org/)

Check your version:

```bash
bun --version   # or
node --version
```

### 2. Anthropic API Key

q uses Claude, which requires an API key from Anthropic:

1. Create an account at [console.anthropic.com](https://console.anthropic.com/)
2. Navigate to [API Keys](https://console.anthropic.com/settings/keys)
3. Click **Create Key** and copy it (starts with `sk-ant-...`)

Add the key to your shell configuration for persistence:

::: code-group

```bash [~/.zshrc (macOS)]
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
```

```bash [~/.bashrc (Linux)]
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
```

```fish [~/.config/fish/config.fish]
set -gx ANTHROPIC_API_KEY "sk-ant-your-key-here"
```

:::

Then reload your shell:

```bash
source ~/.zshrc  # or ~/.bashrc, or restart your terminal
```

::: warning Keep Your Key Secret Never commit your API key to git or share it publicly. Consider
using a secrets manager for team environments. :::

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

This creates a native binary, but note that some dependencies (shiki for syntax highlighting, Claude
Agent SDK) are external and require `node_modules` to be present. For fully portable deployment, use
the npm/bun package installation methods.

## Verify Installation

Test that everything works:

```bash
q "hello, what can you help me with?"
```

You should see a streaming response with beautifully rendered markdown. If you get an API key error,
double-check your `ANTHROPIC_API_KEY` is set correctly:

```bash
echo $ANTHROPIC_API_KEY  # Should show sk-ant-...
```

## Your First Query

Try some example queries:

```bash
# Ask a programming question
q "what's the difference between git rebase and git merge"

# Pipe in context
cat package.json | q "what dependencies does this project use"

# Read a file and ask about it
q -f src/main.ts "explain this code"
```

## Next Steps

- Learn about the different [modes](/guide/modes)
- Set up your [configuration](/guide/configuration)
- Enable [shell integration](/guide/shell-integration) for hotkeys and shortcuts
