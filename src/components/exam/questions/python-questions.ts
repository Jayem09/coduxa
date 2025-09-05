// Python Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// PYTHON BEGINNER QUESTIONS (1-15)
export const pythonBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 1),
    'What is the correct way to print "Hello World" in Python?',
    ['print("Hello World")', 'echo "Hello World"', 'console.log("Hello World")', 'printf("Hello World")'],
    'print("Hello World")',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 2),
    'Python uses indentation to define code blocks',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 3),
    'Which of the following is a valid Python variable name?',
    ['my_variable', '2my_variable', 'my-variable', 'my variable'],
    'my_variable',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 4),
    'What is the result of 5 / 2 in Python 3?',
    ['2', '2.5', '2.0', '3'],
    '2.5',
    3
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 5),
    'Python is a compiled language',
    false,
    3
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 6),
    'Which keyword is used to define a function in Python?',
    ['function', 'def', 'func', 'define'],
    'def',
    4
  ),

  questionTemplates.fillBlank(
    generateQuestionId('python-fundamentals', 7),
    'Complete the list comprehension: [x for x in range(5) if x % 2 == 0]',
    '[0, 2, 4]',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 8),
    'What is the correct way to create an empty list in Python?',
    ['list()', '[]', 'Both A and B', 'new list()'],
    'Both A and B',
    3
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 9),
    'Python strings are immutable',
    true,
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 10),
    'Which operator is used for exponentiation in Python?',
    ['^', '**', 'pow()', 'Both B and C'],
    'Both B and C',
    4
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 11),
    'Write a function that returns the sum of two numbers',
    'def add_numbers(a, b):\n    # Your code here\n    pass',
    [
      { input: 'add_numbers(3, 5)', expectedOutput: '8', description: 'Basic addition' },
      { input: 'add_numbers(-2, 7)', expectedOutput: '5', description: 'Negative numbers' }
    ],
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 12),
    'What is the result of len("Hello")?',
    ['4', '5', '6', 'Error'],
    '5',
    3
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 13),
    'Python supports multiple inheritance',
    true,
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 14),
    'Which method is used to add an element to the end of a list?',
    ['append()', 'add()', 'insert()', 'push()'],
    'append()',
    4
  ),

  questionTemplates.fillBlank(
    generateQuestionId('python-fundamentals', 15),
    'What is the output of: print(type(42))',
    '<class \'int\'>',
    4
  )
];

// PYTHON INTERMEDIATE QUESTIONS (16-35)
export const pythonIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 16),
    'What is the difference between a list and a tuple?',
    ['Lists are mutable, tuples are immutable', 'Tuples are mutable, lists are immutable', 'No difference', 'Lists are faster'],
    'Lists are mutable, tuples are immutable',
    6
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 17),
    'Write a function to find the maximum number in a list',
    'def find_max(numbers):\n    # Your code here\n    pass',
    [
      { input: 'find_max([1, 5, 3, 9, 2])', expectedOutput: '9', description: 'Basic max finding' },
      { input: 'find_max([-1, -5, -3])', expectedOutput: '-1', description: 'Negative numbers' }
    ],
    10
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 18),
    'What is a dictionary comprehension?',
    ['A way to create dictionaries using a compact syntax', 'A method to iterate over dictionaries', 'A type of loop', 'A built-in function'],
    'A way to create dictionaries using a compact syntax',
    5
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 19),
    'Lambda functions can have multiple statements',
    false,
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 20),
    'What is the purpose of the __init__ method?',
    ['To initialize a class instance', 'To destroy an object', 'To import modules', 'To handle errors'],
    'To initialize a class instance',
    5
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 21),
    'Create a class called Person with name and age attributes',
    'class Person:\n    # Your code here\n    pass',
    [
      { input: 'p = Person("Alice", 25)', expectedOutput: 'Person object with name="Alice", age=25', description: 'Basic class creation' }
    ],
    12
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 22),
    'What is the difference between == and is in Python?',
    ['== compares values, is compares identity', 'is compares values, == compares identity', 'No difference', '== is faster'],
    '== compares values, is compares identity',
    6
  ),

  questionTemplates.fillBlank(
    generateQuestionId('python-fundamentals', 23),
    'What is the output of: [x*2 for x in [1, 2, 3, 4]]',
    '[2, 4, 6, 8]',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 24),
    'Which module is used for working with dates and times?',
    ['datetime', 'time', 'calendar', 'All of the above'],
    'All of the above',
    4
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 25),
    'Python supports function overloading',
    false,
    5
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 26),
    'Write a function that reads a file and returns its content',
    'def read_file(filename):\n    # Your code here\n    pass',
    [
      { input: 'read_file("test.txt")', expectedOutput: 'File content as string', description: 'Basic file reading' }
    ],
    10
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 27),
    'What is the purpose of the try-except block?',
    ['To handle exceptions', 'To create loops', 'To define functions', 'To import modules'],
    'To handle exceptions',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 28),
    'Which data structure is best for checking membership?',
    ['List', 'Set', 'Tuple', 'String'],
    'Set',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 29),
    'Python uses reference counting for garbage collection',
    true,
    5
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 30),
    'Write a decorator that measures function execution time',
    'import time\n\ndef timing_decorator(func):\n    # Your code here\n    pass',
    [
      { input: '@timing_decorator\ndef slow_function(): pass', expectedOutput: 'Function with timing', description: 'Basic decorator' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 31),
    'What is the difference between *args and **kwargs?',
    ['*args for positional arguments, **kwargs for keyword arguments', 'No difference', '**kwargs is faster', '*args is deprecated'],
    '*args for positional arguments, **kwargs for keyword arguments',
    6
  ),

  questionTemplates.fillBlank(
    generateQuestionId('python-fundamentals', 32),
    'What is the output of: sorted([3, 1, 4, 1, 5], reverse=True)',
    '[5, 4, 3, 1, 1]',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 33),
    'Which method is used to remove an item from a list by value?',
    ['remove()', 'delete()', 'pop()', 'discard()'],
    'remove()',
    4
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 34),
    'Python supports operator overloading',
    true,
    5
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 35),
    'Write a generator function that yields Fibonacci numbers',
    'def fibonacci():\n    # Your code here\n    pass',
    [
      { input: 'list(fibonacci())[:5]', expectedOutput: '[0, 1, 1, 2, 3]', description: 'First 5 Fibonacci numbers' }
    ],
    12
  )
];

// PYTHON ADVANCED QUESTIONS (36-50)
export const pythonAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 36),
    'What is the Global Interpreter Lock (GIL)?',
    ['A mechanism that allows only one thread to execute Python bytecode at a time', 'A way to import global variables', 'A type of loop', 'A debugging tool'],
    'A mechanism that allows only one thread to execute Python bytecode at a time',
    8
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 37),
    'Implement a context manager using the contextlib module',
    'from contextlib import contextmanager\n\n@contextmanager\ndef my_context():\n    # Your code here\n    pass',
    [
      { input: 'with my_context() as ctx:', expectedOutput: 'Context manager that handles setup/teardown', description: 'Basic context manager' }
    ],
    15
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 38),
    'What is the difference between __str__ and __repr__?',
    ['__str__ is for end users, __repr__ is for developers', '__repr__ is for end users, __str__ is for developers', 'No difference', '__str__ is faster'],
    '__str__ is for end users, __repr__ is for developers',
    7
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 39),
    'Python supports multiple inheritance with method resolution order (MRO)',
    true,
    6
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 40),
    'Write a metaclass that automatically adds a timestamp to class creation',
    'class TimestampMeta(type):\n    # Your code here\n    pass',
    [
      { input: 'class MyClass(metaclass=TimestampMeta): pass', expectedOutput: 'Class with timestamp attribute', description: 'Basic metaclass' }
    ],
    18
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 41),
    'What is the purpose of the __slots__ attribute?',
    ['To restrict the attributes that can be assigned to an instance', 'To make classes faster', 'To add new attributes', 'To remove attributes'],
    'To restrict the attributes that can be assigned to an instance',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('python-fundamentals', 42),
    'What is the output of: import sys; print(sys.getsizeof([1,2,3]))',
    'A number representing memory size in bytes',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 43),
    'Which module provides support for working with JSON data?',
    ['json', 'pickle', 'marshal', 'All of the above'],
    'json',
    4
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 44),
    'Implement a custom iterator class',
    'class MyIterator:\n    # Your code here\n    pass',
    [
      { input: 'for item in MyIterator(): print(item)', expectedOutput: 'Iterates through custom sequence', description: 'Basic iterator' }
    ],
    12
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 45),
    'Python supports coroutines and async/await syntax',
    true,
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 46),
    'What is the purpose of the __new__ method?',
    ['To create a new instance of a class', 'To initialize an instance', 'To destroy an instance', 'To clone an instance'],
    'To create a new instance of a class',
    7
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 47),
    'Write a function using functools.partial',
    'from functools import partial\n\ndef multiply(x, y):\n    return x * y\n\n# Create a partial function\n# Your code here',
    [
      { input: 'double = partial(multiply, 2)', expectedOutput: 'Function that doubles its argument', description: 'Basic partial function' }
    ],
    10
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('python-fundamentals', 48),
    'What is the difference between shallow and deep copy?',
    ['Shallow copy copies references, deep copy copies objects recursively', 'Deep copy is faster', 'No difference', 'Shallow copy is deprecated'],
    'Shallow copy copies references, deep copy copies objects recursively',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('python-fundamentals', 49),
    'Python supports function annotations for type hints',
    true,
    5
  ),

  questionTemplates.coding(
    generateQuestionId('python-fundamentals', 50),
    'Implement a singleton pattern using __new__',
    'class Singleton:\n    # Your code here\n    pass',
    [
      { input: 's1 = Singleton(); s2 = Singleton(); s1 is s2', expectedOutput: 'True', description: 'Same instance returned' }
    ],
    15
  )
];

// COMBINED PYTHON QUESTIONS
export const pythonQuestions: Question[] = [
  ...pythonBeginnerQuestions,
  ...pythonIntermediateQuestions,
  ...pythonAdvancedQuestions
];
