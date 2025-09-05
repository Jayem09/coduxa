import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
// import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import CodeEditor from './CodeEditor';
import type { Question, TestCase } from './ExamInterface';

interface QuestionBankProps {
  question: Question;
  answer: any;
  onAnswerChange: (answer: any) => void;
}

const QuestionBank: React.FC<QuestionBankProps> = ({
  question,
  answer,
  onAnswerChange
}) => {
  const [localAnswer, setLocalAnswer] = useState(answer);
  // const [showHint, setShowHint] = useState(false);
  const [testResults, setTestResults] = useState<Array<{
    testCase: TestCase;
    passed: boolean;
    actualOutput?: string;
    error?: string;
  }>>([]);

  useEffect(() => {
    setLocalAnswer(answer);
  }, [answer]);

  const handleAnswerChange = (newAnswer: any) => {
    setLocalAnswer(newAnswer);
    onAnswerChange(newAnswer);
  };

  const handleMultipleChoiceChange = (value: string) => {
    handleAnswerChange(value);
  };

  // const handleMultipleSelectChange = (option: string, checked: boolean) => {
  //   const currentAnswers = Array.isArray(localAnswer) ? localAnswer : [];
  //   let newAnswers;
  //   
  //   if (checked) {
  //     newAnswers = [...currentAnswers, option];
  //   } else {
  //     newAnswers = currentAnswers.filter((ans: string) => ans !== option);
  //   }
  //   
  //   handleAnswerChange(newAnswers);
  // };

  const handleCodeChange = (code: string) => {
    handleAnswerChange(code);
  };

  const handleTextChange = (text: string) => {
    handleAnswerChange(text);
  };

  const runTestCases = async () => {
    if (!localAnswer || question.type !== 'coding') return;

    const results = question.testCases?.map(testCase => {
      try {
        // This is a simplified test runner - in a real implementation,
        // you would send the code to a secure execution environment
        const actualOutput = executeCode(localAnswer, testCase.input);
        const passed = actualOutput === testCase.expectedOutput;
        
        return {
          testCase,
          passed,
          actualOutput
        };
      } catch (error) {
        return {
          testCase,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }) || [];

    setTestResults(results);
  };

  // Simplified code execution - in production, this should be done server-side
  const executeCode = (code: string, input: string): string => {
    // This is a placeholder - real implementation would use a secure sandbox
    try {
      // Basic JavaScript execution for demonstration
      const func = new Function('input', `
        ${code}
        return main ? main(input) : solution(input);
      `);
      return String(func(input));
    } catch (error) {
      throw new Error('Code execution failed');
    }
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      <RadioGroup
        value={localAnswer || ''}
        onValueChange={handleMultipleChoiceChange}
        className="space-y-3"
      >
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem 
              value={option} 
              id={`option-${index}`}
              className="border-2 border-gray-400 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm font-medium">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  // const renderMultipleSelect = () => (
  //   <div className="space-y-3">
  //     {question.options?.map((option, index) => (
  //       <div key={index} className="flex items-center space-x-2">
  //         <Checkbox
  //           id={`option-${index}`}
  //           checked={Array.isArray(localAnswer) ? localAnswer.includes(option) : false}
  //           onCheckedChange={(checked) => handleMultipleSelectChange(option, checked as boolean)}
  //         />
  //         <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
  //           {option}
  //         </Label>
  //       </div>
  //     ))}
  //   </div>
  // );

  const renderTrueFalse = () => (
    <div className="space-y-3">
      <RadioGroup
        value={localAnswer || ''}
        onValueChange={handleMultipleChoiceChange}
        className="space-y-3"
      >
        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <RadioGroupItem 
            value="true" 
            id="true"
            className="border-2 border-gray-400 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
          />
          <Label htmlFor="true" className="cursor-pointer text-sm font-medium">True</Label>
        </div>
        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <RadioGroupItem 
            value="false" 
            id="false"
            className="border-2 border-gray-400 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
          />
          <Label htmlFor="false" className="cursor-pointer text-sm font-medium">False</Label>
        </div>
      </RadioGroup>
    </div>
  );

  const renderFillBlank = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fill-blank-answer">Your Answer:</Label>
        <Input
          id="fill-blank-answer"
          value={localAnswer || ''}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Enter your answer here..."
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderCoding = () => (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Your Solution:</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={runTestCases}
            disabled={!localAnswer}
          >
            Run Tests
          </Button>
        </div>
        <CodeEditor
          value={localAnswer || question.codeTemplate || ''}
          onChange={handleCodeChange}
          language="javascript"
          height="300px"
        />
      </div>

      {testResults.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-3">Test Results:</h4>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <Card key={index} className={`p-3 ${
                result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.passed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="font-medium">
                    Test Case {index + 1} - {result.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>Input:</strong> {result.testCase.input}</p>
                  <p><strong>Expected:</strong> {result.testCase.expectedOutput}</p>
                  {result.actualOutput && (
                    <p><strong>Actual:</strong> {result.actualOutput}</p>
                  )}
                  {result.error && (
                    <p className="text-red-600"><strong>Error:</strong> {result.error}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'coding':
        return renderCoding();
      case 'true-false':
        return renderTrueFalse();
      case 'fill-blank':
        return renderFillBlank();
      default:
        return (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Unsupported question type: {question.type}
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{question.type.replace('-', ' ').toUpperCase()}</Badge>
          <Badge variant="secondary">{question.difficulty}</Badge>
          <Badge variant="outline">{question.points} points</Badge>
        </div>
        {question.timeLimit && (
          <div className="text-sm text-gray-600">
            Time limit: {question.timeLimit} minutes
          </div>
        )}
      </div>

      {renderQuestionContent()}

      {question.tags.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Tags:</span>
          <div className="flex gap-1">
            {question.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {localAnswer && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Answer saved</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
