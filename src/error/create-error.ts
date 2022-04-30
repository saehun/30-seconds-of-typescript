type Extra = Record<string, any>;
type ExtraInformation = { cause?: Error } & Extra;

abstract class CustomError extends Error {
  public readonly cause?: Error;
  public readonly extra?: { [key: string]: any };
  public abstract readonly errorType: ErrorType;

  constructor(message: string, extraInformation: ExtraInformation = {}) {
    super(message);
    const { cause, ...extra } = extraInformation;
    this.name = new.target.name;
    this.extra = extra;
    this.cause = cause;
  }
}

enum ErrorType {
  User = 'User',
  System = 'System',
  Network = 'Network',
}

export function createError<T extends { [Key in ErrorType]?: ReadonlyArray<string> | undefined }>(
  table: T
): T[keyof { [k in keyof T]: ReadonlyArray<string> }] extends ReadonlyArray<infer U>
  ? {
      [Key in U as Key extends `${infer Name}: ${string}`
        ? Name
        : Key extends `${infer Name}`
        ? Name
        : never]: Key extends `${string}: ${infer Template}`
        ? {
            new (extraInformation?: ExtraInformationWithMessageArgument<Template>): CustomError;
            new (message?: string): CustomError;
            new (message: string, extraInformation?: ExtraInformation): CustomError;
          }
        : {
            new (message: string, extraInformation?: ExtraInformation): CustomError;
          };
    }
  : never {
  const _table: any = table;
  const ctorMap: any = {};

  for (const errorType in _table) {
    for (const key of _table[errorType]) {
      const [className, ...defaultMessageParts] = key.split(': ');
      const defaultMessage = defaultMessageParts.join(': ');

      if (className in ctorMap) {
        throw new Error(`Duplicated error name: ${className}`);
      }

      if (defaultMessage === '') {
        ctorMap[className] = class extends CustomError {
          public readonly name = className;
          public readonly errorType = errorType as ErrorType;
          constructor(message: string, extraInformation = {}) {
            super(maybeInterpolate(message, extraInformation), extraInformation);
          }
        };
      } else {
        ctorMap[className] = class extends CustomError {
          public readonly name = className;
          public readonly errorType = errorType as ErrorType;
          constructor(arg1 = defaultMessage, arg2?: any) {
            super(
              // new CustomError();                                - super(defaultMessage);
              // new CustomError({ cause });                       - super(defaultMessage, { cause });
              // new CustomError('Overrieded: message');            - super('Overrided message');
              // new CustomError('Overrieded: message', { cause }); - super('Overrided message', { cause });
              typeof arg1 === 'string' ? maybeInterpolate(arg1, arg2) : maybeInterpolate(defaultMessage, arg1),
              arg1 != null && typeof arg1 === 'object' ? arg1 : arg2
            );
          }
        };
      }
    }
  }

  return ctorMap;
}

function maybeInterpolate(message: string, extraInformation: Record<string, string> = {}) {
  if (typeof extraInformation !== 'object') {
    return message;
  }
  return message.replace(/{{([a-zA-Z0-9_-]+)}}/g, (_: string, matched: string) => {
    return extraInformation[matched];
  });
}

type ExtraInformationWithMessageArgument<Template> = Template extends string
  ? ExtraInformation & TemplateToArguments<Template>
  : ExtraInformation;

type TemplateToArguments<
  Template extends string,
  Arguments = {}
> = Trim<Template> extends `${infer Prefix}{{${infer Arg}}}${infer Postfix}`
  ? {
      [K in Arg]?: string | number | boolean;
    } & TemplateToArguments<`${Trim<Prefix>}${Trim<Postfix>}`>
  : Arguments;

type Whitespace = '\n' | ' ';
type Trim<T> = T extends `${Whitespace}${infer U}` ? Trim<U> : T extends `${infer U}${Whitespace}` ? Trim<U> : T;

export type Simplify<T> = { [K in keyof T]: T[K] };

const { ConnectionResetError, TimeoutError } = createError({
  Network: ['TimeoutError', 'ConnectionResetError: Connection to {{url}} is reset'] as const,
});

(() => {
  new ConnectionResetError({ cause: new Error(''), url: 'http://www.google.com' });
  new ConnectionResetError('Overrided message');
  new TimeoutError('Required message');
})();
