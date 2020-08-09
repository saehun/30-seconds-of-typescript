import * as fs from 'fs';
import * as path from 'path';

export const appendFileWithStream = (filePath: string, data: string): number => {
  const stream = fs.createWriteStream(filePath, { flags: 'a' });
  stream.write(data);
  stream.end();

  // size of bytes written
  return Buffer.byteLength(data, 'utf8');
};

/**
 * same as unix command 'find'
 */
export const find = (startPath: string, ignore: string | RegExp = ''): string[] => {
  const regex = typeof ignore === 'string' ? new RegExp(ignore) : ignore;
  const result: string[] = [];
  recur(startPath);

  function recur(curPath: string): void {
    fs.readdirSync(curPath, { withFileTypes: true })
      .filter(f => {
        // default ignore
        if (ignore && regex.test(f.name)) {
          return false;
        } else if (/\.git/.test(f.name) || /node_modules/.test(f.name)) {
          return false;
        } else if (f.isFile()) {
          result.push(path.join(curPath, f.name));
          return false;
        } else {
          return true;
        }
      })
      .forEach(f => {
        recur(path.join(curPath, f.name));
      });
  }
  return result;
};
