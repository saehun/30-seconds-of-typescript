import { AxiosInstance } from 'axios';

class Fetcher<T> {
  private constructor(private readonly fetch: (client: AxiosInstance) => Promise<T>) {}
  static of<T>(fetch: (client: AxiosInstance) => Promise<T>) {
    return new Fetcher(fetch);
  }
  chain<O>(next: (input: T) => Fetcher<O>): Fetcher<O> {
    return new Fetcher(async client => {
      const out = await this.run(client);
      return next(out).run(client);
    });
  }
  tap(consume: (input: T) => Promise<void> | void): Fetcher<T> {
    return new Fetcher(async client => {
      const out = await this.run(client);
      await consume(out);
      return out;
    });
  }
  map<O>(fn: (input: T) => Promise<O> | O): Fetcher<O> {
    return new Fetcher(async client => {
      const out = await this.run(client);
      return fn(out);
    });
  }
  async run(client: AxiosInstance): Promise<T> {
    return await this.fetch(client);
  }
}

export default Fetcher;
