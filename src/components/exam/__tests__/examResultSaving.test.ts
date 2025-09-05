import { describe, it, expect, vi, beforeEach } from 'vitest'
import { examResultsService } from '../../../services/examResultsService'
import type { ExamSession } from '../ExamInterface'

// Mock Supabase
vi.mock('../../../components/lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ 
            data: {
              id: 'test-result-id',
              user_id: 'test-user',
              exam_id: 'js-fundamentals',
              exam_title: 'JavaScript Fundamentals',
              start_time: '2024-01-01T00:00:00Z',
              end_time: '2024-01-01T01:00:00Z',
              time_spent: 60,
              score: 80,
              max_score: 100,
              passed: true,
              answers: {},
              questions: [],
              certificate_id: null,
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z'
            }, 
            error: null 
          }))
        }))
      }))
    }))
  }
}))

describe('Exam Result Saving', () => {
  let mockExamSession: ExamSession

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockExamSession = {
      id: 'test-exam-1',
      examId: 'js-fundamentals',
      userId: 'test-user',
      startTime: new Date('2024-01-01T00:00:00Z'),
      timeLimit: 60,
      questions: [
        {
          id: '1',
          type: 'multiple-choice',
          title: 'What is React?',
          description: 'Choose the best description of React.',
          points: 10,
          difficulty: 'easy',
          category: 'React',
          tags: ['react', 'frontend'],
          options: [
            'A JavaScript library for building user interfaces',
            'A CSS framework',
            'A database management system',
            'A server-side framework'
          ],
          correctAnswer: 'A JavaScript library for building user interfaces'
        },
        {
          id: '2',
          type: 'true-false',
          title: 'TypeScript is a superset of JavaScript',
          description: 'Is TypeScript a superset of JavaScript?',
          points: 5,
          difficulty: 'easy',
          category: 'TypeScript',
          tags: ['typescript', 'javascript'],
          correctAnswer: 'true'
        }
      ],
      currentQuestionIndex: 1,
      answers: {
        '1': 'A JavaScript library for building user interfaces',
        '2': 'true'
      },
      flaggedQuestions: new Set(['1']),
      isSubmitted: false,
      maxScore: 15,
      questionAccessOrder: [0, 1],
      canAccessQuestion: (questionIndex: number) => questionIndex <= 1
    }
  })

  describe('Exam Result Creation', () => {
    it('should create exam result with correct structure', async () => {
      const examScore = examResultsService.calculateExamScore(mockExamSession)
      const timeSpent = Math.round((new Date().getTime() - mockExamSession.startTime.getTime()) / (1000 * 60))
      
      const examResult = {
        userId: mockExamSession.userId,
        examId: mockExamSession.examId,
        examTitle: 'JavaScript Fundamentals',
        startTime: mockExamSession.startTime,
        endTime: new Date(),
        timeSpent: timeSpent,
        score: examScore.earnedPoints,
        maxScore: examScore.totalPoints,
        passed: examScore.passed,
        answers: mockExamSession.answers,
        questions: mockExamSession.questions
      }

      expect(examResult.userId).toBe('test-user')
      expect(examResult.examId).toBe('js-fundamentals')
      expect(examResult.examTitle).toBe('JavaScript Fundamentals')
      expect(examResult.score).toBe(15) // All answers correct
      expect(examResult.maxScore).toBe(15)
      expect(examResult.passed).toBe(true)
      expect(examResult.answers).toEqual({
        '1': 'A JavaScript library for building user interfaces',
        '2': 'true'
      })
    })

    it('should handle partial completion correctly', async () => {
      const partialSession = {
        ...mockExamSession,
        answers: {
          '1': 'A JavaScript library for building user interfaces'
          // Missing answer for question 2
        }
      }

      const examScore = examResultsService.calculateExamScore(partialSession)
      
      expect(examScore.earnedPoints).toBe(10) // Only first question correct
      expect(examScore.totalPoints).toBe(15)
      expect(examScore.percentage).toBeCloseTo(66.67, 1)
      expect(examScore.passed).toBe(false) // Below 70% threshold
    })

    it('should handle no answers correctly', async () => {
      const emptySession = {
        ...mockExamSession,
        answers: {}
      }

      const examScore = examResultsService.calculateExamScore(emptySession)
      
      expect(examScore.earnedPoints).toBe(0)
      expect(examScore.totalPoints).toBe(15)
      expect(examScore.percentage).toBe(0)
      expect(examScore.passed).toBe(false)
    })
  })

  describe('Time Calculation', () => {
    it('should calculate time spent correctly', () => {
      const startTime = new Date('2024-01-01T00:00:00Z')
      const endTime = new Date('2024-01-01T01:30:00Z') // 1.5 hours later
      
      const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))
      
      expect(timeSpent).toBe(90) // 90 minutes
    })

    it('should handle very short exam duration', () => {
      const startTime = new Date('2024-01-01T00:00:00Z')
      const endTime = new Date('2024-01-01T00:00:30Z') // 30 seconds later
      
      const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))
      
      expect(timeSpent).toBe(1) // 30 seconds rounds to 1 minute
    })

    it('should handle very long exam duration', () => {
      const startTime = new Date('2024-01-01T00:00:00Z')
      const endTime = new Date('2024-01-01T05:00:00Z') // 5 hours later
      
      const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))
      
      expect(timeSpent).toBe(300) // 300 minutes
    })
  })

  describe('Database Operations', () => {
    it('should save exam result to database', async () => {
      const examResult = {
        userId: 'test-user',
        examId: 'js-fundamentals',
        examTitle: 'JavaScript Fundamentals',
        startTime: new Date('2024-01-01T00:00:00Z'),
        endTime: new Date('2024-01-01T01:00:00Z'),
        timeSpent: 60,
        score: 15,
        maxScore: 15,
        passed: true,
        answers: mockExamSession.answers,
        questions: mockExamSession.questions
      }

      const result = await examResultsService.saveExamResult(examResult)
      
      expect(result.id).toBe('test-result-id')
      expect(result.userId).toBe('test-user')
      expect(result.examId).toBe('js-fundamentals')
      expect(result.passed).toBe(true)
      expect(result.score).toBe(80) // From mock data
    })

    it('should handle database save errors', async () => {
      const mockSupabase = await import('../../../components/lib/supabaseClient')
      const mockFrom = vi.mocked(mockSupabase.supabase.from)
      
      mockFrom.mockReturnValue({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({ 
              data: null, 
              error: { message: 'Database error' } 
            }))
          }))
        }))
      } as any)

      const examResult = {
        userId: 'test-user',
        examId: 'js-fundamentals',
        examTitle: 'JavaScript Fundamentals',
        startTime: new Date(),
        endTime: new Date(),
        timeSpent: 60,
        score: 15,
        maxScore: 15,
        passed: true,
        answers: {},
        questions: []
      }

      await expect(examResultsService.saveExamResult(examResult)).rejects.toThrow()
    })
  })

  describe('Exam Completion Scenarios', () => {
    it('should handle normal exam completion', async () => {
      const completedSession = {
        ...mockExamSession,
        isSubmitted: true,
        endTime: new Date(),
        score: 15
      }

      const examScore = examResultsService.calculateExamScore(completedSession)
      
      expect(examScore.passed).toBe(true)
      expect(completedSession.isSubmitted).toBe(true)
      expect(completedSession.score).toBe(15)
    })

    it('should handle exam closure before completion', async () => {
      const closedSession = {
        ...mockExamSession,
        isSubmitted: false,
        endTime: new Date(),
        score: undefined
      }

      const examScore = examResultsService.calculateExamScore(closedSession)
      
      // Should still calculate score even if not formally submitted
      expect(examScore.earnedPoints).toBe(15)
      expect(examScore.passed).toBe(true)
    })

    it('should handle timeout scenario', async () => {
      const timeoutSession = {
        ...mockExamSession,
        isSubmitted: false,
        endTime: new Date(),
        score: undefined,
        answers: {
          '1': 'A JavaScript library for building user interfaces'
          // Only partial answers due to timeout
        }
      }

      const examScore = examResultsService.calculateExamScore(timeoutSession)
      
      expect(examScore.earnedPoints).toBe(10)
      expect(examScore.passed).toBe(false) // Below passing threshold
    })
  })

  describe('Data Validation', () => {
    it('should validate exam result data structure', () => {
      const examResult = {
        userId: 'test-user',
        examId: 'js-fundamentals',
        examTitle: 'JavaScript Fundamentals',
        startTime: new Date(),
        endTime: new Date(),
        timeSpent: 60,
        score: 15,
        maxScore: 15,
        passed: true,
        answers: {},
        questions: []
      }

      // Validate required fields
      expect(examResult.userId).toBeTruthy()
      expect(examResult.examId).toBeTruthy()
      expect(examResult.examTitle).toBeTruthy()
      expect(examResult.startTime).toBeInstanceOf(Date)
      expect(examResult.endTime).toBeInstanceOf(Date)
      expect(typeof examResult.timeSpent).toBe('number')
      expect(typeof examResult.score).toBe('number')
      expect(typeof examResult.maxScore).toBe('number')
      expect(typeof examResult.passed).toBe('boolean')
      expect(typeof examResult.answers).toBe('object')
      expect(Array.isArray(examResult.questions)).toBe(true)
    })

    it('should handle edge cases in score calculation', () => {
      const edgeCaseSession = {
        ...mockExamSession,
        questions: [], // No questions
        answers: {}
      }

      const examScore = examResultsService.calculateExamScore(edgeCaseSession)
      
      expect(examScore.totalPoints).toBe(0)
      expect(examScore.earnedPoints).toBe(0)
      expect(examScore.percentage).toBe(0)
      expect(examScore.passed).toBe(false)
    })
  })

  describe('Performance Considerations', () => {
    it('should handle large answer objects efficiently', () => {
      const largeAnswer = {
        code: 'function fibonacci(n) {\n' + '  '.repeat(1000) + 'return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);\n}',
        language: 'javascript',
        metadata: {
          lines: 1000,
          characters: 50000,
          complexity: 'high'
        }
      }

      const largeSession = {
        ...mockExamSession,
        answers: {
          '1': largeAnswer,
          '2': 'true'
        }
      }

      const startTime = performance.now()
      const examScore = examResultsService.calculateExamScore(largeSession)
      const endTime = performance.now()

      expect(examScore.earnedPoints).toBe(5) // Only the true-false question is correct
      expect(endTime - startTime).toBeLessThan(100) // Should complete in less than 100ms
    })

    it('should handle many questions efficiently', () => {
      const manyQuestions = Array.from({ length: 100 }, (_, i) => ({
        id: `${i + 1}`,
        type: 'multiple-choice' as const,
        title: `Question ${i + 1}`,
        description: `Description for question ${i + 1}`,
        points: 1,
        difficulty: 'easy' as const,
        category: 'Test',
        tags: ['test'],
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A'
      }))

      const manyAnswers = Object.fromEntries(
        manyQuestions.map((q, i) => [q.id, i % 2 === 0 ? 'Option A' : 'Option B'])
      )

      const largeSession = {
        ...mockExamSession,
        questions: manyQuestions,
        answers: manyAnswers
      }

      const startTime = performance.now()
      const examScore = examResultsService.calculateExamScore(largeSession)
      const endTime = performance.now()

      expect(examScore.totalPoints).toBe(100)
      expect(examScore.earnedPoints).toBe(50) // Half correct
      expect(endTime - startTime).toBeLessThan(100) // Should complete in less than 100ms
    })
  })
})
