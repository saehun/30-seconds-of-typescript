/**
 * Parameter, Return type signature is preserved
 */
export function wrap<A extends any[], R>(fn: (...a: A) => R) {
  return function (...args: A): R {
    return fn(...args);
  };
}
