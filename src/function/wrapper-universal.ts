// Overload to handle synchronous functions
export function wrap<A extends any[], R>(fn: (...args: A) => R): (...args: A) => R;

// Overload to handle asynchronous functions
export function wrap<A extends any[], R>(fn: (...args: A) => Promise<R>): (...args: A) => Promise<R>;

// Implementation of the wrapper
export function wrap<A extends any[], R>(fn: any): any {
  // Check if the function is asynchronous
  const isAsync =
    fn.constructor.name === 'AsyncFunction' || Object.prototype.toString.call(fn).slice(8, -1) === 'AsyncFunction';

  if (isAsync) {
    return async function (...args: A): Promise<R> {
      // Add your business logic here
      return await fn(...args);
    };
  } else {
    return function (...args: A): R {
      // Add your business logic here
      return fn(...args);
    };
  }
}

/** usecase */ {
  async function usecase() {
    function syncFn(a: number, b: number): number {
      return a + b;
    }

    async function asyncFn(a: number, b: number): Promise<number> {
      return a + b;
    }

    const wrappedSyncFn = wrap(syncFn); // Wrapped synchronous function
    const wrappedAsyncFn = wrap(asyncFn); // Wrapped asynchronous function

    console.log(wrappedSyncFn(1, 2));
    wrappedAsyncFn(1, 2).then(console.log);
  }

  void usecase;
  // usecase();
}
