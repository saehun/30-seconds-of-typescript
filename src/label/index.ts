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

// main()
