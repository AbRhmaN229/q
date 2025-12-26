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

Pipe command output or file contents as context for your query.

```bash
cat error.log | q "explain this"
git diff | q "summarize these changes"
pbpaste | q "review this code"
```

The stdin content is wrapped in `<piped_input>` tags and prepended to your prompt.

::: info Automatic Behavior When stdout is piped (e.g., `q "query" | cat`), q automatically:

- Enables quiet mode (no spinner)
- Outputs raw text (no markdown formatting)
- Disables colors

This ensures clean, parseable output for scripting. :::

::: warning Write Operations Disabled Pipe mode does not allow write operations. Tools like Bash,
Write, and Edit are automatically denied to prevent unintended modifications in automated pipelines.
:::

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

### Available Tools

| Tool      | Description                | Approval          |
| --------- | -------------------------- | ----------------- |
| **Read**  | Read file contents         | Auto-approved     |
| **Glob**  | Pattern matching for files | Auto-approved     |
| **Grep**  | Search file contents       | Auto-approved     |
| **Bash**  | Execute shell commands     | Requires approval |
| **Write** | Create or overwrite files  | Requires approval |
| **Edit**  | Modify file contents       | Requires approval |

Read-only tools (Read, Glob, Grep) run automatically. Write operations require you to approve each
action, with risk assessment shown.

### Approval Flow

When a tool needs approval, you'll see:

```
! Bash [MEDIUM]
  May modify files or system state
  $ npm test

Allow? [y]es / [n]o / [a]lways:
```

- **y** or **yes**: Allow this execution
- **n** or **no**: Deny this execution
- **a** or **always**: Allow all future uses of this tool (current session only)

::: danger High Risk Commands Destructive commands like `rm -rf`, `sudo`, or `git push --force` are
marked as **HIGH RISK** and cannot use "always" approval. Each must be individually confirmed. :::

### Dry Run

Preview what tools would be called without executing them:

```bash
q -x --dry-run "refactor this to use async/await"
```

This shows the tool calls Claude would make, helping you understand the plan before committing to
it.
