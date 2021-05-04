/**
 * Make program to consume stdin
 * cat foo.txt | npx ts-node source.ts
 */
export const consumeStdin = (): Promise<string> => {
  return new Promise(resolve => {
    let data = '';

    process.stdin.on('data', function (chunk) {
      data += chunk;
    });

    process.stdin.on('end', function () {
      resolve(data);
    });
  });
};
