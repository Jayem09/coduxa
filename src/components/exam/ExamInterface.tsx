import React, { useState, useCallback, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  CheckCircle, 
  Circle, 
  ArrowLeft, 
  ArrowRight, 
  Flag,
  AlertTriangle,
  X,
  Clock
} from 'lucide-react';
import QuestionBank from './QuestionBank';
import Results from './Results';
import ExamResults from './ExamResults';

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

export interface Question {
  id: string;
  type: 'multiple-choice' | 'coding' | 'true-false' | 'fill-blank';
  title: string;
  description: string;
  points: number;
  timeLimit?: number; // in minutes
  options?: string[];
  correctAnswer?: string | string[];
  codeTemplate?: string;
  testCases?: TestCase[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface ExamSession {
  id: string;
  examId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  timeLimit: number; // total exam time in minutes
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, any>;
  flaggedQuestions: Set<string>;
  isSubmitted: boolean;
  score?: number;
  maxScore: number;
  // Anti-cheating: Track question access
  questionAccessOrder: number[];
  canAccessQuestion: (questionIndex: number) => boolean;
}

interface ExamInterfaceProps {
  examSession: ExamSession;
  onAnswerChange: (questionId: string, answer: any) => void;
  onQuestionChange: (index: number) => void;
  onFlagQuestion: (questionId: string) => void;
  onSubmitExam: () => void;
  onCloseExam: () => void;
}

const ExamInterface: React.FC<ExamInterfaceProps> = ({
  examSession,
  onAnswerChange,
  onQuestionChange,
  onFlagQuestion,
  onSubmitExam,
  onCloseExam
}) => {
  const [showResults, setShowResults] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [showCloseWarning, setShowCloseWarning] = useState(false);

  // Auto-save exam progress every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      // Save current progress to localStorage as backup
      const progressData = {
        examSession: {
          ...examSession,
          answers: examSession.answers,
          currentQuestionIndex: examSession.currentQuestionIndex,
          flaggedQuestions: Array.from(examSession.flaggedQuestions)
        },
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(`exam-progress-${examSession.id}`, JSON.stringify(progressData));
      console.log('Exam progress auto-saved');
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [examSession]);

  const currentQuestion = examSession.questions[examSession.currentQuestionIndex];
  const progress = ((examSession.currentQuestionIndex + 1) / examSession.questions.length) * 100;
  const answeredCount = Object.keys(examSession.answers).length;
  const flaggedCount = examSession.flaggedQuestions.size;

  const handlePrevious = useCallback(() => {
    if (examSession.currentQuestionIndex > 0) {
      onQuestionChange(examSession.currentQuestionIndex - 1);
      
      // Auto-save progress when navigating
      setTimeout(() => {
        const progressData = {
          examSession: {
            ...examSession,
            currentQuestionIndex: examSession.currentQuestionIndex - 1,
            answers: examSession.answers,
            flaggedQuestions: Array.from(examSession.flaggedQuestions)
          },
          timestamp: new Date().toISOString()
        };
        localStorage.setItem(`exam-progress-${examSession.id}`, JSON.stringify(progressData));
      }, 100);
    }
  }, [examSession, onQuestionChange]);

  const handleNext = useCallback(() => {
    if (examSession.currentQuestionIndex < examSession.questions.length - 1) {
      onQuestionChange(examSession.currentQuestionIndex + 1);
      
      // Auto-save progress when navigating
      setTimeout(() => {
        const progressData = {
          examSession: {
            ...examSession,
            currentQuestionIndex: examSession.currentQuestionIndex + 1,
            answers: examSession.answers,
            flaggedQuestions: Array.from(examSession.flaggedQuestions)
          },
          timestamp: new Date().toISOString()
        };
        localStorage.setItem(`exam-progress-${examSession.id}`, JSON.stringify(progressData));
      }, 100);
    }
  }, [examSession, onQuestionChange]);

  // Anti-cheating: Check if question can be accessed
  const canAccessQuestion = useCallback((questionIndex: number) => {
    if (examSession.canAccessQuestion) {
      return examSession.canAccessQuestion(questionIndex);
    }
    // Default behavior: can only access current and previous questions
    return questionIndex <= examSession.currentQuestionIndex;
  }, [examSession]);

  const handleSubmitExam = useCallback(() => {
    onSubmitExam();
    setShowResults(true);
  }, [onSubmitExam]);

  const handleViewDetailedResults = useCallback(() => {
    setShowDetailedResults(true);
  }, []);

  const handleBackToResults = useCallback(() => {
    setShowDetailedResults(false);
  }, []);

  const handleCloseExamClick = useCallback(() => {
    setShowCloseWarning(true);
  }, []);

  const handleConfirmClose = useCallback(() => {
    setShowCloseWarning(false);
    onCloseExam();
  }, [onCloseExam]);

  const handleCancelClose = useCallback(() => {
    setShowCloseWarning(false);
  }, []);

  const getQuestionStatus = (questionIndex: number) => {
    const question = examSession.questions[questionIndex];
    const isAnswered = examSession.answers[question.id] !== undefined;
    const isFlagged = examSession.flaggedQuestions.has(question.id);
    const isCurrent = questionIndex === examSession.currentQuestionIndex;

    if (isCurrent) return 'current';
    if (isAnswered && isFlagged) return 'answered-flagged';
    if (isAnswered) return 'answered';
    if (isFlagged) return 'flagged';
    return 'unanswered';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <Circle className="h-4 w-4 text-blue-600 fill-blue-600" />;
      case 'answered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'flagged':
        return <Flag className="h-4 w-4 text-orange-600" />;
      case 'answered-flagged':
        return <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-600" />
          <Flag className="h-3 w-3 text-orange-600" />
        </div>;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };


  if (showDetailedResults) {
    return (
      <ExamResults
        examSession={examSession}
        onBack={handleBackToResults}
      />
    );
  }

  if (showResults) {
    return (
      <Results
        examSession={examSession}
        onViewDetailed={handleViewDetailedResults}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-medium text-sm">{getExamInfo(examSession.examId).icon}</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{getExamInfo(examSession.examId).title}</h1>
                <p className="text-sm text-gray-500">Question {examSession.currentQuestionIndex + 1} of {examSession.questions.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-500">Time Remaining</div>
                <div className="text-xl font-medium text-gray-900">01:29:31</div>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-gray-600" />
              </div>
              <Button
                onClick={handleCloseExamClick}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
                Close Exam
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Minimal Progress Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-medium text-gray-900">Progress</h2>
              <p className="text-sm text-gray-500">Complete questions to unlock more</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-gray-900">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          
          <div className="relative mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              <span>{examSession.questions.length} questions</span>
            </div>
          </div>

          {/* Minimal Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">{answeredCount}</div>
                  <div className="text-sm text-gray-500">Answered</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                  <Flag className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">{flaggedCount}</div>
                  <div className="text-sm text-gray-500">Flagged</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                  <Circle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">{examSession.questions.length - answeredCount}</div>
                  <div className="text-sm text-gray-500">Remaining</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Minimal Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-24">
              <div className="mb-4">
                <h3 className="text-base font-medium text-gray-900 mb-1">Questions</h3>
                <p className="text-sm text-gray-500">Unlock as you progress</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {examSession.questions.map((question, index) => {
                  const status = getQuestionStatus(index);
                  const isCurrent = index === examSession.currentQuestionIndex;
                  const canAccess = canAccessQuestion(index);
                  const isLocked = !canAccess;
                  
                  return (
                    <button
                      key={index}
                      className={`relative h-12 w-full rounded-md border transition-all duration-200 ${
                        isCurrent 
                          ? 'bg-gray-900 border-gray-900 text-white' 
                          : isLocked
                          ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                          : status === 'answered'
                          ? 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                          : status === 'flagged'
                          ? 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => canAccess && onQuestionChange(index)}
                      disabled={isLocked}
                      title={isLocked ? 'Complete previous questions to unlock' : `Question ${index + 1}`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex items-center gap-1 mb-1">
                          {isLocked ? (
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                          ) : (
                            getStatusIcon(status)
                          )}
                        </div>
                        <span className="text-xs font-medium">{index + 1}</span>
                        <span className="text-xs opacity-60">{question.points}pts</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Minimal Legend */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                  <span className="font-medium text-gray-700">Current</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <CheckCircle className="h-3 w-3 text-gray-600" />
                  <span className="font-medium text-gray-700">Answered</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <Flag className="h-3 w-3 text-gray-600" />
                  <span className="font-medium text-gray-700">Flagged</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span className="font-medium text-gray-600">Not Answered</span>
                </div>
              </div>
              
              {/* Completion Stats */}
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  {answeredCount}/{examSession.questions.length}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
            </div>
          </div>

          {/* Minimal Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Minimal Question Header */}
              <div className="bg-gray-50 p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs font-medium px-2 py-1">
                        {currentQuestion.type.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs font-medium px-2 py-1">
                        {currentQuestion.difficulty}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs font-medium px-2 py-1">
                        {currentQuestion.points} points
                      </Badge>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentQuestion.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{currentQuestion.description}</p>
                  </div>
                  <button
                    onClick={() => onFlagQuestion(currentQuestion.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-all duration-200 ${
                      examSession.flaggedQuestions.has(currentQuestion.id)
                        ? 'bg-gray-100 border-gray-300 text-gray-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Flag className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {examSession.flaggedQuestions.has(currentQuestion.id) ? 'Flagged' : 'Flag'}
                    </span>
                  </button>
                </div>
              </div>
              {/* Question Content */}
              <div className="p-6">
                <div className="mb-6">
                  {currentQuestion.type === 'coding' && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Code Template:</h4>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        {currentQuestion.codeTemplate}
                      </pre>
                    </div>
                  )}

                  {currentQuestion.testCases && currentQuestion.testCases.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Test Cases:</h4>
                      <div className="space-y-2">
                        {currentQuestion.testCases.map((testCase, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <p className="text-sm font-medium">Test Case {index + 1}</p>
                            <p className="text-sm text-gray-600">Input: {testCase.input}</p>
                            <p className="text-sm text-gray-600">Expected Output: {testCase.expectedOutput}</p>
                            {testCase.description && (
                              <p className="text-sm text-gray-500">{testCase.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <QuestionBank
                  question={currentQuestion}
                  answer={examSession.answers[currentQuestion.id]}
                  onAnswerChange={(answer: any) => onAnswerChange(currentQuestion.id, answer)}
                />

                <Separator className="my-6" />

                {/* Navigation Buttons */}
                {/* Minimal Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    onClick={handlePrevious}
                    disabled={examSession.currentQuestionIndex === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200 ${
                      examSession.currentQuestionIndex === 0
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Previous</span>
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Question</div>
                      <div className="text-base font-semibold text-gray-900">
                        {examSession.currentQuestionIndex + 1} of {examSession.questions.length}
                      </div>
                    </div>
                    
                    {examSession.currentQuestionIndex === examSession.questions.length - 1 ? (
                      <button
                        onClick={handleSubmitExam}
                        className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-all duration-200"
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">Submit Exam</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-all duration-200"
                      >
                        <span className="text-sm">Next</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Minimal Quick Preview - Hidden on mobile and positioned to avoid sidebar */}
        <div className="hidden lg:block fixed bottom-4 left-80 bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-sm z-10">
          <h4 className="font-medium text-sm mb-2 text-gray-900">Preview</h4>
          <div className="text-sm text-gray-600 mb-2">
            {currentQuestion.title}
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs font-medium px-2 py-1">
              {currentQuestion.type.replace('-', ' ')}
            </Badge>
            <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs font-medium px-2 py-1">
              {currentQuestion.points}pts
            </Badge>
            {examSession.answers[currentQuestion.id] && (
              <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs font-medium px-2 py-1">
                ✓ Answered
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Close Exam Warning Dialog */}
      <Dialog open={showCloseWarning} onOpenChange={setShowCloseWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Close Exam Warning
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to close this exam? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <Clock className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Important:</strong> You will not be able to resume this exam. All progress will be lost and you will need to start over.
              </AlertDescription>
            </Alert>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Questions answered:</span>
                <span className="font-semibold text-gray-900">{answeredCount}/{examSession.questions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Progress:</span>
                <span className="font-semibold text-gray-900">{Math.round(progress)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Time spent:</span>
                <span className="font-semibold text-gray-900">
                  {Math.round((new Date().getTime() - examSession.startTime.getTime()) / (1000 * 60))} minutes
                </span>
              </div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancelClose}
            >
              Continue Exam
            </Button>
            <Button 
              onClick={handleConfirmClose}
              className="bg-red-600 hover:bg-red-700"
            >
              <X className="h-4 w-4 mr-2" />
              Close Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamInterface;
