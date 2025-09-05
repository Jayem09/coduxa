// JavaScript Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// BEGINNER QUESTIONS
export const javascriptBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 1),
    'What is the correct way to declare a variable in JavaScript?',
    ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
    'var myVar = 5;',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('js-fundamentals', 2),
    'JavaScript is a case-sensitive language',
    true,
    2
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 3),
    'Which operator is used for strict equality in JavaScript?',
    ['==', '===', '=', '!='],
    '===',
    3
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('js-fundamentals', 4),
    'Complete the function declaration: ___ myFunction() { }',
    'function',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 5),
    'What is the result of typeof null in JavaScript?',
    ['"null"', '"object"', '"undefined"', 'null'],
    '"object"',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('js-fundamentals', 6),
    'JavaScript arrays are zero-indexed',
    true,
    2
  )
];

// INTERMEDIATE QUESTIONS
export const javascriptIntermediateQuestions: Question[] = [
  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 7),
    'Write a function to reverse a string',
    'function reverseString(str) {\n  // Your code here\n}',
    [
      { input: '"hello"', expectedOutput: '"olleh"', description: 'Basic string reversal' },
      { input: '"world"', expectedOutput: '"dlrow"', description: 'Another string reversal' }
    ],
    8
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 8),
    'What is the difference between let and var?',
    [
      'let has block scope, var has function scope',
      'var has block scope, let has function scope',
      'They are identical',
      'let is deprecated'
    ],
    'let has block scope, var has function scope',
    6
  ),
  
  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 9),
    'Implement a simple array filter',
    'function filterEvenNumbers(arr) {\n  // Your code here\n}',
    [
      { input: '[1, 2, 3, 4, 5, 6]', expectedOutput: '[2, 4, 6]', description: 'Filter even numbers' }
    ],
    10
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 10),
    'What is closure in JavaScript?',
    [
      'A function that has access to variables in its outer scope',
      'A way to close a function',
      'A type of loop',
      'A method to stop execution'
    ],
    'A function that has access to variables in its outer scope',
    7
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('js-fundamentals', 11),
    'Complete the arrow function: const add = (a, b) ___ a + b;',
    '=>',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 12),
    'What does the map() method return?',
    [
      'A new array with transformed elements',
      'The original array modified',
      'A single value',
      'undefined'
    ],
    'A new array with transformed elements',
    6
  ),

  // Additional Intermediate Questions (13-20)
  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 13),
    'Write a function that finds the longest word in a string',
    'function findLongestWord(str) {\n  // Your code here\n}',
    [
      { input: 'findLongestWord("The quick brown fox")', expectedOutput: '"quick"', description: 'Find longest word' }
    ],
    10
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 14),
    'What is the difference between null and undefined?',
    [
      'null is assigned, undefined is not assigned',
      'undefined is assigned, null is not assigned',
      'No difference',
      'null is faster'
    ],
    'null is assigned, undefined is not assigned',
    5
  ),

  questionTemplates.trueFalse(
    generateQuestionId('js-fundamentals', 15),
    'Arrow functions have their own this binding',
    false,
    6
  ),

  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 16),
    'Write a function that removes duplicates from an array',
    'function removeDuplicates(arr) {\n  // Your code here\n}',
    [
      { input: 'removeDuplicates([1, 2, 2, 3, 4, 4, 5])', expectedOutput: '[1, 2, 3, 4, 5]', description: 'Remove duplicates' }
    ],
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 17),
    'What is the purpose of the reduce() method?',
    [
      'To reduce an array to a single value',
      'To filter array elements',
      'To map array elements',
      'To sort array elements'
    ],
    'To reduce an array to a single value',
    6
  ),

  questionTemplates.fillBlank(
    generateQuestionId('js-fundamentals', 18),
    'What is the output of: [1, 2, 3].reduce((acc, curr) => acc + curr, 0)',
    '6',
    5
  ),

  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 19),
    'Write a function that checks if a string is a palindrome',
    'function isPalindrome(str) {\n  // Your code here\n}',
    [
      { input: 'isPalindrome("racecar")', expectedOutput: 'true', description: 'Palindrome check' }
    ],
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 20),
    'What is the difference between slice() and splice()?',
    [
      'slice() returns a copy, splice() modifies the original array',
      'splice() returns a copy, slice() modifies the original array',
      'No difference',
      'slice() is faster'
    ],
    'slice() returns a copy, splice() modifies the original array',
    6
  )
];

// ADVANCED QUESTIONS
export const javascriptAdvancedQuestions: Question[] = [
  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 21),
    'Implement a debounce function',
    'function debounce(func, wait) {\n  // Your code here\n}',
    [
      { input: 'debounce(() => console.log("hello"), 100)', expectedOutput: 'Function that delays execution', description: 'Debounce function implementation' }
    ],
    15
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 22),
    'What is the prototype chain in JavaScript?',
    [
      'A chain of objects linked through their prototype property',
      'A way to chain method calls',
      'A type of loop',
      'A debugging technique'
    ],
    'A chain of objects linked through their prototype property',
    8
  ),
  
  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 23),
    'Implement Promise.all from scratch',
    'function myPromiseAll(promises) {\n  // Your code here\n}',
    [
      { input: 'myPromiseAll([Promise.resolve(1), Promise.resolve(2)])', expectedOutput: 'Promise that resolves to [1, 2]', description: 'Promise.all implementation' }
    ],
    20
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 24),
    'What is the event loop in JavaScript?',
    [
      'A mechanism that handles asynchronous operations and callbacks',
      'A type of loop in JavaScript',
      'A debugging tool',
      'A way to handle events'
    ],
    'A mechanism that handles asynchronous operations and callbacks',
    10
  ),
  
  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 25),
    'Implement a memoization function',
    'function memoize(fn) {\n  // Your code here\n}',
    [
      { input: 'memoize(fibonacci)', expectedOutput: 'Cached fibonacci function', description: 'Memoization implementation' }
    ],
    18
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 26),
    'What is the difference between == and === in JavaScript?',
    [
      '== performs type coercion, === does not',
      '=== performs type coercion, == does not',
      'They are identical',
      '== is deprecated'
    ],
    '== performs type coercion, === does not',
    7
  ),

  // Additional Advanced Questions (27-38)
  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 27),
    'Implement a custom Promise that resolves after a delay',
    'function delay(ms) {\n  // Your code here\n}',
    [
      { input: 'delay(1000).then(() => console.log("Done"))', expectedOutput: 'Logs "Done" after 1 second', description: 'Custom Promise implementation' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 28),
    'What is the purpose of the Symbol type in JavaScript?',
    [
      'To create unique identifiers',
      'To represent numbers',
      'To create strings',
      'To handle errors'
    ],
    'To create unique identifiers',
    8
  ),

  questionTemplates.trueFalse(
    generateQuestionId('js-fundamentals', 29),
    'JavaScript supports tail call optimization',
    false,
    6
  ),

  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 30),
    'Write a function that implements the Observer pattern',
    'class EventEmitter {\n  // Your code here\n}',
    [
      { input: 'const emitter = new EventEmitter(); emitter.on("test", () => {});', expectedOutput: 'Event emitter with subscription', description: 'Basic observer pattern' }
    ],
    18
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 31),
    'What is the difference between WeakMap and Map?',
    [
      'WeakMap allows garbage collection of keys, Map does not',
      'Map allows garbage collection of keys, WeakMap does not',
      'No difference',
      'WeakMap is faster'
    ],
    'WeakMap allows garbage collection of keys, Map does not',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('js-fundamentals', 32),
    'What is the output of: Object.getOwnPropertyDescriptors({a: 1})',
    'Object with property descriptors',
    6
  ),

  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 33),
    'Implement a function that flattens nested arrays',
    'function flatten(arr) {\n  // Your code here\n}',
    [
      { input: 'flatten([1, [2, 3], [4, [5]]])', expectedOutput: '[1, 2, 3, 4, 5]', description: 'Deep array flattening' }
    ],
    12
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 34),
    'What is the purpose of the Proxy object?',
    [
      'To intercept and customize operations on objects',
      'To create new objects',
      'To delete properties',
      'To clone objects'
    ],
    'To intercept and customize operations on objects',
    8
  ),

  questionTemplates.trueFalse(
    generateQuestionId('js-fundamentals', 35),
    'JavaScript supports private class fields',
    true,
    6
  ),

  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 36),
    'Write a function that implements currying',
    'function curry(fn) {\n  // Your code here\n}',
    [
      { input: 'const add = curry((a, b, c) => a + b + c); add(1)(2)(3)', expectedOutput: '6', description: 'Basic currying' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('js-fundamentals', 37),
    'What is the difference between for...in and for...of loops?',
    [
      'for...in iterates over keys, for...of iterates over values',
      'for...of iterates over keys, for...in iterates over values',
      'No difference',
      'for...in is deprecated'
    ],
    'for...in iterates over keys, for...of iterates over values',
    6
  ),

  questionTemplates.coding(
    generateQuestionId('js-fundamentals', 38),
    'Implement a simple state management system',
    'class StateManager {\n  // Your code here\n}',
    [
      { input: 'const state = new StateManager(); state.setState({count: 0})', expectedOutput: 'State manager with setState method', description: 'Basic state management' }
    ],
    18
  )
];

// COMBINED JAVASCRIPT QUESTIONS
export const javascriptQuestions: Question[] = [
  ...javascriptBeginnerQuestions,
  ...javascriptIntermediateQuestions,
  ...javascriptAdvancedQuestions
];
