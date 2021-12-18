import Denque from 'denque';

/**
 * Overloading Implementation
 */
export interface ConcurrentResource {
  now: number;
  max: number;
  denque: Denque;
}

export class ConcurrentResourceImpl implements ConcurrentResource {
  public readonly denque = new Denque<number>();
  public readonly now = 0;

  constructor(public readonly max: number) {}
}

export function MaxConcurrency(max: number): MethodDecorator;
export function MaxConcurrency(resource: ConcurrentResource): MethodDecorator;
export function MaxConcurrency(resourceKey: string): MethodDecorator;
export function MaxConcurrency(arg: any) {
  return (_: any, __: string, descriptor: PropertyDescriptor) => {
    const { decorated, setResource } = withMaxConcurrency(descriptor.value);
    if (typeof arg === 'number') {
      setResource(new ConcurrentResourceImpl(arg));
      descriptor.value = decorated;
    } else if (typeof arg === 'object') {
      setResource(arg);
      descriptor.value = decorated;
    } else {
      let initialized = false;
      descriptor.value = function (...args: any[]) {
        if (!initialized) {
          // TBD: assert `this[arg]` is concurrent resource
          setResource(this[arg]);
          initialized = true;
        }
        return decorated.apply(this, args);
      };
    }
  };
}

export function withMaxConcurrency<I extends any[], O>(
  fn: (...args: I) => Promise<O>,
  resource: ConcurrentResource = new ConcurrentResourceImpl(Number.MAX_VALUE)
) {
  return { setResource, decorated };

  function setResource(newResource: ConcurrentResource) {
    resource = newResource;
  }

  async function decorated(...args: I): Promise<O> {
    if (resource.now >= resource.max) {
      await new Promise<void>(resolve => {
        resource.denque.push(resolve);
      });
    }

    try {
      resource.now++;
      return await fn.apply(this, args);
    } finally {
      resource.now--;
      resource.denque.shift()?.();
    }
  }
}

/**
 * Example.
 *
 * @shell - DEBUG=* npx ts-node src/decorators/concurrency-advanced.ts
 */
class SampleClass {
  constructor(
    private readonly myConcurrentResource: ConcurrentResourceImpl,
    private readonly id: string,
    private readonly jobs: Set<string>,
    private readonly log: (...args: any[]) => void
  ) {}

  @MaxConcurrency('myConcurrentResource')
  async run(i: number): Promise<number> {
    const key = `${this.id}-${i}`;
    this.jobs.add(key);
    this.log(`Job(${key}) START, jobs: [${Array.from(this.jobs)}]`);
    await new Promise(resolve => setTimeout(resolve, 200));
    this.jobs.delete(key);
    this.log(`Job(${key}) DONE, jobs: [${Array.from(this.jobs)}]`);
    return i;
  }
}

class SampleClass2 {
  constructor(
    private readonly resource: ConcurrentResourceImpl,
    private readonly id: string,
    private readonly jobs: Set<string>,
    private readonly log: (...args: any[]) => void
  ) {}

  @MaxConcurrency('resource')
  async run(i: number): Promise<number> {
    const key = `${this.id}-${i}`;
    this.jobs.add(key);
    this.log(`Job(${key}) START, jobs: [${Array.from(this.jobs)}]`);
    await new Promise(resolve => setTimeout(resolve, 100));
    this.jobs.delete(key);
    this.log(`Job(${key}) DONE, jobs: [${Array.from(this.jobs)}]`);
    return i;
  }
}

(async () => {
  const jobs = new Set<string>();
  const resource = new ConcurrentResourceImpl(5);
  const sample = new SampleClass(resource, 'foo', jobs, require('debug')('sample'));
  const sample1 = new SampleClass(resource, 'bar', jobs, require('debug')('sample1'));
  const sample2 = new SampleClass2(resource, 'baz', jobs, require('debug')('sample2'));
  const arr = Array(30).fill(null);
  arr.map(async (_, i) => {
    sample.run(i + 1);
    sample1.run(i + 1);
    sample2.run(i + 1);
  });
})();
