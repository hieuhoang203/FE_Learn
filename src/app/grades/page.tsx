'use client';

import React from 'react';
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
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowLeft,
  BarChart3,
  Target
} from 'lucide-react';

export default function GradesPage() {
  const grades = [
    {
      id: 1,
      subject: 'Mathematics 101',
      teacher: 'Dr. Smith',
      currentGrade: 'A-',
      percentage: 88.5,
      assignments: [
        { name: 'Quiz 1', score: 95, maxScore: 100, weight: 10 },
        { name: 'Midterm Exam', score: 82, maxScore: 100, weight: 25 },
        { name: 'Homework Set 1', score: 90, maxScore: 100, weight: 15 },
        { name: 'Project', score: 85, maxScore: 100, weight: 20 }
      ],
      trend: 'up'
    },
    {
      id: 2,
      subject: 'Physics Advanced',
      teacher: 'Prof. Johnson',
      currentGrade: 'B+',
      percentage: 87.2,
      assignments: [
        { name: 'Lab Report 1', score: 92, maxScore: 100, weight: 15 },
        { name: 'Quiz 1', score: 78, maxScore: 100, weight: 10 },
        { name: 'Midterm Exam', score: 88, maxScore: 100, weight: 30 },
        { name: 'Problem Set 1', score: 85, maxScore: 100, weight: 10 }
      ],
      trend: 'up'
    },
    {
      id: 3,
      subject: 'Chemistry Basics',
      teacher: 'Ms. Davis',
      currentGrade: 'B',
      percentage: 82.1,
      assignments: [
        { name: 'Lab Practical', score: 88, maxScore: 100, weight: 20 },
        { name: 'Quiz 1', score: 75, maxScore: 100, weight: 10 },
        { name: 'Quiz 2', score: 80, maxScore: 100, weight: 10 },
        { name: 'Midterm Exam', score: 85, maxScore: 100, weight: 25 }
      ],
      trend: 'stable'
    },
    {
      id: 4,
      subject: 'Biology Lab',
      teacher: 'Dr. Wilson',
      currentGrade: 'A',
      percentage: 91.3,
      assignments: [
        { name: 'Lab Report 1', score: 95, maxScore: 100, weight: 20 },
        { name: 'Lab Report 2', score: 88, maxScore: 100, weight: 20 },
        { name: 'Quiz 1', score: 92, maxScore: 100, weight: 15 },
        { name: 'Practical Exam', score: 90, maxScore: 100, weight: 25 }
      ],
      trend: 'up'
    },
    {
      id: 5,
      subject: 'English Literature',
      teacher: 'Mrs. Brown',
      currentGrade: 'B-',
      percentage: 79.8,
      assignments: [
        { name: 'Essay 1', score: 82, maxScore: 100, weight: 25 },
        { name: 'Quiz 1', score: 75, maxScore: 100, weight: 10 },
        { name: 'Presentation', score: 85, maxScore: 100, weight: 20 },
        { name: 'Midterm Exam', score: 78, maxScore: 100, weight: 30 }
      ],
      trend: 'down'
    }
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeBadgeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const overallGPA = (grades.reduce((sum, grade) => sum + (grade.percentage / 25), 0) / grades.length).toFixed(2);

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
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  My Grades
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Track your academic performance
                </p>
              </div>
            </div>
          </div>

          {/* Overall GPA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Overall GPA</h2>
                    <p className="text-white/80">Current semester performance</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">{overallGPA}</div>
                    <div className="flex items-center space-x-1 text-white/80">
                      <Target className="w-4 h-4" />
                      <span>out of 4.0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Grades Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grades.map((grade, index) => (
              <motion.div
                key={grade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getGradeBadgeColor(grade.percentage)}>
                        {grade.currentGrade}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(grade.trend)}
                        <span className={`text-lg font-bold ${getGradeColor(grade.percentage)}`}>
                          {grade.percentage}%
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {grade.subject}
                    </CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {grade.teacher}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Recent Assignments
                      </h4>
                      {grade.assignments.slice(0, 3).map((assignment, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 truncate">
                            {assignment.name}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${getGradeColor((assignment.score / assignment.maxScore) * 100)}`}>
                              {assignment.score}/{assignment.maxScore}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({assignment.weight}%)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      View Details
                    </Button>
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
