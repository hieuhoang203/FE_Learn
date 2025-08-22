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
  School,
  Search,
  Filter,
  Plus,
  Users,
  BookOpen,
  Calendar,
  Clock,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Class {
  id: string;
  name: string;
  description: string;
  subject: string;
  teacher: string;
  teacherId: string;
  gradeLevel: string;
  maxStudents: number;
  currentStudents: number;
  classCode: string;
  academicYear: string;
  semester: string;
  status: 'active' | 'inactive' | 'completed';
  createdAt: string;
  schedule: Array<{
    day: string;
    startTime: string;
    endTime: string;
    room?: string;
  }>;
}

export default function AdminClasses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addClassDialogOpen, setAddClassDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [viewClassDialogOpen, setViewClassDialogOpen] = useState(false);

  // Mock data
  const classes: Class[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      description: 'Advanced calculus and algebra for grade 12 students',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      teacherId: 'T001',
      gradeLevel: '12',
      maxStudents: 30,
      currentStudents: 28,
      classCode: 'MATH12A',
      academicYear: '2024-2025',
      semester: '1',
      status: 'active',
      createdAt: '2024-01-15',
      schedule: [
        { day: 'Monday', startTime: '09:00', endTime: '10:30', room: 'A101' },
        { day: 'Wednesday', startTime: '09:00', endTime: '10:30', room: 'A101' },
        { day: 'Friday', startTime: '09:00', endTime: '10:30', room: 'A101' },
      ]
    },
    {
      id: '2',
      name: 'Physics Laboratory',
      description: 'Hands-on physics experiments and theory',
      subject: 'Physics',
      teacher: 'Prof. Michael Brown',
      teacherId: 'T002',
      gradeLevel: '11',
      maxStudents: 25,
      currentStudents: 22,
      classCode: 'PHYS11L',
      academicYear: '2024-2025',
      semester: '1',
      status: 'active',
      createdAt: '2024-01-10',
      schedule: [
        { day: 'Tuesday', startTime: '14:00', endTime: '16:00', room: 'Lab B' },
        { day: 'Thursday', startTime: '14:00', endTime: '16:00', room: 'Lab B' },
      ]
    },
    {
      id: '3',
      name: 'English Literature',
      description: 'Classic and modern literature analysis',
      subject: 'English',
      teacher: 'Ms. Emily Davis',
      teacherId: 'T003',
      gradeLevel: '10',
      maxStudents: 35,
      currentStudents: 32,
      classCode: 'ENG10L',
      academicYear: '2024-2025',
      semester: '1',
      status: 'active',
      createdAt: '2024-01-08',
      schedule: [
        { day: 'Monday', startTime: '11:00', endTime: '12:30', room: 'C201' },
        { day: 'Thursday', startTime: '11:00', endTime: '12:30', room: 'C201' },
      ]
    },
  ];

  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    subject: '',
    teacherId: '',
    gradeLevel: '',
    maxStudents: '',
    academicYear: '2024-2025',
    semester: '1',
  });

  // Mock teachers data
  const teachers = [
    { id: 'T001', name: 'Dr. Sarah Johnson' },
    { id: 'T002', name: 'Prof. Michael Brown' },
    { id: 'T003', name: 'Ms. Emily Davis' },
    { id: 'T004', name: 'Mr. David Wilson' },
  ];

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Geography',
    'Computer Science',
  ];

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.classCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || cls.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || cls.status === statusFilter;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleAddClass = () => {
    // API call to add class
    console.log('Adding class:', newClass);
    setAddClassDialogOpen(false);
    setNewClass({
      name: '',
      description: '',
      subject: '',
      teacherId: '',
      gradeLevel: '',
      maxStudents: '',
      academicYear: '2024-2025',
      semester: '1',
    });
  };

  const handleViewClass = (cls: Class) => {
    setSelectedClass(cls);
    setViewClassDialogOpen(true);
  };

  const handleClassAction = (classId: string, action: string) => {
    console.log(`${action} class:`, classId);
    // API call to perform action
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return null;
    }
  };

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600 dark:text-red-400';
    if (percentage >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const classStats = {
    total: classes.length,
    active: classes.filter(c => c.status === 'active').length,
    totalStudents: classes.reduce((acc, c) => acc + c.currentStudents, 0),
    averageCapacity: Math.round((classes.reduce((acc, c) => acc + (c.currentStudents / c.maxStudents), 0) / classes.length) * 100),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Class Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage all classes and their schedules
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
                    <School className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                    <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Capacity</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{classStats.averageCapacity}%</p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <GraduationCap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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

        {/* Classes Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Classes ({filteredClasses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{cls.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{cls.classCode}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar name={cls.teacher} size="sm" />
                          <p className="font-medium text-gray-900 dark:text-gray-100">{cls.teacher}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900 dark:text-gray-100">{cls.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Grade {cls.gradeLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${getCapacityColor(cls.currentStudents, cls.maxStudents)}`}>
                            {cls.currentStudents}/{cls.maxStudents}
                          </span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(cls.currentStudents / cls.maxStudents) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(cls.status)}
                      </TableCell>
                      <TableCell>
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
                            <DropdownMenuItem onClick={() => handleClassAction(cls.id, 'edit')}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleClassAction(cls.id, 'students')}>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Students
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleClassAction(cls.id, 'schedule')}>
                              <Calendar className="mr-2 h-4 w-4" />
                              Edit Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleClassAction(cls.id, 'delete')}
                            >
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
      </div>
  );
}
