'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  PenTool, 
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Video
} from 'lucide-react';

export default function SchedulePage() {
  const scheduleData = [
    {
      id: 1,
      day: 'Monday',
      classes: [
        { time: '09:00 - 10:30', subject: 'Mathematics 101', teacher: 'Dr. Smith', room: 'Room A-101', type: 'lecture' },
        { time: '11:00 - 12:30', subject: 'Physics Advanced', teacher: 'Prof. Johnson', room: 'Lab B-205', type: 'lab' },
        { time: '14:00 - 15:30', subject: 'Chemistry Basics', teacher: 'Ms. Davis', room: 'Room C-301', type: 'lecture' },
      ]
    },
    {
      id: 2,
      day: 'Tuesday',
      classes: [
        { time: '10:00 - 11:30', subject: 'Biology Lab', teacher: 'Dr. Wilson', room: 'Lab D-102', type: 'lab' },
        { time: '13:00 - 14:30', subject: 'English Literature', teacher: 'Mrs. Brown', room: 'Room E-203', type: 'lecture' },
        { time: '15:00 - 16:30', subject: 'Mathematics 101', teacher: 'Dr. Smith', room: 'Online', type: 'online' },
      ]
    },
    {
      id: 3,
      day: 'Wednesday',
      classes: [
        { time: '09:00 - 10:30', subject: 'Physics Advanced', teacher: 'Prof. Johnson', room: 'Room A-101', type: 'lecture' },
        { time: '11:00 - 12:30', subject: 'Chemistry Basics', teacher: 'Ms. Davis', room: 'Lab C-301', type: 'lab' },
      ]
    },
    {
      id: 4,
      day: 'Thursday',
      classes: [
        { time: '10:00 - 11:30', subject: 'English Literature', teacher: 'Mrs. Brown', room: 'Room E-203', type: 'lecture' },
        { time: '14:00 - 15:30', subject: 'Biology Lab', teacher: 'Dr. Wilson', room: 'Lab D-102', type: 'lab' },
        { time: '16:00 - 17:30', subject: 'Mathematics 101', teacher: 'Dr. Smith', room: 'Online', type: 'online' },
      ]
    },
    {
      id: 5,
      day: 'Friday',
      classes: [
        { time: '09:00 - 10:30', subject: 'Physics Advanced', teacher: 'Prof. Johnson', room: 'Lab B-205', type: 'lab' },
        { time: '11:00 - 12:30', subject: 'Chemistry Basics', teacher: 'Ms. Davis', room: 'Room C-301', type: 'lecture' },
      ]
    }
  ];

  const getClassTypeIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <PenTool className="w-4 h-4" />;
      case 'online':
        return <Video className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'lab':
        return 'bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'online':
        return 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Educational Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -15 }}
          animate={{ opacity: 0.05, x: 0, rotate: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-20 left-10"
        >
          <BookOpen className="w-24 h-24 text-green-600 dark:text-green-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 15 }}
          animate={{ opacity: 0.05, x: 0, rotate: 0 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute top-32 right-16"
        >
          <GraduationCap className="w-20 h-20 text-emerald-600 dark:text-emerald-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100, rotate: -10 }}
          animate={{ opacity: 0.05, y: 0, rotate: 0 }}
          transition={{ duration: 2, delay: 0.9 }}
          className="absolute bottom-20 left-20"
        >
          <PenTool className="w-16 h-16 text-teal-600 dark:text-teal-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -100, rotate: 20 }}
          animate={{ opacity: 0.05, y: 0, rotate: 0 }}
          transition={{ duration: 2, delay: 1.1 }}
          className="absolute bottom-32 right-10"
        >
          <Users className="w-18 h-18 text-green-500 dark:text-green-300" />
        </motion.div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/homie">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  My Schedule
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Your weekly class schedule
                </p>
              </div>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {scheduleData.map((day, dayIndex) => (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
              >
                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">
                      {day.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {day.classes.map((classItem, classIndex) => (
                      <motion.div
                        key={classIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (dayIndex * 0.1) + (classIndex * 0.05) }}
                        className={`p-3 rounded-lg border ${getClassTypeColor(classItem.type)} hover:shadow-md transition-shadow cursor-pointer`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getClassTypeIcon(classItem.type)}
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                              {classItem.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{classItem.time}</span>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                          {classItem.subject}
                        </h4>
                        
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {classItem.teacher}
                        </p>
                        
                        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{classItem.room}</span>
                        </div>
                      </motion.div>
                    ))}
                    
                    {day.classes.length === 0 && (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No classes today</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
