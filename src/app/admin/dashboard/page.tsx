'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  GraduationCap,
  BookOpen,
  School,
  TrendingUp,
  UserCheck,
  UserX,
  Calendar,
  FileText,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  // Mock data - replace with real API calls
  const stats = {
    totalUsers: 1247,
    totalTeachers: 45,
    totalStudents: 1180,
    totalClasses: 67,
    totalSubjects: 12,
    totalAssignments: 234,
    activeUsers: 1089,
    newUsersThisMonth: 23,
  };

  const recentActivities = [
    { id: 1, type: 'user_registered', message: 'New teacher John Doe registered', time: '2 hours ago', status: 'info' },
    { id: 2, type: 'class_created', message: 'Advanced Physics class created by Dr. Smith', time: '4 hours ago', status: 'success' },
    { id: 3, type: 'assignment_submitted', message: '15 new assignment submissions', time: '6 hours ago', status: 'info' },
    { id: 4, type: 'system_alert', message: 'Server maintenance scheduled for tonight', time: '8 hours ago', status: 'warning' },
    { id: 5, type: 'grade_updated', message: 'Grades updated for Chemistry class', time: '1 day ago', status: 'success' },
  ];

  const systemHealth = {
    serverStatus: 'healthy',
    databaseStatus: 'healthy',
    storageUsage: 67,
    activeConnections: 234,
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered': return <UserCheck className="h-4 w-4" />;
      case 'class_created': return <School className="h-4 w-4" />;
      case 'assignment_submitted': return <FileText className="h-4 w-4" />;
      case 'system_alert': return <AlertCircle className="h-4 w-4" />;
      case 'grade_updated': return <Award className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Success</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><AlertCircle className="mr-1 h-3 w-3" />Warning</Badge>;
      case 'info':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Clock className="mr-1 h-3 w-3" />Info</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                System overview and management center
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button asChild>
                <Link href="/admin/classes">
                  <School className="mr-2 h-4 w-4" />
                  Manage Classes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+{stats.newUsersThisMonth} this month</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Teachers</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalTeachers}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Active educators</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Students</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalStudents.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Enrolled learners</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Classes</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalClasses}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Active classes</p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <School className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Subjects</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalSubjects}</p>
                  </div>
                  <BookOpen className="h-5 w-5 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignments</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalAssignments}</p>
                  </div>
                  <FileText className="h-5 w-5 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.activeUsers.toLocaleString()}</p>
                  </div>
                  <UserCheck className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Recent Activities
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/activities">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="p-2 bg-white dark:bg-gray-700 rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.message}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                          {getStatusBadge(activity.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">Server Status</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">Database</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">Storage Usage</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{systemHealth.storageUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${systemHealth.storageUsage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">Active Connections</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{systemHealth.activeConnections}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
