// Example: How to use the new question system
import { javascriptQuestions } from './javascript-questions';
import { reactQuestions } from './react-questions';
import { pythonQuestions } from './python-questions';
import { isExamPassed, calculateExamScore, getPassingThreshold } from '../../../utils/examUtils';
import type { ExamSession } from '../ExamInterface';

// Example: How to get questions for a specific exam
export const getExamQuestions = (examId: string) => {
  switch (examId) {
    case 'js-fundamentals':
      return javascriptQuestions;
    case 'react-intermediate':
      return reactQuestions;
    case 'python-fundamentals':
      return pythonQuestions;
    default:
      return [];
  }
};

// Example: How to add a new question to JavaScript exam
export const addNewJavaScriptQuestion = () => {
  // This would go in javascript-questions.ts
  const newQuestion = {
    id: 'js-fundamentals-q19',
    type: 'multiple-choice' as const,
    title: 'What is the result of typeof undefined in JavaScript?',
    description: 'Choose the correct answer.',
    points: 4,
    difficulty: 'easy' as const,
    category: 'JavaScript',
    tags: ['typeof', 'undefined'],
    options: ['"undefined"', '"null"', '"object"', 'undefined'],
    correctAnswer: '"undefined"'
  };
  
  return newQuestion;
};

// Example: How to create a custom question
export const createCustomQuestion = () => {
  // Using the template system
  const customQuestion = {
    id: 'custom-q01',
    type: 'coding' as const,
    title: 'Write a function to calculate factorial',
    description: 'Create a recursive function to calculate factorial of a number.',
    points: 15,
    difficulty: 'medium' as const,
    category: 'JavaScript',
    tags: ['recursion', 'algorithms', 'functions'],
    codeTemplate: 'function factorial(n) {\n  // Your code here\n}',
    testCases: [
      { input: '5', expectedOutput: '120', description: 'Factorial of 5' },
      { input: '0', expectedOutput: '1', description: 'Factorial of 0' }
    ]
  };
  
  return customQuestion;
};

// Example: How to check if an exam is passed with 70% threshold
export const checkExamPassing = (examSession: ExamSession) => {
  // Method 1: Simple pass/fail check
  const passed = isExamPassed(examSession);
  console.log(`Exam passed: ${passed}`);
  
  // Method 2: Get detailed score information
  const score = calculateExamScore(examSession);
  console.log(`Score: ${score.earnedPoints}/${score.totalPoints} (${score.percentage.toFixed(1)}%)`);
  console.log(`Grade: ${score.grade}`);
  console.log(`Passed: ${score.passed}`);
  
  // Method 3: Get passing threshold
  const threshold = getPassingThreshold();
  console.log(`Passing threshold: ${threshold}%`);
  
  return {
    passed,
    score,
    threshold
  };
};

// Example: How to use in a component
export const ExamScoringExample = () => {
  // This would be used in a React component
  const handleSubmitExam = (examSession: ExamSession) => {
    const result = checkExamPassing(examSession);
    
    if (result.passed) {
      console.log('Congratulations! You passed the exam!');
    } else {
      console.log(`You need ${result.threshold}% to pass. Keep studying!`);
    }
    
    return result;
  };
  
  return { handleSubmitExam };
};
