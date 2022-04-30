import { Writable, Readable } from 'stream';
import { spawn, ChildProcess, ChildProcessByStdio } from 'child_process';

const EDITOR_COMMAND = process.env.EDITOR ?? 'vim';

function withPromise(child: ChildProcessByStdio<Writable | null, Readable | null, Readable | null>): Promise<{
  exitCode: ChildProcess['exitCode'];
  signal: NodeJS.Signals | null;
}> {
  return new Promise((resolve, reject) => {
    child.on('exit', (exitCode, signal) => {
      resolve({ exitCode, signal });
    });

    child.on('error', error => {
      reject(error);
    });

    if (child.stdin) {
      child.stdin.on('error', error => {
        reject(error);
      });
    }
  });
}

export async function editFileAsync(filepath: string): Promise<void> {
  await withPromise(spawn(EDITOR_COMMAND, [filepath], { stdio: 'inherit' }));
}
