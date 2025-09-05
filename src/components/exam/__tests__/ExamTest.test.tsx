import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExamTest from '../ExamTest'
import type { ExamSession, Question } from '../ExamInterface'

// Mock the exam results service
vi.mock('../../../services/examResultsService', () => ({
  examResultsService: {
    calculateExamScore: vi.fn(() => ({
      totalPoints: 40,
      earnedPoints: 30,
      percentage: 75,
      passed: true,
      grade: 'C'
    })),
    saveExamResult: vi.fn(() => Promise.resolve({
      id: 'test-result-id',
      userId: 'test-user',
      examId: 'sample-exam',
      examTitle: 'Sample Exam',
      startTime: new Date(),
      endTime: new Date(),
      timeSpent: 30,
      score: 30,
      maxScore: 40,
      passed: true,
      answers: {},
      questions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  }
}))

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

describe('ExamTest Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Initial Render', () => {
    it('should render exam menu initially', () => {
      render(<ExamTest />)
      
      expect(screen.getByText('Exam System Test')).toBeInTheDocument()
      expect(screen.getByText('Start Full Exam Test')).toBeInTheDocument()
      expect(screen.getByText('Sample Questions')).toBeInTheDocument()
    })

    it('should display sample questions preview', () => {
      render(<ExamTest />)
      
      expect(screen.getByText('Question 1')).toBeInTheDocument()
      expect(screen.getByText('Question 2')).toBeInTheDocument()
      expect(screen.getByText('Question 3')).toBeInTheDocument()
      expect(screen.getByText('Question 4')).toBeInTheDocument()
    })

    it('should display component tests', () => {
      render(<ExamTest />)
      
      expect(screen.getByText('Component Tests')).toBeInTheDocument()
      expect(screen.getByText('Timer Component')).toBeInTheDocument()
      expect(screen.getByText('Code Editor Component')).toBeInTheDocument()
      expect(screen.getByText('Question Bank Component')).toBeInTheDocument()
    })
  })

  describe('Exam Start', () => {
    it('should start exam when start button is clicked', async () => {
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Should show exam interface
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument()
      expect(screen.getByText('Question 1 of 4')).toBeInTheDocument()
    })

    it('should restore progress from localStorage if available', async () => {
      const savedProgress = {
        examSession: {
          startTime: '2024-01-01T00:00:00Z',
          currentQuestionIndex: 2,
          answers: {
            '1': 'A JavaScript library for building user interfaces',
            '2': 'function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }'
          },
          flaggedQuestions: ['1']
        },
        timestamp: new Date().toISOString()
      }
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedProgress))
      
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Should restore to question 3 (index 2)
      expect(screen.getByText('Question 3 of 4')).toBeInTheDocument()
    })

    it('should not restore old progress (older than 24 hours)', async () => {
      const oldProgress = {
        examSession: {
          startTime: '2024-01-01T00:00:00Z',
          currentQuestionIndex: 2,
          answers: {},
          flaggedQuestions: []
        },
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // 25 hours ago
      }
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(oldProgress))
      
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Should start from question 1, not restored question 3
      expect(screen.getByText('Question 1 of 4')).toBeInTheDocument()
    })
  })

  describe('Auto-save Functionality', () => {
    it('should auto-save when answer changes', async () => {
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Find and interact with a question
      const answerInput = screen.getByDisplayValue('A JavaScript library for building user interfaces')
      await user.clear(answerInput)
      await user.type(answerInput, 'New answer')
      
      // Wait for auto-save
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'exam-progress-test-exam-1',
          expect.stringContaining('"New answer"')
        )
      })
    })

    it('should auto-save when navigating between questions', async () => {
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Click next button
      const nextButton = screen.getByText('Next')
      await user.click(nextButton)
      
      // Wait for auto-save
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'exam-progress-test-exam-1',
          expect.stringContaining('"currentQuestionIndex":1')
        )
      })
    })

    it('should auto-save when flagging questions', async () => {
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Click flag button
      const flagButton = screen.getByText('Flag')
      await user.click(flagButton)
      
      // Wait for auto-save
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'exam-progress-test-exam-1',
          expect.stringContaining('"flaggedQuestions":["1"]')
        )
      })
    })
  })

  describe('Exam Submission', () => {
    it('should save exam results when submitted', async () => {
      const { examResultsService } = await import('../../../services/examResultsService')
      
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Navigate to last question
      const nextButton = screen.getByText('Next')
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)
      
      // Submit exam
      const submitButton = screen.getByText('Submit Exam')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(examResultsService.saveExamResult).toHaveBeenCalledWith(
          expect.objectContaining({
            userId: 'test-user',
            examId: 'sample-exam',
            examTitle: 'Programming Exam',
            passed: true,
            score: 30,
            maxScore: 40
          })
        )
      })
      
      // Should clean up localStorage
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('exam-progress-test-exam-1')
    })
  })

  describe('Exam Close', () => {
    it('should save exam results when closed', async () => {
      const { examResultsService } = await import('../../../services/examResultsService')
      
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Click close exam button
      const closeButton = screen.getByText('Close Exam')
      await user.click(closeButton)
      
      // Confirm close in dialog
      const confirmCloseButton = screen.getByText('Close Exam')
      await user.click(confirmCloseButton)
      
      await waitFor(() => {
        expect(examResultsService.saveExamResult).toHaveBeenCalledWith(
          expect.objectContaining({
            userId: 'test-user',
            examId: 'sample-exam',
            examTitle: 'Programming Exam',
            passed: true,
            score: 30,
            maxScore: 40
          })
        )
      })
      
      // Should clean up localStorage
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('exam-progress-test-exam-1')
      
      // Should return to menu
      expect(screen.getByText('Exam System Test')).toBeInTheDocument()
    })

    it('should show warning dialog when trying to close exam', async () => {
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Click close exam button
      const closeButton = screen.getByText('Close Exam')
      await user.click(closeButton)
      
      // Should show warning dialog
      expect(screen.getByText('Close Exam Warning')).toBeInTheDocument()
      expect(screen.getByText(/Are you sure you want to close this exam/)).toBeInTheDocument()
      expect(screen.getByText('Continue Exam')).toBeInTheDocument()
    })

    it('should cancel close when clicking continue exam', async () => {
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Click close exam button
      const closeButton = screen.getByText('Close Exam')
      await user.click(closeButton)
      
      // Click continue exam
      const continueButton = screen.getByText('Continue Exam')
      await user.click(continueButton)
      
      // Should still be in exam
      expect(screen.getByText('Programming Exam')).toBeInTheDocument()
    })
  })

  describe('Results View', () => {
    it('should show results after exam submission', async () => {
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Navigate to last question and submit
      const nextButton = screen.getByText('Next')
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)
      
      const submitButton = screen.getByText('Submit Exam')
      await user.click(submitButton)
      
      // Should show results
      await waitFor(() => {
        expect(screen.getByText('Exam Results')).toBeInTheDocument()
      })
    })

    it('should show detailed results when requested', async () => {
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Navigate to last question and submit
      const nextButton = screen.getByText('Next')
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)
      
      const submitButton = screen.getByText('Submit Exam')
      await user.click(submitButton)
      
      // Click view detailed results
      await waitFor(() => {
        const viewDetailedButton = screen.getByText('View Detailed Results')
        user.click(viewDetailedButton)
      })
      
      // Should show detailed results
      await waitFor(() => {
        expect(screen.getByText('Detailed Exam Analysis')).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Should not crash the app
      expect(screen.getByText('Programming Exam')).toBeInTheDocument()
    })

    it('should handle exam result save errors gracefully', async () => {
      const { examResultsService } = await import('../../../services/examResultsService')
      vi.mocked(examResultsService.saveExamResult).mockRejectedValue(new Error('Save error'))
      
      render(<ExamTest />)
      
      const startButton = screen.getByText('Start Full Exam Test')
      await user.click(startButton)
      
      // Navigate to last question and submit
      const nextButton = screen.getByText('Next')
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)
      
      const submitButton = screen.getByText('Submit Exam')
      await user.click(submitButton)
      
      // Should still show results even if save fails
      await waitFor(() => {
        expect(screen.getByText('Exam Results')).toBeInTheDocument()
      })
    })
  })
})
