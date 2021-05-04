/**
 * Confirm
 */
export const confirm = (message: string): Promise<boolean> => {
  return new Promise(resolve => {
    console.log(`${message} [y/N]`);
    process.stdin.on('data', function (data) {
      process.stdin.pause();
      if (data.toString() === 'y\n') {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    process.stdin.on('end', function () {
      resolve(false);
    });
  });
};
