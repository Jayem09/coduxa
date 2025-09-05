import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExamInterface from '../ExamInterface'
import type { ExamSession, Question } from '../ExamInterface'

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

describe('ExamInterface Component', () => {
  const user = userEvent.setup()
  let mockExamSession: ExamSession
  let mockQuestions: Question[]
  let mockHandlers: {
    onAnswerChange: ReturnType<typeof vi.fn>
    onQuestionChange: ReturnType<typeof vi.fn>
    onFlagQuestion: ReturnType<typeof vi.fn>
    onSubmitExam: ReturnType<typeof vi.fn>
    onCloseExam: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    
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
        type: 'coding',
        title: 'Implement a Fibonacci function',
        description: 'Write a function that returns the nth Fibonacci number.',
        points: 20,
        difficulty: 'medium',
        category: 'Algorithms',
        tags: ['algorithms', 'recursion'],
        codeTemplate: 'function fibonacci(n) {\n  // Your code here\n}',
        testCases: [
          {
            input: '5',
            expectedOutput: '8',
            description: '5th Fibonacci number'
          }
        ]
      },
      {
        id: '3',
        type: 'true-false',
        title: 'TypeScript is a superset of JavaScript',
        description: 'Is TypeScript a superset of JavaScript?',
        points: 5,
        difficulty: 'easy',
        category: 'TypeScript',
        tags: ['typescript', 'javascript'],
        correctAnswer: 'true'
      }
    ]

    mockExamSession = {
      id: 'test-exam-1',
      examId: 'js-fundamentals',
      userId: 'test-user',
      startTime: new Date('2024-01-01T00:00:00Z'),
      timeLimit: 60,
      questions: mockQuestions,
      currentQuestionIndex: 0,
      answers: {
        '1': 'A JavaScript library for building user interfaces'
      },
      flaggedQuestions: new Set(['1']),
      isSubmitted: false,
      maxScore: 35,
      questionAccessOrder: [0, 1, 2],
      canAccessQuestion: (questionIndex: number) => questionIndex <= 1
    }

    mockHandlers = {
      onAnswerChange: vi.fn(),
      onQuestionChange: vi.fn(),
      onFlagQuestion: vi.fn(),
      onSubmitExam: vi.fn(),
      onCloseExam: vi.fn()
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Initial Render', () => {
    it('should render exam interface with header', () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument()
      expect(screen.getByText('Question 1 of 3')).toBeInTheDocument()
      expect(screen.getByText('Close Exam')).toBeInTheDocument()
    })

    it('should display progress information', () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      expect(screen.getByText('Progress')).toBeInTheDocument()
      expect(screen.getByText('33%')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument() // Answered count
      expect(screen.getByText('1')).toBeInTheDocument() // Flagged count
      expect(screen.getByText('2')).toBeInTheDocument() // Remaining count
    })

    it('should display current question', () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      expect(screen.getByText('What is React?')).toBeInTheDocument()
      expect(screen.getByText('Choose the best description of React.')).toBeInTheDocument()
      expect(screen.getByText('MULTIPLE CHOICE')).toBeInTheDocument()
      expect(screen.getByText('easy')).toBeInTheDocument()
      expect(screen.getByText('10 points')).toBeInTheDocument()
    })
  })

  describe('Question Navigation', () => {
    it('should navigate to next question', async () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const nextButton = screen.getByText('Next')
      await user.click(nextButton)

      expect(mockHandlers.onQuestionChange).toHaveBeenCalledWith(1)
    })

    it('should navigate to previous question', async () => {
      const sessionAtQuestion2 = {
        ...mockExamSession,
        currentQuestionIndex: 1
      }

      render(
        <ExamInterface
          examSession={sessionAtQuestion2}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const previousButton = screen.getByText('Previous')
      await user.click(previousButton)

      expect(mockHandlers.onQuestionChange).toHaveBeenCalledWith(0)
    })

    it('should disable previous button on first question', () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const previousButton = screen.getByText('Previous')
      expect(previousButton).toBeDisabled()
    })

    it('should show submit button on last question', () => {
      const sessionAtLastQuestion = {
        ...mockExamSession,
        currentQuestionIndex: 2
      }

      render(
        <ExamInterface
          examSession={sessionAtLastQuestion}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      expect(screen.getByText('Submit Exam')).toBeInTheDocument()
    })
  })

  describe('Question Status Display', () => {
    it('should show correct question status indicators', () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      // Question 1 should be current and flagged
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('10pts')).toBeInTheDocument()
    })

    it('should show locked questions that cannot be accessed', () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      // Question 3 should be locked (canAccessQuestion returns false for index 2)
      const question3Button = screen.getByTitle('Complete previous questions to unlock')
      expect(question3Button).toBeDisabled()
    })
  })

  describe('Flagging Questions', () => {
    it('should flag/unflag questions', async () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const flagButton = screen.getByText('Flagged')
      await user.click(flagButton)

      expect(mockHandlers.onFlagQuestion).toHaveBeenCalledWith('1')
    })

    it('should show flagged state correctly', () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      expect(screen.getByText('Flagged')).toBeInTheDocument()
    })
  })

  describe('Auto-save Functionality', () => {
    it('should auto-save progress every 30 seconds', async () => {
      vi.useFakeTimers()
      
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      // Fast-forward 30 seconds
      vi.advanceTimersByTime(30000)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'exam-progress-test-exam-1',
        expect.stringContaining('"currentQuestionIndex":0')
      )

      vi.useRealTimers()
    })

    it('should auto-save when navigating between questions', async () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const nextButton = screen.getByText('Next')
      await user.click(nextButton)

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'exam-progress-test-exam-1',
          expect.stringContaining('"currentQuestionIndex":1')
        )
      })
    })
  })

  describe('Close Exam Dialog', () => {
    it('should show close warning dialog', async () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const closeButton = screen.getByText('Close Exam')
      await user.click(closeButton)

      expect(screen.getByText('Close Exam Warning')).toBeInTheDocument()
      expect(screen.getByText('Are you sure you want to close this exam?')).toBeInTheDocument()
      expect(screen.getByText('Continue Exam')).toBeInTheDocument()
    })

    it('should confirm close exam', async () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const closeButton = screen.getByText('Close Exam')
      await user.click(closeButton)

      const confirmCloseButton = screen.getByText('Close Exam')
      await user.click(confirmCloseButton)

      expect(mockHandlers.onCloseExam).toHaveBeenCalled()
    })

    it('should cancel close exam', async () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const closeButton = screen.getByText('Close Exam')
      await user.click(closeButton)

      const cancelButton = screen.getByText('Continue Exam')
      await user.click(cancelButton)

      expect(mockHandlers.onCloseExam).not.toHaveBeenCalled()
    })

    it('should show progress summary in close dialog', async () => {
      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const closeButton = screen.getByText('Close Exam')
      await user.click(closeButton)

      expect(screen.getByText('Questions answered:')).toBeInTheDocument()
      expect(screen.getByText('1/3')).toBeInTheDocument()
      expect(screen.getByText('Progress:')).toBeInTheDocument()
      expect(screen.getByText('33%')).toBeInTheDocument()
      expect(screen.getByText('Time spent:')).toBeInTheDocument()
    })
  })

  describe('Exam Submission', () => {
    it('should submit exam on last question', async () => {
      const sessionAtLastQuestion = {
        ...mockExamSession,
        currentQuestionIndex: 2
      }

      render(
        <ExamInterface
          examSession={sessionAtLastQuestion}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const submitButton = screen.getByText('Submit Exam')
      await user.click(submitButton)

      expect(mockHandlers.onSubmitExam).toHaveBeenCalled()
    })
  })

  describe('Coding Questions', () => {
    it('should display code template for coding questions', () => {
      const sessionAtCodingQuestion = {
        ...mockExamSession,
        currentQuestionIndex: 1
      }

      render(
        <ExamInterface
          examSession={sessionAtCodingQuestion}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      expect(screen.getByText('Code Template:')).toBeInTheDocument()
      expect(screen.getByText('function fibonacci(n) {')).toBeInTheDocument()
      expect(screen.getByText('Test Cases:')).toBeInTheDocument()
      expect(screen.getByText('Input: 5')).toBeInTheDocument()
      expect(screen.getByText('Expected Output: 8')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      render(
        <ExamInterface
          examSession={mockExamSession}
          onAnswerChange={mockHandlers.onAnswerChange}
          onQuestionChange={mockHandlers.onQuestionChange}
          onFlagQuestion={mockHandlers.onFlagQuestion}
          onSubmitExam={mockHandlers.onSubmitExam}
          onCloseExam={mockHandlers.onCloseExam}
        />
      )

      const nextButton = screen.getByText('Next')
      await user.click(nextButton)

      // Should not crash the app
      expect(mockHandlers.onQuestionChange).toHaveBeenCalledWith(1)
    })
  })
})
