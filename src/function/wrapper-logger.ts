/**
 * Wrap function and log start, end, on-error
 */
export function wrap<R, A extends any[]>(fn: (...args: A) => R, defaultName = '') {
  return (...args: A): R => {
    const logName = fn.name || defaultName;
    console.log(logName, '- start');
    /** write logic here */
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return handlePromise(result, logName);
      } else {
        console.log(logName, '- finish');
        return result;
      }
    } catch (e) {
      console.log(logName, '- error');
      throw e;
    }
  };
}

export function handlePromise<P extends Promise<any>>(promise: P, logName: string): P {
  return new Promise((resolve, reject) => {
    promise
      .then((result: P) => {
        console.log(logName, '-finish');
        resolve(result);
      })
      .catch(e => {
        console.log(logName, '- error');
        reject(e);
      });
  }) as P;
}

/**
 * Examples
 */
const createPayload = wrap(() => {
  console.log('inside of `createPayload`');
  return { payload: 1234 };
}, 'CREATE_PAYLOAD');

const getUser = wrap(async () => {
  console.log('inside of `getUser`');
  return {
    name: 'foo',
  };
}, 'GET_USER');

const woops = wrap(async () => {
  console.log('inside of `woops`');
  throw new Error('woops error message');
}, 'GET_USER');

// Run:
// npx ts-node src/function/wrapper-logger.ts
(async (): Promise<void> => {
  try {
    createPayload();
    await getUser();
    await woops();
  } catch (e) {
    console.log(e);
  }
})();
