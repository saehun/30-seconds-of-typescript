import { ArrowFunction } from 'ts-morph';
import * as ts from 'typescript';

/**
 * Transform arrow function to function declaration.
 */
export function toFunctionDeclaration(fn: ArrowFunction, name: ts.Identifier, factory = ts.factory) {
  const modifiers = fn.getModifiers().map(mod => mod.compilerNode as ts.Modifier);
  const params = fn.getParameters().map(param => param.compilerNode);
  const returnType = fn.getReturnTypeNode()?.compilerNode;
  const typeParams = fn.getTypeParameters().map(param => param.compilerNode);
  const body = fn.getBody().compilerNode as ts.Block;

  return factory.createFunctionDeclaration(undefined, modifiers, undefined, name, typeParams, params, returnType, body);
}
