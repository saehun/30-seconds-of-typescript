import { HookCallbacks } from 'async_hooks';

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
