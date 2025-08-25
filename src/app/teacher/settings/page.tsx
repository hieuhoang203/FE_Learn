'use client';

import React, { useState } from 'react';
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
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  User,
  Bell,
  Shield,
  Palette,
  GraduationCap,
  Save,
  Camera,
  Mail,
  Phone,
  Lock
} from 'lucide-react';
import Avatar from '@/components/ui/avatar';

export default function TeacherSettings() {
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+1234567890',
    bio: 'Mathematics teacher with 10+ years of experience in advanced calculus and algebra.',
    employeeId: 'EMP001',
    department: 'Mathematics',
    specialization: 'Advanced Calculus, Algebra',
    officeHours: 'Monday-Friday 2:00-4:00 PM',
    officeLocation: 'Room 205, Math Building',
    qualifications: 'Ph.D. in Mathematics, M.Ed. in Education'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    assignmentSubmissions: true,
    gradeReminders: true,
    classUpdates: true,
    parentMessages: true,
    weeklyReports: true,
  });

  const [preferences, setPreferences] = useState({
    theme: 'system',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    defaultGradingScale: 'percentage',
    autoSaveInterval: '5',
  });

  const [teaching, setTeaching] = useState({
    allowLateSubmissions: true,
    lateSubmissionPenalty: '10',
    gradingMethod: 'points',
    showGradesImmediately: false,
    allowStudentMessages: true,
    requireParentNotification: true,
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications);
  };

  const handleSavePreferences = () => {
    console.log('Saving preferences:', preferences);
  };

  const handleSaveTeaching = () => {
    console.log('Saving teaching settings:', teaching);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your account settings and teaching preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="teaching" className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>Teaching</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Professional Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-4">
                    <Avatar name={profile.name} size="xl" />
                    <div>
                      <Button variant="outline" size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={profile.employeeId}
                        onChange={(e) => setProfile(prev => ({ ...prev, employeeId: e.target.value }))}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={profile.department} onValueChange={(value) => setProfile(prev => ({ ...prev, department: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                          <SelectItem value="Biology">Biology</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="officeLocation">Office Location</Label>
                      <Input
                        id="officeLocation"
                        value={profile.officeLocation}
                        onChange={(e) => setProfile(prev => ({ ...prev, officeLocation: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={profile.specialization}
                      onChange={(e) => setProfile(prev => ({ ...prev, specialization: e.target.value }))}
                      placeholder="e.g., Advanced Calculus, Algebra"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="officeHours">Office Hours</Label>
                    <Input
                      id="officeHours"
                      value={profile.officeHours}
                      onChange={(e) => setProfile(prev => ({ ...prev, officeHours: e.target.value }))}
                      placeholder="e.g., Monday-Friday 2:00-4:00 PM"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell students and parents about your teaching experience..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Textarea
                      id="qualifications"
                      value={profile.qualifications}
                      onChange={(e) => setProfile(prev => ({ ...prev, qualifications: e.target.value }))}
                      placeholder="List your degrees, certifications, and qualifications..."
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="assignmentSubmissions">Assignment Submissions</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when students submit assignments</p>
                      </div>
                      <Switch
                        id="assignmentSubmissions"
                        checked={notifications.assignmentSubmissions}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, assignmentSubmissions: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="gradeReminders">Grade Reminders</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Reminders to grade pending assignments</p>
                      </div>
                      <Switch
                        id="gradeReminders"
                        checked={notifications.gradeReminders}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, gradeReminders: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="parentMessages">Parent Messages</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of messages from parents</p>
                      </div>
                      <Switch
                        id="parentMessages"
                        checked={notifications.parentMessages}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, parentMessages: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weeklyReports">Weekly Reports</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive weekly class performance reports</p>
                      </div>
                      <Switch
                        id="weeklyReports"
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveNotifications}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Display & System Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select value={preferences.theme} onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Grading Scale</Label>
                      <Select value={preferences.defaultGradingScale} onValueChange={(value) => setPreferences(prev => ({ ...prev, defaultGradingScale: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                          <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                          <SelectItem value="points">Points Based</SelectItem>
                          <SelectItem value="gpa">GPA Scale (0-4.0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Auto-save Interval</Label>
                      <Select value={preferences.autoSaveInterval} onValueChange={(value) => setPreferences(prev => ({ ...prev, autoSaveInterval: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 minute</SelectItem>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSavePreferences}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Teaching Tab */}
            <TabsContent value="teaching">
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Teaching Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowLateSubmissions">Allow Late Submissions</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Allow students to submit assignments after deadline</p>
                      </div>
                      <Switch
                        id="allowLateSubmissions"
                        checked={teaching.allowLateSubmissions}
                        onCheckedChange={(checked) => setTeaching(prev => ({ ...prev, allowLateSubmissions: checked }))}
                      />
                    </div>

                    {teaching.allowLateSubmissions && (
                      <div className="space-y-2 ml-4">
                        <Label htmlFor="lateSubmissionPenalty">Late Submission Penalty (%)</Label>
                        <Input
                          id="lateSubmissionPenalty"
                          type="number"
                          value={teaching.lateSubmissionPenalty}
                          onChange={(e) => setTeaching(prev => ({ ...prev, lateSubmissionPenalty: e.target.value }))}
                          placeholder="10"
                          className="w-32"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Default Grading Method</Label>
                      <Select value={teaching.gradingMethod} onValueChange={(value) => setTeaching(prev => ({ ...prev, gradingMethod: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="points">Points Based</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="rubric">Rubric Based</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showGradesImmediately">Show Grades Immediately</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Students see grades as soon as you enter them</p>
                      </div>
                      <Switch
                        id="showGradesImmediately"
                        checked={teaching.showGradesImmediately}
                        onCheckedChange={(checked) => setTeaching(prev => ({ ...prev, showGradesImmediately: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowStudentMessages">Allow Student Messages</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Allow students to send you direct messages</p>
                      </div>
                      <Switch
                        id="allowStudentMessages"
                        checked={teaching.allowStudentMessages}
                        onCheckedChange={(checked) => setTeaching(prev => ({ ...prev, allowStudentMessages: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireParentNotification">Require Parent Notification</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Notify parents of important grade changes</p>
                      </div>
                      <Switch
                        id="requireParentNotification"
                        checked={teaching.requireParentNotification}
                        onCheckedChange={(checked) => setTeaching(prev => ({ ...prev, requireParentNotification: checked }))}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Security</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Two-Factor Authentication
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveTeaching}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Teaching Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
