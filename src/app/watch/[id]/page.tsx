'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  Download,
  Share2,
  BookOpen,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ArrowLeft,
  FileText,
  User,
  Calendar,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function WatchVideoPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newComment, setNewComment] = useState('');

  // Mock video data
  const videoData = {
    id: videoId,
    title: 'Advanced Calculus: Integration by Parts - Complete Tutorial',
    subject: 'Mathematics 101',
    teacher: 'Dr. Smith',
    duration: '45:30',
    uploadDate: '2024-08-20',
    views: 1247,
    likes: 89,
    dislikes: 3,
    description: 'In this comprehensive tutorial, we will explore the integration by parts technique in calculus. This method is essential for solving complex integrals and is widely used in advanced mathematics. We will cover the formula, multiple examples, and practical applications.',
    chapters: [
      { id: 1, title: 'Introduction to Integration by Parts', time: '0:00', duration: '5:30' },
      { id: 2, title: 'The Formula and Basic Examples', time: '5:30', duration: '12:45' },
      { id: 3, title: 'Advanced Examples', time: '18:15', duration: '15:20' },
      { id: 4, title: 'Practical Applications', time: '33:35', duration: '8:45' },
      { id: 5, title: 'Summary and Practice Problems', time: '42:20', duration: '3:10' }
    ],
    transcript: [
      { time: '0:00', text: 'Welcome to today\'s lesson on integration by parts.' },
      { time: '0:15', text: 'This is one of the most important techniques in calculus.' },
      { time: '0:30', text: 'Let\'s start with the basic formula: ∫u dv = uv - ∫v du' }
    ]
  };

  const comments = [
    {
      id: 1,
      user: 'Alice Johnson',
      time: '2 hours ago',
      content: 'Excellent explanation! The step-by-step approach really helped me understand the concept.',
      likes: 12,
      replies: 2
    },
    {
      id: 2,
      user: 'Bob Smith',
      time: '5 hours ago',
      content: 'Could you please explain more about when to use integration by parts vs substitution?',
      likes: 8,
      replies: 1
    },
    {
      id: 3,
      user: 'Carol Davis',
      time: '1 day ago',
      content: 'The examples at 18:15 were particularly helpful. Thank you Professor!',
      likes: 15,
      replies: 0
    }
  ];

  const [userNotes, setUserNotes] = useState([
    { id: 1, time: '5:30', content: 'Remember: u dv = uv - ∫v du', timestamp: '5:30' },
    { id: 2, time: '18:15', content: 'Advanced example: ∫x²e^x dx', timestamp: '18:15' }
  ]);

  const relatedVideos = [
    {
      id: 'calc-002',
      title: 'Integration by Substitution',
      teacher: 'Dr. Smith',
      duration: '32:15',
      views: 892,
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 'calc-003',
      title: 'Partial Fractions Method',
      teacher: 'Dr. Smith',
      duration: '28:45',
      views: 654,
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 'calc-004',
      title: 'Trigonometric Integrals',
      teacher: 'Prof. Johnson',
      duration: '41:20',
      views: 1123,
      thumbnail: '/api/placeholder/320/180'
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        time: formatTime(currentTime),
        content: newNote.trim(),
        timestamp: formatTime(currentTime)
      };
      setUserNotes([...userNotes, note]);
      setNewNote('');
    }
  };

  const jumpToTime = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    if (videoRef.current) {
      videoRef.current.currentTime = totalSeconds;
      setCurrentTime(totalSeconds);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4"
      >
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/live-classes">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {videoData.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {videoData.subject} • {videoData.teacher}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-black rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="aspect-video relative">
                {/* Placeholder for video */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-white mb-4 mx-auto" />
                    <p className="text-white text-lg">Video Player</p>
                    <p className="text-gray-300 text-sm">Duration: {videoData.duration}</p>
                  </div>
                </div>
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-white text-xs mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{videoData.duration}</span>
                    </div>
                  </div>
                  
                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={togglePlay}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleMute}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <select
                        value={playbackRate}
                        onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                        className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-gray-600"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        <Settings className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Video Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {videoData.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{videoData.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(videoData.uploadDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{videoData.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        {videoData.likes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        {videoData.dislikes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {videoData.teacher.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {videoData.teacher}
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {videoData.subject}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {videoData.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chapters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Chapters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {videoData.chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      onClick={() => jumpToTime(chapter.time)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 w-8">
                          {index + 1}.
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {chapter.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {chapter.duration}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {chapter.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Comments ({comments.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Comment */}
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-800 border-0"
                      />
                      <div className="flex justify-end">
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600">
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {comment.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {comment.user}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {comment.time}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">
                            {comment.content}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              Reply
                            </Button>
                            {comment.replies > 0 && (
                              <span className="text-gray-500 dark:text-gray-400">
                                {comment.replies} replies
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Notes Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>My Notes</span>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowNotes(!showNotes)}
                    >
                      {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {showNotes && (
                  <CardContent className="space-y-4">
                    {/* Add Note */}
                    <div className="space-y-2">
                      <Input
                        placeholder="Add a note at current time..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-800 border-0"
                      />
                      <Button
                        onClick={addNote}
                        size="sm"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                      >
                        Add Note at {formatTime(currentTime)}
                      </Button>
                    </div>

                    {/* Notes List */}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {userNotes.map((note) => (
                        <div
                          key={note.id}
                          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => jumpToTime(note.time)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline" className="text-xs">
                              {note.timestamp}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {note.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>

            {/* Related Videos */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Related Videos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedVideos.map((video) => (
                    <Link
                      key={video.id}
                      href={`/watch/${video.id}`}
                      className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex space-x-3">
                        <div className="w-20 h-12 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {video.teacher}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>{video.views} views</span>
                            <span>•</span>
                            <span>{video.duration}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
