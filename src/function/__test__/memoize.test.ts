import { memoize } from '../memoize';

describe('memoize', () => {
  it('can memozie normal file', () => {
    const mockFn = jest.fn((x: number) => x);

    const memoizedFn = memoize(mockFn);
    const result = memoizedFn(100);
    const result2 = memoizedFn(200);
    const result3 = memoizedFn(100);

    expect(result).toEqual(100);
    expect(result2).toEqual(200);
    expect(result3).toEqual(100);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('can memoize promise', async () => {
    const mockFn = jest.fn((x: number) => Promise.resolve(x));

    const memoizedFn = memoize(mockFn);
    const result = await memoizedFn(100);
    const result2 = await memoizedFn(200);
    const result3 = await memoizedFn(100);

    expect(result).toEqual(100);
    expect(result2).toEqual(200);
    expect(result3).toEqual(100);
    expect(mockFn).toBeCalledTimes(2);
  });
});
