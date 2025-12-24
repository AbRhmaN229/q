import { expect, test } from 'bun:test';
import { render, renderSync } from './markdown.js';

test('renderSync: renders headers with colors', () => {
  const result = renderSync('# Hello World');
  expect(result).toContain('Hello World');
  expect(result).toContain('\x1b['); // Has ANSI codes
});

test('renderSync: renders inline code', () => {
  const result = renderSync('Use `npm install` to install');
  expect(result).toContain('npm install');
});

test('renderSync: renders bold text', () => {
  const result = renderSync('This is **bold** text');
  expect(result).toContain('bold');
});

test('renderSync: renders lists', () => {
  const result = renderSync('- Item 1\n- Item 2\n- Item 3');
  expect(result).toContain('Item 1');
  expect(result).toContain('Item 2');
  expect(result).toContain('•'); // bullet
});

test('renderSync: renders code blocks', () => {
  const result = renderSync('```javascript\nconst x = 1;\n```');
  expect(result).toContain('const x = 1');
  expect(result).toContain('javascript');
  expect(result).toContain('┌'); // box
});

test('render: async renders with syntax highlighting', async () => {
  const result = await render('```typescript\nconst x: number = 1;\n```');
  expect(result).toContain('const');
  expect(result).toContain('typescript');
});
