'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Users,
  Play,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  FileText,
  Video,
  Image,
  Link as LinkIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  duration: number; // in minutes
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  materials: Array<{
    type: 'video' | 'document' | 'image' | 'link';
    name: string;
    url: string;
  }>;
  objectives: string[];
  tags: string[];
}

export default function TeacherLessons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addLessonDialogOpen, setAddLessonDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [viewLessonDialogOpen, setViewLessonDialogOpen] = useState(false);

  // Mock data
  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Calculus',
      description: 'Basic concepts of differential calculus and limits',
      subject: 'Mathematics',
      class: 'Grade 12A',
      duration: 90,
      status: 'published',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      scheduledDate: '2024-01-25',
      materials: [
        { type: 'video', name: 'Calculus Introduction Video', url: '/videos/calc-intro.mp4' },
        { type: 'document', name: 'Calculus Notes.pdf', url: '/docs/calc-notes.pdf' },
        { type: 'link', name: 'Khan Academy Calculus', url: 'https://khanacademy.org/calculus' }
      ],
      objectives: [
        'Understand the concept of limits',
        'Learn basic differentiation rules',
        'Apply calculus to real-world problems'
      ],
      tags: ['calculus', 'mathematics', 'derivatives', 'limits']
    },
    {
      id: '2',
      title: 'Quantum Mechanics Basics',
      description: 'Introduction to quantum physics principles',
      subject: 'Physics',
      class: 'Grade 11B',
      duration: 75,
      status: 'published',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      scheduledDate: '2024-01-26',
      materials: [
        { type: 'video', name: 'Quantum Physics Explained', url: '/videos/quantum.mp4' },
        { type: 'document', name: 'Quantum Theory.pdf', url: '/docs/quantum.pdf' },
        { type: 'image', name: 'Wave-Particle Duality Diagram', url: '/images/wave-particle.png' }
      ],
      objectives: [
        'Understand wave-particle duality',
        'Learn about quantum states',
        'Explore the uncertainty principle'
      ],
      tags: ['quantum', 'physics', 'mechanics', 'waves']
    },
    {
      id: '3',
      title: 'Shakespeare\'s Hamlet Analysis',
      description: 'Deep dive into themes and characters in Hamlet',
      subject: 'English',
      class: 'Grade 10A',
      duration: 60,
      status: 'draft',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-22',
      materials: [
        { type: 'document', name: 'Hamlet Text.pdf', url: '/docs/hamlet.pdf' },
        { type: 'video', name: 'Hamlet Performance', url: '/videos/hamlet.mp4' }
      ],
      objectives: [
        'Analyze main themes in Hamlet',
        'Understand character development',
        'Explore literary devices used'
      ],
      tags: ['shakespeare', 'literature', 'drama', 'analysis']
    },
  ];

  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    duration: '',
    objectives: '',
    tags: '',
  });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];
  const classes = ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A', 'Grade 12B'];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || lesson.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || lesson.status === statusFilter;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleAddLesson = () => {
    console.log('Adding lesson:', newLesson);
    setAddLessonDialogOpen(false);
    setNewLesson({ title: '', description: '', subject: '', class: '', duration: '', objectives: '', tags: '' });
  };

  const handleViewLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setViewLessonDialogOpen(true);
  };

  const handleLessonAction = (lessonId: string, action: string) => {
    console.log(`${action} lesson:`, lessonId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case 'archived':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return null;
    }
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'link': return <LinkIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const lessonStats = {
    total: lessons.length,
    published: lessons.filter(l => l.status === 'published').length,
    draft: lessons.filter(l => l.status === 'draft').length,
    totalDuration: lessons.reduce((acc, l) => acc + l.duration, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                My Lessons
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Create and manage your lesson content
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => setAddLessonDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Lesson
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Lessons</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{lessonStats.total}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{lessonStats.published}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Play className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{lessonStats.draft}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <Edit className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Duration</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{Math.round(lessonStats.totalDuration / 60)}h</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search lessons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {lesson.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {lesson.subject}
                          </Badge>
                          {getStatusBadge(lesson.status)}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleViewLesson(lesson)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleLessonAction(lesson.id, 'edit')}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleLessonAction(lesson.id, 'duplicate')}>
                            <FileText className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleLessonAction(lesson.id, 'delete')}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {lesson.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{lesson.class}</span>
                      </div>
                    </div>

                    {lesson.scheduledDate && (
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>Scheduled: {lesson.scheduledDate}</span>
                      </div>
                    )}

                    {lesson.materials.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Materials:</p>
                        <div className="flex flex-wrap gap-2">
                          {lesson.materials.slice(0, 3).map((material, idx) => (
                            <div key={idx} className="flex items-center space-x-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {getMaterialIcon(material.type)}
                              <span className="truncate max-w-20">{material.name}</span>
                            </div>
                          ))}
                          {lesson.materials.length > 3 && (
                            <span className="text-xs text-gray-500">+{lesson.materials.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1" onClick={() => handleViewLesson(lesson)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => handleLessonAction(lesson.id, 'edit')}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No lessons found matching your criteria.</p>
              <Button className="mt-4" onClick={() => setAddLessonDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Lesson
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Lesson Dialog */}
      <Dialog open={addLessonDialogOpen} onOpenChange={setAddLessonDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Lesson</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lessonTitle">Lesson Title</Label>
                <Input
                  id="lessonTitle"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter lesson title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lessonDuration">Duration (minutes)</Label>
                <Input
                  id="lessonDuration"
                  type="number"
                  value={newLesson.duration}
                  onChange={(e) => setNewLesson(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="90"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessonDescription">Description</Label>
              <Textarea
                id="lessonDescription"
                value={newLesson.description}
                onChange={(e) => setNewLesson(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter lesson description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={newLesson.subject} onValueChange={(value) => setNewLesson(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={newLesson.class} onValueChange={(value) => setNewLesson(prev => ({ ...prev, class: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessonObjectives">Learning Objectives (one per line)</Label>
              <Textarea
                id="lessonObjectives"
                value={newLesson.objectives}
                onChange={(e) => setNewLesson(prev => ({ ...prev, objectives: e.target.value }))}
                placeholder="Enter learning objectives, one per line"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessonTags">Tags (comma separated)</Label>
              <Input
                id="lessonTags"
                value={newLesson.tags}
                onChange={(e) => setNewLesson(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="calculus, mathematics, derivatives"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAddLessonDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLesson}>
                Create Lesson
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Lesson Dialog */}
      <Dialog open={viewLessonDialogOpen} onOpenChange={setViewLessonDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Lesson Details</DialogTitle>
          </DialogHeader>
          {selectedLesson && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedLesson.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedLesson.description}</p>
                  <div className="flex items-center space-x-2 mt-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">{selectedLesson.subject}</Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">{selectedLesson.class}</Badge>
                    {getStatusBadge(selectedLesson.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Lesson Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Duration:</span> {selectedLesson.duration} minutes</p>
                    <p><span className="font-medium">Created:</span> {selectedLesson.createdAt}</p>
                    <p><span className="font-medium">Updated:</span> {selectedLesson.updatedAt}</p>
                    {selectedLesson.scheduledDate && (
                      <p><span className="font-medium">Scheduled:</span> {selectedLesson.scheduledDate}</p>
                    )}
                  </div>

                  {selectedLesson.objectives.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Learning Objectives</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {selectedLesson.objectives.map((objective, idx) => (
                          <li key={idx} className="text-gray-600 dark:text-gray-400">{objective}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Materials</h4>
                  {selectedLesson.materials.length > 0 ? (
                    <div className="space-y-2">
                      {selectedLesson.materials.map((material, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          {getMaterialIcon(material.type)}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{material.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{material.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No materials added yet</p>
                  )}

                  {selectedLesson.tags.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Tags</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedLesson.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setViewLessonDialogOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Lesson
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
