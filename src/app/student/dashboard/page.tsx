'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  FileText,
  Award,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play,
  Eye,
  Users,
  Target,
  BarChart3
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function StudentDashboard() {
  // Mock data - replace with real API calls
  const stats = {
    totalClasses: 6,
    totalAssignments: 15,
    completedAssignments: 12,
    averageGrade: 87.5,
    pendingAssignments: 3,
  };

  const upcomingAssignments = [
    { 
      id: 1, 
      title: 'Physics Lab Report', 
      subject: 'Physics', 
      dueDate: '2024-01-25', 
      dueTime: '23:59',
      status: 'pending',
      points: 100 
    },
    { 
      id: 2, 
      title: 'Math Quiz 2', 
      subject: 'Mathematics', 
      dueDate: '2024-01-27', 
      dueTime: '14:00',
      status: 'pending',
      points: 50 
    },
    { 
      id: 3, 
      title: 'English Essay', 
      subject: 'English', 
      dueDate: '2024-01-30', 
      dueTime: '23:59',
      status: 'pending',
      points: 75 
    },
  ];

  const recentGrades = [
    { 
      id: 1, 
      assignment: 'Chemistry Quiz 1', 
      subject: 'Chemistry', 
      score: 92, 
      maxScore: 100, 
      gradedAt: '2024-01-20',
      feedback: 'Excellent work! Great understanding of molecular structures.'
    },
    { 
      id: 2, 
      assignment: 'History Essay', 
      subject: 'History', 
      score: 85, 
      maxScore: 100, 
      gradedAt: '2024-01-18',
      feedback: 'Good analysis, but could use more primary sources.'
    },
    { 
      id: 3, 
      assignment: 'Math Test 1', 
      subject: 'Mathematics', 
      score: 88, 
      maxScore: 100, 
      gradedAt: '2024-01-15',
      feedback: 'Strong problem-solving skills demonstrated.'
    },
  ];

  const upcomingClasses = [
    { id: 1, subject: 'Mathematics', time: '09:00 AM', room: 'A101', teacher: 'Dr. Johnson' },
    { id: 2, subject: 'Physics', time: '11:00 AM', room: 'Lab B', teacher: 'Prof. Brown' },
    { id: 3, subject: 'English', time: '02:00 PM', room: 'C201', teacher: 'Ms. Davis' },
  ];

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateColor = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days <= 1) return 'text-red-600 dark:text-red-400';
    if (days <= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Student Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Welcome back! Here's your academic overview.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link href="/student/assignments">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Assignments
                </Link>
              </Button>
              <Button asChild>
                <Link href="/student/classes">
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Classes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">My Classes</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalClasses}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignments</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.completedAssignments}/{stats.totalAssignments}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {Math.round((stats.completedAssignments / stats.totalAssignments) * 100)}% completed
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Grade</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.averageGrade}%</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Great performance!</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingAssignments}</p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Due soon</p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Assignments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Upcoming Assignments
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/student/assignments">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100">{assignment.title}</p>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            {assignment.subject}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span className={getDueDateColor(assignment.dueDate)}>
                              Due in {getDaysUntilDue(assignment.dueDate)} days
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="h-3 w-3" />
                            <span>{assignment.points} pts</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/student/assignments/take/${assignment.id}`}>
                          <Play className="mr-1 h-3 w-3" />
                          Start
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Grades */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Recent Grades
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/student/grades">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGrades.map((grade) => (
                    <div key={grade.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900 dark:text-gray-100">{grade.assignment}</p>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                            {grade.subject}
                          </Badge>
                        </div>
                        <span className={`font-bold text-lg ${getGradeColor(grade.score, grade.maxScore)}`}>
                          {grade.score}/{grade.maxScore}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {grade.feedback}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Graded on {grade.gradedAt}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Today's Classes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Today's Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{classItem.subject}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{classItem.teacher}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{classItem.room}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
