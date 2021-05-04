/**
 * Parameter, Return type signature is preserved
 */
export function wrap<A extends any[], R>(fn: (...a: A) => R) {
  return function (...args: A): R {
    return fn(...args);
  };
}

/**
 * Promisify wrapper
 */
export function wrapPromise<A extends any[], R>(fn: (...a: A) => R) {
  return async function (...args: A): Promise<R> {
    return fn(...args);
  };
}
