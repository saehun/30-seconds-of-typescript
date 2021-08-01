import { Worker } from 'worker_threads';
import './worker';
import * as path from 'path';

(() => {
  const worker = new Worker(workerFile('worker'), {
    workerData: [],
  });
})();

function workerFile(name: string): string {
  return path.resolve(__dirname, __filename.endsWith('.js') ? `./${name}.js` : `./${name}.import.js`);
}
