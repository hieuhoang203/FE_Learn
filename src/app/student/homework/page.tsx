'use client';

import React, { useState } from 'react';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FileText,
  Search,
  Filter,
  Calendar,
  Clock,
  Upload,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
  Award,
  BookOpen,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';

interface Homework {
  id: string;
  title: string;
  description: string;
  subject: string;
  teacher: string;
  teacherAvatar?: string;
  dueDate: string;
  totalPoints: number;
  type: 'homework' | 'quiz' | 'exam' | 'project';
  status: 'not-started' | 'in-progress' | 'submitted' | 'graded' | 'overdue';
  submittedAt?: string;
  grade?: number;
  feedback?: string;
  attachments?: string[];
  instructions?: string;
}

export default function StudentHomework() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [submissionText, setSubmissionText] = useState('');

  // Mock data
  const homework: Homework[] = [
    {
      id: '1',
      title: 'Calculus Problem Set 1',
      description: 'Solve problems 1-20 from Chapter 3: Derivatives. Show all work and explain your reasoning.',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      dueDate: '2024-01-30',
      totalPoints: 100,
      type: 'homework',
      status: 'submitted',
      submittedAt: '2024-01-28 14:30',
      grade: 85,
      feedback: 'Good work on derivatives, but need to review limits.',
      attachments: ['calculus_problems.pdf'],
      instructions: 'Complete all problems showing detailed work. Use proper mathematical notation.'
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      description: 'Write a detailed report on the pendulum experiment conducted in class.',
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      dueDate: '2024-02-05',
      totalPoints: 50,
      type: 'project',
      status: 'in-progress',
      attachments: ['lab_instructions.pdf', 'data_template.xlsx'],
      instructions: 'Include hypothesis, methodology, results, and conclusion sections.'
    },
    {
      id: '3',
      title: 'English Essay: Shakespeare',
      description: 'Write a 1000-word essay analyzing the themes in Hamlet.',
      subject: 'English',
      teacher: 'Ms. Emily Davis',
      dueDate: '2024-02-10',
      totalPoints: 75,
      type: 'homework',
      status: 'not-started',
      instructions: 'Focus on major themes like revenge, madness, and mortality. Use MLA format.'
    },
    {
      id: '4',
      title: 'Chemistry Quiz 2',
      description: 'Online quiz covering organic chemistry basics.',
      subject: 'Chemistry',
      teacher: 'Dr. Robert Wilson',
      dueDate: '2024-01-25',
      totalPoints: 25,
      type: 'quiz',
      status: 'overdue',
      instructions: 'You have 30 minutes to complete this quiz. One attempt only.'
    },
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

  const filteredHomework = homework.filter(hw => {
    const matchesSearch = hw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hw.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || hw.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || hw.status === statusFilter;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleSubmitHomework = (homework: Homework) => {
    setSelectedHomework(homework);
    setSubmitDialogOpen(true);
  };

  const handleViewHomework = (homework: Homework) => {
    setSelectedHomework(homework);
    setViewDialogOpen(true);
  };

  const handleSubmit = () => {
    if (selectedHomework) {
      console.log('Submitting homework:', {
        homeworkId: selectedHomework.id,
        text: submissionText
      });
      setSubmitDialogOpen(false);
      setSubmissionText('');
      setSelectedHomework(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'not-started':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Not Started</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'submitted':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Submitted</Badge>;
      case 'graded':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800"><Award className="mr-1 h-3 w-3" />Graded</Badge>;
      case 'overdue':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="mr-1 h-3 w-3" />Overdue</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      homework: 'bg-blue-100 text-blue-800',
      quiz: 'bg-purple-100 text-purple-800',
      exam: 'bg-red-100 text-red-800',
      project: 'bg-orange-100 text-orange-800',
    };
    return <Badge variant="secondary" className={colors[type as keyof typeof colors]}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getGradeColor = (grade: number, totalPoints: number) => {
    const percentage = (grade / totalPoints) * 100;
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const homeworkStats = {
    total: homework.length,
    submitted: homework.filter(h => h.status === 'submitted' || h.status === 'graded').length,
    pending: homework.filter(h => h.status === 'not-started' || h.status === 'in-progress').length,
    overdue: homework.filter(h => h.status === 'overdue').length,
    averageGrade: homework.filter(h => h.grade).reduce((acc, h) => acc + (h.grade! / h.totalPoints) * 100, 0) / homework.filter(h => h.grade).length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                My Homework
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                View and submit your homework assignments
              </p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Homework</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{homeworkStats.total}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Submitted</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{homeworkStats.submitted}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{homeworkStats.pending}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Grade</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {homeworkStats.averageGrade.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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
                      placeholder="Search homework..."
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
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
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

        {/* Homework List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="space-y-4">
            {filteredHomework.map((hw, index) => (
              <motion.div
                key={hw.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{hw.title}</h3>
                          <div className="flex items-center space-x-2">
                            {getTypeBadge(hw.type)}
                            {getStatusBadge(hw.status)}
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-4">{hw.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <div className="flex items-center space-x-2">
                              <Avatar name={hw.teacher} size="xs" />
                              <span className="text-sm text-gray-900 dark:text-gray-100">{hw.teacher}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-900 dark:text-gray-100">{hw.subject}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-900 dark:text-gray-100">
                              Due: {hw.dueDate}
                              {getDaysUntilDue(hw.dueDate) >= 0 && (
                                <span className={`ml-2 ${getDaysUntilDue(hw.dueDate) <= 1 ? 'text-red-600' : 'text-gray-500'}`}>
                                  ({getDaysUntilDue(hw.dueDate)} days left)
                                </span>
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Award className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-900 dark:text-gray-100">{hw.totalPoints} points</span>
                            </div>

                            {hw.grade !== undefined && (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Grade:</span>
                                <span className={`text-sm font-medium ${getGradeColor(hw.grade, hw.totalPoints)}`}>
                                  {hw.grade}/{hw.totalPoints} ({((hw.grade / hw.totalPoints) * 100).toFixed(1)}%)
                                </span>
                              </div>
                            )}

                            {hw.submittedAt && (
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Submitted: {hw.submittedAt}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewHomework(hw)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>

                            {(hw.status === 'not-started' || hw.status === 'in-progress') && (
                              <Button size="sm" onClick={() => handleSubmitHomework(hw)}>
                                <Upload className="mr-2 h-4 w-4" />
                                Submit
                              </Button>
                            )}

                            {hw.attachments && hw.attachments.length > 0 && (
                              <Button size="sm" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {filteredHomework.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No homework found matching your criteria.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Submit Homework Dialog */}
      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Homework</DialogTitle>
          </DialogHeader>
          {selectedHomework && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{selectedHomework.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedHomework.subject}</p>
                <div className="flex items-center justify-center space-x-4 mt-2 text-sm">
                  <span>Due: {selectedHomework.dueDate}</span>
                  <span>Points: {selectedHomework.totalPoints}</span>
                </div>
              </div>

              {selectedHomework.instructions && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Instructions:</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{selectedHomework.instructions}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="submissionText">Your Submission</Label>
                <Textarea
                  id="submissionText"
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Enter your homework submission here..."
                  rows={8}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileUpload">Attach Files (Optional)</Label>
                <Input
                  id="fileUpload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                  className="cursor-pointer"
                />
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSubmitDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!submissionText.trim()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Homework
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Homework Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Homework Details</DialogTitle>
          </DialogHeader>
          {selectedHomework && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedHomework.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedHomework.description}</p>
                  <div className="flex items-center space-x-2 mt-3">
                    {getTypeBadge(selectedHomework.type)}
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">{selectedHomework.subject}</Badge>
                    {getStatusBadge(selectedHomework.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Assignment Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Teacher:</span> {selectedHomework.teacher}</p>
                    <p><span className="font-medium">Subject:</span> {selectedHomework.subject}</p>
                    <p><span className="font-medium">Due Date:</span> {selectedHomework.dueDate}</p>
                    <p><span className="font-medium">Total Points:</span> {selectedHomework.totalPoints}</p>
                    <p><span className="font-medium">Type:</span> {selectedHomework.type.charAt(0).toUpperCase() + selectedHomework.type.slice(1)}</p>
                  </div>

                  {selectedHomework.instructions && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Instructions</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        {selectedHomework.instructions}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Submission Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      {getStatusBadge(selectedHomework.status)}
                    </div>

                    {selectedHomework.submittedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Submitted:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedHomework.submittedAt}</span>
                      </div>
                    )}

                    {selectedHomework.grade !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Grade:</span>
                        <span className={`font-medium ${getGradeColor(selectedHomework.grade, selectedHomework.totalPoints)}`}>
                          {selectedHomework.grade}/{selectedHomework.totalPoints} ({((selectedHomework.grade / selectedHomework.totalPoints) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    )}

                    {selectedHomework.feedback && (
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Teacher Feedback</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                          {selectedHomework.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedHomework.attachments && selectedHomework.attachments.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Attachments</h5>
                      <div className="space-y-2">
                        {selectedHomework.attachments.map((attachment, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm text-gray-900 dark:text-gray-100">{attachment}</span>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
                {(selectedHomework.status === 'not-started' || selectedHomework.status === 'in-progress') && (
                  <Button onClick={() => {
                    setViewDialogOpen(false);
                    handleSubmitHomework(selectedHomework);
                  }}>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Homework
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
