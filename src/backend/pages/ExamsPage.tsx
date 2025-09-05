import React, { useState } from 'react';
import { examResultsService, type ExamScore } from '../../services/examResultsService';
import { supabase } from '../../components/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  Clock, 
  Trophy, 
  Target, 
  Play, 
  CheckCircle,
  Star,
  Coins,
  AlertTriangle,
//   TrendingUp
} from 'lucide-react';
import { useCredits } from '../../services/CreditsContext';
import { deductCredits } from '../../services/creditsService';
import ExamInterface from '../../components/exam/ExamInterface';
import type { ExamSession, Question } from '../../components/exam/ExamInterface';
import { javascriptQuestions } from '../../components/exam/questions/javascript-questions';
import { reactQuestions } from '../../components/exam/questions/react-questions';
import { pythonQuestions } from '../../components/exam/questions/python-questions';
import { algorithmsQuestions } from '../../components/exam/questions/algorithms-questions';
import { htmlCssQuestions } from '../../components/exam/questions/html-css-questions';
import { nodejsQuestions } from '../../components/exam/questions/nodejs-questions';
import { sqlQuestions } from '../../components/exam/questions/sql-questions';
import { gitQuestions } from '../../components/exam/questions/git-questions';
import { typescriptQuestions } from '../../components/exam/questions/typescript-questions';
import { systemDesignQuestions } from '../../components/exam/questions/system-design-questions';
import { dockerQuestions } from '../../components/exam/questions/docker-questions';
import { awsQuestions } from '../../components/exam/questions/aws-questions';
import { securityQuestions } from '../../components/exam/questions/security-questions';
import { mlQuestions } from '../../components/exam/questions/ml-questions';
import { blockchainQuestions } from '../../components/exam/questions/blockchain-questions';

// Function to get credit cost based on difficulty
const getCreditCost = (difficulty: string): number => {
  switch (difficulty) {
    case 'Beginner':
      return 27;
    case 'Mixed':
      return 30;
    case 'Intermediate':
      return 35;
    case 'Advanced':
      return 40;
    default:
      return 30; // Default fallback
  }
};

// Function to get questions based on exam ID
const getQuestionsForExam = (examId: string): Question[] => {
  switch (examId) {
    case 'js-fundamentals':
      return javascriptQuestions;
    case 'react-intermediate':
      return reactQuestions;
    case 'python-fundamentals':
      return pythonQuestions;
    case 'algorithms-data-structures':
      return algorithmsQuestions;
    case 'html-css-basics':
      return htmlCssQuestions;
    case 'nodejs-backend':
      return nodejsQuestions;
    case 'sql-database':
      return sqlQuestions;
    case 'git-version-control':
      return gitQuestions;
    case 'typescript-advanced':
      return typescriptQuestions;
    case 'system-design':
      return systemDesignQuestions;
    case 'docker-kubernetes':
      return dockerQuestions;
    case 'aws-cloud-fundamentals':
      return awsQuestions;
    case 'cybersecurity-basics':
      return securityQuestions;
    case 'machine-learning-intro':
      return mlQuestions;
    case 'blockchain-fundamentals':
      return blockchainQuestions;
    default:
      return javascriptQuestions; // Default fallback for now
  }
};

// Function to calculate exam statistics from questions
const calculateExamStats = (examId: string) => {
  const questions = getQuestionsForExam(examId);
  const totalQuestions = questions.length;
  const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);
  
  return {
    questions: totalQuestions,
    points: totalPoints
  };
};

// Function to get all exam statistics for debugging/verification
const getAllExamStats = () => {
  const examIds = [
    'js-fundamentals', 'react-intermediate', 'algorithms-data-structures',
    'html-css-basics', 'nodejs-backend', 'python-fundamentals',
    'sql-database', 'git-version-control', 'typescript-advanced',
    'system-design', 'docker-kubernetes', 'aws-cloud-fundamentals',
    'cybersecurity-basics', 'machine-learning-intro', 'blockchain-fundamentals'
  ];
  
  return examIds.map(examId => ({
    id: examId,
    ...calculateExamStats(examId)
  }));
};

// Log exam statistics for verification (remove in production)
console.log('Exam Statistics:', getAllExamStats());

// Comprehensive Exam Database - 16 Total Exams
// Questions and points are now dynamically calculated from actual question arrays
const sampleExams = [
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Comprehensive JavaScript exam covering beginner to advanced concepts including variables, functions, closures, promises, and more.',
    duration: 90,
    questions: calculateExamStats('js-fundamentals').questions,
    difficulty: 'Mixed',
    category: 'JavaScript',
    points: calculateExamStats('js-fundamentals').points,
    creditCost: getCreditCost('Mixed'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'react-intermediate',
    title: 'React Intermediate',
    description: 'Advanced React concepts including hooks, context, and performance optimization.',
    duration: 90,
    questions: calculateExamStats('react-intermediate').questions,
    difficulty: 'Intermediate',
    category: 'React',
    points: calculateExamStats('react-intermediate').points,
    creditCost: getCreditCost('Intermediate'),
    completed: false,
    score: 85,
    progress: 0 
  },
  {
    id: 'algorithms-data-structures',
    title: 'Algorithms & Data Structures',
    description: 'Problem-solving with common algorithms and data structures.',
    duration: 120,
    questions: calculateExamStats('algorithms-data-structures').questions,
    difficulty: 'Advanced',
    category: 'Computer Science',
    points: calculateExamStats('algorithms-data-structures').points,
    creditCost: getCreditCost('Advanced'),
    completed: false,
    score: 217,
    progress: 0
  },
  {
    id: 'html-css-basics',
    title: 'HTML & CSS Basics',
    description: 'Master the fundamentals of web development with HTML structure and CSS styling.',
    duration: 60,
    questions: calculateExamStats('html-css-basics').questions,
    difficulty: 'Beginner',
    category: 'Web Development',
    points: calculateExamStats('html-css-basics').points,
    creditCost: getCreditCost('Beginner'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'nodejs-backend',
    title: 'Node.js Backend Development',
    description: 'Server-side JavaScript with Node.js, Express, and database integration.',
    duration: 120,
    questions: calculateExamStats('nodejs-backend').questions,
    difficulty: 'Intermediate',
    category: 'Backend',
    points: calculateExamStats('nodejs-backend').points,
    creditCost: getCreditCost('Intermediate'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'python-fundamentals',
    title: 'Python Fundamentals',
    description: 'Learn Python programming from basics to intermediate concepts.',
    duration: 75,
    questions: calculateExamStats('python-fundamentals').questions,
    difficulty: 'Beginner',
    category: 'Python',
    points: calculateExamStats('python-fundamentals').points,
    creditCost: getCreditCost('Beginner'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'sql-database',
    title: 'SQL Database Management',
    description: 'Database design, queries, and optimization with SQL.',
    duration: 90,
    questions: calculateExamStats('sql-database').questions,
    difficulty: 'Intermediate',
    category: 'Database',
    points: calculateExamStats('sql-database').points,
    creditCost: getCreditCost('Intermediate'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'git-version-control',
    title: 'Git Version Control',
    description: 'Master Git commands, branching strategies, and collaborative development.',
    duration: 45,
    questions: calculateExamStats('git-version-control').questions,
    difficulty: 'Beginner',
    category: 'DevOps',
    points: calculateExamStats('git-version-control').points,
    creditCost: getCreditCost('Beginner'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'typescript-advanced',
    title: 'TypeScript Advanced',
    description: 'Advanced TypeScript features, generics, decorators, and type system mastery.',
    duration: 105,
    questions: calculateExamStats('typescript-advanced').questions,
    difficulty: 'Advanced',
    category: 'TypeScript',
    points: calculateExamStats('typescript-advanced').points,
    creditCost: getCreditCost('Advanced'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'system-design',
    title: 'System Design & Architecture',
    description: 'Design scalable systems, microservices, and distributed architectures.',
    duration: 150,
    questions: calculateExamStats('system-design').questions,
    difficulty: 'Advanced',
    category: 'System Design',
    points: calculateExamStats('system-design').points,
    creditCost: getCreditCost('Advanced'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'docker-kubernetes',
    title: 'Docker & Kubernetes',
    description: 'Containerization and orchestration with Docker and Kubernetes.',
    duration: 90,
    questions: calculateExamStats('docker-kubernetes').questions,
    difficulty: 'Intermediate',
    category: 'DevOps',
    points: calculateExamStats('docker-kubernetes').points,
    creditCost: getCreditCost('Intermediate'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'aws-cloud-fundamentals',
    title: 'AWS Cloud Fundamentals',
    description: 'Amazon Web Services basics, EC2, S3, and cloud architecture.',
    duration: 75,
    questions: calculateExamStats('aws-cloud-fundamentals').questions,
    difficulty: 'Intermediate',
    category: 'Cloud Computing',
    points: calculateExamStats('aws-cloud-fundamentals').points,
    creditCost: getCreditCost('Intermediate'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'cybersecurity-basics',
    title: 'Cybersecurity Basics',
    description: 'Fundamental security concepts, threats, and protection strategies.',
    duration: 60,
    questions: calculateExamStats('cybersecurity-basics').questions,
    difficulty: 'Beginner',
    category: 'Security',
    points: calculateExamStats('cybersecurity-basics').points,
    creditCost: getCreditCost('Beginner'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'machine-learning-intro',
    title: 'Machine Learning Introduction',
    description: 'Introduction to ML concepts, algorithms, and data science basics.',
    duration: 120,
    questions: calculateExamStats('machine-learning-intro').questions,
    difficulty: 'Intermediate',
    category: 'Data Science',
    points: calculateExamStats('machine-learning-intro').points,
    creditCost: getCreditCost('Intermediate'),
    completed: false,
    score: null,
    progress: 0
  },
  {
    id: 'blockchain-fundamentals',
    title: 'Blockchain Fundamentals',
    description: 'Understanding blockchain technology, cryptocurrencies, and smart contracts.',
    duration: 80,
    questions: calculateExamStats('blockchain-fundamentals').questions,
    difficulty: 'Intermediate',
    category: 'Blockchain',
    points: calculateExamStats('blockchain-fundamentals').points,
    creditCost: getCreditCost('Intermediate'),
    completed: false,
    score: null,
    progress: 0
  }
];


const ExamsPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'exam'>('list');
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [isDeductingCredits, setIsDeductingCredits] = useState(false);
  const { credits, refresh: refreshCredits } = useCredits();

  const handleStartExamClick = (exam: any) => {
    setSelectedExam(exam);
    setShowCreditModal(true);
  };

  const confirmStartExam = async () => {
    if (!selectedExam) return;
    
    setIsDeductingCredits(true);
    
    try {
      // Get current user from Supabase auth
      const { data: { user } } = await supabase.auth.getUser();
      const currentUserId = user?.id || '550e8400-e29b-41d4-a716-446655440000';
      
      console.log('Starting exam for user:', currentUserId);
      console.log('Exam credit cost:', selectedExam.creditCost);
      console.log('Current credits before deduction:', credits);
      
      // Deduct credits IMMEDIATELY when starting exam
      const result = await deductCredits(currentUserId, selectedExam.creditCost);
      
      console.log('Credit deduction result:', result);
      
      if (!result.success) {
        alert(result.error || 'Failed to deduct credits');
        setIsDeductingCredits(false);
        setShowCreditModal(false);
        return;
      }
      
      // Refresh credits in context to show updated balance
      await refreshCredits();
      
      console.log('Credits after deduction:', result.newBalance);
      
      // Start the exam
      await startExam(selectedExam);
      
      setShowCreditModal(false);
      setSelectedExam(null);
    } catch (error) {
      console.error('Error starting exam:', error);
      alert('An error occurred while starting the exam. Please try again.');
    } finally {
      setIsDeductingCredits(false);
    }
  };

  const startExam = async (exam: any) => {
    // Get current user from Supabase auth
    const { data: { user } } = await supabase.auth.getUser();
    const currentUserId = user?.id || '550e8400-e29b-41d4-a716-446655440000';
    
    // Anti-cheating: Track question access order
    const questionAccessOrder: number[] = [0]; // Start with first question
    
    // Get the correct questions for this exam
    const examQuestions = getQuestionsForExam(exam.id);
    
    // Anti-cheating: Function to check if question can be accessed
    const canAccessQuestion = (questionIndex: number): boolean => {
      // Can only access current question and previous questions
      // OR if they've answered the previous question
      if (questionIndex === 0) return true; // First question always accessible
      
      // Check if previous question was answered
      const previousQuestion = examQuestions[questionIndex - 1];
      const hasAnsweredPrevious = session?.answers[previousQuestion.id] !== undefined;
      
      return questionIndex <= (session?.currentQuestionIndex || 0) || hasAnsweredPrevious;
    };

    const session: ExamSession = {
      id: `session-${Date.now()}`,
      examId: exam.id,
      userId: currentUserId,
      startTime: new Date(),
      timeLimit: exam.duration,
      questions: examQuestions, // Using correct questions for the exam
      currentQuestionIndex: 0,
      answers: {},
      flaggedQuestions: new Set(),
      isSubmitted: false,
      maxScore: exam.points,
      // Anti-cheating properties
      questionAccessOrder,
      canAccessQuestion
    };
    
    setExamSession(session);
    setCurrentView('exam');
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    if (!examSession) return;
    
    setExamSession(prev => {
      const newAnswers = {
        ...prev!.answers,
        [questionId]: answer
      };
      
      // Update question access order when answering
      const currentQuestionIndex = prev!.questions.findIndex(q => q.id === questionId);
      const newQuestionAccessOrder = [...prev!.questionAccessOrder];
      
      // Add next question to accessible list if not already there
      if (currentQuestionIndex < prev!.questions.length - 1) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (!newQuestionAccessOrder.includes(nextQuestionIndex)) {
          newQuestionAccessOrder.push(nextQuestionIndex);
        }
      }
      
      // Update canAccessQuestion function
      const updatedCanAccessQuestion = (questionIndex: number): boolean => {
        if (questionIndex === 0) return true;
        
        // Check if previous question was answered
        const previousQuestion = prev!.questions[questionIndex - 1];
        const hasAnsweredPrevious = newAnswers[previousQuestion.id] !== undefined;
        
        return questionIndex <= prev!.currentQuestionIndex || hasAnsweredPrevious;
      };
      
      return {
        ...prev!,
        answers: newAnswers,
        questionAccessOrder: newQuestionAccessOrder,
        canAccessQuestion: updatedCanAccessQuestion
      };
    });
  };

  const handleQuestionChange = (index: number) => {
    if (!examSession) return;
    
    setExamSession(prev => ({
      ...prev!,
      currentQuestionIndex: index
    }));
  };

  const handleFlagQuestion = (questionId: string) => {
    if (!examSession) return;
    
    setExamSession(prev => {
      const newFlagged = new Set(prev!.flaggedQuestions);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      return {
        ...prev!,
        flaggedQuestions: newFlagged
      };
    });
  };

  const handleSubmitExam = async () => {
    if (!examSession) return;
    
    // Calculate score using centralized scoring function
    const examScore: ExamScore = examResultsService.calculateExamScore(examSession);
    const score = examScore.earnedPoints;
    const passed = examScore.passed;

    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - examSession.startTime.getTime()) / (1000 * 60)); // in minutes
    const maxScore = examScore.totalPoints;

    // Update exam session state
    setExamSession(prev => ({
      ...prev!,
      endTime,
      isSubmitted: true,
      score
    }));

    // Save to database
    try {
      const certificateId = examResultsService.generateCertificateId(examSession.examId, examSession.userId);
      
      const examResult = await examResultsService.saveExamResult({
        userId: examSession.userId,
        examId: examSession.examId,
        examTitle: examSession.questions[0]?.category || 'Programming Exam', // Use first question's category as exam title
        startTime: examSession.startTime,
        endTime,
        timeSpent,
        score,
        maxScore,
        passed,
        answers: examSession.answers,
        questions: examSession.questions,
        certificateId: passed ? certificateId : undefined
      });

      console.log('Exam result saved:', examResult);
      
      // Show success message
      alert(`Exam completed! Score: ${score}/${maxScore} (${Math.round((score/maxScore)*100)}%) - ${passed ? 'PASSED' : 'FAILED'}`);
      
    } catch (error) {
      console.error('Error saving exam result:', error);
      console.log('Database save failed. Please set up the database using DATABASE_SETUP.md');
      // Still show results even if database save fails
      alert(`Exam completed! Score: ${score}/${maxScore} (${Math.round((score/maxScore)*100)}%) - ${passed ? 'PASSED' : 'FAILED'}\n\nNote: Results not saved to database. Please set up the database to enable persistence.`);
    }
    
    // Return to exam list
    setCurrentView('list');
    setExamSession(null);
  };

  const handleCloseExam = () => {
    // Return to exam list without saving progress
    setCurrentView('list');
    setExamSession(null);
  };


  if (currentView === 'exam' && examSession) {
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

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Exams</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Test your programming skills and earn certifications</p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-center sm:text-right">
            <div className="text-lg sm:text-2xl font-bold text-yellow-600 flex items-center justify-center sm:justify-end gap-1">
              <Coins className="h-5 w-5 sm:h-6 sm:w-6" />
              {credits}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Credits Available</div>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">15</div>
            <div className="text-xs sm:text-sm text-gray-600">Available Exams</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sampleExams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg sm:text-xl leading-tight">{exam.title}</CardTitle>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">{exam.description}</p>
                </div>
                <Badge 
                  variant={exam.difficulty === 'Beginner' ? 'default' : 
                          exam.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                  className="text-xs flex-shrink-0"
                >
                  {exam.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{exam.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Target className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{exam.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{exam.points} points</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Coins className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                    <span className="font-medium text-yellow-600 truncate">{exam.creditCost} credits</span>
                  </div>
                </div>

                {exam.completed ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium">Completed</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                        <span className="text-xs sm:text-sm font-bold">{exam.score}%</span>
                      </div>
                    </div>
                    <Progress value={100} className="h-1.5 sm:h-2" />
                    <Button variant="outline" className="w-full h-8 sm:h-10 text-xs sm:text-sm" disabled>
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      Completed
                    </Button>
                  </div>
                ) : exam.progress > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium">In Progress</span>
                      <span className="text-xs sm:text-sm text-gray-600">{exam.progress}%</span>
                    </div>
                    <Progress value={exam.progress} className="h-1.5 sm:h-2" />
                    <Button 
                      onClick={() => handleStartExamClick(exam)} 
                      className="w-full h-8 sm:h-10 text-xs sm:text-sm"
                      disabled={credits < exam.creditCost}
                    >
                      <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      Continue Exam
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleStartExamClick(exam)} 
                    className="w-full h-8 sm:h-10 text-xs sm:text-sm"
                    disabled={credits < exam.creditCost}
                  >
                    <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    Start Exam
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Credit Confirmation Modal */}
      <Dialog open={showCreditModal} onOpenChange={setShowCreditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              Credit Deduction Required
            </DialogTitle>
            <DialogDescription>
              Starting this exam will deduct credits from your account.
            </DialogDescription>
          </DialogHeader>
          
          {selectedExam && (
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>{selectedExam.title}</strong> requires <strong>{selectedExam.creditCost} credits</strong> to start.
                </AlertDescription>
              </Alert>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Your current credits:</span>
                  <span className="font-semibold text-gray-900">{credits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Credits to deduct:</span>
                  <span className="font-semibold text-red-600">-{selectedExam.creditCost}</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Remaining credits:</span>
                  <span className="font-semibold text-gray-900">{credits - selectedExam.creditCost}</span>
                </div>
              </div>
              
              {credits < selectedExam.creditCost && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Insufficient credits! You need {selectedExam.creditCost - credits} more credits to start this exam.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowCreditModal(false)}
              disabled={isDeductingCredits}
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmStartExam}
              disabled={isDeductingCredits || !selectedExam || credits < selectedExam.creditCost}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {isDeductingCredits ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Coins className="h-4 w-4 mr-2" />
                  Deduct Credits & Start
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamsPage;
