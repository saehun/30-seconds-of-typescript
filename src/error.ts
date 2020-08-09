export enum ErrorType {
  FILE_NOT_FOUND,
}

export class FildNotFoundError extends Error {
  readonly ErrorType: ErrorType = ErrorType.FILE_NOT_FOUND;
  constructor(message: string, public file: string, public path: string) {
    super(message);
  }
}
