/**
 * handle final exception, and promise rejection which didn't caught
 */
export const handleUncaughtException = (handle: (error: Error) => never): void => {
  process.on('uncaughtException', error => {
    handle(error);
  });

  process.on('unhandledRejection', error => {
    throw error;
  });
};
