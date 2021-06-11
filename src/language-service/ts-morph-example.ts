import { ArrowFunction, createWrappedNode, FunctionDeclaration, SourceFile } from 'ts-morph';
import * as ts from 'typescript';

/**
 * Traverse source code and execute callback when meet function declaration
 */
export function forEachFunction<T extends ts.Node>(src: SourceFile, handle: (fn: FunctionDeclaration) => T) {
  return src.transform(({ currentNode, visitChildren }) => {
    if (ts.isFunctionDeclaration(currentNode)) {
      const fn = src.getFunction(currentNode.name.text);
      return handle(fn);
    }
    return visitChildren();
  });
}

/**
 * Traverse source code and execute callback when meet arrow function
 */
export function forEachArrowFunction<T extends ts.Node>(
  src: SourceFile,
  handle: (fn: ArrowFunction, name: string | ts.Identifier) => T
) {
  return src.transform(({ currentNode, visitChildren }) => {
    if (ts.isVariableStatement(currentNode)) {
      const firstDecl = currentNode.declarationList.declarations[0];
      if (firstDecl == null) {
        return visitChildren();
      }

      const [identifier, , maybeArrowFunction] = firstDecl.getChildren();
      if (maybeArrowFunction && ts.isArrowFunction(maybeArrowFunction)) {
        const arrowFunction = createWrappedNode<ts.ArrowFunction>(maybeArrowFunction) as ArrowFunction;
        return handle(arrowFunction, identifier as ts.Identifier);
      }

      return currentNode;
    }
    return visitChildren();
  });
}
