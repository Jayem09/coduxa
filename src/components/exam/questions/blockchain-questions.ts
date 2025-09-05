// Blockchain Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// BEGINNER QUESTIONS
export const blockchainBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-fundamentals', 1),
    'What is a blockchain?',
    ['A distributed ledger technology', 'A programming language', 'A database', 'A web framework'],
    'A distributed ledger technology',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('blockchain-fundamentals', 2),
    'Blockchain is a decentralized technology',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-fundamentals', 3),
    'What is a block in blockchain?',
    ['A programming language', 'A collection of transactions that are recorded together', 'A database', 'A web server'],
    'A collection of transactions that are recorded together',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('blockchain-fundamentals', 4),
    'Each block in a blockchain contains a ___ that links it to the previous block.',
    'hash',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-fundamentals', 5),
    'What is the purpose of consensus mechanisms in blockchain?',
    ['To store data', 'To agree on the validity of transactions', 'To create blocks', 'To mine cryptocurrency'],
    'To agree on the validity of transactions',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('blockchain-fundamentals', 6),
    'Blockchain transactions are immutable once recorded',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-fundamentals', 7),
    'What is Bitcoin?',
    ['A programming language', 'The first and most well-known cryptocurrency', 'A database', 'A web framework'],
    'The first and most well-known cryptocurrency',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-fundamentals', 8),
    'What is a cryptocurrency?',
    ['A programming language', 'A digital or virtual currency secured by cryptography', 'A database', 'A web server'],
    'A digital or virtual currency secured by cryptography',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('blockchain-fundamentals', 9),
    'Blockchain technology can be used beyond cryptocurrencies',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-fundamentals', 10),
    'What is a wallet in cryptocurrency?',
    ['A physical wallet', 'A software application that stores private and public keys', 'A database', 'A web server'],
    'A software application that stores private and public keys',
    4
  )
];

// INTERMEDIATE QUESTIONS
export const blockchainIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-intermediate', 1),
    'What is Proof of Work (PoW)?',
    ['A programming language', 'A consensus mechanism that requires computational work', 'A database', 'A web framework'],
    'A consensus mechanism that requires computational work',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-intermediate', 2),
    'What is Proof of Stake (PoS)?',
    ['A programming technique', 'A consensus mechanism based on the amount of cryptocurrency held', 'A database operation', 'A web development practice'],
    'A consensus mechanism based on the amount of cryptocurrency held',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('blockchain-intermediate', 3),
    'Smart contracts are self-executing contracts with terms directly written into code',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-intermediate', 4),
    'What is Ethereum?',
    ['A programming language', 'A blockchain platform that supports smart contracts', 'A database', 'A web server'],
    'A blockchain platform that supports smart contracts',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('blockchain-intermediate', 5),
    '___ is the native cryptocurrency of the Ethereum blockchain.',
    'Ether',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-intermediate', 6),
    'What is a fork in blockchain?',
    ['A programming concept', 'A split in the blockchain network', 'A database operation', 'A web development practice'],
    'A split in the blockchain network',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-intermediate', 7),
    'What is a hard fork?',
    ['A programming technique', 'A permanent divergence from the previous version of the blockchain', 'A database operation', 'A web development practice'],
    'A permanent divergence from the previous version of the blockchain',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('blockchain-intermediate', 8),
    'Blockchain can be used for supply chain management',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-intermediate', 9),
    'What is a private key in blockchain?',
    ['A public identifier', 'A secret key used to sign transactions', 'A database key', 'A web server key'],
    'A secret key used to sign transactions',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-intermediate', 10),
    'What is a public key in blockchain?',
    ['A secret key', 'A key that can be shared publicly and is used to receive transactions', 'A database key', 'A web server key'],
    'A key that can be shared publicly and is used to receive transactions',
    4
  )
];

// ADVANCED QUESTIONS
export const blockchainAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-advanced', 1),
    'What is a sidechain?',
    ['A programming concept', 'A separate blockchain that runs parallel to the main blockchain', 'A database', 'A web server'],
    'A separate blockchain that runs parallel to the main blockchain',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-advanced', 2),
    'What is sharding in blockchain?',
    ['A programming technique', 'A method of splitting the blockchain into smaller, manageable pieces', 'A database operation', 'A web development practice'],
    'A method of splitting the blockchain into smaller, manageable pieces',
    6
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('blockchain-advanced', 3),
    'Blockchain can be used for identity verification and management',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-advanced', 4),
    'What is a zero-knowledge proof?',
    ['A programming concept', 'A method of proving knowledge without revealing the information itself', 'A database operation', 'A web development practice'],
    'A method of proving knowledge without revealing the information itself',
    6
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('blockchain-advanced', 5),
    '___ is a blockchain scaling solution that processes transactions off the main chain.',
    'Layer 2',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-advanced', 6),
    'What is a non-fungible token (NFT)?',
    ['A programming language', 'A unique digital asset that cannot be replaced', 'A database', 'A web server'],
    'A unique digital asset that cannot be replaced',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-advanced', 7),
    'What is DeFi (Decentralized Finance)?',
    ['A programming language', 'Financial services built on blockchain technology', 'A database', 'A web server'],
    'Financial services built on blockchain technology',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('blockchain-advanced', 8),
    'Blockchain can be used for voting systems',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-advanced', 9),
    'What is a cross-chain bridge?',
    ['A programming concept', 'A connection that allows assets to move between different blockchains', 'A database operation', 'A web development practice'],
    'A connection that allows assets to move between different blockchains',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('blockchain-advanced', 10),
    'What is a DAO (Decentralized Autonomous Organization)?',
    ['A programming language', 'An organization governed by smart contracts and token holders', 'A database', 'A web server'],
    'An organization governed by smart contracts and token holders',
    5
  )
];

// CRYPTOCURRENCY QUESTIONS
export const cryptocurrencyQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('cryptocurrency-fundamentals', 1),
    'What is the total supply limit of Bitcoin?',
    ['10 million', '21 million', '50 million', '100 million'],
    '21 million',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('cryptocurrency-fundamentals', 2),
    'What is the smallest unit of Bitcoin?',
    ['Bit', 'Satoshi', 'Byte', 'Coin'],
    'Satoshi',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('cryptocurrency-fundamentals', 3),
    'Cryptocurrencies can be used for peer-to-peer transactions without intermediaries',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('cryptocurrency-fundamentals', 4),
    'What is a stablecoin?',
    ['A volatile cryptocurrency', 'A cryptocurrency designed to maintain a stable value', 'A programming language', 'A database'],
    'A cryptocurrency designed to maintain a stable value',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('cryptocurrency-fundamentals', 5),
    '___ is the process of earning rewards by holding and staking cryptocurrency.',
    'Staking',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('cryptocurrency-fundamentals', 6),
    'What is a cryptocurrency exchange?',
    ['A programming language', 'A platform where cryptocurrencies can be bought and sold', 'A database', 'A web server'],
    'A platform where cryptocurrencies can be bought and sold',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('cryptocurrency-fundamentals', 7),
    'What is market capitalization in cryptocurrency?',
    ['A programming concept', 'The total value of all coins in circulation', 'A database operation', 'A web development practice'],
    'The total value of all coins in circulation',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('cryptocurrency-fundamentals', 8),
    'Cryptocurrencies are regulated differently in various countries',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('cryptocurrency-fundamentals', 9),
    'What is a cryptocurrency wallet address?',
    ['A programming concept', 'A unique identifier for receiving cryptocurrency', 'A database key', 'A web server key'],
    'A unique identifier for receiving cryptocurrency',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('cryptocurrency-fundamentals', 10),
    'What is a cryptocurrency token?',
    ['A programming language', 'A digital asset that represents ownership or access rights', 'A database', 'A web server'],
    'A digital asset that represents ownership or access rights',
    4
  )
];

// COMBINED EXPORT
export const blockchainQuestions: Question[] = [
  ...blockchainBeginnerQuestions,
  ...blockchainIntermediateQuestions,
  ...blockchainAdvancedQuestions,
  ...cryptocurrencyQuestions
];
