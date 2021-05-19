import * as asyncHook from 'async_hooks';

function logAsyncId(name = '') {
  const prefix = name ? `[${name}] ` : '';
  const id = `{ id: '${asyncHook.executionAsyncId()}', parent: ${asyncHook.triggerAsyncId()} }`;
  console.log(`${prefix}${id}`);
}

/**
 * { id: '6', parent: 1 }
 * { id: '7', parent: 1 }
 * { id: '8', parent: 1 }
 * { id: '9', parent: 1 }
 */
export function TimerIsAsyncResource() {
  setImmediate(logAsyncId);
  setImmediate(logAsyncId);
  setImmediate(logAsyncId);
  setImmediate(logAsyncId);
}
// TimerIsAsyncResource();

/**
 * [Promise] { id: '1', parent: 0 }
 * [Promise] { id: '1', parent: 0 }
 * [Promise] { id: '1', parent: 0 }
 * [Promise] { id: '1', parent: 0 }
 * [Inner] { id: '7', parent: 1 }
 * [Outer] { id: '0', parent: 0 }
 * [Inner] { id: '8', parent: 1 }
 * [Outer] { id: '0', parent: 0 }
 * [Inner] { id: '9', parent: 1 }
 * [Outer] { id: '0', parent: 0 }
 * [Inner] { id: '10', parent: 1 }
 * [Outer] { id: '0', parent: 0 }
 */
export function TimerAndPromise() {
  setImmidiateAndLog();
  setImmidiateAndLog();
  setImmidiateAndLog();
  setImmidiateAndLog();

  async function setImmidiateAndLog() {
    await new Promise<void>(resolve => {
      logAsyncId('Promise');
      setImmediate(() => {
        logAsyncId('Inner');
        resolve();
      });
    });
    logAsyncId('Outer');
  }
}
// TimerAndPromise();

/**
 * AsyncHook
 */
export function registerAndRun(fn: any) {
  const fs = require('fs');
  const { fd } = process.stdout;
  let indent = 0;
  asyncHook
    .createHook({
      init(asyncId, type, triggerAsyncId) {
        const eid = asyncHook.executionAsyncId();
        const indentStr = ' '.repeat(indent);
        fs.writeSync(fd, `${indentStr}${type}(${asyncId}):` + ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
      },
      before(asyncId) {
        const indentStr = ' '.repeat(indent);
        fs.writeSync(fd, `${indentStr}before:  ${asyncId}\n`);
        indent += 2;
      },
      after(asyncId) {
        indent -= 2;
        const indentStr = ' '.repeat(indent);
        fs.writeSync(fd, `${indentStr}after:  ${asyncId}\n`);
      },
      destroy(asyncId) {
        const indentStr = ' '.repeat(indent);
        fs.writeSync(fd, `${indentStr}destroy:  ${asyncId}\n`);
      },
    })
    .enable();

  fn();
}

registerAndRun(() => {
  new Promise<void>(resolve => {
    new Promise(resolve => setTimeout(resolve, 0));
    resolve();
  });
});
