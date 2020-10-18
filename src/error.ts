export enum ErrorType {
  FILE_NOT_FOUND,
}

export class FildNotFoundError extends Error {
  readonly ErrorType: ErrorType = ErrorType.FILE_NOT_FOUND;
  constructor(message: string, public file: string, public path: string) {
    super(message);
  }
}

/**
 * handle final exception, and promise rejection which didn't caught
 */
export const handleUncaughtException = (handle: (error: Error) => never): void => {
  process.on('uncaughtException', error => {
    handle(error);
  });

  process.on('unhandledRejection', async function (error) {
    throw error;
  });
};
