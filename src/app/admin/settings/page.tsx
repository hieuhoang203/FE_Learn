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
  Settings,
  School,
  Users,
  Shield,
  Database,
  Save,
  Upload,
  Download,
  Mail,
  Phone,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function AdminSettings() {
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'Greenwood High School',
    address: '123 Education Street, Learning City, LC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@greenwoodhigh.edu',
    website: 'https://www.greenwoodhigh.edu',
    principalName: 'Dr. Michael Anderson',
    establishedYear: '1985',
    motto: 'Excellence in Education',
    description: 'A premier educational institution committed to fostering academic excellence and character development.',
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    enableTwoFactor: false,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    backupFrequency: 'daily',
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@greenwoodhigh.edu',
    smtpPassword: '',
    fromName: 'Greenwood High School',
    fromEmail: 'noreply@greenwoodhigh.edu',
    enableSSL: true,
  });

  const [gradeSettings, setGradeSettings] = useState({
    gradingScale: 'percentage',
    passingGrade: '60',
    maxGrade: '100',
    allowExtraCredit: true,
    roundGrades: true,
    showGradeHistory: true,
    parentNotifications: true,
  });

  const handleSaveSchoolInfo = () => {
    console.log('Saving school info:', schoolInfo);
  };

  const handleSaveSystemSettings = () => {
    console.log('Saving system settings:', systemSettings);
  };

  const handleSaveEmailSettings = () => {
    console.log('Saving email settings:', emailSettings);
  };

  const handleSaveGradeSettings = () => {
    console.log('Saving grade settings:', gradeSettings);
  };

  const handleBackupData = () => {
    console.log('Creating backup...');
  };

  const handleRestoreData = () => {
    console.log('Restoring data...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                System Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Configure school information and system preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="school" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="school" className="flex items-center space-x-2">
                <School className="h-4 w-4" />
                <span>School Info</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>System</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="grades" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Grades</span>
              </TabsTrigger>
            </TabsList>

            {/* School Info Tab */}
            <TabsContent value="school">
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    School Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input
                        id="schoolName"
                        value={schoolInfo.name}
                        onChange={(e) => setSchoolInfo(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="establishedYear">Established Year</Label>
                      <Input
                        id="establishedYear"
                        value={schoolInfo.establishedYear}
                        onChange={(e) => setSchoolInfo(prev => ({ ...prev, establishedYear: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={schoolInfo.address}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, address: e.target.value }))}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={schoolInfo.phone}
                          onChange={(e) => setSchoolInfo(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={schoolInfo.email}
                          onChange={(e) => setSchoolInfo(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          value={schoolInfo.website}
                          onChange={(e) => setSchoolInfo(prev => ({ ...prev, website: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="principalName">Principal Name</Label>
                      <Input
                        id="principalName"
                        value={schoolInfo.principalName}
                        onChange={(e) => setSchoolInfo(prev => ({ ...prev, principalName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motto">School Motto</Label>
                    <Input
                      id="motto"
                      value={schoolInfo.motto}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, motto: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={schoolInfo.description}
                      onChange={(e) => setSchoolInfo(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveSchoolInfo}>
                      <Save className="mr-2 h-4 w-4" />
                      Save School Information
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system">
              <div className="space-y-6">
                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      System Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Temporarily disable access to the system</p>
                        </div>
                        <Switch
                          id="maintenanceMode"
                          checked={systemSettings.maintenanceMode}
                          onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="allowRegistration">Allow Registration</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Allow new users to register accounts</p>
                        </div>
                        <Switch
                          id="allowRegistration"
                          checked={systemSettings.allowRegistration}
                          onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, allowRegistration: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Users must verify email before accessing system</p>
                        </div>
                        <Switch
                          id="requireEmailVerification"
                          checked={systemSettings.requireEmailVerification}
                          onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, requireEmailVerification: checked }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={systemSettings.sessionTimeout}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                        <Input
                          id="maxLoginAttempts"
                          type="number"
                          value={systemSettings.maxLoginAttempts}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, maxLoginAttempts: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="passwordMinLength">Password Min Length</Label>
                        <Input
                          id="passwordMinLength"
                          type="number"
                          value={systemSettings.passwordMinLength}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, passwordMinLength: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Backup Frequency</Label>
                        <Select value={systemSettings.backupFrequency} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, backupFrequency: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveSystemSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        Save System Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Data Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button onClick={handleBackupData} className="flex items-center justify-center">
                        <Download className="mr-2 h-4 w-4" />
                        Create Backup
                      </Button>
                      <Button onClick={handleRestoreData} variant="outline" className="flex items-center justify-center">
                        <Upload className="mr-2 h-4 w-4" />
                        Restore Data
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>• Backups include all user data, grades, and system settings</p>
                      <p>• Restore operations will overwrite current data</p>
                      <p>• Always create a backup before major system changes</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Email Tab */}
            <TabsContent value="email">
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Email Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={emailSettings.smtpHost}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input
                        id="smtpUsername"
                        value={emailSettings.smtpUsername}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={emailSettings.smtpPassword}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        value={emailSettings.fromName}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fromEmail">From Email</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={emailSettings.fromEmail}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableSSL">Enable SSL/TLS</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Use secure connection for email sending</p>
                    </div>
                    <Switch
                      id="enableSSL"
                      checked={emailSettings.enableSSL}
                      onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, enableSSL: checked }))}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      Test Connection
                    </Button>
                    <Button onClick={handleSaveEmailSettings}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Email Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Grades Tab */}
            <TabsContent value="grades">
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Grading System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Grading Scale</Label>
                      <Select value={gradeSettings.gradingScale} onValueChange={(value) => setGradeSettings(prev => ({ ...prev, gradingScale: value }))}>
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
                      <Label htmlFor="passingGrade">Passing Grade</Label>
                      <Input
                        id="passingGrade"
                        type="number"
                        value={gradeSettings.passingGrade}
                        onChange={(e) => setGradeSettings(prev => ({ ...prev, passingGrade: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowExtraCredit">Allow Extra Credit</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Teachers can assign extra credit assignments</p>
                      </div>
                      <Switch
                        id="allowExtraCredit"
                        checked={gradeSettings.allowExtraCredit}
                        onCheckedChange={(checked) => setGradeSettings(prev => ({ ...prev, allowExtraCredit: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="roundGrades">Round Grades</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Automatically round grades to nearest whole number</p>
                      </div>
                      <Switch
                        id="roundGrades"
                        checked={gradeSettings.roundGrades}
                        onCheckedChange={(checked) => setGradeSettings(prev => ({ ...prev, roundGrades: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showGradeHistory">Show Grade History</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Students can view their grade history</p>
                      </div>
                      <Switch
                        id="showGradeHistory"
                        checked={gradeSettings.showGradeHistory}
                        onCheckedChange={(checked) => setGradeSettings(prev => ({ ...prev, showGradeHistory: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="parentNotifications">Parent Notifications</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Automatically notify parents of grade changes</p>
                      </div>
                      <Switch
                        id="parentNotifications"
                        checked={gradeSettings.parentNotifications}
                        onCheckedChange={(checked) => setGradeSettings(prev => ({ ...prev, parentNotifications: checked }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveGradeSettings}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Grade Settings
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
