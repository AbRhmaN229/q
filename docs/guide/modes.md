# Modes

**q** supports four invocation modes, each designed for different workflows.

## Query Mode

The simplest mode—ask a question, get an answer.

```bash
q "what does this error mean"
q "how do I rebase onto main"
q "explain the difference between merge and rebase"
```

The response streams to your terminal with syntax highlighting and markdown formatting.

## Pipe Mode

Inject stdin as context for your query.

```bash
cat error.log | q "explain this"
git diff | q "summarize these changes"
pbpaste | q "review this code"
```

The stdin content is wrapped in `<context>` tags and prepended to your prompt.

## Interactive Mode

Full-screen TUI for multi-turn conversations.

```bash
q        # Opens TUI
q -i     # Explicit flag
```

Features:

- Multi-turn conversation with full context
- History navigation (up/down arrows)
- Keyboard shortcuts for common actions
- Session persistence

## Execute Mode (Agent)

Enable tool access for file operations and command execution.

```bash
q -x "find all TODO comments and list them"
q --execute "run the tests and fix any failures"
```

Available tools:

- **Read** - Read file contents
- **Glob** - Pattern matching for files
- **Grep** - Search file contents
- **Bash** - Execute shell commands

All commands require explicit approval before execution.
