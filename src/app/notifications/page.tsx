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
  Bell,
  ArrowLeft,
  FileText,
  Calendar,
  Award,
  MessageSquare,
  Video,
  Clock,
  Check,
  X,
  Filter,
  MoreVertical
} from 'lucide-react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'assignments' | 'grades' | 'messages'>('all');

  const notifications = [
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'Dr. Smith posted a new assignment: "Calculus Integration Problems"',
      time: '5 minutes ago',
      isRead: false,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      subject: 'Mathematics 101'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grade Updated',
      message: 'Your grade for "Quantum Mechanics Essay" has been updated: A-',
      time: '1 hour ago',
      isRead: false,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      subject: 'Physics Advanced'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'Prof. Johnson sent you a message about the lab report',
      time: '2 hours ago',
      isRead: true,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      subject: 'Physics Advanced'
    },
    {
      id: 4,
      type: 'class',
      title: 'Class Reminder',
      message: 'Chemistry Lab session starts in 30 minutes - Room C-301',
      time: '3 hours ago',
      isRead: false,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      subject: 'Chemistry Basics'
    },
    {
      id: 5,
      type: 'live',
      title: 'Live Class Starting',
      message: 'Mathematics 101 live session is starting now',
      time: '4 hours ago',
      isRead: true,
      icon: Video,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      subject: 'Mathematics 101'
    },
    {
      id: 6,
      type: 'assignment',
      title: 'Assignment Due Soon',
      message: 'Chemical Bonding Lab Report is due in 2 days',
      time: '6 hours ago',
      isRead: true,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      subject: 'Chemistry Basics'
    },
    {
      id: 7,
      type: 'grade',
      title: 'Quiz Results Available',
      message: 'Your Biology Quiz results are now available: 92/100',
      time: '1 day ago',
      isRead: true,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      subject: 'Biology Lab'
    },
    {
      id: 8,
      type: 'message',
      title: 'Group Message',
      message: 'Study Group - Math 101: Alice shared study notes',
      time: '1 day ago',
      isRead: true,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
      subject: 'Mathematics 101'
    }
  ];

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'assignments':
        return notifications.filter(n => n.type === 'assignment');
      case 'grades':
        return notifications.filter(n => n.type === 'grade');
      case 'messages':
        return notifications.filter(n => n.type === 'message');
      default:
        return notifications;
    }
  };

  const markAsRead = (id: number) => {
    // Mark notification as read logic
    console.log('Mark as read:', id);
  };

  const markAllAsRead = () => {
    // Mark all notifications as read logic
    console.log('Mark all as read');
  };

  const deleteNotification = (id: number) => {
    // Delete notification logic
    console.log('Delete notification:', id);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = getFilteredNotifications();

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
        className="relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/homie">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Notifications
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {unreadCount} unread notifications
                  </p>
                </div>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                size="sm"
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
              className={filter === 'unread' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
            >
              Unread ({unreadCount})
            </Button>
            <Button
              variant={filter === 'assignments' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('assignments')}
              className={filter === 'assignments' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
            >
              Assignments
            </Button>
            <Button
              variant={filter === 'grades' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('grades')}
              className={filter === 'grades' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
            >
              Grades
            </Button>
            <Button
              variant={filter === 'messages' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('messages')}
              className={filter === 'messages' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
            >
              Messages
            </Button>
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Card className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                !notification.isRead ? 'ring-2 ring-green-200 dark:ring-green-800' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.bgColor}`}>
                      <notification.icon className={`w-5 h-5 ${notification.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.time}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {notification.subject}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 text-green-600 hover:bg-green-100"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 text-red-600 hover:bg-red-100"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {filter === 'all' ? 'You have no notifications at the moment.' : `No ${filter} notifications found.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
