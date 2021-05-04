import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

/**
 * naming?
 */
export const findUp = (target: string) => (start = process.cwd()): string => {
  let dir = start;

  while (!fs.existsSync(path.join(dir, target))) {
    if (dir === os.homedir()) throw new Error(`Can't find ${target}'`);
    dir = path.join(dir, '..');
  }

  return dir;
};

export const findGitRoot = findUp('.git');
export const findNpmRoot = findUp('package.json');

/**
 * Promise version. maybe its gonna be default?
 */
export const findUpAsync = (target: string) => async (start = process.cwd()): Promise<string> => {
  const fsExists = (filepath: string): Promise<boolean> => new Promise(resolve => fs.exists(filepath, resolve));

  let dir = start;

  while (await fsExists(path.join(dir, target))) {
    if (dir === os.homedir()) throw new Error(`Can't find ${target}'`);
    dir = path.join(dir, '..');
  }

  return dir;
};
