import { IndentationText, NewLineKind, Project, QuoteKind, FunctionDeclaration, SourceFile } from 'ts-morph';
import { createBasicProject } from './utils/projectFactory';
import * as ts from 'typescript';

/**
 * Traverse source code and execute callback when meet function declaration
 */
export function forEachFunction<T extends ts.Node>(src: SourceFile, handle: (fn: FunctionDeclaration) => T) {
  return src.transform(traversal => {
    if (ts.isFunctionDeclaration(traversal.currentNode)) {
      const fn = src.getFunction(traversal.currentNode.name.text);
      return handle(fn);
    }
    return traversal.visitChildren();
  });
}

/**
 * Transform function declaration to arrow function
 */
export function transformFunctionDeclarationToArrowFunction(fn: FunctionDeclaration, factory = ts.factory) {
  const modifiers = fn.getModifiers().map(mod => mod.compilerNode as ts.Modifier);
  const name = fn.getNameNode()?.compilerNode;
  const params = fn.getParameters().map(param => param.compilerNode);
  const returnType = fn.getReturnTypeNode()?.compilerNode;
  const typeParams = fn.getTypeParameters().map(param => param.compilerNode);
  const body = fn.getBody().compilerNode as ts.Block;
  return factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          name,
          undefined,
          undefined,
          factory.createArrowFunction(
            modifiers,
            typeParams,
            params,
            returnType,
            factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            body
          )
        ),
      ],
      ts.NodeFlags.Const
    )
  );
}
