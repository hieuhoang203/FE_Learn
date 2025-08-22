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
  FileText,
  Clock,
  Calendar,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter
} from 'lucide-react';

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'overdue'>('all');

  const assignments = [
    {
      id: 1,
      title: 'Calculus Integration Problems',
      subject: 'Mathematics 101',
      teacher: 'Dr. Smith',
      dueDate: '2024-08-25',
      dueTime: '5:00 PM',
      status: 'pending',
      description: 'Complete problems 1-15 from Chapter 8. Show all work and include graphs where applicable.',
      points: 100,
      submittedDate: null
    },
    {
      id: 2,
      title: 'Quantum Mechanics Essay',
      subject: 'Physics Advanced',
      teacher: 'Prof. Johnson',
      dueDate: '2024-08-23',
      dueTime: '11:59 PM',
      status: 'submitted',
      description: 'Write a 2000-word essay on the applications of quantum mechanics in modern technology.',
      points: 150,
      submittedDate: '2024-08-22'
    },
    {
      id: 3,
      title: 'Chemical Bonding Lab Report',
      subject: 'Chemistry Basics',
      teacher: 'Ms. Davis',
      dueDate: '2024-08-20',
      dueTime: '2:00 PM',
      status: 'overdue',
      description: 'Submit lab report with observations, calculations, and conclusions from the bonding experiment.',
      points: 75,
      submittedDate: null
    },
    {
      id: 4,
      title: 'Cell Division Diagram',
      subject: 'Biology Lab',
      teacher: 'Dr. Wilson',
      dueDate: '2024-08-28',
      dueTime: '10:00 AM',
      status: 'pending',
      description: 'Create detailed diagrams showing the stages of mitosis and meiosis with proper labeling.',
      points: 80,
      submittedDate: null
    },
    {
      id: 5,
      title: 'Shakespeare Analysis',
      subject: 'English Literature',
      teacher: 'Mrs. Brown',
      dueDate: '2024-08-26',
      dueTime: '3:00 PM',
      status: 'submitted',
      description: 'Analyze the themes and literary devices used in Hamlet Act III.',
      points: 120,
      submittedDate: '2024-08-24'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'overdue':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
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
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Assignments
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Track your assignments and deadlines
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
              >
                All
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
                className={filter === 'pending' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
              >
                Pending
              </Button>
              <Button
                variant={filter === 'submitted' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('submitted')}
                className={filter === 'submitted' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
              >
                Submitted
              </Button>
              <Button
                variant={filter === 'overdue' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('overdue')}
                className={filter === 'overdue' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
              >
                Overdue
              </Button>
            </div>
          </div>

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getStatusColor(assignment.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(assignment.status)}
                          <span className="capitalize">{assignment.status}</span>
                        </div>
                      </Badge>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {assignment.points} pts
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {assignment.title}
                    </CardTitle>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {assignment.subject}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {assignment.teacher}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {assignment.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{assignment.dueTime}</span>
                      </div>
                      
                      {assignment.status === 'pending' && (
                        <div className="flex items-center space-x-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                          <span className="text-yellow-600 dark:text-yellow-400">
                            {getDaysUntilDue(assignment.dueDate)} days remaining
                          </span>
                        </div>
                      )}
                      
                      {assignment.submittedDate && (
                        <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>Submitted on {assignment.submittedDate}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      disabled={assignment.status === 'submitted'}
                    >
                      {assignment.status === 'submitted' ? 'Submitted' : 'View Assignment'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredAssignments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No assignments found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {filter === 'all' ? 'You have no assignments at the moment.' : `No ${filter} assignments found.`}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
