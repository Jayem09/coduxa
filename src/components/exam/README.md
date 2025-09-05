# Exam System Components

This directory contains the core exam system components for the Coduxa platform. The system provides a comprehensive exam-taking experience with multiple question types, real-time feedback, and detailed analytics.

## Components Overview

### 🎯 ExamInterface.tsx

The main exam taking interface that orchestrates all other components.

**Features:**

- Question navigation with visual indicators
- Progress tracking
- Auto-save functionality
- Flag questions for review
- Responsive design
- Real-time timer integration

**Props:**

- `examSession`: Current exam session data
- `onAnswerChange`: Callback for answer updates
- `onQuestionChange`: Callback for question navigation
- `onFlagQuestion`: Callback for flagging questions
- `onSubmitExam`: Callback for exam submission
- `onSaveProgress`: Callback for saving progress

### 📝 QuestionBank.tsx

Question management system that handles different question types.

**Supported Question Types:**

- **Multiple Choice**: Single or multiple selection
- **Coding**: With code editor and test case execution
- **True/False**: Binary choice questions
- **Fill in the Blank**: Text input questions

**Features:**

- Dynamic question rendering based on type
- Real-time answer validation
- Test case execution for coding questions
- Hint system
- Answer persistence

### 💻 CodeEditor.tsx

Built-in code editor with advanced features.

**Features:**

- Syntax highlighting for multiple languages
- Auto-completion and bracket matching
- Line numbers and minimap
- Fullscreen mode
- Code formatting
- File import/export
- Multiple language support (JavaScript, Python, Java, C++, etc.)

**Languages Supported:**

- JavaScript, TypeScript
- Python, Java, C++, C, C#
- Go, Rust, PHP, Ruby
- Swift, Kotlin
- SQL, HTML, CSS
- JSON, XML, YAML, Markdown

### ⏰ Timer.tsx

Countdown timer with advanced features.

**Features:**

- Configurable time limits
- Warning and critical thresholds
- Pause/resume functionality
- Visual progress indicators
- Auto-submission on time expiry
- Customizable alerts

**Props:**

- `timeLimit`: Total time in minutes
- `startTime`: Exam start timestamp
- `onTimeUp`: Callback when time expires
- `onWarning`: Callback for warning threshold
- `onCritical`: Callback for critical threshold
- `showControls`: Show pause/resume controls
- `warningThreshold`: Minutes before warning (default: 10)
- `criticalThreshold`: Minutes before critical (default: 5)

### 📊 Results.tsx

Score display and feedback system.

**Features:**

- Overall score calculation
- Grade assignment (A+ to F)
- Performance breakdown by category and difficulty
- Time analysis
- Visual progress indicators
- Action buttons (retake, download, share)

### 📈 ExamResults.tsx

Detailed results analysis with comprehensive insights.

**Features:**

- Question-by-question analysis
- Performance trends
- Strengths and weaknesses identification
- Study recommendations
- Category and difficulty breakdowns
- Export and sharing capabilities

## Usage Example

```tsx
import { ExamInterface, Question, ExamSession } from "./components/exam";

const sampleQuestions: Question[] = [
  {
    id: "1",
    type: "multiple-choice",
    title: "What is React?",
    description: "Choose the best description of React.",
    points: 10,
    difficulty: "easy",
    category: "React",
    tags: ["react", "frontend"],
    options: [
      "A JavaScript library for building user interfaces",
      "A CSS framework",
      "A database management system",
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
  },
];

const examSession: ExamSession = {
  id: "exam-1",
  examId: "sample-exam",
  userId: "user-123",
  startTime: new Date(),
  timeLimit: 60,
  questions: sampleQuestions,
  currentQuestionIndex: 0,
  answers: {},
  flaggedQuestions: new Set(),
  isSubmitted: false,
  maxScore: 10,
};

function ExamPage() {
  const handleAnswerChange = (questionId: string, answer: any) => {
    // Update answer in state
  };

  const handleSubmitExam = () => {
    // Submit exam logic
  };

  return (
    <ExamInterface
      examSession={examSession}
      onAnswerChange={handleAnswerChange}
      onQuestionChange={(index) => setCurrentQuestion(index)}
      onFlagQuestion={(id) => toggleFlag(id)}
      onSubmitExam={handleSubmitExam}
      onSaveProgress={() => saveProgress()}
    />
  );
}
```

## Testing

To test the exam system components:

1. Navigate to `/exam-test` in your browser
2. Click "Start Full Exam Test" to begin a complete exam simulation
3. Test individual components using the component previews
4. Verify all question types work correctly
5. Check timer functionality and auto-submission
6. Review results and detailed analysis

## Data Types

### Question Interface

```typescript
interface Question {
  id: string;
  type: "multiple-choice" | "coding" | "true-false" | "fill-blank";
  title: string;
  description: string;
  points: number;
  timeLimit?: number;
  options?: string[];
  correctAnswer?: string | string[];
  codeTemplate?: string;
  testCases?: TestCase[];
  difficulty: "easy" | "medium" | "hard";
  category: string;
  tags: string[];
}
```

### ExamSession Interface

```typescript
interface ExamSession {
  id: string;
  examId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  timeLimit: number;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, any>;
  flaggedQuestions: Set<string>;
  isSubmitted: boolean;
  score?: number;
  maxScore: number;
}
```

## Styling

The components use Tailwind CSS for styling and are fully responsive. They integrate seamlessly with the existing Coduxa design system using the shadcn/ui components.

## Security Considerations

- Code execution should be done server-side in a secure sandbox
- Answers should be validated server-side
- Timer should be validated server-side to prevent tampering
- Auto-save should use secure API endpoints

## Future Enhancements

- [ ] Offline exam support
- [ ] Proctoring integration
- [ ] Advanced analytics dashboard
- [ ] Question randomization
- [ ] Adaptive testing
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] Mobile app integration
