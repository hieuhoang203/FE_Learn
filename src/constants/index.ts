// Application constants
export const APP_NAME = 'FE Learn';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  USERS: '/api/users',
  ADMIN: {
    DASHBOARD: '/api/admin/dashboard',
    USERS: '/api/admin/users',
    CLASSES: '/api/admin/classes',
    SUBJECTS: '/api/admin/subjects',
    TEACHERS: '/api/admin/teachers',
    STUDENTS: '/api/admin/students',
    STATS: '/api/admin/stats',
  },
  TEACHER: {
    DASHBOARD: '/api/teacher/dashboard',
    CLASSES: '/api/teacher/classes',
    LESSONS: '/api/teacher/lessons',
    ASSIGNMENTS: '/api/teacher/assignments',
    STUDENTS: '/api/teacher/students',
    GRADES: '/api/teacher/grades',
    STATS: '/api/teacher/stats',
  },
  STUDENT: {
    DASHBOARD: '/api/student/dashboard',
    CLASSES: '/api/student/classes',
    ASSIGNMENTS: '/api/student/assignments',
    SUBMISSIONS: '/api/student/submissions',
    GRADES: '/api/student/grades',
    LESSONS: '/api/student/lessons',
    STATS: '/api/student/stats',
  },
  CLASSES: '/api/classes',
  SUBJECTS: '/api/subjects',
  LESSONS: '/api/lessons',
  ASSIGNMENTS: '/api/assignments',
  SUBMISSIONS: '/api/submissions',
  GRADES: '/api/grades',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    CLASSES: '/admin/classes',
    SUBJECTS: '/admin/subjects',
    TEACHERS: '/admin/teachers',
    STUDENTS: '/admin/students',
    USERS: '/admin/users',
  },
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    CLASSES: '/teacher/classes',
    LESSONS: '/teacher/lessons',
    ASSIGNMENTS: '/teacher/assignments',
    STUDENTS: '/teacher/students',
    GRADES: '/teacher/grades',
    CREATE_LESSON: '/teacher/lessons/create',
    CREATE_ASSIGNMENT: '/teacher/assignments/create',
    CREATE_CLASS: '/teacher/classes/create',
  },
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    CLASSES: '/student/classes',
    ASSIGNMENTS: '/student/assignments',
    GRADES: '/student/grades',
    LESSONS: '/student/lessons',
    TAKE_ASSIGNMENT: '/student/assignments/take',
  },
  USER: {
    PROFILE: '/user/profile',
    DASHBOARD: '/user/dashboard',
  },
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const;
