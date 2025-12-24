# Shell Integration

Enable hotkey support and enhanced context by adding **q** to your shell configuration.

## Zsh Integration

Add to your `~/.zshrc`:

```bash
# q - Quick Claude queries
# Ctrl+Q opens interactive mode
bindkey -s '^Q' 'q\n'

# Include last command output in context
q-with-context() {
  local last_output=$(fc -ln -1 | head -1)
  q "$@"
}
alias qc='q-with-context'
```

## Bash Integration

Add to your `~/.bashrc`:

```bash
# q - Quick Claude queries
# Ctrl+Q opens interactive mode
bind '"\C-q":"q\n"'
```

## Fish Integration

Add to your `~/.config/fish/config.fish`:

```fish
# q - Quick Claude queries
bind \cq 'q; commandline -f repaint'
```

## Last Command Context

Capture the output of your last command to include as context:

```bash
# Run a command and pipe its output
some-command 2>&1 | q "what went wrong"

# Or use a helper function
qlast() {
  local output=$(eval "$(fc -ln -1)" 2>&1)
  echo "$output" | q "$@"
}
```

## Git Aliases

Add helpful git-related aliases:

```bash
# Explain current diff
alias qd='git diff | q "explain these changes"'

# Review staged changes
alias qr='git diff --staged | q "review this code"'

# Generate commit message
alias qc='git diff --staged | q "write a commit message"'
```
