// System Design Questions
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

export const systemDesignQuestions: Question[] = [
  // BEGINNER QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 1),
    'What is horizontal scaling?',
    ['Adding more servers to handle increased load', 'Upgrading existing server hardware', 'Reducing server capacity', 'Moving to a different data center'],
    'Adding more servers to handle increased load',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 2),
    'What is vertical scaling?',
    ['Upgrading existing server hardware', 'Adding more servers', 'Reducing server capacity', 'Moving to a different data center'],
    'Upgrading existing server hardware',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('system-design', 3),
    'Load balancing helps distribute traffic across multiple servers',
    true,
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 4),
    'What is a microservices architecture?',
    ['Breaking an application into small, independent services', 'Using only one large service', 'A type of database', 'A programming language'],
    'Breaking an application into small, independent services',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 5),
    'What is the purpose of a CDN (Content Delivery Network)?',
    ['To deliver content faster to users worldwide', 'To store user data', 'To process payments', 'To send emails'],
    'To deliver content faster to users worldwide',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('system-design', 6),
    'Caching can improve system performance by reducing database queries',
    true,
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 7),
    'What is a database shard?',
    ['A horizontal partition of data across multiple databases', 'A backup of the database', 'A type of index', 'A query optimization technique'],
    'A horizontal partition of data across multiple databases',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 8),
    'What is the CAP theorem?',
    ['Consistency, Availability, Partition tolerance - pick two', 'A database design principle', 'A programming paradigm', 'A network protocol'],
    'Consistency, Availability, Partition tolerance - pick two',
    8
  ),

  questionTemplates.fillBlank(
    generateQuestionId('system-design', 9),
    'Complete the term: ___ is the ability of a system to handle increased load',
    'Scalability',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 10),
    'What is a message queue?',
    ['A service for asynchronous communication between components', 'A type of database', 'A network protocol', 'A programming language'],
    'A service for asynchronous communication between components',
    7
  ),

  // INTERMEDIATE QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 11),
    'What is the difference between SQL and NoSQL databases?',
    ['SQL is relational, NoSQL is non-relational', 'No difference', 'SQL is faster', 'NoSQL is more secure'],
    'SQL is relational, NoSQL is non-relational',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 12),
    'What is a reverse proxy?',
    ['A server that forwards client requests to backend servers', 'A type of database', 'A programming language', 'A network protocol'],
    'A server that forwards client requests to backend servers',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('system-design', 13),
    'Event-driven architecture allows components to communicate through events',
    true,
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 14),
    'What is the purpose of a circuit breaker pattern?',
    ['To prevent cascading failures in distributed systems', 'To break electrical circuits', 'To optimize database queries', 'To encrypt data'],
    'To prevent cascading failures in distributed systems',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 15),
    'What is database replication?',
    ['Creating copies of data across multiple servers', 'Deleting old data', 'Compressing data', 'Encrypting data'],
    'Creating copies of data across multiple servers',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 16),
    'What is the purpose of an API gateway?',
    ['To manage and route API requests', 'To store data', 'To process payments', 'To send emails'],
    'To manage and route API requests',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('system-design', 17),
    'Complete the term: ___ is the time it takes for a system to respond to a request',
    'Latency',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 18),
    'What is the difference between synchronous and asynchronous communication?',
    ['Synchronous waits for response, asynchronous does not', 'No difference', 'Synchronous is faster', 'Asynchronous is more secure'],
    'Synchronous waits for response, asynchronous does not',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 19),
    'What is a distributed system?',
    ['A system with components on multiple machines', 'A single machine system', 'A type of database', 'A programming language'],
    'A system with components on multiple machines',
    7
  ),

  questionTemplates.trueFalse(
    generateQuestionId('system-design', 20),
    'Stateless services are easier to scale than stateful services',
    true,
    6
  ),

  // ADVANCED QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 21),
    'What is the purpose of a service mesh?',
    ['To manage service-to-service communication', 'To store data', 'To process payments', 'To send emails'],
    'To manage service-to-service communication',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 22),
    'What is eventual consistency?',
    ['A consistency model where data will be consistent eventually', 'Immediate consistency', 'No consistency', 'Strong consistency'],
    'A consistency model where data will be consistent eventually',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 23),
    'What is the purpose of a load balancer?',
    ['To distribute traffic across multiple servers', 'To store data', 'To process payments', 'To send emails'],
    'To distribute traffic across multiple servers',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('system-design', 24),
    'Database indexing can improve query performance but increases storage overhead',
    true,
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 25),
    'What is the difference between a monolith and microservices?',
    ['Monolith is single deployable unit, microservices are separate', 'No difference', 'Monolith is faster', 'Microservices are more secure'],
    'Monolith is single deployable unit, microservices are separate',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 26),
    'What is the purpose of a cache invalidation strategy?',
    ['To ensure cached data remains consistent', 'To delete all cache', 'To increase cache size', 'To encrypt cache'],
    'To ensure cached data remains consistent',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('system-design', 27),
    'Complete the term: ___ is the maximum load a system can handle',
    'Throughput',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 28),
    'What is the purpose of a database connection pool?',
    ['To reuse database connections efficiently', 'To store data', 'To process payments', 'To send emails'],
    'To reuse database connections efficiently',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 29),
    'What is the difference between read and write replicas?',
    ['Read replicas handle queries, write replicas handle updates', 'No difference', 'Read replicas are faster', 'Write replicas are more secure'],
    'Read replicas handle queries, write replicas handle updates',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 30),
    'What is the purpose of a message broker?',
    ['To facilitate asynchronous communication between services', 'To store data', 'To process payments', 'To send emails'],
    'To facilitate asynchronous communication between services',
    7
  ),

  // EXPERT QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 31),
    'What is the purpose of a distributed cache?',
    ['To share cached data across multiple servers', 'To store data permanently', 'To process payments', 'To send emails'],
    'To share cached data across multiple servers',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 32),
    'What is the difference between horizontal and vertical partitioning?',
    ['Horizontal splits rows, vertical splits columns', 'No difference', 'Horizontal is faster', 'Vertical is more secure'],
    'Horizontal splits rows, vertical splits columns',
    8
  ),

  questionTemplates.trueFalse(
    generateQuestionId('system-design', 33),
    'Event sourcing stores events instead of current state',
    true,
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 34),
    'What is the purpose of a saga pattern?',
    ['To manage distributed transactions', 'To store data', 'To process payments', 'To send emails'],
    'To manage distributed transactions',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 35),
    'What is the difference between strong and eventual consistency?',
    ['Strong is immediate, eventual is delayed', 'No difference', 'Strong is faster', 'Eventual is more secure'],
    'Strong is immediate, eventual is delayed',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 36),
    'What is the purpose of a distributed lock?',
    ['To coordinate access to shared resources', 'To store data', 'To process payments', 'To send emails'],
    'To coordinate access to shared resources',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 37),
    'What is the difference between push and pull models?',
    ['Push sends data, pull requests data', 'No difference', 'Push is faster', 'Pull is more secure'],
    'Push sends data, pull requests data',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('system-design', 38),
    'Complete the term: ___ is the ability of a system to continue operating despite failures',
    'Fault tolerance',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 39),
    'What is the purpose of a health check endpoint?',
    ['To monitor service availability', 'To store data', 'To process payments', 'To send emails'],
    'To monitor service availability',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('system-design', 40),
    'What is the difference between blue-green and canary deployments?',
    ['Blue-green switches all traffic, canary gradually shifts', 'No difference', 'Blue-green is faster', 'Canary is more secure'],
    'Blue-green switches all traffic, canary gradually shifts',
    8
  ),

  // CODING QUESTIONS
  questionTemplates.coding(
    generateQuestionId('system-design', 41),
    'Design a simple rate limiter class',
    'class RateLimiter {\n  constructor(maxRequests, windowMs) {\n    this.maxRequests = maxRequests;\n    this.windowMs = windowMs;\n    this.requests = new Map();\n  }\n  \n  isAllowed(identifier) {\n    const now = Date.now();\n    const windowStart = now - this.windowMs;\n    \n    if (!this.requests.has(identifier)) {\n      this.requests.set(identifier, []);\n    }\n    \n    const userRequests = this.requests.get(identifier);\n    const validRequests = userRequests.filter(time => time > windowStart);\n    \n    if (validRequests.length >= this.maxRequests) {\n      return false;\n    }\n    \n    validRequests.push(now);\n    this.requests.set(identifier, validRequests);\n    return true;\n  }\n}',
    [
      { input: 'RateLimiter(5, 60000) - 5 requests per minute', expectedOutput: 'Allows requests within limit', description: 'Basic rate limiting functionality' },
      { input: 'Exceeding rate limit', expectedOutput: 'Blocks requests when limit exceeded', description: 'Enforces rate limits' }
    ],
    15
  ),

  questionTemplates.coding(
    generateQuestionId('system-design', 42),
    'Implement a simple cache with TTL (Time To Live)',
    'class TTLCache {\n  constructor() {\n    this.cache = new Map();\n  }\n  \n  set(key, value, ttlMs) {\n    const expiry = Date.now() + ttlMs;\n    this.cache.set(key, { value, expiry });\n  }\n  \n  get(key) {\n    const item = this.cache.get(key);\n    if (!item) return null;\n    \n    if (Date.now() > item.expiry) {\n      this.cache.delete(key);\n      return null;\n    }\n    \n    return item.value;\n  }\n  \n  delete(key) {\n    this.cache.delete(key);\n  }\n}',
    [
      { input: 'Cache with 1000ms TTL', expectedOutput: 'Stores and retrieves values within TTL', description: 'Basic TTL functionality' },
      { input: 'Expired cache entry', expectedOutput: 'Returns null for expired entries', description: 'Handles expiration' }
    ],
    12
  ),

  questionTemplates.coding(
    generateQuestionId('system-design', 43),
    'Create a simple load balancer that distributes requests round-robin',
    'class RoundRobinLoadBalancer {\n  constructor(servers) {\n    this.servers = servers;\n    this.currentIndex = 0;\n  }\n  \n  getNextServer() {\n    const server = this.servers[this.currentIndex];\n    this.currentIndex = (this.currentIndex + 1) % this.servers.length;\n    return server;\n  }\n  \n  addServer(server) {\n    this.servers.push(server);\n  }\n  \n  removeServer(server) {\n    const index = this.servers.indexOf(server);\n    if (index > -1) {\n      this.servers.splice(index, 1);\n      if (this.currentIndex >= this.servers.length) {\n        this.currentIndex = 0;\n      }\n    }\n  }\n}',
    [
      { input: 'Load balancer with 3 servers', expectedOutput: 'Distributes requests evenly', description: 'Round-robin distribution' },
      { input: 'Adding/removing servers', expectedOutput: 'Handles dynamic server changes', description: 'Dynamic server management' }
    ],
    15
  ),

  questionTemplates.coding(
    generateQuestionId('system-design', 44),
    'Implement a simple circuit breaker pattern',
    'class CircuitBreaker {\n  constructor(threshold, timeout) {\n    this.threshold = threshold;\n    this.timeout = timeout;\n    this.failureCount = 0;\n    this.lastFailureTime = null;\n    this.state = \'CLOSED\'; // CLOSED, OPEN, HALF_OPEN\n  }\n  \n  async execute(operation) {\n    if (this.state === \'OPEN\') {\n      if (Date.now() - this.lastFailureTime > this.timeout) {\n        this.state = \'HALF_OPEN\';\n      } else {\n        throw new Error(\'Circuit breaker is OPEN\');\n      }\n    }\n    \n    try {\n      const result = await operation();\n      this.onSuccess();\n      return result;\n    } catch (error) {\n      this.onFailure();\n      throw error;\n    }\n  }\n  \n  onSuccess() {\n    this.failureCount = 0;\n    this.state = \'CLOSED\';\n  }\n  \n  onFailure() {\n    this.failureCount++;\n    this.lastFailureTime = Date.now();\n    \n    if (this.failureCount >= this.threshold) {\n      this.state = \'OPEN\';\n    }\n  }\n}',
    [
      { input: 'Circuit breaker with threshold 3', expectedOutput: 'Opens after 3 failures', description: 'Basic circuit breaker functionality' },
      { input: 'Recovery after timeout', expectedOutput: 'Transitions to HALF_OPEN state', description: 'Handles recovery' }
    ],
    18
  ),

  questionTemplates.coding(
    generateQuestionId('system-design', 45),
    'Design a simple message queue with basic operations',
    'class MessageQueue {\n  constructor() {\n    this.queues = new Map();\n  }\n  \n  createQueue(queueName) {\n    if (!this.queues.has(queueName)) {\n      this.queues.set(queueName, []);\n    }\n  }\n  \n  enqueue(queueName, message) {\n    if (!this.queues.has(queueName)) {\n      this.createQueue(queueName);\n    }\n    this.queues.get(queueName).push(message);\n  }\n  \n  dequeue(queueName) {\n    const queue = this.queues.get(queueName);\n    if (!queue || queue.length === 0) {\n      return null;\n    }\n    return queue.shift();\n  }\n  \n  peek(queueName) {\n    const queue = this.queues.get(queueName);\n    if (!queue || queue.length === 0) {\n      return null;\n    }\n    return queue[0];\n  }\n  \n  size(queueName) {\n    const queue = this.queues.get(queueName);\n    return queue ? queue.length : 0;\n  }\n}',
    [
      { input: 'Message queue with multiple queues', expectedOutput: 'Manages multiple message queues', description: 'Basic queue operations' },
      { input: 'Enqueue and dequeue operations', expectedOutput: 'FIFO message processing', description: 'Queue ordering' }
    ],
    15
  )
];
