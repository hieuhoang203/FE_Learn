'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  Users,
  MapPin,
  GraduationCap,
  FileText,
  Award,
  Eye,
  Play
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  teacherEmail: string;
  classCode: string;
  description: string;
  gradeLevel: string;
  totalStudents: number;
  maxStudents: number;
  academicYear: string;
  semester: string;
  schedule: Array<{
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }>;
  stats: {
    totalLessons: number;
    completedLessons: number;
    totalAssignments: number;
    completedAssignments: number;
    averageGrade: number;
  };
}

export default function StudentClasses() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const classes: ClassInfo[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      teacherEmail: 'sarah.johnson@school.edu',
      classCode: 'MATH12A',
      description: 'Advanced calculus and algebra for grade 12 students',
      gradeLevel: '12',
      totalStudents: 28,
      maxStudents: 30,
      academicYear: '2024-2025',
      semester: '1',
      schedule: [
        { day: 'Monday', startTime: '09:00', endTime: '10:30', room: 'A101' },
        { day: 'Wednesday', startTime: '09:00', endTime: '10:30', room: 'A101' },
        { day: 'Friday', startTime: '09:00', endTime: '10:30', room: 'A101' },
      ],
      stats: {
        totalLessons: 15,
        completedLessons: 12,
        totalAssignments: 8,
        completedAssignments: 6,
        averageGrade: 88.5,
      }
    },
    {
      id: '2',
      name: 'Physics Laboratory',
      subject: 'Physics',
      teacher: 'Prof. Michael Brown',
      teacherEmail: 'michael.brown@school.edu',
      classCode: 'PHYS11L',
      description: 'Hands-on physics experiments and theory',
      gradeLevel: '11',
      totalStudents: 22,
      maxStudents: 25,
      academicYear: '2024-2025',
      semester: '1',
      schedule: [
        { day: 'Tuesday', startTime: '14:00', endTime: '16:00', room: 'Lab B' },
        { day: 'Thursday', startTime: '14:00', endTime: '16:00', room: 'Lab B' },
      ],
      stats: {
        totalLessons: 12,
        completedLessons: 10,
        totalAssignments: 6,
        completedAssignments: 5,
        averageGrade: 82.3,
      }
    },
    {
      id: '3',
      name: 'English Literature',
      subject: 'English',
      teacher: 'Ms. Emily Davis',
      teacherEmail: 'emily.davis@school.edu',
      classCode: 'ENG10L',
      description: 'Classic and modern literature analysis',
      gradeLevel: '10',
      totalStudents: 32,
      maxStudents: 35,
      academicYear: '2024-2025',
      semester: '1',
      schedule: [
        { day: 'Monday', startTime: '11:00', endTime: '12:30', room: 'C201' },
        { day: 'Thursday', startTime: '11:00', endTime: '12:30', room: 'C201' },
      ],
      stats: {
        totalLessons: 18,
        completedLessons: 15,
        totalAssignments: 10,
        completedAssignments: 8,
        averageGrade: 91.2,
      }
    },
  ];

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 dark:text-green-400';
    if (grade >= 80) return 'text-blue-600 dark:text-blue-400';
    if (grade >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getDayAbbreviation = (day: string) => {
    const abbreviations: { [key: string]: string } = {
      'Monday': 'Mon',
      'Tuesday': 'Tue',
      'Wednesday': 'Wed',
      'Thursday': 'Thu',
      'Friday': 'Fri',
      'Saturday': 'Sat',
      'Sunday': 'Sun',
    };
    return abbreviations[day] || day;
  };

  const overallStats = {
    totalClasses: classes.length,
    totalLessons: classes.reduce((acc, cls) => acc + cls.stats.totalLessons, 0),
    completedLessons: classes.reduce((acc, cls) => acc + cls.stats.completedLessons, 0),
    totalAssignments: classes.reduce((acc, cls) => acc + cls.stats.totalAssignments, 0),
    completedAssignments: classes.reduce((acc, cls) => acc + cls.stats.completedAssignments, 0),
    overallAverage: classes.reduce((acc, cls) => acc + cls.stats.averageGrade, 0) / classes.length,
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
                View your enrolled classes and track progress
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link href="/student/schedule">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Schedule
                </Link>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Enrolled Classes</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{overallStats.totalClasses}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lesson Progress</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {overallStats.completedLessons}/{overallStats.totalLessons}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {Math.round((overallStats.completedLessons / overallStats.totalLessons) * 100)}% completed
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignment Progress</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {overallStats.completedAssignments}/{overallStats.totalAssignments}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {Math.round((overallStats.completedAssignments / overallStats.totalAssignments) * 100)}% completed
                    </p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Average</p>
                    <p className={`text-3xl font-bold ${getGradeColor(overallStats.overallAverage)}`}>
                      {overallStats.overallAverage.toFixed(1)}%
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

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="max-w-md">
                <Label htmlFor="search">Search Classes</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by class name, subject, or teacher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClasses.map((classInfo, index) => (
            <motion.div
              key={classInfo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {classInfo.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {classInfo.subject}
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          Grade {classInfo.gradeLevel}
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          {classInfo.classCode}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {classInfo.description}
                  </p>

                  {/* Teacher Info */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{classInfo.teacher}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{classInfo.teacherEmail}</p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Schedule</h4>
                    <div className="space-y-1">
                      {classInfo.schedule.map((schedule, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            <span className="font-medium">{getDayAbbreviation(schedule.day)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span>{schedule.startTime} - {schedule.endTime}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <span>{schedule.room}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Lessons</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {classInfo.stats.completedLessons}/{classInfo.stats.totalLessons}
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(classInfo.stats.completedLessons / classInfo.stats.totalLessons) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Assignments</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {classInfo.stats.completedAssignments}/{classInfo.stats.totalAssignments}
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(classInfo.stats.completedAssignments / classInfo.stats.totalAssignments) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Average Grade */}
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Grade</p>
                    <p className={`text-2xl font-bold ${getGradeColor(classInfo.stats.averageGrade)}`}>
                      {classInfo.stats.averageGrade.toFixed(1)}%
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/student/classes/${classInfo.id}/lessons`}>
                        <Play className="mr-2 h-4 w-4" />
                        View Lessons
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link href={`/student/classes/${classInfo.id}/assignments`}>
                        <FileText className="mr-2 h-4 w-4" />
                        Assignments
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center py-12"
          >
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No classes found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
