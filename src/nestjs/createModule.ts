import { DynamicModule, ModuleMetadata, Type } from '@nestjs/common';

export interface CreateModuleArguments extends ModuleMetadata {
  module?: string;
  global?: boolean;
}

export function createModule({ module: moduleName, ...metadata }: CreateModuleArguments): DynamicModule {
  const module = new Function() as Type<any>;
  if (moduleName) {
    Object.defineProperty(module, 'name', { get: () => moduleName });
  }

  return { module, ...metadata };
}
