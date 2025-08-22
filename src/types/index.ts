// Common types for the application
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Class and Subject types
export interface Class {
  id: string;
  name: string;
  description?: string;
  teacherId: string;
  teacher?: User;
  students?: User[];
  subjectId: string;
  subject?: Subject;
  maxStudents?: number;
  currentStudents?: number;
  schedule?: ClassSchedule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  code: string;
  credits?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassSchedule {
  id: string;
  classId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  room?: string;
}

// Assignment and Lesson types
export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content: string;
  classId: string;
  class?: Class;
  teacherId: string;
  teacher?: User;
  videoUrl?: string;
  attachments?: string[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  instructions: string;
  classId: string;
  class?: Class;
  teacherId: string;
  teacher?: User;
  dueDate: Date;
  maxScore: number;
  questions: Question[];
  submissions?: Submission[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  assignmentId: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer?: string | string[];
  points: number;
  order: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignment?: Assignment;
  studentId: string;
  student?: User;
  answers: Answer[];
  score?: number;
  feedback?: string;
  submittedAt: Date;
  gradedAt?: Date;
  status: 'submitted' | 'graded' | 'late';
}

export interface Answer {
  questionId: string;
  answer: string | string[];
  isCorrect?: boolean;
  points?: number;
}

// Grade and Progress types
export interface Grade {
  id: string;
  studentId: string;
  student?: User;
  assignmentId: string;
  assignment?: Assignment;
  classId: string;
  class?: Class;
  score: number;
  maxScore: number;
  percentage: number;
  feedback?: string;
  gradedAt: Date;
  gradedBy: string;
  grader?: User;
}

// Dashboard Statistics
export interface AdminStats {
  totalUsers: number;
  totalTeachers: number;
  totalStudents: number;
  totalClasses: number;
  totalSubjects: number;
  totalAssignments: number;
  recentActivities: Activity[];
}

export interface TeacherStats {
  totalClasses: number;
  totalStudents: number;
  totalAssignments: number;
  totalLessons: number;
  pendingGrades: number;
  recentSubmissions: Submission[];
}

export interface StudentStats {
  totalClasses: number;
  totalAssignments: number;
  completedAssignments: number;
  averageGrade: number;
  upcomingAssignments: Assignment[];
  recentGrades: Grade[];
}

export interface Activity {
  id: string;
  type: 'user_created' | 'class_created' | 'assignment_submitted' | 'grade_added';
  description: string;
  userId?: string;
  user?: User;
  createdAt: Date;
}
