import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import Denque from 'denque';

interface ConcurrencyOption {
  concurrency: number;
  subject: BehaviorSubject<number>;
}

/**
 * Implementation with rxjs (I think it is somewhat verbose...)
 */
export function withMaxConcurrencyRxjs<I extends any[], O>(
  { concurrency, subject = new BehaviorSubject(0) }: ConcurrencyOption,
  fn: (...args: I) => Promise<O>
) {
  return async (...args: I): Promise<O> =>
    new Promise<O>((resolve, reject) => {
      subject
        .pipe(
          filter(() => subject.value < concurrency),
          take(1)
        )
        .subscribe(() => {
          subject.next(subject.value + 1);
          fn(...args)
            .then(resolve)
            .catch(reject)
            .finally(() => subject.next(subject.value - 1));
        });
    });
}

/**
 * Implementation without rxjs.
 */
export function withMaxConcurrencyVanilla<I extends any[], O>(concurrency: number, fn: (...args: I) => Promise<O>) {
  let current = 0;
  const denque = new Denque<() => void>();
  return async (...args: I): Promise<O> => {
    if (current >= concurrency) {
      await new Promise<void>(resolve => {
        denque.push(resolve);
      });
    }

    try {
      current++;
      return await fn(...args);
    } finally {
      current--;
      denque.shift()?.();
    }
  };
}

/**
 * Implementation without rxjs. curried, split state createion
 */
export function withMaxConcurrency(concurrency: number) {
  let current = 0;
  const denque = new Denque<() => void>();
  return <I extends any[], O>(fn: (...args: I) => Promise<O>) =>
    async function (...args: I): Promise<O> {
      if (current >= concurrency) {
        await new Promise<void>(resolve => {
          denque.push(resolve);
        });
      }

      try {
        current++;
        return await fn.apply(this, args);
      } finally {
        current--;
        denque.shift()?.();
      }
    };
}

/**
 * Refactor with ConcurrentResource abstraction
 */
export interface ConcurrentResource {
  key: string;
  now: number;
  max: number;
  denque: Denque;
}

export class ConcurrentResourceImpl implements ConcurrentResource {
  public readonly denque = new Denque<number>();
  public readonly now = 0;

  constructor(public readonly key: string, public readonly max: number) {}
}

export function limitConcurrency<I extends any[], O>(resource: ConcurrentResource, fn: (...args: I) => Promise<O>) {
  return async function (...args: I): Promise<O> {
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
  };
}
