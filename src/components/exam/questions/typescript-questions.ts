// TypeScript Questions
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

export const typescriptQuestions: Question[] = [
  // BEGINNER QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 1),
    'What is TypeScript?',
    ['A typed superset of JavaScript', 'A new programming language', 'A CSS framework', 'A database'],
    'A typed superset of JavaScript',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 2),
    'What file extension is used for TypeScript files?',
    ['.ts', '.js', '.tsx', '.ts and .tsx'],
    '.ts and .tsx',
    3
  ),

  questionTemplates.trueFalse(
    generateQuestionId('typescript-advanced', 3),
    'TypeScript code is compiled to JavaScript before execution',
    true,
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 4),
    'What is the purpose of type annotations in TypeScript?',
    ['To specify the data type of variables', 'To add comments', 'To optimize performance', 'To create functions'],
    'To specify the data type of variables',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 5),
    'Which keyword is used to declare a variable with a specific type?',
    ['let', 'var', 'const', 'All of the above'],
    'All of the above',
    4
  ),

  questionTemplates.trueFalse(
    generateQuestionId('typescript-advanced', 6),
    'TypeScript supports both static and dynamic typing',
    false,
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 7),
    'What is the TypeScript compiler called?',
    ['tsc', 'ts-compiler', 'typescript', 'ts-build'],
    'tsc',
    3
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 8),
    'Which of the following is a primitive type in TypeScript?',
    ['string', 'object', 'array', 'function'],
    'string',
    4
  ),

  questionTemplates.fillBlank(
    generateQuestionId('typescript-advanced', 9),
    'Complete the type annotation: let age: ___ = 25',
    'number',
    3
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 10),
    'What does the `any` type represent in TypeScript?',
    ['Any data type', 'No type', 'String type', 'Number type'],
    'Any data type',
    4
  ),

  // INTERMEDIATE QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 11),
    'What is an interface in TypeScript?',
    ['A contract that defines the structure of an object', 'A class', 'A function', 'A variable'],
    'A contract that defines the structure of an object',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 12),
    'What is the difference between `interface` and `type` in TypeScript?',
    ['Interfaces can be extended, types can use unions', 'No difference', 'Interfaces are faster', 'Types are more secure'],
    'Interfaces can be extended, types can use unions',
    7
  ),

  questionTemplates.trueFalse(
    generateQuestionId('typescript-advanced', 13),
    'TypeScript supports optional properties in interfaces',
    true,
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 14),
    'What is a union type in TypeScript?',
    ['A type that can be one of several types', 'A type that combines multiple types', 'A type for arrays', 'A type for functions'],
    'A type that can be one of several types',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 15),
    'What is the purpose of generics in TypeScript?',
    ['To create reusable components with type safety', 'To generate code', 'To optimize performance', 'To create classes'],
    'To create reusable components with type safety',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 16),
    'What is the `readonly` modifier used for?',
    ['To make properties immutable', 'To make properties private', 'To make properties optional', 'To make properties public'],
    'To make properties immutable',
    6
  ),

  questionTemplates.fillBlank(
    generateQuestionId('typescript-advanced', 17),
    'Complete the interface: interface User { name: string; age?: ___ }',
    'number',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 18),
    'What is the purpose of type guards in TypeScript?',
    ['To narrow down types at runtime', 'To protect types', 'To validate types', 'To convert types'],
    'To narrow down types at runtime',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 19),
    'What is the `never` type in TypeScript?',
    ['A type that represents values that never occur', 'A type for null values', 'A type for undefined values', 'A type for empty arrays'],
    'A type that represents values that never occur',
    7
  ),

  questionTemplates.trueFalse(
    generateQuestionId('typescript-advanced', 20),
    'TypeScript supports function overloading',
    true,
    6
  ),

  // ADVANCED QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 21),
    'What is the purpose of decorators in TypeScript?',
    ['To add metadata and modify classes, methods, or properties', 'To decorate the UI', 'To optimize performance', 'To create types'],
    'To add metadata and modify classes, methods, or properties',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 22),
    'What is the difference between `const` and `readonly` in TypeScript?',
    ['const is for variables, readonly is for properties', 'No difference', 'const is faster', 'readonly is more secure'],
    'const is for variables, readonly is for properties',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 23),
    'What is the purpose of mapped types in TypeScript?',
    ['To transform existing types into new types', 'To map values', 'To create arrays', 'To define functions'],
    'To transform existing types into new types',
    8
  ),

  questionTemplates.trueFalse(
    generateQuestionId('typescript-advanced', 24),
    'TypeScript supports conditional types',
    true,
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 25),
    'What is the purpose of the `keyof` operator in TypeScript?',
    ['To get the keys of an object type', 'To get the values of an object', 'To create keys', 'To validate keys'],
    'To get the keys of an object type',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 26),
    'What is the difference between `unknown` and `any` in TypeScript?',
    ['unknown is type-safe, any is not', 'No difference', 'unknown is faster', 'any is more secure'],
    'unknown is type-safe, any is not',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('typescript-advanced', 27),
    'Complete the generic function: function identity<T>(arg: T): ___ { return arg; }',
    'T',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 28),
    'What is the purpose of the `infer` keyword in TypeScript?',
    ['To infer types in conditional types', 'To infer values', 'To infer functions', 'To infer classes'],
    'To infer types in conditional types',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 29),
    'What is the purpose of utility types in TypeScript?',
    ['To provide common type transformations', 'To provide utility functions', 'To provide classes', 'To provide interfaces'],
    'To provide common type transformations',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 30),
    'What is the difference between `public`, `private`, and `protected` in TypeScript?',
    ['Different access levels for class members', 'No difference', 'public is faster', 'private is more secure'],
    'Different access levels for class members',
    7
  ),

  // EXPERT QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 31),
    'What is the purpose of template literal types in TypeScript?',
    ['To create string literal types from template strings', 'To create templates', 'To create literals', 'To create strings'],
    'To create string literal types from template strings',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 32),
    'What is the difference between `Pick` and `Omit` utility types?',
    ['Pick selects properties, Omit excludes properties', 'No difference', 'Pick is faster', 'Omit is more secure'],
    'Pick selects properties, Omit excludes properties',
    7
  ),

  questionTemplates.trueFalse(
    generateQuestionId('typescript-advanced', 33),
    'TypeScript supports recursive type definitions',
    true,
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 34),
    'What is the purpose of the `satisfies` operator in TypeScript?',
    ['To ensure a value satisfies a type without widening', 'To satisfy types', 'To create types', 'To validate types'],
    'To ensure a value satisfies a type without widening',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 35),
    'What is the difference between `Record` and `Partial` utility types?',
    ['Record creates object types, Partial makes properties optional', 'No difference', 'Record is faster', 'Partial is more secure'],
    'Record creates object types, Partial makes properties optional',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 36),
    'What is the purpose of the `as const` assertion in TypeScript?',
    ['To create readonly literal types', 'To create constants', 'To create types', 'To create values'],
    'To create readonly literal types',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 37),
    'What is the difference between `extends` and `implements` in TypeScript?',
    ['extends for inheritance, implements for contracts', 'No difference', 'extends is faster', 'implements is more secure'],
    'extends for inheritance, implements for contracts',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('typescript-advanced', 38),
    'Complete the utility type: type Optional<T> = { [K in keyof T]?: ___ }',
    'T[K]',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 39),
    'What is the purpose of the `NonNullable` utility type?',
    ['To exclude null and undefined from a type', 'To include null and undefined', 'To create nullable types', 'To validate types'],
    'To exclude null and undefined from a type',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('typescript-advanced', 40),
    'What is the difference between `ReturnType` and `Parameters` utility types?',
    ['ReturnType gets return type, Parameters gets parameter types', 'No difference', 'ReturnType is faster', 'Parameters is more secure'],
    'ReturnType gets return type, Parameters gets parameter types',
    7
  ),

  // CODING QUESTIONS
  questionTemplates.coding(
    generateQuestionId('typescript-advanced', 41),
    'Create a generic function that returns the first element of an array',
    'function getFirstElement<T>(arr: T[]): T | undefined {\n  return arr.length > 0 ? arr[0] : undefined;\n}',
    [
      { input: 'getFirstElement([1, 2, 3])', expectedOutput: '1', description: 'Returns first element of number array' },
      { input: 'getFirstElement(["a", "b", "c"])', expectedOutput: '"a"', description: 'Returns first element of string array' }
    ],
    10
  ),

  questionTemplates.coding(
    generateQuestionId('typescript-advanced', 42),
    'Create an interface for a User with optional properties',
    'interface User {\n  id: number;\n  name: string;\n  email: string;\n  age?: number;\n  isActive?: boolean;\n}',
    [
      { input: 'User with required properties', expectedOutput: 'Valid User object', description: 'Interface with required properties' },
      { input: 'User with optional properties', expectedOutput: 'Valid User object with optional fields', description: 'Interface with optional properties' }
    ],
    8
  ),

  questionTemplates.coding(
    generateQuestionId('typescript-advanced', 43),
    'Create a type guard function to check if a value is a string',
    'function isString(value: unknown): value is string {\n  return typeof value === "string";\n}',
    [
      { input: 'isString("hello")', expectedOutput: 'true', description: 'Returns true for string values' },
      { input: 'isString(123)', expectedOutput: 'false', description: 'Returns false for non-string values' }
    ],
    8
  ),

  questionTemplates.coding(
    generateQuestionId('typescript-advanced', 44),
    'Create a generic class with type constraints',
    'class Container<T extends string | number> {\n  private items: T[] = [];\n  \n  add(item: T): void {\n    this.items.push(item);\n  }\n  \n  get(index: number): T | undefined {\n    return this.items[index];\n  }\n  \n  getAll(): T[] {\n    return [...this.items];\n  }\n}',
    [
      { input: 'Container<string> with string items', expectedOutput: 'Container that accepts only strings', description: 'Generic class with string constraint' },
      { input: 'Container<number> with number items', expectedOutput: 'Container that accepts only numbers', description: 'Generic class with number constraint' }
    ],
    12
  ),

  questionTemplates.coding(
    generateQuestionId('typescript-advanced', 45),
    'Create a utility type that makes all properties of an object optional',
    'type Partial<T> = {\n  [P in keyof T]?: T[P];\n};\n\n// Usage example\ntype User = {\n  id: number;\n  name: string;\n  email: string;\n};\n\ntype PartialUser = Partial<User>;',
    [
      { input: 'Partial<User> type', expectedOutput: 'All properties become optional', description: 'Utility type making properties optional' },
      { input: 'Nested object types', expectedOutput: 'Works with complex object types', description: 'Handles nested object structures' }
    ],
    15
  )
];
