'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  FileText,
  Search,
  Filter,
  Calendar,
  Clock,
  Target,
  Play,
  CheckCircle,
  AlertCircle,
  Eye,
  Award
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
  dueTime: string;
  points: number;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  submittedAt?: string;
  grade?: number;
  maxGrade?: number;
  attempts: number;
  maxAttempts: number;
  timeLimit?: number; // in minutes
}

export default function StudentAssignments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Physics Lab Report',
      description: 'Complete analysis of pendulum motion experiment',
      subject: 'Physics',
      class: 'Grade 11B',
      teacher: 'Prof. Brown',
      dueDate: '2024-01-25',
      dueTime: '23:59',
      points: 100,
      status: 'pending',
      attempts: 0,
      maxAttempts: 1,
      timeLimit: 120
    },
    {
      id: '2',
      title: 'Math Quiz 2',
      description: 'Quadratic equations and functions',
      subject: 'Mathematics',
      class: 'Grade 11A',
      teacher: 'Dr. Johnson',
      dueDate: '2024-01-27',
      dueTime: '14:00',
      points: 50,
      status: 'pending',
      attempts: 0,
      maxAttempts: 2,
      timeLimit: 60
    },
    {
      id: '3',
      title: 'English Essay',
      description: 'Analysis of Shakespeare\'s Hamlet',
      subject: 'English',
      class: 'Grade 11A',
      teacher: 'Ms. Davis',
      dueDate: '2024-01-30',
      dueTime: '23:59',
      points: 75,
      status: 'pending',
      attempts: 0,
      maxAttempts: 1
    },
    {
      id: '4',
      title: 'Chemistry Quiz 1',
      description: 'Atomic structure and periodic table',
      subject: 'Chemistry',
      class: 'Grade 11B',
      teacher: 'Dr. Wilson',
      dueDate: '2024-01-20',
      dueTime: '23:59',
      points: 100,
      status: 'graded',
      submittedAt: '2024-01-19 15:30',
      grade: 92,
      maxGrade: 100,
      attempts: 1,
      maxAttempts: 1,
      timeLimit: 45
    },
    {
      id: '5',
      title: 'History Essay',
      description: 'World War II impact analysis',
      subject: 'History',
      class: 'Grade 11A',
      teacher: 'Mr. Smith',
      dueDate: '2024-01-18',
      dueTime: '23:59',
      points: 100,
      status: 'graded',
      submittedAt: '2024-01-17 20:45',
      grade: 85,
      maxGrade: 100,
      attempts: 1,
      maxAttempts: 1
    },
    {
      id: '6',
      title: 'Biology Lab',
      description: 'Cell structure observation',
      subject: 'Biology',
      class: 'Grade 11B',
      teacher: 'Dr. Lee',
      dueDate: '2024-01-15',
      dueTime: '23:59',
      points: 80,
      status: 'overdue',
      attempts: 0,
      maxAttempts: 1,
      timeLimit: 90
    },
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || assignment.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case 'submitted':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><CheckCircle className="mr-1 h-3 w-3" />Submitted</Badge>;
      case 'graded':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><Award className="mr-1 h-3 w-3" />Graded</Badge>;
      case 'overdue':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><AlertCircle className="mr-1 h-3 w-3" />Overdue</Badge>;
      default:
        return null;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateColor = (dueDate: string, status: string) => {
    if (status === 'graded' || status === 'submitted') return 'text-gray-600 dark:text-gray-400';
    if (status === 'overdue') return 'text-red-600 dark:text-red-400';
    
    const days = getDaysUntilDue(dueDate);
    if (days <= 1) return 'text-red-600 dark:text-red-400';
    if (days <= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                My Assignments
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track and complete your assignments
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link href="/student/grades">
                  <Award className="mr-2 h-4 w-4" />
                  View Grades
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.submitted}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Submitted</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.graded}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Graded</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search assignments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                    <SelectTrigger>
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
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="graded">Graded</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Assignments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Assignments ({filteredAssignments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {assignment.title}
                          </h3>
                          {getStatusBadge(assignment.status)}
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {assignment.subject}
                          </Badge>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {assignment.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className={getDueDateColor(assignment.dueDate, assignment.status)}>
                              Due: {assignment.dueDate} at {assignment.dueTime}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {assignment.points} points
                            </span>
                          </div>

                          {assignment.timeLimit && (
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {assignment.timeLimit} minutes
                              </span>
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {assignment.attempts}/{assignment.maxAttempts} attempts
                            </span>
                          </div>
                        </div>

                        {assignment.status === 'graded' && assignment.grade !== undefined && (
                          <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Grade:</span>
                              <span className={`text-lg font-bold ${getGradeColor(assignment.grade, assignment.maxGrade!)}`}>
                                {assignment.grade}/{assignment.maxGrade} ({Math.round((assignment.grade / assignment.maxGrade!) * 100)}%)
                              </span>
                            </div>
                          </div>
                        )}

                        {assignment.submittedAt && (
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                            Submitted on {assignment.submittedAt}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        {assignment.status === 'pending' && assignment.attempts < assignment.maxAttempts && (
                          <Button size="sm" asChild>
                            <Link href={`/student/assignments/take/${assignment.id}`}>
                              <Play className="mr-2 h-4 w-4" />
                              {assignment.attempts === 0 ? 'Start' : 'Retake'}
                            </Link>
                          </Button>
                        )}

                        {assignment.status === 'overdue' && assignment.attempts < assignment.maxAttempts && (
                          <Button size="sm" variant="destructive" asChild>
                            <Link href={`/student/assignments/take/${assignment.id}`}>
                              <Play className="mr-2 h-4 w-4" />
                              Take (Late)
                            </Link>
                          </Button>
                        )}

                        {(assignment.status === 'submitted' || assignment.status === 'graded') && (
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/student/assignments/view/${assignment.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </Button>
                        )}

                        <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
                          {assignment.class}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
                          {assignment.teacher}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredAssignments.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No assignments found matching your criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
