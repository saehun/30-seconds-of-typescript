import { AxiosInstance } from 'axios';
import { AsyncReturnType } from '../types/AsyncReturnType';

class Fetcher<T> {
  private constructor(private readonly fetch: (client: AxiosInstance) => Promise<T>) {}

  static of<T>(fetch: (client: AxiosInstance) => Promise<T>): Fetcher<T> {
    return new Fetcher(fetch);
  }

  tap(consume: (input: T) => Promise<void> | void): Fetcher<T> {
    return new Fetcher(async client => {
      const out = await this.run(client);
      await consume(out);
      return out;
    });
  }

  map<O>(fetch: (input: T) => Promise<O> | O): Fetcher<O> {
    return new Fetcher(async client => {
      const out = await this.run(client);
      return fetch(out);
    });
  }

  apply<I, O = T extends (arg: I) => any ? AsyncReturnType<T> : never>(
    input: Fetcher<I>
  ): O extends never ? never : Fetcher<O> {
    return new Fetcher(async client => {
      const fetch = await this.run(client);
      if (typeof fetch === 'function') {
        const arg = await input.run(client);
        return fetch(arg);
      }
      throw new TypeError(`${fetch} is not a function`);
    }) as O extends never ? never : Fetcher<O>;
  }

  chain<O>(next: (input: T) => Fetcher<O>): Fetcher<O> {
    return new Fetcher(async client => {
      const out = await this.run(client);
      return next(out).run(client);
    });
  }

  flat(): (client: AxiosInstance) => Promise<T> {
    return this.fetch;
  }

  async run(client: AxiosInstance): Promise<T> {
    return await this.fetch(client);
  }
}

export default Fetcher;
