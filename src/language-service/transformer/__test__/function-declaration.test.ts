import { SourceFile } from 'ts-morph';
import { forEachArrowFunction, forEachFunction } from '../../ts-morph-example';
import { toArrowFunction } from '../function-declaration';
import { toFunctionDeclaration } from '../arrow-function';
import { createBasicProject } from '../../utils/projectFactory';

const filename = ((index = 0) => () => `file-${index++}.ts`)();
const project = createBasicProject();

function sourceOf(text: string): SourceFile {
  return project.createSourceFile(filename(), text);
}

function testTransform(from: string, to: string) {
  const arrow = forEachFunction(sourceOf(from.trim()), toArrowFunction).getFullText();
  const decl = forEachArrowFunction(sourceOf(arrow), toFunctionDeclaration).getFullText();
  expect(arrow).toEqual(to.trim());
  expect(decl).toEqual(from.trim());
}

describe('transformFunctionDeclarationToArrowFunction', () => {
  it('can transform single function', () => {
    testTransform(
      `
function add(x: number, y: number): number {
    return x + y;
}
`,
      `
const add = (x: number, y: number): number => {
    return x + y;
};
`
    );
  });

  it('can transform async function', () => {
    testTransform(
      `
async function getUserById(id: number): Promise<User> {
    return UserRepository.connection().findById(id);
}
`,
      `
const getUserById = async (id: number): Promise<User> => {
    return UserRepository.connection().findById(id);
};
`
    );
  });

  it('can transform function with empty parameters', () => {
    testTransform(
      `
function hello() {
    console.log('hello world!');
}
`,
      `
const hello = () => {
    console.log('hello world!');
};
`
    );
  });

  it('can transform generic function', () => {
    testTransform(
      `
function parseJson<T extends Record<string, any>>(json: string): T {
    return JSON.parse(json);
}
`,
      `
const parseJson = <T extends Record<string, any>>(json: string): T => {
    return JSON.parse(json);
};
`
    );
  });

  it('can skip if not match', () => {
    testTransform(
      `
const foo = 1;

function parseJson<T extends Record<string, any>>(json: string): T {
    return JSON.parse(json);
}

const bar = 2;
`,
      `
const foo = 1;

const parseJson = <T extends Record<string, any>>(json: string): T => {
    return JSON.parse(json);
};

const bar = 2;
`
    );
  });

  it('can skip broken declaration,', () => {
    testTransform(
      `
const
function parseJson<T extends Record<string, any>>(json: string): T {
    return JSON.parse(json);
}
`,
      `
const
const parseJson = <T extends Record<string, any>>(json: string): T => {
    return JSON.parse(json);
};
`
    );
  });
});
