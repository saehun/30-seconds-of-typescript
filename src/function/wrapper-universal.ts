type Wrapper = {
  <A extends any[], R>(fn: (...args: A) => R): (...args: A) => R;
  <A extends any[], R>(fn: (...args: A) => Promise<R>): (...args: A) => Promise<R>;
};

type GenericFunction<A extends any[], R> = ((...args: A) => R) | ((...args: A) => Promise<R>);

const isAsync = <A extends any[], R>(fn: GenericFunction<A, R>): fn is (...args: A) => Promise<R> => {
  return fn.constructor.name === 'AsyncFunction' || Object.prototype.toString.call(fn).slice(8, -1) === 'AsyncFunction';
};

const wrap: Wrapper = <A extends any[], R>(fn: GenericFunction<A, R>) => {
  if (isAsync(fn)) {
    return async function (this: any, ...args: A): Promise<R> {
      // Add your business logic here
      return await fn.apply(this, args);
    };
  } else {
    return function (this: any, ...args: A): R {
      // Add your business logic here
      return fn.apply(this, args);
    };
  }
};

// Implementation of the wrapper
// export function wrap<A extends any[], R>(fn: any): any {

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
