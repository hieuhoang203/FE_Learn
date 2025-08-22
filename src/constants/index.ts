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
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    CLASSES: '/admin/class',
    SUBJECTS: '/admin/subject',
    TEACHERS: '/admin/teacher',
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
