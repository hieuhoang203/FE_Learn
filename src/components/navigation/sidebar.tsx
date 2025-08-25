'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Award,
  School,
  Settings,
  LogOut,
  GraduationCap,
  Calendar,
  BarChart3,
  UserCheck,
  Shield,
  Clock,
  Target
} from 'lucide-react';

interface SidebarProps {
  userRole: 'admin' | 'teacher' | 'student';
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export default function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const getNavItems = (): NavItem[] => {
    switch (userRole) {
      case 'admin':
        return [
          { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
          { title: 'User', href: '/admin/users', icon: Users },
          { title: 'Class', href: '/admin/classes', icon: School },
          { title: 'Teacher', href: '/admin/teachers', icon: GraduationCap },
          { title: 'Student', href: '/admin/students', icon: UserCheck },
          { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
          { title: 'System Settings', href: '/admin/settings', icon: Settings },
        ];
      
      case 'teacher':
        return [
          { title: 'Dashboard', href: '/teacher/dashboard', icon: LayoutDashboard },
          { title: 'My Classes', href: '/teacher/classes', icon: School },
          { title: 'Lessons', href: '/teacher/lessons', icon: BookOpen },
          { title: 'Assignments', href: '/teacher/assignments', icon: FileText },
          { title: 'Grade Submissions', href: '/teacher/grades', icon: Award },
          { title: 'My Students', href: '/teacher/students', icon: Users },
          { title: 'Schedule', href: '/teacher/schedule', icon: Calendar },
          { title: 'Settings', href: '/teacher/settings', icon: Settings },
        ];
      
      case 'student':
        return [
          { title: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
          { title: 'My Classes', href: '/student/classes', icon: BookOpen },
          { title: 'Assignments', href: '/student/assignments', icon: FileText, badge: '3' },
          { title: 'My Grades', href: '/student/grades', icon: Award },
          { title: 'Schedule', href: '/student/schedule', icon: Calendar },
          { title: 'Progress', href: '/student/progress', icon: Target },
          { title: 'Settings', href: '/student/settings', icon: Settings },
        ];
      
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin': return 'from-red-500 to-red-600';
      case 'teacher': return 'from-blue-500 to-blue-600';
      case 'student': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'admin': return Shield;
      case 'teacher': return GraduationCap;
      case 'student': return UserCheck;
      default: return Users;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className="w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-gradient-to-r ${getRoleColor()} rounded-lg`}>
            <RoleIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Learning Platform
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {userRole} Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 w-full transition-colors">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
