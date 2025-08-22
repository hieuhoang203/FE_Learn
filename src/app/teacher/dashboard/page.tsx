'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  Users,
  FileText,
  Award,
  Plus,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TeacherDashboard() {
  // Mock data - replace with real API calls
  const stats = {
    totalClasses: 5,
    totalStudents: 127,
    totalLessons: 23,
    pendingGrades: 8,
  };

  const recentSubmissions = [
    { id: 1, student: 'Alice Johnson', assignment: 'Math Quiz 1', submittedAt: '2 hours ago', status: 'pending' },
    { id: 2, student: 'Bob Smith', assignment: 'Physics Lab Report', submittedAt: '4 hours ago', status: 'pending' },
    { id: 3, student: 'Carol Davis', assignment: 'Chemistry Homework', submittedAt: '1 day ago', status: 'graded' },
    { id: 4, student: 'David Wilson', assignment: 'Biology Essay', submittedAt: '2 days ago', status: 'pending' },
  ];

  const upcomingClasses = [
    { id: 1, subject: 'Mathematics', class: 'Grade 10A', time: '09:00 AM', date: 'Today' },
    { id: 2, subject: 'Physics', class: 'Grade 11B', time: '11:00 AM', date: 'Today' },
    { id: 3, subject: 'Chemistry', class: 'Grade 12A', time: '02:00 PM', date: 'Tomorrow' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Teacher Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Welcome back! Here's what's happening with your classes today.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button asChild>
                <Link href="/teacher/lessons/create">
                  <Plus className="mr-2 h-4 w-4" />
                  New Lesson
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/teacher/assignments/create">
                  <FileText className="mr-2 h-4 w-4" />
                  New Assignment
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Classes</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalStudents}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Lessons</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalLessons}</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Grades</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingGrades}</p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Submissions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Recent Submissions
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/teacher/grades">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{submission.student}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{submission.assignment}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{submission.submittedAt}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {submission.status === 'pending' ? (
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Submission
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Grade
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Classes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Upcoming Classes
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/teacher/schedule">View Schedule</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{classItem.subject}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{classItem.class}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{classItem.time}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{classItem.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
