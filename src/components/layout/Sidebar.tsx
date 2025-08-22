'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SidebarItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  roles?: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    roles: ['admin'],
  },
  {
    href: '/admin/class',
    label: 'Classes',
    roles: ['admin'],
  },
  {
    href: '/admin/subject',
    label: 'Subjects',
    roles: ['admin'],
  },
  {
    href: '/admin/teacher',
    label: 'Teachers',
    roles: ['admin'],
  },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredItems = sidebarItems.filter(item => 
    !item.roles || (user?.role && item.roles.includes(user.role))
  );

  return (
    <div className={cn('pb-12 w-64', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
          <div className="space-y-1">
            {filteredItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'transparent'
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
