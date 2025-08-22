'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  BookOpen,
  Search,
  Filter,
  Plus,
  Users,
  Calendar,
  Clock,
  Award,
  Edit,
  Eye,
  MoreHorizontal,
  FileText,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TeacherClass {
  id: string;
  name: string;
  subject: string;
  gradeLevel: string;
  description: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
    room: string;
  };
  students: {
    total: number;
    active: number;
  };
  assignments: {
    total: number;
    pending: number;
  };
  averageGrade: number;
  status: 'active' | 'inactive' | 'completed';
  semester: string;
  academicYear: string;
}

export default function TeacherClasses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addClassDialogOpen, setAddClassDialogOpen] = useState(false);
  const [editClassDialogOpen, setEditClassDialogOpen] = useState(false);
  const [viewClassDialogOpen, setViewClassDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<TeacherClass | null>(null);

  // Mock data
  const teacherClasses: TeacherClass[] = [
    {
      id: '1',
      name: 'Advanced Calculus',
      subject: 'Mathematics',
      gradeLevel: '12',
      description: 'Advanced calculus concepts including derivatives, integrals, and applications',
      schedule: {
        days: ['Monday', 'Wednesday', 'Friday'],
        startTime: '09:00',
        endTime: '10:30',
        room: 'Room 205'
      },
      students: { total: 28, active: 27 },
      assignments: { total: 8, pending: 3 },
      averageGrade: 87.5,
      status: 'active',
      semester: 'Spring 2024',
      academicYear: '2023-2024'
    },
    {
      id: '2',
      name: 'Algebra II',
      subject: 'Mathematics',
      gradeLevel: '11',
      description: 'Intermediate algebra covering quadratic functions, polynomials, and logarithms',
      schedule: {
        days: ['Tuesday', 'Thursday'],
        startTime: '10:45',
        endTime: '12:15',
        room: 'Room 203'
      },
      students: { total: 25, active: 24 },
      assignments: { total: 6, pending: 2 },
      averageGrade: 82.3,
      status: 'active',
      semester: 'Spring 2024',
      academicYear: '2023-2024'
    },
    {
      id: '3',
      name: 'Statistics',
      subject: 'Mathematics',
      gradeLevel: '12',
      description: 'Introduction to statistical analysis and probability theory',
      schedule: {
        days: ['Monday', 'Wednesday'],
        startTime: '14:00',
        endTime: '15:30',
        room: 'Room 207'
      },
      students: { total: 22, active: 22 },
      assignments: { total: 5, pending: 1 },
      averageGrade: 89.1,
      status: 'active',
      semester: 'Spring 2024',
      academicYear: '2023-2024'
    },
  ];

  const [newClass, setNewClass] = useState({
    name: '',
    subject: '',
    gradeLevel: '',
    description: '',
    days: [] as string[],
    startTime: '',
    endTime: '',
    room: '',
    semester: '',
  });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];
  const gradeLevels = ['9', '10', '11', '12'];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const semesters = ['Fall 2024', 'Spring 2024', 'Summer 2024'];

  const filteredClasses = teacherClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || cls.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || cls.status === statusFilter;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleAddClass = () => {
    console.log('Adding class:', newClass);
    setAddClassDialogOpen(false);
    setNewClass({ 
      name: '', subject: '', gradeLevel: '', description: '', 
      days: [], startTime: '', endTime: '', room: '', semester: '' 
    });
  };

  const handleEditClass = (cls: TeacherClass) => {
    setSelectedClass(cls);
    setNewClass({
      name: cls.name,
      subject: cls.subject,
      gradeLevel: cls.gradeLevel,
      description: cls.description,
      days: cls.schedule.days,
      startTime: cls.schedule.startTime,
      endTime: cls.schedule.endTime,
      room: cls.schedule.room,
      semester: cls.semester,
    });
    setEditClassDialogOpen(true);
  };

  const handleUpdateClass = () => {
    console.log('Updating class:', selectedClass?.id, newClass);
    setEditClassDialogOpen(false);
    setSelectedClass(null);
  };

  const handleViewClass = (cls: TeacherClass) => {
    setSelectedClass(cls);
    setViewClassDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Completed</Badge>;
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

  const classStats = {
    total: teacherClasses.length,
    active: teacherClasses.filter(c => c.status === 'active').length,
    totalStudents: teacherClasses.reduce((acc, c) => acc + c.students.total, 0),
    averageGrade: teacherClasses.reduce((acc, c) => acc + c.averageGrade, 0) / teacherClasses.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                My Classes
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your teaching classes and schedules
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => setAddClassDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Class
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Classes</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{classStats.total}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Classes</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{classStats.active}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{classStats.totalStudents}</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                    <p className={`text-3xl font-bold ${getGradeColor(classStats.averageGrade)}`}>
                      {classStats.averageGrade.toFixed(1)}%
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
                      placeholder="Search classes..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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

        {/* Classes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls, index) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {cls.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {cls.subject}
                          </Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            Grade {cls.gradeLevel}
                          </Badge>
                          {getStatusBadge(cls.status)}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleViewClass(cls)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditClass(cls)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Class
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/teacher/classes/${cls.id}/students`}>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Students
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/teacher/classes/${cls.id}/assignments`}>
                              <FileText className="mr-2 h-4 w-4" />
                              Assignments
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {cls.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Schedule:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {cls.schedule.days.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Time:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {cls.schedule.startTime} - {cls.schedule.endTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Room:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {cls.schedule.room}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{cls.students.active}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Students</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className={`text-lg font-bold ${getGradeColor(cls.averageGrade)}`}>
                          {cls.averageGrade.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Avg Grade</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1" onClick={() => handleViewClass(cls)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEditClass(cls)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No classes found matching your criteria.</p>
              <Button className="mt-4" onClick={() => setAddClassDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Class
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Class Dialog */}
      <Dialog open={addClassDialogOpen} onOpenChange={setAddClassDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  value={newClass.name}
                  onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter class name"
                />
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={newClass.subject} onValueChange={(value) => setNewClass(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="classDescription">Description</Label>
              <Textarea
                id="classDescription"
                value={newClass.description}
                onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter class description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Grade Level</Label>
                <Select value={newClass.gradeLevel} onValueChange={(value) => setNewClass(prev => ({ ...prev, gradeLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
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
                <Label>Semester</Label>
                <Select value={newClass.semester} onValueChange={(value) => setNewClass(prev => ({ ...prev, semester: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  value={newClass.room}
                  onChange={(e) => setNewClass(prev => ({ ...prev, room: e.target.value }))}
                  placeholder="Room 205"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newClass.startTime}
                  onChange={(e) => setNewClass(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newClass.endTime}
                  onChange={(e) => setNewClass(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Schedule Days</Label>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={newClass.days.includes(day) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const updatedDays = newClass.days.includes(day)
                        ? newClass.days.filter(d => d !== day)
                        : [...newClass.days, day];
                      setNewClass(prev => ({ ...prev, days: updatedDays }));
                    }}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAddClassDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClass}>
                Add Class
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
