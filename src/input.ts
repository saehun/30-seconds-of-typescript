export const getPipeIn = (): Promise<string> => {
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
