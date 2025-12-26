# Shell Integration

Enable hotkey support, context capture, and convenient shortcuts by integrating **q** into your
shell.

## Quick Setup

The recommended approach uses q's built-in shell scripts:

::: code-group

```bash [Zsh (~/.zshrc)]
eval "$(q --shell-init zsh)"
```

```bash [Bash (~/.bashrc)]
eval "$(q --shell-init bash)"
```

```fish [Fish (~/.config/fish/config.fish)]
q --shell-init fish | source
```

:::

After adding, restart your terminal or source the config file.

::: tip Suppress Init Message Set `Q_QUIET=1` in your environment to hide the startup message. :::

## Provided Commands

The shell integration provides these commands:

| Command | Description                                                                   |
| ------- | ----------------------------------------------------------------------------- |
| `qq`    | Quick query — opens interactive mode if no arguments                          |
| `qctx`  | Query with context — includes working directory, git status, and last command |
| `qerr`  | Explain last error — only activates if the previous command failed            |
| `qx`    | Execute mode — shortcut for `q -x`                                            |
| `qr`    | Resume session — shortcut for `q -r last`                                     |

### Examples

```bash
# Quick query
qq "what does this regex do"

# Interactive mode
qq

# Query with full context
qctx "why did my build fail"

# After a failed command
npm test          # exits with error
qerr              # explains the error automatically

# Execute mode
qx "find TODO comments in src/"

# Resume last conversation
qr "and what about the other issue?"
```

## Hotkey: Ctrl+Q

The shell integration binds `Ctrl+Q` for quick access:

| Scenario             | Behavior                           |
| -------------------- | ---------------------------------- |
| Empty command line   | Inserts `qq ` ready for your query |
| Text on command line | Runs `q "your text"` immediately   |

This lets you quickly ask questions without disrupting your workflow.

::: info Flow Control The integration disables terminal flow control (`stty -ixon`) to free up
`Ctrl+Q`, which is traditionally used for XON/XOFF. :::

## Context Capture

The shell integration tracks your command history:

- **Last command**: What you ran and its exit status
- **Git context**: Current branch and dirty/clean state
- **Working directory**: Where you're running from

The `qctx` and `qerr` commands use this context automatically.

### How It Works

```bash
# You run a failing command
npm run build

# Then ask for help - context is included automatically
qerr

# This sends q a prompt like:
# ─── Context ───
# Directory: /Users/you/project
# Git: feature-branch (dirty)
#
# ⚠ Command failed with exit code 1
# Command: npm run build
# ────────────────
#
# Explain this error and suggest how to fix it
```

## Tab Completion

The integration includes completions for all q commands and their options. Type `q -` and press Tab
to see available flags.

## Manual Configuration

If you prefer manual setup or want to customize behavior:

### Zsh

```bash
# Basic hotkey
bindkey -s '^Q' 'q\n'

# Query with last command
q-last() {
  local last=$(fc -ln -1)
  q "Context: ran '$last'\n\n$*"
}
```

### Bash

```bash
# Basic hotkey
bind '"\C-q":"q\n"'
```

### Fish

```fish
# Basic hotkey
bind \cq 'q; commandline -f repaint'
```

## Git Shortcuts

Add these aliases for common git workflows:

```bash
# Explain current changes
alias qd='git diff | q "explain these changes"'

# Review staged changes
alias qrev='git diff --staged | q "review this code for issues"'

# Generate commit message
alias qcommit='git diff --staged | q "@commit"'
```

## Environment Variables

| Variable            | Description                                 |
| ------------------- | ------------------------------------------- |
| `Q_QUIET`           | Suppress the shell integration init message |
| `ANTHROPIC_API_KEY` | Your API key (required)                     |
| `NO_COLOR`          | Disable colors when set                     |
