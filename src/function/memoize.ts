/**
 * memoize
 */
export function memoize<A extends any[], R>(
  fn: (...args: A) => R,
  hash: (...args: A) => string = (...args) => JSON.stringify(args)
) {
  const cache = new Map<string, R>();

  return (...args: A): R => {
    const key = hash(...args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
