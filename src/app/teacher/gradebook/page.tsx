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
} from '@/components/ui/dialog';
import {
  Award,
  Search,
  Filter,
  Edit,
  Save,
  FileText,
  TrendingUp,
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Download,
  Upload
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';

interface StudentGrade {
  id: string;
  studentId: string;
  studentName: string;
  email: string;
  class: string;
  assignments: {
    [assignmentId: string]: {
      grade: number | null;
      maxPoints: number;
      submittedAt: string | null;
      feedback: string;
    };
  };
  overallGrade: number;
  attendance: number;
}

interface Assignment {
  id: string;
  title: string;
  maxPoints: number;
  dueDate: string;
  type: 'homework' | 'quiz' | 'exam' | 'project';
}

export default function TeacherGradebook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentGrade | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  // Mock data
  const assignments: Assignment[] = [
    { id: 'A001', title: 'Quiz 1', maxPoints: 20, dueDate: '2024-01-15', type: 'quiz' },
    { id: 'A002', title: 'Homework 1', maxPoints: 50, dueDate: '2024-01-20', type: 'homework' },
    { id: 'A003', title: 'Midterm', maxPoints: 100, dueDate: '2024-02-01', type: 'exam' },
    { id: 'A004', title: 'Project', maxPoints: 75, dueDate: '2024-02-15', type: 'project' },
  ];

  const students: StudentGrade[] = [
    {
      id: 'S001',
      studentId: 'STU001',
      studentName: 'Alice Johnson',
      email: 'alice.johnson@student.edu',
      class: 'Grade 12A',
      assignments: {
        'A001': { grade: 18, maxPoints: 20, submittedAt: '2024-01-15', feedback: 'Good work!' },
        'A002': { grade: 45, maxPoints: 50, submittedAt: '2024-01-20', feedback: 'Well done' },
        'A003': { grade: null, maxPoints: 100, submittedAt: null, feedback: '' },
        'A004': { grade: null, maxPoints: 75, submittedAt: null, feedback: '' },
      },
      overallGrade: 87.5,
      attendance: 95
    },
    {
      id: 'S002',
      studentId: 'STU002',
      studentName: 'Bob Smith',
      email: 'bob.smith@student.edu',
      class: 'Grade 12A',
      assignments: {
        'A001': { grade: 16, maxPoints: 20, submittedAt: '2024-01-15', feedback: 'Good effort' },
        'A002': { grade: 42, maxPoints: 50, submittedAt: '2024-01-21', feedback: 'Late submission' },
        'A003': { grade: 85, maxPoints: 100, submittedAt: '2024-02-01', feedback: 'Solid performance' },
        'A004': { grade: null, maxPoints: 75, submittedAt: null, feedback: '' },
      },
      overallGrade: 82.3,
      attendance: 88
    },
    {
      id: 'S003',
      studentId: 'STU003',
      studentName: 'Carol Davis',
      email: 'carol.davis@student.edu',
      class: 'Grade 11B',
      assignments: {
        'A001': { grade: 20, maxPoints: 20, submittedAt: '2024-01-14', feedback: 'Perfect!' },
        'A002': { grade: 48, maxPoints: 50, submittedAt: '2024-01-19', feedback: 'Excellent work' },
        'A003': { grade: 92, maxPoints: 100, submittedAt: '2024-01-31', feedback: 'Outstanding' },
        'A004': { grade: 70, maxPoints: 75, submittedAt: '2024-02-14', feedback: 'Great project' },
      },
      overallGrade: 93.8,
      attendance: 98
    },
  ];

  const classes = ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A', 'Grade 12B'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    
    return matchesSearch && matchesClass;
  });

  const handleGradeEdit = (student: StudentGrade, assignment: Assignment) => {
    setSelectedStudent(student);
    setSelectedAssignment(assignment);
    const currentGrade = student.assignments[assignment.id]?.grade;
    const currentFeedback = student.assignments[assignment.id]?.feedback || '';
    setGradeInput(currentGrade?.toString() || '');
    setFeedbackInput(currentFeedback);
    setGradeDialogOpen(true);
  };

  const handleSaveGrade = () => {
    if (selectedStudent && selectedAssignment) {
      console.log('Saving grade:', {
        studentId: selectedStudent.id,
        assignmentId: selectedAssignment.id,
        grade: parseFloat(gradeInput),
        feedback: feedbackInput
      });
      setGradeDialogOpen(false);
      setSelectedStudent(null);
      setSelectedAssignment(null);
      setGradeInput('');
      setFeedbackInput('');
    }
  };

  const getGradeColor = (grade: number | null, maxPoints: number) => {
    if (grade === null) return 'text-gray-400';
    const percentage = (grade / maxPoints) * 100;
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getOverallGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 dark:text-green-400';
    if (grade >= 80) return 'text-blue-600 dark:text-blue-400';
    if (grade >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const gradebookStats = {
    totalStudents: students.length,
    averageGrade: students.reduce((acc, s) => acc + s.overallGrade, 0) / students.length,
    highestGrade: Math.max(...students.map(s => s.overallGrade)),
    lowestGrade: Math.min(...students.map(s => s.overallGrade)),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Gradebook
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage student grades and track academic progress
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{gradebookStats.totalStudents}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Class Average</p>
                    <p className={`text-3xl font-bold ${getOverallGradeColor(gradebookStats.averageGrade)}`}>
                      {gradebookStats.averageGrade.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Highest Grade</p>
                    <p className={`text-3xl font-bold ${getOverallGradeColor(gradebookStats.highestGrade)}`}>
                      {gradebookStats.highestGrade.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignments</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{assignments.length}</p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Students</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
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

        {/* Gradebook Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Gradebook ({filteredStudents.length} students)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Student</TableHead>
                      {assignments.map((assignment) => (
                        <TableHead key={assignment.id} className="text-center min-w-[100px]">
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-xs text-gray-500">/{assignment.maxPoints}pts</p>
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="text-center min-w-[100px]">Overall</TableHead>
                      <TableHead className="text-center min-w-[100px]">Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar name={student.studentName} size="sm" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{student.studentName}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{student.studentId}</p>
                            </div>
                          </div>
                        </TableCell>
                        {assignments.map((assignment) => {
                          const gradeData = student.assignments[assignment.id];
                          return (
                            <TableCell key={assignment.id} className="text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-2"
                                onClick={() => handleGradeEdit(student, assignment)}
                              >
                                {gradeData?.grade !== null ? (
                                  <span className={`font-medium ${getGradeColor(gradeData.grade, gradeData.maxPoints)}`}>
                                    {gradeData.grade}/{gradeData.maxPoints}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </Button>
                            </TableCell>
                          );
                        })}
                        <TableCell className="text-center">
                          <span className={`font-bold ${getOverallGradeColor(student.overallGrade)}`}>
                            {student.overallGrade.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-medium ${student.attendance >= 90 ? 'text-green-600' : student.attendance >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {student.attendance}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Grade Edit Dialog */}
      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Grade</DialogTitle>
          </DialogHeader>
          {selectedStudent && selectedAssignment && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-medium text-gray-900 dark:text-gray-100">{selectedStudent.studentName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAssignment.title}</p>
                <p className="text-xs text-gray-500">Max Points: {selectedAssignment.maxPoints}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradeInput">Grade</Label>
                <Input
                  id="gradeInput"
                  type="number"
                  min="0"
                  max={selectedAssignment.maxPoints}
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  placeholder={`Enter grade (0-${selectedAssignment.maxPoints})`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedbackInput">Feedback</Label>
                <Textarea
                  id="feedbackInput"
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Enter feedback for the student..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setGradeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveGrade}>
                  <Save className="mr-2 h-4 w-4" />
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
