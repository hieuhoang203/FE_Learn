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
  Users,
  Search,
  Filter,
  UserPlus,
  Mail,
  BookOpen,
  Award,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  GraduationCap,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  studentId: string;
  gradeLevel: string;
  class: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  enrollmentDate: string;
  lastLogin?: string;
  stats: {
    totalClasses: number;
    completedAssignments: number;
    totalAssignments: number;
    averageGrade: number;
  };
  guardian?: {
    name: string;
    phone: string;
    email: string;
  };
}

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewStudentDialogOpen, setViewStudentDialogOpen] = useState(false);

  // Mock data
  const students: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@student.edu',
      phone: '+1234567890',
      studentId: 'STU001',
      gradeLevel: '12',
      class: 'Grade 12A',
      status: 'active',
      enrollmentDate: '2021-09-01',
      lastLogin: '2024-01-20 14:30',
      stats: {
        totalClasses: 6,
        completedAssignments: 45,
        totalAssignments: 50,
        averageGrade: 92.5,
      },
      guardian: {
        name: 'Robert Johnson',
        phone: '+1234567899',
        email: 'robert.johnson@email.com'
      }
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@student.edu',
      studentId: 'STU002',
      gradeLevel: '11',
      class: 'Grade 11B',
      status: 'active',
      enrollmentDate: '2022-09-01',
      lastLogin: '2024-01-20 09:15',
      stats: {
        totalClasses: 5,
        completedAssignments: 38,
        totalAssignments: 42,
        averageGrade: 85.3,
      },
      guardian: {
        name: 'Mary Smith',
        phone: '+1234567898',
        email: 'mary.smith@email.com'
      }
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.davis@student.edu',
      studentId: 'STU003',
      gradeLevel: '10',
      class: 'Grade 10A',
      status: 'suspended',
      enrollmentDate: '2023-09-01',
      lastLogin: '2024-01-15 16:45',
      stats: {
        totalClasses: 4,
        completedAssignments: 25,
        totalAssignments: 35,
        averageGrade: 72.8,
      },
      guardian: {
        name: 'John Davis',
        phone: '+1234567897',
        email: 'john.davis@email.com'
      }
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@student.edu',
      studentId: 'STU004',
      gradeLevel: '12',
      class: 'Grade 12B',
      status: 'graduated',
      enrollmentDate: '2020-09-01',
      lastLogin: '2024-01-18 11:20',
      stats: {
        totalClasses: 6,
        completedAssignments: 52,
        totalAssignments: 55,
        averageGrade: 88.7,
      }
    },
  ];

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    gradeLevel: '',
    class: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    password: '',
  });

  const gradeLevels = ['9', '10', '11', '12'];
  const classes = ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A', 'Grade 12B'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || student.gradeLevel === gradeFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleAddStudent = () => {
    console.log('Adding student:', newStudent);
    setAddStudentDialogOpen(false);
    setNewStudent({ 
      name: '', email: '', phone: '', studentId: '', gradeLevel: '', class: '', 
      guardianName: '', guardianPhone: '', guardianEmail: '', password: '' 
    });
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setViewStudentDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'graduated':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><GraduationCap className="mr-1 h-3 w-3" />Graduated</Badge>;
      case 'suspended':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return null;
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 dark:text-green-400';
    if (grade >= 80) return 'text-blue-600 dark:text-blue-400';
    if (grade >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const studentStats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    graduated: students.filter(s => s.status === 'graduated').length,
    suspended: students.filter(s => s.status === 'suspended').length,
    averageGrade: students.reduce((acc, s) => acc + s.stats.averageGrade, 0) / students.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Student Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage students and their academic progress
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => setAddStudentDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
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
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{studentStats.total}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{studentStats.active}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Graduated</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{studentStats.graduated}</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                    <p className={`text-3xl font-bold ${getGradeColor(studentStats.averageGrade)}`}>
                      {studentStats.averageGrade.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Grade Level</Label>
                  <Select value={gradeFilter} onValueChange={setGradeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      {gradeLevels.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          Grade {grade}
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="graduated">Graduated</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
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

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Students ({filteredStudents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Grade/Class</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Avg Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar name={student.name} size="sm" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{student.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{student.studentId}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900 dark:text-gray-100">{student.class}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {student.stats.completedAssignments}/{student.stats.totalAssignments}
                          </span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(student.stats.completedAssignments / student.stats.totalAssignments) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className={`font-medium ${getGradeColor(student.stats.averageGrade)}`}>
                            {student.stats.averageGrade.toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(student.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={addStudentDialogOpen} onOpenChange={setAddStudentDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Full Name</Label>
                <Input
                  id="studentName"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentEmail">Email</Label>
                <Input
                  id="studentEmail"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={newStudent.studentId}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, studentId: e.target.value }))}
                  placeholder="Enter student ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentPhone">Phone (Optional)</Label>
                <Input
                  id="studentPhone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Grade Level</Label>
                <Select value={newStudent.gradeLevel} onValueChange={(value) => setNewStudent(prev => ({ ...prev, gradeLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeLevels.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={newStudent.class} onValueChange={(value) => setNewStudent(prev => ({ ...prev, class: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Guardian Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  <Input
                    id="guardianName"
                    value={newStudent.guardianName}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, guardianName: e.target.value }))}
                    placeholder="Enter guardian name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  <Input
                    id="guardianPhone"
                    value={newStudent.guardianPhone}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, guardianPhone: e.target.value }))}
                    placeholder="Enter guardian phone"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="guardianEmail">Guardian Email</Label>
                <Input
                  id="guardianEmail"
                  type="email"
                  value={newStudent.guardianEmail}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, guardianEmail: e.target.value }))}
                  placeholder="Enter guardian email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentPassword">Password</Label>
              <Input
                id="studentPassword"
                type="password"
                value={newStudent.password}
                onChange={(e) => setNewStudent(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAddStudentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>
                Add Student
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Student Dialog */}
      <Dialog open={viewStudentDialogOpen} onOpenChange={setViewStudentDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar name={selectedStudent.name} size="xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedStudent.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedStudent.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">{selectedStudent.class}</Badge>
                    {getStatusBadge(selectedStudent.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Student Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Student ID:</span> {selectedStudent.studentId}</p>
                    <p><span className="font-medium">Email:</span> {selectedStudent.email}</p>
                    {selectedStudent.phone && <p><span className="font-medium">Phone:</span> {selectedStudent.phone}</p>}
                    <p><span className="font-medium">Grade Level:</span> {selectedStudent.gradeLevel}</p>
                    <p><span className="font-medium">Class:</span> {selectedStudent.class}</p>
                    <p><span className="font-medium">Enrollment Date:</span> {selectedStudent.enrollmentDate}</p>
                    <p><span className="font-medium">Last Login:</span> {selectedStudent.lastLogin || 'Never'}</p>
                  </div>

                  {selectedStudent.guardian && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Guardian Information</h5>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> {selectedStudent.guardian.name}</p>
                        <p><span className="font-medium">Phone:</span> {selectedStudent.guardian.phone}</p>
                        <p><span className="font-medium">Email:</span> {selectedStudent.guardian.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Academic Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedStudent.stats.totalClasses}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Classes</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {selectedStudent.stats.completedAssignments}/{selectedStudent.stats.totalAssignments}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Assignments</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg col-span-2">
                      <p className={`text-2xl font-bold ${getGradeColor(selectedStudent.stats.averageGrade)}`}>
                        {selectedStudent.stats.averageGrade.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Grade</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setViewStudentDialogOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Student
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
