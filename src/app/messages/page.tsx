'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  PenTool, 
  MessageCircle,
  Search,
  ArrowLeft,
  Send,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Circle
} from 'lucide-react';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Dr. Smith',
      role: 'Mathematics Teacher',
      lastMessage: 'The assignment deadline has been extended to Friday.',
      time: '2:30 PM',
      unread: 2,
      online: true,
      avatar: 'DS'
    },
    {
      id: 2,
      name: 'Study Group - Math 101',
      role: 'Group Chat',
      lastMessage: 'Alice: Can someone explain question 5?',
      time: '1:45 PM',
      unread: 5,
      online: false,
      avatar: 'SG',
      isGroup: true
    },
    {
      id: 3,
      name: 'Prof. Johnson',
      role: 'Physics Teacher',
      lastMessage: 'Great work on the lab report!',
      time: '11:20 AM',
      unread: 0,
      online: false,
      avatar: 'PJ'
    },
    {
      id: 4,
      name: 'Alice Johnson',
      role: 'Classmate',
      lastMessage: 'Thanks for helping with the homework!',
      time: 'Yesterday',
      unread: 0,
      online: true,
      avatar: 'AJ'
    },
    {
      id: 5,
      name: 'Ms. Davis',
      role: 'Chemistry Teacher',
      lastMessage: 'Lab session tomorrow at 2 PM',
      time: 'Yesterday',
      unread: 1,
      online: false,
      avatar: 'MD'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Smith',
      content: 'Hello! I hope you\'re doing well with the calculus problems.',
      time: '2:25 PM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Hi Professor! Yes, I\'m working through them. I have a question about integration by parts.',
      time: '2:27 PM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Dr. Smith',
      content: 'Of course! What specific part are you having trouble with?',
      time: '2:28 PM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'You',
      content: 'I\'m confused about when to choose u and dv in the formula.',
      time: '2:29 PM',
      isOwn: true
    },
    {
      id: 5,
      sender: 'Dr. Smith',
      content: 'Great question! Remember the LIATE rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential. Choose u in that order of priority.',
      time: '2:30 PM',
      isOwn: false
    },
    {
      id: 6,
      sender: 'Dr. Smith',
      content: 'The assignment deadline has been extended to Friday.',
      time: '2:30 PM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/homie">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Messages
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chat with teachers and classmates
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-100 dark:bg-gray-800 border-0"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-2 p-0">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                    className={`flex items-center space-x-3 p-4 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      selectedChat === conversation.id ? 'bg-green-50 dark:bg-green-900/20 border-r-2 border-green-500' : ''
                    }`}
                  >
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        conversation.isGroup 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-600'
                      }`}>
                        <span className="text-white font-bold text-sm">
                          {conversation.avatar}
                        </span>
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {conversation.role}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {conversation.unread}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {selectedChat ? (
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {conversations.find(c => c.id === selectedChat)?.avatar}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {conversations.find(c => c.id === selectedChat)?.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {conversations.find(c => c.id === selectedChat)?.online ? 'Online' : 'Last seen recently'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-gray-100 dark:bg-gray-800 border-0"
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
