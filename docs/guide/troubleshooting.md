# Troubleshooting

Common issues and their solutions.

## API Key Issues

### Missing API Key

```
Error: Missing ANTHROPIC_API_KEY environment variable
```

**Solution:** Set your API key in your shell profile:

```bash
# Add to ~/.zshrc or ~/.bashrc
export ANTHROPIC_API_KEY="sk-ant-..."
```

Get your API key at [console.anthropic.com](https://console.anthropic.com/settings/keys).

### Invalid API Key

```
Error: Invalid API key
```

**Solution:** Verify your key is correct and has not expired. Generate a new key if needed.

## Connection Issues

### Network Timeout

```
Error: Request timed out
```

**Solutions:**

- Check your internet connection
- Verify the Anthropic API is accessible from your network
- Check if you're behind a proxy that blocks API traffic

### Rate Limiting

```
Error: Rate limit exceeded
```

**Solution:** Wait a moment and retry. Consider upgrading your API plan for higher limits.

## Configuration Issues

### Config File Not Loading

If your configuration changes aren't taking effect:

1. Check file location is correct (`.qrc`, `q.config.ts`, etc.)
2. Verify JSON/YAML syntax is valid
3. Use `--no-config` to bypass config for testing
4. Enable debug mode: `DEBUG=1 q "test"`

### Shell Integration Not Working

If `eval "$(q --shell-init zsh)"` isn't working:

1. Verify the shell type matches your shell (bash/zsh/fish)
2. Check the script path exists: `q --shell-init zsh`
3. Add to the correct profile file for your shell

## Execute Mode Issues

### Tool Approval Prompts

In execute mode (`-x`), tools like Bash, Write, and Edit require approval:

- Press `y` to allow once
- Press `a` to always allow this tool type (for the session)
- Press `n` to deny

High-risk commands (like `rm -rf`) always require explicit approval.

### Dry Run Mode

Use `--dry-run` with execute mode to see what tools would be called without executing them:

```bash
q -x --dry-run "find and fix all TODO comments"
```

## Session Issues

### Cannot Resume Session

```
Error: Session cannot be resumed (no SDK session ID)
```

This session was created before resume support was added. Start a new session instead.

### Session Not Found

```
Error: Session not found
```

Use `q --sessions` to list available sessions and their IDs.

## Output Issues

### Markdown Rendering Problems

If markdown isn't rendering correctly:

- Use `--raw` for plain text output
- Check your terminal supports ANSI colors
- Try `--color never` to disable colors

### Output Too Verbose

Use these flags for quieter output:

- `-q` / `--quiet` - Minimal output (response only)
- `--json` - Machine-readable JSON output

### Output Truncated in Pipes

When piping output, q automatically enables quiet and raw mode. If you need different behavior, be
explicit:

```bash
q --no-quiet "your query" | other-command
```

## Performance Issues

### Slow Response Times

- Use `-m haiku` for faster responses on simple queries
- Reduce context size by limiting file includes
- Check network latency to the Anthropic API

### High Token Usage

- Use `--verbose` to see token counts
- Keep prompts concise
- Use prompt aliases for common queries

## Debug Mode

Enable debug output for troubleshooting:

```bash
DEBUG=1 q "your query"
```

This shows:

- Detected mode
- Parsed arguments
- Loaded configuration
- API request details

## Getting Help

If you're still stuck:

1. Check the [GitHub issues](https://github.com/hyperb1iss/q/issues)
2. Enable debug mode and share the output
3. Include your q version (`q --version`)
