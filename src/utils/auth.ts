import { User } from '@/types';
import { USER_ROLES } from '@/constants';

export const isAdmin = (user: User | null): boolean => {
  return user?.role === USER_ROLES.ADMIN;
};

export const isTeacher = (user: User | null): boolean => {
  return user?.role === USER_ROLES.TEACHER;
};

export const isStudent = (user: User | null): boolean => {
  return user?.role === USER_ROLES.STUDENT;
};

export const hasRole = (user: User | null, role: string): boolean => {
  return user?.role === role;
};

export const hasAnyRole = (user: User | null, roles: string[]): boolean => {
  return user?.role ? roles.includes(user.role) : false;
};

export const getRedirectPath = (user: User | null): string => {
  if (!user) return '/login';
  
  switch (user.role) {
    case USER_ROLES.ADMIN:
      return '/admin/dashboard';
    case USER_ROLES.TEACHER:
      return '/teacher/dashboard';
    case USER_ROLES.STUDENT:
      return '/student/dashboard';
    default:
      return '/home';
  }
};
