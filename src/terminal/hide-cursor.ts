import * as cliCursor from 'cli-cursor';

/**
 * hide cli cursor from terminal
 */
export function hideCursor() {
  cliCursor.hide(process.stdout);

  return function showCursor() {
    cliCursor.show(process.stdout);
  };
}
