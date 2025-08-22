'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  BookOpen,
  GraduationCap,
  Users,
  PenTool,
  Search,
  Bell,
  MessageCircle,
  Home,
  Calendar,
  FileText,
  Video,
  Award,
  ChevronDown,
  Plus,
  Heart,
  Share2,
  MessageSquare,
  MoreHorizontal,
  Send,
  X,
  Minimize2,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function HomePage() {
  const [showClassList, setShowClassList] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{[key: string]: Array<{id: number, sender: string, message: string, time: string}>}>({
    'Alice Johnson': [
      { id: 1, sender: 'Alice Johnson', message: 'Hey! How did you find the math quiz?', time: '2:30 PM' },
      { id: 2, sender: 'You', message: 'It was challenging! What about question 5?', time: '2:32 PM' },
      { id: 3, sender: 'Alice Johnson', message: 'I struggled with that one too 😅', time: '2:33 PM' },
    ],
    'Bob Smith': [
      { id: 1, sender: 'Bob Smith', message: 'Are you joining the study group tonight?', time: '1:15 PM' },
      { id: 2, sender: 'You', message: 'Yes! What time?', time: '1:20 PM' },
    ]
  });
  const [newMessage, setNewMessage] = useState('');
  const [minimizedChats, setMinimizedChats] = useState<string[]>([]);

  const handleChatClick = (userName: string) => {
    setActiveChatUser(userName);
    setMinimizedChats(prev => prev.filter(name => name !== userName));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChatUser) {
      const newMsg = {
        id: Date.now(),
        sender: 'You',
        message: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => ({
        ...prev,
        [activeChatUser]: [...(prev[activeChatUser] || []), newMsg]
      }));

      setNewMessage('');
    }
  };

  const handleMinimizeChat = (userName: string) => {
    setMinimizedChats(prev => [...prev, userName]);
    if (activeChatUser === userName) {
      setActiveChatUser(null);
    }
  };

  const handleCloseChat = (userName: string) => {
    setActiveChatUser(null);
    setMinimizedChats(prev => prev.filter(name => name !== userName));
  };

  const classes = [
    { id: 1, name: 'Mathematics 101', teacher: 'Dr. Smith', students: 25, color: 'bg-blue-500' },
    { id: 2, name: 'Physics Advanced', teacher: 'Prof. Johnson', students: 18, color: 'bg-purple-500' },
    { id: 3, name: 'Chemistry Basics', teacher: 'Ms. Davis', students: 30, color: 'bg-green-500' },
    { id: 4, name: 'Biology Lab', teacher: 'Dr. Wilson', students: 22, color: 'bg-orange-500' },
    { id: 5, name: 'English Literature', teacher: 'Mrs. Brown', students: 28, color: 'bg-pink-500' },
  ];

  const posts = [
    {
      id: 1,
      author: 'Dr. Smith',
      subject: 'Mathematics 101',
      time: '2 hours ago',
      content: 'New assignment posted: Calculus Integration Problems. Due date: Friday, 5 PM. Please review chapters 8-10 before attempting.',
      likes: 12,
      comments: 5,
      type: 'assignment'
    },
    {
      id: 2,
      author: 'Prof. Johnson',
      subject: 'Physics Advanced',
      time: '4 hours ago',
      content: 'Great job everyone on the quantum mechanics quiz! Average score was 85%. Keep up the excellent work!',
      likes: 28,
      comments: 8,
      type: 'announcement'
    },
    {
      id: 3,
      author: 'Ms. Davis',
      subject: 'Chemistry Basics',
      time: '1 day ago',
      content: 'Lab session tomorrow at 2 PM. Please bring your safety goggles and lab coats. We\'ll be working with acids.',
      likes: 15,
      comments: 3,
      type: 'reminder'
    }
  ];

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
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                EduLearn
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses, assignments, or classmates..."
                  className="pl-10 bg-gray-100 dark:bg-gray-800 border-0 focus-visible:ring-2 focus-visible:ring-green-500"
                />
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/homie">
                  <Home className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/messages">
                  <MessageCircle className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/notifications">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/profile">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/schedule">
                    <Calendar className="mr-3 h-4 w-4" />
                    My Schedule
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/assignments">
                    <FileText className="mr-3 h-4 w-4" />
                    Assignments
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/live-classes">
                    <Video className="mr-3 h-4 w-4" />
                    Live Classes
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/grades">
                    <Award className="mr-3 h-4 w-4" />
                    Grades
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Create Post */}
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <Input
                    placeholder="Share something with your class..."
                    className="flex-1 bg-gray-100 dark:bg-gray-800 border-0 rounded-full"
                  />
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {post.author}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {post.subject} • {post.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
            {/* Classes List Button */}
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  My Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DropdownMenu open={showClassList} onOpenChange={setShowClassList}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
                    >
                      View All Classes
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-2" align="end">
                    <div className="space-y-2">
                      {classes.map((classItem) => (
                        <DropdownMenuItem key={classItem.id} className="p-3 cursor-pointer">
                          <div className="flex items-center space-x-3 w-full">
                            <div className={`w-3 h-3 rounded-full ${classItem.color}`}></div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {classItem.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {classItem.teacher} • {classItem.students} students
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Math Quiz
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Tomorrow, 2:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <Video className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Physics Lab
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Friday, 10:00 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Essay Due
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Next Monday
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Online Friends */}
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Online Classmates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson'].map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => handleChatClick(name)}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Chat Box */}
      {activeChatUser && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {activeChatUser.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{activeChatUser}</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => handleMinimizeChat(activeChatUser)}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => handleCloseChat(activeChatUser)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {(chatMessages[activeChatUser] || []).map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.sender === 'You'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'You' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border-gray-300 dark:border-gray-600 focus-visible:ring-green-500"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Minimized Chats */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-40">
        {minimizedChats.map((userName) => (
          <motion.div
            key={userName}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full cursor-pointer hover:from-green-600 hover:to-emerald-700 transition-all"
            onClick={() => handleChatClick(userName)}
          >
            <span className="text-sm font-medium">{userName.split(' ')[0]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
