import { ts, FunctionDeclaration } from 'ts-morph';

/**
 * Transform function declaration to arrow function.
 */
export function toArrowFunction(fn: FunctionDeclaration, factory = ts.factory) {
  const modifiers = fn.getModifiers().map(mod => mod.compilerNode as ts.Modifier);
  const name = fn.getNameNode()!.compilerNode;
  const params = fn.getParameters().map(param => param.compilerNode);
  const returnType = fn.getReturnTypeNode()?.compilerNode;
  const typeParams = fn.getTypeParameters().map(param => param.compilerNode);
  const body = fn.getBody()!.compilerNode as ts.Block;
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
