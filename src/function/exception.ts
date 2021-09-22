// When we use try-catch block, The code block is not composable since it is just written
// with multiple statements. What we need to do to compose try-catch functionalities?
// There might be a lot of solutions. Hereby I introduce a simple uitlization of higher-
// order-function. It is a decorator function(not a traditional decorator).
// Wrapped function is kept its signature.
export function canThrow<A extends any[], R>(fn: (...args: A) => R) {
  function _catch<Alt>(handle: (e: any, ...args: A) => Alt) {
    return (...args: A): R extends Promise<infer K> ? Promise<K | Alt> : R | Alt => {
      try {
        const result = fn(...args);
        if (result instanceof Promise) {
          // TODO: remove 'any' assertion
          return (result.catch(e => handle(e, ...args)) as unknown) as any;
        } else {
          // TODO: remove 'any' assertion
          return (result as unknown) as any;
        }
      } catch (e) {
        // TODO: remove 'any' assertion
        return (handle(e, ...args) as unknown) as any;
      }
    };
  }
  return { catch: _catch };
}
