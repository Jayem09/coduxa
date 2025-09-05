import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Clock,
  Target,
  Code2,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  EyeOff,
  Download,
  Share2,
  BookOpen,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import type { ExamSession, Question } from './ExamInterface';

interface ExamResultsProps {
  examSession: ExamSession;
  onBack: () => void;
}

interface QuestionResult {
  question: Question;
  answer: any;
  isCorrect: boolean;
  pointsEarned: number;
  pointsTotal: number;
  timeSpent?: number;
  explanation?: string;
  hints?: string[];
}

interface DetailedAnalysis {
  questionResults: QuestionResult[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  timeAnalysis: {
    totalTime: number;
    averageTimePerQuestion: number;
    slowestQuestions: QuestionResult[];
    fastestQuestions: QuestionResult[];
  };
  categoryAnalysis: {
    [category: string]: {
      total: number;
      earned: number;
      percentage: number;
      questions: QuestionResult[];
    };
  };
  difficultyAnalysis: {
    [difficulty: string]: {
      total: number;
      earned: number;
      percentage: number;
      questions: QuestionResult[];
    };
  };
}

const ExamResults: React.FC<ExamResultsProps> = ({
  examSession,
  onBack
}) => {
  const [analysis, setAnalysis] = useState<DetailedAnalysis | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [, setSelectedQuestion] = useState<QuestionResult | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    generateDetailedAnalysis();
  }, [examSession]);

  const generateDetailedAnalysis = () => {
    const questionResults: QuestionResult[] = examSession.questions.map(question => {
      const answer = examSession.answers[question.id];
      const isCorrect = isQuestionCorrect(question, answer);
      const pointsEarned = isCorrect ? question.points : 0;
      
      return {
        question,
        answer,
        isCorrect,
        pointsEarned,
        pointsTotal: question.points,
        explanation: generateExplanation(question, answer, isCorrect),
        hints: generateHints(question)
      };
    });

    const strengths = identifyStrengths(questionResults);
    const weaknesses = identifyWeaknesses(questionResults);
    const recommendations = generateRecommendations(questionResults, strengths, weaknesses);

    const timeAnalysis = analyzeTimeSpent(questionResults);
    const categoryAnalysis = analyzeByCategory(questionResults);
    const difficultyAnalysis = analyzeByDifficulty(questionResults);

    setAnalysis({
      questionResults,
      strengths,
      weaknesses,
      recommendations,
      timeAnalysis,
      categoryAnalysis,
      difficultyAnalysis
    });
  };

  const isQuestionCorrect = (question: Question, answer: any): boolean => {
    if (answer === undefined) return false;

    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
        return answer === question.correctAnswer;
      case 'fill-blank':
        return answer.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim();
      case 'coding':
        // Simplified - in reality, you'd run test cases
        return question.testCases?.every(() => {
          // Placeholder for actual code execution
          return true;
        }) || false;
      default:
        return false;
    }
  };

  const generateExplanation = (question: Question, answer: any, isCorrect: boolean): string => {
    if (isCorrect) {
      return `Correct! ${question.correctAnswer} is the right answer.`;
    } else {
      return `Incorrect. The correct answer is ${question.correctAnswer}. Your answer was ${answer || 'not provided'}.`;
    }
  };

  const generateHints = (question: Question): string[] => {
    // Generate contextual hints based on question type and content
    const hints: string[] = [];
    
    if (question.type === 'coding') {
      hints.push('Review the problem requirements carefully');
      hints.push('Test your solution with the provided test cases');
      hints.push('Consider edge cases and error handling');
    } else if (question.type === 'multiple-choice') {
      hints.push('Eliminate obviously wrong options first');
      hints.push('Look for keywords in the question');
      hints.push('Consider the context of the question');
    }
    
    return hints;
  };

  const identifyStrengths = (results: QuestionResult[]): string[] => {
    const strengths: string[] = [];
    const correctResults = results.filter(r => r.isCorrect);
    
    if (correctResults.length > 0) {
      const categories = [...new Set(correctResults.map(r => r.question.category))];
      strengths.push(`Strong performance in: ${categories.join(', ')}`);
    }
    
    const difficulties = [...new Set(correctResults.map(r => r.question.difficulty))];
    if (difficulties.includes('hard')) {
      strengths.push('Excellent problem-solving skills on difficult questions');
    }
    
    return strengths;
  };

  const identifyWeaknesses = (results: QuestionResult[]): string[] => {
    const weaknesses: string[] = [];
    const incorrectResults = results.filter(r => !r.isCorrect);
    
    if (incorrectResults.length > 0) {
      const categories = [...new Set(incorrectResults.map(r => r.question.category))];
      weaknesses.push(`Areas needing improvement: ${categories.join(', ')}`);
    }
    
    const unansweredCount = results.filter(r => r.answer === undefined).length;
    if (unansweredCount > 0) {
      weaknesses.push(`${unansweredCount} questions were not answered`);
    }
    
    return weaknesses;
  };

  const generateRecommendations = (results: QuestionResult[], _strengths: string[], weaknesses: string[]): string[] => {
    const recommendations: string[] = [];
    
    if (weaknesses.length > 0) {
      recommendations.push('Review the topics where you struggled and practice more problems');
    }
    
    const codingQuestions = results.filter(r => r.question.type === 'coding' && !r.isCorrect);
    if (codingQuestions.length > 0) {
      recommendations.push('Practice coding problems and algorithm design');
    }
    
    recommendations.push('Take practice exams to improve time management');
    recommendations.push('Review fundamental concepts before attempting advanced topics');
    
    return recommendations;
  };

  const analyzeTimeSpent = (results: QuestionResult[]) => {
    const endTime = examSession.endTime || new Date();
    const totalTime = Math.floor((endTime.getTime() - examSession.startTime.getTime()) / 1000 / 60);
    const averageTimePerQuestion = totalTime / results.length;
    
    // Sort by time spent (simplified - in reality, you'd track individual question times)
    const sortedResults = [...results].sort((_a, _b) => {
      // Placeholder sorting - in reality, you'd use actual time data
      return Math.random() - 0.5;
    });
    
    return {
      totalTime,
      averageTimePerQuestion,
      slowestQuestions: sortedResults.slice(0, 3),
      fastestQuestions: sortedResults.slice(-3)
    };
  };

  const analyzeByCategory = (results: QuestionResult[]) => {
    const categoryMap: { [key: string]: any } = {};
    
    results.forEach(result => {
      const category = result.question.category;
      if (!categoryMap[category]) {
        categoryMap[category] = {
          total: 0,
          earned: 0,
          percentage: 0,
          questions: []
        };
      }
      
      categoryMap[category].total += result.pointsTotal;
      categoryMap[category].earned += result.pointsEarned;
      categoryMap[category].questions.push(result);
    });
    
    // Calculate percentages
    Object.keys(categoryMap).forEach(category => {
      const data = categoryMap[category];
      data.percentage = (data.earned / data.total) * 100;
    });
    
    return categoryMap;
  };

  const analyzeByDifficulty = (results: QuestionResult[]) => {
    const difficultyMap: { [key: string]: any } = {};
    
    results.forEach(result => {
      const difficulty = result.question.difficulty;
      if (!difficultyMap[difficulty]) {
        difficultyMap[difficulty] = {
          total: 0,
          earned: 0,
          percentage: 0,
          questions: []
        };
      }
      
      difficultyMap[difficulty].total += result.pointsTotal;
      difficultyMap[difficulty].earned += result.pointsEarned;
      difficultyMap[difficulty].questions.push(result);
    });
    
    // Calculate percentages
    Object.keys(difficultyMap).forEach(difficulty => {
      const data = difficultyMap[difficulty];
      data.percentage = (data.earned / data.total) * 100;
    });
    
    return difficultyMap;
  };

  const getQuestionIcon = (question: Question) => {
    switch (question.type) {
      case 'coding':
        return <Code2 className="h-4 w-4" />;
      case 'multiple-choice':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (percentage: number) => {
    if (percentage >= 80) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (percentage >= 60) return <Minus className="h-4 w-4 text-yellow-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating detailed analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex items-center gap-2"
            >
              {showAnswers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showAnswers ? 'Hide' : 'Show'} Answers
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Performance Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Questions</span>
                      <span className="font-semibold">{analysis.questionResults.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Correct Answers</span>
                      <span className="font-semibold text-green-600">
                        {analysis.questionResults.filter(r => r.isCorrect).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Points Earned</span>
                      <span className="font-semibold">
                        {analysis.questionResults.reduce((sum, r) => sum + r.pointsEarned, 0)}/
                        {analysis.questionResults.reduce((sum, r) => sum + r.pointsTotal, 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Time Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Time</span>
                      <span className="font-semibold">{analysis.timeAnalysis.totalTime} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Avg per Question</span>
                      <span className="font-semibold">
                        {analysis.timeAnalysis.averageTimePerQuestion.toFixed(1)} min
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Efficiency</span>
                      <Badge variant="outline">Good</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strengths & Weaknesses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                      <ul className="text-sm space-y-1">
                        {analysis.strengths.map((strength, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Areas to Improve</h4>
                      <ul className="text-sm space-y-1">
                        {analysis.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {analysis.questionResults.map((result, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-colors ${
                    result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                  onClick={() => setSelectedQuestion(result)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getQuestionIcon(result.question)}
                        <div>
                          <h3 className="font-semibold">Question {index + 1}</h3>
                          <p className="text-sm text-gray-600">{result.question.title}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="capitalize">
                          {result.question.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {result.pointsEarned}/{result.pointsTotal} pts
                        </Badge>
                        {result.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </div>
                    
                    {showAnswers && (
                      <div className="mt-3 p-3 bg-white rounded border">
                        <p className="text-sm text-gray-700">{result.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analysis.categoryAnalysis).map(([category, data]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{category}</span>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(data.percentage)}
                            <span className="text-sm font-semibold">
                              {data.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {data.earned}/{data.total} points
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Difficulty Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Difficulty</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analysis.difficultyAnalysis).map(([difficulty, data]) => (
                      <div key={difficulty} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="capitalize">
                            {difficulty}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(data.percentage)}
                            <span className="text-sm font-semibold">
                              {data.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {data.earned}/{data.total} points
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Study Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                      <p className="text-blue-800">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExamResults;
