import * as fs from 'fs';

function createLogger(tty: string) {
  const writeStream = fs.createWriteStream(tty);
  return {
    log: (...args: any[]) => writeStream.write(args.join(' ') + '\n'),
  };
}

const logger = createLogger('/dev/ttys003');

logger.log('hi');
