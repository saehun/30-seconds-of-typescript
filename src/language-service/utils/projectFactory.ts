import { IndentationText, NewLineKind, Project, QuoteKind } from 'ts-morph';
import * as ts from 'typescript';

export function createBasicProject() {
  return new Project({
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      noImplicitAny: true,
      sourceMap: false,
      outDir: 'dist',
      declaration: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      esModuleInterop: true,
      lib: ['dom', 'esnext'],
    },
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      newLineKind: NewLineKind.LineFeed,
      quoteKind: QuoteKind.Single,
      useTrailingCommas: true,
    },
  });
}
