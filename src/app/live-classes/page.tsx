'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  PenTool, 
  Video,
  Clock,
  Calendar,
  ArrowLeft,
  Play,
  Pause,
  UserCheck,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor
} from 'lucide-react';

export default function LiveClassesPage() {
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'recorded'>('all');

  const liveClasses = [
    {
      id: 1,
      title: 'Advanced Calculus - Integration Techniques',
      subject: 'Mathematics 101',
      teacher: 'Dr. Smith',
      startTime: '2024-08-22T14:00:00',
      duration: 90,
      status: 'live',
      participants: 23,
      maxParticipants: 30,
      description: 'Deep dive into integration by parts and substitution methods',
      meetingId: 'MTH-101-001',
      recordingAvailable: false
    },
    {
      id: 2,
      title: 'Quantum Physics Fundamentals',
      subject: 'Physics Advanced',
      teacher: 'Prof. Johnson',
      startTime: '2024-08-22T16:00:00',
      duration: 120,
      status: 'upcoming',
      participants: 0,
      maxParticipants: 25,
      description: 'Introduction to quantum mechanics and wave-particle duality',
      meetingId: 'PHY-ADV-002',
      recordingAvailable: false
    },
    {
      id: 3,
      title: 'Organic Chemistry Lab Session',
      subject: 'Chemistry Basics',
      teacher: 'Ms. Davis',
      startTime: '2024-08-21T10:00:00',
      duration: 180,
      status: 'recorded',
      participants: 28,
      maxParticipants: 30,
      description: 'Virtual lab demonstration of organic synthesis reactions',
      meetingId: 'CHM-BAS-003',
      recordingAvailable: true
    },
    {
      id: 4,
      title: 'Cell Biology Microscopy',
      subject: 'Biology Lab',
      teacher: 'Dr. Wilson',
      startTime: '2024-08-23T09:00:00',
      duration: 150,
      status: 'upcoming',
      participants: 0,
      maxParticipants: 20,
      description: 'Live microscopy session examining cell structures',
      meetingId: 'BIO-LAB-004',
      recordingAvailable: false
    },
    {
      id: 5,
      title: 'Shakespeare Discussion Forum',
      subject: 'English Literature',
      teacher: 'Mrs. Brown',
      startTime: '2024-08-22T11:00:00',
      duration: 60,
      status: 'recorded',
      participants: 25,
      maxParticipants: 35,
      description: 'Interactive discussion on Hamlet themes and character analysis',
      meetingId: 'ENG-LIT-005',
      recordingAvailable: true
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />;
      case 'upcoming':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'recorded':
        return <Play className="w-4 h-4 text-green-600" />;
      default:
        return <Video className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'recorded':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const filteredClasses = liveClasses.filter(classItem => {
    if (filter === 'all') return true;
    return classItem.status === filter;
  });

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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/homie">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Live Classes
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Join live sessions and access recordings
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
              >
                All
              </Button>
              <Button
                variant={filter === 'live' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('live')}
                className={filter === 'live' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
              >
                Live Now
              </Button>
              <Button
                variant={filter === 'upcoming' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('upcoming')}
                className={filter === 'upcoming' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
              >
                Upcoming
              </Button>
              <Button
                variant={filter === 'recorded' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('recorded')}
                className={filter === 'recorded' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
              >
                Recordings
              </Button>
            </div>
          </div>

          {/* Live Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getStatusColor(classItem.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(classItem.status)}
                          <span className="capitalize">{classItem.status}</span>
                        </div>
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {classItem.duration} min
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {classItem.title}
                    </CardTitle>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {classItem.subject}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {classItem.teacher}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {classItem.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(classItem.startTime)} at {formatTime(classItem.startTime)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <UserCheck className="w-4 h-4" />
                        <span>{classItem.participants}/{classItem.maxParticipants} participants</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Monitor className="w-4 h-4" />
                        <span>ID: {classItem.meetingId}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {classItem.status === 'live' && (
                        <Button
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                          asChild
                        >
                          <Link href={`/meeting/${classItem.meetingId}`}>
                            <Video className="w-4 h-4 mr-2" />
                            Join Live
                          </Link>
                        </Button>
                      )}
                      
                      {classItem.status === 'upcoming' && (
                        <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                          <Calendar className="w-4 h-4 mr-2" />
                          Set Reminder
                        </Button>
                      )}
                      
                      {classItem.status === 'recorded' && classItem.recordingAvailable && (
                        <Button
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                          asChild
                        >
                          <Link href={`/watch/${classItem.meetingId}`}>
                            <Play className="w-4 h-4 mr-2" />
                            Watch Recording
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredClasses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No classes found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {filter === 'all' ? 'No classes scheduled at the moment.' : `No ${filter} classes found.`}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
