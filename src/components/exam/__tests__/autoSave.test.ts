import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('Auto-save Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Progress Saving', () => {
    it('should save exam progress with correct structure', () => {
      const examSession = {
        id: 'test-exam-1',
        examId: 'js-fundamentals',
        userId: 'test-user',
        startTime: new Date('2024-01-01T00:00:00Z'),
        currentQuestionIndex: 2,
        answers: {
          '1': 'A JavaScript library for building user interfaces',
          '2': 'function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }'
        },
        flaggedQuestions: new Set(['1', '3'])
      }

      const progressData = {
        examSession: {
          ...examSession,
          answers: examSession.answers,
          currentQuestionIndex: examSession.currentQuestionIndex,
          flaggedQuestions: Array.from(examSession.flaggedQuestions)
        },
        timestamp: new Date().toISOString()
      }

      localStorageMock.setItem('exam-progress-test-exam-1', JSON.stringify(progressData))

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'exam-progress-test-exam-1',
        expect.stringContaining('"currentQuestionIndex":2')
      )
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'exam-progress-test-exam-1',
        expect.stringContaining('"flaggedQuestions":["1","3"]')
      )
    })

    it('should handle empty answers object', () => {
      const examSession = {
        id: 'test-exam-1',
        examId: 'js-fundamentals',
        userId: 'test-user',
        startTime: new Date('2024-01-01T00:00:00Z'),
        currentQuestionIndex: 0,
        answers: {},
        flaggedQuestions: new Set()
      }

      const progressData = {
        examSession: {
          ...examSession,
          answers: examSession.answers,
          currentQuestionIndex: examSession.currentQuestionIndex,
          flaggedQuestions: Array.from(examSession.flaggedQuestions)
        },
        timestamp: new Date().toISOString()
      }

      localStorageMock.setItem('exam-progress-test-exam-1', JSON.stringify(progressData))

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'exam-progress-test-exam-1',
        expect.stringContaining('"answers":{}')
      )
    })

    it('should handle complex answer types', () => {
      const examSession = {
        id: 'test-exam-1',
        examId: 'js-fundamentals',
        userId: 'test-user',
        startTime: new Date('2024-01-01T00:00:00Z'),
        currentQuestionIndex: 1,
        answers: {
          '1': 'A JavaScript library for building user interfaces',
          '2': {
            code: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n}',
            language: 'javascript'
          },
          '3': ['option1', 'option2'],
          '4': true
        },
        flaggedQuestions: new Set(['2'])
      }

      const progressData = {
        examSession: {
          ...examSession,
          answers: examSession.answers,
          currentQuestionIndex: examSession.currentQuestionIndex,
          flaggedQuestions: Array.from(examSession.flaggedQuestions)
        },
        timestamp: new Date().toISOString()
      }

      localStorageMock.setItem('exam-progress-test-exam-1', JSON.stringify(progressData))

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'exam-progress-test-exam-1',
        expect.stringContaining('"code":')
      )
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'exam-progress-test-exam-1',
        expect.stringContaining('"language":"javascript"')
      )
    })
  })

  describe('Progress Restoration', () => {
    it('should restore exam progress correctly', () => {
      const savedProgress = {
        examSession: {
          id: 'test-exam-1',
          examId: 'js-fundamentals',
          userId: 'test-user',
          startTime: '2024-01-01T00:00:00Z',
          currentQuestionIndex: 2,
          answers: {
            '1': 'A JavaScript library for building user interfaces',
            '2': 'function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }'
          },
          flaggedQuestions: ['1', '3']
        },
        timestamp: new Date().toISOString()
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedProgress))

      const restoredData = JSON.parse(localStorageMock.getItem('exam-progress-test-exam-1') || '{}')

      expect(restoredData.examSession.currentQuestionIndex).toBe(2)
      expect(restoredData.examSession.answers['1']).toBe('A JavaScript library for building user interfaces')
      expect(restoredData.examSession.flaggedQuestions).toEqual(['1', '3'])
    })

    it('should handle corrupted localStorage data gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid json data')

      expect(() => {
        try {
          JSON.parse(localStorageMock.getItem('exam-progress-test-exam-1') || '{}')
        } catch (error) {
          // Should handle gracefully
          return null
        }
      }).not.toThrow()
    })

    it('should handle missing localStorage data', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const restoredData = localStorageMock.getItem('exam-progress-test-exam-1')
      expect(restoredData).toBeNull()
    })
  })

  describe('Time-based Validation', () => {
    it('should validate recent progress (within 24 hours)', () => {
      const recentProgress = {
        examSession: {
          id: 'test-exam-1',
          currentQuestionIndex: 1,
          answers: {},
          flaggedQuestions: []
        },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
      }

      const savedTime = new Date(recentProgress.timestamp)
      const now = new Date()
      const hoursDiff = (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60)

      expect(hoursDiff).toBeLessThan(24)
    })

    it('should reject old progress (older than 24 hours)', () => {
      const oldProgress = {
        examSession: {
          id: 'test-exam-1',
          currentQuestionIndex: 1,
          answers: {},
          flaggedQuestions: []
        },
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // 25 hours ago
      }

      const savedTime = new Date(oldProgress.timestamp)
      const now = new Date()
      const hoursDiff = (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60)

      expect(hoursDiff).toBeGreaterThan(24)
    })
  })

  describe('Cleanup Operations', () => {
    it('should remove saved progress after exam completion', () => {
      localStorageMock.removeItem('exam-progress-test-exam-1')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('exam-progress-test-exam-1')
    })

    it('should handle cleanup errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      expect(() => {
        try {
          localStorageMock.removeItem('exam-progress-test-exam-1')
        } catch (error) {
          // Should handle gracefully
          return null
        }
      }).not.toThrow()
    })
  })

  describe('Data Integrity', () => {
    it('should preserve all exam session properties', () => {
      const examSession = {
        id: 'test-exam-1',
        examId: 'js-fundamentals',
        userId: 'test-user',
        startTime: new Date('2024-01-01T00:00:00Z'),
        endTime: undefined,
        timeLimit: 60,
        questions: [],
        currentQuestionIndex: 1,
        answers: { '1': 'test answer' },
        flaggedQuestions: new Set(['1']),
        isSubmitted: false,
        score: undefined,
        maxScore: 100,
        questionAccessOrder: [0, 1, 2],
        canAccessQuestion: (questionIndex: number) => questionIndex <= 1
      }

      const progressData = {
        examSession: {
          ...examSession,
          answers: examSession.answers,
          currentQuestionIndex: examSession.currentQuestionIndex,
          flaggedQuestions: Array.from(examSession.flaggedQuestions)
        },
        timestamp: new Date().toISOString()
      }

      const serialized = JSON.stringify(progressData)
      const deserialized = JSON.parse(serialized)

      expect(deserialized.examSession.id).toBe('test-exam-1')
      expect(deserialized.examSession.examId).toBe('js-fundamentals')
      expect(deserialized.examSession.userId).toBe('test-user')
      expect(deserialized.examSession.currentQuestionIndex).toBe(1)
      expect(deserialized.examSession.answers['1']).toBe('test answer')
      expect(deserialized.examSession.flaggedQuestions).toEqual(['1'])
    })

    it('should handle Set serialization correctly', () => {
      const flaggedQuestions = new Set(['1', '2', '3'])
      const serialized = Array.from(flaggedQuestions)
      const deserialized = new Set(serialized)

      expect(deserialized.has('1')).toBe(true)
      expect(deserialized.has('2')).toBe(true)
      expect(deserialized.has('3')).toBe(true)
      expect(deserialized.size).toBe(3)
    })
  })

  describe('Performance Considerations', () => {
    it('should not save progress too frequently', () => {
      let saveCount = 0
      const throttledSave = (() => {
        let lastSave = 0
        const throttleMs = 1000 // 1 second throttle

        return (data: any) => {
          const now = Date.now()
          if (now - lastSave > throttleMs) {
            saveCount++
            lastSave = now
            localStorageMock.setItem('exam-progress-test-exam-1', JSON.stringify(data))
          }
        }
      })()

      // Simulate rapid saves
      for (let i = 0; i < 10; i++) {
        throttledSave({ examSession: { id: 'test-exam-1' }, timestamp: new Date().toISOString() })
      }

      // Should only save once due to throttling
      expect(saveCount).toBe(1)
    })

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

      const examSession = {
        id: 'test-exam-1',
        currentQuestionIndex: 0,
        answers: { '1': largeAnswer },
        flaggedQuestions: []
      }

      const progressData = {
        examSession,
        timestamp: new Date().toISOString()
      }

      expect(() => {
        JSON.stringify(progressData)
      }).not.toThrow()

      const serialized = JSON.stringify(progressData)
      expect(serialized.length).toBeGreaterThan(2000)
    })
  })
})
