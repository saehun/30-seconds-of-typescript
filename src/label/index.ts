function main() {
  outerBlock: for (const outerCounter of Array(10)
    .fill(null)
    .map((_, i) => i + 1)) {
    let innerCounter = 0;
    innerBlock: while (true) {
      console.log(`counter: ${outerCounter}, innerCounter: ${innerCounter++}`);
      if (innerCounter === 3) {
        break innerBlock;
      }
      if (outerCounter === 5) {
        break outerBlock;
      }
    }
  }
}

// main();
// counter: 1, innerCounter: 0
// counter: 1, innerCounter: 1
// counter: 1, innerCounter: 2
// counter: 2, innerCounter: 0
// counter: 2, innerCounter: 1
// counter: 2, innerCounter: 2
// counter: 3, innerCounter: 0
// counter: 3, innerCounter: 1
// counter: 3, innerCounter: 2
// counter: 4, innerCounter: 0
// counter: 4, innerCounter: 1
// counter: 4, innerCounter: 2
// counter: 5, innerCounter: 0
