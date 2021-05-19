/// reference: https://gist.github.com/sebmarkbage/2c7acb6210266045050632ea611aebee
/**
 * Create mock fetcher wrapper
 */
function createMockFetcher<A extends any[], R>(fn: (...args: A) => R): (...args: A) => Promise<R> {
  return (...args) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(fn(...args));
        } catch (e) {
          reject(e);
        }
      }, 15);
    });
}

const fetchUserAsync = createMockFetcher((id: number) => {
  return {
    id,
    name: 'foo',
  };
});

const cache = new Map<number, any>();
const pendings = new Map<number, any>();

function fetchUser(id: number): { id: number; name: string } {
  if (cache.has(id)) {
    return cache.get(id);
  }

  if (pendings.has(id)) {
    throw pendings.get(id);
  }

  const promise = fetchUserAsync(id).then(user => {
    pendings.delete(id);
    cache.set(id, user);
  });

  pendings.set(id, promise);
  throw promise;
}

async function runPureTask(task: any) {
  for (;;) {
    try {
      return task();
    } catch (x) {
      if (x instanceof Promise) {
        await x;
      } else {
        throw x;
      }
    }
  }
}
