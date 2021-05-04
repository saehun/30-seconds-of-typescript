import { promisify } from 'util';
import { exec as _exec } from 'child_process';

/**
 * You don't need execa anymore!
 */
const exec = promisify(_exec);

export async function run(command: string, option: { silence: boolean } = { silence: false }): Promise<string> {
  const { stdout } = await exec(command);
  if (option.silence == false) {
    console.log(stdout);
  }
  return stdout;
}

/**
 * Example
 */
(async (): Promise<void> => {
  await run('ls -al');
  await run('node --version');
})();
