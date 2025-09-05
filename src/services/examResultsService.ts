// src/services/examResultsService.ts
import { supabase } from '../components/lib/supabaseClient';
import type { Question } from '../components/exam/ExamInterface';

export interface ExamResult {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  startTime: Date;
  endTime: Date;
  timeSpent: number; // in minutes
  score: number;
  maxScore: number;
  passed: boolean;
  answers: Record<string, any>;
  questions: any[];
  certificateId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
}

export interface ExamScore {
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  passed: boolean;
  grade: string;
}

export interface ExamSession {
  questions: Question[];
  answers: Record<string, any>;
  score?: number;
  startTime: Date;
  endTime?: Date;
  isSubmitted: boolean;
  flaggedQuestions: Set<string>;
  currentQuestionIndex: number;
}

class ExamResultsService {
  // Default passing threshold (70%)
  private readonly DEFAULT_PASSING_THRESHOLD = 70;

  /**
   * Calculate exam score and determine if passed
   * @param examSession - The exam session with questions and answers
   * @param passingThreshold - Optional custom passing threshold (default: 70%)
   * @returns ExamScore object with detailed scoring information
   */
  calculateExamScore(examSession: ExamSession, passingThreshold: number = this.DEFAULT_PASSING_THRESHOLD): ExamScore {
    const totalPoints = examSession.questions.reduce((sum, question) => sum + question.points, 0);
    const earnedPoints = this.calculateEarnedPoints(examSession);
    const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = percentage >= passingThreshold;
    const grade = this.calculateGrade(percentage);

    return {
      totalPoints,
      earnedPoints,
      percentage,
      passed,
      grade
    };
  }

  /**
   * Calculate earned points based on correct answers
   * @param examSession - The exam session with questions and answers
   * @returns Total earned points
   */
  private calculateEarnedPoints(examSession: ExamSession): number {
    let earnedPoints = 0;
    
    examSession.questions.forEach(question => {
      const answer = examSession.answers[question.id];
      if (this.isAnswerCorrect(question, answer)) {
        earnedPoints += question.points;
      }
    });

    return earnedPoints;
  }

  /**
   * Check if an answer is correct for a given question
   * @param question - The question object
   * @param answer - The user's answer
   * @returns True if answer is correct, false otherwise
   */
  private isAnswerCorrect(question: Question, answer: any): boolean {
    if (answer === undefined || answer === null) return false;

    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
        return answer === question.correctAnswer;
      
      case 'fill-blank':
        const correctAnswer = (question.correctAnswer as string).toLowerCase().trim();
        const userAnswer = (answer as string).toLowerCase().trim();
        return userAnswer === correctAnswer;
      
      case 'coding':
        // For coding questions, this is a simplified check
        // In a real implementation, you would run test cases
        return question.testCases?.every(() => {
          // Placeholder - in reality, you'd execute the code and check results
          return true;
        }) || false;
      
      default:
        return false;
    }
  }

  /**
   * Calculate letter grade based on percentage
   * @param percentage - The percentage score
   * @returns Letter grade (A+ to F)
   */
  private calculateGrade(percentage: number): string {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  }

  /**
   * Check if exam is passed with 70% threshold
   * @param examSession - The exam session with questions and answers
   * @returns True if passed (70% or higher), false otherwise
   */
  isExamPassed(examSession: ExamSession): boolean {
    const score = this.calculateExamScore(examSession);
    return score.passed;
  }

  /**
   * Get passing threshold for exams
   * @returns The current passing threshold percentage
   */
  getPassingThreshold(): number {
    return this.DEFAULT_PASSING_THRESHOLD;
  }

  /**
   * Set custom passing threshold (for admin purposes)
   * @param threshold - New passing threshold percentage
   */
  setPassingThreshold(threshold: number): void {
    if (threshold < 0 || threshold > 100) {
      throw new Error('Passing threshold must be between 0 and 100');
    }
    (this as any).DEFAULT_PASSING_THRESHOLD = threshold;
  }

  // Save exam result to database
  async saveExamResult(result: Omit<ExamResult, 'id' | 'createdAt' | 'updatedAt'>): Promise<ExamResult> {
    try {
      const { data, error } = await supabase
        .from('exam_results')
        .insert({
          user_id: result.userId,
          exam_id: result.examId,
          exam_title: result.examTitle,
          start_time: result.startTime.toISOString(),
          end_time: result.endTime.toISOString(),
          time_spent: result.timeSpent,
          score: result.score,
          max_score: result.maxScore,
          passed: result.passed,
          answers: result.answers,
          questions: result.questions,
          certificate_id: result.certificateId
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        userId: data.user_id,
        examId: data.exam_id,
        examTitle: data.exam_title,
        startTime: new Date(data.start_time),
        endTime: new Date(data.end_time),
        timeSpent: data.time_spent,
        score: data.score,
        maxScore: data.max_score,
        passed: data.passed,
        answers: data.answers,
        questions: data.questions,
        certificateId: data.certificate_id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };
    } catch (error) {
      console.error('Error saving exam result:', error);
      throw error;
    }
  }

  // Get exam results for a user
  async getUserExamResults(userId: string): Promise<ExamResult[]> {
    try {
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(result => ({
        id: result.id,
        userId: result.user_id,
        examId: result.exam_id,
        examTitle: result.exam_title,
        startTime: new Date(result.start_time),
        endTime: new Date(result.end_time),
        timeSpent: result.time_spent,
        score: result.score,
        maxScore: result.max_score,
        passed: result.passed,
        answers: result.answers,
        questions: result.questions,
        certificateId: result.certificate_id,
        createdAt: new Date(result.created_at),
        updatedAt: new Date(result.updated_at)
      }));
    } catch (error) {
      console.error('Error fetching exam results:', error);
      throw error;
    }
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        email: data.email,
        fullName: data.full_name || data.email.split('@')[0],
        avatar: data.avatar_url
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Generate certificate ID
  generateCertificateId(examId: string, userId: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `CERT-${examId.toUpperCase()}-${userId.slice(-4)}-${timestamp}-${random}`.toUpperCase();
  }

  // Update exam result with certificate ID
  async updateExamResultWithCertificate(examResultId: string, certificateId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('exam_results')
        .update({ certificate_id: certificateId })
        .eq('id', examResultId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating exam result with certificate:', error);
      throw error;
    }
  }

  // Get exam result by ID
  async getExamResultById(examResultId: string): Promise<ExamResult | null> {
    try {
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('id', examResultId)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        userId: data.user_id,
        examId: data.exam_id,
        examTitle: data.exam_title,
        startTime: new Date(data.start_time),
        endTime: new Date(data.end_time),
        timeSpent: data.time_spent,
        score: data.score,
        maxScore: data.max_score,
        passed: data.passed,
        answers: data.answers,
        questions: data.questions,
        certificateId: data.certificate_id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };
    } catch (error) {
      console.error('Error fetching exam result:', error);
      return null;
    }
  }
}

export const examResultsService = new ExamResultsService();
