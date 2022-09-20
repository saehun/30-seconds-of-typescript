let numberIterable: Iterable<number>;

const numberIterableLiteral = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const numberIterableLiteral2 = {
  [Symbol.iterator]() {
    let value = 1;
    return {
      next() {
        if (value <= 3) {
          return { value: value++, done: false };
        } else {
          return { value, done: true };
        }
      },
    };
  },
};

const numberGenerator = function* () {
  yield 1;
  yield 2;
  yield 3;
};

numberIterable = numberIterableLiteral;
numberIterable = numberIterableLiteral2;
numberIterable = numberGenerator();

(() => {
  console.log({ numberIterableLiteral: [...numberIterableLiteral] });
  console.log({ numberIterableLiteral2: [...numberIterableLiteral2] });
  console.log({ numberGenerator: [...numberGenerator()] });
})();
