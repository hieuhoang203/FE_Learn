'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Save,
  ArrowLeft,
  Plus,
  X,
  Clock,
  Calendar,
  Award
} from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export default function CreateAssignment() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1,
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    classId: '',
    subjectId: '',
    dueDate: '',
    timeLimit: '',
    maxAttempts: '1',
    totalPoints: 0,
  });

  // Mock data
  const classes = [
    { id: '1', name: 'Grade 10A - Mathematics' },
    { id: '2', name: 'Grade 11B - Physics' },
    { id: '3', name: 'Grade 12A - Chemistry' },
  ];

  const subjects = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Physics' },
    { id: '3', name: 'Chemistry' },
    { id: '4', name: 'Biology' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addQuestion = () => {
    if (newQuestion.question && newQuestion.points) {
      const question: Question = {
        id: Date.now().toString(),
        type: newQuestion.type as Question['type'],
        question: newQuestion.question,
        options: newQuestion.type === 'multiple-choice' ? newQuestion.options : undefined,
        correctAnswer: newQuestion.correctAnswer,
        points: newQuestion.points,
      };
      
      setQuestions(prev => [...prev, question]);
      setFormData(prev => ({ 
        ...prev, 
        totalPoints: prev.totalPoints + (newQuestion.points || 0) 
      }));
      
      // Reset form
      setNewQuestion({
        type: 'multiple-choice',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        points: 1,
      });
    }
  };

  const removeQuestion = (id: string) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      setQuestions(prev => prev.filter(q => q.id !== id));
      setFormData(prev => ({ 
        ...prev, 
        totalPoints: prev.totalPoints - question.points 
      }));
    }
  };

  const updateQuestionOption = (index: number, value: string) => {
    const newOptions = [...(newQuestion.options || ['', '', '', ''])];
    newOptions[index] = value;
    setNewQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const assignmentData = {
        ...formData,
        questions,
      };
      
      console.log('Creating assignment:', assignmentData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/teacher/assignments');
    } catch (error) {
      console.error('Error creating assignment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Create New Assignment
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Create assignments and quizzes for your students
                </p>
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Assignment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter assignment title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalPoints">Total Points</Label>
                    <Input
                      id="totalPoints"
                      type="number"
                      value={formData.totalPoints}
                      readOnly
                      className="bg-gray-100 dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select value={formData.classId} onValueChange={(value) => handleInputChange('classId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formData.subjectId} onValueChange={(value) => handleInputChange('subjectId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="datetime-local"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input
                      id="timeLimit"
                      type="number"
                      placeholder="60"
                      value={formData.timeLimit}
                      onChange={(e) => handleInputChange('timeLimit', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAttempts">Max Attempts</Label>
                    <Select value={formData.maxAttempts} onValueChange={(value) => handleInputChange('maxAttempts', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Attempt</SelectItem>
                        <SelectItem value="2">2 Attempts</SelectItem>
                        <SelectItem value="3">3 Attempts</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the assignment"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Detailed instructions for students"
                    value={formData.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Add Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Add Question
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select 
                      value={newQuestion.type} 
                      onValueChange={(value) => setNewQuestion(prev => ({ ...prev, type: value as Question['type'] }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="short-answer">Short Answer</SelectItem>
                        <SelectItem value="essay">Essay</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Points</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newQuestion.points}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Question</Label>
                  <Textarea
                    placeholder="Enter your question"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                    rows={3}
                  />
                </div>

                {newQuestion.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    <Label>Answer Options</Label>
                    <div className="space-y-2">
                      {newQuestion.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => updateQuestionOption(index, e.target.value)}
                          />
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={newQuestion.correctAnswer === option}
                            onChange={() => setNewQuestion(prev => ({ ...prev, correctAnswer: option }))}
                            className="w-4 h-4"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {newQuestion.type === 'true-false' && (
                  <div className="space-y-2">
                    <Label>Correct Answer</Label>
                    <Select 
                      value={newQuestion.correctAnswer} 
                      onValueChange={(value) => setNewQuestion(prev => ({ ...prev, correctAnswer: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(newQuestion.type === 'short-answer' || newQuestion.type === 'essay') && (
                  <div className="space-y-2">
                    <Label>Sample Answer (Optional)</Label>
                    <Textarea
                      placeholder="Provide a sample answer for reference"
                      value={newQuestion.correctAnswer}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                      rows={2}
                    />
                  </div>
                )}

                <Button type="button" onClick={addQuestion} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Questions List */}
          {questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Questions ({questions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={question.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Q{index + 1}
                              </span>
                              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                                {question.type}
                              </span>
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                                {question.points} pts
                              </span>
                            </div>
                            <p className="text-gray-900 dark:text-gray-100 mb-2">{question.question}</p>
                            {question.options && (
                              <div className="space-y-1">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center space-x-2">
                                    <span className={`text-sm ${option === question.correctAnswer ? 'text-green-600 dark:text-green-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                                      {String.fromCharCode(65 + optIndex)}. {option}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-end space-x-4"
          >
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || questions.length === 0}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Assignment
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
