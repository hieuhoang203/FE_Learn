'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Clock,
  FileText,
  Send,
  Save,
  AlertCircle,
  CheckCircle,
  Timer
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Question {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'true-false';
  question: string;
  options?: string[];
  points: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  timeLimit: number; // in minutes
  maxAttempts: number;
  totalPoints: number;
  questions: Question[];
  dueDate: string;
}

export default function TakeAssignment() {
  const router = useRouter();
  const params = useParams();
  const assignmentId = params.id as string;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Mock assignment data
  useEffect(() => {
    const mockAssignment: Assignment = {
      id: assignmentId,
      title: 'Mathematics Quiz 1',
      description: 'Basic algebra and geometry concepts',
      instructions: 'Answer all questions to the best of your ability. You have 60 minutes to complete this quiz.',
      timeLimit: 60,
      maxAttempts: 1,
      totalPoints: 100,
      dueDate: '2024-01-25 23:59',
      questions: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'What is the value of x in the equation 2x + 5 = 15?',
          options: ['3', '5', '7', '10'],
          points: 10
        },
        {
          id: '2',
          type: 'multiple-choice',
          question: 'Which of the following is a prime number?',
          options: ['15', '21', '23', '27'],
          points: 10
        },
        {
          id: '3',
          type: 'true-false',
          question: 'The sum of angles in a triangle is always 180 degrees.',
          options: ['True', 'False'],
          points: 10
        },
        {
          id: '4',
          type: 'short-answer',
          question: 'Calculate the area of a circle with radius 5 cm. (Use π = 3.14)',
          points: 15
        },
        {
          id: '5',
          type: 'essay',
          question: 'Explain the Pythagorean theorem and provide an example of its application.',
          points: 25
        }
      ]
    };

    setAssignment(mockAssignment);
    setTimeRemaining(mockAssignment.timeLimit * 60); // Convert to seconds
  }, [assignmentId]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleAutoSubmit = async () => {
    console.log('Time up! Auto-submitting assignment...');
    await submitAssignment();
  };

  const submitAssignment = async () => {
    setIsSubmitting(true);
    
    try {
      const submission = {
        assignmentId,
        answers,
        submittedAt: new Date().toISOString(),
        timeSpent: assignment ? (assignment.timeLimit * 60 - timeRemaining) : 0,
      };
      
      console.log('Submitting assignment:', submission);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push(`/student/assignments/submitted/${assignmentId}`);
    } catch (error) {
      console.error('Error submitting assignment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    setShowConfirmSubmit(true);
  };

  const confirmSubmit = () => {
    setShowConfirmSubmit(false);
    submitAssignment();
  };

  const saveProgress = () => {
    console.log('Saving progress...', answers);
    // API call to save progress
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).filter(key => answers[key]?.trim()).length;
  };

  const getTimeColor = () => {
    if (timeRemaining < 300) return 'text-red-600 dark:text-red-400'; // Less than 5 minutes
    if (timeRemaining < 900) return 'text-yellow-600 dark:text-yellow-400'; // Less than 15 minutes
    return 'text-green-600 dark:text-green-400';
  };

  if (!assignment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentQuestion = assignment.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {assignment.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Question {currentQuestionIndex + 1} of {assignment.questions.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Progress */}
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getAnsweredCount()}/{assignment.questions.length} answered
                </span>
              </div>
              
              {/* Timer */}
              <div className="flex items-center space-x-2">
                <Timer className={`h-4 w-4 ${getTimeColor()}`} />
                <span className={`font-mono text-lg font-bold ${getTimeColor()}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              
              {/* Save Progress */}
              <Button variant="outline" onClick={saveProgress}>
                <Save className="mr-2 h-4 w-4" />
                Save Progress
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestionIndex + 1) / assignment.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Question {currentQuestionIndex + 1}
                </CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {currentQuestion.points} points
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-lg text-gray-900 dark:text-gray-100 leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>

              {/* Answer Input */}
              <div className="space-y-4">
                {currentQuestion.type === 'multiple-choice' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-900 dark:text-gray-100">{String.fromCharCode(65 + index)}. {option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'true-false' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-900 dark:text-gray-100">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'short-answer' && (
                  <div className="space-y-2">
                    <Label htmlFor={`answer-${currentQuestion.id}`}>Your Answer</Label>
                    <Input
                      id={`answer-${currentQuestion.id}`}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Enter your answer here..."
                      className="text-lg"
                    />
                  </div>
                )}

                {currentQuestion.type === 'essay' && (
                  <div className="space-y-2">
                    <Label htmlFor={`answer-${currentQuestion.id}`}>Your Answer</Label>
                    <Textarea
                      id={`answer-${currentQuestion.id}`}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Write your detailed answer here..."
                      rows={8}
                      className="text-base"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {assignment.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : answers[assignment.questions[index].id]
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex === assignment.questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Assignment
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(assignment.questions.length - 1, prev + 1))}
            >
              Next
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          )}
        </div>
      </div>

      {/* Confirm Submit Dialog */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Submit Assignment?
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to submit your assignment? You have answered {getAnsweredCount()} out of {assignment.questions.length} questions. 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
                Cancel
              </Button>
              <Button onClick={confirmSubmit}>
                Yes, Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
