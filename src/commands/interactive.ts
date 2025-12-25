/**
 * Interactive TUI mode
 */

import type { CliArgs, Config } from '../types.js';
import { MODEL_MAP } from './shared.js';

/**
 * Run interactive TUI mode
 */
export async function runInteractive(args: CliArgs, _config: Config): Promise<void> {
  const { render } = await import('ink');
  const React = await import('react');
  const { App } = await import('../components/index.js');

  const props: { model?: string } = {};
  if (args.model) {
    const modelId = MODEL_MAP[args.model];
    if (modelId) {
      props.model = modelId;
    }
  }

  // Clear screen and enter alternate screen buffer for clean TUI
  process.stdout.write('\x1b[?1049h\x1b[H');

  const instance = render(React.createElement(App, props));

  // Restore main screen buffer on exit
  instance.waitUntilExit().then(() => {
    process.stdout.write('\x1b[?1049l');
  });
}
