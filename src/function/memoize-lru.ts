interface MemoizeStorage<R> {
  cache: Map<string, R>;
  queue: string[];
}

/**
 * Memoize wrapper with max item size
 */
export function memoizeLRU<A extends any[], R>(
  fn: (...args: A) => R,
  { size = 100, hash = (...args: A) => JSON.stringify(args) } = {}
) {
  const storage: MemoizeStorage<R> = {
    cache: new Map(),
    queue: [],
  };

  wrapped.__debug__ = storage;
  return wrapped;

  function wrapped(...args: A): R {
    const key = hash(...args);
    if (storage.cache.has(key)) {
      return get(key, storage);
    }
    const value = fn(...args);
    set(key, value, storage, size);
    return value;
  }
}

function set<R>(key: string, value: R, storage: MemoizeStorage<R>, size: number) {
  storage.queue.push(key);
  storage.cache.set(key, value);
  if (storage.queue.length > size) {
    const key = storage.queue.shift();
    if (key) {
      storage.cache.delete(key);
    }
  }
}

function get<R>(key: string, storage: MemoizeStorage<R>): R {
  storage.queue = storage.queue.reduce((acc: string[], n) => {
    if (n !== key) {
      acc.push(n);
    }
    return acc;
  }, []);
  storage.queue.push(key);
  return storage.cache.get(key)!;
}
