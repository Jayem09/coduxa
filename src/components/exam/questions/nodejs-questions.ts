// Node.js Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// BEGINNER QUESTIONS
export const nodejsBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-fundamentals', 1),
    'What is Node.js?',
    ['A JavaScript runtime built on Chrome\'s V8 engine', 'A database', 'A frontend framework', 'A CSS preprocessor'],
    'A JavaScript runtime built on Chrome\'s V8 engine',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-fundamentals', 2),
    'Node.js is single-threaded and uses an event-driven, non-blocking I/O model',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-fundamentals', 3),
    'Which command is used to initialize a new Node.js project?',
    ['npm start', 'npm init', 'node init', 'npm create'],
    'npm init',
    3
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('nodejs-fundamentals', 4),
    'The ___ module is used to create HTTP servers in Node.js.',
    'http',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-fundamentals', 5),
    'What is the default port for a Node.js server?',
    ['3000', '8080', '5000', 'No default port'],
    'No default port',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-fundamentals', 6),
    'Node.js can be used for both frontend and backend development',
    true,
    2
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-fundamentals', 7),
    'Which file contains the project dependencies in a Node.js project?',
    ['package.json', 'node_modules', 'index.js', 'config.json'],
    'package.json',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-fundamentals', 8),
    'What does npm stand for?',
    ['Node Package Manager', 'New Project Manager', 'Node Project Manager', 'Network Package Manager'],
    'Node Package Manager',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-fundamentals', 9),
    'Node.js uses the CommonJS module system by default',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-fundamentals', 10),
    'Which method is used to import a module in Node.js?',
    ['import', 'require', 'include', 'load'],
    'require',
    3
  )
];

// INTERMEDIATE QUESTIONS
export const nodejsIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 1),
    'What is the purpose of the event loop in Node.js?',
    ['To handle file operations', 'To manage asynchronous operations', 'To compile JavaScript', 'To manage memory'],
    'To manage asynchronous operations',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 2),
    'Which method is used to read files asynchronously in Node.js?',
    ['fs.readFile', 'fs.readFileSync', 'fs.read', 'fs.open'],
    'fs.readFile',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-async', 3),
    'Promises are a way to handle asynchronous operations in Node.js',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 4),
    'What does the async/await syntax provide?',
    ['Synchronous code execution', 'A cleaner way to write asynchronous code', 'Better performance', 'Memory optimization'],
    'A cleaner way to write asynchronous code',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('nodejs-async', 5),
    'The ___ module provides utilities for working with file and directory paths.',
    'path',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 6),
    'Which method is used to create a directory in Node.js?',
    ['fs.createDir', 'fs.mkdir', 'fs.newDir', 'fs.directory'],
    'fs.mkdir',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 7),
    'What is the purpose of middleware in Express.js?',
    ['To handle database connections', 'To process requests before they reach route handlers', 'To manage sessions', 'To handle errors'],
    'To process requests before they reach route handlers',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-async', 8),
    'Express.js is a minimal and flexible Node.js web application framework',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 9),
    'Which method is used to send a JSON response in Express.js?',
    ['res.send()', 'res.json()', 'res.data()', 'res.output()'],
    'res.json()',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 10),
    'What is the purpose of the process object in Node.js?',
    ['To handle HTTP requests', 'To provide information about the current Node.js process', 'To manage files', 'To handle errors'],
    'To provide information about the current Node.js process',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-async', 11),
    'The global object in Node.js is similar to the window object in browsers',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 12),
    'Which module is used to handle URL parsing in Node.js?',
    ['url', 'uri', 'link', 'address'],
    'url',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 13),
    'What is the purpose of the Buffer class in Node.js?',
    ['To handle HTTP requests', 'To work with binary data', 'To manage memory', 'To handle files'],
    'To work with binary data',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('nodejs-async', 14),
    'The ___ method is used to listen for events on an EventEmitter.',
    'on',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-async', 15),
    'Which method is used to emit an event in Node.js?',
    ['emit', 'trigger', 'fire', 'send'],
    'emit',
    4
  )
];

// ADVANCED QUESTIONS
export const nodejsAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 1),
    'What is the purpose of clustering in Node.js?',
    ['To handle more HTTP requests', 'To create multiple processes to utilize multiple CPU cores', 'To manage memory', 'To handle errors'],
    'To create multiple processes to utilize multiple CPU cores',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 2),
    'Which module is used for clustering in Node.js?',
    ['cluster', 'fork', 'spawn', 'worker'],
    'cluster',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-advanced', 3),
    'Streams in Node.js are used for handling data that might not be available all at once',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 4),
    'What are the four types of streams in Node.js?',
    ['Readable, Writable, Duplex, Transform', 'Input, Output, Both, Convert', 'Source, Destination, Bridge, Change', 'Read, Write, ReadWrite, Modify'],
    'Readable, Writable, Duplex, Transform',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 5),
    'What is the purpose of the child_process module?',
    ['To handle HTTP requests', 'To spawn child processes', 'To manage memory', 'To handle files'],
    'To spawn child processes',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('nodejs-advanced', 6),
    '___ is a technique used to prevent the event loop from being blocked by CPU-intensive tasks.',
    'Worker threads',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 7),
    'Which method is used to create a worker thread in Node.js?',
    ['Worker', 'Thread', 'Process', 'Fork'],
    'Worker',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 8),
    'What is the purpose of the util module in Node.js?',
    ['To handle HTTP requests', 'To provide utility functions', 'To manage memory', 'To handle files'],
    'To provide utility functions',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-advanced', 9),
    'The crypto module in Node.js provides cryptographic functionality',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 10),
    'Which method is used to create a hash in Node.js?',
    ['crypto.hash', 'crypto.createHash', 'crypto.generateHash', 'crypto.makeHash'],
    'crypto.createHash',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 11),
    'What is the purpose of the os module in Node.js?',
    ['To handle HTTP requests', 'To provide operating system-related utility methods', 'To manage memory', 'To handle files'],
    'To provide operating system-related utility methods',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 12),
    'Which method is used to get the current working directory in Node.js?',
    ['process.cwd()', 'process.pwd()', 'process.dir()', 'process.current()'],
    'process.cwd()',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-advanced', 13),
    'The vm module in Node.js provides APIs for compiling and running code within V8 Virtual Machine contexts',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-advanced', 14),
    'What is the purpose of the perf_hooks module in Node.js?',
    ['To handle HTTP requests', 'To measure performance', 'To manage memory', 'To handle files'],
    'To measure performance',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('nodejs-advanced', 15),
    'The ___ method is used to measure the execution time of a function in Node.js.',
    'performance.now',
    4
  )
];

// FRAMEWORK & LIBRARY QUESTIONS
export const nodejsFrameworkQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-frameworks', 1),
    'Which framework is commonly used for building REST APIs in Node.js?',
    ['React', 'Express.js', 'Angular', 'Vue.js'],
    'Express.js',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-frameworks', 2),
    'What is the purpose of body-parser middleware in Express.js?',
    ['To handle HTTP requests', 'To parse request bodies', 'To manage sessions', 'To handle errors'],
    'To parse request bodies',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-frameworks', 3),
    'Socket.io is a library for real-time bidirectional event-based communication',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-frameworks', 4),
    'Which ORM is commonly used with Node.js for database operations?',
    ['Sequelize', 'Mongoose', 'Both A and B', 'None of the above'],
    'Both A and B',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-frameworks', 5),
    'What is the purpose of the cors middleware in Express.js?',
    ['To handle HTTP requests', 'To enable Cross-Origin Resource Sharing', 'To manage sessions', 'To handle errors'],
    'To enable Cross-Origin Resource Sharing',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('nodejs-frameworks', 6),
    '___ is a Node.js framework that provides a robust set of features for building web applications.',
    'Express.js',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-frameworks', 7),
    'Which method is used to define a route in Express.js?',
    ['app.route()', 'app.get()', 'app.post()', 'All of the above'],
    'All of the above',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('nodejs-frameworks', 8),
    'Passport.js is a popular authentication middleware for Node.js',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-frameworks', 9),
    'What is the purpose of the helmet middleware in Express.js?',
    ['To handle HTTP requests', 'To set various HTTP headers for security', 'To manage sessions', 'To handle errors'],
    'To set various HTTP headers for security',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('nodejs-frameworks', 10),
    'Which method is used to serve static files in Express.js?',
    ['app.static()', 'express.static()', 'app.serve()', 'express.serve()'],
    'express.static()',
    4
  )
];

// COMBINED EXPORT
export const nodejsQuestions: Question[] = [
  ...nodejsBeginnerQuestions,
  ...nodejsIntermediateQuestions,
  ...nodejsAdvancedQuestions,
  ...nodejsFrameworkQuestions
];
