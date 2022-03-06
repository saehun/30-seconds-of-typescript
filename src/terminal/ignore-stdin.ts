import { createInterface } from 'readline';
import { Writable } from 'stream';

/**
 * ignore stdin
 */
export function ignoreStdin() {
  const mutedStream = new Writable();
  const readlineInterface = createInterface({
    input: process.stdin,
    output: mutedStream,
  });

  readlineInterface.on('SIGINT', () => {
    if (process.listenerCount('SIGINT') === 0) {
      process.exit(0);
    } else {
      readlineInterface.close();
      process.kill(process.pid, 'SIGINT');
    }
  });

  return function resumeStdin() {
    readlineInterface.close();
  };
}
