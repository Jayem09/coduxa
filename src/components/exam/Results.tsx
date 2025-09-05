import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  Download,
  Share2,
  RotateCcw,
  Eye,
  Star,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import type { ExamSession, Question } from './ExamInterface';
import { examResultsService, type ExamScore } from '../../services/examResultsService';

interface ResultsProps {
  examSession: ExamSession;
  onViewDetailed: () => void;
  onRetake?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

interface ScoreBreakdown {
  total: number;
  earned: number;
  percentage: number;
  grade: string;
  passed: boolean;
}

interface CategoryScore {
  category: string;
  total: number;
  earned: number;
  percentage: number;
}

interface DifficultyScore {
  difficulty: string;
  total: number;
  earned: number;
  percentage: number;
}

const Results: React.FC<ResultsProps> = ({
  examSession,
  onViewDetailed,
  onRetake,
  onDownload,
  onShare
}) => {
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown>({
    total: 0,
    earned: 0,
    percentage: 0,
    grade: 'F',
    passed: false
  });
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([]);
  const [difficultyScores, setDifficultyScore] = useState<DifficultyScore[]>([]);
  const [timeAnalysis, setTimeAnalysis] = useState({
    totalTime: 0,
    averageTimePerQuestion: 0,
    timeEfficiency: 'Good'
  });

  useEffect(() => {
    calculateResults();
  }, [examSession]);

  const calculateResults = () => {
    // Use centralized scoring function with 70% passing threshold
    const examScore: ExamScore = examResultsService.calculateExamScore(examSession);

    setScoreBreakdown({
      total: examScore.totalPoints,
      earned: examScore.earnedPoints,
      percentage: examScore.percentage,
      grade: examScore.grade,
      passed: examScore.passed
    });

    // Calculate category scores
    const categoryMap = new Map<string, { total: number; earned: number }>();
    examSession.questions.forEach(question => {
      const category = question.category;
      const isCorrect = isQuestionCorrect(question);
      
      if (!categoryMap.has(category)) {
        categoryMap.set(category, { total: 0, earned: 0 });
      }
      
      const current = categoryMap.get(category)!;
      current.total += question.points;
      if (isCorrect) {
        current.earned += question.points;
      }
    });

    const categoryScoresArray = Array.from(categoryMap.entries()).map(([category, scores]) => ({
      category,
      total: scores.total,
      earned: scores.earned,
      percentage: (scores.earned / scores.total) * 100
    }));

    setCategoryScores(categoryScoresArray);

    // Calculate difficulty scores
    const difficultyMap = new Map<string, { total: number; earned: number }>();
    examSession.questions.forEach(question => {
      const difficulty = question.difficulty;
      const isCorrect = isQuestionCorrect(question);
      
      if (!difficultyMap.has(difficulty)) {
        difficultyMap.set(difficulty, { total: 0, earned: 0 });
      }
      
      const current = difficultyMap.get(difficulty)!;
      current.total += question.points;
      if (isCorrect) {
        current.earned += question.points;
      }
    });

    const difficultyScoresArray = Array.from(difficultyMap.entries()).map(([difficulty, scores]) => ({
      difficulty,
      total: scores.total,
      earned: scores.earned,
      percentage: (scores.earned / scores.total) * 100
    }));

    setDifficultyScore(difficultyScoresArray);

    // Calculate time analysis
    const endTime = examSession.endTime || new Date();
    const totalTime = Math.floor((endTime.getTime() - examSession.startTime.getTime()) / 1000 / 60); // minutes
    const averageTimePerQuestion = totalTime / examSession.questions.length;
    
    let timeEfficiency = 'Good';
    if (averageTimePerQuestion > 10) timeEfficiency = 'Slow';
    else if (averageTimePerQuestion < 3) timeEfficiency = 'Fast';

    setTimeAnalysis({
      totalTime,
      averageTimePerQuestion,
      timeEfficiency
    });
  };

  const isQuestionCorrect = (question: Question): boolean => {
    const answer = examSession.answers[question.id];
    if (answer === undefined) return false;

    // This is a simplified check - in a real implementation,
    // you would have more sophisticated answer validation
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      return answer === question.correctAnswer;
    } else if (question.type === 'fill-blank') {
      return answer.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim();
    } else if (question.type === 'coding') {
      // For coding questions, you would run test cases
      return question.testCases?.every(() => {
        // Simplified - in reality, you'd execute the code
        return true; // Placeholder
      }) || false;
    }

    return false;
  };


  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 90) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (percentage >= 80) return <Star className="h-6 w-6 text-blue-500" />;
    if (percentage >= 70) return <CheckCircle className="h-6 w-6 text-green-500" />;
    if (percentage >= 60) return <AlertCircle className="h-6 w-6 text-orange-500" />;
    return <XCircle className="h-6 w-6 text-red-500" />;
  };

  const getTrendIcon = (percentage: number) => {
    if (percentage >= 80) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (percentage >= 60) return <Minus className="h-4 w-4 text-yellow-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Results</h1>
          <p className="text-gray-600">
            Completed on {examSession.endTime?.toLocaleDateString()} at {examSession.endTime?.toLocaleTimeString()}
          </p>
        </div>

        {/* Overall Score */}
        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {getPerformanceIcon(scoreBreakdown.percentage)}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Overall Score</h2>
                  <p className="text-gray-600">Your exam performance</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600">
                  {scoreBreakdown.earned}/{scoreBreakdown.total}
                </div>
                <div className="text-lg text-gray-600">points</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {scoreBreakdown.percentage.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Percentage</div>
                <Progress value={scoreBreakdown.percentage} className="mt-2" />
              </div>
              
              <div className="text-center">
                <Badge className={`text-lg px-4 py-2 ${getGradeColor(scoreBreakdown.grade)}`}>
                  {scoreBreakdown.grade}
                </Badge>
                <div className="text-sm text-gray-600 mt-1">Grade</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {scoreBreakdown.passed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                  <span className="text-lg font-semibold">
                    {scoreBreakdown.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryScores.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.category}</span>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(category.percentage)}
                        <span className="text-sm font-semibold">
                          {category.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                    <div className="text-xs text-gray-600">
                      {category.earned}/{category.total} points
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Difficulty Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Performance by Difficulty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {difficultyScores.map((difficulty, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="capitalize">
                        {difficulty.difficulty}
                      </Badge>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(difficulty.percentage)}
                        <span className="text-sm font-semibold">
                          {difficulty.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <Progress value={difficulty.percentage} className="h-2" />
                    <div className="text-xs text-gray-600">
                      {difficulty.earned}/{difficulty.total} points
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Time Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {timeAnalysis.totalTime} min
                </div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {timeAnalysis.averageTimePerQuestion.toFixed(1)} min
                </div>
                <div className="text-sm text-gray-600">Avg per Question</div>
              </div>
              
              <div className="text-center">
                <Badge 
                  variant="outline" 
                  className={`${
                    timeAnalysis.timeEfficiency === 'Good' ? 'text-green-600 border-green-300' :
                    timeAnalysis.timeEfficiency === 'Fast' ? 'text-blue-600 border-blue-300' :
                    'text-orange-600 border-orange-300'
                  }`}
                >
                  {timeAnalysis.timeEfficiency}
                </Badge>
                <div className="text-sm text-gray-600 mt-1">Efficiency</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={onViewDetailed} size="lg" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Detailed Results
          </Button>
          
          {onRetake && (
            <Button onClick={onRetake} variant="outline" size="lg" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Retake Exam
            </Button>
          )}
          
          {onDownload && (
            <Button onClick={onDownload} variant="outline" size="lg" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Results
            </Button>
          )}
          
          {onShare && (
            <Button onClick={onShare} variant="outline" size="lg" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
          )}
        </div>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scoreBreakdown.percentage >= 90 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Excellent Performance!</span>
                  </div>
                  <p className="text-green-700">
                    Outstanding work! You've demonstrated mastery of the material. 
                    Consider taking on more challenging topics or helping others learn.
                  </p>
                </div>
              )}
              
              {scoreBreakdown.percentage >= 80 && scoreBreakdown.percentage < 90 && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Great Job!</span>
                  </div>
                  <p className="text-blue-700">
                    Strong performance! You have a solid understanding of the concepts. 
                    Review any missed questions to strengthen your knowledge further.
                  </p>
                </div>
              )}
              
              {scoreBreakdown.percentage >= 70 && scoreBreakdown.percentage < 80 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Good Work!</span>
                  </div>
                  <p className="text-yellow-700">
                    You passed the exam! Focus on the areas where you lost points 
                    to improve your understanding and performance in future exams.
                  </p>
                </div>
              )}
              
              {scoreBreakdown.percentage < 70 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-red-800">Keep Learning!</span>
                  </div>
                  <p className="text-red-700">
                    Don't be discouraged! Review the material thoroughly, 
                    practice more, and consider retaking the exam when you feel ready.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
