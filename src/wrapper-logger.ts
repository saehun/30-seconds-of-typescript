export function wrap<R, A extends any[]>(fn: (...args: A) => R, defaultName = '') {
  return (...args: A): R => {
    const logName = fn.name ?? defaultName;
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
const createPayload = wrap(async () => {
  return {};
}, 'CREATE_PAYLOAD');

const getUser = wrap(async () => {
  return {
    name: 'foo',
  };
}, 'GET_USER');

(async (): Promise<void> => {
  try {
    const payload = await createPayload();
    console.log(payload);
    console.log(await getUser());
    Promise.resolve(Promise.resolve(Promise.resolve('hi'))).then(x => console.log(x));
  } catch {
    /**  */
  }
})();
