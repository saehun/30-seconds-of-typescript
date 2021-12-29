import * as fs from 'fs-extra';
import * as path from 'path';

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

/**
 * same as unix command 'find'
 */
export const findAsync = async (startPath: string, ignore: string | RegExp = ''): Promise<string[]> => {
  const regex = typeof ignore === 'string' ? new RegExp(ignore) : ignore;
  const result: string[] = [];
  await recur(startPath);

  async function recur(curPath: string): Promise<void> {
    const children = await fs.readdir(curPath, { withFileTypes: true });
    await Promise.all(
      children
        .filter(f => {
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
        .map(async f => {
          await recur(path.join(curPath, f.name));
        })
    );
  }
  return result;
};
