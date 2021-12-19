import { memoizeLRU } from '../memoize-lru'

describe('lru-memoize', () => {
  it('can memoize normal function', () => {
    const mockFn = jest.fn((x: string) => x.toUpperCase());
    const memoizedFn = memoizeLRU(mockFn, { size: 2, hash: x => x });

    const result = memoizedFn('foo');
    const result2 = memoizedFn('bar');
    const result3 = memoizedFn('foo');
    expect(mockFn).toBeCalledTimes(2);
    expect(result).toEqual('FOO');
    expect(result2).toEqual('BAR');
    expect(result3).toEqual('FOO');

    const result4 = memoizedFn('foo');
    const result5 = memoizedFn('baz');
    expect(mockFn).toBeCalledTimes(3);
    expect(result4).toEqual('FOO');
    expect(result5).toEqual('BAZ');
    expect(memoizedFn.__debug__.queue).toEqual(['foo', 'baz']);

    memoizedFn('bar');
    expect(memoizedFn.__debug__.queue).toEqual(['baz', 'bar']);
    expect(mockFn).toBeCalledTimes(4);

    memoizedFn('foo1');
    memoizedFn('foo2');
    memoizedFn('foo3');
    expect(memoizedFn.__debug__.cache.size).toEqual(2);
    expect(memoizedFn.__debug__.queue.length).toEqual(2);
  });

  it('option can be set', () => {
    const mockFn = jest.fn((x: string) => x.toUpperCase());
    const memoizedFn = memoizeLRU(mockFn);
    const result1 = memoizedFn('foo');
    expect(mockFn).toBeCalledTimes(1);
    expect(result1).toEqual('FOO');
  });
});
