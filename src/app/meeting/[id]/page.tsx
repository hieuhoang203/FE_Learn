'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Monitor, 
  MonitorOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Users,
  Settings,
  MoreVertical,
  Send,
  Hand,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Copy,
  UserPlus
} from 'lucide-react';

export default function MeetingPage() {
  const params = useParams();
  const router = useRouter();
  const meetingId = params.id as string;
  
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data
  const meetingInfo = {
    title: 'Advanced Calculus - Integration Techniques',
    subject: 'Mathematics 101',
    teacher: 'Dr. Smith',
    startTime: '2:00 PM',
    duration: '90 min'
  };

  const participants = [
    { id: 1, name: 'Dr. Smith', role: 'teacher', isMuted: false, isCameraOn: true, isHandRaised: false },
    { id: 2, name: 'Alice Johnson', role: 'student', isMuted: true, isCameraOn: true, isHandRaised: false },
    { id: 3, name: 'Bob Smith', role: 'student', isMuted: true, isCameraOn: false, isHandRaised: true },
    { id: 4, name: 'Carol Davis', role: 'student', isMuted: false, isCameraOn: true, isHandRaised: false },
    { id: 5, name: 'David Wilson', role: 'student', isMuted: true, isCameraOn: true, isHandRaised: false },
    { id: 6, name: 'You', role: 'student', isMuted: isMicOn, isCameraOn: isCameraOn, isHandRaised: isHandRaised }
  ];

  const chatMessages = [
    { id: 1, sender: 'Dr. Smith', message: 'Welcome everyone! Please mute your microphones.', time: '2:01 PM' },
    { id: 2, sender: 'Alice Johnson', message: 'Good afternoon, Professor!', time: '2:02 PM' },
    { id: 3, sender: 'Dr. Smith', message: 'Today we will cover integration by parts. Any questions before we start?', time: '2:03 PM' },
    { id: 4, sender: 'Bob Smith', message: 'Could you share the slides please?', time: '2:04 PM' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Add message logic here
      setChatMessage('');
    }
  };

  const handleLeaveMeeting = () => {
    router.push('/live-classes');
  };

  const copyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700"
      >
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-white font-semibold">{meetingInfo.title}</h1>
            <p className="text-gray-400 text-sm">{meetingInfo.subject} • {meetingInfo.teacher}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyMeetingId}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Copy className="w-4 h-4 mr-2" />
            {meetingId}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {/* Main Speaker (Teacher) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="md:col-span-2 lg:col-span-2 relative bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">DS</span>
                  </div>
                  <p className="text-white font-semibold">{meetingInfo.teacher}</p>
                  <p className="text-gray-300 text-sm">Host</p>
                </div>
              </div>
              
              {/* Controls overlay */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <div className="bg-black/50 rounded-full p-2">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                  Dr. Smith
                </span>
              </div>
            </motion.div>

            {/* Participant Videos */}
            {participants.slice(1, 5).map((participant, index) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  {participant.isCameraOn ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="text-white text-sm">{participant.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <CameraOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">{participant.name}</p>
                    </div>
                  )}
                </div>
                
                {/* Participant controls */}
                <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                  {participant.isMuted ? (
                    <MicOff className="w-3 h-3 text-red-400" />
                  ) : (
                    <Mic className="w-3 h-3 text-green-400" />
                  )}
                  {participant.isHandRaised && (
                    <Hand className="w-3 h-3 text-yellow-400" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        {(showChat || showParticipants) && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col"
          >
            {/* Panel Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <Button
                  variant={showChat ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => { setShowChat(true); setShowParticipants(false); }}
                  className={showChat ? 'bg-green-600 hover:bg-green-700' : 'text-gray-300 hover:text-white'}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button
                  variant={showParticipants ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => { setShowParticipants(true); setShowChat(false); }}
                  className={showParticipants ? 'bg-green-600 hover:bg-green-700' : 'text-gray-300 hover:text-white'}
                >
                  <Users className="w-4 h-4 mr-2" />
                  People ({participants.length})
                </Button>
              </div>
            </div>

            {/* Chat Panel */}
            {showChat && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm font-medium">{msg.sender}</span>
                        <span className="text-gray-400 text-xs">{msg.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Participants Panel */}
            {showParticipants && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{participant.name}</p>
                      <p className="text-gray-400 text-xs capitalize">{participant.role}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {participant.isMuted ? (
                        <MicOff className="w-4 h-4 text-red-400" />
                      ) : (
                        <Mic className="w-4 h-4 text-green-400" />
                      )}
                      {!participant.isCameraOn && (
                        <CameraOff className="w-4 h-4 text-gray-400" />
                      )}
                      {participant.isHandRaised && (
                        <Hand className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 px-6 py-4 border-t border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Meeting ID: {meetingId}</span>
          </div>

          {/* Main Controls */}
          <div className="flex items-center space-x-3">
            <Button
              variant={isMicOn ? 'default' : 'destructive'}
              size="icon"
              onClick={() => setIsMicOn(!isMicOn)}
              className={isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>

            <Button
              variant={isCameraOn ? 'default' : 'destructive'}
              size="icon"
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={isCameraOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}
            >
              {isCameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
            </Button>

            <Button
              variant={isScreenSharing ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={isScreenSharing ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'}
            >
              {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
            </Button>

            <Button
              variant={isHandRaised ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={isHandRaised ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-700 hover:bg-gray-600'}
            >
              <Hand className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowChat(!showChat)}
              className="bg-gray-700 hover:bg-gray-600"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowParticipants(!showParticipants)}
              className="bg-gray-700 hover:bg-gray-600"
            >
              <Users className="w-5 h-5" />
            </Button>

            <Button
              variant="destructive"
              onClick={handleLeaveMeeting}
              className="bg-red-600 hover:bg-red-700 px-6"
            >
              <PhoneOff className="w-5 h-5 mr-2" />
              Leave
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-gray-700 hover:bg-gray-600"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
