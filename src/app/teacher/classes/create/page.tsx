'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Users,
  Save,
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Plus,
  X
} from 'lucide-react';

interface ClassSchedule {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
}

export default function CreateClass() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [newSchedule, setNewSchedule] = useState({
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    room: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subjectId: '',
    gradeLevel: '',
    maxStudents: '',
    classCode: '',
    academicYear: '',
    semester: '',
  });

  // Mock data
  const subjects = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Physics' },
    { id: '3', name: 'Chemistry' },
    { id: '4', name: 'Biology' },
    { id: '5', name: 'English' },
    { id: '6', name: 'History' },
  ];

  const gradeLevels = [
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' },
  ];

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSchedule = () => {
    if (newSchedule.dayOfWeek && newSchedule.startTime && newSchedule.endTime) {
      const schedule: ClassSchedule = {
        id: Date.now().toString(),
        dayOfWeek: newSchedule.dayOfWeek,
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        room: newSchedule.room,
      };
      
      setSchedules(prev => [...prev, schedule]);
      setNewSchedule({ dayOfWeek: '', startTime: '', endTime: '', room: '' });
    }
  };

  const removeSchedule = (id: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  const generateClassCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({ ...prev, classCode: code }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const classData = {
        ...formData,
        schedules,
      };
      
      console.log('Creating class:', classData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/teacher/classes');
    } catch (error) {
      console.error('Error creating class:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDayLabel = (day: string) => {
    return daysOfWeek.find(d => d.value === day)?.label || day;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Create New Class
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Set up a new class for your students
                </p>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Class Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Class Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Advanced Mathematics"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formData.subjectId} onValueChange={(value) => handleInputChange('subjectId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradeLevel">Grade Level</Label>
                    <Select value={formData.gradeLevel} onValueChange={(value) => handleInputChange('gradeLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeLevels.map((grade) => (
                          <SelectItem key={grade.value} value={grade.value}>
                            {grade.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStudents">Max Students</Label>
                    <Input
                      id="maxStudents"
                      type="number"
                      placeholder="30"
                      value={formData.maxStudents}
                      onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="classCode">Class Code</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="classCode"
                        placeholder="AUTO-GENERATED"
                        value={formData.classCode}
                        onChange={(e) => handleInputChange('classCode', e.target.value)}
                        readOnly
                      />
                      <Button type="button" variant="outline" onClick={generateClassCode}>
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input
                      id="academicYear"
                      placeholder="2024-2025"
                      value={formData.academicYear}
                      onChange={(e) => handleInputChange('academicYear', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Semester 1</SelectItem>
                        <SelectItem value="2">Semester 2</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the class"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Class Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Class Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Schedule Form */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Select value={newSchedule.dayOfWeek} onValueChange={(value) => setNewSchedule(prev => ({ ...prev, dayOfWeek: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="time"
                    placeholder="Start time"
                    value={newSchedule.startTime}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                  <Input
                    type="time"
                    placeholder="End time"
                    value={newSchedule.endTime}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                  <Input
                    placeholder="Room (optional)"
                    value={newSchedule.room}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, room: e.target.value }))}
                  />
                  <Button type="button" onClick={addSchedule} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>

                {/* Schedules List */}
                {schedules.length > 0 && (
                  <div className="space-y-2">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {getDayLabel(schedule.dayOfWeek)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                          </div>
                          {schedule.room && (
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">
                                Room {schedule.room}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSchedule(schedule.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-end space-x-4"
          >
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Class
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
