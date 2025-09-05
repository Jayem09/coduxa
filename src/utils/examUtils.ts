// src/utils/examUtils.ts
import { examResultsService, type ExamScore, type ExamSession } from '../services/examResultsService';

/**
 * Check if an exam is passed with 70% correct answers
 * @param examSession - The exam session with questions and answers
 * @returns True if passed (70% or higher), false otherwise
 */
export const isExamPassed = (examSession: ExamSession): boolean => {
  return examResultsService.isExamPassed(examSession);
};

/**
 * Calculate exam score with 70% passing threshold
 * @param examSession - The exam session with questions and answers
 * @returns ExamScore object with detailed scoring information
 */
export const calculateExamScore = (examSession: ExamSession): ExamScore => {
  return examResultsService.calculateExamScore(examSession);
};

/**
 * Get the current passing threshold (70%)
 * @returns The passing threshold percentage
 */
export const getPassingThreshold = (): number => {
  return examResultsService.getPassingThreshold();
};

/**
 * Check if a percentage score passes the exam
 * @param percentage - The percentage score
 * @returns True if passed (70% or higher), false otherwise
 */
export const isScorePassing = (percentage: number): boolean => {
  return percentage >= getPassingThreshold();
};

/**
 * Format score as a percentage string
 * @param earnedPoints - Points earned
 * @param totalPoints - Total possible points
 * @returns Formatted percentage string
 */
export const formatScorePercentage = (earnedPoints: number, totalPoints: number): string => {
  if (totalPoints === 0) return '0%';
  const percentage = (earnedPoints / totalPoints) * 100;
  return `${percentage.toFixed(1)}%`;
};

/**
 * Get grade color class based on grade
 * @param grade - Letter grade (A+ to F)
 * @returns CSS class string for styling
 */
export const getGradeColor = (grade: string): string => {
  if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
  if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
  if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
  if (grade.startsWith('D')) return 'text-orange-600 bg-orange-100';
  return 'text-red-600 bg-red-100';
};

/**
 * Get performance message based on score
 * @param percentage - The percentage score
 * @returns Performance message
 */
export const getPerformanceMessage = (percentage: number): string => {
  if (percentage >= 90) return 'Excellent work!';
  if (percentage >= 80) return 'Great job!';
  if (percentage >= 70) return 'Good work!';
  if (percentage >= 60) return 'Keep practicing!';
  return 'Don\'t give up!';
};

/**
 * Calculate exam statistics from questions array
 * @param questions - Array of questions
 * @returns Object with total questions and total points
 */
export const calculateExamStatistics = (questions: any[]): { questions: number; points: number } => {
  const totalQuestions = questions.length;
  const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);
  
  return {
    questions: totalQuestions,
    points: totalPoints
  };
};

/**
 * Format exam statistics for display
 * @param questions - Number of questions
 * @param points - Total points
 * @returns Formatted string
 */
export const formatExamStats = (questions: number, points: number): string => {
  return `${questions} questions • ${points} points`;
};
