import * as fs from 'fs';

/**
 * What if program exited during stream.write process?
 */
export const appendFileWithStream = (filePath: string, data: string): number => {
  const stream = fs.createWriteStream(filePath, { flags: 'a' });
  stream.write(data);
  stream.end();

  // size of bytes written
  return Buffer.byteLength(data, 'utf8');
};
