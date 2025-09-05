// Cybersecurity Questions
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

export const securityQuestions: Question[] = [
  // BEGINNER QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 1),
    'What is a firewall?',
    ['A network security device that monitors and filters traffic', 'A type of virus', 'A programming language', 'A database'],
    'A network security device that monitors and filters traffic',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 2),
    'What is the primary purpose of encryption?',
    ['To protect data confidentiality', 'To increase data speed', 'To compress data', 'To backup data'],
    'To protect data confidentiality',
    4
  ),

  questionTemplates.trueFalse(
    generateQuestionId('cybersecurity-basics', 3),
    'A strong password should contain at least 8 characters with mixed case, numbers, and symbols',
    true,
    3
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 4),
    'What is phishing?',
    ['A social engineering attack to steal sensitive information', 'A type of malware', 'A network protocol', 'A programming language'],
    'A social engineering attack to steal sensitive information',
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 5),
    'What does VPN stand for?',
    ['Virtual Private Network', 'Very Private Network', 'Verified Private Network', 'Virtual Public Network'],
    'Virtual Private Network',
    3
  ),

  questionTemplates.trueFalse(
    generateQuestionId('cybersecurity-basics', 6),
    'Two-factor authentication provides better security than single-factor authentication',
    true,
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 7),
    'What is malware?',
    ['Malicious software designed to harm computers', 'A type of firewall', 'A security protocol', 'A backup system'],
    'Malicious software designed to harm computers',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 8),
    'What is the purpose of antivirus software?',
    ['To detect and remove malicious software', 'To encrypt data', 'To create backups', 'To monitor network traffic'],
    'To detect and remove malicious software',
    4
  ),

  questionTemplates.fillBlank(
    generateQuestionId('cybersecurity-basics', 9),
    'Complete the term: ___ is the practice of protecting systems, networks, and programs from digital attacks',
    'Cybersecurity',
    3
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 10),
    'What is a vulnerability in cybersecurity?',
    ['A weakness that can be exploited by attackers', 'A type of firewall', 'A security protocol', 'A backup system'],
    'A weakness that can be exploited by attackers',
    5
  ),

  // INTERMEDIATE QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 11),
    'What is the difference between symmetric and asymmetric encryption?',
    ['Symmetric uses same key, asymmetric uses different keys', 'No difference', 'Symmetric is faster', 'Asymmetric is more secure'],
    'Symmetric uses same key, asymmetric uses different keys',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 12),
    'What is a DDoS attack?',
    ['Distributed Denial of Service attack', 'Data Destruction of Systems', 'Direct Download of Software', 'Database Design Optimization'],
    'Distributed Denial of Service attack',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('cybersecurity-basics', 13),
    'HTTPS encrypts data in transit between client and server',
    true,
    5
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 14),
    'What is the principle of least privilege?',
    ['Users should have minimum necessary access', 'All users should have admin access', 'Security should be maximum', 'Access should be unlimited'],
    'Users should have minimum necessary access',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 15),
    'What is SQL injection?',
    ['A code injection technique that exploits security vulnerabilities', 'A type of firewall', 'A backup method', 'A network protocol'],
    'A code injection technique that exploits security vulnerabilities',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 16),
    'What is the purpose of a honeypot?',
    ['To detect and study unauthorized access attempts', 'To store honey', 'To backup data', 'To encrypt files'],
    'To detect and study unauthorized access attempts',
    6
  ),

  questionTemplates.fillBlank(
    generateQuestionId('cybersecurity-basics', 17),
    'Complete the term: ___ is the process of converting data into a code to prevent unauthorized access',
    'Encryption',
    4
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 18),
    'What is cross-site scripting (XSS)?',
    ['A vulnerability that allows attackers to inject malicious scripts', 'A type of firewall', 'A backup system', 'A network protocol'],
    'A vulnerability that allows attackers to inject malicious scripts',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 19),
    'What is the CIA triad in cybersecurity?',
    ['Confidentiality, Integrity, Availability', 'Computer, Internet, Application', 'Code, Information, Access', 'Control, Input, Analysis'],
    'Confidentiality, Integrity, Availability',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('cybersecurity-basics', 20),
    'Regular security updates and patches help protect against known vulnerabilities',
    true,
    4
  ),

  // ADVANCED QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 21),
    'What is a zero-day vulnerability?',
    ['A vulnerability that is unknown to security vendors', 'A vulnerability that takes zero days to fix', 'A vulnerability with zero impact', 'A vulnerability that affects zero systems'],
    'A vulnerability that is unknown to security vendors',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 22),
    'What is the purpose of a security audit?',
    ['To evaluate security measures and identify vulnerabilities', 'To create backups', 'To encrypt data', 'To monitor network speed'],
    'To evaluate security measures and identify vulnerabilities',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 23),
    'What is social engineering?',
    ['Manipulating people to divulge confidential information', 'A type of malware', 'A network protocol', 'A backup method'],
    'Manipulating people to divulge confidential information',
    6
  ),

  questionTemplates.trueFalse(
    generateQuestionId('cybersecurity-basics', 24),
    'Network segmentation can help limit the spread of security breaches',
    true,
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 25),
    'What is the difference between authentication and authorization?',
    ['Authentication verifies identity, authorization controls access', 'No difference', 'Authentication is faster', 'Authorization is more secure'],
    'Authentication verifies identity, authorization controls access',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 26),
    'What is a man-in-the-middle attack?',
    ['An attack where an attacker intercepts communication', 'A type of malware', 'A backup system', 'A network protocol'],
    'An attack where an attacker intercepts communication',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('cybersecurity-basics', 27),
    'Complete the term: ___ is the practice of hiding information within other information',
    'Steganography',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 28),
    'What is the purpose of a security incident response plan?',
    ['To handle security breaches systematically', 'To prevent all attacks', 'To backup data', 'To encrypt files'],
    'To handle security breaches systematically',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 29),
    'What is a rootkit?',
    ['Malicious software that provides privileged access', 'A type of firewall', 'A backup system', 'A network protocol'],
    'Malicious software that provides privileged access',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 30),
    'What is the principle of defense in depth?',
    ['Using multiple layers of security controls', 'Using only one security control', 'Using maximum security', 'Using minimum security'],
    'Using multiple layers of security controls',
    7
  ),

  // EXPERT QUESTIONS
  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 31),
    'What is the difference between a virus and a worm?',
    ['Worms spread independently, viruses need host programs', 'No difference', 'Viruses are faster', 'Worms are more dangerous'],
    'Worms spread independently, viruses need host programs',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 32),
    'What is a security token?',
    ['A physical or digital device used for authentication', 'A type of malware', 'A network protocol', 'A backup system'],
    'A physical or digital device used for authentication',
    7
  ),

  questionTemplates.trueFalse(
    generateQuestionId('cybersecurity-basics', 33),
    'Penetration testing involves simulating attacks to identify vulnerabilities',
    true,
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 34),
    'What is the purpose of a security policy?',
    ['To define security rules and procedures', 'To prevent all attacks', 'To backup data', 'To encrypt files'],
    'To define security rules and procedures',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 35),
    'What is a botnet?',
    ['A network of compromised computers controlled by attackers', 'A type of firewall', 'A backup system', 'A network protocol'],
    'A network of compromised computers controlled by attackers',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 36),
    'What is the difference between hashing and encryption?',
    ['Hashing is one-way, encryption is reversible', 'No difference', 'Hashing is faster', 'Encryption is more secure'],
    'Hashing is one-way, encryption is reversible',
    8
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 37),
    'What is a security baseline?',
    ['A minimum level of security configuration', 'A maximum security level', 'A backup system', 'A network protocol'],
    'A minimum level of security configuration',
    7
  ),

  questionTemplates.fillBlank(
    generateQuestionId('cybersecurity-basics', 38),
    'Complete the term: ___ is the process of identifying, analyzing, and responding to security incidents',
    'Incident response',
    6
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 39),
    'What is the purpose of a security awareness program?',
    ['To educate users about security threats and best practices', 'To prevent all attacks', 'To backup data', 'To encrypt files'],
    'To educate users about security threats and best practices',
    7
  ),

  questionTemplates.multipleChoice(
    generateQuestionId('cybersecurity-basics', 40),
    'What is a security control?',
    ['A measure to protect against security risks', 'A type of malware', 'A network protocol', 'A backup system'],
    'A measure to protect against security risks',
    6
  ),

  // CODING QUESTIONS
  questionTemplates.coding(
    generateQuestionId('cybersecurity-basics', 41),
    'Write a function to validate password strength',
    'function validatePassword(password) {\n  const minLength = 8;\n  const hasUpperCase = /[A-Z]/.test(password);\n  const hasLowerCase = /[a-z]/.test(password);\n  const hasNumbers = /\\d/.test(password);\n  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);\n  \n  return password.length >= minLength && \n         hasUpperCase && \n         hasLowerCase && \n         hasNumbers && \n         hasSpecialChar;\n}',
    [
      { input: '"Password123!"', expectedOutput: 'true', description: 'Strong password with all requirements' },
      { input: '"weak"', expectedOutput: 'false', description: 'Weak password missing requirements' }
    ],
    12
  ),

  questionTemplates.coding(
    generateQuestionId('cybersecurity-basics', 42),
    'Create a function to sanitize user input to prevent XSS attacks',
    'function sanitizeInput(input) {\n  return input\n    .replace(/</g, "&lt;")\n    .replace(/>/g, "&gt;")\n    .replace(/"/g, "&quot;")\n    .replace(/\'/g, "&#x27;")\n    .replace(/\\//g, "&#x2F;");\n}',
    [
      { input: '<script>alert("xss")</script>', expectedOutput: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;', description: 'Sanitizes script tags' },
      { input: 'Normal text', expectedOutput: 'Normal text', description: 'Leaves normal text unchanged' }
    ],
    15
  ),

  questionTemplates.coding(
    generateQuestionId('cybersecurity-basics', 43),
    'Write a function to generate a secure random password',
    'function generateSecurePassword(length = 12) {\n  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";\n  let password = "";\n  \n  for (let i = 0; i < length; i++) {\n    const randomIndex = Math.floor(Math.random() * charset.length);\n    password += charset[randomIndex];\n  }\n  \n  return password;\n}',
    [
      { input: '8', expectedOutput: '8-character password', description: 'Generates password of specified length' },
      { input: '16', expectedOutput: '16-character password', description: 'Generates longer password' }
    ],
    12
  ),

  questionTemplates.coding(
    generateQuestionId('cybersecurity-basics', 44),
    'Create a function to validate email format and check for common security issues',
    'function validateEmailSecurity(email) {\n  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  const suspiciousPatterns = [\n    /<script/i,\n    /javascript:/i,\n    /on\\w+\\s*=/i\n  ];\n  \n  if (!emailRegex.test(email)) {\n    return { valid: false, reason: "Invalid email format" };\n  }\n  \n  for (let pattern of suspiciousPatterns) {\n    if (pattern.test(email)) {\n      return { valid: false, reason: "Suspicious content detected" };\n    }\n  }\n  \n  return { valid: true, reason: "Email is secure" };\n}',
    [
      { input: 'user@example.com', expectedOutput: '{ valid: true, reason: "Email is secure" }', description: 'Valid email format' },
      { input: '<script>alert("xss")</script>@evil.com', expectedOutput: '{ valid: false, reason: "Suspicious content detected" }', description: 'Detects malicious content' }
    ],
    15
  ),

  questionTemplates.coding(
    generateQuestionId('cybersecurity-basics', 45),
    'Write a function to implement basic rate limiting for API requests',
    'function createRateLimiter(maxRequests, windowMs) {\n  const requests = new Map();\n  \n  return function(identifier) {\n    const now = Date.now();\n    const windowStart = now - windowMs;\n    \n    if (!requests.has(identifier)) {\n      requests.set(identifier, []);\n    }\n    \n    const userRequests = requests.get(identifier);\n    \n    // Remove old requests outside the window\n    const validRequests = userRequests.filter(time => time > windowStart);\n    \n    if (validRequests.length >= maxRequests) {\n      return { allowed: false, remaining: 0 };\n    }\n    \n    validRequests.push(now);\n    requests.set(identifier, validRequests);\n    \n    return { \n      allowed: true, \n      remaining: maxRequests - validRequests.length \n    };\n  };\n}',
    [
      { input: 'Rate limiter with 5 requests per minute', expectedOutput: 'Allows requests within limit', description: 'Basic rate limiting functionality' },
      { input: 'Exceeding rate limit', expectedOutput: 'Blocks requests when limit exceeded', description: 'Enforces rate limits' }
    ],
    18
  )
];
