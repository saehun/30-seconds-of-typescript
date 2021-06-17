import { load } from 'cheerio';

export class WithDom<T> {
  private constructor(private readonly parse: ($: cheerio.Root) => T) {}
  static of<T>(parse: ($: cheerio.Root) => T) {
    return new WithDom(parse);
  }
  chain<O>(next: (input: T) => WithDom<O>): WithDom<O> {
    return new WithDom($ => {
      const out = this.parse($);
      return next(out).parse($);
    });
  }
  map<O>(fn: (input: T) => O): WithDom<O> {
    return new WithDom($ => {
      return fn(this.parse($));
    });
  }
  tap(consume: (input: T) => void) {
    return new WithDom($ => {
      const out = this.parse($);
      consume(out);
      return out;
    });
  }
  parseHtml(html: string) {
    return this.parse(load(html));
  }
}
