import { withMaxConcurrency } from '../function/concurrency';

/**
 * First Implementation
 */
export function MaxConcurrencySimple(concurrency: number): MethodDecorator {
  const wrap = withMaxConcurrency(concurrency);
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    descriptor.value = wrap(descriptor.value);
  };
}

/**
 * Example.
 *
 * @shell - DEBUG=* npx ts-node src/decorators/concurrency.ts
 */
class SampleClass {
  private readonly jobs = new Set<number>();
  private readonly log = require('debug')('concurrency');

  @MaxConcurrencySimple(3)
  async run(i: number): Promise<number> {
    this.jobs.add(i);
    this.log(`Job(${i}) START, jobs: [${Array.from(this.jobs)}]`);
    await new Promise(resolve => setTimeout(resolve, 200));
    this.jobs.delete(i);
    this.log(`Job(${i}) DONE, jobs: [${Array.from(this.jobs)}]`);
    return i;
  }
}

(async () => {
  const sample = new SampleClass();
  const arr = Array(30).fill(null);
  console.log(await Promise.all(arr.map((_, i) => sample.run(i + 1))));
})();
