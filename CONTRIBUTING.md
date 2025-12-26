# Contributing to q

Thanks for your interest in contributing to q! This guide will help you get started.

## Development Setup

### Prerequisites

- [Bun 1.1+](https://bun.sh/) - Runtime and package manager
- [Node.js 20+](https://nodejs.org/) - Alternative runtime
- Git

### Getting Started

```bash
# Clone the repository
git clone https://github.com/hyperb1iss/q.git
cd q

# Install dependencies
bun install

# Run in development mode (with watch)
bun run dev

# Or build and link for testing
bun run build
bun link
```

### Development Commands

| Command                 | Description                         |
| ----------------------- | ----------------------------------- |
| `bun run dev`           | Run with file watching              |
| `bun run build`         | Build for distribution              |
| `bun run build:compile` | Compile to standalone binary        |
| `bun run check`         | Run all checks (types, lint, tests) |
| `bun run typecheck`     | TypeScript type checking            |
| `bun run lint:all`      | Run Biome linting                   |
| `bun run lint:all:fix`  | Auto-fix lint issues                |
| `bun test`              | Run all tests                       |
| `bun test --watch`      | Run tests in watch mode             |
| `bun run docs:dev`      | Start documentation server          |

## Architecture

```
src/
├── cli.ts              # Entry point, argument parsing (yargs)
├── app.tsx             # Main Ink application
├── commands/           # Command implementations
│   ├── agent.ts        # Execute mode (-x)
│   ├── interactive.ts  # Interactive TUI (-i)
│   ├── pipe.ts         # Pipe mode (stdin)
│   └── query.ts        # Simple query mode
├── components/         # React components for TUI
├── hooks/              # React hooks (useAgent, useStream, etc.)
├── lib/                # Core utilities
│   ├── agent.ts        # Claude Agent SDK wrapper
│   ├── colors.ts       # SilkCircuit color palette
│   ├── config.ts       # Configuration loading (c12)
│   ├── markdown.ts     # Markdown rendering
│   ├── prompt.ts       # System prompt building
│   └── storage.ts      # Session persistence
└── types.ts            # Shared TypeScript types
```

### Key Patterns

- **SilkCircuit Design**: All terminal colors use the palette in `lib/colors.ts`
- **Streaming-first**: Responses stream token-by-token
- **Discriminated Unions**: Results use `{ ok: true; value: T } | { ok: false; error: E }`
- **Hooks over Classes**: React patterns throughout, even in non-UI code

## Code Style

We use [Biome](https://biomejs.dev/) for linting and formatting. Never use ESLint.

```bash
# Check for issues
bun run lint:all

# Auto-fix issues
bun run lint:all:fix
```

### Style Guidelines

- Follow existing patterns in the codebase
- Prefer explicit over implicit
- Keep functions focused and testable
- Use meaningful names over comments
- Use SilkCircuit colors only—no arbitrary ANSI codes
- Use discriminated unions for error handling

### TypeScript

- Strict mode enabled (`exactOptionalPropertyTypes`, etc.)
- Prefer `interface` over `type` for object shapes
- Use `unknown` over `any` where possible
- Export types alongside implementations

## Testing

Tests use Bun's built-in test runner:

```bash
# Run all tests
bun test

# Run specific test file
bun test src/lib/markdown.test.ts

# Watch mode
bun test --watch

# With coverage
bun run test:coverage
```

### Writing Tests

- Test files go next to source files: `foo.ts` → `foo.test.ts`
- Or in `__tests__/` subdirectories for larger modules
- Mock external services (API calls, file system where needed)
- Focus on behavior, not implementation details

## Pull Request Process

### Before Submitting

1. **Run the full check suite**:

   ```bash
   bun run check  # types + lint + tests
   ```

2. **Test your changes manually** with various modes

3. **Update documentation** if you changed user-facing behavior

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, no logic change
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```
feat(cli): add --dry-run flag for execute mode
fix(pipe): handle empty stdin gracefully
docs(shell): document qerr command
```

### PR Guidelines

- Keep PRs focused on a single change
- Include a clear description of what and why
- Reference any related issues
- Add tests for new functionality
- Update docs for user-facing changes

## Reporting Issues

### Bug Reports

Include:

- q version (`q --version`)
- Operating system and shell
- Steps to reproduce
- Expected vs actual behavior
- Relevant error messages or output

### Feature Requests

- Check existing issues first
- Describe the use case, not just the solution
- Explain why this would benefit other users

## Getting Help

- Open a [GitHub Discussion](https://github.com/hyperb1iss/q/discussions) for questions
- Join the conversation in existing issues
- Check the [documentation](https://hyperb1iss.github.io/q/) for usage help

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
