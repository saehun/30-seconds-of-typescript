import { clearLine, cursorTo, moveCursor } from 'readline';
import { ignoreStdin } from './ignore-stdin';
import { hideCursor } from './hide-cursor';

/**
 * Clear console with given number of lines
 */
export function clear(linesToClear: number) {
  cursorTo(process.stdout, 0);
  for (let i = 0; i < linesToClear; i++) {
    if (i > 0) {
      moveCursor(process.stdout, 0, -1);
    }
    clearLine(process.stdout, 1);
  }
}

// helper
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @example #1
 */
export async function example_clearConsoleLog() {
  const showCursor = hideCursor();
  const resumeStdin = ignoreStdin();
  console.log('Here is a proverb for you :)');

  for (const line of [
    'The best code is no code.',
    'Where there is no code, there are no bugs.',
    'No API to learn.',
    'No awkward UI.',
    'The best refactors are deletions.',
  ]) {
    await sleep(1000);
    // console.log print 2 lines to terminal (`\n` is followed)
    clear(2);
    console.log(line);
  }

  showCursor();
  resumeStdin();
}

/**
 * run test
 */
example_clearConsoleLog();
