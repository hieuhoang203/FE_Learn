'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Calendar,
  Clock,
  Plus,
  BookOpen,
  Users,
  MapPin,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'class' | 'meeting' | 'office-hours' | 'event';
  startTime: string;
  endTime: string;
  date: string;
  location: string;
  description?: string;
  class?: string;
  subject?: string;
  students?: number;
}

export default function TeacherSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [addEventDialogOpen, setAddEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [viewEventDialogOpen, setViewEventDialogOpen] = useState(false);

  // Mock data
  const scheduleEvents: ScheduleEvent[] = [
    {
      id: '1',
      title: 'Advanced Calculus',
      type: 'class',
      startTime: '09:00',
      endTime: '10:30',
      date: '2024-01-22',
      location: 'Room 205',
      class: 'Grade 12A',
      subject: 'Mathematics',
      students: 28
    },
    {
      id: '2',
      title: 'Algebra II',
      type: 'class',
      startTime: '10:45',
      endTime: '12:15',
      date: '2024-01-23',
      location: 'Room 203',
      class: 'Grade 11B',
      subject: 'Mathematics',
      students: 25
    },
    {
      id: '3',
      title: 'Office Hours',
      type: 'office-hours',
      startTime: '14:00',
      endTime: '16:00',
      date: '2024-01-22',
      location: 'Room 205',
      description: 'Available for student consultations'
    },
    {
      id: '4',
      title: 'Department Meeting',
      type: 'meeting',
      startTime: '15:30',
      endTime: '16:30',
      date: '2024-01-24',
      location: 'Conference Room A',
      description: 'Monthly department meeting'
    },
    {
      id: '5',
      title: 'Statistics',
      type: 'class',
      startTime: '14:00',
      endTime: '15:30',
      date: '2024-01-24',
      location: 'Room 207',
      class: 'Grade 12B',
      subject: 'Mathematics',
      students: 22
    },
  ];

  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'class' as const,
    startTime: '',
    endTime: '',
    date: '',
    location: '',
    description: '',
  });

  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return scheduleEvents.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'office-hours':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'event':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddEvent = () => {
    console.log('Adding event:', newEvent);
    setAddEventDialogOpen(false);
    setNewEvent({ title: '', type: 'class', startTime: '', endTime: '', date: '', location: '', description: '' });
  };

  const handleViewEvent = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setViewEventDialogOpen(true);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const todayEvents = getEventsForDate(new Date());
  const weekEvents = scheduleEvents.filter(event => {
    const eventDate = new Date(event.date);
    return weekDates.some(date => 
      date.toISOString().split('T')[0] === event.date
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                My Schedule
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your teaching schedule and appointments
              </p>
            </div>
            <div className="flex space-x-3">
              <Select value={viewMode} onValueChange={(value: 'week' | 'day') => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week View</SelectItem>
                  <SelectItem value="day">Day View</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setAddEventDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Events</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{todayEvents.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{weekEvents.length}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Classes</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {scheduleEvents.filter(e => e.type === 'class').length}
                    </p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Office Hours</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {scheduleEvents.filter(e => e.type === 'office-hours').length}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Calendar Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {viewMode === 'week' ? 'Weekly Schedule' : 'Daily Schedule'}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[200px] text-center">
                    {viewMode === 'week'
                      ? `${weekDates[0].toLocaleDateString()} - ${weekDates[6].toLocaleDateString()}`
                      : currentDate.toLocaleDateString()
                    }
                  </span>
                  <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'week' ? (
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-8 gap-1 min-w-[800px]">
                    {/* Time column header */}
                    <div className="p-2 text-center font-medium text-gray-600 dark:text-gray-400">
                      Time
                    </div>
                    {/* Day headers */}
                    {weekDates.map((date, index) => (
                      <div key={index} className="p-2 text-center">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {date.getDate()}
                        </div>
                      </div>
                    ))}

                    {/* Time slots and events */}
                    {timeSlots.map((time) => (
                      <React.Fragment key={time}>
                        <div className="p-2 text-sm text-gray-600 dark:text-gray-400 border-t">
                          {time}
                        </div>
                        {weekDates.map((date, dayIndex) => {
                          const dayEvents = getEventsForDate(date).filter(event =>
                            event.startTime <= time && event.endTime > time
                          );
                          return (
                            <div key={dayIndex} className="p-1 border-t min-h-[60px]">
                              {dayEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className={`p-2 rounded text-xs cursor-pointer mb-1 border ${getEventTypeColor(event.type)}`}
                                  onClick={() => handleViewEvent(event)}
                                >
                                  <div className="font-medium truncate">{event.title}</div>
                                  <div className="flex items-center space-x-1 mt-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{event.startTime}-{event.endTime}</span>
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="h-3 w-3" />
                                      <span className="truncate">{event.location}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {getEventsForDate(currentDate).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No events scheduled for this day
                    </div>
                  ) : (
                    getEventsForDate(currentDate)
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`p-4 rounded-lg border cursor-pointer ${getEventTypeColor(event.type)}`}
                          onClick={() => handleViewEvent(event)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium">{event.title}</h3>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{event.startTime} - {event.endTime}</span>
                                </div>
                                {event.location && (
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                                {event.students && (
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{event.students} students</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Badge variant="secondary" className="capitalize">
                              {event.type.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={addEventDialogOpen} onOpenChange={setAddEventDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventTitle">Event Title</Label>
              <Input
                id="eventTitle"
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title"
              />
            </div>

            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="office-hours">Office Hours</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate">Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventLocation">Location</Label>
              <Input
                id="eventLocation"
                value={newEvent.location}
                onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAddEventDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>
                Add Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={viewEventDialogOpen} onOpenChange={setViewEventDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{selectedEvent.title}</h3>
                <Badge variant="secondary" className="mt-2 capitalize">
                  {selectedEvent.type.replace('-', ' ')}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-gray-100">{selectedEvent.date}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-gray-100">
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-gray-100">{selectedEvent.location}</span>
                </div>

                {selectedEvent.class && (
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900 dark:text-gray-100">{selectedEvent.class}</span>
                  </div>
                )}

                {selectedEvent.students && (
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900 dark:text-gray-100">{selectedEvent.students} students</span>
                  </div>
                )}

                {selectedEvent.description && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.description}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setViewEventDialogOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Event
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
