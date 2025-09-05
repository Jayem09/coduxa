// Question Manager - Better way to organize and add questions
import type { Question } from '../ExamInterface';

// Question templates for easy creation
export const questionTemplates = {
  multipleChoice: (id: string, title: string, options: string[], correctAnswer: string, points: number = 5) => ({
    id,
    type: 'multiple-choice' as const,
    title,
    description: 'Choose the correct answer.',
    points,
    difficulty: 'medium' as const,
    category: 'General',
    tags: ['multiple-choice'],
    options,
    correctAnswer
  }),

  trueFalse: (id: string, title: string, correctAnswer: boolean, points: number = 3) => ({
    id,
    type: 'true-false' as const,
    title,
    description: 'Is this statement true or false?',
    points,
    difficulty: 'easy' as const,
    category: 'General',
    tags: ['true-false'],
    correctAnswer: correctAnswer.toString()
  }),

  fillBlank: (id: string, title: string, correctAnswer: string, points: number = 4) => ({
    id,
    type: 'fill-blank' as const,
    title,
    description: 'Fill in the blank.',
    points,
    difficulty: 'easy' as const,
    category: 'General',
    tags: ['fill-blank'],
    correctAnswer
  }),

  coding: (id: string, title: string, codeTemplate: string, testCases: any[], points: number = 10) => ({
    id,
    type: 'coding' as const,
    title,
    description: 'Write the code to solve this problem.',
    points,
    difficulty: 'medium' as const,
    category: 'General',
    tags: ['coding'],
    codeTemplate,
    testCases
  })
};

// Helper function to create questions with proper IDs
export const createQuestion = (baseId: string, questionData: Partial<Question>): Question => {
  return {
    id: baseId,
    type: 'multiple-choice',
    title: 'Untitled Question',
    description: 'No description provided',
    points: 5,
    difficulty: 'easy',
    category: 'General',
    tags: [],
    options: [],
    correctAnswer: '',
    ...questionData
  } as Question;
};

// Helper function to generate sequential IDs
export const generateQuestionId = (examId: string, questionNumber: number): string => {
  return `${examId}-q${questionNumber.toString().padStart(2, '0')}`;
};

// Helper function to add questions to an exam
export const addQuestionsToExam = (examId: string, questions: Question[]): Question[] => {
  return questions.map((question, index) => ({
    ...question,
    id: generateQuestionId(examId, index + 1)
  }));
};

// Validation function
export const validateQuestion = (question: Question): string[] => {
  const errors: string[] = [];
  
  if (!question.id) errors.push('Question ID is required');
  if (!question.title) errors.push('Question title is required');
  if (!question.type) errors.push('Question type is required');
  if (question.points <= 0) errors.push('Points must be greater than 0');
  if (!question.difficulty) errors.push('Difficulty level is required');
  if (!question.category) errors.push('Category is required');
  
  if (question.type === 'multiple-choice') {
    if (!question.options || question.options.length < 2) {
      errors.push('Multiple choice questions need at least 2 options');
    }
    if (!question.correctAnswer) {
      errors.push('Correct answer is required for multiple choice questions');
    }
  }
  
  if (question.type === 'coding') {
    if (!question.codeTemplate) {
      errors.push('Code template is required for coding questions');
    }
    if (!question.testCases || question.testCases.length === 0) {
      errors.push('At least one test case is required for coding questions');
    }
  }
  
  return errors;
};

// Note: Individual question files should be imported directly where needed
// to avoid circular dependencies. This file only provides utilities and templates.
