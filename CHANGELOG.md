## [0.9.2] - 2025-12-31

This release enhances automation, extends file handling capabilities, and improves documentation infrastructure. The highlight is automated changelog generation via git-iris, along with new CLI options for session management and dry-run testing.

### Added

- Add automated changelog and release notes generation via git-iris GitHub Action (`570edc5`)
- Add `--dry-run` flag for agent mode to preview tool calls without execution (`4fbab05`)
- Add `--continue` (`-c`) flag as shortcut for `--resume last` (`4fbab05`)
- Add `--no-config` flag to skip config file loading for security (`4fbab05`)
- Add `--json` flag for structured JSON output with response, model, and usage data (`86f3437`)
- Add `-f/--file` flag to include file contents as XML context blocks (`86f3437`)
- Add `@alias` syntax for expanding prompts from config (e.g., `@review`, `@explain`) (`86f3437`)
- Add project context loading from `.q/context.md` for per-project instructions (`f975821`)
- Add thinking indicator with elapsed time display during API calls (`5a03639`)
- Add GitHub Pages deployment workflow for VitePress documentation (`1d6bbf17`)
- Add comprehensive troubleshooting guide for common issues (`72dc2e6`)
- Add `CONTRIBUTING.md` with development setup and PR guidelines (`cddcd49`)
- Add test suite for `prompt` and `format` modules (`0d50006`)
- Add husky pre-commit hook for typecheck and lint (`4fbab05`)

### Changed

- Change file handling to use metadata references instead of inline content (`4b37de1`)
- Change file context to auto-enable execute mode when files specified (`4b37de1`)
- Update git-iris action from commit hash to stable `v2` tag (`cc60981`)
- Update release workflow to determine version from git tags instead of `package.json` (`570edc5`)
- Migrate VitePress config from `.ts` to `.mts` with improved markdown theme (`72dc2e6`)
- Expand CI workflow with separate type check, lint, and test coverage steps (`72dc2e6`)
- Integrate Codecov for test coverage reporting (`72dc2e6`)
- Extract git utilities into dedicated `git.ts` module (`5a03639`)
- Extract permission handler into shared `createPermissionHandler` factory (`f975821`)
- Refactor agent streaming display with separate `StreamState` interface (`f975821`)
- Simplify shell integration by removing terminal-specific features (Ghostty/iTerm/Kitty) (`42b6f2af`)
- Rename shell commands: `q!` → `qctx`, `q?` → `qerr` (`42b6f2af`)
- Read version from `package.json` instead of hardcoding (`0d50006`)
- Switch from Apache-2.0 to MIT license (`9ea4d98`)
- Overhaul release workflow to manual `workflow_dispatch` with version bumping (`9ea4d98`)
- Upgrade GitHub Actions to v6 (`dc3ab71`)
- Update README badges with SilkCircuit color scheme (`9ea4d98`)

### Fixed

- Fix `qerr` command to reference the failed command instead of itself (`42b6f2af`)

### Removed

- Remove `SPEC.md` specification document (`8b21e9bb`)
- Remove `qcd` and `explain` shell commands (`42b6f2af`)
- Remove terminal-specific OSC sequences and hyperlink support (`42b6f2af`)
- Remove completion notifications and timing features (`42b6f2af`)
- Remove unused `isClaudeAvailable()` from `agent.ts` (`0d50006`)
- Remove unused box drawing characters from `colors.ts` (`0d50006`)
- Remove build-from-source option from git-iris action (`cc60981`)

### Metrics

- Total Commits: 12
- Files Changed: 42
- Insertions: +2,886
- Deletions: -1,389
