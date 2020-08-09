import * as fs from 'fs';

export const appendFileWithStream = (filePath: string, data: string): number => {
  const stream = fs.createWriteStream(filePath, { flags: 'a' });
  stream.write(data);
  stream.end();

  // size of byte written
  return Buffer.byteLength(data, 'utf8');
};
