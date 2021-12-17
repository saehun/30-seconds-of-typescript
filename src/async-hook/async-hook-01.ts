import { createTestSuite, synclog as _synclog } from './async-hook-test-utils';
import { composeCallbacks, createLoggingCallbacks } from './async-hook-callbacks';
import { executionAsyncId, AsyncResource, executionAsyncResource, createHook } from 'async_hooks';

/**
 * executionAsyncId() returns the `asyncId` of the current execution context.
 */
const synclog = _synclog;
const synclogId = (prefix = '') =>
  synclog(`${prefix} asyncId => ${executionAsyncId()} asyncResource => ${executionAsyncResource()}`);

const enableLoggingHooks = (prefix = '') => createHook(composeCallbacks(createLoggingCallbacks(prefix))).enable();

enableLoggingHooks();

/**
 * npx ts-node src/async-hook/async-hook-01.ts console.log
 */
createTestSuite({
  'console.log': () => {
    console.log('Hello World!');
  },
  'console.log2': () => {
    console.log('Hello World!');
    console.log('Bye World!');
  },
  'console.log3': () => {
    console.log('Hello World!');
    console.log('Yolo World!');
    console.log('Bye World!');
  },
  'Promise.resolve': () => {
    Promise.resolve(true);
  },
  'async-function': async () => {
    synclog('Hello World!');
  },
  'async-function-after-promise': async () => {
    await Promise.resolve(true);
    synclog('Hello World!');
  },
  'double-initialize': () => {
    enableLoggingHooks('  ');
    console.log('Hello World!');
  },
  'double-initialize-async': async () => {
    enableLoggingHooks('  ');
    console.log('Hello World!');
  },
  'sync-id': () => {
    synclogId();
  },
  'async-id': async () => {
    synclogId();
  },
  'async-id-promise': () => {
    Promise.resolve().then(() => {
      synclogId();
    });
  },
  timeout: () => {
    setTimeout(() => {
      synclogId();
    });
  },
  tick: () => {
    process.nextTick(() => {
      synclogId();
    });
  },
  immediate: () => {
    setImmediate(() => {
      synclogId();
    });
  },
  'new-promise': () => {
    new Promise<void>(resolve => {
      synclogId('(1)');
      resolve();
      synclogId('(after-resolve)');
    })
      .then(() => {
        synclogId('(2)');
      })
      .then(() => {
        synclogId('(3)');
      });
  },
  'promise-resolve-multiple': () => {
    Promise.resolve()
      .then(() => synclogId('(1)'))
      .then(() => synclogId('(2)'))
      .then(() => synclogId('(3)'))
      .then(() => synclogId('(4)'));
  },
  'await-promise-multiple': async () => {
    synclogId('(1)');
    await Promise.resolve();
    synclogId('(2)');
    await Promise.resolve();
    synclogId('(3)');
    await Promise.resolve();
    synclogId('(4)');
  },
  'nested-timeout': () => {
    setTimeout(() => {
      synclogId('(1)');
      setTimeout(() => {
        synclogId('(2)');
      });
      synclogId('(3)');
    });
  },
  'async-resource': () => {
    new AsyncResource('MyResource').runInAsyncScope(() => {
      synclogId('(inner)');
    });
    synclogId('(outer)');
  },
  'async-resource-then': () => {
    new AsyncResource('MyResource')
      .runInAsyncScope(() => {
        synclogId('(1)');
        return Promise.resolve();
      })
      .then(() => {
        synclogId('(2)');
      });
  },
}).run();
