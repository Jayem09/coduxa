import { describe, it, expect, vi, beforeEach } from 'vitest'
import { examResultsService, type ExamSession, type ExamScore } from '../examResultsService'
import type { Question } from '../../components/exam/ExamInterface'

// Mock Supabase
vi.mock('../../components/lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ 
            data: {
              id: 'test-result-id',
              user_id: 'test-user',
              exam_id: 'test-exam',
              exam_title: 'Test Exam',
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
      })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ 
            data: [{
              id: 'test-result-id',
              user_id: 'test-user',
              exam_id: 'test-exam',
              exam_title: 'Test Exam',
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
            }], 
            error: null 
          }))
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null }))
      }))
    }))
  }
}))

describe('ExamResultsService', () => {
  let mockExamSession: ExamSession
  let mockQuestions: Question[]

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockQuestions = [
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
      },
      {
        id: '3',
        type: 'fill-blank',
        title: 'Complete the sentence',
        description: 'The DOM stands for Document _____ Model.',
        points: 5,
        difficulty: 'easy',
        category: 'Web Development',
        tags: ['dom', 'web'],
        correctAnswer: 'Object'
      }
    ]

    mockExamSession = {
      questions: mockQuestions,
      answers: {
        '1': 'A JavaScript library for building user interfaces',
        '2': 'true',
        '3': 'Object'
      },
      score: undefined,
      startTime: new Date('2024-01-01T00:00:00Z'),
      endTime: undefined,
      isSubmitted: false,
      flaggedQuestions: new Set(['1']),
      currentQuestionIndex: 0
    }
  })

  describe('calculateExamScore', () => {
    it('should calculate correct score for all correct answers', () => {
      const result = examResultsService.calculateExamScore(mockExamSession)
      
      expect(result.totalPoints).toBe(20)
      expect(result.earnedPoints).toBe(20)
      expect(result.percentage).toBe(100)
      expect(result.passed).toBe(true)
      expect(result.grade).toBe('A+')
    })

    it('should calculate correct score for partial answers', () => {
      const partialSession = {
        ...mockExamSession,
        answers: {
          '1': 'A JavaScript library for building user interfaces',
          '2': 'false', // Wrong answer
          '3': 'Object'
        }
      }

      const result = examResultsService.calculateExamScore(partialSession)
      
      expect(result.totalPoints).toBe(20)
      expect(result.earnedPoints).toBe(15) // 10 + 0 + 5
      expect(result.percentage).toBe(75)
      expect(result.passed).toBe(true)
      expect(result.grade).toBe('C')
    })

    it('should calculate correct score for no answers', () => {
      const emptySession = {
        ...mockExamSession,
        answers: {}
      }

      const result = examResultsService.calculateExamScore(emptySession)
      
      expect(result.totalPoints).toBe(20)
      expect(result.earnedPoints).toBe(0)
      expect(result.percentage).toBe(0)
      expect(result.passed).toBe(false)
      expect(result.grade).toBe('F')
    })

    it('should use custom passing threshold', () => {
      const partialSession = {
        ...mockExamSession,
        answers: {
          '1': 'A JavaScript library for building user interfaces',
          '2': 'false', // Wrong answer
          '3': 'Object'
        }
      }

      const result = examResultsService.calculateExamScore(partialSession, 80)
      
      expect(result.percentage).toBe(75)
      expect(result.passed).toBe(false) // 75% < 80%
    })

    it('should handle case-insensitive fill-blank answers', () => {
      const fillBlankSession = {
        ...mockExamSession,
        answers: {
          '3': 'object' // lowercase
        }
      }

      const result = examResultsService.calculateExamScore(fillBlankSession)
      
      expect(result.earnedPoints).toBe(5)
    })

    it('should trim whitespace in fill-blank answers', () => {
      const fillBlankSession = {
        ...mockExamSession,
        answers: {
          '3': '  Object  ' // with whitespace
        }
      }

      const result = examResultsService.calculateExamScore(fillBlankSession)
      
      expect(result.earnedPoints).toBe(5)
    })
  })

  describe('isExamPassed', () => {
    it('should return true for passing score', () => {
      const result = examResultsService.isExamPassed(mockExamSession)
      expect(result).toBe(true)
    })

    it('should return false for failing score', () => {
      const failingSession = {
        ...mockExamSession,
        answers: {
          '1': 'Wrong answer'
        }
      }

      const result = examResultsService.isExamPassed(failingSession)
      expect(result).toBe(false)
    })
  })

  describe('getPassingThreshold', () => {
    it('should return default passing threshold', () => {
      const threshold = examResultsService.getPassingThreshold()
      expect(threshold).toBe(70)
    })
  })

  describe('setPassingThreshold', () => {
    it('should set new passing threshold', () => {
      examResultsService.setPassingThreshold(80)
      const threshold = examResultsService.getPassingThreshold()
      expect(threshold).toBe(80)
    })

    it('should throw error for invalid threshold', () => {
      expect(() => examResultsService.setPassingThreshold(-1)).toThrow()
      expect(() => examResultsService.setPassingThreshold(101)).toThrow()
    })
  })

  describe('saveExamResult', () => {
    it('should save exam result successfully', async () => {
      const examResult = {
        userId: 'test-user',
        examId: 'test-exam',
        examTitle: 'Test Exam',
        startTime: new Date('2024-01-01T00:00:00Z'),
        endTime: new Date('2024-01-01T01:00:00Z'),
        timeSpent: 60,
        score: 80,
        maxScore: 100,
        passed: true,
        answers: {},
        questions: []
      }

      const result = await examResultsService.saveExamResult(examResult)
      
      expect(result.id).toBe('test-result-id')
      expect(result.userId).toBe('test-user')
      expect(result.examId).toBe('test-exam')
      expect(result.passed).toBe(true)
    })
  })

  describe('getUserExamResults', () => {
    it('should fetch user exam results', async () => {
      const results = await examResultsService.getUserExamResults('test-user')
      
      expect(results).toHaveLength(1)
      expect(results[0].userId).toBe('test-user')
      expect(results[0].examId).toBe('test-exam')
    })
  })

  describe('generateCertificateId', () => {
    it('should generate unique certificate ID', () => {
      const certId1 = examResultsService.generateCertificateId('test-exam', 'test-user')
      const certId2 = examResultsService.generateCertificateId('test-exam', 'test-user')
      
      expect(certId1).toMatch(/^CERT-TEST-EXAM-.*$/)
      expect(certId1).not.toBe(certId2) // Should be unique
    })
  })

  describe('updateExamResultWithCertificate', () => {
    it('should update exam result with certificate ID', async () => {
      await expect(
        examResultsService.updateExamResultWithCertificate('test-result-id', 'CERT-123')
      ).resolves.not.toThrow()
    })
  })

  describe('getExamResultById', () => {
    it('should fetch exam result by ID', async () => {
      const result = await examResultsService.getExamResultById('test-result-id')
      
      expect(result).not.toBeNull()
      expect(result?.id).toBe('test-result-id')
    })
  })

  describe('getUserProfile', () => {
    it('should fetch user profile', async () => {
      // Mock the profiles table response
      const mockSupabase = await import('../../components/lib/supabaseClient')
      const mockFrom = vi.mocked(mockSupabase.supabase.from)
      
      mockFrom.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({
              data: {
                id: 'test-user',
                email: 'test@example.com',
                full_name: 'Test User',
                avatar_url: null
              },
              error: null
            }))
          }))
        }))
      } as any)

      const profile = await examResultsService.getUserProfile('test-user')
      
      expect(profile).not.toBeNull()
      expect(profile?.id).toBe('test-user')
      expect(profile?.email).toBe('test@example.com')
      expect(profile?.fullName).toBe('Test User')
    })
  })
})
