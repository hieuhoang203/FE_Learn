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
  GraduationCap,
  Search,
  Filter,
  UserPlus,
  Mail,
  BookOpen,
  Users,
  Award,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
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

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone?: string;
  employeeId: string;
  department: string;
  specialization: string;
  status: 'active' | 'inactive' | 'on-leave';
  hireDate: string;
  lastLogin?: string;
  stats: {
    totalClasses: number;
    totalStudents: number;
    totalLessons: number;
    averageRating: number;
  };
}

export default function AdminTeachers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addTeacherDialogOpen, setAddTeacherDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [viewTeacherDialogOpen, setViewTeacherDialogOpen] = useState(false);

  // Mock data
  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      phone: '+1234567890',
      employeeId: 'EMP001',
      department: 'Mathematics',
      specialization: 'Advanced Calculus, Algebra',
      status: 'active',
      hireDate: '2020-08-15',
      lastLogin: '2024-01-20 14:30',
      stats: {
        totalClasses: 5,
        totalStudents: 127,
        totalLessons: 45,
        averageRating: 4.8,
      }
    },
    {
      id: '2',
      name: 'Prof. Michael Brown',
      email: 'michael.brown@school.edu',
      phone: '+1234567891',
      employeeId: 'EMP002',
      department: 'Physics',
      specialization: 'Quantum Physics, Laboratory',
      status: 'active',
      hireDate: '2019-01-10',
      lastLogin: '2024-01-20 09:15',
      stats: {
        totalClasses: 4,
        totalStudents: 98,
        totalLessons: 38,
        averageRating: 4.6,
      }
    },
    {
      id: '3',
      name: 'Ms. Emily Davis',
      email: 'emily.davis@school.edu',
      employeeId: 'EMP003',
      department: 'English',
      specialization: 'Literature, Creative Writing',
      status: 'on-leave',
      hireDate: '2021-03-08',
      lastLogin: '2024-01-15 16:45',
      stats: {
        totalClasses: 3,
        totalStudents: 85,
        totalLessons: 32,
        averageRating: 4.9,
      }
    },
  ];

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    specialization: '',
    password: '',
  });

  const departments = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || teacher.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddTeacher = () => {
    console.log('Adding teacher:', newTeacher);
    setAddTeacherDialogOpen(false);
    setNewTeacher({ name: '', email: '', phone: '', employeeId: '', department: '', specialization: '', password: '' });
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setViewTeacherDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'on-leave':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
      default:
        return null;
    }
  };

  const teacherStats = {
    total: teachers.length,
    active: teachers.filter(t => t.status === 'active').length,
    totalStudents: teachers.reduce((acc, t) => acc + t.stats.totalStudents, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Teacher Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage teachers and their teaching assignments
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => setAddTeacherDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Teacher
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Teachers</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{teacherStats.total}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Teachers</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{teacherStats.active}</p>
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
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{teacherStats.totalStudents}</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
          transition={{ duration: 0.5, delay: 0.4 }}
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
                      placeholder="Search teachers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
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
                      <SelectItem value="on-leave">On Leave</SelectItem>
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

        {/* Teachers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Teachers ({filteredTeachers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar name={teacher.name} size="sm" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{teacher.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{teacher.employeeId}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900 dark:text-gray-100">{teacher.department}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-gray-100">{teacher.stats.totalStudents}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium text-gray-900 dark:text-gray-100">{teacher.stats.averageRating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(teacher.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleViewTeacher(teacher)}>
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

      {/* Add Teacher Dialog */}
      <Dialog open={addTeacherDialogOpen} onOpenChange={setAddTeacherDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teacherName">Full Name</Label>
              <Input
                id="teacherName"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacherEmail">Email</Label>
              <Input
                id="teacherEmail"
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                value={newTeacher.employeeId}
                onChange={(e) => setNewTeacher(prev => ({ ...prev, employeeId: e.target.value }))}
                placeholder="Enter employee ID"
              />
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={newTeacher.department} onValueChange={(value) => setNewTeacher(prev => ({ ...prev, department: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Textarea
                id="specialization"
                value={newTeacher.specialization}
                onChange={(e) => setNewTeacher(prev => ({ ...prev, specialization: e.target.value }))}
                placeholder="Enter specialization areas"
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAddTeacherDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTeacher}>
                Add Teacher
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Teacher Dialog */}
      <Dialog open={viewTeacherDialogOpen} onOpenChange={setViewTeacherDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Teacher Details</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar name={selectedTeacher.name} size="xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedTeacher.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedTeacher.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">{selectedTeacher.department}</Badge>
                    {getStatusBadge(selectedTeacher.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Personal Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Employee ID:</span> {selectedTeacher.employeeId}</p>
                    <p><span className="font-medium">Email:</span> {selectedTeacher.email}</p>
                    {selectedTeacher.phone && <p><span className="font-medium">Phone:</span> {selectedTeacher.phone}</p>}
                    <p><span className="font-medium">Department:</span> {selectedTeacher.department}</p>
                    <p><span className="font-medium">Specialization:</span> {selectedTeacher.specialization}</p>
                    <p><span className="font-medium">Hire Date:</span> {selectedTeacher.hireDate}</p>
                    <p><span className="font-medium">Last Login:</span> {selectedTeacher.lastLogin || 'Never'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Teaching Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedTeacher.stats.totalClasses}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Classes</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedTeacher.stats.totalStudents}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedTeacher.stats.totalLessons}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Lessons</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{selectedTeacher.stats.averageRating.toFixed(1)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setViewTeacherDialogOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Teacher
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
