import * as ts from 'typescript';

export function printKind(node: ts.Node, comment: string | number = '') {
  const prefix = comment === undefined ? '' : `${comment}: `;
  console.log(prefix + kindTable[node.kind]);
  return node;
}

const kindTable = {
  0: 'Unknown',
  1: 'EndOfFileToken',
  2: 'SingleLineCommentTrivia',
  3: 'MultiLineCommentTrivia',
  4: 'NewLineTrivia',
  5: 'WhitespaceTrivia',
  6: 'ShebangTrivia',
  7: 'ConflictMarkerTrivia',
  8: 'NumericLiteral',
  9: 'BigIntLiteral',
  10: 'StringLiteral',
  11: 'JsxText',
  12: 'JsxTextAllWhiteSpaces',
  13: 'RegularExpressionLiteral',
  14: 'NoSubstitutionTemplateLiteral',
  15: 'TemplateHead',
  16: 'TemplateMiddle',
  17: 'TemplateTail',
  18: 'OpenBraceToken',
  19: 'CloseBraceToken',
  20: 'OpenParenToken',
  21: 'CloseParenToken',
  22: 'OpenBracketToken',
  23: 'CloseBracketToken',
  24: 'DotToken',
  25: 'DotDotDotToken',
  26: 'SemicolonToken',
  27: 'CommaToken',
  28: 'QuestionDotToken',
  29: 'LessThanToken',
  30: 'LessThanSlashToken',
  31: 'GreaterThanToken',
  32: 'LessThanEqualsToken',
  33: 'GreaterThanEqualsToken',
  34: 'EqualsEqualsToken',
  35: 'ExclamationEqualsToken',
  36: 'EqualsEqualsEqualsToken',
  37: 'ExclamationEqualsEqualsToken',
  38: 'EqualsGreaterThanToken',
  39: 'PlusToken',
  40: 'MinusToken',
  41: 'AsteriskToken',
  42: 'AsteriskAsteriskToken',
  43: 'SlashToken',
  44: 'PercentToken',
  45: 'PlusPlusToken',
  46: 'MinusMinusToken',
  47: 'LessThanLessThanToken',
  48: 'GreaterThanGreaterThanToken',
  49: 'GreaterThanGreaterThanGreaterThanToken',
  50: 'AmpersandToken',
  51: 'BarToken',
  52: 'CaretToken',
  53: 'ExclamationToken',
  54: 'TildeToken',
  55: 'AmpersandAmpersandToken',
  56: 'BarBarToken',
  57: 'QuestionToken',
  58: 'ColonToken',
  59: 'AtToken',
  60: 'QuestionQuestionToken',
  61: 'BacktickToken',
  62: 'EqualsToken',
  63: 'PlusEqualsToken',
  64: 'MinusEqualsToken',
  65: 'AsteriskEqualsToken',
  66: 'AsteriskAsteriskEqualsToken',
  67: 'SlashEqualsToken',
  68: 'PercentEqualsToken',
  69: 'LessThanLessThanEqualsToken',
  70: 'GreaterThanGreaterThanEqualsToken',
  71: 'GreaterThanGreaterThanGreaterThanEqualsToken',
  72: 'AmpersandEqualsToken',
  73: 'BarEqualsToken',
  74: 'BarBarEqualsToken',
  75: 'AmpersandAmpersandEqualsToken',
  76: 'QuestionQuestionEqualsToken',
  77: 'CaretEqualsToken',
  78: 'Identifier',
  79: 'PrivateIdentifier',
  80: 'BreakKeyword',
  81: 'CaseKeyword',
  82: 'CatchKeyword',
  83: 'ClassKeyword',
  84: 'ConstKeyword',
  85: 'ContinueKeyword',
  86: 'DebuggerKeyword',
  87: 'DefaultKeyword',
  88: 'DeleteKeyword',
  89: 'DoKeyword',
  90: 'ElseKeyword',
  91: 'EnumKeyword',
  92: 'ExportKeyword',
  93: 'ExtendsKeyword',
  94: 'FalseKeyword',
  95: 'FinallyKeyword',
  96: 'ForKeyword',
  97: 'FunctionKeyword',
  98: 'IfKeyword',
  99: 'ImportKeyword',
  100: 'InKeyword',
  101: 'InstanceOfKeyword',
  102: 'NewKeyword',
  103: 'NullKeyword',
  104: 'ReturnKeyword',
  105: 'SuperKeyword',
  106: 'SwitchKeyword',
  107: 'ThisKeyword',
  108: 'ThrowKeyword',
  109: 'TrueKeyword',
  110: 'TryKeyword',
  111: 'TypeOfKeyword',
  112: 'VarKeyword',
  113: 'VoidKeyword',
  114: 'WhileKeyword',
  115: 'WithKeyword',
  116: 'ImplementsKeyword',
  117: 'InterfaceKeyword',
  118: 'LetKeyword',
  119: 'PackageKeyword',
  120: 'PrivateKeyword',
  121: 'ProtectedKeyword',
  122: 'PublicKeyword',
  123: 'StaticKeyword',
  124: 'YieldKeyword',
  125: 'AbstractKeyword',
  126: 'AsKeyword',
  127: 'AssertsKeyword',
  128: 'AnyKeyword',
  129: 'AsyncKeyword',
  130: 'AwaitKeyword',
  131: 'BooleanKeyword',
  132: 'ConstructorKeyword',
  133: 'DeclareKeyword',
  134: 'GetKeyword',
  135: 'InferKeyword',
  136: 'IntrinsicKeyword',
  137: 'IsKeyword',
  138: 'KeyOfKeyword',
  139: 'ModuleKeyword',
  140: 'NamespaceKeyword',
  141: 'NeverKeyword',
  142: 'ReadonlyKeyword',
  143: 'RequireKeyword',
  144: 'NumberKeyword',
  145: 'ObjectKeyword',
  146: 'SetKeyword',
  147: 'StringKeyword',
  148: 'SymbolKeyword',
  149: 'TypeKeyword',
  150: 'UndefinedKeyword',
  151: 'UniqueKeyword',
  152: 'UnknownKeyword',
  153: 'FromKeyword',
  154: 'GlobalKeyword',
  155: 'BigIntKeyword',
  156: 'OverrideKeyword',
  157: 'OfKeyword',
  158: 'QualifiedName',
  159: 'ComputedPropertyName',
  160: 'TypeParameter',
  161: 'Parameter',
  162: 'Decorator',
  163: 'PropertySignature',
  164: 'PropertyDeclaration',
  165: 'MethodSignature',
  166: 'MethodDeclaration',
  167: 'Constructor',
  168: 'GetAccessor',
  169: 'SetAccessor',
  170: 'CallSignature',
  171: 'ConstructSignature',
  172: 'IndexSignature',
  173: 'TypePredicate',
  174: 'TypeReference',
  175: 'FunctionType',
  176: 'ConstructorType',
  177: 'TypeQuery',
  178: 'TypeLiteral',
  179: 'ArrayType',
  180: 'TupleType',
  181: 'OptionalType',
  182: 'RestType',
  183: 'UnionType',
  184: 'IntersectionType',
  185: 'ConditionalType',
  186: 'InferType',
  187: 'ParenthesizedType',
  188: 'ThisType',
  189: 'TypeOperator',
  190: 'IndexedAccessType',
  191: 'MappedType',
  192: 'LiteralType',
  193: 'NamedTupleMember',
  194: 'TemplateLiteralType',
  195: 'TemplateLiteralTypeSpan',
  196: 'ImportType',
  197: 'ObjectBindingPattern',
  198: 'ArrayBindingPattern',
  199: 'BindingElement',
  200: 'ArrayLiteralExpression',
  201: 'ObjectLiteralExpression',
  202: 'PropertyAccessExpression',
  203: 'ElementAccessExpression',
  204: 'CallExpression',
  205: 'NewExpression',
  206: 'TaggedTemplateExpression',
  207: 'TypeAssertionExpression',
  208: 'ParenthesizedExpression',
  209: 'FunctionExpression',
  210: 'ArrowFunction',
  211: 'DeleteExpression',
  212: 'TypeOfExpression',
  213: 'VoidExpression',
  214: 'AwaitExpression',
  215: 'PrefixUnaryExpression',
  216: 'PostfixUnaryExpression',
  217: 'BinaryExpression',
  218: 'ConditionalExpression',
  219: 'TemplateExpression',
  220: 'YieldExpression',
  221: 'SpreadElement',
  222: 'ClassExpression',
  223: 'OmittedExpression',
  224: 'ExpressionWithTypeArguments',
  225: 'AsExpression',
  226: 'NonNullExpression',
  227: 'MetaProperty',
  228: 'SyntheticExpression',
  229: 'TemplateSpan',
  230: 'SemicolonClassElement',
  231: 'Block',
  232: 'EmptyStatement',
  233: 'VariableStatement',
  234: 'ExpressionStatement',
  235: 'IfStatement',
  236: 'DoStatement',
  237: 'WhileStatement',
  238: 'ForStatement',
  239: 'ForInStatement',
  240: 'ForOfStatement',
  241: 'ContinueStatement',
  242: 'BreakStatement',
  243: 'ReturnStatement',
  244: 'WithStatement',
  245: 'SwitchStatement',
  246: 'LabeledStatement',
  247: 'ThrowStatement',
  248: 'TryStatement',
  249: 'DebuggerStatement',
  250: 'VariableDeclaration',
  251: 'VariableDeclarationList',
  252: 'FunctionDeclaration',
  253: 'ClassDeclaration',
  254: 'InterfaceDeclaration',
  255: 'TypeAliasDeclaration',
  256: 'EnumDeclaration',
  257: 'ModuleDeclaration',
  258: 'ModuleBlock',
  259: 'CaseBlock',
  260: 'NamespaceExportDeclaration',
  261: 'ImportEqualsDeclaration',
  262: 'ImportDeclaration',
  263: 'ImportClause',
  264: 'NamespaceImport',
  265: 'NamedImports',
  266: 'ImportSpecifier',
  267: 'ExportAssignment',
  268: 'ExportDeclaration',
  269: 'NamedExports',
  270: 'NamespaceExport',
  271: 'ExportSpecifier',
  272: 'MissingDeclaration',
  273: 'ExternalModuleReference',
  274: 'JsxElement',
  275: 'JsxSelfClosingElement',
  276: 'JsxOpeningElement',
  277: 'JsxClosingElement',
  278: 'JsxFragment',
  279: 'JsxOpeningFragment',
  280: 'JsxClosingFragment',
  281: 'JsxAttribute',
  282: 'JsxAttributes',
  283: 'JsxSpreadAttribute',
  284: 'JsxExpression',
  285: 'CaseClause',
  286: 'DefaultClause',
  287: 'HeritageClause',
  288: 'CatchClause',
  289: 'PropertyAssignment',
  290: 'ShorthandPropertyAssignment',
  291: 'SpreadAssignment',
  292: 'EnumMember',
  293: 'UnparsedPrologue',
  294: 'UnparsedPrepend',
  295: 'UnparsedText',
  296: 'UnparsedInternalText',
  297: 'UnparsedSyntheticReference',
  298: 'SourceFile',
  299: 'Bundle',
  300: 'UnparsedSource',
  301: 'InputFiles',
  302: 'JSDocTypeExpression',
  303: 'JSDocNameReference',
  304: 'JSDocAllType',
  305: 'JSDocUnknownType',
  306: 'JSDocNullableType',
  307: 'JSDocNonNullableType',
  308: 'JSDocOptionalType',
  309: 'JSDocFunctionType',
  310: 'JSDocVariadicType',
  311: 'JSDocNamepathType',
  312: 'JSDocComment',
  313: 'JSDocText',
  314: 'JSDocTypeLiteral',
  315: 'JSDocSignature',
  316: 'JSDocLink',
  317: 'JSDocTag',
  318: 'JSDocAugmentsTag',
  319: 'JSDocImplementsTag',
  320: 'JSDocAuthorTag',
  321: 'JSDocDeprecatedTag',
  322: 'JSDocClassTag',
  323: 'JSDocPublicTag',
  324: 'JSDocPrivateTag',
  325: 'JSDocProtectedTag',
  326: 'JSDocReadonlyTag',
  327: 'JSDocOverrideTag',
  328: 'JSDocCallbackTag',
  329: 'JSDocEnumTag',
  330: 'JSDocParameterTag',
  331: 'JSDocReturnTag',
  332: 'JSDocThisTag',
  333: 'JSDocTypeTag',
  334: 'JSDocTemplateTag',
  335: 'JSDocTypedefTag',
  336: 'JSDocSeeTag',
  337: 'JSDocPropertyTag',
  338: 'SyntaxList',
  339: 'NotEmittedStatement',
  340: 'PartiallyEmittedExpression',
  341: 'CommaListExpression',
  342: 'MergeDeclarationMarker',
  343: 'EndOfDeclarationMarker',
  344: 'SyntheticReferenceExpression',
  345: 'Count',
  // 62: 'FirstAssignment',
  // 77: 'LastAssignment',
  // 63: 'FirstCompoundAssignment',
  // 77: 'LastCompoundAssignment',
  // 80: 'FirstReservedWord',
  // 115: 'LastReservedWord',
  // 80: 'FirstKeyword',
  // 157: 'LastKeyword',
  // 116: 'FirstFutureReservedWord',
  // 124: 'LastFutureReservedWord',
  // 173: 'FirstTypeNode',
  // 196: 'LastTypeNode',
  // 18: 'FirstPunctuation',
  // 77: 'LastPunctuation',
  // 0: 'FirstToken',
  // 157: 'LastToken',
  // 2: 'FirstTriviaToken',
  // 7: 'LastTriviaToken',
  // 8: 'FirstLiteralToken',
  // 14: 'LastLiteralToken',
  // 14: 'FirstTemplateToken',
  // 17: 'LastTemplateToken',
  // 29: 'FirstBinaryOperator',
  // 77: 'LastBinaryOperator',
  // 233: 'FirstStatement',
  // 249: 'LastStatement',
  // 158: 'FirstNode',
  // 302: 'FirstJSDocNode',
  // 337: 'LastJSDocNode',
  // 317: 'FirstJSDocTagNode',
  // 337: 'LastJSDocTagNode',
};
