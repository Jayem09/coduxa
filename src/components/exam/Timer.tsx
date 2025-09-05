import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Clock, 
  Pause, 
  Play, 
  RotateCcw, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface TimerProps {
  timeLimit: number; // in minutes
  startTime: Date;
  onTimeUp: () => void;
  onWarning?: (timeRemaining: number) => void;
  onCritical?: (timeRemaining: number) => void;
  showControls?: boolean;
  autoStart?: boolean;
  warningThreshold?: number; // minutes before warning
  criticalThreshold?: number; // minutes before critical
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  percentage: number;
}

const Timer: React.FC<TimerProps> = ({
  timeLimit,
  startTime,
  onTimeUp,
  onWarning,
  onCritical,
  showControls = false,
  autoStart = true,
  warningThreshold = 10, // 10 minutes
  criticalThreshold = 5   // 5 minutes
}) => {
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    percentage: 100
  });
  const [hasWarned, setHasWarned] = useState(false);
  const [hasCritical, setHasCritical] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const totalTimeInSeconds = timeLimit * 60;

  const calculateTimeRemaining = useCallback(() => {
    if (!isRunning || isPaused) return;

    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const remaining = Math.max(0, totalTimeInSeconds - elapsed);
    
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;
    const percentage = (remaining / totalTimeInSeconds) * 100;

    const timeData = {
      hours,
      minutes,
      seconds,
      totalSeconds: remaining,
      percentage
    };

    setTimeRemaining(timeData);

    // Check for warnings
    if (remaining <= criticalThreshold * 60 && !hasCritical) {
      setHasCritical(true);
      onCritical?.(remaining);
    } else if (remaining <= warningThreshold * 60 && !hasWarned) {
      setHasWarned(true);
      onWarning?.(remaining);
    }

    // Check if time is up
    if (remaining === 0 && !isExpired) {
      setIsExpired(true);
      setIsRunning(false);
      onTimeUp();
    }
  }, [
    isRunning,
    isPaused,
    startTime,
    totalTimeInSeconds,
    warningThreshold,
    criticalThreshold,
    hasWarned,
    hasCritical,
    isExpired,
    onWarning,
    onCritical,
    onTimeUp
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(calculateTimeRemaining, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, calculateTimeRemaining]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setHasWarned(false);
    setHasCritical(false);
    setIsExpired(false);
    setTimeRemaining({
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      percentage: 100
    });
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (isExpired) return 'text-red-600';
    if (hasCritical) return 'text-red-500';
    if (hasWarned) return 'text-orange-500';
    return 'text-green-600';
  };

  // const getProgressColor = () => {
  //   if (isExpired) return 'bg-red-500';
  //   if (hasCritical) return 'bg-red-400';
  //   if (hasWarned) return 'bg-orange-400';
  //   return 'bg-green-500';
  // };

  const getStatusIcon = () => {
    if (isExpired) return <XCircle className="h-5 w-5 text-red-600" />;
    if (hasCritical) return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (hasWarned) return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    return <CheckCircle className="h-5 w-5 text-green-600" />;
  };

  const getStatusText = () => {
    if (isExpired) return 'Time Expired';
    if (hasCritical) return 'Critical Time';
    if (hasWarned) return 'Warning';
    return 'On Track';
  };

  return (
    <div className="space-y-4">
      <Card className={`border-2 shadow-lg ${
        isExpired ? 'border-red-500 bg-red-50' :
        hasCritical ? 'border-red-400 bg-red-50' :
        hasWarned ? 'border-orange-400 bg-orange-50' :
        'border-green-500 bg-green-50'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Exam Timer</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className={`text-sm font-medium ${
                isExpired ? 'text-red-600' :
                hasCritical ? 'text-red-500' :
                hasWarned ? 'text-orange-500' :
                'text-green-600'
              }`}>
                {getStatusText()}
              </span>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className={`text-4xl font-mono font-bold ${getTimerColor()} mb-2`}>
              {formatTime(timeRemaining.hours, timeRemaining.minutes, timeRemaining.seconds)}
            </div>
            <div className="text-sm text-gray-600">
              {isExpired ? 'Exam time has ended' : 
               hasCritical ? 'Less than 5 minutes remaining' :
               hasWarned ? 'Less than 10 minutes remaining' :
               'Time remaining'}
            </div>
          </div>

          <div className="mb-4">
            <Progress 
              value={timeRemaining.percentage} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>{Math.round(timeRemaining.percentage)}% remaining</span>
              <span>{timeLimit} minutes total</span>
            </div>
          </div>

          {showControls && (
            <div className="flex items-center justify-center gap-2">
              {!isRunning ? (
                <Button onClick={handleStart} size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
              ) : (
                <Button onClick={handlePause} size="sm" variant="outline">
                  {isPaused ? (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </>
                  )}
                </Button>
              )}
              
              <Button onClick={handleReset} size="sm" variant="outline">
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Warning Alerts */}
      {hasWarned && !hasCritical && (
        <Alert className="border-orange-400 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Warning:</strong> You have less than {warningThreshold} minutes remaining. 
            Consider reviewing your answers and submitting soon.
          </AlertDescription>
        </Alert>
      )}

      {hasCritical && !isExpired && (
        <Alert className="border-red-400 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Critical:</strong> You have less than {criticalThreshold} minutes remaining! 
            Please submit your exam immediately to avoid automatic submission.
          </AlertDescription>
        </Alert>
      )}

      {isExpired && (
        <Alert className="border-red-500 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Time's Up!</strong> The exam time has expired. Your answers have been automatically submitted.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Timer;
