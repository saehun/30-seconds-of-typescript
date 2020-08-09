import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

/**
 * naming 'recursive' ?
 */
export const findRecursive = (target: string) => (start = process.cwd()): string => {
  let dir = start;

  while (!fs.existsSync(path.join(dir, target))) {
    if (dir === os.homedir()) throw new Error(`Can't find ${target}'`);
    dir = path.join(dir, '..');
  }

  return dir;
};

export const findGitRoot = findRecursive('.git');
export const findNpmRoot = findRecursive('package.json');
