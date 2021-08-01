import { color } from '../../terminal/console-color';
import { isMainThread } from 'worker_threads';

(() => {
  // pid is same
  if (isMainThread) {
    console.log(color('FgCyan')(`This is main thread:`), process.pid);
  } else {
    console.log(color('FgGreen')(`This is worker thread:`), process.pid);
  }
})();
