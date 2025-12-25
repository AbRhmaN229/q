<h1 align="center">
  <br>
  🔮 q
  <br>
</h1>

<p align="center">
  <strong>just ask</strong>
</p>

<p align="center">
  <a href="#-quick-start">
    <img src="https://img.shields.io/badge/Quick_Start-Get_Running-e135ff?style=for-the-badge" alt="Quick Start">
  </a>
  <a href="#-modes">
    <img src="https://img.shields.io/badge/Modes-Query_Pipe_Agent-80ffea?style=for-the-badge" alt="Modes">
  </a>
  <a href="#-configuration">
    <img src="https://img.shields.io/badge/Config-Customize-ff6ac1?style=for-the-badge" alt="Configuration">
  </a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-modes">Modes</a> •
  <a href="#-shell-integration">Shell Integration</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-sessions">Sessions</a>
</p>

---

> Claude for people who live in the terminal.

**q** is a minimal, elegant CLI for Claude. One letter. No ceremony. Just ask your question and get
back to work.

## ⚡ Quick Start

```bash
# Install
bun add -g @hyperb1iss/q

# Set your API key
export ANTHROPIC_API_KEY="sk-ant-..."

# Ask anything
q "how do I find large files in this directory"
```

That's it. You're running.

## 💎 Modes

| Mode            | Trigger                   | What It Does                           |
| --------------- | ------------------------- | -------------------------------------- |
| **Query**       | `q "question"`            | Quick answer, streamed to terminal     |
| **Pipe**        | `cat file \| q "explain"` | Analyze piped content                  |
| **Interactive** | `q -i`                    | TUI chat with full context             |
| **Agent**       | `q -x "task"`             | Execute with tools (read, write, bash) |

### Query Mode

The default. Ask a question, get an answer.

```bash
q "what does the -z flag do in bash test expressions"
q "write a regex to match email addresses"
q "explain this error" < error.log
```

### Pipe Mode

Pipe anything to q for analysis.

```bash
# Explain code
cat src/lib/storage.ts | q "explain this"

# Debug errors
./build.sh 2>&1 | q "why did this fail"

# Review diffs
git diff | q "summarize these changes"
```

### Interactive Mode

Full TUI for back-and-forth conversations.

```bash
q -i                    # Start fresh
q -r last               # Resume last session
q -r abc123             # Resume specific session
```

### Agent Mode

Let Claude execute tools to complete tasks.

```bash
# Read-only tools auto-approved (Read, Glob, Grep)
q -x "find all TODO comments in this project"

# Write tools prompt for approval (Bash, Write, Edit)
q -x "refactor this function to use async/await"
```

Tool approval shows risk level:

```
⚠ Bash [low]
  Runs a shell command
  $ ls -la src/

Allow? [y]es / [n]o / [a]lways:
```

## 🦋 Shell Integration

Source the shell integration for enhanced context:

```bash
# Add to ~/.zshrc, ~/.bashrc, or ~/.config/fish/config.fish
eval "$(q --shell-init zsh)"   # or bash, fish
```

This gives you:

| Function  | What It Does                                              |
| --------- | --------------------------------------------------------- |
| `q!`      | Ask with automatic context (pwd, recent commands, errors) |
| `q!!`     | Ask about the last command that failed                    |
| `explain` | Explain the last command                                  |
| `qcd`     | AI-powered directory navigation                           |

```bash
# With shell integration
$ make build
error: missing dependency...

$ q!!
# Automatically includes the failed command and error output
```

## 🔮 Configuration

Create `q.config.ts` in your project or `~/.config/q/`:

```typescript
import { defineConfig } from '@hyperb1iss/q/config';

export default defineConfig({
  // Default model: 'sonnet' | 'opus' | 'haiku'
  model: 'sonnet',

  // Safety settings
  safety: {
    confirmDestructive: true,
    maxCostPerQuery: 0.5,
    maxInputSize: 100000,
    blockedCommands: ['rm -rf /', 'dd if='],
  },

  // Prompt aliases
  prompts: {
    explain: 'Explain this code in simple terms:',
    review: 'Review this code for bugs and improvements:',
  },
});
```

Or use environment variables:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."  # Required
export Q_CONFIG="/path/to/config.ts"   # Optional
```

## 🧪 Sessions

q automatically saves conversations for later resume.

```bash
# List recent sessions
q --sessions

# Resume most recent
q -r last

# Resume by ID
q -r abc123def456
```

Sessions include message history, token usage, and cost tracking.

## 🪄 CLI Reference

```
q [query]              Ask a question
q -i, --interactive    TUI mode
q -x, --execute        Agent mode with tools
q -r, --resume <id>    Resume session (or "last")
q -m, --model <model>  Model: sonnet, opus, haiku
q -s, --stream         Stream output (default: true)
q -q, --quiet          Response only, no stats
q --raw                No markdown formatting
q --color <mode>       Color: auto, always, never
q --sessions           List recent sessions
q --shell-init <shell> Output shell integration script
```

## 💜 Accessibility

q respects the [NO_COLOR](https://no-color.org/) standard and provides explicit color control:

```bash
q --color never "question"     # Disable colors
NO_COLOR=1 q "question"        # Same effect
```

## 🛠️ Development

```bash
# Install dependencies
bun install

# Run in development
bun run src/cli.ts "test query"

# Build
bun run build

# Run tests
bun test

# Type check
bun run typecheck
```

## 📄 License

Apache-2.0

---

<p align="center">
  Built with the <a href="https://github.com/anthropics/claude-code">Claude Agent SDK</a>
</p>

<p align="center">
  <a href="https://github.com/hyperb1iss">
    <img src="https://img.shields.io/badge/GitHub-hyperb1iss-181717?style=for-the-badge&logo=github" alt="GitHub">
  </a>
  <a href="https://hyperbliss.tech">
    <img src="https://img.shields.io/badge/Web-hyperbliss.tech-e135ff?style=for-the-badge" alt="Website">
  </a>
</p>
