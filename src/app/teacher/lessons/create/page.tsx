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
  BookOpen,
  Upload,
  Save,
  ArrowLeft,
  FileText,
  Video,
  Image,
  Link as LinkIcon,
  Plus,
  X
} from 'lucide-react';

interface LessonResource {
  id: string;
  type: 'file' | 'video' | 'link' | 'image';
  name: string;
  url: string;
}

export default function CreateLesson() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState<LessonResource[]>([]);
  const [newResource, setNewResource] = useState({ type: 'file', name: '', url: '' });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    classId: '',
    subjectId: '',
    duration: '',
    objectives: '',
    prerequisites: '',
  });

  // Mock data - replace with real API calls
  const classes = [
    { id: '1', name: 'Grade 10A - Mathematics' },
    { id: '2', name: 'Grade 11B - Physics' },
    { id: '3', name: 'Grade 12A - Chemistry' },
  ];

  const subjects = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Physics' },
    { id: '3', name: 'Chemistry' },
    { id: '4', name: 'Biology' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addResource = () => {
    if (newResource.name && newResource.url) {
      const resource: LessonResource = {
        id: Date.now().toString(),
        type: newResource.type as 'file' | 'video' | 'link' | 'image',
        name: newResource.name,
        url: newResource.url,
      };
      setResources(prev => [...prev, resource]);
      setNewResource({ type: 'file', name: '', url: '' });
    }
  };

  const removeResource = (id: string) => {
    setResources(prev => prev.filter(resource => resource.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API call to create lesson
      const lessonData = {
        ...formData,
        resources,
      };
      
      console.log('Creating lesson:', lessonData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/teacher/lessons');
    } catch (error) {
      console.error('Error creating lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'link': return <LinkIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
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
                  Create New Lesson
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Create engaging lessons for your students
                </p>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Lesson Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter lesson title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="45"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select value={formData.classId} onValueChange={(value) => handleInputChange('classId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the lesson"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lesson Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Lesson Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="objectives">Learning Objectives</Label>
                  <Textarea
                    id="objectives"
                    placeholder="What will students learn from this lesson?"
                    value={formData.objectives}
                    onChange={(e) => handleInputChange('objectives', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Lesson Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter the main content of your lesson"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={8}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Textarea
                    id="prerequisites"
                    placeholder="What should students know before this lesson?"
                    value={formData.prerequisites}
                    onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Lesson Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Resource Form */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Select value={newResource.type} onValueChange={(value) => setNewResource(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="file">File</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Resource name"
                    value={newResource.name}
                    onChange={(e) => setNewResource(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="URL or file path"
                    value={newResource.url}
                    onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                  />
                  <Button type="button" onClick={addResource} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>

                {/* Resources List */}
                {resources.length > 0 && (
                  <div className="space-y-2">
                    {resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getResourceIcon(resource.type)}
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{resource.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{resource.url}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeResource(resource.id)}
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
            transition={{ duration: 0.5, delay: 0.3 }}
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
                  Create Lesson
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
