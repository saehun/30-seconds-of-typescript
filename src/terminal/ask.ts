/**
 * ask
 */
export const ask = (message: string): Promise<string> => {
  return new Promise(resolve => {
    process.stdout.write(message);
    const buffer: string[] = [];
    process.stdin.on('data', function (data) {
      const text = data.toString('utf-8');
      if (text.includes('\n')) {
        process.stdin.pause();
        const [slice] = text.split('\n');
        buffer.push(slice);
        resolve(buffer.join(''));
      } else {
        buffer.push(text);
      }
    });
  });
};

// ask('What is your name? ').then(console.log);
