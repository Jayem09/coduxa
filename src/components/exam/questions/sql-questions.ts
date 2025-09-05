// SQL Questions
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

export const sqlQuestions: Question[] = [
  // BEGINNER QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 1),
    'What does SQL stand for?',
    ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'System Query Language'],
    'Structured Query Language',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 2),
    'Which SQL command is used to retrieve data from a database?',
    ['SELECT', 'GET', 'FETCH', 'RETRIEVE'],
    'SELECT',
    3
  ),

  questionTemplates.trueFalse(
    generateQuestionId('sql-database', 3),
    'SQL is case-sensitive',
    false,
    2
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 4),
    'What is the purpose of the WHERE clause in SQL?',
    ['To filter rows', 'To sort results', 'To group data', 'To join tables'],
    'To filter rows',
    4
  ),

  questionTemplates.fillBlank(
    generateQuestionId('sql-database', 5),
    'Complete the SQL statement: SELECT * FROM ___ WHERE id = 1',
    'users',
    3
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 6),
    'Which keyword is used to sort results in SQL?',
    ['ORDER BY', 'SORT BY', 'ARRANGE BY', 'GROUP BY'],
    'ORDER BY',
    3
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 7),
    'What does the INSERT statement do?',
    ['Adds new rows to a table', 'Updates existing rows', 'Deletes rows', 'Creates a new table'],
    'Adds new rows to a table',
    4
  ),

  questionTemplates.trueFalse(
    generateQuestionId('sql-database', 8),
    'The DELETE statement can be used to remove specific rows from a table',
    true,
    3
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 9),
    'Which SQL command is used to modify existing data?',
    ['UPDATE', 'MODIFY', 'CHANGE', 'ALTER'],
    'UPDATE',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 10),
    'What is a primary key?',
    ['A unique identifier for each row', 'A foreign key', 'An index', 'A constraint'],
    'A unique identifier for each row',
    5
  ),

  // INTERMEDIATE QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 11),
    'Which JOIN type returns all rows from both tables?',
    ['FULL OUTER JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
    'FULL OUTER JOIN',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 12),
    'What does the GROUP BY clause do?',
    ['Groups rows with the same values', 'Sorts the results', 'Filters the data', 'Joins tables'],
    'Groups rows with the same values',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 13),
    'Which aggregate function counts the number of rows?',
    ['COUNT()', 'SUM()', 'AVG()', 'MAX()'],
    'COUNT()',
    4
  ),

  questionTemplates.trueFalse(
    generateQuestionId('sql-database', 14),
    'The HAVING clause is used to filter groups after GROUP BY',
    true,
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 15),
    'What is the difference between INNER JOIN and LEFT JOIN?',
    ['LEFT JOIN returns all rows from left table', 'INNER JOIN returns all rows from both tables', 'No difference', 'LEFT JOIN is faster'],
    'LEFT JOIN returns all rows from left table',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 16),
    'Which SQL function is used to find the maximum value?',
    ['MAX()', 'HIGHEST()', 'TOP()', 'PEAK()'],
    'MAX()',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 17),
    'What does the DISTINCT keyword do?',
    ['Removes duplicate rows', 'Sorts the results', 'Groups the data', 'Filters the data'],
    'Removes duplicate rows',
    4
  ),

  questionTemplates.fillBlank(
    generateQuestionId('sql-database', 18),
    'Complete the SQL statement: SELECT COUNT(*) FROM orders WHERE status = ___',
    "'completed'",
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 19),
    'Which operator is used for pattern matching in SQL?',
    ['LIKE', 'MATCH', 'FIND', 'SEARCH'],
    'LIKE',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 20),
    'What is a foreign key?',
    ['A key that references another table', 'A unique key', 'A primary key', 'An index'],
    'A key that references another table',
    6
  ),

  // ADVANCED QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 21),
    'What is the purpose of an index in a database?',
    ['To improve query performance', 'To store data', 'To backup data', 'To validate data'],
    'To improve query performance',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 22),
    'Which SQL statement is used to create a new table?',
    ['CREATE TABLE', 'NEW TABLE', 'ADD TABLE', 'MAKE TABLE'],
    'CREATE TABLE',
    5
  ),

  questionTemplates.trueFalse(
    generateQuestionId('sql-database', 23),
    'A subquery can be used in the WHERE clause',
    true,
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 24),
    'What does the UNION operator do?',
    ['Combines results from multiple SELECT statements', 'Joins tables', 'Groups data', 'Sorts data'],
    'Combines results from multiple SELECT statements',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 25),
    'Which SQL function is used to calculate the average?',
    ['AVG()', 'MEAN()', 'AVERAGE()', 'CALC_AVG()'],
    'AVG()',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 26),
    'What is a view in SQL?',
    ['A virtual table based on a query', 'A physical table', 'An index', 'A constraint'],
    'A virtual table based on a query',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 27),
    'Which clause is used to limit the number of rows returned?',
    ['LIMIT', 'TOP', 'ROWNUM', 'All of the above'],
    'All of the above',
    6
  ),

  questionTemplates.fillBlank(
    generateQuestionId('sql-database', 28),
    'Complete the SQL statement: SELECT name, COUNT(*) FROM users GROUP BY ___',
    'name',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 29),
    'What does the EXISTS operator do?',
    ['Checks if a subquery returns any rows', 'Checks if a value exists', 'Creates a table', 'Deletes data'],
    'Checks if a subquery returns any rows',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 30),
    'Which SQL statement is used to remove a table?',
    ['DROP TABLE', 'DELETE TABLE', 'REMOVE TABLE', 'CLEAR TABLE'],
    'DROP TABLE',
    5
  ),

  // EXPERT QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 31),
    'What is the difference between a clustered and non-clustered index?',
    ['Clustered index determines physical order of data', 'Non-clustered index is faster', 'No difference', 'Clustered index is always unique'],
    'Clustered index determines physical order of data',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 32),
    'Which SQL feature is used to ensure data integrity?',
    ['Constraints', 'Indexes', 'Views', 'Functions'],
    'Constraints',
    7
  ),

  questionTemplates.trueFalse(
    generateQuestionId('sql-database', 33),
    'A transaction can be rolled back if an error occurs',
    true,
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 34),
    'What is the purpose of the ROLLBACK statement?',
    ['Undoes changes in a transaction', 'Commits changes', 'Creates a backup', 'Deletes data'],
    'Undoes changes in a transaction',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 35),
    'Which SQL function is used to get the current date and time?',
    ['NOW()', 'CURRENT_TIMESTAMP', 'GETDATE()', 'All of the above'],
    'All of the above',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 36),
    'What does the CASCADE option do in foreign key constraints?',
    ['Automatically deletes related rows', 'Prevents deletion', 'Creates an index', 'Validates data'],
    'Automatically deletes related rows',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 37),
    'Which SQL statement is used to modify table structure?',
    ['ALTER TABLE', 'MODIFY TABLE', 'CHANGE TABLE', 'UPDATE TABLE'],
    'ALTER TABLE',
    6
  ),

  questionTemplates.fillBlank(
    generateQuestionId('sql-database', 38),
    'Complete the SQL statement: SELECT * FROM users WHERE age ___ 18',
    '>=',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 39),
    'What is a stored procedure?',
    ['A precompiled collection of SQL statements', 'A table', 'An index', 'A view'],
    'A precompiled collection of SQL statements',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('sql-database', 40),
    'Which SQL feature is used to prevent duplicate entries?',
    ['UNIQUE constraint', 'PRIMARY KEY', 'INDEX', 'All of the above'],
    'All of the above',
    6
  ),

  // CODING QUESTIONS
  questionTemplates.coding(
    generateQuestionId('sql-database', 41),
    'Write a SQL query to find all users who have made more than 5 orders',
    'SELECT u.name, COUNT(o.id) as order_count\nFROM users u\nJOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name\nHAVING COUNT(o.id) > 5;',
    [
      { input: 'users table with id, name columns', expectedOutput: 'Users with >5 orders', description: 'Basic functionality' },
      { input: 'orders table with user_id foreign key', expectedOutput: 'Proper JOIN and GROUP BY', description: 'Table relationships' }
    ],
    12
  ),

  questionTemplates.coding(
    generateQuestionId('sql-database', 42),
    'Create a SQL query to update the price of all products in the Electronics category by 10%',
    'UPDATE products\nSET price = price * 1.10\nWHERE category = \'Electronics\';',
    [
      { input: 'products table with price and category columns', expectedOutput: 'Updated prices', description: 'Basic UPDATE with WHERE' },
      { input: 'Multiple categories in table', expectedOutput: 'Only Electronics updated', description: 'Proper filtering' }
    ],
    10
  ),

  questionTemplates.coding(
    generateQuestionId('sql-database', 43),
    'Write a SQL query to find the second highest salary from the employees table',
    'SELECT MAX(salary) as second_highest\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);',
    [
      { input: 'employees table with salary column', expectedOutput: 'Second highest salary value', description: 'Subquery approach' },
      { input: 'Table with duplicate max salaries', expectedOutput: 'Correct second highest', description: 'Handles duplicates' }
    ],
    15
  ),

  questionTemplates.coding(
    generateQuestionId('sql-database', 44),
    'Create a SQL query to find all customers who have never placed an order',
    'SELECT c.name\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.customer_id IS NULL;',
    [
      { input: 'customers and orders tables', expectedOutput: 'Customers with no orders', description: 'LEFT JOIN with NULL check' },
      { input: 'Empty orders table', expectedOutput: 'All customers returned', description: 'Handles empty orders' }
    ],
    12
  ),

  questionTemplates.coding(
    generateQuestionId('sql-database', 45),
    'Write a SQL query to get the top 3 best-selling products by quantity',
    'SELECT p.name, SUM(oi.quantity) as total_sold\nFROM products p\nJOIN order_items oi ON p.id = oi.product_id\nGROUP BY p.id, p.name\nORDER BY total_sold DESC\nLIMIT 3;',
    [
      { input: 'products, order_items tables', expectedOutput: 'Top 3 products by sales', description: 'JOIN, GROUP BY, ORDER BY' },
      { input: 'Multiple orders for same product', expectedOutput: 'Correct total quantities', description: 'Proper aggregation' }
    ],
    15
  )
];
