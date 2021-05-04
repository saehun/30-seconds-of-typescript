/**
 * Extract inner type of Promise
 */
type Bar = {
  baz: string;
};

declare function foo(): Promise<Bar>;

type Await<T> = T extends Promise<infer K> ? K : never;

/** Bar2 === Bar */
type Bar2 = Await<ReturnType<typeof foo>>;
