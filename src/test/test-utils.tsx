import type { ReactElement } from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

// Mock components that might cause issues in tests
vi.mock('../components/exam/Timer', () => ({
  default: ({ timeLimit, startTime, onTimeUp, showControls }: any) => (
    <div data-testid="timer">
      Timer: {timeLimit} minutes
      {showControls && <button onClick={onTimeUp}>Time Up</button>}
    </div>
  )
}))

vi.mock('../components/exam/CodeEditor', () => ({
  default: ({ value, onChange, language, height }: any) => (
    <textarea
      data-testid="code-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-language={language}
      style={{ height }}
    />
  )
}))

vi.mock('../components/exam/QuestionBank', () => ({
  default: ({ question, answer, onAnswerChange }: any) => (
    <div data-testid="question-bank">
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      {question.type === 'multiple-choice' && question.options?.map((option: string, index: number) => (
        <label key={index}>
          <input
            type="radio"
            name={question.id}
            value={option}
            checked={answer === option}
            onChange={() => onAnswerChange(option)}
          />
          {option}
        </label>
      ))}
      {question.type === 'true-false' && (
        <div>
          <label>
            <input
              type="radio"
              name={question.id}
              value="true"
              checked={answer === 'true'}
              onChange={() => onAnswerChange('true')}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name={question.id}
              value="false"
              checked={answer === 'false'}
              onChange={() => onAnswerChange('false')}
            />
            False
          </label>
        </div>
      )}
      {question.type === 'fill-blank' && (
        <input
          type="text"
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Enter your answer"
        />
      )}
      {question.type === 'coding' && (
        <textarea
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Write your code here"
        />
      )}
    </div>
  )
}))

vi.mock('../components/exam/Results', () => ({
  default: ({ examSession, onViewDetailed }: any) => (
    <div data-testid="results">
      <h2>Exam Results</h2>
      <p>Score: {examSession.score || 0}/{examSession.maxScore}</p>
      <button onClick={onViewDetailed}>View Detailed Results</button>
    </div>
  )
}))

vi.mock('../components/exam/ExamResults', () => ({
  default: ({ examSession, onBack }: any) => (
    <div data-testid="exam-results">
      <h2>Detailed Exam Analysis</h2>
      <p>Score: {examSession.score || 0}/{examSession.maxScore}</p>
      <button onClick={onBack}>Back to Results</button>
    </div>
  )
}))

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
