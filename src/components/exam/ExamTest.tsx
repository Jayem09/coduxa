import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import ExamInterface from './ExamInterface';
import type { ExamSession, Question } from './ExamInterface';
import Timer from './Timer';
import CodeEditor from './CodeEditor';
import QuestionBank from './QuestionBank';
import Results from './Results';
import ExamResults from './ExamResults';
import { examResultsService, type ExamScore } from '../../services/examResultsService';

// Function to get exam title and icon based on examId
const getExamInfo = (examId: string) => {
  const examMap: Record<string, { title: string; icon: string }> = {
    'js-fundamentals': { title: 'JavaScript Fundamentals', icon: 'JS' },
    'react-intermediate': { title: 'React Intermediate', icon: 'R' },
    'algorithms-data-structures': { title: 'Algorithms & Data Structures', icon: 'A' },
    'html-css-basics': { title: 'HTML & CSS Basics', icon: 'H' },
    'nodejs-backend': { title: 'Node.js Backend Development', icon: 'N' },
    'python-fundamentals': { title: 'Python Fundamentals', icon: 'P' },
    'sql-database': { title: 'SQL Database Management', icon: 'S' },
    'git-version-control': { title: 'Git Version Control', icon: 'G' },
    'typescript-advanced': { title: 'TypeScript Advanced', icon: 'T' },
    'system-design': { title: 'System Design & Architecture', icon: 'SD' },
    'docker-kubernetes': { title: 'Docker & Kubernetes', icon: 'D' },
    'aws-cloud-fundamentals': { title: 'AWS Cloud Fundamentals', icon: 'AWS' },
    'cybersecurity-basics': { title: 'Cybersecurity Basics', icon: 'C' },
    'machine-learning-intro': { title: 'Machine Learning Introduction', icon: 'ML' },
    'blockchain-fundamentals': { title: 'Blockchain Fundamentals', icon: 'B' }
  };
  
  return examMap[examId] || { title: 'Programming Exam', icon: 'P' };
};

// Sample test data
const sampleQuestions: Question[] = [
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
      },
      {
        input: '10',
        expectedOutput: '55',
        description: '10th Fibonacci number'
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
  },
  {
    id: '4',
    type: 'fill-blank',
    title: 'Complete the sentence',
    description: 'The DOM stands for Document _____ Model.',
    points: 5,
    difficulty: 'easy',
    category: 'Web Development',
    tags: ['dom', 'web'],
    correctAnswer: 'Object'
  }
];

const ExamTest: React.FC = () => {
  const [currentView, setCurrentView] = useState<'menu' | 'exam' | 'results' | 'detailed'>('menu');
  const [examSession, setExamSession] = useState<ExamSession>({
    id: 'test-exam-1',
    examId: 'sample-exam',
    userId: 'test-user',
    startTime: new Date(),
    timeLimit: 60, // 60 minutes
    questions: sampleQuestions,
    currentQuestionIndex: 0,
    answers: {},
    flaggedQuestions: new Set(),
    isSubmitted: false,
    maxScore: sampleQuestions.reduce((sum, q) => sum + q.points, 0),
    // Anti-cheating properties
    questionAccessOrder: [0],
    canAccessQuestion: (questionIndex: number) => questionIndex <= 0
  });

  const handleAnswerChange = (questionId: string, answer: any) => {
    setExamSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
    
    // Auto-save progress when answer changes
    setTimeout(() => {
      const progressData = {
        examSession: {
          ...examSession,
          answers: { ...examSession.answers, [questionId]: answer },
          currentQuestionIndex: examSession.currentQuestionIndex,
          flaggedQuestions: Array.from(examSession.flaggedQuestions)
        },
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`exam-progress-${examSession.id}`, JSON.stringify(progressData));
    }, 100);
  };

  const handleQuestionChange = (index: number) => {
    setExamSession(prev => ({
      ...prev,
      currentQuestionIndex: index
    }));
    
    // Auto-save progress when question changes
    setTimeout(() => {
      const progressData = {
        examSession: {
          ...examSession,
          currentQuestionIndex: index,
          answers: examSession.answers,
          flaggedQuestions: Array.from(examSession.flaggedQuestions)
        },
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`exam-progress-${examSession.id}`, JSON.stringify(progressData));
    }, 100);
  };

  const handleFlagQuestion = (questionId: string) => {
    setExamSession(prev => {
      const newFlagged = new Set(prev.flaggedQuestions);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      return {
        ...prev,
        flaggedQuestions: newFlagged
      };
    });
    
    // Auto-save progress when flagging changes
    setTimeout(() => {
      const newFlagged = new Set(examSession.flaggedQuestions);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      
      const progressData = {
        examSession: {
          ...examSession,
          flaggedQuestions: Array.from(newFlagged),
          answers: examSession.answers,
          currentQuestionIndex: examSession.currentQuestionIndex
        },
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`exam-progress-${examSession.id}`, JSON.stringify(progressData));
    }, 100);
  };

  const handleSubmitExam = async () => {
    // Calculate score using centralized scoring function
    const examScore: ExamScore = examResultsService.calculateExamScore(examSession);
    const score = examScore.earnedPoints;
    const timeSpent = Math.round((new Date().getTime() - examSession.startTime.getTime()) / (1000 * 60));

    // Save exam results to database
    try {
      const examResult = {
        userId: examSession.userId,
        examId: examSession.examId,
        examTitle: getExamInfo(examSession.examId).title,
        startTime: examSession.startTime,
        endTime: new Date(),
        timeSpent: timeSpent,
        score: examScore.earnedPoints,
        maxScore: examScore.totalPoints,
        passed: examScore.passed,
        answers: examSession.answers,
        questions: examSession.questions
      };

      await examResultsService.saveExamResult(examResult);
      console.log('Exam results saved successfully on submit');
      
      // Clean up saved progress from localStorage
      localStorage.removeItem(`exam-progress-${examSession.id}`);
    } catch (error) {
      console.error('Error saving exam results on submit:', error);
    }

    setExamSession(prev => ({
      ...prev,
      endTime: new Date(),
      isSubmitted: true,
      score
    }));
    setCurrentView('results');
  };

  const handleCloseExam = async () => {
    // Save exam results even when closing the exam
    try {
      const examScore: ExamScore = examResultsService.calculateExamScore(examSession);
      const timeSpent = Math.round((new Date().getTime() - examSession.startTime.getTime()) / (1000 * 60));
      
      // Create exam result object
      const examResult = {
        userId: examSession.userId,
        examId: examSession.examId,
        examTitle: getExamInfo(examSession.examId).title,
        startTime: examSession.startTime,
        endTime: new Date(),
        timeSpent: timeSpent,
        score: examScore.earnedPoints,
        maxScore: examScore.totalPoints,
        passed: examScore.passed,
        answers: examSession.answers,
        questions: examSession.questions
      };

      // Save to database
      await examResultsService.saveExamResult(examResult);
      
      // Clean up saved progress from localStorage
      localStorage.removeItem(`exam-progress-${examSession.id}`);
      
      // Update local state to mark as submitted
      setExamSession(prev => ({
        ...prev,
        endTime: new Date(),
        isSubmitted: true,
        score: examScore.earnedPoints
      }));
      
      console.log('Exam results saved successfully on close');
    } catch (error) {
      console.error('Error saving exam results on close:', error);
    }
    
    // Return to exam menu
    setCurrentView('menu');
  };

  const startExam = () => {
    // Try to restore progress from localStorage
    const savedProgress = localStorage.getItem(`exam-progress-${examSession.id}`);
    let restoredSession = {
      startTime: new Date(),
      currentQuestionIndex: 0,
      answers: {} as Record<string, any>,
      flaggedQuestions: new Set<string>(),
      isSubmitted: false,
      score: undefined as number | undefined
    };

    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        const savedSession = progressData.examSession;
        
        // Check if the saved progress is recent (within 24 hours)
        const savedTime = new Date(progressData.timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          restoredSession = {
            startTime: savedSession.startTime ? new Date(savedSession.startTime) : new Date(),
            currentQuestionIndex: savedSession.currentQuestionIndex || 0,
            answers: savedSession.answers || {},
            flaggedQuestions: new Set<string>(savedSession.flaggedQuestions || []),
            isSubmitted: false,
            score: undefined
          };
          console.log('Exam progress restored from localStorage');
        } else {
          console.log('Saved progress is too old, starting fresh');
        }
      } catch (error) {
        console.error('Error restoring exam progress:', error);
      }
    }

    setExamSession(prev => ({
      ...prev,
      ...restoredSession
    }));
    setCurrentView('exam');
  };

  const viewDetailedResults = () => {
    setCurrentView('detailed');
  };

  const backToResults = () => {
    setCurrentView('results');
  };

  // const backToMenu = () => {
  //   setCurrentView('menu');
  // };

  if (currentView === 'exam') {
    return (
      <ExamInterface
        examSession={examSession}
        onAnswerChange={handleAnswerChange}
        onQuestionChange={handleQuestionChange}
        onFlagQuestion={handleFlagQuestion}
        onSubmitExam={handleSubmitExam}
        onCloseExam={handleCloseExam}
      />
    );
  }

  if (currentView === 'results') {
    return (
      <Results
        examSession={examSession}
        onViewDetailed={viewDetailedResults}
      />
    );
  }

  if (currentView === 'detailed') {
    return (
      <ExamResults
        examSession={examSession}
        onBack={backToResults}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Exam System Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Test the Exam System Components</h2>
              <p className="text-gray-600 mb-6">
                This test will demonstrate all the exam system components working together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sample Questions Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Sample Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sampleQuestions.map((question, index) => (
                      <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">Question {index + 1}</div>
                          <div className="text-sm text-gray-600">{question.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{question.type}</Badge>
                          <Badge variant="secondary">{question.points} pts</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Component Tests */}
              <Card>
                <CardHeader>
                  <CardTitle>Component Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded">
                      <h4 className="font-semibold mb-2">Timer Component</h4>
                      <Timer
                        timeLimit={5}
                        startTime={new Date()}
                        onTimeUp={() => console.log('Time up!')}
                        showControls={true}
                      />
                    </div>

                    <div className="p-4 border rounded">
                      <h4 className="font-semibold mb-2">Code Editor Component</h4>
                      <CodeEditor
                        value="function hello() {\n  console.log('Hello World!');\n}"
                        onChange={(code) => console.log('Code changed:', code)}
                        language="javascript"
                        height="150px"
                      />
                    </div>

                    <div className="p-4 border rounded">
                      <h4 className="font-semibold mb-2">Question Bank Component</h4>
                      <QuestionBank
                        question={sampleQuestions[0]}
                        answer={undefined}
                        onAnswerChange={(answer) => console.log('Answer changed:', answer)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button onClick={startExam} size="lg" className="px-8">
                Start Full Exam Test
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>This test includes:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Multiple choice questions</li>
                <li>Coding questions with test cases</li>
                <li>True/false questions</li>
                <li>Fill-in-the-blank questions</li>
                <li>Timer functionality</li>
                <li>Results and detailed analysis</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamTest;
