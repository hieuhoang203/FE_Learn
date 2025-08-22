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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Award,
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Submission {
  id: string;
  studentName: string;
  studentId: string;
  assignmentTitle: string;
  assignmentId: string;
  submittedAt: string;
  status: 'pending' | 'graded' | 'late';
  score?: number;
  maxScore: number;
  feedback?: string;
  class: string;
  subject: string;
}

export default function TeacherGrades() {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  // Mock data
  const submissions: Submission[] = [
    {
      id: '1',
      studentName: 'Alice Johnson',
      studentId: 'ST001',
      assignmentTitle: 'Math Quiz 1',
      assignmentId: 'A001',
      submittedAt: '2024-01-15 14:30',
      status: 'pending',
      maxScore: 100,
      class: 'Grade 10A',
      subject: 'Mathematics'
    },
    {
      id: '2',
      studentName: 'Bob Smith',
      studentId: 'ST002',
      assignmentTitle: 'Physics Lab Report',
      assignmentId: 'A002',
      submittedAt: '2024-01-14 16:45',
      status: 'graded',
      score: 85,
      maxScore: 100,
      feedback: 'Good work on the experimental setup. Consider improving the analysis section.',
      class: 'Grade 11B',
      subject: 'Physics'
    },
    {
      id: '3',
      studentName: 'Carol Davis',
      studentId: 'ST003',
      assignmentTitle: 'Chemistry Homework',
      assignmentId: 'A003',
      submittedAt: '2024-01-13 23:59',
      status: 'late',
      maxScore: 50,
      class: 'Grade 12A',
      subject: 'Chemistry'
    },
    {
      id: '4',
      studentName: 'David Wilson',
      studentId: 'ST004',
      assignmentTitle: 'Biology Essay',
      assignmentId: 'A004',
      submittedAt: '2024-01-12 10:15',
      status: 'graded',
      score: 92,
      maxScore: 100,
      feedback: 'Excellent analysis and well-structured arguments. Great job!',
      class: 'Grade 10A',
      subject: 'Biology'
    },
  ];

  const [gradeForm, setGradeForm] = useState({
    score: '',
    feedback: '',
  });

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesClass = classFilter === 'all' || submission.class === classFilter;
    
    return matchesSearch && matchesStatus && matchesClass;
  });

  const handleGradeSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setGradeForm({
      score: submission.score?.toString() || '',
      feedback: submission.feedback || '',
    });
    setGradeDialogOpen(true);
  };

  const handleSaveGrade = () => {
    if (selectedSubmission) {
      // API call to save grade
      console.log('Saving grade:', {
        submissionId: selectedSubmission.id,
        score: parseInt(gradeForm.score),
        feedback: gradeForm.feedback,
      });
      
      setGradeDialogOpen(false);
      setSelectedSubmission(null);
      setGradeForm({ score: '', feedback: '' });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case 'graded':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Graded</Badge>;
      case 'late':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><AlertCircle className="mr-1 h-3 w-3" />Late</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Grade Submissions
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Review and grade student submissions
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Grades
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
                      placeholder="Search students or assignments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
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
                      <SelectItem value="graded">Graded</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="Grade 10A">Grade 10A</SelectItem>
                      <SelectItem value="Grade 11B">Grade 11B</SelectItem>
                      <SelectItem value="Grade 12A">Grade 12A</SelectItem>
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

        {/* Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Submissions ({filteredSubmissions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{submission.studentName}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{submission.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{submission.assignmentTitle}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-gray-900 dark:text-gray-100">{submission.class}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-gray-900 dark:text-gray-100">{submission.subject}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{submission.submittedAt}</p>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(submission.status)}
                      </TableCell>
                      <TableCell>
                        {submission.score !== undefined ? (
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {submission.score}/{submission.maxScore}
                          </span>
                        ) : (
                          <span className="text-gray-400">-/{submission.maxScore}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGradeSubmission(submission)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Grade Dialog */}
      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{selectedSubmission.studentName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSubmission.assignmentTitle}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="score">Score (out of {selectedSubmission.maxScore})</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max={selectedSubmission.maxScore}
                  value={gradeForm.score}
                  onChange={(e) => setGradeForm(prev => ({ ...prev, score: e.target.value }))}
                  placeholder="Enter score"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  value={gradeForm.feedback}
                  onChange={(e) => setGradeForm(prev => ({ ...prev, feedback: e.target.value }))}
                  placeholder="Provide feedback to the student..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setGradeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveGrade}>
                  Save Grade
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
