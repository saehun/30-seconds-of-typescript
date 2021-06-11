import * as functionDeclaration from './function-declaration';
import * as arrowFunction from './arrow-function';

export const transformer = {
  functionDeclaration,
  arrowFunction,
} as const;
