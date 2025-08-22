'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Award,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  BarChart3,
  Download,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Grade {
  id: string;
  assignmentTitle: string;
  subject: string;
  class: string;
  teacher: string;
  score: number;
  maxScore: number;
  percentage: number;
  gradedAt: string;
  feedback?: string;
  submittedAt: string;
}

export default function StudentGrades() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [viewGradeDialogOpen, setViewGradeDialogOpen] = useState(false);

  // Mock data
  const grades: Grade[] = [
    {
      id: '1',
      assignmentTitle: 'Chemistry Quiz 1',
      subject: 'Chemistry',
      class: 'Grade 11B',
      teacher: 'Dr. Wilson',
      score: 92,
      maxScore: 100,
      percentage: 92,
      gradedAt: '2024-01-20',
      feedback: 'Excellent work! Great understanding of molecular structures.',
      submittedAt: '2024-01-19 15:30'
    },
    {
      id: '2',
      assignmentTitle: 'History Essay',
      subject: 'History',
      class: 'Grade 11A',
      teacher: 'Mr. Smith',
      score: 85,
      maxScore: 100,
      percentage: 85,
      gradedAt: '2024-01-18',
      feedback: 'Good analysis, but could use more primary sources.',
      submittedAt: '2024-01-17 20:45'
    },
    {
      id: '3',
      assignmentTitle: 'Math Test 1',
      subject: 'Mathematics',
      class: 'Grade 11A',
      teacher: 'Dr. Johnson',
      score: 88,
      maxScore: 100,
      percentage: 88,
      gradedAt: '2024-01-15',
      feedback: 'Strong problem-solving skills demonstrated.',
      submittedAt: '2024-01-14 16:20'
    },
    {
      id: '4',
      assignmentTitle: 'Physics Lab Report',
      subject: 'Physics',
      class: 'Grade 11B',
      teacher: 'Prof. Brown',
      score: 78,
      maxScore: 100,
      percentage: 78,
      gradedAt: '2024-01-12',
      feedback: 'Good experimental setup, but analysis needs improvement.',
      submittedAt: '2024-01-10 14:15'
    },
    {
      id: '5',
      assignmentTitle: 'English Literature Analysis',
      subject: 'English',
      class: 'Grade 11A',
      teacher: 'Ms. Davis',
      score: 94,
      maxScore: 100,
      percentage: 94,
      gradedAt: '2024-01-08',
      feedback: 'Outstanding analysis and writing style!',
      submittedAt: '2024-01-07 18:30'
    },
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || grade.subject === subjectFilter;
    
    return matchesSearch && matchesSubject;
  });

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeBadge = (percentage: number) => {
    if (percentage >= 90) return <Badge variant="secondary" className="bg-green-100 text-green-800">A</Badge>;
    if (percentage >= 80) return <Badge variant="secondary" className="bg-blue-100 text-blue-800">B</Badge>;
    if (percentage >= 70) return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">C</Badge>;
    if (percentage >= 60) return <Badge variant="secondary" className="bg-orange-100 text-orange-800">D</Badge>;
    return <Badge variant="secondary" className="bg-red-100 text-red-800">F</Badge>;
  };

  const calculateStats = () => {
    const totalGrades = filteredGrades.length;
    const averageGrade = totalGrades > 0 ? filteredGrades.reduce((acc, grade) => acc + grade.percentage, 0) / totalGrades : 0;
    const highestGrade = totalGrades > 0 ? Math.max(...filteredGrades.map(g => g.percentage)) : 0;
    const lowestGrade = totalGrades > 0 ? Math.min(...filteredGrades.map(g => g.percentage)) : 0;
    
    return {
      total: totalGrades,
      average: averageGrade,
      highest: highestGrade,
      lowest: lowestGrade,
    };
  };

  const stats = calculateStats();

  const subjectAverages = subjects.map(subject => {
    const subjectGrades = grades.filter(g => g.subject === subject);
    const average = subjectGrades.length > 0 
      ? subjectGrades.reduce((acc, g) => acc + g.percentage, 0) / subjectGrades.length 
      : 0;
    return { subject, average, count: subjectGrades.length };
  }).filter(s => s.count > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                My Grades
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track your academic performance and progress
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Average</p>
                    <p className={`text-3xl font-bold ${getGradeColor(stats.average)}`}>
                      {stats.average.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Highest Grade</p>
                    <p className={`text-3xl font-bold ${getGradeColor(stats.highest)}`}>
                      {stats.highest}%
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lowest Grade</p>
                    <p className={`text-3xl font-bold ${getGradeColor(stats.lowest)}`}>
                      {stats.lowest}%
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Grades</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Averages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Subject Averages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectAverages.map((subjectAvg) => (
                    <div key={subjectAvg.subject} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{subjectAvg.subject}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{subjectAvg.count} assignments</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getGradeColor(subjectAvg.average)}`}>
                          {subjectAvg.average.toFixed(1)}%
                        </p>
                        {getGradeBadge(subjectAvg.average)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Grades List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Grade History ({filteredGrades.length})
                  </CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search assignments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredGrades.map((grade) => (
                    <div key={grade.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {grade.assignmentTitle}
                            </h3>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {grade.subject}
                            </Badge>
                            {getGradeBadge(grade.percentage)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4" />
                              <span>{grade.class}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>Graded: {grade.gradedAt}</span>
                            </div>
                            <div>
                              <span>Teacher: {grade.teacher}</span>
                            </div>
                          </div>
                          
                          {grade.feedback && (
                            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Feedback: </span>
                                {grade.feedback}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2 ml-4">
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${getGradeColor(grade.percentage)}`}>
                              {grade.score}/{grade.maxScore}
                            </p>
                            <p className={`text-lg font-semibold ${getGradeColor(grade.percentage)}`}>
                              {grade.percentage}%
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredGrades.length === 0 && (
                    <div className="text-center py-12">
                      <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">No grades found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
