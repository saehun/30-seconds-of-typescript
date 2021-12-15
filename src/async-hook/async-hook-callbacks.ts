import { HookCallbacks } from 'async_hooks';
import { formatAsyncInfo, synclog } from './async-hook-test-utils';

export function createLoggingCallbacks(prefix = ''): HookCallbacks {
  return {
    init(asyncId, type, triggerAsyncId) {
      synclog(formatAsyncInfo('init', { asyncId, type, triggerAsyncId }, prefix));
    },
    before(asyncId) {
      synclog(formatAsyncInfo('before', { asyncId }, prefix));
    },
    after(asyncId) {
      synclog(formatAsyncInfo('after', { asyncId }, prefix));
    },
    destroy(asyncId) {
      synclog(formatAsyncInfo('destroy', { asyncId }, prefix));
    },
    promiseResolve(asyncId) {
      synclog(formatAsyncInfo('promiseResolve', { asyncId }, prefix));
    },
  };
}

export function composeCallbacks(...callbacks: HookCallbacks[]): HookCallbacks {
  return {
    init: composeCallback('init'),
    before: composeCallback('before'),
    after: composeCallback('after'),
    destroy: composeCallback('destroy'),
    promiseResolve: composeCallback('promiseResolve'),
  };

  function composeCallback<K extends keyof HookCallbacks>(key: K): HookCallbacks[K] {
    return (...args: any[]): void => {
      for (const callback of callbacks) {
        if (key in callback) {
          callback[key]?.apply(null, args);
        }
      }
    };
  }
}
