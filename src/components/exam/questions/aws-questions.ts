// AWS Cloud Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// BEGINNER QUESTIONS
export const awsBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('aws-fundamentals', 1),
    'What does AWS stand for?',
    ['Amazon Web Services', 'Advanced Web Solutions', 'Automated Web Systems', 'Application Web Services'],
    'Amazon Web Services',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-fundamentals', 2),
    'AWS is a cloud computing platform provided by Amazon',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-fundamentals', 3),
    'What is Amazon EC2?',
    ['A database service', 'A virtual server service', 'A storage service', 'A networking service'],
    'A virtual server service',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('aws-fundamentals', 4),
    'Amazon ___ is a scalable object storage service.',
    'S3',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-fundamentals', 5),
    'What is the AWS Free Tier?',
    ['A paid service', 'A set of services that are free for 12 months', 'A premium service', 'A database service'],
    'A set of services that are free for 12 months',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-fundamentals', 6),
    'AWS operates on a pay-as-you-go pricing model',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-fundamentals', 7),
    'What is an AWS Region?',
    ['A database', 'A geographic area where AWS services are available', 'A virtual machine', 'A storage bucket'],
    'A geographic area where AWS services are available',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-fundamentals', 8),
    'What is an Availability Zone?',
    ['A database', 'A data center within a region', 'A virtual machine', 'A storage service'],
    'A data center within a region',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-fundamentals', 9),
    'AWS provides both Infrastructure as a Service (IaaS) and Platform as a Service (PaaS)',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-fundamentals', 10),
    'What is AWS Identity and Access Management (IAM)?',
    ['A database service', 'A service for managing user access and permissions', 'A storage service', 'A networking service'],
    'A service for managing user access and permissions',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-fundamentals', 11),
    'What is Amazon RDS?',
    ['A storage service', 'A managed relational database service', 'A virtual machine service', 'A networking service'],
    'A managed relational database service',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-fundamentals', 12),
    'AWS provides auto-scaling capabilities for many services',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-fundamentals', 13),
    'What is Amazon VPC?',
    ['A database service', 'A virtual private cloud service', 'A storage service', 'A compute service'],
    'A virtual private cloud service',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('aws-fundamentals', 14),
    'Amazon ___ is a content delivery network service.',
    'CloudFront',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-fundamentals', 15),
    'What is AWS Lambda?',
    ['A database service', 'A serverless compute service', 'A storage service', 'A networking service'],
    'A serverless compute service',
    4
  )
];

// INTERMEDIATE QUESTIONS
export const awsIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 1),
    'What is Amazon EBS?',
    ['A database service', 'A block storage service for EC2 instances', 'A networking service', 'A compute service'],
    'A block storage service for EC2 instances',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 2),
    'What is Amazon ELB?',
    ['A database service', 'A load balancing service', 'A storage service', 'A compute service'],
    'A load balancing service',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-intermediate', 3),
    'AWS Auto Scaling can automatically adjust capacity based on demand',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 4),
    'What is Amazon CloudWatch?',
    ['A database service', 'A monitoring and observability service', 'A storage service', 'A compute service'],
    'A monitoring and observability service',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('aws-intermediate', 5),
    'Amazon ___ is a managed container orchestration service.',
    'EKS',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 6),
    'What is Amazon SNS?',
    ['A database service', 'A notification service', 'A storage service', 'A compute service'],
    'A notification service',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 7),
    'What is Amazon SQS?',
    ['A database service', 'A message queuing service', 'A storage service', 'A compute service'],
    'A message queuing service',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-intermediate', 8),
    'AWS provides both SQL and NoSQL database services',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 9),
    'What is Amazon DynamoDB?',
    ['A relational database', 'A NoSQL database service', 'A storage service', 'A compute service'],
    'A NoSQL database service',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 10),
    'What is AWS CloudFormation?',
    ['A database service', 'An infrastructure as code service', 'A storage service', 'A compute service'],
    'An infrastructure as code service',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-intermediate', 11),
    'AWS provides both managed and unmanaged database services',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 12),
    'What is Amazon Route 53?',
    ['A database service', 'A DNS web service', 'A storage service', 'A compute service'],
    'A DNS web service',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 13),
    'What is AWS Elastic Beanstalk?',
    ['A database service', 'A platform as a service for deploying applications', 'A storage service', 'A compute service'],
    'A platform as a service for deploying applications',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('aws-intermediate', 14),
    'Amazon ___ is a managed container service.',
    'ECS',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-intermediate', 15),
    'What is AWS API Gateway?',
    ['A database service', 'A service for creating and managing APIs', 'A storage service', 'A compute service'],
    'A service for creating and managing APIs',
    4
  )
];

// ADVANCED QUESTIONS
export const awsAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 1),
    'What is AWS KMS?',
    ['A database service', 'A key management service', 'A storage service', 'A compute service'],
    'A key management service',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 2),
    'What is AWS Secrets Manager?',
    ['A database service', 'A service for managing secrets', 'A storage service', 'A compute service'],
    'A service for managing secrets',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-advanced', 3),
    'AWS provides both public and private cloud services',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 4),
    'What is AWS WAF?',
    ['A database service', 'A web application firewall', 'A storage service', 'A compute service'],
    'A web application firewall',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('aws-advanced', 5),
    'AWS ___ is a service for building, training, and deploying machine learning models.',
    'SageMaker',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 6),
    'What is AWS Step Functions?',
    ['A database service', 'A service for orchestrating serverless workflows', 'A storage service', 'A compute service'],
    'A service for orchestrating serverless workflows',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 7),
    'What is AWS X-Ray?',
    ['A database service', 'A service for analyzing and debugging distributed applications', 'A storage service', 'A compute service'],
    'A service for analyzing and debugging distributed applications',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-advanced', 8),
    'AWS provides both managed and unmanaged Kubernetes services',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 9),
    'What is AWS Glue?',
    ['A database service', 'A service for data integration and ETL', 'A storage service', 'A compute service'],
    'A service for data integration and ETL',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 10),
    'What is AWS Redshift?',
    ['A NoSQL database', 'A data warehouse service', 'A storage service', 'A compute service'],
    'A data warehouse service',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-advanced', 11),
    'AWS provides both relational and non-relational database services',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 12),
    'What is AWS Kinesis?',
    ['A database service', 'A service for real-time data streaming', 'A storage service', 'A compute service'],
    'A service for real-time data streaming',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 13),
    'What is AWS CloudTrail?',
    ['A database service', 'A service for logging API calls', 'A storage service', 'A compute service'],
    'A service for logging API calls',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('aws-advanced', 14),
    'AWS ___ is a service for building conversational interfaces.',
    'Lex',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-advanced', 15),
    'What is AWS Config?',
    ['A database service', 'A service for monitoring resource configurations', 'A storage service', 'A compute service'],
    'A service for monitoring resource configurations',
    5
  )
];

// SECURITY & COMPLIANCE QUESTIONS
export const awsSecurityQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('aws-security', 1),
    'What is AWS Shield?',
    ['A database service', 'A DDoS protection service', 'A storage service', 'A compute service'],
    'A DDoS protection service',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-security', 2),
    'What is AWS GuardDuty?',
    ['A database service', 'A threat detection service', 'A storage service', 'A compute service'],
    'A threat detection service',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-security', 3),
    'AWS provides both encryption at rest and encryption in transit',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-security', 4),
    'What is AWS Certificate Manager?',
    ['A database service', 'A service for managing SSL/TLS certificates', 'A storage service', 'A compute service'],
    'A service for managing SSL/TLS certificates',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('aws-security', 5),
    'AWS ___ is a service for managing access to AWS services and resources.',
    'IAM',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-security', 6),
    'What is AWS Inspector?',
    ['A database service', 'A service for assessing application security', 'A storage service', 'A compute service'],
    'A service for assessing application security',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-security', 7),
    'What is AWS Macie?',
    ['A database service', 'A service for discovering and protecting sensitive data', 'A storage service', 'A compute service'],
    'A service for discovering and protecting sensitive data',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('aws-security', 8),
    'AWS provides both network-level and application-level security services',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-security', 9),
    'What is AWS Security Hub?',
    ['A database service', 'A service for centralizing security findings', 'A storage service', 'A compute service'],
    'A service for centralizing security findings',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('aws-security', 10),
    'What is AWS Artifact?',
    ['A database service', 'A service for accessing compliance reports', 'A storage service', 'A compute service'],
    'A service for accessing compliance reports',
    4
  )
];

// COMBINED EXPORT
export const awsQuestions: Question[] = [
  ...awsBeginnerQuestions,
  ...awsIntermediateQuestions,
  ...awsAdvancedQuestions,
  ...awsSecurityQuestions
];
