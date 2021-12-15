import chalk from 'chalk';

/**
 * $ npx ts-node src/async-hook/async-hook-01.ts
 */
declare global {
  namespace NodeJS {
    interface Process {
      _rawDebug: (arg: string) => void;
    }
  }
}

export const synclog = process._rawDebug;

export type AsyncPhase = 'init' | 'before' | 'after' | 'destroy' | 'promiseResolve';

export function formatAsyncInfo(
  phase: AsyncPhase,
  { asyncId, triggerAsyncId, type }: { asyncId: number; type?: string; triggerAsyncId?: number },
  prefix = ''
) {
  const coloredPhase =
    phase === 'init'
      ? chalk.bgRed('INIT')
      : phase === 'before'
      ? chalk.bgGreen('BEFORE')
      : phase === 'after'
      ? chalk.bgBlue('AFTER')
      : phase === 'destroy'
      ? chalk.bgGrey('DESTROY')
      : chalk.bgBlack('PROMISE_RESOLVE');

  return (
    `${prefix}(asyncId: ${colorize(asyncId)}) ${coloredPhase}` +
    (type ? ` (resource=${chalk.yellowBright(type)}) ` : '') +
    (triggerAsyncId ? `(trigger=${colorize(triggerAsyncId)})` : '')
  );
}

export function createTestSuite(suites: Record<string, (...args: any[]) => any>): { run: (command?: string) => void } {
  function sourceLog(command: string) {
    synclog(`=============== SOURCE ${command} ================`);
    synclog(suites[command].toString().replace(/ {4}/g, '  '));
  }

  function startLog(command: string) {
    synclog(`================ START ${command} ================`);
  }

  function candidates() {
    synclog(`=================== CANDIDATES ===================`);
    synclog(
      Object.keys(suites)
        .map(key => `- ${key}`)
        .join('\n')
    );
  }

  return {
    run(command = process.argv[2]) {
      if (command in suites) {
        candidates();
        sourceLog(command);
        startLog(command);
        return suites[command]();
      }
    },
  };
}

const colors: Array<keyof typeof chalk> = [
  'redBright',
  'yellowBright',
  'greenBright',
  'cyanBright',
  'blueBright',
  'magentaBright',
  'red',
  'yellow',
  'green',
  'cyan',
  'blue',
  'magenta',
];
function colorize(id: number): string {
  return (chalk as any)[colors[id % colors.length]](id);
}
