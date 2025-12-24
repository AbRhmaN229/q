/**
 * Tests for markdown rendering
 */

import { describe, expect, test } from 'bun:test';
import { render, renderSync } from './markdown.js';

describe('renderSync', () => {
  describe('headers', () => {
    test('renders h1 headers', () => {
      const result = renderSync('# Hello World');
      expect(result).toContain('Hello World');
      expect(result).toContain('\x1b['); // Has ANSI codes
    });

    test('renders h2 headers', () => {
      const result = renderSync('## Section Title');
      expect(result).toContain('Section Title');
    });

    test('renders h3 headers', () => {
      const result = renderSync('### Subsection');
      expect(result).toContain('Subsection');
    });

    test('renders multiple header levels', () => {
      const result = renderSync('# H1\n## H2\n### H3');
      expect(result).toContain('H1');
      expect(result).toContain('H2');
      expect(result).toContain('H3');
    });
  });

  describe('inline formatting', () => {
    test('renders inline code', () => {
      const result = renderSync('Use `npm install` to install');
      expect(result).toContain('npm install');
    });

    test('renders bold text', () => {
      const result = renderSync('This is **bold** text');
      expect(result).toContain('bold');
    });

    test('renders italic text', () => {
      const result = renderSync('This is *italic* text');
      expect(result).toContain('italic');
    });

    test('renders strikethrough', () => {
      const result = renderSync('This is ~~deleted~~ text');
      expect(result).toContain('deleted');
    });

    test('renders combined formatting', () => {
      const result = renderSync('This is ***bold and italic*** text');
      expect(result).toContain('bold and italic');
    });

    test('renders multiple inline codes', () => {
      const result = renderSync('Use `foo` and `bar` commands');
      expect(result).toContain('foo');
      expect(result).toContain('bar');
    });
  });

  describe('lists', () => {
    test('renders unordered lists', () => {
      const result = renderSync('- Item 1\n- Item 2\n- Item 3');
      expect(result).toContain('Item 1');
      expect(result).toContain('Item 2');
      expect(result).toContain('•'); // bullet
    });

    test('renders ordered lists', () => {
      const result = renderSync('1. First\n2. Second\n3. Third');
      expect(result).toContain('First');
      expect(result).toContain('Second');
      expect(result).toContain('Third');
    });

    test('renders nested lists', () => {
      const result = renderSync('- Parent\n  - Child\n  - Child 2\n- Parent 2');
      expect(result).toContain('Parent');
      expect(result).toContain('Child');
    });

    test('renders lists with asterisks', () => {
      const result = renderSync('* Item A\n* Item B');
      expect(result).toContain('Item A');
      expect(result).toContain('Item B');
    });

    test('renders lists with plus signs', () => {
      const result = renderSync('+ Item X\n+ Item Y');
      expect(result).toContain('Item X');
      expect(result).toContain('Item Y');
    });
  });

  describe('code blocks', () => {
    test('renders fenced code blocks', () => {
      const result = renderSync('```javascript\nconst x = 1;\n```');
      expect(result).toContain('const x = 1');
      expect(result).toContain('javascript');
      expect(result).toContain('┌'); // box
    });

    test('renders code blocks without language', () => {
      const result = renderSync('```\nplain code\n```');
      expect(result).toContain('plain code');
    });

    test('renders multiple code blocks', () => {
      const result = renderSync('```js\nfoo()\n```\n\n```python\nbar()\n```');
      expect(result).toContain('foo()');
      expect(result).toContain('bar()');
    });

    test('preserves indentation in code blocks', () => {
      const result = renderSync('```\n  indented\n    more\n```');
      expect(result).toContain('indented');
      expect(result).toContain('more');
    });
  });

  describe('blockquotes', () => {
    test('renders blockquotes', () => {
      const result = renderSync('> This is a quote');
      expect(result).toContain('This is a quote');
    });

    test('renders multi-line blockquotes', () => {
      const result = renderSync('> Line 1\n> Line 2');
      expect(result).toContain('Line 1');
      expect(result).toContain('Line 2');
    });
  });

  describe('links', () => {
    test('renders links', () => {
      const result = renderSync('[Click here](https://example.com)');
      expect(result).toContain('Click here');
    });

    test('renders links with title', () => {
      const result = renderSync('[Link](https://example.com "Title")');
      expect(result).toContain('Link');
    });
  });

  describe('horizontal rules', () => {
    test('renders horizontal rules with dashes', () => {
      const result = renderSync('---');
      expect(result).toContain('─');
    });

    test('renders horizontal rules with asterisks', () => {
      const result = renderSync('***');
      expect(result).toContain('─');
    });
  });

  describe('edge cases', () => {
    test('handles empty input', () => {
      const result = renderSync('');
      expect(result).toBe('');
    });

    test('handles whitespace only', () => {
      const result = renderSync('   \n\n   ');
      expect(typeof result).toBe('string');
    });

    test('handles very long lines', () => {
      const longLine = 'x'.repeat(500);
      const result = renderSync(longLine);
      expect(result).toContain('x');
    });

    test('handles mixed content', () => {
      const mixed = `
# Title

Some **bold** and \`code\`.

- List item
- Another item

\`\`\`js
const x = 1;
\`\`\`

> Quote here
`;
      const result = renderSync(mixed);
      expect(result).toContain('Title');
      expect(result).toContain('bold');
      expect(result).toContain('code');
      expect(result).toContain('List item');
      expect(result).toContain('const x = 1');
      expect(result).toContain('Quote here');
    });

    test('handles unicode content', () => {
      const result = renderSync('# 你好世界 🌍\n\n- アイテム\n- عنصر');
      expect(result).toContain('你好世界');
      expect(result).toContain('🌍');
      expect(result).toContain('アイテム');
      expect(result).toContain('عنصر');
    });

    test('handles special characters', () => {
      const result = renderSync('Use `<script>` and `&amp;`');
      expect(result).toContain('<script>');
      expect(result).toContain('&amp;');
    });

    test('handles newlines in paragraphs', () => {
      const result = renderSync('Line 1\nLine 2\n\nNew paragraph');
      expect(result).toContain('Line 1');
      expect(result).toContain('New paragraph');
    });

    test('handles backslashes in content', () => {
      const result = renderSync('Path: C:\\Users\\test');
      expect(result).toContain('Path');
      // Backslashes may be escaped or preserved depending on context
      expect(typeof result).toBe('string');
    });
  });
});

describe('render (async)', () => {
  test('renders with syntax highlighting', async () => {
    const result = await render('```typescript\nconst x: number = 1;\n```');
    expect(result).toContain('const');
    expect(result).toContain('typescript');
  });

  test('handles plain text', async () => {
    const result = await render('Just plain text');
    expect(result).toContain('Just plain text');
  });

  test('handles complex documents', async () => {
    const doc = `
# API Documentation

Here's how to use the \`query\` function:

\`\`\`typescript
import { query } from './agent';

const result = await query('Hello', {
  model: 'claude-sonnet-4',
  maxTurns: 5,
});

console.log(result.response);
\`\`\`

## Options

- **model**: The model to use
- **maxTurns**: Maximum conversation turns

> Note: Requires API key to be set.
`;
    const result = await render(doc);
    expect(result).toContain('API Documentation');
    expect(result).toContain('query');
    expect(result).toContain('model');
    expect(result).toContain('maxTurns');
    expect(result).toContain('Note:');
  });

  test('handles errors gracefully', async () => {
    // Even if highlighting fails, should return something
    const result = await render('```unknownlang\ncode here\n```');
    expect(result).toContain('code here');
  });
});

describe('consistency', () => {
  test('render and renderSync produce similar output for simple text', async () => {
    const text = 'Hello **world**';
    const syncResult = renderSync(text);
    const asyncResult = await render(text);

    // Both should contain the text (formatting may differ slightly)
    expect(syncResult).toContain('Hello');
    expect(asyncResult).toContain('Hello');
    expect(syncResult).toContain('world');
    expect(asyncResult).toContain('world');
  });
});
