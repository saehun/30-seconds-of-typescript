/**
 * Parameter, Return type signature is preserved
 */
export function wrap<F extends (...args: any[]) => any>(fn: F): F {
  return <F>function (...args: any[]) {
    // do something here
    return fn(...args);
  };
}
